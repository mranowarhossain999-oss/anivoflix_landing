const KEY="anivoflixLandingV1";
const defaults={
 brandName:"AnivoFlix",domainSuffix:".com",heroName:"AnivoFlix",heroText:"Your ultimate destination for Movies, Anime & Series.",
 mainVisitText:"Visit Anivoflix.Com",mainVisitUrl:"https://anivoflix.com",guideButtonUrl:"",telegramButtonUrl:"",searchButtonText:"SEARCH",searchTemplate:"https://anivoflix.com/search?q={query}",
 footerDescription:"Stream your favorite movies & series. Pick up where you left off, anytime. Switch servers with a single tap.",
 copyrightText:"ALL RIGHTS RESERVED",
 dmcaTitle:"DMCA / Disclaimer",dmcaText:"AnivoFlix does not host files on its own servers unless explicitly stated. Content may be linked from third-party services. For copyright concerns, please contact the appropriate hosting provider or site administrator.",
 domains:[],links:[],important:[],
 socials:[],
 footerLinks:[{name:"ABOUT",url:"#about",show:true},{name:"CONTACT",url:"#contact",show:true},{name:"PRIVACY",url:"#privacy",show:true},{name:"TERMS",url:"#terms",show:true}],
 categories:[{name:"HOME",url:"https://anivoflix.com/",show:true},{name:"MOVIES",url:"https://anivoflix.com/movies",show:true},{name:"SERIES",url:"https://anivoflix.com/series",show:true},{name:"ANIME",url:"https://anivoflix.com/anime",show:true},{name:"SERIAL",url:"https://anivoflix.com/serial",show:true},{name:"TV SHOWS",url:"https://anivoflix.com/tv-shows",show:true},{name:"MINI DRAMA",url:"https://anivoflix.com/mini-drama",show:true}]
};
function clone(x){return JSON.parse(JSON.stringify(x))}
function loadData(){try{const raw=localStorage.getItem(KEY);if(!raw)return clone(defaults);const p=JSON.parse(raw);return {...clone(defaults),...p,domains:Array.isArray(p.domains)?p.domains:[],links:Array.isArray(p.links)?p.links:[],important:Array.isArray(p.important)?p.important:[],socials:Array.isArray(p.socials)?p.socials:clone(defaults.socials),footerLinks:Array.isArray(p.footerLinks)?p.footerLinks:clone(defaults.footerLinks),categories:Array.isArray(p.categories)?p.categories:clone(defaults.categories)}}catch(e){return clone(defaults)}}
let d=loadData();const $=id=>document.getElementById(id);
function showStatus(message,ok=true){let box=$("saveStatus");if(!box){box=document.createElement("div");box.id="saveStatus";document.body.appendChild(box)}box.textContent=message;box.className=ok?"ok":"error";clearTimeout(window.__saveTimer);window.__saveTimer=setTimeout(()=>box.className="",2200)}
function persist(message="Saved successfully."){try{localStorage.setItem(KEY,JSON.stringify(d));showStatus(message,true);return true}catch(e){showStatus("Could not save. Browser storage may be blocked or full.",false);return false}}
function esc(v){return String(v??"").replace(/[&<>"']/g,m=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[m]))}
function input(v,cls=""){return `<input class="${cls}" value="${esc(v)}">`}
function fill(){["brandName","domainSuffix","heroName","heroText","mainVisitText","mainVisitUrl","searchButtonText","searchTemplate","footerDescription","copyrightText","dmcaTitle","dmcaText","guideButtonUrl","telegramButtonUrl"].forEach(k=>{if($(k))$(k).value=d[k]??""});renderDomains();renderLinks();renderImportant();renderSocials();renderFooterLinks();renderCategories();
if($("footerDescriptionFooter"))$("footerDescriptionFooter").value=d.footerDescription||"";
if($("copyrightTextFooter"))$("copyrightTextFooter").value=d.copyrightText||"ALL RIGHTS RESERVED"}
function renderDomains(){const box=$("domains"),empty=$("noDomains");if(!box)return;if(!d.domains.length){box.innerHTML="";if(empty)empty.style.display="block";return}if(empty)empty.style.display="none";box.innerHTML=d.domains.map((x,i)=>`<div class="domain-item" data-index="${i}"><div class="domain-number">${i+1}</div><div class="domain-fields"><label>Button Name${input(x.name||"New Domain")}</label><label>Destination URL${input(x.url||"https://")}</label><label class="domain-show"><input class="domain-show-input" type="checkbox" ${x.show!==false?"checked":""}> Show this button</label><div class="domain-actions"><button class="mini save-domain" type="button" data-action="save-domain">Save Domain</button><button class="mini remove" type="button" data-action="delete-domain">Delete</button></div></div></div>`).join("")}
function renderLinks(){const box=$("links");if(!box)return;box.innerHTML=d.links.map((x,i)=>`<div class="row quick-link-row" data-index="${i}"><label>Icon${input(x.icon||"")}</label><label>Name${input(x.name||"New Button")}</label><label class="wide">URL${input(x.url||"https://")}</label><label class="check"><input class="show-input" type="checkbox" ${x.show!==false?"checked":""}> Show</label><label class="check"><input class="tab-input" type="checkbox" ${x.newTab!==false?"checked":""}> New tab</label><div class="row-actions"><button class="mini save-item" type="button" data-action="save-link">Save</button><button class="mini remove" type="button" data-action="delete-link">Delete</button></div></div>`).join("")}
function renderImportant(){const box=$("important");if(!box)return;box.innerHTML=d.important.map((x,i)=>`<div class="row important-row" data-index="${i}"><label class="wide">Name${input(x.name||"Important Link")}</label><label class="wide">URL${input(x.url||"https://")}</label><label class="check"><input class="show-input" type="checkbox" ${x.show!==false?"checked":""}> Show</label><div class="row-actions"><button class="mini save-item" type="button" data-action="save-important">Save</button><button class="mini remove" type="button" data-action="delete-important">Delete</button></div></div>`).join("")}
function renderSocials(){const box=$("socials");if(!box)return;box.innerHTML=d.socials.map((x,i)=>`<div class="social-admin-row" data-index="${i}"><div class="social-preview">${x.image?`<img src="${esc(x.image)}" alt="">`:"No icon"}</div><div class="social-fields"><label>Icon image from phone<input type="file" accept="image/png,image/jpeg,image/webp,image/gif" data-social-file></label><label>Name${input(x.name||"Social")}</label><label>Destination URL${input(x.url||"https://")}</label><label>Fallback text/icon${input(x.icon||"")}</label><label class="check"><input class="social-show" type="checkbox" ${x.show!==false?"checked":""}> Show</label><div class="row-actions"><button class="mini save-item" type="button" data-action="save-social">Save</button><button class="mini remove" type="button" data-action="delete-social">Delete</button></div></div></div>`).join("")}
function renderFooterLinks(){const box=$("footerLinks");if(!box)return;box.innerHTML=d.footerLinks.map((x,i)=>`<div class="row footer-link-row" data-index="${i}"><label class="wide">Name${input(x.name||"ABOUT")}</label><label class="wide">URL${input(x.url||"#")}</label><label class="check"><input class="show-input" type="checkbox" ${x.show!==false?"checked":""}> Show</label><div class="row-actions"><button class="mini save-item" type="button" data-action="save-footer-link">Save</button><button class="mini remove" type="button" data-action="delete-footer-link">Delete</button></div></div>`).join("")}
function renderCategories(){const box=$("categories");if(!box)return;box.innerHTML=d.categories.map((x,i)=>`<div class="row category-row" data-index="${i}"><label class="wide">Category${input(x.name||"Category")}</label><label class="wide">URL${input(x.url||"https://")}</label><label class="check"><input class="show-input" type="checkbox" ${x.show!==false?"checked":""}> Show</label><div class="row-actions"><button class="mini save-item" type="button" data-action="save-category">Save</button></div></div>`).join("")}
function removeItem(key,index,renderFn){if(!confirm("Delete this item?"))return;d[key].splice(index,1);persist("Deleted.");renderFn()}
function saveRow(row,key,render,message){const i=Number(row.dataset.index),ins=row.querySelectorAll("input");if(key==="domains"){d.domains[i].name=ins[0].value.trim()||"New Domain";d.domains[i].url=ins[1].value.trim()||"https://";d.domains[i].show=ins[2].checked}
if(key==="links"){d.links[i].icon=ins[0].value;d.links[i].name=ins[1].value.trim()||"New Button";d.links[i].url=ins[2].value.trim()||"https://";d.links[i].show=ins[3].checked;d.links[i].newTab=ins[4].checked}
if(key==="important"||key==="footerLinks"||key==="categories"){d[key][i].name=ins[0].value.trim()||"Link";d[key][i].url=ins[1].value.trim()||"#";d[key][i].show=ins[2].checked}
if(persist(message))render()}
function saveSocial(row){const i=Number(row.dataset.index),ins=row.querySelectorAll("input"),file=ins[0].files[0];d.socials[i].name=ins[1].value.trim()||"Social";d.socials[i].url=ins[2].value.trim()||"https://";d.socials[i].icon=ins[3].value;d.socials[i].show=ins[4].checked;if(file){const r=new FileReader();r.onload=()=>{d.socials[i].image=r.result;if(persist("Social media saved."))renderSocials()};r.onerror=()=>showStatus("Could not read the selected image.",false);r.readAsDataURL(file)}else if(persist("Social media saved."))renderSocials()}
$("saveSettings")?.addEventListener("click",()=>{["brandName","domainSuffix","heroName","heroText","mainVisitText","mainVisitUrl","searchButtonText","searchTemplate","footerDescription","copyrightText"].forEach(k=>d[k]=$(k).value);persist("Settings saved.")});
$("saveCtaLinks")?.addEventListener("click",()=>{
 d.guideButtonUrl=$("guideButtonUrl").value.trim();
 d.telegramButtonUrl=$("telegramButtonUrl").value.trim();
 persist("Button links saved.");
});
$("saveFooterContent")?.addEventListener("click",()=>{
 d.footerDescription=$("footerDescriptionFooter").value;
 d.copyrightText=$("copyrightTextFooter").value;
 if($("footerDescription"))$("footerDescription").value=d.footerDescription;
 if($("copyrightText"))$("copyrightText").value=d.copyrightText;
 persist("Footer content saved.");
});
$("saveDmca")?.addEventListener("click",()=>{d.dmcaTitle=$("dmcaTitle").value;d.dmcaText=$("dmcaText").value;persist("Disclaimer saved.")});
$("addDomain")?.addEventListener("click",()=>{d.domains.push({name:"New Domain",url:"https://",show:true});persist("Domain button added.");renderDomains()});
$("addLink")?.addEventListener("click",()=>{d.links.push({name:"New Button",icon:"",url:"https://",show:true,newTab:true});persist("Quick link added.");renderLinks()});
$("addImportant")?.addEventListener("click",()=>{d.important.push({name:"Important Link",url:"#",show:true});persist("Important link added.");renderImportant()});
$("addSocial")?.addEventListener("click",()=>{d.socials.push({name:"SOCIAL",icon:"",image:"",url:"https://",show:true});persist("Social button added.");renderSocials()});
$("addFooterLink")?.addEventListener("click",()=>{d.footerLinks.push({name:"NEW LINK",url:"#",show:true});persist("Footer link added.");renderFooterLinks()});
function bind(boxId,rowClass,handlers){$(boxId)?.addEventListener("click",e=>{const btn=e.target.closest("button");if(!btn)return;const row=btn.closest("."+rowClass);if(!row)return;const i=Number(row.dataset.index);handlers(btn,row,i)})}
bind("domains","domain-item",(btn,row,i)=>{if(btn.dataset.action==="save-domain")saveRow(row,"domains",renderDomains,"Domain saved.");if(btn.dataset.action==="delete-domain")removeItem("domains",i,renderDomains)});
bind("links","quick-link-row",(btn,row,i)=>{if(btn.dataset.action==="save-link")saveRow(row,"links",renderLinks,"Quick link saved.");if(btn.dataset.action==="delete-link")removeItem("links",i,renderLinks)});
bind("important","important-row",(btn,row,i)=>{if(btn.dataset.action==="save-important")saveRow(row,"important",renderImportant,"Important link saved.");if(btn.dataset.action==="delete-important")removeItem("important",i,renderImportant)});
bind("socials","social-admin-row",(btn,row,i)=>{if(btn.dataset.action==="save-social")saveSocial(row);if(btn.dataset.action==="delete-social")removeItem("socials",i,renderSocials)});
bind("footerLinks","footer-link-row",(btn,row,i)=>{if(btn.dataset.action==="save-footer-link")saveRow(row,"footerLinks",renderFooterLinks,"Footer link saved.");if(btn.dataset.action==="delete-footer-link")removeItem("footerLinks",i,renderFooterLinks)});
bind("categories","category-row",(btn,row)=>{if(btn.dataset.action==="save-category")saveRow(row,"categories",renderCategories,"Category saved.")});
$("resetBtn")?.addEventListener("click",()=>{if(!confirm("Reset all landing page settings?"))return;localStorage.removeItem(KEY);d=clone(defaults);fill();showStatus("All settings reset.")});
$("logoutBtn")?.addEventListener("click",()=>{sessionStorage.removeItem("anivoflix_admin_auth");location.replace("/login")});
fill();
