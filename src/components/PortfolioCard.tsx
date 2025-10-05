"use client";

import { motion, MotionValue } from "framer-motion";
import { ReactNode } from "react";
import DeviceMockup from "./DeviceMockup";
import MobileMockup from "./MobileMockup";
import SectionHead from "./SectionHead";

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
    <div className={` box-border w-full ${className}`}>
      <motion.div
        style={style}
        className="w-full h-full bg-white shadow-2xl rounded-2xl py-8 px-4 sm:p-16 flex flex-col justify-between "
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
            <div className="w-full h-px bg-gray-900 mt-0 mb-2 sm:mb-8 sm:mt-4" />
          </>
        )}

        {/* Main Content - Two Column Layout */}
        <div
          className={`flex-1 flex flex-col overflow-hidden gap-2 sm:gap-6 ${
            contentType === "mobile" ? "sm:flex-row-reverse" : "sm:flex-row"
          }`}
        >
          <div className="flex justify-center sm:min-w-1/3 h-[40vh] sm:h-full">
            {contentType === "mobile" ? (
              <MobileMockup images={images || []} className="h-full w-auto" />
            ) : (
              <DeviceMockup
                type={contentType}
                images={images || []}
                mode={mockupMode}
              />
            )}
          </div>

          <div className="flex flex-col justify-start gap-4 sm:gap-6">
            {/* Content Title */}
            <div className="text-xs sm:text-sm font-bold text-gray-500">
              {context}
            </div>

            {/* Description */}
            <p className="sm:text-lg text-base sm:leading-relaxed leading-normal">
              {contentDescription}
            </p>

            {/* Key Features */}
            <ul className="sm:space-y-1 space-y-0 list-disc pl-4">
              {contentFeatures.map((feature, index) => (
                <li key={index} className="sm:text-lg text-base">
                  {feature}
                </li>
              ))}
            </ul>

            {/* Role/Contribution */}
            <div className="sm:space-y-1 space-y-0">
              <h4 className="sm:text-lg text-base font-semibold">My Role</h4>
              <p className="sm:text-lg text-base sm:leading-relaxed leading-normal">
                {role}
              </p>
            </div>

            {/* Action Buttons Slot */}
            {actionButtons && (
              <div className="flex space-x-4 pt-4">{actionButtons}</div>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
