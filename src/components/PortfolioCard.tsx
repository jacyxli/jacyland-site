"use client";

import { motion, MotionValue } from "framer-motion";
import { ReactNode } from "react";
import DeviceMockup from "./DeviceMockup";
import SectionHead from "./SectionHead";

// Animated dot component with drop and bounce effect
const AnimatedDot = () => {
  return (
    <motion.div
      className="w-2 h-2 bg-blue-500 rounded-full"
      initial={{ y: -10, opacity: 0 }}
      animate={{
        y: 0,
        opacity: 1,
        scale: [1, 1.2, 1],
      }}
      transition={{
        duration: 0.6,
        ease: "easeOut",
        scale: {
          duration: 0.3,
          times: [0, 0.5, 1],
          ease: "easeOut",
        },
      }}
    />
  );
};

interface PortfolioCardProps {
  // Optional header props
  sectionTitle?: string;
  cardIndex?: number;

  // Content props
  contentType: "mobile" | "web";
  context: string;
  contentDescription: string;
  contentFeatures: string[];
  role: string;
  images?: string[];
  mockupMode?: "swiper" | "scroll";

  // Slots
  actionButtons?: ReactNode; // Action button slot

  // Animation props
  style?:
    | React.CSSProperties
    | { y?: MotionValue<string>; scale?: MotionValue<number> };
  className?: string;
}

export default function PortfolioCard({
  sectionTitle,
  cardIndex,
  contentType,
  context,
  contentDescription,
  contentFeatures,
  role,
  images,
  mockupMode = "swiper",
  actionButtons,
  style,
  className = "",
}: PortfolioCardProps) {
  return (
    <motion.div
      style={style}
      className={`absolute bg-white shadow-2xl rounded-2xl p-8 sm:p-16 flex flex-col justify-between ${className}`}
    >
      {/* Header Section */}
      {(sectionTitle || cardIndex !== undefined) && (
        <>
          <SectionHead
            title={sectionTitle || ""}
            showDivider={false}
            showAnimation={false}
            rightSlot={
              cardIndex !== undefined
                ? cardIndex.toString().padStart(2, "0")
                : undefined
            }
          />
          <div className="w-full h-px bg-gray-900 mt-4 my-8" />
        </>
      )}

      {/* Main Content - Two Column Layout */}
      <div className="flex-1 flex overflow-hidden">
        {/* Conditional Layout: Mobile (text left, mockup right) vs Web (mockup left, text right) */}
        {contentType === "mobile" ? (
          <>
            {/* Mobile: Text Left (3/4 width) */}
            <div className="w-3/4 pr-6 flex flex-col justify-start space-y-6">
              {/* Content Title */}
              <div className="text-sm font-bold text-gray-500">{context}</div>

              {/* Description */}
              <p className="text-lg leading-relaxed">{contentDescription}</p>

              {/* Key Features */}
              <ul className="space-y-1">
                {contentFeatures.map((feature, index) => (
                  <li
                    key={index}
                    className="flex items-center text-lg space-x-3"
                  >
                    <div className="w-2 h-2 bg-black rounded-full"></div>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              {/* Role/Contribution */}
              <div className="space-y-1">
                <h4 className="text-lg font-semibold">My Role</h4>
                <p className="text-lg leading-relaxed">{role}</p>
              </div>

              {/* Action Buttons Slot */}
              {actionButtons && (
                <div className="flex space-x-4 pt-4">{actionButtons}</div>
              )}
            </div>

            {/* Mobile: Mockup Right (1/3 width) */}
            <div className="w-1/4 pl-6 flex items-center justify-start">
              <DeviceMockup
                type={contentType}
                images={images || []}
                mode={mockupMode}
              />
            </div>
          </>
        ) : (
          <>
            {/* Web: Mockup Left */}
            <div className="w-1/2 flex items-center justify-start">
              <DeviceMockup
                type={contentType}
                images={images || []}
                mode={mockupMode}
              />
            </div>

            {/* Web: Text Right */}
            <div className="w-1/2  pl-6 pl-6 flex flex-col justify-start space-y-6">
              {/* Content Title */}
              <div className="text-sm font-bold text-gray-500">{context}</div>

              {/* Description */}
              <p className="text-lg leading-relaxed">{contentDescription}</p>

              {/* Key Features */}
              <ul className="space-y-1">
                {contentFeatures.map((feature, index) => (
                  <li
                    key={index}
                    className="flex items-center text-lg space-x-3"
                  >
                    <div className="w-2 h-2 bg-black rounded-full"></div>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              {/* Role/Contribution */}
              <div className="space-y-1">
                <h4 className="text-lg font-semibold">My Role</h4>
                <p className="text-lg leading-relaxed">{role}</p>
              </div>

              {/* Action Buttons Slot */}
              {actionButtons && (
                <div className="flex space-x-4 pt-4">{actionButtons}</div>
              )}
            </div>
          </>
        )}
      </div>
    </motion.div>
  );
}
