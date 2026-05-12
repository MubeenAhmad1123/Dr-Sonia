"use client";

import React, { useState, useEffect } from "react";
import { motion, useScroll, useSpring, AnimatePresence } from "framer-motion";
import Hero from "@/components/Hero";
import CrownReveal from "@/components/CrownReveal";
import Timeline from "@/components/Timeline";
import MemoryCards from "@/components/MemoryCards";
import Impact from "@/components/Impact";
import Ending from "@/components/Ending";

export default function MainContent() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  // Scroll Progress Setup
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const Separator = () => (
    <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-gold to-transparent opacity-40 relative z-10" />
  );

  return (
    <main className="min-h-screen bg-navy text-white relative selection:bg-gold/30 selection:text-gold-light">
      
      {/* Fixed Scroll Progress Indicator */}
      <motion.div 
        className="fixed top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-gold to-gold-light origin-left z-[100]"
        style={{ scaleX }}
      />

      {/* Cinematic Loading Overlay */}
      <AnimatePresence mode="wait">
        {isLoading && (
          <motion.div 
            key="loader"
            initial={{ opacity: 1 }}
            exit={{ 
              opacity: 0,
              transition: { duration: 0.8, ease: "easeInOut" } 
            }}
            className="fixed inset-0 z-[200] bg-[#050810] flex items-center justify-center overflow-hidden"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ 
                opacity: [0, 1, 1],
                scale: [0.95, 1, 1.02]
              }}
              transition={{ duration: 1.8, times: [0, 0.3, 1] }}
              className="text-center relative"
            >
              {/* Floating soft glow ring around text */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 bg-gold/[0.08] blur-xl rounded-full animate-pulse" />
              
              <h1 className="font-playfair text-gold-gradient text-3xl md:text-4xl italic glow-text tracking-wide z-10 relative">
                Dr. Sonia Imran
              </h1>
              <p className="font-inter text-white/40 text-[10px] uppercase tracking-[0.4em] mt-3 font-light z-10 relative">
                Loading Tribute
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Content Stack render continues beneath loader */}
      <div className={`transition-opacity duration-1000 ${isLoading ? 'opacity-0' : 'opacity-100'}`}>
        <Hero />
        <Separator />
        <CrownReveal isReady={!isLoading} />
        <Separator />
        <Timeline />
        <Separator />
        <MemoryCards />
        <Separator />
        <Impact />
        <Separator />
        <Ending />
      </div>
    </main>
  );
}
