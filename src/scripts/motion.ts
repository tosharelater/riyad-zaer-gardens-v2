import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

gsap.registerPlugin(ScrollTrigger);

const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const dark = document.documentElement.getAttribute('data-theme') === 'dark';

if (!reduce) {
  ScrollTrigger.config({ ignoreMobileResize: true });

  const lenis = new Lenis({ lerp: dark ? 0.065 : 0.09, smoothWheel: true });
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
      lenis.scrollTo(target, { offset: -8, duration: 1.35 });
    });
  });

  const hero = document.querySelector<HTMLElement>('[data-hero]');
  if (hero) {
    hero.querySelector<HTMLVideoElement>('.rz-hero__video')?.play().catch(() => {});

    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
    tl.fromTo('.rz-hero__video, .rz-hero__img', { scale: 1.12 }, { scale: 1.02, duration: 4.2, ease: 'power2.out' }, 0)
      .fromTo('.rz-hero__eyebrow', { autoAlpha: 0, y: 18 }, { autoAlpha: 1, y: 0, duration: 0.9 }, 0.35)
      .fromTo('.rz-hero__brand', { autoAlpha: 0, y: 36 }, { autoAlpha: 1, y: 0, duration: 1.15 }, 0.5)
      .fromTo('.rz-hero__title', { autoAlpha: 0, y: 20 }, { autoAlpha: 1, y: 0, duration: 0.9 }, 0.75)
      .fromTo('.rz-hero__content .rz-btn', { autoAlpha: 0, y: 16 }, { autoAlpha: 1, y: 0, duration: 0.8 }, 0.95)
      .fromTo('.rz-hero__scroll', { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.6 }, 1.2);

    gsap.to('[data-hero-bg]', {
      yPercent: 12,
      ease: 'none',
      scrollTrigger: { trigger: hero, start: 'top top', end: 'bottom top', scrub: true },
    });
    gsap.to('[data-hero-content]', {
      yPercent: -12,
      autoAlpha: 0,
      ease: 'none',
      scrollTrigger: { trigger: hero, start: 'top+=12% top', end: '72% top', scrub: true },
    });
  }

  document.querySelectorAll<HTMLVideoElement>('.rz-intro__video, .rz-lifestyle__video, .rz-location__video').forEach((vid) => {
    ScrollTrigger.create({
      trigger: vid.closest('section') || vid,
      start: 'top 85%',
      end: 'bottom 15%',
      onEnter: () => vid.play().catch(() => {}),
      onEnterBack: () => vid.play().catch(() => {}),
      onLeave: () => vid.pause(),
      onLeaveBack: () => vid.pause(),
    });
  });

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
          end: `+=${slides.length * 100}%`,
          scrub: 0.5,
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
        tl.to(prev, { autoAlpha: 0, scale: 1.06, duration: 1, ease: 'none' }, i - 1).fromTo(
          slide,
          { autoAlpha: 0, scale: 1.08 },
          { autoAlpha: 1, scale: 1, duration: 1, ease: 'none' },
          i - 1,
        );
      });
    }
  }

  gsap.utils.toArray<HTMLElement>('.rz-manifesto__ornament, .rz-manifesto__text, .rz-manifesto__rule, .rz-intro__copy, .rz-section-head, .rz-stat, .rz-aid__inner, .rz-way, .rz-location__copy, .rz-contact__visual-copy, .rz-contact__form').forEach((el) => {
    gsap.fromTo(
      el,
      { autoAlpha: 0, y: 40 },
      {
        autoAlpha: 1,
        y: 0,
        duration: 1.2,
        ease: 'power3.out',
        scrollTrigger: { trigger: el, start: 'top 88%', toggleActions: 'play none none none' },
      },
    );
  });

  gsap.utils.toArray<HTMLElement>('[data-rz-card]').forEach((card) => {
    const i = Number(getComputedStyle(card).getPropertyValue('--i') || 0);
    gsap.fromTo(
      card,
      { autoAlpha: 0, y: 56 },
      {
        autoAlpha: 1,
        y: 0,
        duration: 1.05,
        delay: i * 0.14,
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
          duration: 1.7,
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
    gsap.to('.rz-intro__video, .rz-intro__img', {
      yPercent: 8,
      scale: 1.05,
      ease: 'none',
      scrollTrigger: { trigger: intro, start: 'top bottom', end: 'bottom top', scrub: true },
    });
  }

  requestAnimationFrame(() => ScrollTrigger.refresh());
}
