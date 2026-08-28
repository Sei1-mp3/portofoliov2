import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
 import { ScrollTrigger } from 'gsap/ScrollTrigger';
 import { ArrowRight } from 'lucide-react';
 import { ContactConvergence } from './motion/ContactConvergence';
 import { SatriaRing } from './motion/SatriaRing';
 import { isReducedMotion } from './motion/MotionSystem';
 import { TransitionBloom } from './motion/TransitionBloom';

gsap.registerPlugin(ScrollTrigger);

interface FooterCtaProps {
  onOpenContact: () => void;
}

export const FooterCta: React.FC<FooterCtaProps> = ({ onOpenContact }) => {
  const footerRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const dividerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isReducedMotion() || !footerRef.current) return;

    const ctx = gsap.context(() => {
      if (headlineRef.current) {
        gsap.fromTo(
          headlineRef.current,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: footerRef.current,
              start: 'top 80%',
              toggleActions: 'play none none none',
            },
          }
        );
      }

      if (dividerRef.current) {
        gsap.fromTo(
          dividerRef.current,
          { scaleX: 0, transformOrigin: 'left' },
          {
            scaleX: 1,
            duration: 1.2,
            ease: 'power4.out',
            scrollTrigger: {
              trigger: footerRef.current,
              start: 'top 75%',
              toggleActions: 'play none none none',
            },
          }
        );
      }
    }, footerRef);

    return () => ctx.revert();
  }, []);

  return (
    <footer
      id="contact"
      ref={footerRef}
      className="bg-[#1a1a1a] text-[#f2f0e6] relative overflow-hidden"
    >
      <TransitionBloom theme="deep-black" intensity={1.8} />

      <div className="absolute bottom-0 right-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none" />

      <div className="p-10 sm:p-14 md:p-18 lg:px-20 lg:py-24 relative z-10 border-b border-white/10 flex flex-col md:flex-row justify-between items-start md:items-end gap-12">
        <div>
          <div className="font-mono text-xs tracking-widest uppercase mb-4 opacity-70 flex items-center gap-3">
            <span>HAVE AN IDEA?</span>
            <SatriaRing size={12} opacity={0.5} />
          </div>
          <h2
            ref={headlineRef}
            className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-[4rem] leading-[1.08] mb-6 tracking-tight select-none"
          >
            LET'S BUILD
            <br />
            SOMETHING GREAT.
          </h2>
          <div
            ref={dividerRef}
            className="h-px w-48 sm:w-64 bg-[#f2f0e6] opacity-30 mt-8"
          />
        </div>

        <div className="flex flex-col items-start md:items-end gap-8 max-w-md w-full relative">
          <div className="absolute -top-10 right-0 decorative-cross decorative-cross-light hidden md:block" />

          <p className="text-sm font-sans font-light opacity-80 md:text-right leading-relaxed">
            Building for the web. Exploring what’s possible with artificial intelligence.
          </p>

          {/* Interactive Converging Particles & Magnetic Ring CTA */}
          <div className="w-full">
            <ContactConvergence onOpenContact={onOpenContact} />
          </div>
        </div>
      </div>

      {/* Bottom Minimal Footer Bar */}
      <div className="px-8 sm:px-12 py-6 text-[10px] sm:text-xs font-mono tracking-widest flex flex-col md:flex-row justify-between items-center gap-4 opacity-60">
        <p>© 2026 Muhammad Satria Seiasmara. All rights reserved.</p>
        <div className="flex items-center gap-4">
          <a
            href="https://github.com"
            target="_blank"
            rel="noreferrer"
            className="hover:text-white transition-colors"
          >
            GitHub
          </a>
          <span>/</span>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noreferrer"
            className="hover:text-white transition-colors"
          >
            LinkedIn
          </a>
          <span>/</span>
          <button
            onClick={onOpenContact}
            className="hover:text-white transition-colors pr-6 relative cursor-pointer text-left"
          >
            Email
            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3.5 h-px bg-current" />
            <div className="absolute right-[6px] top-1/2 -translate-y-1/2 w-px h-3.5 bg-current" />
          </button>
        </div>
      </div>
    </footer>
  );
};

