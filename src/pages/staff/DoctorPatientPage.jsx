import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../../api/axios";
import CreateReportModal from "../staff/CreateReportModal";
import PatientReports from "../staff/PatientReports";

export default function DoctorPatientPage() {
  const { id } = useParams();

  const [patient, setPatient] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchPatient = async () => {
      const res = await API.get(`/medical-reports/patient/${id}`)
      setPatient(res.data.data);
      console.log("patient",res.data)
    };

    fetchPatient();
  }, [id]);

  if (!patient) return <p>Loading...</p>;

  return (
    <div className="max-w-5xl mt-9 mx-auto p-6 space-y-6">

      {/* HEADER */}
      <div className="bg-white p-4 rounded-2xl shadow-sm">
        <h2 className="text-xl font-bold">
          {patient.first_name} {patient.last_name}
        </h2>

        <p className="text-sm text-slate-500">
          Patient Details & Reports
        </p>
      </div>

      {/* ACTIONS */}
      <button
        onClick={() => setShowModal(true)}
        className="bg-teal-700 text-white px-4 py-2 rounded-xl"
      >
        Create Report
      </button>

      {/* REPORTS */}
      <PatientReports patientId={id} />

      {/* MODAL */}
      {showModal && (
        <CreateReportModal
          patient={patient}
           patientId={id}
          onClose={() => setShowModal(false)}
          onSuccess={() => window.location.reload()}
        />
      )}
    </div>
  );
}