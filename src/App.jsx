// App.jsx
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Patient from "./pages/patients/Patients";
import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminLayout from "./components/layouts/AdminLayout"; // new layout wrapper
import { useAuth } from "./context/AuthContext";
import BedPages from "./pages/beds/BedPages";
import Staff from "./pages/staff/Staff";
import DashboardContainer from "./components/layouts/DashboardContainer";
import AppointmentsPage from "./pages/AppointmentsPage";
import PharmacyPage from "./pages/PharmacyPage";
import AnalyticsPage from "./components/AnalyticsPage";
import MessagesPage from "./components/MessagesPage";
import MedicalRecordPage from "./pages/MedicalRecordPage"
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
        <Route index element={<DashboardContainer />} /> {/* /admin */}
        <Route path="dashboard" element={<Dashboard />} /> {/* /admin/dashboard */}
        <Route path="patients" element={<Patient />} /> {/* /admin/patients */}
        <Route path="beds" element={<BedPages />} /> {/* /admin/beds */}
        <Route path="staff" element={<Staff />} /> {/* /admin/staff */}
        <Route path="appointment" element={<AppointmentsPage/>} /> {/* /admin/appointment */}
        <Route path="pharmacy" element={<PharmacyPage/>} /> {/* /admin/pharmacy */}
        <Route path="report" element={<AnalyticsPage/>} /> {/* /admin/report */}
        <Route path="message" element={<MessagesPage/>} /> {/* /admin/message */}
        <Route path="medical" element={<MedicalRecordPage/>} /> {/* /admin/medical */}
        {/* Add more admin pages here */}
      </Route>
    </Routes>
  );
}

export default App;