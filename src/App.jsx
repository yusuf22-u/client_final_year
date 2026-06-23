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
import MedicalRecordPage from "./pages/patients/MedicalRecordPage"
import PatientBooking from "./pages/patients/PatientBooking";
import AssignPatient from "./pages/patients/AssignPatient";
import Register from "./pages/Register";
import './App.css';
import { UserAccountPage } from "./pages/UserAccountPage";
import {Profile} from "./pages/patients/Profile"
import PatientMedicalRecord from "./pages/patients/PatientMedicalRecord"
import DoctorAppt from "./pages/staff/DoctorAppt";
import CompletePatientProfile from "./pages/patients/CompletePatientProfile";
import CompleteStaffProfile from "./pages/staff/CompleteStaffProfile";
import UserMessage from "./pages/staff/UserMessage";
import UserManagement from "./pages/UserManagement";
import DoctorPatientPage from "./pages/staff/DoctorPatientPage"
function App() {
  const { loading } = useAuth();

  if (loading) {
    return <p>Loading app...</p>;
  }

  return (
    <Routes>
      {/* Public login route */}
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/complete-patient-profile" element={<CompletePatientProfile />} />
      <Route path="/complete-staff-profile" element={<CompleteStaffProfile />} />

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
        {/* <Route path="message" element={<MessagesPage/>} /> /admin/message */}
        <Route path="medical/:patient_id" element={<MedicalRecordPage/>} /> {/* /admin/medical */}
        <Route path="booking" element={<PatientBooking/>} /> {/* /admin/booking */}
        <Route path="user-account" element={<UserAccountPage/>} /> {/* /user-account/booking */}
        <Route path="assign-patient" element={<AssignPatient/>} /> {/* /admin/assign-patient */}
        <Route path="my-profile" element={<Profile/>} /> {/* /admin/assign-patient */}
        <Route path="my-medical-record" element={<PatientMedicalRecord/>} /> {/* /admin/my-medical-record */}
        <Route path="doctor-appointments" element={<DoctorAppt/>} /> {/* /admin/doctor-appointments */}
        <Route path="message" element={<UserMessage/>} /> {/* /admin/doctor-appointments */}
        <Route path="users-management" element={<UserManagement/>} /> {/* /admin/doctor-appointments */}
       <Route path="doctor/patient/:id" element={<DoctorPatientPage />}  />  {/* /admin/doctor-appointments */}
        
        {/* Add more admin pages here */}
      </Route>
    </Routes>
  );
}

export default App;