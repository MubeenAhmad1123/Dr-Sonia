"use client";

import React from "react";
import { motion } from "framer-motion";

const highlights = [
  { 
    id: 1, 
    title: "Sincere Kindness", 
    text: "Kindness that feels genuine", 
    symbol: "✧",
    sub: "Quietly uplifting"
  },
  { 
    id: 2, 
    title: "Comforting Spirit", 
    text: "A personality that feels comforting", 
    symbol: "✧",
    sub: "Warm & professional"
  },
  { 
    id: 3, 
    title: "Lasting Impression", 
    text: "And a presence people naturally remember", 
    symbol: "✧",
    sub: "Truly unforgettable"
  }
];

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
            Little Things That Make Someone Special
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="font-inter text-white/40 text-xs uppercase tracking-[0.2em] font-medium"
          >
            Qualities that leave a lasting mark
          </motion.p>
        </div>

        {/* Qualities Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-6 lg:gap-12">
          {highlights.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15, duration: 0.6 }}
              className="flex flex-col items-center border-t border-gold/10 pt-12 pb-6 px-4 group hover:border-gold/30 transition-colors duration-500 bg-white/[0.01] rounded-b-xl backdrop-blur-sm shadow-[0_8px_32px_-10px_rgba(0,0,0,0.2)]"
            >
              {/* Symbol Container */}
              <span className="text-gold text-3xl font-light tracking-widest drop-shadow-sm block mb-4 group-hover:scale-110 transition-transform duration-500">
                {item.symbol}
              </span>

              {/* Typography */}
              <span className="text-[9px] font-inter font-semibold text-gold/50 uppercase tracking-[0.3em] mb-3">
                {item.sub}
              </span>

              <h3 className="font-playfair text-white text-xl md:text-2xl font-light italic leading-relaxed">
                "{item.text}"
              </h3>

              {/* Divider line */}
              <div className="w-10 h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent mt-6 group-hover:w-16 transition-all duration-500 ease-out" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
