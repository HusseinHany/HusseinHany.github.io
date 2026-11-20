/* ─── SCROLL: PROGRESS BAR, NAV STATE & BACK-TO-TOP ─── */
(function initScroll() {
  const prog = document.getElementById('prog');
  const nav = document.getElementById('nav');
  const backTop = document.getElementById('back-top');
  let ticking = false;
  const update = () => {
    ticking = false;
    const scrolled = window.scrollY;
    const total = document.documentElement.scrollHeight - window.innerHeight;
    if (prog) prog.style.transform = `scaleX(${total > 0 ? Math.min(1, scrolled / total) : 0})`;
    if (nav) nav.classList.toggle('scrolled', scrolled > 60);
    if (backTop) backTop.classList.toggle('show', scrolled > 500);
  };
  window.addEventListener('scroll', () => {
    if (!ticking) { ticking = true; requestAnimationFrame(update); }
  }, {passive: true});
})();

/* ─── NAV: MOBILE MENU ─── */
function getMenuElements() {
  return {
    hbg: document.getElementById('hbg'),
    mm: document.getElementById('mob-menu')
  };
}

function isMenuOpen() {
  const {hbg, mm} = getMenuElements();
  return !!(hbg && mm && hbg.classList.contains('open') && mm.classList.contains('open'));
}

function toggleMenu() {
  const {hbg, mm} = getMenuElements();
  if (!hbg || !mm) return;
  const nextOpen = !isMenuOpen();
  hbg.classList.toggle('open', nextOpen);
  hbg.setAttribute('aria-expanded', String(nextOpen));
  mm.classList.toggle('open', nextOpen);
  mm.setAttribute('aria-hidden', String(!nextOpen));
  document.body.style.overflow = nextOpen ? 'hidden' : '';
  if (nextOpen) {
    mm.querySelectorAll('a').forEach((a, i) => {
      a.style.transitionDelay = (i * .035 + .05) + 's';
    });
    /* Focus first menu link for keyboard accessibility */
    setTimeout(() => mm.querySelector('a')?.focus(), 300);
  }
}

