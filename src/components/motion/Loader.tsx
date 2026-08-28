import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { EASINGS, isReducedMotion } from './MotionSystem';

interface LoaderProps {
  onComplete: () => void;
}

const PERCENTAGES = [0, 1, 3, 7, 12, 24, 38, 56, 71, 84, 93, 100];

export const Loader: React.FC<LoaderProps> = ({ onComplete }) => {
  const [percentIndex, setPercentIndex] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [showPrompt, setShowPrompt] = useState(false);

  const loaderRef = useRef<HTMLDivElement>(null);
  const leftDoorRef = useRef<HTMLDivElement>(null);
  const rightDoorRef = useRef<HTMLDivElement>(null);
  const centerContentRef = useRef<HTMLDivElement>(null);
  const ringSvgRef = useRef<SVGSVGElement>(null);
  const ringCircleRef = useRef<SVGCircleElement>(null);
  const nameRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (isReducedMotion()) {
      onComplete();
      return;
    }

    // Number counting sequence
    let currentStep = 0;
    const interval = setInterval(() => {
      currentStep++;
      if (currentStep < PERCENTAGES.length) {
        setPercentIndex(currentStep);

        const currentVal = PERCENTAGES[currentStep];

        // 20-60%: Ring draws itself
        if (ringCircleRef.current) {
          const progress = currentVal / 100;
          const strokeOffset = 301.6 * (1 - progress);
          ringCircleRef.current.style.strokeDashoffset = `${strokeOffset}`;
        }

        // 60-90%: Name brightens
        if (nameRef.current && currentVal >= 60) {
          const brightness = 0.5 + (currentVal - 60) * 0.0125;
          nameRef.current.style.opacity = `${Math.min(1, brightness)}`;
        }

        // 100%: Ring completes, show ENTER
        if (currentVal === 100) {
          clearInterval(interval);
          setShowPrompt(true);

          // Trigger doorway split exit transition after brief moment
          setTimeout(() => {
            triggerSplitTransition();
          }, 350);
        }
      } else {
        clearInterval(interval);
      }
    }, 65);

    return () => clearInterval(interval);
  }, [onComplete]);

  const triggerSplitTransition = () => {
    if (!loaderRef.current || !leftDoorRef.current || !rightDoorRef.current) {
      onComplete();
      return;
    }

    const tl = gsap.timeline({
      onComplete: () => {
        setIsFinished(true);
        onComplete();
      },
    });

    // 1. Center text and ring expand and fade
    if (centerContentRef.current) {
      tl.to(
        centerContentRef.current,
        {
          scale: 1.15,
          opacity: 0,
          duration: 0.5,
          ease: EASINGS.expoOut,
        },
        0
      );
    }

    // 2. Doorway split: left door slides left, right door slides right
    tl.to(
      leftDoorRef.current,
      {
        xPercent: -101,
        duration: 0.9,
        ease: EASINGS.expoInOut,
      },
      0.15
    );

    tl.to(
      rightDoorRef.current,
      {
        xPercent: 101,
        duration: 0.9,
        ease: EASINGS.expoInOut,
      },
      0.15
    );
  };

  if (isFinished) return null;

  const currentPercent = PERCENTAGES[percentIndex];
  const formattedPercent = currentPercent < 10 ? `0${currentPercent}` : `${currentPercent}`;

  return (
    <div
      ref={loaderRef}
      id="site-loader"
      className="fixed inset-0 z-50 overflow-hidden select-none pointer-events-auto"
    >
      {/* Left Split Door */}
      <div
        ref={leftDoorRef}
        className="absolute top-0 left-0 bottom-0 w-1/2 bg-[#0d0d0d] border-r border-white/5 z-10 will-change-transform"
      />

      {/* Right Split Door */}
      <div
        ref={rightDoorRef}
        className="absolute top-0 right-0 bottom-0 w-1/2 bg-[#0d0d0d] border-l border-white/5 z-10 will-change-transform"
      />

      {/* Centered Editorial Technical Sequence */}
      <div
        ref={centerContentRef}
        className="relative z-20 flex flex-col items-center justify-center w-full h-full text-[#f2f0e6] px-6 will-change-transform"
      >
        {/* Satria Ring SVG drawing itself */}
        <div className="relative mb-8 flex items-center justify-center">
          <svg
            ref={ringSvgRef}
            className="w-28 h-28 -rotate-90"
            viewBox="0 0 100 100"
            fill="none"
          >
            {/* Background faint ring track */}
            <circle
              cx="50"
              cy="50"
              r="48"
              stroke="currentColor"
              strokeWidth="0.8"
              strokeOpacity="0.12"
            />
            {/* Dynamic drawing circle */}
            <circle
              ref={ringCircleRef}
              cx="50"
              cy="50"
              r="48"
              stroke="currentColor"
              strokeWidth="1.2"
              strokeOpacity="0.8"
              strokeDasharray="301.6"
              strokeDashoffset="301.6"
              strokeLinecap="round"
              className="transition-[stroke-dashoffset] duration-75 ease-linear"
            />
          </svg>

          {/* Central small pulsing coordinate */}
          <div className="absolute w-1.5 h-1.5 bg-[#f2f0e6] rounded-full opacity-60 animate-ping" />
        </div>

        {/* Name */}
        <h1
          ref={nameRef}
          className="font-serif text-2xl sm:text-3xl md:text-4xl tracking-tight text-center uppercase opacity-50 transition-opacity duration-300 mb-3"
        >
          Muhammad Satria Seiasmara
        </h1>

        {/* Role subtitle */}
        <p className="font-mono text-[10px] sm:text-xs tracking-[0.25em] text-[#999] uppercase text-center mb-6">
          Web Developer · AI Specialist
        </p>

        {/* ENTER prompt when ready */}
        <div className="h-6 flex items-center justify-center">
          {showPrompt && (
            <span className="font-mono text-[10px] tracking-[0.3em] font-bold text-[#f2f0e6] uppercase animate-pulse">
              ENTER →
            </span>
          )}
        </div>

        {/* Bottom Technical Telemetry */}
        <div className="absolute bottom-8 left-8 sm:bottom-12 sm:left-12 flex items-center gap-3 font-mono text-[10px] sm:text-xs tracking-widest text-[#777] uppercase">
          <span className="inline-block w-2 h-2 bg-white/40 rounded-full animate-pulse" />
          <span>LOADING</span>
          <span className="text-[#f2f0e6] font-bold">{formattedPercent}%</span>
        </div>

        <div className="absolute bottom-8 right-8 sm:bottom-12 sm:right-12 font-mono text-[9px] sm:text-[10px] tracking-widest text-[#555] uppercase hidden sm:block">
          SYS::INIT // 2026
        </div>
      </div>
    </div>
  );
};
