import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import {
  LogOut,
  Download,
  FileText,
  Users,
  BookOpen,
  Calendar,
  Mail,
  Phone,
  ChevronDown,
  ChevronUp,
  Search,
  RefreshCw,
  Heart,
  MessageSquare,
  Trash2,
  CheckCircle,
} from "lucide-react";

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:10000";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("courses");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [expandedId, setExpandedId] = useState(null);
  const [statusFilter, setStatusFilter] = useState("all");
  const [stats, setStats] = useState({});
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  // Auth check
  useEffect(() => {
    fetch(`${API_BASE}/admin/check`, { credentials: "include" })
      .then((r) => r.json())
      .then((d) => {
        if (!d.authenticated) navigate("/admin");
      })
      .catch(() => navigate("/admin"));
  }, [navigate]);

  // Fetch data
  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const endpoints = {
        courses: "course-applications",
        volunteer: "volunteer-applications",
        general: "general-applications",
        donations: "donations",
        contact: "contact-messages",
      };
      const res = await fetch(`${API_BASE}/admin/${endpoints[activeTab]}`, {
        credentials: "include",
      });
      const d = await res.json();
      if (res.ok) {
        setData(d.applications || d.donations || d.messages || []);
      } else {
        setError("Failed to fetch data");
      }
    } catch {
      setError("Network error");
    } finally {
      setLoading(false);
    }
  }, [activeTab]);

  // Fetch stats
  const fetchStats = useCallback(async () => {
    try {
      const res = await fetch(`${API_BASE}/admin/stats`, {
        credentials: "include",
      });
      const d = await res.json();
      if (res.ok) setStats(d);
    } catch {}
  }, []);

  useEffect(() => {
    fetchData();
    fetchStats();
  }, [fetchData, fetchStats]);

  // Status update
  const updateStatus = async (id, status) => {
    const endpoints = {
      courses: "course-applications",
      volunteer: "volunteer-applications",
      general: "general-applications",
      donations: "donations",
      contact: "contact-messages",
    };
    await fetch(`${API_BASE}/admin/${endpoints[activeTab]}/${id}/status`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
      credentials: "include",
    });
    fetchData();
  };

  // Delete
  const deleteItem = async (id) => {
    const endpoints = {
      courses: "course-applications",
      volunteer: "volunteer-applications",
      general: "general-applications",
      donations: "donations",
      contact: "contact-messages",
    };
    await fetch(`${API_BASE}/admin/${endpoints[activeTab]}/${id}`, {
      method: "DELETE",
      credentials: "include",
    });
    setDeleteConfirm(null);
    setExpandedId(null);
    fetchData();
    fetchStats();
  };

  // Download
  const handleDownload = async (id, fileType) => {
    try {
      const endpoint =
        activeTab === "courses"
          ? `${API_BASE}/admin/course-applications/${id}/download/${fileType}`
          : `${API_BASE}/admin/volunteer-applications/${id}/download`;
      const res = await fetch(endpoint, { credentials: "include" });
      if (res.ok) {
        const blob = await res.blob();
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `file_${id}_${fileType}`;
        a.click();
        URL.revokeObjectURL(url);
      }
    } catch {}
  };

  const handleLogout = async () => {
    await fetch(`${API_BASE}/admin/logout`, {
      method: "POST",
      credentials: "include",
    });
    navigate("/admin");
  };

  // Filter
  const filtered = data.filter((item) => {
    const searchStr =
      (item.full_name || item.name || item.first_name || "") +
      " " +
      (item.email || "") +
      " " +
      (item.course_name || item.program_type || item.subject || "");
    const matchesSearch = searchStr
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || item.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // Tab config
  const tabs = [
    { key: "courses", label: "Courses", icon: BookOpen },
    { key: "volunteer", label: "Volunteer", icon: Users },
    { key: "general", label: "Apply", icon: FileText },
    { key: "donations", label: "Donations", icon: Heart },
    { key: "contact", label: "Messages", icon: MessageSquare },
  ];

  const getTotalStat = (key) => stats[key]?.total || 0;
  const getTodayStat = (key) => stats[key]?.today || 0;

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
                <p className="text-xs text-gray-500">Dashboard</p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 text-sm text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            >
              <LogOut className="w-4 h-4" /> Logout
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-3 mb-8">
          {tabs.map((tab) => (
            <div
              key={tab.key}
              className="bg-white rounded-xl border border-gray-200 p-4 cursor-pointer hover:shadow-md transition-shadow"
              onClick={() => setActiveTab(tab.key)}
            >
              <div className="flex items-center gap-2 mb-2">
                <tab.icon
                  className={`w-4 h-4 ${
                    activeTab === tab.key ? "text-teal-600" : "text-gray-400"
                  }`}
                />
                <span className="text-xs text-gray-500">{tab.label}</span>
              </div>
              <p className="text-2xl font-bold text-gray-900">
                {getTotalStat(tab.key)}
              </p>
              <p className="text-xs text-gray-400">
                {getTodayStat(tab.key)} today
              </p>
            </div>
          ))}
        </div>

        {/* Tab bar */}
        <div className="flex items-center gap-1 mb-6 border-b border-gray-200 overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => {
                setActiveTab(tab.key);
                setExpandedId(null);
              }}
              className={`flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
                activeTab === tab.key
                  ? "border-teal-600 text-teal-700"
                  : "border-transparent text-gray-500 hover:text-gray-700"
              }`}
            >
              <tab.icon className="w-4 h-4" /> {tab.label}
            </button>
          ))}
        </div>

        {/* Search & Filter */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 outline-none text-sm"
            />
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg text-sm bg-white"
          >
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="reviewed">Reviewed</option>
            <option value="accepted">Accepted</option>
            <option value="unread">Unread</option>
            <option value="read">Read</option>
          </select>
          <button
            onClick={fetchData}
            className="flex items-center gap-2 px-4 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            <RefreshCw className="w-4 h-4" /> Refresh
          </button>
        </div>

        {/* Error */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
            {error}
          </div>
        )}

        {/* Loading */}
        {loading && (
          <div className="text-center py-20">
            <RefreshCw className="w-8 h-8 text-gray-400 animate-spin mx-auto mb-3" />
            <p className="text-gray-500">Loading...</p>
          </div>
        )}

        {/* Empty */}
        {!loading && filtered.length === 0 && (
          <div className="text-center py-20">
            <FileText className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <p className="text-gray-500">No items found</p>
          </div>
        )}

        {/* List */}
        {!loading &&
          filtered.map((item) => {
            const isExpanded = expandedId === item.id;
            const name =
              item.full_name ||
              item.name ||
              `${item.first_name || ""} ${item.last_name || ""}`.trim();
            const email = item.email || "";
            const program =
              item.course_name || item.program_type || item.subject || "";
            const hasMedical = item.medical_certificate?.exists;
            const hasExperience = item.experience_certificate?.exists;

            return (
              <div
                key={item.id}
                className="bg-white rounded-xl border border-gray-200 mb-3 overflow-hidden"
              >
                {/* Summary Row */}
                <div
                  className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-50"
                  onClick={() => setExpandedId(isExpanded ? null : item.id)}
                >
                  <div className="flex items-center gap-3 flex-1 min-w-0">
                    <div className="w-9 h-9 rounded-full bg-teal-100 flex items-center justify-center flex-shrink-0">
                      <span className="text-sm font-bold text-teal-700">
                        {name?.charAt(0) || "?"}
                      </span>
                    </div>
                    <div className="min-w-0">
                      <p className="font-semibold text-gray-900 text-sm truncate">
                        {name}
                      </p>
                      <p className="text-xs text-gray-500 truncate">
                        {program || email}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 flex-shrink-0">
                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] font-medium ${
                        item.status === "pending" || item.status === "unread"
                          ? "bg-amber-100 text-amber-700"
                          : item.status === "reviewed" || item.status === "read"
                          ? "bg-blue-100 text-blue-700"
                          : "bg-green-100 text-green-700"
                      }`}
                    >
                      {item.status}
                    </span>
                    <span className="text-xs text-gray-400 hidden sm:block">
                      {item.created_at?.split(" ")[0]}
                    </span>
                    {isExpanded ? (
                      <ChevronUp className="w-4 h-4 text-gray-400" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-gray-400" />
                    )}
                  </div>
                </div>

                {/* Expanded Details */}
                {isExpanded && (
                  <div className="border-t border-gray-100 p-5 bg-gray-50/50 space-y-4">
                    {/* Details grid */}
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                      {item.email && (
                        <div className="flex items-center gap-2">
                          <Mail className="w-4 h-4 text-gray-400 flex-shrink-0" />
                          <span className="text-sm text-gray-700 truncate">
                            {item.email}
                          </span>
                        </div>
                      )}
                      {item.phone && (
                        <div className="flex items-center gap-2">
                          <Phone className="w-4 h-4 text-gray-400 flex-shrink-0" />
                          <span className="text-sm text-gray-700">
                            {item.phone}
                          </span>
                        </div>
                      )}
                      {item.preferred_date && (
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-gray-400 flex-shrink-0" />
                          <span className="text-sm text-gray-700">
                            {item.preferred_date}
                          </span>
                        </div>
                      )}
                      {item.week_selection && (
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-gray-400 flex-shrink-0" />
                          <span className="text-sm text-gray-700">
                            {item.week_selection}
                          </span>
                        </div>
                      )}
                      {item.amount && (
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-semibold text-teal-700">
                            ₱{item.amount}
                          </span>
                        </div>
                      )}
                      {item.donation_type && (
                        <span className="text-xs text-gray-500 capitalize">
                          {item.donation_type}
                        </span>
                      )}
                      {item.nationality && (
                        <span className="text-sm text-gray-700">
                          🌍 {item.nationality}
                        </span>
                      )}
                      {item.course && (
                        <span className="text-sm text-gray-700">
                          📚 {item.course}
                        </span>
                      )}
                      {item.certification_level && (
                        <span className="text-sm text-gray-700">
                          🎯 {item.certification_level}
                        </span>
                      )}
                      {item.experience_level && (
                        <span className="text-sm text-gray-700 capitalize">
                          Level: {item.experience_level}
                        </span>
                      )}
                    </div>

                    {/* Message */}
                    {item.message &&
                      item.message !== "No additional message" &&
                      item.message !== "No message" && (
                        <div className="p-3 bg-white rounded-lg border border-gray-200">
                          <p className="text-xs text-gray-500 mb-1">Message</p>
                          <p className="text-sm text-gray-700 whitespace-pre-wrap">
                            {item.message}
                          </p>
                        </div>
                      )}

                    {/* Files */}
                    {(hasMedical || hasExperience) && (
                      <div className="space-y-2">
                        <p className="text-xs font-semibold text-gray-500 uppercase">
                          Attachments
                        </p>
                        {hasMedical && (
                          <div className="flex items-center justify-between p-2 bg-white rounded-lg border">
                            <span className="text-sm text-teal-700">
                              📄 {item.medical_certificate.filename}
                            </span>
                            <button
                              onClick={() => handleDownload(item.id, "medical")}
                              className="flex items-center gap-1 px-3 py-1 text-xs bg-teal-50 text-teal-700 rounded-lg hover:bg-teal-100"
                            >
                              <Download className="w-3 h-3" /> Download
                            </button>
                          </div>
                        )}
                        {hasExperience && (
                          <div className="flex items-center justify-between p-2 bg-white rounded-lg border">
                            <span className="text-sm text-teal-700">
                              📄 {item.experience_certificate.filename}
                            </span>
                            <button
                              onClick={() =>
                                handleDownload(item.id, "experience")
                              }
                              className="flex items-center gap-1 px-3 py-1 text-xs bg-teal-50 text-teal-700 rounded-lg hover:bg-teal-100"
                            >
                              <Download className="w-3 h-3" /> Download
                            </button>
                          </div>
                        )}
                      </div>
                    )}

                    {/* Actions */}
                    <div className="flex flex-wrap gap-2 pt-2 border-t border-gray-200">
                      {/* Status buttons */}
                      {["pending", "reviewed", "accepted", "read"]
                        .filter((s) => s !== item.status)
                        .map((status) => (
                          <button
                            key={status}
                            onClick={() => updateStatus(item.id, status)}
                            className="flex items-center gap-1 px-3 py-1.5 text-xs rounded-lg border border-gray-300 hover:bg-gray-100 capitalize"
                          >
                            <CheckCircle className="w-3 h-3" /> Mark {status}
                          </button>
                        ))}

                      {/* Delete */}
                      {deleteConfirm === item.id ? (
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-red-600">
                            Confirm delete?
                          </span>
                          <button
                            onClick={() => deleteItem(item.id)}
                            className="px-2 py-1 text-xs bg-red-600 text-white rounded"
                          >
                            Yes
                          </button>
                          <button
                            onClick={() => setDeleteConfirm(null)}
                            className="px-2 py-1 text-xs border rounded"
                          >
                            No
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => setDeleteConfirm(item.id)}
                          className="flex items-center gap-1 px-3 py-1.5 text-xs rounded-lg border border-red-200 text-red-600 hover:bg-red-50"
                        >
                          <Trash2 className="w-3 h-3" /> Delete
                        </button>
                      )}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default AdminDashboard;
