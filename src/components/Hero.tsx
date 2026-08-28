import React, { useEffect, useRef, useState } from 'react';
import { ArrowDown, ArrowRight } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { HERO_IMAGE_URL } from '../data';
import { SatriaRing } from './motion/SatriaRing';
import { EASINGS, isReducedMotion } from './motion/MotionSystem';
import { TransitionBloom } from './motion/TransitionBloom';

gsap.registerPlugin(ScrollTrigger);

interface HeroProps {
  onOpenContact: () => void;
  onViewWork: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenContact, onViewWork }) => {
  const heroRef = useRef<HTMLElement>(null);
  const leftColRef = useRef<HTMLDivElement>(null);
  const rightColRef = useRef<HTMLDivElement>(null);
  const portraitRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const roleMaskRef = useRef<HTMLDivElement>(null);
  const nameLine1Ref = useRef<HTMLSpanElement>(null);
  const nameLine2Ref = useRef<HTMLSpanElement>(null);
  const nameLine3Ref = useRef<HTMLSpanElement>(null);
  const metaRef = useRef<HTMLDivElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  const bloomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // 1. Mouse Parallax (Desktop Only, Max 10-15px) via direct GSAP quickTo (0 re-renders)
    let removeParallax: (() => void) | null = null;

    if (!window.matchMedia('(pointer: coarse)').matches && !isReducedMotion()) {
      const portraitEl = portraitRef.current;
      const ringEl = ringRef.current;
      const bloomEl = bloomRef.current;

      const xPortrait = portraitEl ? gsap.quickTo(portraitEl, 'x', { duration: 0.6, ease: 'power2.out' }) : null;
      const yPortrait = portraitEl ? gsap.quickTo(portraitEl, 'y', { duration: 0.6, ease: 'power2.out' }) : null;
      const xRing = ringEl ? gsap.quickTo(ringEl, 'x', { duration: 0.8, ease: 'power2.out' }) : null;
      const yRing = ringEl ? gsap.quickTo(ringEl, 'y', { duration: 0.8, ease: 'power2.out' }) : null;
      const xBloom = bloomEl ? gsap.quickTo(bloomEl, 'x', { duration: 0.7, ease: 'power2.out' }) : null;
      const yBloom = bloomEl ? gsap.quickTo(bloomEl, 'y', { duration: 0.7, ease: 'power2.out' }) : null;

      const handleMouseMove = (e: MouseEvent) => {
        const centerX = window.innerWidth / 2;
        const centerY = window.innerHeight / 2;
        const deltaX = Math.max(-1, Math.min(1, (e.clientX - centerX) / centerX));
        const deltaY = Math.max(-1, Math.min(1, (e.clientY - centerY) / centerY));

        if (xPortrait && yPortrait) {
          xPortrait(deltaX * 8);
          yPortrait(deltaY * 8);
        }
        if (xRing && yRing) {
          xRing(deltaX * 14);
          yRing(deltaY * 14);
        }
        if (xBloom && yBloom) {
          xBloom(deltaX * 12);
          yBloom(deltaY * 12);
        }
      };

      const handleMouseLeave = () => {
        if (xPortrait && yPortrait) {
          xPortrait(0);
          yPortrait(0);
        }
        if (xRing && yRing) {
          xRing(0);
          yRing(0);
        }
        if (xBloom && yBloom) {
          xBloom(0);
          yBloom(0);
        }
      };

      window.addEventListener('mousemove', handleMouseMove, { passive: true });
      document.addEventListener('mouseleave', handleMouseLeave);

      removeParallax = () => {
        window.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseleave', handleMouseLeave);
      };
    }

    // 2. GSAP Entrance Sequence & Kinetic Typography Reveal
    let ctx: gsap.Context | null = null;

    if (!isReducedMotion() && heroRef.current) {
      ctx = gsap.context(() => {
        const entranceTl = gsap.timeline({ delay: 0.1 });

        // A. Kinetic Name Line Stagger: MUHAMMAD -> SATRIA -> SEIASMARA
        const nameLines = [nameLine1Ref.current, nameLine2Ref.current, nameLine3Ref.current];
        entranceTl.fromTo(
          nameLines,
          {
            yPercent: 110,
            xPercent: (i) => (i % 2 === 0 ? -4 : 4),
            opacity: 0,
          },
          {
            yPercent: 0,
            xPercent: 0,
            opacity: 1,
            duration: 0.95,
            stagger: 0.12,
            ease: EASINGS.textReveal,
          },
          0.1
        );

        // B. Horizontal mask reveal for role
        if (roleMaskRef.current) {
          entranceTl.fromTo(
            roleMaskRef.current,
            { clipPath: 'inset(0 100% 0 0)', opacity: 0 },
            {
              clipPath: 'inset(0 0% 0 0)',
              opacity: 1,
              duration: 0.75,
              ease: EASINGS.lineDraw,
            },
            0.4
          );
        }

        // C. Satria Ring smooth arrival from loading transition
        if (ringRef.current) {
          entranceTl.fromTo(
            ringRef.current,
            { scale: 1.4, opacity: 0 },
            {
              scale: 1,
              opacity: 1,
              duration: 1.1,
              ease: EASINGS.ringExpand,
            },
            0.2
          );
        }

        // D. Portrait subtle fade & lift
        if (portraitRef.current) {
          entranceTl.fromTo(
            portraitRef.current,
            { y: 35, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 1,
              ease: EASINGS.imageHover,
            },
            0.3
          );
        }

        // E. Metadata & CTA stagger
        if (metaRef.current && descRef.current && ctaRef.current) {
          entranceTl.fromTo(
            [metaRef.current, descRef.current, ctaRef.current],
            { y: 20, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.8,
              stagger: 0.1,
              ease: EASINGS.textSubtle,
            },
            0.6
          );
        }

        // Scroll Choreography: Hero exit -> About entry
        const exitTl = gsap.timeline({
          scrollTrigger: {
            trigger: heroRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: 0.6,
          },
        });

        if (leftColRef.current) {
          exitTl.to(
            leftColRef.current,
            {
              yPercent: -20,
              opacity: 0.25,
              ease: 'none',
            },
            0
          );
        }

        if (portraitRef.current) {
          exitTl.to(
            portraitRef.current,
            {
              yPercent: 12,
              scale: 0.94,
              opacity: 0.4,
              ease: 'none',
            },
            0
          );
        }

        if (ringRef.current) {
          exitTl.to(
            ringRef.current,
            {
              scale: 1.8,
              rotate: 30,
              opacity: 0.1,
              ease: 'none',
            },
            0
          );
        }
      }, heroRef);
    }

    return () => {
      if (removeParallax) removeParallax();
      if (ctx) ctx.revert();
    };
  }, []);

  return (
    <header
      id="hero"
      ref={heroRef}
      className="grid grid-cols-1 lg:grid-cols-2 min-h-[88vh] border-b border-grid relative overflow-hidden bg-[#f2f0e6]"
    >
      <TransitionBloom theme="cream" intensity={1} />

      {/* Left Column: Kinetic Typography & Editorial Presentation */}
      <div
        ref={leftColRef}
        className="p-8 sm:p-12 md:p-16 lg:p-20 flex flex-col justify-center border-b lg:border-b-0 lg:border-r border-grid relative z-10 will-change-transform"
      >
        {/* Section 09: Role with horizontal mask reveal */}
        <div
          ref={roleMaskRef}
          className="mb-6 flex items-center gap-3 text-xs font-mono tracking-widest uppercase text-[#333] will-change-transform"
        >
          <span className="font-semibold">WEB DEVELOPER</span>
          <span className="w-1.5 h-1.5 bg-[#1a1a1a] rounded-full inline-block" />
          <span className="font-semibold">AI SPECIALIST</span>
        </div>

        {/* Section 08: Line-by-line masked name reveal */}
        <h1 className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-[5.2rem] xl:text-[5.8rem] leading-[0.92] tracking-tight mb-8 text-[#1a1a1a] select-none">
          <span className="block overflow-hidden pb-1">
            <span ref={nameLine1Ref} className="block will-change-transform">
              MUHAMMAD
            </span>
          </span>
          <span className="block overflow-hidden pb-1">
            <span ref={nameLine2Ref} className="block will-change-transform">
              SATRIA
            </span>
          </span>
          <span className="block overflow-hidden pb-1">
            <span ref={nameLine3Ref} className="block will-change-transform">
              SEIASMARA
            </span>
          </span>
        </h1>

        {/* Section 09: Metadata (Age / Student info) */}
        <div
          ref={metaRef}
          className="flex items-center gap-3 text-xs font-mono tracking-widest uppercase mb-8 border-t border-grid pt-4 w-max text-[#333] will-change-transform"
        >
          <span>16 YEARS OLD</span>
          <span className="opacity-40">/</span>
          <span>STUDENT AT SMK PRESTASI PRIMA</span>
        </div>

        <p
          ref={descRef}
          className="text-[#333] max-w-md mb-12 font-sans font-normal text-base leading-relaxed will-change-transform"
        >
          Building modern websites and intelligent solutions through web development and AI-assisted
          development.
        </p>

        {/* CTA Buttons */}
        <div
          ref={ctaRef}
          className="flex flex-wrap items-center gap-6 sm:gap-8 text-xs font-mono tracking-widest font-bold will-change-transform"
        >
          <button
            id="hero-view-work-btn"
            onClick={onViewWork}
            data-cursor="cta"
            className="bg-[#1a1a1a] text-[#f2f0e6] px-7 py-4.5 flex items-center gap-3 hover:bg-black hover:shadow-lg transition-all cursor-pointer group active:scale-95"
          >
            <span>VIEW MY WORK</span>
            <span className="group-hover:translate-x-1 transition-transform">→</span>
          </button>

          <button
            id="hero-connect-btn"
            onClick={onOpenContact}
            data-cursor="hover"
            className="border-b-2 border-[#1a1a1a] pb-1 flex items-center gap-3 hover:opacity-70 transition-opacity cursor-pointer group uppercase active:scale-95"
          >
            <span>LET'S CONNECT</span>
            <span className="group-hover:translate-x-1 transition-transform">→</span>
          </button>
        </div>
      </div>

      {/* Right Column: Breathing Portrait & Satria Ring Architecture */}
      <div
        ref={rightColRef}
        data-cursor="hover"
        className="relative overflow-hidden bg-[#e5e3d8] flex items-end justify-center min-h-[450px] lg:min-h-full pt-16 select-none"
      >
        {/* Layer 1: Background Subtle Light Bloom */}
        <div
          ref={bloomRef}
          className="absolute w-[500px] h-[500px] rounded-full pointer-events-none will-change-transform"
          style={{
            background:
              'radial-gradient(circle, rgba(255,255,255,0.4) 0%, rgba(229,227,216,0) 70%)',
            top: '20%',
          }}
        />

        {/* Layer 2: SATRIA RING with Mouse Parallax (12-15px max) */}
        <div
          ref={ringRef}
          className="absolute pointer-events-none will-change-transform"
          style={{
            top: '10%',
            left: '-6%',
          }}
        >
          <SatriaRing
            size={520}
            strokeWidth={1}
            opacity={0.16}
            spinning={true}
            className="text-[#1a1a1a]"
          />
        </div>

        {/* Decorative Corner Motif */}
        <div className="absolute top-10 right-10 sm:top-12 sm:right-12 decorative-cross z-20 opacity-70" />

        {/* Vertical Scroll Down Indicator */}
        <button
          onClick={onViewWork}
          data-cursor="hover"
          className="absolute right-6 sm:right-8 top-1/2 -translate-y-1/2 flex flex-col items-center gap-3 z-20 hover:opacity-60 transition-opacity cursor-pointer text-[#1a1a1a]"
          title="Scroll down to explore"
        >
          <span
            className="font-mono text-[10px] sm:text-xs tracking-widest font-bold"
            style={{ writingMode: 'vertical-rl' }}
          >
            SCROLL DOWN
          </span>
          <ArrowDown className="w-3.5 h-3.5 animate-bounce" />
        </button>

        {/* Layer 3: Breathing Portrait with Mouse Parallax (8-10px max) */}
        <div
          ref={portraitRef}
          className="relative z-10 w-[82%] max-w-[520px] flex justify-center will-change-transform"
        >
          <img
            id="hero-profile-image"
            alt="Muhammad Satria Seiasmara"
            src={HERO_IMAGE_URL}
            className="w-full h-auto object-cover object-bottom filter contrast-125 saturate-50 drop-shadow-md pointer-events-none"
            referrerPolicy="no-referrer"
          />
        </div>
      </div>
    </header>
  );
};
