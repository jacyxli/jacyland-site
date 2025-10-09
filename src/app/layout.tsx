import type { Metadata } from "next";
import { Inter, Anton, Space_Mono } from "next/font/google";
import "./globals.css";
import { Nav, Footer } from "@/components";
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const anton = Anton({
  variable: "--font-anton",
  subsets: ["latin"],
  weight: "400",
});

const spaceMono = Space_Mono({
  variable: "--font-space-mono",
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: "Jacy Li",
  description:
    "Full-stack developer and designer crafting thoughtful digital experiences. Portfolio of Jacy Li.",
  keywords: [
    "Jacy Li",
    "Fullstack Engineer",
    "Product Consultant",
    "React Developer",
    "Kotlin Developer",
    "WeChat Mini-Program",
    "UI/UX Designer",
    "Portfolio",
  ],
  authors: [{ name: "Jacy Li" }],
  creator: "Jacy Li",
  openGraph: {
    title: "Jacy Li",
    description:
      "Full-stack developer and designer crafting thoughtful digital experiences. Portfolio of Jacy Li.",
    url: "https://jacy-li.com",
    siteName: "Jacy Li Portfolio",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Jacy Li",
    description:
      "Full-stack developer and designer crafting thoughtful digital experiences. Portfolio of Jacy Li.",
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${anton.variable} ${spaceMono.variable} antialiased overflow-x-hidden`}
      >
        <Nav />
        {children}
        <Footer className="z-40" />
      </body>
    </html>
  );
}
