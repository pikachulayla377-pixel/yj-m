"use client";

import { useState, useEffect } from "react";
import { FaWhatsapp } from "react-icons/fa";
import { FiX } from "react-icons/fi";

const STORAGE_KEY = "hide_whatsapp_banner";

// ✅ Read from env
const WHATSAPP_CHANNEL_URL =
  process.env.NEXT_PUBLIC_WHATSAPP_STORE_LINK || "";

// ✅ Rotating messages
const MESSAGES = [
  {
    title: "Join our WhatsApp Channel",
    subtitle: "Get instant offers, updates & announcements",
  },
  {
    title: "For more IDs buy / rent",
    subtitle: "DM us directly on WhatsApp",
  },
  {
    title: "Got MLBB updated",
    subtitle: "Latest offers & top-up updates available",
  },
];

export default function TopNoticeBanner() {
  const [visible, setVisible] = useState(false);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const hidden = sessionStorage.getItem(STORAGE_KEY);
    if (!hidden && WHATSAPP_CHANNEL_URL) setVisible(true);
  }, []);

  // 🔁 Rotate message every 3 seconds
  useEffect(() => {
    if (!visible) return;

    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % MESSAGES.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [visible]);

  // ✅ Fail safely
  if (!visible || !WHATSAPP_CHANNEL_URL) return null;

  const current = MESSAGES[index];

  return (
    <div
      onClick={() =>
        window.open(WHATSAPP_CHANNEL_URL, "_blank", "noopener,noreferrer")
      }
      className="
        w-full cursor-pointer
        bg-gradient-to-r
        from-[var(--accent)]
        via-[var(--accent-secondary)]
        to-[var(--accent)]
        text-[var(--foreground)]
        shadow-md
        border-b border-[var(--border)]
      "
    >
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between gap-4">

        {/* LEFT */}
        <div className="flex items-center gap-3 min-w-0">
          <div className="rounded-full p-2 bg-green-500/90 text-white shadow shrink-0">
            <FaWhatsapp size={18} />
          </div>

          <div className="leading-tight truncate">
            <p className="font-semibold text-sm md:text-base truncate">
              {current.title}
            </p>
            <p className="text-xs md:text-sm text-[var(--muted)] truncate">
              {current.subtitle}
            </p>
          </div>
        </div>

        {/* RIGHT */}
        <div className="flex items-center gap-3 shrink-0">
          <span
            className="
              hidden sm:inline-flex items-center
              bg-white/90 text-black
              px-4 py-1.5 rounded-full
              text-sm font-semibold
              shadow-sm
            "
          >
            Chat on WhatsApp
          </span>

          <button
            onClick={(e) => {
              e.stopPropagation();
              sessionStorage.setItem(STORAGE_KEY, "true");
              setVisible(false);
            }}
            className="rounded-full p-1 hover:bg-black/10 transition"
            aria-label="Close"
          >
            <FiX size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}
