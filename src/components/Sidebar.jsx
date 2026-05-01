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
} from "lucide-react";
// import { Link } from "react-router-dom";
import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";


function Sidebar() {
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
    { icon: Settings, label: "Settings", path: "/admin/settings" },

  ];
  const patientMenuItems = [
    { icon: LayoutDashboard, label: "Dashboard", path: "/admin" },
    { icon: Calendar, label: "Appointments", path: "/admin/booking" },
    { icon: Activity, label: "Medical Records", path: "/patient?tab=records" },
    { icon: MessageSquare, label: "Messages", path: "/patient?tab=messages" },
    { icon: User, label: "Profile", path: "/patient?tab=profile" },
  ];
  const doctorMenuItems = [
    { icon: LayoutDashboard, label: "Dashboard", path: "/admin" },
    { icon: Users, label: "Assigned Patients", path: "/doctor?tab=patients" },
    { icon: Calendar, label: "Appointments", path: "/doctor?tab=appointments" },
    { icon: FileText, label: "Medical Records", path: "/admin/medical " },
    { icon: MessageSquare, label: "Messages", path: "/doctor?tab=messages" },
    { icon: User, label: "Profile", path: "/doctor?tab=profile" },
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
      <aside style={{ fontFamily: "'Inter', sans-serif" }}
        className="fixed left-0 top-0 h-screen w-64 bg-white border-r border-slate-100 flex flex-col z-50">
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
              <p className="text-xs text-slate-400 leading-none mt-0.5">
                {user?.role === "admin"
                  ? "Admin Portal"
                  : user?.role === "doctor"
                    ? "Clinical Portal"
                    : "Patient Portal"}
              </p>
            </div>
          </div>
        </div>
        {/* navigation */}
        <nav className="flex-1 px-3 py-4 overflow-y-auto">

          <p className="text-xs text-slate-400 px-3 mb-3 uppercase tracking-widest">
            Main Menu
          </p>
          <ul>
            {menuItem.map((items) => {
              const Icon = items.icon;

              return (
                <li key={items.label} className="flex text-slate-600 flex-row space-x-3 text-xs p-2">
                  <NavLink to={items.path} className={({ isActive }) => isActive ? "bg-primary w-full space-x-2 flex items-center p-2 rounded-[16px] text-white" : "flex space-x-2"}>
                    <Icon className="w-4.5 flex  h-4.5 shrink-0 transition-colors" />
                    <span className={({ isActive }) => isActive ? "text-white" : "text-[#475569] text-xs font-medium"}> {items.label}</span>
                  </NavLink>


                </li>
              );
            })}
          </ul>
        </nav>
        {/* User Profile at bottom */}
        <div className="px-4 py-4 border-t border-slate-100">
          <div className="flex items-center gap-3 px-2">
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs shrink-0 overflow-hidden"
              style={{ backgroundColor: "#14B8A6", fontWeight: 700 }}
            >
              {user?.profile_image ? (
                <img
                  src={`http://localhost:4000/uploads/${user.profile_image}`}
                  alt="profile"
                  className="w-full h-full object-cover"
                />
              ) : (
                `${user?.first_name?.[0] || ""}${user?.last_name?.[0] || ""}`
              )}
            </div>
            <div className="min-w-0">
              <p className="text-sm text-slate-700 truncate capitalize" style={{ fontWeight: 600 }}>
                {user?.role === "admin"
                  ? "Administrator"
                  : user?.role === "doctor"
                    ? `Dr. ${user?.first_name} ${user?.first_name}`
                    : `${user?.first_name} ${user?.last_name}`}
              </p>
              <p className="text-xs text-slate-400 truncate capitalize">{user?.role}</p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}

export default Sidebar;
