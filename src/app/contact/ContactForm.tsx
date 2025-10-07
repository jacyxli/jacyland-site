"use client";

import {
  ContactButton,
  LinkedInIcon,
  MailIcon,
  GitHubIcon,
  InstagramIcon,
} from "@/components";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import emailjs from "@emailjs/browser";
import { useRouter } from "next/navigation";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [countdown, setCountdown] = useState(10);
  const router = useRouter();

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    try {
      // EmailJS configuration from environment variables
      const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
      const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
      const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

      // Validate environment variables
      if (!serviceId || !templateId || !publicKey) {
        throw new Error(
          "EmailJS configuration is missing. Please check your environment variables."
        );
      }

      // Prepare template parameters
      const templateParams = {
        name: formData.name,
        email: formData.email,
        message: formData.message,
        to_email: "jacy.li@outlook.com",
      };

      // Send email using EmailJS
      await emailjs.send(serviceId, templateId, templateParams, publicKey);

      // Show success message
      setIsSubmitted(true);
      setCountdown(10);

      // Auto redirect after 10 seconds
      setTimeout(() => {
        router.push("/");
      }, 10000);
    } catch (err) {
      console.error("EmailJS error:", err);
      setError("Failed to send message. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Countdown timer effect
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isSubmitted && countdown > 0) {
      interval = setInterval(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isSubmitted, countdown]);

  const handleGoHome = () => {
    router.push("/");
  };

  return (
    <div className="w-full">
      <div className="grid grid-cols-1 md:grid-cols-2 items-start">
        {/* Left: Big heading */}
        <div className="sm:pr-24 pr-0 flex flex-col sm:items-end items-start justify-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="text-[56px] sm:text-[150px] font-anton leading-none sm:text-right text-center"
            style={{ willChange: "transform, opacity" }}
          >
            GET IN TOUCH
          </motion.div>
          <motion.p
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.5, ease: "easeOut" }}
            className="sm:text-lg text-base text-gray-400 sm:mt-8 mt-4 max-w-[340px] sm:text-right text-left"
          >
            If you&apos;re interested in working together, feel free to send me
            an email.
          </motion.p>
          <motion.div
            className="sm:mt-16 hidden sm:block flex sm:justify-end pr-2"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 1 }}
            style={{ willChange: "transform, opacity" }}
          >
            <div className="flex gap-4">
              <ContactButton
                href="mailto:jacy.li@outlook.com"
                icon={MailIcon}
                hoverText="EMAIL ME"
                theme="light"
              />
              <ContactButton
                href="https://www.linkedin.com/in/jacy-li/"
                icon={LinkedInIcon}
                theme="light"
              />
              <ContactButton
                href="https://github.com/jacyxli"
                icon={GitHubIcon}
                theme="light"
              />
              <ContactButton
                href="https://www.instagram.com/jacyxli/"
                icon={InstagramIcon}
                theme="light"
              />
            </div>
          </motion.div>
        </div>

        {/* Right: Contact form */}
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 1.5 }}
          className="bg-transparent sm:pr-12 pr-0 pt-12"
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm text-gray-400 mb-2">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                className="w-full bg-transparent border-b border-gray-600 text-black placeholder-gray-500 focus:border-black focus:outline-none py-2"
                placeholder="Your name"
                disabled={isSubmitted}
              />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-2">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                className="w-full bg-transparent border-b border-gray-600 text-black placeholder-gray-500 focus:border-black focus:outline-none py-2"
                placeholder="your@email.com"
                disabled={isSubmitted}
              />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-2">
                Message
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                required
                rows={6}
                className="w-full bg-transparent border-b border-gray-600 text-black placeholder-gray-500 focus:border-black focus:outline-none py-2 resize-none"
                placeholder="Type your message here..."
                disabled={isSubmitted}
              />
            </div>

            {/* Error message */}
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-red-500 text-sm"
              >
                {error}
              </motion.div>
            )}

            {/* Success message */}
            {isSubmitted && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="text-green-600"
              >
                {/* Success text */}
                <h3 className="text-base font-semibold mb-2">
                  Message sent successfully! I&apos;ll get back to you shortly
                  :)
                </h3>
              </motion.div>
            )}

            <div className="flex justify-end">
              {isSubmitted ? (
                <button
                  type="submit"
                  onClick={handleGoHome}
                  className="relative px-4 text-lg font-medium w-full rounded-md overflow-hidden group cursor-pointer bg-black text-white disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <div className="flex items-center justify-center py-2 transition-transform duration-300 group-hover:-translate-y-full">
                    Redirecting to Home in {countdown} seconds...
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center py-2 transition-transform duration-300 translate-y-full group-hover:translate-y-0">
                    Go Back to Home
                  </div>
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={isSubmitting || isSubmitted}
                  className="relative px-4 text-lg font-medium w-full rounded-md overflow-hidden group cursor-pointer bg-black text-white disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {/* Default state */}
                  <div className="flex items-center justify-center py-2 transition-transform duration-300 group-hover:-translate-y-full">
                    {isSubmitting ? "Sending..." : "Submit"}
                  </div>
                  {/* Hover state */}
                  <div className="absolute inset-0 flex items-center justify-center py-2 transition-transform duration-300 translate-y-full group-hover:translate-y-0">
                    {isSubmitting ? "Sending..." : "Submit"}
                  </div>
                </button>
              )}
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
}