function closeMenu() {
  const {hbg, mm} = getMenuElements();
  if (!hbg || !mm) return;
  hbg.classList.remove('open');
  hbg.setAttribute('aria-expanded', 'false');
  mm.classList.remove('open');
  mm.setAttribute('aria-hidden', 'true');
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

/* ─── SKILLS → PROJECTS ─── */
/* A skill chip is a button only when at least one project uses that skill:
   clicking it shows those projects. */
const SKILL_MATCH = {
  'SQL': ['SQL', 'SQL Server'], 'Excel': ['Excel', 'Pivot Tables'], 'Algorithms': ['Algorithms', 'Sorting'],
  'OOP': ['OOP', 'Inheritance'], 'Data Cleaning': ['pandas'], 'Jupyter': ['pandas']
};
let activeSkill = null;

function projectsUsing(skill) {
  const terms = SKILL_MATCH[skill] || [skill];
  return PJS.filter(p => p.tech.some(t => terms.includes(t)));
}

function skillChip(s) {
  const n = projectsUsing(s.n).length;
  const inner = `<span class="sk-icon" aria-hidden="true">${s.i}</span><span>${s.n}</span>`;
  if (!n) return `<div class="sk-chip">${inner}</div>`;
  return `<button type="button" class="sk-chip sk-link" onclick="showSkill('${s.n.replace(/'/g, "\\'")}')"
    aria-label="Show the ${n} project${n === 1 ? '' : 's'} that use ${s.n}" title="See the ${n} project${n === 1 ? '' : 's'} that use ${s.n}">${inner}<span class="sk-n">${n}</span></button>`;
}

function setCategoryPill(cat) {
  document.querySelectorAll('.fp[data-c]').forEach(x => {
    const on = x.dataset.c === cat;
    x.classList.toggle('on', on);
    x.setAttribute('aria-pressed', String(on));
  });
}

function showSkill(skill) {
  activeSkill = skill;
  activeCat = 'All';
  setCategoryPill('All');
  const pill = document.getElementById('fp-skill');
  if (pill) {
    pill.hidden = false;
    pill.innerHTML = `Using ${skill} <span aria-hidden="true">✕</span>`;
    pill.setAttribute('aria-label', `Showing projects that use ${skill}. Click to show all projects.`);
  }
  renderProjects();
  goTo('projects');
}

function clearSkill() {
  activeSkill = null;
  const pill = document.getElementById('fp-skill');
  if (pill) pill.hidden = true;
  renderProjects();
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
  if (chips.length && hasGsap) {
    gsap.fromTo('.sk-chip',
      {opacity: 0, scale: .82, y: 12},
      {opacity: 1, scale: 1, y: 0, duration: .25, stagger: .025, ease: 'power2.out'}
    );
  }
}

function renderSkillTab() {
  document.getElementById('tab-c').innerHTML =
    `<div class="sk-grid">${TABS[curTab].s.map(s =>
      skillChip(s)
    ).join('')}</div>`;
}
renderSkillTab();

/* ─── SKILL GROUPS (dedicated skills section) ─── */
function renderSkillGroups() {
  const container = document.getElementById('sk-groups-wrap');
  if (!container) return;
  container.innerHTML = SKILL_GROUPS.map(g => `
    <div class="sk-group">
      <div class="sk-group-hdr">${g.title}</div>
      <div class="sk-grid">${g.skills.map(s =>
        skillChip(s)
      ).join('')}</div>
    </div>`
  ).join('');
}
renderSkillGroups();

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
function barLevel(p) { return p + (p === 1 ? ' project' : ' projects'); }
(function initBars() {
  const w = document.getElementById('bars-w');
  if (!w) return;
  const total = PJS.length;
  const counted = BARS.map(b => ({...b, p: PJS.filter(pr => pr.tech.some(t => b.match.includes(t))).length}))
    .sort((a, b) => b.p - a.p);
  w.innerHTML = counted.map(b =>
    `<div class="bar-row">
      <div class="bar-n">${b.n}</div>
      <div class="bar-t" role="img" aria-label="${b.n}: ${barLevel(b.p)}">
        <div class="bar-f" data-p="${b.p / total}" style="background:linear-gradient(90deg,${b.c},var(--gold))"></div>
      </div>
      <div class="bar-p">${barLevel(b.p)}</div>
    </div>`
  ).join('');
  const barsCard = document.querySelector('.bars-card');
  if (!barsCard) return;
  const barsObserver = new IntersectionObserver(en => {
    en.forEach(e => {
      if (e.isIntersecting) {
        document.querySelectorAll('.bar-f').forEach((el, i) =>
          setTimeout(() => { el.style.transform = `scaleX(${el.dataset.p})`; }, i * 75)
        );
        barsObserver.disconnect();
      }
    });
  }, {threshold: .3});
  barsObserver.observe(barsCard);
})();

/* ─── PROJECTS ─── */
let activeCat = 'All';
let projectImageObserver = null;

function imageFallbackSrc(label) {
  const safeLabel = String(label || 'Image unavailable')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 360"><rect width="640" height="360" fill="#0f141f"/><text x="50%" y="50%" fill="#9ca3af" font-family="Arial, sans-serif" font-size="20" text-anchor="middle" dominant-baseline="middle">${safeLabel}</text></svg>`)}`;
}

function applyImageFallback(img, label) {
  if (!img) return;
  img.onerror = null;
  img.src = imageFallbackSrc(label);
}

function initProjectImages(scope) {
  const root = scope || document;
  const imgs = root.querySelectorAll('.pj-img[data-src]');
  if (!imgs.length) return;
  if (projectImageObserver) projectImageObserver.disconnect();
  const loadImg = img => {
    if (!img || !img.dataset.src) return;
    img.onerror = () => applyImageFallback(img, img.dataset.fallbackLabel || 'Project preview unavailable');
    img.src = img.dataset.src;
    img.removeAttribute('data-src');
  };
  if (!('IntersectionObserver' in window)) {
    imgs.forEach(loadImg);
    return;
  }
  projectImageObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        loadImg(entry.target);
        projectImageObserver.unobserve(entry.target);
      }
    });
  }, {rootMargin: '120px 0px'});
  imgs.forEach(img => projectImageObserver.observe(img));
}

