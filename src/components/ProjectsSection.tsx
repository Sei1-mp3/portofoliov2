import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
 import { ScrollTrigger } from 'gsap/ScrollTrigger';
 import { PROJECTS_DATA } from '../data';
 import { Project } from '../types';
 import { ProjectModal } from './ProjectModal';
 import { ProjectVelocityCard } from './motion/ProjectVelocityCard';
 import { SatriaRing } from './motion/SatriaRing';
 import { isReducedMotion } from './motion/MotionSystem';
 import { TransitionBloom } from './motion/TransitionBloom';

gsap.registerPlugin(ScrollTrigger);

export const ProjectsSection: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const cardsGridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isReducedMotion() || !sectionRef.current || !cardsGridRef.current) return;

    const ctx = gsap.context(() => {
      const cards = cardsGridRef.current?.children;
      if (cards && cards.length > 0) {
        gsap.fromTo(
          cards,
          { y: 60, opacity: 0, scale: 0.95 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.95,
            stagger: 0.15,
            ease: 'power3.out',
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

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="p-8 sm:p-12 md:p-16 lg:px-20 lg:py-24 border-b border-grid bg-[#e5e3d8]/30 relative overflow-hidden"
    >
      <TransitionBloom theme="neutral-gray" intensity={1} />

      <div className="flex justify-between items-center mb-14 md:mb-16 border-b border-grid pb-4 relative z-10">
        <div className="flex items-center gap-4">
          <h2 className="font-serif text-3xl sm:text-4xl tracking-wide uppercase text-[#1a1a1a]">
            SELECTED PROJECTS
          </h2>
          <SatriaRing size={16} opacity={0.3} />
        </div>
        <button
          onClick={() => setSelectedProject(PROJECTS_DATA[0])}
          data-cursor="hover"
          className="font-mono text-xs tracking-widest font-bold flex items-center gap-2 hover:opacity-70 transition-opacity uppercase cursor-pointer text-[#1a1a1a]"
        >
          <span>VIEW ALL</span>
          <span>→</span>
        </button>
      </div>

      <div
        ref={cardsGridRef}
        className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 relative z-10"
      >
        {PROJECTS_DATA.map((project, idx) => (
          <ProjectVelocityCard
            key={project.id}
            project={project}
            index={idx}
            onSelect={() => setSelectedProject(project)}
          />
        ))}
      </div>

      {/* Fullscreen Shared-Element Project Detail Modal */}
      <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
    </section>
  );
};

