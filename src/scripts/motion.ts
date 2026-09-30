import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import Lenis from 'lenis';

gsap.registerPlugin(ScrollTrigger, SplitText);

const root = document.documentElement;
const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const small = window.matchMedia('(max-width: 900px)').matches;
const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
const rtl = root.dir === 'rtl';
// Phones get the same effects with a third of the parallax travel.
const depth = small ? 0.35 : 1;
const header = document.querySelector<HTMLElement>('[data-lx-header]');
const $ = <T extends Element = HTMLElement>(sel: string, scope: ParentNode = document) => [...scope.querySelectorAll<T>(sel)];

/* ---- Smooth scroll ------------------------------------------------------ */

let lenis: Lenis | null = null;
if (!reduce) {
  lenis = new Lenis({ lerp: 0.075, wheelMultiplier: 0.9, smoothWheel: true });
  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add((t) => lenis!.raf(t * 1000));
  gsap.ticker.lagSmoothing(0);
}

const scrollToY = (y: number) => (lenis ? lenis.scrollTo(y, { duration: 1.2 }) : window.scrollTo({ top: y }));

$<HTMLAnchorElement>('a[href*="#"]').forEach((a) => {
  a.addEventListener('click', (e) => {
    const url = new URL(a.href);
    if (url.pathname !== location.pathname || !url.hash) return;
    const target = document.querySelector<HTMLElement>(url.hash);
    if (!target) return;
    e.preventDefault();
    scrollToY(target.getBoundingClientRect().top + window.scrollY);
    history.replaceState(null, '', url.hash);
  });
});

/* ---- Header: hide on scroll down, show on scroll up -------------------- */

if (header) {
  let last = window.scrollY;
  window.addEventListener(
    'scroll',
    () => {
      const y = window.scrollY;
      const menuOpen = header.querySelector('#menu-toggle')?.getAttribute('aria-expanded') === 'true';
      header.classList.toggle('is-hidden', !menuOpen && y > last && y > header.offsetHeight * 2);
      last = y;
    },
    { passive: true },
  );
}

/* ---- Gallery strip: drag, arrows, counter (works with or without motion) -- */

document.querySelectorAll<HTMLElement>('[data-gallery]').forEach((root) => {
  const track = root.querySelector<HTMLElement>('[data-gallery-track]')!;
  const items = [...track.children] as HTMLElement[];
  const index = root.querySelector<HTMLElement>('[data-gallery-index]');
  const dir = document.documentElement.dir === 'rtl' ? -1 : 1;
  const step = (n: number) => {
    const item = items[0];
    const gap = parseFloat(getComputedStyle(track).columnGap) || 16;
    track.scrollBy({ left: n * dir * (item.getBoundingClientRect().width + gap), behavior: reduce ? 'auto' : 'smooth' });
  };
  root.querySelector('[data-gallery-prev]')?.addEventListener('click', () => step(-1));
  root.querySelector('[data-gallery-next]')?.addEventListener('click', () => step(1));

  track.addEventListener(
    'scroll',
    () => {
      const start = track.getBoundingClientRect().left;
      let best = 0;
      let bestDist = Infinity;
      items.forEach((it, i) => {
        const d = Math.abs(it.getBoundingClientRect().left - start);
        if (d < bestDist) (bestDist = d), (best = i);
      });
      if (index) index.textContent = String(best + 1).padStart(2, '0');
    },
    { passive: true },
  );

  // Mouse drag (touch already scrolls natively)
  let startX = 0;
  let startScroll = 0;
  let dragging = false;
  track.addEventListener('pointerdown', (e) => {
    if (e.pointerType !== 'mouse') return;
    dragging = true;
    startX = e.clientX;
    startScroll = track.scrollLeft;
    track.classList.add('is-dragging');
    track.setPointerCapture(e.pointerId);
  });
  track.addEventListener('pointermove', (e) => {
    if (dragging) track.scrollLeft = startScroll - (e.clientX - startX);
  });
  const stop = () => {
    dragging = false;
    track.classList.remove('is-dragging');
  };
  track.addEventListener('pointerup', stop);
  track.addEventListener('pointercancel', stop);
});

/* ---- Hero video --------------------------------------------------------- */

const video = document.querySelector<HTMLVideoElement>('[data-hero-video]');
if (video && !reduce) {
  video.addEventListener('playing', () => video.classList.add('is-playing'), { once: true });
  video.play().catch(() => {
    /* no file yet, or autoplay refused: the render underneath stays */
  });
}

if (!reduce) {
  root.classList.add('lx-motion');
  document.fonts.ready.then(initMotion);
}

