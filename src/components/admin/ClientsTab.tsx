"use client";

import { useState, useEffect } from "react";
import {
  ChevronDown,
  ChevronUp,
  Star,
  Trash2,
  Eye,
  EyeOff,
  Mail,
  User,
  Clock,
  MessageSquare,
} from "lucide-react";
import { SimpleCard } from "@/components/ui/simple-card";
import { SimpleButton } from "@/components/ui/simple-button";

interface ContactEntry {
  _id: string;
  name: string;
  email: string;
  message: string;
  createdAt: string;
  ip: string;
  userAgent: string;
  isRead: boolean;
  isStarred: boolean;
}

const ClientsTab = () => {
  const [contacts, setContacts] = useState<ContactEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedRows, setExpandedRows] = useState<Set<string>>(new Set());
  const [filter, setFilter] = useState<"all" | "unread" | "starred">("all");

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    try {
      const response = await fetch("/api/admin/contacts");
      const data = await response.json();
      if (response.ok) {
        setContacts(data);
      }
    } catch (error) {
      console.error("Error fetching contacts:", error);
    } finally {
      setLoading(false);
    }
  };

  const toggleRowExpansion = (id: string) => {
    const newExpanded = new Set(expandedRows);
    if (newExpanded.has(id)) {
      newExpanded.delete(id);
    } else {
      newExpanded.add(id);
    }
    setExpandedRows(newExpanded);
  };

  const toggleRead = async (id: string, currentRead: boolean) => {
    try {
      const response = await fetch(`/api/admin/contacts/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isRead: !currentRead }),
      });

      if (response.ok) {
        setContacts(
          contacts.map((contact) =>
            contact._id === id ? { ...contact, isRead: !currentRead } : contact
          )
        );
      }
    } catch (error) {
      console.error("Error updating read status:", error);
    }
  };

  const toggleStar = async (id: string, currentStarred: boolean) => {
    try {
      const response = await fetch(`/api/admin/contacts/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isStarred: !currentStarred }),
      });

      if (response.ok) {
        setContacts(
          contacts.map((contact) =>
            contact._id === id
              ? { ...contact, isStarred: !currentStarred }
              : contact
          )
        );
      }
    } catch (error) {
      console.error("Error updating star status:", error);
    }
  };

  const deleteContact = async (id: string) => {
    if (!confirm("Are you sure you want to delete this contact?")) return;

    try {
      const response = await fetch(`/api/admin/contacts/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setContacts(contacts.filter((contact) => contact._id !== id));
      }
    } catch (error) {
      console.error("Error deleting contact:", error);
    }
  };

  const filteredContacts = contacts.filter((contact) => {
    if (filter === "unread") return !contact.isRead;
    if (filter === "starred") return contact.isStarred;
    return true;
  });

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-gray-500">Loading contacts...</div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h2 className="text-xl font-semibold text-gray-800">Client Contacts</h2>
        <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
          <select
            value={filter}
            onChange={(e) =>
              setFilter(e.target.value as "all" | "unread" | "starred")
            }
            className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-gray-700"
          >
            <option value="all">All Contacts</option>
            <option value="unread">Unread</option>
            <option value="starred">Starred</option>
          </select>
        </div>
      </div>

      {/* Contacts List */}
      <div className="space-y-3">
        {filteredContacts.length === 0 ? (
          <SimpleCard variant="secondary" className="text-center py-8">
            <div className="text-gray-500">No contacts found</div>
          </SimpleCard>
        ) : (
          filteredContacts.map((contact) => (
            <SimpleCard
              key={contact._id}
              variant={contact.isRead ? "default" : "primary"}
              className="transition-all duration-200"
            >
              {/* Main Row */}
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 mb-2">
                    <div className="flex items-center gap-2 min-w-0">
                      <User size={16} className="text-blue-600 flex-shrink-0" />
                      <span className="font-medium text-gray-800 truncate">
                        {contact.name}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 min-w-0">
                      <Mail
                        size={16}
                        className="text-green-600 flex-shrink-0"
                      />
                      <span className="text-gray-600 truncate">
                        {contact.email}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 min-w-0">
                      <Clock
                        size={16}
                        className="text-purple-600 flex-shrink-0"
                      />
                      <span className="text-gray-500 text-sm">
                        {formatDate(contact.createdAt)}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-start gap-2 min-w-0">
                    <MessageSquare
                      size={16}
                      className="text-orange-600 flex-shrink-0 mt-0.5"
                    />
                    <span className="text-gray-700 break-words line-clamp-2">
                      {contact.message}
                    </span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-wrap items-center gap-2 lg:ml-4">
                  <SimpleButton
                    onClick={() => toggleRead(contact._id, contact.isRead)}
                    variant={contact.isRead ? "ghost" : "primary"}
                    size="sm"
                    className="flex items-center gap-1"
                  >
                    {contact.isRead ? <EyeOff size={14} /> : <Eye size={14} />}
                    <span className="hidden sm:inline">
                      {contact.isRead ? "Mark Unread" : "Mark Read"}
                    </span>
                  </SimpleButton>

                  <SimpleButton
                    onClick={() => toggleStar(contact._id, contact.isStarred)}
                    variant={contact.isStarred ? "warning" : "ghost"}
                    size="sm"
                    className="flex items-center gap-1"
                  >
                    <Star
                      size={14}
                      fill={contact.isStarred ? "currentColor" : "none"}
                    />
                    <span className="hidden sm:inline">
                      {contact.isStarred ? "Unstar" : "Star"}
                    </span>
                  </SimpleButton>

                  <SimpleButton
                    onClick={() => toggleRowExpansion(contact._id)}
                    variant="ghost"
                    size="sm"
                  >
                    {expandedRows.has(contact._id) ? (
                      <ChevronUp size={16} />
                    ) : (
                      <ChevronDown size={16} />
                    )}
                  </SimpleButton>

                  <SimpleButton
                    onClick={() => deleteContact(contact._id)}
                    variant="danger"
                    size="sm"
                    className="flex items-center gap-1"
                  >
                    <Trash2 size={14} />
                    <span className="hidden sm:inline">Delete</span>
                  </SimpleButton>
                </div>
              </div>

              {/* Expanded Details */}
              {expandedRows.has(contact._id) && (
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 text-sm">
                    <div>
                      <h4 className="font-medium text-gray-700 mb-2">
                        Full Message
                      </h4>
                      <p className="text-gray-600 bg-gray-50 p-3 rounded-lg break-words">
                        {contact.message}
                      </p>
                    </div>
                    <div className="space-y-2">
                      <div>
                        <span className="font-medium text-gray-700">
                          IP Address:
                        </span>
                        <span className="ml-2 text-gray-600 break-all">
                          {contact.ip}
                        </span>
                      </div>
                      <div>
                        <span className="font-medium text-gray-700">
                          User Agent:
                        </span>
                        <span className="ml-2 text-gray-600 text-xs break-all">
                          {contact.userAgent}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </SimpleCard>
          ))
        )}
      </div>
    </div>
  );
};

export default ClientsTab;
