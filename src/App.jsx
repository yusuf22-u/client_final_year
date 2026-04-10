// App.jsx
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Patient from "./pages/Patients";
import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminLayout from "./components/layouts/AdminLayout"; // new layout wrapper
import { useAuth } from "./context/AuthContext";
import './App.css';

function App() {
  const { loading } = useAuth();

  if (loading) {
    return <p>Loading app...</p>;
  }

  return (
    <Routes>
      {/* Public login route */}
      <Route path="/" element={<Login />} />

      {/* Admin routes wrapped in ProtectedRoute and AdminLayout */}
      <Route
        path="/admin"
        element={
          <ProtectedRoute>
            <AdminLayout />
          </ProtectedRoute>
        }
      >
        {/* Nested routes inside AdminLayout */}
        <Route index element={<Dashboard />} /> {/* /admin */}
        <Route path="dashboard" element={<Dashboard />} /> {/* /admin/dashboard */}
        <Route path="patients" element={<Patient />} /> {/* /admin/patients */}
        {/* Add more admin pages here */}
      </Route>
    </Routes>
  );
}

export default App;