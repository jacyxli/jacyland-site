"use client";

import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { useRef } from "react";
import { PortfolioCard } from "@/components";
import { portfolioData } from "@/data/portfolio";

function SwapTitle() {
  const ref = useRef<HTMLDivElement | null>(null);

  // scroll setup
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const smooth = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 20,
  });

  const selectedX = useTransform(smooth, [0.1, 0.6], ["100vw", "0vw"]);
  const workX = useTransform(smooth, [0.1, 0.6], ["-100vw", "0vw"]);
  const opacity = useTransform(smooth, [0.5, 0.6], [0, 1]);

  return (
    <div ref={ref} className="relative w-full overflow-hidden">
      <div className="font-anton text-white text-5xl sm:text-8xl flex justify-center sm:gap-4 gap-2 items-center">
        {/* Selected: left → right */}
        <motion.h1 className="mix-blend-difference" style={{ opacity }}>
          /
        </motion.h1>

        <motion.h1
          style={{ x: selectedX }}
          className="whitespace-nowrap mix-blend-difference"
        >
          Selected
        </motion.h1>

        {/* Work: right → left */}
        <motion.h1
          style={{ x: workX }}
          className="whitespace-nowrap text-right mix-blend-difference"
        >
          Work
        </motion.h1>
        <motion.h1 className="mix-blend-difference" style={{ opacity }}>
          /
        </motion.h1>
      </div>
    </div>
  );
}

export default function PortfolioSection({
  className,
}: {
  className?: string;
}) {
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end end"], // full section watched
  });

  // Create all transforms at the top level
  const scale0 = useTransform(scrollYProgress, [0, 1 / 3], [1.1, 1]);
  const scale1 = useTransform(scrollYProgress, [1 / 3, 2 / 3], [1.1, 1]);
  const scale2 = useTransform(scrollYProgress, [2 / 3, 1], [1.1, 1]);

  const scales = [scale0, scale1, scale2];

  return (
    <section
      className={`relative section-container bg-gradient-to-b from-white to-black ${
        className ?? ""
      }`}
    >
      <SwapTitle />

      <div
        className={`relative sm:h-[300vh] hidden sm:block `}
        ref={containerRef}
      >
        {portfolioData.map((project, i) => {
          return (
            <motion.div
              key={i}
              style={{ scale: i === 0 ? 1 : scales[i] }}
              className="sticky top-0 h-screen w-full py-12"
            >
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
            </motion.div>
          );
        })}
      </div>

      <div className="sm:hidden relative gap-4 flex flex-col mt-8 box-border">
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
