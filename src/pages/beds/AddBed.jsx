import { useState } from "react";
import API from "../../api/axios";
import toast from "react-hot-toast";

const AddBedModal = ({ isOpen, onClose, onSuccess }) => {
  const [form, setForm] = useState({
    bed_number: "",
    ward: "",
    status: "available",
    patient_id: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const payload = {
        ...form,
        patient_id: form.patient_id ? Number(form.patient_id) : null,
      };

      const res = await API.post("/beds", payload);

      if (res.data?.success || res.data?.Status) {
        toast.success("Bed added successfully");
        onSuccess?.();
        onClose();
      }
    } catch (error) {
      toast.error(error.response?.data?.error || "Failed to add bed");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-white w-full max-w-lg rounded-2xl shadow-xl p-6">
        
        {/* Header */}
        <div className="flex justify-between items-center mb-5">
          <h2 className="text-xl font-bold text-gray-800">Add New Bed</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-red-500 text-xl"
          >
            ✕
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">

          {/* Bed Number */}
          <div>
            <label className="text-sm font-medium text-gray-600">
              Bed Number
            </label>
            <input
              name="bed_number"
              value={form.bed_number}
              onChange={handleChange}
              placeholder="e.g. B-101"
              className="w-full mt-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              required
            />
          </div>

          {/* Ward */}
          <div>
            <label className="text-sm font-medium text-gray-600">
              Ward
            </label>
            <input
              name="ward"
              value={form.ward}
              onChange={handleChange}
              placeholder="e.g. General, ICU"
              className="w-full mt-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              required
            />
          </div>

          {/* Status */}
          <div>
            <label className="text-sm font-medium text-gray-600">
              Status
            </label>
            <select
              name="status"
              value={form.status}
              onChange={handleChange}
              className="w-full mt-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            >
              <option value="available">Available</option>
              <option value="occupied">Occupied</option>
              <option value="cleaning">Cleaning</option>
              <option value="maintenance">Maintenance</option>
            </select>
          </div>

         

          {/* Buttons */}
          <div className="flex justify-end gap-3 pt-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="px-5 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50"
            >
              {loading ? "Saving..." : "Add Bed"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddBedModal;