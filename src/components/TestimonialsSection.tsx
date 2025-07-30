"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";

// Sample testimonial data
const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "CEO, TechCorp",
    content:
      "Working with DevAgency transformed our digital presence. Their team delivered a stunning website and mobile app that exceeded our expectations.",
    company: "TechCorp",
  },
  {
    id: 2,
    name: "Michael Chen",
    role: "CTO, InnovateSoft",
    content:
      "The AI solution developed by DevAgency has automated our customer service operations, reducing costs by 40% while improving customer satisfaction.",
    company: "InnovateSoft",
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    role: "Product Manager, DataSystems",
    content:
      "DevAgency's attention to detail and commitment to quality is unmatched. They're true partners in our digital journey.",
    company: "DataSystems",
  },
];

const TestimonialsSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length
    );
  };

  return (
    <section className="py-20 bg-secondary/30" id="testimonials">
      <div className="container">
        <h2 className="text-3xl font-bold text-center mb-12">
          Client <span className="text-gradient">Testimonials</span>
        </h2>

        <div className="relative max-w-4xl mx-auto">
          {/* Navigation Buttons */}
          <button
            onClick={prevTestimonial}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-12 z-10 bg-background p-2 rounded-full border border-border"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>

          <button
            onClick={nextTestimonial}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-12 z-10 bg-background p-2 rounded-full border border-border"
            aria-label="Next testimonial"
          >
            <ChevronRight className="h-6 w-6" />
          </button>

          {/* Testimonials Carousel */}
          <div className="overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.5 }}
                className="dark-card rounded-xl p-8 md:p-12 border border-border"
              >
                <Quote className="h-12 w-12 text-primary/30 mb-6" />

                <p className="text-lg md:text-xl mb-8 italic text-foreground/90">
                  "{testimonials[currentIndex].content}"
                </p>

                <div className="flex items-center">
                  <div className="w-12 h-12 bg-secondary rounded-full flex items-center justify-center">
                    <span className="font-bold text-lg">
                      {testimonials[currentIndex].name.charAt(0)}
                    </span>
                  </div>
                  <div className="ml-4">
                    <h4 className="font-bold">
                      {testimonials[currentIndex].name}
                    </h4>
                    <p className="text-muted-foreground text-sm">
                      {testimonials[currentIndex].role}
                    </p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center mt-8 gap-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full transition-colors ${
                  index === currentIndex ? "bg-primary" : "bg-border"
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
