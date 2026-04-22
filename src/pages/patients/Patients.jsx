import React, { useState, useEffect } from "react";
import PatientForm from "../../components/PatientForm";
import API from "../../api/axios";
import toast from "react-hot-toast";
import { User, Search, Plus, Eye, Edit3 } from "lucide-react";
import ViewPatientModal from "../../components/ViewPatientModal";

function Patient() {
  const [patients, setPatients] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [viewPatient, setViewPatient] = useState(null);
  const [showViewModal, setShowViewModal] = useState(false);

  // console.log("patients",patients)


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



  const filteredPatients = patients.filter(
    (p) =>
      (filterStatus === "all" || p.status === filterStatus) &&
      (p.first_name.toLowerCase().includes(search.toLowerCase()) ||
        p.last_name.toLowerCase().includes(search.toLowerCase()) ||
        p.status.toLowerCase().includes(search.toLowerCase()))
  );
  // card color
  const cardColor=(status)=>{
    if(status==="Stable") return "rounded-lg bg-teal-100 mb-3 text-teal-600 w-12 h-12 flex items-center justify-center";
    if(status==="Critical") return "rounded-lg bg-red-100 mb-3 text-red-600 w-12 h-12 flex items-center justify-center";
    if(status==="Monitor") return "rounded-lg bg-yellow-100 mb-3 text-yellow-600 w-12 h-12 flex items-center justify-center";
    if(status==="Total Patient") return "rounded-lg bg-blue-100 mb-3 text-blue-600 w-12 h-12 flex items-center justify-center";
    
  }
  const TotalStable=patients.filter((p)=>(p.status==="stable")).length
  const TotalCritical=patients.filter((p)=>(p.status==="critical")).length
  const TotalMonitoring=patients.filter((p)=>(p.status==="monitoring")).length

  return (
    <div className="p-6 bg-gray-50 min-h-screen font-inter">
      {/* Stats */}
      <main className="flex justify-center flex-col ml-64 mt-12 ">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          {/* Total Patient */}
            <div className="bg-white p-4 rounded-2xl shadow flex flex-col items-left">
              <div className={cardColor("Total Patient")}>
                <User className="w-5 h-5 " />
              </div>
              <p className="text-2xl font-bold text-gray-800">{patients.length}</p>
              <p className="text-sm font-semibold text-gray-500">Total Patients</p>
            </div>
            {/* Total critical */}
            <div className="bg-white p-4 rounded-2xl shadow flex flex-col items-left">
              <div className={cardColor("Stable")}>
                <User className="w-5 h-5 " />
              </div>
              <p className="text-2xl font-bold text-gray-800">{TotalStable}</p>
              <p className="text-sm font-semibold text-gray-500">Stable</p>
            </div>
             {/* Total critical */}
            <div className="bg-white p-4 rounded-2xl shadow flex flex-col items-left">
              <div className={cardColor("Monitor")}>
                <User className="w-5 h-5 " />
              </div>
              <p className="text-2xl font-bold text-gray-800">{TotalMonitoring}</p>
              <p className="text-sm font-semibold text-gray-500">Monitoring</p>
            </div>
             {/* Total critical */}
            <div className="bg-white p-4 rounded-2xl shadow flex flex-col items-left">
              <div className={cardColor("Critical")}>
                <User className="w-5 h-5 " />
              </div>
              <p className="text-2xl font-bold text-gray-800">{TotalCritical}</p>
              <p className="text-sm font-semibold text-gray-500">Critical</p>
            </div>
         
        </div>

        {/* Table */}
        <div className="bg-white rounded-2xl shadow p-4 flex flex-col">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4">
            <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
              <div className="relative w-full sm:w-72">
                <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search patients, doctors, conditions..."
                  className="pl-9 pr-4 py-2.5 text-sm border border-gray-200 rounded-xl bg-gray-50 w-full focus:outline-none focus:border-teal-400 focus:bg-white transition"
                />
              </div>

              <div className="flex items-center gap-1 bg-gray-100 rounded-xl p-1">
                {["all", "stable", "monitoring", "critical", "improving"].map((s) => (
                  <button
                    key={s}
                    onClick={() => setFilterStatus(s)}
                    className={`px-3 py-1.5 rounded-lg text-xs capitalize transition-all ${filterStatus === s ? "bg-teal-600 text-white font-semibold" : "text-gray-500 font-medium"
                      }`}
                  >
                    {s === "all" ? "All" : s}
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={() => setShowAddModal(true)}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-white text-sm bg-teal-600 hover:opacity-90 transition shadow-md"
            >
              <Plus className="w-4 h-4" /> Add Patient
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  {[
                    "Patient",
                    "Age / Gender",
                    "Condition",
                    "Assigned Doctor",
                    "Last Visit",
                    "Next Visit",
                    "Status",
                    "Actions",
                  ].map((h) => (
                    <th key={h} className="text-left px-4 py-3 text-xs text-gray-400 uppercase tracking-wider font-semibold">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filteredPatients.map((p) => (
                  <tr key={p.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-3 flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full flex items-center capitalize justify-center text-white text-sm font-bold shrink-0" style={{ background: "linear-gradient(135deg, #0E7490, #14B8A6)" }}>
                        {p.first_name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-gray-800">{p.first_name}</p>
                        <p className="text-xs text-gray-400">{p.last_name}</p>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-500">{calculateAge(p.date_of_birth)} yrs · {p.gender}</td>
                    <td className="px-4 py-3 text-sm font-medium text-gray-700">{p.address}</td>
                    <td className="px-4 py-3 text-sm text-gray-500">Dr. Darboe</td>
                    <td className="px-4 py-3 text-sm text-gray-500">{p.lastVisit}</td>
                    <td className="px-4 py-3 text-sm text-gray-500">{p.nextVisit}</td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-1 rounded-lg text-xs font-semibold ${p.status === "stable" ? "bg-green-100 text-green-600" : p.status === "critical" ? "bg-red-100 text-red-600" : "bg-yellow-100 text-yellow-600"}`}>
                        {p.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 flex items-center gap-2">
                      <button
                        onClick={() => {
                          setViewPatient(p);      // store clicked patient
                          setShowViewModal(true); // open modal
                        }}
                        className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg border border-gray-200 text-gray-500 hover:border-teal-300 hover:text-teal-600 hover:bg-teal-50 transition"
                      >
                        <Eye className="w-3.5 h-3.5" /> View
                      </button>
                      <button
                        onClick={() => {
                          setSelectedPatient(p);   // store patient to edit
                          setShowAddModal(true);   // open modal
                        }}
                        className="w-7 h-7 rounded-lg border border-gray-200 flex items-center justify-center hover:border-gray-300 hover:bg-gray-50 transition-colors"
                      >
                        <Edit3 className="w-3.5 h-3.5 text-gray-400" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-4 text-xs text-gray-400">
            Showing {filteredPatients.length} of {patients.length} patients
          </div>
        </div>

        {showAddModal && (
          <PatientForm
            patient={selectedPatient}   // 🔥 important
            onClose={() => {
              setShowAddModal(false);
              setSelectedPatient(null); // reset
            }}
            onSubmit={() => {
              fetchPatients();
              setShowAddModal(false);
              setSelectedPatient(null);
              toast.success(
                selectedPatient ? "Patient updated successfully" : "Patient added successfully"
              );
            }}

          />
        )}
        

        {showViewModal && (
          <ViewPatientModal
            patient={viewPatient}
            onClose={() => {
              setShowViewModal(false);
              setViewPatient(null);
            }}
          />
        )}

      </main>

    </div>
  );
}

export default Patient;