"use client";

import {
  motion,
  useMotionValueEvent,
  useScroll,
  useTransform,
} from "framer-motion";
import { useRef } from "react";

type AboutSectionProps = {
  className?: string;
};

const AboutSection = ({ className }: AboutSectionProps) => {
  const ref = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end end"],
  });
  const x = useTransform(scrollYProgress, [0, 1], ["-100vw", "100vw"]);
  useMotionValueEvent(x, "change", (latest) => {
    console.log("x:", latest);
  });
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    console.log("scrollYProgress:", latest);
  });

  return (
    <motion.section
      ref={ref}
      className={`min-h-[100svh] bg-black text-white flex flex-col items-center justify-center ${
        className ?? ""
      }`}
    >
      <motion.h1
        className="text-3xl sm:text-5xl font-bold whitespace-nowrap"
        style={{ x }}
      >
        About
      </motion.h1>
      <div className="max-w-2xl mx-auto text-center space-y-6 overflow-hidden">
        <div className="px-6 py-24">
          <p className="text-base sm:text-lg leading-relaxed opacity-90">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur.
          </p>
          <p className="text-base sm:text-lg leading-relaxed opacity-90">
            Excepteur sint occaecat cupidatat non proident, sunt in culpa qui
            officia deserunt mollit anim id est laborum. Curabitur non nulla sit
            amet nisl tempus convallis quis ac lectus.
          </p>
        </div>
      </div>
    </motion.section>
  );
};

export default AboutSection;
