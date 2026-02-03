"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Instagram,
  MessageCircle,
  Plus,
  Share2,
  Shield,
  Zap,
  Phone,
  LayoutGrid
} from "lucide-react";

const WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_SUPPORT_WHATSAPP || "";
const INSTAGRAM_URL = process.env.NEXT_PUBLIC_INSTAGRAM_URL || "#";
const BRAND_NAME = process.env.NEXT_PUBLIC_BRAND_NAME || "YUJI MLBB";

const WHATSAPP_CHAT_LINK = WHATSAPP_NUMBER
  ? `https://wa.me/${WHATSAPP_NUMBER.replace(/\D/g, "")}`
  : "#";

const socialLinks = [
  {
    name: "Instagram",
    icon: Instagram,
    url: INSTAGRAM_URL,
    color: "from-[#E1306C] to-[#833AB4]",
    accent: "#E1306C",
  },
  {
    name: "WhatsApp",
    icon: Phone,
    url: WHATSAPP_CHAT_LINK,
    color: "from-[#25D366] to-[#128C7E]",
    accent: "#25D366",
  },
];

export default function SocialFloat() {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;
    const handlePointerDown = (event: PointerEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("pointerdown", handlePointerDown);
    return () => document.removeEventListener("pointerdown", handlePointerDown);
  }, [isOpen]);

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: BRAND_NAME,
          text: `Join the elite at ${BRAND_NAME}!`,
          url: window.location.href,
        });
      } catch { }
    } else {
      await navigator.clipboard.writeText(window.location.href);
    }
  };

  return (
    <div ref={containerRef} className="fixed bottom-6 right-6 z-[100] sm:bottom-8 sm:right-8">
      <div className="relative flex flex-col items-center">

        {/* ================= TACTICAL MENU ================= */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.8 }}
              transition={{ type: "spring", damping: 20, stiffness: 300 }}
              className="absolute bottom-[4.5rem] flex flex-col items-center gap-4 mb-2"
            >
              {/* Scanline Background for Menu Area (Subtle) */}
              <div className="absolute -inset-4 bg-gradient-to-t from-black/20 to-transparent blur-2xl pointer-events-none" />

              {/* Share Button (Tactical) */}
              <motion.button
                whileHover={{ scale: 1.1, x: -5 }}
                whileTap={{ scale: 0.9 }}
                onClick={handleShare}
                className="group relative w-12 h-12 rounded-2xl bg-black/60 backdrop-blur-2xl border border-white/10 flex items-center justify-center text-white shadow-2xl transition-all hover:border-[var(--accent)]/50 overflow-hidden"
              >
                {/* Tactical HUD Corners */}
                <div className="absolute top-1 left-1 w-2 h-2 border-t border-l border-white/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="absolute bottom-1 right-1 w-2 h-2 border-b border-r border-white/20 opacity-0 group-hover:opacity-100 transition-opacity" />

                <Share2 size={20} className="group-hover:text-[var(--accent)] transition-colors" />

                {/* Tactical Label */}
                <span className="absolute right-16 px-3 py-1.5 rounded-lg bg-black/80 backdrop-blur-xl border border-white/10 text-[10px] font-bold text-white opacity-0 group-hover:opacity-100 transition-all pointer-events-none whitespace-nowrap shadow-2xl uppercase tracking-[0.2em] translate-x-4 group-hover:translate-x-0">
                  Broadcast Node
                  <div className="absolute inset-0 opacity-[0.05] pointer-events-none bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,#fff_3px)]" style={{ backgroundSize: '100% 4px' }} />
                </span>
              </motion.button>

              <div className="w-8 h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />

              {/* Social Links */}
              {socialLinks.map((social, index) => {
                const Icon = social.icon;
                return (
                  <motion.div
                    key={social.name}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{
                      opacity: 1,
                      x: 0,
                      transition: { delay: index * 0.1, type: "spring" }
                    }}
                  >
                    <Link
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group relative block"
                    >
                      <motion.div
                        whileHover={{ scale: 1.1, x: -5 }}
                        whileTap={{ scale: 0.9 }}
                        className={`w-12 h-12 rounded-2xl bg-black/60 backdrop-blur-2xl border border-white/10 flex items-center justify-center text-white shadow-2xl transition-all hover:border-[var(--accent)]/50 overflow-hidden`}
                      >
                        {/* Static Gradient Glow */}
                        <div className={`absolute -inset-1 bg-gradient-to-br ${social.color} opacity-0 group-hover:opacity-10 transition-opacity blur-md`} />

                        <Icon size={20} className="group-hover:scale-110 transition-transform" style={{ color: social.accent }} />

                        {/* Tactical Label */}
                        <span className="absolute right-16 px-3 py-1.5 rounded-lg bg-black/80 backdrop-blur-xl border border-white/10 text-[10px] font-bold text-white opacity-0 group-hover:opacity-100 transition-all pointer-events-none whitespace-nowrap shadow-2xl uppercase tracking-[0.2em] translate-x-4 group-hover:translate-x-0">
                          {social.name} Feed
                          <div className="absolute inset-0 opacity-[0.05] pointer-events-none bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,#fff_3px)]" style={{ backgroundSize: '100% 4px' }} />
                        </span>
                      </motion.div>
                    </Link>
                  </motion.div>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>

        {/* ================= MAIN TOGGLE ================= */}
        <motion.button
          layout
          onClick={() => setIsOpen(!isOpen)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={`
            relative w-14 h-14 rounded-[1.25rem] 
            bg-black/40 backdrop-blur-3xl
            flex items-center justify-center text-white
            shadow-[0_0_30px_-5px_rgba(0,0,0,0.5)] border border-white/10 z-10
            group/main overflow-hidden
          `}
        >
          {/* Animated Glow Core */}
          <div className="absolute inset-0 bg-gradient-to-tr from-[var(--accent)]/20 to-transparent opacity-50" />

          <motion.div
            animate={{
              rotate: isOpen ? 135 : 0,
              scale: isOpen ? 1.1 : 1
            }}
            transition={{ type: "spring", stiffness: 200, damping: 15 }}
            className="relative z-10"
          >
            <Plus size={24} className={isOpen ? "text-[var(--accent)]" : "text-white"} />
          </motion.div>

          {/* HUD Scanline inside button */}
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,#fff_3px)]" style={{ backgroundSize: '100% 4px' }} />

          {/* Pulse Effect */}
          {!isOpen && (
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.3, 0, 0.3]
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "linear"
              }}
              className="absolute inset-0 rounded-[1.25rem] border border-[var(--accent)]/30"
            />
          )}

          {/* Hover Border Glow */}
          <div className="absolute inset-0 border border-[var(--accent)]/0 group-hover/main:border-[var(--accent)]/40 rounded-[1.25rem] transition-colors duration-500" />
        </motion.button>
      </div>
    </div>
  );
}

