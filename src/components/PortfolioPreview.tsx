"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, ChevronRight, ChevronLeft } from "lucide-react";
import { ContainerScroll } from "@/components/ui/container-scroll-animation";

// Sample portfolio data (placeholder)
const portfolioItems = [
  {
    id: 1,
    title: "E-commerce Platform",
    category: "Web App",
    description:
      "A modern e-commerce solution with advanced filtering and payment processing. Built with Next.js and a headless CMS, this platform offers seamless shopping experiences with instant search and personalized recommendations.",
    image: "/placeholder-portfolio-1.jpg",
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

  const nextProject = () => {
    setCurrentIndex((prev) => (prev + 1) % portfolioItems.length);
  };

  const prevProject = () => {
    setCurrentIndex(
      (prev) => (prev - 1 + portfolioItems.length) % portfolioItems.length
    );
  };

  const currentProject = portfolioItems[currentIndex];

  const titleComponent = (
    <div className="text-center">
      <h2 className="text-3xl md:text-5xl font-bold mb-4">
        Featured <span className="text-gradient">Projects</span>
      </h2>
      <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
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
        <div className="flex flex-col h-full w-full">
          <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
            {/* Project Image */}
            <div className="w-full md:w-1/2 h-64 md:h-auto bg-secondary relative">
              <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-primary/10 to-accent/10 text-center p-8">
                <div>
                  <span className="text-lg font-medium px-4 py-1 rounded-full bg-background/20 backdrop-blur-sm">
                    {currentProject.category}
                  </span>
                  <h3 className="text-3xl md:text-4xl font-bold mt-4">
                    {currentProject.title}
                  </h3>
                </div>
              </div>
            </div>

            {/* Project Details */}
            <div className="w-full md:w-1/2 p-6 md:p-10 flex flex-col">
              <div className="flex-1">
                <p className="text-lg mb-6">{currentProject.description}</p>

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
                      <span>Responsive design optimized for all devices</span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2 text-primary">•</span>
                      <span>
                        Intuitive user interface with modern aesthetics
                      </span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2 text-primary">•</span>
                      <span>High-performance backend architecture</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="flex justify-between items-center mt-auto pt-4 border-t border-border">
                <div className="text-sm">
                  <span className="font-medium">{currentIndex + 1}</span> /{" "}
                  {portfolioItems.length}
                </div>
                <Link
                  href={`/portfolio/${currentProject.id}`}
                  className="flex items-center gap-2 bg-primary text-primary-foreground px-5 py-2 rounded-full hover:bg-primary/90 transition-colors"
                >
                  View Details <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
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
