"use client";

import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import { useState, useEffect } from "react";
import { GradientHeading } from "@/components/ui/gradient-heading";
import { OrbitingCircles } from "@/components/magicui/orbiting-circles";
import Image from "next/image";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Linkedin } from "lucide-react";
import Link from "next/link";

const LightRays = dynamic(() => import("@/components/ui/light-rays"), {
  ssr: false,
});

// Team members data with responsive sizing and new LinkedIn links
const teamMembers = [
  {
    name: "Dwayne Silvapinto",
    src: "/about/dwayne.jpg",
    linkedin: "https://www.linkedin.com/in/dwaynesilvapinto145",
    radius: { mobile: 145, tablet: 190, desktop: 240 },
    duration: 25,
    reverse: false,
  },
  {
    name: "Ishwari Birje",
    src: "/about/ishwari.png",
    linkedin: "https://www.linkedin.com/in/ishwaribirje/",
    radius: { mobile: 115, tablet: 150, desktop: 180 },
    duration: 30,
    reverse: true,
  },
  {
    name: "Harsh Kamdar",
    src: "/about/harsh.png",
    linkedin: "https://www.linkedin.com/in/harsh-kamdar/",
    radius: { mobile: 85, tablet: 110, desktop: 120 },
    duration: 35,
    reverse: false,
  },
];

// Responsive icon size component
const OrbitingIcon = ({
  member,
  size,
  radius,
  isMobile,
  isRotationPaused,
  onInteractionStart,
  onInteractionEnd,
}: {
  member: (typeof teamMembers)[0];
  size: number;
  radius: number;
  isMobile: boolean;
  isRotationPaused: boolean;
  onInteractionStart: () => void;
  onInteractionEnd: () => void;
}) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleMouseEnter = () => {
    if (!isMobile) {
      setIsFlipped(true);
      onInteractionStart();
    }
  };

  const handleMouseLeave = () => {
    if (!isMobile) {
      setIsFlipped(false);
      onInteractionEnd();
    }
  };

  const handleClick = () => {
    if (isMobile) {
      setIsFlipped(!isFlipped);
      onInteractionStart();
      if (!isFlipped) {
        setTimeout(() => {
          setIsFlipped(false);
          onInteractionEnd();
        }, 4000);
      }
    }
  };

  return (
    <OrbitingCircles
      key={member.name}
      radius={radius}
      duration={member.duration}
      reverse={member.reverse}
      iconSize={size}
      isRotationPaused={isRotationPaused}
    >
      <div className="relative group">
        {/* Name displayed above the orbiting icon with no hover effect */}
        <motion.div
          className="absolute text-center px-2 py-1 bg-white/10 backdrop-blur-sm rounded-md transition-colors duration-300"
          style={{
            top: `-${size / 2 - 10}px`,
            left: "50%",
            transform: "translateX(-50%)",
            width: "max-content",
          }}
        >
          <p className="text-white text-xs md:text-sm font-semibold font-red-hat-display transition-colors duration-300">
            {member.name}
          </p>
        </motion.div>

        {/* The orbiting image card */}
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <motion.div
                className="flex items-center justify-center rounded-full border-2 border-white/10 bg-white/5 backdrop-blur-sm overflow-hidden cursor-pointer"
                style={{
                  width: `${size}px`,
                  height: `${size}px`,
                  position: "relative",
                }}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                onClick={handleClick}
              >
                {/* Front of the card (Image) */}
                <motion.div
                  className="absolute inset-0 backface-hidden"
                  initial={{ rotateY: 0 }}
                  animate={{ rotateY: isFlipped ? 180 : 0 }}
                  transition={{ duration: 0.4 }}
                >
                  <Image
                    src={member.src}
                    alt={member.name}
                    width={size}
                    height={size}
                    className="w-full h-full object-cover"
                  />
                </motion.div>

                {/* Back of the card (LinkedIn) */}
                <motion.div
                  className="absolute inset-0 flex items-center justify-center backface-hidden"
                  initial={{ rotateY: -180 }}
                  animate={{ rotateY: isFlipped ? 0 : -180 }}
                  transition={{ duration: 0.4 }}
                >
                  <Link
                    href={member.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Visit ${member.name}'s LinkedIn profile`}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div className="p-3 rounded-full bg-white/10 group-hover:bg-[#FFED99] transition-colors">
                      <Linkedin
                        size={size * 0.5}
                        className="text-[#FFED99] group-hover:text-black transition-colors"
                      />
                    </div>
                  </Link>
                </motion.div>
              </motion.div>
            </TooltipTrigger>
          </Tooltip>
        </TooltipProvider>
      </div>
    </OrbitingCircles>
  );
};

