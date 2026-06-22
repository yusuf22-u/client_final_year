import { useState, useEffect } from "react";
import {
  User,
  Calendar,
  Phone,
  Mail,
  MapPin,
  Droplets,
  Activity,
  Heart,
  Thermometer,
  Weight,
  Pill,
  FileText,
  Stethoscope,
  Plus,
  Edit3,
  Download,
  Upload,
  AlertTriangle,
  Clock,
  ChevronRight,
  TrendingUp,
  TrendingDown,
  Minus,
  CheckCircle,
  XCircle,
  Eye,
  X
} from "lucide-react";
import VitalForm from "./VitalForm";
import API from "../../api/axios";
import toast from "react-hot-toast";
import { useParams, Link } from "react-router-dom";
import { calculateAge } from "../../helpers/calculateAge";
import { formatDate } from "../../helpers/formatDate"
import PrescriptionForm from "./PrescriptionForm";
const patientInfo = {
  id: 1,
  name: "Maria Santos",
  age: 52,
  gender: "Female",
  dob: "March 14, 1973",
  bloodType: "O+",
  phone: "+1 (555) 204-1122",
  email: "m.santos@email.com",
  address: "84 Maple Street, Springfield, IL 62701",
  emergencyContact: {
    name: "Carlos Santos",
    relationship: "Spouse",
    phone: "+1 (555) 204-1133",
  },
  primaryDoctor: "Dr. Sarah Chen",
  allergies: ["Penicillin", "Sulfa drugs"],
  chronicConditions: ["Hypertension", "Type 2 Diabetes"],
};

const vitalHistory = [
  { date: "Apr 20, 2026", bp: "142/88", hr: 76, temp: 36.8, weight: 72, respiratory: 16, oxygen: 98 },
  { date: "Apr 13, 2026", bp: "148/92", hr: 78, temp: 36.7, weight: 72.5, respiratory: 16, oxygen: 97 },
  { date: "Apr 6, 2026", bp: "145/90", hr: 80, temp: 36.9, weight: 73, respiratory: 17, oxygen: 98 },
  { date: "Mar 30, 2026", bp: "150/94", hr: 82, temp: 37.0, weight: 73.2, respiratory: 16, oxygen: 96 },
];

const prescriptions = [
  {
    id: 1,
    drug: "Amlodipine",
    dose: "10mg",
    frequency: "Once daily",
    startDate: "Jan 10, 2026",
    endDate: "Jul 10, 2026",
    prescribedBy: "Dr. Sarah Chen",
    status: "active",
  },
  {
    id: 2,
    drug: "Metformin",
    dose: "500mg",
    frequency: "Twice daily",
    startDate: "Dec 5, 2025",
    endDate: "Jun 5, 2026",
    prescribedBy: "Dr. Sarah Chen",
    status: "active",
  },
  {
    id: 3,
    drug: "Losartan",
    dose: "50mg",
    frequency: "Once daily",
    startDate: "Jan 10, 2026",
    endDate: "Jul 10, 2026",
    prescribedBy: "Dr. Sarah Chen",
    status: "active",
  },
  {
    id: 4,
    drug: "Atorvastatin",
    dose: "20mg",
    frequency: "Once daily at night",
    startDate: "Nov 2, 2025",
    endDate: "Feb 2, 2026",
    prescribedBy: "Dr. James Rivera",
    status: "completed",
  },
];

