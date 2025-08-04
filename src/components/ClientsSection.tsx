"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useMotionTemplate,
} from "framer-motion";
import { GradientHeading } from "@/components/ui/gradient-heading";

const clientLogos = [
  // Only one set is needed since fading is disabled.
  { name: "Apple", logo: "/svgs/apple-173-svgrepo-com.svg" },
  { name: "Google", logo: "/svgs/google-178-svgrepo-com.svg" },
  { name: "Microsoft", logo: "/svgs/microsoft-150-svgrepo-com.svg" },
  { name: "Amazon", logo: "/svgs/amazon-svgrepo-com.svg" },
  { name: "Netflix", logo: "/svgs/netflix-svgrepo-com.svg" },
  { name: "Tesla", logo: "/svgs/tesla-svgrepo-com.svg" },
];

// --- COMPONENT FOR CLIENT ICONS ---
const ClientIcon = ({ client }: { client: { name: string; logo: string } }) => {
  const [isMobile, setIsMobile] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 640); // Using sm breakpoint
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // MODIFIED: Changed the input range from [0.3, 0.7] to [0.4, 0.6] for a faster transition.
  const grayscale = useTransform(scrollYProgress, [0.4, 0.6], [1, 0]);
  const brightness = useTransform(scrollYProgress, [0.4, 0.6], [0.5, 1]);
  const filter = useMotionTemplate`grayscale(${grayscale}) brightness(${brightness})`;

  return (
    <div ref={ref} className="flex items-center justify-center p-2 sm:p-4">
      <motion.img
        src={client.logo}
        alt={client.name}
        // Apply animated style on mobile, and Tailwind classes for desktop hover.
        style={isMobile ? { filter } : {}}
        className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 object-contain filter grayscale brightness-50 transition-all duration-300 sm:group-hover:filter-none"
      />
    </div>
  );
};

const ClientsSection = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 640); // sm breakpoint
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Determine which logos to display based on screen size.
  const displayedLogos = isMobile ? clientLogos.slice(0, 4) : clientLogos;

  return (
    <section
      id="clients"
      className="relative py-12 sm:py-16 md:py-20 overflow-hidden bg-black"
    >
      <div className="absolute inset-0 z-0">
        <div className="w-full h-full bg-gradient-to-b from-primary/5 to-accent/10"></div>
      </div>

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
            Trusted By Industry Leaders
          </GradientHeading>
          <p className="text-base sm:text-lg text-zinc-500 font-red-hat-display max-w-2xl mx-auto px-4">
            Partnering with innovative companies worldwide
          </p>
        </motion.div>

        {/* Client Logos Grid */}
        <div className="group grid grid-cols-2 sm:grid-cols-3 gap-x-4 sm:gap-x-6 gap-y-8 sm:gap-y-12 md:gap-y-16">
          {displayedLogos.map((client) => (
            <ClientIcon key={client.name} client={client} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ClientsSection;
 