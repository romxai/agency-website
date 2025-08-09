"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { motion, Variants, useScroll, useTransform } from "framer-motion";
import { Globe, Github, Twitter, Linkedin } from "lucide-react";

const Footer = () => {
  const textContainerRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isMobile, setIsMobile] = useState(false);

  const { scrollYProgress } = useScroll({
    target: textContainerRef,
    offset: ["start end", "end start"],
  });
  const mobileTextOpacity = useTransform(scrollYProgress, [0.1, 0.5], [0.2, 1]);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    if (typeof window !== "undefined") {
      checkMobile();
      window.addEventListener("resize", checkMobile);

      const handleMouseMove = (event: MouseEvent) => {
        if (textContainerRef.current) {
          const rect = textContainerRef.current.getBoundingClientRect();
          setMousePosition({
            x: event.clientX - rect.left,
            y: event.clientY - rect.top,
          });
        }
      };

      if (!isMobile) {
        window.addEventListener("mousemove", handleMouseMove);
      }

      return () => {
        window.removeEventListener("resize", checkMobile);
        if (!isMobile) {
          window.removeEventListener("mousemove", handleMouseMove);
        }
      };
    }
  }, [isMobile]);

  const spotlightSize = isMobile ? 150 : 400;

  const highlightTextStyle = isMobile
    ? {
        opacity: mobileTextOpacity,
        color: "#e7c95c",
      }
    : {
        backgroundImage: `radial-gradient(${spotlightSize}px circle at var(--mouse-x) var(--mouse-y), #e7c95c 0%, transparent 80%)`,
        WebkitBackgroundClip: "text",
        backgroundClip: "text",
        color: "transparent",
        transition: "background-image 0.2s ease-out",
      };

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  };

  const footerLinks = [
    { title: "About", href: "/about" },
    { title: "Portfolio", href: "/portfolio" },
    { title: "Services", href: "#services" },
    { title: "Contact", href: "#contact" },
    { title: "Privacy Policy", href: "/privacy" },
  ];

  return (
    <section className="relative bg-black pt-5">
      <div
        ref={textContainerRef}
        // MODIFIED: Removed mb-5 for consistent scaling
        className="relative w-full select-none overflow-hidden"
        style={
          {
            "--mouse-x": `${mousePosition.x}px`,
            "--mouse-y": `${mousePosition.y}px`,
          } as React.CSSProperties
        }
      >
        <h1 className="text-center text-[16vw] sm:text-[18vw] md:text-[15vw] lg:text-[12vw] leading-none font-extrabold uppercase text-zinc-900 tracking-tight md:tracking-tighter">
          BRNKLABS
        </h1>
        <motion.h1
          className="absolute inset-0 text-center text-[16vw] sm:text-[18vw] md:text-[15vw] lg:text-[12vw] leading-none font-extrabold uppercase tracking-tight md:tracking-tighter"
          style={highlightTextStyle}
        >
          BRNKLABS
        </motion.h1>
      </div>

      {/* MODIFIED: Adjusted negative margins for consistent overlap */}
      <footer className="relative z-10 bg-black -mt-[5.5vw] sm:-mt-[6vw] md:-mt-[5vw] lg:-mt-[4vw] pt-6 sm:pt-8 pb-6 sm:pb-8 md:pb-16">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#FFED99]/50 to-transparent"></div>
        <div className="container relative z-10 mx-auto px-4">
          <motion.div
            className="flex flex-col items-center gap-6 sm:gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            <motion.div
              variants={itemVariants}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              <Link
                href="/"
                className="flex items-center space-x-2 hover:opacity-80 transition-opacity"
              >
                <Globe className="size-5 sm:size-6 md:size-8 text-[#e7c95c]" />
                <span className="text-lg sm:text-xl md:text-2xl font-bold text-white font-monesta-semibold">
                  BRNKLABS
                </span>
              </Link>
            </motion.div>
            <motion.nav
              className="flex flex-wrap justify-center gap-x-4 sm:gap-x-6 gap-y-2 sm:gap-y-3 text-xs sm:text-sm font-red-hat-display"
              variants={itemVariants}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              {footerLinks.map((link) => (
                <Link
                  key={link.title}
                  href={link.href}
                  className="text-zinc-400 hover:text-[#FFED99] transition-colors"
                >
                  {link.title}
                </Link>
              ))}
            </motion.nav>
            <motion.div
              className="flex items-center space-x-3 sm:space-x-4 md:space-x-6"
              variants={itemVariants}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="text-zinc-500 hover:text-[#FFED99] transition-colors"
              >
                <Github className="size-4 sm:size-5" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Twitter"
                className="text-zinc-500 hover:text-[#FFED99] transition-colors"
              >
                <Twitter className="size-4 sm:size-5" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="text-zinc-500 hover:text-[#FFED99] transition-colors"
              >
                <Linkedin className="size-4 sm:size-5" />
              </a>
            </motion.div>
            <motion.p
              className="text-xs text-zinc-500 font-red-hat-display mt-3 sm:mt-4"
              variants={itemVariants}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              © {new Date().getFullYear()} BRNKLABS. All rights reserved.
            </motion.p>
          </motion.div>
        </div>
      </footer>
    </section>
  );
};

export default Footer;
