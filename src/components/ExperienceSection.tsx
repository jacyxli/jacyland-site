"use client";

import { motion } from "framer-motion";
import MotionP from "@/components/MotionP";

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
    startDate: "2022-12",
    endDate: "2024-12",
    summary: "Feature owner and fullstack engineer in the China squad, responsible for the ClassPass WeChat mini-program and internal admin portal. Led end-to-end feature development and cross-functional coordination with product, design, and marketing teams to serve mainland Chinese users.",
    techStack: "WeChat mini-program (native), React, Kotlin, Spring Boot, Ktor, MySQL, Docker, CI/CD, AWS",
    highlights: [
      "Owned and shipped end-to-end features on the ClassPass China WeChat mini-program, including User Referral flows, Coupon System, Workout Calendar, and Booking Reviews",
      "Collaborated with cross-functional stakeholders to define scope and deliver weekly releases aligned with product goals",
      "Built and maintained internal tools on the ClassPass Admin platform using React + Ktor to support operations and data management",
      "Introduced and maintained frontend automated testing using Tencent Cloud Test (云测), improving test coverage and reducing regressions",
      "Led frontend refactoring - standardized design tokens, colors, and components across mini-program and admin portal for brand consistency"
    ]
  },
  {
    name: "Vantage Management",
    position: "Fullstack Software Engineer",
    location: "Remote/Tokyo, Japan",
    startDate: "2018-04",
    endDate: "2022-05",
    summary: "Lead engineer for two SaaS platforms: Keyman Letter (formerly Posto), a direct mail marketing automation platform; and Keyman Database, a B2B data-as-a-service product.",
    techStack: "React, Gatsby.js, Laravel, MySQL, Docker, CI/CD, AWS",
    highlights: [
      "Built the frontend from scratch with React, including a custom WYSIWYG SVG editor",
      "Designed and implemented backend features in Laravel, including a Salesforce CRM integration for syncing standard and custom objects",
      "Managed database schema changes and data layer logic",
      "Took on UI/UX ownership in the absence of a dedicated designer during the final year",
      "Built the entire frontend using Gatsby.js and developed REST APIs to serve data crawled from web sources",
      "Doubled the amount of crawled personnel through crawler optimization"
    ]
  },
  {
    name: "NetApp",
    position: "Backend Software Engineer on the FlashRay Storage Team",
    location: "Sunnyvale, CA, USA",
    startDate: "2014-08",
    endDate: "2017-10",
    summary: "Developed the FlashRay Setup Wizard for turnkey installation of NetApp's All Flash Array storage system. Built system management features via REST APIs and Jetty web server components.",
    techStack: "Java, REST APIs, Jetty, Python, Automated Testing",
    highlights: [
      "Developed the FlashRay Setup Wizard for turnkey installation of NetApp's All Flash Array storage system",
      "Built system management features via REST APIs and Jetty web server components",
      "Enhanced Python-based frameworks for automated IO testing and fault injection"
    ]
  },
  {
    name: "Freelance Developer & UI Developer",
    position: "Freelance Fullstack Developer & Designer",
    location: "Remote",
    startDate: "2014-01",
    endDate: "2024-12",
    summary: "Designed and developed small-scale web projects for individuals and small businesses, focusing on frontend implementation and UI/UX design. Work includes personal websites, static content archives, internal tools, and casual games.",
    techStack: "React, Gatsby.js, Next.js, Tailwind CSS, Material UI, Firebase, Ant Design, Vue.js, WebSocket",
    highlights: [
      "Built and deployed personal websites and blogs using React, Gatsby.js, Next.js, Tailwind CSS, and Material UI on Netlify",
      "Created a static archive site by crawling content from a defunct website and indexing it with Algolia for search",
      "Developed a simple inventory management app using React, Firebase, and Ant Design",
      "Contributed to a multiplayer math game with Vue.js and WebSocket, and led the UI redesign"
    ]
  }
];

const ExperienceSection = ({ className }: ExperienceSectionProps) => {
  return (
    <section className={`min-h-[100svh] bg-black text-white flex flex-col items-center justify-center px-6 py-24 sm:py-32 sm:px-12 ${className ?? ""}`}>
      <div className="w-full sm:max-w-6xl mx-auto">
        <MotionP className="font-anton text-3xl sm:text-5xl font-bold mb-16 text-center" delay={0.1}>
          Experience
        </MotionP>
        
        <div className="space-y-8">
          {experienceData.map((job, index) => (
            <motion.div
              key={index}
              className="group cursor-pointer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: 0.2 + (index * 0.1) }}
              whileHover={{ 
                backgroundColor: "rgba(255, 255, 255, 0.05)",
                transition: { duration: 0.2 }
              }}
            >
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-6 sm:gap-8 p-6 sm:p-8 rounded-lg transition-all duration-300">
                {/* Column 1: Time */}
                <div className="text-left sm:text-right">
                  <MotionP className="text-sm sm:text-base font-mono text-gray-400" delay={0.3 + (index * 0.1)}>
                    {job.startDate} — {job.endDate}
                  </MotionP>
                </div>
                
                {/* Column 2: Empty */}
                <div className="hidden sm:block"></div>
                
                {/* Columns 3-4: Combined content */}
                <div className="sm:col-span-2 flex flex-col gap-4">
                  <MotionP className="font-bold text-lg sm:text-xl" delay={0.4 + (index * 0.1)}>
                    {job.position} · {job.name}
                  </MotionP>
                  
                  <MotionP className="text-sm sm:text-base text-gray-300" delay={0.5 + (index * 0.1)}>
                    {job.summary}
                  </MotionP>
                  
                  {/* Tech Stack Tags */}
                  <div className="flex flex-wrap gap-2 mt-2">
                    {job.techStack.split(', ').map((tech, techIndex) => (
                      <motion.span
                        key={techIndex}
                        className="px-3 py-1 bg-gray-800 text-gray-300 text-xs rounded-full border border-gray-700"
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.6 + (index * 0.1) + (techIndex * 0.05) }}
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
