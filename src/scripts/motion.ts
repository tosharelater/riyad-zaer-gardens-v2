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
      lenis.scrollTo(target, { offset: -8, duration: 1.25 });
    });
  });

  const hero = document.querySelector<HTMLElement>('[data-hero]');
  if (hero) {
    gsap.fromTo('.bz-hero__img', { scale: 1.08 }, { scale: 1, duration: 3.6, ease: 'power2.out' });
    gsap.from('.bz-hero__kicker, .bz-hero__line, .bz-hero__brand, .bz-hero__copy .rz-btn', {
      y: 22,
      duration: 1,
      stagger: 0.12,
      ease: 'power3.out',
      delay: 0.15,
      clearProps: 'transform',
    });

    gsap.to('[data-hero-bg]', {
      yPercent: 14,
      ease: 'none',
      scrollTrigger: { trigger: hero, start: 'top top', end: 'bottom top', scrub: true },
    });
    gsap.to('[data-hero-content]', {
      yPercent: -8,
      autoAlpha: 0,
      ease: 'none',
      scrollTrigger: { trigger: hero, start: '15% top', end: '70% top', scrub: true },
    });
  }

  const lifestyle = document.querySelector<HTMLElement>('[data-lifestyle]');
  if (lifestyle) {
    const slides = [...lifestyle.querySelectorAll<HTMLElement>('[data-lifestyle-slide]')];
    const dots = [...lifestyle.querySelectorAll<HTMLElement>('[data-lifestyle-dots] span')];
    if (slides.length > 1) {
      slides.forEach((slide, i) => {
        gsap.set(slide, { zIndex: slides.length - i, autoAlpha: i === 0 ? 1 : 0 });
      });
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: lifestyle,
          start: 'top top',
          end: `+=${slides.length * 90}%`,
          scrub: 0.45,
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
        tl.to(slides[i - 1], { autoAlpha: 0, duration: 1, ease: 'none' }, i - 1).fromTo(
          slide,
          { autoAlpha: 0 },
          { autoAlpha: 1, duration: 1, ease: 'none' },
          i - 1,
        );
      });
    }
  }

  gsap.utils
    .toArray<HTMLElement>(
      '.bz-manifesto__text, .bz-intro__copy, .bz-head, .bz-figure, .bz-way, .bz-aid, .bz-loc__copy, .bz-contact__overlay, .bz-contact__form',
    )
    .forEach((el) => {
      gsap.fromTo(
        el,
        { autoAlpha: 0, y: 36 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 1.1,
          ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 88%', toggleActions: 'play none none none' },
        },
      );
    });

  gsap.utils.toArray<HTMLElement>('[data-rz-card]').forEach((card) => {
    const i = Number(getComputedStyle(card).getPropertyValue('--i') || 0);
    gsap.fromTo(
      card,
      { autoAlpha: 0, y: 48 },
      {
        autoAlpha: 1,
        y: 0,
        duration: 1,
        delay: i * 0.12,
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

  const intro = document.querySelector('.bz-intro');
  if (intro) {
    gsap.to('.bz-intro__img', {
      scale: 1.06,
      ease: 'none',
      scrollTrigger: { trigger: intro, start: 'top bottom', end: 'bottom top', scrub: true },
    });
  }

  requestAnimationFrame(() => ScrollTrigger.refresh());
}
