"use client";

import React, { useEffect } from "react";
import { motion } from "framer-motion";

export default function Loader() {
  useEffect(() => {
    // Lock scroll when loader is active
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-[var(--background)]"
    >
      <div className="relative flex items-center justify-center h-64 w-64">
        {/* Subtle Ambient Background Glow */}
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.15, 0.1]
          }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="absolute inset-0 blur-[100px] rounded-full"
          style={{ background: 'var(--accent)' }}
        />

        {/* Minimal Rotating Ring */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          className="absolute inset-4 border-2 border-t-[var(--accent)] border-r-transparent border-b-transparent border-l-transparent rounded-full shadow-[0_0_15px_var(--accent)]/20"
        />

        {/* Static Inner Ring for depth */}
        <div className="absolute inset-10 border border-[var(--accent)]/10 rounded-full" />

        {/* Main Logo Container */}
        <motion.div
          animate={{
            y: [0, -8, 0],
          }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          className="relative z-10 w-32 h-32 rounded-[2.5rem] bg-gradient-to-br from-[var(--accent)] to-transparent p-[1px] shadow-2xl"
        >
          <div className="w-full h-full rounded-[2.4rem] bg-[var(--background)] flex items-center justify-center overflow-hidden">
            <motion.span
              animate={{
                opacity: [0.7, 1, 0.7],
                scale: [0.98, 1.02, 0.98]
              }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="text-5xl font-black tracking-tighter text-[var(--foreground)]"
              style={{
                textShadow: '0 0 20px color-mix(in srgb, var(--accent), transparent 70%)'
              }}
            >
              yJ
            </motion.span>
          </div>
        </motion.div>
      </div>

    </motion.div>
  );
}