const labResults = [
  { id: 1, testName: "HbA1c", value: "7.2", unit: "%", referenceRange: "< 5.7", status: "high", date: "Apr 18, 2026", orderedBy: "Dr. Sarah Chen" },
  { id: 2, testName: "Fasting Glucose", value: "142", unit: "mg/dL", referenceRange: "70-100", status: "high", date: "Apr 18, 2026", orderedBy: "Dr. Sarah Chen" },
  { id: 3, testName: "Total Cholesterol", value: "195", unit: "mg/dL", referenceRange: "< 200", status: "normal", date: "Apr 18, 2026", orderedBy: "Dr. Sarah Chen" },
  { id: 4, testName: "LDL", value: "118", unit: "mg/dL", referenceRange: "< 100", status: "high", date: "Apr 18, 2026", orderedBy: "Dr. Sarah Chen" },
  { id: 5, testName: "HDL", value: "52", unit: "mg/dL", referenceRange: "> 40", status: "normal", date: "Apr 18, 2026", orderedBy: "Dr. Sarah Chen" },
  { id: 6, testName: "Creatinine", value: "0.9", unit: "mg/dL", referenceRange: "0.7-1.3", status: "normal", date: "Apr 18, 2026", orderedBy: "Dr. Sarah Chen" },
];

const medicalHistory = [
  {
    id: 1,
    date: "Jan 10, 2026",
    condition: "Hypertension Stage 2",
    diagnosis: "Essential (primary) hypertension",
    treatedBy: "Dr. Sarah Chen",
    notes: "Patient presented with sustained BP readings >140/90. Started on dual antihypertensive therapy.",
    type: "diagnosis",
  },
  {
    id: 2,
    date: "Dec 5, 2025",
    condition: "Type 2 Diabetes Mellitus",
    diagnosis: "Type 2 diabetes mellitus without complications",
    treatedBy: "Dr. Sarah Chen",
    notes: "HbA1c: 7.8%. Fasting glucose consistently elevated. Diet modification and Metformin initiated.",
    type: "diagnosis",
  },
  {
    id: 3,
    date: "Aug 22, 2020",
    condition: "Appendectomy",
    diagnosis: "Acute appendicitis",
    treatedBy: "Dr. Michael Torres",
    notes: "Emergency laparoscopic appendectomy performed. No complications. Discharged after 2 days.",
    type: "surgery",
  },
];

const statusConfig = {
  active: { label: "Active", color: "#22C55E", bg: "#DCFCE7", icon: CheckCircle },
  completed: { label: "Completed", color: "#64748B", bg: "#F1F5F9", icon: CheckCircle },
  discontinued: { label: "Discontinued", color: "#EF4444", bg: "#FEE2E2", icon: XCircle },
};

const labStatusConfig = {
  normal: { label: "Normal", color: "#22C55E", bg: "#DCFCE7", icon: CheckCircle },
  high: { label: "High", color: "#EF4444", bg: "#FEE2E2", icon: TrendingUp },
  low: { label: "Low", color: "#F59E0B", bg: "#FEF3C7", icon: TrendingDown },
};

