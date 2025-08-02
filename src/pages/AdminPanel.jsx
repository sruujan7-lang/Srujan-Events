import React, { useState, useEffect } from "react";
import {
  Users,
  Image,
  FileText,
  MessageSquare,
  LogOut,
  Eye,
  EyeOff,
  BarChart3,
} from "lucide-react";
import "../styles/AdminPanel.css";

const AdminPanel = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loginData, setLoginData] = useState({ username: "", password: "" });
  const [activeTab, setActiveTab] = useState("dashboard");
  const [stats, setStats] = useState({});
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    if (token) {
      setIsAuthenticated(true);
      fetchDashboardData();
    }
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(loginData),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("adminToken", data.token);
        setIsAuthenticated(true);
        fetchDashboardData();
      } else {
        setError(data.message || "Login failed");
      }
    } catch (err) {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    setIsAuthenticated(false);
    setActiveTab("dashboard");
  };

  const fetchDashboardData = async () => {
    try {
      const token = localStorage.getItem("adminToken");
      const response = await fetch("/api/admin/stats", {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.ok) {
        const data = await response.json();
        setStats(data);
      }
    } catch (err) {
      console.error("Failed to fetch dashboard data:", err);
    }
  };

  const fetchContacts = async () => {
    try {
      const token = localStorage.getItem("adminToken");
      const response = await fetch("/api/admin/contacts", {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.ok) {
        const data = await response.json();
        setContacts(data);
      }
    } catch (err) {
      console.error("Failed to fetch contacts:", err);
    }
  };

  const updateContactStatus = async (contactId, status) => {
    try {
      const token = localStorage.getItem("adminToken");
      const response = await fetch(`/api/admin/contacts/${contactId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status }),
      });

      if (response.ok) {
        fetchContacts();
        fetchDashboardData();
      }
    } catch (err) {
      console.error("Failed to update contact status:", err);
    }
  };

  useEffect(() => {
    if (isAuthenticated && activeTab === "contacts") {
      fetchContacts();
    }
  }, [isAuthenticated, activeTab]);

  if (!isAuthenticated) {
    return (
      <div className="admin-login">
        <div className="login-container">
          <div className="login-header">
            <h2>Admin Panel</h2>
            <p>Srujan Events Management System</p>
          </div>

          <form onSubmit={handleLogin} className="login-form">
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                id="username"
                value={loginData.username}
                onChange={(e) =>
                  setLoginData({ ...loginData, username: e.target.value })
                }
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <div className="password-input">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  value={loginData.password}
                  onChange={(e) =>
                    setLoginData({ ...loginData, password: e.target.value })
                  }
                  required
                />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            {error && <div className="error">{error}</div>}

            <button
              type="submit"
              className="btn btn-primary"
              disabled={loading}
            >
              {loading ? "Signing In..." : "Sign In"}
            </button>
          </form>

          <div className="login-footer">
            <p>Demo Credentials:</p>
            <p>Username: admin | Password: srujan2024</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-panel">
      <div className="admin-sidebar">
        <div className="sidebar-header">
          <h3>Srujan Events</h3>
          <p>Admin Panel</p>
        </div>

        <nav className="sidebar-nav">
          <button
            className={`nav-item ${activeTab === "dashboard" ? "active" : ""}`}
            onClick={() => setActiveTab("dashboard")}
          >
            <BarChart3 size={20} />
            Dashboard
          </button>
          <button
            className={`nav-item ${activeTab === "contacts" ? "active" : ""}`}
            onClick={() => setActiveTab("contacts")}
          >
            <Users size={20} />
            Contacts
          </button>
          <button
            className={`nav-item ${activeTab === "gallery" ? "active" : ""}`}
            onClick={() => setActiveTab("gallery")}
          >
            <Images size={20} />
            Gallery
          </button>
          <button
            className={`nav-item ${activeTab === "blog" ? "active" : ""}`}
            onClick={() => setActiveTab("blog")}
          >
            <FileText size={20} />
            Blog
          </button>
          <button
            className={`nav-item ${
              activeTab === "testimonials" ? "active" : ""
            }`}
            onClick={() => setActiveTab("testimonials")}
          >
            <MessageSquare size={20} />
            Testimonials
          </button>
        </nav>

        <button className="logout-btn" onClick={handleLogout}>
          <LogOut size={20} />
          Logout
        </button>
      </div>

      <div className="admin-main">
        <div className="admin-header">
          <h1>
            {activeTab === "dashboard" && "Dashboard"}
            {activeTab === "contacts" && "Contact Management"}
            {activeTab === "gallery" && "Gallery Management"}
            {activeTab === "blog" && "Blog Management"}
            {activeTab === "testimonials" && "Testimonials Management"}
          </h1>
        </div>

        <div className="admin-content">
          {activeTab === "dashboard" && (
            <div className="dashboard">
              <div className="stats-grid">
                <div className="stat-card">
                  <div className="stat-icon">
                    <Users />
                  </div>
                  <div className="stat-info">
                    <h3>{stats.totalContacts || 0}</h3>
                    <p>Total Contacts</p>
                  </div>
                </div>
                <div className="stat-card">
                  <div className="stat-icon">
                    <MessageSquare />
                  </div>
                  <div className="stat-info">
                    <h3>{stats.newContacts || 0}</h3>
                    <p>New Inquiries</p>
                  </div>
                </div>
                <div className="stat-card">
                  <div className="stat-icon">
                    <Images />
                  </div>
                  <div className="stat-info">
                    <h3>{stats.totalGalleryImages || 0}</h3>
                    <p>Gallery Images</p>
                  </div>
                </div>
                <div className="stat-card">
                  <div className="stat-icon">
                    <FileText />
                  </div>
                  <div className="stat-info">
                    <h3>{stats.totalBlogPosts || 0}</h3>
                    <p>Blog Posts</p>
                  </div>
                </div>
              </div>

              <div className="recent-activity">
                <h3>Recent Contacts</h3>
                <div className="activity-list">
                  {stats.recentContacts?.map((contact) => (
                    <div key={contact.id} className="activity-item">
                      <div className="activity-info">
                        <h4>{contact.name}</h4>
                        <p>
                          {contact.eventType} - {contact.email}
                        </p>
                      </div>
                      <span className={`status ${contact.status}`}>
                        {contact.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === "contacts" && (
            <div className="contacts-management">
              <div className="contacts-table">
                <table>
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Event Type</th>
                      <th>Date</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {contacts.map((contact) => (
                      <tr key={contact.id}>
                        <td>
                          <div>
                            <strong>{contact.name}</strong>
                            <br />
                            <small>{contact.email}</small>
                          </div>
                        </td>
                        <td>{contact.eventType}</td>
                        <td>
                          {new Date(contact.createdAt).toLocaleDateString()}
                        </td>
                        <td>
                          <span className={`status ${contact.status}`}>
                            {contact.status}
                          </span>
                        </td>
                        <td>
                          <select
                            value={contact.status}
                            onChange={(e) =>
                              updateContactStatus(contact.id, e.target.value)
                            }
                          >
                            <option value="new">New</option>
                            <option value="contacted">Contacted</option>
                            <option value="closed">Closed</option>
                          </select>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === "gallery" && (
            <div className="gallery-management">
              <p>Gallery management features will be available soon.</p>
            </div>
          )}

          {activeTab === "blog" && (
            <div className="blog-management">
              <p>Blog management features will be available soon.</p>
            </div>
          )}

          {activeTab === "testimonials" && (
            <div className="testimonials-management">
              <p>Testimonials management features will be available soon.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
