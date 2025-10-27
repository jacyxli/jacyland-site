"use client";

import { useLocale } from "next-intl";
import dynamic from "next/dynamic";

// Dynamically import the ResumePDF component with no SSR
const ResumePDFEn = dynamic(() => import("@/components/ResumePDF"), {
  ssr: false,
});

const ResumePDFZH = dynamic(() => import("@/components/ResumePDFZH"), {
  ssr: false,
});

export default function ResumePage() {
  const locale = useLocale();

  return (
    <div className="w-full h-screen">
      {locale === "en" ? <ResumePDFEn /> : <ResumePDFZH />}
    </div>
  );
}