export default function AboutPage() {
  const [mounted, setMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isRotationPaused, setIsRotationPaused] = useState(false);

  useEffect(() => {
    setMounted(true);

    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const handleInteractionStart = () => {
    setIsRotationPaused(true);
  };

  const handleInteractionEnd = () => {
    setIsRotationPaused(false);
  };

  const getRadius = (member: (typeof teamMembers)[0]) => {
    if (window.innerWidth < 768) return member.radius.mobile;
    if (window.innerWidth >= 768 && window.innerWidth < 1024)
      return member.radius.tablet;
    return member.radius.desktop;
  };

  const getIconSize = () => {
    if (window.innerWidth < 768) return 65;
    if (window.innerWidth >= 768 && window.innerWidth < 1024) return 80;
    return 90;
  };
  const UNIFORM_ICON_SIZE = getIconSize();

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden py-16 sm:py-20 md:py-24 lg:py-16">
      {/* Background */}
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

      <div className="container relative z-10 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8 sm:gap-12 lg:gap-10 md:gap-16">
          {/* Text column - 2/3 on desktop */}
          <motion.div
            className="w-full lg:w-[50%] text-left"
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
                className="font-monesta-semibold leading-none mb-6"
              >
                About Us
              </GradientHeading>
            </motion.div>

            <motion.div
              className="space-y-6 mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <p className="text-lg sm:text-xl text-muted-foreground font-red-hat-display">
                We are a passionate team of developers, designers, and
                innovators dedicated to transforming ideas into exceptional
                digital experiences.
              </p>
              <p className="text-base sm:text-lg text-muted-foreground font-red-hat-display">
                Founded with a vision to bridge the gap between cutting-edge
                technology and business success, we've been crafting bespoke
                solutions that drive real results for ambitious brands
                worldwide.
              </p>
            </motion.div>

            <motion.div
              className="space-y-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-[#FFED99] rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <h3 className="font-semibold text-white font-red-hat-display mb-1">
                    Innovation First
                  </h3>
                  <p className="text-sm sm:text-base text-muted-foreground font-red-hat-display">
                    We embrace emerging technologies and creative approaches to
                    solve complex challenges.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-[#FFED99] rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <h3 className="font-semibold text-white font-red-hat-display mb-1">
                    Quality Excellence
                  </h3>
                  <p className="text-sm sm:text-base text-muted-foreground font-red-hat-display">
                    Every project is crafted with meticulous attention to detail
                    and performance.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-[#FFED99] rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <h3 className="font-semibold text-white font-red-hat-display mb-1">
                    Client Partnership
                  </h3>
                  <p className="text-sm sm:text-base text-muted-foreground font-red-hat-display">
                    We work as an extension of your team, ensuring your vision
                    becomes reality.
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Orbit column - 1/3 on desktop */}
          <motion.div
            className="group relative w-full lg:w-[50%] h-80 sm:h-96 lg:h-[650px] flex items-center justify-center flex-shrink-0 p-10"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            {/* Central rotating image */}
            <div
              className={`absolute ${
                isRotationPaused ? "animate-none" : "animate-spin-slow"
              } group-hover:[animation-play-state:paused]`}
            >
              <Image
                src="/shape-gold-min.png"
                alt="Central"
                width={120}
                height={120}
                className="w-16 h-16 sm:w-20 sm:h-20 lg:w-28 lg:h-28"
              />
            </div>

            {/* Map over team members and pass the uniform size */}
            {teamMembers.map((member) => (
              <OrbitingIcon
                key={member.name}
                member={member}
                size={UNIFORM_ICON_SIZE}
                radius={getRadius(member)}
                isMobile={isMobile}
                isRotationPaused={isRotationPaused}
                onInteractionStart={handleInteractionStart}
                onInteractionEnd={handleInteractionEnd}
              />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
