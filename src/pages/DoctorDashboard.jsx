// DoctorDashboard.jsx

import React,{useState} from "react";
import {
  Users,
  CalendarDays,
  ClipboardList,
  Star,
  Stethoscope,
  Eye,
  Edit3
} from "lucide-react";
import { useAuth } from "../context/AuthContext";

export default function DoctorDashboard() {
  const { user } = useAuth();
   const [selectedPatient, setSelectedPatient] = useState(null);
  const [activeTab, setActiveTab] = useState();
  const [showModal, setShowModal] = useState(false);
  // ADD this helper above return()

const statusClass = (status) => {
  if (status === "stable")
    return "px-3 py-1 rounded-full text-xs bg-green-100 text-green-600";

  if (status === "monitoring")
    return "px-3 py-1 rounded-full text-xs bg-yellow-100 text-yellow-700";

  if (status === "critical")
    return "px-3 py-1 rounded-full text-xs bg-red-100 text-red-600";

  return "px-3 py-1 rounded-full text-xs bg-cyan-100 text-cyan-700";
};

  const patients = [
  { id: 1, name: "Maria Santos", age: 52, condition: "Hypertension", status: "stable" },
  { id: 2, name: "Carlos Reyes", age: 34, condition: "Type 2 Diabetes", status: "monitoring" },
  { id: 3, name: "Elena Kim", age: 67, condition: "Coronary Artery Disease", status: "critical" },
  { id: 4, name: "James Liu", age: 45, condition: "Asthma", status: "stable" },
  { id: 5, name: "Anna Petrov", age: 29, condition: "Anxiety & Depression", status: "improving" },
  { id: 6, name: "Roberto Cruz", age: 71, condition: "COPD", status: "monitoring" },
  { id: 7, name: "Fatima Al-Hassan", age: 38, condition: "Lupus", status: "stable" },
];

  
// FIXED DoctorDashboard.jsx
// Replace your return (...) with this improved responsive layout

return (
  <main className="flex-1 lg:ml-64 pt-20 px-4 sm:px-6 lg:px-8 pb-8 bg-slate-100 min-h-screen">

    {/* CENTER WRAPPER */}
    <div className="max-w-7xl mx-auto space-y-6">

      {/* HERO */}
      <div className="rounded-3xl bg-gradient-to-r from-cyan-700 to-teal-500 text-white p-5 sm:p-7 shadow-md">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5">

          <div>
            <p className="text-base sm:text-xl text-white/90">
              Good morning,
            </p>

            <h1 className="text-2xl sm:text-4xl font-bold mt-1">
              Dr. {user?.firstName} {user?.lastName}
            </h1>

            <p className="mt-2 text-sm sm:text-lg text-white/90">
              Internal Medicine · License #IMD-20891
            </p>
          </div>

          <div className="hidden md:flex w-20 h-20 rounded-full bg-white/10 items-center justify-center">
            <Stethoscope size={42} className="text-white/40" />
          </div>
        </div>
      </div>

      {/* SMALLER RESPONSIVE CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">

        <StatsCard
          icon={<Users size={22} />}
          iconBg="bg-cyan-100"
          iconColor="text-cyan-700"
          value="38"
          title="Assigned Patients"
          subtitle="Active cases"
        />

        <StatsCard
          icon={<CalendarDays size={22} />}
          iconBg="bg-cyan-100"
          iconColor="text-teal-600"
          value="12"
          title="Today's Appointments"
          subtitle="3 remaining"
        />

        <StatsCard
          icon={<ClipboardList size={22} />}
          iconBg="bg-yellow-100"
          iconColor="text-yellow-600"
          value="7"
          title="Pending Updates"
          subtitle="Requires action"
        />

        <StatsCard
          icon={<Star size={22} />}
          iconBg="bg-green-100"
          iconColor="text-green-600"
          value="96%"
          title="Performance Score"
          subtitle="Excellent"
        />
      </div>

      {/* TABLE SECTION */}
      <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">

        <div className="px-5 py-4 border-b border-slate-100">
          <h3 className="text-slate-800 font-bold text-lg">
            Assigned Patients
          </h3>
          <p className="text-slate-400 text-sm mt-1">
            Click a patient to view or update records
          </p>
        </div>

        {/* RESPONSIVE TABLE */}
        <div className="overflow-x-auto">
          <table className="w-full min-w-[850px]">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50">
                {["Patient Name", "Age", "Condition", "Status", "Actions"].map(
                  (h) => (
                    <th
                      key={h}
                      className="text-left px-5 py-4 text-xs font-semibold text-slate-400 uppercase"
                    >
                      {h}
                    </th>
                  )
                )}
              </tr>
            </thead>

            <tbody>
              {patients.map((p) => (
                <tr
                  key={p.id}
                  className="border-b border-slate-100 hover:bg-slate-50 transition"
                >
                  {/* NAME */}
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-cyan-700 text-white text-xs font-bold flex items-center justify-center">
                        {p.name.charAt(0)}
                      </div>

                      <span className="text-sm font-medium text-slate-700">
                        {p.name}
                      </span>
                    </div>
                  </td>

                  {/* AGE */}
                  <td className="px-5 py-4 text-sm text-slate-500">
                    {p.age} yrs
                  </td>

                  {/* CONDITION */}
                  <td className="px-5 py-4 text-sm text-slate-600">
                    {p.condition}
                  </td>

                  {/* STATUS */}
                  <td className="px-5 py-4">
                    <span className={statusClass(p.status)}>
                      {p.status}
                    </span>
                  </td>

                  {/* ACTIONS */}
                  <td className="px-5 py-4">
                    <div className="flex gap-2">

                      <button
                        onClick={() => {
                          setSelectedPatient(p.id);
                          setActiveTab(0);
                          setShowModal(true);
                        }}
                        className="px-3 py-2 rounded-xl border border-slate-200 text-slate-600 text-xs flex items-center gap-1 hover:bg-slate-50"
                      >
                        <Eye size={14} /> View
                      </button>

                      <button
                        onClick={() => {
                          setSelectedPatient(p.id);
                          setActiveTab("Medical Notes");
                          setShowModal(true);
                        }}
                        className="px-3 py-2 rounded-xl bg-cyan-700 text-white text-xs flex items-center gap-1 hover:bg-cyan-800"
                      >
                        <Edit3 size={14} /> Update
                      </button>

                    </div>
                  </td>
                </tr>
              ))}
            </tbody>

          </table>
        </div>
      </div>
    </div>
  </main>
);
     
}

/* Reusable Card */

function StatsCard({
  icon,
  iconBg,
  iconColor,
  value,
  title,
  subtitle,
}) {
  return (
    <div className="bg-white rounded-3xl p-6 md:p-4 sm:p-8 shadow-sm border border-slate-100  flex flex-col justify-between md:space-y-2">

      <div
        className={`w-16 h-16 rounded-2xl flex items-center justify-center ${iconBg} ${iconColor}`}
      >
        {icon}
      </div>

      <div className="mt-8">
        <h2 className="text-sm  sm:text-5xl font-bold md:text-2xl text-slate-800">
          {value}
        </h2>

        <p className="mt-3 text-medium font-semibold text-slate-700 ">
          {title}
        </p>

        <p className="mt-1 text-base text-slate-400">
          {subtitle}
        </p>
      </div>
    </div>
  );
}