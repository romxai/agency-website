"use client";

import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import { useState, useEffect } from "react";
import { GradientHeading } from "@/components/ui/gradient-heading";
import { ShimmerButton } from "@/components/magicui/shimmer-button";
import Image from "next/image";
import { Calendar } from "lucide-react";

// Import LightRays with SSR disabled to prevent "document is defined" error
const LightRays = dynamic(() => import("@/components/ui/light-rays"), {
  ssr: false,
});

// A reusable card wrapper for consistent hover effects.
// It only provides the motion and hover glow, preserving the children's layout.
const InteractiveCard = ({ children, className }: { children: React.ReactNode; className: string }) => (
  <motion.div
    className={`group relative ${className}`}
    whileHover={{ scale: 1.02, y: -5 }}
    transition={{ duration: 0.2, ease: "easeOut" }}
  >
    {/* Animated gradient border glow that appears on hover.
        It uses multiple radial gradients to create a glow from the center of each side,
        which fades towards the corners, as requested. */}
    <div
      className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
      style={{
        background: `
          radial-gradient(400px circle at 50% 0%, rgba(255, 237, 153, 0.3), transparent 40%),
          radial-gradient(400px circle at 50% 100%, rgba(255, 237, 153, 0.3), transparent 40%),
          radial-gradient(400px circle at 0% 50%, rgba(255, 237, 153, 0.3), transparent 40%),
          radial-gradient(400px circle at 100% 50%, rgba(255, 237, 153, 0.3), transparent 40%)
        `,
      }}
      aria-hidden="true"
    />
    {children}
  </motion.div>
);

