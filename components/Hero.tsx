"use client";

import React, { useMemo } from "react";
import { motion } from "framer-motion";

export default function Hero() {
  // Generate stable positions and durations for particles to prevent hydration mismatch
  const particles = useMemo(() => [
    { x: 12, y: 20, size: 5, duration: 4.2, delay: 0 },
    { x: 85, y: 15, size: 4, duration: 3.8, delay: 0.5 },
    { x: 30, y: 70, size: 6, duration: 5.1, delay: 1.0 },
    { x: 65, y: 45, size: 4, duration: 4.5, delay: 0.3 },
    { x: 50, y: 80, size: 5, duration: 3.6, delay: 0.8 },
    { x: 20, y: 55, size: 4, duration: 4.8, delay: 1.5 },
    { x: 78, y: 30, size: 6, duration: 5.3, delay: 0.2 },
    { x: 40, y: 10, size: 4, duration: 3.9, delay: 1.2 },
    { x: 90, y: 60, size: 5, duration: 4.1, delay: 0.7 },
    { x: 10, y: 88, size: 4, duration: 4.7, delay: 1.8 },
    { x: 55, y: 35, size: 6, duration: 3.5, delay: 0.4 },
    { x: 72, y: 75, size: 4, duration: 5.0, delay: 1.1 },
    { x: 25, y: 40, size: 5, duration: 4.3, delay: 0.9 },
    { x: 48, y: 62, size: 4, duration: 3.7, delay: 1.6 },
    { x: 83, y: 85, size: 6, duration: 4.9, delay: 0.1 },
    { x: 15, y: 5,  size: 4, duration: 4.4, delay: 1.3 },
    { x: 60, y: 92, size: 5, duration: 3.4, delay: 0.6 },
    { x: 35, y: 25, size: 4, duration: 5.2, delay: 1.7 },
    { x: 92, y: 48, size: 6, duration: 4.6, delay: 0.0 },
    { x: 5,  y: 72, size: 4, duration: 3.3, delay: 1.4 },
  ], []);

  return (
    <section 
      className="relative min-h-svh w-full bg-navy overflow-hidden flex flex-col justify-center items-center px-4"
      style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
    >
      {/* Background Glow Layer */}
      <div 
        className="absolute inset-0 pointer-events-none z-0"
        style={{
          background: "radial-gradient(circle at center, rgba(201, 168, 76, 0.08) 0%, rgba(5, 8, 16, 0) 70%)"
        }}
      />

      {/* Golden Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        {particles.map((particle, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-gold bg-opacity-40"
            style={{
              top: `${particle.y}%`,
              left: `${particle.x}%`,
              width: `${particle.size}px`,
              height: `${particle.size}px`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.2, 0.6, 0.2],
            }}
            transition={{
              duration: particle.duration,
              delay: particle.delay,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Center Content */}
      <div className="relative z-10 flex flex-col items-center text-center">
        {/* Portrait Container */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="w-[260px] h-[340px] md:w-[360px] md:h-[460px] rounded-2xl overflow-hidden border border-gold/30 shadow-[0_0_60px_rgba(201,168,76,0.15)] bg-gradient-to-br from-[#1a1528] to-[#0a0814]"
        >
          <img 
            src="/images/photo_hero.webp" 
            alt="Dr. Sonia Imran" 
            loading="eager"
            decoding="async"
            className="w-full h-full object-cover opacity-0 transition-opacity duration-500"
            style={{ objectFit: 'cover', objectPosition: 'top' }}
            onError={(e) => {
              // Ensure container shows gradient if image fails
              (e.target as HTMLImageElement).style.display = 'none';
            }}
            onLoad={(e) => {
              (e.target as HTMLImageElement).classList.remove('opacity-0');
            }}
          />
        </motion.div>

        {/* Animated Text Content */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 1 }}
          className="mt-8 flex flex-col items-center"
        >
          {/* Subtext */}
          <span className="font-inter text-gold text-xs tracking-[0.2em] uppercase font-medium mb-4">
            ~ A Surprise from Mubeen ~
          </span>
          
          {/* Main Heading */}
          <h1 className="font-playfair italic text-gold-gradient text-[clamp(2rem,8vw,4.5rem)] leading-[1.1] glow-text mb-2">
            Happy Birthday
          </h1>
          
          {/* Name */}
          <h2 className="font-playfair font-light text-white text-[clamp(1.8rem,6vw,3.5rem)] tracking-wide mb-4">
            Dr. Sonia Imran
          </h2>
          
          {/* Tagline */}
          <p className="font-inter text-muted text-sm md:text-base font-light italic max-w-xs mx-auto leading-relaxed text-[#8A8A9A]">
            For someone who inspires future healers every day.
          </p>
          
          {/* Date Badge */}
          <div className="mt-8 border border-gold/30 rounded-full px-5 py-1.5 text-gold text-xs font-medium backdrop-blur-sm bg-gold/5 inline-flex items-center space-x-2">
             <span>May 13</span>
             <span className="opacity-50">|</span>
             <span>Turning 26</span>
          </div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div 
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 text-gold cursor-pointer"
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
      >
        <svg 
          width="24" 
          height="24" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2" 
          strokeLinecap="round" 
          strokeLinejoin="round"
        >
          <polyline points="6 9 12 15 18 9"></polyline>
        </svg>
      </motion.div>
    </section>
  );
}
