export default function Footer({ className }: { className?: string }) {
  return (
    <footer
      className={`w-full sm:px-12 px-6 bg-black text-white ${className || ""}`}
    >
      {/* Divider */}
      <div className="w-full h-px bg-gray-300 "></div>

      {/* Footer content */}
      <div className="flex sm:justify-between items-center sm:py-8  p-4 sm:flex-row flex-col gap-1">
        <span className="font-mono">39.9171° N, 116.4373° E</span>
        <span className="text-gray-500 text-xs">
          © 2025 Jacy Li. All rights reserved.
        </span>
      </div>
    </footer>
  );
}
