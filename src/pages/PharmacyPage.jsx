import { useState, useEffect } from "react";
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
import API from "../api/axios"




const statusCfg = {
  "in-stock": { label: "In Stock", color: "#22C55E", bg: "#DCFCE7" },
  "low-stock": { label: "Low Stock", color: "#F59E0B", bg: "#FEF3C7" },
  "out-of-stock": { label: "Out of Stock", color: "#EF4444", bg: "#FEE2E2" },
};

export default function PharmacyPage() {
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [showAddModal, setShowAddModal] = useState(false);
  const [medicines, setMedicines] = useState([]);
  const [showEditModal, setShowEditModal] = useState(false);
  const [summaryCards, setSummaryCards] = useState([]);
  const [editId, setEditId] = useState(null);
  const [editForm, setEditForm] = useState({
    name: "",
    category: "",
    quantity: "",
    expiry: "",
    status: "in-stock",
  });
  const [form, setForm] = useState({
    name: "",
    category: "",
    quantity: "",
    expiry: "",
    status: "in-stock",
  });

  useEffect(() => {
    fetchMedicines();
  }, []);
  const handleEditClick = (medicine) => {
    setEditId(medicine.id);

    setEditForm({
      name: medicine.name,
      category: medicine.category,
      quantity: medicine.quantity,
      expiry: medicine.expiry?.split("T")[0] || medicine.expiry,
      status: medicine.status,
    });

    setShowEditModal(true);
  };
  const handleUpdate = async () => {
    try {
      await API.put(`/pharmacy/${editId}`, editForm);

      setShowEditModal(false);
      setEditId(null);

      fetchMedicines(); // refresh table
    } catch (error) {
      console.log(error);
    }
  };
  const fetchMedicines = async () => {
  try {
    const { data } = await API.get("/pharmacy");

    const meds = data.data;
    setMedicines(meds);

    // 🔥 BUILD SUMMARY CARDS HERE
    generateSummary(meds);
  } catch (error) {
    console.log(error);
  }
};

  const filtered = medicines.filter((m) => {
    const matchSearch =
      m.name.toLowerCase().includes(search.toLowerCase()) ||
      m.category.toLowerCase().includes(search.toLowerCase());

    const matchStatus = filterStatus === "all" || m.status === filterStatus;

    return matchSearch && matchStatus;
  });
  const handleSave = async () => {
    try {
      await API.post("/pharmacy", {
        ...form,
        status: getStatus(Number(form.quantity)),
      });

      setShowAddModal(false);

      setForm({
        name: "",
        category: "",
        quantity: "",
        expiry: "",
        status: "in-stock",
      });

      fetchMedicines(); // refresh table
    } catch (error) {
      console.log(error);
    }
  };
  const handleDelete = async (id) => {
    try {
      await API.delete(`/pharmacy/${id}`);
      fetchMedicines();
    } catch (error) {
      console.log(error);
    }
  };
  const generateSummary = (meds) => {
  const total = meds.length;

  const lowStock = meds.filter((m) => m.quantity > 0 && m.quantity <= 20).length;

  const outOfStock = meds.filter((m) => m.quantity === 0).length;

  const expiringSoon = meds.filter((m) => {
    const today = new Date();
    const expiry = new Date(m.expiry);

    const diffDays = (expiry - today) / (1000 * 60 * 60 * 24);

    return diffDays <= 30 && diffDays >= 0;
  }).length;

  setSummaryCards([
    {
      label: "Total Medicines",
      value: total,
      icon: Pill,
      color: "#0E7490",
      bg: "#E0F7FA",
      sub: "Active inventory",
    },
    {
      label: "Low Stock",
      value: lowStock,
      icon: AlertTriangle,
      color: "#F59E0B",
      bg: "#FEF3C7",
      sub: "Below threshold",
    },
    {
      label: "Expiring Soon",
      value: expiringSoon,
      icon: Clock,
      color: "#14B8A6",
      bg: "#E6FFFA",
      sub: "Within 30 days",
    },
    {
      label: "Out of Stock",
      value: outOfStock,
      icon: XCircle,
      color: "#EF4444",
      bg: "#FEE2E2",
      sub: "Requires order",
    },
  ]);
};
  const getStatus = (qty) => {
    if (qty == 0) return "out-of-stock";
    if (qty <= 20) return "low-stock";
    return "in-stock";
  };
  return (
    <div className="min-h-screen mt-4 flex overflow-x-hidden bg-[#F8FAFC]">

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
                        <td className="p-4">{new Date(m.expiry).toLocaleDateString()}</td>
                        <td className="p-4">
                          <span
                            className="px-2 py-1 text-xs rounded-lg"
                            style={{ background: cfg.bg, color: cfg.color }}
                          >
                            {cfg.label}
                          </span>
                        </td>
                        <td className="p-4 flex gap-2">
                          <button
                            onClick={() => handleEditClick(m)}
                            className="p-2 border rounded-lg text-blue-600"
                          >
                            <Edit3 size={14} />
                          </button>
                          <button
                            onClick={() => handleDelete(m.id)}
                            className="p-2 border rounded-lg text-red-500"
                          >
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
                  <p className="text-sm">Expiry: {new Date(m.expiry).toLocaleDateString()}</p>

                  <div className="flex gap-2 mt-3">
                    <button
                      onClick={() => handleEditClick(m)}
                      className="flex-1 border py-2 rounded-xl"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(m.id)}
                      className="flex-1 border py-2 rounded-xl text-red-500"
                    >
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
              <input
                className="w-full p-3 border rounded-xl"
                placeholder="Medicine Name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />

              <input
                className="w-full p-3 border rounded-xl"
                placeholder="Category"
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
              />

              <input
                className="w-full p-3 border rounded-xl"
                type="number"
                placeholder="Quantity"
                value={form.quantity}
                onChange={(e) => setForm({ ...form, quantity: e.target.value })}
              />

              <input
                className="w-full p-3 border rounded-xl"
                type="date"
                value={form.expiry}
                onChange={(e) => setForm({ ...form, expiry: e.target.value })}
              />

              <select
                className="w-full p-3 border rounded-xl"
                value={form.status}
                onChange={(e) => setForm({ ...form, status: e.target.value })}
              >
                <option value="in-stock">In Stock</option>
                <option value="low-stock">Low Stock</option>
                <option value="out-of-stock">Out of Stock</option>
              </select>
            </div>

            <button
              onClick={handleSave}
              className="w-full mt-4 bg-[#0E7490] text-white py-3 rounded-xl"
            >
              Save Medicine
            </button>
          </div>
        </div>
      )}

      {showEditModal && (
  <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4">
    <div className="bg-white w-full max-w-md rounded-2xl p-5">
      
      {/* HEADER */}
      <div className="flex justify-between mb-4">
        <h2 className="font-semibold">Edit Medicine</h2>
        <button onClick={() => setShowEditModal(false)}>
          <X />
        </button>
      </div>

      {/* FORM */}
      <div className="space-y-3">

        <input
          className="w-full p-3 border rounded-xl"
          placeholder="Medicine Name"
          value={editForm.name}
          onChange={(e) =>
            setEditForm({ ...editForm, name: e.target.value })
          }
        />

        <input
          className="w-full p-3 border rounded-xl"
          placeholder="Category"
          value={editForm.category}
          onChange={(e) =>
            setEditForm({ ...editForm, category: e.target.value })
          }
        />

        <input
          className="w-full p-3 border rounded-xl"
          type="number"
          placeholder="Quantity"
          value={editForm.quantity}
          onChange={(e) =>
            setEditForm({ ...editForm, quantity: e.target.value })
          }
        />

        <input
          className="w-full p-3 border rounded-xl"
          type="date"
          value={editForm.expiry}
          onChange={(e) =>
            setEditForm({ ...editForm, expiry: e.target.value })
          }
        />

        <select
          className="w-full p-3 border rounded-xl"
          value={editForm.status}
          onChange={(e) =>
            setEditForm({ ...editForm, status: e.target.value })
          }
        >
          <option value="in-stock">In Stock</option>
          <option value="low-stock">Low Stock</option>
          <option value="out-of-stock">Out of Stock</option>
        </select>

      </div>

      {/* BUTTON */}
      <button
        onClick={handleUpdate}
        className="w-full mt-4 bg-blue-600 text-white py-3 rounded-xl"
      >
        Update Medicine
      </button>

    </div>
  </div>
)}
    </div>
  );
}