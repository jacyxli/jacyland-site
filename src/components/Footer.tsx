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
  const tableY = useTransform(footerProgress, [0.4, 1], [-4, -20]);
  const tableX = useTransform(footerProgress, [0.4, 1], [8, 16]);
  const armOpacity = useTransform(footerProgress, [0, 0.5], [0, 1]);
  const armRotate = useTransform(footerProgress, [0, 0.5], [90, 0]);

  const springRotate = useTransform(footerProgress, [0.4, 1], [180, 0]);
  const springOpacity = useTransform(footerProgress, [0.4, 1], [0, 1]);
  const springX = useTransform(footerProgress, [0.4, 1], [-20, 10]);
  const opacity = useTransform(footerProgress, [0.8, 1], [0, 1]);
  const scale = useTransform(footerProgress, [0.8, 1], [0, 1]);

  return (
    <footer
      ref={footerRef}
      className={`w-full z-30 relative h-screen bg-white text-black text-center flex items-center justify-center ${
        className ?? ""
      }`}
    >
      <span className="flex items-center gap-2 text-4xl font-bold">
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
          className="table inline-block origin-left"
          style={{
            rotate: tableRotate,
            y: tableY,
            x: tableX,
          }}
          transition={footerTransition}
        >
          ┻━┻
        </motion.span>
        <motion.span className="inline-block" style={{ opacity, scale }}>
          <h2 className="ml-20 font-bold">Thanks for scrolling!</h2>
        </motion.span>
      </span>
    </footer>
  );
}
