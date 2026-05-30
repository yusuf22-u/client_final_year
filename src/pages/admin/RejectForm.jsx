import React, { useState } from "react";
import API from "../../api/axios";
import toast from "react-hot-toast";
import {
  Calendar,
  Clock,
  Stethoscope,
  X,
  MessageSquare,
  AlertCircle,
  XCircle,
} from "lucide-react";
import { calculateAge } from "../../helpers/calculateAge";
import { formatDate } from "../../helpers/formatDate";

const RejectForm = ({
  selectedAppt,
  setShowRejectInput,
  onSuccess,
}) => {
  const [message, setMessage] = useState("");

  const handleReject = async () => {
  try {
    await API.put(
      `/appointments/${selectedAppt.id}/reject`,
      {
        message,
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    toast.success("Appointment rejected successfully");

    if (onSuccess) await onSuccess();

    setShowRejectInput(false);
  } catch (error) {
    console.log("error",error);
    toast.error("Rejection failed");
  }
};
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4"
      style={{
        backgroundColor: "rgba(15,23,42,0.55)",
        backdropFilter: "blur(6px)",
      }}
    >
      <div
        className="
          bg-white
          rounded-2xl
          w-full
          max-w-lg
          max-h-[95vh]
          overflow-hidden
          flex
          flex-col
        "
        style={{ boxShadow: "0 24px 80px rgba(0,0,0,0.2)" }}
      >
        {/* Header */}
        <div className="px-4 sm:px-6 py-4 border-b border-slate-100 flex justify-between">
          <div>
            <h3 className="text-slate-800 text-lg font-bold">
              Appointment Details
            </h3>
            <p className="text-slate-400 text-sm">
              APT-{String(selectedAppt?.id).padStart(4, "0")}
            </p>
          </div>

          <button
            onClick={() => setShowRejectInput(false)}
            className="w-8 h-8 rounded-xl bg-slate-100 flex items-center justify-center hover:bg-slate-200"
          >
            <X className="w-4 h-4 text-slate-500" />
          </button>
        </div>

        {/* Scrollable body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-5">
          {/* Patient */}
          <div className="p-4 rounded-xl bg-slate-50">
            <p className="text-xs text-slate-400 uppercase mb-3">
              Patient
            </p>

            <div className="flex items-center gap-3">
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold"
                style={{
                  background:
                    "linear-gradient(135deg, #0E7490, #14B8A6)",
                }}
              >
                {selectedAppt?.patient_first_name
                  ?.split(" ")
                  .map((n) => n[0])
                  .join("")
                  .slice(0, 2)}
              </div>

              <div>
                <p className="font-semibold capitalize">
                  {selectedAppt?.patient_first_name}
                </p>
                <p className="text-sm text-slate-400">
                  {calculateAge(
                    selectedAppt?.date_of_birth
                  )}{" "}
                  yrs old
                </p>
              </div>
            </div>
          </div>

          {/* Details */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              {
                icon: Calendar,
                label: "Date",
                val: formatDate(
                  selectedAppt?.appointment_date
                ),
              },
              {
                icon: Clock,
                label: "Time",
                val: selectedAppt?.appointment_time,
              },
              {
                icon: Stethoscope,
                label: "Type",
                val: selectedAppt?.type,
              },
            ].map(({ icon: Icon, label, val }) => (
              <div
                key={label}
                className="flex items-center gap-3 p-3 rounded-xl border"
              >
                <div className="w-8 h-8 rounded-lg bg-cyan-50 flex items-center justify-center">
                  <Icon className="w-4 h-4 text-cyan-700" />
                </div>

                <div>
                  <p className="text-xs text-slate-400">
                    {label}
                  </p>
                  <p className="font-medium">{val}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Notes */}
          <div className="p-4 rounded-xl border">
            <div className="flex items-center gap-2 mb-2">
              <MessageSquare className="w-4 h-4 text-slate-400" />
              <p className="text-xs uppercase text-slate-500">
                Clinical Notes
              </p>
            </div>

            <p className="text-sm text-slate-600">
              {selectedAppt?.notes || "No notes"}
            </p>
          </div>

          {/* Reject reason */}
          <div className="p-4 rounded-xl border border-red-100 bg-red-50">
            <div className="flex items-center gap-2 mb-3">
              <AlertCircle className="w-4 h-4 text-red-500" />
              <p className="text-red-600 font-medium">
                Rejection Reason
              </p>
            </div>

            <textarea
              value={message}
              onChange={(e) =>
                setMessage(e.target.value)
              }
              placeholder="Provide a reason..."
              className="w-full h-24 p-3 rounded-xl border border-red-200 resize-none focus:outline-none focus:border-red-400"
            />
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 sm:p-6 border-t flex flex-col sm:flex-row gap-3">
          <button
            onClick={handleReject}
            className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-white bg-red-500 hover:bg-red-600"
          >
            <XCircle className="w-4 h-4" />
            Confirm Reject
          </button>

          <button
            onClick={() => setShowRejectInput(false)}
            className="flex-1 py-3 rounded-xl border hover:bg-slate-50"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default RejectForm;