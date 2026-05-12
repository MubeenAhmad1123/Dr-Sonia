"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import CrownSVG from "./CrownSVG";

export default function CrownReveal() {
  const sectionRef = useRef<HTMLElement>(null);
  const crownRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const sparkleContainerRef = useRef<HTMLDivElement>(null);
  
  // Track if sparkle has triggered in the current scroll direction to avoid spam
  const hasSparkledRef = useRef(false);

  const triggerSparkles = () => {
    if (!sparkleContainerRef.current) return;
    
    const container = sparkleContainerRef.current;
    const numSparkles = 12;
    
    // Clear any existing elements just in case
    container.innerHTML = '';
    
    // Get crown bounding box to center the burst around it
    const colors = ["#F0D080", "#FFFFFF", "#C9A84C"];
    
    for (let i = 0; i < numSparkles; i++) {
      const sparkle = document.createElement('div');
      const size = 3 + Math.random() * 4;
      const color = colors[Math.floor(Math.random() * colors.length)];
      
      sparkle.style.position = 'absolute';
      sparkle.style.top = '50%';
      sparkle.style.left = '50%';
      sparkle.style.width = `${size}px`;
      sparkle.style.height = `${size}px`;
      sparkle.style.backgroundColor = color;
      sparkle.style.borderRadius = '50%';
      sparkle.style.transform = 'translate(-50%, -50%)';
      sparkle.style.boxShadow = `0 0 10px ${color}`;
      
      container.appendChild(sparkle);
      
      const angle = Math.random() * Math.PI * 2;
      const distance = 40 + Math.random() * 80;
      const tx = Math.cos(angle) * distance;
      const ty = Math.sin(angle) * distance;
      
      gsap.to(sparkle, {
        x: tx,
        y: ty,
        opacity: 0,
        scale: 0,
        duration: 0.8 + Math.random() * 0.4,
        ease: "power2.out",
        onComplete: () => {
          sparkle.remove();
        }
      });
    }
  };

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Create a main master timeline scrubbed to scroll
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 1.5,
          onUpdate: (self) => {
            // Trigger sparkle specifically when crossing 60% threshold moving forward
            const progress = self.progress;
            if (progress > 0.6 && progress < 0.65 && self.direction > 0 && !hasSparkledRef.current) {
              triggerSparkles();
              hasSparkledRef.current = true;
            } else if (progress < 0.55) {
              // Reset allows it to trigger again when scrolling back up and then down
              hasSparkledRef.current = false;
            }
            
            // Dynamically add/remove glow class based on progress
            if (crownRef.current) {
              if (progress >= 0.75) {
                crownRef.current.classList.add('crown-glow');
              } else {
                crownRef.current.classList.remove('crown-glow');
              }
            }
          }
        }
      });

      // Initial styles
      gsap.set(crownRef.current, {
        y: -200,
        opacity: 0,
        rotation: -8,
        scale: 0.8
      });
      
      gsap.set(textRef.current, {
        opacity: 0,
        y: 20
      });

      // Build the timeline with fixed duration of 1 for easy percentage mapping
      tl.to(crownRef.current, {
        y: 0,
        opacity: 1,
        rotation: 0,
        scale: 1,
        duration: 0.6,
        ease: "power1.inOut"
      }, 0)
      // The Sparkle burst is handled in onUpdate at 0.6
      .to(crownRef.current, {
        y: -12,
        duration: 0.05,
        ease: "power1.out"
      }, 0.65)
      .to(crownRef.current, {
        y: 0,
        duration: 0.05,
        ease: "bounce.out"
      }, 0.7)
      // Glow is activated via onUpdate at 0.75
      .to(textRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.2,
        ease: "power2.out"
      }, 0.8);

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={sectionRef} 
      className="relative min-h-[200vh] w-full bg-gradient-to-b from-navy via-[#0a0818] to-navy"
    >
      {/* Sticky Viewport Container */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col items-center justify-center px-4">
        
        {/* Soft Ambient Background Glow behind the container */}
        <div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-gold opacity-[0.06] blur-[100px] pointer-events-none z-0"
        />

        {/* Portrait Layout */}
        <div className="relative z-10 w-full max-w-[280px] md:max-w-[360px] flex flex-col items-center">
          
          {/* Image Container */}
          <div className="relative w-full aspect-[3/4] md:aspect-[4/5] rounded-2xl border border-gold/20 overflow-visible bg-gradient-to-b from-[#1a1528] to-navy shadow-2xl">
            
            {/* Photo Layer */}
            <div className="w-full h-full rounded-2xl overflow-hidden relative z-0">
              <img 
                src="/images/photo_crown.jpg" 
                alt="Dr. Sonia Imran Portrait"
                className="w-full h-full object-cover object-top opacity-0 transition-opacity duration-700"
                onLoad={(e) => e.currentTarget.classList.remove('opacity-0')}
                onError={(e) => e.currentTarget.style.display = 'none'}
              />
            </div>

            {/* Sparkle Burst Container layer sits above photo but anchored near top where crown is */}
            <div 
              ref={sparkleContainerRef} 
              id="sparkle-container"
              className="absolute left-1/2 z-30 pointer-events-none"
              style={{ 
                top: '12%', // Approximately where crown sits
                width: '1px',
                height: '1px'
              }}
            />

            {/* The Crown Element */}
            <div 
              ref={crownRef}
              id="crown-element"
              className="absolute left-1/2 -translate-x-1/2 z-20 w-[140px] md:w-[180px]"
              style={{
                // Positioned relative to container height so it aligns with head top area
                top: '-8%', 
              }}
            >
              <CrownSVG className="w-full h-auto" />
            </div>
          </div>

          {/* Revealed Text */}
          <div 
            ref={textRef}
            id="crown-text"
            className="mt-8 text-center flex flex-col items-center z-10"
          >
            <h3 className="font-playfair italic text-gold text-xl md:text-2xl tracking-wide">
              "She leads. She heals. She inspires."
            </h3>
            <p className="font-inter text-white/60 text-sm mt-2 tracking-wider uppercase font-medium">
              Dr. Sonia Imran — Physiotherapy Educator
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}
