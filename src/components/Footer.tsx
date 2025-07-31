"use client";

import React from "react";
import type { ComponentProps, ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import {
  Mail,
  Phone,
  MapPin,
  Github,
  Twitter,
  Linkedin,
  Instagram,
  Globe,
} from "lucide-react";

interface FooterLink {
  title: string;
  href: string;
  icon?: React.ComponentType<{ className?: string }>;
}

interface FooterSection {
  label: string;
  links: FooterLink[];
}

const footerLinks: FooterSection[] = [
  {
    label: "Services",
    links: [
      { title: "Web Development", href: "#services" },
      { title: "Mobile Development", href: "#services" },
      { title: "AI Agents", href: "#services" },
      { title: "UX/UI Design", href: "#services" },
    ],
  },
  {
    label: "Company",
    links: [
      { title: "About Us", href: "/about" },
      { title: "Portfolio", href: "/portfolio" },
      { title: "Contact", href: "#contact" },
      { title: "Privacy Policy", href: "/privacy" },
    ],
  },
  {
    label: "Resources",
    links: [
      { title: "Blog", href: "/blog" },
      { title: "Case Studies", href: "/case-studies" },
      { title: "Documentation", href: "/docs" },
      { title: "Support", href: "/support" },
    ],
  },
  {
    label: "Social Links",
    links: [
      { title: "GitHub", href: "https://github.com", icon: Github },
      { title: "Twitter", href: "https://twitter.com", icon: Twitter },
      { title: "LinkedIn", href: "https://linkedin.com", icon: Linkedin },
      { title: "Instagram", href: "https://instagram.com", icon: Instagram },
    ],
  },
];

type ViewAnimationProps = {
  delay?: number;
  className?: ComponentProps<typeof motion.div>["className"];
  children: ReactNode;
};

function AnimatedContainer({
  className,
  delay = 0.1,
  children,
}: ViewAnimationProps) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return children;
  }

  return (
    <motion.div
      initial={{ filter: "blur(4px)", translateY: -8, opacity: 0 }}
      whileInView={{ filter: "blur(0px)", translateY: 0, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.8 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

const Footer = () => {
  return (
    // REMOVED: md:rounded-t-6xl, rounded-t-4xl, max-w-6xl, mx-auto, px-6, lg:px-16
    // ADDED:   container (to reintroduce inner padding for content)
    <footer className="relative w-full flex flex-col items-center justify-center border-t bg-[radial-gradient(35%_128px_at_50%_0%,theme(backgroundColor.white/8%),transparent)] py-12 lg:py-16">
      <div className="bg-foreground/20 absolute top-0 right-1/2 left-1/2 h-px w-1/3 -translate-x-1/2 -translate-y-1/2 rounded-full blur" />

      {/* Added a container div for content padding, similar to your main layout */}
      <div className="container">
        <div className="grid w-full gap-8 xl:grid-cols-3 xl:gap-8">
          <AnimatedContainer className="space-y-4">
            <div className="flex items-center space-x-2">
              <Globe className="size-8 text-primary" />
              <span className="text-xl font-bold">
                <span className="text-gradient">DevAgency</span>
              </span>
            </div>
            <p className="text-muted-foreground mt-8 text-sm md:mt-0 font-redhat-regular">
              Premium software development agency specializing in web
              applications, mobile apps, AI agents, and UX/UI design.
            </p>
            <div className="space-y-2 text-sm text-muted-foreground font-redhat-regular">
              <div className="flex items-center space-x-2">
                <Mail className="size-4 text-primary" />
                <span>contact@devagency.com</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="size-4 text-primary" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="size-4 text-primary" />
                <span>123 Tech Street, San Francisco, CA 94105</span>
              </div>
            </div>
            <p className="text-muted-foreground text-sm">
              © {new Date().getFullYear()} DevAgency. All rights reserved.
            </p>
          </AnimatedContainer>

          <div className="mt-10 grid grid-cols-2 gap-8 md:grid-cols-4 xl:col-span-2 xl:mt-0">
            {footerLinks.map((section, index) => (
              <AnimatedContainer key={section.label} delay={0.1 + index * 0.1}>
                <div className="mb-10 md:mb-0">
                  <h3 className="text-xs font-semibold text-foreground mb-4">
                    {section.label}
                  </h3>
                  <ul className="text-muted-foreground space-y-2 text-sm">
                    {section.links.map((link) => (
                      <li key={link.title}>
                        <Link
                          href={link.href}
                          className="hover:text-foreground inline-flex items-center transition-all duration-300 font-redhat-regular"
                        >
                          {link.icon && <link.icon className="me-1 size-4" />}
                          {link.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </AnimatedContainer>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
