"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import CrownSVG from "./CrownSVG";

export default function CrownReveal() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    // Import Lenis type safely from window
    const lenis = (window as any).__lenis;

    gsap.registerPlugin(ScrollTrigger);

    // Connect Lenis to ScrollTrigger — CRITICAL for scrub to work
    if (lenis) {
      lenis.on('scroll', ScrollTrigger.update);
      // Ticker handled in Provider but just in case syncing here
      gsap.ticker.lagSmoothing(0);
    }

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 1.5,
          pin: false, // sticky is handled by CSS, not GSAP pin
        },
      });

      // Crown enters from above
      tl.fromTo(
        '#crown-element',
        { y: -220, opacity: 0, rotation: -10, scale: 0.75 },
        { y: 0, opacity: 1, rotation: 0, scale: 1, duration: 0.6, ease: 'power2.out' }
      );
      // Crown lands with a micro-bounce
      tl.to('#crown-element', { y: -8, duration: 0.08 }, 0.6);
      tl.to('#crown-element', { y: 0, duration: 0.12, ease: 'bounce.out' }, 0.68);
      // Glow activates
      tl.to(
        '#crown-element',
        {
          filter: 'drop-shadow(0 0 18px rgba(240,208,128,0.85))',
          duration: 0.2,
        },
        0.75
      );
      // Text fades in
      tl.fromTo(
        '#crown-text',
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.25 },
        0.8
      );
    }, sectionRef);

    return () => {
      ctx.revert();
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <section 
      ref={sectionRef} 
      className="relative bg-gradient-to-b from-navy via-[#0a0818] to-navy"
      style={{ minHeight: '200vh' }}
    >
      {/* Sticky Container */}
      <div
        style={{
          position: 'sticky',
          top: 0,
          height: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
          flexDirection: 'column',
        }}
      >
        {/* Soft Background glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gold/[0.06] blur-[100px] rounded-full pointer-events-none" />

        <div className="relative flex flex-col items-center w-full px-4">
          {/* Portrait Container */}
          <div 
            className="relative rounded-2xl border border-gold/20 bg-gradient-to-b from-[#1a1228] to-[#0d0b1a] shadow-2xl overflow-visible"
            style={{
              width: 'min(280px, 85vw)', // Responsiveness: audits specify this on mobile
              aspectRatio: '3 / 4'
            }}
          >
            {/* The Crown Element - Using user specification explicitly */}
            <div
              id="crown-element"
              style={{
                position: 'absolute',
                top: '-90px',          // User requested audit value
                left: '50%',
                transform: 'translateX(-50%)',
                width: 'clamp(120px, 35vw, 200px)',  // Integrated mobile clamp from checklist (120px) + max desk (200px)
                zIndex: 20,
                pointerEvents: 'none',
              }}
            >
              <CrownSVG className="w-full h-auto" />
            </div>

            {/* Photo Element */}
            <div className="w-full h-full rounded-2xl overflow-hidden bg-gradient-to-b from-[#1a1228] to-[#0d0b1a]">
              <img
                src="/images/photo_crown.webp"
                alt="Dr. Sonia Imran portrait"
                loading="lazy"
                decoding="async"
                style={{ 
                  width: '100%', 
                  height: '100%', 
                  objectFit: 'cover', 
                  objectPosition: 'top',
                  opacity: 0, 
                  transition: 'opacity 0.7s ease-in' 
                }}
                onLoad={(e) => { (e.target as HTMLImageElement).style.opacity = '1'; }}
                onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
              />
            </div>
          </div>

          {/* Crown Text Element */}
          <div 
            id="crown-text"
            className="mt-8 text-center flex flex-col items-center w-full max-w-lg mx-auto"
            style={{ padding: '0 1rem' }}
          >
            <h3 
              className="font-playfair italic text-gold tracking-wide"
              style={{ fontSize: 'clamp(1rem, 4vw, 1.5rem)' }} // Fixed size from mobile audit B
            >
              "She leads. She heals. She inspires."
            </h3>
            <p className="font-inter text-white/60 text-xs md:text-sm mt-2 tracking-widest uppercase font-medium">
              Dr. Sonia Imran
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
