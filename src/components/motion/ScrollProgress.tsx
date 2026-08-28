import React, { useEffect, useState } from 'react';
import { useSmoothScroll } from './SmoothScrollProvider';

export const ScrollProgressRing: React.FC = () => {
  const [scrollPercent, setScrollPercent] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        setScrollPercent(Math.min(100, Math.max(0, (window.scrollY / totalHeight) * 100)));
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const radius = 16;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (scrollPercent / 100) * circumference;

  return (
    <div
      className="fixed right-5 bottom-6 z-40 flex items-center justify-center pointer-events-none select-none mix-blend-difference"
      title={`Progress: ${Math.round(scrollPercent)}%`}
    >
      <svg className="w-10 h-10 -rotate-90" viewBox="0 0 40 40">
        {/* Track */}
        <circle
          cx="20"
          cy="20"
          r={radius}
          fill="none"
          stroke="rgba(255,255,255,0.2)"
          strokeWidth="1.5"
        />
        {/* Animated Progress Arc */}
        <circle
          cx="20"
          cy="20"
          r={radius}
          fill="none"
          stroke="#ffffff"
          strokeWidth="1.5"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          style={{ transition: 'stroke-dashoffset 0.1s ease-out' }}
        />
      </svg>
      <span className="absolute font-mono text-[8px] text-white font-bold">
        {Math.round(scrollPercent)}%
      </span>
    </div>
  );
};
