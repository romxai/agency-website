"use client";

import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import Link from "next/link";
import dynamic from "next/dynamic";
import { useState, useEffect, MouseEvent } from "react";
import { GradientHeading } from "@/components/ui/gradient-heading";
import { ShimmerButton } from "@/components/magicui/shimmer-button";
import Image from "next/image";

/*
  ## Responsive Changes Made:
  
  1.  **Disabled Mouse Effects on Mobile:**
      - Added an `isMobile` state that checks the window width.
      - The `onMouseMove` and `onMouseLeave` event handlers for the image rotation are now only attached on non-mobile devices (width > 768px). This improves performance and user experience on touch screens.

  2.  **Adjusted Layout for Mobile:**
      - The main content area now uses `text-center lg:text-left` to center-align text on mobile for better readability when stacked.
      - The image is now placed *first* in the DOM and uses `lg:order-last` to ensure it appears on the right for large screens, but stacks cleanly on top for mobile views.

  3.  **Responsive Spacing:**
      - The `gap` between the text and image content is reduced on mobile and increases on larger screens (`gap-8 lg:gap-16`).
      - The image's margin is adjusted to be smaller on mobile (`mb-8 lg:mb-20`), preventing excessive empty space.
      - The top padding of the whole section is also responsive (`pt-24 lg:pt-16`).

  4.  **Responsive Image Sizing:**
      - The image now uses standard Tailwind CSS size classes that scale up with screen size (`w-64 h-64` on mobile up to `lg:w-96 lg:h-96` on desktop).

  5.  **Responsive Typography:**
      - The paragraph text sizes now have a clearer scale, starting smaller on mobile and increasing on medium screens (`text-lg md:text-xl` and `text-base md:text-lg`).
*/

// Import LightRays with SSR disabled
const LightRays = dynamic(() => import("@/components/ui/light-rays"), {
  ssr: false,
});

const HeroSection = () => {
  const [mounted, setMounted] = useState(false);
  // State to determine if the device is mobile, for disabling mouse effects
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setMounted(true);

    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile(); // Check on initial mount
    window.addEventListener("resize", checkMobile); // Check on resize
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const mouseY = useMotionValue(0);
  const rotateZ = useTransform(mouseY, [-0.5, 0.5], [55, 35]);
  const rotate = useSpring(rotateZ, { stiffness: 150, damping: 70, mass: 0.5 });

  const handleMouseMove = (e: MouseEvent<HTMLElement>) => {
    // Don't run the effect on mobile devices
    if (isMobile) return;
    const y = e.clientY / window.innerHeight - 0.5;
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    if (isMobile) return;
    mouseY.set(0);
  };

  return (
    <section
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16 sm:pt-20 md:pt-24 lg:pt-16"
    >
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

      <div className="container relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-6 sm:gap-8 lg:gap-16">
          {/* Image is now first in the DOM for mobile stacking, but appears last on lg screens */}
          <motion.div
            className="flex-shrink-0 mb-6 sm:mb-8 lg:mb-20 lg:order-last"
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
                className="w-48 h-48 sm:w-64 sm:h-64 md:w-80 md:h-80 lg:w-96 lg:h-96"
                priority
              />
            </motion.div>
          </motion.div>

          <motion.div
            className="max-w-4xl text-center lg:text-left flex-1"
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
                size="xl"
                weight="semi"
                variant="default"
                className="font-monesta-semibold leading-none mb-0 text-3xl sm:text-4xl md:text-5xl lg:text-6xl"
              >
                Your Vision <br />
                Perfected
              </GradientHeading>
            </motion.div>

            <motion.div
              className="my-4 sm:my-6 md:my-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <p className="text-base sm:text-lg md:text-xl text-muted-foreground mb-2 font-red-hat-display">
                Building great technology should be exciting, not complicated.
              </p>
              <p className="text-sm sm:text-base md:text-lg text-muted-foreground font-red-hat-display">
                We build high-performance websites, software, and AI solutions
                for ambitious brands.
              </p>
            </motion.div>

            <motion.div
              className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <ShimmerButton
                className="bg-secondary text-secondary-foreground font-red-hat-display text-sm sm:text-base"
                shimmerColor="#eed36f"
                background="rgb(13, 13, 13)"
                borderRadius="100px"
              >
                <Link
                  href="#contact"
                  className="block w-full h-full text-[#eed36f] px-4 py-2 sm:px-6 sm:py-3"
                >
                  Contact Us
                </Link>
              </ShimmerButton>
              <Link
                href="/portfolio"
                className="bg-primary text-primary-foreground px-4 py-2 sm:px-6 sm:py-3 rounded-full hover:text-[#d3d3d3] hover:underline transition-colors font-red-hat-display text-sm sm:text-base text-center"
              >
                View Portfolio
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