const SolutionsSection = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <section className="relative py-20 overflow-hidden bg-black top-fading-border">
      {/* LightRays Background */}
      <div className="absolute inset-0 z-0">
        {mounted && (
          <LightRays
            raysSpeed={0.5}
            lightSpread={20}
            rayLength={1.1}
            pulsating={false}
            fadeDistance={0.2}
            saturation={0.4}
            followMouse={false}
            mouseInfluence={0}
            noiseAmount={0.05}
            distortion={0.02}
            glowAmount={0.01}
            className="w-full h-full"
          />
        )}
        {!mounted && (
          <div className="w-full h-full bg-gradient-to-b from-primary/5 to-accent/10"></div>
        )}
      </div>

      {/* Content */}
      <div className="container relative z-10">
        {/* Header - No changes needed here */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <GradientHeading
            size="xl"
            weight="semi"
            variant="accent3"
            className="font-monesta-semibold leading-none mb-6"
          >
            Tailored <span className="font-charm-bold">solutions</span> for all{" "}
            <br /> your business needs
          </GradientHeading>
          <p className="text-lg text-zinc-500 font-red-hat-display max-w-2xl mx-auto">
            We offer a comprehensive range of software development services to
            help businesses focus better on business.
          </p>
        </motion.div>

        {/* Bento Grid */}
        <div className="space-y-6">
          {/* First Row - Full Width Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <InteractiveCard className="w-full">
              <div className="bg-black border border-[#FFED99]/20 rounded-2xl h-96 relative overflow-hidden">
                {/* Golden accent line (This one is for the card, keep it) */}
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#FFED99]/50 to-transparent"></div>

                <div className="flex h-full">
                  <div className="w-2/5 p-8">
                    <GradientHeading
                      size="sm"
                      weight="semi"
                      variant="accent2"
                      className="font-red-hat-display mb-4"
                    >
                      AI Agents & Intelligent Automation
                    </GradientHeading>
                    <p className="text-zinc-400 mb-6 font-red-hat-display">
                      Leverage cutting-edge AI to automate complex workflows and
                      create intelligent agents that work 24/7.
                    </p>
                    <ul className="space-y-2 text-sm text-zinc-400 font-red-hat-display">
                      <li className="flex items-center">
                        <span className="w-2 h-2 bg-[#FFED99] rounded-full mr-3"></span>
                        Custom AI agent development
                      </li>
                      <li className="flex items-center">
                        <span className="w-2 h-2 bg-[#FFED99] rounded-full mr-3"></span>
                        Workflow automation systems
                      </li>
                      <li className="flex items-center">
                        <span className="w-2 h-2 bg-[#FFED99] rounded-full mr-3"></span>
                        Natural language processing
                      </li>
                      <li className="flex items-center">
                        <span className="w-2 h-2 bg-[#FFED99] rounded-full mr-3"></span>
                        Predictive analytics integration
                      </li>
                      <li className="flex items-center">
                        <span className="w-2 h-2 bg-[#FFED99] rounded-full mr-3"></span>
                        Real-time decision making
                      </li>
                    </ul>
                  </div>

                  <div className="w-3/5 h-full relative p-10 mt-1">
                    <Image
                      src="/flow2.png"
                      alt="AI Automation"
                      fill
                      className="object-contain scale-105"
                    />
                    {/* Vignette effect overlay - Customized for left fade */}
                    <div
                      className="absolute inset-0 rounded-2xl pointer-events-none"
                      style={{
                        background:
                          "radial-gradient(circle at right center, transparent 0%, rgba(0,0,0,0.85) 70%), linear-gradient(to left, rgba(0,0,0,0.85) 0%, transparent 30%)",
                        maskImage:
                          "radial-gradient(circle at right center, transparent 0%, black 70%), linear-gradient(to left, black 0%, transparent 30%)",
                        mixBlendMode: "multiply",
                      }}
                    ></div>
                  </div>
                </div>
              </div>
            </InteractiveCard>
          </motion.div>

          {/* Second Row - Split Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
            {/* First Card - 2/5 width */}
            <motion.div
              className="lg:col-span-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <InteractiveCard className="w-full">
                <div className="bg-black border border-[#FFED99]/20 rounded-2xl h-96 relative overflow-hidden">
                  {/* Golden accent line */}
                  <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#FFED99]/50 to-transparent"></div>

                  <div className="flex flex-col h-full">
                    <div className="flex-1 px-6 pt-10">
                      <GradientHeading
                        size="xs"
                        weight="semi"
                        variant="accent2"
                        className="font-red-hat-display mb-3"
                      >
                        Fullstack websites & Mobile Applications
                      </GradientHeading>
                      <p className="text-zinc-400 text-sm font-red-hat-display">
                        Modern, responsive web applications and mobile apps
                        built with cutting-edge technologies for optimal
                        performance and user experience.
                      </p>
                    </div>

                    <div className="w-full flex-1 relative ">
                      <Image
                        src="/web-mock.png"
                        alt="Web Development"
                        fill
                        className="object-cover"
                      />
                      {/* Vignette effect overlay */}
                      <div
                        className="absolute inset-0 rounded-2xl pointer-events-none"
                        style={{
                          background:
                            "radial-gradient(circle at center, transparent 0%, rgba(0,0,0,0.85) 85%)",
                          maskImage:
                            "radial-gradient(circle at center, transparent 0%, black 85%)",
                        }}
                      ></div>
                    </div>
                  </div>
                </div>
              </InteractiveCard>
            </motion.div>

            {/* Second Card - 3/5 width */}
            <motion.div
              className="lg:col-span-3"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <InteractiveCard className="w-full">
                <div className="bg-black border border-[#FFED99]/20 rounded-2xl h-96 relative overflow-hidden">
                  {/* Golden accent line */}
                  <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#FFED99]/50 to-transparent"></div>

                  <div className="flex flex-col h-full">
                    <div className="flex-1 p-6">
                      <GradientHeading
                        size="xs"
                        weight="semi"
                        variant="accent2"
                        className="font-red-hat-display mb-3"
                      >
                        Bespoke enterprise ready solution
                      </GradientHeading>
                      <p className="text-zinc-400 text-sm mb-4 font-red-hat-display">
                        Custom enterprise solutions designed to scale with your
                        business, featuring robust architecture and
                        comprehensive support.
                      </p>

                      <ShimmerButton
                        className="bg-secondary text-[#FFED99] font-red-hat-display"
                        shimmerColor="#FFED99"
                        background="rgb(13, 13, 13)"
                        borderRadius="100px"
                      >
                        <div className="flex items-center gap-2 text-[#FFED99]/60">
                          <Calendar size={16} />
                          Schedule a Call
                        </div>
                      </ShimmerButton>
                    </div>

                    <div className="w-full flex-1 relative mt-4">
                      <Image
                        src="/shape-min.png"
                        alt="Enterprise Solutions"
                        fill
                        className="object-cover"
                      />
                      {/* Vignette effect overlay */}
                      <div
                        className="absolute inset-0 rounded-2xl pointer-events-none"
                        style={{
                          background:
                            "radial-gradient(circle at center, transparent 0%, rgba(0,0,0,0.85) 85%)",
                          maskImage:
                            "radial-gradient(circle at center, transparent 0%, black 85%)",
                        }}
                      ></div>
                    </div>
                  </div>
                </div>
              </InteractiveCard>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SolutionsSection;
