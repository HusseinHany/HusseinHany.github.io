/* ─── GSAP AVAILABILITY (guards against a blocked/failed CDN load) ─── */
const hasGsap = typeof gsap !== 'undefined';
const hasScrollTrigger = hasGsap && typeof ScrollTrigger !== 'undefined';

/* ─── SMOOTH SCROLL TO SECTION (accounts for fixed nav height) ─── */
function goTo(id) {
  const el = document.getElementById(id);
  if (!el) return;
  const nav = document.getElementById('nav');
  const navH = nav && Number.isFinite(nav.offsetHeight) ? nav.offsetHeight : 72;
  const top = el.getBoundingClientRect().top + window.scrollY - (id === 'hero' ? 0 : navH);
  scrollToY(Math.max(0, top));
}

/* Fixed-duration scroll: native smooth scrolling takes a second or more over long distances */
let scrollAnim = 0;
function scrollToY(target) {
  cancelAnimationFrame(scrollAnim);
  const start = window.scrollY, dist = target - start;
  if (Math.abs(dist) < 2 || window.matchMedia('(prefers-reduced-motion:reduce)').matches) { window.scrollTo(0, target); return; }
  const dur = 420, t0 = performance.now();
  const step = now => {
    const t = Math.min(1, (now - t0) / dur);
    window.scrollTo(0, start + dist * (1 - Math.pow(1 - t, 3)));
    if (t < 1) scrollAnim = requestAnimationFrame(step);
  };
  scrollAnim = requestAnimationFrame(step);
}

/* ─── BACK TO TOP ─── */
function scrollToTop() {
  scrollToY(0);
}

/* ─── TOAST NOTIFICATION ─── */
function showToast(msg, err = false) {
  const t = document.getElementById('toast');
  if (!t) return;
  t.textContent = msg;
  t.className = 'toast' + (err ? ' err' : '');
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 4000);
}

/* ─── CHARACTER COUNTER FOR TEXTAREA ─── */
function updateCharCount(el) {
  if (el.value.length > 500) el.value = el.value.slice(0, 500);
  document.getElementById('fct').textContent = Math.min(el.value.length, 500);
}
