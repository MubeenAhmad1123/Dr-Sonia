"use client";

import React, { useMemo, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

export default function Hero() {
  const heroRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  // Generate stable positions and durations for particles
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

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Background moves slower
      gsap.to(bgRef.current, {
        yPercent: 20,
        ease: "none",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });

      // Image moves moderately
      gsap.to(imageRef.current, {
        yPercent: 10,
        scale: 1.05,
        ease: "none",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });

      // Text moves slightly faster upward
      gsap.to(textRef.current, {
        yPercent: -15,
        ease: "none",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={heroRef}
      className="relative min-h-svh w-full bg-navy overflow-hidden flex flex-col justify-center items-center px-4"
      style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
    >
      {/* Background Glow Layer */}
      <div 
        ref={bgRef}
        className="absolute inset-0 pointer-events-none z-0"
        style={{
          background: "radial-gradient(circle at center, rgba(201, 168, 76, 0.12) 0%, rgba(5, 8, 16, 0) 70%)"
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
          ref={imageRef}
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1.5, ease: [0.25, 1, 0.5, 1] }}
          className="w-[280px] h-[360px] md:w-[380px] md:h-[480px] rounded-2xl overflow-hidden border border-gold/30 shadow-[0_0_60px_rgba(201,168,76,0.15)] bg-gradient-to-br from-[#1a1528] to-[#0a0814] relative"
        >
          <Image 
            src="/images/photo_hero.webp" 
            alt="Dr. Sonia Imran" 
            fill
            priority
            className="object-cover object-top transition-transform duration-700 hover:scale-105"
            sizes="(max-width: 768px) 280px, 380px"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-navy/40 via-transparent to-transparent pointer-events-none" />
        </motion.div>

        {/* Animated Text Content */}
        <motion.div
          ref={textRef}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 1.2, ease: "easeOut" }}
          className="mt-10 flex flex-col items-center"
        >
          {/* Subtext */}
          <span className="font-inter text-gold text-xs tracking-[0.2em] uppercase font-medium mb-4">
            ~ A Surprise from Mubeen ~
          </span>
          
          {/* Main Heading */}
          <h1 className="font-playfair italic text-gold-gradient text-[clamp(2.5rem,8vw,4.5rem)] leading-[1.1] glow-text mb-2">
            Happy Birthday
          </h1>
          
          {/* Name */}
          <h2 className="font-playfair font-light text-white text-[clamp(2rem,6vw,3.5rem)] tracking-wide mb-4">
            Dr. Sonia Imran
          </h2>
          
          <p className="font-inter text-muted text-sm md:text-base font-light italic max-w-xs md:max-w-md mx-auto leading-relaxed text-[#A0A0B8]">
            For someone whose kindness, grace, and presence leave a lasting impression on everyone around her.
          </p>
          
          {/* Date Badge */}
          <div className="mt-8 border border-gold/30 rounded-full px-6 py-2 text-gold text-xs font-medium backdrop-blur-md bg-gold/10 inline-flex items-center space-x-3 shadow-lg shadow-gold/5">
             <span>May 13 ✨</span>
          </div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div 
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 text-gold/80 cursor-pointer flex flex-col items-center gap-2"
        animate={{ y: [0, 10, 0], opacity: [0.5, 1, 0.5] }}
        transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
      >
        <span className="text-[10px] uppercase tracking-widest font-light">Scroll</span>
        <svg 
          width="20" 
          height="20" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="1.5" 
          strokeLinecap="round" 
          strokeLinejoin="round"
        >
          <polyline points="6 9 12 15 18 9"></polyline>
        </svg>
      </motion.div>
    </section>
  );
}
