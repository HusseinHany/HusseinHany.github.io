/* ─── CURSOR (hover devices) ─── */
(function initCursor() {
  const $c = document.getElementById('cur');
  const $r = document.getElementById('curR');
  if (!$c || !$r) return;
  let mx = 0, my = 0, rx = 0, ry = 0;
  if (window.matchMedia('(hover:hover)').matches) {
    document.addEventListener('mousemove', e => {
      mx = e.clientX; my = e.clientY;
      $c.style.left = mx + 'px'; $c.style.top = my + 'px';
    }, {passive: true});
    (function raf() {
      rx += (mx - rx) * .12; ry += (my - ry) * .12;
      $r.style.left = rx + 'px'; $r.style.top = ry + 'px';
      requestAnimationFrame(raf);
    })();
    const hover = s => () => {
      $c.style.width = s + 'px'; $c.style.height = s + 'px';
      $r.style.width = (s * 2.4) + 'px'; $r.style.height = (s * 2.4) + 'px';
    };
    document.querySelectorAll('button,a,.pj-card,.sk-chip,.fp,.tbtn,.soc,.ph-btn,.m-close').forEach(el => {
      el.addEventListener('mouseenter', hover(18));
      el.addEventListener('mouseleave', hover(10));
    });
  }
})();

/* ─── SCROLL: PROGRESS BAR & NAV STATE ─── */
window.addEventListener('scroll', () => {
  document.getElementById('prog').style.width =
    (window.scrollY / (document.body.scrollHeight - window.innerHeight) * 100) + '%';
  document.getElementById('nav').classList.toggle('scrolled', window.scrollY > 60);
}, {passive: true});

/* ─── NAV: MOBILE MENU ─── */
let menuOpen = false;

function toggleMenu() {
  menuOpen = !menuOpen;
  const hbg = document.getElementById('hbg');
  const mm = document.getElementById('mob-menu');
  hbg.classList.toggle('open', menuOpen);
  hbg.setAttribute('aria-expanded', String(menuOpen));
  mm.classList.toggle('open', menuOpen);
  document.body.style.overflow = menuOpen ? 'hidden' : '';
  if (menuOpen) {
    mm.querySelectorAll('a').forEach((a, i) => {
      a.style.transitionDelay = (i * .08 + .15) + 's';
    });
  }
}

function closeMenu() {
  menuOpen = false;
  const hbg = document.getElementById('hbg');
  hbg.classList.remove('open');
  hbg.setAttribute('aria-expanded', 'false');
  document.getElementById('mob-menu').classList.remove('open');
  document.body.style.overflow = '';
}

/* ─── THEME TOGGLE ─── */
(function initTheme() {
  const saved = localStorage.getItem('theme');
  const btn = document.getElementById('theme-toggle');
  if (saved === 'light') {
    document.documentElement.setAttribute('data-theme', 'light');
    if (btn) { btn.textContent = '🌙'; btn.setAttribute('aria-label', 'Switch to dark mode'); }
  } else {
    document.documentElement.removeAttribute('data-theme');
    if (btn) { btn.textContent = '☀️'; btn.setAttribute('aria-label', 'Switch to light mode'); }
  }
})();

function toggleTheme() {
  const html = document.documentElement;
  const btn = document.getElementById('theme-toggle');
  const isLight = html.getAttribute('data-theme') === 'light';
  if (isLight) {
    html.removeAttribute('data-theme');
    localStorage.setItem('theme', 'dark');
    if (btn) { btn.textContent = '☀️'; btn.setAttribute('aria-label', 'Switch to light mode'); }
  } else {
    html.setAttribute('data-theme', 'light');
    localStorage.setItem('theme', 'light');
    if (btn) { btn.textContent = '🌙'; btn.setAttribute('aria-label', 'Switch to dark mode'); }
  }
}

/* ─── SKILL TABS ─── */
let curTab = 0;

function switchTab(i, btn) {
  curTab = i;
  document.querySelectorAll('.tbtn').forEach(b => {
    b.classList.remove('on');
    b.setAttribute('aria-selected', 'false');
  });
  btn.classList.add('on');
  btn.setAttribute('aria-selected', 'true');
  renderSkillTab();
  const chips = document.querySelectorAll('.sk-chip');
  if (chips.length) {
    gsap.fromTo('.sk-chip',
      {opacity: 0, scale: .82, y: 12},
      {opacity: 1, scale: 1, y: 0, duration: .35, stagger: .045, ease: 'back.out(2)'}
    );
  }
}