export function MedicalRecordPage() {
  const [activeTab, setActiveTab] = useState("overview");
  const [showAddVital, setShowAddVital] = useState(false);
  const [showAddPrescription, setShowAddPrescription] = useState(false);
  // const [showAddVital, setShowAddVital] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState(null)
  // const [patients, setPatients] = useState([]);
  const [patients, setPatient] = useState(null);
  const [vitals, setVitals] = useState([]);
  const [prescriptions, setPrescriptions] = useState([]);
  const { patient_id } = useParams()
  console.log("patient_id", patient_id)
  console.log("prescriptions", prescriptions)
  const [vitalForm, setVitalForm] = useState({
    date: "",
    bp: "",
    hr: "",
    temp: "",
    weight: "",
    respiratory: "",
    oxygen: "",
  });
  const fetchMedicalRecord = async () => {
    try {
      const res = await API.get(`/vitals/medical/${patient_id}`);

      setPatient(res.data.patient);
      setVitals(res.data.vitals);
      setPrescriptions(res.data.prescriptions);

    } catch (error) {
      toast.error("Failed to fetch medical record");
    }
  };

  useEffect(() => {
    fetchMedicalRecord();
  }, [patient_id]);

  const tabs = [
    { id: "overview", label: "Overview", icon: User },
    { id: "vitals", label: "Vitals", icon: Activity },
    { id: "prescriptions", label: "Prescriptions", icon: Pill },
    { id: "labs", label: "Lab Results", icon: FileText },
    { id: "history", label: "Medical History", icon: Clock },
  ];

  const latestVitals = vitalHistory[0];

  return (
    <div className="min-h-screen flex" style={{ fontFamily: "'Inter', sans-serif", backgroundColor: "#F8FAFC" }}>

      <div className="flex-1 flex flex-col min-h-screen">
        <main className="flex-1 p-3 sm:p-6 lg:p-8 mt-16 sm:mt-20">
          {/* Patient Header */}
          {/* ================= HEADER ================= */}
          <div className="bg-white rounded-2xl p-4 sm:p-6 mb-6 shadow-sm">
            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">

              {/* LEFT */}
              <div className="flex flex-col sm:flex-row items-start gap-4 sm:gap-5">

                <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl flex items-center justify-center bg-[#E0F7FA] shrink-0">
                  <User className="w-8 h-8 sm:w-10 sm:h-10 text-[#0E7490]" />
                </div>

                <div>
                  <h2 className="text-lg sm:text-xl lg:text-2xl font-extrabold text-slate-900 capitalize">
                    {`${patients?.first_name} ${patients?.last_name}`}
                  </h2>

                  <div className="flex flex-wrap gap-2 sm:gap-4 mt-2 text-xs sm:text-sm text-slate-600">
                    <span>{calculateAge(patients?.date_of_birth)} yrs • {patients?.gender}</span>
                    <span className="hidden sm:inline">•</span>
                    <span>Blood: {patientInfo.bloodType}</span>
                    <span className="hidden sm:inline">•</span>
                    <span>DOB: {formatDate(patients?.date_of_birth)}</span>
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mt-3 text-xs sm:text-sm text-slate-600">
                    <div className="flex items-center gap-1.5">
                      <Phone className="w-4 h-4" />
                      <span>+(220) {patients?.phone}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Mail className="w-4 h-4" />
                      <span className="break-all">{patients?.email}</span>
                    </div>
                  </div>

                  <div className="mt-3 flex flex-wrap gap-2">
                    <div className="px-3 py-1.5 rounded-lg text-xs bg-red-100 text-red-600 font-semibold">
                      <AlertTriangle className="w-3 h-3 inline mr-1" />
                      Allergies: {patientInfo.allergies.join(", ")}
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>

          {/* Tabs */}
          {/* ================= TABS ================= */}
          <div className="bg-white rounded-2xl mb-6 shadow-sm">

            <div className="flex flex-col sm:flex-row sm:flex-wrap gap-2 p-2 border-b border-slate-100">

              {tabs.map((tab) => {
                const isActive = activeTab === tab.id;

                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className="flex items-center gap-2 px-4 py-3 rounded-xl transition-all w-full sm:w-auto justify-start sm:justify-center"
                    style={{
                      backgroundColor: isActive ? "#0E7490" : "transparent",
                      color: isActive ? "#fff" : "#64748B",
                      fontWeight: isActive ? 700 : 600,
                      fontSize: 13,
                    }}
                  >
                    <tab.icon className="w-4 h-4" />
                    <span className="text-sm">{tab.label}</span>
                  </button>
                );
              })}

            </div>

          </div>

          {/* Overview Tab */}
          {activeTab === "overview" && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">

              {/* ================= LEFT: VITALS ================= */}
              <div className="lg:col-span-2 bg-white rounded-2xl p-4 sm:p-6 shadow-sm">

                <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-4">
                  Latest Vitals
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">

                  {[
                    { label: "Blood Pressure", value: latestVitals.bp, unit: "mmHg", icon: Heart, color: "#EF4444" },
                    { label: "Heart Rate", value: latestVitals.hr, unit: "bpm", icon: Activity, color: "#F59E0B" },
                    { label: "Temperature", value: latestVitals.temp, unit: "°C", icon: Thermometer, color: "#22C55E" },
                    { label: "Weight", value: latestVitals.weight, unit: "kg", icon: Weight, color: "#0E7490" },
                    { label: "Respiratory", value: latestVitals.respiratory, unit: "bpm", icon: Activity, color: "#8B5CF6" },
                    { label: "O2 Saturation", value: latestVitals.oxygen, unit: "%", icon: Droplets, color: "#06B6D4" },
                  ].map((vital) => (
                    <div
                      key={vital.label}
                      className="p-3 sm:p-4 rounded-xl bg-slate-50"
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <vital.icon
                          className="w-4 h-4 flex-shrink-0"
                          style={{ color: vital.color }}
                        />
                        <p className="text-[11px] sm:text-xs text-slate-500 font-semibold leading-tight">
                          {vital.label}
                        </p>
                      </div>

                      <p className="text-lg sm:text-2xl font-extrabold text-slate-900">
                        {vital.value}{" "}
                        <span className="text-xs sm:text-sm text-slate-500 font-normal">
                          {vital.unit}
                        </span>
                      </p>
                    </div>
                  ))}

                </div>

                <p className="text-[11px] sm:text-xs text-slate-500 mt-3">
                  Last updated: {latestVitals.date}
                </p>
              </div>

              {/* ================= RIGHT: INFO CARDS ================= */}
              <div className="space-y-4 sm:space-y-6">

                {/* Primary Doctor */}
                <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-sm">

                  <h3 className="text-sm sm:text-base font-bold text-slate-900 mb-3">
                    Primary Doctor
                  </h3>

                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center bg-[#E0F7FA] flex-shrink-0">
                      <Stethoscope className="w-5 h-5 sm:w-6 sm:h-6 text-[#0E7490]" />
                    </div>

                    <div className="min-w-0">
                      <p className="text-sm sm:text-base font-bold text-slate-900 truncate">
                        {patientInfo.primaryDoctor}
                      </p>
                      <p className="text-xs sm:text-sm text-slate-500">
                        Internal Medicine
                      </p>
                    </div>
                  </div>
                </div>

                {/* Chronic Conditions */}
                <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-sm">

                  <h3 className="text-sm sm:text-base font-bold text-slate-900 mb-3">
                    Chronic Conditions
                  </h3>

                  <div className="flex flex-wrap gap-2">
                    {patientInfo.chronicConditions.map((cond) => (
                      <span
                        key={cond}
                        className="px-2 sm:px-3 py-1 rounded-lg text-[11px] sm:text-xs font-semibold bg-yellow-100 text-yellow-700"
                      >
                        {cond}
                      </span>
                    ))}
                  </div>
                </div>

              </div>

            </div>
          )}
          {/* Vitals Tab */}
          {activeTab === "vitals" && (
            <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-sm">

              {/* Header */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
                <h3 className="text-base sm:text-lg font-bold text-slate-900">
                  Vital Signs History
                </h3>

                <button
                  onClick={() => setShowAddVital(true)}
                  className="w-full sm:w-auto px-4 py-2 rounded-xl flex items-center justify-center gap-2 bg-[#0E7490] text-white font-semibold text-sm"
                >
                  <Plus className="w-4 h-4" />
                  Add Reading
                </button>
              </div>

              {/* ================= DESKTOP TABLE ================= */}
              <div className="hidden md:block overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-slate-100">
                      <th className="text-left py-3 px-4 text-xs text-slate-500 font-semibold">Date</th>
                      <th className="text-left py-3 px-4 text-xs text-slate-500 font-semibold">BP</th>
                      <th className="text-left py-3 px-4 text-xs text-slate-500 font-semibold">HR</th>
                      <th className="text-left py-3 px-4 text-xs text-slate-500 font-semibold">Temp</th>
                      <th className="text-left py-3 px-4 text-xs text-slate-500 font-semibold">Weight</th>
                      <th className="text-left py-3 px-4 text-xs text-slate-500 font-semibold">Resp</th>
                      <th className="text-left py-3 px-4 text-xs text-slate-500 font-semibold">O2</th>
                    </tr>
                  </thead>

                  <tbody>
                    {vitals?.length > 0 ? (
                      vitals.map((vital, idx) => (
                        <tr key={idx} className="border-b border-slate-50 hover:bg-slate-50">
                          <td className="py-4 px-4 text-sm font-semibold text-slate-700">
                            {formatDate(vital?.recorded_at)}
                          </td>
                          <td className="py-4 px-4 text-sm">{vital?.blood_pressure}</td>
                          <td className="py-4 px-4 text-sm">{vital?.heart_rate}</td>
                          <td className="py-4 px-4 text-sm">{vital?.temperature}</td>
                          <td className="py-4 px-4 text-sm">{vital?.weight}</td>
                          <td className="py-4 px-4 text-sm">{vital?.respiratory_rate}</td>
                          <td className="py-4 px-4 text-sm">{vital?.oxygen_saturation}</td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="7" className="py-10 text-center text-slate-400">
                          No vital records yet
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

              {/* ================= MOBILE CARDS ================= */}
              <div className="grid grid-cols-1 gap-4 md:hidden">
                {vitals?.length > 0 ? (
                  vitals.map((vital, idx) => (
                    <div
                      key={idx}
                      className="p-4 rounded-xl border border-slate-100 bg-slate-50"
                    >
                      <p className="text-sm font-bold text-slate-900 mb-3">
                        {formatDate(vital?.recorded_at)}
                      </p>

                      <div className="grid grid-cols-2 gap-3 text-sm">
                        <div>
                          <p className="text-slate-500 text-xs">BP</p>
                          <p className="font-semibold">{vital?.blood_pressure}</p>
                        </div>

                        <div>
                          <p className="text-slate-500 text-xs">HR</p>
                          <p className="font-semibold">{vital?.heart_rate}</p>
                        </div>

                        <div>
                          <p className="text-slate-500 text-xs">Temp</p>
                          <p className="font-semibold">{vital?.temperature}</p>
                        </div>

                        <div>
                          <p className="text-slate-500 text-xs">Weight</p>
                          <p className="font-semibold">{vital?.weight}</p>
                        </div>

                        <div>
                          <p className="text-slate-500 text-xs">Resp</p>
                          <p className="font-semibold">{vital?.respiratory_rate}</p>
                        </div>

                        <div>
                          <p className="text-slate-500 text-xs">O2</p>
                          <p className="font-semibold">{vital?.oxygen_saturation}</p>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-center text-slate-400 text-sm py-10">
                    No vital records yet
                  </p>
                )}
              </div>

            </div>
          )}
          {showAddVital && (
            <VitalForm
              setVitalForm={setVitalForm}
              vitalForm={vitalForm}
              setShowAddVital={setShowAddVital}
              patient_id={patient_id}
              onSuccess={fetchMedicalRecord}
            // setVitalHistory={setVitalHistory}

            />
          )}
          {/* Prescriptions Tab */}
          {activeTab === "prescriptions" && (
            <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-sm">

              {/* Header */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
                <h3 className="text-base sm:text-lg font-bold text-slate-900">
                  Prescriptions
                </h3>

                <button
                  onClick={() => setShowAddPrescription(true)}
                  className="w-full sm:w-auto px-4 py-2 rounded-xl flex items-center justify-center gap-2 bg-[#0E7490] text-white font-semibold text-sm"
                >
                  <Plus className="w-4 h-4" />
                  Add Prescription
                </button>
              </div>

              {/* ================= DESKTOP / TABLET VIEW ================= */}
              <div className="hidden md:block space-y-3">

                {prescriptions.map((rx) => {
                  const cfg = statusConfig[rx.status];

                  return (
                    <div
                      key={rx.id}
                      className="p-4 rounded-xl border border-slate-100 hover:shadow-md transition-all"
                    >
                      <div className="flex items-start justify-between gap-4">

                        <div className="flex-1">

                          {/* Drug + Status */}
                          <div className="flex flex-wrap items-center gap-3 mb-2">
                            <h4 className="text-base font-bold text-slate-900 capitalize">
                              {rx.drug}
                            </h4>

                            <div
                              className="px-2.5 py-1 rounded-lg text-xs flex items-center gap-1"
                              style={{
                                backgroundColor: cfg.bg,
                                color: cfg.color,
                                fontWeight: 600,
                              }}
                            >
                              <cfg.icon className="w-3 h-3" />
                              {cfg.label}
                            </div>
                          </div>

                          {/* Details */}
                          <div className="grid grid-cols-3 gap-4 text-sm text-slate-600">
                            <p>
                              <span className="text-slate-500">Dose:</span>{" "}
                              <span className="font-semibold">{rx.dose}</span>
                            </p>

                            <p>
                              <span className="text-slate-500">Frequency:</span>{" "}
                              <span className="font-semibold capitalize">
                                {rx.frequency}
                              </span>
                            </p>

                            <p>
                              <span className="text-slate-500">Prescribed by:</span>{" "}
                              <span className="font-semibold capitalize">
                                Dr. {rx.prescribed_by}
                              </span>
                            </p>
                          </div>

                          {/* Dates */}
                          <p className="text-xs text-slate-500 mt-2">
                            Start: {formatDate(rx.start_date)} • End:{" "}
                            {formatDate(rx.end_date)}
                          </p>
                        </div>

                        <button className="p-2 rounded-lg hover:bg-slate-100 transition-all">
                          <Eye className="w-4 h-4 text-slate-400" />
                        </button>
                      </div>
                    </div>
                  );
                })}

              </div>

              {/* ================= MOBILE VIEW ================= */}
              <div className="grid grid-cols-1 gap-4 md:hidden">

                {prescriptions.map((rx) => {
                  const cfg = statusConfig[rx.status];

                  return (
                    <div
                      key={rx.id}
                      className="p-4 rounded-xl border border-slate-100 bg-slate-50"
                    >
                      {/* Drug + Status */}
                      <div className="flex items-start justify-between gap-2 mb-3">
                        <h4 className="text-sm font-bold text-slate-900 capitalize">
                          {rx.drug}
                        </h4>

                        <div
                          className="px-2 py-1 rounded-lg text-[10px] flex items-center gap-1"
                          style={{
                            backgroundColor: cfg.bg,
                            color: cfg.color,
                            fontWeight: 600,
                          }}
                        >
                          <cfg.icon className="w-3 h-3" />
                          {cfg.label}
                        </div>
                      </div>

                      {/* Info stacked */}
                      <div className="grid grid-cols-2 gap-3 text-xs text-slate-600">
                        <div>
                          <p className="text-slate-500">Dose</p>
                          <p className="font-semibold">{rx.dose}</p>
                        </div>

                        <div>
                          <p className="text-slate-500">Frequency</p>
                          <p className="font-semibold capitalize">{rx.frequency}</p>
                        </div>

                        <div className="col-span-2">
                          <p className="text-slate-500">Prescribed by</p>
                          <p className="font-semibold capitalize">
                            Dr. {rx.prescribed_by}
                          </p>
                        </div>
                      </div>

                      {/* Dates */}
                      <p className="text-[11px] text-slate-500 mt-3">
                        {formatDate(rx.start_date)} → {formatDate(rx.end_date)}
                      </p>

                      {/* Action */}
                      <div className="flex justify-end mt-3">
                        <button className="p-2 rounded-lg bg-white border hover:bg-slate-100">
                          <Eye className="w-4 h-4 text-slate-400" />
                        </button>
                      </div>
                    </div>
                  );
                })}

              </div>

            </div>
          )}
          {/* prescription form */}
          {
            showAddPrescription && (
              <PrescriptionForm
                patient_id={patient_id}
                setShowAddPrescription={setShowAddPrescription}
                onSuccess={fetchMedicalRecord}


              />
            )
          }
          {/* Lab Results Tab */}
          {activeTab === "labs" && (
            <div className="bg-white rounded-2xl p-6" style={{ boxShadow: "0 4px 20px rgba(0,0,0,0.05)" }}>
              <div className="flex items-center justify-between mb-6">
                <h3 style={{ fontSize: 18, fontWeight: 700, color: "#0F172A" }}>Lab Results</h3>
                <button className="px-4 py-2 rounded-xl flex items-center gap-2 transition-all" style={{ backgroundColor: "#0E7490", color: "#fff", fontWeight: 600, fontSize: 13 }}>
                  <Upload className="w-4 h-4" />
                  Upload Results
                </button>
              </div>
              <div className="space-y-3">
                {labResults.map((lab) => {
                  const cfg = labStatusConfig[lab.status];
                  return (
                    <div key={lab.id} className="p-4 rounded-xl border border-slate-100 hover:shadow-md transition-all">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h4 style={{ fontSize: 15, fontWeight: 700, color: "#0F172A" }}>{lab.testName}</h4>
                            <div className="px-2.5 py-1 rounded-lg text-xs flex items-center gap-1" style={{ backgroundColor: cfg.bg, color: cfg.color, fontWeight: 600 }}>
                              <cfg.icon className="w-3 h-3" />
                              {cfg.label}
                            </div>
                          </div>
                          <div className="grid grid-cols-4 gap-4 text-sm text-slate-600">
                            <div>
                              <span className="text-slate-500">Result:</span>{" "}
                              <span className="font-semibold" style={{ color: cfg.color }}>{lab.value} {lab.unit}</span>
                            </div>
                            <div>
                              <span className="text-slate-500">Reference:</span> <span className="font-semibold">{lab.referenceRange}</span>
                            </div>
                            <div>
                              <span className="text-slate-500">Date:</span> <span className="font-semibold">{lab.date}</span>
                            </div>
                            <div>
                              <span className="text-slate-500">Ordered by:</span> <span className="font-semibold">{lab.orderedBy}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Medical History Tab */}
          {activeTab === "history" && (
            <div className="bg-white rounded-2xl p-6" style={{ boxShadow: "0 4px 20px rgba(0,0,0,0.05)" }}>
              <h3 style={{ fontSize: 18, fontWeight: 700, color: "#0F172A", marginBottom: 24 }}>Medical History</h3>
              <div className="relative">
                <div className="absolute left-6 top-0 bottom-0 w-0.5" style={{ backgroundColor: "#E2E8F0" }} />
                <div className="space-y-6">
                  {medicalHistory.map((item) => (
                    <div key={item.id} className="relative pl-16">
                      <div className="absolute left-0 w-12 h-12 rounded-full flex items-center justify-center" style={{ backgroundColor: "#F0F9FF", border: "3px solid #0E7490" }}>
                        <Calendar className="w-5 h-5" style={{ color: "#0E7490" }} />
                      </div>
                      <div className="bg-slate-50 rounded-xl p-5">
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <h4 style={{ fontSize: 16, fontWeight: 700, color: "#0F172A" }}>{item.condition}</h4>
                            <p className="text-sm text-slate-600 mt-1">{item.diagnosis}</p>
                          </div>
                          <div className="px-3 py-1.5 rounded-lg text-xs capitalize" style={{ backgroundColor: "#E0F7FA", color: "#0E7490", fontWeight: 600 }}>
                            {item.type}
                          </div>
                        </div>
                        <p className="text-sm text-slate-700 mb-3">{item.notes}</p>
                        <div className="flex items-center gap-4 text-xs text-slate-500">
                          <div className="flex items-center gap-1.5">
                            <Calendar className="w-3.5 h-3.5" />
                            <span>{item.date}</span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <Stethoscope className="w-3.5 h-3.5" />
                            <span>{item.treatedBy}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
export default MedicalRecordPage