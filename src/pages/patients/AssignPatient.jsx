import React, { useState, useEffect } from "react";
import {
    Users,
    CalendarDays,
    ClipboardList,
    Star,
    Stethoscope,
    Eye,
    Edit3
} from "lucide-react";
import API from "../../api/axios";
import AppointModal from "../staff/AppointModal";


const AssignPatient = () => {
    const [patients, setPatients] = useState([]);
    const [selectedPatient, setSelectedPatient] = useState(null);
    const [showModal, setShowModal] = useState(false)




    console.log("pppp", patients)
    useEffect(() => {
        const fetchAssignPatients = async () => {
            try {
                const res = await API.get("/staff/assign-patients");
                console.log("assign patient", res.data);
                setPatients(res.data)
            } catch (error) {
                //   console.log("error", error?.response?.data || error.message);
                console.log("error", error)
            }
        };

        fetchAssignPatients();
    }, []);
    const statusClass = (status) => {
        if (status === "stable")
            return "px-3 py-1 rounded-full text-xs bg-green-100 text-green-600";

        if (status === "monitoring")
            return "px-3 py-1 rounded-full text-xs bg-yellow-100 text-yellow-700";

        if (status === "critical")
            return "px-3 py-1 rounded-full text-xs bg-red-100 text-red-600";

        return "px-3 py-1 rounded-full text-xs bg-cyan-100 text-cyan-700";
    };

    return (
        <>

            <main className="flex-1 lg:ml-64 pt-20 px-4 sm:px-6 lg:px-8 pb-8 bg-slate-100 min-h-screen">

                {/* CENTER WRAPPER */}
                <div className="max-w-7xl mx-auto space-y-6">

                    {/* HERO */}


                    {/* TABLE SECTION */}
                    <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">

                        <div className="px-5 py-4 border-b border-slate-100">
                            <h3 className="text-slate-800 font-bold text-lg">
                                Assigned Patients
                            </h3>
                            <p className="text-slate-400 text-sm mt-1">
                                Click a patient to view or update records
                            </p>
                        </div>

                        {/* RESPONSIVE TABLE */}
                        <div className="overflow-x-auto">
                            <table className="w-full min-w-[850px]">
                                <thead>
                                    <tr className="border-b border-slate-100 bg-slate-50">
                                        {["Patient Name", "Age", "Condition", "Status", "Actions"].map(
                                            (h) => (
                                                <th
                                                    key={h}
                                                    className="text-left px-5 py-4 text-xs font-semibold text-slate-400 uppercase"
                                                >
                                                    {h}
                                                </th>
                                            )
                                        )}
                                    </tr>
                                </thead>

                                <tbody>
                                    {patients.map((p) => (
                                        <tr
                                            key={p.patient_id}
                                            className="border-b border-slate-100 hover:bg-slate-50 transition"
                                        >
                                            {/* NAME */}
                                            <td className="px-5 py-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-9 h-9 capitalize rounded-full bg-cyan-700 text-white text-xs font-bold flex items-center justify-center">
                                                        {p.first_name.charAt(0)} {p.last_name.charAt(0)}
                                                    </div>

                                                    <span className="text-sm font-medium capitalize text-slate-700">
                                                        {`${p.first_name} ${p.last_name}`}
                                                    </span>
                                                </div>
                                            </td>

                                            {/* AGE */}
                                            <td className="px-5 py-4 text-sm text-slate-500">
                                                {p.age} yrs
                                            </td>

                                            {/* CONDITION */}
                                            <td className="px-5 py-4 text-sm text-slate-600">
                                                {p.condition_state}
                                            </td>

                                            {/* STATUS */}
                                            <td className="px-5 py-4">
                                                <span className={statusClass(p.status)}>
                                                    {p.status}
                                                </span>
                                            </td>

                                            {/* ACTIONS */}
                                            <td className="px-5 py-4">
                                                <div className="flex gap-2">

                                                    <button onClick={() => {
                                                        setSelectedPatient(p);
                                                        // setActiveTab("Medical Notes");
                                                        setShowModal(true);
                                                    }}

                                                        className="px-3 py-2 rounded-xl border border-slate-200 text-slate-600 text-xs flex items-center gap-1 hover:bg-slate-50"
                                                    >
                                                        <Eye size={14} /> View
                                                    </button>

                                                    <button
                                                        onClick={() => {
                                                            setSelectedPatient(p.id);
                                                            setActiveTab("Medical Notes");
                                                            setShowModal(true);
                                                        }}
                                                        className="px-3 py-2 rounded-xl bg-cyan-700 text-white text-xs flex items-center gap-1 hover:bg-cyan-800"
                                                    >
                                                        <Edit3 size={14} /> Updateg
                                                    </button>

                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>

                            </table>
                        </div>
                    </div>
                </div>
                {/*Show modal details  */}
                {showModal && (
                    <AppointModal
                        selectedItem={selectedPatient}
                       setShowDetail={setShowModal}
                        setSelectedItem={setSelectedPatient}
                    />
                )}
            </main>
        </>
    )
}
export default AssignPatient