"use client";

import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { slowTransition } from "@/utils/motion";
import { MotionP } from "@/components";

const rotatingWords = [
  "Fullstack Engineer ",
  "UI/UX Designer 🎨",
  "React & Frontend Builder ⚛️",
  "Kotlin & Backend Tinkerer 🔧",
  "Tech Translator for Small Biz 💡",
  "Cross-Cultural Collaborator 🌏",
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
      className={`relative min-h-[100svh] flex items-start justify-between flex-col px-6 pb-24 sm:px-12 pt-12 sm:pb-32 ${
        className ?? ""
      }`}
    >
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_bottom,rgba(0,0,0,0.05),transparent_50%)]" />

      <div className="z-[1] font-mono font-bold text-2xl sm:text-3xl tracking-tightest">
        Jacy Li
      </div>
      <div className="flex flex-col items-start gap-2 w-full">
        <MotionP
          className="font-anton text-5xl sm:text-8xl leading-tighter"
          delay={0.1}
        >
          Turning coffee into code,
          <br />
          and problems into products.
        </MotionP>

        <div className="relative sm:h-16 h-12 w-full overflow-hidden mt-2 sm:mt-6 font-mono text-xl sm:text-4xl ">
          <AnimatePresence mode="popLayout" initial={false}>
            <motion.span
              key={current}
              initial={{ y: "100%", opacity: 0 }}
              animate={{ y: "0%", opacity: 1 }}
              exit={{ y: "-100%", opacity: 0 }}
              transition={slowTransition}
              className="absolute inset-0 flex items-center justify-start font-semibold will-change-transform"
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
