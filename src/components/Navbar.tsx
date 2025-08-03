"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "framer-motion";
import { cn } from "@/lib/utils";

// Animated Nav Link Component (no changes needed here)
const AnimatedNavLink = ({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) => {
  const defaultTextColor = "text-gray-300";
  const hoverTextColor = "text-amber-200";
  const textSizeClass = "text-sm";

  return (
    <Link
      href={href}
      className={`group relative inline-block overflow-hidden h-5 flex items-center ${textSizeClass}`}
    >
      <div className="flex flex-col transition-transform duration-300 ease-out transform group-hover:-translate-y-1/2">
        <span className={defaultTextColor}>{children}</span>
        <span className={hoverTextColor}>{children}</span>
      </div>
    </Link>
  );
};

// Main FloatingNav Component
export const FloatingNav = ({
  navItems,
  className,
}: {
  navItems: {
    name: string;
    link: string;
    isButton?: boolean;
    isSignup?: boolean;
  }[];
  className?: string;
}) => {
  // Framer Motion hooks for scroll detection
  const { scrollYProgress } = useScroll();
  const [visible, setVisible] = useState(true); // Start as visible

  // Event listener for scroll changes using Framer Motion
  useMotionValueEvent(scrollYProgress, "change", (current) => {
    const previous = scrollYProgress.getPrevious();

    // Check if current is a number
    if (typeof current === "number" && typeof previous === "number") {
      const direction = current - previous;

      // Always show the nav when at the top of the page
      if (scrollYProgress.get() < 0.05) {
        setVisible(true);
      } else {
        // Hide on scroll down, show on scroll up
        if (direction < 0) {
          setVisible(true);
        } else {
          setVisible(false);
        }
      }
    }
  });

  // State for mobile menu and shape-shifting animation
  const [isOpen, setIsOpen] = useState(false);
  const [headerShapeClass, setHeaderShapeClass] = useState("rounded-full");
  const shapeTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  // Logic for hiding the nav now also closes the mobile menu
  useEffect(() => {
    if (!visible) {
      setIsOpen(false);
    }
  }, [visible]);

  useEffect(() => {
    if (shapeTimeoutRef.current) {
      clearTimeout(shapeTimeoutRef.current);
    }

    if (isOpen) {
      setHeaderShapeClass("rounded-xl");
    } else {
      shapeTimeoutRef.current = setTimeout(() => {
        setHeaderShapeClass("rounded-full");
      }, 300);
    }

    return () => {
      if (shapeTimeoutRef.current) {
        clearTimeout(shapeTimeoutRef.current);
      }
    };
  }, [isOpen]);

  const logoElement = (
    <div className="relative w-4 h-4 sm:w-5 sm:h-5 flex items-center justify-center">
      <span className="absolute w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-[#e7c95c] top-0 left-1/2 transform -translate-x-1/2 opacity-80"></span>
      <span className="absolute w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-[#e7c95c] left-0 top-1/2 transform -translate-y-1/2 opacity-80"></span>
      <span className="absolute w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-[#e7c95c] right-0 top-1/2 transform -translate-y-1/2 opacity-80"></span>
      <span className="absolute w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-[#e7c95c] bottom-0 left-1/2 transform -translate-x-1/2 opacity-80"></span>
    </div>
  );

  const navLinks = navItems.filter((item) => !item.isButton && !item.isSignup);
  const buttonItems = navItems.filter((item) => item.isButton || item.isSignup);

  return (
    <AnimatePresence mode="wait">
      <motion.header
        initial={{
          opacity: 1,
          y: 0,
        }}
        animate={{
          y: visible ? 0 : -100,
          opacity: visible ? 1 : 0,
        }}
        transition={{
          duration: 0.2,
          ease: "easeInOut",
        }}
        className={cn(
          "fixed top-2 sm:top-4 md:top-6 left-0 right-0 z-50 flex w-full justify-center px-2 sm:px-4",
          className
        )}
      >
        <div
          className={cn(
            `flex flex-col items-center pl-3 pr-3 sm:pl-4 sm:pr-4 md:pl-6 md:pr-6 py-2 sm:py-3 backdrop-blur-sm
             ${headerShapeClass}
             border border-[#333] bg-[#1f1f1f57]
             transition-[border-radius] duration-300 ease-in-out
             w-full max-w-4xl`
          )}
        >
          {/* The rest of your navbar's internal JSX remains unchanged */}
          <div className="flex items-center gap-x-3 sm:gap-x-4 md:gap-x-6 lg:gap-x-8 w-full justify-between">
            <div className="flex items-center">{logoElement}</div>

            <nav className="hidden sm:flex items-center space-x-3 md:space-x-4 lg:space-x-6 text-xs sm:text-sm">
              {navLinks.map((link, idx) => (
                <AnimatedNavLink key={`nav-${idx}`} href={link.link}>
                  {link.name}
                </AnimatedNavLink>
              ))}
            </nav>

            <div className="hidden sm:flex items-center gap-1 sm:gap-2 md:gap-3">
              {buttonItems.map((item, idx) =>
                item.isSignup ? (
                  <div
                    key={`signup-${idx}`}
                    className="relative group w-full sm:w-auto"
                  >
                    <div
                      className="absolute inset-0 -m-2 rounded-full
                                     hidden sm:block
                                     bg-amber-200
                                     opacity-40 filter blur-lg pointer-events-none
                                     transition-all duration-300 ease-out
                                     group-hover:opacity-60 group-hover:blur-xl group-hover:-m-3"
                    ></div>
                    <Link href={item.link}>
                      <button className="relative z-10 px-2 py-1.5 sm:px-3 md:px-4 text-xs sm:text-sm font-semibold text-gray-900 rounded-full transition-colors duration-200 w-full sm:w-auto bg-amber-200/80 hover:bg-amber-200">
                        {item.name}
                      </button>
                    </Link>
                  </div>
                ) : (
                  <Link key={`button-${idx}`} href={item.link}>
                    <button className="px-2 py-1.5 sm:px-3 md:px-4 text-xs sm:text-sm border border-[#333] bg-[rgba(31,31,31,0.62)] text-gray-300 rounded-full hover:border-white/50 hover:text-white transition-colors duration-200 w-full sm:w-auto">
                      {item.name}
                    </button>
                  </Link>
                )
              )}
            </div>

            <button
              className="sm:hidden flex items-center justify-center w-6 h-6 sm:w-8 sm:h-8 text-gray-300 focus:outline-none"
              onClick={toggleMenu}
              aria-label={isOpen ? "Close Menu" : "Open Menu"}
            >
              {/* SVG icons for mobile menu toggle */}
              {isOpen ? (
                <svg
                  className="w-5 h-5 sm:w-6 sm:h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  {" "}
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  ></path>{" "}
                </svg>
              ) : (
                <svg
                  className="w-5 h-5 sm:w-6 sm:h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  {" "}
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  ></path>{" "}
                </svg>
              )}
            </button>
          </div>

          <div
            className={`sm:hidden flex flex-col items-center w-full transition-all ease-in-out duration-300 overflow-hidden
                         ${
                           isOpen
                             ? "max-h-[1000px] opacity-100 pt-4"
                             : "max-h-0 opacity-0 pt-0 pointer-events-none"
                         }`}
          >
            {/* Mobile menu content */}
            <nav className="flex flex-col items-center space-y-4 text-base w-full">
              {navLinks.map((link, idx) => (
                <Link
                  key={`mobile-nav-${idx}`}
                  href={link.link}
                  className="text-gray-300 hover:text-white transition-colors w-full text-center text-sm sm:text-base"
                >
                  {link.name}
                </Link>
              ))}
            </nav>
            <div className="flex flex-col items-center space-y-4 mt-4 w-full">
              {buttonItems.map((item, idx) =>
                item.isSignup ? (
                  <div
                    key={`mobile-signup-${idx}`}
                    className="relative group w-full sm:w-auto"
                  >
                    <div className="absolute inset-0 -m-2 rounded-full hidden sm:block bg-amber-200 opacity-40 filter blur-lg pointer-events-none transition-all duration-300 ease-out group-hover:opacity-60 group-hover:blur-xl group-hover:-m-3"></div>
                    <Link href={item.link}>
                      <button className="relative z-10 px-4 py-2 sm:px-3 text-xs sm:text-sm font-semibold text-gray-900/90 rounded-full transition-colors duration-200 w-full sm:w-auto bg-amber-200/70 hover:bg-amber-200">
                        {item.name}
                      </button>
                    </Link>
                  </div>
                ) : (
                  <Link key={`mobile-button-${idx}`} href={item.link}>
                    <button className="px-4 py-2 sm:px-3 text-xs sm:text-sm border border-[#333] bg-[rgba(31,31,31,0.62)] text-gray-300 rounded-full hover:border-white/50 hover:text-white transition-colors duration-200 w-full sm:w-auto">
                      {item.name}
                    </button>
                  </Link>
                )
              )}
            </div>
          </div>
        </div>
      </motion.header>
    </AnimatePresence>
  );
};

// Main Navbar component that uses the FloatingNav
const Navbar = () => {
  const navItems = [
    { name: "Home", link: "/" },
    { name: "Projects", link: "/portfolio" },
    { name: "Work", link: "/about" },
    { name: "Contact Us", link: "#contact", isSignup: true },
  ];

  return <FloatingNav navItems={navItems} />;
};

export default Navbar;
