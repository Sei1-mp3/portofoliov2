import React, { useEffect, useState } from 'react';
import { X, ArrowRight, Github, Linkedin } from 'lucide-react';
import { SatriaRing } from './motion/SatriaRing';

interface NavbarProps {
  onOpenContact: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenContact }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Smart navbar visibility: hide when scrolling down past 120px, reveal when scrolling up
      if (currentScrollY > 120) {
        if (currentScrollY > lastScrollY && currentScrollY - lastScrollY > 8) {
          setIsVisible(false);
        } else if (lastScrollY - currentScrollY > 8) {
          setIsVisible(true);
        }
      } else {
        setIsVisible(true);
      }
      setLastScrollY(currentScrollY);

      // Active Section tracker
      const sections = ['hero', 'about', 'skills', 'certifications', 'projects'];
      for (const sec of sections) {
        const el = document.getElementById(sec);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 240 && rect.bottom >= 240) {
            setActiveSection(sec);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  const scrollToSection = (id: string) => {
    setMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <nav
        id="navbar"
        className={`sticky top-0 z-40 bg-[#f2f0e6]/95 backdrop-blur-md border-b border-grid px-6 md:px-12 py-5 flex justify-between items-center transition-transform duration-300 ease-out ${
          isVisible ? 'translate-y-0' : '-translate-y-full'
        }`}
      >
        {/* Brand */}
        <button
          id="nav-brand-btn"
          onClick={() => scrollToSection('hero')}
          data-cursor="hover"
          className="flex items-center gap-3 font-mono text-sm tracking-widest font-bold hover:opacity-80 transition-opacity text-left cursor-pointer"
        >
          <div className="w-3.5 h-3.5 bg-[#1a1a1a]" />
          <span>SATRIA</span>
        </button>

        {/* Navigation links */}
        <div className="flex items-center gap-6 md:gap-8 text-xs font-mono tracking-widest font-bold">
          <div className="hidden md:flex items-center gap-8">
            <button
              id="nav-link-home"
              onClick={() => scrollToSection('hero')}
              data-cursor="hover"
              className={`pb-1 transition-all uppercase cursor-pointer relative flex items-center gap-1.5 ${
                activeSection === 'hero' ? 'text-[#1a1a1a]' : 'text-[#666] hover:text-[#1a1a1a]'
              }`}
            >
              {activeSection === 'hero' && <span className="w-1.5 h-1.5 bg-[#1a1a1a] rounded-full" />}
              <span>HOME</span>
              {activeSection === 'hero' && (
                <div className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-[#1a1a1a]" />
              )}
            </button>

            <button
              id="nav-link-about"
              onClick={() => scrollToSection('about')}
              data-cursor="hover"
              className={`pb-1 transition-all uppercase cursor-pointer relative flex items-center gap-1.5 ${
                activeSection === 'about' ? 'text-[#1a1a1a]' : 'text-[#666] hover:text-[#1a1a1a]'
              }`}
            >
              {activeSection === 'about' && <span className="w-1.5 h-1.5 bg-[#1a1a1a] rounded-full" />}
              <span>ABOUT</span>
              {activeSection === 'about' && (
                <div className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-[#1a1a1a]" />
              )}
            </button>

            <button
              id="nav-link-skills"
              onClick={() => scrollToSection('skills')}
              data-cursor="hover"
              className={`pb-1 transition-all uppercase cursor-pointer relative flex items-center gap-1.5 ${
                activeSection === 'skills' ? 'text-[#1a1a1a]' : 'text-[#666] hover:text-[#1a1a1a]'
              }`}
            >
              {activeSection === 'skills' && <span className="w-1.5 h-1.5 bg-[#1a1a1a] rounded-full" />}
              <span>SKILLS</span>
              {activeSection === 'skills' && (
                <div className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-[#1a1a1a]" />
              )}
            </button>

            <button
              id="nav-link-certs"
              onClick={() => scrollToSection('certifications')}
              data-cursor="hover"
              className={`pb-1 transition-all uppercase cursor-pointer relative flex items-center gap-1.5 ${
                activeSection === 'certifications'
                  ? 'text-[#1a1a1a]'
                  : 'text-[#666] hover:text-[#1a1a1a]'
              }`}
            >
              {activeSection === 'certifications' && (
                <span className="w-1.5 h-1.5 bg-[#1a1a1a] rounded-full" />
              )}
              <span>CERTS</span>
              {activeSection === 'certifications' && (
                <div className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-[#1a1a1a]" />
              )}
            </button>

            <button
              id="nav-link-projects"
              onClick={() => scrollToSection('projects')}
              data-cursor="hover"
              className={`pb-1 transition-all uppercase cursor-pointer relative flex items-center gap-1.5 ${
                activeSection === 'projects'
                  ? 'text-[#1a1a1a]'
                  : 'text-[#666] hover:text-[#1a1a1a]'
              }`}
            >
              {activeSection === 'projects' && (
                <span className="w-1.5 h-1.5 bg-[#1a1a1a] rounded-full" />
              )}
              <span>PROJECTS</span>
              {activeSection === 'projects' && (
                <div className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-[#1a1a1a]" />
              )}
            </button>

            <button
              id="nav-link-contact"
              onClick={onOpenContact}
              data-cursor="cta"
              className="hover:border-b-2 border-[#1a1a1a] pb-1 transition-all uppercase cursor-pointer text-[#1a1a1a]"
            >
              CONTACT
            </button>
          </div>

          {/* 9-dot grid button for menu/quick view */}
          <button
            id="nav-grid-menu-btn"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle Navigation Drawer"
            data-cursor="hover"
            className="p-2 hover:bg-black/5 rounded transition-colors group cursor-pointer"
            title="Open Quick Menu"
          >
            <div className="grid grid-cols-3 gap-[3px] w-4 h-4 place-items-center">
              {[...Array(9)].map((_, i) => (
                <div
                  key={i}
                  className="w-[3px] h-[3px] bg-[#1a1a1a] rounded-full group-hover:scale-125 transition-transform"
                />
              ))}
            </div>
          </button>
        </div>
      </nav>

      {/* Quick Menu Drawer / Overlay */}
      {menuOpen && (
        <div
          id="nav-drawer-overlay"
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex justify-end transition-opacity animate-[fadeIn_0.2s_ease-out]"
          onClick={() => setMenuOpen(false)}
        >
          <div
            id="nav-drawer-content"
            className="w-full max-w-sm bg-[#f2f0e6] h-full shadow-2xl p-8 flex flex-col justify-between border-l border-grid animate-[slideInRight_0.3s_cubic-bezier(0.16,1,0.3,1)]"
            onClick={(e) => e.stopPropagation()}
          >
            <div>
              <div className="flex justify-between items-center pb-6 border-b border-grid mb-8">
                <div className="flex items-center gap-3 font-mono text-sm tracking-widest font-bold">
                  <div className="w-3.5 h-3.5 bg-[#1a1a1a]" />
                  <span>NAVIGATION</span>
                </div>
                <button
                  id="drawer-close-btn"
                  onClick={() => setMenuOpen(false)}
                  className="p-2 hover:bg-black/10 transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="flex flex-col gap-4 font-mono text-sm tracking-widest">
                <button
                  onClick={() => scrollToSection('hero')}
                  className="text-left py-3 px-4 border border-grid hover:bg-[#1a1a1a] hover:text-[#f2f0e6] transition-colors flex items-center justify-between cursor-pointer group"
                >
                  <span>01. HOME</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
                <button
                  onClick={() => scrollToSection('about')}
                  className="text-left py-3 px-4 border border-grid hover:bg-[#1a1a1a] hover:text-[#f2f0e6] transition-colors flex items-center justify-between cursor-pointer group"
                >
                  <span>02. ABOUT & PHILOSOPHY</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
                <button
                  onClick={() => scrollToSection('skills')}
                  className="text-left py-3 px-4 border border-grid hover:bg-[#1a1a1a] hover:text-[#f2f0e6] transition-colors flex items-center justify-between cursor-pointer group"
                >
                  <span>03. SKILLS & EXPERTISE</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
                <button
                  onClick={() => scrollToSection('certifications')}
                  className="text-left py-3 px-4 border border-grid hover:bg-[#1a1a1a] hover:text-[#f2f0e6] transition-colors flex items-center justify-between cursor-pointer group"
                >
                  <span>04. CERTIFICATIONS</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
                <button
                  onClick={() => scrollToSection('projects')}
                  className="text-left py-3 px-4 border border-grid hover:bg-[#1a1a1a] hover:text-[#f2f0e6] transition-colors flex items-center justify-between cursor-pointer group"
                >
                  <span>05. SELECTED PROJECTS</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
                <button
                  onClick={() => {
                    setMenuOpen(false);
                    onOpenContact();
                  }}
                  className="text-left py-3 px-4 border border-grid bg-[#1a1a1a] text-[#f2f0e6] hover:bg-black transition-colors flex items-center justify-between cursor-pointer group"
                >
                  <span>06. GET IN TOUCH</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>

            <div className="pt-6 border-t border-grid text-xs font-mono">
              <p className="text-[#333] mb-4">MUHAMMAD SATRIA SEIASMARA</p>
              <div className="flex gap-4 opacity-75">
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:underline flex items-center gap-1"
                >
                  <Github className="w-3.5 h-3.5" /> GitHub
                </a>
                <span>/</span>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:underline flex items-center gap-1"
                >
                  <Linkedin className="w-3.5 h-3.5" /> LinkedIn
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
