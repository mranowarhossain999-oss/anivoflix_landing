const KEY="anivoflixLandingV1";
const defaults={
 brandName:"AnivoFlix",domainSuffix:".Com",heroName:"AnivoFlix",
 heroText:"Your ultimate destination for Movies, Anime & Series.",
 mainVisitText:"Visit Anivoflix.Com",mainVisitUrl:"https://anivoflix.com",
 howToText:"কিভাবে দেখবো ও ডাউনলোড করব",howToUrl:"https://anivoflix.com",
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
 socials:[
  {name:"Telegram Channel",icon:"",url:"https://t.me/",show:true},
  {name:"Facebook Group",icon:"",url:"https://facebook.com/",show:true}
 ],
 showGetApp:false,
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
$("howToText").textContent=d.howToText||defaults.howToText;
$("howTo").href=d.howToUrl||defaults.howToUrl;
document.title=(d.brandName||"AnivoFlix")+".Com";


$("domainList").innerHTML=(d.domains||[]).filter(x=>x.show!==false).map(x=>`<a class="btn btn-outline" href="${esc(x.url)}" target="_blank" rel="noopener"><span>${esc(x.name||"Visit")}</span></a>`).join("");
$("quickLinks").innerHTML=(d.links||[]).filter(x=>x.show!==false).map(x=>`<a class="btn btn-chip" href="${esc(x.url)}" ${x.newTab!==false?'target="_blank" rel="noopener"':''}>${x.icon?`<span class="icon">${esc(x.icon)}</span>`:""}<span>${esc(x.name||"Link")}</span></a>`).join("");
const importantItems=(d.important||[]).filter(x=>x.show!==false);
if($("importantLinks")){
  $("importantLinks").innerHTML=importantItems.map(x=>`<li><a href="${esc(x.url)}">${esc(x.name)}</a></li>`).join("");
  if($("importantSection")) $("importantSection").hidden=importantItems.length===0;
}

const ICONS={
 telegram:'<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M21.9 4.3 18.7 19.6c-.2 1.1-.9 1.4-1.8.9l-4.9-3.6-2.4 2.3c-.3.3-.5.5-1 .5l.4-5 9-8.1c.4-.3-.1-.5-.6-.2L6.3 13.4 1.5 11.9c-1-.3-1-1 .2-1.5L20.4 3.2c.9-.3 1.6.2 1.5 1.1Z"/></svg>',
 facebook:'<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M13.5 21v-7.6h2.6l.4-3h-3V8.5c0-.9.3-1.5 1.5-1.5h1.6V4.3c-.3 0-1.2-.1-2.3-.1-2.3 0-3.9 1.4-3.9 4v2.2H7.8v3h2.6V21h3.1Z"/></svg>'
};
const brandOf=n=>/telegram/i.test(n)?"telegram":/facebook/i.test(n)?"facebook":"";
const socials=(d.socials||[]).filter(x=>x.show!==false&&x.url);
$("communityLinks").innerHTML=socials.map(x=>{const b=brandOf(x.name||"");
 const ic=x.image?`<img src="${esc(x.image)}" alt="" loading="lazy" decoding="async">`:ICONS[b]||(x.icon?`<span>${esc(x.icon)}</span>`:"");
 return `<a class="btn btn-social ${b}" href="${esc(x.url)}" target="_blank" rel="noopener"><span class="soc-icon">${ic}</span><span>${esc(x.name)}</span></a>`}).join("");
$("communitySection").hidden=socials.length===0;
$("footerNav").innerHTML=(d.footerLinks||[]).filter(x=>x.show!==false).map(x=>`<a href="${esc(x.url)}">${esc(x.name)}</a>`).join("");

$("categoryNav").innerHTML=(d.categories||defaults.categories).filter(x=>x.show!==false).map(x=>`<a class="category-item" href="${esc(x.url)}"><span>${esc(x.name)}</span></a>`).join("");
const toggle=$("menuToggle"),drawer=$("categoryDrawer"),backdrop=$("drawerBackdrop"),close=$("drawerClose");
function setDrawer(open){document.body.classList.toggle("drawer-open",open);drawer.setAttribute("aria-hidden",String(!open));toggle.setAttribute("aria-expanded",String(open));}
toggle.addEventListener("click",()=>setDrawer(true));close.addEventListener("click",()=>setDrawer(false));backdrop.addEventListener("click",()=>setDrawer(false));
drawer.addEventListener("click",e=>{if(e.target.closest("a"))setDrawer(false)});

