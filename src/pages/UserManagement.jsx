import { useEffect, useState } from "react";
import API from "../api/axios";
import toast from "react-hot-toast";

const UserManagement = () => {
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    try {
      const res = await API.get("/users/get_all_users");
      setUsers(res.data.data);
    } catch (err) {
      toast.error("Failed to load users");
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const changeRole = async (id, role) => {
    try {
      await API.put(`/users/role/${id}`, { role });
      toast.success("Role updated");
      fetchUsers();
    } catch {
      toast.error("Failed to update role");
    }
  };

  const deleteUser = async (id) => {
    try {
      await API.delete(`/users/${id}`);
      toast.success("User deleted");
      fetchUsers();
    } catch {
      toast.error("Failed to delete user");
    }
  };

  return (
    <div className="p-6 mt-8">
     <div className="w-full flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-5">

  {/* LEFT: Title + subtitle */}
  <div>
    <h2 className="text-xl sm:text-2xl font-bold text-slate-800">
      User Management
    </h2>

    <p className="text-sm text-slate-400 mt-1">
      Manage system users, roles, and access permissions
    </p>
  </div>

  {/* RIGHT: Actions */}
  <div className="flex items-center gap-3">

    {/* Search input (optional but recommended) */}
    <input
      type="text"
      placeholder="Search users..."
      className="px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-200 w-full sm:w-64"
    />

    {/* Add User button (optional future feature) */}
    <button
      className="px-4 py-2 text-sm text-white rounded-lg transition-all hover:opacity-90"
      style={{
        background: "linear-gradient(135deg, #0E7490, #14B8A6)",
        fontWeight: 600,
      }}
    >
      + Add User
    </button>

  </div>
</div>
    <div className="w-full overflow-x-auto bg-white rounded-2xl">
  <table className="min-w-[900px] w-full">
    <thead>
      <tr className="border-b border-slate-100">
        {["User", "Email", "Role", "Status", "Actions"].map((h) => (
          <th
            key={h}
            className="text-left px-4 sm:px-5 py-4 text-xs text-slate-400 uppercase tracking-wider whitespace-nowrap"
            style={{ fontWeight: 600 }}
          >
            {h}
          </th>
        ))}
      </tr>
    </thead>

    <tbody>
      {users.map((u) => (
        <tr
          key={u.id}
          className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors"
        >

          {/* USER */}
          <td className="px-4 sm:px-5 py-4 whitespace-nowrap">
            <div className="flex items-center gap-3">

              {/* Avatar */}
              <div
                className="w-8 h-8 uppercase rounded-full flex items-center justify-center text-white text-xs shrink-0"
                style={{
                  background: "linear-gradient(135deg, #0E7490, #14B8A6)",
                  fontWeight: 700,
                }}
              >
                {u.first_name?.[0]}
                {u.last_name?.[0]}
              </div>

              <div className="min-w-0">
                <p
                  className="text-sm text-slate-800 capitalize truncate"
                  style={{ fontWeight: 600 }}
                >
                  {u.first_name} {u.last_name}
                </p>

                <p className="text-xs text-slate-400">
                  ID: {u.id}
                </p>
              </div>
            </div>
          </td>

          {/* EMAIL */}
          <td className="px-4 sm:px-5 py-4 whitespace-nowrap">
            <p className="text-sm text-slate-700">{u.email}</p>
          </td>

          {/* ROLE */}
          <td className="px-4 sm:px-5 py-4 whitespace-nowrap">
            <select
              value={u.role}
              onChange={(e) => changeRole(u.id, e.target.value)}
              className="text-xs px-2.5 py-1.5 rounded-lg border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-teal-200"
              style={{ fontWeight: 600 }}
            >
              <option value="admin">Admin</option>
              <option value="doctor">Doctor</option>
              <option value="nurse">Nurse</option>
              <option value="pharmacist">Pharmacist</option>
              <option value="lab_technician">Lab Tech</option>
              <option value="patient">Patient</option>
            </select>
          </td>

          {/* STATUS */}
          <td className="px-4 sm:px-5 py-4 whitespace-nowrap">
            <span
              className="inline-flex items-center text-xs px-2.5 py-1 rounded-lg"
              style={{
                backgroundColor:
                  u.status === "active"
                    ? "rgba(34,197,94,0.1)"
                    : u.status === "inactive"
                    ? "rgba(239,68,68,0.1)"
                    : "rgba(245,158,11,0.1)",
                color:
                  u.status === "active"
                    ? "#16A34A"
                    : u.status === "inactive"
                    ? "#DC2626"
                    : "#D97706",
                fontWeight: 600,
              }}
            >
              {u.status}
            </span>
          </td>

          {/* ACTIONS */}
          <td className="px-4 sm:px-5 py-4 whitespace-nowrap">
            <div className="flex items-center gap-2">

              <button
                onClick={() => deleteUser(u.id)}
                className="text-xs px-2.5 py-1.5 rounded-lg text-white transition-all hover:opacity-90"
                style={{
                  backgroundColor: "#EF4444",
                  fontWeight: 600,
                }}
              >
                Delete
              </button>

            </div>
          </td>

        </tr>
      ))}
    </tbody>
  </table>
</div>
    </div>
  );
};

export default UserManagement;