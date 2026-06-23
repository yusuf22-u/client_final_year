import React, { useState, useEffect } from "react";
import * as Yup from "yup";
import API from "../../api/axios";
import toast from "react-hot-toast";

// Validation
const assignSchema = Yup.object().shape({
  doctor_id: Yup.number()
    .typeError("Doctor is required")
    .required("Doctor is required"),

  assignment_type: Yup.string()
    .oneOf(["primary", "secondary"])
    .required("Assignment type is required"),

  condition_state: Yup.string()
    .required("Condition is required")
    .min(3, "Too short"),

  status: Yup.string()
    .oneOf(["stable", "critical", "monitoring", "improving"])
    .required("Status is required"),

  notes: Yup.string().max(500, "Notes too long"),
});

const AssignDoctor = ({
  selectedPatient,
  setAssignModal,
  form,
  setForm,
  onSuccess,
}) => {
  const [errors, setErrors] = useState({});
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch doctors
  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const res = await API.get("/staff");
        const onlyDoctors =
          (res.data.data || res.data).filter((d) => d.role === "doctor") ||
          [];
        setDoctors(onlyDoctors);
      } catch (error) {
        toast.error("Failed to fetch doctors");
      }
    };

    fetchDoctors();
  }, []);

  // Submit
  const handleAssign = async (e) => {
    e.preventDefault();

    try {
      await assignSchema.validate(form, { abortEarly: false });

      setErrors({});
      setLoading(true);

      await API.post("/patient-records/assign-doctor", {
        patient_id: selectedPatient.id,
        ...form,
      });

      toast.success("Doctor assigned successfully");

      if (onSuccess) onSuccess();
      setAssignModal(false);

      setForm({
        doctor_id: "",
        assignment_type: "primary",
        condition_state: "",
        status: "stable",
        notes: "",
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
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-3 z-50">
      {/* MODAL */}
      <div className="bg-white w-full max-w-3xl rounded-3xl shadow-lg p-4 md:p-6 max-h-[90vh] overflow-y-auto">

        {/* HEADER */}
        <div className="flex justify-between items-center mb-5">
          <h2 className="text-lg font-semibold text-gray-800">
            Assign Doctor
          </h2>

          <button
            onClick={() => setAssignModal(false)}
            className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200"
          >
            ✕
          </button>
        </div>

        {/* PATIENT */}
        <div className="bg-teal-50 rounded-2xl p-4 mb-5">
          <p className="text-sm text-gray-500">Patient</p>
          <p className="font-semibold text-gray-800 capitalize">
            {selectedPatient?.first_name} {selectedPatient?.last_name}
          </p>
        </div>

        {/* FORM */}
        <form onSubmit={handleAssign} className="space-y-5">

          {/* GRID FIELDS */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

            {/* Doctor */}
            <div>
              <label className="text-sm text-gray-600">Doctor</label>
              <select
                value={form.doctor_id}
                onChange={(e) =>
                  setForm({ ...form, doctor_id: Number(e.target.value) })
                }
                className="w-full mt-1 border border-gray-200 bg-gray-50 rounded-xl px-3 py-2"
              >
                <option value="">Select doctor</option>
                {doctors.map((d) => (
                  <option key={d.id} value={d.id}>
                    Dr. {d.first_name} {d.last_name}
                  </option>
                ))}
              </select>

              {errors.doctor_id && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.doctor_id}
                </p>
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
                className="w-full mt-1 border border-gray-200 bg-gray-50 rounded-xl px-3 py-2"
              >
                <option value="stable">Stable</option>
                <option value="critical">Critical</option>
                <option value="monitoring">Monitoring</option>
                <option value="improving">Improving</option>
              </select>
            </div>

            {/* Condition */}
            <div>
              <label className="text-sm text-gray-600">Condition</label>
              <input
                type="text"
                value={form.condition_state}
                placeholder="e.g. Fever, Injury"
                onChange={(e) =>
                  setForm({
                    ...form,
                    condition_state: e.target.value,
                  })
                }
                className="w-full mt-1 border border-gray-200 bg-gray-50 rounded-xl px-3 py-2"
              />

              {errors.condition_state && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.condition_state}
                </p>
              )}
            </div>

            {/* Assignment Type */}
<div>
  <label className="block text-sm text-gray-600 mb-2">
    Assignment Type
  </label>

  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">

    {/* PRIMARY */}
    <button
      type="button"
      onClick={() =>
        setForm({ ...form, assignment_type: "primary" })
      }
      className={`p-3 rounded-xl border text-left transition ${
        form.assignment_type === "primary"
          ? "border-teal-600 bg-teal-50"
          : "border-gray-200"
      }`}
    >
      <p className="font-semibold text-gray-800">
        Primary Doctor
      </p>

      <p className="text-xs text-gray-500 mt-1">
        Main doctor responsible for the patient’s overall care
      </p>
    </button>

    {/* SECONDARY */}
    <button
      type="button"
      onClick={() =>
        setForm({ ...form, assignment_type: "secondary" })
      }
      className={`p-3 rounded-xl border text-left transition ${
        form.assignment_type === "secondary"
          ? "border-teal-600 bg-teal-50"
          : "border-gray-200"
      }`}
    >
      <p className="font-semibold text-gray-800">
        Secondary Doctor
      </p>

      <p className="text-xs text-gray-500 mt-1">
        Specialist or supporting doctor for specific conditions
      </p>
    </button>
  </div>

  {/* Warning for primary */}
  {form.assignment_type === "primary" && (
    <div className="mt-3 bg-amber-50 border border-amber-200 rounded-xl p-3">
      <p className="text-xs text-amber-700">
        ⚠ Assigning a new primary doctor will replace the current primary doctor for this patient.
      </p>
    </div>
  )}
</div>
          </div>

          {/* NOTES FULL WIDTH */}
          <div>
            <label className="text-sm text-gray-600">Notes</label>
            <textarea
              rows={4}
              value={form.notes}
              placeholder="Add notes..."
              onChange={(e) =>
                setForm({ ...form, notes: e.target.value })
              }
              className="w-full mt-1 border border-gray-200 bg-gray-50 rounded-xl px-3 py-2 resize-none"
            />
          </div>

          {/* BUTTONS */}
          <div className="flex flex-col-reverse sm:flex-row gap-3 pt-2">
            <button
              type="button"
              onClick={() => setAssignModal(false)}
              className="w-full sm:w-1/2 py-3 rounded-xl border border-gray-200"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="w-full sm:w-1/2 py-3 rounded-xl bg-teal-700 text-white font-semibold"
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