import { Metadata } from "next";
import ContactForm from "./ContactForm";

export const metadata: Metadata = {
  title: "Contact - Jacy Li",
  description:
    "Get in touch with Jacy Li for fullstack development, product consulting, and collaboration opportunities. Let's build something awesome together.",
  openGraph: {
    title: "Contact - Jacy Li",
    description:
      "Get in touch with Jacy Li for fullstack development and product consulting",
    url: "https://jacy-li.com/contact",
  },
};

export default function ContactPage() {
  return (
    <section className="min-h-[100svh] section-container w-full text-black bg-white">
      <ContactForm />
    </section>
  );
}
