import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SatriaRing } from './SatriaRing';
import { EASINGS, isReducedMotion } from './MotionSystem';

gsap.registerPlugin(ScrollTrigger);

// 1. Ring Portal Overlay: Transforms the Satria Ring into an expanding portal during Hero -> About
export const RingPortalOverlay: React.FC<{ progress?: number }> = ({ progress = 0 }) => {
  return (
    <div className="pointer-events-none absolute inset-0 z-20 flex items-center justify-center overflow-hidden">
      <div
        className="transition-transform duration-300 ease-out text-[#1a1a1a]"
        style={{
          transform: `scale(${1 + progress * 8}) rotate(${progress * 90}deg)`,
          opacity: Math.max(0, 1 - progress * 1.5),
        }}
      >
        <SatriaRing size={480} strokeWidth={1.5} opacity={0.25} spinning={false} />
      </div>
    </div>
  );
};

// 2. Technical Scanner Overlay: Sweeps across boundary between Skills and Certifications
export const ScannerLaserOverlay: React.FC<{ active?: boolean }> = ({ active = false }) => {
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!lineRef.current || isReducedMotion()) return;

    if (active) {
      gsap.fromTo(
        lineRef.current,
        { left: '-10%', opacity: 0 },
        {
          left: '110%',
          opacity: 1,
          duration: 1.4,
          ease: EASINGS.techScan,
          onComplete: () => {
            gsap.set(lineRef.current, { opacity: 0 });
          },
        }
      );
    }
  }, [active]);

  return (
    <div
      ref={lineRef}
      className="pointer-events-none fixed top-0 bottom-0 w-[2px] bg-gradient-to-b from-transparent via-[#1a1a1a] to-transparent z-40 opacity-0 shadow-[0_0_12px_rgba(0,0,0,0.4)]"
    >
      <div className="absolute top-1/2 left-3 -translate-y-1/2 font-mono text-[9px] tracking-widest text-[#1a1a1a] bg-[#f2f0e6]/90 px-1.5 py-0.5 border border-grid whitespace-nowrap">
        SCAN::INDEX_MATCH 100%
      </div>
    </div>
  );
};

// 3. Floating Scene Navigation Tracker (Minimal Editorial Hud)
export const SceneNavigationHud: React.FC<{
  currentSection: string;
  sectionIndex: number;
  totalSections?: number;
}> = ({ currentSection, sectionIndex, totalSections = 6 }) => {
  return (
    <div className="fixed left-6 bottom-8 z-30 hidden lg:flex items-center gap-4 text-[10px] font-mono tracking-widest uppercase pointer-events-none select-none mix-blend-difference text-white">
      <div className="flex items-center gap-2">
        <span className="font-bold">SCENE 0{sectionIndex}</span>
        <span className="opacity-40">/</span>
        <span className="opacity-60">0{totalSections}</span>
      </div>
      <div className="w-8 h-px bg-white/40" />
      <span className="tracking-[0.25em] font-semibold">{currentSection}</span>
    </div>
  );
};
