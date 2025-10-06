"use client";

import { motion } from "framer-motion";
import { MotionP, DownloadIcon, SectionHead } from "@/components";
import Link from "next/link";

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
}

const experienceData: Job[] = [
  {
    name: "ClassPass",
    position: "Senior Software Engineer",
    location: "Remote/Hangzhou, China",
    startDate: "Dec 2022",
    endDate: "Dec 2024",
    summary:
      "Feature owner and fullstack engineer in the China squad, responsible for the ClassPass WeChat mini-program and internal admin portal. Led end-to-end feature development and cross-functional coordination with product, design, and marketing teams to serve mainland Chinese users.",
    techStack:
      "WeChat mini-program (native), React, Kotlin, Java,Spring Boot, Ktor, MySQL, Docker, CI/CD, AWS",
    highlights: [
      "Owned and shipped end-to-end features on the ClassPass China WeChat mini-program, including User Referral flows, Coupon System, Workout Calendar, and Booking Reviews",
      "Collaborated with cross-functional stakeholders to define scope and deliver weekly releases aligned with product goals",
      "Built and maintained internal tools on the ClassPass Admin platform using React + Ktor to support operations and data management",
      "Introduced and maintained frontend automated testing using Tencent Cloud Test (云测), improving test coverage and reducing regressions",
      "Led frontend refactoring: standardized design tokens, colors, and components across mini-program and admin portal for brand consistency",
    ],
  },
  {
    name: "Vantage Management",
    position: "Fullstack Software Engineer",
    location: "Remote/Tokyo, Japan",
    startDate: "Apr 2018",
    endDate: "May 2022",
    summary:
      "Lead engineer for two SaaS platforms: Keyman Letter (formerly Posto), a direct mail marketing automation platform; and Keyman Database, a B2B data-as-a-service product.",
    techStack:
      "React, Gatsby.js, Laravel, Elasticsearch, Python, MySQL, Docker, AWS",
    highlights: [
      "Keyman Letter (Posto): Built the frontend from scratch with React, including a custom WYSIWYG SVG editor",
      "Designed and implemented backend features in Laravel, including a Salesforce CRM integration for syncing standard and custom objects",
      "Managed database schema changes and data layer logic, and took on UI/UX ownership in the absence of a dedicated designer",
      "Keyman Database: Built the entire frontend using Gatsby.js and developed REST APIs to serve data crawled from web sources",
      "Doubled the amount of crawled personnel through crawler optimization and collaborated with SEO specialist for technical enhancements",
    ],
  },
  {
    name: "NetApp",
    position: "Backend Software Engineer, FlashRay Storage Team",
    location: "Sunnyvale, CA, USA",
    startDate: "Aug 2014",
    endDate: "Oct 2017",
    summary:
      "Developed the FlashRay Setup Wizard for turnkey installation of NetApp's All Flash Array storage system. Built system management features via REST APIs and Jetty web server components.",
    techStack: "Java, REST APIs, Jetty, Python, Automated Testing",
    highlights: [
      "Developed the FlashRay Setup Wizard for turnkey installation of NetApp's All Flash Array storage system",
      "Built system management features via REST APIs and Jetty web server components",
      "Enhanced Python-based frameworks for automated IO testing and fault injection",
    ],
  },
  {
    name: "Freelance Developer & UI Developer",
    position: "Freelance Fullstack Developer & Designer",
    location: "Remote",
    startDate: "2014",
    endDate: "Present",
    summary:
      "Designed and developed small-scale web projects for individuals and small businesses, focusing on frontend implementation and UI/UX design. Work includes personal websites, static content archives, internal tools, and casual games.",
    techStack:
      "React, Gatsby.js, Next.js, Tailwind CSS, Firebase, Ant Design, Vue.js, WebSocket, Tencent Cloudbase",
    highlights: [
      "Built and deployed personal websites and blogs using React, Gatsby.js, Next.js, Tailwind CSS, and Material UI on Netlify",
      "Created a static archive site by crawling content from a defunct website and indexing it with Algolia for search",
      "Developed a simple inventory management app using React, Firebase, and Ant Design",
      "Contributed to a multiplayer math game with Vue.js and WebSocket, and led the UI redesign",
    ],
  },
];

const ExperienceSection = ({ className }: ExperienceSectionProps) => {
  return (
    <section
      className={`min-h-[100svh] bg-white flex flex-col items-center justify-center px-6 py-24 sm:py-32 sm:px-12 ${
        className ?? ""
      }`}
    >
      <div className="w-full mx-auto">
        <SectionHead
          title="Experience"
          showDivider={true}
          rightSlot={
            <Link href="/resume" target="_blank">
              <motion.button
                className="px-4 py-2 bg-gray-900 text-white sm:text-sm text-xs font-normal rounded-lg hover:bg-gray-800 transition-colors duration-200 flex items-center gap-1 cursor-pointer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <DownloadIcon />
                Download Full Resume
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
              transition={{ delay: 0.2 + index * 0.1 }}
              whileHover={{
                backgroundColor: "rgba(0, 0, 0, 0.05)",
                transition: { duration: 0.2 },
              }}
            >
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 sm:gap-8 py-4 px-2 sm:p-8 rounded-lg">
                {/* Column 1: Time */}
                <div className="text-left whitespace-nowrap">
                  <MotionP
                    className="text-sm sm:text-base font-mono text-gray-400 flex items-center gap-2 "
                    delay={0.3 + index * 0.1}
                    as="div"
                  >
                    <span>{job.startDate}</span>
                    <div className="bg-gray-400 h-px w-2 group-hover:w-full transition-all duration-3000" />
                    <span>{job.endDate}</span>
                  </MotionP>
                  <MotionP
                    className="text-sm text-gray-500 mt-1"
                    delay={0.35 + index * 0.1}
                  >
                    {job.location}
                  </MotionP>
                </div>

                {/* Column 2: Empty */}
                <div className="hidden sm:block"></div>

                {/* Columns 3-4: Combined content */}
                <div className="sm:col-span-2 flex flex-col">
                  <MotionP
                    className="font-bold text-lg sm:text-xl mb-4"
                    delay={0.4 + index * 0.1}
                  >
                    {job.position} · {job.name}
                  </MotionP>

                  <MotionP
                    className="text-sm sm:text-base text-gray-900"
                    delay={0.5 + index * 0.1}
                  >
                    {job.summary}
                  </MotionP>

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
                          delay: 0.6 + index * 0.1 + highlightIndex * 0.05,
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
                          delay: 0.7 + index * 0.1 + techIndex * 0.05,
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
