/* ─── SMOOTH SCROLL TO SECTION (accounts for fixed nav height) ─── */
function goTo(id) {
  const el = document.getElementById(id);
  if (!el) return;
  const navH = document.getElementById('nav')?.offsetHeight || 72;
  const top = el.getBoundingClientRect().top + window.scrollY - (id === 'hero' ? 0 : navH);
  window.scrollTo({top: Math.max(0, top), behavior: 'smooth'});
}

/* ─── BACK TO TOP ─── */
function scrollToTop() {
  window.scrollTo({top: 0, behavior: 'smooth'});
}

/* ─── TOAST NOTIFICATION ─── */
function showToast(msg, err = false) {
  const t = document.getElementById('toast');
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
