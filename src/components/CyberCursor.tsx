import React, { useEffect, useRef, useState } from 'react';
import { useTheme } from '../context/ThemeContext.tsx';

interface TrailPoint {
  x: number;
  y: number;
  alpha: number;
  width: number;
}

export const CyberCursor: React.FC = () => {
  const { accentTheme, customCursorEnabled } = useTheme();
  const [isSupported, setIsSupported] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [cursorState, setCursorState] = useState<'default' | 'interactive' | 'text'>('default');
  const [isClicking, setIsClicking] = useState(false);

  // Position refs for 0-lag rendering
  const cursorRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const trailPoints = useRef<TrailPoint[]>([]);
  const ripples = useRef<{ x: number; y: number; r: number; alpha: number }[]>([]);
  const mousePos = useRef({ x: -100, y: -100 });
  const animFrameId = useRef<number | null>(null);

  // Active theme neon colors
  const themeColors = {
    crimson: {
      primary: '#ef4444',
      secondary: '#f43f5e',
      rgb: '239, 68, 68',
      halo: 'rgba(239, 68, 68, 0.18)',
      trail: 'rgba(239, 68, 68, 0.35)',
    },
    cyan: {
      primary: '#06b6d4',
      secondary: '#38bdf8',
      rgb: '6, 182, 212',
      halo: 'rgba(6, 182, 212, 0.18)',
      trail: 'rgba(6, 182, 212, 0.35)',
    },
    emerald: {
      primary: '#10b981',
      secondary: '#34d399',
      rgb: '16, 185, 129',
      halo: 'rgba(16, 185, 129, 0.18)',
      trail: 'rgba(16, 185, 129, 0.35)',
    },
  }[accentTheme] || {
    primary: '#ef4444',
    secondary: '#f43f5e',
    rgb: '239, 68, 68',
    halo: 'rgba(239, 68, 68, 0.18)',
    trail: 'rgba(239, 68, 68, 0.35)',
  };

  useEffect(() => {
    // Only enable for desktop pointer devices
    const mediaQuery = window.matchMedia('(pointer: fine)');
    if (!mediaQuery.matches) {
      setIsSupported(false);
      return;
    }
    setIsSupported(true);

    if (customCursorEnabled) {
      document.body.classList.add('custom-cursor-enabled');
    } else {
      document.body.classList.remove('custom-cursor-enabled');
      return;
    }

    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current.x = e.clientX;
      mousePos.current.y = e.clientY;

      if (!isVisible) setIsVisible(true);

      // Directly update cursor element position without React re-render lag
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
      }

      // Add trail point at the arrow tip
      trailPoints.current.push({
        x: e.clientX,
        y: e.clientY,
        alpha: 0.65,
        width: 2.2,
      });

      // Keep trail buffer compact and lightweight
      if (trailPoints.current.length > 20) {
        trailPoints.current.shift();
      }

      // Detect interactive hover target
      const target = e.target as HTMLElement | null;
      if (target) {
        if (target.closest('input, textarea, [contenteditable="true"], [data-cursor="text"]')) {
          setCursorState('text');
        } else if (
          target.closest(
            'a, button, [role="button"], .cursor-pointer, input[type="submit"], input[type="button"], [data-cursor="interactive"], select'
          )
        ) {
          setCursorState('interactive');
        } else {
          setCursorState('default');
        }
      }
    };

    const handleMouseDown = (e: MouseEvent) => {
      setIsClicking(true);
      ripples.current.push({
        x: e.clientX,
        y: e.clientY,
        r: 3,
        alpha: 0.8,
      });
    };

    const handleMouseUp = () => {
      setIsClicking(false);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      document.body.classList.remove('custom-cursor-enabled');
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [customCursorEnabled, isVisible]);

  // Smooth trail rendering loop on canvas
  useEffect(() => {
    if (!isSupported || !customCursorEnabled) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let dpr = window.devicePixelRatio || 1;
    const resizeCanvas = () => {
      if (!canvas) return;
      dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const render = () => {
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

      // 1. Draw smooth fluid estela / trail directly behind arrow tip
      const points = trailPoints.current;
      for (let i = points.length - 1; i >= 0; i--) {
        const p = points[i];
        p.alpha -= 0.045;
        p.width *= 0.96;

        if (p.alpha <= 0) {
          points.splice(i, 1);
        }
      }

      if (points.length > 2) {
        ctx.beginPath();
        ctx.moveTo(points[0].x, points[0].y);
        for (let i = 1; i < points.length - 1; i++) {
          const xc = (points[i].x + points[i + 1].x) / 2;
          const yc = (points[i].y + points[i + 1].y) / 2;
          ctx.quadraticCurveTo(points[i].x, points[i].y, xc, yc);
        }

        ctx.strokeStyle = `rgba(${themeColors.rgb}, 0.28)`;
        ctx.lineWidth = 1.6;
        ctx.lineCap = 'round';
        ctx.stroke();

        // Subtle soft glow over trail line
        ctx.shadowBlur = 6;
        ctx.shadowColor = `rgba(${themeColors.rgb}, 0.5)`;
        ctx.strokeStyle = `rgba(${themeColors.rgb}, 0.12)`;
        ctx.lineWidth = 3;
        ctx.stroke();
        ctx.shadowBlur = 0;
      }

      // 2. Draw subtle click ripple
      const rps = ripples.current;
      for (let i = rps.length - 1; i >= 0; i--) {
        const rip = rps[i];
        rip.r += 1.8;
        rip.alpha -= 0.055;

        if (rip.alpha <= 0 || rip.r > 28) {
          rps.splice(i, 1);
          continue;
        }

        ctx.beginPath();
        ctx.arc(rip.x, rip.y, rip.r, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(${themeColors.rgb}, ${rip.alpha * 0.75})`;
        ctx.lineWidth = 1.2;
        ctx.stroke();
      }

      animFrameId.current = requestAnimationFrame(render);
    };

    animFrameId.current = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animFrameId.current) cancelAnimationFrame(animFrameId.current);
    };
  }, [isSupported, customCursorEnabled, themeColors]);

  if (!isSupported || !customCursorEnabled) return null;

  const isInteractive = cursorState === 'interactive';
  const isText = cursorState === 'text';

  return (
    <>
      {/* Canvas for soft, smooth estela / trail */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none z-[9998] transition-opacity duration-300"
        style={{ opacity: isVisible ? 1 : 0 }}
      />

      {/* Unified Precision Cursor Container (Zero-lag, perfectly anchored at (0,0)) */}
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 pointer-events-none z-[9999] will-change-transform transition-opacity duration-150 select-none"
        style={{
          opacity: isVisible ? 1 : 0,
          transform: `translate3d(${mousePos.current.x}px, ${mousePos.current.y}px, 0)`,
        }}
      >
        {/* Subtle Ambient Halo anchored directly behind the pointer tip */}
        <div
          className={`absolute -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none transition-all duration-200 ${
            isInteractive
              ? 'w-7 h-7 opacity-80 border'
              : 'w-4 h-4 opacity-40'
          }`}
          style={{
            borderColor: isInteractive ? `rgba(${themeColors.rgb}, 0.55)` : 'transparent',
            background: isInteractive
              ? `radial-gradient(circle, rgba(${themeColors.rgb}, 0.15) 0%, transparent 70%)`
              : `radial-gradient(circle, rgba(${themeColors.rgb}, 0.3) 0%, transparent 70%)`,
            boxShadow: isInteractive ? `0 0 12px rgba(${themeColors.rgb}, 0.25)` : 'none',
          }}
        />

        {/* 1. Precise Cyberpunk Tactical Arrow Pointer */}
        {!isText && (
          <div
            className={`transition-transform duration-100 ease-out origin-top-left ${
              isClicking
                ? 'scale-85'
                : isInteractive
                ? 'scale-110'
                : 'scale-100'
            }`}
          >
            <svg
              width="21"
              height="21"
              viewBox="0 0 24 24"
              fill="none"
              className="overflow-visible"
              style={{
                filter: `drop-shadow(0 0 5px rgba(${themeColors.rgb}, ${isInteractive ? '0.7' : '0.45'}))`,
              }}
            >
              {/* Main Arrow Body with Sharp Apex at (0, 0) */}
              <polygon
                points="0,0 6.5,20 11.2,13 19,10"
                fill="#0a0e17"
                stroke={themeColors.primary}
                strokeWidth="1.5"
                strokeLinejoin="round"
              />

              {/* High-tech Inner Accent Facet */}
              <polygon
                points="2.5,4 6,15 9.5,11.5 14,9"
                fill={isInteractive ? themeColors.primary : `rgba(${themeColors.rgb}, 0.4)`}
                fillOpacity={isInteractive ? 0.6 : 0.3}
              />

              {/* Exact Apex Tip Micro-Dot */}
              <circle
                cx="0"
                cy="0"
                r="1"
                fill="#ffffff"
              />
            </svg>
          </div>
        )}

        {/* 2. Precision Cyber Caret for Text Inputs */}
        {isText && (
          <div className="relative -translate-x-1/2 -translate-y-1/2 flex items-center justify-center">
            <div
              className="w-0.5 h-4.5 rounded-full animate-pulse"
              style={{
                backgroundColor: themeColors.primary,
                boxShadow: `0 0 8px ${themeColors.primary}`,
              }}
            />
            {/* Horizontal micro notches */}
            <div
              className="absolute top-0 w-2.5 h-0.5"
              style={{ backgroundColor: themeColors.primary }}
            />
            <div
              className="absolute bottom-0 w-2.5 h-0.5"
              style={{ backgroundColor: themeColors.primary }}
            />
          </div>
        )}
      </div>
    </>
  );
};
