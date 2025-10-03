"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";
const Nav = () => {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="fixed top-8 right-12 z-50 flex flex-col items-end"
      onMouseLeave={() => setHovered(false)}
    >
      {/* Button */}
      <div
        className="w-12 h-12 rounded-full bg-white shadow-md flex items-center justify-center relative cursor-pointer"
        onMouseEnter={() => setHovered(true)}
        onClick={() => setHovered(!hovered)}
      >
        {/* Top Line */}
        <motion.span
          initial={false}
          animate={hovered ? { rotate: -45, y: 0 } : { rotate: 0, y: -6 }}
          className="absolute block h-1 w-6 bg-black rounded"
          transition={{ duration: 0.3 }}
        />
        {/* Bottom Line */}
        <motion.span
          initial={false}
          animate={hovered ? { rotate: 45, y: 0 } : { rotate: 0, y: 6 }}
          className="absolute block h-1 w-6 bg-black rounded"
          transition={{ duration: 0.3 }}
        />
      </div>

      {/* Dropdown Menu */}
      <motion.div
        initial={{ opacity: 0, y: -10, scale: 0.95 }}
        animate={
          hovered
            ? { opacity: 1, y: 0, scale: 1 }
            : { opacity: 0, y: -10, scale: 0.95 }
        }
        transition={{ duration: 0.2 }}
        className={`mt-3 bg-white shadow-lg rounded-lg p-4 w-40 origin-top-right${
          hovered ? "" : " pointer-events-none"
        }`}
        aria-hidden={!hovered}
      >
        <ul className="flex flex-col text-gray-800 text-center">
          <li>
            <Link
              href="/"
              onClick={() => setHovered(false)}
              className="block px-4 py-2 hover:text-lg hover:font-semibold transition-all duration-300"
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              href="/about"
              onClick={() => setHovered(false)}
              className="block px-4 py-2 hover:text-lg hover:font-semibold transition-all duration-300"
            >
              About
            </Link>
          </li>
        </ul>
      </motion.div>
    </div>
  );
};

export default Nav;
