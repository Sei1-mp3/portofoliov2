import React, { useRef } from 'react';
import { ArrowUpRight, CheckCircle2, ShieldCheck, ExternalLink, Sparkles } from 'lucide-react';
import gsap from 'gsap';
import { Certification } from '../../types';
import { isReducedMotion } from './MotionSystem';

interface CertCardProps {
  cert: Certification;
  onSelect: () => void;
  onHover: (cert: Certification | null) => void;
}

export const CertArchiveCard: React.FC<CertCardProps> = ({ cert, onSelect, onHover }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const laserRef = useRef<HTMLDivElement>(null);

  const handleMouseEnter = () => {
    onHover(cert);

    // Laser scan sweep across the card on hover
    if (laserRef.current && !isReducedMotion()) {
      gsap.fromTo(
        laserRef.current,
        { left: '-15%', opacity: 0.8 },
        {
          left: '115%',
          opacity: 0,
          duration: 0.6,
          ease: 'power2.inOut',
        }
      );
    }
  };

  const handleMouseLeave = () => {
    onHover(null);
  };

  return (
    <div
      ref={cardRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      data-cursor="cert"
      className="bg-[#f2f0e6] border border-grid flex flex-col justify-between relative group select-none transition-all duration-300 ease-out hover:border-[#1a1a1a] hover:shadow-xl overflow-hidden"
    >
      {/* Laser scanline effect */}
      <div
        ref={laserRef}
        className="absolute top-0 bottom-0 w-32 bg-gradient-to-r from-transparent via-[#1a1a1a]/15 to-transparent pointer-events-none -left-32 z-20"
      />

      {/* Top Header info */}
      <div className="p-5 sm:p-6 border-b border-grid flex justify-between items-center bg-white/40">
        <div className="flex items-center gap-3">
          <span className="font-mono text-xs font-bold tracking-widest text-[#888] group-hover:text-[#1a1a1a] transition-colors">
            {cert.num} // ARCHIVE
          </span>
          <div className="flex items-center gap-1 text-[10px] font-mono tracking-widest text-emerald-700 bg-emerald-50 px-2 py-0.5 border border-emerald-200">
            <CheckCircle2 className="w-3 h-3 text-emerald-600" />
            <span>AUTHENTICATED</span>
          </div>
        </div>

        <span className="font-mono text-xs tracking-wider text-[#666]">
          {cert.year}
        </span>
      </div>

      {/* Prominent Certificate Image Preview */}
      <div
        onClick={onSelect}
        className="relative bg-[#1a1a1a]/5 p-3 sm:p-4 border-b border-grid cursor-pointer overflow-hidden group/img"
      >
        <div className="aspect-[4/3] w-full bg-white border border-grid shadow-xs overflow-hidden relative flex items-center justify-center">
          {cert.imageUrl ? (
            <img
              src={cert.imageUrl}
              alt={cert.name}
              referrerPolicy="no-referrer"
              className="w-full h-full object-contain transform group-hover/img:scale-[1.03] transition-transform duration-500 ease-out"
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center bg-[#e5e3d8] p-6 text-center">
              <ShieldCheck className="w-12 h-12 text-[#1a1a1a]/40 mb-2" />
              <span className="font-mono text-xs text-[#555]">{cert.name}</span>
            </div>
          )}

          {/* Subtle Hover Click Indicator Overlay */}
          <div className="absolute inset-0 bg-[#1a1a1a]/0 group-hover/img:bg-[#1a1a1a]/10 transition-colors flex items-center justify-center">
            <span className="opacity-0 group-hover/img:opacity-100 transition-opacity bg-[#1a1a1a] text-[#f2f0e6] text-[11px] font-mono tracking-widest px-3 py-1.5 shadow-lg flex items-center gap-1.5">
              <Sparkles className="w-3 h-3 text-amber-400" />
              CLICK TO EXPAND FULL VIEW
            </span>
          </div>
        </div>
      </div>

      {/* Body: Title, Issuer, and Description */}
      <div className="p-5 sm:p-6 flex-grow flex flex-col justify-between space-y-4">
        <div>
          <p className="text-[11px] font-mono tracking-wider text-[#777] uppercase mb-1">
            {cert.organization}
          </p>
          <h3
            onClick={onSelect}
            className="font-serif text-xl sm:text-2xl text-[#1a1a1a] cursor-pointer group-hover:underline transition-all leading-snug"
          >
            {cert.name}
          </h3>
          <p className="text-xs sm:text-sm text-[#444] leading-relaxed mt-2.5 font-sans">
            {cert.description}
          </p>
        </div>

        {/* Competencies Tags */}
        <div className="pt-2">
          <p className="text-[10px] font-mono tracking-widest uppercase text-[#888] mb-2">
            CORE COMPETENCIES
          </p>
          <div className="flex flex-wrap gap-1.5">
            {cert.skills.map((skill, i) => (
              <span
                key={i}
                className="text-[11px] font-mono bg-white px-2.5 py-1 border border-grid text-[#222]"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Footer Details & Actions */}
      <div className="p-4 sm:p-5 bg-white border-t border-grid flex flex-wrap justify-between items-center gap-3">
        <div className="text-[11px] font-mono text-[#666]">
          <span className="text-[#999]">ID: </span>
          <span className="font-bold text-[#1a1a1a]">{cert.credentialId}</span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={onSelect}
            className="text-xs font-mono tracking-wider font-bold text-[#1a1a1a] px-3 py-1.5 border border-grid hover:bg-[#1a1a1a] hover:text-[#f2f0e6] transition-colors cursor-pointer"
          >
            FULL VIEW
          </button>
          <a
            href={cert.verificationUrl}
            target="_blank"
            rel="noreferrer"
            className="text-xs font-mono tracking-wider font-bold bg-[#1a1a1a] text-[#f2f0e6] px-3.5 py-1.5 hover:bg-black transition-colors flex items-center gap-1.5"
          >
            <span>VERIFY</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>
    </div>
  );
};
