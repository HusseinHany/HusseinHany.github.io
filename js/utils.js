/* ─── SMOOTH SCROLL TO SECTION ─── */
function goTo(id) {
  document.getElementById(id)?.scrollIntoView({behavior:'smooth',block:'start'});
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
