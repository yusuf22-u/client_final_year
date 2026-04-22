import { useState } from "react";
import {
  Search,
  Plus,
  Send,
  Paperclip,
  MoreVertical,
  Star,
  Archive,
  Trash2,
  User,
  Stethoscope,
  Users,
  Circle,
  Phone,
  Video,
  Info,
  X,
  Check,
  ChevronDown,
  AlertCircle,
  CheckCircle,
  Clock,
} from "lucide-react";



const conversations= [
  {
    id: 1,
    name: "Dr. Sarah Chen",
    role: "doctor",
    avatar: "SC",
    lastMessage: "Patient Maria Santos needs urgent review for hypertension medication adjustment.",
    timestamp: "2m ago",
    unread: 2,
    online: true,
    specialty: "Internal Medicine",
    messages: [
      { id: 1, text: "Good morning! I wanted to discuss Maria Santos' case.", timestamp: "09:15 AM", sender: "them" },
      { id: 2, text: "Her BP readings have been consistently high this week.", timestamp: "09:16 AM", sender: "them" },
      { id: 3, text: "Thanks for bringing this up. Let me review her chart.", timestamp: "09:18 AM", sender: "me", status: "read" },
      { id: 4, text: "I've looked at the vitals. We should consider increasing Amlodipine to 15mg.", timestamp: "09:22 AM", sender: "me", status: "read" },
      { id: 5, text: "Agreed. Should we schedule a follow-up for next week?", timestamp: "09:24 AM", sender: "them" },
      { id: 6, text: "Yes, please book her for Tuesday morning.", timestamp: "09:25 AM", sender: "me", status: "delivered" },
      { id: 7, text: "Patient Maria Santos needs urgent review for hypertension medication adjustment.", timestamp: "09:26 AM", sender: "them" },
    ],
  },
  {
    id: 2,
    name: "Nurse Emma Rodriguez",
    role: "nurse",
    avatar: "ER",
    lastMessage: "ICU bed occupancy update: 8/10 beds occupied. Critical patient in ICU-3.",
    timestamp: "15m ago",
    unread: 0,
    online: true,
    specialty: "Critical Care",
    messages: [
      { id: 1, text: "Morning update: All critical patients stable overnight.", timestamp: "08:30 AM", sender: "them" },
      { id: 2, text: "Great, thank you for the update.", timestamp: "08:35 AM", sender: "me", status: "read" },
      { id: 3, text: "ICU bed occupancy update: 8/10 beds occupied. Critical patient in ICU-3.", timestamp: "09:10 AM", sender: "them" },
    ],
  },
  {
    id: 3,
    name: "Dr. James Rivera",
    role: "doctor",
    avatar: "JR",
    lastMessage: "Can we discuss the new protocol for diabetic patients?",
    timestamp: "1h ago",
    unread: 0,
    online: false,
    specialty: "Endocrinology",
    messages: [
      { id: 1, text: "Hi, I wanted to discuss implementing the new HbA1c monitoring protocol.", timestamp: "08:15 AM", sender: "them" },
      { id: 2, text: "Sure, let's schedule a meeting this week.", timestamp: "08:20 AM", sender: "me", status: "read" },
      { id: 3, text: "Can we discuss the new protocol for diabetic patients?", timestamp: "08:25 AM", sender: "them" },
    ],
  },
  {
    id: 4,
    name: "Maria Santos",
    role: "patient",
    avatar: "MS",
    lastMessage: "Thank you for the prompt care. Feeling much better now.",
    timestamp: "2h ago",
    unread: 0,
    online: false,
    messages: [
      { id: 1, text: "Hello, I have a question about my new medication dosage.", timestamp: "Yesterday 4:30 PM", sender: "them" },
      { id: 2, text: "Hi Maria, I'll have Dr. Chen reach out to you directly about this.", timestamp: "Yesterday 4:45 PM", sender: "me", status: "read" },
      { id: 3, text: "Thank you for the prompt care. Feeling much better now.", timestamp: "07:20 AM", sender: "them" },
    ],
  },
  {
    id: 5,
    name: "Pharmacy Department",
    role: "admin",
    avatar: "PD",
    lastMessage: "Medication stock alert: Metformin running low (40 units remaining).",
    timestamp: "3h ago",
    unread: 1,
    online: true,
    messages: [
      { id: 1, text: "Weekly inventory update: All critical medications in stock.", timestamp: "Apr 20, 2:00 PM", sender: "them" },
      { id: 2, text: "Medication stock alert: Metformin running low (40 units remaining).", timestamp: "06:15 AM", sender: "them" },
    ],
  },
  {
    id: 6,
    name: "Dr. Aisha Patel",
    role: "doctor",
    avatar: "AP",
    lastMessage: "Surgery schedule confirmed for tomorrow at 8 AM.",
    timestamp: "4h ago",
    unread: 0,
    online: false,
    specialty: "Surgery",
    messages: [
      { id: 1, text: "Pre-op for Michael Chen is complete. All labs look good.", timestamp: "Yesterday 3:15 PM", sender: "them" },
      { id: 2, text: "Excellent. Is the OR booked?", timestamp: "Yesterday 3:20 PM", sender: "me", status: "read" },
      { id: 3, text: "Surgery schedule confirmed for tomorrow at 8 AM.", timestamp: "05:30 AM", sender: "them" },
    ],
  },
  {
    id: 7,
    name: "Carlos Reyes",
    role: "patient",
    avatar: "CR",
    lastMessage: "When is my next appointment scheduled?",
    timestamp: "Yesterday",
    unread: 0,
    online: false,
    messages: [
      { id: 1, text: "Hello, I wanted to check on my test results from last week.", timestamp: "Apr 20, 10:00 AM", sender: "them" },
      { id: 2, text: "Hi Carlos, your results are ready. Dr. Rivera will discuss them with you at your next visit.", timestamp: "Apr 20, 10:15 AM", sender: "me", status: "read" },
      { id: 3, text: "When is my next appointment scheduled?", timestamp: "Apr 20, 11:00 AM", sender: "them" },
    ],
  },
];

