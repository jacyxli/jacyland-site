"use client";

import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { slowTransition } from "@/utils/motion";
import { MotionP } from "@/components";
import { useTranslations } from "next-intl";

type HeroSectionProps = {
  className?: string;
  id?: string;
};

const HeroSection = ({ className, id }: HeroSectionProps) => {
  const [index, setIndex] = useState(0);
  const t = useTranslations("hero");

  const rotatingWords = useMemo(() => {
    const roles = t.raw("roles") as string[];
    return roles;
  }, [t]);

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((prev) => (prev + 1) % rotatingWords.length);
    }, 1800);
    return () => clearInterval(id);
  }, [rotatingWords.length]);

  const current = useMemo(() => rotatingWords[index], [index, rotatingWords]);

  return (
    <motion.section
      id={id}
      className={`section-container items-start justify-between flex-col !pt-12 ${
        className ?? ""
      }`}
    >
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_bottom,rgba(0,0,0,0.05),transparent_50%)]" />

      <div className="z-[1] font-mono font-bold text-2xl sm:text-3xl tracking-tightest">
        {t("name")}
      </div>
      <div className="flex flex-col items-start gap-2 w-full">
        <MotionP
          className="font-anton text-5xl sm:text-8xl leading-tighter"
          delay={0.1}
        >
          {t("tagline")
            .split("\n")
            .map((line, i) => (
              <span key={i}>
                {line}
                {i < t("tagline").split("\n").length - 1 && <br />}
              </span>
            ))}
        </MotionP>

        <div className="relative sm:h-16 h-12 w-full overflow-hidden mt-2 sm:mt-6 font-mono text-lg sm:text-4xl">
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
    </motion.section>
  );
};

export default HeroSection;
