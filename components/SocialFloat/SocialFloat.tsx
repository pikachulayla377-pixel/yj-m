"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaWhatsapp,
  FaInstagram,
  FaShareNodes,
  FaPlus,
} from "react-icons/fa6";
import { RiHeartFill, RiShareLine, RiMessengerLine, RiChatSmileFill } from "react-icons/ri";

const WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_SUPPORT_WHATSAPP || "";
const INSTAGRAM_URL = process.env.NEXT_PUBLIC_INSTAGRAM_URL || "#";
const BRAND_NAME = process.env.NEXT_PUBLIC_BRAND_NAME || "YUJI MLBB";

const WHATSAPP_CHAT_LINK = WHATSAPP_NUMBER
  ? `https://wa.me/${WHATSAPP_NUMBER.replace(/\D/g, "")}`
  : "#";

const socialLinks = [
  {
    name: "Support",
    icon: RiHeartFill,
    url: "https://ko-fi.com/zynxv1",
    color: "from-rose-400 to-pink-600",
    shadow: "shadow-rose-500/20",
  },
  {
    name: "Instagram",
    icon: FaInstagram,
    url: INSTAGRAM_URL,
    color: "from-purple-500 to-pink-500",
    shadow: "shadow-purple-500/20",
  },
  {
    name: "WhatsApp",
    icon: FaWhatsapp,
    url: WHATSAPP_CHAT_LINK,
    color: "from-emerald-400 to-green-600",
    shadow: "shadow-emerald-500/20",
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
          text: "Check out this awesome site!",
          url: window.location.href,
        });
      } catch { }
    } else {
      await navigator.clipboard.writeText(window.location.href);
    }
  };

  return (
    <div ref={containerRef} className="fixed bottom-6 right-6 z-[60] sm:bottom-8 sm:right-8">
      <div className="relative flex flex-col items-center">
        {/* ================= FLOATING MENU ================= */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: 15, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 15, scale: 0.9 }}
              className="absolute bottom-16 flex flex-col items-center gap-3"
            >
              {/* Share Button */}
              <motion.button
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.9 }}
                onClick={handleShare}
                className="group relative w-10 h-10 rounded-xl bg-[var(--card)]/80 backdrop-blur-xl border border-[var(--border)] flex items-center justify-center text-lg shadow-xl transition-colors hover:bg-[var(--accent)] hover:text-white"
                aria-label="Share"
              >
                <RiShareLine />
                <span className="absolute right-14 px-2 py-1 rounded-md bg-[var(--card)] border border-[var(--border)] text-[10px] font-bold opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap shadow-lg uppercase tracking-wider">
                  Share
                </span>
              </motion.button>

              <div className="w-6 h-px bg-gradient-to-r from-transparent via-[var(--border)] to-transparent" />

              {/* Social Links */}
              {socialLinks.map((social, index) => {
                const Icon = social.icon;
                return (
                  <motion.div
                    key={social.name}
                    initial={{ opacity: 0, x: 10 }}
                    animate={{
                      opacity: 1,
                      x: 0,
                      transition: { delay: index * 0.05 }
                    }}
                  >
                    <Link
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group relative"
                    >
                      <motion.div
                        whileHover={{ scale: 1.1, y: -2 }}
                        whileTap={{ scale: 0.9 }}
                        className={`w-11 h-11 rounded-xl bg-gradient-to-br ${social.color} flex items-center justify-center text-xl text-white shadow-lg ${social.shadow} border border-white/10`}
                      >
                        <Icon />
                      </motion.div>
                      <span className="absolute right-14 top-1/2 -translate-y-1/2 px-2 py-1 rounded-md bg-[var(--card)] border border-[var(--border)] text-[10px] font-bold opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap shadow-lg uppercase tracking-wider">
                        {social.name}
                      </span>
                    </Link>
                  </motion.div>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>

        {/* ================= TOGGLE BUTTON ================= */}
        <motion.button
          layout
          onClick={() => setIsOpen(!isOpen)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={`
            relative w-12 h-12 rounded-2xl 
            bg-gradient-to-br from-[var(--accent)] to-indigo-600
            flex items-center justify-center text-white
            shadow-lg border border-white/20 z-10
            overflow-hidden
          `}
        >
          <motion.div
            initial={false}
            animate={{ rotate: isOpen ? 135 : 0 }}
            className="text-lg"
          >
            <FaPlus />
          </motion.div>

          {/* Liquid background effect on hover */}
          <motion.div
            className="absolute inset-0 bg-white/10 opacity-0"
            whileHover={{ opacity: 1 }}
          />

          {/* Pulse effect when closed */}
          {!isOpen && (
            <motion.div
              animate={{
                scale: [1, 1.15, 1],
                opacity: [0.4, 0, 0.4]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="absolute inset-0 rounded-2xl border-2 border-white/20"
            />
          )}
        </motion.button>
      </div>
    </div>
  );
}