function renderSkillTab() {
  document.getElementById('tab-c').innerHTML =
    `<div class="sk-grid">${TABS[curTab].s.map(s =>
      `<div class="sk-chip"><span class="sk-icon" aria-hidden="true">${s.i}</span><span>${s.n}</span></div>`
    ).join('')}</div>`;
}
renderSkillTab();

/* ─── MARQUEE ─── */
(function initMarquee() {
  const mqEl = document.getElementById('mq-t');
  if (mqEl) {
    mqEl.innerHTML = [...TOOLS, ...TOOLS].map(t =>
      `<div class="mq-i" aria-hidden="true"><span style="font-size:16px">${TICONS[t] || '●'}</span><span>${t}</span></div>`
    ).join('');
  }
})();

/* ─── SKILL BARS ─── */
(function initBars() {
  const w = document.getElementById('bars-w');
  if (!w) return;
  w.innerHTML = BARS.map(b =>
    `<div class="bar-row">
      <div class="bar-n">${b.n}</div>
      <div class="bar-t" role="progressbar" aria-valuenow="${b.p}" aria-valuemin="0" aria-valuemax="100" aria-label="${b.n} proficiency ${b.p}%">
        <div class="bar-f" data-p="${b.p / 100}" style="background:linear-gradient(90deg,${b.c},var(--gold))"></div>
      </div>
      <div class="bar-p">${b.p}%</div>
    </div>`
  ).join('');
  new IntersectionObserver(en => {
    en.forEach(e => {
      if (e.isIntersecting) {
        document.querySelectorAll('.bar-f').forEach((el, i) =>
          setTimeout(() => { el.style.transform = `scaleX(${el.dataset.p})`; }, i * 75)
        );
      }
    });
  }, {threshold: .3}).observe(document.querySelector('.bars-card'));
})();

/* ─── PROJECTS ─── */
let activeCat = 'All';

function renderProjects() {
  const list = activeCat === 'All' ? PJS : PJS.filter(p => p.cat === activeCat);
  const g = document.getElementById('pj-g');
  g.innerHTML = list.map(p => `
    <article class="pj-card" onclick="openModal(${p.id})" tabindex="0"
      role="button" aria-label="View details for ${p.title}"
      onkeydown="if(event.key==='Enter'||event.key===' ')openModal(${p.id})">
      ${p.feat ? '<div class="feat-b" aria-label="Featured project">★ Featured</div>' : ''}
      <div class="pj-img-w">
        <img src="${p.img}" alt="${p.title} project preview" class="pj-img" loading="lazy"/>
        <div class="pj-hover" aria-hidden="true">
          <a href="${p.live}" target="_blank" rel="noopener noreferrer" class="ph-btn" onclick="event.stopPropagation()" aria-label="View ${p.title} live">🔗 View</a>
          <a href="${p.github}" target="_blank" rel="noopener noreferrer" class="ph-btn" onclick="event.stopPropagation()" aria-label="View ${p.title} source code">⬡ Code</a>
        </div>
      </div>
      <div class="pj-body">
        <div class="pj-cat">${p.cat}</div>
        <h3 class="pj-t">${p.title}</h3>
        <p class="pj-d">${p.desc}</p>
        <div class="pj-tags" aria-label="Technologies used">${p.tech.map(t => `<span class="ptag">${t}</span>`).join('')}</div>
      </div>
    </article>`).join('');

  /* tilt effect */
  if (window.matchMedia('(hover:hover)').matches) {
    g.querySelectorAll('.pj-card').forEach(card => {
      card.addEventListener('mousemove', e => {
        const r = card.getBoundingClientRect(),
          x = (e.clientX - r.left - r.width / 2) / r.width,
          y = (e.clientY - r.top - r.height / 2) / r.height;
        card.style.transform = `perspective(900px) rotateY(${x * 10}deg) rotateX(${-y * 8}deg) translateY(-8px)`;
      });
      card.addEventListener('mouseleave', () => card.style.transform = '');
    });
  }
  gsap.fromTo('.pj-card', {opacity: 0, y: 28}, {opacity: 1, y: 0, duration: .5, stagger: .09, ease: 'power2.out'});
}
renderProjects();

