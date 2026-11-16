import { defaults, normalize, readCache, writeCache, fetchRemote } from "./store.js?v=8";

const $=id=>document.getElementById(id);
const esc=v=>String(v??"").replace(/[&<>"']/g,m=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[m]));

const hostOf=u=>{try{return new URL(u).hostname}catch(e){return u}};
// Reachability check from the visitor's own browser. A "no-cors" request succeeds
// for any server that answers, and fails when the domain is blocked or down, which
// is what matters to a visitor. Results are remembered so the page does not re-check.
const status=new Map();
function paint(url){
  const ok=status.get(url);
  document.querySelectorAll(".status-card").forEach(card=>{
    if(card.dataset.url!==url)return;
    const pill=card.querySelector(".status-pill");
    pill.className="status-pill "+(ok===undefined?"wait":ok?"on":"off");
    pill.textContent=ok===undefined?"Checking…":ok?"Online":"Offline";
  });
}
function checkDomain(url){
  if(status.has(url)){paint(url);return}
  status.set(url,undefined);
  const c=new AbortController(),t=setTimeout(()=>c.abort(),8000);
  fetch(url,{mode:"no-cors",cache:"no-store",signal:c.signal})
    .then(()=>true).catch(()=>false)
    .then(ok=>{clearTimeout(t);status.set(url,ok);paint(url)});
}

function render(d){
const txt=(k)=>d[k]||defaults[k];
const brand=txt("brandName"),suffix=d.domainSuffix??defaults.domainSuffix;

$("heroLead").textContent=txt("heroLead");
$("heroName").textContent=txt("heroName");
$("heroDomain").textContent=suffix;
$("heroText").textContent=txt("heroText");
$("mainVisitText").textContent=txt("mainVisitText");
$("mainVisit").href=txt("mainVisitUrl");

const guide=$("guideButton"),tg=$("telegramButton");
guide.textContent=txt("guideButtonText");
guide.href=d.guideButtonUrl||"#";
if(d.guideButtonUrl){guide.target="_blank";guide.rel="noopener"}
tg.textContent=txt("telegramButtonText");
tg.href=d.telegramButtonUrl||"#";

$("aboutBn").textContent=txt("aboutBn");
$("aboutEn").textContent=txt("aboutEn");
$("dmcaTitle").textContent=txt("dmcaTitle");
$("dmcaText").textContent=txt("dmcaText");

$("footerBrand").textContent=brand;
$("footerDomain").textContent=suffix;
$("footerDescription").textContent=txt("footerDescription");
$("copyrightName").textContent=brand.toUpperCase();
$("copyrightText").textContent=txt("copyrightText");
$("year").textContent=new Date().getFullYear();
document.title=brand+suffix;

// Domain status: main domain first, then the extra domains from the admin panel.
$("statusTitle").textContent=txt("statusTitle").toUpperCase();
const list=[{name:brand+suffix,url:txt("mainVisitUrl")}].concat((d.domains||[]).filter(x=>x.show!==false&&x.url&&x.url!=="https://"));
const seen=new Set();
const rows=list.filter(x=>{if(seen.has(x.url))return false;seen.add(x.url);return true});
$("domainStatus").innerHTML=rows.map(x=>`<a class="status-card" href="${esc(x.url)}" target="_blank" rel="noopener" data-url="${esc(x.url)}"><span><span class="status-name">${esc(x.name||"Visit")}</span><span class="status-host">${esc(hostOf(x.url))}</span></span><span class="status-pill wait">Checking…</span></a>`).join("");
rows.forEach(x=>checkDomain(x.url));
$("footerSocials").innerHTML=(d.socials||[]).filter(x=>x.show!==false).map(x=>`<a class="footer-social" href="${esc(x.url)}" target="_blank" rel="noopener">${x.image?`<img src="${esc(x.image)}" alt="" loading="lazy" decoding="async">`:x.icon?`<span class="footer-social-icon">${esc(x.icon)}</span>`:""}<span>${esc(x.name)}</span></a>`).join("");
$("footerNav").innerHTML=(d.footerLinks||[]).filter(x=>x.show!==false).map(x=>`<a href="${esc(x.url)}">${esc(x.name)}</a>`).join("");

}

// 1) Paint instantly from the last copy this browser saw (no blank flash).
const cached=readCache();
render(normalize(cached));

// 2) Then always fetch the latest published settings, so every device is up to date.
fetchRemote().then(remote=>{
  if(!remote) return;
  const data=normalize(remote);
  writeCache(data);
  render(data);
}).catch(err=>console.error("Could not load landing settings:",err));
