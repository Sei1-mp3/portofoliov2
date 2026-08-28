import React from 'react';

interface SatriaRingProps {
  size?: number | string;
  strokeWidth?: number;
  className?: string;
  pulse?: boolean;
  spinning?: boolean;
  opacity?: number;
  glow?: boolean;
  style?: React.CSSProperties;
  strokeDashoffset?: number;
  strokeDasharray?: string;
}

export const SatriaRing: React.FC<SatriaRingProps> = ({
  size = 40,
  strokeWidth = 1,
  className = '',
  pulse = false,
  spinning = false,
  opacity = 0.4,
  glow = false,
  style = {},
  strokeDashoffset,
  strokeDasharray,
}) => {
  const dimension = typeof size === 'number' ? `${size}px` : size;

  return (
    <div
      className={`relative flex items-center justify-center pointer-events-none select-none transition-transform duration-300 ${className} ${
        pulse ? 'animate-pulse' : ''
      }`}
      style={{
        width: dimension,
        height: dimension,
        ...style,
      }}
    >
      {/* Subtle monochrome ambient halo if requested */}
      {glow && (
        <div
          className="absolute inset-0 rounded-full"
          style={{
            background:
              'radial-gradient(circle, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 70%)',
            filter: 'blur(4px)',
            transform: 'scale(1.2)',
          }}
        />
      )}

      {/* Main Ring SVG */}
      <svg
        className={`w-full h-full ${spinning ? 'animate-[spin_28s_linear_infinite]' : ''}`}
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Core Ring */}
        <circle
          cx="50"
          cy="50"
          r="48"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          strokeOpacity={opacity}
          strokeDasharray={strokeDasharray}
          strokeDashoffset={strokeDashoffset}
          vectorEffect="non-scaling-stroke"
        />

        {/* Minimal cardinal indicators */}
        <circle cx="50" cy="2" r="1.2" fill="currentColor" fillOpacity={opacity * 1.5} />
        <circle cx="98" cy="50" r="1.2" fill="currentColor" fillOpacity={opacity * 1.5} />
        <circle cx="50" cy="98" r="1.2" fill="currentColor" fillOpacity={opacity * 1.5} />
        <circle cx="2" cy="50" r="1.2" fill="currentColor" fillOpacity={opacity * 1.5} />
      </svg>
    </div>
  );
};
