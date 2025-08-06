// File: components/ProjectModal.tsx

"use client";

import { useState, useEffect } from "react";
import { X, Plus, Upload, Tag, Link, Github, Trash2 } from "lucide-react";
import { SimpleCard } from "@/components/ui/simple-card";
import { SimpleButton } from "@/components/ui/simple-button";

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
  createdAt: string;
}

interface ProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: () => void;
  onNewTagCreated: (newTag: Tag) => void;
  project?: Project | null;
  tags: Tag[];
}

const ProjectModal: React.FC<ProjectModalProps> = ({
  isOpen,
  onClose,
  onSave,
  onNewTagCreated,
  project,
  tags,
}) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    images: [] as string[],
    projectTags: [] as string[],
    techTags: [] as string[],
    isLive: false,
    liveLink: "",
    githubLink: "",
  });
  const [newProjectTag, setNewProjectTag] = useState("");
  const [newTechTag, setNewTechTag] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (project) {
      setFormData({
        title: project.title,
        description: project.description,
        images: project.images,
        projectTags: project.projectTags,
        techTags: project.techTags,
        isLive: project.isLive,
        liveLink: project.liveLink || "",
        githubLink: project.githubLink || "",
      });
    } else {
      setFormData({
        title: "",
        description: "",
        images: [],
        projectTags: [],
        techTags: [],
        isLive: false,
        liveLink: "",
        githubLink: "",
      });
    }
    setErrors({});
  }, [project]);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.title.trim()) newErrors.title = "Project title is required";
    if (!formData.description.trim())
      newErrors.description = "Project description is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (
    field: string,
    value: string | string[] | boolean
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field as keyof typeof errors]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const handleProjectTagToggle = (tagName: string) => {
    setFormData((prev) => ({
      ...prev,
      projectTags: prev.projectTags.includes(tagName)
        ? prev.projectTags.filter((t) => t !== tagName)
        : [...prev.projectTags, tagName],
    }));
  };

  const handleTechTagToggle = (tagName: string) => {
    setFormData((prev) => ({
      ...prev,
      techTags: prev.techTags.includes(tagName)
        ? prev.techTags.filter((t) => t !== tagName)
        : [...prev.techTags, tagName],
    }));
  };

  const handleAddNewTag = async (type: "project" | "tech") => {
    const newTagName = type === "project" ? newProjectTag : newTechTag;
    if (!newTagName.trim()) return;

    try {
      const response = await fetch("/api/admin/tags", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: newTagName.trim() }),
      });

      if (response.ok) {
        const newTagData = await response.json();
        // Update local state in the modal to automatically select the new tag
        if (type === "project") {
          setFormData((prev) => ({
            ...prev,
            projectTags: [...prev.projectTags, newTagData.name],
          }));
          setNewProjectTag("");
        } else {
          setFormData((prev) => ({
            ...prev,
            techTags: [...prev.techTags, newTagData.name],
          }));
          setNewTechTag("");
        }
        // Call the parent function to update the available tags list
        onNewTagCreated(newTagData);
      }
    } catch (error) {
      console.error("Error creating tag:", error);
    }
  };

  const handleImageUpload = async (file: File) => {
    if (formData.images.length >= 5) {
      alert("Maximum 5 images allowed");
      return;
    }

    const formDataUpload = new FormData();
    formDataUpload.append("image", file);

    try {
      const response = await fetch("/api/admin/upload-image", {
        method: "POST",
        body: formDataUpload,
      });

      if (response.ok) {
        const data = await response.json();
        setFormData((prev) => ({
          ...prev,
          images: [...prev.images, data.url],
        }));
      }
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  const handleRemoveImage = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      const url = project
        ? `/api/admin/projects/${project._id}`
        : "/api/admin/projects";
      const method = project ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        onSave();
      } else {
        try {
          const data = await response.json();
          alert(data.message || "Error saving project");
        } catch (jsonError) {
          alert(`Server error: ${response.statusText}`);
        }
      }
    } catch (error) {
      console.error("Error saving project:", error);
      alert("An unexpected error occurred while saving the project.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <SimpleCard
        className="w-full max-w-2xl max-h-[90vh] overflow-y-auto"
        variant="default"
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-800">
            {project ? "Edit Project" : "Add New Project"}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Project Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Project Title *
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => handleInputChange("title", e.target.value)}
              className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                errors.title ? "border-red-300" : "border-gray-300"
              }`}
              placeholder="Enter project title"
            />
            {errors.title && (
              <p className="text-red-600 text-sm mt-1">{errors.title}</p>
            )}
          </div>

          {/* Project Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Project Description *
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => handleInputChange("description", e.target.value)}
              rows={4}
              className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                errors.description ? "border-red-300" : "border-gray-300"
              }`}
              placeholder="Enter project description"
            />
            {errors.description && (
              <p className="text-red-600 text-sm mt-1">{errors.description}</p>
            )}
          </div>

          {/* Project Tags */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Project Tags
            </label>
            <div className="mb-3">
              <div className="flex flex-wrap gap-2">
                {tags.map((tag) => (
                  <button
                    key={tag._id}
                    type="button"
                    onClick={() => handleProjectTagToggle(tag.name)}
                    className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                      formData.projectTags.includes(tag.name)
                        ? "bg-blue-500 text-white"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    {tag.name}
                  </button>
                ))}
              </div>
            </div>
            <div className="flex gap-2">
              <input
                type="text"
                value={newProjectTag}
                onChange={(e) => setNewProjectTag(e.target.value)}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Add new project tag"
              />
              <SimpleButton
                type="button"
                onClick={() => handleAddNewTag("project")}
                variant="secondary"
                size="sm"
                className="flex items-center gap-1"
              >
                <Plus size={16} />
                Add
              </SimpleButton>
            </div>
          </div>

          {/* Tech Tags */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Tech Stack Tags
            </label>
            <div className="mb-3">
              <div className="flex flex-wrap gap-2">
                {tags.map((tag) => (
                  <button
                    key={tag._id}
                    type="button"
                    onClick={() => handleTechTagToggle(tag.name)}
                    className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                      formData.techTags.includes(tag.name)
                        ? "bg-green-500 text-white"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    {tag.name}
                  </button>
                ))}
              </div>
            </div>
            <div className="flex gap-2">
              <input
                type="text"
                value={newTechTag}
                onChange={(e) => setNewTechTag(e.target.value)}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Add new tech stack tag"
              />
              <SimpleButton
                type="button"
                onClick={() => handleAddNewTag("tech")}
                variant="secondary"
                size="sm"
                className="flex items-center gap-1"
              >
                <Plus size={16} />
                Add
              </SimpleButton>
            </div>
          </div>

          {/* Project Images */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Project Images (Max 5)
            </label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={(e) => {
                  const files = e.target.files;
                  if (files) {
                    Array.from(files).forEach((file) =>
                      handleImageUpload(file)
                    );
                  }
                }}
                className="hidden"
                id="image-upload"
              />
              <label
                htmlFor="image-upload"
                className="cursor-pointer flex flex-col items-center gap-2"
              >
                <Upload size={24} className="text-gray-400" />
                <span className="text-sm text-gray-600">
                  Click to upload image ({formData.images.length}/5)
                </span>
              </label>
            </div>
            {formData.images.length > 0 && (
              <div className="mt-3 grid grid-cols-2 md:grid-cols-3 gap-3">
                {formData.images.map((image, index) => (
                  <div key={index} className="relative group">
                    <img
                      src={image}
                      alt={`Project image ${index + 1}`}
                      className="w-full h-24 object-cover rounded-lg"
                    />
                    <button
                      type="button"
                      onClick={() => handleRemoveImage(index)}
                      className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <Trash2 size={12} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Project Links */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Live Link
              </label>
              <div className="relative">
                <Link
                  size={16}
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                />
                <input
                  type="url"
                  value={formData.liveLink}
                  onChange={(e) =>
                    handleInputChange("liveLink", e.target.value)
                  }
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="https://example.com or www.example.com"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                GitHub Link
              </label>
              <div className="relative">
                <Github
                  size={16}
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                />
                <input
                  type="url"
                  value={formData.githubLink}
                  onChange={(e) =>
                    handleInputChange("githubLink", e.target.value)
                  }
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="https://github.com/..."
                />
              </div>
            </div>
          </div>

          {/* isLive Checkbox */}
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="isLive"
              checked={formData.isLive}
              onChange={(e) => handleInputChange("isLive", e.target.checked)}
              className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <label
              htmlFor="isLive"
              className="text-sm font-medium text-gray-700"
            >
              Is this project live?
            </label>
          </div>

          {/* Form Actions */}
          <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
            <SimpleButton type="button" onClick={onClose} variant="ghost">
              Cancel
            </SimpleButton>
            <SimpleButton
              type="submit"
              disabled={isSubmitting}
              variant="primary"
            >
              {isSubmitting
                ? "Saving..."
                : project
                ? "Update Project"
                : "Create Project"}
            </SimpleButton>
          </div>
        </form>
      </SimpleCard>
    </div>
  );
};

export default ProjectModal;
