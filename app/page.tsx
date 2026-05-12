import React from "react";
import Hero from "@/components/Hero";
import CrownReveal from "@/components/CrownReveal";
import Timeline from "@/components/Timeline";
import MemoryCards from "@/components/MemoryCards";
import Impact from "@/components/Impact";

export default function Home() {
  const Separator = () => (
    <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-gold to-transparent opacity-40" />
  );

  return (
    <main className="min-h-screen bg-navy text-white">
      <Hero />
      <Separator />
      <CrownReveal />
      <Separator />
      <Timeline />
      <Separator />
      <MemoryCards />
      <Separator />
      <Impact />
    </main>
  );
}
