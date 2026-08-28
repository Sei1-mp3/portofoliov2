import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// ==================================================
// 01 — CENTRAL EASING VOCABULARY
// ==================================================
export const EASINGS = {
  // Smooth cinematic scene transitions
  expoOut: 'expo.out',
  expoInOut: 'expo.inOut',
  power4Out: 'power4.out',
  power4InOut: 'power4.inOut',
  power3Out: 'power3.out',
  power3InOut: 'power3.inOut',
  power2Out: 'power2.out',

  // Typography & Headlines
  textReveal: 'power4.out',
  textSubtle: 'power3.out',

  // Physical Elements & Imagery
  imageMask: 'power3.inOut',
  imageHover: 'power2.out',

  // Rings & Technology Lines
  ringDraw: 'power2.inOut',
  ringExpand: 'expo.out',
  lineDraw: 'power3.inOut',

  // Mechanical / Scanner / Technical
  techScan: 'power2.inOut',
  snap: 'power4.out',
};

// ==================================================
// 02 — UTILITY & HELPERS
// ==================================================

export const isReducedMotion = (): boolean => {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

export const lerp = (a: number, b: number, t: number): number => a + (b - a) * t;

export const clamp = (val: number, min: number, max: number): number =>
  Math.max(min, Math.min(max, val));

// Reusable line reveal with scaleX
export const revealLine = (
  element: HTMLElement | null,
  options: {
    duration?: number;
    delay?: number;
    origin?: string;
    scrollTrigger?: ScrollTrigger.Vars;
  } = {}
) => {
  if (!element || isReducedMotion()) return null;

  const { duration = 0.8, delay = 0, origin = 'left', scrollTrigger } = options;

  gsap.set(element, { scaleX: 0, transformOrigin: origin });

  return gsap.to(element, {
    scaleX: 1,
    duration,
    delay,
    ease: EASINGS.lineDraw,
    scrollTrigger: scrollTrigger || undefined,
  });
};

// Reusable masked typography entrance
export const createMaskReveal = (
  elements: HTMLElement[] | NodeListOf<HTMLElement> | null,
  options: {
    duration?: number;
    stagger?: number;
    yPercent?: number;
    delay?: number;
    scrollTrigger?: ScrollTrigger.Vars;
  } = {}
) => {
  if (!elements || isReducedMotion()) return null;

  const {
    duration = 0.85,
    stagger = 0.12,
    yPercent = 105,
    delay = 0,
    scrollTrigger,
  } = options;

  return gsap.fromTo(
    elements,
    { yPercent, opacity: 0 },
    {
      yPercent: 0,
      opacity: 1,
      duration,
      stagger,
      delay,
      ease: EASINGS.textReveal,
      scrollTrigger: scrollTrigger || undefined,
    }
  );
};
