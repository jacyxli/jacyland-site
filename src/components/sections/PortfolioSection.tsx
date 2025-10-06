"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { PortfolioCard } from "@/components";
import { portfolioData } from "@/data/portfolio";

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

  // Create individual transforms for each card to avoid Rules of Hooks violations
  const card0Y = useTransform(scrollYProgress, [0, 1], ["0%", "0%"]);
  const card0Scale = useTransform(scrollYProgress, [1 / 3, 2 / 3], [1, 0.9]);

  const card1Y = useTransform(scrollYProgress, [1 / 3, 2 / 3], ["110%", "0%"]);
  const card1Scale = useTransform(scrollYProgress, [2 / 3, 1], [1, 0.9]);

  const card2Y = useTransform(scrollYProgress, [2 / 3, 1], ["110%", "0%"]);
  const card2Scale = useTransform(scrollYProgress, [1, 1], [1, 0.9]);

  const transforms = [
    { y: card0Y, scale: card0Scale },
    { y: card1Y, scale: card1Scale },
    { y: card2Y, scale: card2Scale },
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
          const { y, scale } = transforms[i];

          return (
            <PortfolioCard
              key={i}
              className="p-4 sm:p-8 absolute h-screen"
              style={
                { y, scale } as React.CSSProperties & { y: any; scale: any }
              }
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
