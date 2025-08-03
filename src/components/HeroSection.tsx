"use client";

import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import Link from "next/link";
import dynamic from "next/dynamic";
import { useState, useEffect, MouseEvent } from "react";
import { GradientHeading } from "@/components/ui/gradient-heading";
import { ShimmerButton } from "@/components/magicui/shimmer-button";
import Image from "next/image";

// Import LightRays with SSR disabled
const LightRays = dynamic(() => import("@/components/ui/light-rays"), {
  ssr: false,
});

const HeroSection = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // --- MODIFIED ROTATION LOGIC ---
  const mouseY = useMotionValue(0);

  // MODIFIED: The output range is now flipped and reduced for the new effect.
  // Top of screen (-0.5) => 55deg, Bottom of screen (0.5) => 35deg.
  const rotateZ = useTransform(mouseY, [-0.5, 0.5], [55, 35]);

  const rotate = useSpring(rotateZ, { stiffness: 150, damping: 70, mass: 0.5 });

  const handleMouseMove = (e: MouseEvent<HTMLElement>) => {
    const y = e.clientY / window.innerHeight - 0.5;
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseY.set(0); // Resets to the center (45deg)
  };

  return (
    <section
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16"
    >
      {/* LightRays Background */}
      <div className="absolute inset-0 z-0 bg-black">
        {mounted && (
          <LightRays
            raysOrigin="top-left"
            raysSpeed={0.5}
            lightSpread={20}
            rayLength={1.1}
            pulsating={false}
            fadeDistance={0.4}
            saturation={0.6}
            followMouse={false}
            mouseInfluence={0}
            noiseAmount={0.05}
            distortion={0.02}
            glowAmount={0.1}
            className="w-full h-full"
          />
        )}
        {!mounted && (
          <div className="w-full h-full bg-gradient-to-b from-primary/5 to-accent/10"></div>
        )}
      </div>
      {/* Content */}
      <div className="container relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          <motion.div
            className="max-w-4xl text-left flex-1"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <GradientHeading
                size="xxxl"
                weight="semi"
                variant="default"
                className="font-monesta-semibold leading-none mb-0"
              >
                Your Vision <br />
                Perfected
              </GradientHeading>
            </motion.div>

            <motion.div
              className="mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <p className="text-xl md:text-xl text-muted-foreground mb-2 font-red-hat-display">
                Building great technology should be exciting, not complicated.
              </p>
              <p className="text-lg md:text-lg text-muted-foreground font-red-hat-display">
                We build high-performance websites, software, and AI solutions
                for ambitious brands.
              </p>
            </motion.div>

            <motion.div
              className="flex flex-col sm:flex-row gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <ShimmerButton
                className="bg-secondary text-secondary-foreground font-red-hat-display"
                shimmerColor="#eed36f"
                background="rgb(13, 13, 13)"
                borderRadius="100px"
              >
                <Link
                  href="#contact"
                  className="block w-full h-full text-[#eed36f]"
                >
                  Contact Us
                </Link>
              </ShimmerButton>
              <Link
                href="/portfolio"
                className="bg-primary text-primary-foreground px-6 py-3 rounded-full hover:text-[#d3d3d3] hover:underline transition-colors font-red-hat-display"
              >
                View Portfolio
              </Link>
            </motion.div>
          </motion.div>

          {/* Shape Image */}
          <motion.div
            className="flex-shrink-0 mb-20"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 0.75, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <motion.div style={{ rotate }}>
              <Image
                src="/shape-gold.png"
                alt="Shape"
                width={400}
                height={400}
                className="w-90 h-90 lg:w-110 lg:h-110"
                priority
              />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
