/* Nav, scroll reveals, accordion, section highlighting. No dependencies. */
(() => {
  'use strict';
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* --- Mobile nav --- */
  const nav = document.querySelector('.nav');
  const burger = document.querySelector('.nav__burger');
  if (nav && burger) {
    burger.addEventListener('click', () => {
      const open = nav.dataset.open === 'true';
      nav.dataset.open = String(!open);
      burger.setAttribute('aria-expanded', String(!open));
    });
    nav.querySelectorAll('.nav__link').forEach(a =>
      a.addEventListener('click', () => {
        nav.dataset.open = 'false';
        burger.setAttribute('aria-expanded', 'false');
      })
    );
  }

  /* --- Hairline under nav once scrolled --- */
  if (nav) {
    const onScroll = () => nav.classList.toggle('is-stuck', window.scrollY > 8);
    addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* --- Reveal on enter --- */
  const targets = document.querySelectorAll('[data-reveal]');
  if (reduce || !('IntersectionObserver' in window)) {
    targets.forEach(el => el.classList.add('is-in'));
  } else {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (!e.isIntersecting) return;
        const d = Number(e.target.dataset.reveal) || 0;
        setTimeout(() => e.target.classList.add('is-in'), d * 80);
        io.unobserve(e.target);
      });
    }, { rootMargin: '0px 0px -12% 0px', threshold: 0.05 });
    targets.forEach(el => io.observe(el));
  }

  /* --- Accordion (one open at a time) --- */
  document.querySelectorAll('.acc').forEach(acc => {
    const items = [...acc.querySelectorAll('.acc__item')];
    items.forEach(item => {
      const btn = item.querySelector('.acc__btn');
      const panel = item.querySelector('.acc__panel');
      if (!btn || !panel) return;
      btn.addEventListener('click', () => {
        const open = item.dataset.open === 'true';
        items.forEach(other => {
          other.dataset.open = 'false';
          other.querySelector('.acc__btn')?.setAttribute('aria-expanded', 'false');
          other.querySelector('.acc__panel')?.setAttribute('inert', '');
        });
        if (!open) {
          item.dataset.open = 'true';
          btn.setAttribute('aria-expanded', 'true');
          panel.removeAttribute('inert');
        }
      });
    });
  });

  /* --- Highlight the section you're in --- */
  const links = [...document.querySelectorAll('.nav__link[href^="#"]')];
  const secs = links.map(a => document.querySelector(a.getAttribute('href'))).filter(Boolean);
  if (secs.length && 'IntersectionObserver' in window) {
    const spy = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (!e.isIntersecting) return;
        links.forEach(a =>
          a.setAttribute('aria-current', String(a.getAttribute('href') === '#' + e.target.id))
        );
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    secs.forEach(s => spy.observe(s));
  }
})();
