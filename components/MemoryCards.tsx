"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";

const memoryCardsData = [
  { id: 1, front: "Some people are simply memorable ✨", back: "Some personalities naturally leave behind comfort, respect, and good memories wherever they go.", emoji: "✨" },
  { id: 2, front: "A positive presence matters 🌸", back: "The energy a kind person brings into a space is something people quietly appreciate every day.", emoji: "🌸" },
  { id: 3, front: "Genuine people are rare 🌟", back: "Respect is earned most through sincerity, kindness, and how someone treats others.", emoji: "🌟" },
  { id: 4, front: "For someone who deserves all the good things 🎂", back: "Happy Birthday Dr. Sonia. Wishing you peace, happiness, success, and countless reasons to smile this year.", emoji: "🎂" },
  { id: 5, front: "Good people leave good memories 💫", back: "Some people may not realize it, but their presence genuinely makes a difference to others around them.", emoji: "💫" },
  { id: 6, front: "A Small Birthday Surprise ✨", back: "This little website was made simply to wish you a beautiful birthday and remind you that you are appreciated.", emoji: "🎁" },
];

function FlipCard({ item }: { item: typeof memoryCardsData[0] }) {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <motion.div
      className="relative w-full aspect-[1/1.15] cursor-pointer"
      onClick={() => setIsFlipped(!isFlipped)}
      whileHover={!isFlipped ? { scale: 1.03, y: -4 } : {}}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      style={{ perspective: '1000px' }}
    >
      <div
        className="w-full h-full relative transition-transform duration-700"
        style={{ 
          transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
          transformStyle: 'preserve-3d',
        }}
      >
        {/* Front Face */}
        <div 
          className="absolute inset-0 bg-white/[0.03] backdrop-blur-md border border-gold/20 rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.4)] flex flex-col items-center justify-center px-3 py-6 md:px-5 md:py-8 overflow-hidden transition-all duration-300 hover:border-gold/40"
          style={{ backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden' }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent pointer-events-none" />
          
          <span className="text-3xl md:text-4xl mb-3 md:mb-4 filter drop-shadow-sm">{item.emoji}</span>
          
          <p className="font-inter text-white/80 text-xs md:text-sm text-center leading-relaxed font-light tracking-wide z-10">
            {item.front}
          </p>
          
          <div className="mt-auto pt-2 flex items-center z-10">
            <span className="text-[9px] md:text-[10px] uppercase tracking-widest text-gold/50 font-medium flex items-center gap-1.5 animate-pulse">
              tap <span className="text-xs">↺</span>
            </span>
          </div>
        </div>

        {/* Back Face */}
        <div 
          className="absolute inset-0 bg-gradient-to-br from-gold/[0.12] to-gold/[0.03] backdrop-blur-lg border border-gold/40 rounded-2xl shadow-[0_8px_32px_rgba(201,168,76,0.15)] flex flex-col items-center justify-center px-4 py-6 md:px-6 md:py-8 text-center"
          style={{ 
            backfaceVisibility: 'hidden', 
            WebkitBackfaceVisibility: 'hidden',
            transform: "rotateY(180deg)" 
          }}
        >
          <span className="text-2xl md:text-3xl mb-2 md:mb-3">{item.emoji}</span>
          
          <p className="font-inter text-white/90 text-[11px] md:text-[13px] leading-relaxed font-normal tracking-wide italic">
            "{item.back}"
          </p>
          
          <div className="mt-auto pt-2 md:pt-4">
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
