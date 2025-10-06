"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import DownArrowIcon from "@/components/icons/DownArrowIcon";

interface ContactButtonProps {
  href: string;
  icon: React.ReactNode;
  label: string;
  /** Optional hover text - if not provided, no hover label/arrow will show */
  hoverText?: string;
  /** Direction of hover reveal animation: 'y' (bottom→top) or 'x' (left→right) */
  animationDirection?: "x" | "y";
  /** Size of the circular button */
  size?: "sm" | "md" | "lg";
}

export default function ContactButton({
  href,
  icon,
  label,
  hoverText,
  animationDirection = "y",
  size = "md",
}: ContactButtonProps) {
  const [isHovered, setIsHovered] = useState(false);

  const sizeClass =
    size === "sm" ? "w-10 h-10" : size === "md" ? "w-12 h-12" : "w-16 h-16"; // lg default

  const overlayInitial =
    animationDirection === "x" ? { scaleX: 0 } : { scaleY: 0 };
  const overlayAnimate =
    animationDirection === "x"
      ? { scaleX: isHovered ? 1 : 0 }
      : { scaleY: isHovered ? 1 : 0 };
  const overlayOriginStyle =
    animationDirection === "x" ? { originX: 0 } : { originY: 1 };

  return (
    <div className="flex flex-col items-center relative">
      {/* Label and arrow - shown on hover (only if hoverText is provided) */}
      {hoverText && (
        <motion.div
          className="absolute bottom-full left-1/2 transform -translate-x-1/2 flex flex-col items-center mb-2"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 10 }}
          transition={{ duration: 0.2 }}
        >
          <span className="text-white text-sm font-medium mb-1 whitespace-nowrap font-mono">
            {hoverText}
          </span>
          <DownArrowIcon className="w-4 h-4 text-white" />
        </motion.div>
      )}

      {/* Button */}
      <motion.a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={`relative ${sizeClass} rounded-full border-2 border-white overflow-hidden group`}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        whileHover={{ scale: 1.05 }}
        transition={{ type: "spring", stiffness: 400, damping: 10 }}
      >
        {/* Light icon (default state) */}
        <div className="absolute inset-0 flex items-center justify-center bg-transparent text-white">
          {icon}
        </div>

        {/* Dark icon (hover state) */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center bg-white text-black"
          initial={overlayInitial}
          animate={overlayAnimate}
          transition={{ type: "spring", stiffness: 400, damping: 25 }}
          style={overlayOriginStyle as any}
        >
          {icon}
        </motion.div>
      </motion.a>
    </div>
  );
}
