import React, { useState, useEffect } from "react";
import PatientForm from "../../components/PatientForm";
import API from "../../api/axios";
import toast from "react-hot-toast";
import { User, Search, Plus, Eye, Edit3, X } from "lucide-react";
import ViewPatientModal from "../../components/ViewPatientModal";

import AssignDoctor from "./AssignDoctor";

function Patient() {
  const [patients, setPatients] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  const [selectedPatient, setSelectedPatient] = useState(null);
  const [viewPatient, setViewPatient] = useState(null);
  const [showViewModal, setShowViewModal] = useState(false);
  const [assignModal, setAssignModal] = useState(false);

  const [form, setForm] = useState({
  doctor_id: "",
  assignment_type: "primary",
  condition_state: "",
  status: "stable",
  notes: ""
});


  const calculateAge = (dob) => {
    const today = new Date();
    const birthDate = new Date(dob);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();

    // If birth month hasn't occurred yet this year, or same month but birth day hasn't occurred
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }

    return age;
  };

  const fetchPatients = async () => {
    try {
      const res = await API.get("/patients");
      setPatients(res.data);
    } catch (error) {
      toast.error("Failed to fetch patients");
    }
  };

  useEffect(() => {
    fetchPatients();
  }, []);


  const filteredPatients = patients.filter((p) => {
    const firstName = p.first_name?.toLowerCase() || "";
    const lastName = p.last_name?.toLowerCase() || "";
    const status = p.status?.toLowerCase() || "";

    return (
      (filterStatus === "all" || status === filterStatus) &&
      (
        firstName.includes(search.toLowerCase()) ||
        lastName.includes(search.toLowerCase()) ||
        status.includes(search.toLowerCase())
      )
    );
  });
  // card color
  const cardColor = (status) => {
    if (status === "Stable") return "rounded-lg bg-teal-100 mb-3 text-teal-600 w-12 h-12 flex items-center justify-center";
    if (status === "Critical") return "rounded-lg bg-red-100 mb-3 text-red-600 w-12 h-12 flex items-center justify-center";
    if (status === "Monitor") return "rounded-lg bg-yellow-100 mb-3 text-yellow-600 w-12 h-12 flex items-center justify-center";
    if (status === "Total Patient") return "rounded-lg bg-blue-100 mb-3 text-blue-600 w-12 h-12 flex items-center justify-center";

  }
  const TotalStable = patients.filter((p) => (p.status === "stable")).length
  const TotalCritical = patients.filter((p) => (p.status === "critical")).length
  const TotalMonitoring = patients.filter((p) => (p.status === "monitoring")).length


  return (
   <div className="p-4 sm:p-6 bg-gray-50 min-h-screen font-inter">

  <main className="flex flex-col items-center mt-8 sm:mt-12 w-full">

    {/* STATS */}
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6 w-full">

      <div className="bg-white p-4 rounded-2xl shadow flex flex-col">
        <div className={cardColor("Total Patient")}>
          <User className="w-5 h-5" />
        </div>
        <p className="text-2xl font-bold text-gray-800">{patients.length}</p>
        <p className="text-sm font-semibold text-gray-500">Total Patients</p>
      </div>

      <div className="bg-white p-4 rounded-2xl shadow flex flex-col">
        <div className={cardColor("Stable")}>
          <User className="w-5 h-5" />
        </div>
        <p className="text-2xl font-bold text-gray-800">{TotalStable}</p>
        <p className="text-sm font-semibold text-gray-500">Stable</p>
      </div>

      <div className="bg-white p-4 rounded-2xl shadow flex flex-col">
        <div className={cardColor("Monitor")}>
          <User className="w-5 h-5" />
        </div>
        <p className="text-2xl font-bold text-gray-800">{TotalMonitoring}</p>
        <p className="text-sm font-semibold text-gray-500">Monitoring</p>
      </div>

      <div className="bg-white p-4 rounded-2xl shadow flex flex-col">
        <div className={cardColor("Critical")}>
          <User className="w-5 h-5" />
        </div>
        <p className="text-2xl font-bold text-gray-800">{TotalCritical}</p>
        <p className="text-sm font-semibold text-gray-500">Critical</p>
      </div>

    </div>

    {/* TABLE CARD */}
    <div className="bg-white rounded-2xl shadow p-3 sm:p-4 flex flex-col w-full max-w-7xl">

      {/* HEADER */}
      <div className="flex flex-col lg:flex-row gap-4 lg:items-center lg:justify-between mb-4">

        <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">

          {/* SEARCH */}
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search patients..."
              className="w-full pl-9 pr-4 py-2.5 text-sm border border-gray-200 rounded-xl bg-gray-50 focus:outline-none focus:border-teal-400 focus:bg-white"
            />
          </div>

          {/* FILTER */}
          <div className="flex items-center gap-1 bg-gray-100 rounded-xl p-1 overflow-x-auto">
            {["all", "stable", "monitoring", "critical", "improving"].map((s) => (
              <button
                key={s}
                onClick={() => setFilterStatus(s)}
                className={`px-3 py-1.5 rounded-lg text-xs whitespace-nowrap capitalize transition ${
                  filterStatus === s
                    ? "bg-teal-600 text-white font-semibold"
                    : "text-gray-500 font-medium"
                }`}
              >
                {s === "all" ? "All" : s}
              </button>
            ))}
          </div>
        </div>

        {/* ADD BUTTON */}
        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center justify-center gap-2 px-4 sm:px-5 py-2.5 rounded-xl text-white text-sm bg-teal-600 hover:opacity-90 transition shadow-md w-full sm:w-auto"
        >
          <Plus className="w-4 h-4" /> Add Patient
        </button>

      </div>

      {/* TABLE WRAPPER (IMPORTANT FIX) */}
      <div className="overflow-x-auto w-full">

        <table className="min-w-[900px] w-full">

          <thead>
            <tr className="border-b border-gray-200">
              {[
                "Patient",
                "Age / Gender",
                "Condition",
                "Assigned Doctor",
                "Primary Condition",
                "Status",
                "Actions",
              ].map((h) => (
                <th
                  key={h}
                  className="text-left px-4 py-3 text-xs text-gray-400 uppercase font-semibold"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {filteredPatients.map((p) => (
              <tr
                key={p.id}
                className="border-b border-gray-100 hover:bg-gray-50 transition"
              >

                {/* PATIENT */}
                <td className="px-4 py-3 flex items-center gap-3 min-w-[200px]">
                  <div
                    className="w-9 h-9 rounded-full flex items-center justify-center text-white text-sm font-bold"
                    style={{
                      background: "linear-gradient(135deg,#0E7490,#14B8A6)",
                    }}
                  >
                    {p.first_name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")
                      .slice(0, 2)}
                  </div>

                  <div>
                    <p className="text-sm font-semibold text-gray-800 capitalize">
                      {p.first_name}
                    </p>
                    <p className="text-xs text-gray-400 capitalize">
                      {p.last_name}
                    </p>
                  </div>
                </td>

                {/* AGE */}
                <td className="px-4 py-3 text-sm text-gray-500 whitespace-nowrap">
                  {calculateAge(p.date_of_birth)} yrs · {p.gender}
                </td>

                {/* CONDITION */}
                <td className="px-4 py-3 text-sm text-gray-700 min-w-[160px]">
                  {p.address}
                </td>

                {/* DOCTOR */}
                <td className="px-4 py-3 text-sm font-semibold min-w-[200px]">
                  {p.doctor_id
                    ? `Dr. ${p.doctor_first_name} ${p.doctor_last_name}`
                    : "Not Assigned"}

                  <div className="text-xs text-gray-400">
                    {p.specialty}
                  </div>
                </td>

                {/* STATE */}
                <td className="px-4 py-3 text-sm text-gray-500 capitalize">
                  {p.condition_state || "not stated"}
                </td>

                {/* STATUS */}
                <td className="px-4 py-3">
                  <span
                    className={`px-2 py-1 rounded-lg text-xs font-semibold ${
                      p.status === "stable"
                        ? "bg-green-100 text-green-600"
                        : p.status === "critical"
                        ? "bg-red-100 text-red-600"
                        : "bg-yellow-100 text-yellow-600"
                    }`}
                  >
                    {p.status || "No status"}
                  </span>
                </td>

                {/* ACTIONS */}
                <td className="px-4 py-3 flex gap-2 min-w-[140px]">

                  <button
                    onClick={() => {
                      setViewPatient(p);
                      setShowViewModal(true);
                    }}
                    className="px-3 py-1.5 text-xs border rounded-lg hover:bg-teal-50"
                  >
                    View
                  </button>

                  <button
                    onClick={() => {
                      setSelectedPatient(p);
                      setShowAddModal(true);
                    }}
                    className="w-7 h-7 flex items-center justify-center border rounded-lg"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                  </button>

                  <button
                    onClick={() => {
                      setSelectedPatient(p);
                      setAssignModal(true);
                    }}
                    className="w-7 h-7 flex items-center justify-center border rounded-lg"
                  >
                    <User className="w-3.5 h-3.5" />
                  </button>

                </td>

              </tr>
            ))}
          </tbody>

        </table>
      </div>

      <p className="mt-4 text-xs text-gray-400">
        Showing {filteredPatients.length} of {patients.length} patients
      </p>
    </div>

    {/* MODALS (FIXED Z-INDEX) */}
    {showAddModal && (
      <div className="fixed inset-0 z-[9999]">
        <PatientForm
          patient={selectedPatient}
          onClose={() => {
            setShowAddModal(false);
            setSelectedPatient(null);
          }}
          onSubmit={() => {
            fetchPatients();
            setShowAddModal(false);
            setSelectedPatient(null);
          }}
        />
      </div>
    )}

    {showViewModal && (
      <div className="fixed inset-0 z-[9999]">
        <ViewPatientModal
          patient={viewPatient}
          onClose={() => {
            setShowViewModal(false);
            setViewPatient(null);
          }}
        />
      </div>
    )}

    {assignModal && (
      <div className="fixed inset-0 z-[9999]">
        <AssignDoctor
          selectedPatient={selectedPatient}
          setAssignModal={setAssignModal}
          setForm={setForm}
          form={form}
          onSuccess={fetchPatients}
        />
      </div>
    )}

  </main>
</div>
  );
}

export default Patient;