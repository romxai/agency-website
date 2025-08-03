"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Send, Mail, Phone, MapPin } from "lucide-react";
import { GradientHeading } from "@/components/ui/gradient-heading";
import dynamic from "next/dynamic";

// Import LightRays with SSR disabled
const LightRays = dynamic(() => import("@/components/ui/light-rays"), {
  ssr: false,
});

// A new component to wrap the contact information and form with the
// consistent styling and fading border.
const ContactCard = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className: string;
}) => (
  <div
    className={`bg-black rounded-2xl p-8 md:p-12 shadow-2xl border border-zinc-800 relative ${className}`}
  >
    {/* Gold fading border on the contact card */}
    <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#FFED99]/50 to-transparent"></div>
    <div className="absolute inset-y-0 right-0 w-px bg-gradient-to-b from-transparent via-[#FFED99]/50 to-transparent"></div>
    <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-[#FFED99]/50 to-transparent"></div>
    <div className="absolute inset-y-0 left-0 w-px bg-gradient-to-b from-transparent via-[#FFED99]/50 to-transparent"></div>
    {children}
  </div>
);

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitSuccess(true);
      setFormData({ name: "", email: "", message: "" });

      // Reset success message after 5 seconds
      setTimeout(() => {
        setSubmitSuccess(false);
      }, 5000);
    }, 1500);
  };

  return (
    <section id="contact" className="relative py-20 overflow-hidden bg-black">
      {/* LightRays Background - Left side */}
      <div className="absolute inset-0 z-0">
        {mounted && (
          <LightRays
            raysSpeed={1}
            lightSpread={3}
            rayLength={0.9}
            pulsating={false}
            fadeDistance={0.5}
            saturation={1}
            followMouse={false}
            mouseInfluence={0.1}
            noiseAmount={0.05}
            distortion={0}
            glowAmount={0}
            className="w-full h-full"
          />
        )}
      </div>

      {/* Top fading border with gold color */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#FFED99]/50 to-transparent"></div>

      <div className="container relative z-10">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <GradientHeading
            size="xl"
            weight="semi"
            variant="accent3"
            className="font-monesta-semibold leading-none mb-6"
          >
            Get In Touch
          </GradientHeading>
          <p className="text-lg text-zinc-500 font-red-hat-display max-w-2xl mx-auto">
            Ready to start your next project? We'd love to hear from you.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <ContactCard className="border-zinc-800 ">
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <Mail className="size-5 text-[#FFED99]/80 mt-1" />
                  <div>
                    <h3 className="font-semibold text-white">Email Us</h3>
                    <GradientHeading
                      size="xxxs"
                      weight="semi"
                      variant="accent2"
                      className="font-red-hat-display mb-3"
                    >
                      contact@devagency.com
                    </GradientHeading>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <Phone className="size-5 text-[#FFED99]/80 mt-1" />
                  <div>
                    <h3 className="font-semibold text-white">Call Us</h3>
                    <GradientHeading
                      size="xxxs"
                      weight="semi"
                      variant="accent2"
                      className="font-red-hat-display mb-3"
                    >
                      +91 750 600 7526
                    </GradientHeading>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <MapPin className="size-5 text-[#FFED99]/80 mt-1" />
                  <div>
                    <h3 className="font-semibold text-white">Visit Us</h3>
                    <GradientHeading
                      size="xxxs"
                      weight="semi"
                      variant="accent2"
                      className="font-red-hat-display mb-3"
                    >
                      123 Tech Street, San Francisco, CA 94105
                    </GradientHeading>
                  </div>
                </div>
              </div>
            </ContactCard>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <ContactCard className="border-zinc-800">
              {submitSuccess ? (
                <div className="bg-green-500/10 border border-green-500/30 text-green-400 p-4 rounded-md">
                  Thank you for your message! We'll get back to you soon.
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium mb-2 text-white"
                    >
                      Your Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 rounded-md border border-zinc-700 bg-white/9 text-white focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500"
                      placeholder="John Doe"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium mb-2 text-white"
                    >
                      Your Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 rounded-md border border-zinc-700 bg-white/9 text-white focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500"
                      placeholder="john@example.com"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="message"
                      className="block text-sm font-medium mb-2 text-white"
                    >
                      Your Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={5}
                      className="w-full px-4 py-2 rounded-md border border-zinc-700 bg-white/9 text-white focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500 resize-none"
                      placeholder="Tell us about your project..."
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-[#e7c95c]/80 text-black py-3 rounded-full hover:bg-[#e7c95c] transition-colors flex items-center justify-center font-semibold"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center">
                        <svg
                          className="animate-spin -ml-1 mr-2 h-4 w-4 text-black"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        Sending...
                      </span>
                    ) : (
                      <span className="flex items-center">
                        Send Message <Send className="ml-2 h-4 w-4" />
                      </span>
                    )}
                  </button>

                  {submitError && (
                    <div className="text-red-500 text-sm mt-2">
                      {submitError}
                    </div>
                  )}
                </form>
              )}
            </ContactCard>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
