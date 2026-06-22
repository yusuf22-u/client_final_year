import React, { useState, useEffect } from "react";
import {
  LayoutDashboard,
  Users,
  Calendar,
  UserCog,
  BedDouble,
  Pill,
  BarChart3,
  MessageSquare,
  Settings,
  Activity,
  FileText,
  User,
  HeartPulse,
  User2
} from "lucide-react";
// import { Link } from "react-router-dom";
import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";


function Sidebar({ sidebarOpen, setSidebarOpen }) {
  const { user } = useAuth();
  const [menuItem, setMenuItem] = useState([])
  const adminMenuItems = [
    { icon: LayoutDashboard, label: "Dashboard", path: "/admin" },
    { icon: Users, label: "Patients", path: "/admin/patients" },
    { icon: Calendar, label: "Appointments", path: "/admin/appointment" },
    { icon: UserCog, label: "Staff", path: "/admin/staff" },
    { icon: BedDouble, label: "Beds", path: "/admin/beds" },
    { icon: Pill, label: "Pharmacy", path: "/admin/pharmacy" },
    { icon: BarChart3, label: "Reports", path: "/admin/report" },
    { icon: MessageSquare, label: "Messages", path: "/admin/message" },
    { icon: User2, label: "Settings", path: "/admin/users-management" },

  ];
  const patientMenuItems = [
    { icon: LayoutDashboard, label: "Dashboard", path: "/admin" },
    { icon: Calendar, label: "Appointments", path: "/admin/booking" },
    { icon: Activity, label: "Medical Records", path: "/admin/my-medical-record" },
    { icon: MessageSquare, label: "Messages", path: "/admin/message" },
    { icon: User, label: "Profile", path: "/admin/my-profile" },
  ];
  const doctorMenuItems = [
    { icon: LayoutDashboard, label: "Dashboard", path: "/admin" },
    // { icon: Users, label: "Assigned Patients", path: "/admin/assign-patient" },
    { icon: Calendar, label: "Appointments", path: "/admin/assign-patient" },
    // { icon: FileText, label: "Medical Records", path: "/admin/medical/:patient_id" },
    { icon: MessageSquare, label: "Messages", path: "/admin/message" },
    { icon: User, label: "Profile", path: "/admin/user-account" },
  ];
  useEffect(() => {
    if (user?.role === "admin") {
      setMenuItem(adminMenuItems)
    }
    if (user?.role === "patient") {
      setMenuItem(patientMenuItems)
    }
    if (user?.role === "doctor") {
      setMenuItem(doctorMenuItems)
    }
  }, [user.role])

  // const role="admin"
 return (
  <>
    {/* Mobile Backdrop */}
    {sidebarOpen && (
      <div
        className="fixed inset-0 bg-black/50 z-40 lg:hidden"
        onClick={() => setSidebarOpen(false)}
      />
    )}

    <aside
      style={{ fontFamily: "'Inter', sans-serif" }}
      className={`
        fixed left-0 top-0 h-screen w-64 bg-white border-r border-slate-100
        flex flex-col z-50 transform transition-transform duration-300

        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}

        lg:translate-x-0
      `}
    >
      {/* Mobile Close Button */}
      <div className="lg:hidden flex justify-end p-4">
        <button
          onClick={() => setSidebarOpen(false)}
          className="text-xl text-slate-600"
        >
          ✕
        </button>
      </div>

      {/* Logo */}
      <div className="px-6 py-6 border-b border-slate-100">
        <div className="flex items-center gap-3">
          <div
            className="w-9 h-9 rounded-xl flex items-center justify-center"
            style={{ backgroundColor: "#0E7490" }}
          >
            <HeartPulse className="w-5 h-5 text-white" />
          </div>

          <div>
            <p className="text-xs text-slate-400">
              {user?.role === "admin"
                ? "Admin Portal"
                : user?.role === "doctor"
                ? "Clinical Portal"
                : "Patient Portal"}
            </p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 overflow-y-auto">
        <p className="text-xs text-slate-400 px-3 mb-3 uppercase tracking-widest">
          Main Menu
        </p>

        <ul>
          {menuItem.map((items) => {
            const Icon = items.icon;

            return (
              <li
                key={items.label}
                className="text-slate-600 text-xs p-2"
              >
                <NavLink
                  to={items.path}
                  onClick={() => setSidebarOpen(false)}
                  className={({ isActive }) =>
                    isActive
                      ? "bg-primary text-white flex items-center gap-2 p-3 rounded-2xl"
                      : "flex items-center gap-2 p-3 rounded-2xl hover:bg-slate-100"
                  }
                >
                  <Icon className="w-5 h-5" />
                  <span>{items.label}</span>
                </NavLink>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* User Profile */}
      <div className="px-4 py-4 border-t border-slate-100">
        <div className="flex items-center gap-3 px-2">
          <div
            className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs overflow-hidden"
            style={{
              backgroundColor: "#14B8A6",
              fontWeight: 700,
            }}
          >
            {user?.profile_image ? (
              <img
                src={`${import.meta.env.VITE_API_URL}/uploads/${user.profile_image}`}
                alt="profile"
                className="w-full h-full object-cover"
              />
            ) : (
              `${user?.first_name?.[0] || ""}${user?.last_name?.[0] || ""}`
            )}
          </div>

          <div>
            <p className="text-sm font-semibold capitalize">
              {user?.role === "admin"
                ? "Administrator"
                : user?.role === "doctor"
                ? `Dr. ${user?.first_name} ${user?.last_name}`
                : `${user?.first_name} ${user?.last_name}`}
            </p>

            <p className="text-xs text-slate-400 capitalize">
              {user?.role}
            </p>
          </div>
        </div>
      </div>
    </aside>
  </>
);
}

export default Sidebar;
