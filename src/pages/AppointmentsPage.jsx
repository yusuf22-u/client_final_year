import { useState } from "react";
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






const allAppointments= [
  { id: 1, patientName: "Maria Santos", patientAge: 52, doctor: "Dr. Sarah Chen", specialty: "Internal Medicine", date: "Mar 10, 2026", time: "09:00 AM", type: "Follow-up", room: "Room 204", notes: "BP monitoring follow-up. Medication review required.", status: "pending", priority: "routine" },
  { id: 2, patientName: "Carlos Reyes", patientAge: 34, doctor: "Dr. James Rivera", specialty: "Endocrinology", date: "Mar 10, 2026", time: "09:30 AM", type: "Consultation", room: "Room 108", notes: "HbA1c results discussion and diet plan review.", status: "pending", priority: "routine" },
  { id: 3, patientName: "Elena Kim", patientAge: 67, doctor: "Dr. Sarah Chen", specialty: "Cardiology", date: "Mar 10, 2026", time: "10:00 AM", type: "Emergency Review", room: "ICU-2", notes: "Post-chest pain episode. ECG and cardiac enzyme results.", status: "approved", priority: "emergency" },
  { id: 4, patientName: "James Liu", patientAge: 45, doctor: "Dr. Aisha Patel", specialty: "Pulmonology", date: "Mar 11, 2026", time: "11:00 AM", type: "Routine Check", room: "Room 301", notes: "Asthma management check. Inhaler usage review.", status: "approved", priority: "routine" },
  { id: 5, patientName: "Anna Petrov", patientAge: 29, doctor: "Dr. Michael Torres", specialty: "Psychiatry", date: "Mar 11, 2026", time: "02:00 PM", type: "Therapy Session", room: "Room 112", notes: "Biweekly therapy session. Medication compliance check.", status: "pending", priority: "routine" },
  { id: 6, patientName: "Roberto Cruz", patientAge: 71, doctor: "Dr. James Rivera", specialty: "Pulmonology", date: "Mar 12, 2026", time: "08:30 AM", type: "Follow-up", room: "Room 205", notes: "Pulmonary function test results review.", status: "approved", priority: "urgent" },
  { id: 7, patientName: "Fatima Al-Hassan", patientAge: 38, doctor: "Dr. Sarah Chen", specialty: "Rheumatology", date: "Mar 12, 2026", time: "03:30 PM", type: "Consultation", room: "Room 309", notes: "Lupus flare monitoring. Steroid dose review.", status: "rejected", priority: "routine" },
  { id: 8, patientName: "David Chen", patientAge: 55, doctor: "Dr. Aisha Patel", specialty: "Nephrology", date: "Mar 13, 2026", time: "09:00 AM", type: "Lab Results", room: "Room 206", notes: "Creatinine and GFR results discussion. Diet plan update.", status: "pending", priority: "urgent" },
  { id: 9, patientName: "Sofia Martinez", patientAge: 42, doctor: "Dr. James Rivera", specialty: "Gastroenterology", date: "Mar 14, 2026", time: "01:00 PM", type: "Endoscopy Review", room: "Room 105", notes: "Post-endoscopy follow-up. Results from last procedure.", status: "approved", priority: "routine" },
  { id: 10, patientName: "Thomas Brown", patientAge: 61, doctor: "Dr. Sarah Chen", specialty: "Internal Medicine", date: "Mar 14, 2026", time: "04:00 PM", type: "Annual Physical", room: "Room 204", notes: "Annual comprehensive physical examination.", status: "completed", priority: "routine" },
  { id: 11, patientName: "Aiko Tanaka", patientAge: 28, doctor: "Dr. Michael Torres", specialty: "Psychiatry", date: "Mar 9, 2026", time: "10:00 AM", type: "Initial Consult", room: "Room 112", notes: "First psychiatric evaluation. History intake.", status: "completed", priority: "routine" },
  { id: 12, patientName: "Lena Huang", patientAge: 35, doctor: "Dr. Aisha Patel", specialty: "Pulmonology", date: "Mar 15, 2026", time: "11:30 AM", type: "New Patient", room: "Room 301", notes: "Chronic cough evaluation. Spirometry ordered.", status: "pending", priority: "routine" },
];

