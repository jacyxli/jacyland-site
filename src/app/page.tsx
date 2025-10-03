"use client";

import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";

export default function Home() {
  return (
    <div className="font-sans relative">
      <HeroSection className="sticky top-0 h-screen" />
      <AboutSection className="sticky top-0 h-screen rounded-t-3xl px-6 py-24" />
    </div>
  );
}
