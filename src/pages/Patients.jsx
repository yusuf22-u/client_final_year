import React, { useEffect, useState } from "react";
import { Plus, Edit, Trash2 } from "lucide-react";
import API from "../api/axios.js";
import PatientForm from "../components/PatientForm.jsx";

function Patients() {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editingPatient, setEditingPatient] = useState(null);
  const [serverError, setServerError] = useState("");

  // fetch patients
  const fetchPatients = async () => {
    setLoading(true);
    try {
      const res = await API.get("/patients");
      setPatients(res.data);
      console.log("patient",res.data)
      setServerError("");
    } catch (error) {
      setServerError(error.response?.data?.message || "Failed to fetch patients");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPatients();
  }, []);

  const handleAddClick = () => {
    setEditingPatient(null);
    setShowForm(true);
  };

  const handleEditClick = (patient) => {
    setEditingPatient(patient);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this patient?")) return;
    try {
      await API.delete(`/patients/${id}`);
      setPatients(patients.filter((p) => p.id !== id));
    } catch (error) {
      setServerError(error.response?.data?.message || "Failed to delete patient");
    }
  };

  const handleFormSubmit = (updated) => {
    if (editingPatient) {
      setPatients(
        patients.map((p) => (p.id === updated.id ? updated : p))
      );
    } else {
      setPatients([updated, ...patients]);
    }
    setShowForm(false);
  };

  return (
    <div className="p-6 bg-background min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-slate-800">Patients</h1>
        <button
          onClick={handleAddClick}
          className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-xl hover:bg-primary-dark transition-colors"
        >
          <Plus size={16} />
          Add Patient
        </button>
      </div>

      {serverError && (
        <p className="text-red-500 mb-4">{serverError}</p>
      )}

      {loading ? (
        <div className="text-center py-10">Loading patients...</div>
      ) : (
        <div className="overflow-x-auto bg-white shadow rounded-xl">
          <table className="min-w-full divide-y divide-slate-200">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-4 py-2 text-left text-xs font-medium text-slate-500 uppercase">
                  Profile
                </th>
                <th className="px-4 py-2 text-left text-xs font-medium text-slate-500 uppercase">
                  Name
                </th>
                <th className="px-4 py-2 text-left text-xs font-medium text-slate-500 uppercase">
                  Email
                </th>
                <th className="px-4 py-2 text-left text-xs font-medium text-slate-500 uppercase">
                  Phone
                </th>
                <th className="px-4 py-2 text-left text-xs font-medium text-slate-500 uppercase">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {patients.map((patient) => (
                <tr key={patient.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-4 py-2">
                    <div className="w-10 h-10 rounded-full overflow-hidden bg-slate-200 flex items-center justify-center text-white font-bold">
                      {patient.profile_image ? (
                        <img
                          src={`http://localhost:4000/uploads/${patient.profile_image}`}
                          alt="profile"
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        `${patient.first_name[0] || ""}${patient.last_name[0] || ""}`
                      )}
                    </div>
                  </td>
                  <td className="px-4 py-2">{patient.first_name} {patient.last_name}</td>
                  <td className="px-4 py-2">{patient.email}</td>
                  <td className="px-4 py-2">{patient.phone}</td>
                  <td className="px-4 py-2 flex gap-2">
                    <button
                      onClick={() => handleEditClick(patient)}
                      className="p-2 bg-yellow-400 text-white rounded-xl hover:bg-yellow-500 transition-colors"
                    >
                      <Edit size={16} />
                    </button>
                    <button
                      onClick={() => handleDelete(patient.id)}
                      className="p-2 bg-red-500 text-white rounded-xl hover:bg-red-600 transition-colors"
                    >
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Modal Form */}
      {showForm && (
        <PatientForm
          patient={editingPatient}
          onClose={() => setShowForm(false)}
          onSubmit={handleFormSubmit}
        />
      )}
    </div>
  );
}

export default Patients;