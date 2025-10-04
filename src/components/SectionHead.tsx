"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";
import MotionP from "./MotionP";

interface SectionHeadProps {
  title: string;
  showDivider?: boolean;
  rightSlot?: ReactNode;
  className?: string;
  showAnimation?: boolean;
}

export default function SectionHead({
  title,
  showDivider = true,
  rightSlot,
  className = "",
  showAnimation = true,
}: SectionHeadProps) {
  return (
    <div className={`w-full mx-auto ${className}`}>
      {/* Header Row */}
      <div className="flex items-center justify-between mb-4">
        {showAnimation ? (
          <MotionP
            className="font-anton text-3xl sm:text-6xl font-bold"
            delay={0.1}
          >
            {title}
          </MotionP>
        ) : (
          <h2 className="font-anton text-3xl sm:text-6xl font-bold">{title}</h2>
        )}

        {rightSlot && (
          <div className="font-anton text-3xl sm:text-6xl font-bold">
            {rightSlot}
          </div>
        )}
      </div>

      {/* Divider */}
      {showDivider && (
        <motion.div
          className="w-full h-px bg-gray-900 sm:my-12 mt-6 mb-4"
          initial={{ scaleX: showAnimation ? 0 : 1 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.8 }}
        />
      )}
    </div>
  );
}
