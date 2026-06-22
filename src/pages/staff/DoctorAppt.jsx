import React, { useState, useEffect } from "react";
import {
  Users,
  HeartPulse,
  AlertTriangle,
  Activity,
  Eye,
  Edit3,
  ClipboardList
} from "lucide-react";
import API from "../../api/axios";

const DoctorAppt = () => {
  const [patients, setPatients] = useState([]);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAssignPatients = async () => {
      try {
        setLoading(true);

        const res = await API.get("/appointments/doctor-appointments",{
            headers:{
                Authorization:`Bearer ${localStorage.getItem("token")}`
            }
        });

        // backend should return { success:true, appointments:[] }
        console.log("appon",res.appointments)
        setPatients(res.data.appointments || []);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchAssignPatients();
  }, []);

  // dashboard stats
  const total = patients.length;
  const stable = patients.filter(
    (p) => p.condition_state?.toLowerCase() === "stable"
  ).length;

  const monitoring = patients.filter(
    (p) => p.condition_state?.toLowerCase() === "monitoring"
  ).length;

  const critical = patients.filter(
    (p) => p.condition_state?.toLowerCase() === "critical"
  ).length;

  const statusClass = (status) => {
    switch (status?.toLowerCase()) {
      case "stable":
        return "bg-green-100 text-green-700";
      case "monitoring":
        return "bg-yellow-100 text-yellow-700";
      case "critical":
        return "bg-red-100 text-red-700";
      default:
        return "bg-cyan-100 text-cyan-700";
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-cyan-700 text-lg font-semibold">
        Loading appointments...
      </div>
    );
  }

  return (
    <main className="flex-1 pt-20 px-4 sm:px-6 lg:px-8 pb-8 bg-slate-100 min-h-screen">
      <div className="max-w-7xl mx-auto space-y-6">

        {/* HEADER */}
        <div>
          <h1 className="text-3xl font-bold text-slate-800">
            My Patients
          </h1>
          <p className="text-slate-500 mt-1">
            View and manage assigned patient appointments
          </p>
        </div>

        {/* SUMMARY CARDS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <Card
            icon={<Users />}
            title="Total Patients"
            value={total}
            color="cyan"
          />
          <Card
            icon={<HeartPulse />}
            title="Stable"
            value={stable}
            color="green"
          />
          <Card
            icon={<Activity />}
            title="Monitoring"
            value={monitoring}
            color="yellow"
          />
          <Card
            icon={<AlertTriangle />}
            title="Critical"
            value={critical}
            color="red"
          />
        </div>

        {/* EMPTY STATE */}
        {patients.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center shadow-sm">
            <ClipboardList
              size={60}
              className="mx-auto text-slate-300 mb-4"
            />
            <h2 className="text-xl font-semibold text-slate-700">
              No records found
            </h2>
            <p className="text-slate-400 mt-2">
              No assigned appointments yet.
            </p>
          </div>
        ) : (
          <div className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="px-6 py-5 border-b">
              <h3 className="text-lg font-bold text-slate-800">
                Assigned Patients
              </h3>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full min-w-[850px]">
                <thead className="bg-slate-50">
                  <tr>
                    {[
                      "Patient Name",
                      "Age",
                      "Condition",
                      "Status",
                      "Actions"
                    ].map((item) => (
                      <th
                        key={item}
                        className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase"
                      >
                        {item}
                      </th>
                    ))}
                  </tr>
                </thead>

                <tbody>
                  {patients.map((p) => (
                    <tr
                      key={p.patient_id}
                      className="border-b hover:bg-slate-50 transition"
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-cyan-700 text-white flex items-center justify-center font-bold">
                            {p.first_name?.charAt(0)}
                            {p.last_name?.charAt(0)}
                          </div>
                          <span className="capitalize font-medium text-slate-700">
                            {p.first_name} {p.last_name}
                          </span>
                        </div>
                      </td>

                      <td className="px-6 py-4">
                        {p.age || "N/A"} yrs
                      </td>

                      <td className="px-6 py-4 capitalize">
                        {p.condition_state || "N/A"}
                      </td>

                      <td className="px-6 py-4">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium ${statusClass(
                            p.condition_state
                          )}`}
                        >
                          {p.condition_state}
                        </span>
                      </td>

                      <td className="px-6 py-4">
                        <div className="flex gap-2">
                          <button
                            onClick={() => {
                              setSelectedPatient(p);
                              setShowModal(true);
                            }}
                            className="px-3 py-2 rounded-xl border text-sm flex items-center gap-1 hover:bg-slate-50"
                          >
                            <Eye size={15} />
                            View
                          </button>

                          <button
                            onClick={() => {
                              setSelectedPatient(p);
                              setShowModal(true);
                            }}
                            className="px-3 py-2 rounded-xl bg-cyan-700 text-white text-sm flex items-center gap-1 hover:bg-cyan-800"
                          >
                            <Edit3 size={15} />
                            Update
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </main>
  );
};

export default DoctorAppt;


/* CARD COMPONENT */
const Card = ({ icon, title, value, color }) => {
  const colors = {
    cyan: "bg-cyan-100 text-cyan-700",
    green: "bg-green-100 text-green-700",
    yellow: "bg-yellow-100 text-yellow-700",
    red: "bg-red-100 text-red-700"
  };

  return (
    <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-200">
      <div
        className={`w-12 h-12 rounded-xl flex items-center justify-center ${colors[color]}`}
      >
        {icon}
      </div>

      <p className="text-slate-500 text-sm mt-4">{title}</p>
      <h2 className="text-3xl font-bold text-slate-800 mt-1">
        {value}
      </h2>
    </div>
  );
};