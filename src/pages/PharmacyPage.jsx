import { useState } from "react";
import {
  Pill,
  AlertTriangle,
  Clock,
  XCircle,
  Search,
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
];

const statusCfg = {
  "in-stock": { label: "In Stock", color: "#22C55E", bg: "#DCFCE7" },
  "low-stock": { label: "Low Stock", color: "#F59E0B", bg: "#FEF3C7" },
  "out-of-stock": { label: "Out of Stock", color: "#EF4444", bg: "#FEE2E2" },
};

export default function PharmacyPage() {
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [showAddModal, setShowAddModal] = useState(false);

  const filtered = medicines.filter((m) => {
    const matchSearch =
      m.name.toLowerCase().includes(search.toLowerCase()) ||
      m.category.toLowerCase().includes(search.toLowerCase());

    const matchStatus = filterStatus === "all" || m.status === filterStatus;

    return matchSearch && matchStatus;
  });

  return (
    <div className="min-h-screen flex overflow-x-hidden bg-[#F8FAFC]">
      
      {/* MAIN */}
      <div className="flex-1 flex flex-col min-h-screen overflow-x-hidden">
        
        <main className="flex-1 p-4 sm:p-6 lg:p-8 space-y-6 overflow-x-hidden">

          {/* SUMMARY CARDS */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {summaryCards.map((card) => (
              <div
                key={card.label}
                className="bg-white rounded-2xl p-5 sm:p-6"
              >
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center mb-4"
                  style={{ backgroundColor: card.bg }}
                >
                  <card.icon className="w-5 h-5" style={{ color: card.color }} />
                </div>
                <p className="text-xl sm:text-2xl font-bold">{card.value}</p>
                <p className="text-sm font-semibold text-slate-600">{card.label}</p>
                <p className="text-xs text-slate-400">{card.sub}</p>
              </div>
            ))}
          </div>

          {/* CONTROLS */}
          <div className="bg-white rounded-2xl p-4 sm:p-6 space-y-4">

            <div className="flex flex-col lg:flex-row gap-3 lg:items-center justify-between">

              {/* SEARCH */}
              <div className="relative w-full lg:max-w-sm">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search medicines..."
                  className="w-full pl-9 pr-4 py-2.5 border rounded-xl bg-slate-50"
                />
              </div>

              {/* FILTER */}
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-4 py-2.5 border rounded-xl bg-slate-50"
              >
                <option value="all">All Status</option>
                <option value="in-stock">In Stock</option>
                <option value="low-stock">Low Stock</option>
                <option value="out-of-stock">Out of Stock</option>
              </select>

              {/* ADD BUTTON */}
              <button
                onClick={() => setShowAddModal(true)}
                className="bg-[#0E7490] text-white px-5 py-2.5 rounded-xl flex items-center gap-2"
              >
                <Plus size={16} />
                Add Medicine
              </button>

            </div>
          </div>

          {/* ========================= */}
          {/* DESKTOP TABLE */}
          {/* ========================= */}
          <div className="hidden md:block bg-white rounded-2xl overflow-hidden">
            
            <div className="w-full overflow-x-auto">
              <table className="min-w-[800px] w-full">
                <thead>
                  <tr className="border-b">
                    {["Name", "Category", "Qty", "Expiry", "Status", "Actions"].map((h) => (
                      <th key={h} className="text-left p-4 text-xs text-slate-400 uppercase">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>

                <tbody>
                  {filtered.map((m) => {
                    const cfg = statusCfg[m.status];

                    return (
                      <tr key={m.id} className="border-b hover:bg-slate-50">
                        <td className="p-4">{m.name}</td>
                        <td className="p-4">{m.category}</td>
                        <td className="p-4">{m.quantity}</td>
                        <td className="p-4">{m.expiry}</td>
                        <td className="p-4">
                          <span
                            className="px-2 py-1 text-xs rounded-lg"
                            style={{ background: cfg.bg, color: cfg.color }}
                          >
                            {cfg.label}
                          </span>
                        </td>
                        <td className="p-4 flex gap-2">
                          <button className="p-2 border rounded-lg">
                            <Edit3 size={14} />
                          </button>
                          <button className="p-2 border rounded-lg">
                            <Trash2 size={14} />
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* ========================= */}
          {/* MOBILE CARD VIEW */}
          {/* ========================= */}
          <div className="grid md:hidden gap-4">
            {filtered.map((m) => {
              const cfg = statusCfg[m.status];

              return (
                <div key={m.id} className="bg-white p-4 rounded-2xl">
                  <div className="flex justify-between">
                    <p className="font-semibold">{m.name}</p>
                    <span
                      className="text-xs px-2 py-1 rounded-lg"
                      style={{ background: cfg.bg, color: cfg.color }}
                    >
                      {cfg.label}
                    </span>
                  </div>

                  <p className="text-sm text-slate-500">{m.category}</p>
                  <p className="text-sm">Qty: {m.quantity}</p>
                  <p className="text-sm">Expiry: {m.expiry}</p>

                  <div className="flex gap-2 mt-3">
                    <button className="flex-1 border py-2 rounded-xl">
                      Edit
                    </button>
                    <button className="flex-1 border py-2 rounded-xl text-red-500">
                      Delete
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

        </main>
      </div>

      {/* MODAL */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-md rounded-2xl p-5">
            <div className="flex justify-between mb-4">
              <h2 className="font-semibold">Add Medicine</h2>
              <button onClick={() => setShowAddModal(false)}>
                <X />
              </button>
            </div>

            <div className="space-y-3">
              <input className="w-full p-3 border rounded-xl" placeholder="Name" />
              <input className="w-full p-3 border rounded-xl" placeholder="Category" />
              <input className="w-full p-3 border rounded-xl" placeholder="Quantity" />
            </div>

            <button className="w-full mt-4 bg-[#0E7490] text-white py-3 rounded-xl">
              Save
            </button>
          </div>
        </div>
      )}
    </div>
  );
}