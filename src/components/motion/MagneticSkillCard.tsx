import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { Skill } from '../../types';
import { SatriaRing } from './SatriaRing';

interface MagneticSkillCardProps {
  skill: Skill;
  onSelect: () => void;
  renderIcon: (icon: string) => React.ReactNode;
}

export const MagneticSkillCard: React.FC<MagneticSkillCardProps> = ({
  skill,
  onSelect,
  renderIcon,
}) => {
  return (
    <div
      onClick={onSelect}
      data-cursor="hover"
      className="p-8 border border-grid bg-[#f2f0e6] relative flex flex-col justify-between h-[360px] cursor-pointer group select-none transition-all duration-300 ease-out hover:border-[#1a1a1a] hover:-translate-y-1.5 hover:shadow-lg"
    >
      {/* Subtle top indicator line with scaleX expansion on hover via CSS */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-[#1a1a1a] origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out" />

      {/* Header: Skill number & Icon with hover reaction */}
      <div>
        <div className="flex justify-between items-start mb-6">
          <span className="font-mono text-xs tracking-widest text-[#888] group-hover:text-[#1a1a1a] group-hover:font-bold transition-all">
            {skill.num}
          </span>
          <div className="text-[#1a1a1a] opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300">
            {renderIcon(skill.iconType)}
          </div>
        </div>

        {/* Title */}
        <h3 className="font-serif text-xl sm:text-2xl mb-3 text-[#1a1a1a] tracking-tight group-hover:translate-x-1 transition-transform duration-300 whitespace-pre-line leading-snug">
          {skill.title}
        </h3>

        {/* Short Description */}
        <p className="text-xs sm:text-sm text-[#555] leading-relaxed font-sans line-clamp-3">
          {skill.description}
        </p>
      </div>

      {/* Footer: Tech stack pill tags & Arrow indicator */}
      <div>
        <div className="flex flex-wrap gap-1.5 mb-6">
          {(skill.technologies || []).slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="text-[10px] font-mono tracking-wider px-2 py-0.5 border border-grid text-[#666] bg-black/[0.02]"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="pt-4 border-t border-grid flex items-center justify-between text-xs font-mono tracking-widest text-[#1a1a1a]">
          <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 font-bold">
            VIEW DETAILS
          </span>
          <div className="flex items-center gap-2">
            <SatriaRing
              size={12}
              opacity={0.8}
              className="opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            />
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </div>
        </div>
      </div>
    </div>
  );
};
