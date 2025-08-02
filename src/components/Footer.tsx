"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { motion, Variants } from "framer-motion";
import { Globe, Github, Twitter, Linkedin } from "lucide-react";

/**
 * A modern, clean, and minimalist footer section.
 * It features a large interactive text element and a centered layout
 * for navigation and social links, matching the website's aesthetic.
 */
const Footer = () => {
  // Ref for the text container to calculate mouse position relative to the element.
  const textContainerRef = useRef<HTMLDivElement>(null);

  // State to hold the mouse position.
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // Effect to add and clean up the mouse move event listener.
  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      if (textContainerRef.current) {
        const rect = textContainerRef.current.getBoundingClientRect();
        setMousePosition({
          x: event.clientX - rect.left,
          y: event.clientY - rect.top,
        });
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  // Animation variants for the footer content to fade in gracefully.
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

  // Animation variants for individual items to slide up and fade in.
  const itemVariants: Variants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  const footerLinks = [
    { title: "About", href: "/about" },
    { title: "Portfolio", href: "/portfolio" },
    { title: "Services", href: "#services" },
    { title: "Contact", href: "#contact" },
    { title: "Privacy Policy", href: "/privacy" },
  ];

  return (
    <section className="relative bg-black">
      {/* Container for the large interactive text */}
      <div
        ref={textContainerRef}
        className="relative w-full select-none mb-5"
        style={
          {
            // Pass mouse coordinates as CSS custom properties
            "--mouse-x": `${mousePosition.x}px`,
            "--mouse-y": `${mousePosition.y}px`,
          } as React.CSSProperties
        }
      >
        {/* Base layer for the text (the dark, non-highlighted version) */}
        <h1 className="text-center text-[22vw] md:text-[18vw] lg:text-[15vw] leading-none font-extrabold uppercase text-zinc-900 tracking-tighter">
          DevAgency
        </h1>

        {/* Top layer with the interactive golden spotlight effect */}
        <h1
          className="absolute inset-0 text-center text-[22vw] md:text-[18vw] lg:text-[15vw] leading-none font-extrabold uppercase tracking-tighter"
          style={{
            // A radial gradient centered on the mouse position creates the spotlight.
            background: `radial-gradient(400px circle at var(--mouse-x) var(--mouse-y), #FFED99 0%, transparent 80%)`,
            // Clipping the background to the text shape makes the gradient visible only through the letters.
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
            color: "transparent",
            // A subtle transition for the spotlight effect
            transition: "background 0.2s ease-out",
          }}
        >
          DevAgency
        </h1>
      </div>

      {/* The footer content, now with a solid black background, positioned to overlap the large text */}
      <footer className="relative z-10 bg-black -mt-[10vw] md:-mt-[7vw] lg:-mt-[5vw] pt-8 pb-16">
        {/* Top fading border with gold color */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#FFED99]/50 to-transparent"></div>

        <div className="container relative z-10 mx-auto px-4">
          <motion.div
            className="flex flex-col items-center gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            {/* Brand Logo */}
            <motion.div variants={itemVariants}>
              <Link
                href="/"
                className="flex items-center space-x-2 hover:opacity-80 transition-opacity"
              >
                <Globe className="size-8 text-[#FFED99]" />
                <span className="text-2xl font-bold text-white font-monesta-semibold">
                  DevAgency
                </span>
              </Link>
            </motion.div>

            {/* Core Navigation Links */}
            <motion.nav
              className="flex flex-wrap justify-center gap-x-6 gap-y-3 text-sm font-red-hat-display"
              variants={itemVariants}
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

            {/* Social Media Icons */}
            <motion.div
              className="flex items-center space-x-6"
              variants={itemVariants}
            >
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="text-zinc-500 hover:text-[#FFED99] transition-colors"
              >
                <Github className="size-5" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Twitter"
                className="text-zinc-500 hover:text-[#FFED99] transition-colors"
              >
                <Twitter className="size-5" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="text-zinc-500 hover:text-[#FFED99] transition-colors"
              >
                <Linkedin className="size-5" />
              </a>
            </motion.div>

            {/* Copyright Notice */}
            <motion.p
              className="text-xs text-zinc-500 font-red-hat-display mt-4"
              variants={itemVariants}
            >
              © {new Date().getFullYear()} DevAgency. All rights reserved.
            </motion.p>
          </motion.div>
        </div>
      </footer>
    </section>
  );
};

export default Footer;
