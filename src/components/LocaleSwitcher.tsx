"use client";

import { useLocale } from "next-intl";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

type Props = { className?: string };

const LocaleSwitcher = ({ className }: Props) => {
  const locale = useLocale();
  const router = useRouter();

  const switchLocale = (newLocale: string) => {
    console.log("switchLocale", newLocale);
    // only switch locale if newLocale differs from current locale
    if (newLocale !== locale) {
      document.cookie = `locale=${newLocale}; path=/; max-age=31536000`;
      router.refresh();
    }
  };

  return (
    <div className={className ?? ""}>
      <div className="relative flex h-10 w-32 items-center justify-between rounded-full bg-white/90 p-1 shadow-md backdrop-blur-sm overflow-hidden">
        {/* Highlight background */}
        <motion.div
          layoutId="locale-highlight"
          className="absolute top-1 left-1 h-8 w-[calc(50%-0.25rem)] rounded-full bg-gray-900 z-0"
          initial={false}
          animate={{
            x: locale === "en" ? "0%" : "100%",
          }}
          transition={{
            type: "spring",
            stiffness: 500,
            damping: 30,
          }}
        />

        {/* EN button */}
        <button
          onClick={() => switchLocale("en")}
          className={`cursor-pointer flex-1 z-10 h-full rounded-full text-sm font-medium transition-colors duration-200 ${
            locale === "en" ? "text-white" : "text-gray-600 hover:text-gray-900"
          }`}
        >
          EN
        </button>

        {/* ZH button */}
        <button
          onClick={() => switchLocale("zh")}
          className={`cursor-pointer flex-1 z-10 h-full rounded-full text-sm font-medium transition-colors duration-200 ${
            locale === "zh" ? "text-white" : "text-gray-600 hover:text-gray-900"
          }`}
        >
          中文
        </button>
      </div>
    </div>
  );
};

export default LocaleSwitcher;
