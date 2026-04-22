// PatientDashboard.jsx

import React from "react";
import {
  CalendarDays,
  UserRound,
  HeartPulse,
  Pill,
  FileText,
  Send,
  Clock3,
  Phone,
  MapPin,
  CheckCircle,
  Clock
  
} from "lucide-react";
import { useAuth } from "../context/AuthContext";

export default function PatientDashboard() {
  const { user } = useAuth();

  return (
    <main className="flex-1 lg:ml-64 pt-20 px-4 sm:px-6 lg:px-8 pb-8 bg-slate-100 min-h-screen">

      {/* Page Container */}
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-800 capitalize leading-tight">
            Welcome back,{" "}
            <span className="text-cyan-700">
              {user?.firstName} {user?.lastName}
            </span>{" "}
            👋
          </h1>

          <p className="text-slate-500 mt-2 text-sm sm:text-base">
            Here's an overview of your health status as of{" "}
            <span className="font-semibold">March 2, 2026</span>
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">

          {/* Upcoming Appointment */}
          <Card>
            <Title icon={<CalendarDays size={20} />} text="Upcoming Appointment" />

            <h2 className="text-xl font-bold text-slate-800 mt-5">
              Follow-up Consultation
            </h2>

            <div className="space-y-3 mt-5">
              <Row icon={<Clock3 size={18} />} text="Tuesday, March 10 · 10:30 AM" />
              <Row icon={<UserRound size={18} />} text="Dr. Sarah Chen" />
              <Row icon={<MapPin size={18} />} text="Clinic Room 204" />
            </div>

            <div className="border-t mt-6 pt-5">
              <span className="px-4 py-2 rounded-full bg-cyan-100 text-cyan-700 text-sm font-semibold">
                Confirmed
              </span>
            </div>
          </Card>

          {/* Assigned Doctor */}
          <Card>
            <Title icon={<UserRound size={20} />} text="Assigned Doctor" />

            <div className="flex items-center gap-4 mt-5">
              <div className="w-14 h-14 rounded-full bg-cyan-500 text-white font-bold text-xl flex items-center justify-center">
                SC
              </div>

              <div>
                <h2 className="text-lg font-bold text-slate-800">
                  Dr. Sarah Chen
                </h2>
                <p className="text-slate-400 text-sm">Internal Medicine</p>
              </div>
            </div>

            <div className="space-y-3 mt-5">
              <Row icon={<Phone size={18} />} text="+1 (555) 204-8812" />
              <Row icon={<Clock3 size={18} />} text="Mon–Fri, 8 AM – 5 PM" />
              <p className="text-sm text-slate-500">License: IMD-20891</p>
            </div>
          </Card>

          {/* Health Status */}
          <div className="rounded-3xl bg-gradient-to-r from-cyan-700 to-teal-500 text-white p-6 shadow-md">
            <TitleWhite icon={<HeartPulse size={22} />} text="Health Status" />

            <h2 className="text-3xl font-bold mt-6">Monitoring</h2>

            <p className="mt-4 text-sm sm:text-base leading-relaxed text-white/90">
              Your condition is being closely monitored by your care team.
              Keep following your medication schedule.
            </p>

            <div className="border-t border-white/20 mt-6 pt-4 flex justify-between text-sm">
              <span className="text-white/80">Last Updated</span>
              <span className="font-semibold">Mar 2, 2026</span>
            </div>
          </div>

          {/* Latest Prescription */}
          <Card>
            <Title icon={<Pill size={20} />} text="Latest Prescription" />

            <p className="mt-5 text-slate-400 text-sm">
              Issued: February 28, 2026
            </p>

            <div className="space-y-3 mt-5">
              <Medicine name="Amlodipine" dose="10mg" usage="Once daily" />
              <Medicine name="Losartan" dose="50mg" usage="Once daily" />
              <Medicine name="Atorvastatin" dose="20mg" usage="At bedtime" />
            </div>
          </Card>

          {/* Medical Summary */}
          <Card>
            <Title icon={<FileText size={20} />} text="Medical Summary" />

            <div className="space-y-4 mt-6">
              <SummaryRow label="Blood Type" value="O+" />
              <SummaryRow label="Allergies" value="Penicillin" />
              <SummaryRow label="Conditions" value="Hypertension" />
              <SummaryRow label="Last Visit" value="Feb 28, 2026" />
            </div>
          </Card>

          {/* Message Doctor */}
          <Card>
            <h2 className="text-xl font-bold text-slate-800">
              Message Your Doctor
            </h2>

            <p className="text-slate-400 text-sm mt-1">
              Send a message to Dr. Sarah Chen
            </p>

            <textarea
              rows="5"
              placeholder="Type your message..."
              className="w-full mt-5 rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm outline-none resize-none"
            />

            <button className="mt-5 w-full bg-cyan-700 hover:bg-cyan-800 text-white font-semibold py-3 rounded-2xl flex items-center justify-center gap-2">
              <Send size={18} />
              Send Message
            </button>
          </Card>

        </div>
      </div>
    
{/* Second Section */}
<div className="grid grid-cols-1 xl:grid-cols-3 gap-5 mt-6">

  {/* Medical History Timeline */}
  <div className="xl:col-span-2 bg-white rounded-3xl p-5 sm:p-6 shadow-sm border border-slate-100">
    <h2 className="text-xl sm:text-2xl font-bold text-slate-800 mb-6">
      Medical History Timeline
    </h2>

    <div className="relative space-y-8">

      {/* Vertical line */}
      <div className="absolute left-5 top-0 bottom-0 w-[2px] bg-slate-200"></div>

      <TimelineItem
        active
        date="March 2, 2026"
        title="Routine Blood Pressure Check"
        doctor="Dr. Sarah Chen"
        desc="BP: 148/92 mmHg – Improving"
        status="Completed"
        statusColor="green"
        icon={<HeartPulse/>}
      />

      <TimelineItem
        date="February 28, 2026"
        title="Hypertension Stage 2 Diagnosed"
        doctor="Dr. Sarah Chen"
        desc="Medications prescribed. Lifestyle changes recommended."
        status="Diagnosed"
        statusColor="cyan"
        icon={<Clock/>}
      />

      <TimelineItem
        date="January 15, 2026"
        title="Initial Consultation"
        doctor="Dr. James Rivera"
        desc="Blood panel ordered. BP elevated."
        status="Completed"
        statusColor="green"
         icon={<Clock/>}
      />

      <TimelineItem
        date="December 10, 2025"
        title="Annual Physical Examination"
        doctor="Dr. James Rivera"
        desc="Cholesterol slightly elevated. Follow-up advised."
        status="Completed"
        statusColor="green"
         icon={<Clock/>}
      />

      <TimelineItem
        date="July 5, 2025"
        title="Previous Symptoms Reviewed"
        doctor="Dr. James Rivera"
        desc="Condition stable after treatment."
        status="Resolved"
        statusColor="gray"
        icon={<Clock/>}
      />
    </div>
  </div>

  {/* Care Checklist */}
  <div className="bg-white rounded-3xl p-5 sm:p-6 shadow-sm border border-slate-100 h-fit">
    <h2 className="text-xl sm:text-2xl font-bold text-slate-800 mb-6">
      Care Checklist
    </h2>

    <div className="space-y-5">

      <ChecklistItem text="Take morning medications" done />
      <ChecklistItem text="Blood pressure check" done />
      <ChecklistItem text="30-min light exercise" />
      <ChecklistItem text="Low-sodium diet today" />
      <ChecklistItem text="Appointment on Mar 10" />

    </div>
  </div>
</div>


    </main>
  );
}

