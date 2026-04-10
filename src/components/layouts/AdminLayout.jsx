// src/layouts/AdminLayout.jsx
import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../Sidebar";
import Navbar from "../Navbar";

export default function AdminLayout() {
  return (
    <div className="flex min-h-screen font-inter bg-gray-100">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <Navbar />
        <main className="p-6 flex-1 overflow-auto">
          <Outlet /> {/* Children pages will render here */}
        </main>
      </div>
    </div>
  );
}