"use client";

import { motion } from "framer-motion";
import { defaultTransition } from "@/utils/motion";

interface MotionPProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  as?: "p" | "div";
}

const MotionP = ({
  children,
  className = "",
  delay = 0,
  duration = 1,
  as = "p",
}: MotionPProps) => {
  const MotionComponent = as === "p" ? motion.p : motion.div;

  return (
    <MotionComponent
      className={className}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{
        duration,
        delay,
      }}
    >
      {children}
    </MotionComponent>
  );
};

export default MotionP;
