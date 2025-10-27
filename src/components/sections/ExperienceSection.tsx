"use client";

import { motion } from "framer-motion";
import { DownloadIcon, SectionHead } from "@/components";
import Link from "next/link";
import { useTranslations } from "next-intl";

interface Job {
  name: string;
  position: string;
  location: string;
  startDate: string;
  endDate: string;
  summary: string;
  techStack: string;
  highlights: string[];
}

interface ExperienceSectionProps {
  className?: string;
  id?: string;
}

const ExperienceSection = ({ className, id }: ExperienceSectionProps) => {
  const t = useTranslations("experience");
  const experienceData = t.raw("jobs") as Job[];

  return (
    <section
      id={id}
      className={`min-h-[100svh] bg-white flex flex-col items-center justify-center px-6 py-24 sm:py-32 sm:px-12 ${
        className ?? ""
      }`}
    >
      <div className="w-full mx-auto">
        <SectionHead
          title={t("title")}
          showDivider={true}
          rightSlot={
            <Link href="/resume" target="_blank">
              <motion.button
                className="px-4 py-2 bg-gray-900 text-white sm:text-sm text-xs font-normal rounded-lg hover:bg-gray-800 transition-colors duration-200 flex items-center gap-1 cursor-pointer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <DownloadIcon />
                {t("downloadResume")}
              </motion.button>
            </Link>
          }
        />

        <div className="space-y-8">
          {experienceData.map((job, index) => (
            <motion.div
              key={index}
              className="group cursor-pointer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: 0.1 + index * 0.1 }}
              whileHover={{
                backgroundColor: "rgba(0, 0, 0, 0.05)",
                transition: { duration: 0.2 },
              }}
            >
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 sm:gap-8 py-4 px-2 sm:p-8 rounded-lg">
                {/* Column 1: Time */}
                <div className="text-left whitespace-nowrap">
                  <div className="text-sm sm:text-base font-mono text-gray-400 flex items-center gap-2">
                    <span>{job.startDate}</span>
                    <div className="bg-gray-400 h-px w-2 group-hover:w-full transition-all duration-3000" />
                    <span>{job.endDate}</span>
                  </div>
                  <div className="text-sm text-gray-500 mt-1">
                    {job.location}
                  </div>
                </div>

                {/* Column 2: Empty */}
                <div className="hidden sm:block"></div>

                {/* Columns 3-4: Combined content */}
                <div className="sm:col-span-2 flex flex-col">
                  <div className="font-bold text-lg sm:text-xl mb-4">
                    {job.position} · {job.name}
                  </div>

                  <div className="text-sm sm:text-base text-gray-900">
                    {job.summary}
                  </div>

                  {/* Highlights */}
                  <div className="mt-3">
                    {job.highlights.map((highlight, highlightIndex) => (
                      <motion.div
                        key={highlightIndex}
                        className="flex items-start gap-2 mb-2"
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{
                          delay: 0.2 + index * 0.1 + highlightIndex * 0.05,
                        }}
                      >
                        <span className="text-gray-400 mt-1 text-sm">•</span>
                        <span className="text-sm text-gray-600 leading-relaxed">
                          {highlight}
                        </span>
                      </motion.div>
                    ))}
                  </div>

                  {/* Tech Stack Tags */}
                  <div className="flex flex-wrap gap-2 mt-2">
                    {job.techStack.split(", ").map((tech, techIndex) => (
                      <motion.span
                        key={techIndex}
                        className="px-3 py-1 bg-gray-100 text-gray-700 text-xs rounded-full border border-gray-300"
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{
                          delay: 0.3 + index * 0.1 + techIndex * 0.05,
                        }}
                      >
                        {tech.trim()}
                      </motion.span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
