import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import API from "../../api/axios";
import { useAuth } from "../../context/AuthContext";
import {
  User,
  Mail,
  Lock,
  Phone,
  MapPin,
  Calendar,
  Briefcase,
  HeartPulse,
  Eye,
  EyeOff,
  CheckCircle,
  ArrowRight,
  Building,
  Shield,
  AlertCircle,
} from "lucide-react";

export default function CompletePatientProfile() {
  const navigate = useNavigate();

  const [gender, setGender] = useState("");
  const [dob, setDob] = useState("");
  const [address, setAddress] = useState("");
  const [insurance, setInsurance] = useState("");
  const [medicalRecord, setMedicalRecord] = useState("");
  const [assignedStaff, setAssignedStaff] = useState("");



  const handleSubmit = async () => {
    try {
      const userId = localStorage.getItem("userId");

      if (!gender || !dob || !address) {
        return toast.error("Please fill required fields");
      }

      await API.post("/patients/create", {
        user_id: userId,
        gender,
        date_of_birth: dob,
        address,
        insurance,
        medical_record_number: medicalRecord,
        assigned_staff_id: assignedStaff || null,
      });

      toast.success("Patient profile completed");
      navigate("/");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to save profile");
    }
  };

  return (
  <div className="min-h-screen flex flex-col lg:flex-row bg-slate-50 p-6 gap-6 items-center justify-center">

    {/* LEFT / TOP: PRIVACY INFO PANEL */}
    <div className="w-full lg:w-1/2 bg-primary text-white rounded-2xl p-8 shadow-xl">

      <div className="flex items-center gap-3 mb-6">
        <Shield className="w-8 h-8" />
        <h2 className="text-xl font-bold">Your Privacy Matters</h2>
      </div>

      <p className="text-sm leading-relaxed text-teal-50 mb-4">
        Your medical and personal information is protected under strict healthcare privacy standards.
        Only authorized medical staff can access your data when necessary for treatment.
      </p>

      <div className="space-y-4 text-sm text-teal-100">
        <div className="flex gap-2">
          <CheckCircle className="w-4 h-4 mt-1" />
          <p>All data is encrypted and securely stored</p>
        </div>

        <div className="flex gap-2">
          <CheckCircle className="w-4 h-4 mt-1" />
          <p>We do not share your information with third parties</p>
        </div>

        <div className="flex gap-2">
          <CheckCircle className="w-4 h-4 mt-1" />
          <p>Only licensed healthcare professionals can access records</p>
        </div>

        <div className="flex gap-2">
          <CheckCircle className="w-4 h-4 mt-1" />
          <p>You control your data and can request updates anytime</p>
        </div>
      </div>

      <div className="mt-6 p-4 rounded-xl">
        <p className="text-xs text-teal-100">
          ⚠️ Your information is used strictly for healthcare purposes such as diagnosis,
          treatment, and emergency care coordination.
        </p>
      </div>
    </div>

    {/* RIGHT / BOTTOM: YOUR EXISTING FORM (UNCHANGED) */}
    <div className="w-full lg:w-1/2 flex items-center justify-center">
      <div className="w-full max-w-lg bg-white rounded-2xl shadow-xl p-8">

        {/* ===== YOUR ORIGINAL FORM STARTS HERE (UNCHANGED) ===== */}

        <h2 className="text-2xl font-bold text-center text-slate-800 mb-6">
          Complete Patient Profile
        </h2>

        {/* Gender */}
        <select
          className="w-full border p-3 mb-3 rounded-xl"
          value={gender}
          onChange={(e) => setGender(e.target.value)}
        >
          <option value="">Select Gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>

        {/* DOB */}
        <div>
          <label className="block text-sm text-slate-700 mb-2" style={{ fontWeight: 600 }}>
            Date of Birth *
          </label>
          <div className="relative">
            <Calendar className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="date"
              value={dob}
              onChange={(e) => setDob(e.target.value)}
              className="w-full pl-10 pr-4 py-3 text-sm border border-slate-200 rounded-xl bg-slate-50 text-slate-700 focus:outline-none focus:border-teal-400 focus:bg-white transition-all"
            />
          </div>
        </div>

        {/* Address */}
        <div>
          <label className="block text-sm text-slate-700 mb-2" style={{ fontWeight: 600 }}>
            Address *
          </label>
          <div className="relative">
            <MapPin className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            <textarea
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Enter your full address"
              className="w-full pl-10 pr-4 py-3 text-sm border border-slate-200 rounded-xl bg-slate-50 text-slate-700 focus:outline-none focus:border-teal-400 focus:bg-white transition-all resize-none"
              rows={3}
            />
          </div>
        </div>

        {/* Insurance */}
        <div>
          <label className="block text-sm text-slate-700 mb-2" style={{ fontWeight: 600 }}>
            Insurance
          </label>
          <input
            value={insurance}
            onChange={(e) => setInsurance(e.target.value)}
            placeholder="Insurance Provider"
            className="w-full pl-4 pr-4 py-3 text-sm border border-slate-200 rounded-xl bg-slate-50"
          />
        </div>

        {/* Medical Record */}
        <div>
          <label className="block text-sm text-slate-700 mb-2" style={{ fontWeight: 600 }}>
            Medical Record Number
          </label>
          <input
            value={medicalRecord}
            onChange={(e) => setMedicalRecord(e.target.value)}
            placeholder="Medical Record Number"
            className="w-full pl-4 pr-4 py-3 text-sm border border-slate-200 rounded-xl bg-slate-50"
          />
        </div>

        {/* Button */}
        <div className="mt-4">
          <button
            onClick={handleSubmit}
            className="w-full bg-primary hover:bg-teal-700 text-white p-3 rounded-xl font-semibold transition"
          >
            Save Patient Profile
          </button>
        </div>

        {/* ===== YOUR ORIGINAL FORM ENDS HERE ===== */}

      </div>
    </div>

  </div>
);
}