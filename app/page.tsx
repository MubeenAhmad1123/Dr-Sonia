import React from "react";
import Hero from "@/components/Hero";
import CrownReveal from "@/components/CrownReveal";

export default function Home() {
  return (
    <main className="min-h-screen bg-navy text-white">
      <Hero />
      
      {/* Golden Gradient Separator */}
      <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-gold to-transparent opacity-50" />
      
      <CrownReveal />
    </main>
  );
}
