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
} from "lucide-react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

function Dashboard() {
  const diseaseData = [
  { disease: "Hypertension", cases: 120 },
  { disease: "Diabetes", cases: 95 },
  { disease: "Respiratory", cases: 78 },
  { disease: "Cardiovascular", cases: 65 },
  { disease: "Orthopedic", cases: 55 },
  { disease: "Neurological", cases: 42 },
];
const monthlyData = [
  { month: "Jan", patients: 240 },
  { month: "Feb", patients: 285 },
  { month: "Mar", patients: 310 },
  { month: "Apr", patients: 275 },
  { month: "May", patients: 390 },
  { month: "Jun", patients: 420 },
  { month: "Jul", patients: 380 },
  { month: "Aug", patients: 445 },
  { month: "Sep", patients: 410 },
  { month: "Oct", patients: 480 },
  { month: "Nov", patients: 520 },
  { month: "Dec", patients: 498 },
];
  const statCards = [
    { label: "Total Patients", value: "4,827", change: "+12%", up: true, icon: Users, color: "#0E7490", bg: "#E0F7FA", sub: "vs last month" },
    { label: "Today's Appointments", value: "84", change: "+5%", up: true, icon: Calendar, color: "#14B8A6", bg: "#E6FFFA", sub: "18 remaining" },
    { label: "Available Beds", value: "37", change: "-8%", up: false, icon: BedDouble, color: "#22C55E", bg: "#DCFCE7", sub: "out of 120 total" },
    { label: "Low Stock Medicines", value: "12", change: "+3", up: false, icon: Pill, color: "#F59E0B", bg: "#FEF3C7", sub: "requires restock" },
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

  const statusConfig = {
    admitted: { label: "Admitted", color: "#0E7490", bg: "#E0F7FA", icon: CheckCircle },
    completed: { label: "Completed", color: "#22C55E", bg: "#DCFCE7", icon: CheckCircle },
    scheduled: { label: "Scheduled", color: "#14B8A6", bg: "#E6FFFA", icon: Clock },
    pending: { label: "Pending", color: "#F59E0B", bg: "#FEF3C7", icon: Clock },
    discharged: { label: "Discharged", color: "#64748B", bg: "#F1F5F9", icon: ArrowUpRight },
    critical: { label: "Critical", color: "#EF4444", bg: "#FEE2E2", icon: AlertCircle },
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen font-inter">
      <main className="flex justify-center flex-col ml-64 mt-12 ">
      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((card) => {
          const Icon = card.icon;
          return (
            <div key={card.label} className="bg-white p-4 rounded-2xl shadow flex flex-col items-center">
              <div className="flex justify-between w-full">
                <div className="w-11 h-11 flex items-center justify-center rounded-xl" style={{ backgroundColor: card.bg }}>
                  <Icon className="w-5 h-5" style={{ color: card.color }} />
                </div>
                <span
                  className={`flex items-center gap-1 text-xs px-2 py-1 rounded-lg font-semibold ${
                    card.up ? "text-green-600 bg-green-100" : "text-red-600 bg-red-100"
                  }`}
                >
                  {card.up ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                  {card.change}
                </span>
              </div>
              <div className="mt-3 text-center">
                <p className="text-2xl font-bold text-gray-800">{card.value}</p>
                <p className="text-sm font-semibold text-gray-500">{card.label}</p>
                <p className="text-xs text-gray-400">{card.sub}</p>
              </div>
            </div>
          );
        })}
      </div>
 {/* Charts Row */}
          <div className="grid grid-cols-5 gap-6 pt-4 mt-4">
            {/* Line Chart */}
            <div
              className="col-span-3 bg-white rounded-2xl p-6"
              style={{ boxShadow: "0px 4px 20px rgba(0,0,0,0.05)" }}
            >
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-slate-800" style={{ fontSize: 16, fontWeight: 700 }}>
                    Monthly Patient Registrations
                  </h3>
                  <p className="text-slate-400 text-xs mt-0.5">Jan 2026 – Dec 2026</p>
                </div>
                <span
                  className="text-xs px-3 py-1.5 rounded-lg"
                  style={{ backgroundColor: "#E0F7FA", color: "#0E7490", fontWeight: 600 }}
                >
                  +18.4% YoY
                </span>
              </div>
              <ResponsiveContainer width="100%" height={220}>
                <LineChart data={monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
                  <XAxis dataKey="month" tick={{ fontSize: 12, fill: "#94A3B8" }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 12, fill: "#94A3B8" }} axisLine={false} tickLine={false} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#fff",
                      border: "none",
                      borderRadius: 12,
                      boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
                      fontSize: 12,
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="patients"
                    stroke="#0E7490"
                    strokeWidth={2.5}
                    dot={false}
                    activeDot={{ r: 5, fill: "#0E7490" }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* Bar Chart */}
            <div
              className="col-span-2 bg-white rounded-2xl p-6"
              style={{ boxShadow: "0px 4px 20px rgba(0,0,0,0.05)" }}
            >
              <div className="mb-6">
                <h3 className="text-slate-800" style={{ fontSize: 16, fontWeight: 700 }}>
                  Disease Distribution
                </h3>
                <p className="text-slate-400 text-xs mt-0.5">Top 6 conditions this quarter</p>
              </div>
              <ResponsiveContainer width="100%" height={220}>
                <BarChart data={diseaseData} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" horizontal={false} />
                  <XAxis type="number" tick={{ fontSize: 11, fill: "#94A3B8" }} axisLine={false} tickLine={false} />
                  <YAxis
                    type="category"
                    dataKey="disease"
                    tick={{ fontSize: 11, fill: "#64748B" }}
                    axisLine={false}
                    tickLine={false}
                    width={90}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#fff",
                      border: "none",
                      borderRadius: 12,
                      boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
                      fontSize: 12,
                    }}
                  />
                  <Bar dataKey="cases" fill="#14B8A6" radius={[0, 6, 6, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
      {/* Recent Activity */}
      <div className="mt-6 bg-white rounded-2xl shadow p-6">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h3 className="text-lg font-medium text-gray-800">Recent Activity</h3>
            <span className="text-sm text-gray-400">Latest patient and staff actions</span>
          </div>
          <button className="border border-gray-300 text-gray-500 px-4 py-2 rounded-xl text-sm">
            View All
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                {["Name", "Action", "Date & Time", "Status"].map((h) => (
                  <th key={h} className="text-left px-4 py-2 text-xs text-gray-400 uppercase font-semibold">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {recentActivity.map((row, i) => {
                const cfg = statusConfig[row.status];
                return (
                  <tr key={i} className="border-b border-gray-100 hover:bg-gray-50 transition">
                    <td className="py-2 flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-teal-600 flex items-center justify-center text-white font-semibold">
                        {row.name.charAt(0)}
                      </div>
                      <span className="text-sm font-medium text-gray-700">{row.name}</span>
                    </td>
                    <td className="px-4 py-2 text-sm text-gray-600">{row.action}</td>
                    <td className="px-4 py-2 text-sm text-gray-400">{row.date}</td>
                    <td className="px-4 py-2">
                      <span className="inline-flex items-center gap-1 text-xs px-2 py-1 rounded-lg font-semibold" style={{ backgroundColor: cfg.bg, color: cfg.color }}>
                        <cfg.icon className="w-3 h-3" />
                        {cfg.label}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
      </main>
    </div>
  );
}

export default Dashboard;