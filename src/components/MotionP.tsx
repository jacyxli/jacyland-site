"use client";

import { motion } from "framer-motion";
import { defaultTransition } from "@/utils/motion";

interface MotionPProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
}

const MotionP = ({
  children,
  className = "",
  delay = 0,
  duration = 3,
}: MotionPProps) => {
  return (
    <motion.p
      className={className}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{
        ...defaultTransition,
        duration,
        delay,
      }}
    >
      {children}
    </motion.p>
  );
};

export default MotionP;
