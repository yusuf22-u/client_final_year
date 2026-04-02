
import Login from "./pages/Login"
import Navbar from "./components/Navbar"
import Sidebar from "./components/Sidebar"
import Dashboard from "./pages/Dashboard"
import {Routes, Route} from "react-router-dom"
import ProtectedRoute from "./components/ProtectedRoute";
import { useAuth } from "./context/AuthContext";
import Patient from "./pages/Patients";
import './App.css'

function App() {
 const { loading } = useAuth();

  if (loading) {
    return <p>Loading app...</p>;
  }
  return (
    <>
   
  {/* <Login/> */}
  {/* <Navbar/> */}
  {/* <Sidebar/> */}
   <Routes>
     <Route path="/" element={<Login/>} />
    <Route
      path="/dashboard"
      element={
        <ProtectedRoute>
          <Dashboard />
        </ProtectedRoute>
      }
    />
     <Route
      path="/admin/patients"
      element={
        <ProtectedRoute>
          <Patient />
        </ProtectedRoute>
      }
    />
  </Routes>
     
    </>
  )
}

export default App
