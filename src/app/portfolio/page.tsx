"use client";

import { motion, Variants } from "framer-motion";
import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { GradientHeading } from "@/components/ui/gradient-heading";
import { ShimmerButton } from "@/components/magicui/shimmer-button";
import { ArrowRight, Calendar } from "lucide-react";
import Image from "next/image";

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

// Sample portfolio data (placeholder)
const portfolioItems = [
  {
    id: 1,
    title: "Orchestrator",
    category: "AI Agent",
    tech: ["Next.js", "React", "Node.js", "MongoDB"],
    description:
      "AI-powered workflow automation platform for enterprise teams with advanced filtering and intelligent processing.",
    image: "/shape-min.png",
    tags: ["Agentic AI", "Web App", "Enterprise"],
  },
  {
    id: 2,
    title: "Saarthi Super App",
    category: "Mobile App",
    tech: ["React Native", "Firebase", "GraphQL"],
    description:
      "Comprehensive mobile application for rural development with cross-platform capabilities.",
    image: "/shape-min.png",
    tags: ["Mobile App", "PWA", "Social Impact"],
  },
  {
    id: 3,
    title: "Neural Nexus",
    category: "AI/ML",
    tech: ["Python", "TensorFlow", "AWS"],
    description:
      "Advanced neural network visualization and training platform for data scientists.",
    image: "/shape-min.png",
    tags: ["AI/ML", "Data Science", "Web App"],
  },
  {
    id: 4,
    title: "Quantum Flow",
    category: "Research",
    tech: ["React", "D3.js", "Express", "PostgreSQL"],
    description:
      "Real-time quantum computing simulation and analysis tool for researchers.",
    image: "/shape-min.png",
    tags: ["Quantum Computing", "Research", "Web App"],
  },
  {
    id: 5,
    title: "E-Learning Platform",
    category: "Web App",
    tech: ["Next.js", "React", "Node.js", "MongoDB"],
    description:
      "Interactive learning platform with video courses, quizzes, and real-time collaboration.",
    image: "/shape-min.png",
    tags: ["Education", "Web App", "Interactive"],
  },
  {
    id: 6,
    title: "Financial Dashboard",
    category: "Web App",
    tech: ["React", "D3.js", "Express", "PostgreSQL"],
    description:
      "Real-time analytics dashboard for financial data visualization and reporting.",
    image: "/shape-min.png",
    tags: ["Finance", "Analytics", "Dashboard"],
  },
];

// Extract unique categories and technologies for filters
const categories = Array.from(
  new Set(portfolioItems.map((item) => item.category))
);
const technologies = Array.from(
  new Set(portfolioItems.flatMap((item) => item.tech))
);

// A reusable card wrapper for consistent hover effects
const InteractiveCard = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className: string;
}) => (
  <motion.div
    className={`group relative ${className}`}
    whileHover={{ scale: 1.02, y: -5 }}
    transition={{ duration: 0.2, ease: "easeOut" }}
  >
    {/* Animated gradient border glow that appears on hover */}
    <div
      className="pointer-events-none absolute -inset-px rounded-xl sm:rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
      style={{
        background: `
          radial-gradient(400px circle at 50% 0%, rgba(255, 237, 153, 0.3), transparent 40%),
          radial-gradient(400px circle at 50% 100%, rgba(255, 237, 153, 0.3), transparent 40%),
          radial-gradient(400px circle at 0% 50%, rgba(255, 237, 153, 0.3), transparent 40%),
          radial-gradient(400px circle at 100% 50%, rgba(255, 237, 153, 0.3), transparent 40%)
        `,
      }}
      aria-hidden="true"
    />
    {children}
  </motion.div>
);

