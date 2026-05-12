'use client';
import React, { useEffect } from 'react';
import Lenis from '@studio-freight/lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.08,
      duration: 1.4,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });

    // Expose globally so other components can access it
    (window as any).__lenis = lenis;

    // Connection function for ticker
    const tick = (time: number) => {
      lenis.raf(time * 1000);
    };

    // Connect to GSAP ticker
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    // Request Animation Frame loop fallback
    let rafId: number;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      gsap.ticker.remove(tick);
      lenis.destroy();
      (window as any).__lenis = null;
    };
  }, []);

  return <>{children}</>;
}
