'use client';

import { useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';
import { memo } from 'react';

/**
 * WebGL Particle Background Component
 *
 * Creates an experimental 3D particle system that responds to mouse movement
 * and serves as the artistic foundation for the Lazy Perfectionist experience.
 *
 * Performance: Optimimized for 60fps with efficient particle rendering
 */
interface ParticleProps {
  count?: number;
  mousePosition?: { x: number; y: number };
}

function ParticleField({ count = 5000, mousePosition = { x: 0, y: 0 } }: ParticleProps) {
  const ref = useRef<THREE.Points>(null);

  // Generate random particle positions
  const particles = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      // Create a spherical distribution
      const radius = Math.random() * 10 + 5;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);

      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = radius * Math.cos(phi);

      // Color gradient based on position (indigo to purple)
      const t = (Math.sin(phi) + 1) / 2;
      colors[i * 3] = 0.39 + t * 0.17; // R: indigo to purple
      colors[i * 3 + 1] = 0.39 - t * 0.14; // G
      colors[i * 3 + 2] = 0.95 - t * 0.37; // B
    }

    return { positions, colors };
  }, [count]);

  // Animate particles
  useFrame((state) => {
    if (!ref.current) return;

    const time = state.clock.getElapsedTime();

    // Gentle rotation
    ref.current.rotation.y = time * 0.05;
    ref.current.rotation.x = Math.sin(time * 0.1) * 0.1;

    // Mouse interaction - subtle influence
    const targetX = mousePosition.x * 0.5;
    const targetY = mousePosition.y * 0.5;

    ref.current.rotation.x += (targetY - ref.current.rotation.x) * 0.02;
    ref.current.rotation.y += (targetX - ref.current.rotation.y) * 0.02;

    // Pulse effect
    const scale = 1 + Math.sin(time * 0.5) * 0.1;
    ref.current.scale.setScalar(scale);
  });

  return (
    <Points ref={ref}>
      <bufferAttribute
        attach="geometry-attributes-position"
        args={[particles.positions, 3]}
      />
      <bufferAttribute
        attach="geometry-attributes-color"
        args={[particles.colors, 3]}
      />
      <PointMaterial
        transparent
        vertexColors
        size={0.05}
        sizeAttenuation={true}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </Points>
  );
}

/**
 * Main WebGL Background Component
 *
 * Integrates the 3D particle system with the page
 */
interface WebGLBackgroundProps {
  className?: string;
}

function WebGLBackgroundContent({ className = '' }: WebGLBackgroundProps) {
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      // Normalize mouse position to -1 to 1
      mouseRef.current.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouseRef.current.y = -(event.clientY / window.innerHeight) * 2 + 1;
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className={`fixed inset-0 -z-10 ${className}`}>
      <Canvas
        camera={{ position: [0, 0, 15], fov: 75 }}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
        }}
        dpr={[1, 2]} // Responsive pixel ratio for performance
      >
        {/* Ambient light for subtle illumination */}
        <ambientLight intensity={0.5} />

        {/* Particle field */}
        <ParticleField count={3000} mousePosition={mouseRef.current} />

        {/* Fog for depth effect */}
        <fog attach="fog" args={['#000000', 10, 30]} />
      </Canvas>
    </div>
  );
}

// Memoized version to prevent unnecessary re-renders
export default memo(WebGLBackgroundContent);