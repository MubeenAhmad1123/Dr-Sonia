"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";

const memoryCardsData = [
  { id: 1, front: "From a student who remembers every lecture 💛", back: "Ma'am, your way of explaining made even the hardest topics feel possible. Thank you for never giving up on us.", emoji: "📚" },
  { id: 2, front: "A smile that made 8am lectures bearable ☀️", back: "You walked in every morning with energy that was contagious. The classroom felt different when you were in it.", emoji: "✨" },
  { id: 3, front: "The teacher who believed in us first 🌟", back: "Before we believed in ourselves as future physiotherapists, you already saw the potential in us. That changed everything.", emoji: "🎓" },
  { id: 4, front: "For someone who deserves all the good things 🎂", back: "Happy Birthday Dr. Sonia. May this year bring you as much joy as you've brought to everyone around you.", emoji: "🎁" },
  { id: 5, front: "Your lessons are still with us, every day 🩺", back: "In every patient we treat, every assessment we make — a small piece of your teaching is there guiding us.", emoji: "💪" },
  { id: 6, front: "Made with care by Mubeen 💫", back: "This entire website was built just to say: you matter, you're missed, and Happy Birthday, Ma'am.", emoji: "❤️" },
];

function FlipCard({ item }: { item: typeof memoryCardsData[0] }) {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <motion.div
      className="relative w-full aspect-[1/1.15] cursor-pointer perspective-1000"
      onClick={() => setIsFlipped(!isFlipped)}
      whileHover={!isFlipped ? { scale: 1.03, y: -4 } : {}}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      <div
        className={`w-full h-full relative transition-transform duration-700 preserve-3d`}
        style={{ transform: isFlipped ? "rotateY(180deg)" : "none" }}
      >
        {/* Front Face */}
        <div className="absolute inset-0 backface-hidden bg-white/[0.03] backdrop-blur-md border border-gold/20 rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.4)] flex flex-col items-center justify-center px-5 py-8 overflow-hidden transition-all duration-300 hover:border-gold/40">
          {/* Subtle background inner gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent pointer-events-none" />
          
          <span className="text-4xl mb-4 filter drop-shadow-sm">{item.emoji}</span>
          
          <p className="font-inter text-white/80 text-sm text-center leading-relaxed font-light tracking-wide z-10">
            {item.front}
          </p>
          
          <div className="mt-auto pt-4 flex items-center z-10">
            <span className="text-[10px] uppercase tracking-widest text-gold/50 font-medium flex items-center gap-1.5 animate-pulse">
              tap to open <span className="text-xs">↺</span>
            </span>
          </div>
        </div>

        {/* Back Face (rotated 180deg natively inside preserve-3d) */}
        <div 
          className="absolute inset-0 backface-hidden bg-gradient-to-br from-gold/[0.12] to-gold/[0.03] backdrop-blur-lg border border-gold/40 rounded-2xl shadow-[0_8px_32px_rgba(201,168,76,0.15)] flex flex-col items-center justify-center px-6 py-8 text-center"
          style={{ transform: "rotateY(180deg)" }}
        >
          <span className="text-3xl mb-3">{item.emoji}</span>
          
          <p className="font-inter text-white/90 text-[13px] leading-relaxed font-normal tracking-wide italic">
            "{item.back}"
          </p>
          
          <div className="mt-auto pt-4">
             <div className="w-8 h-[1px] bg-gold/40 mx-auto"></div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function MemoryCards() {
  return (
    <section className="relative py-24 px-6 bg-navy overflow-hidden">
      {/* Container for the cards */}
      <div className="max-w-5xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-playfair italic text-gold text-3xl md:text-4xl tracking-wide mb-3 glow-text"
          >
            Memories & Messages
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="font-inter text-white/50 text-sm tracking-wide font-light"
          >
            Tap each card to reveal a message
          </motion.p>
        </div>

        {/* Cards Grid */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8 }}
          className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 lg:gap-8"
        >
          {memoryCardsData.map((card) => (
            <FlipCard key={card.id} item={card} />
          ))}
        </motion.div>

      </div>
    </section>
  );
}
