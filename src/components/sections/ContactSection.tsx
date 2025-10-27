"use client";

import { motion } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";
import {
  ContactButton,
  DownArrowIcon,
  MailIcon,
  LinkedInIcon,
  GitHubIcon,
  InstagramIcon,
} from "@/components";
import { useTranslations } from "next-intl";

export default function ContactSection({
  className,
  id,
}: {
  className?: string;
  id?: string;
}) {
  const typewriterRef = useRef(null);
  const t = useTranslations("contact");

  const typewriterVariants = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.03,
        delayChildren: 0.8,
      },
    },
  };

  const charVariants = {
    hidden: { opacity: 0 },
    show: { opacity: 1 },
  };

  const renderTextLines = (text: string) => {
    return text.split("\n").map((line, lineIndex) => (
      <div key={lineIndex}>
        {Array.from(line).map((char, charIndex) => (
          <motion.span
            key={`${lineIndex}-${charIndex}`}
            variants={charVariants}
            className="inline-block"
          >
            {char === " " ? "\u00A0" : char}
          </motion.span>
        ))}
      </div>
    ));
  };

  return (
    <section
      id={id}
      className={`w-full bg-black text-white section-container ${
        className ?? ""
      }`}
    >
      <div className="relative">
        {/* Row 1: Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="sm:-ml-14 -ml-7 text-[56px] sm:text-[96px] font-anton leading-tight"
          style={{ willChange: "transform, opacity" }}
        >
          {t("title")}
        </motion.div>

        {/* Row 2: Two-column grid, left has right-aligned subheading */}
        <div className="mt-8 max-w-[640px] flex sm:justify-end justify-start">
          <div className="md:col-span-3 max-w-[450px] sm:px-0 px-6 flex flex-col items-start">
            <motion.div
              ref={typewriterRef}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.3 }}
              variants={typewriterVariants}
              className="text-left text-2xl tracking-wider text-gray-300"
              style={{ minHeight: "6rem" }}
            >
              {/* Desktop/Tablet: Use subtitle */}
              <div className="hidden sm:block">
                {renderTextLines(t("subtitle"))}
              </div>

              {/* Mobile: Use mobile subtitle */}
              <div className="block sm:hidden">
                {renderTextLines(t("subtitleMobile"))}
              </div>
            </motion.div>
            {/* Let's connect button */}
            <motion.div
              className="mt-8 flex items-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{
                duration: 0.5,
                ease: "easeOut",
                delay: 1.5,
              }}
              style={{ willChange: "transform, opacity" }}
            >
              <Link
                href="/contact"
                className="relative text-lg rounded-3xl px-4 py-2 border-2 border-white overflow-hidden group cursor-pointer bg-white text-black"
              >
                {/* Light state (default) */}
                <div className="relative z-10 flex items-center justify-center bg-transparent gap-2">
                  <span className="text-black group-hover:text-white transition-colors duration-300">
                    {t("button")}
                  </span>
                  <DownArrowIcon className="w-5 h-4 -rotate-90 text-black group-hover:text-white group-hover:-rotate-45 transition-all duration-300" />
                </div>

                {/* Dark state (hover) */}
                <div className="absolute inset-0 bg-black transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
              </Link>
            </motion.div>
          </div>
        </div>

        {/* Row 3: Bottom-right aligned icons */}
        <motion.div
          className="sm:mt-36 mt-24 px-6 sm:px-12 flex sm:justify-end justify-start"
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 1.5 }}
          style={{ willChange: "transform, opacity" }}
        >
          <div className="flex gap-4">
            <ContactButton
              href="mailto:jacy.li@outlook.com"
              icon={MailIcon}
              hoverText={t("contactMe")}
            />
            <ContactButton
              href="https://www.linkedin.com/in/jacy-li/"
              icon={LinkedInIcon}
              hoverText={t("connectWithMe")}
            />
            <ContactButton
              href="https://github.com/jacyxli"
              icon={GitHubIcon}
            />
            <ContactButton
              href="https://www.instagram.com/jacyxli/"
              icon={InstagramIcon}
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
