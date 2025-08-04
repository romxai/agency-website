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
  Tag,
  Link,
  Github,
} from "lucide-react";
import { SimpleCard } from "@/components/ui/simple-card";
import { SimpleButton } from "@/components/ui/simple-button";
import ProjectModal from "./ProjectModal";

interface Project {
  _id: string;
  name: string;
  description: string;
  tags: string[];
  images: string[];
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
}

const ProjectsTab = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [tags, setTags] = useState<Tag[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [filter, setFilter] = useState<"all" | "hidden" | "starred">("all");

  useEffect(() => {
    fetchProjects();
    fetchTags();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await fetch("/api/admin/projects");
      const data = await response.json();
      if (response.ok) {
        setProjects(data);
      }
    } catch (error) {
      console.error("Error fetching projects:", error);
    } finally {
      setLoading(false);
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
      }
    } catch (error) {
      console.error("Error deleting project:", error);
    }
  };

  const handleEditProject = (project: Project) => {
    setEditingProject(project);
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
    setEditingProject(null);
  };

  const handleProjectSaved = () => {
    fetchProjects();
    fetchTags();
    handleModalClose();
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

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-gray-500">Loading projects...</div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-800">
          Portfolio Projects
        </h2>
        <div className="flex gap-2">
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

      {/* Projects List */}
      <div className="space-y-3">
        {filteredProjects.length === 0 ? (
          <SimpleCard variant="secondary" className="text-center py-8">
            <div className="text-gray-500">No projects found</div>
          </SimpleCard>
        ) : (
          filteredProjects.map((project) => (
            <SimpleCard
              key={project._id}
              variant={project.isHidden ? "secondary" : "default"}
              className="transition-all duration-200"
            >
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="flex items-center gap-2">
                      <FolderOpen size={16} className="text-blue-600" />
                      <span className="font-medium text-gray-800">
                        {project.name}
                      </span>
                      {project.isHidden && (
                        <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                          Hidden
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      <Tag size={16} className="text-green-600" />
                      <div className="flex gap-1">
                        {project.tags.slice(0, 3).map((tag, index) => (
                          <span
                            key={index}
                            className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full"
                          >
                            {tag}
                          </span>
                        ))}
                        {project.tags.length > 3 && (
                          <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                            +{project.tags.length - 3}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-600 text-sm line-clamp-2 mb-2">
                    {project.description}
                  </p>
                  <div className="flex items-center gap-4 text-xs text-gray-500">
                    <span>Created: {formatDate(project.createdAt)}</span>
                    {project.images.length > 0 && (
                      <span>
                        {project.images.length} image
                        {project.images.length !== 1 ? "s" : ""}
                      </span>
                    )}
                    {project.liveLink && (
                      <div className="flex items-center gap-1">
                        <Link size={12} />
                        <span>Live</span>
                      </div>
                    )}
                    {project.githubLink && (
                      <div className="flex items-center gap-1">
                        <Github size={12} />
                        <span>GitHub</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 ml-4">
                  <SimpleButton
                    onClick={() => toggleHidden(project._id, project.isHidden)}
                    variant={project.isHidden ? "primary" : "ghost"}
                    size="sm"
                    className="flex items-center gap-1"
                  >
                    {project.isHidden ? (
                      <Eye size={14} />
                    ) : (
                      <EyeOff size={14} />
                    )}
                    {project.isHidden ? "Show" : "Hide"}
                  </SimpleButton>

                  <SimpleButton
                    onClick={() => toggleStar(project._id, project.isStarred)}
                    variant={project.isStarred ? "warning" : "ghost"}
                    size="sm"
                    className="flex items-center gap-1"
                  >
                    <Star
                      size={14}
                      fill={project.isStarred ? "currentColor" : "none"}
                    />
                    {project.isStarred ? "Unstar" : "Star"}
                  </SimpleButton>

                  <SimpleButton
                    onClick={() => handleEditProject(project)}
                    variant="secondary"
                    size="sm"
                    className="flex items-center gap-1"
                  >
                    <Edit size={14} />
                    Edit
                  </SimpleButton>

                  <SimpleButton
                    onClick={() => deleteProject(project._id)}
                    variant="danger"
                    size="sm"
                    className="flex items-center gap-1"
                  >
                    <Trash2 size={14} />
                    Delete
                  </SimpleButton>
                </div>
              </div>
            </SimpleCard>
          ))
        )}
      </div>

      {/* Project Modal */}
      {showModal && (
        <ProjectModal
          isOpen={showModal}
          onClose={handleModalClose}
          onSave={handleProjectSaved}
          project={editingProject}
          tags={tags}
        />
      )}
    </div>
  );
};

export default ProjectsTab;
