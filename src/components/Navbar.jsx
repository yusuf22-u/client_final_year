import React, { useState } from "react";
import {
  Search,
  Bell,
  ChevronDown,
  LogOut,
  User,
  Settings,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";

function Navbar() {
  const { user } = useAuth();
  const [open, setOpen] = useState(false);

  const getInitials = () => {
    return `${user?.firstName?.[0] || ""}${user?.lastName?.[0] || ""}`;
  };

  const getRole = () => {
    if (user?.role === "admin") return "Administrator";
    if (user?.role === "doctor") return "Doctor";
    return "Patient";
  };
  return (
    <div className="bg-red fixed w-full top-0 right-0 left-0 p-0 mt-0">
      <header className="h-16  bg-white border-b border-slate-100 flex items-center justify-between px-8 sticky top-0 z-40"
      >
        <h1 className="text-slate-700">Admin Dashboard</h1>
        <h2 className="text-slate-800" style={{ fontSize: 18, fontWeight: 700 }}> {user.role==="patient"?"My Health Portal":user.role==="admin"?"Admin Dashboard":"Doctor Dashboard"}</h2>
        {/* RIGHT SIDE */}
        <div className="flex items-center space-x-4">

          {/* Search */}
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search patients, records..."
              className="pl-9 pr-4 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl text-slate-700 placeholder:text-slate-400 focus:outline-none focus:border-teal-400 focus:bg-white transition-all w-64"
            />
          </div>

          {/* Notification */}
          <button className="relative w-9 h-9 flex items-center justify-center rounded-xl bg-slate-50 border border-slate-200 hover:bg-slate-100 transition-colors">
            <Bell className="w-4 h-4 text-slate-500" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-red-500"></span>
          </button>

          {/* PROFILE */}
          <div className="flex items-center gap-2 relative">

            {/* Avatar */}
            <div
              onClick={() => setOpen(!open)}
              className="w-9 h-9 rounded-full overflow-hidden flex items-center justify-center bg-[#0e7490] text-white font-bold text-sm cursor-pointer"
            >
              {user?.profile_image ? (
                <img
                  src={`http://localhost:4000/uploads/${user.profile_image}`}
                  alt="profile"
                  className="w-full h-full object-cover"
                />
              ) : (
                getInitials()
              )}
            </div>

            {/* Name + Role */}
            <div className="hidden sm:block">
              <p className="text-sm font-semibold text-slate-700 capitalize">
                {user?.firstName}
              </p>
              <p className="text-xs text-slate-400">
                {getRole()}
              </p>
            </div>

            {/* Dropdown Icon */}
            <ChevronDown
              className="w-4 h-4 text-slate-500 cursor-pointer"
              onClick={() => setOpen(!open)}
            />

            {/* Dropdown */}
            {open && (
              <div className="absolute right-0 top-12 w-48 bg-white border border-slate-200 rounded-xl shadow-lg p-2 z-50">

                <button className="w-full flex items-center gap-2 px-3 py-2 text-sm hover:bg-slate-100 rounded-lg">
                  <User className="w-4 h-4" />
                  Profile
                </button>

                <button className="w-full flex items-center gap-2 px-3 py-2 text-sm hover:bg-slate-100 rounded-lg">
                  <Settings className="w-4 h-4" />
                  Settings
                </button>

                <button
                  onClick={() => {
                    localStorage.removeItem("token");
                    window.location.href = "/";
                  }}
                  className="w-full flex items-center gap-2 px-3 py-2 text-sm text-red-500 hover:bg-red-50 rounded-lg"
                >
                  <LogOut className="w-4 h-4" />
                  Logout
                </button>

              </div>
            )}

          </div>
        </div>
      </header>
    </div>
  );
}

export default Navbar;
