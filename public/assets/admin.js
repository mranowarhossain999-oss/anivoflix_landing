import { defaults, clone, normalize, readCache, writeCache, clearCache, fetchRemote, saveRemote } from "./store.js?v=8";

let d=normalize(readCache());const $=id=>document.getElementById(id);
function showStatus(message,ok=true){let box=$("saveStatus");if(!box){box=document.createElement("div");box.id="saveStatus";document.body.appendChild(box)}box.textContent=message;box.className=ok?"ok":"error";clearTimeout(window.__saveTimer);window.__saveTimer=setTimeout(()=>box.className="",2200)}
async function persist(message="Saved for everyone."){
 try{await saveRemote(d);showStatus(message,true);return true}
 catch(e){console.error(e);const denied=e&&e.code==="permission-denied";
  showStatus(denied?"Save blocked: Firestore rules do not allow writing site_settings/landing.":"Could not save. Check your internet connection.",false);return false}
}
function esc(v){return String(v??"").replace(/[&<>"']/g,m=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[m]))}
function input(v){return `<input value="${esc(v)}">`}
const FIELDS=["brandName","domainSuffix","heroName","heroText","mainVisitText","mainVisitUrl","guideButtonText","guideButtonUrl","telegramButtonText","telegramButtonUrl","aboutBn","aboutEn","dmcaTitle","dmcaText","footerDescription","copyrightText"];
function fill(){FIELDS.forEach(k=>{if($(k))$(k).value=d[k]??""});renderDomains();renderSocials();renderFooterLinks()}
function renderDomains(){const box=$("domains"),empty=$("noDomains");if(!d.domains.length){box.innerHTML="";empty.style.display="block";return}empty.style.display="none";box.innerHTML=d.domains.map((x,i)=>`<div class="domain-item" data-index="${i}"><div class="domain-number">${i+1}</div><div class="domain-fields"><label>Button Name${input(x.name||"New Domain")}</label><label>Destination URL${input(x.url||"https://")}</label><label class="domain-show"><input type="checkbox" ${x.show!==false?"checked":""}> Show this button</label><div class="domain-actions"><button class="mini save-domain" type="button" data-action="save-domain">Save</button><button class="mini remove" type="button" data-action="delete-domain">Delete</button></div></div></div>`).join("")}
function renderSocials(){const box=$("socials");box.innerHTML=d.socials.map((x,i)=>`<div class="social-admin-row" data-index="${i}"><div class="social-preview">${x.image?`<img src="${esc(x.image)}" alt="">`:"No icon"}</div><div class="social-fields"><label>Icon image from phone<input type="file" accept="image/png,image/jpeg,image/webp,image/gif"></label><label>Name${input(x.name||"Social")}</label><label>Destination URL${input(x.url||"https://")}</label><label>Fallback text/icon${input(x.icon||"")}</label><label class="check"><input type="checkbox" ${x.show!==false?"checked":""}> Show</label><div class="row-actions"><button class="mini save-item" type="button" data-action="save-social">Save</button><button class="mini remove" type="button" data-action="delete-social">Delete</button></div></div></div>`).join("")}
function renderFooterLinks(){const box=$("footerLinks");box.innerHTML=d.footerLinks.map((x,i)=>`<div class="row footer-link-row" data-index="${i}"><label class="wide">Name${input(x.name||"ABOUT")}</label><label class="wide">URL${input(x.url||"#")}</label><label class="check"><input type="checkbox" ${x.show!==false?"checked":""}> Show</label><div class="row-actions"><button class="mini save-item" type="button" data-action="save-footer-link">Save</button><button class="mini remove" type="button" data-action="delete-footer-link">Delete</button></div></div>`).join("")}
async function removeItem(key,index,renderFn){if(!confirm("Delete this item?"))return;d[key].splice(index,1);await persist("Deleted.");renderFn()}
async function saveRow(row,key,render,message){const i=Number(row.dataset.index),ins=row.querySelectorAll("input");
 if(key==="domains"){d.domains[i].name=ins[0].value.trim()||"New Domain";d.domains[i].url=ins[1].value.trim()||"https://";d.domains[i].show=ins[2].checked}
 if(key==="footerLinks"){d.footerLinks[i].name=ins[0].value.trim()||"LINK";d.footerLinks[i].url=ins[1].value.trim()||"#";d.footerLinks[i].show=ins[2].checked}
 if(await persist(message))render()}
// Shrink uploaded icons so the settings document stays small (Firestore limit is 1 MB).
function shrinkImage(file,max=128){return new Promise((res,rej)=>{const r=new FileReader();r.onerror=rej;r.onload=()=>{const img=new Image();img.onerror=rej;img.onload=()=>{const s=Math.min(1,max/Math.max(img.width,img.height)),c=document.createElement("canvas");c.width=Math.max(1,Math.round(img.width*s));c.height=Math.max(1,Math.round(img.height*s));c.getContext("2d").drawImage(img,0,0,c.width,c.height);res(c.toDataURL("image/webp",.85))};img.src=r.result};r.readAsDataURL(file)})}
async function saveSocial(row){const i=Number(row.dataset.index),ins=row.querySelectorAll("input"),file=ins[0].files[0];d.socials[i].name=ins[1].value.trim()||"Social";d.socials[i].url=ins[2].value.trim()||"https://";d.socials[i].icon=ins[3].value;d.socials[i].show=ins[4].checked;
 if(file){try{d.socials[i].image=await shrinkImage(file)}catch(e){showStatus("Could not read the selected image.",false);return}}
 if(await persist("Social button saved."))renderSocials()}

document.querySelectorAll("[data-save]").forEach(btn=>btn.addEventListener("click",async()=>{
 btn.dataset.save.split(",").forEach(k=>{const v=$(k).value;d[k]=/Url$/.test(k)?v.trim():v});
 await persist("Saved for everyone.");
}));
$("addDomain").addEventListener("click",async()=>{d.domains.push({name:"New Domain",url:"https://",show:true});await persist("Domain button added.");renderDomains()});
$("addSocial").addEventListener("click",async()=>{d.socials.push({name:"SOCIAL",icon:"",image:"",url:"https://",show:true});await persist("Social button added.");renderSocials()});
$("addFooterLink").addEventListener("click",async()=>{d.footerLinks.push({name:"NEW LINK",url:"#",show:true});await persist("Footer link added.");renderFooterLinks()});
function bind(boxId,rowClass,handlers){$(boxId).addEventListener("click",e=>{const btn=e.target.closest("button");if(!btn)return;const row=btn.closest("."+rowClass);if(!row)return;handlers(btn,row,Number(row.dataset.index))})}
bind("domains","domain-item",(b,r,i)=>{if(b.dataset.action==="save-domain")saveRow(r,"domains",renderDomains,"Domain saved.");if(b.dataset.action==="delete-domain")removeItem("domains",i,renderDomains)});
bind("socials","social-admin-row",(b,r,i)=>{if(b.dataset.action==="save-social")saveSocial(r);if(b.dataset.action==="delete-social")removeItem("socials",i,renderSocials)});
bind("footerLinks","footer-link-row",(b,r,i)=>{if(b.dataset.action==="save-footer-link")saveRow(r,"footerLinks",renderFooterLinks,"Footer link saved.");if(b.dataset.action==="delete-footer-link")removeItem("footerLinks",i,renderFooterLinks)});
$("resetBtn").addEventListener("click",async()=>{if(!confirm("Reset all landing page settings for everyone?"))return;clearCache();d=clone(defaults);fill();await persist("All settings reset.")});
$("logoutBtn").addEventListener("click",()=>{sessionStorage.removeItem("anivoflix_admin_auth");location.replace("/login")});
// Show what this browser has now, then load the live settings from Firestore.
// If nothing is published yet, the settings previously saved in this browser are
// kept, and the next Save publishes them for everyone.
fill();
fetchRemote().then(remote=>{if(remote){d=normalize(remote);writeCache(d);fill()}else showStatus("Nothing published yet — press any Save to publish for everyone.",true)}).catch(e=>{console.error(e);showStatus("Could not load live settings.",false)});
