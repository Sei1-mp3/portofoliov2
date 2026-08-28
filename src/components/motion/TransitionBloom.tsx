import React, { useRef } from 'react';

export type BloomTheme =
  | 'cream'
  | 'neutral-gray'
  | 'charcoal'
  | 'warm-gray'
  | 'deep-black';

interface TransitionBloomProps {
  theme?: BloomTheme;
  intensity?: number;
  className?: string;
}

export const TransitionBloom: React.FC<TransitionBloomProps> = ({
  theme = 'cream',
  intensity = 1,
  className = '',
}) => {
  const bloomRef = useRef<HTMLDivElement>(null);

  const getGradient = (t: BloomTheme | string) => {
    switch (t) {
      case 'deep-black':
        return 'radial-gradient(circle at 50% 50%, rgba(255,255,255,0.08) 0%, rgba(10,10,10,0.95) 75%)';
      case 'charcoal':
        return 'radial-gradient(circle at 50% 50%, rgba(255,255,255,0.12) 0%, rgba(26,26,26,0.85) 70%)';
      case 'warm-gray':
        return 'radial-gradient(circle at 50% 50%, rgba(255,255,255,0.3) 0%, rgba(229,227,216,0.6) 70%)';
      case 'neutral-gray':
        return 'radial-gradient(circle at 50% 50%, rgba(255,255,255,0.18) 0%, rgba(200,198,188,0.4) 70%)';
      case 'cream':
      default:
        return 'radial-gradient(circle at 50% 50%, rgba(255,255,255,0.45) 0%, rgba(242,240,230,0) 70%)';
    }
  };

  return (
    <div
      ref={bloomRef}
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 z-0 overflow-hidden select-none will-change-transform ${className}`}
      style={{
        opacity: Math.min(0.45, 0.22 * intensity),
        background: getGradient(theme),
        filter: 'blur(30px)',
      }}
    />
  );
};
