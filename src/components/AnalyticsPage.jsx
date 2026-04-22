import { useState } from "react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  XAxis,
  YAxis,
  Legend,
} from "recharts";
import { Download, TrendingUp, Users, Calendar, BedDouble } from "lucide-react";


const monthlyPatients = [
  { month: "Jan", patients: 240, new: 48, returning: 192 },
  { month: "Feb", patients: 285, new: 62, returning: 223 },
  { month: "Mar", patients: 310, new: 71, returning: 239 },
  { month: "Apr", patients: 275, new: 55, returning: 220 },
  { month: "May", patients: 390, new: 88, returning: 302 },
  { month: "Jun", patients: 420, new: 95, returning: 325 },
  { month: "Jul", patients: 380, new: 78, returning: 302 },
  { month: "Aug", patients: 445, new: 102, returning: 343 },
  { month: "Sep", patients: 410, new: 90, returning: 320 },
  { month: "Oct", patients: 480, new: 115, returning: 365 },
  { month: "Nov", patients: 520, new: 128, returning: 392 },
  { month: "Dec", patients: 498, new: 118, returning: 380 },
];

const diseaseDistribution = [
  { name: "Hypertension", value: 28, color: "#0E7490" },
  { name: "Diabetes", value: 22, color: "#14B8A6" },
  { name: "Respiratory", value: 18, color: "#22C55E" },
  { name: "Cardiovascular", value: 15, color: "#F59E0B" },
  { name: "Orthopedic", value: 10, color: "#8B5CF6" },
  { name: "Other", value: 7, color: "#94A3B8" },
];

const ageGroups = [
  { age: "0–10", male: 45, female: 38 },
  { age: "11–20", male: 62, female: 58 },
  { age: "21–30", male: 88, female: 95 },
  { age: "31–40", male: 120, female: 132 },
  { age: "41–50", male: 145, female: 138 },
  { age: "51–60", male: 162, female: 155 },
  { age: "61–70", male: 138, female: 148 },
  { age: "71+", male: 95, female: 115 },
];

const bedOccupancy = [
  { name: "Occupied", value: 69, color: "#EF4444" },
  { name: "Available", value: 31, color: "#22C55E" },
];

const keyMetrics = [
  { label: "Avg. Daily Admissions", value: "42", change: "+8.5%", up: true, icon: Users, color: "#0E7490", bg: "#E0F7FA" },
  { label: "Avg. Length of Stay", value: "3.8 days", change: "-0.5 days", up: true, icon: Calendar, color: "#14B8A6", bg: "#E6FFFA" },
  { label: "Bed Occupancy Rate", value: "69%", change: "+5%", up: false, icon: BedDouble, color: "#F59E0B", bg: "#FEF3C7" },
  { label: "Patient Satisfaction", value: "4.7/5", change: "+0.2", up: true, icon: TrendingUp, color: "#22C55E", bg: "#DCFCE7" },
];

const CustomPieLabel = () => {
  const RADIAN = Math.PI / 180;
  const radius = outerRadius + 30;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);
  if (percent < 0.06) return null;
  return (
    <text x={x} y={y} fill="#475569" textAnchor={x > cx ? "start" : "end"} dominantBaseline="central" style={{ fontSize: 11, fontWeight: 600 }}>
      {name} ({(percent * 100).toFixed(0)}%)
    </text>
  );
};

