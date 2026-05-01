import React, { useState } from "react";
import { HeartPulse, Eye, EyeOff, Shield, Zap, Lock } from "lucide-react";
import {useForm} from "../hooks/useForm.js"
import {validateEmail, validatePassword  } from "../utils/validators.js";
import InputField from "../components/forms/InputField"
import API from "../api/axios.js";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";


const initialState = {
  values: {
    email: "",
    password: "",
  },
  errors: {
    email: "",
    password: "",
  },
};

function Login() {
  const { values, errors, updateField, setError } = useForm(initialState);
  const [serverError, setServerError]=useState("")
  const[loading, setLoading]=useState(false)
  const { setUser } = useAuth();

  const handleOnchange = (e) => {
    const { name, value } = e.target;

    // updating input
    updateField(name, value)

    // validation
    let errMessage = "";
    if(name==="email"){
      errMessage=validateEmail(value)
    }
     if (name === "password") {
       errMessage = validatePassword(value);
    }

    // setting error
   setError(name, errMessage)
  };

  // handleSubmit
const handleSubmit = async (e) => {
  e.preventDefault();

  let hasError = false;

  if (!values.email.trim()) {
    setError("email", "Email is required");
    hasError = true;
  }

  if (!values.password.trim()) {
    setError("password", "Password is required");
    hasError = true;
  }

  if (hasError) return;

  setLoading(true);        // ✅ start loading
  setServerError("");

  try {
   

const res = await API.post("/users/login", values);

localStorage.setItem("token", res.data.token);

// fetch user
const profile = await API.get("/users/profile", {
  headers: {
    Authorization: `Bearer ${res.data.token}`
  }
});
setUser(profile.data);

window.location.href = "/admin";
  } catch (error) {
    setServerError(
      error.response?.data?.message || "Login failed"
    );
  } finally {
    setLoading(false);     // ✅ stop loading
  }
};
  return (
    <div className="bg-background min-h-screen flex flex-col lg:flex-row">

  {/* LEFT PANEL */}
  <div className="relative w-full lg:w-[45%] min-h-75 lg:min-h-screen side text-white p-6 flex flex-col justify-between">

    <div className="absolute inset-0 overlay"></div>

    <div className="relative z-10">

      <div className="flex items-center gap-2 text-2xl font-semibold p-4">
        <HeartPulse />
        <span>HealthCore</span>
      </div>

      <div className="px-4 mt-8">

        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-6 bg-white/20 backdrop-blur">
          <span className="w-2 h-2 rounded-full bg-emerald-300 animate-pulse" />
          <span className="text-xs font-medium">
            System Online
          </span>
        </div>

        <h1 className="text-3xl lg:text-5xl font-bold leading-tight">
          Improving Healthcare Through Technology
        </h1>

        <ul className="flex gap-4 mt-6 text-sm list-disc list-inside">
          <li>Secure</li>
          <li>Efficient</li>
          <li>Reliable</li>
        </ul>

        <ul className="flex flex-col gap-4 mt-8 text-sm">
          <li className="flex items-center gap-3">
            <Shield size={18}/>
            HIPAA Compliant & Encrypted
          </li>

          <li className="flex items-center gap-3">
            <Zap size={18}/>
            Real-time Patient Monitoring
          </li>

          <li className="flex items-center gap-3">
            <Lock size={18}/>
            Role-based Secure Access Control
          </li>
        </ul>

      </div>

    </div>

    <p className="relative z-10 text-xs text-teal-200 mt-6">
      © 2026 HealthCore System. All rights reserved.
    </p>

  </div>


  {/* RIGHT PANEL */}
  
    <div className="w-full lg:w-[55%] flex items-center justify-center p-6 sm:p-10">

    <form
      onSubmit={handleSubmit}
      className="w-full max-w-md bg-white rounded-2xl p-8 sm:p-10 shadow-lg"
    >

      <div className="flex flex-col items-center mb-8">

        <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-4 bg-primary">
          <HeartPulse className="w-8 h-8 text-white"/>
        </div>

        <h2 className="text-xl font-bold text-slate-800">
          Community Health Center System
        </h2>

        <p className="text-sm text-slate-400">
          Sign in to access your portal
        </p>

      </div>
      <div className="text-red-500 text-center">{serverError}</div>

      <InputField
        label="Email Address"
        name="email"
        value={values.email}
        onChange={handleOnchange}
        error={errors.email}
        placeholder="Enter your email"
      />

      <InputField
        label="Password"
        type="password"
        name="password"
        value={values.password}
        onChange={handleOnchange}
        error={errors.password}
        placeholder="••••••••"
      />

     <button
  disabled={loading}
  className="w-full mt-4 bg-primary text-white py-3 rounded-xl font-medium
  hover:bg-primary-dark transition-all duration-200
  disabled:opacity-50 disabled:cursor-not-allowed"
>
  {loading ? "Logging in..." : "Login"}
</button>
 <p className="text-sm mt-4 text-center">
           you dont have an account?{" "}
            <Link to="/register" className="text-primary font-medium">
              Create account
            </Link>
          </p>

    </form>

  </div>

  
  
</div>
  );
}

export default Login;
