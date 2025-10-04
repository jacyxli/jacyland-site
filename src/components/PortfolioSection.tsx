"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { ReactElement, useRef } from "react";
import PortfolioCard from "./PortfolioCard";

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
    sectionTitle?: string;
    cardIndex?: number;
    type: "mobile" | "web";
    images?: string[];
    description: string;
    features: string[];
    actions?: ReactElement;
  }> = [
    {
      sectionTitle: "CLASSPASS",
      cardIndex: 1,
      type: "mobile",
      images: [
        "/classpass-1.PNG",
        "/classpass-2.PNG",
        "/classpass-3.PNG",
        "/classpass-4.PNG",
      ],
      description:
        "A localized fitness booking experience designed for users in mainland China. Integrated with WeChat for easy account access, class discovery, and booking management — all tailored to local user habits and payment systems.",
      features: [
        "Real-time tracking",
        "Multiple payment methods",
        "Personalized recommendations",
        "Order history",
      ],
    },
    {
      sectionTitle: "WEB PLATFORMS",
      cardIndex: 2,
      type: "web",
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
      sectionTitle: "SAAS DASHBOARDS",
      cardIndex: 3,
      type: "web",
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
      <div className="sticky top-0 h-screen relative flex items-center justify-center">
        {portfolioData.map((project, i) => {
          const start = i / portfolioData.length;
          const end = (i + 1) / portfolioData.length;
          const nextEnd = (i + 2) / portfolioData.length;

          // First card: stays in place, scales down as other cards come up
          // Other cards: move up from 100% to 0%
          const y =
            i === 0
              ? useTransform(scrollYProgress, [0, 1], ["0%", "0%"]) // First card doesn't move
              : useTransform(scrollYProgress, [start, end], ["105%", "0%"]); // Other cards move up

          // First card scales down as other cards appear
          const scale = useTransform(scrollYProgress, [end, nextEnd], [1, 0.9]); // Scale down from 1 to 0.9

          return (
            <PortfolioCard
              key={i}
              className="inset-12"
              style={{ y, scale } as any}
              sectionTitle={project.sectionTitle}
              cardIndex={project.cardIndex}
              contentType={project.type}
              contentDescription={project.description}
              contentFeatures={project.features}
              images={project.images}
              mockupMode={i === 1 ? "scroll" : "swiper"}
              actionButtons={project.actions || undefined}
            />
          );
        })}
      </div>
    </section>
  );
}
