import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CERTIFICATIONS_DATA } from '../data';
import { Certification } from '../types';
import { CertModal } from './CertModal';
import { CertArchiveCard } from './motion/CertArchiveScanner';
import { SatriaRing } from './motion/SatriaRing';
import { isReducedMotion } from './motion/MotionSystem';
import { TransitionBloom } from './motion/TransitionBloom';

gsap.registerPlugin(ScrollTrigger);

export const CertificationsSection: React.FC = () => {
  const [selectedCert, setSelectedCert] = useState<Certification | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isReducedMotion() || !sectionRef.current || !listRef.current) return;

    const ctx = gsap.context(() => {
      const cards = listRef.current?.children;
      if (cards && cards.length > 0) {
        gsap.fromTo(
          cards,
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.15,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 80%',
              toggleActions: 'play none none none',
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="certifications"
      ref={sectionRef}
      className="p-8 sm:p-12 md:p-16 lg:px-20 lg:py-24 border-b border-grid relative bg-[#f2f0e6]"
    >
      <TransitionBloom theme="warm-gray" intensity={0.95} />

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 md:mb-16 gap-6 relative z-10">
        <h2 className="font-serif text-3xl sm:text-4xl tracking-wide uppercase text-[#1a1a1a]">
          CERTIFICATIONS
        </h2>
        <div className="flex items-center gap-4 text-xs font-mono tracking-widest uppercase w-full md:w-auto text-[#666]">
          <div className="h-px bg-[#1a1a1a] flex-grow md:w-48 opacity-20 hidden md:block" />
          <span>OFFICIAL CREDENTIALS & CERTIFICATES</span>
          <div className="h-px bg-[#1a1a1a] w-12 opacity-20 hidden md:block" />
          <SatriaRing size={14} opacity={0.3} />
        </div>
      </div>

      <div
        ref={listRef}
        className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 relative z-10"
      >
        {CERTIFICATIONS_DATA.map((cert) => (
          <CertArchiveCard
            key={cert.num}
            cert={cert}
            onSelect={() => setSelectedCert(cert)}
            onHover={() => {}}
          />
        ))}
      </div>

      {/* High-Resolution Modal on Click */}
      <CertModal cert={selectedCert} onClose={() => setSelectedCert(null)} />
    </section>
  );
};


