"use client";

import { motion } from "framer-motion";
import ContactButton from "./ContactButton";
import Image from "next/image";
import ExternalArrowIcon from "@/components/icons/ExternalArrowIcon";
import MailIcon from "@/components/icons/MailIcon";
import LinkedInIcon from "@/components/icons/LinkedInIcon";
import GitHubIcon from "@/components/icons/GitHubIcon";
import InstagramIcon from "@/components/icons/InstagramIcon";

export default function ContactSection({ className }: { className?: string }) {
  return (
    <section
      className={`w-full bg-black text-white relative ${className ?? ""}`}
    >
      <div className="relative">
        {/* Main Content - 2 Column Layout */}
        <div className="grid md:grid-cols-8 grid-cols-1">
          {/* Left spacer after removing form */}
          <div className="col-span-3 p-8" />

          {/* Right Column - Connect Section */}
          <div className="col-span-1"></div>
          <div className="col-span-1">
            {/* Shall we connect */}
            <div className="flex items-center  gap-3 mb-8">
              <h3 className="text-5xl font-medium">Shall we connect?</h3>
              <ExternalArrowIcon className="w-6 h-6 rotate-45" />
            </div>
          </div>
          <div className="col-span-3 flex h-full items-end">
            <motion.div
              className="py-8 "
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              {/* Contact Buttons */}
              <div className="flex gap-4 mb-8 justify-end">
                <ContactButton
                  href="mailto:jacy.li@outlook.com"
                  label="Email"
                  icon={<MailIcon />}
                />

                <ContactButton
                  href="https://www.linkedin.com/in/jacy-li/"
                  label="LinkedIn"
                  icon={<LinkedInIcon />}
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
        </div>
      </div>
    </section>
  );
}
