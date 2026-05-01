import React, { useState, useEffect } from "react";
import { X } from "lucide-react";
import API from "../api/axios.js";


function PatientForm({ patient, onClose, onSubmit }) {
  const [formData, setFormData] = useState({
  user_id: "",   // ✅ REQUIRED
  gender: "",
  date_of_birth: "",
  medical_record_number: "",
  insurance: "",
  address: "",
});

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState("");
  const [users, setUsers] = useState([]);
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await API.get("/users");
        setUsers(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchUsers();
  }, []);

  useEffect(() => {
    if (patient) {
      setFormData({
        gender: patient.gender || "",
        date_of_birth: patient.date_of_birth?.split("T")[0] || "",
        medical_record_number: patient.medical_record_number || "",
        insurance: patient.insurance || "",
        address: patient.address || "",
        user_id: patient.user_id || "",
      });
    }
  }, [patient]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validate = () => {
    const errs = {};

    if (!formData.gender) errs.gender = "Gender is required";
    if (!formData.date_of_birth)
      errs.date_of_birth = "Date of birth is required";
    if (!formData.medical_record_number.trim())
      errs.medical_record_number = "MRN is required";
    if (!formData.insurance.trim())
      errs.insurance = "Insurance is required";
    if (!formData.address.trim())
      errs.address = "Address is required";
    if (!formData.user_id) 
      errs.user_id = "User is required";

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    setServerError("");

    try {
      let res;

      if (patient) {
        res = await API.put(`/patients/admin/${patient.id}`, formData);
      } else {
        res = await API.post("/patients", formData);
      }

      onSubmit(res.data);

    } catch (error) {
      setServerError(
        error.response?.data?.message || "Failed to save patient"
      );
      console.log("sever",error)
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="bg-white rounded-2xl w-full max-w-lg p-6 relative shadow-lg">

        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-500"
        >
          <X size={20} />
        </button>

        <h2 className="text-xl font-bold mb-4">
          {patient ? "Edit Patient Profile" : "Complete Patient Profile"}
        </h2>

        {serverError && (
          <p className="text-red-500 mb-3">{serverError}</p>
        )}

        <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="text-sm">Select User</label>
            <select
              name="user_id"
              value={formData.user_id || ""}
              onChange={handleChange}
              className="w-full border rounded-xl px-3 py-2"
            >
              <option value="">Select user</option>

              {users.map((u) => (
                <option key={u.id} value={u.id}>
                  {u.first_name} {u.last_name} ({u.email})
                </option>
              ))}
            </select>

            {errors.user_id && (
              <p className="text-red-500 text-xs">{errors.user_id}</p>
            )}
          </div>
          {/* Gender */}
          <div>
            <label className="text-sm">Gender</label>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className="w-full border rounded-xl px-3 py-2"
            >
              <option value="">Select</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
            {errors.gender && <p className="text-red-500 text-xs">{errors.gender}</p>}
          </div>

          {/* DOB */}
          <div>
            <label className="text-sm">Date of Birth</label>
            <input
              type="date"
              name="date_of_birth"
              value={formData.date_of_birth}
              onChange={handleChange}
              className="w-full border rounded-xl px-3 py-2"
            />
            {errors.date_of_birth && <p className="text-red-500 text-xs">{errors.date_of_birth}</p>}
          </div>

          {/* MRN */}
          <div>
            <label className="text-sm">Medical Record No</label>
            <input
              type="text"
              name="medical_record_number"
              value={formData.medical_record_number}
              onChange={handleChange}
              className="w-full border rounded-xl px-3 py-2"
            />
            {errors.medical_record_number && (
              <p className="text-red-500 text-xs">{errors.medical_record_number}</p>
            )}
          </div>

          {/* Insurance */}
          <div>
            <label className="text-sm">Insurance</label>
            <input
              type="text"
              name="insurance"
              value={formData.insurance}
              onChange={handleChange}
              className="w-full border rounded-xl px-3 py-2"
            />
            {errors.insurance && (
              <p className="text-red-500 text-xs">{errors.insurance}</p>
            )}
          </div>

          {/* Address */}
          <div className="sm:col-span-2">
            <label className="text-sm">Address</label>
            <textarea
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="w-full border rounded-xl px-3 py-2"
            />
            {errors.address && (
              <p className="text-red-500 text-xs">{errors.address}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="sm:col-span-2 bg-primary text-white py-3 rounded-xl mt-2"
          >
            {loading ? "Saving..." : "Save Profile"}
          </button>

        </form>
      </div>
    </div>
  );
}

export default PatientForm;