import React, { useState } from 'react';
import { X, Mail, Send, Copy, Check, Sparkles, MessageSquare } from 'lucide-react';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ContactModal: React.FC<ContactModalProps> = ({ isOpen, onClose }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [copied, setCopied] = useState(false);
  const [sent, setSent] = useState(false);

  if (!isOpen) return null;

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('satriaseiasmara@gmail.com');
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) return;

    setSent(true);
    setTimeout(() => {
      // Create mailto link as fallback
      window.location.href = `mailto:satriaseiasmara@gmail.com?subject=Portfolio%20Inquiry%20from%20${encodeURIComponent(
        name
      )}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`)}`;
    }, 800);
  };

  return (
    <div
      id="contact-modal-overlay"
      className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6"
      onClick={onClose}
    >
      <div
        id="contact-modal-container"
        className="bg-[#f2f0e6] w-full max-w-xl border border-grid shadow-2xl overflow-hidden relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-[#1a1a1a] text-[#f2f0e6] p-6 sm:p-7 flex justify-between items-start border-b border-grid">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono tracking-widest text-[#e5e3d8] mb-2 uppercase">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>COMMUNICATION CHANNEL</span>
            </div>
            <h3 className="font-serif text-2xl sm:text-3xl">Get in Touch</h3>
          </div>

          <button
            onClick={onClose}
            aria-label="Close modal"
            className="p-2 text-white/70 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Quick Email Bar */}
        <div className="bg-[#e5e3d8] p-4 border-b border-grid flex flex-wrap justify-between items-center gap-3">
          <div className="flex items-center gap-2 text-xs font-mono text-[#1a1a1a]">
            <Mail className="w-4 h-4" />
            <span className="font-bold">satriaseiasmara@gmail.com</span>
          </div>
          <button
            onClick={handleCopyEmail}
            className="px-3 py-1.5 bg-[#1a1a1a] text-[#f2f0e6] text-xs font-mono flex items-center gap-1.5 hover:bg-black transition-colors cursor-pointer"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'COPIED!' : 'COPY EMAIL'}</span>
          </button>
        </div>

        {/* Form Body */}
        <div className="p-6 sm:p-7">
          {sent ? (
            <div className="py-8 text-center space-y-3">
              <div className="w-12 h-12 bg-emerald-100 text-emerald-800 rounded-full mx-auto flex items-center justify-center">
                <Check className="w-6 h-6" />
              </div>
              <h4 className="font-serif text-xl text-[#1a1a1a]">Message Prepared!</h4>
              <p className="text-xs font-mono text-[#555] max-w-sm mx-auto">
                Opening your email client to send message to Satria Seiasmara. Thank you!
              </p>
              <button
                onClick={onClose}
                className="mt-4 bg-[#1a1a1a] text-[#f2f0e6] px-6 py-2 text-xs font-mono tracking-widest uppercase hover:bg-black transition-colors"
              >
                DONE
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-mono tracking-widest uppercase text-[#555] mb-1">
                  YOUR NAME
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Alex Pratama"
                  className="w-full p-3 text-xs font-sans border border-grid bg-white focus:outline-hidden focus:border-[#1a1a1a]"
                />
              </div>

              <div>
                <label className="block text-xs font-mono tracking-widest uppercase text-[#555] mb-1">
                  EMAIL ADDRESS
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="e.g. alex@example.com"
                  className="w-full p-3 text-xs font-sans border border-grid bg-white focus:outline-hidden focus:border-[#1a1a1a]"
                />
              </div>

              <div>
                <label className="block text-xs font-mono tracking-widest uppercase text-[#555] mb-1">
                  MESSAGE / PROJECT INQUIRY
                </label>
                <textarea
                  required
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Describe your project, question, or collaboration idea..."
                  className="w-full p-3 text-xs font-sans border border-grid bg-white focus:outline-hidden focus:border-[#1a1a1a]"
                />
              </div>

              <div className="pt-2 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-5 py-3 text-xs font-mono tracking-widest uppercase border border-grid hover:bg-black/5 transition-colors"
                >
                  CANCEL
                </button>
                <button
                  type="submit"
                  className="bg-[#1a1a1a] text-[#f2f0e6] px-7 py-3 text-xs font-mono tracking-widest uppercase font-bold hover:bg-black transition-colors flex items-center gap-2 cursor-pointer"
                >
                  <span>SEND MESSAGE</span>
                  <Send className="w-3.5 h-3.5" />
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
