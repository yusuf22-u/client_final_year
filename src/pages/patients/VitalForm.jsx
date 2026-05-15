import React, { useState } from "react";
import { X } from "lucide-react";
import API from "../../api/axios.js"
import toast from "react-hot-toast";
function VitalForm({
    setShowAddVital,
    vitalForm,
    setVitalForm,
     patient_id,
      onSuccess
    //   setVitalHistory,
}) {
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);

    // handle input
    const handleVitalChange = (e) => {
        setVitalForm({
            ...vitalForm,
            [e.target.name]: e.target.value,
        });

        // remove error while typing
        setErrors({
            ...errors,
            [e.target.name]: "",
        });
    };

    // validation
    const validate = () => {
        let newErrors = {};

        if (!vitalForm.date) newErrors.date = "Date is required";
        if (!vitalForm.bp) newErrors.bp = "Blood pressure required";
        if (!vitalForm.hr) newErrors.hr = "Heart rate required";
        if (!vitalForm.temp) newErrors.temp = "Temperature required";
        if (!vitalForm.weight) newErrors.weight = "Weight required";
        if (!vitalForm.respiratory)
            newErrors.respiratory = "Respiratory rate required";
        if (!vitalForm.oxygen) newErrors.oxygen = "Oxygen level required";

        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;
    };

    // submit
    const handleAddVital = async (e) => {
        e.preventDefault();

        if (!validate()) return;

        try {
            setLoading(true);

            await API.post("/vitals", {
                patient_id:  patient_id,   // current patient
                blood_pressure: vitalForm.bp,
                heart_rate: Number(vitalForm.hr),
                temperature: Number(vitalForm.temp),
                weight: Number(vitalForm.weight),
                respiratory_rate: Number(vitalForm.respiratory),
                oxygen_saturation: Number(vitalForm.oxygen),
                recorded_at: vitalForm.date,
            });

            toast.success("Vital added successfully");
            if(onSuccess) await onSuccess()
            // refresh list
            // fetchVitals();

            // reset form
            setVitalForm({
                date: "",
                bp: "",
                hr: "",
                temp: "",
                weight: "",
                respiratory: "",
                oxygen: "",
            });

            setShowAddVital(false);

        } catch (error) {
            console.error(error);
            toast.error("Failed to add vital");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4 z-50">
            <div className="bg-white w-full max-w-2xl rounded-3xl shadow-lg relative max-h-[90vh] overflow-y-auto">

                {/* Header */}
                <div className="sticky top-0 bg-white z-10 px-6 py-5 border-b flex justify-between items-center rounded-t-3xl">
                    <h2 className="text-lg font-semibold text-gray-800">
                        Add Vital Reading
                    </h2>

                    <button
                        onClick={() => setShowAddVital(false)}
                        className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 transition"
                    >
                        <X className="w-4 h-4" />
                    </button>
                </div>

                <form onSubmit={handleAddVital} className="p-6">

                    {/* GRID */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                        {/* Date */}
                        <div>
                            <label className="text-sm text-gray-600">Date</label>
                            <input
                                type="date"
                                name="date"
                                value={vitalForm.date}
                                onChange={handleVitalChange}
                                className="w-full mt-1 border border-gray-200 bg-gray-50 rounded-xl px-3 py-3 focus:outline-none focus:ring-2 focus:ring-teal-500"
                            />
                            {errors.date && (
                                <p className="text-red-500 text-xs mt-1">{errors.date}</p>
                            )}
                        </div>

                        {/* BP */}
                        <div>
                            <label className="text-sm text-gray-600">Blood Pressure</label>
                            <input
                                type="text"
                                name="bp"
                                placeholder="120/80"
                                value={vitalForm.bp}
                                onChange={handleVitalChange}
                                className="w-full mt-1 border border-gray-200 bg-gray-50 rounded-xl px-3 py-3 focus:outline-none focus:ring-2 focus:ring-teal-500"
                            />
                            {errors.bp && (
                                <p className="text-red-500 text-xs mt-1">{errors.bp}</p>
                            )}
                        </div>

                        {/* HR */}
                        <div>
                            <label className="text-sm text-gray-600">Heart Rate</label>
                            <input
                                type="number"
                                name="hr"
                                placeholder="76"
                                value={vitalForm.hr}
                                onChange={handleVitalChange}
                                className="w-full mt-1 border border-gray-200 bg-gray-50 rounded-xl px-3 py-3 focus:outline-none focus:ring-2 focus:ring-teal-500"
                            />
                            {errors.hr && (
                                <p className="text-red-500 text-xs mt-1">{errors.hr}</p>
                            )}
                        </div>

                        {/* Temp */}
                        <div>
                            <label className="text-sm text-gray-600">Temperature °C</label>
                            <input
                                type="number"
                                step="0.1"
                                name="temp"
                                placeholder="36.8"
                                value={vitalForm.temp}
                                onChange={handleVitalChange}
                                className="w-full mt-1 border border-gray-200 bg-gray-50 rounded-xl px-3 py-3 focus:outline-none focus:ring-2 focus:ring-teal-500"
                            />
                            {errors.temp && (
                                <p className="text-red-500 text-xs mt-1">{errors.temp}</p>
                            )}
                        </div>

                        {/* Weight */}
                        <div>
                            <label className="text-sm text-gray-600">Weight (kg)</label>
                            <input
                                type="number"
                                step="0.1"
                                name="weight"
                                placeholder="72"
                                value={vitalForm.weight}
                                onChange={handleVitalChange}
                                className="w-full mt-1 border border-gray-200 bg-gray-50 rounded-xl px-3 py-3 focus:outline-none focus:ring-2 focus:ring-teal-500"
                            />
                            {errors.weight && (
                                <p className="text-red-500 text-xs mt-1">{errors.weight}</p>
                            )}
                        </div>

                        {/* Respiratory */}
                        <div>
                            <label className="text-sm text-gray-600">Respiratory Rate</label>
                            <input
                                type="number"
                                name="respiratory"
                                placeholder="16"
                                value={vitalForm.respiratory}
                                onChange={handleVitalChange}
                                className="w-full mt-1 border border-gray-200 bg-gray-50 rounded-xl px-3 py-3 focus:outline-none focus:ring-2 focus:ring-teal-500"
                            />
                            {errors.respiratory && (
                                <p className="text-red-500 text-xs mt-1">
                                    {errors.respiratory}
                                </p>
                            )}
                        </div>

                        {/* Oxygen full width */}
                        <div className="md:col-span-2">
                            <label className="text-sm text-gray-600">Oxygen Saturation (%)</label>
                            <input
                                type="number"
                                name="oxygen"
                                placeholder="98"
                                value={vitalForm.oxygen}
                                onChange={handleVitalChange}
                                className="w-full mt-1 border border-gray-200 bg-gray-50 rounded-xl px-3 py-3 focus:outline-none focus:ring-2 focus:ring-teal-500"
                            />
                            {errors.oxygen && (
                                <p className="text-red-500 text-xs mt-1">
                                    {errors.oxygen}
                                </p>
                            )}
                        </div>
                    </div>

                    {/* Buttons */}
                    <div className="flex flex-col sm:flex-row gap-3 pt-6">
                        <button
                            type="button"
                            onClick={() => setShowAddVital(false)}
                            className="w-full sm:w-1/2 py-3 rounded-xl border border-gray-200 text-gray-600 hover:bg-gray-100"
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-1/2 py-3 rounded-xl bg-teal-700 text-white"
                        >
                            {loading ? "Saving..." : "Save Reading"}
                        </button>
                    </div>

                </form>
            </div>
        </div>
    );
}

export default VitalForm;