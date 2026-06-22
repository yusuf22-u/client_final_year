import React, { useState } from "react";
import { HeartPulse, Shield, Zap, Lock } from "lucide-react";
import { useFormik } from "formik";
import * as Yup from "yup";
import InputField from "../components/forms/InputField";
import API from "../api/axios";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

function Register() {
  const [serverError, setServerError] = useState("");
  const [loading, setLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      phone: "",
      email: "",
      password: "",
      confirmPassword: "",
      profile_image: null,
    },

    validationSchema: Yup.object({
      firstName: Yup.string().required("First name is required"),
      lastName: Yup.string().required("Last name is required"),
      phone: Yup.string().required("Phone is required"),
      email: Yup.string().email("Invalid email").required("Email is required"),
      password: Yup.string().min(6).required("Password is required"),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("password")], "Passwords must match")
        .required("Confirm password is required"),
    }),

    onSubmit: async (values) => {
      setLoading(true);
      setServerError("");

      try {
        const formData = new FormData();

        formData.append("firstName", values.firstName);
        formData.append("lastName", values.lastName);
        formData.append("phone", values.phone);
        formData.append("email", values.email);
        formData.append("password", values.password);

        if (values.profile_image) {
          formData.append("profile_image", values.profile_image);
        }

        await API.post("/users/register", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        toast.success("Account created successfully");
        window.location.href = "/";

      } catch (error) {
        setServerError(
          error.response?.data?.message || "Registration failed"
        );
      } finally {
        setLoading(false);
      }
    },
  });

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

            <h1 className="text-3xl lg:text-5xl font-bold leading-tight">
              Join the Healthcare System
            </h1>

            <ul className="flex flex-col gap-4 mt-8 text-sm">
              <li className="flex items-center gap-3"><Shield size={18}/> Secure Records</li>
              <li className="flex items-center gap-3"><Zap size={18}/> Fast System</li>
              <li className="flex items-center gap-3"><Lock size={18}/> Role Security</li>
            </ul>

          </div>

        </div>

        <p className="relative z-10 text-xs text-teal-200 mt-6">
          © 2026 HealthCore System
        </p>

      </div>

      {/* RIGHT PANEL */}
      <div className="w-full lg:w-[55%] flex items-center justify-center p-4 sm:p-6 lg:p-10">

        <form
          onSubmit={formik.handleSubmit}
          className="w-full max-w-lg bg-white rounded-2xl p-6 sm:p-8 shadow-lg"
        >

          {/* HEADER */}
          <div className="flex flex-col items-center mb-6">
            <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-4 bg-primary">
              <HeartPulse className="w-8 h-8 text-white"/>
            </div>

            <h2 className="text-xl font-bold text-slate-800">
              Create Account
            </h2>

            <p className="text-sm text-slate-400">
              Register to access system
            </p>
          </div>

          {serverError && (
            <div className="text-red-500 text-center mb-3">
              {serverError}
            </div>
          )}

          {/* GRID INPUTS */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

            <InputField
              label="First Name"
              name="firstName"
              value={formik.values.firstName}
              onChange={formik.handleChange}
              error={formik.touched.firstName && formik.errors.firstName}
            />

            <InputField
              label="Last Name"
              name="lastName"
              value={formik.values.lastName}
              onChange={formik.handleChange}
              error={formik.touched.lastName && formik.errors.lastName}
            />

            <InputField
              label="Phone"
              name="phone"
              value={formik.values.phone}
              onChange={formik.handleChange}
              error={formik.touched.phone && formik.errors.phone}
            />

            <InputField
              label="Email"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              error={formik.touched.email && formik.errors.email}
            />

            <InputField
              label="Password"
              type="password"
              name="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              error={formik.touched.password && formik.errors.password}
            />

            <InputField
              label="Confirm Password"
              type="password"
              name="confirmPassword"
              value={formik.values.confirmPassword}
              onChange={formik.handleChange}
              error={formik.touched.confirmPassword && formik.errors.confirmPassword}
            />

          </div>

          {/* IMAGE UPLOAD (FULL WIDTH) */}
          <div className="mt-4">
            <label className="text-sm font-medium">Profile Image</label>

            <input
              type="file"
              name="profile_image"
              accept="image/*"
              onChange={(e) =>
                formik.setFieldValue("profile_image", e.target.files[0])
              }
              className="w-full mt-1 border p-2 rounded-lg"
            />
          </div>

          {/* BUTTON */}
          <button
            type="submit"
            disabled={loading}
            className="w-full mt-5 bg-primary text-white py-3 rounded-xl font-medium
            hover:bg-primary-dark transition-all
            disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Creating account..." : "Register"}
          </button>

          <p className="text-sm mt-4 text-center">
            Already have an account?{" "}
            <Link to="/" className="text-primary font-medium">
              Login
            </Link>
          </p>

        </form>

      </div>

    </div>
  );
}

export default Register;
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  User,
  HeartPulse,
  Eye,
  EyeOff,
  CheckCircle,
  ArrowRight,
  Shield,
} from "lucide-react";
import API from "../api/axios";
import toast from "react-hot-toast";

