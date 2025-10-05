"use client";

import { footerTransition } from "@/utils/motion";
import {
  motion,
  useMotionValueEvent,
  useScroll,
  useTransform,
} from "framer-motion";
import { useRef } from "react";

export default function Footer({ className }: { className?: string }) {
  const footerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: footerRef,
    offset: ["start end", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    console.log("scrollYProgress:", latest);
  });

  // Footer animation values - trigger when footer comes into view
  const footerProgress = useTransform(scrollYProgress, [0.2, 1], [0, 1]);
  const tableRotate = useTransform(footerProgress, [0.4, 1], [180, 360]);
  const tableY = useTransform(footerProgress, [0.4, 1], [-4, 0]);
  const tableX = useTransform(footerProgress, [0.4, 1], [8, 0]);
  const armOpacity = useTransform(footerProgress, [0.3, 0.8], [0, 1]);
  const armRotate = useTransform(footerProgress, [0.3, 0.8], [90, 0]);

  const springRotate = useTransform(footerProgress, [0.6, 1], [180, 0]);
  const springOpacity = useTransform(footerProgress, [0.6, 1], [0, 1]);
  const springX = useTransform(footerProgress, [0.6, 1], [-20, 10]);
  const opacity = useTransform(footerProgress, [0.8, 1], [0, 1]);
  const scale = useTransform(footerProgress, [0.8, 1], [0, 1]);

  return (
    <footer
      ref={footerRef}
      className={`w-full relative bg-black text-white py-16 ${className ?? ""}`}
    >
      <div className="flex items-center justify-center gap-4">
        {/* Animated bear */}
        <span className="flex items-center gap-1 text-base font-mono font-bold">
          ʕ
          <motion.span
            className="arm inline-block origin-bottom-left"
            style={{ opacity: armOpacity, rotate: armRotate }}
            transition={footerTransition}
          >
            ノ
          </motion.span>
          •ᴥ•ʔ
          <motion.span
            className="arm inline-block origin-bottom-left"
            style={{ opacity: armOpacity, rotate: armRotate }}
            transition={footerTransition}
          >
            ノ
          </motion.span>
          <motion.span
            className="spring inline-block"
            style={{ rotate: springRotate, opacity: springOpacity, x: springX }}
            transition={footerTransition}
          >
            <span>︵</span>
          </motion.span>
          <motion.span
            className="table inline-block origin-left ml-4  text-sm"
            style={{
              rotate: tableRotate,
              y: tableY,
              x: tableX,
              opacity: opacity,
              scale,
            }}
            transition={footerTransition}
          >
            © 2025 Jacy Li. All rights reserved.
          </motion.span>
        </span>
      </div>
    </footer>
  );
}
