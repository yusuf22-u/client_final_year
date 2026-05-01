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
export default function PatientBooking() {
  const [form, setForm] = useState({
    date: "",
    time: "",
    type: "",
    notes: "",
  });

  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(false);

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
      setLoading(true);

      await API.post("/appointments", form);

      toast.success("Appointment requested");

      setForm({ date: "", time: "", type: "", notes: "" });

      fetchAppointments();
    } catch (err) {
      console.error(err);
      toast.error("Error booking");
    } finally {
      setLoading(false);
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

        {/* FORM CARD */}
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100">
          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 sm:grid-cols-2 gap-4"
          >

            <Input
              type="date"
              name="date"
              value={form.date}
              onChange={handleChange}
              label="Date"
            />

            <Input
              type="time"
              name="time"
              value={form.time}
              onChange={handleChange}
              label="Time"
            />

            <Input
              name="type"
              value={form.type}
              onChange={handleChange}
              label="Appointment Type"
              placeholder="e.g. Consultation"
              className="sm:col-span-2"
            />

            <Textarea
              name="notes"
              value={form.notes}
              onChange={handleChange}
              label="Notes"
              className="sm:col-span-2"
            />

            <button
              type="submit"
              disabled={loading}
              className="sm:col-span-2 mt-2 bg-cyan-700 hover:bg-cyan-800 text-white py-3 rounded-2xl font-semibold transition"
            >
              {loading ? "Booking..." : "Book Appointment"}
            </button>

          </form>
        </div>

        {/* APPOINTMENTS LIST */}
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100">
          <h2 className="text-lg font-semibold text-slate-800 mb-4">
            My Appointments
          </h2>

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

      </div>
    </main>
  );
}

/* REUSABLE INPUTS */

function Input({ label, className = "", ...props }) {
  return (
    <div className={className}>
      <label className="block text-sm text-slate-600 mb-1 font-medium">
        {label}
      </label>
      <input
        {...props}
        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-sm focus:outline-none focus:border-cyan-500 focus:bg-white"
      />
    </div>
  );
}

function Textarea({ label, className = "", ...props }) {
  return (
    <div className={className}>
      <label className="block text-sm text-slate-600 mb-1 font-medium">
        {label}
      </label>
      <textarea
        {...props}
        rows={4}
        className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-sm focus:outline-none focus:border-cyan-500 focus:bg-white resize-none"
      />
    </div>
  );
}

/* helper */
const statusColor = (status) => {
  if (status === "pending") return "bg-yellow-100 text-yellow-700";
  if (status === "approved") return "bg-green-100 text-green-600";
  if (status === "rejected") return "bg-red-100 text-red-600";
  return "bg-slate-100 text-slate-600";
};