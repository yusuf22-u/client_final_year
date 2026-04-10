import React, { useState, useEffect } from "react";
import API from "../api/axios.js";
import {
  Search,
  Filter,
  Plus,
  Eye,
  Edit3,
  Trash2,
  X,
  User,
  Phone,
  MapPin,
  Calendar,
  Droplets,
  AlertTriangle,
  HeartPulse,
  FileText,
  Pill,
  Clock,
  ChevronRight,
  Thermometer,
  Activity,
  Mail,
} from "lucide-react";

function ViewPatientModal({ patient, onClose, onEdit }) {
    const [activeTab, setActiveTab] = useState("overview");
    const [showForm, setShowForm] = useState(false);
    const [newPrescription, setNewPrescription] = useState({
        name: "",
        dosage: "",
        status: "Active",
    });
    const [prescriptions, setPrescriptions] = useState([
        { medicine_name: "Paracetamol", dosage: "2x daily • 5 days", status: "Active" },
        { medicine_name: "Amoxicillin", dosage: "2x daily • 5 days", status: "Active" },
    ]);


    useEffect(() => {
        if (patient) {
            API(patient.id).then((res) => {
                if (res.data.success) setPrescriptions(res.data.prescriptions);
            });
        }
    }, [patient]);

    const handleAddPrescription = async () => {
        try {
            const res = await API.post("/presription", {
                patient_id: patient.id,
                medicine_name: newPrescription.medicine_name,
                dosage: newPrescription.dosage,
                status: newPrescription.status,
            });
            if (res.data.success) {
                setPrescriptions([...prescriptions, { ...newPrescription, id: res.data.id }]);
                setNewPrescription({ name: "", dosage: "", status: "Active" });
                setShowForm(false);
            }
        } catch (err) {
            console.error(err);
        }
    };

    if (!patient) return null;

    // ✅ Helpers
    const calculateAge = (dob) => {
        const today = new Date();
        const birthDate = new Date(dob);
        let age = today.getFullYear() - birthDate.getFullYear();
        const m = today.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) age--;
        return age;
    };

    const formatDate = (date) => {
        if (!date) return "N/A";
        return new Date(date).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
        });
    };

    const statusStyle =
        patient.status === "stable"
            ? "bg-green-100 text-green-600"
            : patient.status === "critical"
                ? "bg-red-100 text-red-600"
                : "bg-yellow-100 text-yellow-600";

    // ✅ Reusable Row
    const InfoRow = ({ Icon, label, value, danger }) => (
        <div className="flex items-start gap-3 hover:bg-slate-100 p-2 rounded-lg transition">
            <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center border border-slate-100">
                <Icon
                    className="w-4 h-4"
                    style={{ color: danger ? "#EF4444" : "#0E7490" }}
                />
            </div>

            <div>
                <p className="text-xs text-slate-400">{label}</p>
                <p
                    className="text-sm font-medium"
                    style={{ color: danger ? "#EF4444" : "#334155" }}
                >
                    {value || "N/A"}
                </p>
            </div>
        </div>
    );

    return (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
            <div className="bg-white w-full max-w-3xl rounded-2xl shadow-xl overflow-hidden">

                {/* 🔷 HEADER */}
                <div className="flex items-center justify-between p-6 border-b border-slate-100">
                    <div className="flex items-center gap-4">
                        <div
                            className="w-14 h-14 uppercase rounded-2xl flex items-center justify-center text-white font-bold text-lg"
                            style={{
                                background: "linear-gradient(135deg, #0E7490, #14B8A6)",
                            }}
                        >
                            {patient.first_name[0]}
                            {patient.last_name[0]}
                        </div>

                        <div>
                            <h2 className="text-lg font-semibold text-slate-800">
                                {patient.first_name} {patient.last_name}
                            </h2>
                            <p className="text-sm text-slate-400">
                                MN-{patient.medical_record_number} • {calculateAge(patient.date_of_birth)} yrs •{" "}
                                {patient.gender}
                            </p>
                        </div>

                        <span
                            className={`ml-4 px-3 py-1 rounded-full text-xs font-semibold ${statusStyle}`}
                        >
                            {patient.status}
                        </span>
                    </div>

                    <button
                        onClick={onClose}
                        className="text-slate-400 hover:text-slate-600"
                    >
                        <X />
                    </button>
                </div>

                {/* 🔷 TABS */}
                <div className="flex gap-6 px-6 border-b border-slate-100">
                    {[
                        { key: "overview", label: "Overview" },
                        { key: "vitals", label: "Vitals" },
                        { key: "prescriptions", label: "Prescriptions" },
                        { key: "history", label: "History" },
                    ].map((tab) => (
                        <button
                            key={tab.key}
                            onClick={() => setActiveTab(tab.key)}
                            className="relative py-3 text-sm transition"
                            style={{
                                color: activeTab === tab.key ? "#0E7490" : "#94A3B8",
                                fontWeight: activeTab === tab.key ? 600 : 500,
                            }}
                        >
                            {tab.label}

                            {activeTab === tab.key && (
                                <span className="absolute left-0 right-0 bottom-0 h-[2px] rounded-full bg-teal-600" />
                            )}
                        </button>
                    ))}
                </div>

                {/* 🔷 CONTENT */}
                <div className="p-6">

                    {/* ✅ OVERVIEW */}
                    {activeTab === "overview" && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                            {/* Personal */}
                            <div className="bg-slate-50 rounded-2xl p-5 border border-slate-100">
                                <h3 className="text-xs font-semibold text-slate-400 mb-4 uppercase tracking-wider">
                                    Personal Information
                                </h3>

                                <div className="space-y-1">
                                    <InfoRow
                                        Icon={User}
                                        label="Date of Birth"
                                        value={formatDate(patient.date_of_birth)}
                                    />
                                    <InfoRow Icon={Phone} label="Phone" value={patient.phone} />
                                    <InfoRow Icon={Mail} label="Email" value={patient.email} />
                                    <InfoRow
                                        Icon={MapPin}
                                        label="Address"
                                        value={patient.address}
                                    />
                                </div>
                            </div>

                            {/* Clinical */}
                            <div className="bg-slate-50 rounded-2xl p-5 border border-slate-100">
                                <h3 className="text-xs font-semibold text-slate-400 mb-4 uppercase tracking-wider">
                                    Clinical Information
                                </h3>

                                <div className="space-y-1">
                                    <InfoRow
                                        Icon={HeartPulse}
                                        label="Primary Condition"
                                        value={patient.condition}
                                    />
                                    <InfoRow
                                        Icon={User}
                                        label="Assigned Doctor"
                                        value="Dr. Darboe"
                                    />
                                    <InfoRow
                                        Icon={Calendar}
                                        label="Last Visit"
                                        value={formatDate(patient.lastVisit)}
                                    />
                                    <InfoRow
                                        Icon={Calendar}
                                        label="Next Appointment"
                                        value={formatDate(patient.nextVisit)}
                                    />
                                    <InfoRow
                                        Icon={AlertTriangle}
                                        label="Allergies"
                                        value={patient.allergies}
                                        danger
                                    />
                                </div>
                            </div>
                        </div>
                    )}

                  
                    {/* ✅ VITALS */}
                    {activeTab === "vitals" && (
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">

                            {[
                                { label: "Heart Rate", value: "72 bpm", icon: HeartPulse, color: "#0E7490", bg: "#E0F7FA" },
                                { label: "Blood Pressure", value: "120/80", icon: Activity, color: "#EF4444", bg: "#FEE2E2" },
                                { label: "Temperature", value: "36.7°C", icon: Thermometer, color: "#F59E0B", bg: "#FEF3C7" },
                                { label: "Oxygen", value: "98%", icon: Activity, color: "#22C55E", bg: "#DCFCE7" },
                            ].map((v) => (
                                <div
                                    key={v.label}
                                    className="p-5 rounded-2xl border border-slate-100 flex items-center gap-4"
                                >
                                    <div
                                        className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
                                        style={{ backgroundColor: v.bg }}
                                    >
                                        <v.icon className="w-6 h-6" style={{ color: v.color }} />
                                    </div>

                                    <div>
                                        <p className="text-xs text-slate-400 mb-0.5" style={{ fontWeight: 500 }}>
                                            {v.label}
                                        </p>
                                        <p className="text-slate-800" style={{ fontSize: 20, fontWeight: 800 }}>
                                            {v.value}
                                        </p>
                                    </div>
                                </div>
                            ))}

                            <div className="col-span-2 p-4 rounded-xl bg-slate-50">
                                <p className="text-xs text-slate-400 mb-2" style={{ fontWeight: 600 }}>
                                    Last Recorded
                                </p>
                                <p className="text-sm text-slate-500">
                                    {patient.lastVisit} — All vitals recorded during clinical visit.
                                </p>
                            </div>
                        </div>
                    )}

                    {/* ✅ PRESCRIPTIONS */}

                    {activeTab === "prescriptions" && (
                        <div className="space-y-4">
                            {prescriptions.map((med, i) => (
                                <div
                                    key={i}
                                    className="flex items-center justify-between p-4 rounded-xl border border-slate-100 bg-white shadow-sm hover:shadow-md transition"
                                >
                                    <div>
                                        <p className="text-sm font-semibold text-slate-800 capitalize">{med.medicine_name}</p>
                                        <p className="text-xs text-slate-400">{med.dosage}</p>
                                    </div>
                                    <span className="text-xs px-2 py-1 bg-teal-50 text-teal-600 rounded-md font-medium">
                                        {med.status}
                                    </span>
                                </div>
                            ))}

                            <button
                                onClick={() => setShowForm(true)}
                                className="w-full mt-2 py-3 rounded-xl border-2 border-dashed border-slate-200 text-sm text-slate-400 hover:border-teal-300 hover:text-teal-600 transition-all flex items-center justify-center gap-2"
                            >
                                <Plus className="w-4 h-4" /> Add Prescription
                            </button>

                            {/* Modal */}
                            {showForm && (
                                <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
                                    <div className="bg-white p-6 rounded-xl w-96 relative">
                                        <button
                                            onClick={() => setShowForm(false)}
                                            className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
                                        >
                                            <X className="w-5 h-5" />
                                        </button>

                                        <h2 className="text-lg font-semibold mb-4">Add Prescription</h2>

                                        <div className="space-y-3">
                                            <input
                                                type="text"
                                                name="medicine_name"
                                                placeholder="Medicine Name"
                                                value={newPrescription.medicine_name}
                                                onChange={(e) =>
                                                    setNewPrescription({ ...newPrescription, medicine_name: e.target.value })
                                                }
                                                className="w-full p-2 border rounded-md"
                                            />
                                            <input
                                                type="text"
                                                placeholder="Dosage (e.g., 2x daily • 5 days)"
                                                value={newPrescription.dosage}
                                                onChange={(e) =>
                                                    setNewPrescription({ ...newPrescription, dosage: e.target.value })
                                                }
                                                className="w-full p-2 border rounded-md"
                                            />
                                            <select
                                                value={newPrescription.status}
                                                onChange={(e) =>
                                                    setNewPrescription({ ...newPrescription, status: e.target.value })
                                                }
                                                className="w-full p-2 border rounded-md"
                                            >
                                                <option value="Active">Active</option>
                                                <option value="Completed">Completed</option>
                                                <option value="Paused">Paused</option>
                                            </select>
                                        </div>

                                        <button
                                            onClick={handleAddPrescription}
                                            className="mt-4 w-full py-2 bg-teal-600 text-white rounded-xl hover:bg-teal-700 transition"
                                        >
                                            Save Prescription
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
                    {/* ✅ HISTORY */}
                    {activeTab === "history" && (
                        <div className="space-y-6">

                            {[
                                { title: "Visited Doctor", date: "Mar 12, 2026" },
                                { title: "Prescription Updated", date: "Feb 20, 2026" },
                            ].map((item, i) => (
                                <div key={i} className="flex gap-4">

                                    {/* Line + Dot */}
                                    <div className="flex flex-col items-center">
                                        <div className="w-2 h-2 rounded-full bg-teal-600 mt-1" />
                                        <div className="w-px flex-1 bg-slate-200" />
                                    </div>

                                    {/* Content */}
                                    <div>
                                        <p className="text-sm font-medium text-slate-700">
                                            {item.title}
                                        </p>
                                        <p className="text-xs text-slate-400">
                                            {item.date}
                                        </p>
                                    </div>

                                </div>
                            ))}

                        </div>
                    )}
                </div>

                {/* 🔷 FOOTER */}
                <div className="flex items-center justify-between p-6 border-t border-slate-100">
                    <p className="text-xs text-slate-400">
                        Last updated: {formatDate(patient.updated_at)}
                    </p>

                    <div className="flex gap-3">
                        <button
                            onClick={onClose}
                            className="px-4 py-2 rounded-xl border text-slate-500"
                        >
                            Close
                        </button>


                    </div>
                </div>

            </div>
        </div>
    );
}

export default ViewPatientModal;