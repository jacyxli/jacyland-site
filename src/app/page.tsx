"use client";

import {
  HeroSection,
  AboutSection,
  ExperienceSection,
  PortfolioSection,
  ContactSection,
} from "@/components";

export default function HomePage() {
  return (
    <div className="font-sans relative snap-y snap-mandatory scroll-smooth">
      {/* Base pinned sections */}
      <div id="hero"></div>

      <HeroSection id="hero" className="sticky top-0 h-screen z-0" />
      <div id="about"></div>
      <AboutSection className="sticky top-0 h-screen rounded-t-3xl z-10" />

      {/* Experience scrolls ABOVE About */}
      <ExperienceSection
        id="experience"
        className="min-h-[200vh] bg-gray-100 rounded-t-3xl relative z-20"
      />

      {/* Portfolio scrolls ABOVE Experience */}
      <PortfolioSection
        id="portfolio"
        className="relative rounded-t-3xl z-30 -mt-16"
      />

      {/* Contact Section */}
      <ContactSection id="contact" className="relative rounded-t-3xl z-50" />
    </div>
  );
}
