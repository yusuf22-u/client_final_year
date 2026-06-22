import React, { useState, useEffect } from "react";
import API from "../../api/axios";
import toast from "react-hot-toast";
import { BedDouble, User, CheckCircle, Plus, Trash2 } from "lucide-react";
import AssignBed from "./AssignBed";
import AddBedModal from "./AddBed";

function BedPages() {
  const [beds, setBeds] = useState([]);
  const [patients, setPatients] = useState([]);
  const [selectedBed, setSelectedBed] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [open, setOpen] = useState(false);



  // console.log("beds", beds)

  const fetchBeds = async () => {
    const res = await API.get("/beds");
    setBeds(res.data);
  };

  const totalBeds = beds.length;
  const occupiedBeds = beds.filter(b => b.status === "occupied").length;
  const availableBeds = beds.filter(b => b.status === "available").length;
  const cleaningBeds = beds.filter(b => b.status === "cleaning").length;

  const releaseBed = async (bedId) => {
    await API.put(`/beds/${bedId}/release`);
    fetchBeds();
  };

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
    fetchBeds();
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
  // DELETE BED
  const handleDelete = async (id) => {
    try {
      await API.delete(`/beds/${id}`)
      toast.success("bed deleted successefully")
      location.reload()
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed")
    }

  }
  return (
    <div className="p-3 sm:p-6 bg-gray-50 min-h-screen font-inter">
      <main className="flex flex-col mt-10 sm:mt-12">

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6">

          <div className="bg-white p-4 rounded-2xl shadow">
            <div className="w-12 h-12 flex items-center justify-center rounded-lg bg-blue-100 mb-3">
              <BedDouble className="w-5 h-5 text-blue-600" />
            </div>
            <p className="text-2xl font-bold text-gray-800">{totalBeds}</p>
            <p className="text-sm font-semibold text-gray-500">Total Beds</p>
            <p className="text-sm text-gray-400">All wards</p>
          </div>

          <div className="bg-white p-4 rounded-2xl shadow">
            <div className="w-12 h-12 flex items-center justify-center rounded-lg bg-red-100 mb-3">
              <BedDouble className="w-5 h-5 text-red-600" />
            </div>
            <p className="text-2xl font-bold text-gray-800">{occupiedBeds}</p>
            <p className="text-sm font-semibold text-gray-500">Occupied</p>
            <p className="text-sm text-gray-400">69.2% occupancy</p>
          </div>

          <div className="bg-white p-4 rounded-2xl shadow">
            <div className="w-12 h-12 flex items-center justify-center rounded-lg bg-teal-100 mb-3">
              <CheckCircle className="w-5 h-5 text-teal-600" />
            </div>
            <p className="text-2xl font-bold text-gray-800">{availableBeds}</p>
            <p className="text-sm font-semibold text-gray-500">Available</p>
            <p className="text-sm text-gray-400">Ready for admission</p>
          </div>

          <div className="bg-white p-4 rounded-2xl shadow">
            <div className="w-12 h-12 flex items-center justify-center rounded-lg bg-yellow-100 mb-3">
              <User className="w-5 h-5 text-yellow-600" />
            </div>
            <p className="text-2xl font-bold text-gray-800">8/16</p>
            <p className="text-sm font-semibold text-gray-500">ICU Beds</p>
            <p className="text-sm text-gray-400">8 occupied</p>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-col lg:flex-row lg:items-center gap-4 flex-wrap mb-4">

          <div className="flex flex-wrap items-center gap-2 bg-white rounded-xl p-2 border border-slate-200 w-full lg:w-auto">
            {["all", "available", "occupied", "cleaning"].map((s) => (
              <button
                key={s}
                className="px-3 py-1.5 rounded-lg text-sm capitalize text-slate-600 hover:bg-slate-100"
              >
                {s === "all" ? "All Beds" : s}
              </button>
            ))}
          </div>

          <ul className="flex flex-wrap gap-4 text-sm text-slate-600">
            <li className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-green-500"></span>Available
            </li>
            <li className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-red-500"></span>Occupied
            </li>
            <li className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-yellow-500"></span>Cleaning
            </li>
            <li className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-blue-500"></span>Maintenance
            </li>
          </ul>
          <button
            onClick={() => setOpen(true)}
            className="flex items-center justify-center cursor-pointer gap-2 px-4 sm:px-5 py-2.5 rounded-xl text-white text-sm bg-teal-600 hover:opacity-90 transition shadow-md w-full sm:w-auto"
          >
            <Plus className="w-4 h-4" /> Add Bed
          </button>


        </div>

        {/* Beds Grid */}
        <div className="bg-white rounded-2xl p-4 sm:p-6 shadow">

          <div className="mb-5">
            <h3 className="text-slate-800 font-bold text-base sm:text-lg">
              All Ward — Bed Overview
            </h3>
            <p className="text-slate-400 text-xs">Showing {totalBeds} beds</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">

            {beds.map((bed) => {
              const isAvailable = bed.status === "available";
              const isOccupied = bed.status === "occupied";
              const isCleaning = bed.status === "cleaning";

              return (
                <div
                  key={bed.id}
                  className={`relative p-4 sm:p-5 rounded-2xl border transition-all shadow-sm hover:shadow-md
                    ${isAvailable ? "bg-green-50 border-green-200"
                      : isOccupied ? "bg-red-50 border-red-200"
                        : isCleaning ? "bg-yellow-50 border-yellow-200"
                          : "bg-blue-50 border-blue-200"
                    }`}
                >
                  <span
                    className={`absolute top-3 right-3 w-3 h-3 rounded-full
                      ${isAvailable ? "bg-green-500"
                        : isOccupied ? "bg-red-500"
                          : isCleaning ? "bg-yellow-500"
                            : "bg-blue-500"
                      }`}
                  />

                  <h3 className="font-bold text-lg text-gray-800 flex items-center gap-2">
                    <BedDouble className="text-sm" />
                    {bed.bed_number}
                    <button onClick={() => handleDelete(bed.id)} className="bg-white  flex justify-center cursor-pointer rounded-full w-6 h-6 items-center">
                      <Trash2 color="red" size={15} />
                    </button>
                  </h3>

                  {isOccupied ? (
                    <>
                      <p className="text-gray-700 font-medium mt-2">
                        {bed.patient_name}
                      </p>
                      <p className="text-xs text-gray-400">
                        Since {new Date(bed.assigned_at).toLocaleDateString()}
                      </p>
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

                  <div className="mt-4">
                    {isAvailable && (
                      <button
                        onClick={() => {
                          setSelectedBed(bed);
                          setShowForm(true);
                        }}
                        className="w-full bg-teal-700 text-white py-2 rounded-xl text-sm"
                      >
                        Assign
                      </button>
                    )}

                    {isOccupied && (
                      <button
                        onClick={() => releaseBed(bed.id)}
                        className="w-full border border-red-300 text-red-500 py-2 rounded-xl text-sm"
                      >
                        Release
                      </button>
                    )}

                    {isCleaning && (
                      <button
                        onClick={() => readyBed(bed.id)}
                        className="w-full border border-yellow-300 text-yellow-600 py-2 rounded-xl text-sm"
                      >
                        Cleaning Completed
                      </button>
                    )}

                  </div>
                </div>
              );
            })}

          </div>

          {showForm && selectedBed && (
            <AssignBed
              onClose={() => setShowForm(false)}
              patients={patients}
              bedId={selectedBed.bed_number}
              onAssign={assignBed}
            />
          )}
          {
            open && (
              <AddBedModal
                isOpen={open}
                onClose={() => setOpen(false)}
                onSuccess={fetchBeds}
              />
            )
          }
        </div>
      </main>
    </div>
  );
}

export default BedPages;