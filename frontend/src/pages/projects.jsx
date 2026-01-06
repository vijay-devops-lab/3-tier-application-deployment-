import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { motion } from "framer-motion";
import "../App.css";

const allProjects = [
  {
    id: 1,
    name: "North Ridge Residency",
    location: "Downtown District",
    status: "on-track",
    progress: 72,
    dueDate: "2026-03-15",
    budget: "₹4.2Cr",
    budgetUsed: "₹3.01Cr",
    team: 12,
    phase: "Structural",
    description: "Premium residential complex with 120 units",
    startDate: "2024-08-15",
    completedMilestones: 8,
    totalMilestones: 12,
  },
  {
    id: 2,
    name: "Greenline Office Complex",
    location: "Tech Park Zone",
    status: "attention",
    progress: 58,
    dueDate: "2026-04-20",
    budget: "₹6.8Cr",
    budgetUsed: "₹3.93Cr",
    team: 18,
    phase: "MEP Installation",
    description: "LEED-certified commercial office space",
    startDate: "2024-10-01",
    completedMilestones: 6,
    totalMilestones: 13,
  },
  {
    id: 3,
    name: "Sunrise Clinic & Wellness",
    location: "Medical Quarter",
    status: "on-track",
    progress: 85,
    dueDate: "2026-02-28",
    budget: "₹2.1Cr",
    budgetUsed: "₹1.87Cr",
    team: 8,
    phase: "Finishing",
    description: "Multi-specialty clinic with wellness center",
    startDate: "2024-06-20",
    completedMilestones: 10,
    totalMilestones: 11,
  },
  {
    id: 4,
    name: "Pioneer Tech Campus",
    location: "IT Hub",
    status: "on-track",
    progress: 45,
    dueDate: "2026-07-30",
    budget: "₹12.5Cr",
    budgetUsed: "₹5.63Cr",
    team: 24,
    phase: "Foundation & Excavation",
    description: "Large-scale tech park development",
    startDate: "2025-01-10",
    completedMilestones: 3,
    totalMilestones: 15,
  },
  {
    id: 5,
    name: "Heritage Apartments",
    location: "Historic Zone",
    status: "risk",
    progress: 35,
    dueDate: "2026-06-15",
    budget: "₹3.8Cr",
    budgetUsed: "₹1.71Cr",
    team: 10,
    phase: "Design & Planning",
    description: "Restoration & modern addition project",
    startDate: "2024-11-05",
    completedMilestones: 2,
    totalMilestones: 14,
  },
  {
    id: 6,
    name: "Eco Mall Development",
    location: "Suburban Hub",
    status: "on-track",
    progress: 62,
    dueDate: "2026-05-10",
    budget: "₹8.9Cr",
    budgetUsed: "₹5.51Cr",
    team: 20,
    phase: "Superstructure",
    description: "Sustainable shopping & entertainment complex",
    startDate: "2024-09-01",
    completedMilestones: 7,
    totalMilestones: 12,
  },
];

