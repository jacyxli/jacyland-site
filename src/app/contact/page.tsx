import { Metadata } from "next";
import SendIcon from "@/components/icons/SendIcon";

export const metadata: Metadata = {
  title: "Contact",
};

export default function ContactPage() {
  return (
    <section className="min-h-[80vh] w-full bg-gray-900 text-white">
      <div className="mx-auto max-w-7xl px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
          {/* Left: Big heading */}
          <div className="pt-2">
            <h1 className="text-5xl sm:text-7xl font-bold leading-tight">
              Contact me
            </h1>
            <p className="mt-6 text-gray-300 max-w-prose">
              Have a project, collaboration, or opportunity in mind? Drop a
              message and I’ll get back to you.
            </p>
          </div>

          {/* Right: Contact form (moved from ContactSection) */}
          <div className="bg-transparent">
            <h2 className="text-xl font-medium mb-6">Send a message</h2>
            <form className="space-y-6">
              <div>
                <label className="block text-sm text-gray-400 mb-2">Name</label>
                <input
                  type="text"
                  className="w-full bg-transparent border-b border-gray-600 text-white placeholder-gray-500 focus:border-white focus:outline-none py-2"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  className="w-full bg-transparent border-b border-gray-600 text-white placeholder-gray-500 focus:border-white focus:outline-none py-2"
                  placeholder="your@email.com"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-2">
                  Message
                </label>
                <textarea
                  rows={5}
                  className="w-full bg-transparent border-b border-gray-600 text-white placeholder-gray-500 focus:border-white focus:outline-none py-2 resize-none"
                  placeholder="Type your message here..."
                />
              </div>
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="relative w-16 h-16 rounded-full border-2 border-white overflow-hidden group cursor-pointer"
                >
                  <div className="absolute inset-0 flex items-center justify-center bg-transparent text-white">
                    <SendIcon />
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center bg-white text-black transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left">
                    <SendIcon />
                  </div>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
