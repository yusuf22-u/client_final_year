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