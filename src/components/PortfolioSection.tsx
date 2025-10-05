"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { ReactElement, useRef } from "react";
import PortfolioCard from "./PortfolioCard";
import MotionP from "./MotionP";

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

  const selectedWorkX = useTransform(
    selectedWorkScrollYProgress,
    [0, 0.9],
    ["100vw", "0vw"]
  );

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
    link?: string;
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
      context: "Product Concept, Design & Development",
      mockupMode: "swiper",
      images: ["/Yanji-1.PNG", "/Yanji-2.PNG", "/Yanji-3.PNG", "/Yanji-4.PNG"],
      description:
        "A customized WeChat-based product catalog with an integrated admin system, built for a climbing-hold brand to showcase collections and manage product information across web and mobile.",
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
      context: "Web Development & Data Integration",
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
      link: "https://keyman-db.smart-letter.com/",
    },
  ];

  return (
    <section
      ref={containerRef}
      className={`relative sm:h-[400vh] sm:pb-32 pb-24 bg-gradient-to-b from-white to-black ${
        className ?? ""
      }`}
    >
      {/* Fixed Section Title */}
      <motion.div className="font-anton sm:text-[96px] text-3xl pl-6 overflow-hidden">
        SELECTED WORK /
      </motion.div>

      <div className="hidden sm:block sticky top-0 h-screen relative flex items-center justify-center">
        {portfolioData.map((project, i) => {
          const start = i / portfolioData.length;
          const end = (i + 1) / portfolioData.length;
          const nextEnd = (i + 2) / portfolioData.length;

          // First card: stays in place, scales down as other cards come up
          // Other cards: move up from 100% to 0%
          const y =
            i === 0
              ? useTransform(scrollYProgress, [0, 1], ["0%", "0%"]) // First card doesn't move
              : useTransform(scrollYProgress, [start, end], ["110%", "0%"]); // Other cards move up

          // First card scales down as other cards appear
          const scale = useTransform(scrollYProgress, [end, nextEnd], [1, 0.9]); // Scale down from 1 to 0.9

          return (
            <PortfolioCard
              key={i}
              className="p-4 sm:p-8 absolute h-screen"
              style={{ y, scale } as any}
              sectionTitle={project.sectionTitle}
              cardIndex={project.cardIndex}
              contentType={project.type}
              context={project.context}
              contentDescription={project.description}
              contentFeatures={project.features}
              role={project.role}
              images={project.images}
              link={project.link}
              mockupMode={project.mockupMode}
              actionButtons={project.actions || undefined}
            />
          );
        })}
      </div>

      <div className="sm:hidden relative gap-4 flex flex-col mt-8">
        {portfolioData.map((project, i) => {
          return (
            <PortfolioCard
              key={i}
              className="px-4 sm:p-8 relative"
              sectionTitle={project.sectionTitle}
              cardIndex={project.cardIndex}
              contentType={project.type}
              context={project.context}
              contentDescription={project.description}
              contentFeatures={project.features}
              role={project.role}
              images={project.images}
              link={project.link}
              mockupMode={project.mockupMode}
              actionButtons={project.actions || undefined}
            />
          );
        })}
      </div>
    </section>
  );
}
