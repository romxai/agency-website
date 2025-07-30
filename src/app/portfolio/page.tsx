"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

// Sample portfolio data (placeholder)
const portfolioItems = [
  {
    id: 1,
    title: "E-commerce Platform",
    category: "Web App",
    tech: ["Next.js", "React", "Node.js", "MongoDB"],
    description:
      "A modern e-commerce solution with advanced filtering and payment processing.",
    image: "/placeholder-portfolio-1.jpg",
  },
  {
    id: 2,
    title: "Health & Fitness App",
    category: "Mobile App",
    tech: ["React Native", "Firebase", "GraphQL"],
    description:
      "Cross-platform mobile application for tracking workouts and nutrition.",
    image: "/placeholder-portfolio-2.jpg",
  },
  {
    id: 3,
    title: "AI-Powered Assistant",
    category: "AI Agent",
    tech: ["Python", "TensorFlow", "AWS"],
    description:
      "Intelligent virtual assistant for customer service automation.",
    image: "/placeholder-portfolio-3.jpg",
  },
  {
    id: 4,
    title: "Financial Dashboard",
    category: "Web App",
    tech: ["React", "D3.js", "Express", "PostgreSQL"],
    description:
      "Real-time analytics dashboard for financial data visualization.",
    image: "/placeholder-portfolio-4.jpg",
  },
  {
    id: 5,
    title: "E-Learning Platform",
    category: "Web App",
    tech: ["Next.js", "React", "Node.js", "MongoDB"],
    description:
      "Interactive learning platform with video courses and quizzes.",
    image: "/placeholder-portfolio-6.jpg",
  },
];

// Extract unique categories and technologies for filters
const categories = Array.from(
  new Set(portfolioItems.map((item) => item.category))
);
const technologies = Array.from(
  new Set(portfolioItems.flatMap((item) => item.tech))
);

export default function PortfolioPage() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedTech, setSelectedTech] = useState<string | null>(null);
  const [activeItem, setActiveItem] = useState<number | null>(null);

  // Filter projects based on selected filters
  const filteredProjects = portfolioItems.filter((item) => {
    const categoryMatch = selectedCategory
      ? item.category === selectedCategory
      : true;
    const techMatch = selectedTech ? item.tech.includes(selectedTech) : true;
    return categoryMatch && techMatch;
  });

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category === selectedCategory ? null : category);
  };

  const handleTechChange = (tech: string) => {
    setSelectedTech(tech === selectedTech ? null : tech);
  };

  return (
    <div className="pt-20">
      <div className="container py-16 md:py-24">
        <h1 className="text-4xl md:text-5xl font-bold mb-8">
          Our <span className="text-gradient">Portfolio</span>
        </h1>

        <div className="mb-12">
          <div className="mb-6">
            <h3 className="text-lg font-medium mb-3">Filter by Project Type</h3>
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => handleCategoryChange(category)}
                  className={`px-4 py-2 rounded-md text-sm ${
                    selectedCategory === category
                      ? "bg-primary text-primary-foreground"
                      : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                  }`}
                >
                  {category}
                </button>
              ))}
              {selectedCategory && (
                <button
                  onClick={() => setSelectedCategory(null)}
                  className="px-4 py-2 rounded-md text-sm bg-muted text-muted-foreground hover:bg-muted/80"
                >
                  Clear
                </button>
              )}
            </div>
          </div>

          <div>
            <h3 className="text-lg font-medium mb-3">Filter by Technology</h3>
            <div className="flex flex-wrap gap-2">
              {technologies.map((tech) => (
                <button
                  key={tech}
                  onClick={() => handleTechChange(tech)}
                  className={`px-4 py-2 rounded-md text-sm ${
                    selectedTech === tech
                      ? "bg-primary text-primary-foreground"
                      : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                  }`}
                >
                  {tech}
                </button>
              ))}
              {selectedTech && (
                <button
                  onClick={() => setSelectedTech(null)}
                  className="px-4 py-2 rounded-md text-sm bg-muted text-muted-foreground hover:bg-muted/80"
                >
                  Clear
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Portfolio Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <motion.div
              key={project.id}
              layoutId={`project-${project.id}`}
              className="bg-card rounded-lg overflow-hidden border border-border"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <div className="h-48 bg-muted relative">
                {/* Placeholder for project image */}
                <div className="absolute inset-0 flex items-center justify-center bg-secondary text-secondary-foreground">
                  <span className="text-lg font-medium">
                    {project.category}
                  </span>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                <p className="text-muted-foreground mb-4">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tech.map((tech) => (
                    <span
                      key={tech}
                      className="text-xs px-2 py-1 bg-secondary rounded-full text-secondary-foreground"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                <button
                  onClick={() => setActiveItem(project.id)}
                  className="text-primary hover:underline flex items-center gap-1"
                >
                  View Details <ArrowRight size={14} />
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {filteredProjects.length === 0 && (
          <div className="text-center py-12">
            <h3 className="text-xl font-medium mb-2">
              No projects match your filters
            </h3>
            <p className="text-muted-foreground">
              Try adjusting your filter criteria
            </p>
          </div>
        )}

        {/* Project Modal (placeholder) */}
        {activeItem && (
          <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-card rounded-lg p-6 max-w-2xl w-full border border-border">
              <h2 className="text-2xl font-bold mb-4">
                {portfolioItems.find((p) => p.id === activeItem)?.title}
              </h2>
              <p className="mb-4">
                This is a placeholder for the project detail modal. In a real
                implementation, this would show more details, screenshots, and
                links to the project.
              </p>
              <button
                onClick={() => setActiveItem(null)}
                className="bg-primary text-primary-foreground px-4 py-2 rounded-md hover:bg-primary/90 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
