import React from "react";
import {
  Users,
  Calendar,
  BedDouble,
  Pill,
  TrendingUp,
  TrendingDown,
  ArrowUpRight,
  CheckCircle,
  Clock,
  AlertCircle,
  XCircle,
} from "lucide-react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

function Dashboard() {
  const statCards = [
    {
      label: "Total Patients",
      value: "4,827",
      change: "+12%",
      up: true,
      icon: Users,
      color: "#0E7490",
      bg: "#E0F7FA",
      sub: "vs last month",
    },
    {
      label: "Today's Appointments",
      value: "84",
      change: "+5%",
      up: true,
      icon: Calendar,
      color: "#14B8A6",
      bg: "#E6FFFA",
      sub: "18 remaining",
    },
    {
      label: "Available Beds",
      value: "37",
      change: "-8%",
      up: false,
      icon: BedDouble,
      color: "#22C55E",
      bg: "#DCFCE7",
      sub: "out of 120 total",
    },
    {
      label: "Low Stock Medicines",
      value: "12",
      change: "+3",
      up: false,
      icon: Pill,
      color: "#F59E0B",
      bg: "#FEF3C7",
      sub: "requires restock",
    },
  ];

const recentActivity = [
  { name: "Maria Santos", action: "Patient Admitted", date: "Mar 2, 2026 · 09:14 AM", status: "admitted" },
  { name: "Dr. James Rivera", action: "Prescription Updated", date: "Mar 2, 2026 · 08:52 AM", status: "completed" },
  { name: "Lena Huang", action: "Appointment Scheduled", date: "Mar 2, 2026 · 08:30 AM", status: "scheduled" },
  { name: "Carlos Mendez", action: "Lab Results Pending", date: "Mar 2, 2026 · 07:45 AM", status: "pending" },
  { name: "Dr. Aisha Patel", action: "Surgery Completed", date: "Mar 1, 2026 · 06:30 PM", status: "completed" },
  { name: "Robert Kim", action: "Discharge Processed", date: "Mar 1, 2026 · 05:10 PM", status: "discharged" },
  { name: "Elena Vasquez", action: "Emergency Admission", date: "Mar 1, 2026 · 03:22 PM", status: "critical" },
];
const statusConfig= {
  admitted: { label: "Admitted", color: "#0E7490", bg: "#E0F7FA", icon: CheckCircle },
  completed: { label: "Completed", color: "#22C55E", bg: "#DCFCE7", icon: CheckCircle },
  scheduled: { label: "Scheduled", color: "#14B8A6", bg: "#E6FFFA", icon: Clock },
  pending: { label: "Pending", color: "#F59E0B", bg: "#FEF3C7", icon: Clock },
  discharged: { label: "Discharged", color: "#64748B", bg: "#F1F5F9", icon: ArrowUpRight },
  critical: { label: "Critical", color: "#EF4444", bg: "#FEE2E2", icon: AlertCircle },
};
  return (
    <div
      className="mt-9 p-4 "
      style={{ fontFamily: "'Inter', sans-serif", backgroundColor: "#F8FAFC" }}
    >
      {/* sideBar */}
      <Sidebar />
      {/* Navbar */}
      <div className="ml-10">
        <Navbar />
        <main className="m-4 p-12 h-screen  justify-center ">
          <div className="flex space-x-1  ml-40 gap-3 ">
            {statCards.map((card) => {
              const Icon = card.icon;
              return (
                <div
                  key={card.label}
                  style={{ boxShadow: "0px 4px 20px rgba(0,0,0,0.05)" }}
                  className="gap-4 p-3 flex flex-col space-y-2 items-center bg-white shadow-(--shadow-card) h-50 min-w-50 rounded-[16px] "
                >
                  <div className="flex justify-between space-x-9">
                    <div
                      className="w-11 h-11  space-x-4 flex-row rounded-xl flex items-center justify-center"
                      style={{ backgroundColor: card.bg }}
                    >
                      <Icon className="w-5 h-5" style={{ color: card.color }} />
                    </div>
                    <span
                      className="flex items-center gap-1 text-xs px-2 py-1 rounded-lg"
                      style={{
                        color: card.up ? "#22C55E" : "#EF4444",
                        backgroundColor: card.up ? "#DCFCE7" : "#FEE2E2",
                        fontWeight: 600,
                      }}
                    >
                      {card.up ? (
                        <TrendingUp className="w-3 h-3" />
                      ) : (
                        <TrendingDown className="w-3 h-3" />
                      )}
                      {card.change}
                    </span>
                  </div>
                  <div>
                    <p
                      className="text-slate-800 mb-0.5"
                      style={{ fontSize: 28, fontWeight: 800, lineHeight: 1 }}
                    >
                      {card.value}
                    </p>
                    <p
                      className="text-slate-500 text-sm"
                      style={{ fontWeight: 600 }}
                    >
                      {card.label}
                    </p>
                    <p className="text-slate-400 text-xs mt-0.5">{card.sub}</p>
                  </div>
                </div>
              );
            })}

            {/* cards */}
          </div>
          {/* recent activities */}
          <div
            className="bg-white w-[87%] ml-40 p-4  rounded-2xl m-6"
            style={{ boxShadow: "0px 4px 20px rgba(0,0,0,0.05)" }}
          >
            <div className="main-center">
              <div className="flex justify-between items-center">
              <div>
                <h3 className="font-medium text-slate-800">Recent Activity</h3>
                <span className="text-sm text-slate-400">Latest patient and staff actions</span>
              </div>
              <div className="">
                <button className="border text-sm text-slate-500 border-slate-300 p-2 rounded-2xl">view all</button>
              </div>
              </div>
            </div>
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-100">
                  {
                    ["Name", "Action", "Date & Time", "Status"].map((h)=>(
                       <th
                      key={h}
                      className="text-left px-6 py-4 text-xs text-slate-400 uppercase tracking-wider"
                      style={{ fontWeight: 600 }}
                    >
                      {h}
                    </th>
                    ))
                  }
                </tr>
              </thead>
              <tbody>
                {
                  recentActivity.map((row,i)=>{
                    const cfg = statusConfig[row.status];
                    return(
                      <tr key={i}  className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors">
                        <td className="py-2">
                          <div className="flex space-x-1 items-center">
                            <div className="h-8 w-8 bg-primary flex items-center justify-center text-white rounded-full p-2">
                              {row.name.charAt(0)}
                            </div>
                            <span className="text-sm text-slate-700" style={{ fontWeight: 500 }}>{row.name}</span>
                          </div>
                        </td>
                         <td className="px-6 py-4 text-sm text-slate-600">{row.action}</td>
                      <td className="px-6 py-4 text-sm text-slate-400">{row.date}</td>
                       <td className="px-6 py-4">
                          <span
                          className="inline-flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-lg"
                          style={{
                            backgroundColor: cfg.bg,
                            color: cfg.color,
                            fontWeight: 600,
                          }}
                        >
                          <cfg.icon className="w-3 h-3" />
                          {cfg.label}
                        </span>
                      </td>
                      </tr>
                    )
                  })
                }
              </tbody>
            </table>
          </div>
        </main>
      </div>
    </div>
  );
}

export default Dashboard;
