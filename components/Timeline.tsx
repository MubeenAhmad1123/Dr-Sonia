"use client";

import React from "react";
import { motion } from "framer-motion";

const timelineItems = [
  { id: 1, image: "/images/photo_timeline_1.jpg", quote: "Every great healer was once taught by someone extraordinary.", text: "From complex anatomy lectures to real-world clinical thinking — you made learning come alive.", tag: "The Teacher" },
  { id: 2, image: "/images/photo_timeline_2.jpg", quote: "She didn't just teach physiotherapy. She taught us how to care.", text: "Your patience in explaining, your belief in struggling students, your genuine joy when we understood — that's unforgettable.", tag: "The Mentor" },
  { id: 3, image: "/images/photo_timeline_3.jpg", quote: "Some leave when the chapter ends. Others leave an impression that lasts forever.", text: "Even after stepping away, the impact you left on your students continues to shape their futures every single day.", tag: "The Impact" },
  { id: 4, image: "/images/photo_timeline_4.jpg", quote: "Happy Birthday to a woman who made the classroom feel like a calling.", text: "May 13 is not just your birthday — it's the day the world got someone truly special. We are grateful.", tag: "The Celebration" },
];

export default function Timeline() {
  return (
    <section className="relative py-24 px-6 bg-gradient-to-b from-navy via-[#070c1a] to-navy overflow-hidden">
      
      {/* Section Header */}
      <div className="relative z-10 max-w-4xl mx-auto mb-20">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="font-playfair italic text-gold text-center text-3xl md:text-4xl mb-4 tracking-wide glow-text"
        >
          A Journey Worth Celebrating
        </motion.h2>
        <motion.p 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="font-inter text-white/50 text-center text-xs md:text-sm tracking-[0.2em] uppercase font-medium"
        >
          Dr. Sonia Imran — Four Years of Inspiration
        </motion.p>
      </div>

      <div className="relative max-w-6xl mx-auto">
        
        {/* Central vertical timeline line */}
        {/* Left aligned on mobile (left-4), centered on desktop (md:left-1/2) */}
        <div className="absolute top-0 bottom-0 left-4 md:left-1/2 w-[2px] -translate-x-[1px] bg-gradient-to-b from-transparent via-gold/40 to-transparent z-0" />

        <div className="space-y-20 md:space-y-32 relative z-10">
          {timelineItems.map((item, index) => {
            const isEven = index % 2 === 0;
            
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, ease: [0.21, 0.47, 0.32, 0.98] }}
                className={`relative flex flex-col md:flex-row items-center w-full ${
                  isEven ? "md:flex-row-reverse" : ""
                }`}
              >
                
                {/* Dot anchored to line */}
                <div className="absolute left-4 md:left-1/2 top-8 md:top-1/2 -translate-x-[5px] md:-translate-x-1.5 md:-translate-y-1.5 w-3 h-3 bg-gold rounded-full shadow-[0_0_12px_rgba(201,168,76,0.6)] z-20" />

                {/* Content Box containing image and text layout */}
                {/* Spacing on desktop: pushes from center line. padding on mobile: clears line */}
                <div className={`w-full pl-12 md:pl-0 md:w-1/2 flex flex-col ${
                  isEven ? "md:pr-16 md:items-end md:text-right" : "md:pl-16 md:items-start md:text-left"
                }`}>
                  
                  {/* Media Block */}
                  <div className="relative w-full max-w-sm mb-6 rounded-xl overflow-hidden border border-gold/20 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.5)] group">
                    <motion.div
                      initial={{ scale: 1.08 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.2, ease: "easeOut" }}
                      className="aspect-[4/3] w-full bg-gradient-to-br from-[#1a1528] to-[#0a0814]"
                    >
                      <img
                        src={item.image}
                        alt={item.tag}
                        className="w-full h-full object-cover opacity-0 group-hover:scale-105 transition-all duration-700 ease-out"
                        onLoad={(e) => e.currentTarget.classList.remove("opacity-0")}
                        onError={(e) => e.currentTarget.style.display = "none"}
                      />
                    </motion.div>
                  </div>

                  {/* Text Block */}
                  <div className="flex flex-col max-w-md w-full">
                    <span className="inline-flex self-start md:self-auto px-3 py-1 border border-gold/30 text-gold rounded-full text-[10px] md:text-xs uppercase tracking-widest font-medium bg-gold/5 w-fit mb-4">
                      {item.tag}
                    </span>
                    
                    <h3 className="font-playfair italic text-white text-lg md:text-xl lg:text-2xl leading-relaxed font-light tracking-wide">
                      "{item.quote}"
                    </h3>
                    
                    <p className="font-inter text-white/50 text-xs md:text-sm mt-3 leading-relaxed font-light">
                      {item.text}
                    </p>

                    <div className={`w-12 h-px bg-gold mt-6 ${
                      isEven ? "md:ml-auto" : "mr-auto"
                    }`} />
                  </div>

                </div>
                
                {/* Empty placeholder for maintaining space on desktop grid */}
                <div className="hidden md:block md:w-1/2" aria-hidden="true" />

              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
