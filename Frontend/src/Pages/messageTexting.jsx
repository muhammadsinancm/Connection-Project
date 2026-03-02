import './Message.css';

import { useState, useEffect, useRef } from "react";

const initialMessages = [
  { id: 1, text: "Hey! Did you see the game last night?", mine: false, time: "9:41 AM" },
  { id: 2, text: "Yeah it was insane 😮 Can't believe that last-minute goal", mine: true, time: "9:42 AM" },
  { id: 3, text: "Right?! I literally screamed lol", mine: false, time: "9:42 AM" },
  { id: 4, text: "Same here haha. Are you watching the next one?", mine: true, time: "9:44 AM" },
  { id: 5, text: "Definitely! We should watch together", mine: false, time: "9:45 AM" },
];

function Toast({ message }) {
  return (
    <div style={{
      position: "fixed", bottom: 32, left: "50%",
      transform: message ? "translateX(-50%) translateY(0)" : "translateX(-50%) translateY(20px)",
      background: "#1e1e1e", border: "1px solid #333", color: "#ccc",
      padding: "10px 20px", borderRadius: 30, fontSize: 13,
      opacity: message ? 1 : 0,
      transition: "all 0.3s ease", pointerEvents: "none", whiteSpace: "nowrap",
      zIndex: 200,
    }}>
      {message}
    </div>
  );
}

function PopupMenu({ visible, mine, onCopy, onReply, onDelete }) {
  return (
    <div style={{
      position: "absolute",
      bottom: "calc(100% + 8px)",
      background: "#1e1e1e",
      border: "1px solid #333",
      borderRadius: 14,
      padding: 6,
      display: "flex",
      flexDirection: "column",
      gap: 2,
      zIndex: 100,
      boxShadow: "0 12px 40px rgba(0,0,0,0.6)",
      minWidth: 150,
      opacity: visible ? 1 : 0,
      transform: visible ? "translateY(0) scale(1)" : "translateY(8px) scale(0.92)",
      pointerEvents: visible ? "all" : "none",
      transition: "opacity 0.2s cubic-bezier(.17,.67,.35,1.3), transform 0.2s cubic-bezier(.17,.67,.35,1.3)",
      ...(mine ? { right: 0 } : { left: 0 }),
    }}>
      <PopupItem onClick={onCopy} icon={<CopyIcon />} label="Copy" />
      <PopupItem onClick={onReply} icon={<ReplyIcon />} label="Reply" />
      {mine && <PopupItem onClick={onDelete} icon={<DeleteIcon />} label="Delete" danger />}
    </div>
  );
}

function PopupItem({ onClick, icon, label, danger }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: "flex", alignItems: "center", gap: 10,
        padding: "9px 12px", borderRadius: 10, fontSize: 13,
        color: danger ? "#ff5555" : "#ccc", cursor: "pointer",
        background: hovered
          ? danger ? "rgba(255,85,85,0.12)" : "#2a2a2a"
          : "transparent",
        transition: "background 0.12s",
      }}
    >
      {icon}
      {label}
    </div>
  );
}