document.querySelectorAll('.fp').forEach(p => {
  p.addEventListener('click', function() {
    document.querySelectorAll('.fp').forEach(x => { x.classList.remove('on'); x.setAttribute('aria-pressed', 'false'); });
    this.classList.add('on');
    this.setAttribute('aria-pressed', 'true');
    activeCat = this.dataset.c;
    gsap.to('.pj-card', {opacity: 0, y: 16, scale: .97, duration: .2, stagger: .04, onComplete: renderProjects});
  });
});

/* ─── MODAL ─── */
function openModal(id) {
  const p = PJS.find(x => x.id === id);
  if (!p) return;
  document.getElementById('m-img').src = p.img;
  document.getElementById('m-img').alt = p.title + ' project image';
  document.getElementById('m-cat').textContent = p.cat;
  document.getElementById('m-title').textContent = p.title;
  document.getElementById('m-desc').textContent = p.full;
  document.getElementById('m-hl').innerHTML = p.hl.map(h => `<div class="hl-i">${h}</div>`).join('');
  document.getElementById('m-tags').innerHTML = p.tech.map(t => `<span class="ptag">${t}</span>`).join('');
  document.getElementById('m-live').href = p.live;
  document.getElementById('m-git').href = p.github;
  const modal = document.getElementById('modal');
  modal.classList.add('show');
  modal.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
  document.getElementById('m-close-btn').focus();
}

function closeModal(e) {
  if (e.target === document.getElementById('modal')) closeModalBtn();
}

function closeModalBtn() {
  const modal = document.getElementById('modal');
  modal.classList.remove('show');
  modal.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}

document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeModalBtn();
});

/* ─── CONTACT FORM ─── */
async function submitForm(e) {
  e.preventDefault();
  const btn = document.getElementById('fsub');
  const name = document.getElementById('f-name').value.trim();
  const email = document.getElementById('f-email').value.trim();
  const msg = document.getElementById('f-msg').value.trim();
  if (!name || !email || !msg) { showToast('Please fill in all fields.', true); return; }
  btn.textContent = 'Sending';
  btn.classList.add('sending');
  btn.disabled = true;
  try {
    const fd = new FormData();
    fd.append('name', name); fd.append('email', email); fd.append('message', msg);
    fd.append('_subject', 'New message from your portfolio!');
    fd.append('_captcha', 'false');
    const res = await fetch('https://formsubmit.co/hussein27007@gmail.com', {
      method: 'POST', body: fd, headers: {Accept: 'application/json'}
    });
    if (res.ok) {
      showToast('✓ Message sent! I\'ll reply soon.');
      document.getElementById('cform').reset();
      document.getElementById('fct').textContent = '0';
      /* confetti */
      for (let i = 0; i < 30; i++) {
        const p = document.createElement('div');
        p.style.cssText = `position:fixed;width:7px;height:7px;border-radius:50%;left:${45 + Math.random() * 10}%;bottom:25%;background:hsl(${Math.random() * 60 + 150},80%,55%);pointer-events:none;z-index:900;`;
        document.body.appendChild(p);
        gsap.to(p, {y: -(180 + Math.random() * 200), x: (Math.random() - .5) * 200, opacity: 0, duration: 1.2 + Math.random() * .8, ease: 'power2.out', onComplete: () => p.remove()});
      }
    } else {
      window.location.href = `mailto:hussein27007@gmail.com?subject=Message from ${encodeURIComponent(name)}&body=${encodeURIComponent(msg + '\n\nFrom: ' + email)}`;
      showToast('Opening your email app…');
    }
  } catch (err) {
    window.location.href = `mailto:hussein27007@gmail.com?subject=Message from ${encodeURIComponent(name)}&body=${encodeURIComponent(msg + '\n\nFrom: ' + email)}`;
    showToast('Opening your email app…');
  }
  btn.textContent = 'Send Message →';
  btn.classList.remove('sending');
  btn.disabled = false;
}

/* ─── REVEAL OBSERVER ─── */
const rObs = new IntersectionObserver(
  en => en.forEach(e => { if (e.isIntersecting) e.target.classList.add('in'); }),
  {threshold: .12}
);
document.querySelectorAll('.rv,.rv-l,.rv-r').forEach(el => rObs.observe(el));

/* ─── TIMELINE OBSERVER ─── */
const tlEls = document.querySelectorAll('.tl-i');
const tlContainer = document.querySelector('.tl');
if (tlContainer) {
  new IntersectionObserver(en => {
    en.forEach(e => {
      if (e.isIntersecting) {
        tlEls.forEach((el, i) => setTimeout(() => el.classList.add('in'), i * 150));
      }
    });
  }, {threshold: .2}).observe(tlContainer);
}
