import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaBell, FaTrashAlt, FaCheckCircle, FaCheck, FaCheckDouble } from "react-icons/fa";
import ConfirmationDialog from "../ConfirmationDialog";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { useAuth } from "../../context/AuthContext"
import API from "../../api/axios";
import { Check, CircleCheckBig, Train, Trash2 } from "lucide-react";

const UserMessage = () => {
    const [notifications, setNotifications] = useState([]);
    const [error, setError] = useState("");
    const [newMessageCount, setNewMessageCount] = useState(0);
    const [showDialog, setShowDialog] = useState(false);
    const [deleteId, setDeleteId] = useState(null);
    const [visibleCount, setVisibleCount] = useState(5)
    const { user } = useAuth()
console.log("se",import.meta.env.VITE_API_URL);

    console.log("count", newMessageCount)
    useEffect(() => {
        const fetchNotification = async () => {
            try {
                let baseUrl = "";

                if (user?.role === "admin") {
                    baseUrl = "/notifications";
                } else {
                    baseUrl = `/notifications/get_user`;
                }

                const res = await API.get(baseUrl);
                setNotifications(res.data);
            } catch (error) {
                console.log(error);
            }
        };

        if (user) {
            fetchNotification();
        }
    }, [user]);

    useEffect(() => {
        const count = notifications.filter((p) => p.is_read === 0).length
        setNewMessageCount(count)
    }, [notifications])
    const handleMarkAsRead = async (id) => {
        try {
            await API.put(
                `/notifications/read/${id}`,
                {}

            );

            // Update the notification state directly
            setNotifications((prevNotifications) =>
                prevNotifications.map((notification) =>
                    notification.id === id ? { ...notification, is_read: 1 } : notification
                )
            );

            // Reduce the new message count
            setNewMessageCount((prevCount) => (prevCount > 0 ? prevCount - 1 : 0));
        } catch (error) {
            console.error("Error marking as read:", error);
        }
    };


    const handleDelete = async () => {
        if (!deleteId) return;
        try {
            const res = await API.delete(`/notifications/delete/${deleteId}`);

            if (res.data.Status === true) {
                alert("Message deleted successfully!");
                setNotifications(notifications.filter((notification) => notification.id !== deleteId));
                setShowDialog(false);
            }
        } catch (error) {
            // console.error("Error:", error.response?.data?.error || "Something went wrong");
            console.log("server",error)
            alert("Failed to delete the message. Please try again.");
        }
    };

    return (
        <div className="flex-1 pt-20 px-4 sm:px-6 lg:px-8 pb-8 bg-slate-100 min-h-screen ">
            <div className="flex flex-wrap justify-between items-center mb-4">
                <h2 className="text-2xl font-bold text-gray-800">Messages</h2>
                <h2 className="text-xl font-bold text-gray-800">Unread: {newMessageCount}</h2>
            </div>
            {error && <p className="text-red-500 mb-4">{error}</p>}

            <ul className="space-y-4 bg-white rounded-2xl">
                {notifications.slice(0, visibleCount).map((notification) => (
                    <li key={notification.id} className="flex flex-wrap items-start sm:items-center justify-between p-4 border-b border-gray-200 rounded-lg hover:bg-gray-50 transition-all">
                        <div className="flex-shrink-0">
                            <FaBell className="text-yellow-500 text-3xl" />
                        </div>
                        <div className="ml-4 flex-1">
                            <p className="text-gray-800 capitalize font-semibold">{notification.message} <span className="text-red-400">{notification.is_read === 0 ? "(new!)" : null}</span></p>
                            <p className="text-sm text-gray-500 mt-1">
                                Received: {new Date(notification.created_at).toLocaleString()}
                            </p>
                        </div>
                        <div className="flex items-center space-x-2 mt-2 sm:mt-0">
                            {notification.is_read === 1 ? (
                                <FaCheckDouble className="text-green-500 text-xl" title="Read" />
                            ) : (
                                // <FaCheck className="text-gray-400 text-xl" title="Unread" />
                                <span></span>
                            )}
                        </div>
                        <div className="flex items-center space-x-4 mt-2 sm:mt-0">
                            {notification.is_read === 0 && (
                                <button
                                    onClick={() => handleMarkAsRead(notification.id)}
                                    className="text-green-500 hover:text-green-700 transition-all"
                                    title="Mark as Read"
                                >
                                    <CircleCheckBig className="text-xl" />
                                </button>
                            )}
                            <button
                                onClick={() => {
                                    setDeleteId(notification.id);
                                    setShowDialog(true);
                                }}
                                className="text-red-500 hover:text-red-700 transition-all"
                                title="Delete Message"
                            >
                                <Trash2 className="text-xl" />
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
            {notifications.length > 5 && (
                <div className="text-center mt-4 flex justify-between">
                    {/* Previous Button */}
                    <button
                        onClick={() => setVisibleCount(visibleCount - 5)}
                        disabled={visibleCount <= 5} // Disable when at the first page
                        className={`px-4 py-2 rounded-lg transition-all flex items-center space-x-2 ${visibleCount <= 5
                            ? "bg-gray-300 cursor-not-allowed"
                            : "bg-blue-500 hover:bg-blue-700 text-white"
                            }`}
                    >
                        <FaArrowLeft />
                        <span>Prev</span>
                    </button>

                    {/* Next Button */}
                    <button
                        onClick={() => setVisibleCount(visibleCount + 5)}
                        disabled={visibleCount >= notifications.length}
                        className={`px-4 py-2 rounded-lg transition-all flex items-center space-x-2 ${visibleCount >= notifications.length
                            ? "bg-gray-300 cursor-not-allowed"
                            : "bg-blue-500 hover:bg-blue-700 text-white"
                            }`}
                    >
                        <span>Next</span>
                        <FaArrowRight />
                    </button>
                </div>
            )}



            {showDialog && (
                <ConfirmationDialog
                    message="Are you sure you want to delete this message?"
                    onCancel={() => setShowDialog(false)}
                    handleDelete={handleDelete}
                />
            )}
        </div>
    );
};

export default UserMessage;