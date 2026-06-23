import React from "react";
import {
  TrendingUp,
  TrendingDown,
  CheckCircle,
  Clock,
  ArrowUpRight,
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
    {
      label: "Total Patients",
      value: "10",
      change: "+12%",
      up: true,
      icon: TrendingUp,
      color: "#0E7490",
      bg: "#E0F7FA",
      sub: "vs last month",
    },
    {
      label: "Today's Appointments",
      value: "6",
      change: "+5%",
      up: true,
      icon: CheckCircle,
      color: "#14B8A6",
      bg: "#E6FFFA",
      sub: "18 remaining",
    },
    {
      label: "Available Beds",
      value: "27",
      change: "-8%",
      up: false,
      icon: Clock,
      color: "#22C55E",
      bg: "#DCFCE7",
      sub: "out of 120 total",
    },
    {
      label: "Low Stock Medicines",
      value: "12",
      change: "+3",
      up: false,
      icon: AlertCircle,
      color: "#F59E0B",
      bg: "#FEF3C7",
      sub: "requires restock",
    },
  ];

  const recentActivity = [
    {
      name: "Maria Santos",
      action: "Patient Admitted",
      date: "Mar 2, 2026 · 09:14 AM",
      status: "admitted",
    },
    {
      name: "Dr. James Rivera",
      action: "Prescription Updated",
      date: "Mar 2, 2026 · 08:52 AM",
      status: "completed",
    },
    {
      name: "Lena Huang",
      action: "Appointment Scheduled",
      date: "Mar 2, 2026 · 08:30 AM",
      status: "scheduled",
    },
    {
      name: "Carlos Mendez",
      action: "Lab Results Pending",
      date: "Mar 2, 2026 · 07:45 AM",
      status: "pending",
    },
    {
      name: "Dr. Aisha Patel",
      action: "Surgery Completed",
      date: "Mar 1, 2026 · 06:30 PM",
      status: "completed",
    },
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
    <div className="bg-gray-50 min-h-screen font-inter pt-20 px-4 sm:px-6 lg:px-8">
      <main className="flex flex-col gap-6">

        {/* STATS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 lg:gap-6">
          {statCards.map((card) => {
            const Icon = card.icon;
            return (
              <div
                key={card.label}
                className="bg-white p-4 rounded-2xl shadow flex flex-col"
              >
                <div className="flex justify-between w-full">
                  <div
                    className="w-11 h-11 flex items-center justify-center rounded-xl"
                    style={{ backgroundColor: card.bg }}
                  >
                    <Icon className="w-5 h-5" style={{ color: card.color }} />
                  </div>

                  <span
                    className={`flex items-center gap-1 text-xs px-2 py-1 rounded-lg font-semibold ${
                      card.up
                        ? "text-green-600 bg-green-100"
                        : "text-red-600 bg-red-100"
                    }`}
                  >
                    {card.up ? (
                      <TrendingUp className="w-3 h-3" />
                    ) : (
                      <TrendingDown className="w-3 h-3" />
                    )}
                    {card.change}
                  </span>
                </div>

                <div className="mt-3">
                  <p className="text-2xl font-bold text-gray-800">
                    {card.value}
                  </p>
                  <p className="text-sm font-semibold text-gray-500">
                    {card.label}
                  </p>
                  <p className="text-xs text-gray-400">{card.sub}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* CHARTS */}
        <div className="grid grid-cols-1 xl:grid-cols-5 gap-6">

          {/* LINE CHART */}
          <div className="xl:col-span-3 bg-white rounded-2xl p-4 sm:p-6 shadow-sm">
            <h3 className="font-semibold text-gray-800">
              Monthly Patient Registrations
            </h3>

            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="patients"
                  stroke="#0E7490"
                  strokeWidth={2}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* BAR CHART */}
          <div className="xl:col-span-2 bg-white rounded-2xl p-4 sm:p-6 shadow-sm">
            <h3 className="font-semibold text-gray-800">
              Disease Distribution
            </h3>

            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={diseaseData} layout="vertical">
                <XAxis type="number" />
                <YAxis dataKey="disease" type="category" width={100} />
                <Tooltip />
                <Bar dataKey="cases" fill="#14B8A6" radius={[6, 6, 6, 6]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* TABLE */}
        <div className="bg-white rounded-2xl shadow overflow-x-auto">
          <div className="p-4 flex justify-between items-center">
            <div>
              <h3 className="font-semibold text-gray-800">
                Recent Activity
              </h3>
              <p className="text-sm text-gray-400">
                Latest patient and staff actions
              </p>
            </div>
          </div>

          <table className="min-w-[700px] w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left px-4 py-3 text-xs text-gray-400">
                  Name
                </th>
                <th className="text-left px-4 py-3 text-xs text-gray-400">
                  Action
                </th>
                <th className="text-left px-4 py-3 text-xs text-gray-400">
                  Date
                </th>
                <th className="text-left px-4 py-3 text-xs text-gray-400">
                  Status
                </th>
              </tr>
            </thead>

            <tbody>
              {recentActivity.map((row, i) => {
                const cfg = statusConfig[row.status];
                const Icon = cfg.icon;

                return (
                  <tr key={i} className="border-b-slate-300 hover:bg-gray-50">
                    <td className="px-4 py-3 flex items-center gap-2">
                      <div className="w-8 h-8 bg-teal-600 text-white rounded-full flex items-center justify-center">
                        {row.name[0]}
                      </div>
                      {row.name}
                    </td>

                    <td className="px-4 py-3">{row.action}</td>
                    <td className="px-4 py-3 text-gray-500">
                      {row.date}
                    </td>

                    <td className="px-4 py-3">
                      <span
                        className="text-xs px-2 py-1 rounded-lg flex items-center gap-1 w-fit"
                        style={{
                          backgroundColor: cfg.bg,
                          color: cfg.color,
                        }}
                      >
                        <Icon className="w-3 h-3" />
                        {cfg.label}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

      </main>
    </div>
  );
}

export default Dashboard;