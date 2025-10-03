"use client";

import dynamic from "next/dynamic";

// Dynamically import the ResumePDF component with no SSR
const ResumePDF = dynamic(() => import("@/components/ResumePDF"), {
  ssr: false,
});

export default function ResumePage() {
  return (
    <div className="w-full h-screen">
      <ResumePDF />
    </div>
  );
}
