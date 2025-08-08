// File: src/components/admin/ProjectsTab.tsx

"use client";

import { useState, useEffect } from "react";
import {
  Star,
  Trash2,
  Edit,
  Plus,
  Eye,
  EyeOff,
  FolderOpen,
  Tag as TagIcon,
  Link,
  Github,
  X,
} from "lucide-react";
import { SimpleCard } from "@/components/ui/simple-card";
import { SimpleButton } from "@/components/ui/simple-button";
import ProjectModal from "./ProjectModal";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { ProjectDetailsModal } from "@/components/ProjectDetailsModal";

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

interface Tag {
  _id: string;
  name: string;
  color: string;
  isTech: boolean;
  createdAt: string;
}

// Animation variants
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
  },
};

// Interactive card wrapper for consistent hover effects
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

const ProjectsTab = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [tags, setTags] = useState<Tag[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [filter, setFilter] = useState<"all" | "hidden" | "starred">("all");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    await Promise.all([fetchProjects(), fetchTags()]);
    setLoading(false);
  };

  const fetchProjects = async () => {
    try {
      const response = await fetch("/api/admin/projects");
      const data = await response.json();
      if (response.ok) {
        setProjects(data);
      }
    } catch (error) {
      console.error("Error fetching projects:", error);
    }
  };

  const fetchTags = async () => {
    try {
      const response = await fetch("/api/admin/tags");
      const data = await response.json();
      if (response.ok) {
        setTags(data);
      }
    } catch (error) {
      console.error("Error fetching tags:", error);
    }
  };

  const toggleStar = async (id: string, currentStarred: boolean) => {
    try {
      const response = await fetch(`/api/admin/projects/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isStarred: !currentStarred }),
      });

      if (response.ok) {
        setProjects(
          projects.map((project) =>
            project._id === id
              ? { ...project, isStarred: !currentStarred }
              : project
          )
        );
        if (selectedProject?._id === id) {
          setSelectedProject({
            ...selectedProject,
            isStarred: !currentStarred,
          });
        }
      }
    } catch (error) {
      console.error("Error updating star status:", error);
    }
  };

  const toggleHidden = async (id: string, currentHidden: boolean) => {
    try {
      const response = await fetch(`/api/admin/projects/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isHidden: !currentHidden }),
      });

      if (response.ok) {
        setProjects(
          projects.map((project) =>
            project._id === id
              ? { ...project, isHidden: !currentHidden }
              : project
          )
        );
        if (selectedProject?._id === id) {
          setSelectedProject({
            ...selectedProject,
            isHidden: !currentHidden,
          });
        }
      }
    } catch (error) {
      console.error("Error updating hidden status:", error);
    }
  };

  const deleteProject = async (id: string) => {
    if (!confirm("Are you sure you want to delete this project?")) return;

    try {
      const response = await fetch(`/api/admin/projects/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setProjects(projects.filter((project) => project._id !== id));
        setShowDetailsModal(false);
        setSelectedProject(null);
      }
    } catch (error) {
      console.error("Error deleting project:", error);
    }
  };

  const handleEditProject = (project: Project) => {
    setEditingProject(project);
    setShowModal(true);
    setShowDetailsModal(false);
  };

  const handleProjectClick = (project: Project) => {
    setSelectedProject(project);
    setShowDetailsModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
    setEditingProject(null);
  };

  const handleDetailsModalClose = () => {
    setShowDetailsModal(false);
    setSelectedProject(null);
  };

  const handleProjectSaved = () => {
    fetchData();
    handleModalClose();
  };

  const handleNewTagCreated = (newTag: Tag) => {
    setTags((prevTags) =>
      [...prevTags, newTag].sort((a, b) => a.name.localeCompare(b.name))
    );
  };

  const filteredProjects = projects.filter((project) => {
    if (filter === "hidden") return project.isHidden;
    if (filter === "starred") return project.isStarred;
    return true;
  });

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
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
      <div className="flex items-center justify-center h-64">
        <div className="text-gray-500">Loading projects...</div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h2 className="text-xl font-semibold text-gray-800">
          Portfolio Projects
        </h2>
        <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
          <select
            value={filter}
            onChange={(e) =>
              setFilter(e.target.value as "all" | "hidden" | "starred")
            }
            className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-gray-700"
          >
            <option value="all">All Projects</option>
            <option value="hidden">Hidden</option>
            <option value="starred">Starred</option>
          </select>
          <SimpleButton
            onClick={() => setShowModal(true)}
            variant="primary"
            className="flex items-center gap-2"
          >
            <Plus size={16} />
            Add Project
          </SimpleButton>
        </div>
      </div>

      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        {filteredProjects.length === 0 ? (
          <div className="col-span-full">
            <SimpleCard variant="secondary" className="text-center py-8">
              <div className="text-gray-500">No projects found</div>
            </SimpleCard>
          </div>
        ) : (
          filteredProjects.map((project) => (
            <motion.div
              key={project._id}
              variants={itemVariants}
              transition={{ duration: 0.4 }}
            >
              <InteractiveCard
                className="w-full cursor-pointer"
                onClick={() => handleProjectClick(project)}
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
                    {project.isHidden && (
                      <div className="absolute top-3 left-3 px-3 py-1 text-xs font-semibold rounded-full bg-gray-500/20 text-gray-400 border border-gray-400/50 z-10">
                        Hidden
                      </div>
                    )}
                  </div>

                  {/* Content Section */}
                  <div className="p-4 sm:p-6">
                    <div className="flex flex-wrap gap-1 sm:gap-2 mb-2 sm:mb-3">
                      {project.projectTags?.slice(0, 3).map((tag, tagIndex) => (
                        <span
                          key={tagIndex}
                          className="px-2 py-1 text-xs font-medium bg-blue-500/20 text-blue-400 rounded-full border border-blue-400/50"
                        >
                          {tag}
                        </span>
                      ))}
                      {project.projectTags &&
                        project.projectTags.length > 3 && (
                          <span className="px-2 py-1 text-xs font-medium bg-gray-100 text-gray-600 rounded-full border border-gray-200">
                            +{project.projectTags.length - 3}
                          </span>
                        )}
                    </div>
                    <h3 className="font-semibold text-gray-800 mb-2 sm:mb-4 text-sm sm:text-base">
                      {project.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-600 mb-3 break-words">
                      {truncateDescription(project.description, 120)}
                    </p>

                    {/* Tech Tags */}
                    <div className="flex flex-wrap gap-1 mb-3">
                      {project.techTags?.slice(0, 3).map((tech, techIndex) => (
                        <span
                          key={techIndex}
                          className="px-2 py-1 text-xs font-medium bg-green-500/20 text-green-600 rounded-full border border-green-400/50"
                        >
                          {tech}
                        </span>
                      ))}
                      {project.techTags && project.techTags.length > 3 && (
                        <span className="px-2 py-1 text-xs font-medium bg-gray-100 text-gray-600 rounded-full border border-gray-200">
                          +{project.techTags.length - 3}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </InteractiveCard>
            </motion.div>
          ))
        )}
      </motion.div>

      {showModal && (
        <ProjectModal
          isOpen={showModal}
          onClose={handleModalClose}
          onSave={handleProjectSaved}
          onNewTagCreated={handleNewTagCreated}
          project={editingProject}
          tags={tags}
        />
      )}

      <AnimatePresence>
        {showDetailsModal && selectedProject && (
          <ProjectDetailsModal
            project={selectedProject}
            onClose={handleDetailsModalClose}
            isAdmin={true}
            onEdit={() => handleEditProject(selectedProject)}
            onToggleHidden={() =>
              toggleHidden(selectedProject._id, selectedProject.isHidden)
            }
            onToggleStarred={() =>
              toggleStar(selectedProject._id, selectedProject.isStarred)
            }
            onDelete={() => deleteProject(selectedProject._id)}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default ProjectsTab;
