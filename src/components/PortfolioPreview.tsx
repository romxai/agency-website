"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { ContainerScroll } from "@/components/ui/container-scroll-animation";
import { GradientHeading } from "./ui/gradient-heading";
import { ShimmerButton } from "./magicui/shimmer-button";
import { ShinyButton } from "./magicui/shiny-button";

// Interface for projects from database
interface Project {
  _id: string;
  title: string;
  description: string;
  images: string[];
  projectTags: string[];
  techTags: string[];
  isLive: boolean;
  liveLink?: string;
  githubLink?: string;
  isHidden: boolean;
  isStarred: boolean;
  createdAt: string;
}

const PortfolioPreview = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showOverlay, setShowOverlay] = useState(false);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/projects");
      if (response.ok) {
        const projectsData = await response.json();
        // Take only the first 3 projects for the preview
        setProjects(projectsData.slice(0, 3));
      }
    } catch (error) {
      console.error("Error fetching projects:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleProjectSelect = (index: number) => {
    setCurrentIndex(index);
    setShowOverlay(false);
  };

  const handleContainerClick = () => {
    setShowOverlay(true);
  };

  const handleCloseOverlay = () => {
    setShowOverlay(false);
  };

  // Add "All Projects" option to the projects array
  const portfolioItems = [
    ...projects,
    {
      _id: "all-projects",
      title: "All Projects",
      description: "",
      images: [],
      projectTags: [],
      techTags: [],
      isLive: false,
      isHidden: false,
      isStarred: false,
      createdAt: "",
    },
  ];

  const currentProject = portfolioItems[currentIndex];

  // Determine the index of the 'All Projects' chip
  const allProjectsChipIndex = portfolioItems.findIndex(
    (item) => item._id === "all-projects"
  );

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
        {portfolioItems.map((project, index) => {
          // Check if this is the 'All Projects' chip using its unique ID
          const isAllProjectsChip = project._id === "all-projects";

          if (isAllProjectsChip) {
            // Render the 'All Projects' chip as a direct Link
            return (
              <ShinyButton
                key={project._id}
                onClick={() => handleProjectSelect(index)}
                className="text-white"
              >
                <span className="underline mt-1 text-gray-200/70">
                  All Projects
                </span>
              </ShinyButton>
            );
          } else {
            // Render regular project chips
            return (
              <ShimmerButton
                key={project._id}
                onClick={() => handleProjectSelect(index)}
                shimmerColor={currentIndex === index ? "#fbbf24" : "#ffffff"}
                background={"rgba(0, 0, 0, 1)"}
                className={
                  currentIndex === index
                    ? "text-yellow-400 dark:text-yellow-400"
                    : "text-white dark:text-white"
                }
                shimmerDuration="2s"
                borderRadius="50px"
              >
                {project.projectTags[0] || "Project"}
              </ShimmerButton>
            );
          }
        })}
      </div>
    </div>
  );

  const PAGE_BACKGROUND_COLOR = "#000000"; // <--- CHANGE THIS TO YOUR ACTUAL PAGE BACKGROUND COLOR

  if (loading) {
    return (
      <section
        id="portfolio-preview"
        className="relative"
        style={{
          background: `
            linear-gradient(to bottom,
              ${PAGE_BACKGROUND_COLOR} 0%,
              rgba(10, 10, 10, 0) 5%,
              rgba(10, 10, 10, 0) 95%,
              ${PAGE_BACKGROUND_COLOR} 100%
            ),
            url('/polygon-scatter-haikei.svg')
          `,
          backgroundSize: "cover, cover",
          backgroundPosition: "center, center",
          backgroundRepeat: "no-repeat, no-repeat",
        }}
      >
        <div className="absolute inset-0 bg-background/40"></div>
        <div className="relative z-10">
          <div className="flex items-center justify-center h-64">
            <div className="text-gray-500">Loading featured projects...</div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      id="portfolio-preview"
      className="relative"
      style={{
        background: `
          linear-gradient(to bottom,
            ${PAGE_BACKGROUND_COLOR} 0%,
            rgba(10, 10, 10, 0) 5%,
            rgba(10, 10, 10, 0) 95%,
            ${PAGE_BACKGROUND_COLOR} 100%
          ),
          url('/polygon-scatter-haikei.svg')
        `,
        backgroundSize: "cover, cover",
        backgroundPosition: "center, center",
        backgroundRepeat: "no-repeat, no-repeat",
      }}
    >
      <div className="absolute inset-0 bg-background/40"></div>
      <div className="relative z-10">
        <ContainerScroll titleComponent={titleComponent}>
          {/*
            Only display project details if the currently selected item is NOT the 'All Projects' chip.
            The 'All Projects' chip is for direct navigation, not for displaying content here.
          */}
          {currentIndex !== allProjectsChipIndex ? (
            <div
              className="relative w-full h-full bg-background rounded-lg overflow-hidden cursor-pointer group"
              onClick={handleContainerClick}
            >
              {/* Main Layout Container */}
              <div className="flex h-full">
                {/* Left Half - Split into 2 sections */}
                <div className="w-1/2 flex flex-col">
                  {/* Top Section - Image */}
                  <div className="h-1/2 relative overflow-hidden">
                    <div
                      className="w-full h-full bg-cover bg-center transition-all duration-700 ease-in-out grayscale group-hover:grayscale-0"
                      style={{
                        backgroundImage: `url(${
                          currentProject.images[0] || "/shape-min.png"
                        })`,
                      }}
                    >
                      {/* Fallback gradient when image is not available */}
                      <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                        <div className="text-center">
                          <span className="text-lg font-medium px-4 py-1 rounded-full bg-background/20 backdrop-blur-sm">
                            {currentProject.projectTags[0] || "Project"}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Bottom Section - Project Name */}
                  <div className="h-1/2 flex items-center justify-center p-6">
                    <div className="text-center">
                      <h3 className="text-2xl md:text-3xl font-bold text-foreground">
                        {currentProject.title}
                      </h3>
                      <p className="text-muted-foreground mt-2">
                        {currentProject.projectTags[0] || "Project"}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Right Half - Project Information */}
                <div className="w-1/2 p-6 md:p-8 flex flex-col justify-center">
                  <div className="mb-6">
                    <span className="text-sm font-medium px-3 py-1 rounded-full bg-primary/10 text-primary">
                      {currentProject.projectTags[0] || "Project"}
                    </span>
                  </div>

                  <h3 className="text-2xl md:text-3xl font-bold mb-4 text-foreground">
                    {currentProject.title}
                  </h3>

                  <p className="text-muted-foreground mb-6 leading-relaxed">
                    {currentProject.description}
                  </p>

                  <div className="mb-6">
                    <h4 className="font-bold mb-3 text-foreground">
                      Technologies:
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {currentProject.techTags?.slice(0, 4).map((tech) => (
                        <span
                          key={tech}
                          className="text-sm px-3 py-1 bg-secondary rounded-full text-secondary-foreground"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h4 className="font-bold text-foreground">Key Features:</h4>
                    <ul className="space-y-2">
                      <li className="flex items-start">
                        <span className="mr-2 text-primary">•</span>
                        <span className="text-sm text-muted-foreground">
                          Responsive design optimized for all devices
                        </span>
                      </li>
                      <li className="flex items-start">
                        <span className="mr-2 text-primary">•</span>
                        <span className="text-sm text-muted-foreground">
                          Intuitive user interface with modern aesthetics
                        </span>
                      </li>
                      <li className="flex items-start">
                        <span className="mr-2 text-primary">•</span>
                        <span className="text-sm text-muted-foreground">
                          High-performance backend architecture
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Grey Overlay with Learn More Button */}
              {showOverlay && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="text-center">
                    <motion.button
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                      onClick={handleCloseOverlay}
                      className="bg-primary text-primary-foreground px-6 py-3 rounded-full hover:bg-primary/90 transition-colors font-medium shadow-lg mr-4"
                    >
                      Learn More
                    </motion.button>
                    <Link
                      href="/portfolio"
                      className="inline-flex items-center gap-2 bg-secondary text-secondary-foreground px-6 py-3 rounded-full hover:bg-secondary/80 transition-colors font-medium shadow-lg"
                    >
                      View Full Project <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                </motion.div>
              )}
            </div>
          ) : (
            // Content to show when 'All Projects' chip is clicked (optional, can be empty)
            // You can put a simple message or nothing at all here.
            <div className="flex items-center justify-center h-full text-center">
              <p className="text-lg text-muted-foreground">
                Click "All Projects" to explore our complete portfolio.
              </p>
            </div>
          )}
        </ContainerScroll>

        {/* The separate 'View All Projects' div is now fully removed */}
      </div>
    </section>
  );
};

export default PortfolioPreview;