function renderProjects() {
  const list = visibleProjects();
  const g = document.getElementById('pj-g');
  if (!g) return;
  g.innerHTML = list.map(p => `
    <article class="pj-card" onclick="openModal(${p.id})" tabindex="0"
      role="button" aria-label="View details for ${p.title}"
      onkeydown="if(event.key==='Enter'||event.key===' ')openModal(${p.id})">
      ${p.feat ? '<div class="feat-b" aria-label="Featured project">★ Featured</div>' : ''}
      <div class="pj-img-w">
        <img src="${imageFallbackSrc('Loading project preview…')}" data-src="${p.img}" data-fallback-label="${p.title} preview unavailable" alt="${p.title} project preview" class="pj-img" loading="lazy" decoding="async"/>
        <div class="pj-hover" aria-hidden="true">
          <span class="ph-btn">View details</span>
          ${p.live ? `<a href="${p.live}" target="_blank" rel="noopener noreferrer" class="ph-btn" onclick="event.stopPropagation()" aria-label="Open the live ${p.title}">↗ Live</a>` : ''}
          ${p.demo ? `<button type="button" class="ph-btn" onclick="event.stopPropagation();openModal(${p.id},true)" aria-label="Watch the ${p.title} demo">▶ Demo</button>` : ''}
          ${p.github ? `<a href="${p.github}" target="_blank" rel="noopener noreferrer" class="ph-btn" onclick="event.stopPropagation()" aria-label="View ${p.title} source code">⬡ Code</a>` : ''}
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
  if (window.matchMedia('(hover:hover) and (prefers-reduced-motion:no-preference)').matches) {
    g.querySelectorAll('.pj-card').forEach(card => {
      let frame = 0, ev = null;
      const apply = () => {
        frame = 0;
        const r = card.getBoundingClientRect(),
          px = (ev.clientX - r.left) / r.width, py = (ev.clientY - r.top) / r.height;
        card.style.setProperty('--mx', (px * 100) + '%');
        card.style.setProperty('--my', (py * 100) + '%');
        card.style.transform = `perspective(1000px) rotateY(${(px - .5) * 7}deg) rotateX(${(.5 - py) * 6}deg) translateY(-8px)`;
      };
      card.addEventListener('mousemove', e => { ev = e; if (!frame) frame = requestAnimationFrame(apply); });
      card.addEventListener('mouseenter', () => card.classList.add('tilting'));
      card.addEventListener('mouseleave', () => {
        cancelAnimationFrame(frame); frame = 0;
        card.classList.remove('tilting');
        card.style.transform = '';
      });
    });
  }
  initProjectImages(g);
  if (hasGsap) gsap.fromTo('.pj-card', {opacity: 0, y: 28}, {opacity: 1, y: 0, duration: .3, stagger: .04, ease: 'power2.out'});
}
renderProjects();

/* how many projects each filter shows */
document.querySelectorAll('.fp[data-c]').forEach(p => {
  const n = p.dataset.c === 'All' ? PJS.length : PJS.filter(x => x.cat === p.dataset.c).length;
  p.insertAdjacentHTML('beforeend', ` <span class="fp-n">${n}</span>`);
  p.setAttribute('aria-label', `${p.dataset.c}: ${n} project${n === 1 ? '' : 's'}`);
});

document.querySelectorAll('.fp[data-c]').forEach(p => {
  p.addEventListener('click', function() {
    setCategoryPill(this.dataset.c);
    activeCat = this.dataset.c;
    activeSkill = null;
    const pill = document.getElementById('fp-skill');
    if (pill) pill.hidden = true;
    if (hasGsap) {
      gsap.to('.pj-card', {opacity: 0, duration: .1, onComplete: renderProjects});
    } else {
      renderProjects();
    }
  });
});

/* ─── MODAL ─── */
let modalLastFocused = null;

function getModalFocusable(modal) {
  if (!modal) return [];
  return [...modal.querySelectorAll('a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])')]
    .filter(el => !el.hasAttribute('hidden'));
}

let modalId = null;

function visibleProjects() {
  let list = activeCat === 'All' ? PJS : PJS.filter(p => p.cat === activeCat);
  if (activeSkill) {
    const using = projectsUsing(activeSkill);
    list = list.filter(p => using.includes(p));
  }
  return list;
}

function fillModal(p, playDemo) {
  modalId = p.id;
  const img = document.getElementById('m-img');
  img.alt = p.title + ' project image';
  img.onerror = () => applyImageFallback(img, p.title + ' image unavailable');
  img.src = p.img;
  document.getElementById('m-cat').textContent = p.cat;
  document.getElementById('m-title').textContent = p.title;
  document.getElementById('m-desc').textContent = p.full;
  document.getElementById('m-hl').innerHTML = p.hl.map(h => `<div class="hl-i">${h}</div>`).join('');
  document.getElementById('m-tags').innerHTML = p.tech.map(t => `<span class="ptag">${t}</span>`).join('');

  /* Only buttons that lead somewhere real are shown */
  const live = document.getElementById('m-live');
  live.hidden = !p.live;
  if (p.live) live.href = p.live;
  const git = document.getElementById('m-git');
  git.hidden = !p.github;
  if (p.github) git.href = p.github;
  document.getElementById('m-demo-btn').hidden = !p.demo;
  document.getElementById('m-btns').hidden = !p.live && !p.github && !p.demo;
  showDemo(false);
  if (playDemo && p.demo) showDemo(true);

  /* previous / next within the projects currently shown */
  const list = visibleProjects();
  const i = Math.max(0, list.findIndex(x => x.id === p.id));
  const prev = list[(i - 1 + list.length) % list.length], next = list[(i + 1) % list.length];
  const nav = document.querySelector('.m-nav');
  nav.hidden = list.length < 2;
  document.getElementById('m-prev-t').textContent = prev.title;
  document.getElementById('m-next-t').textContent = next.title;
  document.getElementById('m-prev').setAttribute('aria-label', 'Previous project: ' + prev.title);
  document.getElementById('m-next').setAttribute('aria-label', 'Next project: ' + next.title);
  document.getElementById('m-count').textContent = `${i + 1} / ${list.length}`;
}

/* The demo is the real terminal recording, played in place of the cover */
function showDemo(on) {
  const p = PJS.find(x => x.id === modalId);
  const demo = document.getElementById('m-demo'), img = document.getElementById('m-img');
  const lbl = document.getElementById('m-demo-lbl');
  if (!demo || !img) return;
  if (on && p && p.demo) {
    demo.alt = 'Recording of ' + p.title + ' running in a terminal';
    demo.src = p.demo + '#t=' + Date.now();   /* a fresh load starts the recording from the beginning */
    demo.hidden = false; img.hidden = true;
    if (lbl) lbl.textContent = '■ Show the cover';
  } else {
    demo.hidden = true; demo.removeAttribute('src'); img.hidden = false;
    if (lbl) lbl.textContent = '▶ Watch the demo';
  }
}

function toggleDemo() {
  const on = document.getElementById('m-demo').hidden;
  showDemo(on);
  if (on) document.querySelector('.mbox').scrollTo({top: 0, behavior: 'smooth'});
}

function stepModal(dir) {
  const list = visibleProjects();
  if (list.length < 2) return;
  const i = list.findIndex(x => x.id === modalId);
  const next = list[(i + dir + list.length) % list.length];
  const box = document.querySelector('.mbox');
  box.classList.remove('swap-l', 'swap-r');
  void box.offsetWidth;   /* restart the slide animation */
  box.classList.add(dir > 0 ? 'swap-r' : 'swap-l');
  fillModal(next, false);
  box.scrollTop = 0;
}

function openModal(id, playDemo = false) {
  const p = PJS.find(x => x.id === id);
  const modal = document.getElementById('modal');
  if (!p || !modal) return;
  fillModal(p, playDemo);
  modalLastFocused = document.activeElement instanceof HTMLElement ? document.activeElement : null;
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
  if (!modal) return;
  modal.classList.remove('show');
  modal.setAttribute('aria-hidden', 'true');
  showDemo(false);
  document.body.style.overflow = '';
  if (modalLastFocused && typeof modalLastFocused.focus === 'function') modalLastFocused.focus();
  modalLastFocused = null;
}

document.addEventListener('keydown', e => {
  const modal = document.getElementById('modal');
  if (!modal || modal.getAttribute('aria-hidden') !== 'false') return;
  if (e.key === 'Escape') {
    closeModalBtn();
    return;
  }
  if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
    e.preventDefault();
    stepModal(e.key === 'ArrowRight' ? 1 : -1);
    return;
  }
  if (e.key !== 'Tab') return;
  const focusable = getModalFocusable(modal);
  if (!focusable.length) {
    e.preventDefault();
    return;
  }
  const first = focusable[0];
  const last = focusable[focusable.length - 1];
  const active = document.activeElement;
  if (e.shiftKey && active === first) {
    e.preventDefault();
    last.focus();
  } else if (!e.shiftKey && active === last) {
    e.preventDefault();
    first.focus();
  }
});

/* ─── CONTACT FORM ─── */
let confettiParticles = [];

function getContactEmail() {
  return typeof CONTACT_EMAIL === 'string' && CONTACT_EMAIL ? CONTACT_EMAIL : 'hussein27007@gmail.com';
}

function clearConfetti() {
  confettiParticles.forEach(p => {
    if (hasGsap) gsap.killTweensOf(p);
    p.remove();
  });
  confettiParticles = [];
}

function openMailtoFallback(name, email, msg) {
  window.location.href = `mailto:${encodeURIComponent(getContactEmail())}?subject=Message from ${encodeURIComponent(name)}&body=${encodeURIComponent(msg + '\n\nFrom: ' + email)}`;
  showToast('Opening your email app…');
}

async function submitForm(e) {
  e.preventDefault();
  const btn = document.getElementById('fsub');
  const name = document.getElementById('f-name').value.trim();
  const email = document.getElementById('f-email').value.trim();
  const msg = document.getElementById('f-msg').value.trim();
  if (!name || !email || !msg) { showToast('Please fill in all fields.', true); return; }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) { showToast('Please enter a valid email address.', true); document.getElementById('f-email').focus(); return; }
  btn.textContent = 'Sending';
  btn.classList.add('sending');
  btn.disabled = true;
  clearConfetti();
  try {
    const fd = new FormData();
    fd.append('name', name); fd.append('email', email); fd.append('message', msg);
    fd.append('_subject', 'New message from your portfolio!');
    fd.append('_captcha', 'false');
    /* The AJAX endpoint answers with JSON, so "sent" is only shown when FormSubmit confirms it */
    const res = await fetch(`https://formsubmit.co/ajax/${encodeURIComponent(getContactEmail())}`, {
      method: 'POST', body: fd, headers: {Accept: 'application/json'}
    });
    const data = await res.json().catch(() => ({}));
    if (res.ok && String(data.success) === 'true') {
      showToast('✓ Message sent! I\'ll reply soon.');
      document.getElementById('cform').reset();
      document.getElementById('fct').textContent = '0';
      /* confetti */
      for (let i = 0; i < 30; i++) {
        const p = document.createElement('div');
        p.style.cssText = `position:fixed;width:7px;height:7px;border-radius:50%;left:${45 + Math.random() * 10}%;bottom:25%;background:hsl(${Math.random() * 60 + 150},80%,55%);pointer-events:none;z-index:900;`;
        document.body.appendChild(p);
        confettiParticles.push(p);
        if (hasGsap) {
          gsap.to(p, {
            y: -(180 + Math.random() * 200),
            x: (Math.random() - .5) * 200,
            opacity: 0,
            duration: 1.2 + Math.random() * .8,
            ease: 'power2.out',
            onComplete: () => {
              p.remove();
              confettiParticles = confettiParticles.filter(item => item !== p);
            }
          });
        } else {
          setTimeout(() => {
            p.remove();
            confettiParticles = confettiParticles.filter(item => item !== p);
          }, 1200);
        }
      }
    } else {
      clearConfetti();
      openMailtoFallback(name, email, msg);
    }
  } catch (err) {
    clearConfetti();
    openMailtoFallback(name, email, msg);
  } finally {
    btn.textContent = 'Send Message →';
    btn.classList.remove('sending');
    btn.disabled = false;
  }
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
  const tlObserver = new IntersectionObserver(en => {
    en.forEach(e => {
      if (e.isIntersecting) {
        tlEls.forEach((el, i) => setTimeout(() => el.classList.add('in'), i * 150));
        tlObserver.disconnect();
      }
    });
  }, {threshold: .2});
  tlObserver.observe(tlContainer);
}

