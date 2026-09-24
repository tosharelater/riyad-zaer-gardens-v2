import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import Lenis from 'lenis';

gsap.registerPlugin(ScrollTrigger, SplitText);

const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const rtl = document.documentElement.dir === 'rtl';
const desktop = window.matchMedia('(min-width: 768px)').matches;

if (!reduce) {
  ScrollTrigger.config({ ignoreMobileResize: true });

  // Smooth scrolling
  const lenis = new Lenis({ lerp: 0.09, smoothWheel: true });
  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add((t) => lenis.raf(t * 1000));
  gsap.ticker.lagSmoothing(0);

  // Hero: background drifts and zooms, content fades as you leave
  const hero = document.querySelector<HTMLElement>('[data-hero]');
  if (hero) {
    gsap.to('[data-hero-bg]', {
      yPercent: 18,
      scale: 1.25,
      ease: 'none',
      scrollTrigger: { trigger: hero, start: 'top top', end: 'bottom top', scrub: true },
    });
    gsap.to('[data-hero-content]', {
      yPercent: -12,
      opacity: 0,
      ease: 'none',
      scrollTrigger: { trigger: hero, start: 'top top', end: '70% top', scrub: true },
    });
  }

  // Pinned sections are created first and in document order so every
  // later trigger measures against the final layout (fixes early/late pins).
  document.querySelectorAll<HTMLElement>('[data-grow], [data-hscroll]').forEach((section) => {
    if (section.hasAttribute('data-grow')) {
      const frame = section.querySelector<HTMLElement>('[data-grow-frame]');
      const img = section.querySelector<HTMLElement>('[data-grow-frame] img');
      const text = section.querySelector<HTMLElement>('[data-grow-text]');
      if (!frame) return;
      const tl = gsap.timeline({
        scrollTrigger: { trigger: section, start: 'top top', end: '+=140%', scrub: 1, pin: true, anticipatePin: 1 },
      });
      tl.fromTo(frame, { clipPath: 'inset(22% 26% 22% 26% round 3rem)' }, { clipPath: 'inset(0% 0% 0% 0% round 0rem)', ease: 'none' }, 0);
      if (img) tl.fromTo(img, { scale: 1.5 }, { scale: 1, ease: 'none' }, 0);
      if (text) tl.fromTo(text, { autoAlpha: 0, y: 60 }, { autoAlpha: 1, y: 0, ease: 'none' }, 0.55);
    } else if (desktop) {
      const track = section.querySelector<HTMLElement>('[data-hscroll-track]');
      if (!track) return;
      const distance = () => Math.max(0, track.scrollWidth - window.innerWidth + 96);
      gsap.to(track, {
        x: () => (rtl ? distance() : -distance()),
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          pin: true,
          scrub: 1,
          start: 'top top',
          end: () => '+=' + distance(),
          invalidateOnRefresh: true,
          anticipatePin: 1,
        },
      });
    }
  });

  // Headings: word-by-word reveal
  document.querySelectorAll<HTMLElement>('[data-split]').forEach((el) => {
    const split = new SplitText(el, { type: 'words' });
    gsap.from(split.words, {
      yPercent: 60,
      autoAlpha: 0,
      duration: 0.9,
      ease: 'power3.out',
      stagger: 0.06,
      scrollTrigger: { trigger: el, start: 'top 88%', once: true },
    });
  });

  // Images: parallax + scale inside their frame
  document.querySelectorAll<HTMLElement>('[data-parallax]').forEach((frame) => {
    const img = frame.querySelector('img');
    if (!img) return;
    gsap.fromTo(
      img,
      { yPercent: -9, scale: 1.35 },
      {
        yPercent: 9,
        scale: 1.1,
        ease: 'none',
        scrollTrigger: { trigger: frame, start: 'top bottom', end: 'bottom top', scrub: true },
      },
    );
  });

  // Groups: staggered rise
  document.querySelectorAll<HTMLElement>('[data-stagger]').forEach((group) => {
    gsap.from(group.children, {
      y: 50,
      autoAlpha: 0,
      duration: 1,
      ease: 'power3.out',
      stagger: 0.12,
      scrollTrigger: { trigger: group, start: 'top 85%', once: true },
    });
  });

  // Counters
  document.querySelectorAll<HTMLElement>('[data-count]').forEach((el) => {
    const target = Number(el.dataset.count);
    const obj = { v: 0 };
    gsap.to(obj, {
      v: target,
      duration: 1.8,
      ease: 'power2.out',
      onUpdate: () => (el.textContent = String(Math.round(obj.v))),
      scrollTrigger: { trigger: el, start: 'top 90%', once: true },
    });
  });

  // Marquee: text slides sideways as you scroll
  document.querySelectorAll<HTMLElement>('[data-marquee]').forEach((el) => {
    const dir = (el.dataset.marquee === 'right' ? 1 : -1) * (rtl ? -1 : 1);
    gsap.fromTo(
      el,
      { xPercent: dir * -12 },
      {
        xPercent: dir * 12,
        ease: 'none',
        scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom top', scrub: true },
      },
    );
  });

  // Large panels: start smaller and rounder, settle at full size
  document.querySelectorAll<HTMLElement>('[data-scale]').forEach((el) => {
    gsap.fromTo(
      el,
      { scale: 0.92, borderRadius: '4rem' },
      {
        scale: 1,
        borderRadius: '2rem',
        ease: 'none',
        scrollTrigger: { trigger: el, start: 'top 95%', end: 'top 45%', scrub: true },
      },
    );
  });

  // Tilt in: images start small and slightly rotated, settle flat
  document.querySelectorAll<HTMLElement>('[data-tilt]').forEach((el, i) => {
    gsap.fromTo(
      el,
      { rotate: (i % 2 ? 1 : -1) * 5, scale: 0.85 },
      {
        rotate: 0,
        scale: 1,
        ease: 'none',
        scrollTrigger: { trigger: el, start: 'top 95%', end: 'top 40%', scrub: true },
      },
    );
  });

  // Re-measure once everything (fonts, images) has settled
  const refresh = () => ScrollTrigger.refresh();
  ScrollTrigger.sort();
  window.addEventListener('load', refresh);
  document.fonts?.ready.then(refresh);
  setTimeout(refresh, 1200);
}
