"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, ChevronRight, ChevronLeft } from "lucide-react";
import { ContainerScroll } from "@/components/ui/container-scroll-animation";
import { GradientHeading } from "./ui/gradient-heading";

// Sample portfolio data (placeholder)
const portfolioItems = [
  {
    id: 1,
    title: "E-commerce Platform",
    category: "Web App",
    description:
      "A modern e-commerce solution with advanced filtering and payment processing. Built with Next.js and a headless CMS, this platform offers seamless shopping experiences with instant search and personalized recommendations.",
    image:
      "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=300&fit=crop&crop=center",
    technologies: ["Next.js", "React", "Node.js", "MongoDB"],
  },
  {
    id: 2,
    title: "Health & Fitness App",
    category: "Mobile App",
    description:
      "Cross-platform mobile application for tracking workouts and nutrition. Features include personalized workout plans, meal tracking, progress visualization, and social sharing capabilities.",
    image: "/placeholder-portfolio-2.jpg",
    technologies: ["React Native", "Firebase", "GraphQL"],
  },
  {
    id: 3,
    title: "AI-Powered Assistant",
    category: "AI Agent",
    description:
      "Intelligent virtual assistant for customer service automation. Leveraging natural language processing and machine learning to provide instant responses and route complex queries to human agents.",
    image: "/placeholder-portfolio-3.jpg",
    technologies: ["Python", "TensorFlow", "AWS"],
  },
  {
    id: 4,
    title: "Financial Dashboard",
    category: "Web App",
    description:
      "Real-time analytics dashboard for financial data visualization. Helps businesses track key performance indicators, forecast trends, and make data-driven decisions with interactive charts and reports.",
    image: "/placeholder-portfolio-4.jpg",
    technologies: ["React", "D3.js", "Express", "PostgreSQL"],
  },
  {
    id: 5,
    title: "Social Media Platform",
    category: "Web & Mobile",
    description:
      "Full-stack social media platform with real-time messaging. Features include user profiles, content sharing, direct messaging, notifications, and comprehensive analytics for content creators.",
    image: "/placeholder-portfolio-5.jpg",
    technologies: ["Next.js", "React Native", "Socket.io", "MongoDB"],
  },
];

const PortfolioPreview = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showDetails, setShowDetails] = useState(false);

  const nextProject = () => {
    setCurrentIndex((prev) => (prev + 1) % portfolioItems.length);
    setShowDetails(false);
  };

  const prevProject = () => {
    setCurrentIndex(
      (prev) => (prev - 1 + portfolioItems.length) % portfolioItems.length
    );
    setShowDetails(false);
  };

  const handleLearnMore = () => {
    setShowDetails(true);
  };

  const handleCloseDetails = () => {
    setShowDetails(false);
  };

  const currentProject = portfolioItems[currentIndex];

  const titleComponent = (
    <div className="text-center">
      <GradientHeading
        size="xl"
        weight="semi"
        variant="accent1"
        className="font-monesta-semibold leading-none mb-0"
      >
        Featured Projects
      </GradientHeading>

      <p className="text-gray-200 max-w-2xl mx-auto mb-8 font-redhat-regular opacity-70">
        Explore our portfolio of innovative digital solutions crafted with
        cutting-edge technology.
      </p>
      <div className="flex justify-center gap-4 mb-8">
        <button
          onClick={prevProject}
          className="p-3 rounded-full bg-secondary hover:bg-secondary/80 transition-colors"
          aria-label="Previous project"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <button
          onClick={nextProject}
          className="p-3 rounded-full bg-secondary hover:bg-secondary/80 transition-colors"
          aria-label="Next project"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>
    </div>
  );

  return (
    <section id="portfolio-preview">
      <ContainerScroll titleComponent={titleComponent}>
        <div className="relative w-full h-[600px] bg-secondary rounded-lg overflow-hidden group">
          {/* Main Project Image */}
          <div
            className="absolute inset-0 bg-cover bg-center transition-all duration-700 ease-in-out saturate-0 group-hover:saturate-100"
            style={{
              backgroundImage: `url(${currentProject.image})`,
            }}
          >
            {/* Fallback gradient when image is not available */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
              <div className="text-center">
                <span className="text-lg font-medium px-4 py-1 rounded-full bg-background/20 backdrop-blur-sm">
                  {currentProject.category}
                </span>
                <h3 className="text-3xl md:text-4xl font-bold mt-4">
                  {currentProject.title}
                </h3>
              </div>
            </div>
          </div>

          {/* Hover overlay for Learn More button */}
          <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            {!showDetails && (
              <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                onClick={handleLearnMore}
                className="bg-primary text-primary-foreground px-6 py-3 rounded-full hover:bg-primary/90 transition-colors font-medium shadow-lg"
              >
                Learn More
              </motion.button>
            )}
          </div>

          {/* Sliding Details Panel */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: showDetails ? "50%" : "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="absolute top-0 right-0 w-1/2 h-full bg-background/95 backdrop-blur-md border-l border-border p-6 md:p-8 flex flex-col"
          >
            {/* Close button */}
            <button
              onClick={handleCloseDetails}
              className="absolute top-4 right-4 p-2 hover:bg-secondary rounded-full transition-colors"
              aria-label="Close details"
            >
              <ArrowRight className="h-5 w-5 rotate-180" />
            </button>

            {/* Project Details Content */}
            <div className="flex-1 pt-8">
              <div className="mb-4">
                <span className="text-sm font-medium px-3 py-1 rounded-full bg-primary/10 text-primary">
                  {currentProject.category}
                </span>
              </div>

              <h3 className="text-2xl md:text-3xl font-bold mb-4">
                {currentProject.title}
              </h3>

              <p className="text-muted-foreground mb-6 leading-relaxed">
                {currentProject.description}
              </p>

              <div className="mb-6">
                <h4 className="font-bold mb-3">Technologies:</h4>
                <div className="flex flex-wrap gap-2">
                  {currentProject.technologies?.map((tech) => (
                    <span
                      key={tech}
                      className="text-sm px-3 py-1 bg-secondary rounded-full text-secondary-foreground"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div className="space-y-4 mb-8">
                <h4 className="font-bold">Key Features:</h4>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <span className="mr-2 text-primary">•</span>
                    <span className="text-sm">
                      Responsive design optimized for all devices
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2 text-primary">•</span>
                    <span className="text-sm">
                      Intuitive user interface with modern aesthetics
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2 text-primary">•</span>
                    <span className="text-sm">
                      High-performance backend architecture
                    </span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Action buttons */}
            <div className="pt-4 border-t border-border">
              <Link
                href={`/portfolio/${currentProject.id}`}
                className="flex items-center justify-center gap-2 bg-primary text-primary-foreground px-5 py-3 rounded-full hover:bg-primary/90 transition-colors w-full"
              >
                View Full Project <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </motion.div>

          {/* Project counter */}
          <div className="absolute bottom-4 left-4 bg-background/80 backdrop-blur-sm px-3 py-1 rounded-full text-sm">
            <span className="font-medium">{currentIndex + 1}</span> /{" "}
            {portfolioItems.length}
          </div>
        </div>
      </ContainerScroll>

      <div className="container mt-8 text-center">
        <Link
          href="/portfolio"
          className="inline-flex items-center gap-2 text-primary hover:underline"
        >
          View All Projects <ArrowRight size={16} />
        </Link>
      </div>
    </section>
  );
};

export default PortfolioPreview;
