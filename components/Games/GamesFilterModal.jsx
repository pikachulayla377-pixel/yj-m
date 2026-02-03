"use client";

import { motion, AnimatePresence } from "framer-motion";
import { FiX, FiCheck, FiArrowDown, FiArrowUp } from "react-icons/fi";

export default function GamesFilterModal({
  open,
  onClose,
  sort,
  setSort,
  hideOOS,
  setHideOOS,
}) {
  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full sm:max-w-md bg-[var(--card)] border border-[var(--border)] rounded-2xl shadow-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Tactical Top Bar */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[var(--accent)] to-transparent opacity-50" />

            <div className="p-6">
              {/* HEADER */}
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h3 className="text-xl font-bold text-white">
                    Filter & Sort
                  </h3>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 transition-colors text-[var(--muted)] hover:text-white"
                >
                  <FiX size={20} />
                </button>
              </div>

              {/* SORT SECTION */}
              <div className="mb-8">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-1.5 h-1.5 rounded-full bg-[var(--accent)] shadow-[0_0_5px_var(--accent)]" />
                  <span className="text-xs font-bold uppercase tracking-wider text-white">Sort By</span>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { id: "az", label: "A – Z", icon: FiArrowDown },
                    { id: "za", label: "Z – A", icon: FiArrowUp },
                  ].map((option) => {
                    const Icon = option.icon;
                    const isActive = sort === option.id;
                    return (
                      <button
                        key={option.id}
                        onClick={() => setSort(option.id)}
                        className={`relative flex items-center justify-center gap-2 py-3 rounded-xl border font-bold text-sm transition-all duration-300 ${isActive
                          ? "bg-[var(--accent)] text-black border-[var(--accent)] shadow-[0_0_15px_rgba(var(--accent-rgb),0.3)]"
                          : "bg-white/5 border-white/10 text-[var(--muted)] hover:border-white/20 hover:text-white"
                          }`}
                      >
                        <Icon />
                        {option.label}
                        {isActive && (
                          <motion.div
                            layoutId="active-sort"
                            className="absolute -top-1 -right-1 w-3 h-3 bg-black rounded-full flex items-center justify-center border border-[var(--accent)]"
                          >
                            <div className="w-1 h-1 bg-[var(--accent)] rounded-full" />
                          </motion.div>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* FILTER SECTION */}
              <div className="mb-8">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-1.5 h-1.5 rounded-full bg-[var(--accent)] shadow-[0_0_5px_var(--accent)]" />
                  <span className="text-xs font-bold uppercase tracking-wider text-white">Filters</span>
                </div>

                <button
                  onClick={() => setHideOOS(!hideOOS)}
                  className={`w-full flex items-center justify-between p-4 rounded-xl border transition-all duration-300 ${hideOOS
                    ? "bg-[var(--accent)]/10 border-[var(--accent)]/50"
                    : "bg-white/5 border-white/10"
                    }`}
                >
                  <div className="flex flex-col items-start gap-0.5">
                    <span className={`text-sm font-bold ${hideOOS ? "text-[var(--accent)]" : "text-white"}`}>
                      Hide Out-of-Stock
                    </span>
                    <span className="text-[10px] text-[var(--muted)] font-medium">
                      Show only available games
                    </span>
                  </div>
                  <div className={`w-6 h-6 rounded-lg border flex items-center justify-center transition-all ${hideOOS
                    ? "bg-[var(--accent)] border-[var(--accent)] text-black"
                    : "bg-black/20 border-white/10 text-transparent"
                    }`}>
                    <FiCheck size={14} strokeWidth={3} />
                  </div>
                </button>
              </div>

              {/* APPLY BUTTON */}
              <button
                onClick={onClose}
                className="group relative w-full py-4 rounded-xl bg-white text-black font-black uppercase tracking-widest text-xs overflow-hidden transition-transform active:scale-95"
              >
                <div className="absolute inset-0 bg-[var(--accent)] transition-transform group-hover:scale-110" />
                <span className="relative z-10">Apply Filters</span>
              </button>
            </div>

            {/* Bottom Decoration */}
            <div className="h-1 bg-gradient-to-r from-transparent via-[var(--accent)] to-transparent opacity-20" />
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
