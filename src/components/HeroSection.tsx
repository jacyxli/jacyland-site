"use client";

import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { defaultTransition } from "@/utils/motion";

const rotatingWords = [
  "Fullstack Engineer 💻",
  "UI/UX Designer 🎨",
  "React & Frontend Builder ⚛️",
  "Kotlin & Backend Tinkerer 🔧",
  "Tech Translator for Small Businesses 💡",
  "Trilingual Cross-Cultural Collaborator 🌏",
  "Amateur Rock Climber 🧗",
  "Midnight Knitting Club Member 🧶",
  "Moment Capturer 📷",
  "Off-Beat Guitarist 🎸",
  "Professional Coffee Drinker ☕",
];

type HeroSectionProps = {
  className?: string;
};

const HeroSection = ({ className }: HeroSectionProps) => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((prev) => (prev + 1) % rotatingWords.length);
    }, 1800);
    return () => clearInterval(id);
  }, []);

  const current = useMemo(() => rotatingWords[index], [index]);

  return (
    <motion.header
      className={`relative min-h-[100svh] flex items-start justify-between flex-col px-12 pt-8 pb-24 ${
        className ?? ""
      }`}
    >
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_bottom,rgba(0,0,0,0.05),transparent_50%)]" />

      <div className="z-[1] text-2xl sm:text-3xl font-bold tracking-tight">
        Jacy Li
      </div>
      <div className="flex flex-col items-start gap-2">
        <h2 className="text-5xl sm:text-7xl font-bold tracking-tight">
          Turning coffee into code
        </h2>
        <h2 className="text-5xl sm:text-7xl font-bold tracking-tight">
          and problems into products.
        </h2>

        <div className="relative h-12 sm:h-16 w-full overflow-hidden mt-6">
          <AnimatePresence mode="popLayout" initial={false}>
            <motion.span
              key={current}
              initial={{ y: "100%", opacity: 0 }}
              animate={{ y: "0%", opacity: 1 }}
              exit={{ y: "-100%", opacity: 0 }}
              transition={defaultTransition}
              className="absolute inset-0 flex items-center justify-start text-3xl sm:text-4xl font-semibold will-change-transform"
            >
              {current}
            </motion.span>
          </AnimatePresence>
        </div>
      </div>
    </motion.header>
  );
};

export default HeroSection;
