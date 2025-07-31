"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Quote } from "lucide-react";
import { GradientHeading } from "./ui/gradient-heading";

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

  return (
    <section
      className="py-20 relative font-sans"
      id="testimonials"
      style={{
        backgroundImage: "url('/polygon-scatter-haikei.svg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Background Overlay */}
      <div className="absolute inset-0 bg-background/40"></div>

      <div className="relative z-10 max-w-4xl mx-auto text-center">
        <GradientHeading
          size="xl"
          weight="semi"
          variant="accent1"
          className="font-monesta-semibold leading-none mb-14"
        >
          Client Testimonials
        </GradientHeading>

        {/* Testimonial card with animation */}
        <div className="overflow-hidden ">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.5 }}
              className="bg-gray-900/20 text-white rounded-xl p-8 md:p-12 shadow-2xl"
            >
              <div className="text-center">
                <Quote className="h-10 w-10 text-gray-700 mx-auto mb-6" />
                <p className="text-lg md:text-xl font-light italic leading-relaxed text-gray-300">
                  "{testimonials[currentIndex].content}"
                </p>
              </div>

              <div className="mt-8 flex flex-col items-center">
                <div className="h-14 w-14 flex items-center justify-center rounded-full bg-amber-600 text-white font-bold text-xl ring-2 ring-amber-500">
                  {testimonials[currentIndex].name.charAt(0)}
                </div>
                <div className="mt-4 text-center">
                  <h4 className="font-semibold text-lg text-white">
                    {testimonials[currentIndex].name}
                  </h4>
                  <p className="text-sm text-gray-400">
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
                index === currentIndex ? "bg-amber-500 w-6" : "bg-gray-600"
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
