"use client";

import React from "react";
import dynamic from "next/dynamic";

// Atomic isolation: render the ENTIRE logic tree on the client only to block browser extensions from breaking Hydration.
const MainContent = dynamic(() => import("@/components/MainContent"), { 
  ssr: false,
  loading: () => (
    <div className="min-h-screen bg-[#050810] flex items-center justify-center">
      <div className="font-playfair text-gold-gradient text-3xl md:text-4xl italic animate-pulse">
        Dr. Sonia Imran
      </div>
    </div>
  )
});

export default function Home() {
  return <MainContent />;
}
