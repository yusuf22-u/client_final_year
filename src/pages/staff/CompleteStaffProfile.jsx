import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import API from "../../api/axios";
import {
  Building,
  Stethoscope,
  BadgeCheck,
  MapPin,
  Briefcase,
  ArrowRight,
} from "lucide-react";

export default function CompleteStaffProfile() {
  const navigate = useNavigate();

  const [department, setDepartment] = useState("");
  const [specialty, setSpecialty] = useState("");
  const [schedule, setSchedule] = useState("");
  const [license, setLicense] = useState("");
  const [address, setAddress] = useState("");

  const isValid =
    department && specialty && license && address;

  const handleSubmit = async () => {
    try {
      const userId = localStorage.getItem("userId");

      await API.post("/staff/createStaffProfile", {
        user_id: userId,
        department,
        specialty,
        schedule,
        license_no: license,
        address,
      });

      toast.success("Staff profile completed");
      navigate("/");
    } catch (err) {
      toast.error("Failed to save staff profile");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 p-6">

      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-xl overflow-hidden">

        {/* HEADER */}
        <div className="bg-teal-600 text-white p-6">
          <div className="flex items-center gap-3">
            <Stethoscope size={26} />
            <div>
              <h2 className="text-xl font-bold">Staff Profile Setup</h2>
              <p className="text-sm text-teal-100">
                Complete your professional details
              </p>
            </div>
          </div>
        </div>

        {/* FORM */}
        <div className="p-6 space-y-4">

          {/* Department */}
          <div>
            <label className="text-sm font-medium flex items-center gap-2">
              <Building size={16} /> Department
            </label>
            <input
              className="w-full mt-1 border rounded-xl p-3 focus:ring-2 focus:ring-teal-500 outline-none"
              placeholder="e.g. Cardiology"
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
            />
          </div>

          {/* Specialty */}
          <div>
            <label className="text-sm font-medium flex items-center gap-2">
              <Stethoscope size={16} /> Specialty
            </label>
            <input
              className="w-full mt-1 border rounded-xl p-3 focus:ring-2 focus:ring-teal-500 outline-none"
              placeholder="e.g. Heart Specialist"
              value={specialty}
              onChange={(e) => setSpecialty(e.target.value)}
            />
          </div>

          {/* Schedule */}
          <div>
            <label className="text-sm font-medium flex items-center gap-2">
              <Briefcase size={16} /> Schedule (Optional)
            </label>
            <input
              className="w-full mt-1 border rounded-xl p-3 focus:ring-2 focus:ring-teal-500 outline-none"
              placeholder="e.g. Mon-Fri 8AM-4PM"
              value={schedule}
              onChange={(e) => setSchedule(e.target.value)}
            />
          </div>

          {/* License */}
          <div>
            <label className="text-sm font-medium flex items-center gap-2">
              <BadgeCheck size={16} /> License Number
            </label>
            <input
              className="w-full mt-1 border rounded-xl p-3 focus:ring-2 focus:ring-teal-500 outline-none"
              placeholder="Enter license number"
              value={license}
              onChange={(e) => setLicense(e.target.value)}
            />
          </div>

          {/* Address */}
          <div>
            <label className="text-sm font-medium flex items-center gap-2">
              <MapPin size={16} /> Address
            </label>
            <textarea
              className="w-full mt-1 border rounded-xl p-3 h-24 resize-none focus:ring-2 focus:ring-teal-500 outline-none"
              placeholder="Hospital or workplace address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>

          {/* BUTTON */}
          <button
            onClick={handleSubmit}
            disabled={!isValid}
            className="w-full mt-4 bg-teal-600 text-white py-3 rounded-xl flex items-center justify-center gap-2
            hover:bg-teal-700 transition disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Complete Profile
            <ArrowRight size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}