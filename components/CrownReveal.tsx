"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

export default function CrownReveal({ isReady = true }: { isReady?: boolean }) {
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const portraitRef = useRef<HTMLDivElement>(null);
  const crownRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isReady) return; // Only init after root-level state changes complete to prevent node displacement conflicts

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom bottom", // Matches the extra height of parent section
          scrub: 1.2,
          pin: true, // Explicit GSAP pinning is safer than pure CSS sticky for sequenced animations
          invalidateOnRefresh: true,
        }
      });

      // Phase 1: Reveal Portrait Container
      tl.fromTo(
        portraitRef.current,
        {
          opacity: 0,
          y: 60,
          scale: 0.9,
          force3D: true,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1.5,
          ease: "power3.out",
          force3D: true,
        }
      );

      // Phase 2: The Crown Descends onto the head
      tl.fromTo(
        crownRef.current,
        {
          opacity: 0,
          y: () => -window.innerHeight * 0.8, // Start well above viewport top
          xPercent: -50,
          scale: 2.5, // Start significantly larger for a zooming-in drop effect
          rotate: -15,
          force3D: true,
        },
        {
          opacity: 1,
          y: 0,
          xPercent: -50,
          scale: 1, // Settles down into its snug final size
          rotate: 0,
          duration: 2.5, // Smooth sequence time
          ease: "elastic.out(1.1, 0.9)", // Highly premium dampening bounce
          force3D: true,
        },
        "-=0.5" // Overlap seamlessly
      );

      // Phase 3: Text Reveal
      tl.fromTo(
        textRef.current,
        {
          opacity: 0,
          y: 20,
          filter: "blur(8px)",
          force3D: true,
        },
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 1,
          ease: "power2.out",
          force3D: true,
        },
        "-=1" // Overlap text fade with the crown landing
      );

    }, sectionRef);

    return () => ctx.revert();
  }, [isReady]);

  return (
    <section
      ref={sectionRef}
      className="relative bg-[#05060f]"
      style={{ height: '200vh' }} // Increased for sequential timeline beats
    >
      {/* Composite Center */}
      <div
        ref={containerRef}
        className="h-screen w-full flex items-end justify-center pb-16 md:pb-24 overflow-hidden"
      >

        {/* Layer 1: Ambient Glow */}
        <div className="absolute inset-0 pointer-events-none z-0">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gold/[0.04] blur-[120px] rounded-full" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_30%,_#05060f_80%)]" />
        </div>

        <div className="relative flex flex-col items-center z-10 w-full px-4">

          <div className="relative">
            {/* Layer 2: The Portrait (Separately animated now) */}
            <div
              ref={portraitRef}
              className="relative rounded-3xl border border-gold/20 bg-gradient-to-b from-[#1a1228] to-[#0a0910] shadow-2xl overflow-hidden z-10 will-change-[transform,opacity]"
              style={{
                width: 'min(320px, 85vw)',
                aspectRatio: '3 / 4'
              }}
            >
              <Image
                src="/images/photo_crown.webp"
                alt="Dr. Sonia Imran portrait"
                fill
                priority
                className="object-cover object-top"
                sizes="(max-width: 768px) 320px, 320px"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-navy/60" />
            </div>

            {/* Layer 3: The Crown (Optimized layout using next/image) */}
            <div
              ref={crownRef}
              className="absolute pointer-events-none z-20 will-change-[transform,opacity]"
              style={{
                top: '-15%', // Adjusted to sit perfectly lower over the portrait
                left: '50%',
                transform: 'translateX(-50%)', // Fallback CSS centering
                width: 'clamp(170px, 55%, 250px)', // Decreased slightly for a tighter, premium fit
                aspectRatio: '1 / 1'
              }}
            >
              <Image
                src="/images/crown.webp"
                alt="Royal Crown"
                width={400}
                height={400}
                priority
                className="w-full h-full object-contain drop-shadow-[0_10px_25px_rgba(0,0,0,0.6)]"
              />
            </div>
          </div>

          {/* Layer 4: Message */}
          <div
            ref={textRef}
            className="mt-12 text-center flex flex-col items-center max-w-lg w-full will-change-[transform,opacity]"
          >
            <span className="text-[10px] tracking-[0.4em] uppercase text-gold-light/60 mb-4 block">The Queen of Our Hearts</span>

            <h3 className="font-playfair italic text-gold text-[clamp(1.25rem,5vw,2rem)] leading-tight tracking-wide glow-text px-4">
              "She leads. She heals. She inspires."
            </h3>

            <div className="w-12 h-[1px] bg-gradient-to-r from-transparent via-gold to-transparent my-4 opacity-60" />

            <p className="font-inter text-white/70 text-xs md:text-sm uppercase tracking-[0.25em] font-medium">
              The True Healer
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}
