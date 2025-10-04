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
    offset: ["start end", "end end"], // full section watched
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
          const nextEnd = (i + 2) / cards.length;

          // First card: stays in place, scales down as other cards come up
          // Other cards: move up from 100% to 0%
          const y =
            i === 0
              ? useTransform(scrollYProgress, [0, 1], ["0%", "0%"]) // First card doesn't move
              : useTransform(scrollYProgress, [start, end], ["100%", "0%"]); // Other cards move up

          // First card scales down as other cards appear
          const scale = useTransform(scrollYProgress, [end, nextEnd], [1, 0.9]); // Scale down from 1 to 0.8

          return (
            <motion.div
              key={i}
              style={{ y, scale }}
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
