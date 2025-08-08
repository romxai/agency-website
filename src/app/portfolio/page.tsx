// src/app/portfolio/page.tsx

"use client";

import { motion, Variants, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { GradientHeading } from "@/components/ui/gradient-heading";
import { ShimmerButton } from "@/components/magicui/shimmer-button";
import { X, Globe, Github } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { ProjectDetailsModal } from "@/components/ProjectDetailsModal";

// Import LightRays with SSR disabled
const LightRays = dynamic(() => import("@/components/ui/light-rays"), {
  ssr: false,
});

// --- ANIMATION LOGIC ---
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
  },
};
// --- END ANIMATION LOGIC ---

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

// Interface for tags from database
interface Tag {
  _id: string;
  name: string;
  color: string;
  isTech: boolean;
  createdAt: string;
}

// A reusable card wrapper for consistent hover effects
const InteractiveCard = ({
  children,
  className,
  onClick,
}: {
  children: React.ReactNode;
  className: string;
  onClick: () => void;
}) => (
  <motion.div
    className={`group relative ${className}`}
    whileHover={{ scale: 1.02, y: -5 }}
    transition={{ duration: 0.2, ease: "easeOut" }}
    onClick={onClick}
  >
    {/* Animated gradient border glow that appears on hover */}
    <div
      className="pointer-events-none absolute -inset-px rounded-xl sm:rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
      style={{
        background: `
          radial-gradient(400px circle at 50% 0%, rgba(255, 237, 153, 0.2), transparent 40%),
          radial-gradient(400px circle at 50% 100%, rgba(255, 237, 153, 0.2), transparent 40%),
          radial-gradient(400px circle at 0% 50%, rgba(255, 237, 153, 0.2), transparent 40%),
          radial-gradient(400px circle at 100% 50%, rgba(255, 237, 153, 0.2), transparent 40%)
        `,
      }}
      aria-hidden="true"
    />
    {children}
  </motion.div>
);

