import React from 'react';
import { X, Award, ExternalLink, CheckCircle, ShieldCheck, Download } from 'lucide-react';
import { Certification } from '../types';

interface CertModalProps {
  cert: Certification | null;
  onClose: () => void;
}

export const CertModal: React.FC<CertModalProps> = ({ cert, onClose }) => {
  if (!cert) return null;

  return (
    <div
      id="cert-modal-overlay"
      className="fixed inset-0 z-50 bg-black/75 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
      onClick={onClose}
    >
      <div
        id="cert-modal-container"
        className="bg-[#f2f0e6] w-full max-w-3xl border border-grid shadow-2xl overflow-hidden relative my-auto max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Certificate Banner */}
        <div className="bg-[#1a1a1a] text-[#f2f0e6] p-6 sm:p-7 flex justify-between items-start border-b border-grid relative overflow-hidden shrink-0">
          <div className="absolute right-0 top-0 translate-x-8 -translate-y-8 opacity-10 pointer-events-none">
            <Award className="w-48 h-48" />
          </div>

          <div className="relative z-10 pr-6">
            <div className="flex items-center gap-2 text-xs font-mono tracking-widest text-[#e5e3d8] mb-2 uppercase">
              <ShieldCheck className="w-4 h-4 text-amber-400" />
              <span>OFFICIAL CERTIFICATE ARCHIVE</span>
            </div>
            <h3 className="font-serif text-2xl sm:text-3xl tracking-tight mb-1">{cert.name}</h3>
            <p className="font-mono text-xs text-white/75 tracking-wider uppercase">
              {cert.organization} · {cert.year}
            </p>
          </div>

          <button
            onClick={onClose}
            aria-label="Close modal"
            className="relative z-10 p-2 text-white/70 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Certificate Details & Image */}
        <div className="p-6 sm:p-8 space-y-6 overflow-y-auto flex-grow">
          {/* Certificate Image Display */}
          {cert.imageUrl && (
            <div className="bg-white p-3 border border-grid shadow-md">
              <img
                src={cert.imageUrl}
                alt={cert.name}
                referrerPolicy="no-referrer"
                className="w-full h-auto object-contain max-h-[50vh] mx-auto"
              />
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-white p-4 border border-grid">
            <div>
              <p className="text-[10px] font-mono tracking-widest uppercase text-[#777]">CREDENTIAL ID</p>
              <p className="text-xs font-mono font-bold text-[#1a1a1a] mt-1">{cert.credentialId}</p>
            </div>
            <div>
              <p className="text-[10px] font-mono tracking-widest uppercase text-[#777]">ISSUE DATE</p>
              <p className="text-xs font-mono font-bold text-[#1a1a1a] mt-1">{cert.issueDate}</p>
            </div>
          </div>

          <div>
            <p className="text-xs font-mono tracking-widest uppercase text-[#666] mb-2">
              CURRICULUM & VALIDATION
            </p>
            <p className="text-xs sm:text-sm text-[#333] leading-relaxed font-sans">{cert.description}</p>
          </div>

          <div>
            <p className="text-xs font-mono tracking-widest uppercase text-[#666] mb-3">
              VERIFIED COMPETENCIES
            </p>
            <div className="flex flex-wrap gap-2">
              {cert.skills.map((skill, index) => (
                <span
                  key={index}
                  className="inline-flex items-center gap-1.5 text-xs font-mono bg-[#e5e3d8] px-3 py-1.5 border border-grid text-[#1a1a1a]"
                >
                  <CheckCircle className="w-3.5 h-3.5 text-[#1a1a1a]" />
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 sm:p-5 bg-[#e5e3d8] border-t border-grid flex flex-wrap justify-between items-center gap-4 shrink-0">
          <span className="text-[11px] font-mono text-[#555]">
            RECIPIENT: MUHAMMAD SATRIA SEIASMARA
          </span>
          <div className="flex gap-3">
            {cert.imageUrl && (
              <a
                href={cert.imageUrl}
                download={`${cert.credentialId}.jpg`}
                target="_blank"
                rel="noreferrer"
                className="bg-white text-[#1a1a1a] border border-grid px-4 py-2 text-xs font-mono tracking-widest uppercase hover:bg-black hover:text-white transition-colors flex items-center gap-2"
              >
                <Download className="w-3.5 h-3.5" />
                <span>SAVE IMAGE</span>
              </a>
            )}
            <a
              href={cert.verificationUrl}
              target="_blank"
              rel="noreferrer"
              className="bg-[#1a1a1a] text-[#f2f0e6] px-5 py-2 text-xs font-mono tracking-widest uppercase hover:bg-black transition-colors flex items-center gap-2"
            >
              <span>VERIFY ONLINE</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

