/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { IntroPhilosophy } from './components/IntroPhilosophy';
import { SkillsSection } from './components/SkillsSection';
import { CertificationsSection } from './components/CertificationsSection';
import { ProjectsSection } from './components/ProjectsSection';
import { FooterCta } from './components/FooterCta';
import { ContactModal } from './components/ContactModal';
import { CustomCursor } from './components/motion/CustomCursor';
import { SmoothScrollProvider } from './components/motion/SmoothScrollProvider';
import { ScrollProgressRing } from './components/motion/ScrollProgress';
import { SceneNavigationHud } from './components/motion/TransitionOverlays';
import { Loader } from './components/motion/Loader';

gsap.registerPlugin(ScrollTrigger);

const SCENES = [
  { id: 'hero', name: 'IDENTITY', index: 1 },
  { id: 'about', name: 'PHILOSOPHY', index: 2 },
  { id: 'skills', name: 'CAPABILITIES', index: 3 },
  { id: 'certifications', name: 'ARCHIVE', index: 4 },
  { id: 'projects', name: 'CREATIONS', index: 5 },
  { id: 'contact', name: 'CONVERGENCE', index: 6 },
];

export default function App() {
  const [contactOpen, setContactOpen] = useState(false);
  const [activeScene, setActiveScene] = useState(SCENES[0]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Setup ScrollTrigger for scene tracker
    const triggers: ScrollTrigger[] = [];

    SCENES.forEach((scene) => {
      const el = document.getElementById(scene.id);
      if (el) {
        const trigger = ScrollTrigger.create({
          trigger: el,
          start: 'top 50%',
          end: 'bottom 50%',
          onEnter: () => setActiveScene(scene),
          onEnterBack: () => setActiveScene(scene),
        });
        triggers.push(trigger);
      }
    });

    return () => {
      triggers.forEach((t) => t.kill());
    };
  }, []);

  const scrollToProjects = () => {
    const el = document.getElementById('projects');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <SmoothScrollProvider>
      {/* 01. Editorial Technical Loading Screen with Split Transition */}
      {!isLoaded && <Loader onComplete={() => setIsLoaded(true)} />}

      <div className="min-h-screen bg-[#f2f0e6] text-[#1a1a1a] flex flex-col font-sans selection:bg-[#1a1a1a] selection:text-[#f2f0e6] relative">
        {/* Contextual Desktop Precision Cursor */}
        <CustomCursor />

        {/* Global Floating Scroll Progress Indicator */}
        <ScrollProgressRing />

        {/* Scene Navigation HUD (Minimal Editorial Indicator) */}
        <SceneNavigationHud
          currentSection={activeScene.name}
          sectionIndex={activeScene.index}
          totalSections={SCENES.length}
        />

        {/* Top Navbar */}
        <Navbar onOpenContact={() => setContactOpen(true)} />

        {/* Main Content Sections */}
        <main className="flex-grow">
          {/* 01. Hero Section (with Multi-step entrance & kinetic typography) */}
          <Hero
            onOpenContact={() => setContactOpen(true)}
            onViewWork={scrollToProjects}
          />

          {/* 02. Introduction & Philosophy (with Opposing typography & Editorial thought sequence) */}
          <IntroPhilosophy />

          {/* 03. What I Work With (with Modern hover interactions & line morphing) */}
          <SkillsSection />

          {/* 04. Certifications (with Digital archive laser scan & floating credential follower) */}
          <CertificationsSection />

          {/* 05. Selected Projects (with Distortion illusion & case study modals) */}
          <ProjectsSection />
        </main>

        {/* 06. Call to Action & Footer (with Converging Satria Ring & Minimal Footer) */}
        <FooterCta onOpenContact={() => setContactOpen(true)} />

        {/* Interactive Contact Drawer/Modal */}
        <ContactModal isOpen={contactOpen} onClose={() => setContactOpen(false)} />
      </div>
    </SmoothScrollProvider>
  );
}
