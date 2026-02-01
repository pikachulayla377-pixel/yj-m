"use client";

import { useState, useEffect } from "react";
import { FaWhatsapp } from "react-icons/fa";
import { FiX } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";

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

  // 🔁 Rotate message every 4 seconds
  useEffect(() => {
    if (!visible) return;

    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % MESSAGES.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [visible]);

  // ✅ Fail safely
  if (!visible || !WHATSAPP_CHANNEL_URL) return null;

  const current = MESSAGES[index];

  return (
    <>
      <motion.div
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -100, opacity: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        onClick={() =>
          window.open(WHATSAPP_CHANNEL_URL, "_blank", "noopener,noreferrer")
        }
        className="
        group
        w-full cursor-pointer
        bg-gradient-to-r
        from-[var(--accent)]
        via-[var(--accent-secondary)]
        to-[var(--accent)]
        text-[var(--foreground)]
        shadow-md
        border-b border-[var(--border)]
        relative overflow-hidden
      "
        whileHover={{ scale: 1.01 }}
      >
        {/* Shimmer effect */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
          <div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent shimmer-animation"
          />
        </div>

        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between gap-4 relative z-10">

          {/* LEFT */}
          <div className="flex items-center gap-3 min-w-0">
            <motion.div
              className="rounded-full p-2 bg-green-500/90 text-white shadow shrink-0"
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              <FaWhatsapp size={18} />
            </motion.div>

            <AnimatePresence mode="wait">
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4 }}
                className="leading-tight truncate"
              >
                <p className="font-semibold text-sm md:text-base truncate">
                  {current.title}
                </p>
                <p className="text-xs md:text-sm text-[var(--muted)] truncate">
                  {current.subtitle}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* RIGHT */}
          <div className="flex items-center gap-3 shrink-0">
            <motion.span
              className="
              hidden sm:inline-flex items-center
              bg-white/90 text-black
              px-4 py-1.5 rounded-full
              text-sm font-semibold
              shadow-sm
            "
              whileHover={{ scale: 1.05, boxShadow: "0 4px 12px rgba(0,0,0,0.15)" }}
              whileTap={{ scale: 0.95 }}
            >
              Chat on WhatsApp
            </motion.span>

            <motion.button
              onClick={(e) => {
                e.stopPropagation();
                sessionStorage.setItem(STORAGE_KEY, "true");
                setVisible(false);
              }}
              className="rounded-full p-1 hover:bg-black/10 transition"
              aria-label="Close"
              whileHover={{ scale: 1.2, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
            >
              <FiX size={18} />
            </motion.button>
          </div>
        </div>
      </motion.div>

      <style jsx>{`
      .shimmer-animation {
        animation: shimmer 3s infinite linear;
      }

      @keyframes shimmer {
        0% {
          transform: translateX(-100%);
        }
        100% {
          transform: translateX(200%);
        }
      }
    `}</style>
    </>
  );
}
