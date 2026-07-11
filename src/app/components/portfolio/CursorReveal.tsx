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
  const isLowPerformanceRef = useRef(false);

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

        // Create smooth brush trail with enhanced visual quality
        const dx = x - lastMousePos.current.x;
        const dy = y - lastMousePos.current.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance > 3) {
          const velocity = Math.min(distance / 10, 1); // Normalize velocity
          const numStrokes = Math.min(6, Math.max(2, Math.floor(distance / 20)));

          // Limit total brushstrokes for performance
          if (brushStrokes.current.length > 150) {
            brushStrokes.current = brushStrokes.current.slice(-100);
          }

          for (let i = 0; i < numStrokes; i++) {
            const t = i / numStrokes;
            const strokeX = lastMousePos.current.x + dx * t;
            const strokeY = lastMousePos.current.y + dy * t;

            // Enhanced brushstroke with velocity-based dynamics
            brushStrokes.current.push({
              x: strokeX,
              y: strokeY,
              size: 60 + velocity * 40 + Math.random() * 50, // Velocity-responsive
              opacity: 0.25 + velocity * 0.15 + Math.random() * 0.2, // Velocity-enhanced opacity
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

    // Enhanced animation loop with better performance and visual quality
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const currentTime = Date.now();
      const maxAge = 3000; // Brushstrokes last 3 seconds

      // Performance optimization: Skip rendering if no active strokes
      if (brushStrokes.current.length === 0) {
        animationFrameRef.current = requestAnimationFrame(animate);
        return;
      }

      // Draw enhanced brushstrokes with artistic gradients
      brushStrokes.current = brushStrokes.current.filter(stroke => {
        const age = currentTime - stroke.timestamp;
        if (age > maxAge) return false;

        const fade = 1 - (age / maxAge);
        const opacity = stroke.opacity * fade;

        // Create multi-layer artistic brush effect
        const layers = 3;
        for (let layer = 0; layer < layers; layer++) {
          const layerSize = stroke.size * (1 + layer * 0.3);
          const layerOpacity = opacity * (1 - layer * 0.25);

          const gradient = ctx.createRadialGradient(
            stroke.x, stroke.y, 0,
            stroke.x, stroke.y, layerSize
          );

          // Artistic ember color scheme
          gradient.addColorStop(0, `rgba(220, 80, 0, ${layerOpacity * 0.8})`);
          gradient.addColorStop(0.3, `rgba(220, 80, 0, ${layerOpacity * 0.5})`);
          gradient.addColorStop(0.6, `rgba(220, 80, 0, ${layerOpacity * 0.3})`);
          gradient.addColorStop(1, `rgba(220, 80, 0, 0)`);

          ctx.fillStyle = gradient;
          ctx.beginPath();
          ctx.arc(stroke.x, stroke.y, layerSize, 0, Math.PI * 2);
          ctx.fill();
        }

        // Add center glow dot for artistic effect
        ctx.fillStyle = `rgba(220, 80, 0, ${opacity * 0.6})`;
        ctx.beginPath();
        ctx.arc(stroke.x, stroke.y, stroke.size * 0.2, 0, Math.PI * 2);
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

      {/* Enhanced cursor indicator with smooth animations */}
      <div
        className="absolute rounded-full border-2 pointer-events-none fixed"
        data-testid="cursor-indicator"
        style={{
          width: '200px',
          height: '200px',
          left: `${mousePosition.x - 100}px`,
          top: `${mousePosition.y - 100}px`,
          borderColor: isActive ? 'rgba(220, 80, 0, 0.5)' : 'rgba(220, 80, 0, 0)',
          boxShadow: isActive
            ? '0 0 50px rgba(220, 80, 0, 0.3), inset 0 0 30px rgba(220, 80, 0, 0.15)'
            : 'none',
          opacity: isActive ? 1 : 0,
          transform: `scale(${isActive ? 1 : 0.7})`,
          transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
          pointerEvents: 'none',
          zIndex: 9999,
          willChange: 'transform, opacity',
        }}
      />

      {/* Enhanced center dot with artistic glow */}
      <div
        className="absolute rounded-full pointer-events-none fixed"
        data-testid="cursor-center-dot"
        style={{
          width: '10px',
          height: '10px',
          left: `${mousePosition.x - 5}px`,
          top: `${mousePosition.y - 5}px`,
          backgroundColor: isActive ? 'rgba(220, 80, 0, 0.9)' : 'rgba(220, 80, 0, 0)',
          boxShadow: isActive
            ? '0 0 25px rgba(220, 80, 0, 0.9), 0 0 35px rgba(220, 80, 0, 0.5)'
            : 'none',
          opacity: isActive ? 1 : 0,
          transform: `scale(${isActive ? 1 : 0.8})`,
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          pointerEvents: 'none',
          zIndex: 10000,
          willChange: 'transform, opacity',
        }}
      />
    </div>
  );
}