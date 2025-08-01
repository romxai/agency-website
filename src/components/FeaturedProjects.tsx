"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import dynamic from "next/dynamic";
import { useState, useEffect } from "react";
import { GradientHeading } from "@/components/ui/gradient-heading";
import { ShimmerButton } from "@/components/magicui/shimmer-button";
import Image from "next/image";
import { ArrowRight } from "lucide-react"; // <--- Add this import

// Import LightRays with SSR disabled to prevent "document is not defined" error
const LightRays = dynamic(() => import("@/components/ui/light-rays"), {
  ssr: false,
});

// Sample featured projects data
const featuredProjects = [
  {
    id: 1,
    title: "Orchestrator",
    description: "AI-powered workflow automation platform for enterprise teams",
    image: "/shape-min.png", // Using existing image as placeholder
    tags: ["Agentic AI", "Web App", "Enterprise"],
  },
  {
    id: 2,
    title: "Saarthi Super App",
    description: "Comprehensive mobile application for rural development",
    image: "/shape-min.png", // Using existing image as placeholder
    tags: ["Mobile App", "PWA", "Social Impact"],
  },
  {
    id: 3,
    title: "Neural Nexus",
    description: "Advanced neural network visualization and training platform",
    image: "/shape-min.png", // Using existing image as placeholder
    tags: ["AI/ML", "Data Science", "Web App"],
  },
  {
    id: 4,
    title: "Quantum Flow",
    description: "Real-time quantum computing simulation and analysis tool",
    image: "/shape-min.png", // Using existing image as placeholder
    tags: ["Quantum Computing", "Research", "Web App"],
  },
];

const FeaturedProjects = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <section className="relative py-20 overflow-hidden bg-black">
      {/* LightRays Background */}
      <div className="absolute inset-0 z-0">
        {mounted && (
          <LightRays
            raysOrigin="left"
            raysSpeed={1}
            lightSpread={3}
            rayLength={0.9}
            pulsating={false}
            fadeDistance={0.5}
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
            rayLength={0.9}
            pulsating={false}
            fadeDistance={0.5}
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

      {/* Content */}
      <div className="container relative z-10 ">
        {/* Header */}
        <div className="flex flex-col lg:flex-row items-start justify-between gap-8 mb-10">
          <motion.div
            className="flex-1"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <GradientHeading
              size="xl"
              weight="semi"
              variant="accent2"
              className="font-monesta-semibold leading-none mb-0"
            >
              Showcasing Our
              <br />
              Work
            </GradientHeading>
          </motion.div>

          {/* This is the div containing the ShimmerButton */}
          <motion.div
            className="flex flex-col justify-end items-end self-end"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <ShimmerButton
              className="bg-secondary text-secondary-foreground font-red-hat-display inline-flex overflow-hidden"
              shimmerColor="#FFD700"
              background="rgb(13, 13, 13)"
              borderRadius="100px"
            >
              <Link
                href="/portfolio"
                // Adjusted group-hover:pr-14 to accommodate the longer arrow
                className="text-white flex items-center whitespace-nowrap relative group-hover:pr-10 transition-all duration-300 ease-out"
              >
                See All Work
                <span className="absolute right-0 opacity-0 group-hover:opacity-100 translate-x-full group-hover:translate-x-0 transition-all duration-300 ease-out pointer-events-none h-full flex items-center">
                  {/* Increased size for height, and added scale-x-150 for horizontal stretching */}
                  <ArrowRight size={24} className="transform scale-x-130 scale-y-90" />{" "}
                  {/* <--- Main change here */}
                </span>
              </Link>
            </ShimmerButton>
          </motion.div>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 pb-10">
          {/* Left Column */}
          <div className="space-y-6 lg:space-y-8">
            {featuredProjects.slice(0, 2).map((project, index) => (
              <motion.div
                key={project.id}
                className="group relative bg-black border border-white/10 rounded-2xl overflow-hidden transition-all duration-300 hover:border-white/20"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 + index * 0.1 }}
                whileHover={{ y: -5, scale: 1.02 }}
              >
                {/* Hover Effect Overlay */}
                <div className="absolute inset-0 bg-gradient-to-b from-transparent from-50% to-amber-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                {/* Image Section */}
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover rounded-t-2xl group-hover:scale-105 transition-transform duration-300"
                  />
                </div>

                {/* Content Section */}
                <div className="p-6">
                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-3">
                    {project.tags.map((tag, tagIndex) => (
                      <span
                        key={tagIndex}
                        className="px-3 py-1 text-xs font-medium bg-white/10 text-white/80 rounded-full border border-white/20"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-semibold text-white mb-2 font-red-hat-display">
                    {project.title}
                  </h3>

                  {/* Description */}
                  <p className="text-sm text-white/70 font-red-hat-display">
                    {project.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Right Column - Offset */}
          <div className="space-y-6 lg:space-y-8 lg:translate-y-8">
            {featuredProjects.slice(2, 4).map((project, index) => (
              <motion.div
                key={project.id}
                className="group relative bg-black border border-white/10 rounded-2xl overflow-hidden transition-all duration-300 hover:border-white/20"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 + index * 0.1 }}
                whileHover={{ y: -5, scale: 1.02 }}
              >
                {/* Hover Effect Overlay */}
                <div className="absolute inset-0 bg-gradient-to-b from-transparent from-50% to-amber-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                {/* Image Section */}
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover rounded-t-2xl group-hover:scale-105 transition-transform duration-300"
                  />
                </div>

                {/* Content Section */}
                <div className="p-6">
                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-3">
                    {project.tags.map((tag, tagIndex) => (
                      <span
                        key={tagIndex}
                        className="px-3 py-1 text-xs font-medium bg-white/10 text-white/80 rounded-full border border-white/20"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-semibold text-white mb-2 font-red-hat-display">
                    {project.title}
                  </h3>

                  {/* Description */}
                  <p className="text-sm text-white/70 font-red-hat-display">
                    {project.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProjects;
