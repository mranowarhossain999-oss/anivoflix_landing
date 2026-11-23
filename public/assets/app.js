import { defaults, normalize, readCache, writeCache, fetchRemote } from "./store.js?v=12";

// Missing elements return a harmless stand-in, so one stale/mismatched file can never stop the page.
const $=id=>document.getElementById(id)||{style:{},classList:{add(){},remove(){},toggle(){}},setAttribute(){},addEventListener(){},querySelector(){return null}};
const esc=v=>String(v??"").replace(/[&<>"']/g,m=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[m]));
const hostOf=u=>{try{return new URL(u).hostname}catch(e){return u}};
// Each part of the page is drawn on its own, so a problem in one part never hides the others.
const part=fn=>{try{fn()}catch(e){console.error(e)}};

function render(d){
const txt=(k)=>d[k]||defaults[k];
const brand=txt("brandName"),suffix=d.domainSuffix??defaults.domainSuffix;

part(()=>{
 $("heroLead").textContent=txt("heroLead");
 $("heroName").textContent=txt("heroName");
 $("heroDomain").textContent=suffix;
 $("heroText").textContent=txt("heroText");
 $("mainVisitText").textContent=txt("mainVisitText");
 $("mainVisit").href=txt("mainVisitUrl");
 document.title=brand+suffix;
});

// Domain list: the main domain first, then every domain added in the admin panel.
// The label on the right is whatever "Status" you typed there (default: Online).
part(()=>{
 $("statusTitle").textContent=String(txt("statusTitle")).toUpperCase();
 const list=[{name:brand+suffix,url:txt("mainVisitUrl"),status:"Online"}].concat(
  (d.domains||[]).filter(x=>x&&x.show!==false&&x.url&&x.url!=="https://").map(x=>({name:x.name,url:x.url,status:x.status||"Online"}))
 );
 const seen=new Set();
 const rows=list.filter(x=>{if(seen.has(x.url))return false;seen.add(x.url);return true});
 $("domainStatus").innerHTML=rows.map(x=>{
  const on=/^(online|active|live|up)$/i.test(String(x.status).trim());
  return `<a class="status-card" href="${esc(x.url)}" target="_blank" rel="noopener"><span><span class="status-name">${esc(x.name||"Visit")}</span><span class="status-host">${esc(hostOf(x.url))}</span></span><span class="status-pill ${on?"on":"off"}">${esc(x.status)}</span></a>`;
 }).join("");
});

part(()=>{
 const guide=$("guideButton"),tg=$("telegramButton");
 guide.textContent=txt("guideButtonText");
 guide.href=d.guideButtonUrl||"#";
 if(d.guideButtonUrl){guide.target="_blank";guide.rel="noopener"}
 tg.textContent=txt("telegramButtonText");
 tg.href=d.telegramButtonUrl||"#";
});

part(()=>{
 $("aboutBn").textContent=txt("aboutBn");
 $("aboutEn").textContent=txt("aboutEn");
 $("dmcaTitle").textContent=txt("dmcaTitle");
 $("dmcaText").textContent=txt("dmcaText");
});

part(()=>{
 $("footerBrand").textContent=brand;
 $("footerDomain").textContent=suffix;
 $("footerDescription").textContent=txt("footerDescription");
 $("copyrightName").textContent=brand.toUpperCase();
 $("copyrightText").textContent=txt("copyrightText");
 $("year").textContent=new Date().getFullYear();
 $("footerSocials").innerHTML=(d.socials||[]).filter(x=>x.show!==false).map(x=>`<a class="footer-social" href="${esc(x.url)}" target="_blank" rel="noopener">${x.image?`<img src="${esc(x.image)}" alt="" loading="lazy" decoding="async">`:x.icon?`<span class="footer-social-icon">${esc(x.icon)}</span>`:""}<span>${esc(x.name)}</span></a>`).join("");
 $("footerNav").innerHTML=(d.footerLinks||[]).filter(x=>x.show!==false).map(x=>`<a href="${esc(x.url)}">${esc(x.name)}</a>`).join("");
});

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
