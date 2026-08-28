import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SKILLS_DATA } from '../data';
import { Skill } from '../types';
import { SkillModal } from './SkillModal';
import { MagneticSkillCard } from './motion/MagneticSkillCard';
import { SatriaRing } from './motion/SatriaRing';
import { EASINGS, isReducedMotion } from './motion/MotionSystem';
import { TransitionBloom } from './motion/TransitionBloom';

gsap.registerPlugin(ScrollTrigger);

export const SkillsSection: React.FC = () => {
  const [selectedSkill, setSelectedSkill] = useState<Skill | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const headerLineRef = useRef<HTMLDivElement>(null);
  const cardsGridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isReducedMotion() || !sectionRef.current || !cardsGridRef.current) return;

    const ctx = gsap.context(() => {
      // Header line draw
      if (headerLineRef.current) {
        gsap.fromTo(
          headerLineRef.current,
          { scaleX: 0, transformOrigin: 'left' },
          {
            scaleX: 1,
            duration: 0.9,
            ease: EASINGS.lineDraw,
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 80%',
              toggleActions: 'play none none none',
            },
          }
        );
      }

      // Sequential card reveal
      const cards = cardsGridRef.current?.children;
      if (cards && cards.length > 0) {
        gsap.fromTo(
          cards,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.85,
            stagger: 0.12,
            ease: EASINGS.power3Out,
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 75%',
              toggleActions: 'play none none none',
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const renderIcon = (iconType: string) => {
    switch (iconType) {
      case 'code':
        return <span className="font-mono text-2xl font-light tracking-tighter">&lt;/&gt;</span>;
      case 'frontend':
        return (
          <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
            <path d="M12 2C8.5 2 8 4 8 4V6H16V8H8V10H6V6C6 6 6 2 12 2C18 2 18 6 18 6V8H16V6C16 6 15.5 4 12 4ZM12 22C15.5 22 16 20 16 20V18H8V16H16V14H18V18C18 18 18 22 12 22C6 22 6 18 6 18V16H8V18C8 18 8.5 20 12 20Z" />
            <circle cx="10" cy="5" r="1" fill="currentColor" />
            <circle cx="14" cy="19" r="1" fill="currentColor" />
          </svg>
        );
      case 'ai':
        return (
          <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
            <rect height="16" rx="2" ry="2" width="16" x="4" y="4" />
            <path d="M9 9h6v6H9z" strokeWidth="1.2" />
            <path d="M9 1v3M15 1v3M9 20v3M15 20v3M20 9h3M20 14h3M1 9h3M1 14h3" />
            <text
              fontFamily="monospace"
              fontSize="6"
              fontWeight="bold"
              textAnchor="middle"
              x="12"
              y="13"
              fill="currentColor"
              stroke="none"
            >
              AI
            </text>
          </svg>
        );
      case 'python':
      default:
        return (
          <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
            <path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96.44 2.5 2.5 0 0 1-2.96-3.08 2.5 2.5 0 0 1-.58-4.86 2.5 2.5 0 0 1 2.96-3.08 2.5 2.5 0 0 1 3.04-6.92z" />
            <path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96.44 2.5 2.5 0 0 0 2.96-3.08 2.5 2.5 0 0 0 .58-4.86 2.5 2.5 0 0 0-2.96-3.08 2.5 2.5 0 0 0-3.04-6.92z" />
          </svg>
        );
    }
  };

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="p-8 sm:p-12 md:p-16 lg:px-20 lg:py-24 border-b border-grid relative overflow-hidden bg-[#f2f0e6]"
    >
      <TransitionBloom theme="cream" intensity={0.9} />

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-14 md:mb-16 gap-6 relative z-10">
        <h2 className="font-serif text-3xl sm:text-4xl tracking-wide uppercase text-[#1a1a1a]">
          WHAT I WORK WITH
        </h2>
        <div className="flex items-center gap-4 text-xs font-mono tracking-widest uppercase w-full md:w-auto text-[#666]">
          <div ref={headerLineRef} className="h-px bg-[#1a1a1a] flex-grow md:w-48 opacity-20 hidden md:block" />
          <span>SKILLS & EXPERTISE</span>
          <div className="h-px bg-[#1a1a1a] w-12 opacity-20 hidden md:block" />
          <SatriaRing size={14} opacity={0.3} />
        </div>
      </div>

      <div
        ref={cardsGridRef}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10"
      >
        {SKILLS_DATA.map((skill) => (
          <MagneticSkillCard
            key={skill.num}
            skill={skill}
            onSelect={() => setSelectedSkill(skill)}
            renderIcon={renderIcon}
          />
        ))}
      </div>

      <SkillModal skill={selectedSkill} onClose={() => setSelectedSkill(null)} />
    </section>
  );
};
