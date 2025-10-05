"use client";

import { motion } from "framer-motion";
import { useState } from "react";

interface ContactButtonProps {
  href: string;
  icon: React.ReactNode;
  label: string;
}

export default function ContactButton({
  href,
  icon,
  label,
}: ContactButtonProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="relative w-16 h-16 rounded-full border-2 border-white overflow-hidden group"
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
        initial={{ scaleY: 1 }}
        animate={{
          scaleY: isHovered ? 1 : 0,
        }}
        transition={{ type: "spring", stiffness: 400, damping: 25 }}
        style={{ originY: 1 }}
      >
        {icon}
      </motion.div>

      {/* Tooltip */}
      <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
        {label}
      </div>
    </motion.a>
  );
}
