"use client";

import { usePathname } from "next/navigation";
import { Nav, Footer } from "@/components";

interface ConditionalLayoutProps {
  children: React.ReactNode;
}

export default function ConditionalLayout({
  children,
}: ConditionalLayoutProps) {
  const pathname = usePathname();
  const isResumePage = pathname === "/resume";

  return (
    <>
      {!isResumePage && <Nav />}
      {children}
      {!isResumePage && <Footer className="z-40" />}
    </>
  );
}