/* ─── NAV: HIGHLIGHT THE SECTION ON SCREEN ─── */
(function initScrollSpy() {
  const links = [...document.querySelectorAll('.nav-links a[href^="#"]:not(.nav-hire)')];
  const sections = links.map(a => document.querySelector(a.getAttribute('href'))).filter(Boolean);
  if (!sections.length) return;
  const spy = new IntersectionObserver(entries => {
    entries.forEach(en => {
      if (!en.isIntersecting) return;
      links.forEach(a => {
        const on = a.getAttribute('href') === '#' + en.target.id;
        a.classList.toggle('on', on);
        if (on) a.setAttribute('aria-current', 'true'); else a.removeAttribute('aria-current');
      });
    });
  }, {rootMargin: '-45% 0px -50% 0px'});
  sections.forEach(sec => spy.observe(sec));
})();

/* ─── MAGNETIC CALL-TO-ACTION BUTTONS ─── */
if (window.matchMedia('(hover:hover) and (prefers-reduced-motion:no-preference)').matches) {
  document.querySelectorAll('.hero-ctas .btn-p, .hero-ctas .btn-o').forEach(btn => {
    btn.addEventListener('mousemove', e => {
      const r = btn.getBoundingClientRect();
      btn.style.transform = `translate(${(e.clientX - r.left - r.width / 2) * .18}px, ${(e.clientY - r.top - r.height / 2) * .28 - 3}px)`;
    });
    btn.addEventListener('mouseleave', () => { btn.style.transform = ''; });
  });
}

/* ─── MODAL: SWIPE BETWEEN PROJECTS ON TOUCH SCREENS ─── */
(function initModalSwipe() {
  const box = document.querySelector('.mbox');
  if (!box) return;
  let x0 = null, y0 = 0;
  box.addEventListener('touchstart', e => { x0 = e.touches[0].clientX; y0 = e.touches[0].clientY; }, {passive: true});
  box.addEventListener('touchend', e => {
    if (x0 === null) return;
    const dx = e.changedTouches[0].clientX - x0, dy = e.changedTouches[0].clientY - y0;
    x0 = null;
    if (Math.abs(dx) > 70 && Math.abs(dy) < 50) stepModal(dx < 0 ? 1 : -1);
  }, {passive: true});
})();
