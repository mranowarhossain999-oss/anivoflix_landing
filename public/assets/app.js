const KEY="anivoflixLandingV1";
const defaults={
 brandName:"AnivoFlix",domainSuffix:".Com",heroName:"AnivoFlix",
 heroText:"Your ultimate destination for Movies, Anime & Series.",
 mainVisitText:"Visit Anivoflix.Com",mainVisitUrl:"https://anivoflix.com",
 guideButtonUrl:"",telegramButtonUrl:"",
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
$("heroDomain").textContent=d.domainSuffix||defaults.domainSuffix;
document.title=(d.brandName||"AnivoFlix")+".Com";

$("domainList").innerHTML=(d.domains||[]).filter(x=>x.show!==false).map(x=>`<a class="domain-btn" href="${esc(x.url)}" target="_blank" rel="noopener"><span>${esc(x.name||"Visit")}</span></a>`).join("");
// The former Explore/Quick Links block is replaced with two admin-configurable CTAs.
const guideButton=$("guideButton"),telegramButton=$("telegramButton");
if(guideButton){guideButton.href=d.guideButtonUrl||"#";if(d.guideButtonUrl){guideButton.target="_blank";guideButton.rel="noopener";}}
if(telegramButton){telegramButton.href=d.telegramButtonUrl||"#";}
const importantItems=(d.important||[]).filter(x=>x.show!==false);
if($("importantLinks")){
  $("importantLinks").innerHTML=importantItems.map(x=>`<li><a href="${esc(x.url)}">${esc(x.name)}</a></li>`).join("");
  if($("importantSection")) $("importantSection").hidden=importantItems.length===0;
}

$("footerSocials").innerHTML=(d.socials||[]).filter(x=>x.show!==false).map(x=>`<a class="footer-social" href="${esc(x.url)}" target="_blank" rel="noopener">${x.image?`<img src="${esc(x.image)}" alt="" loading="lazy" decoding="async">`:x.icon?`<span class="footer-social-icon">${esc(x.icon)}</span>`:""}<span>${esc(x.name)}</span></a>`).join("");
$("footerNav").innerHTML=(d.footerLinks||[]).filter(x=>x.show!==false).map(x=>`<a href="${esc(x.url)}">${esc(x.name)}</a>`).join("");
