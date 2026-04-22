import { useState } from "react";
import {
  Pill,
  AlertTriangle,
  Clock,
  XCircle,
  Search,
  Filter,
  Plus,
  Edit3,
  Trash2,
  X,
} from "lucide-react";

const summaryCards = [
  { label: "Total Medicines", value: "284", icon: Pill, color: "#0E7490", bg: "#E0F7FA", sub: "Active inventory" },
  { label: "Low Stock", value: "12", icon: AlertTriangle, color: "#F59E0B", bg: "#FEF3C7", sub: "Below threshold" },
  { label: "Expiring Soon", value: "8", icon: Clock, color: "#14B8A6", bg: "#E6FFFA", sub: "Within 30 days" },
  { label: "Out of Stock", value: "5", icon: XCircle, color: "#EF4444", bg: "#FEE2E2", sub: "Requires order" },
];

const medicines = [
  { id: 1, name: "Amlodipine", category: "Cardiovascular", quantity: 240, expiry: "Dec 2026", status: "in-stock" },
  { id: 2, name: "Losartan 50mg", category: "Antihypertensive", quantity: 18, expiry: "Mar 2026", status: "low-stock" },
  { id: 3, name: "Metformin 500mg", category: "Antidiabetic", quantity: 0, expiry: "Jun 2026", status: "out-of-stock" },
  { id: 4, name: "Atorvastatin", category: "Lipid-lowering", quantity: 180, expiry: "Nov 2026", status: "in-stock" },
  { id: 5, name: "Amoxicillin 500mg", category: "Antibiotic", quantity: 12, expiry: "Apr 2026", status: "low-stock" },
  { id: 6, name: "Omeprazole 20mg", category: "Gastric", quantity: 320, expiry: "Aug 2026", status: "in-stock" },
  { id: 7, name: "Salbutamol Inhaler", category: "Bronchodilator", quantity: 0, expiry: "May 2026", status: "out-of-stock" },
  { id: 8, name: "Paracetamol 500mg", category: "Analgesic", quantity: 8, expiry: "Mar 2026", status: "low-stock" },
  { id: 9, name: "Ibuprofen 400mg", category: "Anti-inflammatory", quantity: 450, expiry: "Jan 2027", status: "in-stock" },
  { id: 10, name: "Insulin Glargine", category: "Antidiabetic", quantity: 0, expiry: "Sep 2026", status: "out-of-stock" },
  { id: 11, name: "Cetirizine 10mg", category: "Antihistamine", quantity: 200, expiry: "Oct 2026", status: "in-stock" },
  { id: 12, name: "Doxycycline 100mg", category: "Antibiotic", quantity: 15, expiry: "Apr 2026", status: "low-stock" },
];

const statusCfg = {
  "in-stock": { label: "In Stock", color: "#22C55E", bg: "#DCFCE7" },
  "low-stock": { label: "Low Stock", color: "#F59E0B", bg: "#FEF3C7" },
  "out-of-stock": { label: "Out of Stock", color: "#EF4444", bg: "#FEE2E2" },
};

const categories = ["All", "Cardiovascular", "Antidiabetic", "Antibiotic", "Analgesic", "Gastric", "Bronchodilator", "Anti-inflammatory"];

