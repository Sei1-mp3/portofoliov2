import React, { useRef, useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { SatriaRing } from './SatriaRing';
import gsap from 'gsap';

interface ContactConvergenceProps {
  onOpenContact: () => void;
}

export const ContactConvergence: React.FC<ContactConvergenceProps> = ({ onOpenContact }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);

  const handleClick = () => {
    setIsClicked(true);

    // Click feedback ring expansion
    if (containerRef.current) {
      gsap.to(containerRef.current, {
        scale: 0.96,
        duration: 0.1,
        yoyo: true,
        repeat: 1,
        onComplete: () => {
          setIsClicked(false);
          onOpenContact();
        },
      });
    } else {
      onOpenContact();
    }
  };

  return (
    <div
      ref={containerRef}
      className="relative flex flex-col items-start md:items-end w-full select-none"
    >
      {/* Background Subtle Converging Satria Rings */}
      <div className="absolute -top-16 -right-16 md:-right-8 pointer-events-none opacity-20">
        <SatriaRing
          size={240}
          strokeWidth={0.8}
          spinning={true}
          pulse={isHovered}
          className="text-white"
        />
      </div>

      {/* Main Interactive CTA Button */}
      <button
        onClick={handleClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        data-cursor="cta"
        className="relative group bg-[#f2f0e6] text-[#1a1a1a] px-8 py-5 flex items-center gap-4 text-xs font-mono tracking-widest font-bold uppercase transition-all duration-300 hover:bg-white hover:shadow-2xl cursor-pointer active:scale-95"
      >
        {/* Animated Accent Underline */}
        <div
          className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-[#1a1a1a] origin-left transition-transform duration-300 ease-out"
          style={{
            transform: isHovered ? 'scaleX(1)' : 'scaleX(0)',
          }}
        />

        <span>GET IN TOUCH</span>

        <SatriaRing
          size={14}
          opacity={isHovered ? 1 : 0.4}
          className="transition-all duration-300 text-[#1a1a1a]"
        />

        <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform duration-300" />
      </button>

      {/* Auxiliary quick status */}
      <div className="mt-4 flex items-center gap-2 text-[10px] font-mono tracking-widest text-[#888] uppercase">
        <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" />
        <span>AVAILABLE FOR FREELANCE & PROJECTS</span>
      </div>
    </div>
  );
};
