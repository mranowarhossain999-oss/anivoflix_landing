const KEY="anivoflixLandingV1";
const defaults={
 brandName:"AnivoFlix",domainSuffix:".Com",heroName:"AnivoFlix",
 heroText:"Your ultimate destination for Movies, Anime & Series.",
 mainVisitText:"Visit Anivoflix.Com",mainVisitUrl:"https://anivoflix.com",
 searchButtonText:"SEARCH",searchTemplate:"https://anivoflix.com/search?q={query}",
 footerDescription:"Stream your favorite movies & series. Pick up where you left off, anytime. Switch servers with a single tap.",
 copyrightText:"ALL RIGHTS RESERVED",
 dmcaTitle:"DMCA / Disclaimer",
 dmcaText:"AnivoFlix does not host files on its own servers unless explicitly stated. Content may be linked from third-party services. For copyright concerns, please contact the appropriate hosting provider or site administrator.",
 domains:[],
 links:[
  {name:"Movies",icon:"",url:"https://anivoflix.com/movies",newTab:true,show:true},
  {name:"Series",icon:"",url:"https://anivoflix.com/series",newTab:true,show:true},
  {name:"Anime",icon:"",url:"https://anivoflix.com/anime",newTab:true,show:true},
  {name:"Serial",icon:"",url:"https://anivoflix.com/serial",newTab:true,show:true},
  {name:"TV Shows",icon:"",url:"https://anivoflix.com/tv-shows",newTab:true,show:true},
  {name:"Mini Drama",icon:"",url:"https://anivoflix.com/mini-drama",newTab:true,show:true}
 ],
 important:[],
 socials:[],
 getAppText:"GET THE APP",getAppUrl:"https://anivoflix.com",showGetApp:true,
 footerLinks:[
  {name:"ABOUT",url:"#about",show:true},
  {name:"CONTACT",url:"#contact",show:true},
  {name:"PRIVACY",url:"#privacy",show:true},
  {name:"TERMS",url:"#terms",show:true}
 ],
 categories:[
  {name:"HOME",url:"https://anivoflix.com/",show:true},
  {name:"MOVIES",url:"https://anivoflix.com/movies",show:true},
  {name:"SERIES",url:"https://anivoflix.com/series",show:true},
  {name:"ANIME",url:"https://anivoflix.com/anime",show:true},
  {name:"SERIAL",url:"https://anivoflix.com/serial",show:true},
  {name:"TV SHOWS",url:"https://anivoflix.com/tv-shows",show:true},
  {name:"MINI DRAMA",url:"https://anivoflix.com/mini-drama",show:true}
 ]
};
let d;
try{d={...defaults,...JSON.parse(localStorage.getItem(KEY)||"{}")}}catch(e){d=defaults}
const $=id=>document.getElementById(id);
const esc=v=>String(v??"").replace(/[&<>"']/g,m=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[m]));

$("heroName").textContent=d.heroName||defaults.heroName;
$("heroText").textContent=d.heroText||defaults.heroText;
$("mainVisitText").textContent=d.mainVisitText||defaults.mainVisitText;
$("mainVisit").href=d.mainVisitUrl||defaults.mainVisitUrl;
$("footerDescription").textContent=d.footerDescription||defaults.footerDescription;
$("copyrightName").textContent=(d.brandName||"AnivoFlix").toUpperCase();
$("copyrightText").textContent=d.copyrightText||defaults.copyrightText;
$("year").textContent=new Date().getFullYear();
$("searchButton").textContent=d.searchButtonText||defaults.searchButtonText;
document.title=(d.brandName||"AnivoFlix")+".Com";

$("searchForm").addEventListener("submit",e=>{
 e.preventDefault();const q=$("searchInput").value.trim();if(!q)return;
 const t=d.searchTemplate||defaults.searchTemplate;
 location.href=t.includes("{query}")?t.replaceAll("{query}",encodeURIComponent(q)):t+encodeURIComponent(q);
});

$("domainList").innerHTML=(d.domains||[]).filter(x=>x.show!==false).map(x=>`<a class="domain-btn" href="${esc(x.url)}" target="_blank" rel="noopener"><span>${esc(x.name||"Visit")}</span></a>`).join("");
$("quickLinks").innerHTML=(d.links||[]).filter(x=>x.show!==false).map(x=>`<a class="quick-btn" href="${esc(x.url)}" ${x.newTab!==false?'target="_blank" rel="noopener"':''}>${x.icon?`<span class="icon">${esc(x.icon)}</span>`:""}<span>${esc(x.name||"Link")}</span></a>`).join("");
const importantItems=(d.important||[]).filter(x=>x.show!==false);
if($("importantLinks")){
  $("importantLinks").innerHTML=importantItems.map(x=>`<li><a href="${esc(x.url)}">${esc(x.name)}</a></li>`).join("");
  if($("importantSection")) $("importantSection").hidden=importantItems.length===0;
}

$("footerSocials").innerHTML=(d.socials||[]).filter(x=>x.show!==false).map(x=>`<a class="footer-social" href="${esc(x.url)}" target="_blank" rel="noopener">${x.image?`<img src="${esc(x.image)}" alt="" loading="lazy" decoding="async">`:x.icon?`<span class="footer-social-icon">${esc(x.icon)}</span>`:""}<span>${esc(x.name)}</span></a>`).join("");
const app=$("getApp");
if(d.showGetApp===false){app.hidden=true}else{app.hidden=false;app.href=d.getAppUrl||defaults.getAppUrl;$("getAppText").textContent=d.getAppText||defaults.getAppText}
$("footerNav").innerHTML=(d.footerLinks||[]).filter(x=>x.show!==false).map(x=>`<a href="${esc(x.url)}">${esc(x.name)}</a>`).join("");

$("categoryNav").innerHTML=(d.categories||defaults.categories).filter(x=>x.show!==false).map(x=>`<a class="category-item" href="${esc(x.url)}"><span>${esc(x.name)}</span></a>`).join("");
const toggle=$("menuToggle"),drawer=$("categoryDrawer"),backdrop=$("drawerBackdrop"),close=$("drawerClose");
function setDrawer(open){document.body.classList.toggle("drawer-open",open);drawer.setAttribute("aria-hidden",String(!open));toggle.setAttribute("aria-expanded",String(open));}
toggle.addEventListener("click",()=>setDrawer(true));close.addEventListener("click",()=>setDrawer(false));backdrop.addEventListener("click",()=>setDrawer(false));
drawer.addEventListener("click",e=>{if(e.target.closest("a"))setDrawer(false)});

const rotatingWords=["Movie","Series","Anime","Serial","TV Shows","Mini Drama"];
let rotatingIndex=0;const word=$("rotatingWord");
let rotateTimer;
function rotateWord(){
  if(document.hidden)return;
  rotatingIndex=(rotatingIndex+1)%rotatingWords.length;
  word.textContent=rotatingWords[rotatingIndex];
}
rotateTimer=setInterval(rotateWord,5000);
document.addEventListener("visibilitychange",()=>{
  if(document.hidden){clearInterval(rotateTimer);rotateTimer=null}
  else if(!rotateTimer)rotateTimer=setInterval(rotateWord,5000);
});
