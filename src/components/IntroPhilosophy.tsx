import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SatriaRing } from './motion/SatriaRing';
import { EASINGS, isReducedMotion } from './motion/MotionSystem';
import { TransitionBloom } from './motion/TransitionBloom';

gsap.registerPlugin(ScrollTrigger);

const THOUGHT_STEPS = [
  { label: 'AI', tag: '01 // INTELLIGENCE' },
  { label: 'BUILD', tag: '02 // ARCHITECTURE' },
  { label: 'SOLVE', tag: '03 // EXECUTION' },
  { label: 'CREATE', tag: '04 // EXPERIMENT' },
];

export const IntroPhilosophy: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const aboutColRef = useRef<HTMLDivElement>(null);
  const philColRef = useRef<HTMLDivElement>(null);
  const line1Ref = useRef<HTMLSpanElement>(null);
  const line2Ref = useRef<HTMLSpanElement>(null);
  const line3Ref = useRef<HTMLSpanElement>(null);
  const philHeaderRef = useRef<HTMLHeadingElement>(null);
  const philTextRef = useRef<HTMLParagraphElement>(null);
  const thoughtSequenceRef = useRef<HTMLDivElement>(null);

  const [activeThoughtIndex, setActiveThoughtIndex] = useState(0);
  const [hoveredWord, setHoveredWord] = useState<string | null>(null);

  useEffect(() => {
    if (isReducedMotion() || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      // 1. Scrubbed Opposing Displacement for About Headlines (Lines 1, 2, 3)
      const aboutTl = gsap.timeline({
        scrollTrigger: {
          trigger: aboutColRef.current,
          start: 'top 85%',
          end: 'bottom 20%',
          scrub: 0.8,
        },
      });

      if (line1Ref.current && line2Ref.current && line3Ref.current) {
        aboutTl
          .fromTo(
            line1Ref.current,
            { x: -30, opacity: 0.65 },
            { x: 0, opacity: 1, ease: 'none' },
            0
          )
          .fromTo(
            line2Ref.current,
            { x: 35, opacity: 0.65 },
            { x: 0, opacity: 1, ease: 'none' },
            0
          )
          .fromTo(
            line3Ref.current,
            { x: -20, opacity: 0.65 },
            { x: 0, opacity: 1, ease: 'none' },
            0
          );
      }

      // 2. Editorial Philosophy Reveal & Thought Evolution Sequence (AI -> BUILD -> SOLVE -> CREATE)
      if (philColRef.current && philHeaderRef.current) {
        let lastIdx = -1;
        const philTl = gsap.timeline({
          scrollTrigger: {
            trigger: philColRef.current,
            start: 'top 75%',
            end: 'bottom 30%',
            scrub: 0.6,
            onUpdate: (self) => {
              const idx = Math.min(
                THOUGHT_STEPS.length - 1,
                Math.floor(self.progress * THOUGHT_STEPS.length)
              );
              if (idx !== lastIdx) {
                lastIdx = idx;
                setActiveThoughtIndex(idx);
              }
            },
          },
        });

        philTl
          .fromTo(
            philHeaderRef.current,
            { y: 40, opacity: 0.3 },
            { y: 0, opacity: 1, ease: 'none' },
            0
          )
          .fromTo(
            philTextRef.current,
            { y: 30, opacity: 0.2 },
            { y: 0, opacity: 1, ease: 'none' },
            0.2
          );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="grid grid-cols-1 lg:grid-cols-2 border-b border-grid relative"
    >
      {/* 01. Intro Column (Dark Editorial Theme with Kinetic Opposing Typography) */}
      <div
        ref={aboutColRef}
        className="bg-[#1a1a1a] text-[#f2f0e6] p-10 sm:p-14 md:p-18 lg:p-20 flex flex-col justify-between relative overflow-hidden"
      >
        <TransitionBloom theme="charcoal" intensity={1.2} />

        {/* Minimal technical grid texture */}
        <div
          className="absolute inset-0 opacity-5 pointer-events-none"
          style={{
            backgroundImage:
              'radial-gradient(circle at 2px 2px, rgba(255,255,255,0.4) 1px, transparent 0)',
            backgroundSize: '24px 24px',
          }}
        />

        <div className="relative z-10">
          <div className="flex items-center gap-4 text-xs font-mono tracking-widest uppercase mb-10 opacity-75">
            <span>INTRODUCTION</span>
            <div className="h-px bg-[#f2f0e6] flex-grow opacity-25" />
          </div>

          {/* Opposing Scrub Typography */}
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl leading-[1.18] mb-8 font-normal tracking-tight select-none">
            {/* Line 1 */}
            <span ref={line1Ref} className="inline-block will-change-transform">
              I BUILD WITH{' '}
              <span
                onMouseEnter={() => setHoveredWord('CODE')}
                onMouseLeave={() => setHoveredWord(null)}
                data-cursor="hover"
                className="relative inline-block cursor-pointer font-medium underline decoration-white/30 hover:decoration-white transition-colors"
              >
                CODE
                {hoveredWord === 'CODE' && (
                  <span className="absolute -inset-1 rounded-xs bg-white/10 pointer-events-none" />
                )}
              </span>
              .
            </span>
            <br />

            {/* Line 2 */}
            <span ref={line2Ref} className="inline-block will-change-transform">
              I EXPERIMENT WITH{' '}
              <span
                onMouseEnter={() => setHoveredWord('AI')}
                onMouseLeave={() => setHoveredWord(null)}
                data-cursor="hover"
                className="relative inline-block cursor-pointer font-medium underline decoration-white/30 hover:decoration-white transition-colors"
              >
                AI
                {hoveredWord === 'AI' && (
                  <span className="absolute -inset-1 rounded-xs bg-white/15 pointer-events-none" />
                )}
              </span>
              .
            </span>
            <br />

            {/* Line 3 */}
            <span ref={line3Ref} className="inline-block will-change-transform">
              I LEARN BY{' '}
              <span
                onMouseEnter={() => setHoveredWord('MAKING')}
                onMouseLeave={() => setHoveredWord(null)}
                data-cursor="hover"
                className="relative inline-block cursor-pointer font-medium underline decoration-white/30 hover:decoration-white transition-colors"
              >
                MAKING
                {hoveredWord === 'MAKING' && (
                  <span className="absolute -inset-1 rounded-xs bg-white/10 pointer-events-none" />
                )}
              </span>
              .
            </span>
          </h2>

          <p className="text-sm md:text-base opacity-80 max-w-lg leading-relaxed font-sans font-light">
            I’m Muhammad Satria Seiasmara, a student and web developer focused on creating modern
            digital experiences and exploring the possibilities of artificial intelligence. I enjoy
            turning ideas into functional websites, experimenting with new technologies, and using AI
            to improve the way I build.
          </p>
        </div>

        <div className="mt-12 pt-6 border-t border-white/10 flex items-center justify-between text-xs font-mono tracking-widest opacity-60">
          <span>SMK PRESTASI PRIMA</span>
          <span>JAKARTA, INDONESIA</span>
        </div>
      </div>

      {/* 02. Philosophy Column (Light Editorial Storytelling & Sticky Thought Transformation) */}
      <div
        ref={philColRef}
        className="p-10 sm:p-14 md:p-18 lg:p-20 relative bg-[#f2f0e6] flex flex-col justify-between overflow-hidden"
      >
        <TransitionBloom theme="warm-gray" intensity={0.9} />

        {/* Lightweight Editorial Thought Sequence Display (Replaces heavy canvas) */}
        <div
          ref={thoughtSequenceRef}
          className="absolute right-8 top-12 md:right-14 md:top-16 z-0 pointer-events-none opacity-30 select-none text-right hidden sm:block"
        >
          <div className="font-mono text-[10px] tracking-widest text-[#1a1a1a] mb-1">
            {THOUGHT_STEPS[activeThoughtIndex].tag}
          </div>
          <div className="font-serif text-5xl md:text-6xl text-[#1a1a1a]/40 tracking-tighter">
            {THOUGHT_STEPS[activeThoughtIndex].label}
          </div>
        </div>

        {/* Decorative corner cross */}
        <div className="absolute top-10 right-10 sm:top-12 sm:right-12 decorative-cross opacity-40 z-10 pointer-events-none" />

        <div className="relative z-10">
          <div className="flex items-center gap-4 text-xs font-mono tracking-widest uppercase mb-10 text-[#1a1a1a]">
            <span>MY PHILOSOPHY</span>
            <div className="h-px bg-[#1a1a1a] flex-grow opacity-20" />
            <SatriaRing size={16} strokeWidth={1.5} opacity={0.4} />
          </div>

          <h2
            ref={philHeaderRef}
            className="font-serif text-3xl sm:text-4xl md:text-[2.85rem] lg:text-[3.2rem] leading-[1.1] mb-8 pr-6 text-[#1a1a1a] will-change-transform"
          >
            AI is reshaping the way we build, work, and solve problems.
          </h2>

          <p
            ref={philTextRef}
            className="text-sm md:text-base text-[#333333] max-w-lg leading-relaxed font-sans will-change-transform"
          >
            I believe AI is becoming an essential part of modern development. Rather than replacing
            the developer, I see it as a powerful development partner for research, experimentation,
            coding, debugging, and learning.
          </p>

          {/* Interactive Thought Pills */}
          <div className="mt-8 flex flex-wrap items-center gap-2">
            {THOUGHT_STEPS.map((step, idx) => (
              <button
                key={step.label}
                onClick={() => setActiveThoughtIndex(idx)}
                data-cursor="hover"
                className={`px-3 py-1 font-mono text-[10px] tracking-widest uppercase border transition-all cursor-pointer ${
                  activeThoughtIndex === idx
                    ? 'bg-[#1a1a1a] text-[#f2f0e6] border-[#1a1a1a]'
                    : 'bg-transparent text-[#666] border-grid hover:border-[#1a1a1a]'
                }`}
              >
                {step.label}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-grid flex items-center justify-between text-xs font-mono tracking-widest text-[#666] relative z-10">
          <span>DEV APPROACH</span>
          <span>HUMAN-CENTRIC + AI-DRIVEN</span>
        </div>
      </div>
    </section>
  );
};