function initMotion() {
  /* ---- Hero: title lines rise, media drifts, copy leaves faster ---------- */

  const hero = document.querySelector<HTMLElement>('[data-hero]');
  if (hero) {
    const copy = hero.querySelector('.lx-hero__copy, .lx-phero__copy')!;
    const title = hero.querySelector('.lx-hero__title, .lx-phero__title')!;
    if (hero.querySelector('[data-hero-media]')) {
      gsap.fromTo('[data-hero-media]', { scale: 1.12 }, { scale: 1, duration: 2.8, ease: 'power2.out' });
    }
    SplitText.create(title, {
      type: 'lines',
      mask: 'lines',
      linesClass: 'lx-line',
      autoSplit: true,
      onSplit: (self) =>
        gsap.from(self.lines, { yPercent: 110, duration: 1.3, stagger: 0.1, ease: 'expo.out', delay: 0.25 }),
    });
    gsap.from([...copy.children].filter((el) => el !== title), {
      y: 24,
      autoAlpha: 0,
      duration: 1.1,
      stagger: 0.1,
      ease: 'power3.out',
      delay: 0.55,
    });
    const leave = { trigger: hero, start: 'top top', end: 'bottom top', scrub: true };
    if (hero.querySelector('[data-hero-media]')) {
      gsap.to('[data-hero-media]', { yPercent: 18 * depth, scale: 1.08, ease: 'none', scrollTrigger: leave });
    }
    gsap.to(copy, { yPercent: -35 * depth, autoAlpha: 0, ease: 'none', scrollTrigger: { ...leave, end: '75% top' } });
  }

  /* ---- Reveals: each kind of element gets its own entrance --------------- */

  const once = (trigger: Element, start = 'top 85%') => ({ trigger, start, once: true });

  // Display headings: lines slide up from behind a mask.
  $('.lx-display, .lx-h2, .lx-h3').filter((el) => !el.closest('[data-hero]')).forEach((el) => {
    SplitText.create(el, {
      type: 'lines',
      mask: 'lines',
      linesClass: 'lx-line',
      autoSplit: true,
      onSplit: (self) =>
        gsap.from(self.lines, { yPercent: 110, duration: 1.2, stagger: 0.09, ease: 'expo.out', scrollTrigger: once(el) }),
    });
  });

  // Kickers: letter-spacing opens up as they fade in.
  $('.lx-kick').filter((el) => !el.closest('[data-hero]')).forEach((el) =>
    gsap.from(el, { autoAlpha: 0, letterSpacing: '0.35em', duration: 1.4, ease: 'power3.out', scrollTrigger: once(el) }),
  );

  // Rules draw themselves.
  $('.lx-rule').forEach((el) =>
    gsap.from(el, {
      scaleX: 0,
      transformOrigin: rtl ? 'right' : 'left',
      duration: 1.2,
      ease: 'expo.inOut',
      scrollTrigger: once(el, 'top 90%'),
    }),
  );

  // Paragraphs: soft focus pull.
  $('.lx-lead, .lx-body, .lx-stext, .lx-p, .lx-note, .lx-prose').filter((el) => !el.closest('[data-hero]')).forEach((el) =>
    gsap.from(el, { autoAlpha: 0, y: 28, filter: 'blur(8px)', duration: 1.2, ease: 'power3.out', scrollTrigger: once(el, 'top 88%') }),
  );

  // Spec rows and amenity lists: hairline draws, then the row slides in.
  $('.lx-speclist, .lx-checks, .lx-figs').forEach((list) => {
    const rows = $(':scope > div, :scope > li', list);
    gsap.from(rows, {
      autoAlpha: 0,
      x: rtl ? -32 : 32,
      duration: 0.9,
      stagger: 0.08,
      ease: 'power3.out',
      scrollTrigger: once(list, 'top 88%'),
    });
  });

  // Cards and columns: staggered rise (yPercent, so it never fights the parallax on y).
  [
    $('.lx-card'), $('.lx-aid__row > div'), $('.lx-num li'), $('.lx-tiles li'), $('.lx-links .lx-link'),
    $('.lx-ways3 > div'), $('.lx-typo'), $('.lx-faq details'), $('.lx-prices p'), $('.lx-reach dl > div'),
    $('.lx-gallery__item'), $('.lx-band__access li'), $('.lx-pricecard > *'),
  ].forEach((group) => {
    if (!group.length) return;
    gsap.from(group, { autoAlpha: 0, yPercent: 35, duration: 1, stagger: 0.12, ease: 'power3.out', scrollTrigger: once(group[0], 'top 90%') });
  });

  // Buttons rise last (the hero's are handled above).
  $('main .lx-btn').filter((el) => !el.closest('[data-hero]')).forEach((el) =>
    gsap.from(el, { autoAlpha: 0, y: 20, duration: 0.9, ease: 'power3.out', scrollTrigger: once(el, 'top 95%') }),
  );

  // Split images: curtain wipe from the outer edge, image settles from a zoom.
  $('.lx-split2__media, .lx-intro__media').forEach((frame) => {
    const img = frame.querySelector('img')!;
    const fromLeft = frame.closest('.lx-split2--rev') ? !rtl : rtl;
    gsap
      .timeline({ scrollTrigger: once(frame, 'top 80%') })
      .from(frame, {
        clipPath: fromLeft ? 'inset(0 100% 0 0)' : 'inset(0 0 0 100%)',
        duration: 1.4,
        ease: 'expo.inOut',
      })
      .from(img, { scale: 1.35, duration: 1.8, ease: 'expo.out' }, 0.2);
  });

  // Statement: words light up as they scroll past.
  $('.lx-statement p').forEach((el) => {
    SplitText.create(el, {
      type: 'words',
      autoSplit: true,
      onSplit: (self) =>
        gsap.fromTo(
          self.words,
          { opacity: 0.18 },
          { opacity: 1, stagger: 0.1, ease: 'none', scrollTrigger: { trigger: el, start: 'top 80%', end: 'bottom 45%', scrub: true } },
        ),
    });
  });

  // "Y vivre / Y investir / Y revenir": outline fills with scroll.
  $('.lx-way h3').forEach((el) =>
    gsap.to(el, {
      backgroundPosition: rtl ? '100% 0' : '0% 0',
      ease: 'none',
      scrollTrigger: { trigger: el, start: 'top 85%', end: 'top 45%', scrub: true },
    }),
  );

  // Full-bleed bands: image eases out of a zoom while it crosses the screen.
  $('.lx-band img, .lx-closing > img').forEach((img) =>
    gsap.fromTo(
      img,
      { scale: 1.25, yPercent: -6 * depth },
      { scale: 1, yPercent: 6 * depth, ease: 'none', scrollTrigger: { trigger: img.parentElement, start: 'top bottom', end: 'bottom top', scrub: true } },
    ),
  );
  $('.lx-closing').forEach((el) => {
    gsap.from(el, { clipPath: 'inset(18% 12% 18% 12%)', ease: 'none', scrollTrigger: { trigger: el, start: 'top bottom', end: 'center center', scrub: true } });
    // Logo, then the brand promise, settle in once the frame has opened.
    gsap.from(el.querySelectorAll('.lx-closing__copy > *'), {
      autoAlpha: 0,
      y: 40,
      filter: 'blur(10px)',
      duration: 1.4,
      stagger: 0.25,
      ease: 'power3.out',
      scrollTrigger: once(el, 'top 40%'),
    });
  });

  /* ---- Parallax on everything: each layer at its own depth ------------- */

  const drift = (targets: HTMLElement[], px: number) =>
    targets.forEach((el) =>
      gsap.fromTo(
        el,
        { y: px * depth },
        { y: -px * depth, ease: 'none', scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom top', scrub: true } },
      ),
    );
  drift($('.lx-heading, .lx-shead'), 40);
  drift($('.lx-statement p'), 60);
  drift($('.lx-intro__copy, .lx-split2__copy'), 60);
  drift($('.lx-band__copy'), 90);
  drift($('.lx-contact__form'), 30);
  // Rows of columns float as one layer so they stay aligned.
  [$('.lx-cards'), $('.lx-aid__row'), $('.lx-typos'), $('.lx-ways3')].forEach((group) => drift(group, 35));
  // Page-hero images drift inside their frame.
  $('.lx-phero__media img').forEach((img) =>
    gsap.fromTo(img, { yPercent: 0 }, { yPercent: 10 * depth, ease: 'none', scrollTrigger: { trigger: img.closest('section'), start: 'top top', end: 'bottom top', scrub: true } }),
  );

  /* ---- Counting numbers ------------------------------------------------- */

  $('.lx-figure__n, .lx-aid__val').forEach((el) => {
    const text = el.textContent ?? '';
    const match = text.match(/\d[\d\s ]*\d|\d/);
    if (!match) return;
    const target = Number(match[0].replace(/[\s ]/g, ''));
    const [before, after] = [text.slice(0, match.index), text.slice(match.index! + match[0].length)];
    const format = (n: number) => Math.round(n).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
    const state = { n: target > 1000 ? target * 0.6 : 0 };
    el.textContent = before + format(state.n) + after;
    gsap.to(state, {
      n: target,
      duration: 2,
      ease: 'power2.out',
      scrollTrigger: once(el, 'top 90%'),
      onUpdate: () => (el.textContent = before + format(state.n) + after),
    });
  });

  /* ---- "Quatre raisons": pinned scroll story ---------------------------- */

  const story = document.querySelector<HTMLElement>('[data-story]');
  if (story) {
    const slides = $('[data-slide]', story);
    const dots = $('[data-dot]', story);
    story.classList.add('is-story');
    slides.forEach((s, i) => gsap.set(s, { zIndex: i + 1 }));

    const copyParts = (s: HTMLElement) => [...s.querySelector('.lx-slide__copy')!.children];
    const tl = gsap.timeline({
      defaults: { ease: 'none' },
      scrollTrigger: {
        trigger: story,
        start: 'top top',
        end: () => `+=${(slides.length - 1) * window.innerHeight * 1.1}`,
        pin: true,
        scrub: 0.8,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        snap: { snapTo: 1 / (slides.length - 1), duration: { min: 0.3, max: 0.8 }, ease: 'power2.inOut' },
        onUpdate: (self) => {
          const p = self.progress * (slides.length - 1);
          dots.forEach((d, i) => d.style.setProperty('--p', String(gsap.utils.clamp(0, 1, p - i + 1))));
        },
      },
    });

    // First slide's image breathes during its turn.
    slides.forEach((slide, i) => {
      if (i === 0) return;
      const prev = slides[i - 1];
      const at = i - 1;
      tl.to(copyParts(prev), { autoAlpha: 0, y: -50, stagger: 0.04, duration: 0.35 }, at)
        .to(prev.querySelector('img'), { scale: 1.12, duration: 1 }, at)
        .fromTo(slide, { clipPath: 'inset(100% 0 0 0)' }, { clipPath: 'inset(0% 0 0 0)', duration: 0.7, ease: 'power2.inOut' }, at + 0.15)
        .fromTo(slide.querySelector('img'), { scale: 1.3, yPercent: 8 }, { scale: 1, yPercent: 0, duration: 0.85 }, at + 0.15)
        .fromTo(copyParts(slide), { autoAlpha: 0, y: 60 }, { autoAlpha: 1, y: 0, stagger: 0.06, duration: 0.4, ease: 'power2.out' }, at + 0.55);
    });
  }

  /* ---- Scroll progress line -------------------------------------------- */

  const bar = document.createElement('div');
  bar.className = 'lx-progress';
  bar.setAttribute('aria-hidden', 'true');
  document.body.append(bar);
  gsap.to(bar, { scaleX: 1, ease: 'none', scrollTrigger: { start: 0, end: 'max', scrub: 0.3 } });

  /* ---- Desktop only: cursor and magnetic buttons ------------------------ */

  if (finePointer && !small) {
    const cursor = document.createElement('div');
    cursor.className = 'lx-cursor is-hidden';
    cursor.setAttribute('aria-hidden', 'true');
    cursor.innerHTML = '<span></span>';
    document.body.append(cursor);
    root.classList.add('lx-cursor-on');
    const label = cursor.querySelector('span')!;
    const moveX = gsap.quickTo(cursor, 'x', { duration: 0.35, ease: 'power3.out' });
    const moveY = gsap.quickTo(cursor, 'y', { duration: 0.35, ease: 'power3.out' });
    const viewLabel = rtl ? 'شاهد' : 'Voir';
    const scrollLabel = rtl ? 'مرر' : 'Défiler';

    window.addEventListener('pointermove', (e) => {
      moveX(e.clientX);
      moveY(e.clientY);
      cursor.classList.remove('is-hidden');
      const t = e.target as Element;
      const imageLink = t.closest('.lx-card__media, .lx-band > img, .lx-split2__media, .lx-intro__media, .lx-typo figure');
      const inGallery = t.closest('[data-gallery-track]');
      const inStory = t.closest('[data-story]');
      const interactive = t.closest('a, button, select, label');
      const text = inGallery ? (rtl ? 'اسحب' : 'Glisser') : imageLink ? viewLabel : inStory && !interactive ? scrollLabel : '';
      label.textContent = text;
      cursor.classList.toggle('is-label', !!text);
      cursor.classList.toggle('is-link', !text && !!interactive);
    });
    document.addEventListener('pointerleave', () => cursor.classList.add('is-hidden'));
    $('input, textarea, select').forEach((f) => {
      f.addEventListener('pointerenter', () => cursor.classList.add('is-hidden'));
      f.addEventListener('pointerleave', () => cursor.classList.remove('is-hidden'));
    });

    $('.lx-btn').forEach((btn) => {
      const x = gsap.quickTo(btn, 'x', { duration: 0.5, ease: 'power3.out' });
      const y = gsap.quickTo(btn, 'y', { duration: 0.5, ease: 'power3.out' });
      btn.addEventListener('pointermove', (e) => {
        const r = btn.getBoundingClientRect();
        x((e.clientX - r.left - r.width / 2) * 0.25);
        y((e.clientY - r.top - r.height / 2) * 0.35);
      });
      btn.addEventListener('pointerleave', () => {
        x(0);
        y(0);
      });
    });
  }

  ScrollTrigger.refresh();
}
