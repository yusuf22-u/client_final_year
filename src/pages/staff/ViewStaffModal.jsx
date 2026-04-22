// ViewStaffModal.jsx

import React, { useState } from "react";
import {
  X,
  Phone,
  Mail,
  MapPin,
  ShieldCheck,
  Stethoscope,
  HeartPulse,
  CalendarDays,
  Award,
  Star,
  Clock3,
  Activity,
  BadgeCheck,
} from "lucide-react";

function ViewStaffModal({ staff, onClose }) {
  const [activeTab, setActiveTab] = useState("overview");

  if (!staff) return null;

  const tabs = [
    { id: "overview", label: "Overview" },
    { id: "schedule", label: "Schedule" },
    { id: "activity", label: "Activity" },
    { id: "certifications", label: "Certifications" },
  ];

  const initials = staff.full_name
    ?.split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("");

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex justify-center items-center p-3 sm:p-5">
      <div className="bg-white w-full max-w-5xl rounded-2xl shadow-2xl overflow-hidden max-h-[95vh] flex flex-col">

        {/* Header */}
        <div className="p-4 sm:p-6 border-b relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-10 h-10 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center"
          >
            <X size={20} />
          </button>

          <div className="flex flex-col sm:flex-row gap-4 sm:gap-5">
            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-gradient-to-br from-cyan-600 to-teal-500 text-white text-2xl sm:text-4xl font-bold flex items-center justify-center">
              {initials}
            </div>

            <div className="flex-1">
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-800">
                {staff.full_name}
              </h2>

              <div className="flex flex-wrap gap-2 mt-3">
                <span className="px-3 py-1 rounded-xl bg-cyan-100 text-cyan-700 text-sm font-semibold">
                  {staff.role}
                </span>

                <span className="px-3 py-1 rounded-xl bg-green-100 text-green-700 text-sm font-semibold">
                  {staff.status}
                </span>
              </div>

              <div className="flex items-center gap-1 mt-3 flex-wrap">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star
                    key={i}
                    className="w-4 h-4 fill-amber-400 text-amber-400"
                  />
                ))}
                <span className="ml-2 text-slate-500 font-semibold">
                  {staff.rating}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="border-b-slate-800 overflow-x-auto">
          <div className="flex min-w-max">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-5 py-4 text-sm sm:text-base font-medium whitespace-nowrap border-b-2 transition ${
                  activeTab === tab.id
                    ? "border-cyan-600 text-cyan-700"
                    : "border-transparent text-slate-400 hover:text-slate-700"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Scroll Body */}
        <div className="overflow-y-auto p-4 sm:p-6 flex-1">

          {/* OVERVIEW */}
          {activeTab === "overview" && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">

              {/* Contact */}
              <div className="bg-slate-50 rounded-2xl p-5">
                <h3 className="font-bold text-slate-500 mb-5 uppercase text-sm">
                  Contact Details
                </h3>

                <div className="space-y-5">

                  <Info icon={<Phone />} label="Phone" value={staff.phone} />
                  <Info icon={<Mail />} label="Email" value={staff.email} />
                  <Info icon={<MapPin />} label="Address" value={staff.address} />

                </div>
              </div>

              {/* Professional */}
              <div className="bg-slate-50 rounded-2xl p-5">
                <h3 className="font-bold text-slate-500 mb-5 uppercase text-sm">
                  Professional Details
                </h3>

                <div className="space-y-5">

                  <Info
                    icon={<ShieldCheck />}
                    label="License No."
                    value={staff.license_no}
                  />

                  <Info
                    icon={<Stethoscope />}
                    label="Specialty"
                    value={staff.specialty}
                  />

                  <Info
                    icon={<HeartPulse />}
                    label="Department"
                    value={staff.department}
                  />

                  <Info
                    icon={<CalendarDays />}
                    label="Joined"
                    value={staff.joined_date}
                  />

                  <Info
                    icon={<Award />}
                    label="Experience"
                    value={staff.experience}
                  />
                </div>
              </div>
            </div>
          )}

          {/* SCHEDULE */}
          {activeTab === "schedule" && (
            <div className="bg-slate-50 rounded-2xl p-6">
              <h3 className="font-bold text-lg mb-4">Work Schedule</h3>

              <div className="space-y-4">
                <Info icon={<Clock3 />} label="Shift" value="Morning Shift" />
                <Info icon={<Clock3 />} label="Time" value="08:00 AM - 04:00 PM" />
                <Info icon={<Clock3 />} label="Off Day" value="Sunday" />
              </div>
            </div>
          )}

          {/* ACTIVITY */}
          {activeTab === "activity" && (
            <div className="bg-slate-50 rounded-2xl p-6">
              <h3 className="font-bold text-lg mb-4">Recent Activity</h3>

              <div className="space-y-4">
                <Info icon={<Activity />} label="Patients Today" value="12" />
                <Info icon={<Activity />} label="Tasks Completed" value="8" />
                <Info icon={<Activity />} label="Attendance" value="Present" />
              </div>
            </div>
          )}

          {/* CERTIFICATIONS */}
          {activeTab === "certifications" && (
            <div className="bg-slate-50 rounded-2xl p-6">
              <h3 className="font-bold text-lg mb-4">Certifications</h3>

              <div className="space-y-4">
                <Info icon={<BadgeCheck />} label="Medical License" value="Verified" />
                <Info icon={<BadgeCheck />} label="CPR Training" value="Completed" />
                <Info icon={<BadgeCheck />} label="Safety Training" value="Completed" />
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="border-t-slate-400  p-4 sm:p-5 flex flex-col sm:flex-row gap-3 justify-between items-center">
          <p className="text-sm text-slate-500 text-center sm:text-left">
            License: {staff.license_no}
          </p>

          <div className="flex gap-3 w-full sm:w-auto">
            <button
              onClick={onClose}
              className="flex-1 sm:flex-none px-5 py-2 rounded-xl border text-slate-600"
            >
              Close
            </button>

            <button className="flex-1 sm:flex-none px-5 py-2 rounded-xl bg-cyan-700 text-white font-semibold">
              Edit Profile
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function Info({ icon, label, value }) {
  return (
    <div className="flex gap-3">
      <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-cyan-700 shrink-0">
        {icon}
      </div>

      <div>
        <p className="text-sm text-slate-400">{label}</p>
        <p className="text-slate-700 font-medium wrap-break-word">{value}</p>
      </div>
    </div>
  );
}

export default ViewStaffModal;