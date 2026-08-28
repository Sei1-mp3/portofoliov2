import React, { useState } from 'react';
import { X, ExternalLink, Github, CheckCircle2, Code, Play, Terminal, ArrowLeft, Sparkles } from 'lucide-react';
import { Project } from '../types';
import { SatriaRing } from './motion/SatriaRing';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'code' | 'interactive'>('overview');
  const [interactiveInput, setInteractiveInput] = useState('');
  const [interactiveOutput, setInteractiveOutput] = useState<string | null>(null);
  const [isRunning, setIsRunning] = useState(false);

  if (!project) return null;

  const handleRunInteractiveDemo = () => {
    setIsRunning(true);
    setInteractiveOutput(null);

    setTimeout(() => {
      setIsRunning(false);
      if (project.id === 'klikaman') {
        const targetUrl = interactiveInput.trim() || 'https://secure-login-bank-verification.com/auth';
        const isPhishing = targetUrl.includes('secure-login') || targetUrl.includes('verification') || targetUrl.includes('auth') || targetUrl.includes('gift-free');
        setInteractiveOutput(`[KLIKAMAN AI THREAT INSPECTION RESULT]
🌐 TARGET URL: ${targetUrl}
--------------------------------------------------
🛡️ RISK ASSESSMENT: ${isPhishing ? '⚠️ HIGH RISK (SUSPICIOUS PHISHING)' : '✅ SAFE (VERIFIED DOMAIN)'}
📊 RISK SCORE: ${isPhishing ? '88 / 100' : '04 / 100'}

🔍 DETECTED VECTORS & HEURISTICS:
${isPhishing
  ? `• Suspicious typo-squatting & credential harvesting keywords
• Domain registered recently (< 14 days)
• Missing organization identity verification
• Obfuscated redirect parameter detected`
  : `• Valid SSL/TLS certificate with verified organization
• Domain age: > 5 years with clean reputation history
• Zero reported malicious signatures across threat feeds`}

💡 ACTIONABLE RECOMMENDATION:
${isPhishing ? '⛔ DO NOT enter passwords or OTPs on this page. Close tab immediately.' : '✓ Safe to proceed. Standard encryption active.'}`);
      } else if (project.id === 'jokkow-project') {
        const giftRecipient = interactiveInput.trim() || 'Dinda & Arya';
        setInteractiveOutput(`[JOKKOW PROJECT STORE CONFIGURATOR]
🎁 ITEM: Bespoke Digital Keepsake Card & Animation
👤 RECIPIENT: ${giftRecipient}
🎨 PALETTE THEME: Warm Editorial Aesthetic
--------------------------------------------------
[✓] Generated responsive digital gift preview link
[✓] Integrated custom micro-interactions & envelope unwrap animation
[✓] Formatted WhatsApp Direct Checkout Payload:
    "Halo Jokkow Project! Saya ingin memesan Digital Gift untuk ${giftRecipient}."
STATUS: READY TO ORDER`);
      } else if (project.id === 'ai-study-assistant') {
        const topic = interactiveInput.trim() || 'Photosynthesis & Cellular Energy';
        setInteractiveOutput(`[AI STUDY ASSISTANT RESPONSE]
📖 TOPIC: ${topic}
----------------------------------------
✨ CORE DEFINITION:
The biochemical process by which plants and certain organisms convert sunlight, water, and CO2 into chemical glucose and oxygen.

💡 3 KEY TAKEAWAYS:
1. Light Reactions: Occur in the thylakoid membranes, generating ATP and NADPH.
2. Calvin Cycle: Synthesizes sugars in the stroma using captured energy.
3. Ecological Impact: Foundation of Earth's oxygen atmosphere and food webs.

❓ QUICK QUIZ:
Q: Where do the light-dependent reactions take place?
A: Inside the thylakoid membranes of chloroplasts.`);
      } else if (project.id === 'task-automation-system') {
        const target = interactiveInput.trim() || 'data/raw_invoices/*.pdf';
        setInteractiveOutput(`[PYTHON AUTOMATION PIPELINE EXECUTOR]
Target Source: ${target}
[✓] Initializing Pipeline worker (PID: 4812)...
[✓] Found 14 matching document chunks.
[✓] Parsing structured OCR metadata via RegEx & PDFEngine...
[✓] Ingesting 14 records into Pandas DataFrame...
[✓] Dispatched notification summary to Discord/Email webhook!
Status: SUCCESS (Completed in 0.42s)`);
      } else {
        setInteractiveOutput(`[PORTFOLIO THEME INSPECTOR]
Theme: Architectural Brutalist & Warm Paper
Status: Active Viewport Rendered
Metrics: Performance 99 | Accessibility 100 | Best Practices 100
Font Stack: Playfair Display + Space Mono + Inter`);
      }
    }, 600);
  };

  return (
    <div
      id="project-modal-overlay"
      className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-0 md:p-6 overflow-y-auto animate-[fadeIn_0.3s_cubic-bezier(0.16,1,0.3,1)]"
      onClick={onClose}
    >
      <div
        id="project-modal-container"
        className="bg-[#f2f0e6] w-full max-w-4xl min-h-screen md:min-h-0 md:max-h-[92vh] border-0 md:border border-grid shadow-2xl overflow-hidden my-auto relative flex flex-col animate-[scaleIn_0.35s_cubic-bezier(0.16,1,0.3,1)]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Sticky Navigation Bar */}
        <div className="bg-[#1a1a1a] text-[#f2f0e6] p-6 sm:p-8 flex justify-between items-start border-b border-grid shrink-0 relative overflow-hidden">
          {/* Subtle Ring in background */}
          <div className="absolute right-8 top-1/2 -translate-y-1/2 pointer-events-none opacity-20">
            <SatriaRing size={180} spinning={true} className="text-white" />
          </div>

          <div className="relative z-10">
            <button
              onClick={onClose}
              className="flex items-center gap-2 font-mono text-xs tracking-widest text-white/60 hover:text-white uppercase mb-4 cursor-pointer transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>ALL PROJECTS</span>
            </button>

            <div className="flex items-center gap-3 text-xs font-mono tracking-widest text-white/70 uppercase mb-2">
              <span>PROJECT {project.num}</span>
              <span>/</span>
              <span>{project.category}</span>
            </div>
            <h3 className="font-serif text-3xl sm:text-4xl tracking-tight">{project.title}</h3>
          </div>

          <button
            onClick={onClose}
            aria-label="Close modal"
            className="p-2 text-white/70 hover:text-white hover:bg-white/10 transition-colors cursor-pointer relative z-10"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="bg-[#e5e3d8] border-b border-grid px-6 sm:px-8 flex gap-2 pt-2 text-xs font-mono tracking-wider shrink-0">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-4 py-2.5 font-bold uppercase transition-colors ${
              activeTab === 'overview'
                ? 'bg-[#f2f0e6] border-t-2 border-[#1a1a1a] text-[#1a1a1a]'
                : 'text-[#666] hover:text-[#1a1a1a]'
            }`}
          >
            Overview & Specs
          </button>
          <button
            onClick={() => setActiveTab('code')}
            className={`px-4 py-2.5 font-bold uppercase transition-colors ${
              activeTab === 'code'
                ? 'bg-[#f2f0e6] border-t-2 border-[#1a1a1a] text-[#1a1a1a]'
                : 'text-[#666] hover:text-[#1a1a1a]'
            }`}
          >
            Code Architecture
          </button>
          <button
            onClick={() => setActiveTab('interactive')}
            className={`px-4 py-2.5 font-bold uppercase transition-colors flex items-center gap-1.5 ${
              activeTab === 'interactive'
                ? 'bg-[#f2f0e6] border-t-2 border-[#1a1a1a] text-[#1a1a1a]'
                : 'text-[#666] hover:text-[#1a1a1a]'
            }`}
          >
            <Play className="w-3 h-3 text-[#1a1a1a]" />
            Live Preview
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-8 flex-grow">
          {activeTab === 'overview' && (
            <div className="space-y-6">
              <div>
                <p className="text-xs font-mono tracking-widest uppercase text-[#777] mb-2">
                  PROJECT BRIEF & OBJECTIVE
                </p>
                <p className="text-sm sm:text-base text-[#333] leading-relaxed font-sans">
                  {project.fullDesc}
                </p>
              </div>

              <div>
                <p className="text-xs font-mono tracking-widest uppercase text-[#777] mb-3">
                  KEY FEATURES & CAPABILITIES
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {project.features.map((feat, idx) => (
                    <div
                      key={idx}
                      className="p-3.5 bg-white border border-grid text-xs text-[#333] flex items-start gap-2.5"
                    >
                      <CheckCircle2 className="w-4 h-4 text-[#1a1a1a] shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <p className="text-xs font-mono tracking-widest uppercase text-[#777] mb-3">
                  TECH STACK & TOOLS
                </p>
                <div className="flex flex-wrap gap-2">
                  {project.techStack.map((tech, idx) => (
                    <span
                      key={idx}
                      className="text-xs font-mono bg-[#e5e3d8] border border-grid px-3.5 py-1.5 text-[#1a1a1a]"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'code' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between text-xs font-mono text-[#666]">
                <span className="flex items-center gap-1.5">
                  <Code className="w-4 h-4" />
                  CORE IMPLEMENTATION SNIPPET
                </span>
                <span>TYPESCRIPT / PYTHON</span>
              </div>
              <div className="bg-[#1a1a1a] text-[#f2f0e6] p-5 font-mono text-xs rounded-none border border-grid overflow-x-auto leading-relaxed">
                <pre>{project.codeSnippet || '// Implementation available in repository'}</pre>
              </div>
            </div>
          )}

          {activeTab === 'interactive' && (
            <div className="space-y-5 bg-white p-6 border border-grid">
              <div className="flex items-center gap-2 text-xs font-mono text-[#1a1a1a] font-bold uppercase">
                <Terminal className="w-4 h-4" />
                <span>INTERACTIVE DEMO SIMULATOR</span>
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-[#666] mb-1.5">
                  {project.id === 'klikaman'
                    ? 'Enter URL or Domain to Inspect:'
                    : project.id === 'jokkow-project'
                    ? 'Enter Gift Recipient Name:'
                    : project.id === 'ai-study-assistant'
                    ? 'Enter Study Topic / Concept:'
                    : project.id === 'task-automation-system'
                    ? 'Enter File Pattern / Target Job:'
                    : 'Interactive Parameters:'}
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={interactiveInput}
                    onChange={(e) => setInteractiveInput(e.target.value)}
                    placeholder={
                      project.id === 'klikaman'
                        ? 'e.g., https://secure-login-bank.com/auth or https://google.com'
                        : project.id === 'jokkow-project'
                        ? 'e.g., Sarah Jenkins & Family'
                        : project.id === 'ai-study-assistant'
                        ? 'e.g., Quantum Physics, Photosynthesis, Calculus'
                        : project.id === 'task-automation-system'
                        ? 'e.g., docs/invoices/*.csv'
                        : 'e.g., test-viewport'
                    }
                    className="flex-grow p-3 text-xs font-mono border border-grid bg-[#f2f0e6] focus:outline-hidden focus:border-[#1a1a1a]"
                  />
                  <button
                    onClick={handleRunInteractiveDemo}
                    disabled={isRunning}
                    className="bg-[#1a1a1a] text-[#f2f0e6] px-6 py-3 text-xs font-mono font-bold tracking-wider hover:bg-black transition-colors disabled:opacity-50 flex items-center gap-2 shrink-0 cursor-pointer"
                  >
                    {isRunning ? 'RUNNING...' : 'EXECUTE'}
                  </button>
                </div>
              </div>

              {interactiveOutput && (
                <div className="bg-[#0f172a] text-[#38bdf8] p-4 text-xs font-mono whitespace-pre-wrap leading-relaxed border border-slate-700">
                  {interactiveOutput}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-4 sm:p-6 bg-[#e5e3d8] border-t border-grid flex flex-wrap justify-between items-center gap-4 shrink-0">
          <div className="text-xs font-mono text-[#666]">
            STATUS: <span className="text-emerald-700 font-bold">COMPLETED & VERIFIED</span>
          </div>

          <div className="flex items-center gap-3">
            {project.liveUrl && project.liveUrl !== '#' && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noreferrer"
                className="bg-[#1a1a1a] text-[#f2f0e6] border border-[#1a1a1a] px-4 py-2 text-xs font-mono tracking-widest uppercase hover:bg-black transition-colors flex items-center gap-2 font-bold"
              >
                <span>OPEN LIVE APP</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}
            <a
              href={project.githubUrl || 'https://github.com'}
              target="_blank"
              rel="noreferrer"
              className="border border-[#1a1a1a] px-4 py-2 text-xs font-mono tracking-widest uppercase hover:bg-[#1a1a1a] hover:text-white transition-colors flex items-center gap-2"
            >
              <Github className="w-3.5 h-3.5" />
              <span>SOURCE</span>
            </a>
            <button
              onClick={onClose}
              className="border border-[#666] text-[#1a1a1a] px-5 py-2 text-xs font-mono tracking-widest uppercase hover:bg-[#1a1a1a] hover:text-[#f2f0e6] transition-colors cursor-pointer"
            >
              CLOSE
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
