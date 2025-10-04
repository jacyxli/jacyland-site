"use client";

import {
  motion,
  useMotionValueEvent,
  useScroll,
  useTransform,
} from "framer-motion";
import { useRef } from "react";
import MotionP from "@/components/MotionP";

type AboutSectionProps = {
  className?: string;
};

const AboutSection = ({ className }: AboutSectionProps) => {
  const ref = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const x = useTransform(scrollYProgress, [0, 1], ["100vw", "-100vw"]);

  return (
    <motion.section
      ref={ref}
      className={`min-h-[100svh] bg-black text-white flex flex-col items-center justify-between px-6 py-24 sm:py-32 sm:px-12 ${
        className ?? ""
      }`}
    >
      <div className="w-full ">
        <motion.div className="flex justify-center overflow-hidden">
          <motion.h1
            className="font-anton text-5xl sm:text-[150px] font-bold whitespace-nowrap text-center"
            style={{ x }}
          >
            ABOUT ME / ABOUT ME / ABOUT ME / ABOUT ME / ABOUT ME
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
              <span className="opacity-60">Hey.</span> I'm Jacy.
            </MotionP>
          </div>

          {/* Columns 3-4: Combined content */}
          <div className="sm:col-span-2 flex flex-col gap-4 text-sm sm:text-base opacity-90">
            <MotionP duration={1} delay={0.2}>
              I'm a <b>fullstack engineer</b> with 10+ years of experience —
              passionate about creating user-focused digital solutions that make
              technology feel human.
            </MotionP>

            <MotionP duration={1} delay={0.3}>
              I specialize in{" "}
              <b>React, UI/UX design, and WeChat mini-programs</b>, with backend
              expertise in <b>Kotlin, Spring Boot, and MySQL</b>. I've delivered
              apps and platforms end-to-end — from Fortune 500 enterprises in
              Silicon Valley to fast-moving startups in Tokyo. I also build apps
              for small businesses, helping them digitalize workflows and
              simplify daily operations.
            </MotionP>
            <MotionP duration={1} delay={0.4}>
              Recently, I've been exploring how to integrate <b>AI</b> into
              development workflows to boost productivity and accelerate product
              innovation.
            </MotionP>
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default AboutSection;
