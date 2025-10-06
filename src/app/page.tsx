"use client";

import {
  HeroSection,
  AboutSection,
  ExperienceSection,
  PortfolioSection,
  ContactSection,
} from "@/components";

export default function Home() {
  return (
    <div className="font-sans relative snap-y snap-mandatory scroll-smooth">
      {/* Base pinned sections */}
      <HeroSection className="sticky top-0 h-screen z-0" />
      <AboutSection className="sticky top-0 h-screen rounded-t-3xl z-10" />

      {/* Experience scrolls ABOVE About */}
      <ExperienceSection className="min-h-[200vh] bg-gray-100 rounded-t-3xl relative z-20" />

      {/* Portfolio scrolls ABOVE Experience */}
      <PortfolioSection className="relative rounded-t-3xl z-30 -mt-16" />

      {/* Contact Section */}
      <ContactSection className="relative rounded-t-3xl z-50" />
    </div>
  );
}