const statusCfg = {
  pending: { label: "Pending", color: "#F59E0B", bg: "#FEF3C7", icon: Clock },
  approved: { label: "Approved", color: "#22C55E", bg: "#DCFCE7", icon: CheckCircle },
  rejected: { label: "Rejected", color: "#EF4444", bg: "#FEE2E2", icon: XCircle },
  completed: { label: "Completed", color: "#64748B", bg: "#F1F5F9", icon: CheckCircle },
  rescheduled: { label: "Rescheduled", color: "#8B5CF6", bg: "#EDE9FE", icon: Clock },
};

const priorityCfg = {
  routine: { label: "Routine", color: "#64748B", bg: "#F1F5F9" },
  urgent: { label: "Urgent", color: "#F59E0B", bg: "#FEF3C7" },
  emergency: { label: "Emergency", color: "#EF4444", bg: "#FEE2E2" },
};

export function AppointmentsPage() {
  const [appointments, setAppointments] = useState(allAppointments);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterDate, setFilterDate] = useState("all");
  const [selectedAppt, setSelectedAppt] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [rejectReason, setRejectReason] = useState("");
  const [showRejectInput, setShowRejectInput] = useState(false);

  const handleApprove = (id) => {
    setAppointments((prev) => prev.map((a) => a.id === id ? { ...a, status: "approved" } : a));
    setSelectedAppt((prev) => prev && prev.id === id ? { ...prev, status: "approved" } : prev);
  };

  const handleReject = (id) => {
    setAppointments((prev) => prev.map((a) => a.id === id ? { ...a, status: "rejected" } : a));
    setSelectedAppt((prev) => prev && prev.id === id ? { ...prev, status: "rejected" } : prev);
    setShowRejectInput(false);
    setRejectReason("");
  };

  const filtered = appointments.filter((a) => {
    const q = search.toLowerCase();
    const matchSearch = a.patientName.toLowerCase().includes(q) || a.doctor.toLowerCase().includes(q) || a.type.toLowerCase().includes(q);
    const matchStatus = filterStatus === "all" || a.status === filterStatus;
    return matchSearch && matchStatus;
  });

  const stats = {
    total: appointments.length,
    pending: appointments.filter(a => a.status === "pending").length,
    approved: appointments.filter(a => a.status === "approved").length,
    completed: appointments.filter(a => a.status === "completed").length,
    rejected: appointments.filter(a => a.status === "rejected").length,
  };

  return (
    <div className="min-h-screen flex" style={{ fontFamily: "'Inter', sans-serif", backgroundColor: "#F8FAFC" }}>
      {/* <Sidebar role="admin" /> */}
      <div className="ml-55 flex-1 flex flex-col min-h-screen">
        {/* <Navbar title="Appointments" /> */}
        <main className="flex-1 p-8 space-y-6 mt-8">
          {/* Summary Cards */}
          <div className="grid grid-cols-5 gap-5">
            {[
              { label: "Total", value: stats.total, color: "#0E7490", bg: "#E0F7FA" },
              { label: "Pending", value: stats.pending, color: "#F59E0B", bg: "#FEF3C7" },
              { label: "Approved", value: stats.approved, color: "#22C55E", bg: "#DCFCE7" },
              { label: "Completed", value: stats.completed, color: "#64748B", bg: "#F1F5F9" },
              { label: "Rejected", value: stats.rejected, color: "#EF4444", bg: "#FEE2E2" },
            ].map((c) => (
              <div key={c.label} className="bg-white rounded-2xl p-5" style={{ boxShadow: "0 4px 20px rgba(0,0,0,0.05)" }}>
                <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-3" style={{ backgroundColor: c.bg }}>
                  <Calendar className="w-5 h-5" style={{ color: c.color }} />
                </div>
                <p className="text-slate-800" style={{ fontSize: 26, fontWeight: 800 }}>{c.value}</p>
                <p className="text-slate-500 text-sm mt-0.5" style={{ fontWeight: 600 }}>{c.label}</p>
              </div>
            ))}
          </div>

          {/* Table */}
          <div className="bg-white rounded-2xl" style={{ boxShadow: "0 4px 20px rgba(0,0,0,0.05)" }}>
            {/* Controls */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-slate-100 gap-4 flex-wrap">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input value={search} onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search patient, doctor, type..."
                    className="pl-9 pr-4 py-2.5 text-sm border border-slate-200 rounded-xl bg-slate-50 text-slate-700 focus:outline-none focus:border-teal-400 focus:bg-white transition-all placeholder:text-slate-400 w-64" />
                </div>
                <div className="flex items-center gap-1 bg-slate-100 rounded-xl p-1">
                  {(["all", "pending", "approved", "rejected", "completed"]).map((s) => (
                    <button key={s} onClick={() => setFilterStatus(s)}
                      className="px-3 py-1.5 rounded-lg text-xs capitalize transition-all"
                      style={{ backgroundColor: filterStatus === s ? "#0E7490" : "transparent", color: filterStatus === s ? "#fff" : "#64748B", fontWeight: filterStatus === s ? 600 : 500 }}>
                      {s === "all" ? "All" : s}
                    </button>
                  ))}
                </div>
              </div>
              <button onClick={() => setShowAddModal(true)}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-white text-sm hover:opacity-90 transition-all"
                style={{ backgroundColor: "#0E7490", fontWeight: 600, boxShadow: "0 4px 14px rgba(14,116,144,0.3)" }}>
                <Plus className="w-4 h-4" /> New Appointment
              </button>
            </div>

            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-100">
                  {["Patient", "Doctor / Specialty", "Date & Time", "Type", "Priority", "Status", "Actions"].map((h) => (
                    <th key={h} className="text-left px-5 py-4 text-xs text-slate-400 uppercase tracking-wider" style={{ fontWeight: 600 }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map((appt) => {
                  const sCfg = statusCfg[appt.status];
                  const pCfg = priorityCfg[appt.priority];
                  return (
                    <tr key={appt.id}
                      className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors"
                      style={{ backgroundColor: appt.priority === "emergency" ? "rgba(239,68,68,0.02)" : appt.priority === "urgent" ? "rgba(245,158,11,0.02)" : "transparent" }}>
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs shrink-0"
                            style={{ background: "linear-gradient(135deg, #0E7490, #14B8A6)", fontWeight: 700 }}>
                            {appt.patientName.split(" ").map(n => n[0]).join("").slice(0, 2)}
                          </div>
                          <div>
                            <p className="text-sm text-slate-800" style={{ fontWeight: 600 }}>{appt.patientName}</p>
                            <p className="text-xs text-slate-400">{appt.patientAge} yrs</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-5 py-4">
                        <p className="text-sm text-slate-700" style={{ fontWeight: 500 }}>{appt.doctor}</p>
                        <p className="text-xs text-slate-400">{appt.specialty}</p>
                      </td>
                      <td className="px-5 py-4">
                        <p className="text-sm text-slate-700" style={{ fontWeight: 500 }}>{appt.date}</p>
                        <p className="text-xs text-slate-400">{appt.time}</p>
                      </td>
                      <td className="px-5 py-4 text-sm text-slate-500">{appt.type}</td>
                      <td className="px-5 py-4">
                        <span className="text-xs px-2.5 py-1 rounded-lg" style={{ backgroundColor: pCfg.bg, color: pCfg.color, fontWeight: 600 }}>
                          {pCfg.label}
                        </span>
                      </td>
                      <td className="px-5 py-4">
                        <span className="inline-flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-lg" style={{ backgroundColor: sCfg.bg, color: sCfg.color, fontWeight: 600 }}>
                          <sCfg.icon className="w-3 h-3" />
                          {sCfg.label}
                        </span>
                      </td>
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-2">
                          {appt.status === "pending" && (
                            <>
                              <button onClick={() => handleApprove(appt.id)}
                                className="flex items-center gap-1 text-xs px-2.5 py-1.5 rounded-lg text-white transition-all hover:opacity-90"
                                style={{ backgroundColor: "#22C55E", fontWeight: 600 }}>
                                <CheckCircle className="w-3 h-3" /> Approve
                              </button>
                              <button onClick={() => { setSelectedAppt(appt); setShowRejectInput(true); }}
                                className="flex items-center gap-1 text-xs px-2.5 py-1.5 rounded-lg text-white transition-all hover:opacity-90"
                                style={{ backgroundColor: "#EF4444", fontWeight: 600 }}>
                                <XCircle className="w-3 h-3" /> Reject
                              </button>
                            </>
                          )}
                          <button onClick={() => { setSelectedAppt(appt); setShowRejectInput(false); }}
                            className="w-7 h-7 rounded-lg border border-slate-200 flex items-center justify-center hover:border-teal-300 hover:bg-teal-50 transition-colors">
                            <Eye className="w-3.5 h-3.5 text-slate-400" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            <div className="px-6 py-4 border-t border-slate-100">
              <p className="text-xs text-slate-400">Showing {filtered.length} of {appointments.length} appointments</p>
            </div>
          </div>
        </main>
      </div>

      {/* Appointment Detail Modal */}
      {selectedAppt && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ backgroundColor: "rgba(15,23,42,0.55)", backdropFilter: "blur(6px)" }}>
          <div className="bg-white rounded-2xl w-full max-w-lg" style={{ boxShadow: "0 24px 80px rgba(0,0,0,0.2)" }}>
            {/* Header */}
            <div className="px-7 py-5 border-b border-slate-100 flex items-start justify-between">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs px-2.5 py-1 rounded-lg" style={{ backgroundColor: priorityCfg[selectedAppt.priority].bg, color: priorityCfg[selectedAppt.priority].color, fontWeight: 600 }}>
                    {priorityCfg[selectedAppt.priority].label}
                  </span>
                  <span className="inline-flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-lg" style={{ backgroundColor: statusCfg[selectedAppt.status].bg, color: statusCfg[selectedAppt.status].color, fontWeight: 600 }}>
                    {(() => { const Icon = statusCfg[selectedAppt.status].icon; return <Icon className="w-3 h-3" />; })()}
                    {statusCfg[selectedAppt.status].label}
                  </span>
                </div>
                <h3 className="text-slate-800" style={{ fontSize: 17, fontWeight: 800 }}>Appointment Details</h3>
                <p className="text-slate-400 text-sm mt-0.5">APT-{String(selectedAppt.id).padStart(4, "0")}</p>
              </div>
              <button onClick={() => { setSelectedAppt(null); setShowRejectInput(false); }}
                className="w-8 h-8 rounded-xl bg-slate-100 flex items-center justify-center hover:bg-slate-200 transition-colors">
                <X className="w-4 h-4 text-slate-500" />
              </button>
            </div>

            <div className="p-7 space-y-5">
              {/* Patient & Doctor */}
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-slate-50 space-y-2">
                  <p className="text-xs text-slate-400 uppercase tracking-wider" style={{ fontWeight: 600 }}>Patient</p>
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full flex items-center justify-center text-white text-xs" style={{ background: "linear-gradient(135deg, #0E7490, #14B8A6)", fontWeight: 700 }}>
                      {selectedAppt.patientName.split(" ").map(n => n[0]).join("").slice(0, 2)}
                    </div>
                    <div>
                      <p className="text-sm text-slate-800" style={{ fontWeight: 600 }}>{selectedAppt.patientName}</p>
                      <p className="text-xs text-slate-400">{selectedAppt.patientAge} yrs old</p>
                    </div>
                  </div>
                </div>
                <div className="p-4 rounded-xl bg-slate-50 space-y-2">
                  <p className="text-xs text-slate-400 uppercase tracking-wider" style={{ fontWeight: 600 }}>Doctor</p>
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full flex items-center justify-center text-white text-xs" style={{ backgroundColor: "#14B8A6", fontWeight: 700 }}>
                      {selectedAppt.doctor.replace("Dr. ", "").split(" ").map(n => n[0]).join("").slice(0, 2)}
                    </div>
                    <div>
                      <p className="text-sm text-slate-800" style={{ fontWeight: 600 }}>{selectedAppt.doctor}</p>
                      <p className="text-xs text-slate-400">{selectedAppt.specialty}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Details Grid */}
              <div className="grid grid-cols-2 gap-3">
                {[
                  { icon: Calendar, label: "Date", val: selectedAppt.date },
                  { icon: Clock, label: "Time", val: selectedAppt.time },
                  { icon: Stethoscope, label: "Type", val: selectedAppt.type },
                  { icon: MapPin, label: "Location", val: selectedAppt.room },
                ].map(({ icon: Icon, label, val }) => (
                  <div key={label} className="flex items-center gap-3 p-3 rounded-xl border border-slate-100">
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: "#E0F7FA" }}>
                      <Icon className="w-4 h-4" style={{ color: "#0E7490" }} />
                    </div>
                    <div>
                      <p className="text-xs text-slate-400">{label}</p>
                      <p className="text-sm text-slate-700" style={{ fontWeight: 600 }}>{val}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Notes */}
              <div className="p-4 rounded-xl border border-slate-100">
                <div className="flex items-center gap-2 mb-2">
                  <MessageSquare className="w-4 h-4 text-slate-400" />
                  <p className="text-xs text-slate-500 uppercase tracking-wider" style={{ fontWeight: 600 }}>Clinical Notes</p>
                </div>
                <p className="text-sm text-slate-600 leading-relaxed">{selectedAppt.notes}</p>
              </div>

              {/* Reject reason input */}
              {showRejectInput && selectedAppt.status === "pending" && (
                <div className="p-4 rounded-xl border border-red-100 bg-red-50 space-y-3">
                  <div className="flex items-center gap-2">
                    <AlertCircle className="w-4 h-4" style={{ color: "#EF4444" }} />
                    <p className="text-sm text-red-600" style={{ fontWeight: 600 }}>Rejection Reason</p>
                  </div>
                  <textarea value={rejectReason} onChange={(e) => setRejectReason(e.target.value)}
                    placeholder="Provide a reason for rejection (optional)..."
                    className="w-full h-20 p-3 rounded-xl border border-red-200 text-sm text-slate-600 bg-white focus:outline-none focus:border-red-400 resize-none placeholder:text-slate-400" />
                </div>
              )}
            </div>

            {/* Footer Actions */}
            <div className="px-7 pb-7 flex gap-3">
              {selectedAppt.status === "pending" && (
                <>
                  <button onClick={() => handleApprove(selectedAppt.id)}
                    className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-white text-sm hover:opacity-90 transition-all"
                    style={{ backgroundColor: "#22C55E", fontWeight: 600 }}>
                    <CheckCircle className="w-4 h-4" /> Approve Appointment
                  </button>
                  {!showRejectInput ? (
                    <button onClick={() => setShowRejectInput(true)}
                      className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-white text-sm hover:opacity-90 transition-all"
                      style={{ backgroundColor: "#EF4444", fontWeight: 600 }}>
                      <XCircle className="w-4 h-4" /> Reject
                    </button>
                  ) : (
                    <button onClick={() => handleReject(selectedAppt.id)}
                      className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-white text-sm hover:opacity-90 transition-all"
                      style={{ backgroundColor: "#EF4444", fontWeight: 600 }}>
                      <XCircle className="w-4 h-4" /> Confirm Reject
                    </button>
                  )}
                </>
              )}
              {selectedAppt.status !== "pending" && (
                <button onClick={() => { setSelectedAppt(null); setShowRejectInput(false); }}
                  className="flex-1 py-3 rounded-xl border border-slate-200 text-sm text-slate-600 hover:bg-slate-50 transition-colors" style={{ fontWeight: 500 }}>
                  Close
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Add Appointment Modal form */}
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

        {[
          { label: "Patient Name", placeholder: "Search or enter patient name" },
          { label: "Assigned Doctor", placeholder: "Select doctor" },
          { label: "Appointment Type", placeholder: "e.g., Follow-up" },
          { label: "Date", placeholder: "MM/DD/YYYY" },
          { label: "Time", placeholder: "09:00 AM" },
          { label: "Room / Location", placeholder: "Room 204" },
        ].map((f) => (
          <div key={f.label}>
            <label className="block text-sm text-slate-600 mb-1 font-medium">
              {f.label}
            </label>

            <input
              type="text"
              placeholder={f.placeholder}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm bg-slate-50 focus:outline-none focus:border-cyan-500 focus:bg-white"
            />
          </div>
        ))}

        {/* Priority */}
        <div>
          <label className="block text-sm text-slate-600 mb-1 font-medium">
            Priority
          </label>

          <select className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm bg-slate-50 focus:outline-none focus:border-cyan-500">
            <option>Routine</option>
            <option>Urgent</option>
            <option>Emergency</option>
          </select>
        </div>

        {/* Notes */}
        <div>
          <label className="block text-sm text-slate-600 mb-1 font-medium">
            Notes
          </label>

          <textarea
            placeholder="Clinical notes or reason..."
            className="w-full h-24 px-4 py-3 rounded-xl border border-slate-200 text-sm bg-slate-50 focus:outline-none focus:border-cyan-500 resize-none"
          />
        </div>
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
  );
}
export default AppointmentsPage