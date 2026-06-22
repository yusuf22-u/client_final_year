import React, { useEffect } from "react";
import {
  Calendar,
  Clock,
  Stethoscope,
  X,
  MessageSquare,
  MapPin,
  CheckCircle,
} from "lucide-react";
import { calculateAge } from "../../helpers/calculateAge";
import { formatDate } from "../../helpers/formatDate";
import API from "../../api/axios";

const statusCfg = {
  approved: {
    label: "Approved",
    color: "#22C55E",
    bg: "#DCFCE7",
    icon: CheckCircle,
  },
  pending: {
    label: "Pending",
    color: "#F59E0B",
    bg: "#FEF3C7",
    icon: Clock,
  },
  rejected: {
    label: "Rejected",
    color: "#EF4444",
    bg: "#FEE2E2",
    icon: X,
  },
};

const priorityCfg = {
  emergency: {
    label: "Emergency",
    color: "#EF4444",
    bg: "#FEE2E2",
  },
  urgent: {
    label: "Urgent",
    color: "#F59E0B",
    bg: "#FEF3C7",
  },
  routine: {
    label: "Routine",
    color: "#64748B",
    bg: "#F1F5F9",
  },
};

const AppointModal = ({
  selectedItem,
  setShowDetail,
  setSelectedItem,
  patient_id
}) => {
  if (!selectedItem) return null;

  const status = statusCfg[selectedItem.status];
  const priority =
    priorityCfg[selectedItem.priority || "routine"];

  const closeModal = () => {
    setSelectedItem(null);
    setShowDetail(false);
  };
  console.log("sele", selectedItem.patient_id)
  useEffect(()=>{
    const fetchAppointmentBYId=async()=>{
        try {
            const res= await API.get(`/appointments/${selectedItem.patient_id}`,{
                headers:{
                    Authorization:`Bearer ${localStorage.getItem("token")}`
                }
            })
            console.log("my detail",res.data)
        } catch (error) {
            console.log("server erro",error)
        }
    }
    fetchAppointmentBYId()
  },[selectedItem.patient_id])
   const statusClass = (type) => {
        if (type=== "stable")
            return "px-3 py-1 rounded-full text-xs bg-green-100 text-green-600";

        if (type === "monitoring")
            return "px-3 py-1 rounded-full text-xs bg-yellow-100 text-yellow-700";

        if (type === "critical")
            return "px-3 py-1 rounded-full text-xs bg-red-100 text-red-600";

        return "px-3 py-1 rounded-full text-xs bg-red-100 text-red-600"
    };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3"
      style={{
        backgroundColor: "rgba(15,23,42,0.55)",
        backdropFilter: "blur(6px)",
      }}
    >
      <div
        className="bg-white rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto"
        style={{
          boxShadow: "0 25px 80px rgba(0,0,0,0.18)",
        }}
      >
        {/* HEADER */}
        <div className="px-6 py-5 border-b border-slate-100">
          <div className="flex justify-between items-start">
            <div>
              {/* badges */}
              <div className="flex gap-2 mb-4 flex-wrap">
                <span
                 className={statusClass(selectedItem.assignment_status)}
                  style={{
                    backgroundColor: priority.bg,
                    color: priority.color,
                    fontWeight: 700,
                  }}
                >
                  {selectedItem.assignment_status}
                </span>

                <span
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs"
                  style={{
                    backgroundColor: status?.bg,
                    color: status?.color,
                    fontWeight: 700,
                  }}
                >
                  {/* <status.icon className="w-3 h-3" /> */}
                  {status?.label}
                </span>
              </div>

              <h2 className="text-slate-800 text-2xl font-bold">
                Appointment Details
              </h2>

              <p className="text-slate-400 text-base mt-1">
                APT-{String(selectedItem.id).padStart(4, "0")}
              </p>
            </div>

            <button
              onClick={closeModal}
              className="w-10 h-10 rounded-xl bg-slate-100 hover:bg-slate-200 flex items-center justify-center"
            >
              <X className="w-5 h-5 text-slate-500" />
            </button>
          </div>
        </div>

        {/* BODY */}
        <div className="p-6 space-y-5">
          {/* Patient + Doctor */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* patient */}
            <div className="bg-slate-50 rounded-2xl p-4">
              <p className="text-slate-400 text-xs font-bold uppercase mb-3">
                Patient
              </p>

              <div className="flex items-center gap-3">
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center text-white text-lg font-bold"
                  style={{
                    background:
                      "linear-gradient(135deg,#0E7490,#14B8A6)",
                  }}
                >
                  {selectedItem?.first_name
                    ?.split(" ")
                    .map((n) => n[0])
                    .join("")
                    .slice(0, 2)}
                </div>

                <div>
                  <h3 className="text-lg font-semibold capitalize text-slate-800">
                    {selectedItem?.first_name} {selectedItem?.last_name}
                  </h3>
                  <p className="text-slate-400 text-sm">
                    {calculateAge(
                      selectedItem?.date_of_birth
                    )}{" "}
                    yrs old
                  </p>
                </div>
              </div>
            </div>

            {/* doctor */}
            <div className="bg-slate-50 rounded-2xl p-4">
              <p className="text-slate-400 text-xs font-bold uppercase mb-3">
                Doctor
              </p>

              <div className="flex items-center gap-3">
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center text-white text-lg font-bold"
                  style={{
                    background:
                      "linear-gradient(135deg,#0E7490,#14B8A6)",
                  }}
                >
                  {selectedItem?.doctor_first_name
                    ?.split(" ")
                    .map((n) => n[0])
                    .join("")
                    .slice(0, 2)}
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-slate-800">
                    Dr. {selectedItem?.doctor_first_name}
                  </h3>
                  <p className="text-slate-400 text-sm">
                    {selectedItem?.specialty}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* details */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              {
                icon: Calendar,
                label: "Date",
                val: formatDate(
                  selectedItem?.appointment_date
                ),
              },
              {
                icon: Clock,
                label: "Time",
                val: selectedItem?.appointment_time,
              },
              {
                icon: Stethoscope,
                label: "Type",
                val: selectedItem?.type,
              },
              {
                icon: MapPin,
                label: "Location",
                val:
                  selectedItem?.location || "N/A",
              },
            ].map(({ icon: Icon, label, val }) => (
              <div
                key={label}
                className="border border-slate-200 rounded-2xl p-4 flex gap-3 items-center"
              >
                <div className="w-10 h-10 rounded-xl bg-cyan-50 flex items-center justify-center">
                  <Icon className="w-5 h-5 text-cyan-700" />
                </div>

                <div>
                  <p className="text-slate-400 text-xs">
                    {label}
                  </p>
                  <h4 className="text-base font-semibold text-slate-700">
                    {val}
                  </h4>
                </div>
              </div>
            ))}
          </div>

          {/* notes */}
          <div className="border border-slate-200 rounded-2xl p-4">
            <div className="flex gap-2 items-center mb-3">
              <MessageSquare className="w-4 h-4 text-slate-400" />
              <p className="text-slate-500 uppercase text-xs font-bold">
                Clinical Notes
              </p>
            </div>

            <p className="text-slate-600 text-sm leading-relaxed">
              {selectedItem?.notes || "No notes"}
            </p>
          </div>

          {/* footer */}
          <button
            onClick={closeModal}
            className="w-full py-3 rounded-2xl border border-slate-200 text-base font-medium text-slate-600 hover:bg-slate-50"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default AppointModal;