const roleConfig = {
  doctor: { label: "Doctor", color: "#0E7490", bg: "#E0F7FA", icon: Stethoscope },
  nurse: { label: "Nurse", color: "#22C55E", bg: "#DCFCE7", icon: User },
  patient: { label: "Patient", color: "#8B5CF6", bg: "#EDE9FE", icon: User },
  admin: { label: "Staff", color: "#F59E0B", bg: "#FEF3C7", icon: Users },
};

export function MessagesPage() {
  const [selectedConversation, setSelectedConversation] = useState(conversations[0]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterRole, setFilterRole] = useState("all");
  const [messageInput, setMessageInput] = useState("");
  const [showNewMessage, setShowNewMessage] = useState(false);
  const [showConversationInfo, setShowConversationInfo] = useState(false);

  const filteredConversations = conversations.filter((conv) => {
    const matchSearch = conv.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        conv.lastMessage.toLowerCase().includes(searchQuery.toLowerCase());
    const matchRole = filterRole === "all" || conv.role === filterRole;
    return matchSearch && matchRole;
  });

  const unreadCount = conversations.reduce((sum, conv) => sum + conv.unread, 0);

  const handleSendMessage = () => {
    if (messageInput.trim() && selectedConversation) {
      console.log("Sending message:", messageInput);
      setMessageInput("");
    }
  };

  return (
    <div className="min-h-screen flex" style={{ fontFamily: "'Inter', sans-serif", backgroundColor: "#F8FAFC" }}>
      {/* <Sidebar role="admin" /> */}
      <div className="ml-64 flex-1 flex flex-col min-h-screen">
        {/* <Navbar title="Messages" /> */}
        <main className="flex-1 p-8 mt-6">
          <div className="bg-white rounded-2xl overflow-hidden h-[calc(100vh-140px)]" style={{ boxShadow: "0 4px 20px rgba(0,0,0,0.05)" }}>
            <div className="flex h-full">
              {/* Left: Conversations List */}
              <div className="w-96 border-r border-slate-100 flex flex-col">
                {/* Header */}
                <div className="px-5 py-4 border-b border-slate-100">
                  <div className="flex items-center justify-between mb-4">
                    <h3 style={{ fontSize: 18, fontWeight: 700, color: "#0F172A" }}>Conversations</h3>
                    <button
                      onClick={() => setShowNewMessage(true)}
                      className="w-9 h-9 rounded-xl flex items-center justify-center transition-all hover:shadow-md"
                      style={{ backgroundColor: "#0E7490" }}
                    >
                      <Plus className="w-4 h-4 text-white" />
                    </button>
                  </div>

                  {/* Search */}
                  <div className="relative mb-3">
                    <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search messages..."
                      className="w-full pl-9 pr-4 py-2.5 text-sm border border-slate-200 rounded-xl bg-slate-50 text-slate-700 focus:outline-none focus:border-teal-400 focus:bg-white transition-all placeholder:text-slate-400"
                    />
                  </div>

                  {/* Role Filter */}
                  <div className="flex items-center gap-1 bg-slate-100 rounded-xl p-1">
                    {(["all", "doctor", "nurse", "patient"] ).map((role) => (
                      <button
                        key={role}
                        onClick={() => setFilterRole(role)}
                        className="flex-1 px-2 py-1.5 rounded-lg text-xs capitalize transition-all"
                        style={{
                          backgroundColor: filterRole === role ? "#0E7490" : "transparent",
                          color: filterRole === role ? "#fff" : "#64748B",
                          fontWeight: filterRole === role ? 600 : 500,
                        }}
                      >
                        {role}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Conversation List */}
                <div className="flex-1 overflow-y-auto">
                  {filteredConversations.map((conv) => {
                    const isSelected = selectedConversation?.id === conv.id;
                    const cfg = roleConfig[conv.role];
                    return (
                      <div
                        key={conv.id}
                        onClick={() => setSelectedConversation(conv)}
                        className="px-4 py-4 border-b border-slate-50 cursor-pointer transition-all hover:bg-slate-50"
                        style={{ backgroundColor: isSelected ? "#F0F9FF" : "transparent" }}
                      >
                        <div className="flex items-start gap-3">
                          <div className="relative">
                            <div
                              className="w-12 h-12 rounded-full flex items-center justify-center shrink-0"
                              style={{ backgroundColor: cfg.bg, color: cfg.color, fontWeight: 700, fontSize: 14 }}
                            >
                              {conv.avatar}
                            </div>
                            {conv.online && (
                              <div className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-500 rounded-full border-2 border-white" />
                            )}
                          </div>

                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between mb-1">
                              <h4 style={{ fontSize: 14, fontWeight: 700, color: "#0F172A" }} className="truncate">
                                {conv.name}
                              </h4>
                              <span className="text-xs text-slate-500 shrink-0 ml-2">{conv.timestamp}</span>
                            </div>
                            <p className="text-xs text-slate-500 mb-1.5">{conv.specialty || roleConfig[conv.role].label}</p>
                            <p className="text-sm text-slate-600 truncate" style={{ fontWeight: conv.unread > 0 ? 600 : 400 }}>
                              {conv.lastMessage}
                            </p>
                          </div>

                          {conv.unread > 0 && (
                            <div
                              className="w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-1"
                              style={{ backgroundColor: "#EF4444", color: "#fff", fontSize: 11, fontWeight: 700 }}
                            >
                              {conv.unread}
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Right: Message Thread */}
              {selectedConversation ? (
                <div className="flex-1 flex flex-col">
                  {/* Conversation Header */}
                  <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <div
                          className="w-11 h-11 rounded-full flex items-center justify-center"
                          style={{
                            backgroundColor: roleConfig[selectedConversation.role].bg,
                            color: roleConfig[selectedConversation.role].color,
                            fontWeight: 700,
                            fontSize: 14,
                          }}
                        >
                          {selectedConversation.avatar}
                        </div>
                        {selectedConversation.online && (
                          <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white" />
                        )}
                      </div>
                      <div>
                        <h3 style={{ fontSize: 16, fontWeight: 700, color: "#0F172A" }}>{selectedConversation.name}</h3>
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-slate-500">
                            {selectedConversation.specialty || roleConfig[selectedConversation.role].label}
                          </span>
                          {selectedConversation.online && (
                            <>
                              <span className="text-slate-300">•</span>
                              <span className="text-xs text-green-600" style={{ fontWeight: 600 }}>Online</span>
                            </>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <button className="w-9 h-9 rounded-xl flex items-center justify-center transition-all hover:bg-slate-100">
                        <Phone className="w-4 h-4 text-slate-600" />
                      </button>
                      <button className="w-9 h-9 rounded-xl flex items-center justify-center transition-all hover:bg-slate-100">
                        <Video className="w-4 h-4 text-slate-600" />
                      </button>
                      <button
                        onClick={() => setShowConversationInfo(!showConversationInfo)}
                        className="w-9 h-9 rounded-xl flex items-center justify-center transition-all hover:bg-slate-100"
                      >
                        <Info className="w-4 h-4 text-slate-600" />
                      </button>
                    </div>
                  </div>

                  {/* Messages */}
                  <div className="flex-1 overflow-y-auto p-6 space-y-4">
                    {selectedConversation.messages.map((msg) => (
                      <div key={msg.id} className={`flex ${msg.sender === "me" ? "justify-end" : "justify-start"}`}>
                        <div className={`max-w-md ${msg.sender === "me" ? "order-2" : "order-1"}`}>
                          <div
                            className="px-4 py-3 rounded-2xl"
                            style={{
                              backgroundColor: msg.sender === "me" ? "#0E7490" : "#F1F5F9",
                              color: msg.sender === "me" ? "#fff" : "#0F172A",
                            }}
                          >
                            <p className="text-sm" style={{ lineHeight: 1.5 }}>{msg.text}</p>
                          </div>
                          <div className={`flex items-center gap-1.5 mt-1.5 text-xs text-slate-500 ${msg.sender === "me" ? "justify-end" : "justify-start"}`}>
                            <span>{msg.timestamp}</span>
                            {msg.sender === "me" && msg.status && (
                              <>
                                <span>•</span>
                                {msg.status === "read" && <CheckCircle className="w-3 h-3 text-teal-600" />}
                                {msg.status === "delivered" && <Check className="w-3 h-3" />}
                                {msg.status === "sent" && <Clock className="w-3 h-3" />}
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Message Input */}
                  <div className="px-6 py-4 border-t border-slate-100">
                    <div className="flex items-end gap-3">
                      <button className="w-10 h-10 rounded-xl flex items-center justify-center transition-all hover:bg-slate-100 shrink-0">
                        <Paperclip className="w-5 h-5 text-slate-600" />
                      </button>
                      <div className="flex-1 relative">
                        <textarea
                          value={messageInput}
                          onChange={(e) => setMessageInput(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === "Enter" && !e.shiftKey) {
                              e.preventDefault();
                              handleSendMessage();
                            }
                          }}
                          placeholder="Type a message..."
                          className="w-full px-4 py-3 text-sm border border-slate-200 rounded-xl bg-slate-50 text-slate-700 focus:outline-none focus:border-teal-400 focus:bg-white transition-all resize-none placeholder:text-slate-400"
                          rows={1}
                          style={{ maxHeight: "120px" }}
                        />
                      </div>
                      <button
                        onClick={handleSendMessage}
                        disabled={!messageInput.trim()}
                        className="w-10 h-10 rounded-xl flex items-center justify-center transition-all disabled:opacity-40 disabled:cursor-not-allowed shrink-0"
                        style={{ backgroundColor: messageInput.trim() ? "#0E7490" : "#CBD5E1" }}
                      >
                        <Send className="w-5 h-5 text-white" />
                      </button>
                    </div>
                    <p className="text-xs text-slate-400 mt-2 ml-14">Press Enter to send, Shift+Enter for new line</p>
                  </div>
                </div>
              ) : (
                <div className="flex-1 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4" style={{ backgroundColor: "#F1F5F9" }}>
                      <Users className="w-10 h-10 text-slate-400" />
                    </div>
                    <h3 style={{ fontSize: 18, fontWeight: 700, color: "#0F172A", marginBottom: 8 }}>No Conversation Selected</h3>
                    <p className="text-sm text-slate-500">Select a conversation to view messages</p>
                  </div>
                </div>
              )}

              {/* Info Panel */}
              {showConversationInfo && selectedConversation && (
                <div className="w-80 border-l border-slate-100 p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h3 style={{ fontSize: 16, fontWeight: 700, color: "#0F172A" }}>Conversation Info</h3>
                    <button
                      onClick={() => setShowConversationInfo(false)}
                      className="w-8 h-8 rounded-lg flex items-center justify-center transition-all hover:bg-slate-100"
                    >
                      <X className="w-4 h-4 text-slate-600" />
                    </button>
                  </div>

                  <div className="text-center mb-6">
                    <div
                      className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-3"
                      style={{
                        backgroundColor: roleConfig[selectedConversation.role].bg,
                        color: roleConfig[selectedConversation.role].color,
                        fontWeight: 700,
                        fontSize: 20,
                      }}
                    >
                      {selectedConversation.avatar}
                    </div>
                    <h4 style={{ fontSize: 16, fontWeight: 700, color: "#0F172A", marginBottom: 4 }}>
                      {selectedConversation.name}
                    </h4>
                    <p className="text-sm text-slate-500">
                      {selectedConversation.specialty || roleConfig[selectedConversation.role].label}
                    </p>
                  </div>

                  <div className="space-y-3">
                    <button className="w-full px-4 py-3 rounded-xl border border-slate-200 flex items-center gap-3 transition-all hover:bg-slate-50">
                      <Phone className="w-4 h-4 text-slate-600" />
                      <span className="text-sm text-slate-700" style={{ fontWeight: 600 }}>Voice Call</span>
                    </button>
                    <button className="w-full px-4 py-3 rounded-xl border border-slate-200 flex items-center gap-3 transition-all hover:bg-slate-50">
                      <Video className="w-4 h-4 text-slate-600" />
                      <span className="text-sm text-slate-700" style={{ fontWeight: 600 }}>Video Call</span>
                    </button>
                    <button className="w-full px-4 py-3 rounded-xl border border-slate-200 flex items-center gap-3 transition-all hover:bg-slate-50">
                      <Star className="w-4 h-4 text-slate-600" />
                      <span className="text-sm text-slate-700" style={{ fontWeight: 600 }}>Star Conversation</span>
                    </button>
                    <button className="w-full px-4 py-3 rounded-xl border border-slate-200 flex items-center gap-3 transition-all hover:bg-slate-50">
                      <Archive className="w-4 h-4 text-slate-600" />
                      <span className="text-sm text-slate-700" style={{ fontWeight: 600 }}>Archive</span>
                    </button>
                  </div>

                  <div className="mt-6 pt-6 border-t border-slate-100">
                    <h4 className="text-xs text-slate-500 mb-3" style={{ fontWeight: 600 }}>SHARED FILES</h4>
                    <p className="text-sm text-slate-400">No shared files</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>

      {/* New Message Modal */}
      {showNewMessage && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-[200]">
          <div className="bg-white rounded-2xl p-6 shadow-2xl" style={{ width: "500px" }}>
            <div className="flex items-center justify-between mb-6">
              <h3 style={{ fontSize: 20, fontWeight: 800, color: "#0F172A" }}>New Message</h3>
              <button
                onClick={() => setShowNewMessage(false)}
                className="w-8 h-8 rounded-lg flex items-center justify-center transition-all hover:bg-slate-100"
              >
                <X className="w-4 h-4 text-slate-600" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm text-slate-700 mb-2" style={{ fontWeight: 600 }}>Recipient</label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    placeholder="Search staff or patients..."
                    className="w-full pl-9 pr-4 py-3 text-sm border border-slate-200 rounded-xl bg-slate-50 text-slate-700 focus:outline-none focus:border-teal-400 focus:bg-white transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm text-slate-700 mb-2" style={{ fontWeight: 600 }}>Message</label>
                <textarea
                  placeholder="Type your message..."
                  className="w-full px-4 py-3 text-sm border border-slate-200 rounded-xl bg-slate-50 text-slate-700 focus:outline-none focus:border-teal-400 focus:bg-white transition-all resize-none"
                  rows={6}
                />
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => setShowNewMessage(false)}
                  className="flex-1 px-6 py-3 rounded-xl border-2 border-slate-200 text-slate-700 transition-all hover:bg-slate-50"
                  style={{ fontWeight: 700, fontSize: 14 }}
                >
                  Cancel
                </button>
                <button
                  className="flex-1 px-6 py-3 rounded-xl flex items-center justify-center gap-2 transition-all"
                  style={{ backgroundColor: "#0E7490", color: "#fff", fontWeight: 700, fontSize: 14 }}
                >
                  <Send className="w-4 h-4" />
                  Send Message
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
export default MessagesPage