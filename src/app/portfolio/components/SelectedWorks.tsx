'use client';

import { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function SelectedWorks() {
  const sectionRef = useRef<HTMLDivElement>(null);

  const projects = [
    { title: 'Automotive Motion', span: 'md:col-span-7', aspect: 'aspect-[16/9]' },
    { title: 'Urban Architecture', span: 'md:col-span-5', aspect: 'aspect-[3/4]' },
    { title: 'Human Perspective', span: 'md:col-span-5', aspect: 'aspect-[3/4]' },
    { title: 'Brand Identity', span: 'md:col-span-7', aspect: 'aspect-[16/9]' },
  ];

  return (
    <section ref={sectionRef} className="bg-oryzo-canvas py-12 md:py-16">
      <div className="max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
          viewport={{ once: true, margin: '-100px' }}
          className="mb-12"
        >
          <div className="flex items-center gap-8 mb-6">
            <div className="w-8 h-px bg-oryzo-border" />
            <span className="text-xs text-oryzo-muted uppercase tracking-[0.3em] font-oryzo-display">
              SELECTED WORK
            </span>
          </div>

          <h2 className="text-4xl md:text-6xl font-oryzo-display leading-tight">
            FEATURED PROJECTS
          </h2>

          <p className="text-oryzo-body text-oryzo-muted max-w-2xl font-oryzo-body">
            A selection of musical compositions I've created, from concept to final master.
          </p>

          <Link
            href="/music"
            className="hidden md:inline-flex items-center gap-2 text-sm rounded-full px-6 py-3 border border-oryzo-border hover:border-oryzo-cream hover:text-oryzo-cream transition-all group font-oryzo-display"
          >
            VIEW ALL WORK
            <span className="group-hover:translate-x-1 transition-transform">→</span>
          </Link>
        </motion.div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-5 md:gap-6">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              className={`${project.span} relative`}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.8,
                ease: [0.25, 0.1, 0.25, 1],
                delay: index * 0.1,
              }}
              viewport={{ once: true, margin: '-100px' }}
            >
              <div
                className={`relative ${project.aspect} rounded-3xl border border-oryzo-border overflow-hidden group cursor-pointer`}
              >
                {/* Background Image */}
                <div className="absolute inset-0 bg-gradient-to-br from-oryzo-border/20 to-oryzo-surface/20">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-6xl font-oryzo-display text-oryzo-muted/30">
                      {project.title.charAt(0)}
                    </span>
                  </div>
                </div>

                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-oryzo-canvas/70 opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-lg flex items-center justify-center">
                  <div className="text-center">
                    <h3 className="text-2xl md:text-3xl font-oryzo-display mb-2">
                      {project.title.toUpperCase()}
                    </h3>
                    <p className="text-sm text-oryzo-muted mb-4 font-oryzo-body">VIEW PROJECT</p>
                    <Link
                      href="/music"
                      className="relative inline-block rounded-full bg-oryzo-surface px-6 py-2 text-oryzo-cream text-sm overflow-hidden font-oryzo-display"
                    >
                      <span className="absolute inset-0 rounded-full bg-oryzo-ember opacity-0 group-hover:opacity-100 transition-opacity" />
                      <span className="relative z-10">
                        VIEW — {project.title.toUpperCase()}
                      </span>
                    </Link>
                  </div>
                </div>

                {/* Halftone Overlay */}
                <div
                  className="absolute inset-0 opacity-20 mix-blend-multiply pointer-events-none"
                  style={{
                    backgroundImage: 'radial-gradient(circle, #000 1px, transparent 1px)',
                    backgroundSize: '4px 4px',
                  }}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}