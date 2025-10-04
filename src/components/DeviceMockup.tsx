"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import Image from "next/image";
import phoneMockup from "@/assets/images/phone-mockup.png";
import browserMockup from "@/assets/images/browser-mockup.png";

interface DeviceMockupProps {
  type: "mobile" | "web";
  images: string[];
  mode?: "swiper" | "scroll";
  autoplay?: boolean;
  circular?: boolean;
}

export default function DeviceMockup({
  type,
  images,
  mode = "swiper",
  autoplay = true,
  circular = true,
}: DeviceMockupProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    if (mode !== "swiper" || images.length <= 1 || !autoplay) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => {
        const nextIndex = prevIndex + 1;
        if (circular) {
          return nextIndex % images.length;
        } else {
          // If not circular, stop at the last image
          return nextIndex >= images.length ? images.length - 1 : nextIndex;
        }
      });
    }, 3000); // Change image every 3 seconds

    return () => clearInterval(interval);
  }, [images.length, mode, autoplay, circular]);

  // Scroll animation effect
  useEffect(() => {
    if (mode !== "scroll" || !autoplay) return;

    const interval = setInterval(() => {
      setScrollY((prev) => {
        const nextScroll = prev + 0.5;
        if (circular) {
          // Stop at 50% instead of 100% so bottom of image aligns with bottom of viewport
          // Since image is 200% height, scrolling 50% moves it by 100% of viewport height
          return nextScroll % 50;
        } else {
          // If not circular, stop at 50% and don't loop
          return nextScroll >= 50 ? 50 : nextScroll;
        }
      });
    }, 50); // Smooth scroll animation

    return () => clearInterval(interval);
  }, [mode, autoplay, circular]);

  return (
    <div
      className={`relative flex items-center justify-center  ${
        type === "mobile" ? "h-full w-auto" : "w-full h-auto"
      }`}
    >
      {/* Device Mockup Container */}
      {/* Mockup Image */}
      <Image
        src={type === "mobile" ? phoneMockup : browserMockup}
        alt={`${type} mockup`}
        width={type === "mobile" ? 476 : 1640}
        height={type === "mobile" ? 966 : 1100}
        className={`${
          type === "mobile" ? "h-full w-auto" : "w-full h-auto"
        } z-[1] pointer-events-none`}
        priority
      />

      <div className="absolute inset-2 shadow-xl pointer-events-none"></div>

      {/* Content Area Overlay */}
      <div
        className={`absolute overflow-hidden ${
          type === "mobile"
            ? "inset-1 p-[2%] rounded-[32px]"
            : "inset-0 rounded-[5px] pt-[2%]"
        }`}
      >
        {/* Image Container */}
        <div className="relative w-full h-full overflow-hidden pointer-events-auto">
          {mode === "swiper" ? (
            // Swiper Mode
            <>
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
                      className="object-cover object-top"
                    />
                  </div>
                ))}
              </motion.div>

              {/* Dots Indicator */}
              {images.length > 1 && (
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                  {images.map((_, index) => (
                    <div
                      key={index}
                      className={`w-2 h-2 rounded-full transition-all duration-300 ${
                        index === currentIndex
                          ? "bg-white shadow-lg"
                          : "bg-white/50"
                      }`}
                    />
                  ))}
                </div>
              )}
            </>
          ) : (
            // Scroll Mode
            <div className="relative w-full h-full overflow-hidden">
              <div
                className="relative w-full"
                style={{
                  height: "200%", // Make container taller
                  transform: `translateY(-${scrollY}%)`,
                }}
              >
                <Image
                  src={images[0]} // Use only the first image
                  alt="Screenshot"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
