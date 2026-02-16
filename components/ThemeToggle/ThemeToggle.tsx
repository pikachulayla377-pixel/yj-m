"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const themes = [
  // 🌍 Core
  { id: "light", icon: "☀️", label: "Light" },
  { id: "dark", icon: "🌙", label: "Dark" },

  // ⚡ Creative / Gaming
  { id: "cyber", icon: "⚡", label: "Cyber Neon" },
  { id: "retro", icon: "👾", label: "Retro Arcade" },
  { id: "matrix", icon: "🧬", label: "Matrix" },
  { id: "neonlime", icon: "🧿", label: "Neon Lime" },

  // 🌸 Soft / Aesthetic
  { id: "sakura", icon: "🌸", label: "Sakura" },
  // { id: "aqua", icon: "🌊", label: "Aqua Wave" },
  { id: "autumn", icon: "🍂", label: "Autumn" },

  // 💖 Girly / Cute
  { id: "rose", icon: "🌹", label: "Rose Blush" },
  { id: "lavender", icon: "💜", label: "Lavender Dream" },
  { id: "peach", icon: "🍑", label: "Peach Glow" },
  // { id: "cotton", icon: "🍬", label: "Cotton Candy" },
  // { id: "bubblegum", icon: "🎀", label: "Bubblegum Pop" },
  // { id: "cherry", icon: "🍒", label: "Cherry Kiss" },
  { id: "vanilla", icon: "🍦", label: "Vanilla Cream" },

  // 🔥 Bold / Aggressive
  { id: "inferno", icon: "🔥", label: "Inferno" },
  { id: "crimson", icon: "🩸", label: "Crimson Noir" },

  // 🧔 Manly / Strong
  { id: "steel", icon: "🔩", label: "Steel Gray" },
  // { id: "gunmetal", icon: "🛠️", label: "Gunmetal" },
  // { id: "midnightblack", icon: "🖤", label: "Midnight Black" },
  // { id: "royalblue", icon: "👑", label: "Royal Blue" },
  { id: "bloodiron", icon: "🩸", label: "Blood Iron" },
  // { id: "warzone", icon: "⚔️", label: "War Zone" },
  { id: "carbon", icon: "🏴", label: "Carbon Fiber" },

  // 🌲 Calm / Natural
  { id: "forest", icon: "🌲", label: "Forest" },
  { id: "emerald", icon: "🪙", label: "Finance Emerald" },

  // 🌌 Dark / Premium
  { id: "void", icon: "🌌", label: "Void Purple" },
  // { id: "obsidian", icon: "🪐", label: "Obsidian" },
  { id: "midnight", icon: "🌙", label: "Midnight Blue" },

  // 🧊 Modern / SaaS
  { id: "glass", icon: "🧊", label: "Glass" },
  { id: "slate", icon: "🧠", label: "Slate Pro" },
  // { id: "frost", icon: "❄️", label: "Frost" },

  // 🎨 Creator / Luxury
  { id: "solar", icon: "🟡", label: "Solar Gold" },
  // { id: "sunset", icon: "🌅", label: "Sunset" },
  { id: "prism", icon: "🌈", label: "Prism" },
];



export default function ThemeToggle() {
  const [theme, setTheme] = useState<string>("dark");
  const [open, setOpen] = useState(false);

  // Load stored theme on mount
  useEffect(() => {
    const stored = localStorage.getItem("theme") || "dark";
    setTheme(stored);
    document.documentElement.setAttribute("data-theme", stored);
  }, []);

  // Change theme handler
  const changeTheme = (newTheme: string) => {
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
    setOpen(false);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest(".theme-toggle-container")) {
        setOpen(false);
      }
    };

    if (open) {
      document.addEventListener("click", handleClickOutside);
      return () => document.removeEventListener("click", handleClickOutside);
    }
  }, [open]);

  const currentTheme = themes.find((t) => t.id === theme);

  return (
    <div className="relative inline-block text-left theme-toggle-container">
      {/* 🎨 Current Theme Button (Icon Only) */}
      <button
        onClick={() => setOpen(!open)}
        className="w-10 h-10 flex items-center justify-center border border-[var(--border)] rounded-full bg-[var(--card)]/40 backdrop-blur-md hover:bg-[var(--accent)] hover:border-[var(--accent)] group transition-all duration-300 shadow-lg hover:shadow-[var(--accent)]/40 outline-none"
        aria-label="Select Theme"
      >
        <span className={`text-xl transition-transform duration-500 ${open ? 'rotate-180 scale-110' : 'group-hover:scale-120'}`}>
          {currentTheme?.icon || "🎨"}
        </span>
      </button>

      {/* 🪄 Premium Grid Dropdown */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 10, rotateX: -15 }}
            animate={{ opacity: 1, scale: 1, y: 0, rotateX: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 10, rotateX: -15 }}
            transition={{ type: "spring", damping: 20, stiffness: 300 }}
            className="absolute right-0 mt-3 w-64 bg-[var(--card)]/80 backdrop-blur-2xl border border-white/10 rounded-[2rem] shadow-[0_20px_50px_rgba(0,0,0,0.3)] z-[100] p-4 origin-top-right overflow-hidden shadow-[var(--accent)]/10"
          >
            <div className="grid grid-cols-4 gap-2 max-h-72 overflow-y-auto pr-1 custom-scrollbar">
              {themes.map((t) => (
                <button
                  key={t.id}
                  title={t.label}
                  onClick={() => changeTheme(t.id)}
                  className={`
                    flex flex-col items-center justify-center p-2 rounded-2xl transition-all duration-300
                    ${theme === t.id
                      ? "bg-[var(--accent)] text-white shadow-lg shadow-[var(--accent)]/30 scale-105"
                      : "hover:bg-white/10 text-[var(--foreground)] hover:scale-110"
                    }
                  `}
                >
                  <span className="text-xl mb-1">{t.icon}</span>
                  <span className="text-[8px] font-bold uppercase tracking-tighter opacity-70 truncate w-full text-center">{t.id}</span>
                </button>
              ))}
            </div>

            {/* Visual Indicator */}
            <div className="mt-3 pt-3 border-t border-white/5 flex items-center justify-center">
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[var(--muted)] opacity-50">Studio Themes</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: var(--accent);
        }
      `}</style>
    </div>
  );
}