const Projects = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [scrolled, setScrolled] = useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const filteredProjects =
    selectedStatus === "all"
      ? allProjects
      : allProjects.filter((p) => p.status === selectedStatus);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const getBudgetHealth = (budgetUsed, budget) => {
    const used = parseFloat(budgetUsed.replace(/[₹,Cr]/g, ""));
    const total = parseFloat(budget.replace(/[₹,Cr]/g, ""));
    return Math.round((used / total) * 100);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 to-slate-925 text-slate-100 relative overflow-hidden">
      <div className="hero-glow" aria-hidden="true" />
      <div className="hero-grid" aria-hidden="true" />

      {/* Navigation */}
      <nav className={`nav-header transition-all duration-300 ${
        scrolled
          ? "bg-slate-950/95 shadow-2xl shadow-slate-950/50"
          : "bg-slate-950/70"
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <motion.div
              className="flex items-center gap-3"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="h-9 w-9 rounded-lg bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center font-bold text-slate-950 text-sm shadow-lg shadow-cyan-500/30">
                BC
              </div>
              <div>
                <p className="text-xs uppercase tracking-widest text-slate-400 font-semibold">
                  BuildCo OS
                </p>
                <p className="text-sm font-bold text-slate-100 leading-tight">
                  Control
                </p>
              </div>
            </motion.div>

            <motion.div
              className="flex items-center gap-4"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <div className="hidden md:flex items-center gap-3">
                <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-glow-emerald animate-pulse-slow" />
                <span className="text-sm text-slate-400">
                  Welcome, <span className="font-semibold text-slate-100">{user?.fullName || "Builder"}</span>
                </span>
              </div>
              <button onClick={() => navigate("/")} className="btn-secondary text-sm">
                Dashboard
              </button>
              <button onClick={handleLogout} className="btn-secondary text-sm">
                Logout
              </button>
            </motion.div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
        {/* Header */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-semibold uppercase tracking-wider">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                  Portfolio
                </span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-bold text-slate-50">
                All Projects
              </h1>
              <p className="text-slate-400 mt-2">
                Manage and monitor {allProjects.length} active construction projects
              </p>
            </div>
            <button className="btn-primary text-sm">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              New Project
            </button>
          </div>
        </motion.div>

        {/* Filters */}
        <motion.div
          className="flex flex-wrap gap-2 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          {[
            { id: "all", label: "All Projects" },
            { id: "on-track", label: "On Track" },
            { id: "attention", label: "Needs Attention" },
            { id: "risk", label: "At Risk" },
          ].map((filter) => (
            <button
              key={filter.id}
              onClick={() => setSelectedStatus(filter.id)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                selectedStatus === filter.id
                  ? "bg-cyan-500/20 border border-cyan-500/50 text-cyan-300"
                  : "bg-slate-800/50 border border-slate-700 text-slate-300 hover:border-slate-600"
              }`}
            >
              {filter.label}
            </button>
          ))}
        </motion.div>

        {/* Projects Grid */}
        <motion.div
          className="grid gap-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {filteredProjects.length > 0 ? (
            <div className="space-y-4">
              {filteredProjects.map((project, idx) => {
                const statusConfig = {
                  "on-track": {
                    badge: "badge-on-track",
                    label: "On Track",
                    icon: "✓",
                  },
                  attention: {
                    badge: "badge-attention",
                    label: "Attention",
                    icon: "!",
                  },
                  risk: {
                    badge: "badge-risk",
                    label: "At Risk",
                    icon: "⚠",
                  },
                };

                const config = statusConfig[project.status];
                const budgetHealth = getBudgetHealth(
                  project.budgetUsed,
                  project.budget
                );

                return (
                  <motion.div
                    key={project.id}
                    className="glass-card border border-slate-700/50 rounded-xl overflow-hidden hover:border-slate-600 transition-all"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: idx * 0.05 }}
                    whileHover={{ y: -2 }}
                  >
                    <div className="p-6 space-y-4">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="text-xl font-bold text-slate-50">
                              {project.name}
                            </h3>
                            <span className={`badge ${config.badge}`}>
                              {config.label}
                            </span>
                          </div>
                          <p className="text-sm text-slate-400 mb-1">
                            📍 {project.location}
                          </p>
                          <p className="text-sm text-slate-500">
                            {project.description}
                          </p>
                        </div>
                        <div className={`status-indicator status-${project.status} flex-shrink-0`}>
                          {config.icon}
                        </div>
                      </div>

                      {/* Progress & Details Grid */}
                      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        {/* Progress */}
                        <div>
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-xs font-medium text-slate-400">
                              Progress
                            </span>
                            <span className="text-sm font-bold text-cyan-400">
                              {project.progress}%
                            </span>
                          </div>
                          <div className="progress-bar">
                            <div
                              className="progress-fill"
                              style={{ width: `${project.progress}%` }}
                            />
                          </div>
                          <p className="text-xs text-slate-500 mt-2">
                            {project.completedMilestones} of {project.totalMilestones} milestones
                          </p>
                        </div>

                        {/* Timeline */}
                        <div>
                          <p className="text-xs font-medium text-slate-400 mb-2">
                            Timeline
                          </p>
                          <p className="text-sm font-semibold text-slate-200 mb-1">
                            {new Date(project.startDate).toLocaleDateString(
                              "en-IN",
                              { month: "short", year: "numeric" }
                            )}{" "}
                            →{" "}
                            {new Date(project.dueDate).toLocaleDateString(
                              "en-IN",
                              { month: "short", year: "numeric" }
                            )}
                          </p>
                          <p className="text-xs text-slate-500">
                            Due: {new Date(project.dueDate).toLocaleDateString(
                              "en-IN",
                              { day: "numeric", month: "short" }
                            )}
                          </p>
                        </div>

                        {/* Budget */}
                        <div>
                          <p className="text-xs font-medium text-slate-400 mb-2">
                            Budget
                          </p>
                          <p className="text-sm font-semibold text-slate-200 mb-1">
                            {project.budgetUsed} / {project.budget}
                          </p>
                          <div className="w-full h-1.5 rounded-full bg-slate-800 overflow-hidden">
                            <div
                              className={`h-full transition-all ${
                                budgetHealth > 90
                                  ? "bg-red-500"
                                  : budgetHealth > 75
                                  ? "bg-amber-500"
                                  : "bg-emerald-500"
                              }`}
                              style={{ width: `${Math.min(budgetHealth, 100)}%` }}
                            />
                          </div>
                          <p className="text-xs text-slate-500 mt-1">
                            {budgetHealth}% utilized
                          </p>
                        </div>

                        {/* Team & Phase */}
                        <div>
                          <p className="text-xs font-medium text-slate-400 mb-2">
                            Team & Phase
                          </p>
                          <div className="space-y-1">
                            <p className="text-sm font-semibold text-slate-200">
                              {project.team} members
                            </p>
                            <p className="text-xs text-slate-500">
                              {project.phase}
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Footer Action */}
                      <div className="flex items-center justify-between pt-4 border-t border-slate-700/50">
                        <div className="flex gap-2">
                          <button className="text-xs font-medium text-cyan-400 hover:text-cyan-300 transition-colors">
                            View Details
                          </button>
                          <span className="text-slate-600">•</span>
                          <button className="text-xs font-medium text-slate-400 hover:text-slate-300 transition-colors">
                            Edit Timeline
                          </button>
                        </div>
                        <svg className="w-4 h-4 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-slate-400 text-lg">No projects found</p>
            </div>
          )}
        </motion.div>
      </main>
    </div>
  );
};

export default Projects;
