"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Quote } from "lucide-react";
import { GradientHeading } from "@/components/ui/gradient-heading"; // Assuming path is corrected for the project
import dynamic from "next/dynamic";

// Import LightRays with SSR disabled
const LightRays = dynamic(() => import("@/components/ui/light-rays"), {
  ssr: false,
});

// Sample testimonial data
const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "CEO, TechCorp",
    content:
      "Working with DevAgency transformed our digital presence. Their team delivered a stunning website and mobile app that exceeded our expectations.",
  },
  {
    id: 2,
    name: "Michael Chen",
    role: "CTO, InnovateSoft",
    content:
      "The AI solution developed by DevAgency has automated our customer service operations, reducing costs by 40% while improving customer satisfaction.",
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    role: "Product Manager, DataSystems",
    content:
      "DevAgency's attention to detail and commitment to quality is unmatched. They're true partners in our digital journey.",
  },
];

const TestimonialsSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [mounted, setMounted] = useState(false);

  // Function to move to the next testimonial
  const nextTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };

  // Auto-scrolling logic using useEffect and setInterval
  useEffect(() => {
    // Set the auto-scroll interval (e.g., 5 seconds)
    const scrollInterval = 7000;
    const interval = setInterval(nextTestimonial, scrollInterval);

    // Clean up the interval when the component unmounts
    return () => clearInterval(interval);
  }, [currentIndex]); // The effect re-runs when the current index changes to reset the timer

  // Mount the component on the client-side to render LightRays
  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <section
      id="testimonials"
      className="relative py-12 sm:py-16 md:py-20 overflow-hidden bg-black"
    >
      {/* LightRays Background - Left side */}

      <div className="absolute inset-0 z-0">
        {mounted && (
          <LightRays
            raysOrigin="left"
            raysSpeed={1}
            lightSpread={2}
            rayLength={1}
            pulsating={false}
            fadeDistance={0.6}
            saturation={1}
            followMouse={true}
            mouseInfluence={0.1}
            noiseAmount={0.05}
            distortion={0}
            glowAmount={0.05}
            className="w-full h-full"
          />
        )}
      </div>

      {/* LightRays Background - Right side */}
      <div className="absolute inset-0 z-0">
        {mounted && (
          <LightRays
            raysOrigin="right"
            raysSpeed={1}
            lightSpread={2}
            rayLength={1}
            pulsating={false}
            fadeDistance={0.6}
            saturation={1}
            followMouse={true}
            mouseInfluence={0.1}
            noiseAmount={0.05}
            distortion={0}
            glowAmount={0.05}
            className="w-full h-full"
          />
        )}
        {/* Fallback for when not mounted */}
        {!mounted && (
          <div className="w-full h-full bg-gradient-to-b from-primary/5 to-accent/10"></div>
        )}
      </div>

      {/* Top fading border with gold color */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#FFED99]/50 to-transparent"></div>

      <div className="container relative z-10">
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
            Client Testimonials
          </GradientHeading>
          <p className="text-base sm:text-lg text-zinc-500 font-red-hat-display max-w-2xl mx-auto px-4">
            What our amazing clients are saying about our work.
          </p>
        </motion.div>

        {/* Testimonial carousel with horizontal slide animation */}
        <div className="max-w-2xl sm:max-w-3xl mx-auto overflow-hidden px-4">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 50 }} // Slide in from the right
              animate={{ opacity: 1, x: 0 }} // Slide to the center
              exit={{ opacity: 0, x: -50 }} // Slide out to the left
              transition={{ duration: 0.5 }}
              className="bg-black rounded-xl sm:rounded-2xl p-6 sm:p-8 md:p-12 shadow-2xl border border-[#FFED99]/20 relative"
            >
              {/* Gold fading border on the testimonial card */}
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#FFED99]/50 to-transparent"></div>
              <div className="absolute inset-y-0 right-0 w-px bg-gradient-to-b from-transparent via-[#FFED99]/50 to-transparent"></div>
              <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-[#FFED99]/50 to-transparent"></div>
              <div className="absolute inset-y-0 left-0 w-px bg-gradient-to-b from-transparent via-[#FFED99]/50 to-transparent"></div>

              <div className="text-center">
                <Quote className="h-8 w-8 sm:h-10 sm:w-10 text-[#FFED99]/60 mx-auto mb-4 sm:mb-6" />
                <p className="text-base sm:text-lg md:text-xl font-light italic leading-relaxed text-zinc-300">
                  "{testimonials[currentIndex].content}"
                </p>
              </div>

              <div className="mt-6 sm:mt-8 flex flex-col items-center">
                <div className="h-12 w-12 sm:h-14 sm:w-14 flex items-center justify-center rounded-full bg-zinc-700 text-[#FFED99]/60 font-bold text-lg sm:text-xl ring-2 ring-[#FFED99]/50">
                  {testimonials[currentIndex].name.charAt(0)}
                </div>
                <div className="mt-3 sm:mt-4 text-center">
                  <h4 className="font-semibold text-base sm:text-lg text-white">
                    {testimonials[currentIndex].name}
                  </h4>
                  <p className="text-xs sm:text-sm text-zinc-400">
                    {testimonials[currentIndex].role}
                  </p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Dots Indicator */}
        <div className="flex justify-center mt-8 sm:mt-12 gap-2">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full transition-all duration-300 ${
                index === currentIndex
                  ? "bg-[#FFED99]/60 w-4 sm:w-6"
                  : "bg-zinc-600"
              }`}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
