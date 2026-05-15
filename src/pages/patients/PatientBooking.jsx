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
import {useAuth} from "../../context/AuthContext"
export default function PatientBooking() {
 

  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const {user}=useAuth()
   const [form, setForm] = useState({
   
    date: "",
    time: "",
    type: "",
    notes: ""
  });
console.log("usein",user?.id)
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
      const res = await API.get("/appointments/patient");
      setAppointments(res.data);
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
          <div className="fixed inset-0 z-50 flex items-center justify-center px-3 sm:px-4 py-6 bg-black/50 backdrop-blur-sm">

            {/* MODAL CONTAINER */}
            <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl flex flex-col max-h-[95vh]">

              {/* HEADER (STICKY) */}
              <div className="flex items-center justify-between px-5 sm:px-6 py-4 border-b sticky top-0 bg-white z-10">
                <h3 className="text-base sm:text-lg font-bold text-slate-800">
                  Schedule New Appointment
                </h3>

                <button
                  onClick={() => setShowAddModal(false)}
                  className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center hover:bg-slate-200"
                >
                  <X className="w-4 h-4 text-slate-500" />
                </button>
              </div>

              {/* BODY (SCROLLABLE) */}
              <div className="overflow-y-auto px-5 sm:px-6 py-4 space-y-4">


                {/* Notes */}
                <form onSubmit={handleSubmit}>

                  <input
                    type="date"
                    name="date"
                    value={form.date}
                    onChange={handleChange}
                  />

                  <input
                    type="time"
                    name="time"
                    value={form.time}
                    onChange={handleChange}
                  />

                  <input
                    type="text"
                    name="type"
                    placeholder="Consultation"
                    value={form.type}
                    onChange={handleChange}
                  />

                  <textarea
                    name="notes"
                    value={form.notes}
                    onChange={handleChange}
                  />

                  <button type="submit">
                    Book
                  </button>

                </form>

              </div>

              {/* FOOTER (STICKY) */}
              <div className="px-5 sm:px-6 py-4 border-t bg-white flex gap-3 sticky bottom-0">

                <button
                  onClick={() => setShowAddModal(false)}
                  className="flex-1 py-3 rounded-xl border border-slate-200 text-sm text-slate-600 hover:bg-slate-50"
                >
                  Cancel
                </button>

                <button
                  onClick={() => setShowAddModal(false)}
                  className="flex-1 py-3 rounded-xl bg-cyan-700 text-white text-sm font-semibold hover:bg-cyan-800"
                >
                  Schedule
                </button>

              </div>
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