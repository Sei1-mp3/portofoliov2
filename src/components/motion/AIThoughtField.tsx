import React, { useEffect, useRef } from 'react';
import { useSmoothScroll } from './SmoothScrollProvider';

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
  originX: number;
  originY: number;
  radius: number;
  label?: string;
  pulsePhase: number;
}

const LABELS = ['AI', 'CODE', 'RESEARCH', 'ITERATE', 'LEARN', 'SOLVE', 'SYSTEM'];

export const AIThoughtField: React.FC<{ className?: string }> = ({ className = '' }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const mouseRef = useRef({ x: -1000, y: -1000, active: false });
  const isVisibleRef = useRef(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = container.clientWidth);
    let height = (canvas.height = container.clientHeight);

    // Create 20-25 balanced nodes for performance
    const nodeCount = 20;
    const nodes: Node[] = [];

    for (let i = 0; i < nodeCount; i++) {
      const x = Math.random() * width;
      const y = Math.random() * height;
      nodes.push({
        x,
        y,
        originX: x,
        originY: y,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
        radius: Math.random() > 0.6 ? 2.5 : 1.8,
        label: i < LABELS.length ? LABELS[i] : undefined,
        pulsePhase: Math.random() * Math.PI * 2,
      });
    }

    // Resize observer
    const handleResize = () => {
      if (!canvas || !container) return;
      width = canvas.width = container.clientWidth;
      height = canvas.height = container.clientHeight;
    };
    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(container);

    // Mouse listener on parent container
    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
        active: true,
      };
    };

    const handleMouseLeave = () => {
      mouseRef.current.active = false;
    };

    container.addEventListener('mousemove', handleMouseMove, { passive: true });
    container.addEventListener('mouseleave', handleMouseLeave);

    // Intersection observer to only run animation when visible
    const observer = new IntersectionObserver(
      (entries) => {
        isVisibleRef.current = entries[0].isIntersecting;
      },
      { threshold: 0.1 }
    );
    observer.observe(container);

    let animationFrameId: number;

    const render = () => {
      if (isVisibleRef.current) {
        ctx.clearRect(0, 0, width, height);

        // Update and draw nodes
        const activityMultiplier = 1;

        // Update and draw nodes
        for (let i = 0; i < nodes.length; i++) {
          const node = nodes[i];

          // Natural slow drift
          node.x += node.vx * activityMultiplier;
          node.y += node.vy * activityMultiplier;

          // Boundary bouncing
          if (node.x <= 10 || node.x >= width - 10) node.vx *= -1;
          if (node.y <= 10 || node.y >= height - 10) node.vy *= -1;

          // Mouse attraction field
          if (mouseRef.current.active) {
            const dx = mouseRef.current.x - node.x;
            const dy = mouseRef.current.y - node.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            const maxDist = 140;

            if (dist < maxDist && dist > 0) {
              const force = (1 - dist / maxDist) * 0.6;
              node.x += (dx / dist) * force;
              node.y += (dy / dist) * force;
            }
          }

          // Return slowly to origin if drifted too far
          node.x += (node.originX - node.x) * 0.002;
          node.y += (node.originY - node.y) * 0.002;

          node.pulsePhase += 0.02;
          const currentRadius = node.radius + Math.sin(node.pulsePhase) * 0.6;

          // Draw node point
          ctx.beginPath();
          ctx.arc(node.x, node.y, currentRadius, 0, Math.PI * 2);
          ctx.fillStyle = 'rgba(26, 26, 26, 0.4)';
          ctx.fill();

          // Draw node label if present
          if (node.label) {
            ctx.font = '8px "Space Mono", monospace';
            ctx.fillStyle = 'rgba(26, 26, 26, 0.28)';
            ctx.fillText(node.label, node.x + 6, node.y + 3);
          }

          // Draw connections to nearby nodes
          for (let j = i + 1; j < nodes.length; j++) {
            const other = nodes[j];
            const dist = Math.hypot(node.x - other.x, node.y - other.y);
            const connectionDistance = 110;

            if (dist < connectionDistance) {
              const alpha = (1 - dist / connectionDistance) * 0.18;
              ctx.beginPath();
              ctx.moveTo(node.x, node.y);
              ctx.lineTo(other.x, other.y);
              ctx.strokeStyle = `rgba(26, 26, 26, ${alpha})`;
              ctx.lineWidth = 0.75;
              ctx.stroke();
            }
          }
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();
      observer.disconnect();
      container.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <div ref={containerRef} className={`absolute inset-0 pointer-events-auto select-none ${className}`}>
      <canvas ref={canvasRef} className="w-full h-full block" />
    </div>
  );
};
