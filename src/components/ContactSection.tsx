"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Mail, Phone, MapPin } from "lucide-react";
import { GradientHeading } from "@/components/ui/gradient-heading";
import FormTooltip from "@/components/ui/form-tooltip";
import SuccessMessage from "@/components/ui/success-message";
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
    className={`bg-black rounded-xl sm:rounded-2xl p-6 sm:p-8 md:p-12 shadow-2xl border border-zinc-800 relative ${className}`}
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

  const [errors, setErrors] = useState<{
    name?: string;
    email?: string;
    message?: string;
  }>({});

  const [touched, setTouched] = useState({
    name: false,
    email: false,
    message: false,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Validation functions
  const validateField = (name: string, value: string): string | undefined => {
    switch (name) {
      case "name":
        if (!value.trim()) return "Name is required";
        if (value.trim().length < 2)
          return "Name must be at least 2 characters";
        return undefined;
      case "email":
        if (!value.trim()) return "Email is required";
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value.trim()))
          return "Please enter a valid email address";
        return undefined;
      case "message":
        if (!value.trim()) return "Message is required";
        if (value.trim().length < 10)
          return "Message must be at least 10 characters";
        return undefined;
      default:
        return undefined;
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear error when user starts typing
    if (errors[name as keyof typeof errors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleBlur = (name: string) => {
    setTouched((prev) => ({ ...prev, [name]: true }));
    const error = validateField(name, formData[name as keyof typeof formData]);
    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate all fields
    const newErrors: typeof errors = {};
    Object.keys(formData).forEach((key) => {
      const error = validateField(key, formData[key as keyof typeof formData]);
      if (error) {
        newErrors[key as keyof typeof errors] = error;
      }
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setTouched({
        name: true,
        email: true,
        message: true,
      });
      return;
    }

    setIsSubmitting(true);
    setSubmitError("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setSubmitSuccess(true);
        setFormData({ name: "", email: "", message: "" });
        setErrors({});
        setTouched({ name: false, email: false, message: false });

        // Reset success message after 8 seconds
        setTimeout(() => {
          setSubmitSuccess(false);
        }, 8000);
      } else {
        setSubmitError(data.error || "Something went wrong. Please try again.");
      }
    } catch (error) {
      setSubmitError(
        "Network error. Please check your connection and try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="contact"
      className="relative py-12 sm:py-16 md:py-20 overflow-hidden bg-black"
    >
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
          className="text-center mb-12 sm:mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <GradientHeading
            size="lg"
            weight="semi"
            variant="accent3"
            className="font-monesta-semibold leading-none mb-4 sm:mb-6 text-2xl sm:text-3xl md:text-4xl lg:text-5xl"
          >
            Get In Touch
          </GradientHeading>
          <p className="text-base sm:text-lg text-zinc-500 font-red-hat-display max-w-2xl mx-auto px-4">
            Ready to start your next project? We'd love to hear from you.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-20">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="space-y-6 sm:space-y-8"
          >
            <ContactCard className="border-zinc-800">
              <div className="space-y-4 sm:space-y-6">
                <div className="flex items-start space-x-3 sm:space-x-4">
                  <Mail className="size-4 sm:size-5 text-[#FFED99]/80 mt-1" />
                  <div>
                    <h3 className="font-semibold text-white text-sm sm:text-base">
                      Email Us
                    </h3>
                    <GradientHeading
                      size="xxxs"
                      weight="semi"
                      variant="accent2"
                      className="font-red-hat-display mb-2 sm:mb-3 text-xs sm:text-sm"
                    >
                      dwaynesilvapinto@gmail.com
                    </GradientHeading>
                  </div>
                </div>

                <div className="flex items-start space-x-3 sm:space-x-4">
                  <Phone className="size-4 sm:size-5 text-[#FFED99]/80 mt-1" />
                  <div>
                    <h3 className="font-semibold text-white text-sm sm:text-base">
                      Call Us
                    </h3>
                    <GradientHeading
                      size="xxxs"
                      weight="semi"
                      variant="accent2"
                      className="font-red-hat-display mb-2 sm:mb-3 text-xs sm:text-sm"
                    >
                      +91 750 600 7526
                    </GradientHeading>
                  </div>
                </div>

                <div className="flex items-start space-x-3 sm:space-x-4">
                  <MapPin className="size-4 sm:size-5 text-[#FFED99]/80 mt-1" />
                  <div>
                    <h3 className="font-semibold text-white text-sm sm:text-base">
                      Visit Us
                    </h3>
                    <GradientHeading
                      size="xxxs"
                      weight="semi"
                      variant="accent2"
                      className="font-red-hat-display mb-2 sm:mb-3 text-xs sm:text-sm"
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
              <AnimatePresence mode="wait">
                {submitSuccess ? (
                  <SuccessMessage message="Thank you for reaching out! We've received your message and will get back to you as soon as possible." />
                ) : (
                  <form
                    onSubmit={handleSubmit}
                    className="space-y-4 sm:space-y-6"
                  >
                    <div className="relative">
                      <label
                        htmlFor="name"
                        className="block text-xs sm:text-sm font-medium mb-2 text-white"
                      >
                        Your Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        onBlur={() => handleBlur("name")}
                        className={`w-full px-3 py-2 sm:px-4 sm:py-2 rounded-md border bg-white/9 text-white focus:outline-none focus:ring-1 text-sm sm:text-base transition-colors ${
                          errors.name && touched.name
                            ? "border-red-500/50 focus:border-red-500 focus:ring-red-500"
                            : "border-zinc-700 focus:border-amber-500 focus:ring-amber-500"
                        }`}
                        placeholder="John Doe"
                      />
                      <FormTooltip
                        message={errors.name || ""}
                        type="error"
                        isVisible={!!(errors.name && touched.name)}
                        position="bottom"
                      />
                    </div>

                    <div className="relative">
                      <label
                        htmlFor="email"
                        className="block text-xs sm:text-sm font-medium mb-2 text-white"
                      >
                        Your Email
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        onBlur={() => handleBlur("email")}
                        className={`w-full px-3 py-2 sm:px-4 sm:py-2 rounded-md border bg-white/9 text-white focus:outline-none focus:ring-1 text-sm sm:text-base transition-colors ${
                          errors.email && touched.email
                            ? "border-red-500/50 focus:border-red-500 focus:ring-red-500"
                            : "border-zinc-700 focus:border-amber-500 focus:ring-amber-500"
                        }`}
                        placeholder="john@example.com"
                      />
                      <FormTooltip
                        message={errors.email || ""}
                        type="error"
                        isVisible={!!(errors.email && touched.email)}
                        position="bottom"
                      />
                    </div>

                    <div className="relative">
                      <label
                        htmlFor="message"
                        className="block text-xs sm:text-sm font-medium mb-2 text-white"
                      >
                        Your Message
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        onBlur={() => handleBlur("message")}
                        rows={4}
                        className={`w-full px-3 py-2 sm:px-4 sm:py-2 rounded-md border bg-white/9 text-white focus:outline-none focus:ring-1 resize-none text-sm sm:text-base transition-colors ${
                          errors.message && touched.message
                            ? "border-red-500/50 focus:border-red-500 focus:ring-red-500"
                            : "border-zinc-700 focus:border-amber-500 focus:ring-amber-500"
                        }`}
                        placeholder="Tell us about your project..."
                      />
                      <FormTooltip
                        message={errors.message || ""}
                        type="error"
                        isVisible={!!(errors.message && touched.message)}
                        position="bottom"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-[#e7c95c]/80 text-black py-2.5 sm:py-3 rounded-full hover:bg-[#e7c95c] transition-colors flex items-center justify-center font-semibold text-sm sm:text-base disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? (
                        <span className="flex items-center">
                          <svg
                            className="animate-spin -ml-1 mr-2 h-3 w-3 sm:h-4 sm:w-4 text-black"
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
                          Send Message{" "}
                          <Send className="ml-2 h-3 w-3 sm:h-4 sm:w-4" />
                        </span>
                      )}
                    </button>

                    {submitError && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-red-500/10 border border-red-500/30 text-red-400 p-3 rounded-md text-xs sm:text-sm"
                      >
                        {submitError}
                      </motion.div>
                    )}
                  </form>
                )}
              </AnimatePresence>
            </ContactCard>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
