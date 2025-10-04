"use client";

import { motion, MotionValue } from "framer-motion";
import { ReactNode } from "react";
import DeviceMockup from "./DeviceMockup";

interface PortfolioCardProps {
  // Optional header props
  sectionTitle?: string;
  cardIndex?: number;

  // Content props
  contentTitle: string;
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
  contentTitle,
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
      className={`absolute w-4/5 h-4/5 bg-white shadow-2xl rounded-2xl p-8 flex flex-col ${className}`}
    >
      {/* Header Section */}
      {(sectionTitle || cardIndex !== undefined) && (
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            {sectionTitle && (
              <h2 className="text-2xl font-bold text-gray-900 uppercase tracking-wide">
                {sectionTitle}
              </h2>
            )}
          </div>
          {cardIndex !== undefined && (
            <div className="text-4xl font-bold text-gray-900">
              {cardIndex.toString().padStart(2, "0")}
            </div>
          )}
        </div>
      )}

      {/* Separator Line */}
      {(sectionTitle || cardIndex !== undefined) && (
        <div className="w-full h-px bg-gray-300 mb-8"></div>
      )}

      {/* Main Content - Two Column Layout */}
      <div className="flex-1 flex">
        {/* Left Side - Device Mockup */}
        <div
          className={`w-1/2 pr-6 flex items-center justify-center ${
            contentType === "mobile" ? "py-16" : ""
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
          {/* Content Title */}
          <div>
            <h3 className="text-3xl font-bold text-gray-900 mb-2">
              {contentTitle}
            </h3>
            <div className="h-1 w-16 bg-blue-500 rounded"></div>
          </div>

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
