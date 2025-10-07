import { Metadata } from "next";
import ContactForm from "./ContactForm";

export const metadata: Metadata = {
  title: "Contact",
};

export default function ContactPage() {
  return (
    <section className="min-h-[100svh] section-container w-full text-black bg-white">
      <ContactForm />
    </section>
  );
}
