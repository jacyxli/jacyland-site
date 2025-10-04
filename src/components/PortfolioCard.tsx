"use client";

import { motion, MotionValue } from "framer-motion";
import { ReactNode } from "react";
import DeviceMockup from "./DeviceMockup";
import SectionHead from "./SectionHead";

interface PortfolioCardProps {
  // Optional header props
  sectionTitle?: string;
  cardIndex?: number;

  // Content props
  contentType: "mobile" | "web";
  contentDescription: string;
  contentFeatures: string[];
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
  contentDescription,
  contentFeatures,
  images,
  mockupMode = "swiper",
  actionButtons,
  style,
  className = "",
}: PortfolioCardProps) {
  return (
    <motion.div
      style={style}
      className={`absolute bg-white shadow-2xl rounded-2xl p-8 sm:p-16 flex flex-col ${className}`}
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
      <div className="flex-1 flex overflow-hidden ">
        {/* Left Side - Device Mockup */}
        <div
          className={`w-1/2 pr-6 flex items-center justify-center ${
            contentType === "mobile" ? "" : ""
          }`}
        >
          <DeviceMockup
            type={contentType}
            images={images || []}
            mode={mockupMode}
          />
        </div>

        {/* Right Side - Text Content */}
        <div className="w-1/2 pl-6 flex flex-col justify-center space-y-6">
          {/* Content Description */}
          <p className="text-gray-600 text-lg leading-relaxed">
            {contentDescription}
          </p>

          {/* Content Features */}
          <div className="space-y-3">
            <h4 className="text-xl font-semibold text-gray-800">
              Key Features
            </h4>
            <ul className="space-y-2">
              {contentFeatures.map((feature, index) => (
                <li key={index} className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span className="text-gray-600">{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Action Buttons Slot */}
          {actionButtons && (
            <div className="flex space-x-4 pt-4">{actionButtons}</div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
