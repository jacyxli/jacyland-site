"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import DeviceMockup from "./DeviceMockup";

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

  // Portfolio data
  const portfolioData: Array<{
    type: "mobile" | "web";
    title: string;
    images?: string[];
    description: string;
    features: string[];
  }> = [
    {
      type: "mobile",
      title: "Food Delivery App",
      images: [
        "/classpass-1.PNG",
        "/classpass-2.PNG",
        "/classpass-3.PNG",
        "/classpass-4.PNG",
      ],
      description:
        "A modern food delivery application with real-time tracking, multiple payment options, and personalized recommendations.",
      features: [
        "Real-time tracking",
        "Multiple payment methods",
        "Personalized recommendations",
        "Order history",
      ],
    },
    {
      type: "web",
      title: "E-commerce Platform",
      images: [
        "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1556742111-a301076d9d18?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1556742111-a301076d9d18?w=800&h=600&fit=crop",
      ],
      description:
        "A comprehensive e-commerce solution with advanced filtering, wishlist functionality, and secure checkout process.",
      features: [
        "Advanced filtering",
        "Wishlist functionality",
        "Secure checkout",
        "Inventory management",
      ],
    },
    {
      type: "web",
      title: "SaaS Dashboard",
      images: [
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop",
      ],
      description:
        "A powerful SaaS dashboard with analytics, user management, and customizable widgets for business insights.",
      features: [
        "Analytics dashboard",
        "User management",
        "Customizable widgets",
        "Real-time notifications",
      ],
    },
  ];

  return (
    <section
      ref={containerRef}
      className={`relative h-[300vh] bg-black ${className ?? ""}`}
    >
      <div className="sticky top-0 h-screen flex items-center justify-center">
        {portfolioData.map((project, i) => {
          const start = i / portfolioData.length;
          const end = (i + 1) / portfolioData.length;
          const nextEnd = (i + 2) / portfolioData.length;

          // First card: stays in place, scales down as other cards come up
          // Other cards: move up from 100% to 0%
          const y =
            i === 0
              ? useTransform(scrollYProgress, [0, 1], ["0%", "0%"]) // First card doesn't move
              : useTransform(scrollYProgress, [start, end], ["100%", "0%"]); // Other cards move up

          // First card scales down as other cards appear
          const scale = useTransform(scrollYProgress, [end, nextEnd], [1, 0.9]); // Scale down from 1 to 0.9

          return (
            <motion.div
              key={i}
              style={{ y, scale }}
              className="absolute w-4/5 h-4/5 bg-white shadow-2xl rounded-2xl p-8 flex"
            >
              {/* Left Side - Device Mockup */}
              <div
                className={`w-1/2 pr-6 flex items-center justify-center ${
                  project.type === "mobile" ? "py-16" : ""
                }`}
              >
                <DeviceMockup
                  type={project.type}
                  images={project.images || []}
                  mode={i === 1 ? "scroll" : "swiper"}
                />
              </div>

              {/* Right Side - Content */}
              <div className="w-1/2 pl-6 flex flex-col justify-center space-y-6">
                <div>
                  <h3 className="text-3xl font-bold text-gray-900 mb-2">
                    {project.title}
                  </h3>
                  <div className="h-1 w-16 bg-blue-500 rounded"></div>
                </div>

                <p className="text-gray-600 text-lg leading-relaxed">
                  {project.description}
                </p>

                <div className="space-y-3">
                  <h4 className="text-xl font-semibold text-gray-800">
                    Key Features
                  </h4>
                  <ul className="space-y-2">
                    {project.features.map((feature, index) => (
                      <li key={index} className="flex items-center space-x-3">
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        <span className="text-gray-600">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex space-x-4 pt-4">
                  <button className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
                    View Project
                  </button>
                  <button className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                    View Code
                  </button>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
