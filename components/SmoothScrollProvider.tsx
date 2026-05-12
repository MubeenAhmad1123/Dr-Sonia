"use client";

import React, { useEffect, useRef } from "react";
import Lenis from "@studio-freight/lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function SmoothScrollProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    // Initialize Lenis smooth scroll
    const lenis = new Lenis({
      lerp: 0.08,
      duration: 1.4,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    lenisRef.current = lenis;

    // Connect Lenis to GSAP ticker
    function raf(time: number) {
      lenis.raf(time);
    }
    
    gsap.ticker.add(raf);
    
    // Connect GSAP ScrollTrigger to Lenis scroll event
    lenis.on("scroll", ScrollTrigger.update);
    
    // Synchronize GSAP with user's custom scrolling loop
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(raf);
      lenis.off("scroll", ScrollTrigger.update);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