/* Reusable Components */

function TimelineItem({
  active,
  date,
  title,
  doctor,
  desc,
  status,
  statusColor,
  icon
}) {
  const badge =
    statusColor === "green"
      ? "bg-green-100 text-green-600"
      : statusColor === "cyan"
      ? "bg-cyan-100 text-cyan-700"
      : "bg-slate-100 text-slate-500";

  return (
    <div className="relative pl-16 ">
      {/* Dot */}
      <div
        className={`absolute left-0 top-1 -z-20 w-10 h-10 rounded-full flex items-center justify-center  ${
          active
            ? "bg-cyan-700 text-white"
            : "bg-cyan-50 text-cyan-700 border border-cyan-100"
        }`}
      >
        {icon}
      </div>

      {/* Content */}
      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
        <div>
          <p className="text-slate-400 text-sm">{date}</p>
          <h3 className="text-lg font-bold text-slate-800">{title}</h3>
          <p className="text-slate-500">{doctor}</p>
          <p className="text-slate-400 mt-1">{desc}</p>
        </div>

        <span
          className={`px-4 py-2 rounded-full text-sm font-semibold z-0 whitespace-nowrap ${badge}`}
        >
          {status}
        </span>
      </div>
    </div>
  );
}

function ChecklistItem({ text, done }) {
  return (
    <div className="flex items-center gap-4 z-10">
      <div
        className={`w-6 h-6 rounded-full flex items-center justify-center text-sm ${
          done
            ? "bg-green-100 text-green-600"
            : "border border-slate-300 text-slate-400"
        }`}
      >
        {done ? "✓" : "!"}
      </div>

      <p
        className={`text-base ${
          done ? "text-slate-400 line-through" : "text-slate-600"
        }`}
      >
        {text}
      </p>
    </div>
  );
}

function Card({ children }) {
  return (
    <div className="bg-white rounded-3xl p-5 sm:p-6 shadow-sm border border-slate-100 h-fit">
      {children}
    </div>
  );
}

function Title({ icon, text }) {
  return (
    <div className="flex items-center gap-3">
      <div className="w-11 h-11 rounded-2xl bg-cyan-50 text-cyan-700 flex items-center justify-center">
        {icon}
      </div>
      <h3 className="text-lg font-semibold text-slate-700">{text}</h3>
    </div>
  );
}

function TitleWhite({ icon, text }) {
  return (
    <div className="flex items-center gap-3">
      {icon}
      <h3 className="text-lg font-semibold">{text}</h3>
    </div>
  );
}

function Row({ icon, text }) {
  return (
    <div className="flex items-center gap-3 text-sm text-slate-500">
      <span className="text-cyan-600">{icon}</span>
      <span>{text}</span>
    </div>
  );
}

function Medicine({ name, dose, usage }) {
  return (
    <div className="bg-slate-50 rounded-2xl px-4 py-3 flex justify-between items-center text-sm">
      <span>
        <span className="font-semibold text-slate-700">{name}</span>{" "}
        <span className="text-slate-400">{dose}</span>
      </span>
      <span className="text-slate-400">{usage}</span>
    </div>
  );
}

function SummaryRow({ label, value }) {
  return (
    <div className="flex justify-between gap-4 text-sm">
      <span className="text-slate-400">{label}</span>
      <span className="font-semibold text-slate-700 text-right">{value}</span>
    </div>
  );
}