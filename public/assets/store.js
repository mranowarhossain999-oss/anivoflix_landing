import { initializeApp, getApps, getApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getFirestore, doc, getDoc, setDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

// Same Firebase project as the main AnivoFlix site. Settings live in Firestore
// (site_settings/landing) so every visitor/device sees the same content.
const firebaseConfig = {
  apiKey: "AIzaSyDcxQG3bBZziMtUR4usMp-wtwhBdkE5lHc",
  authDomain: "dramalinktg.firebaseapp.com",
  projectId: "dramalinktg",
  storageBucket: "dramalinktg.firebasestorage.app",
  messagingSenderId: "506843084188",
  appId: "1:506843084188:web:9f1a61051ef52401a04459"
};
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
const db = getFirestore(app);

export const KEY = "anivoflixLandingV1"; // local copy, used only for instant first paint
export const defaults={
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

export const clone = (x) => JSON.parse(JSON.stringify(x));

export function normalize(p) {
  p = p && typeof p === "object" ? p : {};
  return {
    ...clone(defaults), ...p,
    domains: Array.isArray(p.domains) ? p.domains : [],
    socials: Array.isArray(p.socials) ? p.socials : [],
    footerLinks: Array.isArray(p.footerLinks) ? p.footerLinks : clone(defaults.footerLinks),
  };
}

export function readCache() {
  try { return JSON.parse(localStorage.getItem(KEY) || "null"); } catch (e) { return null; }
}
export function writeCache(d) {
  try { localStorage.setItem(KEY, JSON.stringify(d)); } catch (e) {}
}
export function clearCache() {
  try { localStorage.removeItem(KEY); } catch (e) {}
}

// Returns the saved settings, or null if nothing has been published yet.
export async function fetchRemote() {
  const snap = await getDoc(doc(db, "site_settings", "landing"));
  if (!snap.exists()) return null;
  const data = snap.data();
  delete data.updated_at;
  return data;
}

export async function saveRemote(d) {
  await setDoc(doc(db, "site_settings", "landing"), { ...d, updated_at: serverTimestamp() });
  writeCache(d);
}
