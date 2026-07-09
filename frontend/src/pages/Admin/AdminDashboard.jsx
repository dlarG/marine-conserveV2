import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import {
  LogOut,
  Download,
  Eye,
  FileText,
  Users,
  BookOpen,
  Calendar,
  Mail,
  Phone,
  Clock,
  ChevronDown,
  ChevronUp,
  Search,
  RefreshCw,
  X,
} from "lucide-react";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("courses");
  const [courseApplications, setCourseApplications] = useState([]);
  const [volunteerApplications, setVolunteerApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [expandedApp, setExpandedApp] = useState(null);
  const [statusFilter, setStatusFilter] = useState("all");

  const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:10000";

  // Check authentication
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch(`${API_BASE}/admin/check`, {
          credentials: "include",
        });
        const data = await response.json();
        if (!data.authenticated) {
          navigate("/admin");
        }
      } catch {
        navigate("/admin");
      }
    };
    checkAuth();
  }, [navigate, API_BASE]);

  // Fetch applications
  const fetchApplications = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      if (activeTab === "courses") {
        const response = await fetch(`${API_BASE}/admin/course-applications`, {
          credentials: "include",
        });
        const data = await response.json();
        if (response.ok) {
          setCourseApplications(data.applications || []);
        } else {
          setError("Failed to fetch course applications");
        }
      } else {
        const response = await fetch(
          `${API_BASE}/admin/volunteer-applications`,
          { credentials: "include" }
        );
        const data = await response.json();
        if (response.ok) {
          setVolunteerApplications(data.applications || []);
        } else {
          setError("Failed to fetch volunteer applications");
        }
      }
    } catch {
      setError("Network error. Please check your connection.");
    } finally {
      setLoading(false);
    }
  }, [activeTab, API_BASE]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchApplications();
  }, [fetchApplications]);

  // Download file
  const handleDownload = async (applicationId, fileType) => {
    try {
      const endpoint =
        activeTab === "courses"
          ? `${API_BASE}/admin/course-applications/${applicationId}/download/${fileType}`
          : `${API_BASE}/admin/volunteer-applications/${applicationId}/download`;

      const response = await fetch(endpoint, { credentials: "include" });

      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        const disposition = response.headers.get("Content-Disposition");
        const filename = disposition
          ? disposition.split("filename=")[1]?.replace(/"/g, "")
          : `file_${applicationId}_${fileType}`;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        a.remove();
        window.URL.revokeObjectURL(url);
      }
    } catch (err) {
      console.error("Download failed:", err);
    }
  };

  // Logout
  const handleLogout = async () => {
    await fetch(`${API_BASE}/admin/logout`, {
      method: "POST",
      credentials: "include",
    });
    navigate("/admin/login");
  };

  // Filter by search and status
  const applications =
    activeTab === "courses" ? courseApplications : volunteerApplications;

  const filteredApplications = applications.filter((app) => {
    const matchesSearch =
      app.full_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (app.course_name || app.program_type)
        ?.toLowerCase()
        .includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter === "all" || app.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  // Stats
  const stats = {
    total: applications.length,
    pending: applications.filter((a) => a.status === "pending").length,
    reviewed: applications.filter((a) => a.status === "reviewed").length,
    today: applications.filter((a) => {
      const today = new Date().toISOString().split("T")[0];
      return a.created_at?.includes(today);
    }).length,
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-teal-600 flex items-center justify-center">
                <FileText className="w-4 h-4 text-white" />
              </div>
              <div>
                <h1 className="text-lg font-bold text-gray-900">
                  GREEN Inc. Admin
                </h1>
                <p className="text-xs text-gray-500">Application Dashboard</p>
              </div>
            </div>

            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 text-sm text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {[
            {
              label: "Total Applications",
              value: stats.total,
              icon: FileText,
              color: "bg-blue-50 text-blue-600",
            },
            {
              label: "Pending",
              value: stats.pending,
              icon: Clock,
              color: "bg-amber-50 text-amber-600",
            },
            {
              label: "Reviewed",
              value: stats.reviewed,
              icon: Eye,
              color: "bg-green-50 text-green-600",
            },
            {
              label: "Today",
              value: stats.today,
              icon: Calendar,
              color: "bg-purple-50 text-purple-600",
            },
          ].map((stat) => (
            <div
              key={stat.label}
              className="bg-white rounded-xl border border-gray-200 p-5"
            >
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-lg ${stat.color}`}>
                  <stat.icon className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">
                    {stat.value}
                  </p>
                  <p className="text-xs text-gray-500">{stat.label}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex items-center gap-4 mb-6 border-b border-gray-200">
          {[
            { key: "courses", label: "Course Applications", icon: BookOpen },
            { key: "volunteer", label: "Volunteer Applications", icon: Users },
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => {
                setActiveTab(tab.key);
                setExpandedApp(null);
              }}
              className={`flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
                activeTab === tab.key
                  ? "border-teal-600 text-teal-700"
                  : "border-transparent text-gray-500 hover:text-gray-700"
              }`}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Search & Filter Bar */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search by name, email, or program..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 outline-none text-sm"
            />
          </div>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-teal-500 outline-none bg-white"
          >
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="reviewed">Reviewed</option>
            <option value="accepted">Accepted</option>
          </select>

          <button
            onClick={fetchApplications}
            className="flex items-center gap-2 px-4 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <RefreshCw className="w-4 h-4" />
            Refresh
          </button>
        </div>

        {/* Error State */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
            {error}
            <button onClick={fetchApplications} className="ml-4 underline">
              Try again
            </button>
          </div>
        )}

        {/* Applications List */}
        {loading ? (
          <div className="text-center py-20">
            <RefreshCw className="w-8 h-8 text-gray-400 animate-spin mx-auto mb-3" />
            <p className="text-gray-500">Loading applications...</p>
          </div>
        ) : filteredApplications.length === 0 ? (
          <div className="text-center py-20">
            <FileText className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <p className="text-gray-500 text-lg font-medium">
              No applications found
            </p>
            <p className="text-gray-400 text-sm">
              {searchTerm
                ? "Try adjusting your search"
                : "Applications will appear here"}
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {filteredApplications.map((app) => (
              <div
                key={app.id}
                className="bg-white rounded-xl border border-gray-200 overflow-hidden"
              >
                {/* Summary Row */}
                <div
                  className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-50 transition-colors"
                  onClick={() =>
                    setExpandedApp(expandedApp === app.id ? null : app.id)
                  }
                >
                  <div className="flex items-center gap-4 flex-1 min-w-0">
                    <div className="w-10 h-10 rounded-full bg-teal-100 flex items-center justify-center flex-shrink-0">
                      <span className="text-sm font-bold text-teal-700">
                        {app.full_name?.charAt(0) || "?"}
                      </span>
                    </div>
                    <div className="min-w-0">
                      <p className="font-semibold text-gray-900 truncate">
                        {app.full_name}
                      </p>
                      <p className="text-xs text-gray-500 truncate">
                        {app.course_name || app.program_type} • #{app.id}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 flex-shrink-0">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        app.status === "pending"
                          ? "bg-amber-100 text-amber-700"
                          : app.status === "reviewed"
                          ? "bg-blue-100 text-blue-700"
                          : "bg-green-100 text-green-700"
                      }`}
                    >
                      {app.status}
                    </span>
                    <span className="text-xs text-gray-400 hidden sm:block">
                      {app.created_at?.split(" at")[0]}
                    </span>
                    {expandedApp === app.id ? (
                      <ChevronUp className="w-4 h-4 text-gray-400" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-gray-400" />
                    )}
                  </div>
                </div>

                {/* Expanded Details */}
                {expandedApp === app.id && (
                  <div className="border-t border-gray-100 p-5 bg-gray-50/50">
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
                      <div className="flex items-center gap-2">
                        <Mail className="w-4 h-4 text-gray-400" />
                        <div>
                          <p className="text-xs text-gray-500">Email</p>
                          <p className="text-sm text-gray-900">{app.email}</p>
                        </div>
                      </div>

                      {app.phone && (
                        <div className="flex items-center gap-2">
                          <Phone className="w-4 h-4 text-gray-400" />
                          <div>
                            <p className="text-xs text-gray-500">Phone</p>
                            <p className="text-sm text-gray-900">{app.phone}</p>
                          </div>
                        </div>
                      )}

                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-gray-400" />
                        <div>
                          <p className="text-xs text-gray-500">Date</p>
                          <p className="text-sm text-gray-900">
                            {app.preferred_date || app.week_selection || "N/A"}
                          </p>
                        </div>
                      </div>

                      {app.experience_level && (
                        <div className="flex items-center gap-2">
                          <Users className="w-4 h-4 text-gray-400" />
                          <div>
                            <p className="text-xs text-gray-500">Experience</p>
                            <p className="text-sm text-gray-900 capitalize">
                              {app.experience_level}
                            </p>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Message */}
                    {app.message && app.message !== "No additional message" && (
                      <div className="mb-4 p-3 bg-white rounded-lg border border-gray-200">
                        <p className="text-xs text-gray-500 mb-1">Message</p>
                        <p className="text-sm text-gray-700">{app.message}</p>
                      </div>
                    )}

                    {/* Files */}
                    <div className="space-y-2">
                      <p className="text-xs font-semibold text-gray-500 uppercase">
                        Attached Documents
                      </p>

                      {/* Medical Certificate */}
                      {app.medical_certificate?.exists ? (
                        <div className="flex items-center justify-between p-3 bg-white rounded-lg border border-gray-200">
                          <div className="flex items-center gap-2">
                            <FileText className="w-4 h-4 text-teal-600" />
                            <span className="text-sm text-gray-700">
                              Medical Certificate:{" "}
                              <span className="text-teal-700 font-medium">
                                {app.medical_certificate.filename}
                              </span>
                            </span>
                          </div>
                          <button
                            onClick={() =>
                              handleDownload(
                                app.id,
                                activeTab === "courses" ? "medical" : "medical"
                              )
                            }
                            className="flex items-center gap-1 px-3 py-1 text-xs bg-teal-50 text-teal-700 rounded-lg hover:bg-teal-100 transition-colors"
                          >
                            <Download className="w-3 h-3" />
                            Download
                          </button>
                        </div>
                      ) : (
                        <div className="flex items-center gap-2 p-3 bg-white rounded-lg border border-gray-200">
                          <X className="w-4 h-4 text-gray-400" />
                          <span className="text-sm text-gray-400">
                            No medical certificate uploaded
                          </span>
                        </div>
                      )}

                      {/* Experience Certificate (courses only) */}
                      {activeTab === "courses" &&
                        (app.experience_certificate?.exists ? (
                          <div className="flex items-center justify-between p-3 bg-white rounded-lg border border-gray-200">
                            <div className="flex items-center gap-2">
                              <FileText className="w-4 h-4 text-teal-600" />
                              <span className="text-sm text-gray-700">
                                Experience Certificate:{" "}
                                <span className="text-teal-700 font-medium">
                                  {app.experience_certificate.filename}
                                </span>
                              </span>
                            </div>
                            <button
                              onClick={() =>
                                handleDownload(app.id, "experience")
                              }
                              className="flex items-center gap-1 px-3 py-1 text-xs bg-teal-50 text-teal-700 rounded-lg hover:bg-teal-100 transition-colors"
                            >
                              <Download className="w-3 h-3" />
                              Download
                            </button>
                          </div>
                        ) : (
                          <div className="flex items-center gap-2 p-3 bg-white rounded-lg border border-gray-200">
                            <X className="w-4 h-4 text-gray-400" />
                            <span className="text-sm text-gray-400">
                              No experience certificate uploaded
                            </span>
                          </div>
                        ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
