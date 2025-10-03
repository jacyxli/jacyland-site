"use client";

import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import ExperienceSection from "@/components/ExperienceSection";
import PortfolioSection from "@/components/PortfolioSection";

export default function Home() {
  return (
    <div className="font-sans relative">
      {/* Base pinned sections */}
      <HeroSection className="sticky top-0 h-screen z-0" />
      <AboutSection className="sticky top-0 h-screen rounded-t-3xl z-10" />

      {/* Experience scrolls ABOVE About */}
      <ExperienceSection className="min-h-[200vh] bg-gray-100 rounded-t-3xl relative z-20" />

      {/* Portfolio scrolls ABOVE Experience */}
      <PortfolioSection className="relative rounded-t-3xl z-30 -mt-16" />
    </div>
  );
}
