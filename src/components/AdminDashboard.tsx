"use client";

import { useState } from "react";
import { LogOut, Users, FolderOpen } from "lucide-react";
import { SimpleCard } from "@/components/ui/simple-card";
import { SimpleButton } from "@/components/ui/simple-button";
import { GradientHeading } from "@/components/ui/gradient-heading";
import ClientsTab from "./admin/ClientsTab";
import ProjectsTab from "./admin/ProjectsTab";

interface AdminDashboardProps {
  onLogout: () => void;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ onLogout }) => {
  const [activeTab, setActiveTab] = useState<"clients" | "projects">("clients");

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-900 to-gray-900 pt-20">
      {/* Header */}
      <div className="bg-gray-900 border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <GradientHeading className="text-xl font-bold">
              Admin Dashboard
            </GradientHeading>
            <SimpleButton
              onClick={onLogout}
              variant="ghost"
              size="sm"
              className="flex items-center gap-2"
            >
              <LogOut size={16} />
              Logout
            </SimpleButton>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex space-x-1 bg-white rounded-lg p-1 shadow-sm border border-gray-200 w-fit">
          <button
            onClick={() => setActiveTab("clients")}
            className={`flex items-center gap-2 px-4 py-2 rounded-md font-medium transition-all duration-200 ${
              activeTab === "clients"
                ? "bg-blue-500 text-white shadow-sm"
                : "text-gray-600 hover:text-gray-800 hover:bg-gray-100"
            }`}
          >
            <Users size={16} />
            Clients
          </button>
          <button
            onClick={() => setActiveTab("projects")}
            className={`flex items-center gap-2 px-4 py-2 rounded-md font-medium transition-all duration-200 ${
              activeTab === "projects"
                ? "bg-blue-500 text-white shadow-sm"
                : "text-gray-600 hover:text-gray-800 hover:bg-gray-100"
            }`}
          >
            <FolderOpen size={16} />
            Projects
          </button>
        </div>

        {/* Content */}
        <div className="mt-6">
          <SimpleCard className="min-h-[600px]">
            {activeTab === "clients" ? <ClientsTab /> : <ProjectsTab />}
          </SimpleCard>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
