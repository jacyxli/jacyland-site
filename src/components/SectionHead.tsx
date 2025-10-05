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
  link?: string;
}

export default function SectionHead({
  title,
  showDivider = true,
  rightSlot,
  className = "",
  showAnimation = true,
  link,
}: SectionHeadProps) {
  return (
    <div className={`w-full mx-auto ${className}`}>
      {/* Header Row */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3 group">
          {showAnimation ? (
            <MotionP
              className="font-anton text-3xl sm:text-6xl font-bold"
              delay={0.1}
            >
              {title}
            </MotionP>
          ) : (
            <h2 className="font-anton text-3xl sm:text-6xl font-bold">
              {title}
            </h2>
          )}

          {link && (
            <motion.a
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              className="w-6 h-6 sm:w-8 sm:h-8 text-gray-600 group-hover:text-gray-900 transition-colors duration-200"
              whileHover={{ x: 3, y: -3 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 256 256"
                className="w-full h-full -rotate-45"
              >
                <path
                  d="M224.49,136.49l-72,72a12,12,0,0,1-17-17L187,140H40a12,12,0,0,1,0-24H187L135.51,64.48a12,12,0,0,1,17-17l72,72A12,12,0,0,1,224.49,136.49Z"
                  fill="currentColor"
                />
              </svg>
            </motion.a>
          )}
        </div>

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
