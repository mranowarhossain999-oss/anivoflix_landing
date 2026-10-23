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
let d;
try{d={...defaults,...JSON.parse(localStorage.getItem(KEY)||"{}")}}catch(e){d=defaults}
const $=id=>document.getElementById(id);
const esc=v=>String(v??"").replace(/[&<>"']/g,m=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[m]));
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
