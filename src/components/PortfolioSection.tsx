"use client";

import {
  motion,
  useScroll,
  useTransform,
  useMotionValueEvent,
} from "framer-motion";
import { ReactElement, useRef } from "react";
import PortfolioCard from "./PortfolioCard";

export default function PortfolioSection({
  className,
}: {
  className?: string;
}) {
  const containerRef = useRef(null);

  // track scroll relative to PortfolioSection
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end end"], // full section watched
  });

  const { scrollYProgress: selectedWorkScrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "start start"], // full section watched
  });

  const selectedX = useTransform(
    selectedWorkScrollYProgress,
    [0, 0.6],
    ["-100%", "0%"]
  );
  const workX = useTransform(
    selectedWorkScrollYProgress,
    [0, 0.6],
    ["100%", "-0%"]
  );
  const selectedY = useTransform(
    selectedWorkScrollYProgress,
    [0.2, 0.8],
    ["120%", "0%"]
  );
  const workY = useTransform(
    selectedWorkScrollYProgress,
    [0, 0.6],
    ["-100%", "0%"]
  );

  useMotionValueEvent(selectedX, "change", (latest) => {
    console.log("selectedX:", latest);
  });
  useMotionValueEvent(workX, "change", (latest) => {
    console.log("workX:", latest);
  });

  // Portfolio data
  const portfolioData: Array<{
    sectionTitle?: string;
    cardIndex?: number;
    type: "mobile" | "web";
    context: string;
    description: string;
    features: string[];
    role: string;
    images?: string[];
    actions?: ReactElement;
    mockupMode: "swiper" | "scroll";
  }> = [
    {
      sectionTitle: "CLASSPASS CHINA",
      cardIndex: 1,
      type: "mobile",
      context: "WeChat Mini-Program & Web Development",
      images: [
        "/classpass-1.PNG",
        "/classpass-2.PNG",
        "/classpass-3.PNG",
        "/classpass-4.PNG",
        "/classpass-5.PNG",
      ],
      mockupMode: "swiper",
      description:
        "A localized fitness booking experience designed for users in mainland China. Integrated with WeChat for seamless access, class discovery, and booking management — all tailored to local user habits and payment systems.",
      features: [
        "Discover and book fitness classes",
        "Manage memberships and packages",
        "WeChat Pay integration",
        "Workout calendar & User Reviews",
      ],
      role: "Feature owner responsible for end-to-end development as part of the ClassPass China engineering team.",
    },
    {
      sectionTitle: "YANJI WECHAT MINI-PROGRAM",
      cardIndex: 2,
      type: "mobile",
      context: "Product Concept, Design, Mobile & Web Development",
      mockupMode: "swiper",
      images: ["/Yanji-1.PNG", "/Yanji-2.PNG", "/Yanji-3.PNG", "/Yanji-4.PNG"],
      description:
        "A full-stack product catalog and management system built for a new climbing-hold brand. I led the project from concept to launch — designing the user experience, implementing both the mobile mini-program and the web-based admin panel, and building the service layer and database architecture.",
      features: [
        "Configurable product list and detail pages",
        "Filter, search, and sort for product discovery",
        "Customer service integration and feedback handling",
        "Admin dashboard for product and content management",
      ],
      role: "Sole designer-engineer, driving product definition, UX design, and fullstack development through launch.",
    },
    {
      sectionTitle: "KEYMAN DATABASE",
      cardIndex: 3,
      type: "web",
      context: "Frontend Architecture, Web Development & Data Integration",
      mockupMode: "scroll",
      images: ["/keyman-db.png"],
      description:
        "Sales-lead intelligence platform for discovering decision-makers and contacts. Users search by company, title, or keywords; results are powered by Elasticsearch and fed by an automated crawling pipeline with data cleaning/normalization..",
      features: [
        "Fast full-text + faceted search",
        "Company/personnel profile pages",
        "Crawler-fed updates with data normalization",
        "Responsive UI and SEO-optimized architecture",
      ],
      role: "Frontend lead, collaborating across fullstack development, search optimization, and data integration.",
    },
    {
      sectionTitle: "PERSONAL PROJECTS",
      cardIndex: 4,
      type: "web",
      mockupMode: "swiper",
      context: "Collection of Side Projects",
      images: [
        "/project-1.png",
        "/project-2.png",
        "/project-3.png",
        "/project-4.png",
      ],
      description:
        "A collection of side projects exploring design, data, and everyday problem-solving through code. Each project blends design thinking, frontend craft, and data-driven functionality — small but thoughtful tools that make daily life a bit more organized.",
      features: [
        "Personal Website: Designed in Figma and vibe-coded into a responsive portfolio",
        "Blog Platform: Custom-built static blog for publishing and experimentation",
        "Q&A Archive: Crawled and preserved posts from a discontinued web service; cleaned data, indexed it with Algolia, and built a searchable front-end",
        "Inventory Management App: A lightweight inventory tool for a friend's pub — supports item logging, inventory history tracking, and automatic monthly summaries",
      ],
      role: "Built with React, Tailwind, and LeanCloud (MongoDB-like backend). Each project explores different aspects of frontend development, data processing, and user experience design.",
    },
  ];

  return (
    <section
      ref={containerRef}
      className={`relative h-[400vh] bg-gradient-to-b from-white to-black ${
        className ?? ""
      }`}
    >
      {/* Fixed Section Title */}
      <div className="font-anton text-[96px] z-[-1] px-6 text-center">
        <h2 className="text-white tracking-wider flex items-center justify-center gap-4">
          {/* <motion.span
            className="inline-block mix-blend-difference "
            style={{ x: selectedX, y: selectedY }}
          >
            SELECTED
          </motion.span> */}

          <motion.span
            className="inline-block mix-blend-difference "
            style={{ y: selectedY }}
          >
            SELECTED WORK
          </motion.span>
        </h2>
      </div>

      <div className="sticky top-0 h-screen relative flex items-center justify-center">
        {portfolioData.map((project, i) => {
          const start = i / portfolioData.length;
          const end = (i + 1) / portfolioData.length;
          const nextEnd = (i + 2) / portfolioData.length;

          // First card: stays in place, scales down as other cards come up
          // Other cards: move up from 100% to 0%
          const y =
            i === 0
              ? useTransform(scrollYProgress, [0, 1], ["0%", "0%"]) // First card doesn't move
              : useTransform(scrollYProgress, [start, end], ["100%", "0%"]); // Other cards move up

          // First card scales down as other cards appear
          const scale = useTransform(scrollYProgress, [end, nextEnd], [1, 0.9]); // Scale down from 1 to 0.9

          return (
            <PortfolioCard
              key={i}
              className="p-8"
              style={{ y, scale } as any}
              sectionTitle={project.sectionTitle}
              cardIndex={project.cardIndex}
              contentType={project.type}
              context={project.context}
              contentDescription={project.description}
              contentFeatures={project.features}
              role={project.role}
              images={project.images}
              mockupMode={project.mockupMode}
              actionButtons={project.actions || undefined}
            />
          );
        })}
      </div>
    </section>
  );
}
