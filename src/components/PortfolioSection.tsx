"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export default function PortfolioSection({
  className,
}: {
  className?: string;
}) {
  const containerRef = useRef(null);

  // track scroll relative to PortfolioSection
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"], // full section watched
  });

  // Example: 3 cards
  const cards = ["One", "Two", "Three"];

  return (
    <section
      ref={containerRef}
      className={`relative h-[300vh] bg-black ${className ?? ""}`}
    >
      <div className="sticky top-0 h-screen flex items-center justify-center">
        {cards.map((card, i) => {
          const start = i / cards.length;
          const end = (i + 1) / cards.length;

          const y = useTransform(scrollYProgress, [start, end], ["100%", "0%"]);
          const opacity = useTransform(scrollYProgress, [start, end], [0, 1]);

          return (
            <motion.div
              key={i}
              style={{ y, opacity }}
              className="absolute w-3/4 h-3/4 bg-white shadow-2xl rounded-2xl flex items-center justify-center text-4xl font-bold"
            >
              {card}
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
