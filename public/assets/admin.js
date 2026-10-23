const KEY="anivoflixLandingV1";
const defaults={
 brandName:"AnivoFlix",domainSuffix:".Com",heroName:"AnivoFlix",
 heroText:"Your ultimate destination for Movies, Anime & Series.",
 mainVisitText:"Visit Anivoflix.Com",mainVisitUrl:"https://anivoflix.com",
 guideButtonText:"ডাউনলোড ও দেখার নিয়ম",guideButtonUrl:"",
 telegramButtonText:"সকল প্রকার আপডেট পেতে আমাদের টেলিগ্রাম চ্যানেল জয়েন করুন",telegramButtonUrl:"",
 aboutBn:"AnivoFlix.Com এ আপনি পাবেন মুভি, ওয়েব সিরিজ, অ্যানিমে, সিরিয়াল, টিভি শো ও মিনি ড্রামার বিশাল সংগ্রহ। সহজে ডাউনলোড ও দেখার সুবিধা, একাধিক সার্ভার এবং নিয়মিত নতুন কনটেন্ট আপডেটের মাধ্যমে আপনার বিনোদন থাকবে সবসময় হাতের কাছে। নতুন কিছু দেখতে চাইলে বা মুভি-সিরিজ রিকুয়েস্ট করতে আমাদের সাথেই থাকুন।",
 aboutEn:"On AnivoFlix.Com you will find a huge collection of Movies, Web Series, Anime, Serials, TV Shows and Mini Dramas. With easy download and watch options, multiple servers and regular new content updates, your entertainment is always within reach. Stay with us to enjoy something new and to request your favorite movies and series.",
 footerDescription:"Stream your favorite movies & series. Pick up where you left off, anytime. Switch servers with a single tap.",
 copyrightText:"ALL RIGHTS RESERVED",
 dmcaTitle:"DMCA / Disclaimer",
 dmcaText:"AnivoFlix does not host files on its own servers unless explicitly stated. Content may be linked from third-party services. For copyright concerns, please contact the appropriate hosting provider or site administrator.",
 domains:[],
 socials:[],
 footerLinks:[
  {name:"ABOUT",url:"#about",show:true},
  {name:"CONTACT",url:"#contact",show:true},
  {name:"PRIVACY",url:"#privacy",show:true},
  {name:"TERMS",url:"#terms",show:true}
 ]
};
function clone(x){return JSON.parse(JSON.stringify(x))}
function loadData(){try{const raw=localStorage.getItem(KEY);if(!raw)return clone(defaults);const p=JSON.parse(raw);return {...clone(defaults),...p,domains:Array.isArray(p.domains)?p.domains:[],socials:Array.isArray(p.socials)?p.socials:[],footerLinks:Array.isArray(p.footerLinks)?p.footerLinks:clone(defaults.footerLinks)}}catch(e){return clone(defaults)}}
let d=loadData();const $=id=>document.getElementById(id);
function showStatus(message,ok=true){let box=$("saveStatus");if(!box){box=document.createElement("div");box.id="saveStatus";document.body.appendChild(box)}box.textContent=message;box.className=ok?"ok":"error";clearTimeout(window.__saveTimer);window.__saveTimer=setTimeout(()=>box.className="",2200)}
function persist(message="Saved successfully."){try{localStorage.setItem(KEY,JSON.stringify(d));showStatus(message,true);return true}catch(e){showStatus("Could not save. Browser storage may be blocked or full.",false);return false}}
function esc(v){return String(v??"").replace(/[&<>"']/g,m=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[m]))}
function input(v){return `<input value="${esc(v)}">`}
const FIELDS=["brandName","domainSuffix","heroName","heroText","mainVisitText","mainVisitUrl","guideButtonText","guideButtonUrl","telegramButtonText","telegramButtonUrl","aboutBn","aboutEn","dmcaTitle","dmcaText","footerDescription","copyrightText"];
function fill(){FIELDS.forEach(k=>{if($(k))$(k).value=d[k]??""});renderDomains();renderSocials();renderFooterLinks()}
function renderDomains(){const box=$("domains"),empty=$("noDomains");if(!d.domains.length){box.innerHTML="";empty.style.display="block";return}empty.style.display="none";box.innerHTML=d.domains.map((x,i)=>`<div class="domain-item" data-index="${i}"><div class="domain-number">${i+1}</div><div class="domain-fields"><label>Button Name${input(x.name||"New Domain")}</label><label>Destination URL${input(x.url||"https://")}</label><label class="domain-show"><input type="checkbox" ${x.show!==false?"checked":""}> Show this button</label><div class="domain-actions"><button class="mini save-domain" type="button" data-action="save-domain">Save</button><button class="mini remove" type="button" data-action="delete-domain">Delete</button></div></div></div>`).join("")}
function renderSocials(){const box=$("socials");box.innerHTML=d.socials.map((x,i)=>`<div class="social-admin-row" data-index="${i}"><div class="social-preview">${x.image?`<img src="${esc(x.image)}" alt="">`:"No icon"}</div><div class="social-fields"><label>Icon image from phone<input type="file" accept="image/png,image/jpeg,image/webp,image/gif"></label><label>Name${input(x.name||"Social")}</label><label>Destination URL${input(x.url||"https://")}</label><label>Fallback text/icon${input(x.icon||"")}</label><label class="check"><input type="checkbox" ${x.show!==false?"checked":""}> Show</label><div class="row-actions"><button class="mini save-item" type="button" data-action="save-social">Save</button><button class="mini remove" type="button" data-action="delete-social">Delete</button></div></div></div>`).join("")}
function renderFooterLinks(){const box=$("footerLinks");box.innerHTML=d.footerLinks.map((x,i)=>`<div class="row footer-link-row" data-index="${i}"><label class="wide">Name${input(x.name||"ABOUT")}</label><label class="wide">URL${input(x.url||"#")}</label><label class="check"><input type="checkbox" ${x.show!==false?"checked":""}> Show</label><div class="row-actions"><button class="mini save-item" type="button" data-action="save-footer-link">Save</button><button class="mini remove" type="button" data-action="delete-footer-link">Delete</button></div></div>`).join("")}
function removeItem(key,index,renderFn){if(!confirm("Delete this item?"))return;d[key].splice(index,1);persist("Deleted.");renderFn()}
function saveRow(row,key,render,message){const i=Number(row.dataset.index),ins=row.querySelectorAll("input");
 if(key==="domains"){d.domains[i].name=ins[0].value.trim()||"New Domain";d.domains[i].url=ins[1].value.trim()||"https://";d.domains[i].show=ins[2].checked}
 if(key==="footerLinks"){d.footerLinks[i].name=ins[0].value.trim()||"LINK";d.footerLinks[i].url=ins[1].value.trim()||"#";d.footerLinks[i].show=ins[2].checked}
 if(persist(message))render()}
function saveSocial(row){const i=Number(row.dataset.index),ins=row.querySelectorAll("input"),file=ins[0].files[0];d.socials[i].name=ins[1].value.trim()||"Social";d.socials[i].url=ins[2].value.trim()||"https://";d.socials[i].icon=ins[3].value;d.socials[i].show=ins[4].checked;
 if(file){const r=new FileReader();r.onload=()=>{d.socials[i].image=r.result;if(persist("Social button saved."))renderSocials()};r.onerror=()=>showStatus("Could not read the selected image.",false);r.readAsDataURL(file)}else if(persist("Social button saved."))renderSocials()}

document.querySelectorAll("[data-save]").forEach(btn=>btn.addEventListener("click",()=>{
 btn.dataset.save.split(",").forEach(k=>{const v=$(k).value;d[k]=/Url$/.test(k)?v.trim():v});
 persist("Saved.");
}));
$("addDomain").addEventListener("click",()=>{d.domains.push({name:"New Domain",url:"https://",show:true});persist("Domain button added.");renderDomains()});
$("addSocial").addEventListener("click",()=>{d.socials.push({name:"SOCIAL",icon:"",image:"",url:"https://",show:true});persist("Social button added.");renderSocials()});
$("addFooterLink").addEventListener("click",()=>{d.footerLinks.push({name:"NEW LINK",url:"#",show:true});persist("Footer link added.");renderFooterLinks()});
function bind(boxId,rowClass,handlers){$(boxId).addEventListener("click",e=>{const btn=e.target.closest("button");if(!btn)return;const row=btn.closest("."+rowClass);if(!row)return;handlers(btn,row,Number(row.dataset.index))})}
bind("domains","domain-item",(b,r,i)=>{if(b.dataset.action==="save-domain")saveRow(r,"domains",renderDomains,"Domain saved.");if(b.dataset.action==="delete-domain")removeItem("domains",i,renderDomains)});
bind("socials","social-admin-row",(b,r,i)=>{if(b.dataset.action==="save-social")saveSocial(r);if(b.dataset.action==="delete-social")removeItem("socials",i,renderSocials)});
bind("footerLinks","footer-link-row",(b,r,i)=>{if(b.dataset.action==="save-footer-link")saveRow(r,"footerLinks",renderFooterLinks,"Footer link saved.");if(b.dataset.action==="delete-footer-link")removeItem("footerLinks",i,renderFooterLinks)});
$("resetBtn").addEventListener("click",()=>{if(!confirm("Reset all landing page settings?"))return;localStorage.removeItem(KEY);d=clone(defaults);fill();showStatus("All settings reset.")});
$("logoutBtn").addEventListener("click",()=>{sessionStorage.removeItem("anivoflix_admin_auth");location.replace("/login")});
fill();
