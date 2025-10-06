"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import Image from "next/image";
import phoneMockup from "@/assets/images/phone-mockup.png";

interface MobileMockupProps {
  images: string[];
  className?: string;
}

export default function MobileMockup({
  images,
  className = "",
}: MobileMockupProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (images.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => {
        const nextIndex = prevIndex + 1;
        return nextIndex % images.length;
      });
    }, 3000); // Change image every 3 seconds

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div
      className={`relative flex items-center justify-center ${className ?? ""}`}
      style={{ aspectRatio: "952/1932" }} // Actual phone mockup aspect ratio
    >
      {/* Device Mockup Container */}
      {/* Mockup Image */}
      <Image
        src={phoneMockup}
        alt="mobile mockup"
        className="z-[1] pointer-events-none w-full h-full object-contain"
        priority
        style={{ aspectRatio: "952/1932" }}
      />

      {/* Content Area Overlay */}
      <div className="absolute overflow-hidden inset-[1%] p-[2%] rounded-[12px] sm:rounded-[32px]">
        {/* Image Container */}
        <div className="relative w-full h-full overflow-hidden pointer-events-auto">
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
                  className="object-contain object-top"
                />
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
