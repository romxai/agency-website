// src/components/ProjectDetailsModal.tsx

"use client";

import { motion, AnimatePresence, Variants } from "framer-motion";
import { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  X,
  Globe,
  Github,
  ChevronLeft,
  ChevronRight,
  Eye,
  EyeOff,
  Star,
  Edit,
  Trash2,
} from "lucide-react";
import { GradientHeading } from "@/components/ui/gradient-heading";
import { ShimmerButton } from "@/components/magicui/shimmer-button";

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

interface ProjectDetailsModalProps {
  project: Project;
  onClose: () => void;
  isAdmin?: boolean;
  onEdit?: () => void;
  onToggleHidden?: () => void;
  onToggleStarred?: () => void;
  onDelete?: () => void;
}

const AUTOSCROLL_DELAY = 5000;

// Animation variants for modal
const modalVariants: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.3, ease: "easeOut" },
  },
  exit: { opacity: 0, scale: 0.95, transition: { duration: 0.2 } },
};

// Animation variants for image slide
const imageSlideVariants: Variants = {
  enter: (direction: number) => ({
    x: direction > 0 ? "100%" : "-100%",
    opacity: 0,
  }),
  center: {
    x: "0%",
    opacity: 1,
    transition: {
      type: "tween",
      duration: 0.4,
    },
  },
  exit: (direction: number) => ({
    x: direction < 0 ? "100%" : "-100%",
    opacity: 0,
    transition: {
      type: "tween",
      duration: 0.4,
    },
  }),
};

