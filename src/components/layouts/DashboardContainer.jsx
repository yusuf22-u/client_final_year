import React from "react";
import PatientDashboard from "../../pages/PatientDashboard";
import Dashboard from "../../pages/Dashboard";
import { useAuth } from "../../context/AuthContext";
import DoctorDashboard from "../../pages/DoctorDashboard";

const DashboardContainer = () => {
    const { user } = useAuth();
    if (user.role === "patient") {
        return <PatientDashboard />
    }
    if (user.role === "admin") {
        return <Dashboard />
    }
    if (user.role === "doctor") {
        return <DoctorDashboard/>
    }
    else{
        <h1 className="flex justify-center items-center h-screen text-slate-700"> <span className="text-red-600 font-bold">404</span> page not found</h1>
    }
}
export default DashboardContainer;