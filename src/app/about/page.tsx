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

const LightRays = dynamic(() => import("@/components/ui/light-rays"), {
  ssr: false,
});

// Team members data with responsive sizing
const teamMembers = [
  {
    name: "Dwayne Silvapinto",
    src: "/about/dwayne.jpg",
    radius: { mobile: 120, tablet: 160, desktop: 240 },
    duration: 25,
    reverse: false,
  },
  {
    name: "Ishwari Birje",
    src: "/about/ishwari.png",
    radius: { mobile: 90, tablet: 120, desktop: 180 },
    duration: 30,
    reverse: true,
  },
  {
    name: "Harsh Kamdar",
    src: "/about/harsh.png",
    radius: { mobile: 60, tablet: 80, desktop: 120 },
    duration: 20,
    reverse: false,
  },
];

// Responsive icon size component
const OrbitingIcon = ({
  member,
  size,
  isMobile,
  onIconClick,
}: {
  member: (typeof teamMembers)[0];
  size: number;
  isMobile: boolean;
  onIconClick: () => void;
}) => {
  const [isClicked, setIsClicked] = useState(false);

  const handleInteraction = () => {
    if (isMobile) {
      setIsClicked(!isClicked);
      onIconClick(); // Trigger the rotation pause
    }
  };

  return (
    <OrbitingCircles
      key={member.name}
      radius={member.radius.desktop}
      duration={member.duration}
      reverse={member.reverse}
      iconSize={size}
    >
      <Tooltip>
        <TooltipTrigger asChild>
          <motion.div
            className="flex items-center justify-center rounded-full border-2 border-white/10 bg-white/5 backdrop-blur-sm overflow-hidden cursor-pointer"
            style={{
              width: `${size}px`,
              height: `${size}px`,
            }}
            whileHover={
              !isMobile ? { scale: 1.2, transition: { duration: 0.2 } } : {}
            }
            animate={isMobile && isClicked ? { scale: 1.2 } : { scale: 1 }}
            onClick={handleInteraction}
          >
            <Image
              src={member.src}
              alt={member.name}
              width={size}
              height={size}
              className="w-full h-full object-cover"
            />
          </motion.div>
        </TooltipTrigger>
        <TooltipContent>
          <p>{member.name}</p>
        </TooltipContent>
      </Tooltip>
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

  // Handle rotation pause on mobile icon click
  const handleIconClick = () => {
    if (isMobile) {
      setIsRotationPaused(true);
      setTimeout(() => {
        setIsRotationPaused(false);
      }, 4000); // 4 seconds
    }
  };

  // Responsive icon size
  const UNIFORM_ICON_SIZE = isMobile ? 60 : 100;

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
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8 sm:gap-12 lg:gap-16">
          {/* Text column - 2/3 on desktop */}
          <motion.div
            className="w-full lg:w-2/3 text-center lg:text-left"
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
                About <span className="font-charm-bold">Us</span>
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
            className="group relative w-full lg:w-1/3 h-80 sm:h-96 lg:h-[650px] flex items-center justify-center flex-shrink-0"
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

            <TooltipProvider>
              {/* Map over team members and pass the uniform size */}
              {teamMembers.map((member) => (
                <OrbitingIcon
                  key={member.name}
                  member={member}
                  size={UNIFORM_ICON_SIZE}
                  isMobile={isMobile}
                  onIconClick={handleIconClick}
                />
              ))}
            </TooltipProvider>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
