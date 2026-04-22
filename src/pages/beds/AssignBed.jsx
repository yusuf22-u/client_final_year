import React, { useState } from "react";
import { X, CalendarDays, Search } from "lucide-react";

const AssignBed = ({ onClose, patients, bedId, onAssign }) => {
    const [search, setSearch] = useState("");
    const [patientId, setPatientId] = useState("");
    const [admissionDate, setAdmissionDate] = useState("");

    const filteredPatients = patients.filter((patient) =>
        `${patient.first_name} ${patient.last_name}`
            .toLowerCase()
            .includes(search.toLowerCase())
    );

    const handleSubmit = () => {
        if (!patientId || !admissionDate) {
            return alert("Select patient and date");
        }

        onAssign({
            patient_id: patientId,
            assigned_at: admissionDate
        });

        onClose();
    };

    return (
        <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4">
            <div className="bg-white w-full max-w-xl rounded-3xl shadow-xl overflow-hidden">
                {/* Header */}
                <div className="flex justify-between items-center px-6 py-5 border-b border-slate-200 bg-slate-50">
                    <h2 className="text-2xl font-bold text-slate-800">
                        Bed {bedId}
                    </h2>

                    <button
                        onClick={onClose}
                        className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center hover:bg-slate-200"
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* Body */}
                <div className="p-6 space-y-6">
                    {/* Ward */}
                    <div className="bg-teal-50 rounded-2xl px-5 py-4">
                        <p className="text-sm text-slate-500">Ward</p>
                        <h3 className="text-xl font-semibold text-slate-800">
                            General Ward A
                        </h3>
                    </div>

                    {/* Search Patient */}
                    <div>
                        <label className="block mb-2 font-semibold text-slate-700">
                            Patient Name
                        </label>

                        <div className="relative">
                            <Search
                                size={18}
                                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                            />

                            <input
                                type="text"
                                placeholder="Search patient..."
                                className="w-full border rounded-2xl py-4 pl-12 pr-4 outline-none border-slate-200 bg-slate-50 focus:ring-2 focus:ring-teal-500"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                        </div>

                        {/* Patient Results */}
                        {search && (
                            <div className="border mt-2 rounded-xl max-h-44 overflow-y-auto">
                                {filteredPatients.length > 0 ? (
                                    filteredPatients.map((patient) => (
                                        <button
                                            key={patient.id}
                                            onClick={() => {
                                                setPatientId(patient.id);
                                                setSearch(
                                                    `${patient.first_name} ${patient.last_name}`
                                                );
                                            }}
                                            className="w-full text-left px-4 py-3 border-slate-200 bg-slate-50 hover:bg-slate-50 border-b last:border-0"
                                        >
                                            {patient.first_name} {patient.last_name}
                                        </button>
                                    ))
                                ) : (
                                    <p className="p-4 text-slate-400">No patient found</p>
                                )}
                            </div>
                        )}
                    </div>

                    {/* Date */}
                    <div>
                        <label className="block mb-2 font-semibold text-slate-700">
                            Admission Date
                        </label>

                        <div className="relative">
                            <input
                                type="date"
                                className="w-full border rounded-2xl py-4 px-4 border-slate-200 bg-slate-50 outline-none focus:ring-2 focus:ring-teal-500"
                                value={admissionDate}
                                onChange={(e) => setAdmissionDate(e.target.value)}
                            />

                            {/* <CalendarDays
                size={18}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400"
              /> */}
                        </div>
                    </div>

                    {/* Buttons */}
                    <div className="grid grid-cols-2 gap-4 pt-2">
                        <button
                            onClick={onClose}
                            className="border py-4 rounded-2xl text-lg font-medium hover:bg-slate-50"
                        >
                            Cancel
                        </button>

                        <button
                            onClick={handleSubmit}
                            className="bg-teal-700 text-white py-4 rounded-2xl text-lg font-semibold hover:bg-teal-800"
                        >
                            Assign Bed
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AssignBed;