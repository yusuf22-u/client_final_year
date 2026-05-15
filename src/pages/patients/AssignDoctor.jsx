import React, { useState, useEffect } from "react";
import * as Yup from "yup";
import API from "../../api/axios";
import toast from "react-hot-toast";

const assignSchema = Yup.object().shape({
  doctor_id: Yup.number()
    .typeError("Doctor is required")
    .required("Doctor is required"),

  condition_state: Yup.string()
    .required("Condition is required")
    .min(3, "Too short"),

  status: Yup.string()
    .oneOf(["stable", "critical", "monitoring", "improving"])
    .required("Status is required"),

  notes: Yup.string().max(500, "Notes too long")
});

const AssignDoctor = ({ selectedPatient, setAssignModal,form, setForm,onSuccess }) => {

 

  const [errors, setErrors] = useState({});
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(false);

  // ✅ Fetch doctors
  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const res = await API.get("/staff");
        setDoctors(res.data.data || res.data); // handle both cases
      } catch (error) {
        toast.error("Failed to fetch doctors");
      }
    };

    fetchDoctors();
  }, []);

  // ✅ Handle Submit
  const handleAssign = async (e) => {
    e.preventDefault();

    try {
      // Validate form
      await assignSchema.validate(form, { abortEarly: false });

      setErrors({});
      setLoading(true);

      await API.post("/patient-records/assign-doctor", {
        patient_id: selectedPatient.id,
        ...form
      });

      toast.success("Doctor assigned successfully");
      
if (onSuccess) onSuccess();
      setAssignModal(false);

      // Reset form
      setForm({
        doctor_id: "",
        condition_state: "",
        status: "stable",
        notes: ""
      });

    } catch (err) {

      if (err.name === "ValidationError") {
        const newErrors = {};
        err.inner.forEach((e) => {
          newErrors[e.path] = e.message;
        });
        setErrors(newErrors);
      } else {
        toast.error("Failed to assign doctor");
      }

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4 z-50">
      <div className="bg-white w-full max-w-md rounded-3xl shadow-lg p-6 relative">

        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-semibold text-gray-800">
            Assign Doctor
          </h2>

          <button
            onClick={() => setAssignModal(false)}
            className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 transition"
          >
            ✕
          </button>
        </div>

        {/* Patient Card */}
        <div className="bg-teal-50 rounded-2xl p-4 mb-5">
          <p className="text-sm text-gray-500">Patient</p>
          <p className="font-semibold text-gray-800 capitalize">
            {selectedPatient?.first_name} {selectedPatient?.last_name}
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleAssign} className="space-y-4">

          {/* Doctor Select */}
          <div>
            <label className="text-sm text-gray-600">Doctor</label>
            <select
              value={form.doctor_id}
              onChange={(e) =>
                setForm({ ...form, doctor_id: Number(e.target.value) })
              }
              className="w-full mt-1 border border-gray-200 bg-gray-50 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
            >
              <option value="">Select doctor</option>
              {doctors.map((d) => (
                <option key={d.id} value={d.id}>
                  Dr. {d.first_name} {d.last_name}
                </option>
              ))}
            </select>
            {errors.doctor_id && (
              <p className="text-red-500 text-xs mt-1">{errors.doctor_id}</p>
            )}
          </div>

          {/* Condition */}
          <div>
            <label className="text-sm text-gray-600">Condition</label>
            <input
              type="text"
              value={form.condition_state}
              placeholder="e.g. Fever, Injury"
              onChange={(e) =>
                setForm({ ...form, condition_state: e.target.value })
              }
              className="w-full mt-1 border border-gray-200 bg-gray-50 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
            {errors.condition_state && (
              <p className="text-red-500 text-xs mt-1">{errors.condition_state}</p>
            )}
          </div>

          {/* Status */}
          <div>
            <label className="text-sm text-gray-600">Status</label>
            <select
              value={form.status}
              onChange={(e) =>
                setForm({ ...form, status: e.target.value })
              }
              className="w-full mt-1 border border-gray-200 bg-gray-50 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
            >
              <option value="stable">Stable</option>
              <option value="critical">Critical</option>
              <option value="monitoring">Monitoring</option>
              <option value="improving">Improving</option>
            </select>
            {errors.status && (
              <p className="text-red-500 text-xs mt-1">{errors.status}</p>
            )}
          </div>

          {/* Notes */}
          <div>
            <label className="text-sm text-gray-600">Notes</label>
            <textarea
              value={form.notes}
              placeholder="Add notes..."
              onChange={(e) =>
                setForm({ ...form, notes: e.target.value })
              }
              className="w-full mt-1 border border-gray-200 bg-gray-50 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
            {errors.notes && (
              <p className="text-red-500 text-xs mt-1">{errors.notes}</p>
            )}
          </div>

          {/* Buttons */}
          <div className="flex gap-3 pt-3">
            <button
              type="button"
              onClick={() => setAssignModal(false)}
              className="w-1/2 py-3 rounded-xl border border-gray-200 text-gray-600 hover:bg-gray-100 transition"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="w-1/2 py-3 rounded-xl bg-teal-700 text-white font-semibold hover:bg-teal-800 transition disabled:opacity-50"
            >
              {loading ? "Assigning..." : "Assign Doctor"}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default AssignDoctor;