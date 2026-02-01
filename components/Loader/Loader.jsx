"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Loader() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[var(--background)]"
    >
      <div className="relative flex items-center justify-center h-64 w-64">
        {/* Background Glow */}
        <div
          className="absolute inset-0 opacity-10 blur-[100px] rounded-full"
          style={{ background: 'var(--accent)' }}
        />

        {/* Outer Orbit */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0 border border-[var(--accent)]/10 rounded-full"
        />

        {/* Dashed Orbital */}
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          className="absolute inset-4 border-2 border-dashed border-[var(--accent)]/20 rounded-full"
        />

        {/* Glass Ring */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
          className="absolute inset-10 border-t-2 border-r-2 border-[var(--accent)] rounded-full shadow-[0_0_20px_var(--accent)]"
          style={{
            boxShadow: 'inset 0 0 20px color-mix(in srgb, var(--accent), transparent 80%)'
          }}
        />

        {/* Main Logo Container */}
        <motion.div
          animate={{
            scale: [1, 1.05, 1],
            boxShadow: [
              "0 0 20px color-mix(in srgb, var(--accent), transparent 80%)",
              "0 0 40px color-mix(in srgb, var(--accent), transparent 60%)",
              "0 0 20px color-mix(in srgb, var(--accent), transparent 80%)"
            ]
          }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="relative z-10 w-32 h-32 rounded-[2.5rem] bg-gradient-to-br from-[var(--accent)] to-[#22d3ee] flex items-center justify-center p-1"
        >
          <div className="w-full h-full rounded-[2.4rem] bg-[var(--background)] flex items-center justify-center overflow-hidden">
            <motion.span
              animate={{
                scale: [1, 1.1, 1],
                opacity: [0.8, 1, 0.8]
              }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="text-4xl font-black tracking-tight text-[var(--foreground)]"
              style={{
                textShadow: '0 0 15px var(--accent)'
              }}
            >
              yJ
            </motion.span>

            {/* Liquid wave effect inside logo */}
            <motion.div
              animate={{
                y: [40, -40, 40],
                rotate: [0, 360],
              }}
              transition={{
                y: { duration: 4, repeat: Infinity, ease: "easeInOut" },
                rotate: { duration: 10, repeat: Infinity, ease: "linear" }
              }}
              className="absolute inset-0 pointer-events-none rounded-full blur-xl"
              style={{ background: 'color-mix(in srgb, var(--accent), transparent 95%)' }}
            />
          </div>
        </motion.div>

        {/* Orbital Particles */}
        {[0, 120, 240].map((angle, i) => (
          <motion.div
            key={i}
            className="absolute inset-0"
            animate={{ rotate: 360 }}
            transition={{ duration: 3 + i, repeat: Infinity, ease: "linear" }}
          >
            <motion.div
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.5, 1, 0.5]
              }}
              transition={{ duration: 2, repeat: Infinity, delay: i * 0.5 }}
              className="absolute top-0 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-[var(--accent)] shadow-[0_0_15px_var(--accent)]"
            />
          </motion.div>
        ))}
      </div>

      {/* Loading Status */}
      <div className="mt-8 flex flex-col items-center gap-4">
        <motion.div
          animate={{ opacity: [0.3, 1, 0.3] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="flex items-center gap-3"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)]" />
          <p className="text-sm font-bold tracking-[0.4em] text-[var(--accent)] uppercase">
            Loading System
          </p>
          <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)]" />
        </motion.div>

        {/* Progress bar */}
        <div className="w-48 h-1 bg-[var(--accent)]/10 rounded-full overflow-hidden">
          <motion.div
            animate={{
              x: ["-100%", "100%"]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="w-full h-full bg-gradient-to-r from-transparent via-[var(--accent)] to-transparent"
          />
        </div>
      </div>
    </motion.div>
  );
}

