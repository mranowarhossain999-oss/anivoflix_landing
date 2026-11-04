import { defaults, normalize, readCache, writeCache, fetchRemote } from "./store.js?v=8";

const $=id=>document.getElementById(id);
const esc=v=>String(v??"").replace(/[&<>"']/g,m=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[m]));

function render(d){
const txt=(k)=>d[k]||defaults[k];
const brand=txt("brandName"),suffix=d.domainSuffix??defaults.domainSuffix;

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

$("domainList").innerHTML=(d.domains||[]).filter(x=>x.show!==false).map(x=>`<a class="domain-btn" href="${esc(x.url)}" target="_blank" rel="noopener"><span>${esc(x.name||"Visit")}</span></a>`).join("");
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
