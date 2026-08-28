import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { Project } from '../../types';
import { SatriaRing } from './SatriaRing';

interface ProjectVelocityCardProps {
  project: Project;
  index: number;
  onSelect: () => void;
}

export const ProjectVelocityCard: React.FC<ProjectVelocityCardProps> = ({
  project,
  index,
  onSelect,
}) => {
  return (
    <div
      onClick={onSelect}
      data-cursor="project"
      data-cursor-text="VIEW"
      className="group cursor-pointer border border-grid bg-[#f2f0e6] relative overflow-hidden flex flex-col justify-between select-none transition-all duration-300 ease-out hover:border-[#1a1a1a] hover:-translate-y-1 hover:shadow-xl"
    >
      {/* Top accent indicator line */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-[#1a1a1a] origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out z-20" />

      {/* Graphic Container with Lightweight Distortion Illusion on Hover */}
      <div className="aspect-[16/10] overflow-hidden bg-[#1a1a1a] text-[#f2f0e6] relative border-b border-grid flex flex-col justify-between p-5 select-none">
        {/* Subtle grid pattern background */}
        <div
          className="absolute inset-0 opacity-10 pointer-events-none"
          style={{
            backgroundImage:
              'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.4) 1px, transparent 0)',
            backgroundSize: '16px 16px',
          }}
        />

        {/* Minimal Category Tag */}
        <div className="flex justify-between items-start relative z-10">
          <div className="bg-[#f2f0e6]/10 backdrop-blur-xs px-2.5 py-1 text-[9px] font-mono tracking-widest uppercase border border-white/15 text-[#f2f0e6] font-semibold">
            {project.category}
          </div>

          <div className="bg-white/10 backdrop-blur-xs px-2 py-1 text-[9px] font-mono tracking-widest uppercase text-[#f2f0e6]">
            0{index + 1}
          </div>
        </div>

        {/* Central Abstract Blueprint Graphic */}
        <div className="relative z-10 py-2 transition-transform duration-500 ease-out group-hover:scale-[1.03] group-hover:-skew-x-1">
          <div className="font-mono text-[9px] tracking-widest text-[#888] mb-1">
            SYS::ARCH // {project.id}
          </div>
          <div className="font-serif text-xl sm:text-2xl text-white font-medium tracking-tight truncate">
            {project.title}
          </div>
        </div>

        {/* Bottom Accent line indicator */}
        <div className="flex justify-between items-center text-[9px] font-mono tracking-widest text-[#aaa] relative z-10 pt-2 border-t border-white/10">
          <span>STATUS // PRODUCTION</span>
          <SatriaRing size={16} opacity={0.6} spinning={true} />
        </div>
      </div>

      {/* Content & Metadata */}
      <div className="p-6 flex flex-col justify-between flex-grow">
        <div>
          <h3 className="font-serif text-xl sm:text-2xl mb-2.5 text-[#1a1a1a] tracking-tight group-hover:underline">
            {project.title}
          </h3>
          <p className="text-xs text-[#555] font-sans leading-relaxed line-clamp-2 mb-6">
            {project.shortDesc}
          </p>
        </div>

        <div>
          {/* Tech Stack Pills */}
          <div className="flex flex-wrap gap-1.5 mb-6">
            {(project.tags || []).map((tag) => (
              <span
                key={tag}
                className="text-[9px] font-mono tracking-wider px-2 py-0.5 border border-grid text-[#666] bg-black/[0.02]"
              >
                {tag}
              </span>
            ))}
          </div>

          <div className="pt-4 border-t border-grid flex items-center justify-between text-xs font-mono tracking-widest text-[#1a1a1a]">
            <span className="font-bold">VIEW CASE STUDY</span>
            <div className="flex items-center gap-2">
              <SatriaRing size={12} opacity={0.8} />
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
