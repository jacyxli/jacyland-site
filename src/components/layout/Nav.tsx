"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useTranslations } from "next-intl";
import LocaleSwitcher from "../LocaleSwitcher";

const Nav = () => {
  const [hovered, setHovered] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const t = useTranslations("nav");

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

  const handleNavigation = (sectionId: string) => {
    if (sectionId === "contact") {
      router.push("/contact");
    } else {
      if (pathname !== "/" && !pathname?.includes("contact")) {
        router.push(`/#${sectionId}`);
      } else {
        scrollToSection(sectionId);
      }
    }
    setHovered(false);
  };

  useEffect(() => {
    if (pathname === "/" && window.location.hash) {
      const sectionId = window.location.hash.substring(1);
      setTimeout(() => {
        scrollToSection(sectionId);
      }, 100);
    }
  }, [pathname]);

  return (
    <div className="fixed top-8 right-6 sm:right-12 z-100 flex flex-row items-start gap-3">
      {/* Locale Switcher on the left */}
      <LocaleSwitcher />

      <div className="relative">
        {/* Button */}
        <div
          className="w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center relative cursor-pointer"
          onMouseEnter={() => setHovered(true)}
          onClick={() => setHovered(!hovered)}
        >
          {/* Top Line */}
          <motion.span
            initial={false}
            animate={hovered ? { rotate: -45, y: 0 } : { rotate: 0, y: -5 }}
            className="absolute block h-1 w-5 bg-black rounded"
            transition={{ duration: 0.3 }}
          />
          {/* Bottom Line */}
          <motion.span
            initial={false}
            animate={hovered ? { rotate: 45, y: 0 } : { rotate: 0, y: 5 }}
            className="absolute block h-1 w-5 bg-black rounded"
            transition={{ duration: 0.3 }}
          />
        </div>

        {/* Dropdown Menu */}
        {hovered && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="mt-3 bg-white shadow-lg rounded-lg p-4 w-40 origin-top-right absolute right-0 top-12"
            onMouseLeave={() => setHovered(false)}
            aria-hidden={false}
          >
            <ul className="flex flex-col text-gray-800 text-center">
              <li>
                <button
                  onClick={() => handleNavigation("hero")}
                  className="block px-4 py-2 hover:text-lg hover:font-semibold transition-all duration-300 w-full text-left"
                >
                  {t("home")}
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavigation("about")}
                  className="block px-4 py-2 hover:text-lg hover:font-semibold transition-all duration-300 w-full text-left"
                >
                  {t("about")}
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavigation("experience")}
                  className="block px-4 py-2 hover:text-lg hover:font-semibold transition-all duration-300 w-full text-left"
                >
                  {t("experience")}
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavigation("portfolio")}
                  className="block px-4 py-2 hover:text-lg hover:font-semibold transition-all duration-300 w-full text-left"
                >
                  {t("portfolio")}
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavigation("contact")}
                  className="block px-4 py-2 hover:text-lg hover:font-semibold transition-all duration-300 w-full text-left"
                >
                  {t("contact")}
                </button>
              </li>
            </ul>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Nav;
