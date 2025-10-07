"use client";

import { motion } from "framer-motion";
import { useState } from "react";
const Nav = () => {
  const [hovered, setHovered] = useState(false);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
    setHovered(false);
  };

  return (
    <div
      className="fixed top-8 right-6 sm:right-12 z-100 flex flex-col items-end"
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
            <button
              onClick={() => scrollToSection("hero")}
              className="block px-4 py-2 hover:text-lg hover:font-semibold transition-all duration-300 w-full text-left"
            >
              Home
            </button>
          </li>
          <li>
            <button
              onClick={() => scrollToSection("about")}
              className="block px-4 py-2 hover:text-lg hover:font-semibold transition-all duration-300 w-full text-left"
            >
              About
            </button>
          </li>
          <li>
            <button
              onClick={() => scrollToSection("experience")}
              className="block px-4 py-2 hover:text-lg hover:font-semibold transition-all duration-300 w-full text-left"
            >
              Experience
            </button>
          </li>
          <li>
            <button
              onClick={() => scrollToSection("portfolio")}
              className="block px-4 py-2 hover:text-lg hover:font-semibold transition-all duration-300 w-full text-left"
            >
              Portfolio
            </button>
          </li>
          <li>
            <button
              onClick={() => scrollToSection("contact")}
              className="block px-4 py-2 hover:text-lg hover:font-semibold transition-all duration-300 w-full text-left"
            >
              Contact
            </button>
          </li>
        </ul>
      </motion.div>
    </div>
  );
};

export default Nav;
