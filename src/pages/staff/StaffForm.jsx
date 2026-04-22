import React, { useEffect, useState } from "react";
import { X } from "lucide-react";
import API from "../../api/axios";
import toast from "react-hot-toast";

function StaffForm({ staff, onClose, onSuccess }) {
  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    phone: "",
    role: "Doctor",
    department: "",
    specialty: "",
    schedule: "",
    rating: 5,
    status: "Active",
    license_no:"",
    address:""
  });

  const [loading, setLoading] = useState(false);

  // Load edit data
  useEffect(() => {
    if (staff) {
      setFormData({
        full_name: staff.full_name || "",
        email: staff.email || "",
        phone: staff.phone || "",
        role: staff.role || "Doctor",
        department: staff.department || "",
        specialty: staff.specialty || "",
        schedule: staff.schedule || "",
        rating: staff.rating || 5,
        status: staff.status || "Active",
        license_no:staff.license_no,
        address:staff.address
      });
    }
  }, [staff]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      if (staff) {
        await API.put(`/staff/${staff.id}`, formData);
        toast.success("Staff updated successfully");
      } else {
        await API.post("/staff", formData);
        toast.success("Staff added successfully");
      }

      onSuccess();
    } catch (error) {
      toast.error("Failed to save staff");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex justify-center items-center p-4">
      <div className="bg-white w-full max-w-3xl rounded-2xl shadow-xl p-6 relative max-h-[95vh] overflow-y-auto">
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-slate-500 hover:text-red-500"
        >
          <X size={20} />
        </button>

        {/* Title */}
        <h2 className="text-2xl font-bold text-slate-800 mb-6">
          {staff ? "Edit Staff Member" : "Add New Staff"}
        </h2>

        {/* Form */}
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Full Name */}
          <div>
            <label className="block text-sm font-medium mb-1">Full Name</label>
            <input
              type="text"
              name="full_name"
              placeholder="Enter full name"
              value={formData.full_name}
              onChange={handleChange}
              required
              className="w-full border rounded-xl px-4 py-2 border-slate-200 bg-slate-50 focus:ring-teal-200 focus:border-teal-400"
            />
          </div>
          {/* address */}
          <div>
            <label className="block text-sm font-medium mb-1 capitalize">address</label>
            <input
              type="text"
              name="address"
              placeholder="Enter address"
              value={formData.address}
              onChange={handleChange}
              required
              className="w-full border rounded-xl px-4 py-2 border-slate-200 bg-slate-50 focus:ring-teal-200 focus:border-teal-400"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              name="email"
              placeholder="Enter email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full border rounded-xl px-4 py-2 border-slate-200 bg-slate-50 focus:ring-teal-200 focus:border-teal-400"
            />
          </div>

          {/* Phone */}
          <div>
            <label className="block text-sm font-medium mb-1">Phone</label>
            <input
              type="text"
              placeholder="Enter phone number"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              className="w-full border rounded-xl px-4 py-2 border-slate-200 bg-slate-50 focus:ring-teal-200 focus:border-teal-400"
            />
          </div>

          {/* Role */}
          <div>
            <label className="block text-sm font-medium mb-1 border-slate-200 bg-slate-50 focus:ring-teal-200 focus:border-teal-400">Role</label>
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="w-full border rounded-xl px-4 py-2 border-slate-200 bg-slate-50 focus:ring-teal-200 focus:border-teal-400"
            >
              <option>Doctor</option>
              <option>Nurse</option>
              <option>Pharmacist</option>
              <option>Lab Technician</option>
            </select>
          </div>

          {/* Department */}
          <div>
            <label className="block text-sm font-medium mb-1">Department</label>
            <input
              type="text"
              placeholder="Enter department"
              name="department"
              value={formData.department}
              onChange={handleChange}
              className="w-full border rounded-xl px-4 py-2 border-slate-200 bg-slate-50 focus:ring-teal-200 focus:border-teal-400"
            />
          </div>

          {/* Specialty */}
          <div>
            <label className="block text-sm font-medium mb-1">Specialty</label>
            <input
              type="text"
              placeholder="e.g Microbiology"
              name="specialty"
              value={formData.specialty}
              onChange={handleChange}
              className="w-full border rounded-xl px-4 py-2 border-slate-200 bg-slate-50 focus:ring-teal-200 focus:border-teal-400"
            />
          </div>
        {/* licens_no */}
          <div>
            <label className="block text-sm font-medium mb-1 capitalize">license number</label>
            <input
              type="text"
              placeholder="Enter license number"
              name="license_no"
              value={formData.license_no}
              onChange={handleChange}
              required
              className="w-full border rounded-xl px-4 py-2 border-slate-200 bg-slate-50 focus:ring-teal-200 focus:border-teal-400"
            />
          </div>
          {/* Schedule */}
          <div>
            <label className="block text-sm font-medium mb-1">Schedule</label>
            <input
              type="text"
              name="schedule"
              placeholder="Mon-Fri 8AM - 5PM"
              value={formData.schedule}
              onChange={handleChange}
              className="w-full border rounded-xl px-4 py-2 border-slate-200 bg-slate-50 focus:ring-teal-200 focus:border-teal-400"
            />
          </div>

          {/* Rating */}
          <div>
            <label className="block text-sm font-medium mb-1">Rating</label>
            <input
              type="number"
              name="rating"
              min="1"
              max="5"
              step="0.1"
              value={formData.rating}
              onChange={handleChange}
              className="w-full border rounded-xl px-4 py-2 border-slate-200 bg-slate-50 focus:ring-teal-200 focus:border-teal-400"
            />
          </div>

          {/* Status */}
          <div>
            <label className="block text-sm font-medium mb-1">Status</label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full border rounded-xl px-4 py-2 border-slate-200 bg-slate-50 focus:ring-teal-200 focus:border-teal-400"
            >
              <option>Active</option>
              <option>Busy</option>
              <option>Leave</option>
              <option>Inactive</option>
            </select>
          </div>

          {/* Buttons */}
          <div className="md:col-span-2 flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2 rounded-xl border"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2 rounded-xl bg-cyan-700 text-white hover:bg-cyan-800"
            >
              {loading
                ? "Saving..."
                : staff
                ? "Update Staff"
                : "Add Staff"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default StaffForm;