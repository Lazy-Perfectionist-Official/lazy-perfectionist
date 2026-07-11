'use client';

import { useEffect, useRef, useState } from 'react';

interface CursorRevealProps {
  originalImage: string;
  revealImage: string;
  enabled?: boolean;
}

interface BrushStroke {
  x: number;
  y: number;
  size: number;
  opacity: number;
  timestamp: number;
}

export default function CursorReveal({
  originalImage,
  revealImage,
  enabled = true
}: CursorRevealProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isActive, setIsActive] = useState(false);

  const brushStrokes = useRef<BrushStroke[]>([]);
  const lastMousePos = useRef({ x: 0, y: 0 });
  const animationFrameRef = useRef<number>();

  useEffect(() => {
    if (!enabled) return;

    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size to match container
    const updateCanvasSize = () => {
      const rect = container.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;
    };

    updateCanvasSize();
    window.addEventListener('resize', updateCanvasSize);

    // Global mouse tracking - works across all elements
    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      setMousePosition({ x, y });

      // Check if mouse is within hero section bounds
      if (x >= 0 && x <= rect.width && y >= 0 && y <= rect.height) {
        setIsActive(true);

        // Create smooth brush trail
        const dx = x - lastMousePos.current.x;
        const dy = y - lastMousePos.current.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance > 3) {
          const numStrokes = Math.min(8, Math.max(2, Math.floor(distance / 15)));

          for (let i = 0; i < numStrokes; i++) {
            const t = i / numStrokes;
            const strokeX = lastMousePos.current.x + dx * t;
            const strokeY = lastMousePos.current.y + dy * t;

            brushStrokes.current.push({
              x: strokeX,
              y: strokeY,
              size: 80 + Math.random() * 60,
              opacity: 0.3 + Math.random() * 0.2,
              timestamp: Date.now()
            });
          }

          lastMousePos.current = { x, y };
        }
      } else {
        setIsActive(false);
      }
    };

    const handleMouseLeave = () => {
      setIsActive(false);
    };

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const currentTime = Date.now();
      const maxAge = 3000; // Brushstrokes last 3 seconds

      // Draw brushstrokes
      brushStrokes.current = brushStrokes.current.filter(stroke => {
        const age = currentTime - stroke.timestamp;
        if (age > maxAge) return false;

        const fade = 1 - (age / maxAge);
        const opacity = stroke.opacity * fade;

        // Create soft, artistic brush effect
        const gradient = ctx.createRadialGradient(
          stroke.x, stroke.y, 0,
          stroke.x, stroke.y, stroke.size
        );
        gradient.addColorStop(0, `rgba(255, 255, 255, ${opacity})`);
        gradient.addColorStop(0.3, `rgba(255, 255, 255, ${opacity * 0.6})`);
        gradient.addColorStop(0.6, `rgba(255, 255, 255, ${opacity * 0.3})`);
        gradient.addColorStop(1, `rgba(255, 255, 255, 0)`);

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(stroke.x, stroke.y, stroke.size, 0, Math.PI * 2);
        ctx.fill();

        return true;
      });

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animate();

    // Add event listeners to document for global tracking
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('resize', updateCanvasSize);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 overflow-hidden"
      style={{ zIndex: 0 }}
    >
      {/* Base image (cool version) */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${originalImage})`,
          transform: 'scale(1.1)',
        }}
      />

      {/* Canvas for brush mask */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{
          mixBlendMode: 'overlay',
          opacity: 0.8
        }}
      />

      {/* Reveal layer (warm version) masked by canvas */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat pointer-events-none"
        style={{
          backgroundImage: `url(${revealImage})`,
          transform: 'scale(1.1)',
          maskImage: isActive
            ? `radial-gradient(circle 180px at ${mousePosition.x}px ${mousePosition.y}px, black 0%, black 50%, transparent 100%)`
            : 'black', // Show full warm layer when not active
          WebkitMaskImage: isActive
            ? `radial-gradient(circle 180px at ${mousePosition.x}px ${mousePosition.y}px, black 0%, black 50%, transparent 100%)`
            : 'black', // Show full warm layer when not active
          transition: 'mask-image 0.3s ease-out, -webkit-mask-image 0.3s ease-out',
          mixBlendMode: 'normal',
        }}
      />

      {/* Cursor indicator */}
      <div
        className="absolute rounded-full border-2 pointer-events-none fixed"
        style={{
          width: '200px',
          height: '200px',
          left: `${mousePosition.x - 100}px`,
          top: `${mousePosition.y - 100}px`,
          borderColor: isActive ? 'rgba(220, 80, 0, 0.4)' : 'rgba(220, 80, 0, 0)',
          boxShadow: isActive ? '0 0 40px rgba(220, 80, 0, 0.2)' : 'none',
          opacity: isActive ? 1 : 0,
          transform: `scale(${isActive ? 1 : 0.8})`,
          transition: 'all 0.3s ease-out',
          pointerEvents: 'none',
          zIndex: 9999,
        }}
      />

      {/* Center dot */}
      <div
        className="absolute rounded-full pointer-events-none fixed"
        style={{
          width: '8px',
          height: '8px',
          left: `${mousePosition.x - 4}px`,
          top: `${mousePosition.y - 4}px`,
          backgroundColor: isActive ? 'rgba(220, 80, 0, 0.8)' : 'rgba(220, 80, 0, 0)',
          boxShadow: isActive ? '0 0 20px rgba(220, 80, 0, 0.8)' : 'none',
          opacity: isActive ? 1 : 0,
          pointerEvents: 'none',
          zIndex: 10000,
        }}
      />
    </div>
  );
}