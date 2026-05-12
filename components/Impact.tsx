"use client";

import React, { useEffect, useState, useRef } from "react";
import { motion, useInView } from "framer-motion";

const stats = [
  { number: 200, suffix: "+", label: "Students Inspired", sublabel: "Future physiotherapists guided" },
  { number: 4, suffix: " Years", label: "Of Dedication", sublabel: "Teaching with heart and patience" },
  { number: 1000, suffix: "+", label: "Smiles Created", sublabel: "In classrooms and corridors" },
];

// Simple cubic ease out
const easeOutCubic = (t: number): number => 1 - Math.pow(1 - t, 3);

function CounterItem({ target, duration = 2000 }: { target: number; duration?: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  
  useEffect(() => {
    if (!isInView) return;

    let startTime: number | null = null;
    let frameId: number;

    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const easedProgress = easeOutCubic(progress);
      
      setCount(Math.floor(easedProgress * target));

      if (progress < 1) {
        frameId = requestAnimationFrame(step);
      } else {
        setCount(target);
      }
    };

    frameId = requestAnimationFrame(step);

    return () => cancelAnimationFrame(frameId);
  }, [isInView, target, duration]);

  return <span ref={ref}>{count}</span>;
}

export default function Impact() {
  return (
    <section className="relative py-28 px-6 bg-gradient-to-b from-[#070c1a] to-navy overflow-hidden">
      {/* Subtle ambient background elements */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-gold/[0.02] rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-gold/[0.02] rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-5xl mx-auto relative z-10 text-center">
        {/* Section Header */}
        <div className="mb-20">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-playfair italic text-gold text-3xl md:text-4xl tracking-wide mb-3 glow-text"
          >
            The Measure of a Great Teacher
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="font-inter text-white/50 text-sm font-light tracking-wide"
          >
            Numbers that don't capture it all, but try to.
          </motion.p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-6 lg:gap-12">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15, duration: 0.6 }}
              className="flex flex-col items-center border-t border-gold/10 pt-10 group hover:border-gold/30 transition-colors duration-500"
            >
              {/* Number Container */}
              <div className="flex items-baseline font-playfair font-bold text-gold-gradient drop-shadow-sm">
                <span className="text-[clamp(3rem,12vw,5.5rem)] leading-none tracking-tight">
                  <CounterItem target={stat.number} />
                </span>
                <span className="text-[clamp(1.5rem,6vw,2.5rem)] font-medium text-gold leading-none ml-1">
                  {stat.suffix}
                </span>
              </div>

              {/* Divider line */}
              <div className="w-16 h-px bg-gold/30 mt-6 group-hover:w-24 transition-all duration-500 ease-out" />

              {/* Labels */}
              <h3 className="font-inter text-white text-lg md:text-xl font-medium mt-5 tracking-wide">
                {stat.label}
              </h3>
              <p className="font-inter text-white/40 text-xs md:text-sm mt-1.5 font-light max-w-[200px]">
                {stat.sublabel}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
