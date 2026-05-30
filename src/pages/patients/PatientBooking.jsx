// PatientBooking.jsx

import React, { useState, useEffect } from "react";
import API from "../../api/axios"
import toast from "react-hot-toast";
import {
  Search,
  Plus,
  CheckCircle,
  XCircle,
  Clock,
  Calendar,
  User,
  Stethoscope,
  X,
  Eye,
  Filter,
  ChevronDown,
  MapPin,
  MessageSquare,
  AlertCircle,
} from "lucide-react";
import { formatDate } from "../../helpers/formatDate";
import { useAuth } from "../../context/AuthContext"
export default function PatientBooking() {

  const token = localStorage.getItem("token")
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const { user } = useAuth()
  const [form, setForm] = useState({

    date: "",
    time: "",
    type: "",
    notes: ""
  });
  console.log("usein", user?.id)
  const statusCfg = {
    pending: { label: "Pending", color: "text-yellow-700", bg: "bg-yellow-100" },
    approved: { label: "Approved", color: "text-green-700", bg: "bg-green-100" },
    rejected: { label: "Rejected", color: "text-red-700", bg: "bg-red-100" },
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await API.post("/appointments", form);

      toast.success("Appointment requested");

      setForm({
        date: "",
        time: "",
        type: "",
        notes: ""
      });

      fetchAppointments();
      setShowAddModal(false);

    } catch (err) {
      toast.error("Failed");
    }
  };
  const fetchAppointments = async () => {
    try {
      const res = await API.get("/appointments/patient", {

        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },

      });
      setAppointments(res.data);
      console.log("apoint", res.data)
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  return (
    <main className="flex-1 lg:ml-64 pt-20 px-4 sm:px-6 lg:px-8 pb-10 bg-slate-100 min-h-screen">
      <div className="max-w-6xl mx-auto space-y-6">

        {/* HEADER */}
        <div>
          <h1 className="text-2xl font-bold text-slate-800">
            Book Appointment
          </h1>
          <p className="text-slate-400 text-sm">
            Schedule a consultation with your doctor
          </p>
        </div>



        {/* APPOINTMENTS LIST */}
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100">
          <div className="flex space-x-1 justify-between">
            <h2 className="text-lg font-semibold text-slate-800 mb-4">
              My Appointments
            </h2>
            <button onClick={() => setShowAddModal(true)}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-white text-sm hover:opacity-90 transition-all"
              style={{ backgroundColor: "#0E7490", fontWeight: 600, boxShadow: "0 4px 14px rgba(14,116,144,0.3)" }}>
              <Plus className="w-4 h-4" /> New Appointment
            </button>
          </div>
          <div className="space-y-3">
            {appointments.length === 0 && (
              <p className="text-slate-400 text-sm">
                No appointments yet
              </p>
            )}

            {appointments.map((a) => {
              const cfg = statusCfg[a.status] || statusCfg.pending;

              return (
                <div
                  key={a.id}
                  className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 p-4 rounded-2xl border border-slate-100 hover:bg-slate-50 transition"
                >
                  <div>
                    <p className="font-semibold text-slate-700 capitalize">
                      {a.type || "General Consultation"}
                    </p>
                    <p className="text-sm text-slate-400">
                      {formatDate(a.appointment_date)} · {a.appointment_time}
                    </p>
                  </div>

                  <span
                    className={`px-3 py-1 text-xs rounded-full font-semibold ${cfg.bg} ${cfg.color}`}
                  >
                    {cfg.label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
        {showAddModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center px-4 py-6 bg-black/50 backdrop-blur-sm">
            <div className="bg-white w-full max-w-xl rounded-3xl shadow-2xl flex flex-col max-h-[95vh] overflow-hidden">

              {/* HEADER */}
              <div className="flex items-center justify-between px-6 py-5 border-b bg-white sticky top-0 z-10">
                <div>
                  <h3 className="text-xl font-bold text-slate-800">
                    Schedule Appointment
                  </h3>
                  <p className="text-sm text-slate-500 mt-1">
                    Create a new appointment request
                  </p>
                </div>

                <button
                  onClick={() => setShowAddModal(false)}
                  className="w-10 h-10 rounded-xl bg-slate-100 hover:bg-slate-200 flex items-center justify-center transition"
                >
                  <X className="w-5 h-5 text-slate-600" />
                </button>
              </div>

              {/* BODY */}
              <form
                onSubmit={handleSubmit}
                className="overflow-y-auto px-6 py-6 space-y-6"
              >
                {/* Date + Time */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Appointment Date
                    </label>
                    <input
                      type="date"
                      name="date"
                      value={form.date}
                      onChange={handleChange}
                      className="w-full border border-slate-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-cyan-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Appointment Time
                    </label>
                    <input
                      type="time"
                      name="time"
                      value={form.time}
                      onChange={handleChange}
                      className="w-full border border-slate-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-cyan-500 focus:outline-none"
                    />
                  </div>
                </div>

                {/* Type */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Appointment Type
                  </label>
                  <input
                    type="text"
                    name="type"
                    placeholder="e.g Consultation"
                    value={form.type}
                    onChange={handleChange}
                    className="w-full border border-slate-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-cyan-500 focus:outline-none"
                  />
                </div>

                {/* Notes */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Additional Notes
                  </label>
                  <textarea
                    name="notes"
                    rows="5"
                    placeholder="Describe symptoms or reason for appointment..."
                    value={form.notes}
                    onChange={handleChange}
                    className="w-full border border-slate-300 rounded-xl px-4 py-3 resize-none focus:ring-2 focus:ring-cyan-500 focus:outline-none"
                  />
                </div>

                {/* FOOTER */}
                <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t">
                  <button
                    type="button"
                    onClick={() => setShowAddModal(false)}
                    className="flex-1 py-3 rounded-xl border border-slate-300 text-slate-700 font-medium hover:bg-slate-50 transition"
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    className="flex-1 py-3 rounded-xl bg-cyan-700 text-white font-semibold hover:bg-cyan-800 transition shadow-md"
                  >
                    Book Appointment
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}

/* REUSABLE INPUTS */


/* helper */
const statusColor = (status) => {
  if (status === "pending") return "bg-yellow-100 text-yellow-700";
  if (status === "approved") return "bg-green-100 text-green-600";
  if (status === "rejected") return "bg-red-100 text-red-600";
  return "bg-slate-100 text-slate-600";
};