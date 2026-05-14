(function(){
'use strict';

/* ================================================================
   DR. OBAYAN'S REAL PHOTO — embedded directly, no external URL
   ================================================================ */
var DR_PHOTO_SRC = 'images/dr-obayan-photo.jpg';
var drImg = document.getElementById('dr-obayan-photo');
if(drImg){ drImg.src = DR_PHOTO_SRC; }

/* ================================================================
   CONFIG
   ================================================================ */
var BOOKING = 'https://example.optimantra.com/booking-placeholder';

/* Wire all CTAs */
['book-now','eval-cta-el','final-cta-btn-el','nav-cta-el','mob-cta-el'].forEach(function(id){
  var el = document.getElementById(id);
  if(!el || el.tagName !== 'A') return;
  el.href = BOOKING; el.target = '_blank'; el.rel = 'noopener noreferrer';
});

/* Sticky header */
var hdr = document.getElementById('hdr');
function tick(){ hdr.classList.toggle('is-scrolled', window.scrollY > 48); }
window.addEventListener('scroll', tick, {passive:true}); tick();

/* Mobile nav */
var hmb = document.getElementById('hmb'), drw = document.getElementById('drw'), menuOpen = false, lastFocus = null;
var menuLinks = drw ? Array.prototype.slice.call(drw.querySelectorAll('a')) : [];
function openMenu(){
  if(!hmb || !drw) return;
  menuOpen = true;
  lastFocus = document.activeElement;
  hmb.classList.add('open');
  drw.classList.add('open');
  document.body.classList.add('menu-open');
  hmb.setAttribute('aria-expanded','true');
  hmb.setAttribute('aria-label','Close menu');
  drw.setAttribute('aria-hidden','false');
  document.body.style.overflow = 'hidden';
  window.setTimeout(function(){ if(menuLinks[0]) menuLinks[0].focus({preventScroll:true}); }, 120);
}
function closeMenu(returnFocus){
  if(!hmb || !drw) return;
  menuOpen = false;
  hmb.classList.remove('open');
  drw.classList.remove('open');
  document.body.classList.remove('menu-open');
  hmb.setAttribute('aria-expanded','false');
  hmb.setAttribute('aria-label','Open menu');
  drw.setAttribute('aria-hidden','true');
  document.body.style.overflow = '';
  if(returnFocus !== false && lastFocus && typeof lastFocus.focus === 'function') lastFocus.focus({preventScroll:true});
}
if(hmb && drw){
  hmb.addEventListener('click', function(){ menuOpen ? closeMenu(true) : openMenu(); });
  menuLinks.forEach(function(a){ a.addEventListener('click', function(){ closeMenu(false); }); });
  document.addEventListener('keydown', function(e){
    if(!menuOpen) return;
    if(e.key === 'Escape'){ closeMenu(true); return; }
    if(e.key !== 'Tab') return;
    var focusables = [hmb].concat(menuLinks).filter(function(el){ return el && el.offsetParent !== null; });
    if(!focusables.length) return;
    var first = focusables[0], last = focusables[focusables.length - 1];
    if(e.shiftKey && document.activeElement === first){ e.preventDefault(); last.focus(); }
    else if(!e.shiftKey && document.activeElement === last){ e.preventDefault(); first.focus(); }
  });
}

/* Scroll reveal */
var els = document.querySelectorAll('.reveal');
if('IntersectionObserver' in window){
  var io = new IntersectionObserver(function(ents){
    ents.forEach(function(e){ if(e.isIntersecting){ e.target.classList.add('in'); io.unobserve(e.target); } });
  }, {threshold:.1, rootMargin:'0px 0px -36px 0px'});
  els.forEach(function(el){ io.observe(el); });
} else { els.forEach(function(el){ el.classList.add('in'); }); }

/* Footer year */
document.getElementById('yr').textContent = new Date().getFullYear();

/* ================================================================
   RESPONSIVE PHOTO SET
   Curated Black/African American wellness, strength-training,
   and clinical consultation imagery with branded fallbacks.
   ================================================================ */
/* ================================================================
   PHOTO IMAGES — Pexels CDN
   Curated fully clothed, content-relevant mature adult imagery selected for Stronger After 40: resistance work, muscle restoration, walking stability, mobility, support, and functional strength.
   ================================================================ */
var PHOTOS = [
  { imgId:'ai-hero-img', loaderId:'ai-hero-loader', badgeId:null, fbType:'person', position:'center center',
    src:'https://images.pexels.com/photos/5163854/pexels-photo-5163854.jpeg?auto=compress&cs=tinysrgb&w=1800&h=1200&fit=crop',
    alt:'Fully clothed women using resistance bands outdoors, representing strength rebuilding after 40',
    prompt:'Hero image: fully clothed adults using resistance bands outdoors, directly tied to rebuilding strength, stability, and confidence after 40.' },
  { imgId:'ai-prob1-img', loaderId:'ai-prob1-loader', badgeId:'ai-prob1-badge', fbType:'person', position:'center center',
    src:'images/program-photo-1.jpg',
    alt:'Fully clothed Black woman measuring her waist indoors, representing body-composition awareness after 40',
    prompt:'Problem-section image: fully clothed woman checking body-composition progress with a measuring tape, relevant to noticing midlife changes, strength, and waist/body composition after 40.' },
  { imgId:'ai-clin1-img', loaderId:'ai-clin1-loader', badgeId:null, fbType:'person', position:'center center',
    src:'https://images.pexels.com/photos/8417532/pexels-photo-8417532.jpeg?auto=compress&cs=tinysrgb&w=750&h=1000&fit=crop',
    alt:'Fully clothed mature woman using a resistance band outdoors, representing muscle restoration and joint support',
    prompt:'Clinical-section image: fully clothed mature woman doing controlled resistance-band work outdoors, directly relevant to rebuilding muscle and supporting joints.' },
  { imgId:'ai-clin3-img', loaderId:'ai-clin3-loader', badgeId:null, fbType:'person', position:'center center',
    src:'https://images.pexels.com/photos/7242889/pexels-photo-7242889.jpeg?auto=compress&cs=tinysrgb&w=750&h=1000&fit=crop',
    alt:'Fully clothed Black woman walking outdoors, representing sustainable movement and healthy daily activity',
    prompt:'Clinical support image: fully clothed Black woman walking outdoors, relevant to sustainable activity, mobility, and staying active without gym-influencer styling.' },
  { imgId:'ai-sol1-img', loaderId:'ai-sol1-loader', badgeId:null, fbType:'person', position:'center center',
    src:'https://images.pexels.com/photos/8417426/pexels-photo-8417426.jpeg?auto=compress&cs=tinysrgb&w=900&h=1200&fit=crop',
    alt:'Fully clothed mature woman moving outdoors in a park, representing functional strength and stability',
    prompt:'Solution-section image: fully clothed mature woman moving outdoors, relevant to functional fitness, stability, and building capacity for daily life.' },
  { imgId:'ai-sol3-img', loaderId:'ai-sol3-loader', badgeId:null, fbType:'person', position:'center center',
    src:'images/program-photo-2.png',
    alt:'Fully clothed Black women walking together outdoors, representing mobility, support, and accountability after 40',
    prompt:'Program image: fully clothed Black women walking together outdoors, relevant to mobility, walking stability, support, accountability, and confidence after 40.' },
  { imgId:'ai-final-img', loaderId:'ai-final-loader', badgeId:null, fbType:'person', position:'center center',
    src:'https://images.pexels.com/photos/8795589/pexels-photo-8795589.jpeg?auto=compress&cs=tinysrgb&w=1800&h=1000&fit=crop',
    alt:'Fully clothed mature woman Nordic walking in a park, representing stability, mobility, and feeling stronger again',
    prompt:'Final CTA image: fully clothed mature woman walking in a park, relevant to stability, mobility, independence, and feeling stronger after 40.' }
];

/* ================================================================
   BRANDED SVG FALLBACK — shown if a Pexels image fails
   ================================================================ */
function brandedFallback(loaderId, type){
  var loader = document.getElementById(loaderId);
  if(!loader) return;
  var fills = {
    person:'<linearGradient id="ff" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#1A413E"/><stop offset="100%" stop-color="#081D1B"/></linearGradient>',
    clinical:'<linearGradient id="ff" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#102E2C"/><stop offset="100%" stop-color="#081D1B"/></linearGradient>'
  };
  var gd = fills[type||'person'];
  /* person silhouette + brand text */
  var svg = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 260" style="width:100%;height:100%">'
    +'<defs>'+gd+'</defs>'
    +'<rect width="200" height="260" fill="url(#ff)"/>'
    +'<circle cx="100" cy="90" r="30" fill="#2D6B68" opacity=".35"/>'
    +'<path d="M44 200 C44 162 72 146 100 146 C128 146 156 162 156 200 L162 260 L38 260 Z" fill="#2D6B68" opacity=".3"/>'
    +'<circle cx="100" cy="90" r="30" fill="none" stroke="#6FA3A2" stroke-width="1" opacity=".3"/>'
    +'<text x="100" y="242" text-anchor="middle" font-family="DM Sans,sans-serif" font-size="7" letter-spacing="2.5" fill="rgba(212,181,131,.5)">STRONGER AFTER 40™</text>'
    +'</svg>';
  loader.innerHTML = svg;
}

/* ================================================================
   TIER 2 — Branded fallback helper
   ================================================================ */
function generateAIImage(item){
  brandedFallback(item.loaderId, item.fbType);
}

/* ================================================================
   TIER 1 — Pexels CDN with branded fallback
   ================================================================ */
function loadPhoto(item){
  var img = document.getElementById(item.imgId);
  var loader = document.getElementById(item.loaderId);
  if(!img || !loader) return;
  var probe = new Image();
  probe.onload = function(){
    if(item.position){ img.style.objectPosition = item.position; }
    img.decoding = 'async';
    if(item.imgId === 'ai-hero-img'){ img.loading = 'eager'; img.fetchPriority = 'high'; }
    else { img.loading = 'lazy'; }
    img.src = item.src;
    img.alt = item.alt;
    img.classList.add('loaded');
    loader.classList.add('hidden');
    if(item.badgeId){
      var badge = document.getElementById(item.badgeId);
      if(badge){ badge.textContent = '✦ Photo'; badge.classList.add('show'); }
    }
  };
  probe.onerror = function(){
    /* Pexels failed — show branded SVG fallback */
    brandedFallback(item.loaderId, item.fbType);
  };
  probe.src = item.src;
}

/* Stagger loads for smooth progressive rendering */
PHOTOS.forEach(function(item, idx){
  setTimeout(function(){ loadPhoto(item); }, 80 + idx * 120);
});


})();
