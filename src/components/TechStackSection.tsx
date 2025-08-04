"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
  useMotionTemplate,
} from "framer-motion";
import { Marquee } from "@/components/magicui/marquee";
import { GradientHeading } from "@/components/ui/gradient-heading";

// A component for the cursor-following tooltip
const CursorTooltip = ({
  content,
  visible,
  position,
}: {
  content: string;
  visible: boolean;
  position: { x: number; y: number };
}) => (
  <AnimatePresence>
    {visible && (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ duration: 0.15, ease: "easeInOut" }}
        style={{
          top: position.y + 10,
          left: position.x + 10,
        }}
        className="pointer-events-none fixed z-50 rounded-md bg-black px-2 py-1 sm:px-3 sm:py-1.5 text-xs sm:text-sm font-medium text-white shadow-lg"
      >
        {content}
      </motion.div>
    )}
  </AnimatePresence>
);

const techStack = [
  { name: "React", logo: "/svgs/react-svgrepo-com.svg", category: "service" },
  {
    name: "Next.js",
    logo: "/svgs/next-js-svgrepo-com.svg",
    category: "service",
  },
  {
    name: "TypeScript",
    logo: "/svgs/typescript-svgrepo-com.svg",
    category: "language",
  },
  {
    name: "Javascript",
    logo: "/svgs/javascript-155-svgrepo-com.svg",
    category: "language",
  },
  { name: "SQL", logo: "/svgs/sql-svgrepo-com.svg", category: "language" },
  {
    name: "Python",
    logo: "/svgs/python-svgrepo-com.svg",
    category: "language",
  },
  {
    name: "MongoDB",
    logo: "/svgs/mongodb-svgrepo-com.svg",
    category: "service",
  },
  { name: "Git", logo: "/svgs/github-svgrepo-com.svg", category: "service" },
  { name: "C#", logo: "/svgs/c-sharp-svgrepo-com.svg", category: "language" },
  { name: "C", logo: "/svgs/c-svgrepo-com.svg", category: "language" },
  { name: "AWS", logo: "/svgs/aws-svgrepo-com.svg", category: "service" },
  { name: "Docker", logo: "/svgs/docker-svgrepo-com.svg", category: "service" },
  {
    name: "Kubernetes",
    logo: "/svgs/kubernetes-svgrepo-com.svg",
    category: "service",
  },
  {
    name: "Flutter",
    logo: "/svgs/flutter-svgrepo-com.svg",
    category: "service",
  },
];

// --- NEW COMPONENT FOR ICONS ---
// This component manages its own mobile scroll-based animation.
const TechIcon = ({
  tech,
  onMouseEnter,
  onMouseLeave,
}: {
  tech: { name: string; logo: string };
  onMouseEnter: (name: string) => void;
  onMouseLeave: () => void;
}) => {
  const [isMobile, setIsMobile] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Check for mobile device on component mount
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Scroll-triggered animation for mobile
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Transform scroll progress into filter values
  const grayscale = useTransform(scrollYProgress, [0.2, 0.6], [1, 0]);
  const brightness = useTransform(scrollYProgress, [0.2, 0.6], [0.5, 1]);
  const filter = useMotionTemplate`grayscale(${grayscale}) brightness(${brightness})`;

  return (
    <div
      ref={ref}
      className="flex items-center justify-center p-2 sm:p-4 mx-4 sm:mx-8"
      onMouseEnter={() => onMouseEnter(tech.name)}
      onMouseLeave={onMouseLeave}
    >
      <div className="w-12 h-12 sm:w-16 sm:h-16 flex items-center justify-center bg-black rounded-lg p-2 sm:p-3 transition-transform duration-300 group-hover:scale-110">
        <motion.img
          src={tech.logo}
          alt={tech.name}
          // On desktop, use Tailwind classes for hover. On mobile, use animated style.
          className="w-full h-full object-contain filter grayscale brightness-50 transition-all duration-300 sm:group-hover:filter-none"
          style={isMobile ? { filter } : {}}
        />
      </div>
    </div>
  );
};

const TechStackSection = () => {
  const languages = techStack.filter((tech) => tech.category === "language");
  const services = techStack.filter((tech) => tech.category === "service");

  const [tooltipVisible, setTooltipVisible] = useState(false);
  const [tooltipContent, setTooltipContent] = useState("");
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      setTooltipPosition({ x: event.clientX, y: event.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  const handleMouseEnter = (name: string) => {
    setTooltipContent(name);
    setTooltipVisible(true);
  };

  const handleMouseLeave = () => {
    setTooltipVisible(false);
  };

  return (
    <section
      id="tech-stack-section"
      className="relative py-12 sm:py-16 md:py-20 overflow-hidden bg-black"
    >
      <CursorTooltip
        content={tooltipContent}
        visible={tooltipVisible}
        position={tooltipPosition}
      />

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
            Our Tech Stack
          </GradientHeading>
          <p className="text-base sm:text-lg text-zinc-500 font-red-hat-display max-w-2xl mx-auto px-4">
            We leverage cutting-edge technologies and robust frameworks to craft
            scalable, high-performance solutions tailored to your unique
            business needs.
          </p>
        </motion.div>

        <div className="w-full relative z-10">
          {/* Using a 'group' for desktop hover effects */}
          <Marquee
            className="group w-full [--duration:30s]"
            pauseOnHover={true}
          >
            {languages.map((tech) => (
              <TechIcon
                key={tech.name}
                tech={tech}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              />
            ))}
          </Marquee>

          <Marquee
            className="group w-full [--duration:35s] mt-6 sm:mt-8"
            reverse={true}
            pauseOnHover={true}
          >
            {services.map((tech) => (
              <TechIcon
                key={tech.name}
                tech={tech}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              />
            ))}
          </Marquee>
        </div>
      </div>
    </section>
  );
};

export default TechStackSection;
