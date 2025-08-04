"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Quote, ChevronLeft, ChevronRight } from "lucide-react";
import { GradientHeading } from "@/components/ui/gradient-heading";
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

// Animation variants now use percentages for robust positioning
const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? "100%" : "-100%",
    opacity: 0,
  }),
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    zIndex: 0,
    x: direction < 0 ? "100%" : "-100%",
    opacity: 0,
  }),
};

const TestimonialsSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [mounted, setMounted] = useState(false);

  const paginate = (newDirection: number) => {
    setDirection(newDirection);
    setCurrentIndex((prevIndex) => {
      const nextIndex = prevIndex + newDirection;
      // Wrap around using modulo for seamless looping
      return (nextIndex + testimonials.length) % testimonials.length;
    });
  };

  // Auto-scrolling logic
  useEffect(() => {
    const scrollInterval = 7000;
    const interval = setInterval(() => paginate(1), scrollInterval);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Handler for swipe gesture
  const handleDragEnd = (e: any, { offset }: any) => {
    const swipeThreshold = 50; // Minimum drag distance to trigger a swipe
    if (offset.x < -swipeThreshold) {
      paginate(1); // Swipe left for next
    } else if (offset.x > swipeThreshold) {
      paginate(-1); // Swipe right for previous
    }
  };

  return (
    <section
      id="testimonials"
      className="relative py-12 sm:py-16 md:py-20 overflow-hidden bg-black"
    >
      {/* LightRays Background */}
      <div className="absolute inset-0 z-0">
        {mounted && (
          <LightRays
            raysOrigin="left"
            raysSpeed={1}
            lightSpread={3}
            rayLength={1}
            pulsating={false}
            fadeDistance={0.7}
            saturation={1}
            followMouse={true}
            mouseInfluence={0.1}
            noiseAmount={0.05}
            distortion={0}
            glowAmount={0}
            className="w-full h-full"
          />
        )}
        {!mounted && (
          <div className="w-full h-full bg-gradient-to-b from-primary/5 to-accent/10"></div>
        )}
      </div>
      <div className="absolute inset-0 z-0">
        {mounted && (
          <LightRays
            raysOrigin="right"
            raysSpeed={1}
            lightSpread={3}
            rayLength={1}
            pulsating={false}
            fadeDistance={0.7}
            saturation={1}
            followMouse={true}
            mouseInfluence={0.1}
            noiseAmount={0.05}
            distortion={0}
            glowAmount={0}
            className="w-full h-full"
          />
        )}
        {!mounted && (
          <div className="w-full h-full bg-gradient-to-b from-primary/5 to-accent/10"></div>
        )}
      </div>
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

        {/* Wrapper for arrows and carousel */}
        <div className="relative flex items-center justify-center">
          {/* Previous Arrow (Desktop Only) */}
          <button
            onClick={() => paginate(-1)}
            className="absolute left-0 z-20 hidden sm:flex items-center justify-center w-10 h-10 bg-white/5 rounded-full hover:bg-white/10 transition-colors duration-200 -translate-x-full"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="w-6 h-6 text-white/70" />
          </button>

          {/* Testimonial carousel */}
          <div className="w-full max-w-2xl sm:max-w-3xl mx-auto overflow-hidden">
            {/* MODIFIED: Added mode="wait" to fix the y-axis jump */}
            <AnimatePresence mode="wait" initial={false} custom={direction}>
              <motion.div
                key={currentIndex}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: "spring", stiffness: 300, damping: 30 },
                  opacity: { duration: 0.2 },
                }}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                onDragEnd={handleDragEnd}
                className="bg-black rounded-xl sm:rounded-2xl p-6 sm:p-8 md:p-12 shadow-2xl border border-[#FFED99]/20 relative cursor-grab active:cursor-grabbing"
              >
                {/* Borders and content remain unchanged */}
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

          {/* Next Arrow (Desktop Only) */}
          <button
            onClick={() => paginate(1)}
            className="absolute right-0 z-20 hidden sm:flex items-center justify-center w-10 h-10 bg-white/5 rounded-full hover:bg-white/10 transition-colors duration-200 translate-x-full"
            aria-label="Next testimonial"
          >
            <ChevronRight className="w-6 h-6 text-white/70" />
          </button>
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
