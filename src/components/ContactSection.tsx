"use client";

import { motion } from "framer-motion";
import ContactButton from "./ContactButton";
import MailIcon from "@/components/icons/MailIcon";
import LinkedInIcon from "@/components/icons/LinkedInIcon";
import GitHubIcon from "@/components/icons/GitHubIcon";
import InstagramIcon from "@/components/icons/InstagramIcon";
import DownArrowIcon from "./icons/DownArrowIcon";

export default function ContactSection({ className }: { className?: string }) {
  return (
    <section
      className={`w-full bg-black text-white relative pb-24 ${className ?? ""}`}
    >
      <div className="relative">
        {/* Row 1: Heading */}
        <div>
          <div className="sm:-ml-2 -ml-1 text-[56px] sm:text-[96px] font-anton leading-tight">
            thank you for
            <br />
            stopping by :)
          </div>
        </div>

        {/* Row 2: Two-column grid, left has right-aligned subheading */}
        <div className="mt-8 max-w-[640px] flex sm:justify-end justify-start">
          <div className="md:col-span-3 max-w-[450px] sm:px-0 px-6 flex flex-col items-start">
            <div className="text-left text-2xl tracking-wider text-gray-300">
              How about we make something
              <span className="text-white"> awesome </span> together?
            </div>
            {/* Let's connect button */}
            <div className="mt-8 flex items-center">
              <a
                href="/contact"
                className="relative text-lg rounded-3xl px-4 py-2 border-2 border-white overflow-hidden group cursor-pointer bg-white text-black"
              >
                {/* Light state (default) */}
                <div className="relative z-10 flex items-center justify-center bg-transparent gap-2">
                  <span className="text-black group-hover:text-white transition-colors duration-300">
                    Let's Connect
                  </span>
                  <DownArrowIcon className="w-5 h-4 -rotate-90 text-black group-hover:text-white group-hover:-rotate-45 transition-all duration-300" />
                </div>

                {/* Dark state (hover) */}
                <div className="absolute inset-0 bg-black transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
              </a>
            </div>
          </div>
        </div>

        {/* Row 3: Bottom-right aligned icons */}
        <motion.div
          className="mt-36 px-6 sm:px-12 flex sm:justify-end justify-start"
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="flex gap-4">
            <ContactButton
              href="mailto:jacy.li@outlook.com"
              label="Email"
              icon={<MailIcon />}
              hoverText="EMAIL ME"
            />
            <ContactButton
              href="https://www.linkedin.com/in/jacy-li/"
              label="LinkedIn"
              icon={<LinkedInIcon />}
              hoverText="CONNECT WITH ME"
            />
            <ContactButton
              href="https://github.com/jacyxli"
              label="GitHub"
              icon={<GitHubIcon />}
            />
            <ContactButton
              href="https://www.instagram.com/jacyxli/"
              label="Instagram"
              icon={<InstagramIcon />}
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
