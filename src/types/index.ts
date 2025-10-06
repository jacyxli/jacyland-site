// Shared types and interfaces for the portfolio site

export interface BaseSectionProps {
  className?: string;
}

export interface PortfolioItem {
  sectionTitle?: string;
  cardIndex?: number;
  type: "mobile" | "web";
  context: string;
  description: string;
  features: string[];
  role: string;
  images?: string[];
  link?: string;
  actions?: React.ReactElement;
  mockupMode: "swiper" | "scroll";
}

export interface DeviceMockupProps {
  type: "mobile" | "web";
  images: string[];
  mode?: "swiper" | "scroll";
  autoplay?: boolean;
  circular?: boolean;
}

export interface ContactButtonProps {
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  hoverText?: string;
  animationDirection?: "x" | "y";
  size?: "sm" | "md" | "lg";
}

export interface MotionPProps {
  children: React.ReactNode;
  duration?: number;
  delay?: number;
  className?: string;
  as?: "p" | "div";
}

export interface SectionHeadProps {
  title: string;
  subtitle?: string;
  className?: string;
}
