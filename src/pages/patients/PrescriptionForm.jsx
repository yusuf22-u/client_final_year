import React, { useState } from "react";
import { X } from "lucide-react";
import API from "../../api/axios";
import toast from "react-hot-toast";

function PrescriptionForm({
  patient_id,
  setShowAddPrescription,
  onSuccess
}) {
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [prescriptionForm, setPrescriptionForm]=useState({
        drug: "",
        dose: "",
        frequency: "",
        startDate: "",
        endDate: "",
        prescribedBy: "",
        status: "active",
  })

  // handle input
  const handleChange = (e) => {
    setPrescriptionForm({
      ...prescriptionForm,
      [e.target.name]: e.target.value,
    });

    setErrors({
      ...errors,
      [e.target.name]: "",
    });
  };

  // validation
  const validate = () => {
    let newErrors = {};

    if (!prescriptionForm.drug)
      newErrors.drug = "Medicine name is required";

    if (!prescriptionForm.dose)
      newErrors.dose = "Dosage is required";

    if (!prescriptionForm.frequency)
      newErrors.frequency = "Frequency is required";

    if (!prescriptionForm.startDate)
      newErrors.startDate = "Start date required";

    if (!prescriptionForm.prescribedBy)
      newErrors.prescribedBy = "Doctor name required";

    if (!prescriptionForm.status)
      newErrors.status = "Status required";

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  // submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    try {
      setLoading(true);

      await API.post("/presription", {
        patient_id,
        drug: prescriptionForm.drug,
        dose: prescriptionForm.dose,
        frequency: prescriptionForm.frequency,
        start_date: prescriptionForm.startDate,
        end_date: prescriptionForm.endDate,
        prescribed_by: prescriptionForm.prescribedBy,
        status: prescriptionForm.status,
      });

      toast.success("Prescription added successfully");
      if (onSuccess) {
   await onSuccess();
}
      setPrescriptionForm({
        drug: "",
        dose: "",
        frequency: "",
        startDate: "",
        endDate: "",
        prescribedBy: "",
        status: "active",
      });

      setShowPrescription(false);
    } catch (error) {
      console.log(error);
      toast.error("Failed to save prescription");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4 z-50">
      <div className="bg-white w-full max-w-2xl rounded-3xl shadow-lg relative max-h-[90vh] overflow-y-auto">

        {/* Header */}
        <div className="sticky top-0 bg-white z-10 px-6 py-5 border-b flex justify-between items-center rounded-t-3xl">
          <h2 className="text-lg font-semibold text-gray-800">
            Add Prescription
          </h2>

          <button
            onClick={() => setShowAddPrescription(false)}
            className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6">

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

            {/* Drug */}
            <div>
              <label className="text-sm text-gray-600">
                Medicine Name
              </label>
              <input
                type="text"
                name="drug"
                placeholder="Amlodipine"
                value={prescriptionForm.drug}
                onChange={handleChange}
                className="w-full mt-1 border bg-gray-50 border-gray-200 rounded-xl px-3 py-3"
              />
              {errors.drug && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.drug}
                </p>
              )}
            </div>

            {/* Dose */}
            <div>
              <label className="text-sm text-gray-600">
                Dosage
              </label>
              <input
                type="text"
                name="dose"
                placeholder="10mg"
                value={prescriptionForm.dose}
                onChange={handleChange}
                className="w-full mt-1 border bg-gray-50 border-gray-200 rounded-xl px-3 py-3"
              />
              {errors.dose && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.dose}
                </p>
              )}
            </div>

            {/* Frequency */}
            <div>
              <label className="text-sm text-gray-600">
                Frequency
              </label>
              <input
                type="text"
                name="frequency"
                placeholder="Once daily"
                value={prescriptionForm.frequency}
                onChange={handleChange}
                className="w-full mt-1 border bg-gray-50 border-gray-200 rounded-xl px-3 py-3"
              />
              {errors.frequency && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.frequency}
                </p>
              )}
            </div>

            {/* Doctor */}
            <div>
              <label className="text-sm text-gray-600">
                Prescribed By
              </label>
              <input
                type="text"
                name="prescribedBy"
                placeholder="Dr. Sarah Chen"
                value={prescriptionForm.prescribedBy}
                onChange={handleChange}
                className="w-full mt-1 border bg-gray-50 border-gray-200 rounded-xl px-3 py-3"
              />
              {errors.prescribedBy && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.prescribedBy}
                </p>
              )}
            </div>

            {/* Start Date */}
            <div>
              <label className="text-sm text-gray-600">
                Start Date
              </label>
              <input
                type="date"
                name="startDate"
                value={prescriptionForm.startDate}
                onChange={handleChange}
                className="w-full mt-1 border bg-gray-50 border-gray-200 rounded-xl px-3 py-3"
              />
              {errors.startDate && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.startDate}
                </p>
              )}
            </div>

            {/* End Date */}
            <div>
              <label className="text-sm text-gray-600">
                End Date
              </label>
              <input
                type="date"
                name="endDate"
                value={prescriptionForm.endDate}
                onChange={handleChange}
                className="w-full mt-1 border bg-gray-50 border-gray-200 rounded-xl px-3 py-3"
              />
            </div>

            {/* Status full width */}
            <div className="md:col-span-2">
              <label className="text-sm text-gray-600">
                Status
              </label>
              <select
                name="status"
                value={prescriptionForm.status}
                onChange={handleChange}
                className="w-full mt-1 border bg-gray-50 border-gray-200 rounded-xl px-3 py-3"
              >
                <option value="active">Active</option>
                <option value="completed">Completed</option>
                <option value="discontinued">Discontinued</option>
              </select>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 pt-6">
            <button
              type="button"
              onClick={() => setShowAddPrescription(false)}
              className="w-full sm:w-1/2 py-3 rounded-xl border border-gray-200 text-gray-600 hover:bg-gray-100"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="w-full sm:w-1/2 py-3 rounded-xl bg-teal-700 text-white"
            >
              {loading ? "Saving..." : "Save Prescription"}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}

export default PrescriptionForm;