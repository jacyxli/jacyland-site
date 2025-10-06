"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import Image from "next/image";
import browserMockup from "@/assets/images/browser-mockup.png";

interface WebMockupProps {
  images: string[];
  scroll?: boolean;
  className?: string;
}

export default function WebMockup({
  images = [],
  scroll = false,
  className = "",
}: WebMockupProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    if (scroll) {
      const scrollInterval = setInterval(() => {
        setScrollY((prev) => {
          const nextScroll = prev + 0.3;
          if (nextScroll >= 50) {
            // Pause at bottom for 1 second before resetting
            setTimeout(() => {
              setScrollY(0);
            }, 500);
            return 50; // Stay at bottom during pause
          }
          return nextScroll;
        });
      }, 50); // Smooth scroll animation

      return () => clearInterval(scrollInterval);
    } else if (images.length <= 1) return;
    else {
      const interval = setInterval(() => {
        setCurrentIndex((prevIndex) => {
          const nextIndex = prevIndex + 1;
          return nextIndex % images.length;
        });
      }, 3000); // Change image every 3 seconds

      return () => clearInterval(interval);
    }
  }, [images.length, scroll]);
  return (
    <div
      className={`relative flex items-center justify-center ${className ?? ""}`}
      style={{ aspectRatio: "3024/2044", width: "100%" }}
    >
      {/* Content Area */}
      <div className="absolute top-[2%] inset-0 overflow-hidden rounded-[5px]">
        {scroll ? (
          // Scroll Mode
          <div className="relative w-full h-full overflow-hidden">
            <div
              style={{
                height: "200%", // Make container taller for scroll effect
                transform: `translateY(-${scrollY}%)`,
              }}
              className="relative w-full"
            >
              <Image
                src={images[0]} // Use only the first image
                alt="Screenshot"
                fill
                className="object-cover object-top"
              />
            </div>
          </div>
        ) : (
          // Swiper Mode
          <div className="relative w-full h-full overflow-hidden">
            <motion.div
              className="flex h-full"
              animate={{ x: -currentIndex * 100 + "%" }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
            >
              {images.map((image, index) => (
                <div
                  key={index}
                  className="w-full h-full flex-shrink-0 relative"
                  style={{ minWidth: "100%" }}
                >
                  <Image
                    src={image}
                    alt={`Screenshot ${index + 1}`}
                    fill
                    className="object-contain"
                  />
                </div>
              ))}
            </motion.div>
          </div>
        )}
      </div>

      {/* Browser Mockup Overlay */}
      <Image
        src={browserMockup}
        alt="browser mockup"
        className="z-[1] pointer-events-none w-full h-full object-contain"
        priority
        style={{ aspectRatio: "3024/2044" }}
      />
    </div>
  );
}
