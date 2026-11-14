/* ─── GSAP SETUP ─── */
/* hasGsap/hasScrollTrigger (from utils.js) guard against a blocked/failed CDN
   load, so hero content isn't left permanently invisible. */
if (hasScrollTrigger) gsap.registerPlugin(ScrollTrigger);

/* ─── HERO ENTRANCE ─── */
window.addEventListener('load', () => {
  /* Set profile photo */
  try { document.getElementById('pimg').src = IMG_PHOTO; } catch(e) {}
  try { document.getElementById('aimg').src = IMG_PHOTO; } catch(e) {}

  if (!hasGsap) {
    document.querySelectorAll('.orb,#hbadge,#hname,#hrole,#htype,#hctas,#hstats,#hphoto')
      .forEach(el => { el.style.opacity = '1'; el.style.transform = 'none'; });
    document.querySelectorAll('.stat-n').forEach(el => { el.textContent = (+el.dataset.t) + '+'; });
  } else {
  /* Orbs fade in */
  gsap.to('.orb', {opacity: 1, duration: 2.8, stagger: .45, ease: 'power2.out'});

  /* Sequence */
  const seq = [
    ['#hbadge', .1,  {opacity: 1, y: 0,  duration: .7, ease: 'back.out(1.7)'}],
    ['#hname',  .2, {opacity: 1, y: 0,  duration: .9, ease: 'power3.out'}],
    ['#hrole',  .45,   {opacity: 1,         duration: .6}],
    ['#htype',  .6, {opacity: 1,         duration: .5}],
    ['#hctas',  .7, {opacity: 1, y: 0,  duration: .7, ease: 'back.out(1.4)'}],
    ['#hstats', .85, {opacity: 1,         duration: .7}],
    ['#hphoto', .2,  {opacity: 1, x: 0,  duration: 1,  ease: 'power3.out'}],
  ];
  seq.forEach(([el, d, v]) => gsap.to(el, {...v, delay: d}));

  /* Counters */
  document.querySelectorAll('.stat-n').forEach(el => {
    const t = +el.dataset.t;
    gsap.to({v: 0}, {v: t, duration: 1.4, delay: .9, ease: 'power2.out',
      onUpdate: function() { el.textContent = Math.round(this.targets()[0].v) + '+'; }
    });
  });
  }

  /* Typewriter */
  const msgs = [
    'Building full-stack apps that actually ship',
    'MEVN stack — from API to UI',
    'Vue.js on the front, Node.js in the back',
    'Clean code. Fast products. Real results.'
  ];
  let mi = 0, ci = 0, del = false;
  const typed = document.getElementById('typed');
  function type() {
    const s = msgs[mi];
    if (!del) {
      typed.textContent = s.slice(0, ++ci);
      if (ci === s.length) { del = true; setTimeout(type, 2400); return; }
    } else {
      typed.textContent = s.slice(0, --ci);
      if (ci === 0) { del = false; mi = (mi + 1) % msgs.length; setTimeout(type, 400); return; }
    }
    setTimeout(type, del ? 36 : 65);
  }
  setTimeout(type, 900);

  if (!hasScrollTrigger) return;

  /* ─── SCROLLTRIGGER SECTION ANIMATIONS ─── */
  /* About section */
  ScrollTrigger.create({
    trigger: '#about',
    start: 'top 80%',
    once: true,
    onEnter: () => {
      gsap.fromTo('#about .eyebrow',
        {opacity: 0, y: 16},
        {opacity: 1, y: 0, duration: .55, ease: 'power3.out', overwrite: 'auto'}
      );
      gsap.fromTo('#about .about-avatar-wrap',
        {opacity: 0, scale: .82},
        {opacity: 1, scale: 1, duration: .65, delay: .1, ease: 'back.out(1.6)', overwrite: 'auto'}
      );
      gsap.fromTo('#about .sec-h, #about .divider, #about .bio',
        {opacity: 0, y: 24},
        {opacity: 1, y: 0, duration: .7, stagger: .12, delay: .2, ease: 'power3.out', overwrite: 'auto'}
      );
      gsap.fromTo('#about .about-chip',
        {opacity: 0, y: 12, scale: .9},
        {opacity: 1, y: 0, scale: 1, duration: .45, stagger: .08, delay: .55, ease: 'back.out(1.5)', overwrite: 'auto'}
      );
    }
  });

  /* Skills section */
  ScrollTrigger.create({
    trigger: '#skills',
    start: 'top 82%',
    once: true,
    onEnter: () => {
      gsap.fromTo('#skills .sk-group',
        {opacity: 0, y: 28},
        {opacity: 1, y: 0, duration: .6, stagger: .12, ease: 'power3.out'}
      );
      gsap.fromTo('#skills .bars-card',
        {opacity: 0, y: 32},
        {opacity: 1, y: 0, duration: .7, delay: .4, ease: 'power3.out'}
      );
    }
  });

  /* Projects section */
  ScrollTrigger.create({
    trigger: '#projects',
    start: 'top 82%',
    once: true,
    onEnter: () => {
      gsap.fromTo('#projects .rv',
        {opacity: 0, y: 28},
        {opacity: 1, y: 0, duration: .7, stagger: .1, ease: 'power3.out', overwrite: 'auto'}
      );
    }
  });

  /* Contact section */
  ScrollTrigger.create({
    trigger: '#contact',
    start: 'top 82%',
    once: true,
    onEnter: () => {
      gsap.fromTo('#contact .rv-l',
        {opacity: 0, x: -28},
        {opacity: 1, x: 0, duration: .75, ease: 'power3.out', overwrite: 'auto'}
      );
      gsap.fromTo('#contact .rv-r',
        {opacity: 0, x: 28},
        {opacity: 1, x: 0, duration: .75, ease: 'power3.out', delay: .15, overwrite: 'auto'}
      );
    }
  });
});
