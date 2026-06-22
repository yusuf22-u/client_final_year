import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  User,
  Mail,
  Lock,
  Phone,
  MapPin,
  Calendar,
  Briefcase,
  HeartPulse,
  Eye,
  EyeOff,
  CheckCircle,
  ArrowRight,
  Building,
  Shield,
  AlertCircle,
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
  const [profileImage, setProfileImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setProfileImage(file);

    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  };

  // ❌ IMPORTANT: no admin registration
  const roles = [
    { id: "patient", label: "Patient", icon: User },
    { id: "doctor", label: "Doctor", icon: HeartPulse },
    { id: "nurse", label: "Nurse", icon: User },
    { id: "pharmacist", label: "Pharmacist", icon: Shield },
    { id: "lab_technician", label: "Lab Tech", icon: User },
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
      const formData = new FormData();

      formData.append("first_name", firstName);
      formData.append("last_name", lastName);
      formData.append("email", email);
      formData.append("phone", phone);
      formData.append("password", password);
      formData.append("role", role);

      if (profileImage) {
        formData.append("profile_image", profileImage);
      }

      const res = await API.post("/users/register", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      toast.success("Account created");

      const userId = res.data.userId;
      localStorage.setItem("userId", userId);
      localStorage.setItem("role", role);

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
      <div className="w-full max-w-5xl">

        {/* Header */}
        {/* Header */}
        <div className="text-center mb-6 sm:mb-8">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-4">
            <div
              className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl flex items-center justify-center"
              style={{ backgroundColor: "#0E7490" }}
            >
              <HeartPulse className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
            </div>

            <div className="text-center sm:text-left">
              <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-slate-900">
                HealthCare Portal
              </h1>
              <p className="text-xs sm:text-sm text-slate-500 font-semibold">
                Create your account
              </p>
            </div>
          </div>
        </div>

        {/* Progress Steps */}
        <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-center gap-6 md:gap-4">

          {[
            { num: 1, label: "Select Role" },
            { num: 2, label: "Personal Info" },
            { num: 3, label: "Security & Verification" },
          ].map((s, idx) => (
            <div
              key={s.num}
              className="flex flex-col md:flex-row items-start md:items-center gap-3 md:gap-4"
            >
              {/* step content */}
              <div className="flex items-center gap-3">

                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center transition-all shrink-0"
                  style={{
                    backgroundColor: step >= s.num ? "#0E7490" : "#E2E8F0",
                    color: step >= s.num ? "#fff" : "#94A3B8",
                    fontWeight: 700,
                  }}
                >
                  {step > s.num ? (
                    <CheckCircle className="w-5 h-5" />
                  ) : (
                    s.num
                  )}
                </div>

                <div className="leading-tight">
                  <p className="text-xs text-slate-500 font-semibold">
                    STEP {s.num}
                  </p>
                  <p className="text-sm md:text-sm text-slate-800 font-bold">
                    {s.label}
                  </p>
                </div>

              </div>

              {/* connector */}
              {idx < 2 && (
                <div
                  className="
            w-1 h-10 md:w-16 md:h-1 rounded-full
            ml-5 md:ml-0
          "
                  style={{
                    backgroundColor: step > s.num ? "#0E7490" : "#E2E8F0",
                  }}
                />
              )}
            </div>
          ))}

        </div>
        <div className="bg-white rounded-2xl p-8 shadow-xl">
          {/* STEP 1 */}
{step === 1 && (
  <div>
    <div>
      <h2 className="text-center mb-2 text-xl sm:text-2xl font-extrabold text-slate-900">
        Select Your Role
      </h2>

      <p className="text-center text-sm text-slate-500 mb-6 sm:mb-8">
        Choose how you'll be using the HealthCare Portal
      </p>

      {/* ROLE GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 max-w-5xl mx-auto">
        {roles.map((r) => {
          const isSelected = role === r.id;

          return (
            <button
              key={r.id}
              onClick={() => setRole(r.id)}
              className="
                p-4 sm:p-6 rounded-2xl border-2
                transition-all hover:shadow-lg
                text-left sm:text-center
              "
              style={{
                borderColor: isSelected ? r.color : "#E2E8F0",
                backgroundColor: isSelected ? `${r.color}10` : "#fff",
              }}
            >
              {/* ICON */}
              <div
                className="
                  w-12 h-12 sm:w-16 sm:h-16
                  rounded-2xl flex items-center justify-center
                  mx-auto mb-3 sm:mb-4
                "
                style={{ backgroundColor: r.bg }}
              >
                <r.icon
                  className="w-6 h-6 sm:w-8 sm:h-8"
                  style={{ color: r.color }}
                />
              </div>

              {/* TITLE */}
              <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-1 sm:mb-2">
                {r.label}
              </h3>

              {/* DESCRIPTION */}
              <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
                {r.description || "Select this role to continue"}
              </p>
            </button>
          );
        })}
      </div>
    </div>

    {/* CONTINUE BUTTON */}
    <button
      onClick={() => setStep(2)}
      disabled={!step1Valid}
      className="
        mt-6 w-full py-3 rounded-xl
        bg-teal-600 text-white font-semibold
        disabled:opacity-40 disabled:cursor-not-allowed
      "
    >
      Continue <ArrowRight className="inline ml-2 w-4 h-4" />
    </button>
  </div>
)}

          {/* STEP 2 */}
         {step === 2 && (
  <div className="w-full max-w-2xl mx-auto px-2 sm:px-0">

    {/* HEADER */}
    <h2 className="text-center mb-2 text-xl sm:text-2xl font-extrabold text-slate-900">
      Personal Information
    </h2>

    <p className="text-center text-sm text-slate-500 mb-6 sm:mb-8">
      Please provide your personal details
    </p>

    {/* FORM */}
    <div className="space-y-5">

      {/* FIRST NAME */}
      <div>
        <label className="block text-sm font-semibold text-slate-700 mb-2">
          First Name *
        </label>

        <div className="relative">
          <User className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />

          <input
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            placeholder="Enter your first name"
            className="
              w-full pl-10 pr-4 py-3
              text-sm sm:text-base
              border border-slate-200 rounded-xl
              bg-slate-50 text-slate-700
              focus:outline-none focus:border-teal-400 focus:bg-white
              transition-all
            "
          />
        </div>
      </div>

      {/* LAST NAME */}
      <div>
        <label className="block text-sm font-semibold text-slate-700 mb-2">
          Last Name *
        </label>

        <div className="relative">
          <User className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />

          <input
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            placeholder="Enter your last name"
            className="
              w-full pl-10 pr-4 py-3
              text-sm sm:text-base
              border border-slate-200 rounded-xl
              bg-slate-50 text-slate-700
              focus:outline-none focus:border-teal-400 focus:bg-white
              transition-all
            "
          />
        </div>
      </div>

      {/* EMAIL + PHONE (STACK ON MOBILE) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

        {/* EMAIL */}
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            Email Address *
          </label>

          <div className="relative">
            <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />

            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your.email@example.com"
              className="
                w-full pl-10 pr-4 py-3
                text-sm sm:text-base
                border border-slate-200 rounded-xl
                bg-slate-50 text-slate-700
                focus:outline-none focus:border-teal-400 focus:bg-white
                transition-all
              "
            />
          </div>
        </div>

        {/* PHONE */}
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            Phone Number *
          </label>

          <div className="relative">
            <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />

            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="(+220) 000-0000"
              className="
                w-full pl-10 pr-4 py-3
                text-sm sm:text-base
                border border-slate-200 rounded-xl
                bg-slate-50 text-slate-700
                focus:outline-none focus:border-teal-400 focus:bg-white
                transition-all
              "
            />
          </div>
        </div>

      </div>

      {/* PROFILE UPLOAD */}
      <div>
        <label className="block text-sm font-semibold text-slate-700 mb-2">
          Profile Picture
        </label>

        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="
            w-full p-3 text-sm
            border border-slate-200 rounded-xl
            bg-slate-50
          "
        />

        {/* PREVIEW */}
        {preview && (
          <div className="mt-4 flex justify-center">
            <img
              src={preview}
              alt="preview"
              className="w-20 h-20 sm:w-24 sm:h-24 rounded-full object-cover border"
            />
          </div>
        )}
      </div>

    </div>

    {/* BUTTON */}
    <button
      onClick={() => setStep(3)}
      disabled={!step2Valid}
      className="
        mt-6 w-full py-3 rounded-xl
        bg-teal-600 text-white font-semibold
        disabled:opacity-40 disabled:cursor-not-allowed
        transition-all
      "
    >
      Continue
    </button>

  </div>
)}

          {/* STEP 3 */}
        {step === 3 && (
  <div className="w-full max-w-2xl mx-auto px-2 sm:px-0">

    {/* HEADER */}
    <h2 className="text-center mb-2 text-xl sm:text-2xl font-extrabold text-slate-900">
      Security & Verification
    </h2>

    <p className="text-center text-sm text-slate-500 mb-6 sm:mb-8">
      Secure your account and complete verification
    </p>

    {/* FORM */}
    <div className="space-y-5">

      {/* PASSWORD */}
      <div>
        <label className="block text-sm font-semibold text-slate-700 mb-2">
          Password *
        </label>

        <div className="relative">
          <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />

          <input
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Create a strong password"
            className="
              w-full pl-10 pr-12 py-3
              text-sm sm:text-base
              border border-slate-200 rounded-xl
              bg-slate-50 text-slate-700
              focus:outline-none focus:border-teal-400 focus:bg-white
              transition-all
            "
          />

          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500"
          >
            {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* CONFIRM PASSWORD */}
      <div>
        <label className="block text-sm font-semibold text-slate-700 mb-2">
          Confirm Password *
        </label>

        <div className="relative">
          <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />

          <input
            type={showConfirm ? "text" : "password"}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Re-enter your password"
            className="
              w-full pl-10 pr-12 py-3
              text-sm sm:text-base
              border border-slate-200 rounded-xl
              bg-slate-50 text-slate-700
              focus:outline-none focus:border-teal-400 focus:bg-white
              transition-all
            "
          />

          <button
            type="button"
            onClick={() => setShowConfirm(!showConfirm)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500"
          >
            {showConfirm ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
          </button>
        </div>
      </div>

    </div>

    {/* TERMS */}
    <div className="flex items-start gap-2 mt-5">
      <input
        type="checkbox"
        checked={agree}
        onChange={(e) => setAgree(e.target.checked)}
        className="mt-1"
      />
      <label className="text-sm text-slate-600 leading-snug">
        I agree to terms and conditions
      </label>
    </div>

    {/* BUTTON */}
    <button
      onClick={handleRegister}
      disabled={!step3Valid}
      className="
        mt-6 w-full py-3 rounded-xl
        bg-green-600 text-white font-semibold
        disabled:opacity-40 disabled:cursor-not-allowed
        transition-all
      "
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
    </div>
  );
}