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

const services = [
  {
    icon: <Globe className="h-8 w-8" />,
    title: "Web Development",
    description:
      "Modern, responsive web applications built with the latest technologies.",
    color: "from-blue-500/20 to-blue-600/20",
  },
  {
    icon: <Smartphone className="h-8 w-8" />,
    title: "Mobile Development",
    description: "Native and cross-platform mobile apps for iOS and Android.",
    color: "from-green-500/20 to-green-600/20",
  },
  {
    icon: <Bot className="h-8 w-8" />,
    title: "AI Agents",
    description:
      "Intelligent automation solutions powered by machine learning.",
    color: "from-purple-500/20 to-purple-600/20",
  },
  {
    icon: <Palette className="h-8 w-8" />,
    title: "UX/UI Design",
    description:
      "Beautiful, intuitive interfaces designed for optimal user experience.",
    color: "from-pink-500/20 to-pink-600/20",
  },
  {
    icon: <Database className="h-8 w-8" />,
    title: "Backend Systems",
    description: "Scalable, secure backend infrastructure and API development.",
    color: "from-amber-500/20 to-amber-600/20",
  },
  {
    icon: <Shield className="h-8 w-8" />,
    title: "Security Solutions",
    description: "Comprehensive security audits and implementation.",
    color: "from-red-500/20 to-red-600/20",
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

  return (
    <section className="py-20 bg-background" id="services">
      <div className="container">
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
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {services.map((service, index) => (
            <motion.div
              key={index}
              className={`bg-gradient-to-br ${service.color} p-6 rounded-lg border border-border backdrop-blur-sm`}
              variants={itemVariants}
            >
              <div className="bg-background/50 backdrop-blur-sm p-8 rounded-md h-full">
                <div className="mb-4 text-primary">{service.icon}</div>
                <h3 className="text-xl font-bold mb-3">{service.title}</h3>
                <p className="text-muted-foreground">{service.description}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default ServicesGrid;
