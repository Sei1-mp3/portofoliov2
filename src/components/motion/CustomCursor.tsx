import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { isReducedMotion } from './MotionSystem';

export type CursorMode = 'default' | 'hover' | 'project' | 'cert' | 'cta';

export const CustomCursor: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);
  const followerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);

  // Store current state in refs to prevent React re-renders on mousemove
  const currentModeRef = useRef<CursorMode>('default');
  const currentTextRef = useRef<string>('');
  const isVisibleRef = useRef<boolean>(false);

  useEffect(() => {
    // Disable on touch devices or reduced motion
    if (window.matchMedia('(pointer: coarse)').matches || isReducedMotion()) {
      return;
    }

    const container = containerRef.current;
    const cursor = cursorRef.current;
    const follower = followerRef.current;
    const textEl = textRef.current;
    if (!container || !cursor || !follower) return;

    // Use GSAP's quickSetter for ultra-fast, zero-overhead transform writing
    const setDotX = gsap.quickSetter(cursor, 'x', 'px');
    const setDotY = gsap.quickSetter(cursor, 'y', 'px');
    const setFollowerX = gsap.quickSetter(follower, 'x', 'px');
    const setFollowerY = gsap.quickSetter(follower, 'y', 'px');

    // Position state tracking for rAF interpolation loop
    const mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const dotPos = { x: mouse.x, y: mouse.y };
    const followerPos = { x: mouse.x, y: mouse.y };

    let rafId: number | null = null;

    const setModeClass = (mode: CursorMode, text: string) => {
      if (currentModeRef.current === mode && currentTextRef.current === text) {
        return;
      }
      currentModeRef.current = mode;
      currentTextRef.current = text;

      // Update text directly on DOM
      if (textEl) {
        textEl.textContent = text;
      }

      // Update dot scale
      if (cursor) {
        cursor.style.transform = mode !== 'default' ? 'scale(0)' : 'scale(1)';
      }

      // Update follower styling classes directly on DOM
      if (follower) {
        follower.className = `fixed top-0 left-0 flex items-center justify-center will-change-transform pointer-events-none transition-all duration-200 ease-out ${
          mode === 'project'
            ? 'w-20 h-20 -ml-10 -mt-10 bg-[#1a1a1a] text-[#f2f0e6] rounded-full shadow-xl opacity-100 scale-100'
            : mode === 'cert'
            ? 'w-18 h-18 -ml-9 -mt-9 bg-[#1a1a1a] text-[#f2f0e6] rounded-full shadow-lg opacity-100 scale-100'
            : mode === 'cta'
            ? 'w-22 h-22 -ml-11 -mt-11 border-2 border-[#f2f0e6] bg-[#f2f0e6]/25 backdrop-blur-xs text-[#f2f0e6] rounded-full shadow-2xl opacity-100 scale-100'
            : mode === 'hover'
            ? 'w-10 h-10 -ml-5 -mt-5 border border-[#1a1a1a]/50 bg-[#1a1a1a]/8 rounded-full opacity-100 scale-100'
            : 'w-7 h-7 -ml-3.5 -mt-3.5 border border-[#1a1a1a]/25 rounded-full opacity-100 scale-100'
        }`;
      }
    };

    // Render loop decoupled via requestAnimationFrame with smooth lerping
    const render = () => {
      if (isVisibleRef.current) {
        // Fast tracking for core dot (lerp ~0.55)
        dotPos.x += (mouse.x - dotPos.x) * 0.55;
        dotPos.y += (mouse.y - dotPos.y) * 0.55;
        setDotX(dotPos.x);
        setDotY(dotPos.y);

        // Smooth interpolated trailing for follower ring (lerp ~0.16)
        followerPos.x += (mouse.x - followerPos.x) * 0.16;
        followerPos.y += (mouse.y - followerPos.y) * 0.16;
        setFollowerX(followerPos.x);
        setFollowerY(followerPos.y);
      }

      rafId = requestAnimationFrame(render);
    };

    // Start the decoupled animation frame loop
    rafId = requestAnimationFrame(render);

    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;

      if (!isVisibleRef.current) {
        isVisibleRef.current = true;
        dotPos.x = mouse.x;
        dotPos.y = mouse.y;
        followerPos.x = mouse.x;
        followerPos.y = mouse.y;
        if (container) container.style.opacity = '1';
      }

      const target = e.target as HTMLElement | null;
      if (!target) return;

      const cursorTarget = target.closest('[data-cursor]');
      if (cursorTarget) {
        const type = (cursorTarget.getAttribute('data-cursor') || 'hover') as CursorMode;
        const customText = cursorTarget.getAttribute('data-cursor-text') || '';

        let displayText = customText;
        if (!displayText) {
          if (type === 'project') displayText = 'VIEW';
          else if (type === 'cert') displayText = 'OPEN';
          else if (type === 'cta') displayText = "LET'S TALK";
        }
        setModeClass(type, displayText);
      } else if (
        target.tagName === 'BUTTON' ||
        target.tagName === 'A' ||
        target.closest('button') ||
        target.closest('a')
      ) {
        setModeClass('hover', '');
      } else {
        setModeClass('default', '');
      }
    };

    const handleMouseLeave = () => {
      isVisibleRef.current = false;
      if (container) container.style.opacity = '0';
    };

    const handleMouseEnter = () => {
      isVisibleRef.current = true;
      if (container) container.style.opacity = '1';
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      if (rafId !== null) cancelAnimationFrame(rafId);
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-50 overflow-hidden select-none transition-opacity duration-200 opacity-0"
    >
      {/* Precision Core Dot */}
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 w-2 h-2 -ml-1 -mt-1 bg-[#1a1a1a] rounded-full will-change-transform pointer-events-none transition-transform duration-150 ease-out"
      />

      {/* Damped Outer Follower */}
      <div
        ref={followerRef}
        className="fixed top-0 left-0 w-7 h-7 -ml-3.5 -mt-3.5 border border-[#1a1a1a]/25 rounded-full flex items-center justify-center will-change-transform pointer-events-none transition-all duration-200 ease-out"
      >
        <span
          ref={textRef}
          className="font-mono text-[9px] tracking-widest font-bold uppercase select-none text-center px-1 pointer-events-none"
        />
      </div>
    </div>
  );
};
