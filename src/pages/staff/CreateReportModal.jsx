import { useState, useEffect } from "react";
import API from "../../api/axios";
import toast from "react-hot-toast";
import { useAuth } from "../../context/AuthContext";

const CreateReportModal = ({ patient, appointment, onClose, onSuccess,patientId }) => {
  const { user } = useAuth();

  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    report_title: "",
    chief_complaint: "",
    diagnosis: "",
    treatment_plan: "",
    recommendations: "",

    report_type: appointment ? "appointment" : "general",
    appointment_id: appointment ? appointment.id : null
  });

  // 🔥 auto update if appointment changes
  useEffect(() => {
    if (appointment) {
      setForm((prev) => ({
        ...prev,
        report_type: "appointment",
        appointment_id: appointment.id
      }));
    }
  }, [appointment]);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const payload = {
        patient_id: patientId,
        doctor_id: user?.staff_id || user?.id, // ⚠️ adjust depending on your auth
        appointment_id: form.report_type === "appointment" ? form.appointment_id : null,

        report_title: form.report_title,
        chief_complaint: form.chief_complaint,
        diagnosis: form.diagnosis,
        treatment_plan: form.treatment_plan,
        recommendations: form.recommendations
      };

      await API.post("/medical-reports", payload);

      toast.success(
        form.report_type === "appointment"
          ? "Appointment report created"
          : "General report created"
      );

      if (onSuccess) onSuccess();
      onClose();

    } catch (error) {
      console.log(error);
      toast.error("Failed to create report");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4 z-50">
      <div className="bg-white w-full max-w-2xl rounded-3xl shadow-lg p-6">

        {/* HEADER */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-slate-800">
            Create Medical Report
          </h2>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200"
          >
            ✕
          </button>
        </div>

        {/* PATIENT */}
        <div className="bg-teal-50 p-3 rounded-xl mb-4">
          <p className="text-sm text-slate-500">Patient</p>
          <p className="font-semibold">
            {patient.first_name} {patient.last_name}
          </p>
        </div>

        {/* REPORT TYPE INFO */}
        <div className="mb-4 text-xs">
          {form.report_type === "appointment" ? (
            <p className="text-blue-600">
              📅 Appointment-based report
            </p>
          ) : (
            <p className="text-green-600">
              🧍 General patient report
            </p>
          )}
        </div>

        {/* FORM */}
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">

          <input
            name="report_title"
            placeholder="Report Title"
            onChange={handleChange}
            className="border p-2 rounded-xl"
          />

          <input
            name="chief_complaint"
            placeholder="Chief Complaint"
            onChange={handleChange}
            className="border p-2 rounded-xl"
          />

          <textarea
            name="diagnosis"
            placeholder="Diagnosis"
            onChange={handleChange}
            className="border p-2 rounded-xl md:col-span-2"
          />

          <textarea
            name="treatment_plan"
            placeholder="Treatment Plan"
            onChange={handleChange}
            className="border p-2 rounded-xl md:col-span-2"
          />

          <textarea
            name="recommendations"
            placeholder="Recommendations"
            onChange={handleChange}
            className="border p-2 rounded-xl md:col-span-2"
          />

          {/* BUTTONS */}
          <div className="md:col-span-2 flex gap-3">
            <button
              type="button"
              onClick={onClose}
              className="w-1/2 py-2 border rounded-xl"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="w-1/2 py-2 bg-teal-700 text-white rounded-xl"
            >
              {loading ? "Saving..." : "Save Report"}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default CreateReportModal;