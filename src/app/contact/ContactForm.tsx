"use client";

import {
  ContactButton,
  LinkedInIcon,
  MailIcon,
  GitHubIcon,
  InstagramIcon,
} from "@/components";
import { motion } from "framer-motion";
import { useState } from "react";
import emailjs from "@emailjs/browser";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState("");

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
        from_name: formData.name,
        from_email: formData.email,
        message: formData.message,
        to_email: "jacy.li@outlook.com",
      };

      // Send email using EmailJS
      await emailjs.send(serviceId, templateId, templateParams, publicKey);

      // Show success message
      setIsSubmitted(true);

      // Reset form after showing success message
      setTimeout(() => {
        setFormData({ name: "", email: "", message: "" });
        setIsSubmitted(false);
      }, 3000);
    } catch (err) {
      console.error("EmailJS error:", err);
      setError("Failed to send message. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
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
            If you're interested in working together, feel free to send me an
            email.
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
                className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-md"
              >
                <div className="flex items-center">
                  <svg
                    className="w-5 h-5 mr-2"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Message sent successfully! I'll get back to you soon.
                </div>
              </motion.div>
            )}

            <div className="flex justify-end">
              <button
                type="submit"
                disabled={isSubmitting}
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
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
}