export function AnalyticsPage() {
  const [dateRange, setDateRange] = useState("2026");

  return (
    <div
      className="min-h-screen flex"
      style={{ fontFamily: "'Inter', sans-serif", backgroundColor: "#F8FAFC" }}
    >
      {/* <Sidebar role="admin" /> */}

      <div className="ml-55 flex-1 flex flex-col min-h-screen">
        {/* <Navbar title="Analytics & Reports" /> */}

        <main className="flex-1 p-8 space-y-8 mt-6">
          {/* Header & Filter */}
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-slate-800" style={{ fontSize: 22, fontWeight: 800 }}>
                Health Center Analytics
              </h2>
              <p className="text-slate-400 text-sm mt-0.5">
                Executive-level insights for Community Health Center
              </p>
            </div>
            <div className="flex items-center gap-3">
              <select
                value={dateRange}
                onChange={(e) => setDateRange(e.target.value)}
                className="px-4 py-2.5 text-sm border border-slate-200 rounded-xl bg-white text-slate-600 focus:outline-none focus:border-teal-400 transition-all appearance-none cursor-pointer"
                style={{ fontWeight: 500 }}
              >
                <option value="2026">Year 2026</option>
                <option value="2025">Year 2025</option>
                <option value="q1">Q1 2026</option>
                <option value="q4">Q4 2025</option>
                <option value="30d">Last 30 Days</option>
              </select>
              <button
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-white text-sm transition-all hover:opacity-90"
                style={{ backgroundColor: "#0E7490", fontWeight: 600, boxShadow: "0 4px 14px rgba(14,116,144,0.3)" }}
              >
                <Download className="w-4 h-4" />
                Download Report
              </button>
            </div>
          </div>

          {/* Key Metric Cards */}
          <div className="grid grid-cols-4 gap-6">
            {keyMetrics.map((m) => (
              <div
                key={m.label}
                className="bg-white rounded-2xl p-6"
                style={{ boxShadow: "0px 4px 20px rgba(0,0,0,0.05)" }}
              >
                <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-4" style={{ backgroundColor: m.bg }}>
                  <m.icon className="w-5 h-5" style={{ color: m.color }} />
                </div>
                <p className="text-slate-800 mb-0.5" style={{ fontSize: 24, fontWeight: 800 }}>{m.value}</p>
                <p className="text-slate-500 text-sm" style={{ fontWeight: 600 }}>{m.label}</p>
                <p
                  className="text-xs mt-1"
                  style={{ color: m.up ? "#22C55E" : "#EF4444", fontWeight: 600 }}
                >
                  {m.change} vs last period
                </p>
              </div>
            ))}
          </div>

          {/* Charts Row 1 */}
          <div className="grid grid-cols-3 gap-6">
            {/* Monthly Patients Line Chart */}
            <div
              className="col-span-2 bg-white rounded-2xl p-6"
              style={{ boxShadow: "0px 4px 20px rgba(0,0,0,0.05)" }}
            >
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-slate-800" style={{ fontSize: 16, fontWeight: 700 }}>Monthly Patient Trend</h3>
                  <p className="text-slate-400 text-xs mt-0.5">New vs. returning patients</p>
                </div>
              </div>
              <ResponsiveContainer width="100%" height={240}>
                <LineChart data={monthlyPatients}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
                  <XAxis dataKey="month" tick={{ fontSize: 12, fill: "#94A3B8" }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 12, fill: "#94A3B8" }} axisLine={false} tickLine={false} />
                  <Tooltip
                    contentStyle={{ backgroundColor: "#fff", border: "none", borderRadius: 12, boxShadow: "0 4px 20px rgba(0,0,0,0.1)", fontSize: 12 }}
                  />
                  <Legend wrapperStyle={{ fontSize: 12, paddingTop: 16 }} />
                  <Line type="monotone" dataKey="patients" stroke="#0E7490" strokeWidth={2.5} dot={false} name="Total" activeDot={{ r: 4 }} />
                  <Line type="monotone" dataKey="new" stroke="#22C55E" strokeWidth={2} dot={false} name="New" strokeDasharray="4 4" />
                  <Line type="monotone" dataKey="returning" stroke="#14B8A6" strokeWidth={2} dot={false} name="Returning" />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* Disease Pie Chart */}
            <div
              className="bg-white rounded-2xl p-6"
              style={{ boxShadow: "0px 4px 20px rgba(0,0,0,0.05)" }}
            >
              <div className="mb-4">
                <h3 className="text-slate-800" style={{ fontSize: 16, fontWeight: 700 }}>Disease Distribution</h3>
                <p className="text-slate-400 text-xs mt-0.5">% of total diagnoses</p>
              </div>
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie
                    data={diseaseDistribution}
                    cx="50%"
                    cy="50%"
                    outerRadius={70}
                    dataKey="value"
                  >
                    {diseaseDistribution.map((entry, index) => (
                      <Cell key={index} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{ backgroundColor: "#fff", border: "none", borderRadius: 12, boxShadow: "0 4px 20px rgba(0,0,0,0.1)", fontSize: 12 }}
                    formatter={(v) => [`${v}%`, "Share"]}
                  />
                </PieChart>
              </ResponsiveContainer>
              <div className="space-y-2 mt-2">
                {diseaseDistribution.map((d) => (
                  <div key={d.name} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: d.color }} />
                      <span className="text-xs text-slate-500">{d.name}</span>
                    </div>
                    <span className="text-xs text-slate-700" style={{ fontWeight: 600 }}>{d.value}%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Charts Row 2 */}
          <div className="grid grid-cols-3 gap-6">
            {/* Age Groups Bar Chart */}
            <div
              className="col-span-2 bg-white rounded-2xl p-6"
              style={{ boxShadow: "0px 4px 20px rgba(0,0,0,0.05)" }}
            >
              <div className="mb-6">
                <h3 className="text-slate-800" style={{ fontSize: 16, fontWeight: 700 }}>Patient Age Groups</h3>
                <p className="text-slate-400 text-xs mt-0.5">Male vs Female distribution</p>
              </div>
              <ResponsiveContainer width="100%" height={240}>
                <BarChart data={ageGroups}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
                  <XAxis dataKey="age" tick={{ fontSize: 12, fill: "#94A3B8" }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 12, fill: "#94A3B8" }} axisLine={false} tickLine={false} />
                  <Tooltip
                    contentStyle={{ backgroundColor: "#fff", border: "none", borderRadius: 12, boxShadow: "0 4px 20px rgba(0,0,0,0.1)", fontSize: 12 }}
                  />
                  <Legend wrapperStyle={{ fontSize: 12, paddingTop: 12 }} />
                  <Bar dataKey="male" fill="#0E7490" radius={[4, 4, 0, 0]} name="Male" />
                  <Bar dataKey="female" fill="#14B8A6" radius={[4, 4, 0, 0]} name="Female" />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Bed Occupancy Donut */}
            <div
              className="bg-white rounded-2xl p-6 flex flex-col"
              style={{ boxShadow: "0px 4px 20px rgba(0,0,0,0.05)" }}
            >
              <div className="mb-4">
                <h3 className="text-slate-800" style={{ fontSize: 16, fontWeight: 700 }}>Bed Occupancy Rate</h3>
                <p className="text-slate-400 text-xs mt-0.5">Current ward utilization</p>
              </div>
              <div className="flex-1 flex items-center justify-center relative">
                <ResponsiveContainer width="100%" height={200}>
                  <PieChart>
                    <Pie
                      data={bedOccupancy}
                      cx="50%"
                      cy="50%"
                      innerRadius={55}
                      outerRadius={80}
                      dataKey="value"
                      startAngle={90}
                      endAngle={-270}
                    >
                      {bedOccupancy.map((entry, index) => (
                        <Cell key={index} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{ backgroundColor: "#fff", border: "none", borderRadius: 12, boxShadow: "0 4px 20px rgba(0,0,0,0.1)", fontSize: 12 }}
                      formatter={(v) => [`${v}%`, ""]}
                    />
                  </PieChart>
                </ResponsiveContainer>
                {/* Center text */}
                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                  <p className="text-slate-800" style={{ fontSize: 26, fontWeight: 800 }}>69%</p>
                  <p className="text-xs text-slate-400" style={{ fontWeight: 500 }}>Occupied</p>
                </div>
              </div>
              <div className="space-y-3 mt-2">
                {bedOccupancy.map((d) => (
                  <div key={d.name} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: d.color }} />
                      <span className="text-sm text-slate-500">{d.name}</span>
                    </div>
                    <span className="text-sm text-slate-700" style={{ fontWeight: 700 }}>{d.value}%</span>
                  </div>
                ))}
                <div className="pt-2 border-t border-slate-100">
                  <p className="text-xs text-slate-400 text-center">83 / 120 beds occupied</p>
                </div>
              </div>
            </div>
          </div>

          {/* Download CTA */}
          <div
            className="rounded-2xl p-6 flex items-center justify-between"
            style={{
              background: "linear-gradient(135deg, #0E7490 0%, #14B8A6 100%)",
              boxShadow: "0 4px 20px rgba(14,116,144,0.25)",
            }}
          >
            <div>
              <h3 className="text-white" style={{ fontSize: 18, fontWeight: 700 }}>
                Export Full Analytics Report
              </h3>
              <p className="text-teal-100 text-sm mt-0.5">
                Download a comprehensive PDF or Excel report for executive review
              </p>
            </div>
            <div className="flex gap-3">
              <button
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/20 text-white text-sm hover:bg-white/30 transition-all border border-white/30"
                style={{ fontWeight: 600 }}
              >
                <Download className="w-4 h-4" />
                Export as PDF
              </button>
              <button
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white text-sm hover:bg-slate-50 transition-all"
                style={{ color: "#0E7490", fontWeight: 600 }}
              >
                <Download className="w-4 h-4" />
                Export as Excel
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default AnalyticsPage