"use client";

import { motion } from "framer-motion";
import { useRef } from "react";
import {
  ContactButton,
  DownArrowIcon,
  MailIcon,
  LinkedInIcon,
  GitHubIcon,
  InstagramIcon,
} from "@/components";

export default function ContactSection({
  className,
  id,
}: {
  className?: string;
  id?: string;
}) {
  const typewriterRef = useRef(null);

  const typewriterVariants = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.03,
        delayChildren: 0.8, // Start after main title animation (0.6s + 0.2s buffer)
      },
    },
  };

  const charVariants = {
    hidden: { opacity: 0 },
    show: { opacity: 1 },
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
          thank you for
          <br />
          stopping by :)
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
              {/* Desktop/Tablet: 2 lines */}
              <div className="hidden sm:block">
                {/* Line 1: "How about we make something " */}
                <div>
                  {Array.from("How about we make something ").map((char, i) => (
                    <motion.span
                      key={`sm-line1-${i}`}
                      variants={charVariants}
                      className="inline-block"
                    >
                      {char === " " ? "\u00A0" : char}
                    </motion.span>
                  ))}
                </div>
                {/* Line 2: "awesome together?" */}
                <div>
                  {Array.from("awesome together?").map((char, i) => (
                    <motion.span
                      key={`sm-line2-${i}`}
                      variants={charVariants}
                      className="inline-block"
                    >
                      {char === " " ? "\u00A0" : char}
                    </motion.span>
                  ))}
                </div>
              </div>

              {/* Mobile: 3 lines */}
              <div className="block sm:hidden">
                {/* Line 1: "How about we make " */}
                <div>
                  {Array.from("How about we make ").map((char, i) => (
                    <motion.span
                      key={`mobile-line1-${i}`}
                      variants={charVariants}
                      className="inline-block"
                    >
                      {char === " " ? "\u00A0" : char}
                    </motion.span>
                  ))}
                </div>
                {/* Line 2: "something awesome" */}
                <div>
                  {Array.from("something awesome").map((char, i) => (
                    <motion.span
                      key={`mobile-line2-${i}`}
                      variants={charVariants}
                      className="inline-block"
                    >
                      {char === " " ? "\u00A0" : char}
                    </motion.span>
                  ))}
                </div>
                {/* Line 3: "together?" */}
                <div>
                  {Array.from("together?").map((char, i) => (
                    <motion.span
                      key={`mobile-line3-${i}`}
                      variants={charVariants}
                      className="inline-block"
                    >
                      {char}
                    </motion.span>
                  ))}
                </div>
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
                delay: 1.5, // Typewriter delay (0.8s) + typewriter duration (~0.7s)
              }}
              style={{ willChange: "transform, opacity" }}
            >
              <a
                href="/contact"
                className="relative text-lg rounded-3xl px-4 py-2 border-2 border-white overflow-hidden group cursor-pointer bg-white text-black"
              >
                {/* Light state (default) */}
                <div className="relative z-10 flex items-center justify-center bg-transparent gap-2">
                  <span className="text-black group-hover:text-white transition-colors duration-300">
                    Let&apos;s Connect
                  </span>
                  <DownArrowIcon className="w-5 h-4 -rotate-90 text-black group-hover:text-white group-hover:-rotate-45 transition-all duration-300" />
                </div>

                {/* Dark state (hover) */}
                <div className="absolute inset-0 bg-black transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
              </a>
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
              hoverText="EMAIL ME"
            />
            <ContactButton
              href="https://www.linkedin.com/in/jacy-li/"
              icon={LinkedInIcon}
              hoverText="CONNECT WITH ME"
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
