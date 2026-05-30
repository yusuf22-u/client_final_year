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
import { formatDate } from "../../helpers/formatDate"
import { useNavigate } from "react-router-dom"
import API from "../../api/axios";
export function Profile() {
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
  const [editForm, setEditForm] = useState({ ...profile });

  // Password form
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

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

  const handleSaveProfile = () => {
    setProfile({ ...editForm });
    setIsEditing(false);
    console.log("Profile updated:", editForm);
  };

  const handleCancelEdit = () => {
    setEditForm({ ...profile });
    setIsEditing(false);
  };

  const handleChangePassword = () => {
    if (newPassword !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    console.log("Changing password");
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
  };

  return (
    <div className="min-h-screen flex" style={{ fontFamily: "'Inter', sans-serif", backgroundColor: "#F8FAFC" }}>

      <div className="ml-64 flex-1 flex flex-col min-h-screen">

        <main className="flex-1 p-8 mt-6">
          {/* Profile Header */}
          <div className="bg-white rounded-2xl p-6 mb-6" style={{ boxShadow: "0 4px 20px rgba(0,0,0,0.05)" }}>
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-5">
                <div className="relative">
                  <div
                    className="w-24 h-24 rounded-2xl flex items-center justify-center bg-[#E0F7FA]"
                  // style={{ backgroundColor: roleConfig[profile.user_role].bg, color: roleConfig[profile.user_role].color, fontSize: 28, fontWeight: 800 }}
                  >
                    {profile?.profile_image ? (
                      <img
                        src={`http://localhost:4000/uploads/${profile.profile_image}`}
                        alt="profile"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      `${profile?.first_name?.[0] || ""}${profile?.last_name?.[0] || ""}`
                    )}
                  </div>
                  <button className="absolute bottom-0 right-0 w-8 h-8 rounded-lg flex items-center justify-center transition-all hover:shadow-md" style={{ backgroundColor: "#0E7490" }}>
                    <Camera className="w-4 h-4 text-white" />
                  </button>
                </div>
                <div>
                  <h2 className="capitalize" style={{ fontSize: 24, fontWeight: 800, color: "#0F172A" }}>{` ${profile.first_name} ${profile.last_name}`}</h2>
                  <div className="flex items-center gap-3 mt-2">
                    <div className="px-3 py-1.5 rounded-lg text-xs capitalize bg-primary text-white" >
                      {/* {roleConfig[profile.role].label} */}
                      {profile.user_role}
                    </div>
                    {profile.specialty && (
                      <span className="text-sm capitalize text-slate-600">{profile.specialty}</span>
                    )}
                  </div>
                  <div className="flex items-center gap-4 mt-3 text-sm text-slate-500">
                    <div className="flex items-center gap-1.5">
                      <Calendar className="w-4 h-4" />
                      <span>Joined {formatDate(profile.created_at)}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-4 h-4" />
                      <span>Last login: {profile.last_login}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button className="px-4 py-2 rounded-xl border-2 border-slate-200 flex items-center gap-2 text-slate-700 transition-all hover:bg-slate-50" style={{ fontWeight: 600, fontSize: 13 }}>
                  <ArrowBigLeft onClick={()=>navigate(-1)} className="w-4 h-4" />
                  back
                </button>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="bg-white rounded-2xl mb-6" style={{ boxShadow: "0 4px 20px rgba(0,0,0,0.05)" }}>
            <div className="flex items-center gap-2 p-2 border-b border-slate-100">
              {tabs.map((tab) => {
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl transition-all"
                    style={{
                      backgroundColor: isActive ? "#0E7490" : "transparent",
                      color: isActive ? "#fff" : "#64748B",
                      fontWeight: isActive ? 700 : 600,
                      fontSize: 14,
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
          {activeTab === "profile" && (
            <div className="bg-white rounded-2xl p-6" style={{ boxShadow: "0 4px 20px rgba(0,0,0,0.05)" }}>
              <div className="flex items-center justify-between mb-6">
                <h3 style={{ fontSize: 18, fontWeight: 700, color: "#0F172A" }}>Personal Information</h3>
                {!isEditing ? (
                  <button
                    // onClick={() => setIsEditing(true)}
                    className="px-4 py-2 rounded-xl flex items-center gap-2 transition-all"
                    style={{ backgroundColor: "#0E7490", color: "#fff", fontWeight: 600, fontSize: 13 }}
                  >
                    <Edit3 className="w-4 h-4" />
                    {/* Edit Profile */}
                  </button>
                ) : (
                  <div className="flex items-center gap-2">
                    <button
                      onClick={handleCancelEdit}
                      className="px-4 py-2 rounded-xl border-2 border-slate-200 text-slate-700 transition-all hover:bg-slate-50"
                      style={{ fontWeight: 600, fontSize: 13 }}
                    >
                      <X className="w-4 h-4 inline mr-1" />
                      Cancel
                    </button>
                    <button
                      onClick={handleSaveProfile}
                      className="px-4 py-2 rounded-xl flex items-center gap-2 transition-all"
                      style={{ backgroundColor: "#22C55E", color: "#fff", fontWeight: 600, fontSize: 13 }}
                    >
                      <Save className="w-4 h-4" />
                      Save Changes
                    </button>
                  </div>
                )}
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm text-slate-700 mb-2" style={{ fontWeight: 600 }}>Full Name</label>
                  <div className="relative">
                    <User className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      value={isEditing ? editForm.first_name : `${profile.first_name} ${profile.last_name}`}
                      onChange={(e) => setEditForm({ ...editForm, fullName: e.target.value })}
                      disabled={!isEditing}
                      className="w-full pl-10 pr-4 py-3 text-sm border border-slate-200 rounded-xl bg-slate-50 text-slate-700 focus:outline-none focus:border-teal-400 focus:bg-white transition-all disabled:opacity-60"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm text-slate-700 mb-2" style={{ fontWeight: 600 }}>Email Address</label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      value={isEditing ? editForm.email : profile.email}
                      onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                      disabled={!isEditing}
                      className="w-full pl-10 pr-4 py-3 text-sm border border-slate-200 rounded-xl bg-slate-50 text-slate-700 focus:outline-none focus:border-teal-400 focus:bg-white transition-all disabled:opacity-60"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm text-slate-700 mb-2" style={{ fontWeight: 600 }}>Phone Number</label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      value={isEditing ? editForm.phone : profile.phone}
                      onChange={(e) => setEditForm({ ...editForm, phone: e.target.value })}
                      disabled={!isEditing}
                      className="w-full pl-10 pr-4 py-3 text-sm border border-slate-200 rounded-xl bg-slate-50 text-slate-700 focus:outline-none focus:border-teal-400 focus:bg-white transition-all disabled:opacity-60"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm text-slate-700 mb-2" style={{ fontWeight: 600 }}>Date of Birth</label>
                  <div className="relative">
                    <Calendar className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="date"
                      value={isEditing ? editForm.dob : profile.date_of_birth}
                      onChange={(e) => setEditForm({ ...editForm, dob: e.target.value })}
                      disabled={!isEditing}
                      className="w-full pl-10 pr-4 py-3 text-sm border border-slate-200 rounded-xl bg-slate-50 text-slate-700 focus:outline-none focus:border-teal-400 focus:bg-white transition-all disabled:opacity-60"
                    />
                  </div>
                </div>

                <div className="col-span-2">
                  <label className="block text-sm text-slate-700 mb-2" style={{ fontWeight: 600 }}>Address</label>
                  <div className="relative">
                    <MapPin className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                    <textarea
                      value={isEditing ? editForm.address : profile.staff_address}
                      onChange={(e) => setEditForm({ ...editForm, address: e.target.value })}
                      disabled={!isEditing}
                      className="w-full pl-10 pr-4 py-3 text-sm border border-slate-200 rounded-xl bg-slate-50 text-slate-700 focus:outline-none focus:border-teal-400 focus:bg-white transition-all resize-none disabled:opacity-60"
                      rows={2}
                    />
                  </div>
                </div>
              </div>

              {/* Professional Details for Doctors/Admin */}
              {(profile.role === "doctor" || profile.role === "admin") && (
                <>
                  <div className="my-6 border-t border-slate-100" />
                  <h3 className="mb-4" style={{ fontSize: 16, fontWeight: 700, color: "#0F172A" }}>Professional Details</h3>
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm text-slate-700 mb-2" style={{ fontWeight: 600 }}>
                        {profile.role === "doctor" ? "Specialty" : "Department"}
                      </label>
                      <div className="relative">
                        <Briefcase className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                        <input
                          value={isEditing ? editForm.specialty : profile.specialty}
                          onChange={(e) => setEditForm({ ...editForm, specialty: e.target.value })}
                          disabled={!isEditing}
                          className="w-full pl-10 pr-4 py-3 text-sm border border-slate-200 rounded-xl bg-slate-50 text-slate-700 focus:outline-none focus:border-teal-400 focus:bg-white transition-all disabled:opacity-60"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm text-slate-700 mb-2" style={{ fontWeight: 600 }}>License Number</label>
                      <div className="relative">
                        <Shield className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                        <input
                          value={isEditing ? editForm.licenseNumber : profile.licenseNumber}
                          onChange={(e) => setEditForm({ ...editForm, licenseNumber: e.target.value })}
                          disabled={!isEditing}
                          className="w-full pl-10 pr-4 py-3 text-sm border border-slate-200 rounded-xl bg-slate-50 text-slate-700 focus:outline-none focus:border-teal-400 focus:bg-white transition-all disabled:opacity-60"
                        />
                      </div>
                    </div>

                    {profile.role === "doctor" && (
                      <div>
                        <label className="block text-sm text-slate-700 mb-2" style={{ fontWeight: 600 }}>Department</label>
                        <div className="relative">
                          <Briefcase className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                          <input
                            value={isEditing ? editForm.department : profile.department}
                            onChange={(e) => setEditForm({ ...editForm, department: e.target.value })}
                            disabled={!isEditing}
                            className="w-full pl-10 pr-4 py-3 text-sm border border-slate-200 rounded-xl bg-slate-50 text-slate-700 focus:outline-none focus:border-teal-400 focus:bg-white transition-all disabled:opacity-60"
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </>
              )}
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
        </main>
      </div>
    </div>
  );
}
