"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

export default function CrownReveal() {
  const sectionRef = useRef<HTMLElement>(null);
  const crownRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Cinematic Scroll Landing Animation
      gsap.fromTo(
        crownRef.current,
        {
          y: -350, // Starting high above the screen
          scale: 0.7,
          rotate: -12,
          opacity: 0,
          filter: "brightness(1.5) drop-shadow(0 0 0px rgba(255,215,0,0))",
        },
        {
          y: 0, // Lands exactly at top position
          scale: 1,
          rotate: 0,
          opacity: 1,
          filter: "brightness(1) drop-shadow(0 10px 30px rgba(201, 168, 76, 0.4))",
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "bottom 70%", // Completes landing by 70% of scroll duration
            scrub: 1.5,
          },
        }
      );

      // Subtle text reveal triggered slightly after landing starts
      gsap.fromTo(
        textRef.current,
        {
          opacity: 0,
          y: 40,
          filter: "blur(10px)",
        },
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "40% top", // Starts appearing after crown gets halfway
            toggleActions: "play none none reverse"
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={sectionRef} 
      className="relative bg-[#05060f]" 
      style={{ height: '200vh' }} // Crucial for enough scroll duration
    >
      {/* Pinning Container via sticky */}
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">
        
        {/* Layer 1: Cinematic Ambient Background */}
        <div className="absolute inset-0 pointer-events-none z-0">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gold/[0.04] blur-[120px] rounded-full" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_30%,_#05060f_80%)]" />
        </div>

        {/* Content Composite */}
        <div className="relative flex flex-col items-center z-10 w-full px-4">
          
          {/* Composite Portrait Wrapper */}
          <div className="relative">
            {/* Layer 2: The Portrait Image Container */}
            <div 
              className="relative rounded-3xl border border-gold/20 bg-gradient-to-b from-[#1a1228] to-[#0a0910] shadow-2xl overflow-hidden"
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
                className="object-cover object-top transition-transform duration-[2s] hover:scale-[1.02]"
                sizes="(max-width: 768px) 320px, 320px"
              />
              {/* Vignette over the photo */}
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-navy/60" />
            </div>

            {/* Layer 3: The Landing Crown (Layered above) */}
            <div
              ref={crownRef}
              className="absolute pointer-events-none z-20"
              style={{
                top: '-18%', // Calibrated positioning to fit above the head perfectly
                left: '50%',
                transform: 'translateX(-50%)',
                width: 'clamp(160px, 55%, 240px)', // Adaptive sizing relative to container
              }}
            >
              <img
                src="/images/crown.webp"
                alt="Royal Gold Crown"
                className="w-full h-auto drop-shadow-[0_8px_16px_rgba(0,0,0,0.5)]"
                style={{
                  filter: 'drop-shadow(0px 4px 20px rgba(201, 168, 76, 0.3))'
                }}
              />
            </div>
          </div>

          {/* Layer 4: Message */}
          <div 
            ref={textRef}
            className="mt-12 text-center flex flex-col items-center max-w-lg w-full"
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
