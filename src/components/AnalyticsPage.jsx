import { useState, useEffect } from "react";
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
import API from "../api/axios";
// import { COLOR_PANEL } from "recharts/types/util/Constants";

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
const COLORS = [
  "#0E7490",
  "#14B8A6",
  "#22C55E",
  "#F59E0B",
  "#8B5CF6",
  "#EC4899",
  "#EF4444",
  "#3B82F6",
];

export function AnalyticsPage() {
  const [dateRange, setDateRange] = useState("2026");
  const [report, setReport] = useState(null);

  useEffect(() => {
    const fetchReport = async () => {
      try {
        const { data } = await API.get("/reports/hospital-report");
        setReport(data.report);
      } catch (error) {
        console.log(error);
      }
    };

    fetchReport();
  }, []);

  const keyMetrics = [
    {
      label: "Total Patients",
      value: report?.summary?.totalPatients || 0,
      icon: Users,
      color: "#0E7490",
      bg: "#E0F7FA",
    },
    {
      label: "Total Doctors",
      value: report?.summary?.totalDoctors || 0,
      icon: TrendingUp,
      color: "#14B8A6",
      bg: "#E6FFFA",
    },
    {
      label: "Total Nurses",
      value: report?.summary?.totalNurses || 0,
      icon: Calendar,
      color: "#F59E0B",
      bg: "#FEF3C7",
    },
    {
      label: "Conditions",
      value: report?.conditions?.length || 0,
      icon: BedDouble,
      color: "#22C55E",
      bg: "#DCFCE7",
    },
  ];
const downloadPDF = () => {
  window.open(
    `${import.meta.env.VITE_API_URL}/api/reports/hospital-report/pdf`,
    "_blank"
  );
};
  return (
    <div
      className="min-h-screen w-full flex overflow-x-hidden"
      style={{ fontFamily: "'Inter', sans-serif", backgroundColor: "#F8FAFC" }}
    >
      {/* MAIN WRAPPER */}
      <div className="flex-1 flex flex-col min-h-screen w-full">

        <main className="flex-1 w-full p-4 sm:p-6 lg:p-8 space-y-6 sm:space-y-8 mt-4 sm:mt-6">

          {/* HEADER */}
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
            <div>
              <h2 className="text-slate-800 text-xl sm:text-2xl font-extrabold">
                Health Center Analytics
              </h2>
              <p className="text-slate-400 text-sm">
                Executive-level insights for Community Health Center
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
              <select
                value={dateRange}
                onChange={(e) => setDateRange(e.target.value)}
                className="px-4 py-2.5 text-sm border border-slate-200 rounded-xl bg-white text-slate-600 w-full sm:w-auto"
              >
                <option value="2026">Year 2026</option>
                <option value="2025">Year 2025</option>
              </select>

              <button  onClick={downloadPDF}
                className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-white text-sm w-full sm:w-auto"
                style={{ backgroundColor: "#0E7490", fontWeight: 600 }}
              >
                <Download className="w-4 h-4" />
                Download Report
              </button>
            </div>
          </div>

          {/* METRICS */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {keyMetrics.map((m) => (
              <div
                key={m.label}
                className="bg-white rounded-2xl p-5 sm:p-6"
              >
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center mb-4"
                  style={{ backgroundColor: m.bg }}
                >
                  <m.icon className="w-5 h-5" style={{ color: m.color }} />
                </div>

                <p className="text-xl sm:text-2xl font-extrabold text-slate-800">
                  {m.value}
                </p>
                <p className="text-sm text-slate-500 font-semibold">
                  {m.label}
                </p>
                <p className="text-xs mt-1 font-semibold text-slate-500">
                  Current records
                </p>
              </div>
            ))}
          </div>

          {/* CHARTS ROW 1 */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

            {/* LINE CHART */}
            <div className="lg:col-span-2 bg-white rounded-2xl p-4 sm:p-6 overflow-x-auto">
              <h3 className="font-semibold mb-4">Monthly Patient Trend</h3>

              <div className="w-full h-[260px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={monthlyPatients}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line dataKey="patients" stroke="#0E7490" />
                    <Line dataKey="new" stroke="#22C55E" />
                    <Line dataKey="returning" stroke="#14B8A6" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* PIE */}
            <div className="bg-white rounded-2xl p-4 sm:p-6">
              <h3 className="font-semibold mb-4">Disease Distribution</h3>

              <div className="w-full h-[220px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={
                        report?.conditions?.map((item) => ({
                          name: item.condition_state,
                          value: item.total,
                        })) || []
                      }
                      dataKey="value"
                      nameKey="name"
                      outerRadius={70}
                    >
                      {(report?.conditions || []).map((_, index) => (
                        <Cell
                          key={index}
                          fill={COLORS[index % COLORS.length]}
                        />
                      ))}
                    </Pie>

                    <Tooltip />
                  </PieChart>

                </ResponsiveContainer>
                <div className="mt-[-20px] space-y-2">
                  {(report?.conditions || []).map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between text-sm"
                    >
                      <div className="flex items-center gap-2">
                        <span
                          className="w-3 h-3 rounded-full"
                          style={{
                            backgroundColor:
                              COLORS[index % COLORS.length],
                          }}
                        />
                        <span>{item.condition_state}</span>
                      </div>

                      <span className="font-semibold">
                        {item.total}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

            </div>


          </div>

          {/* CHARTS ROW 2 */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

            {/* BAR */}
            <div className="lg:col-span-2 bg-white rounded-2xl p-4 sm:p-6 overflow-x-auto">
              <h3 className="font-semibold mb-4">Patient Age Groups</h3>

              <div className="w-full h-[260px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={report?.ageGroups || []}>
                    <CartesianGrid />
                    <XAxis dataKey="age_group" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="total" fill="#0E7490" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* DONUT */}
            <div className="bg-white rounded-2xl p-4 sm:p-6">
              <h3 className="font-semibold mb-4">Bed Occupancy Rate</h3>

              <div className="w-full h-[220px] relative">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={bedOccupancy}
                      innerRadius={55}
                      outerRadius={80}
                      dataKey="value"
                    >
                      {bedOccupancy.map((d, i) => (
                        <Cell key={i} fill={d.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>

                {/* CENTER TEXT */}
                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                  <p className="text-2xl font-bold text-slate-800">69%</p>
                  <p className="text-xs text-slate-400">Occupied</p>
                </div>
              </div>
            </div>

          </div>

        </main>
      </div>
    </div>
  );
}

export default AnalyticsPage;