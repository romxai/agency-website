"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  // Handle component mount
  useEffect(() => {
    setMounted(true);
  }, []);

  // Handle scroll events to change navbar appearance
  useEffect(() => {
    const handleScroll = () => {
      const heroHeight = window.innerHeight * 0.8; // Approximately the hero section height
      setScrolled(window.scrollY > heroHeight);
    };

    // Add scroll event listener
    window.addEventListener("scroll", handleScroll);

    // Initial check
    handleScroll();

    // Clean up
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className={`fixed top-0 left-0 w-full z-50 flex justify-center transition-all duration-300 ${
        scrolled ? "px-0" : "px-4"
      }`}
    >
      <div
        className={`${
          scrolled
            ? "w-full bg-background/70 backdrop-blur-md"
            : "w-[90%] max-w-7xl bg-background/30 backdrop-blur-sm rounded-full"
        } transition-all duration-300`}
      >
        <nav className="w-full">
          <div className="container mx-auto flex items-center justify-between h-16 px-4 md:px-8">
            <Link href="/" className="font-bold text-xl">
              <span className="text-gradient">DevAgency</span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <Link
                href="/"
                className="text-foreground hover:text-primary transition-colors font-medium"
              >
                Home
              </Link>
              <Link
                href="/about"
                className="text-foreground hover:text-primary transition-colors font-medium"
              >
                About
              </Link>
              <Link
                href="/portfolio"
                className="text-foreground hover:text-primary transition-colors font-medium"
              >
                Portfolio
              </Link>
              <Link
                href="#contact"
                className="bg-primary text-primary-foreground px-5 py-2 rounded-full hover:bg-primary/90 transition-colors font-medium"
              >
                Contact Us
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button className="md:hidden" onClick={toggleMenu}>
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Mobile Navigation */}
          {isOpen && (
            <div className="md:hidden absolute top-16 left-0 right-0 bg-background/80 backdrop-blur-sm border-b border-border animate-fade-in">
              <div className="container py-4 flex flex-col space-y-4">
                <Link
                  href="/"
                  className="text-foreground hover:text-primary transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  Home
                </Link>
                <Link
                  href="/about"
                  className="text-foreground hover:text-primary transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  About
                </Link>
                <Link
                  href="/portfolio"
                  className="text-foreground hover:text-primary transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  Portfolio
                </Link>
                <Link
                  href="#contact"
                  className="bg-primary text-primary-foreground px-4 py-2 rounded-full hover:bg-primary/90 transition-colors w-fit"
                  onClick={() => setIsOpen(false)}
                >
                  Contact Us
                </Link>
              </div>
            </div>
          )}
        </nav>
      </div>
    </div>
  );
};

export default Navbar;
