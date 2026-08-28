import React from 'react';
import { X, CheckCircle2, Code2, Sparkles, Cpu, Layers } from 'lucide-react';
import { Skill } from '../types';

interface SkillModalProps {
  skill: Skill | null;
  onClose: () => void;
}

export const SkillModal: React.FC<SkillModalProps> = ({ skill, onClose }) => {
  if (!skill) return null;

  return (
    <div
      id="skill-modal-overlay"
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6"
      onClick={onClose}
    >
      <div
        id="skill-modal-container"
        className="bg-[#f2f0e6] w-full max-w-xl border border-grid shadow-2xl overflow-hidden relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-[#1a1a1a] text-[#f2f0e6] p-6 flex justify-between items-start border-b border-grid">
          <div>
            <div className="flex items-center gap-3 text-xs font-mono tracking-widest uppercase opacity-75 mb-2">
              <span>SKILL SPECIFICATION</span>
              <span>/</span>
              <span>NO. {skill.num}</span>
            </div>
            <h3 className="font-serif text-2xl sm:text-3xl whitespace-pre-line leading-tight">
              {skill.title}
            </h3>
          </div>
          <button
            onClick={onClose}
            aria-label="Close modal"
            className="p-2 text-white/70 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 sm:p-8 space-y-6">
          <div>
            <p className="text-sm font-mono tracking-widest uppercase text-[#666] mb-2">
              OVERVIEW
            </p>
            <p className="text-sm leading-relaxed text-[#333] font-sans">{skill.description}</p>
          </div>

          <div className="p-4 bg-white border border-grid">
            <p className="text-xs font-mono tracking-widest uppercase text-[#666] mb-2 flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5 text-[#1a1a1a]" />
              CORE APPROACH & HIGHLIGHT
            </p>
            <p className="text-xs text-[#333] leading-relaxed">{skill.highlight}</p>
          </div>

          <div>
            <p className="text-sm font-mono tracking-widest uppercase text-[#666] mb-3">
              TECHNOLOGIES & TOOLING
            </p>
            <div className="grid grid-cols-2 gap-2.5">
              {skill.technologies.map((tech, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-2 text-xs font-mono bg-[#e5e3d8] px-3 py-2 border border-grid"
                >
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#1a1a1a] shrink-0" />
                  <span className="truncate">{tech}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-[#e5e3d8] border-t border-grid flex justify-end">
          <button
            onClick={onClose}
            className="bg-[#1a1a1a] text-[#f2f0e6] px-6 py-2.5 text-xs font-mono tracking-widest uppercase hover:bg-black transition-colors"
          >
            CLOSE
          </button>
        </div>
      </div>
    </div>
  );
};
