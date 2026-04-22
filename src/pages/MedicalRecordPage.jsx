import { useState } from "react";
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
} from "lucide-react";


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

  const tabs = [
    { id: "overview" , label: "Overview", icon: User },
    { id: "vitals" , label: "Vitals", icon: Activity },
    { id: "prescriptions" , label: "Prescriptions", icon: Pill },
    { id: "labs" , label: "Lab Results", icon: FileText },
    { id: "history" , label: "Medical History", icon: Clock },
  ];

  const latestVitals = vitalHistory[0];

  return (
    <div className="min-h-screen flex" style={{ fontFamily: "'Inter', sans-serif", backgroundColor: "#F8FAFC" }}>
     
      <div className="ml-55 flex-1 flex flex-col min-h-screen">
        
        <main className="flex-1 p-8 mt-6">
          {/* Patient Header */}
          <div className="bg-white rounded-2xl p-6 mb-6" style={{ boxShadow: "0 4px 20px rgba(0,0,0,0.05)" }}>
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-5">
                <div className="w-20 h-20 rounded-2xl flex items-center justify-center" style={{ backgroundColor: "#E0F7FA" }}>
                  <User className="w-10 h-10" style={{ color: "#0E7490" }} />
                </div>
                <div>
                  <h2 style={{ fontSize: 24, fontWeight: 800, color: "#0F172A" }}>{patientInfo.name}</h2>
                  <div className="flex items-center gap-4 mt-2 text-sm text-slate-600">
                    <span>{patientInfo.age} years • {patientInfo.gender}</span>
                    <span>•</span>
                    <span>Blood Type: {patientInfo.bloodType}</span>
                    <span>•</span>
                    <span>DOB: {patientInfo.dob}</span>
                  </div>
                  <div className="flex items-center gap-4 mt-3 text-sm">
                    <div className="flex items-center gap-1.5 text-slate-600">
                      <Phone className="w-4 h-4" />
                      <span>{patientInfo.phone}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-slate-600">
                      <Mail className="w-4 h-4" />
                      <span>{patientInfo.email}</span>
                    </div>
                  </div>
                  <div className="mt-3 flex items-center gap-2">
                    <div className="px-3 py-1.5 rounded-lg text-xs" style={{ backgroundColor: "#FEE2E2", color: "#DC2626", fontWeight: 600 }}>
                      <AlertTriangle className="w-3 h-3 inline mr-1" />
                      Allergies: {patientInfo.allergies.join(", ")}
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button className="px-4 py-2 rounded-xl border-2 border-slate-200 flex items-center gap-2 text-slate-700 transition-all hover:bg-slate-50" style={{ fontWeight: 600, fontSize: 13 }}>
                  <Download className="w-4 h-4" />
                  Export
                </button>
                <button className="px-4 py-2 rounded-xl flex items-center gap-2 transition-all" style={{ backgroundColor: "#0E7490", color: "#fff", fontWeight: 600, fontSize: 13 }}>
                  <Edit3 className="w-4 h-4" />
                  Edit Record
                </button>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="bg-white rounded-2xl mb-6" style={{ boxShadow: "0 4px 20px rgba(0,0,0,0.05)" }}>
            <div className="flex items-center gap-2 p-2 border-b border-slate-100">
              {tabs.map((tab) => {
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl transition-all"
                    style={{
                      backgroundColor: isActive ? "#0E7490" : "transparent",
                      color: isActive ? "#fff" : "#64748B",
                      fontWeight: isActive ? 700 : 600,
                      fontSize: 14,
                    }}
                  >
                    <tab.icon className="w-4 h-4" />
                    {tab.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Overview Tab */}
          {activeTab === "overview" && (
            <div className="grid grid-cols-3 gap-6">
              {/* Current Vitals */}
              <div className="col-span-2 bg-white rounded-2xl p-6" style={{ boxShadow: "0 4px 20px rgba(0,0,0,0.05)" }}>
                <h3 style={{ fontSize: 18, fontWeight: 700, color: "#0F172A", marginBottom: 16 }}>Latest Vitals</h3>
                <div className="grid grid-cols-3 gap-4">
                  {[
                    { label: "Blood Pressure", value: latestVitals.bp, unit: "mmHg", icon: Heart, color: "#EF4444" },
                    { label: "Heart Rate", value: latestVitals.hr, unit: "bpm", icon: Activity, color: "#F59E0B" },
                    { label: "Temperature", value: latestVitals.temp, unit: "°C", icon: Thermometer, color: "#22C55E" },
                    { label: "Weight", value: latestVitals.weight, unit: "kg", icon: Weight, color: "#0E7490" },
                    { label: "Respiratory", value: latestVitals.respiratory, unit: "bpm", icon: Activity, color: "#8B5CF6" },
                    { label: "O2 Saturation", value: latestVitals.oxygen, unit: "%", icon: Droplets, color: "#06B6D4" },
                  ].map((vital) => (
                    <div key={vital.label} className="p-4 rounded-xl" style={{ backgroundColor: "#F8FAFC" }}>
                      <div className="flex items-center gap-2 mb-2">
                        <vital.icon className="w-4 h-4" style={{ color: vital.color }} />
                        <p className="text-xs text-slate-500" style={{ fontWeight: 600 }}>{vital.label}</p>
                      </div>
                      <p style={{ fontSize: 22, fontWeight: 800, color: "#0F172A" }}>
                        {vital.value} <span className="text-sm text-slate-500 font-normal">{vital.unit}</span>
                      </p>
                    </div>
                  ))}
                </div>
                <p className="text-xs text-slate-500 mt-3">Last updated: {latestVitals.date}</p>
              </div>

              {/* Quick Info */}
              <div className="space-y-6">
                <div className="bg-white rounded-2xl p-6" style={{ boxShadow: "0 4px 20px rgba(0,0,0,0.05)" }}>
                  <h3 style={{ fontSize: 16, fontWeight: 700, color: "#0F172A", marginBottom: 12 }}>Primary Doctor</h3>
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ backgroundColor: "#E0F7FA" }}>
                      <Stethoscope className="w-6 h-6" style={{ color: "#0E7490" }} />
                    </div>
                    <div>
                      <p style={{ fontSize: 15, fontWeight: 700, color: "#0F172A" }}>{patientInfo.primaryDoctor}</p>
                      <p className="text-sm text-slate-500">Internal Medicine</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-2xl p-6" style={{ boxShadow: "0 4px 20px rgba(0,0,0,0.05)" }}>
                  <h3 style={{ fontSize: 16, fontWeight: 700, color: "#0F172A", marginBottom: 12 }}>Chronic Conditions</h3>
                  <div className="space-y-2">
                    {patientInfo.chronicConditions.map((cond) => (
                      <div key={cond} className="px-3 py-2 rounded-lg" style={{ backgroundColor: "#FEF3C7" }}>
                        <p className="text-sm" style={{ fontWeight: 600, color: "#F59E0B" }}>{cond}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Vitals Tab */}
          {activeTab === "vitals" && (
            <div className="bg-white rounded-2xl p-6" style={{ boxShadow: "0 4px 20px rgba(0,0,0,0.05)" }}>
              <div className="flex items-center justify-between mb-6">
                <h3 style={{ fontSize: 18, fontWeight: 700, color: "#0F172A" }}>Vital Signs History</h3>
                <button
                  onClick={() => setShowAddVital(true)}
                  className="px-4 py-2 rounded-xl flex items-center gap-2 transition-all"
                  style={{ backgroundColor: "#0E7490", color: "#fff", fontWeight: 600, fontSize: 13 }}
                >
                  <Plus className="w-4 h-4" />
                  Add Reading
                </button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-slate-100">
                      <th className="text-left py-3 px-4 text-xs text-slate-500" style={{ fontWeight: 600 }}>Date</th>
                      <th className="text-left py-3 px-4 text-xs text-slate-500" style={{ fontWeight: 600 }}>BP (mmHg)</th>
                      <th className="text-left py-3 px-4 text-xs text-slate-500" style={{ fontWeight: 600 }}>HR (bpm)</th>
                      <th className="text-left py-3 px-4 text-xs text-slate-500" style={{ fontWeight: 600 }}>Temp (°C)</th>
                      <th className="text-left py-3 px-4 text-xs text-slate-500" style={{ fontWeight: 600 }}>Weight (kg)</th>
                      <th className="text-left py-3 px-4 text-xs text-slate-500" style={{ fontWeight: 600 }}>Resp (bpm)</th>
                      <th className="text-left py-3 px-4 text-xs text-slate-500" style={{ fontWeight: 600 }}>O2 (%)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {vitalHistory.map((vital, idx) => (
                      <tr key={idx} className="border-b border-slate-50 hover:bg-slate-50 transition-colors">
                        <td className="py-4 px-4 text-sm text-slate-700" style={{ fontWeight: 600 }}>{vital.date}</td>
                        <td className="py-4 px-4 text-sm text-slate-800">{vital.bp}</td>
                        <td className="py-4 px-4 text-sm text-slate-800">{vital.hr}</td>
                        <td className="py-4 px-4 text-sm text-slate-800">{vital.temp}</td>
                        <td className="py-4 px-4 text-sm text-slate-800">{vital.weight}</td>
                        <td className="py-4 px-4 text-sm text-slate-800">{vital.respiratory}</td>
                        <td className="py-4 px-4 text-sm text-slate-800">{vital.oxygen}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Prescriptions Tab */}
          {activeTab === "prescriptions" && (
            <div className="bg-white rounded-2xl p-6" style={{ boxShadow: "0 4px 20px rgba(0,0,0,0.05)" }}>
              <div className="flex items-center justify-between mb-6">
                <h3 style={{ fontSize: 18, fontWeight: 700, color: "#0F172A" }}>Prescriptions</h3>
                <button
                  onClick={() => setShowAddPrescription(true)}
                  className="px-4 py-2 rounded-xl flex items-center gap-2 transition-all"
                  style={{ backgroundColor: "#0E7490", color: "#fff", fontWeight: 600, fontSize: 13 }}
                >
                  <Plus className="w-4 h-4" />
                  Add Prescription
                </button>
              </div>
              <div className="space-y-3">
                {prescriptions.map((rx) => {
                  const cfg = statusConfig[rx.status];
                  return (
                    <div key={rx.id} className="p-4 rounded-xl border border-slate-100 hover:shadow-md transition-all">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h4 style={{ fontSize: 16, fontWeight: 700, color: "#0F172A" }}>{rx.drug}</h4>
                            <div className="px-2.5 py-1 rounded-lg text-xs flex items-center gap-1" style={{ backgroundColor: cfg.bg, color: cfg.color, fontWeight: 600 }}>
                              <cfg.icon className="w-3 h-3" />
                              {cfg.label}
                            </div>
                          </div>
                          <div className="grid grid-cols-3 gap-4 text-sm text-slate-600">
                            <div>
                              <span className="text-slate-500">Dose:</span> <span className="font-semibold">{rx.dose}</span>
                            </div>
                            <div>
                              <span className="text-slate-500">Frequency:</span> <span className="font-semibold">{rx.frequency}</span>
                            </div>
                            <div>
                              <span className="text-slate-500">Prescribed by:</span> <span className="font-semibold">{rx.prescribedBy}</span>
                            </div>
                          </div>
                          <div className="flex items-center gap-4 mt-2 text-xs text-slate-500">
                            <span>Start: {rx.startDate}</span>
                            <span>•</span>
                            <span>End: {rx.endDate}</span>
                          </div>
                        </div>
                        <button className="p-2 rounded-lg hover:bg-slate-100 transition-all">
                          <Eye className="w-4 h-4 text-slate-400" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

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