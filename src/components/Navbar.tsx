"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

// Custom hook to detect scroll direction
const useScrollDirection = () => {
  const [scrollDirection, setScrollDirection] = useState<"up" | "down" | null>(
    null
  );

  useEffect(() => {
    let lastScrollY = window.pageYOffset;
    const updateScrollDirection = () => {
      const scrollY = window.pageYOffset;
      const direction = scrollY > lastScrollY ? "down" : "up";
      if (
        direction !== scrollDirection &&
        (scrollY - lastScrollY > 5 || scrollY - lastScrollY < -5)
      ) {
        setScrollDirection(direction);
      }
      lastScrollY = scrollY > 0 ? scrollY : 0;
    };
    window.addEventListener("scroll", updateScrollDirection);
    return () => window.removeEventListener("scroll", updateScrollDirection);
  }, [scrollDirection]);

  return scrollDirection;
};

// Animated Nav Link Component (translated from React code)
const AnimatedNavLink = ({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) => {
  const defaultTextColor = "text-gray-300";
  const hoverTextColor = "text-white";
  const textSizeClass = "text-sm";

  return (
    <Link
      href={href}
      className={`group relative inline-block overflow-hidden h-5 flex items-center ${textSizeClass}`}
    >
      <div className="flex flex-col transition-transform duration-400 ease-out transform group-hover:-translate-y-1/2">
        <span className={defaultTextColor}>{children}</span>
        <span className={hoverTextColor}>{children}</span>
      </div>
    </Link>
  );
};

// Main FloatingNav Component (integrating new design)
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
  const scrollDirection = useScrollDirection();
  const [isVisible, setIsVisible] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [headerShapeClass, setHeaderShapeClass] = useState("rounded-full");
  const shapeTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    if (scrollDirection === "down") {
      setIsVisible(false);
      setIsOpen(false);
    } else if (scrollDirection === "up") {
      setIsVisible(true);
    }
  }, [scrollDirection]);

  useEffect(() => {
    const handleScroll = () => {
      const heroHeight = window.innerHeight * 0.8;
      if (window.scrollY > heroHeight) {
        if (scrollDirection === "down") setIsVisible(false);
      } else {
        setIsVisible(true);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [scrollDirection]);

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
    <div className="relative w-5 h-5 flex items-center justify-center">
      <span className="absolute w-1.5 h-1.5 rounded-full bg-blue-400 top-0 left-1/2 transform -translate-x-1/2 opacity-80"></span>
      <span className="absolute w-1.5 h-1.5 rounded-full bg-blue-400 left-0 top-1/2 transform -translate-y-1/2 opacity-80"></span>
      <span className="absolute w-1.5 h-1.5 rounded-full bg-blue-400 right-0 top-1/2 transform -translate-y-1/2 opacity-80"></span>
      <span className="absolute w-1.5 h-1.5 rounded-full bg-blue-400 bottom-0 left-1/2 transform -translate-x-1/2 opacity-80"></span>
    </div>
  );

  // Filter out button items for nav links
  const navLinks = navItems.filter((item) => !item.isButton && !item.isSignup);
  const buttonItems = navItems.filter((item) => item.isButton || item.isSignup);

  return (
    <header
      className={cn(
        `fixed top-6 left-0 right-0 z-50 w-full flex justify-center`,
        {
          "opacity-0 -translate-y-full": !isVisible,
          "opacity-100 translate-y-0": isVisible,
        },
        className
      )}
      style={{
        transform: isVisible ? "translateY(0)" : "translateY(-100%)",
        transition: "transform 0.2s ease-out",
      }}
    >
      <div
        className={cn(
          `flex flex-col items-center pl-6 pr-6 py-3 backdrop-blur-sm
          ${headerShapeClass}
          border border-[#333] bg-[#1f1f1f57]
          transition-[border-radius] duration-300 ease-in-out`
        )}
      >
        <div className="flex items-center gap-x-6 sm:gap-x-8">
          <div className="flex items-center">{logoElement}</div>

          <nav className="hidden sm:flex items-center space-x-4 sm:space-x-6 text-sm">
            {navLinks.map((link, idx) => (
              <AnimatedNavLink key={`nav-${idx}`} href={link.link}>
                {link.name}
              </AnimatedNavLink>
            ))}
          </nav>

          <div className="hidden sm:flex items-center gap-2 sm:gap-3">
            {buttonItems.map((item, idx) =>
              item.isSignup ? (
                <div
                  key={`signup-${idx}`}
                  className="relative group w-full sm:w-auto"
                >
                  <div
                    className="absolute inset-0 -m-2 rounded-full
                                hidden sm:block
                                bg-gray-100
                                opacity-40 filter blur-lg pointer-events-none
                                transition-all duration-300 ease-out
                                group-hover:opacity-60 group-hover:blur-xl group-hover:-m-3"
                  ></div>
                  <Link href={item.link}>
                    <button className="relative z-10 px-4 py-2 sm:px-3 text-xs sm:text-sm font-semibold text-black bg-gradient-to-br from-gray-100 to-gray-300 rounded-full hover:from-gray-200 hover:to-gray-400 transition-all duration-200 w-full sm:w-auto">
                      {item.name}
                    </button>
                  </Link>
                </div>
              ) : (
                <Link key={`button-${idx}`} href={item.link}>
                  <button className="px-4 py-2 sm:px-3 text-xs sm:text-sm border border-[#333] bg-[rgba(31,31,31,0.62)] text-gray-300 rounded-full hover:border-white/50 hover:text-white transition-colors duration-200 w-full sm:w-auto">
                    {item.name}
                  </button>
                </Link>
              )
            )}
          </div>

          <button
            className="sm:hidden flex items-center justify-center w-8 h-8 text-gray-300 focus:outline-none"
            onClick={toggleMenu}
            aria-label={isOpen ? "Close Menu" : "Open Menu"}
          >
            {isOpen ? (
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                ></path>
              </svg>
            ) : (
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                ></path>
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
          <nav className="flex flex-col items-center space-y-4 text-base w-full">
            {navLinks.map((link, idx) => (
              <Link
                key={`mobile-nav-${idx}`}
                href={link.link}
                className="text-gray-300 hover:text-white transition-colors w-full text-center"
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
                  <div
                    className="absolute inset-0 -m-2 rounded-full
                                hidden sm:block
                                bg-gray-100
                                opacity-40 filter blur-lg pointer-events-none
                                transition-all duration-300 ease-out
                                group-hover:opacity-60 group-hover:blur-xl group-hover:-m-3"
                  ></div>
                  <Link href={item.link}>
                    <button className="relative z-10 px-4 py-2 sm:px-3 text-xs sm:text-sm font-semibold text-black bg-gradient-to-br from-gray-100 to-gray-300 rounded-full hover:from-gray-200 hover:to-gray-400 transition-all duration-200 w-full sm:w-auto">
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
    </header>
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
