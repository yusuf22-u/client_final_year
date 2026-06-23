import { useEffect, useState } from "react";
import API from "../../api/axios";

const PatientReports = ({ patientId }) => {
  const [reports, setReports] = useState([]);

  useEffect(() => {
    const fetchReports = async () => {
      const res = await API.get(`/medical-reports/patient/${patientId}`);
      console.log("res.data",res.data)
      setReports(res.data.data);
    };

    fetchReports();
  }, [patientId]);

 const downloadReport = async (id) => {
  try {
    const res = await API.get(
      `/medical-reports/${id}/download`,
      { responseType: "blob" }
    );

    const url = window.URL.createObjectURL(new Blob([res.data]));
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `report-${id}.pdf`);
    document.body.appendChild(link);
    link.click();
    link.remove();
  } catch (err) {
    console.log(err);
  }
};
  return (
    <div className="bg-white rounded-2xl p-4 shadow-sm">

      <h2 className="text-lg font-semibold mb-4">
        Medical Reports
      </h2>

      {reports.length === 0 ? (
        <p className="text-sm text-slate-400">No reports yet</p>
      ) : (
        <div className="space-y-3">
          {reports.map((r) => (
            <div
              key={r.id}
              className="border rounded-xl p-3 flex justify-between items-center"
            >
              <div>
                <p className="font-medium">{r.report_title}</p>
                <p className="text-xs text-slate-500">
                  {r.diagnosis}
                </p>
              </div>

              <button
                onClick={() => downloadReport(r.id)}
                className="px-3 py-1 bg-cyan-700 text-white text-xs rounded-xl"
              >
                Download
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PatientReports;