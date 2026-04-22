import React, { useState, useEffect } from "react";

import API from "../../api/axios";
import toast from "react-hot-toast";
import { BedDouble, User, CheckCircle, X, Plus, Flag } from "lucide-react";
import AssignBed from "./AssignBed";


function BedPages() {
  const [beds, setBeds] = useState([]);
  const [patients, setPatients] = useState([]);
  const [selectedBed, setSelectedBed] = useState(null);
  const [showForm, setShowForm] = useState(false);



  const fetchBeds = async () => {
    const res = await API.get("/beds");
    setBeds(res.data);
    console.log("beds",res.data)
  };

  const totalBeds = beds.length;
  const occupiedBeds = beds.filter(b => b.status === "occupied").length;
  const availableBeds = beds.filter(b => b.status === "available").length;
  const cleaningBeds = beds.filter(b => b.status === "cleaning").length;


  const releaseBed = async (bedId) => {
    await API.put(`/beds/${bedId}/release`);
    fetchBeds();
  };

// reschedule
 const readyBed = async (bedId) => {
  try {
    await API.put(`/beds/${bedId}/readybed`);

    await fetchBeds();

    toast.success("Bed is now available");

  } catch (error) {
    toast.error("Failed");
  }
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
    fetchBeds()
  }, []);

  const assignBed = async (data) => {
  try {
    await API.put(`/beds/${selectedBed.id}/assign`, data);

    await fetchBeds();

    toast.success("Bed assigned");

    setShowForm(false);
    setSelectedBed(null);

  } catch (error) {
    toast.error(error.response?.data?.message || "Failed");
  }
};


  return (
    <div className="p-6 bg-gray-50 min-h-screen font-inter">
      {/* Stats */}
      <main className="flex justify-center flex-col ml-64 mt-12 ">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">

          <div className="bg-white p-4 rounded-2xl shadow flex flex-col items-left">
            <div className="w-12 h-12 flex items-center justify-center rounded-lg bg-blue-100 mb-3">
              <BedDouble className="w-5 h-5 text-blue-600" />
            </div>
            <p className="text-2xl font-bold text-gray-800">{totalBeds}</p>
            <p className="text-sm font-semibold text-gray-500">Total Beds</p>
            <p className="text-sm font-semibold text-gray-400">All wards</p>
          </div>
          <div className="bg-white p-4 rounded-2xl shadow flex flex-col items-left">
            <div className="w-12 h-12 flex items-center justify-center rounded-lg bg-red-100 mb-3">
              <BedDouble className="w-5 h-5 text-red-600" />
            </div>
            <p className="text-2xl font-bold text-gray-800">{occupiedBeds}</p>
            <p className="text-sm font-semibold text-gray-500">Occupied</p>
            <p className="text-sm font-semibold text-gray-400">69.2% occupancy</p>
          </div>
          <div className="bg-white p-4 rounded-2xl shadow flex flex-col items-left">
            <div className="w-12 h-12 flex items-center justify-center rounded-lg bg-teal-100 mb-3">
              <CheckCircle className="w-5 h-5 text-teal-600" />
            </div>
            <p className="text-2xl font-bold text-gray-800">{availableBeds}</p>
            <p className="text-sm font-semibold text-gray-500">Available</p>
            <p className="text-sm font-semibold text-gray-400">Ready for admission</p>
          </div>
          <div className="bg-white p-4 rounded-2xl shadow flex flex-col items-left">
            <div className="w-12 h-12 flex items-center justify-center rounded-lg bg-yellow-100 mb-3">
              <User className="w-5 h-5 text-yellow-600" />
            </div>
            <p className="text-2xl font-bold text-gray-800">8/16</p>
            <p className="text-sm font-semibold text-gray-500">ICU Beds</p>
            <p className="text-sm font-semibold text-gray-400">8 occupied</p>
          </div>


        </div>
        {/* Filters */}
        <div className="flex items-center gap-4 flex-wrap">
          <div className="flex items-center gap-2 bg-white rounded-xl p-1.5 border border-slate-200">
            {(["all", "available", "occupied", "cleaning"]).map((s, index) => (
              <button
                key={index}
                // onClick={() => setFilterStatus(s)}
                className="px-4 py-1.5 rounded-lg text-sm transition-all capitalize"
              // style={{
              //   backgroundColor: filterStatus === s ? "#0E7490" : "transparent",
              //   color: filterStatus === s ? "#fff" : "#64748B",
              //   fontWeight: filterStatus === s ? 600 : 400,
              // }}
              >
                {s === "all" ? "All Beds" : s}
              </button>
            ))}
          </div>
          <ul className="flex justify-between p-3 space-x-5 pb-4">
            <li className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-green-500"></span>
              Available
            </li>

            <li className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-red-500"></span>
              Occupied
            </li>

            <li className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-yellow-500"></span>
              Cleaning
            </li>

            <li className="flex items-center justify-center gap-2 ">
              <span className="w-3 h-3 rounded-full bg-blue-500"></span>
              Maintenance
            </li>
          </ul>
        </div>
        {/* bed detail */}
        <div
          className="bg-white rounded-2xl p-6 pt-8"
          style={{ boxShadow: "0px 4px 20px rgba(0,0,0,0.05)" }}
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-slate-800" style={{ fontSize: 16, fontWeight: 700 }}>
                all ward— Bed Overview
              </h3>
              <p className="text-slate-400 text-xs mt-0.5">
                Showing {totalBeds} beds
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {beds.map((bed) => {
              const isAvailable = bed.status === "available";
              const isOccupied = bed.status === "occupied";
              const isCleaning = bed.status === "cleaning";

              return (
                <div
                  key={bed.id}
                  className={`relative p-5 rounded-2xl border transition-all shadow-sm hover:shadow-md
                 ${isAvailable ? "bg-green-50 border-green-200"
                      : isOccupied ? "bg-red-50 border-red-200"
                        : isCleaning ? "bg-yellow-50 border-yellow-200"
                          : "bg-blue-50 border-blue-200"
                    }`}
                >
                  {/* Status dot */}
                  <span
                    className={`absolute top-4 right-4 w-3 h-3 rounded-full
                      ${isAvailable ? "bg-green-500"
                        : isOccupied ? "bg-red-500"
                          : isCleaning ? "bg-yellow-500"
                            : "bg-blue-500"
                      }`}
                  />

                  {/* Bed Number */}
                  <h3 className="font-bold flex items-center space-x-2 gap-2 text-lg text-gray-800">
                    <BedDouble className={` text-sm
                      ${isAvailable ? "text-green-500"
                        : isOccupied ? "text-red-500"
                          : isCleaning ? "text-yellow-500"
                            : "text-blue-500"
                      }`} />
                    {bed.bed_number}
                    
                  </h3>

                  {/* Patient or Status */}
                  {isOccupied ? (
                    <>
                      <p className="text-gray-700 font-medium mt-2">
                        {bed.patient_name || "Patient Assigned"} {bed.last_name}
                      </p>
                      <p className="text-xs text-gray-400">Since {new Date(bed.assigned_at).toLocaleDateString()}</p>
                    </>
                  ) : isCleaning ? (
                    <>
                      <p className="text-yellow-600 font-semibold mt-2">Cleaning</p>
                      <p className="text-xs text-gray-400">Being sanitized</p>
                    </>
                  ) : (
                    <>
                      <p className="text-green-600 font-semibold mt-2">Available</p>
                      <p className="text-xs text-gray-400">Ready</p>
                    </>
                  )}

                  {/* Action Button */}
                  <div className="mt-4">
                    {isAvailable && (
                      <button
                        onClick={() => {
                          setSelectedBed(bed);
                          setShowForm(true)
                        }}
                        className="w-full bg-teal-700 text-white py-2 rounded-xl text-sm font-medium hover:bg-teal-800"
                      >
                        Assign
                      </button>
                    )}

                    {isOccupied && (
                      <button
                        onClick={() => releaseBed(bed.id)}
                        className="w-full border border-red-300 text-red-500 py-2 rounded-xl text-sm font-medium hover:bg-red-50"
                      >
                        Release
                      </button>
                    )}

                    {isCleaning && (
                      <button
                      onClick={()=>readyBed(bed.id)}
                        className="w-full border capitalize border-yellow-300 text-yellow-600 py-2 rounded-xl text-sm font-medium hover:bg-yellow-50"
                      >
                        cleaning completed
                      </button>
                    )}
                  </div>
                </div>

              );

            })}


          </div>
          {/* show assign form */}
          {showForm && selectedBed && (
            <AssignBed
              onClose={() => setShowForm(false)}
              patients={patients}
              bedId={selectedBed.bed_number}
              onAssign={assignBed}
            />
          )}

        </div>
      </main>

    </div>
  );
}

export default BedPages;