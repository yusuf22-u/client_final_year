import React, { useEffect, useState } from "react";
import API from "../../api/axios";
import toast from "react-hot-toast";
import {
  Search,
  Plus,
  Eye,
  Pencil,
  Trash2,
  Star,
  UserRound,
  Users, Stethoscope, UserCog, Clock3,
  UsbIcon
} from "lucide-react";
import StaffForm from "./StaffForm";
import ViewStaffModal from "./ViewStaffModal";

function Staff() {
  const [staff, setStaff] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState("");
  const [role, setRole] = useState("All Roles");
  const [showModal, setShowModal] = useState(false);
  const [editStaff, setEditStaff] = useState(null);
  const [selectedStaff, setSelectedStaff] = useState(null);
  console.log("roles", role)

  const roles = [
    "All Roles",
    "doctor",
    "nurse",
    "Pharmacist",
    "Lab Technician",
  ];

  // Fetch Staff
  const fetchStaff = async () => {
    try {
      const res = await API.get("/staff");
      console.log("doctorw", res.data)
      setStaff(res.data);
      setFiltered(res.data);
    } catch (error) {
      toast.error("Failed to fetch staff");
    }
  };

  useEffect(() => {
    fetchStaff();
  }, []);

  // Search + Filter
  useEffect(() => {
    let data = [...staff];

    if (role !== "All Roles") {
      data = data.filter(
        (item) => item.role?.toLowerCase() === role.toLowerCase()
      );
    }

    if (search) {
      data = data.filter(
        (item) =>
          item.first_name.toLowerCase().includes(search.toLowerCase()) ||
          item.department.toLowerCase().includes(search.toLowerCase()) ||
          item.specialty.toLowerCase().includes(search.toLowerCase())
      );
    }

    setFiltered(data);
  }, [search, role, staff]);

  // Delete
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this staff member?")) return;

    try {
      await API.delete(`/staff/${id}`);
      toast.success("Deleted");
      fetchStaff();
    } catch (error) {
      toast.error("Delete failed");
    }
  };

  // Edit
  const handleEdit = (item) => {
    setEditStaff(item);
    setShowModal(true);
  };

  const getStatusStyle = (status) => {
    if (status === "Active")
      return "bg-green-100 text-green-600";
    if (status === "Busy")
      return "bg-yellow-100 text-yellow-600";
    if (status === "Leave")
      return "bg-red-100 text-red-600";

    return "bg-gray-100 text-gray-600";
  };
  // filters
  const totalDoctor = staff.filter(s => s.role === "doctor").length
  const totalNurse = staff.filter(s => s.role === "nurse").length
  const totalStatus = staff.filter(s => s.status === "Inactive").length

  return (
    <div className="p-4 sm:p-6 bg-slate-50 min-h-screen">
      <main className="mt-10 sm:mt-12 space-y-6">

        {/* STATS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">

          <div className="bg-white p-4 sm:p-5 rounded-2xl shadow flex flex-col items-start">
            <div className="w-12 h-12 flex items-center justify-center rounded-lg bg-blue-100 mb-3">
              <UsbIcon className="w-5 h-5 text-blue-600" />
            </div>
            <p className="text-xl sm:text-2xl font-bold text-gray-800">{staff.length}</p>
            <p className="text-sm font-semibold text-gray-500">Total staff</p>
            <p className="text-xs sm:text-sm font-semibold text-gray-400">All departments</p>
          </div>

          <div className="bg-white p-4 sm:p-5 rounded-2xl shadow flex flex-col items-start">
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-emerald-100 flex items-center justify-center">
              <Stethoscope className="w-6 h-6 sm:w-8 sm:h-8 text-emerald-600" />
            </div>
            <p className="text-xl sm:text-2xl font-bold text-gray-800">{totalDoctor}</p>
            <p className="text-sm font-semibold text-gray-500">Doctor</p>
            <span className="text-sm sm:text-[18px] text-slate-400 mt-2 block">
              Licensed physicians
            </span>
          </div>

          <div className="bg-white p-4 sm:p-5 rounded-2xl shadow flex flex-col items-start">
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-green-100 flex items-center justify-center">
              <UserCog className="w-6 h-6 sm:w-8 sm:h-8 text-green-600" />
            </div>
            <p className="text-xl sm:text-2xl font-bold text-gray-800">{totalNurse}</p>
            <p className="text-sm font-semibold text-gray-500">Nurse</p>
            <span className="text-sm sm:text-[18px] text-slate-400 mt-2 block">
              Registered nurses
            </span>
          </div>

          <div className="bg-white p-4 sm:p-5 rounded-2xl shadow flex flex-col items-start">
            <div className="w-12 h-12 flex items-center justify-center rounded-lg bg-yellow-100 mb-3">
              <Clock3 className="w-6 h-6 sm:w-8 sm:h-8 text-amber-500" />
            </div>
            <p className="text-xl sm:text-2xl font-bold text-gray-800">{totalStatus}</p>
            <p className="text-sm font-semibold text-gray-500">on Leave</p>
            <span className="text-xs sm:text-sm text-slate-400 mt-2 block">
              Currently away
            </span>
          </div>

        </div>

        {/* CONTROLS */}
        <div className="bg-white rounded-2xl shadow p-4 sm:p-5">
          <div className="flex flex-col lg:flex-row gap-4 justify-between">

            {/* SEARCH */}
            <div className="relative w-full lg:w-96">
              <Search className="w-4 h-4 absolute left-4 top-3.5 text-slate-400" />
              <input
                type="text"
                placeholder="Search name, department, specialty"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:outline-none focus:border-cyan-600"
              />
            </div>

            {/* ROLES */}
            <div className="flex flex-wrap gap-2 bg-slate-100 p-1 rounded-2xl w-full lg:w-auto">
              {roles.map((item) => (
                <button
                  key={item}
                  onClick={() => setRole(item)}
                  className={`px-3 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition ${role === item ? "bg-cyan-700 text-white" : "text-slate-600"
                    }`}
                >
                  {item}
                </button>
              ))}
            </div>

            {/* ADD BUTTON
        <button
          onClick={() => {
            setEditStaff(null);
            setShowModal(true);
          }}
          className="bg-cyan-700 text-white px-4 sm:px-6 py-3 rounded-2xl flex items-center justify-center gap-2 shadow-md w-full lg:w-auto"
        >
          <Plus size={18} />
          Add Staff
        </button> */}

          </div>
        </div>

        {/* TABLE WRAPPER (IMPORTANT RESPONSIVE FIX) */}
        <div className="mt-6 bg-white rounded-2xl shadow overflow-hidden">

          <div className="w-full overflow-x-auto">
            <table className="min-w-[1000px] w-full">

              <thead className="bg-slate-50">
                <tr>
                  {[
                    "Staff Member",
                    "Role / Department",
                    "Specialty",
                    "Schedule",
                    "Patients",
                    "Rating",
                    "Status",
                    "Actions",
                  ].map((head) => (
                    <th
                      key={head}
                      className="text-left px-4 sm:px-5 py-4 text-xs font-semibold text-slate-400 uppercase whitespace-nowrap"
                    >
                      {head}
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody>
                {filtered.map((item) => (
                  <tr
                    key={item.id}
                    className="border-b border-slate-100 hover:bg-slate-50 transition"
                  >

                    {/* STAFF */}
                    <td className="px-4 sm:px-5 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 uppercase sm:w-11 sm:h-11 rounded-full bg-cyan-600 text-white flex items-center justify-center font-bold text-sm">
                          {item.first_name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")
                            .slice(0, 2)}
                          {item.last_name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")
                            .slice(0, 2)}
                        </div>

                        <div className="min-w-0">
                          <p className="font-semibold text-slate-800 capitalize truncate">
                            {item.first_name} {item.last_name}
                          </p>
                          <p className="text-xs sm:text-sm text-slate-400 truncate">
                            {item.email}
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* ROLE */}
                    <td className="px-4 sm:px-5 py-4 whitespace-nowrap">
                      <span className="bg-cyan-100 text-cyan-700 px-3 py-1 rounded-xl text-xs sm:text-sm font-medium">
                        {item.role}
                      </span>
                      <p className="text-xs sm:text-sm text-slate-400 mt-1">
                        {item.department}
                      </p>
                    </td>

                    {/* OTHER FIELDS */}
                    <td className="px-4 sm:px-5 py-4 text-slate-600 whitespace-nowrap text-sm">
                      {item.specialty}
                    </td>

                    <td className="px-4 sm:px-5 py-4 text-slate-600 whitespace-nowrap text-sm">
                      {item.schedule}
                    </td>

                    <td className="px-4 sm:px-5 py-4 font-bold text-slate-700 whitespace-nowrap">
                      {item.total_patients}
                    </td>

                    {/* RATING */}
                    <td className="px-4 sm:px-5 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star
                            key={star}
                            size={14}
                            className={
                              star <= Math.round(item.rating)
                                ? "fill-yellow-400 text-yellow-400"
                                : "text-slate-300"
                            }
                          />
                        ))}
                        <span className="ml-2 text-slate-500 text-sm">
                          {item.rating}
                        </span>
                      </div>
                    </td>

                    {/* STATUS */}
                    <td className="px-4 sm:px-5 py-4 whitespace-nowrap">
                      <span
                        className={`px-3 py-1 rounded-xl text-xs sm:text-sm font-semibold ${getStatusStyle(
                          item.status
                        )}`}
                      >
                        {item.status}
                      </span>
                    </td>

                    {/* ACTIONS */}
                    <td className="px-4 sm:px-5 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-2">

                        <button
                          onClick={() => setSelectedStaff(item)}
                          className="border px-3 py-2 rounded-xl text-slate-500 hover:bg-slate-50"
                        >
                          <Eye size={16} />
                        </button>

                        <button
                          onClick={() => handleEdit(item)}
                          className="border px-3 py-2 rounded-xl text-cyan-700 hover:bg-cyan-50"
                        >
                          <Pencil size={16} />
                        </button>

                        <button
                          onClick={() => handleDelete(item.id)}
                          className="border px-3 py-2 rounded-xl text-red-500 hover:bg-red-50"
                        >
                          <Trash2 size={16} />
                        </button>

                      </div>
                    </td>

                  </tr>
                ))}

                {filtered.length === 0 && (
                  <tr>
                    <td colSpan="8" className="text-center py-8 text-slate-400">
                      No staff found
                    </td>
                  </tr>
                )}

              </tbody>
            </table>
          </div>

        </div>

        {/* MODALS */}
        {showModal && (
          <StaffForm
            staff={editStaff}
            onClose={() => setShowModal(false)}
            onSuccess={() => {
              fetchStaff();
              setShowModal(false);
            }}
          />
        )}

        {selectedStaff && (
          <ViewStaffModal
            staff={selectedStaff}
            onClose={() => setSelectedStaff(null)}
          />
        )}

      </main>
    </div>
  );
}

export default Staff;