export default function PortfolioPage() {
  const [mounted, setMounted] = useState(false);
  const [projects, setProjects] = useState<Project[]>([]);
  const [tags, setTags] = useState<Tag[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedTechs, setSelectedTechs] = useState<string[]>([]);
  const [activeItem, setActiveItem] = useState<Project | null>(null);

  useEffect(() => {
    setMounted(true);
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [projectsResponse, tagsResponse] = await Promise.all([
        fetch("/api/projects"),
        fetch("/api/tags"),
      ]);

      if (projectsResponse.ok) {
        const projectsData = await projectsResponse.json();
        setProjects(projectsData);
      }

      if (tagsResponse.ok) {
        const tagsData = await tagsResponse.json();
        setTags(tagsData);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  // Extract unique categories and technologies for filters
  const categories = Array.from(
    new Set(projects.flatMap((project) => project.projectTags))
  );
  const technologies = Array.from(
    new Set(projects.flatMap((project) => project.techTags))
  );

  // Filter projects based on selected filters
  const filteredProjects = projects.filter((item) => {
    const categoryMatch =
      selectedCategories.length === 0 ||
      selectedCategories.some((category) =>
        item.projectTags.includes(category)
      );
    const techMatch =
      selectedTechs.length === 0 ||
      selectedTechs.some((tech) => item.techTags.includes(tech));
    return categoryMatch && techMatch;
  });

  const handleCategoryChange = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  const handleTechChange = (tech: string) => {
    setSelectedTechs((prev) =>
      prev.includes(tech) ? prev.filter((t) => t !== tech) : [...prev, tech]
    );
  };

  const clearFilters = () => {
    setSelectedCategories([]);
    setSelectedTechs([]);
  };

  // Truncate description for the main cards
  const truncateDescription = (text: string, maxLength: number) => {
    if (text.length <= maxLength) {
      return text;
    }
    return text.substring(0, maxLength).trim() + "...";
  };

  if (loading) {
    return (
      <section className="relative py-12 sm:py-16 md:py-20 overflow-hidden bg-black">
        <div className="container relative z-10">
          <div className="flex items-center justify-center h-64">
            <div className="text-gray-500">Loading portfolio...</div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="relative py-12 sm:py-16 md:py-20 overflow-hidden bg-black">
      {/* LightRays Backgrounds */}
      <div className="absolute inset-0 z-0">
        {mounted && (
          <LightRays
            raysOrigin="left"
            raysSpeed={1}
            lightSpread={3}
            rayLength={1}
            pulsating={false}
            fadeDistance={0.7}
            saturation={1}
            followMouse={true}
            mouseInfluence={0.1}
            noiseAmount={0.05}
            distortion={0}
            glowAmount={0}
            className="w-full h-full"
          />
        )}
        {!mounted && (
          <div className="w-full h-full bg-gradient-to-b from-primary/5 to-accent/10"></div>
        )}
      </div>
      <div className="absolute inset-0 z-0">
        {mounted && (
          <LightRays
            raysOrigin="right"
            raysSpeed={1}
            lightSpread={3}
            rayLength={1}
            pulsating={false}
            fadeDistance={0.7}
            saturation={1}
            followMouse={true}
            mouseInfluence={0.1}
            noiseAmount={0.05}
            distortion={0}
            glowAmount={0}
            className="w-full h-full"
          />
        )}
        {!mounted && (
          <div className="w-full h-full bg-gradient-to-b from-primary/5 to-accent/10"></div>
        )}
      </div>

      {/* Content */}
      <div className="container relative z-10">
        {/* Header */}
        <motion.div
          className="text-center mb-12 mt-12 sm:mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <GradientHeading
            size="lg"
            weight="semi"
            variant="accent3"
            className="font-monesta-semibold leading-none mb-4 sm:mb-6 text-2xl sm:text-3xl md:text-4xl lg:text-5xl"
          >
            Our Portfolio
          </GradientHeading>
          <p className="text-base sm:text-lg text-zinc-500 font-red-hat-display max-w-2xl mx-auto px-4">
            Explore our diverse collection of projects that showcase our
            expertise in creating innovative digital solutions.
          </p>
        </motion.div>

        {/* Filters */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="mb-6">
            <h3 className="text-lg font-medium mb-3 text-white font-red-hat-display">
              Filter by Project Type
            </h3>
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => handleCategoryChange(category)}
                  className={`px-4 py-2 rounded-md text-sm font-red-hat-display transition-all duration-200 ${
                    selectedCategories.includes(category)
                      ? "bg-[#FFED99] text-black font-medium"
                      : "bg-white/10 text-white/80 hover:bg-white/20 border border-white/20"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-lg font-medium mb-3 text-white font-red-hat-display">
              Filter by Technology
            </h3>
            <div className="flex flex-wrap gap-2">
              {technologies.map((tech) => (
                <button
                  key={tech}
                  onClick={() => handleTechChange(tech)}
                  className={`px-4 py-2 rounded-md text-sm font-red-hat-display transition-all duration-200 ${
                    selectedTechs.includes(tech)
                      ? "bg-[#FFED99] text-black font-medium"
                      : "bg-white/10 text-white/80 hover:bg-white/20 border border-white/20"
                  }`}
                >
                  {tech}
                </button>
              ))}
            </div>
          </div>

          {(selectedCategories.length > 0 || selectedTechs.length > 0) && (
            <div className="mt-4">
              <button
                onClick={clearFilters}
                className="px-4 py-2 rounded-md text-sm bg-white/5 text-white/60 hover:bg-white/10 border border-white/10 font-red-hat-display"
              >
                Clear All Filters
              </button>
            </div>
          )}
        </motion.div>

        {/* Portfolio Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {filteredProjects.map((project) => (
            <motion.div
              key={project._id}
              variants={itemVariants}
              transition={{ duration: 0.4 }}
            >
              <InteractiveCard
                className="w-full cursor-pointer"
                onClick={() => setActiveItem(project)}
              >
                <div className="bg-black border border-white/10 rounded-xl sm:rounded-2xl overflow-hidden">
                  {/* Image Section */}
                  <div className="relative h-32 sm:h-40 md:h-48 overflow-hidden">
                    <Image
                      src={project.images[0] || "/shape-min.png"}
                      alt={project.title}
                      fill
                      className="object-cover rounded-t-xl sm:rounded-t-2xl group-hover:scale-105 transition-transform duration-300"
                    />
                    {project.isLive && (
                      <div className="absolute top-3 right-3 px-3 py-1 text-xs font-semibold rounded-full bg-green-500/20 text-green-400 border border-green-400/50 z-10">
                        Live
                      </div>
                    )}
                  </div>

                  {/* Content Section */}
                  <div className="p-4 sm:p-6">
                    <div className="flex flex-wrap gap-1 sm:gap-2 mb-2 sm:mb-3">
                      {project.projectTags?.slice(0, 3).map((tag, tagIndex) => (
                        <span
                          key={tagIndex}
                          className="px-2 py-1 text-xs font-medium bg-white/10 text-white/80 rounded-full border border-white/20"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <GradientHeading
                      size="xs"
                      weight="semi"
                      variant="accent2"
                      className="font-red-hat-display mb-2 sm:mb-4 text-sm sm:text-base"
                    >
                      {project.title}
                    </GradientHeading>
                    <p className="text-xs sm:text-sm text-zinc-500 font-red-hat-display break-words">
                      {truncateDescription(project.description, 120)}
                    </p>
                  </div>
                </div>
              </InteractiveCard>
            </motion.div>
          ))} 
        </motion.div>

        {filteredProjects.length === 0 && (
          <motion.div
            className="text-center py-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h3 className="text-xl font-medium mb-2 text-white font-red-hat-display">
              No projects match your filters
            </h3>
            <p className="text-zinc-500 font-red-hat-display">
              Try adjusting your filter criteria
            </p>
          </motion.div>
        )}
      </div>

      {/* Project Modal */}
      <AnimatePresence>
        {activeItem && (
          <ProjectDetailsModal
            project={activeItem}
            onClose={() => setActiveItem(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
}