function MessageBubble({ msg, onDelete, onCopy, onReply }) {
  const [popupOpen, setPopupOpen] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const bubbleRef = useRef(null);

  // Close popup on outside click
  useEffect(() => {
    if (!popupOpen) return;
    const handler = (e) => {
      if (bubbleRef.current && !bubbleRef.current.contains(e.target)) {
        setPopupOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [popupOpen]);

  const handleDelete = (e) => {
    e.stopPropagation();
    setPopupOpen(false);
    setDeleting(true);
    setTimeout(() => onDelete(msg.id), 350);
  };

  const handleCopy = (e) => {
    e.stopPropagation();
    setPopupOpen(false);
    onCopy(msg.text);
  };

  const handleReply = (e) => {
    e.stopPropagation();
    setPopupOpen(false);
    onReply();
  };

  return (
    <div style={{
      display: "flex", alignItems: "flex-end", gap: 8,
      flexDirection: msg.mine ? "row-reverse" : "row",
      position: "relative",
    }}>
      <div
        ref={bubbleRef}
        onClick={(e) => { e.stopPropagation(); setPopupOpen(o => !o); }}
        style={{
          maxWidth: "72%",
          padding: "10px 14px",
          borderRadius: 18,
          fontSize: 14,
          lineHeight: 1.5,
          position: "relative",
          cursor: "pointer",
          userSelect: "none",
          background: msg.mine ? "linear-gradient(135deg, #6c63ff, #a855f7)" : "#2a2a2a",
          color: msg.mine ? "#fff" : "#e8e8e8",
          borderBottomRightRadius: msg.mine ? 4 : 18,
          borderBottomLeftRadius: msg.mine ? 18 : 4,
          opacity: deleting ? 0 : 1,
          transform: deleting ? "scale(0.9)" : "scale(1)",
          transition: "opacity 0.35s ease, transform 0.35s ease",
        }}
      >
        {msg.text}
        <PopupMenu
          visible={popupOpen}
          mine={msg.mine}
          onCopy={handleCopy}
          onReply={handleReply}
          onDelete={handleDelete}
        />
      </div>
      <span style={{ fontSize: 10, color: "#444", alignSelf: "flex-end", marginBottom: 2, whiteSpace: "nowrap" }}>
        {msg.time}
      </span>
    </div>
  );
}

export default function App() {
  const [messages, setMessages] = useState(initialMessages);
  const [toast, setToast] = useState("");

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(""), 2000);
  };

  const handleDelete = (id) => {
    setMessages(prev => prev.filter(m => m.id !== id));
    showToast("Message deleted");
  };

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text).catch(() => {});
    showToast("Copied to clipboard");
  };

  const handleReply = () => showToast("Reply feature coming soon");

  return (
    <div style={{
      fontFamily: "'DM Sans', sans-serif",
      background: "#0e0e0e",
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      color: "#fff",
    }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600&display=swap');`}</style>

      <div style={{
        width: 380, maxWidth: "95vw",
        display: "flex", flexDirection: "column", gap: 10,
        padding: 20, background: "#161616",
        borderRadius: 24, border: "1px solid #2a2a2a",
      }}>
        {/* Header */}
        <div style={{ display: "flex", alignItems: "center", gap: 10, paddingBottom: 14, borderBottom: "1px solid #2a2a2a", marginBottom: 4 }}>
          <div style={{
            width: 36, height: 36, borderRadius: "50%",
            background: "linear-gradient(135deg, #ff6b6b, #ffd93d)",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontWeight: 600, fontSize: 14,
          }}>A</div>
          <div>
            <div style={{ fontSize: 14, fontWeight: 600 }}>Arjun</div>
            <div style={{ fontSize: 11, color: "#555" }}>Active now</div>
          </div>
        </div>

        {/* Messages */}
        {messages.map(msg => (
          <MessageBubble
            key={msg.id}
            msg={msg}
            onDelete={handleDelete}
            onCopy={handleCopy}
            onReply={handleReply}
          />
        ))}

        <p style={{ textAlign: "center", fontSize: 11, color: "#3a3a3a", marginTop: 8 }}>
          Click any message to see options
        </p>
      </div>

      <Toast message={toast} />
    </div>
  );
}

// Icons
function CopyIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="9" y="9" width="13" height="13" rx="2" />
      <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" />
    </svg>
  );
}
function ReplyIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <polyline points="9 17 4 12 9 7" />
      <path d="M20 18v-2a4 4 0 00-4-4H4" />
    </svg>
  );
}
function DeleteIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <polyline points="3 6 5 6 21 6" />
      <path d="M19 6l-1 14H6L5 6" />
      <path d="M10 11v6M14 11v6" />
      <path d="M9 6V4h6v2" />
    </svg>
  );
}