export function PharmacyPage() {
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterCategory, setFilterCategory] = useState("All");
  const [showAddModal, setShowAddModal] = useState(false);

  const filtered = medicines.filter((m) => {
    const matchSearch = m.name.toLowerCase().includes(search.toLowerCase()) || m.category.toLowerCase().includes(search.toLowerCase());
    const matchStatus = filterStatus === "all" || m.status === filterStatus;
    const matchCategory = filterCategory === "All" || m.category === filterCategory;
    return matchSearch && matchStatus && matchCategory;
  });

  return (
    <div
      className="min-h-screen flex"
      style={{ fontFamily: "'Inter', sans-serif", backgroundColor: "#F8FAFC" }}
    >
     
      <div className="ml-55 flex-1 flex flex-col min-h-screen">
       
        <main className="flex-1 p-8 space-y-8 mt-6">
          {/* Summary Cards */}
          <div className="grid grid-cols-4 gap-6">
            {summaryCards.map((card) => (
              <div
                key={card.label}
                className="bg-white rounded-2xl p-6"
                style={{ boxShadow: "0px 4px 20px rgba(0,0,0,0.05)" }}
              >
                <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-4" style={{ backgroundColor: card.bg }}>
                  <card.icon className="w-5 h-5" style={{ color: card.color }} />
                </div>
                <p className="text-slate-800 mb-0.5" style={{ fontSize: 28, fontWeight: 800 }}>
                  {card.value}
                </p>
                <p className="text-slate-600 text-sm" style={{ fontWeight: 600 }}>{card.label}</p>
                <p className="text-slate-400 text-xs mt-0.5">{card.sub}</p>
              </div>
            ))}
          </div>

          {/* Table Section */}
          <div className="bg-white rounded-2xl" style={{ boxShadow: "0px 4px 20px rgba(0,0,0,0.05)" }}>
            {/* Table Controls */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-slate-100 gap-4 flex-wrap">
              <div className="flex items-center gap-3 flex-1 min-w-0">
                {/* Search */}
                <div className="relative flex-1 max-w-xs">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Search medicines..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full pl-9 pr-4 py-2.5 text-sm border border-slate-200 rounded-xl bg-slate-50 text-slate-700 focus:outline-none focus:border-teal-400 focus:bg-white transition-all placeholder:text-slate-400"
                  />
                </div>

                {/* Status Filter */}
                <div className="relative">
                  <Filter className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <select
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                    className="pl-9 pr-4 py-2.5 text-sm border border-slate-200 rounded-xl bg-slate-50 text-slate-600 focus:outline-none focus:border-teal-400 focus:bg-white transition-all appearance-none cursor-pointer"
                  >
                    <option value="all">All Status</option>
                    <option value="in-stock">In Stock</option>
                    <option value="low-stock">Low Stock</option>
                    <option value="out-of-stock">Out of Stock</option>
                  </select>
                </div>

                {/* Category Filter */}
                <select
                  value={filterCategory}
                  onChange={(e) => setFilterCategory(e.target.value)}
                  className="px-4 py-2.5 text-sm border border-slate-200 rounded-xl bg-slate-50 text-slate-600 focus:outline-none focus:border-teal-400 focus:bg-white transition-all appearance-none cursor-pointer"
                >
                  {categories.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>

              <button
                onClick={() => setShowAddModal(true)}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-white text-sm transition-all hover:opacity-90"
                style={{ backgroundColor: "#0E7490", fontWeight: 600, boxShadow: "0 4px 14px rgba(14,116,144,0.3)" }}
              >
                <Plus className="w-4 h-4" />
                Add Medicine
              </button>
            </div>

            {/* Table */}
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-100">
                  {["Medicine Name", "Category", "Quantity", "Expiry Date", "Status", "Actions"].map((h) => (
                    <th
                      key={h}
                      className="text-left px-6 py-4 text-xs text-slate-400 uppercase tracking-wider"
                      style={{ fontWeight: 600 }}
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map((m) => {
                  const cfg = statusCfg[m.status];
                  const isLow = m.status === "low-stock";
                  const isOut = m.status === "out-of-stock";
                  return (
                    <tr
                      key={m.id}
                      className="border-b border-slate-50 transition-colors"
                      style={{
                        backgroundColor: isOut
                          ? "rgba(239,68,68,0.03)"
                          : isLow
                          ? "rgba(245,158,11,0.04)"
                          : "transparent",
                      }}
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0" style={{ backgroundColor: "#E0F7FA" }}>
                            <Pill className="w-4 h-4" style={{ color: "#0E7490" }} />
                          </div>
                          <span className="text-sm text-slate-700" style={{ fontWeight: 500 }}>{m.name}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-500">{m.category}</td>
                      <td className="px-6 py-4">
                        <span
                          className="text-sm"
                          style={{
                            fontWeight: 600,
                            color: isOut ? "#EF4444" : isLow ? "#F59E0B" : "#0F172A",
                          }}
                        >
                          {m.quantity === 0 ? "0" : m.quantity}
                          <span className="text-slate-400 text-xs" style={{ fontWeight: 400 }}> units</span>
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-500">{m.expiry}</td>
                      <td className="px-6 py-4">
                        <span
                          className="text-xs px-2.5 py-1 rounded-lg"
                          style={{ backgroundColor: cfg.bg, color: cfg.color, fontWeight: 600 }}
                        >
                          {cfg.label}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <button className="w-7 h-7 rounded-lg border border-slate-200 flex items-center justify-center hover:border-teal-300 hover:bg-teal-50 transition-colors">
                            <Edit3 className="w-3.5 h-3.5 text-slate-400 hover:text-teal-600" />
                          </button>
                          <button className="w-7 h-7 rounded-lg border border-slate-200 flex items-center justify-center hover:border-red-300 hover:bg-red-50 transition-colors">
                            <Trash2 className="w-3.5 h-3.5 text-slate-400 hover:text-red-500" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>

            {filtered.length === 0 && (
              <div className="text-center py-12 text-slate-400 text-sm">
                No medicines found matching your search.
              </div>
            )}

            <div className="px-6 py-4 border-t border-slate-100 flex items-center justify-between">
              <p className="text-xs text-slate-400">
                Showing {filtered.length} of {medicines.length} medicines
              </p>
            </div>
          </div>
        </main>
      </div>

      {/* Add Medicine Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6" style={{ backgroundColor: "rgba(15,23,42,0.5)", backdropFilter: "blur(4px)" }}>
          <div className="bg-white rounded-2xl w-full max-w-md" style={{ boxShadow: "0 20px 60px rgba(0,0,0,0.2)" }}>
            <div className="flex items-center justify-between px-6 py-5 border-b border-slate-100">
              <h3 className="text-slate-800" style={{ fontSize: 16, fontWeight: 700 }}>Add New Medicine</h3>
              <button onClick={() => setShowAddModal(false)} className="w-8 h-8 rounded-xl bg-slate-100 flex items-center justify-center hover:bg-slate-200 transition-colors">
                <X className="w-4 h-4 text-slate-500" />
              </button>
            </div>
            <div className="p-6 space-y-4">
              {[
                { label: "Medicine Name", placeholder: "e.g., Amlodipine 10mg" },
                { label: "Category", placeholder: "e.g., Cardiovascular" },
                { label: "Quantity (units)", placeholder: "e.g., 200" },
                { label: "Expiry Date", placeholder: "e.g., Dec 2026" },
              ].map((field) => (
                <div key={field.label}>
                  <label className="block text-sm text-slate-600 mb-1.5" style={{ fontWeight: 500 }}>
                    {field.label}
                  </label>
                  <input
                    type="text"
                    placeholder={field.placeholder}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm text-slate-700 bg-slate-50 focus:outline-none focus:border-teal-400 focus:bg-white transition-all placeholder:text-slate-400"
                  />
                </div>
              ))}
              <div>
                <label className="block text-sm text-slate-600 mb-1.5" style={{ fontWeight: 500 }}>Status</label>
                <select className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm text-slate-700 bg-slate-50 focus:outline-none focus:border-teal-400 appearance-none">
                  <option>In Stock</option>
                  <option>Low Stock</option>
                  <option>Out of Stock</option>
                </select>
              </div>
            </div>
            <div className="px-6 pb-6 flex gap-3">
              <button
                onClick={() => setShowAddModal(false)}
                className="flex-1 py-3 rounded-xl border border-slate-200 text-sm text-slate-600 hover:bg-slate-50 transition-colors"
                style={{ fontWeight: 500 }}
              >
                Cancel
              </button>
              <button
                onClick={() => setShowAddModal(false)}
                className="flex-1 py-3 rounded-xl text-white text-sm transition-all hover:opacity-90"
                style={{ backgroundColor: "#0E7490", fontWeight: 600 }}
              >
                Add Medicine
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
 export default PharmacyPage