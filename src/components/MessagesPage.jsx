import { useState } from "react";
import {
  Search,
  Plus,
  Send,
  Paperclip,
  Star,
  Archive,
  User,
  Stethoscope,
  Users,
  Phone,
  Video,
  Info,
  X,
  Check,
  CheckCircle,
  Clock,
} from "lucide-react";

const conversations = [
  {
    id: 1,
    name: "Dr. Sarah Chen",
    role: "doctor",
    avatar: "SC",
    lastMessage:
      "Patient Maria Santos needs urgent review for hypertension medication adjustment.",
    timestamp: "2m ago",
    unread: 2,
    online: true,
    specialty: "Internal Medicine",
    messages: [
      { id: 1, text: "Good morning! I wanted to discuss Maria Santos' case.", timestamp: "09:15 AM", sender: "them" },
      { id: 2, text: "Her BP readings have been consistently high this week.", timestamp: "09:16 AM", sender: "them" },
      { id: 3, text: "Thanks for bringing this up. Let me review her chart.", timestamp: "09:18 AM", sender: "me", status: "read" },
      { id: 4, text: "I've looked at the vitals. We should consider increasing Amlodipine to 15mg.", timestamp: "09:22 AM", sender: "me", status: "read" },
    ],
  },
  {
    id: 2,
    name: "Nurse Emma Rodriguez",
    role: "nurse",
    avatar: "ER",
    lastMessage: "ICU bed occupancy update",
    timestamp: "15m ago",
    unread: 0,
    online: true,
    specialty: "Critical Care",
    messages: [
      { id: 1, text: "Morning update: All stable.", timestamp: "08:30 AM", sender: "them" },
      { id: 2, text: "Great, thanks!", timestamp: "08:35 AM", sender: "me", status: "read" },
    ],
  },
];

const roleConfig = {
  doctor: { label: "Doctor", color: "#0E7490", bg: "#E0F7FA", icon: Stethoscope },
  nurse: { label: "Nurse", color: "#22C55E", bg: "#DCFCE7", icon: User },
  patient: { label: "Patient", color: "#8B5CF6", bg: "#EDE9FE", icon: User },
  admin: { label: "Staff", color: "#F59E0B", bg: "#FEF3C7", icon: Users },
};

export default function MessagesPage() {
  const [selectedConversation, setSelectedConversation] = useState(conversations[0]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterRole, setFilterRole] = useState("all");
  const [messageInput, setMessageInput] = useState("");
  const [showNewMessage, setShowNewMessage] = useState(false);
  const [showConversationInfo, setShowConversationInfo] = useState(false);

  const filtered = conversations.filter((c) => {
    const matchSearch =
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.lastMessage.toLowerCase().includes(searchQuery.toLowerCase());

    const matchRole = filterRole === "all" || c.role === filterRole;
    return matchSearch && matchRole;
  });

  const sendMessage = () => {
    if (!messageInput.trim()) return;
    console.log(messageInput);
    setMessageInput("");
  };

  return (
    <div className="flex flex-col lg:flex-row h-screen bg-slate-50 overflow-hidden">

      {/* SIDEBAR */}
      <div className="w-full lg:mt-10 lg:w-96 border-r bg-white flex flex-col h-[40vh] lg:h-full">

        <div className="p-4 border-b">
          <div className="flex justify-between mb-3">
            <h2 className="font-bold">Messages</h2>
            <button
              onClick={() => setShowNewMessage(true)}
              className="bg-teal-700 text-white p-2 rounded-lg"
            >
              <Plus size={16} />
            </button>
          </div>

          <input
            className="w-full border p-2 rounded-lg text-sm"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="overflow-y-auto flex-1">
          {filtered.map((c) => (
            <div
              key={c.id}
              onClick={() => setSelectedConversation(c)}
              className="p-3 border-b hover:bg-slate-50 cursor-pointer"
            >
              <div className="flex gap-3">
                <div
                  className="w-10 h-10 flex items-center justify-center rounded-full text-white"
                  style={{ background: roleConfig[c.role].color }}
                >
                  {c.avatar}
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-sm">{c.name}</p>
                  <p className="text-xs text-slate-500 truncate">
                    {c.lastMessage}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CHAT */}
      <div className="flex-1 flex flex-col h-full">

        {/* HEADER */}
        <div className="p-4 bg-white border-b flex justify-between">
          <div>
            <p className="font-bold">{selectedConversation?.name}</p>
            <p className="text-xs text-slate-500">
              {selectedConversation?.specialty}
            </p>
          </div>

          <button onClick={() => setShowConversationInfo(true)}>
            <Info />
          </button>
        </div>

        {/* MESSAGES */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {selectedConversation?.messages.map((m) => (
            <div
              key={m.id}
              className={`flex ${m.sender === "me" ? "justify-end" : "justify-start"}`}
            >
              <div
                className="p-3 rounded-xl max-w-[80%]"
                style={{
                  background: m.sender === "me" ? "#0E7490" : "#E2E8F0",
                  color: m.sender === "me" ? "white" : "black",
                }}
              >
                {m.text}
              </div>
            </div>
          ))}
        </div>

        {/* INPUT */}
        <div className="p-3 border-t bg-white flex gap-2">
          <Paperclip />
          <textarea
            value={messageInput}
            onChange={(e) => setMessageInput(e.target.value)}
            className="flex-1 border rounded-lg p-2 text-sm"
            rows={1}
          />
          <button
            onClick={sendMessage}
            className="bg-teal-700 text-white px-4 rounded-lg"
          >
            <Send size={16} />
          </button>
        </div>
      </div>

      {/* INFO MODAL */}
      {showConversationInfo && (
        <div className="fixed inset-0 z-[9999] bg-black/50 flex justify-end">
          <div className="w-full sm:w-80 bg-white p-5">
            <button onClick={() => setShowConversationInfo(false)}>
              <X />
            </button>
            <p className="font-bold mt-4">Conversation Info</p>
          </div>
        </div>
      )}

      {/* NEW MESSAGE MODAL */}
      {showNewMessage && (
        <div className="fixed inset-0 z-[9999] bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-md rounded-xl p-5">
            <div className="flex justify-between">
              <p className="font-bold">New Message</p>
              <button onClick={() => setShowNewMessage(false)}>
                <X />
              </button>
            </div>

            <input className="w-full border p-2 mt-3 rounded-lg" placeholder="Recipient" />
            <textarea className="w-full border p-2 mt-3 rounded-lg" rows={4} placeholder="Message" />

            <button className="w-full bg-teal-700 text-white p-2 rounded-lg mt-3">
              Send
            </button>
          </div>
        </div>
      )}
    </div>
  );
}