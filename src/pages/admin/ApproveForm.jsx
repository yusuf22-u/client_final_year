import React, { useState, useEffect } from "react";
import API from "../../api/axios";
import toast from "react-hot-toast";
import { X } from "lucide-react";

const ApproveForm = ({ setShowAddModal, SelectedApp,onSuccess }) => {
  const [doctor, setDoctors] = useState([]);

  const [form, setForm] = useState({
    doctor_id: "",
    location: "",
  });

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const res = await API.get("/staff");
        setDoctors(res.data.data || res.data);
      } catch (error) {
        toast.error("Failed to fetch doctors");
      }
    };

    fetchDoctors();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleApprove = async () => {
    try {
      await API.put(
        `/appointments/${SelectedApp.id}/approve`,
        form
      );

      toast.success("Appointment approved successfully");
      if (onSuccess) await onSuccess()
      setShowAddModal(false);
    } catch (error) {
      console.log(error);
      toast.error("Approval failed");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await handleApprove();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white w-full max-w-lg rounded-2xl">

        <div className="flex justify-between p-4 border-b">
          <h3>Approve Appointment</h3>

          <button onClick={() => setShowAddModal(false)}>
            <X />
          </button>
        </div>
 <div className="bg-teal-50 rounded-2xl p-4 mb-5">
          <p className="text-sm text-gray-500">Patient</p>
          <p className="font-semibold text-gray-800 capitalize">
            {SelectedApp?.patient_first_name} {SelectedApp?.patient_last_name}
          </p>
        </div>
        <form onSubmit={handleSubmit} className="p-5 space-y-4">

          <div>
            <label>Room/Location</label>
            <input
              type="text"
              name="location"
              value={form.location}
              onChange={handleChange}
              placeholder="eg Room 3"
              className="w-full border p-2 rounded"
            />
          </div>

          <div>
            <label>Doctor</label>
            <select
              name="doctor_id"
              value={form.doctor_id}
              onChange={handleChange}
              className="w-full border p-2 rounded"
            >
              <option value="">Select doctor</option>

              {doctor.map((d) => (
                <option key={d.id} value={d.id}>
                  Dr. {d.first_name} {d.last_name}
                </option>
              ))}
            </select>
          </div>

          <button
            type="submit"
            className="w-full bg-cyan-700 text-white py-3 rounded"
          >
            Approve
          </button>

        </form>
      </div>
    </div>
  );
};

export default ApproveForm;