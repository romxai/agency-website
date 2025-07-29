"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import dynamic from "next/dynamic";
import { useState, useEffect } from "react";

// Import LightRays with SSR disabled to prevent "document is not defined" error
const LightRays = dynamic(
  () => import("@/components/blocks/Backgrounds/LightRays/LightRays"),
  { ssr: false }
);

const HeroSection = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      {/* LightRays Background */}
      <div className="absolute inset-0 z-0">
        {mounted && (
          <LightRays
            raysOrigin="top-center"
            raysColor="#3b82f6" // primary color
            raysSpeed={0.5}
            lightSpread={1.2}
            rayLength={1.5}
            pulsating={false}
            fadeDistance={0.8}
            saturation={0.6}
            followMouse={false}
            mouseInfluence={0}
            noiseAmount={0.05}
            distortion={0}
            className="w-full h-full"
          />
        )}
        {!mounted && (
          <div className="w-full h-full bg-gradient-to-b from-primary/5 to-accent/10"></div>
        )}
      </div>

      {/* Content */}
      <div className="container relative z-10">
        <motion.div
          className="max-w-3xl mx-auto text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.h1
            className="text-4xl md:text-6xl font-bold mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            We Build <span className="text-gradient">Digital Experiences</span>{" "}
            That Drive Results
          </motion.h1>

          <motion.p
            className="text-lg md:text-xl text-muted-foreground mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Premium software development agency specializing in web
            applications, mobile apps, AI agents, and UX/UI design.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <Link
              href="/portfolio"
              className="bg-primary text-primary-foreground px-6 py-3 rounded-md hover:bg-primary/90 transition-colors"
            >
              View Portfolio
            </Link>
            <Link
              href="#contact"
              className="bg-secondary text-secondary-foreground px-6 py-3 rounded-md hover:bg-secondary/90 transition-colors"
            >
              Contact Us
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
