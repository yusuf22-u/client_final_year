import { useState, useEffect } from "react";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Briefcase,
  Shield,
  Lock,
  Bell,
  Activity,
  Edit3,
  Save,
  X,
  Eye,
  EyeOff,
  CheckCircle,
  Camera,
  Trash2,
  Download,
  AlertCircle,
  Clock,
  Monitor,
  Smartphone,
  Globe,
  ArrowBigLeft
} from "lucide-react";
import { formatDate } from "../helpers/formatDate"
import { useNavigate } from "react-router-dom"
import API from "../api/axios";
import { useAuth } from "../context/AuthContext"
import toast from "react-hot-toast";


export function UserAccountPage() {
  const [activeTab, setActiveTab] = useState("profile");
  const [isEditing, setIsEditing] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false)


  // User data
  const [profile, setProfile] = useState([]);
  const navigate = useNavigate(1)


  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await API.get("/users/my-account"); // your backend route
        setProfile(res.data);
        // setEditForm(res.data);
        console.log("info", res.data)

      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);
  // Edit form state
  // const [editForm, setEditForm] = useState({ ...profile });

  // Password form
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [profileImage, setProfileImage] = useState(null);

  const [editForm, setEditForm] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    role: "",
  });
  const { user } = useAuth()

  // Notification settings
  const [notifications, setNotifications] = useState({
    emailAppointments: true,
    emailMessages: true,
    emailReports: false,
    pushAppointments: true,
    pushMessages: true,
    pushAlerts: true,
    smsAppointments: false,
    smsEmergency: true,
  });

  // Activity logs
  const activityLogs = [
    { id: 1, action: "Logged in", timestamp: "Apr 22, 2026 at 9:45 AM", device: "Chrome on Windows", location: "San Francisco, CA", icon: Monitor },
    { id: 2, action: "Updated patient record", timestamp: "Apr 22, 2026 at 8:30 AM", device: "Chrome on Windows", location: "San Francisco, CA", icon: Activity },
    { id: 3, action: "Logged in", timestamp: "Apr 21, 2026 at 2:15 PM", device: "Safari on iPhone", location: "San Francisco, CA", icon: Smartphone },
    { id: 4, action: "Changed password", timestamp: "Apr 18, 2026 at 10:00 AM", device: "Chrome on Windows", location: "San Francisco, CA", icon: Lock },
    { id: 5, action: "Logged in", timestamp: "Apr 18, 2026 at 9:45 AM", device: "Chrome on Windows", location: "San Francisco, CA", icon: Monitor },
  ];

  const tabs = [
    { id: "profile", label: "Profile Information", icon: User },
    { id: "security", label: "Security", icon: Lock },
    { id: "notifications", label: "Notifications", icon: Bell },
    { id: "activity", label: "Activity Log", icon: Activity },
  ];

  const roleConfig = {
    admin: { label: "Administrator", color: "#F59E0B", bg: "#FEF3C7" },
    doctor: { label: "Doctor", color: "#0E7490", bg: "#E0F7FA" },
    patient: { label: "Patient", color: "#8B5CF6", bg: "#EDE9FE" },
  };

  const handleEditUser = (user) => {
    setSelectedUser(user);

    setEditForm({
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
      phone: user.phone,
      role: user.role,
    });

    setShowEditModal(true);
  };
  const handleImageChange = (e) => {
    setProfileImage(e.target.files[0]);
  };
  const handleUpdateUser = async () => {
    try {
      const formData = new FormData();

      formData.append("first_name", editForm.first_name);
      formData.append("last_name", editForm.last_name);
      formData.append("email", editForm.email);
      formData.append("phone", editForm.phone);
      formData.append("role", editForm.role);

      if (profileImage) {
        formData.append("profile_image", profileImage);
      }

      await API.put(
        `/users/${selectedUser.id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      toast.success("User updated successfully");

      setShowEditModal(false);

      fetchUsers();
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to update user"
      );
    }
  };
  const handleCancelEdit = () => {
    setEditForm({ ...profile });
    setIsEditing(false);
  };

  const handleChangePassword = async () => {
    try {
      const userId = user?.id

      const { data } = await API.put("/users/change-password", {
        userId,
        currentPassword,
        newPassword,
      });

      toast.success(data.message);

      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to update password"
      );
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC] overflow-x-hidden">
  <div className="flex-1 flex flex-col min-h-screen">
    <main className="flex-1 p-3 sm:p-6 lg:p-8 mt-16 sm:mt-20">
          {/* Profile Header */}
           {/* ================= PROFILE HEADER ================= */}
      <div className="bg-white rounded-2xl p-4 sm:p-6 mb-6 shadow-sm">
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">

          {/* LEFT SIDE */}
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-5">

            {/* PROFILE IMAGE */}
            <div className="relative">
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl flex items-center justify-center bg-[#E0F7FA] overflow-hidden">
                {profile?.profile_image ? (
                  <img
                    src={`http://localhost:4000/uploads/${profile.profile_image}`}
                    alt="profile"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-lg font-bold text-slate-800">
                    {profile?.first_name?.[0] || ""}
                    {profile?.last_name?.[0] || ""}
                  </span>
                )}
              </div>

              <button className="absolute bottom-0 right-0 w-7 h-7 sm:w-8 sm:h-8 bg-[#0E7490] rounded-lg flex items-center justify-center">
                <Camera className="w-4 h-4 text-white" />
              </button>
            </div>

            {/* USER INFO */}
            <div className="text-center sm:text-left">
              <h2 className="text-lg sm:text-2xl font-bold text-slate-900">
                Dr. {profile.first_name} {profile.last_name}
              </h2>

              <div className="flex flex-wrap justify-center sm:justify-start items-center gap-2 sm:gap-3 mt-2">
                <span className="px-3 py-1 text-xs rounded-lg bg-[#0E7490] text-white capitalize">
                  {profile.user_role}
                </span>

                {profile.specialty && (
                  <span className="text-sm text-slate-600">
                    {profile.specialty}
                  </span>
                )}
              </div>

              <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 mt-3 text-xs sm:text-sm text-slate-500">
                <div className="flex items-center gap-1.5">
                  <Calendar className="w-4 h-4" />
                  Joined {formatDate(profile.created_at)}
                </div>

                <div className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4" />
                  Last login: {profile.last_login}
                </div>
              </div>
            </div>
          </div>

          {/* BACK BUTTON */}
          <div className="flex justify-center lg:justify-end">
            <button
              onClick={() => navigate(-1)}
              className="px-4 py-2 text-sm border rounded-xl flex items-center gap-2"
            >
              <ArrowBigLeft className="w-4 h-4" />
              Back
            </button>
          </div>

        </div>
      </div>


          {/* Tabs */}
          {/* ================= TABS ================= */}
      <div className="bg-white rounded-2xl mb-6 shadow-sm">
        <div className="flex flex-wrap sm:flex-nowrap items-center gap-2 p-2 ">

          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;

            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className="flex-1 flex items-center justify-center gap-2 px-3 sm:px-4 py-3 rounded-xl transition-all text-sm"
                style={{
                  backgroundColor: isActive ? "#0E7490" : "transparent",
                  color: isActive ? "#fff" : "#64748B",
                  fontWeight: isActive ? 700 : 600,
                }}
              >
                <tab.icon className="w-4 h-4" />
                {tab.label}
              </button>
            );
          })}

        </div>
      </div>
          {/* Profile Tab */}
         {/* ================= PROFILE TAB ================= */}
      {activeTab === "profile" && (
        <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-sm">

          <div className="flex items-center justify-between mb-6">
            <h3 className="text-base sm:text-lg font-bold text-slate-900">
              Personal Information
            </h3>

            <button
              onClick={() => handleEditUser(user)}
              className="px-3 py-2 border rounded-lg text-sm"
            >
              Edit
            </button>
          </div>

          {/* GRID */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">

            <div>
              <label className="text-sm font-semibold text-slate-700">Full Name</label>
              <p className="mt-2 p-3 bg-slate-50 border rounded-xl">
                {profile.first_name} {profile.last_name}
              </p>
            </div>

            <div>
              <label className="text-sm font-semibold text-slate-700">Email</label>
              <p className="mt-2 p-3 bg-slate-50 border rounded-xl">
                {profile.email}
              </p>
            </div>

            <div>
              <label className="text-sm font-semibold text-slate-700">Phone</label>
              <p className="mt-2 p-3 bg-slate-50 border rounded-xl">
                {profile.phone}
              </p>
            </div>

            <div>
              <label className="text-sm font-semibold text-slate-700">Date of Birth</label>
              <p className="mt-2 p-3 bg-slate-50 border rounded-xl">
                {profile.date_of_birth
                  ? new Date(profile.date_of_birth).toLocaleDateString()
                  : "N/A"}
              </p>
            </div>

            <div className="md:col-span-2">
              <label className="text-sm font-semibold text-slate-700">Address</label>
              <p className="mt-2 p-3 bg-slate-50 border rounded-xl">
                {profile.staff_address}
              </p>
            </div>

          </div>
        </div>
      )}

          {/* Security Tab */}
          {activeTab === "security" && (
            <div className="bg-white rounded-2xl p-6" style={{ boxShadow: "0 4px 20px rgba(0,0,0,0.05)" }}>
              <h3 className="mb-6" style={{ fontSize: 18, fontWeight: 700, color: "#0F172A" }}>Change Password</h3>

              <div className="max-w-2xl space-y-5">
                <div>
                  <label className="block text-sm text-slate-700 mb-2" style={{ fontWeight: 600 }}>Current Password</label>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type={showCurrentPassword ? "text" : "password"}
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                      placeholder="Enter current password"
                      className="w-full pl-10 pr-12 py-3 text-sm border border-slate-200 rounded-xl bg-slate-50 text-slate-700 focus:outline-none focus:border-teal-400 focus:bg-white transition-all"
                    />
                    <button
                      type="button"
                      onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2"
                    >
                      {showCurrentPassword ? <EyeOff className="w-4 h-4 text-slate-400" /> : <Eye className="w-4 h-4 text-slate-400" />}
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-sm text-slate-700 mb-2" style={{ fontWeight: 600 }}>New Password</label>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type={showNewPassword ? "text" : "password"}
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      placeholder="Enter new password"
                      className="w-full pl-10 pr-12 py-3 text-sm border border-slate-200 rounded-xl bg-slate-50 text-slate-700 focus:outline-none focus:border-teal-400 focus:bg-white transition-all"
                    />
                    <button
                      type="button"
                      onClick={() => setShowNewPassword(!showNewPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2"
                    >
                      {showNewPassword ? <EyeOff className="w-4 h-4 text-slate-400" /> : <Eye className="w-4 h-4 text-slate-400" />}
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-sm text-slate-700 mb-2" style={{ fontWeight: 600 }}>Confirm New Password</label>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="Confirm new password"
                      className="w-full pl-10 pr-12 py-3 text-sm border border-slate-200 rounded-xl bg-slate-50 text-slate-700 focus:outline-none focus:border-teal-400 focus:bg-white transition-all"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2"
                    >
                      {showConfirmPassword ? <EyeOff className="w-4 h-4 text-slate-400" /> : <Eye className="w-4 h-4 text-slate-400" />}
                    </button>
                  </div>
                  {confirmPassword && newPassword !== confirmPassword && (
                    <p className="text-xs text-red-600 mt-2">Passwords do not match</p>
                  )}
                </div>

                <button
                  onClick={handleChangePassword}
                  disabled={!currentPassword || !newPassword || !confirmPassword || newPassword !== confirmPassword}
                  className="px-6 py-3 rounded-xl flex items-center gap-2 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
                  style={{ backgroundColor: "#0E7490", color: "#fff", fontWeight: 700, fontSize: 14 }}
                >
                  <CheckCircle className="w-4 h-4" />
                  Update Password
                </button>
              </div>

              <div className="my-6 border-t border-slate-100" />

              <h3 className="mb-4" style={{ fontSize: 16, fontWeight: 700, color: "#0F172A" }}>Two-Factor Authentication</h3>
              <div className="p-4 rounded-xl" style={{ backgroundColor: "#F8FAFC" }}>
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3">
                    <Shield className="w-5 h-5 mt-0.5" style={{ color: "#0E7490" }} />
                    <div>
                      <h4 className="mb-1" style={{ fontSize: 14, fontWeight: 700, color: "#0F172A" }}>Enable 2FA</h4>
                      <p className="text-sm text-slate-600">Add an extra layer of security to your account</p>
                    </div>
                  </div>
                  <button className="px-4 py-2 rounded-xl border-2 border-slate-200 text-slate-700 transition-all hover:bg-slate-50" style={{ fontWeight: 600, fontSize: 13 }}>
                    Enable
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Notifications Tab */}
          {activeTab === "notifications" && (
            <div className="bg-white rounded-2xl p-6" style={{ boxShadow: "0 4px 20px rgba(0,0,0,0.05)" }}>
              <h3 className="mb-6" style={{ fontSize: 18, fontWeight: 700, color: "#0F172A" }}>Notification Preferences</h3>

              <div className="space-y-6">
                {/* Email Notifications */}
                <div>
                  <h4 className="mb-4 flex items-center gap-2" style={{ fontSize: 15, fontWeight: 700, color: "#0F172A" }}>
                    <Mail className="w-4 h-4" />
                    Email Notifications
                  </h4>
                  <div className="space-y-3">
                    {[
                      { key: "emailAppointments", label: "Appointment reminders", desc: "Get notified about upcoming appointments" },
                      { key: "emailMessages", label: "New messages", desc: "Receive emails when you get new messages" },
                      { key: "emailReports", label: "Weekly reports", desc: "Summary of your weekly activity" },
                    ].map((item) => (
                      <div key={item.key} className="flex items-center justify-between p-4 rounded-xl" style={{ backgroundColor: "#F8FAFC" }}>
                        <div>
                          <p className="text-sm" style={{ fontWeight: 600, color: "#0F172A" }}>{item.label}</p>
                          <p className="text-xs text-slate-500 mt-0.5">{item.desc}</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={notifications[item.key]}
                            onChange={(e) => setNotifications({ ...notifications, [item.key]: e.target.checked })}
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-slate-200 rounded-full peer peer-checked:bg-teal-600 peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all" />
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Push Notifications */}
                <div>
                  <h4 className="mb-4 flex items-center gap-2" style={{ fontSize: 15, fontWeight: 700, color: "#0F172A" }}>
                    <Bell className="w-4 h-4" />
                    Push Notifications
                  </h4>
                  <div className="space-y-3">
                    {[
                      { key: "pushAppointments", label: "Appointment alerts", desc: "Real-time appointment notifications" },
                      { key: "pushMessages", label: "Message alerts", desc: "Instant message notifications" },
                      { key: "pushAlerts", label: "System alerts", desc: "Important system notifications" },
                    ].map((item) => (
                      <div key={item.key} className="flex items-center justify-between p-4 rounded-xl" style={{ backgroundColor: "#F8FAFC" }}>
                        <div>
                          <p className="text-sm" style={{ fontWeight: 600, color: "#0F172A" }}>{item.label}</p>
                          <p className="text-xs text-slate-500 mt-0.5">{item.desc}</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={notifications[item.key]}
                            onChange={(e) => setNotifications({ ...notifications, [item.key]: e.target.checked })}
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-slate-200 rounded-full peer peer-checked:bg-teal-600 peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all" />
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* SMS Notifications */}
                <div>
                  <h4 className="mb-4 flex items-center gap-2" style={{ fontSize: 15, fontWeight: 700, color: "#0F172A" }}>
                    <Smartphone className="w-4 h-4" />
                    SMS Notifications
                  </h4>
                  <div className="space-y-3">
                    {[
                      { key: "smsAppointments", label: "Appointment reminders", desc: "SMS reminders for appointments" },
                      { key: "smsEmergency", label: "Emergency alerts", desc: "Critical emergency notifications" },
                    ].map((item) => (
                      <div key={item.key} className="flex items-center justify-between p-4 rounded-xl" style={{ backgroundColor: "#F8FAFC" }}>
                        <div>
                          <p className="text-sm" style={{ fontWeight: 600, color: "#0F172A" }}>{item.label}</p>
                          <p className="text-xs text-slate-500 mt-0.5">{item.desc}</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={notifications[item.key]}
                            onChange={(e) => setNotifications({ ...notifications, [item.key]: e.target.checked })}
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-slate-200 rounded-full peer peer-checked:bg-teal-600 peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all" />
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Activity Tab */}
          {activeTab === "activity" && (
            <div className="bg-white rounded-2xl p-6" style={{ boxShadow: "0 4px 20px rgba(0,0,0,0.05)" }}>
              <h3 className="mb-6" style={{ fontSize: 18, fontWeight: 700, color: "#0F172A" }}>Recent Activity</h3>

              <div className="space-y-3">
                {activityLogs.map((log) => (
                  <div key={log.id} className="p-4 rounded-xl border border-slate-100 hover:shadow-md transition-all">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{ backgroundColor: "#F0F9FF" }}>
                        <log.icon className="w-5 h-5" style={{ color: "#0E7490" }} />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-start justify-between">
                          <div>
                            <p style={{ fontSize: 14, fontWeight: 700, color: "#0F172A" }}>{log.action}</p>
                            <p className="text-sm text-slate-600 mt-1">{log.device}</p>
                          </div>
                          <span className="text-xs text-slate-500">{log.timestamp}</span>
                        </div>
                        <div className="flex items-center gap-1.5 mt-2 text-xs text-slate-500">
                          <Globe className="w-3.5 h-3.5" />
                          <span>{log.location}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          {showEditModal && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
              <div className="bg-white rounded-2xl w-full max-w-lg p-6">

                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-lg font-bold">
                    Update User
                  </h2>

                  <button
                    onClick={() => setShowEditModal(false)}
                  >
                    ✕
                  </button>
                </div>

                <div className="space-y-4">

                  <input
                    type="text"
                    value={editForm.first_name}
                    onChange={(e) =>
                      setEditForm({
                        ...editForm,
                        first_name: e.target.value,
                      })
                    }
                    placeholder="First Name"
                    className="w-full p-3 border rounded-xl"
                  />

                  <input
                    type="text"
                    value={editForm.last_name}
                    onChange={(e) =>
                      setEditForm({
                        ...editForm,
                        last_name: e.target.value,
                      })
                    }
                    placeholder="Last Name"
                    className="w-full p-3 border rounded-xl"
                  />

                  <input
                    type="email"
                    value={editForm.email}
                    onChange={(e) =>
                      setEditForm({
                        ...editForm,
                        email: e.target.value,
                      })
                    }
                    placeholder="Email"
                    className="w-full p-3 border rounded-xl"
                  />

                  <input
                    type="text"
                    value={editForm.phone}
                    onChange={(e) =>
                      setEditForm({
                        ...editForm,
                        phone: e.target.value,
                      })
                    }
                    placeholder="Phone"
                    className="w-full p-3 border rounded-xl"
                  />

                  <select
                    value={editForm.role}
                    onChange={(e) =>
                      setEditForm({
                        ...editForm,
                        role: e.target.value,
                      })
                    }
                    className="w-full p-3 border rounded-xl"
                  >
                    <option value="patient">Patient</option>
                    <option value="doctor">Doctor</option>
                    <option value="nurse">Nurse</option>
                    <option value="pharmacist">Pharmacist</option>
                    <option value="lab_technician">Lab Technician</option>
                  </select>

                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="w-full p-3 border rounded-xl"
                  />

                  {selectedUser?.profile_image && (
                    <img
                      src={`http://localhost:4000/uploads/${selectedUser.profile_image}`}
                      alt="profile"
                      className="w-20 h-20 rounded-full object-cover border"
                    />
                  )}

                </div>

                <button
                  onClick={handleUpdateUser}
                  className="w-full mt-5 bg-[#0E7490] text-white py-3 rounded-xl font-semibold"
                >
                  Update User
                </button>

              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
