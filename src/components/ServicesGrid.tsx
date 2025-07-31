"use client";

import { motion } from "framer-motion";
import {
  Globe,
  Smartphone,
  Bot,
  Palette,
  Database,
  Shield,
} from "lucide-react";
import { GlowCard } from "@/components/ui/spotlight-card";

const services = [
  {
    icon: <Globe className="h-8 w-8" />,
    title: "Web Development",
    description:
      "Modern, responsive web applications built with the latest technologies.",
    color: "blue",
  },
  {
    icon: <Smartphone className="h-8 w-8" />,
    title: "Mobile Development",
    description: "Native and cross-platform mobile apps for iOS and Android.",
    color: "green",
  },
  {
    icon: <Bot className="h-8 w-8" />,
    title: "AI Agents",
    description:
      "Intelligent automation solutions powered by machine learning.",
    color: "purple",
  },
  {
    icon: <Palette className="h-8 w-8" />,
    title: "UX/UI Design",
    description:
      "Beautiful, intuitive interfaces designed for optimal user experience.",
    color: "red",
  },
  {
    icon: <Database className="h-8 w-8" />,
    title: "Backend Systems",
    description: "Scalable, secure backend infrastructure and API development.",
    color: "orange",
  },
  {
    icon: <Shield className="h-8 w-8" />,
    title: "Security Solutions",
    description: "Comprehensive security audits and implementation.",
    color: "blue",
  },
];

const ServicesGrid = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  const PAGE_BACKGROUND_COLOR = "#000000"; // <--- CHANGE THIS TO YOUR ACTUAL PAGE BACKGROUND COLOR

  return (
    <section
      id="portfolio-preview"
      className="relative"
      style={{
        // Stack the linear gradient on top of your background image
        background: `
          linear-gradient(to bottom, 
            ${PAGE_BACKGROUND_COLOR} 0%, 
            rgba(0, 0, 0, 0) 5%, 
            rgba(0, 0, 0, 0) 95%, 
            ${PAGE_BACKGROUND_COLOR} 100%
          ),
          url('/polygon-scatter-haikei.svg')
        `,
        backgroundSize: "cover, cover", // One for gradient, one for image
        backgroundPosition: "center, center", // One for gradient, one for image
        backgroundRepeat: "no-repeat, no-repeat", // One for gradient, one for image
      }}
    >
      <div className="absolute inset-0 bg-background/40"></div>
      <div className="container relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">
            Our <span className="text-gradient">Services</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            We offer a comprehensive range of software development services to
            help businesses transform their digital presence and operations.
          </p>
        </div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {services.map((service, index) => (
            <motion.div key={index} variants={itemVariants}>
              <GlowCard
                glowColor={service.color as any}
                customSize={true}
                width="100%"
                height="100%"
                className="h-full min-h-[280px] bg-card dark-card"
              >
                <div className="flex flex-col h-full">
                  <div className="mb-4 text-primary p-2 rounded-full w-14 h-14 flex items-center justify-center bg-secondary/30">
                    {service.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-3">{service.title}</h3>
                  <p className="text-muted-foreground">{service.description}</p>
                </div>
              </GlowCard>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default ServicesGrid;
