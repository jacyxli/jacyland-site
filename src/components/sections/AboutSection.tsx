"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { MotionP } from "@/components";
import { useTranslations } from "next-intl";

type AboutSectionProps = {
  className?: string;
  id?: string;
};

const AboutSection = ({ className, id }: AboutSectionProps) => {
  const ref = useRef(null);
  const t = useTranslations("about");

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const x = useTransform(scrollYProgress, [0, 1], ["100vw", "-100vw"]);

  return (
    <motion.section
      id={id}
      ref={ref}
      className={`section-container bg-black text-white flex flex-col items-center justify-between ${
        className ?? ""
      }`}
    >
      <div className="w-full overflow-hidden">
        <motion.div className="flex justify-center">
          <motion.h1
            className="font-anton text-5xl sm:text-[150px] font-bold whitespace-nowrap text-center"
            style={{ x }}
          >
            {t("title")}
          </motion.h1>
        </motion.div>
      </div>
      <div className="w-full sm:max-w-6xl mx-auto ">
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-6 sm:gap-8">
          {/* Column 1: Empty */}
          <div className="hidden sm:block"></div>

          {/* Column 2: Hey. I'm Jacy */}
          <div className="text-left">
            <MotionP className="font-bold text-2xl" duration={1} delay={0.1}>
              <span className="opacity-60">{t("greeting")}</span> {t("name")}
            </MotionP>
          </div>

          {/* Columns 3-4: Combined content */}
          <div className="sm:col-span-2 flex flex-col gap-4 text-sm sm:text-base opacity-90">
            <MotionP duration={1} delay={0.2}>
              {t.rich("intro", {
                b: (chunks) => <b>{chunks}</b>,
              })}
            </MotionP>

            <MotionP duration={1} delay={0.3}>
              {t.rich("specialization", {
                b: (chunks) => <b>{chunks}</b>,
              })}
            </MotionP>
            <MotionP duration={1} delay={0.4}>
              {t.rich("recent", {
                b: (chunks) => <b>{chunks}</b>,
              })}
            </MotionP>
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default AboutSection;