export default function PortfolioPage() {
  const [mounted, setMounted] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedTech, setSelectedTech] = useState<string | null>(null);
  const [activeItem, setActiveItem] = useState<number | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

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
    <section className="relative py-12 sm:py-16 md:py-20 overflow-hidden bg-black top-fading-border">
      {/* LightRays Background */}
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
            Our <span className="font-charm-bold">Portfolio</span>
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
                    selectedCategory === category
                      ? "bg-[#FFED99] text-black font-medium"
                      : "bg-white/10 text-white/80 hover:bg-white/20 border border-white/20"
                  }`}
                >
                  {category}
                </button>
              ))}
              {selectedCategory && (
                <button
                  onClick={() => setSelectedCategory(null)}
                  className="px-4 py-2 rounded-md text-sm bg-white/5 text-white/60 hover:bg-white/10 border border-white/10 font-red-hat-display"
                >
                  Clear
                </button>
              )}
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
                    selectedTech === tech
                      ? "bg-[#FFED99] text-black font-medium"
                      : "bg-white/10 text-white/80 hover:bg-white/20 border border-white/20"
                  }`}
                >
                  {tech}
                </button>
              ))}
              {selectedTech && (
                <button
                  onClick={() => setSelectedTech(null)}
                  className="px-4 py-2 rounded-md text-sm bg-white/5 text-white/60 hover:bg-white/10 border border-white/10 font-red-hat-display"
                >
                  Clear
                </button>
              )}
            </div>
          </div>
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
              key={project.id}
              variants={itemVariants}
              transition={{ duration: 0.4 }}
            >
              <InteractiveCard className="w-full">
                <div className="bg-black border border-white/10 rounded-xl sm:rounded-2xl overflow-hidden">
                  {/* MODIFIED: Increased gold glow effect */}
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent from-50% to-amber-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                  {/* Image Section */}
                  <div className="relative h-32 sm:h-40 md:h-48 overflow-hidden">
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className="object-cover rounded-t-xl sm:rounded-t-2xl group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>

                  {/* Content Section */}
                  <div className="p-4 sm:p-6">
                    <div className="flex flex-wrap gap-1 sm:gap-2 mb-2 sm:mb-3">
                      {project.tags.map((tag, tagIndex) => (
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
                    <p className="text-xs sm:text-sm text-zinc-500 font-red-hat-display mb-4">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.tech.map((tech) => (
                        <span
                          key={tech}
                          className="text-xs px-2 py-1 bg-white/5 text-white/60 rounded-full border border-white/10"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                    <ShimmerButton
                      className="bg-secondary text-[#FFED99] font-red-hat-display text-xs sm:text-sm"
                      shimmerColor="#FFED99"
                      background="rgb(13, 13, 13)"
                      borderRadius="100px"
                      onClick={() => setActiveItem(project.id)}
                    >
                      <div className="flex items-center gap-1 sm:gap-2 text-[#FFED99]/60">
                        <ArrowRight size={14} className="sm:w-4 sm:h-4" />
                        View Details
                      </div>
                    </ShimmerButton>
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

        {/* Project Modal */}
        {activeItem && (
          <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <motion.div
              className="bg-black border border-white/20 rounded-xl sm:rounded-2xl p-6 max-w-2xl w-full"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex justify-between items-start mb-4">
                <GradientHeading
                  size="sm"
                  weight="semi"
                  variant="accent2"
                  className="font-red-hat-display"
                >
                  {portfolioItems.find((p) => p.id === activeItem)?.title}
                </GradientHeading>
                <button
                  onClick={() => setActiveItem(null)}
                  className="text-white/60 hover:text-white transition-colors"
                >
                  ✕
                </button>
              </div>
              <p className="text-zinc-400 font-red-hat-display mb-4">
                {portfolioItems.find((p) => p.id === activeItem)?.description}
              </p>
              <div className="flex flex-wrap gap-2 mb-4">
                {portfolioItems
                  .find((p) => p.id === activeItem)
                  ?.tech.map((tech) => (
                    <span
                      key={tech}
                      className="text-xs px-2 py-1 bg-white/10 text-white/80 rounded-full border border-white/20"
                    >
                      {tech}
                    </span>
                  ))}
              </div>
              <ShimmerButton
                className="bg-secondary text-[#FFED99] font-red-hat-display text-sm"
                shimmerColor="#FFED99"
                background="rgb(13, 13, 13)"
                borderRadius="100px"
              >
                <div className="flex items-center gap-2 text-[#FFED99]/60">
                  <Calendar size={16} />
                  Schedule a Call
                </div>
              </ShimmerButton>
            </motion.div>
          </div>
        )}
      </div>
    </section>
  );
}
