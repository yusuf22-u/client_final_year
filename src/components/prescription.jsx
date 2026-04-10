import React, { useState } from "react";
import { Plus, X } from "lucide-react";

function PrescriptionsTab() {
  const [activeTab, setActiveTab] = useState("prescriptions");
  const [showForm, setShowForm] = useState(false);
  const [prescriptions, setPrescriptions] = useState([
    { name: "Paracetamol", dosage: "2x daily • 5 days", status: "Active" },
    { name: "Amoxicillin", dosage: "2x daily • 5 days", status: "Active" },
  ]);

  const [newPrescription, setNewPrescription] = useState({
    name: "",
    dosage: "",
    status: "Active",
  });

  const handleAddPrescription = () => {
    setPrescriptions([...prescriptions, newPrescription]);
    setNewPrescription({ name: "", dosage: "", status: "Active" });
    setShowForm(false);
  };
}
export default PrescriptionsTab