export const ProjectDetailsModal: React.FC<ProjectDetailsModalProps> = ({
  project,
  onClose,
  isAdmin = false,
  onEdit,
  onToggleHidden,
  onToggleStarred,
  onDelete,
}) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const startAutoScroll = useCallback(() => {
    if (project.images.length > 1) {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
      timerRef.current = setTimeout(() => {
        setDirection(1);
        setCurrentImageIndex((prevIndex) =>
          prevIndex === project.images.length - 1 ? 0 : prevIndex + 1
        );
      }, AUTOSCROLL_DELAY);
    }
  }, [project.images.length]);

  const resetAutoScroll = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    startAutoScroll();
  }, [startAutoScroll]);

  useEffect(() => {
    startAutoScroll();
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [currentImageIndex, startAutoScroll]);

  const nextImage = useCallback(() => {
    resetAutoScroll();
    setDirection(1);
    setCurrentImageIndex((prevIndex) =>
      prevIndex === project.images.length - 1 ? 0 : prevIndex + 1
    );
  }, [project.images.length, resetAutoScroll]);

  const prevImage = useCallback(() => {
    resetAutoScroll();
    setDirection(-1);
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? project.images.length - 1 : prevIndex - 1
    );
  }, [project.images.length, resetAutoScroll]);

  return (
    <div
      className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto"
      onClick={onClose}
    >
      <motion.div
        className="bg-[#050505] border border-white/10 rounded-xl sm:rounded-2xl max-w-4xl w-full flex flex-col shadow-lg relative my-8"
        variants={modalVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 text-white/60 hover:text-white transition-colors"
          aria-label="Close modal"
        >
          <X size={24} />
        </button>

        {/* Image Carousel Section */}
        <div className="relative h-64 sm:h-80 md:h-96 flex-shrink-0 bg-zinc-900 rounded-t-xl overflow-hidden group">
          <AnimatePresence initial={false} custom={direction}>
            <motion.div
              key={currentImageIndex}
              custom={direction}
              variants={imageSlideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              className="absolute inset-0"
            >
              <Image
                src={project.images[currentImageIndex] || "/shape-min.png"}
                alt={project.title}
                fill
                className="object-contain bg-black"
                priority
              />
            </motion.div>
          </AnimatePresence>

          {/* Navigation Buttons */}
          {project.images.length > 1 && (
            <>
              {/* Previous Button */}
              <button
                onClick={prevImage}
                className="absolute left-4 top-1/2 -translate-y-1/2 z-20 flex items-center justify-center w-8 h-8 rounded-full bg-white/10 text-white/70 sm:opacity-0 group-hover:opacity-100 transition-opacity"
                aria-label="Previous image"
              >
                <ChevronLeft size={20} />
              </button>

              {/* Next Button */}
              <button
                onClick={nextImage}
                className="absolute right-4 top-1/2 -translate-y-1/2 z-20 flex items-center justify-center w-8 h-8 rounded-full bg-white/10 text-white/70 sm:opacity-0 group-hover:opacity-100 transition-opacity"
                aria-label="Next image"
              >
                <ChevronRight size={20} />
              </button>
            </>
          )}

          {/* Dots */}
          {project.images.length > 1 && (
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
              {project.images.map((_, index) => (
                <div
                  key={index}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    index === currentImageIndex ? "bg-white" : "bg-white/50"
                  }`}
                />
              ))}
            </div>
          )}
        </div>

        {/* Content Section */}
        <div className="p-6">
          <div className="flex items-start justify-between mb-4">
            {isAdmin ? (
              <h2 className="text-2xl font-bold text-white">{project.title}</h2>
            ) : (
              <GradientHeading
                size="sm"
                weight="semi"
                variant="accent2"
                className="font-red-hat-display"
              >
                {project.title}
              </GradientHeading>
            )}
            <div className="flex items-center gap-2">
              {project.isLive && (
                <span className="px-3 py-1 text-xs font-semibold rounded-full bg-green-500/20 text-green-400 border border-green-400/50 flex-shrink-0">
                  Live
                </span>
              )}
              {isAdmin && project.isHidden && (
                <span className="px-3 py-1 text-xs font-semibold rounded-full bg-gray-500/20 text-gray-400 border border-gray-400/50">
                  Hidden
                </span>
              )}
            </div>
          </div>

          <p className="text-sm text-zinc-400 font-red-hat-display mb-6 leading-relaxed break-words">
            {project.description}
          </p>

          <div className="space-y-4 mb-6">
            <div>
              <h4 className="text-sm font-medium text-white/80 mb-2">
                Project Type
              </h4>
              <div className="flex flex-wrap gap-2">
                {project.projectTags.map((tag, index) => (
                  <span
                    key={index}
                    className="text-xs px-2 py-1 bg-white/10 text-white/80 rounded-full border border-white/20"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-sm font-medium text-white/80 mb-2">
                Technologies
              </h4>
              <div className="flex flex-wrap gap-2">
                {project.techTags.map((tech, index) => (
                  <span
                    key={index}
                    className="text-xs px-2 py-1 bg-white/10 text-white/80 rounded-full border border-white/20"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            {project.liveLink && (
              <Link
                href={project.liveLink}
                target="_blank"
                rel="noopener noreferrer"
              >
                <ShimmerButton
                  className="bg-[#050505] text-[#FFED99] font-red-hat-display text-xs sm:text-sm"
                  shimmerColor="#FFED99"
                  background="rgb(13, 13, 13)"
                  borderRadius="100px"
                >
                  <div className="flex items-center gap-2 text-[#FFED99]">
                    <Globe size={14} className="sm:w-4 sm:h-4" />
                    Check it out
                  </div>
                </ShimmerButton>
              </Link>
            )}
            {project.githubLink && (
              <Link
                href={project.githubLink}
                target="_blank"
                rel="noopener noreferrer"
              >
                <ShimmerButton
                  className="bg-[#050505] text-white/60 font-red-hat-display text-xs sm:text-sm"
                  shimmerColor="#FFED99"
                  background="rgb(13, 13, 13)"
                  borderRadius="100px"
                >
                  <div className="flex items-center gap-2 text-white/60">
                    <Github size={14} className="sm:w-4 sm:h-4" />
                    View Source
                  </div>
                </ShimmerButton>
              </Link>
            )}

            {/* Admin-specific buttons */}
            {isAdmin && (
              <>
                <div className="flex-grow md:flex-grow-0" />
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="flex flex-wrap gap-2"
                >
                  <button
                    onClick={onToggleHidden}
                    className="flex items-center gap-1 px-3 py-1.5 text-sm font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 bg-gray-100 hover:bg-gray-200 text-gray-700 focus:ring-gray-500"
                  >
                    {project.isHidden ? (
                      <Eye size={14} />
                    ) : (
                      <EyeOff size={14} />
                    )}
                    {project.isHidden ? "Show" : "Hide"}
                  </button>
                  <button
                    onClick={onToggleStarred}
                    className={`flex items-center gap-1 px-3 py-1.5 text-sm font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                      project.isStarred
                        ? "bg-yellow-500 hover:bg-yellow-600 text-white focus:ring-yellow-500"
                        : "bg-gray-100 hover:bg-gray-200 text-gray-700 focus:ring-gray-500"
                    }`}
                  >
                    <Star
                      size={14}
                      fill={project.isStarred ? "currentColor" : "none"}
                    />
                    {project.isStarred ? "Unstar" : "Star"}
                  </button>
                  <button
                    onClick={onEdit}
                    className="flex items-center gap-1 px-3 py-1.5 text-sm font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 bg-purple-500 hover:bg-purple-600 text-white focus:ring-purple-500"
                  >
                    <Edit size={14} />
                    Edit
                  </button>
                  <button
                    onClick={onDelete}
                    className="flex items-center gap-1 px-3 py-1.5 text-sm font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 bg-red-500 hover:bg-red-600 text-white focus:ring-red-500"
                  >
                    <Trash2 size={14} />
                    Delete
                  </button>
                </motion.div>
              </>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
};
