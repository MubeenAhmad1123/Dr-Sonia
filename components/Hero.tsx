"use client";

import React, { useMemo } from "react";
import { motion } from "framer-motion";

export default function Hero() {
  // Generate stable positions and durations for particles to prevent hydration mismatch
  const particles = useMemo(() => {
    const data = [];
    // Simple pseudo-random seeded values based on loop index
    for (let i = 0; i < 20; i++) {
      const top = ((i * 17) % 100);
      const left = ((i * 23) % 100);
      const size = 4 + ((i * 11) % 5); // 4px to 8px
      const duration = 3 + ((i * 7) % 4); // 3 to 6 seconds
      const delay = (i * 0.2) % 3;
      data.push({ top, left, size, duration, delay, id: i });
    }
    return data;
  }, []);

  return (
    <section className="relative min-h-svh w-full bg-navy overflow-hidden flex flex-col justify-center items-center px-4">
      {/* Background Glow Layer */}
      <div 
        className="absolute inset-0 pointer-events-none z-0"
        style={{
          background: "radial-gradient(circle at center, rgba(201, 168, 76, 0.08) 0%, rgba(5, 8, 16, 0) 70%)"
        }}
      />

      {/* Golden Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute rounded-full bg-gold bg-opacity-40"
            style={{
              top: `${particle.top}%`,
              left: `${particle.left}%`,
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
          className="w-[280px] h-[360px] md:w-[360px] md:h-[460px] rounded-2xl overflow-hidden border border-gold/30 shadow-[0_0_60px_rgba(201,168,76,0.15)] bg-gradient-to-br from-[#1a1528] to-[#0a0814]"
        >
          <img 
            src="/images/photo_hero.jpg" 
            alt="Dr. Sonia Imran" 
            className="w-full h-full object-cover opacity-0 transition-opacity duration-500"
            onError={(e) => {
              // Ensure container shows gradient if image fails
              e.currentTarget.style.display = 'none';
            }}
            onLoad={(e) => {
              e.currentTarget.classList.remove('opacity-0');
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
          <h1 className="font-playfair italic text-gold-gradient text-[clamp(2.2rem,8vw,4.5rem)] leading-[1.1] glow-text mb-2">
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
