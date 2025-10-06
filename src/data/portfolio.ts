import { PortfolioItem } from "@/types";

export const portfolioData: PortfolioItem[] = [
  {
    sectionTitle: "CLASSPASS CHINA",
    cardIndex: 1,
    type: "mobile",
    context: "WeChat Mini-Program & Web Development",
    images: [
      "/classpass-1.PNG",
      "/classpass-2.PNG",
      "/classpass-3.PNG",
      "/classpass-4.PNG",
      "/classpass-5.PNG",
    ],
    mockupMode: "swiper",
    description:
      "A localized fitness booking experience designed for users in mainland China. Integrated with WeChat for seamless access, class discovery, and booking management — all tailored to local user habits and payment systems.",
    features: [
      "Discover and book fitness classes",
      "Manage memberships and packages",
      "WeChat Pay integration",
      "Workout calendar & User Reviews",
    ],
    role: "Feature owner responsible for end-to-end development as part of the ClassPass China engineering team.",
  },
  {
    sectionTitle: "YANJI WECHAT MINI-PROGRAM",
    cardIndex: 2,
    type: "mobile",
    context: "Product Concept, Design & Development",
    mockupMode: "swiper",
    images: ["/Yanji-1.PNG", "/Yanji-2.PNG", "/Yanji-3.PNG", "/Yanji-4.PNG"],
    description:
      "A customized WeChat-based product catalog with an integrated admin system, built for a climbing-hold brand to showcase collections and manage product information across web and mobile.",
    features: [
      "Configurable product list and detail pages",
      "Filter, search, and sort for product discovery",
      "Customer service integration and feedback handling",
      "Admin dashboard for product and content management",
    ],
    role: "Sole designer-engineer, driving product definition, UX design, and fullstack development through launch.",
  },
  {
    sectionTitle: "KEYMAN DATABASE",
    cardIndex: 3,
    type: "web",
    context: "Web Development & Data Integration",
    mockupMode: "scroll",
    images: ["/keyman-db.png"],
    description:
      "Sales-lead intelligence platform for discovering decision-makers and contacts. Users search by company, title, or keywords; results are powered by Elasticsearch and fed by an automated crawling pipeline with data cleaning/normalization.",
    features: [
      "Fast full-text + faceted search",
      "Company/personnel profile pages",
      "Crawler-fed updates with data normalization",
      "Responsive UI and SEO-optimized architecture",
    ],
    role: "Frontend lead, collaborating across fullstack development, search optimization, and data integration.",
    link: "https://keyman-db.smart-letter.com/",
  },
];