export default function RegisterPage() {
  const navigate = useNavigate();

  const [step, setStep] = useState(1);

  // form
  const [role, setRole] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [agree, setAgree] = useState(false);

  // ❌ IMPORTANT: no admin registration
  const roles = [
  {
    id: "patient",
    label: "Patient",
    description: "Access your medical records and appointments",
    icon: User,
    color: "purple",
  },
  {
    id: "doctor",
    label: "Doctor",
    description: "Manage patients and medical records",
    icon: HeartPulse,
    color: "cyan",
  },
  {
    id: "nurse",
    label: "Nurse",
    description: "Assist patient care and treatments",
    icon: User,
    color: "emerald",
  },
  {
    id: "pharmacist",
    label: "Pharmacist",
    description: "Manage medications and prescriptions",
    icon: Shield,
    color: "amber",
  },
  {
    id: "lab_technician",
    label: "Lab Technician",
    description: "Handle laboratory tests and reports",
    icon: Shield,
    color: "rose",
  },
];

  // validation
  const emailValid = /\S+@\S+\.\S+/.test(email);
  const phoneValid = phone.length >= 7;

  const passwordValid =
    password.length >= 8 &&
    /[A-Z]/.test(password) &&
    /[0-9]/.test(password);

  const step1Valid = role !== "";

  const step2Valid =
    firstName &&
    lastName &&
    emailValid &&
    phoneValid;

  const step3Valid =
    passwordValid &&
    password === confirmPassword &&
    agree;

  // REGISTER
  const handleRegister = async () => {
    try {
      const res = await API.post("/users/register", {
        first_name: firstName,
        last_name: lastName,
        email,
        phone,
        password,
        role,
      });

      toast.success("Account created");

      const userId = res.data.userId;
      localStorage.setItem("userId", userId);
      localStorage.setItem("role", role);

      // redirect to profile step
      if (role === "patient") {
        navigate("/complete-patient-profile");
      } else {
        navigate("/complete-staff-profile");
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 p-6">
      <div className="w-full max-w-4xl bg-white rounded-2xl shadow-xl p-8">

        {/* HEADER */}
        <div className="text-center mb-8">
          <div className="flex justify-center items-center gap-2">
            <HeartPulse className="text-teal-600" />
            <h1 className="text-2xl font-bold">HealthCare Portal</h1>
          </div>
        </div>

        {/* STEPS */}
        <div className="flex justify-center gap-4 mb-8">
          {[1, 2, 3].map((s) => (
            <div key={s} className="flex items-center gap-2">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-white ${
                  step >= s ? "bg-teal-600" : "bg-gray-300"
                }`}
              >
                {step > s ? <CheckCircle size={14} /> : s}
              </div>
            </div>
          ))}
        </div>

        {/* STEP 1 */}
        {step === 1 && (
          <div>
            <h2 className="text-center font-bold mb-4">Select Role</h2>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {roles.map((r) => (
                <button
                  key={r.id}
                  onClick={() => setRole(r.id)}
                  className={`p-4 border rounded-xl ${
                    role === r.id ? "border-teal-600 bg-teal-50" : ""
                  }`}
                >
                  <r.icon className="mx-auto mb-2" />
                  {r.label}
                </button>
              ))}
            </div>

            <button
              onClick={() => setStep(2)}
              disabled={!step1Valid}
              className="mt-6 w-full bg-teal-600 text-white py-3 rounded-xl disabled:opacity-40"
            >
              Continue <ArrowRight className="inline ml-2" />
            </button>
          </div>
        )}

        {/* STEP 2 */}
        {step === 2 && (
          <div>
            <h2 className="text-center font-bold mb-4">Personal Info</h2>

            <div className="grid grid-cols-2 gap-4">
              <input
                placeholder="First Name"
                className="border p-3 rounded-xl"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />

              <input
                placeholder="Last Name"
                className="border p-3 rounded-xl"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />

              <input
                placeholder="Email"
                className="border p-3 rounded-xl"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <input
                placeholder="Phone"
                className="border p-3 rounded-xl"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>

            <button
              onClick={() => setStep(3)}
              disabled={!step2Valid}
              className="mt-6 w-full bg-teal-600 text-white py-3 rounded-xl disabled:opacity-40"
            >
              Continue
            </button>
          </div>
        )}

        {/* STEP 3 */}
        {step === 3 && (
          <div>
            <h2 className="text-center font-bold mb-4">Security</h2>

            <div className="grid grid-cols-2 gap-4">

              {/* password */}
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  className="border p-3 rounded-xl w-full"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3"
                >
                  {showPassword ? <EyeOff /> : <Eye />}
                </button>
              </div>

              {/* confirm */}
              <div className="relative">
                <input
                  type={showConfirm ? "text" : "password"}
                  placeholder="Confirm"
                  className="border p-3 rounded-xl w-full"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <button
                  onClick={() => setShowConfirm(!showConfirm)}
                  className="absolute right-3 top-3"
                >
                  {showConfirm ? <EyeOff /> : <Eye />}
                </button>
              </div>
            </div>

            {/* terms */}
            <label className="flex items-center gap-2 mt-4">
              <input
                type="checkbox"
                checked={agree}
                onChange={(e) => setAgree(e.target.checked)}
              />
              I agree to terms
            </label>

            <button
              onClick={handleRegister}
              disabled={!step3Valid}
              className="mt-6 w-full bg-green-600 text-white py-3 rounded-xl disabled:opacity-40"
            >
              Create Account
            </button>
          </div>
        )}

        {/* navigation */}
        <div className="mt-6 flex justify-between">
          <button onClick={() => step > 1 ? setStep(step - 1) : navigate("/")}>
            Back
          </button>
        </div>

      </div>
    </div>
  );
}