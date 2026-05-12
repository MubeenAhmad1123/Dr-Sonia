"use client";

import React, { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";

export default function Ending() {
  const [isCopied, setIsCopied] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Generate randomized, stable confetti config after component mount to handle randomness cleanly
  const confettiPieces = useMemo(() => {
    const types = ['rect', 'circle'];
    const colors = ["#C9A84C", "#F0D080", "#FFFFFF", "#F5E8D0", "#FFC0CB"]; // gold, lighter gold, white, cream, soft pink
    const pieces = [];
    for (let i = 0; i < 40; i++) {
      pieces.push({
        id: i,
        left: Math.random() * 100,
        sizeWidth: 6 + Math.random() * 4,
        sizeHeight: 4 + Math.random() * 6,
        duration: 3 + Math.random() * 3,
        delay: Math.random() * 3,
        rotation: Math.random() * 720,
        color: colors[Math.floor(Math.random() * colors.length)],
        type: types[Math.floor(Math.random() * types.length)]
      });
    }
    return pieces;
  }, []);

  const handleShareWhatsApp = () => {
    const shareUrl = window.location.href;
    const text = `🎂 Happy Birthday Dr. Sonia Imran! I wanted to wish you with something special. Check this out 💛 ${shareUrl}`;
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, "_blank");
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.5 },
    transition: { duration: 0.8, ease: "easeOut" as const }
  };

  return (
    <section className="relative min-h-screen w-full overflow-hidden flex flex-col justify-center items-center px-6 py-20 bg-gradient-radial from-[#0f0b1f] via-navy to-[#050810]">
      
      {/* Soft Ambient Center Glow */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-gold/[0.12] blur-[120px] pointer-events-none z-0"
      />

      {/* Confidential Lightweight Confetti Effect */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        {isMounted && confettiPieces.map((conf) => (
          <motion.div
            key={conf.id}
            initial={{ y: -20, opacity: 1, x: 0, rotate: 0 }}
            animate={{ 
              y: "110vh", 
              rotate: conf.rotation,
              opacity: [1, 1, 0], // Fade at end
              x: [0, Math.random() * 30 - 15, 0] // Slight horizontal sway
            }}
            transition={{
              duration: conf.duration,
              delay: conf.delay,
              repeat: Infinity,
              ease: "linear"
            }}
            className="absolute"
            style={{
              left: `${conf.left}%`,
              width: `${conf.sizeWidth}px`,
              height: `${conf.sizeHeight}px`,
              backgroundColor: conf.color,
              borderRadius: conf.type === 'circle' ? '50%' : '2px',
              boxShadow: `0 0 4px ${conf.color}80`
            }}
          />
        ))}
      </div>

      {/* Content Stack */}
      <div className="relative z-10 flex flex-col items-center text-center max-w-3xl mx-auto">
        
        <motion.span 
          {...fadeInUp}
          className="font-inter text-gold/60 text-xs font-medium uppercase tracking-[0.3em] mb-8 block"
        >
          With Love & Gratitude
        </motion.span>

        <motion.h2 
          {...fadeInUp}
          transition={{ ...fadeInUp.transition, delay: 0.2 }}
          className="font-playfair italic text-white text-[clamp(1.8rem,6vw,3.2rem)] font-light leading-relaxed max-w-2xl mb-6"
        >
          "Thank you for the impact you leave behind."
        </motion.h2>

        <motion.p 
          {...fadeInUp}
          transition={{ ...fadeInUp.transition, delay: 0.4 }}
          className="font-inter text-white/60 text-sm md:text-base max-w-lg font-light leading-loose mb-12"
        >
          You may have stepped away from the classroom, but never from the hearts of those you taught. 
          Wishing you a birthday as beautiful as the change you created. 
          <br />
          <span className="inline-block mt-2 font-normal text-gold/70">— From your student, always, Mubeen.</span>
        </motion.p>

        {/* Pulsing Happy Birthday Element */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="mb-4"
        >
          <motion.h1 
            animate={{ scale: [1, 1.03, 1] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            className="font-playfair font-bold text-[clamp(2.5rem,10vw,5rem)] text-gold-gradient glow-text leading-none select-none"
          >
            Happy Birthday
          </motion.h1>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8 }}
          className="font-inter text-gold/50 text-xs md:text-sm font-medium tracking-[0.2em] uppercase flex items-center gap-2 mb-16"
        >
          May 13, 2025 <span className="opacity-40">•</span> You Turn 26 Today 🎂
        </motion.p>

        {/* Actions Row */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 1 }}
          className="flex flex-wrap justify-center items-center gap-4 mb-24"
        >
          {/* WhatsApp button */}
          <motion.button
            onClick={handleShareWhatsApp}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.98 }}
            className="flex items-center gap-2.5 bg-[#25D366] hover:bg-[#20ba5a] text-white px-7 py-3.5 rounded-full text-sm font-medium shadow-lg shadow-[#25d366]/20 transition-colors duration-300 cursor-pointer"
          >
            <svg width="19" height="19" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.72.938 3.659 1.434 5.63 1.435h.004c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            Share on WhatsApp
          </motion.button>

          {/* Copy link button */}
          <motion.button
            onClick={handleCopyLink}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.98 }}
            className="flex items-center gap-2.5 bg-gold/15 hover:bg-gold/25 border border-gold/40 text-gold px-7 py-3.5 rounded-full text-sm font-medium backdrop-blur-sm transition-all duration-300 cursor-pointer"
          >
            {isCopied ? (
              <>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                Copied!
              </>
            ) : (
              <>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path>
                  <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path>
                </svg>
                Copy Link
              </>
            )}
          </motion.button>
        </motion.div>

        {/* Minimalist footer note */}
        <div className="w-full border-t border-white/5 pt-8">
          <p className="font-inter text-white/20 text-[10px] md:text-xs tracking-widest font-light">
            BUILT WITH 💛 BY MUBEEN <span className="mx-2">·</span> FOR DR. SONIA IMRAN <span className="mx-2">·</span> MAY 13, 2025
          </p>
        </div>

      </div>
    </section>
  );
}
