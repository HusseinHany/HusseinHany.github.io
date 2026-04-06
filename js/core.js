/* ─── GSAP SETUP ─── */
gsap.registerPlugin(ScrollTrigger);

/* ─── HERO ENTRANCE ─── */
window.addEventListener('load', () => {
  /* Set profile photo */
  try { document.getElementById('pimg').src = IMG_PHOTO; } catch(e) {}

  /* Orbs fade in */
  gsap.to('.orb', {opacity: 1, duration: 2.8, stagger: .45, ease: 'power2.out'});

  /* Sequence */
  const seq = [
    ['#hbadge', .3,  {opacity: 1, y: 0,  duration: .7, ease: 'back.out(1.7)'}],
    ['#hname',  .55, {opacity: 1, y: 0,  duration: .9, ease: 'power3.out'}],
    ['#hrole',  1,   {opacity: 1,         duration: .6}],
    ['#htype',  1.3, {opacity: 1,         duration: .5}],
    ['#hctas',  1.6, {opacity: 1, y: 0,  duration: .7, ease: 'back.out(1.4)'}],
    ['#hstats', 1.9, {opacity: 1,         duration: .7}],
    ['#hphoto', .5,  {opacity: 1, x: 0,  duration: 1,  ease: 'power3.out'}],
  ];
  seq.forEach(([el, d, v]) => gsap.to(el, {...v, delay: d}));

  /* Counters */
  document.querySelectorAll('.stat-n').forEach(el => {
    const t = +el.dataset.t;
    gsap.to({v: 0}, {v: t, duration: 2.4, delay: 2.1, ease: 'power2.out',
      onUpdate: function() { el.textContent = Math.round(this.targets()[0].v) + '+'; }
    });
  });

  /* Typewriter */
  const msgs = [
    'Turning raw data into strategic insights',
    'Building robust C++ systems that scale',
    'From data\'s maze to clarity\'s blaze',
    'Bridging engineering & analytics'
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
  setTimeout(type, 2100);

  /* ─── SCROLLTRIGGER SECTION ANIMATIONS ─── */
  /* About section */
  ScrollTrigger.create({
    trigger: '#about',
    start: 'top 80%',
    onEnter: () => {
      gsap.fromTo('#about .eyebrow, #about .sec-h, #about .divider, #about .bio',
        {opacity: 0, y: 24},
        {opacity: 1, y: 0, duration: .7, stagger: .12, ease: 'power3.out', overwrite: 'auto'}
      );
    }
  });

  /* Skills bars section */
  ScrollTrigger.create({
    trigger: '#sbars',
    start: 'top 82%',
    onEnter: () => {
      gsap.fromTo('#sbars .bars-card',
        {opacity: 0, y: 32},
        {opacity: 1, y: 0, duration: .7, ease: 'power3.out'}
      );
    }
  });

  /* Projects section */
  ScrollTrigger.create({
    trigger: '#projects',
    start: 'top 82%',
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

/* ─── PARALLAX ─── */
window.addEventListener('mousemove', e => {
  if (!window.matchMedia('(hover:hover)').matches) return;
  const xp = (e.clientX / innerWidth - .5) * 16;
  const yp = (e.clientY / innerHeight - .5) * 12;
  gsap.to('.o1', {x: xp * .7,   y: yp * .5,  duration: 3.2, ease: 'power2.out'});
  gsap.to('.o2', {x: -xp * .5,  y: -yp * .4, duration: 3.8, ease: 'power2.out'});
  gsap.to('.o3', {x: xp * .35,  y: yp * .7,  duration: 2.4, ease: 'power2.out'});
}, {passive: true});
