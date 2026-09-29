import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

gsap.registerPlugin(ScrollTrigger);

const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const dark = document.documentElement.getAttribute('data-theme') === 'dark';

if (!reduce) {
  ScrollTrigger.config({ ignoreMobileResize: true });

  const lenis = new Lenis({ lerp: dark ? 0.07 : 0.09, smoothWheel: true });
  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add((t) => lenis.raf(t * 1000));
  gsap.ticker.lagSmoothing(0);

  document.querySelectorAll<HTMLAnchorElement>('a[href^="#"]').forEach((a) => {
    a.addEventListener('click', (e) => {
      const id = a.getAttribute('href');
      if (!id || id === '#') return;
      const target = document.querySelector<HTMLElement>(id);
      if (!target) return;
      e.preventDefault();
      lenis.scrollTo(target, { offset: 0, duration: 1.25 });
    });
  });

  const hero = document.querySelector<HTMLElement>('[data-hero]');
  if (hero) {
    const heroVideo = hero.querySelector<HTMLVideoElement>('.rz-hero__video');
    heroVideo?.play().catch(() => {});
    gsap.fromTo(
      '.rz-hero__video, .rz-hero__img',
      { scale: 1.08 },
      { scale: 1.02, duration: 3.5, ease: 'power2.out' },
    );
    gsap.fromTo(
      '[data-hero-content] > *',
      { autoAlpha: 0, y: 28 },
      { autoAlpha: 1, y: 0, duration: 1.1, stagger: 0.1, delay: 0.2, ease: 'power3.out' },
    );
    gsap.to('[data-hero-bg]', {
      yPercent: 10,
      ease: 'none',
      scrollTrigger: { trigger: hero, start: 'top top', end: 'bottom top', scrub: true },
    });
    gsap.to('[data-hero-content]', {
      yPercent: -8,
      autoAlpha: 0,
      ease: 'none',
      scrollTrigger: { trigger: hero, start: 'top+=18% top', end: '78% top', scrub: true },
    });
    gsap.to('.rz-hero__scroll', {
      autoAlpha: 0,
      scrollTrigger: { trigger: hero, start: 'top+=10% top', end: '35% top', scrub: true },
    });
  }

  // Keep cinematic videos playing when in view
  document.querySelectorAll<HTMLVideoElement>('.rz-intro__video, .rz-lifestyle__video, .rz-finishes__video, .rz-location__video').forEach((vid) => {
    ScrollTrigger.create({
      trigger: vid,
      start: 'top 90%',
      end: 'bottom 10%',
      onEnter: () => vid.play().catch(() => {}),
      onEnterBack: () => vid.play().catch(() => {}),
      onLeave: () => vid.pause(),
      onLeaveBack: () => vid.pause(),
    });
  });

  // Infinite film strip
  const film = document.querySelector<HTMLElement>('[data-film]');
  if (film) {
    gsap.to(film, {
      x: () => -(film.scrollWidth / 2),
      duration: 42,
      ease: 'none',
      repeat: -1,
    });
  }

  // Lifestyle stacked pin + dots
  const lifestyle = document.querySelector<HTMLElement>('[data-lifestyle]');
  if (lifestyle) {
    const slides = [...lifestyle.querySelectorAll<HTMLElement>('[data-lifestyle-slide]')];
    const dots = [...lifestyle.querySelectorAll<HTMLElement>('[data-lifestyle-dots] span')];
    if (slides.length > 1) {
      slides.forEach((slide, i) => {
        gsap.set(slide, { zIndex: slides.length - i });
        if (i > 0) gsap.set(slide, { autoAlpha: 0 });
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: lifestyle,
          start: 'top top',
          end: `+=${slides.length * 95}%`,
          scrub: 0.55,
          pin: true,
          anticipatePin: 1,
          onUpdate: (self) => {
            const idx = Math.min(slides.length - 1, Math.floor(self.progress * slides.length));
            dots.forEach((d, i) => d.classList.toggle('is-active', i === idx));
          },
        },
      });

      slides.forEach((slide, i) => {
        if (i === 0) return;
        const prev = slides[i - 1];
        tl.to(prev, { autoAlpha: 0, scale: 1.04, duration: 1, ease: 'none' }, i - 1).fromTo(
          slide,
          { autoAlpha: 0, scale: 1.07 },
          { autoAlpha: 1, scale: 1, duration: 1, ease: 'none' },
          i - 1,
        );
      });
    }
  }

  const revealEls = gsap.utils.toArray<HTMLElement>(
    '.rz-manifesto, .rz-intro__copy, .rz-stat, .rz-section-head, .rz-aid__inner, .rz-way, .rz-location__copy, .rz-location__media, .rz-contact__visual-copy, .rz-contact__form',
  );
  revealEls.forEach((el) => {
    gsap.fromTo(
      el,
      { autoAlpha: 0, y: 40 },
      {
        autoAlpha: 1,
        y: 0,
        duration: 1.05,
        ease: 'power3.out',
        scrollTrigger: { trigger: el, start: 'top 88%', toggleActions: 'play none none none' },
      },
    );
  });

  gsap.utils.toArray<HTMLElement>('[data-rz-card]').forEach((card) => {
    gsap.fromTo(
      card,
      { autoAlpha: 0, y: 48 },
      {
        autoAlpha: 1,
        y: 0,
        duration: 1,
        delay: Number(getComputedStyle(card).getPropertyValue('--i') || 0) * 0.12,
        ease: 'power3.out',
        scrollTrigger: { trigger: card, start: 'top 90%', toggleActions: 'play none none none' },
      },
    );
  });

  document.querySelectorAll<HTMLElement>('[data-count]').forEach((el) => {
    const raw = el.dataset.count || el.textContent || '0';
    const num = parseFloat(raw.replace(/[^\d.]/g, ''));
    if (!Number.isFinite(num)) return;
    const obj = { v: 0 };
    ScrollTrigger.create({
      trigger: el,
      start: 'top 90%',
      once: true,
      onEnter: () => {
        gsap.to(obj, {
          v: num,
          duration: 1.6,
          ease: 'power2.out',
          onUpdate: () => {
            el.textContent = String(Math.round(obj.v));
          },
        });
      },
    });
  });

  const intro = document.querySelector('.rz-intro');
  if (intro) {
    gsap.to('.rz-intro__img', {
      yPercent: 8,
      scale: 1.06,
      ease: 'none',
      scrollTrigger: { trigger: intro, start: 'top bottom', end: 'bottom top', scrub: true },
    });
  }

  requestAnimationFrame(() => {
    ScrollTrigger.refresh();
    revealEls.forEach((el) => {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight * 0.9 && rect.bottom > 0) {
        gsap.set(el, { autoAlpha: 1, y: 0 });
      }
    });
  });
}
