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
    const scrollInterval = 5000;
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
      className="relative py-20 overflow-hidden bg-black"
    >
      {/* LightRays Background - Left side */}
      <div className="absolute inset-0 z-0">
        {mounted && (
          <LightRays
            raysSpeed={1}
            lightSpread={3}
            rayLength={0.9}
            pulsating={false}
            fadeDistance={0.4}
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
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-amber-500/50 to-transparent z-20"></div>

      <div className="container relative z-10">
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
            Client Testimonials
          </GradientHeading>
          <p className="text-lg text-zinc-500 font-red-hat-display max-w-2xl mx-auto">
            What our amazing clients are saying about our work.
          </p>
        </motion.div>

        {/* Testimonial carousel with fade animation */}
        <div className="max-w-3xl mx-auto overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="bg-zinc-900 rounded-2xl p-8 md:p-12 shadow-2xl border border-zinc-800"
            >
              <div className="text-center">
                <Quote className="h-10 w-10 text-zinc-600 mx-auto mb-6" />
                <p className="text-lg md:text-xl font-light italic leading-relaxed text-zinc-300">
                  "{testimonials[currentIndex].content}"
                </p>
              </div>

              <div className="mt-8 flex flex-col items-center">
                <div className="h-14 w-14 flex items-center justify-center rounded-full bg-zinc-700 text-amber-500 font-bold text-xl ring-2 ring-amber-500">
                  {testimonials[currentIndex].name.charAt(0)}
                </div>
                <div className="mt-4 text-center">
                  <h4 className="font-semibold text-lg text-white">
                    {testimonials[currentIndex].name}
                  </h4>
                  <p className="text-sm text-zinc-400">
                    {testimonials[currentIndex].role}
                  </p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Dots Indicator */}
        <div className="flex justify-center mt-12 gap-2">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                index === currentIndex ? "bg-amber-500 w-6" : "bg-zinc-600"
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
