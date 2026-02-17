"use client";

import { motion } from "framer-motion";
import { FaWhatsapp } from "react-icons/fa";
import { RiRocketLine } from "react-icons/ri";

export default function HomeServices() {
  return (
    <section className="py-12 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative overflow-hidden rounded-[2rem] bg-[var(--card)]/40 border border-[var(--border)] backdrop-blur-xl group"
        >
          {/* Elegant Ambient Background Gradient */}
          <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-[400px] h-[400px] bg-[var(--accent)]/5 blur-[120px] rounded-full pointer-events-none" />

          {/* Signature Accent Line */}
          <div className="absolute inset-y-0 left-0 w-1 bg-[var(--accent)]" />

          <div className="relative flex flex-col md:flex-row items-center justify-between gap-10 p-10 md:p-12">

            {/* Left Section: Professional Identity */}
            <div className="flex items-center gap-6">
              <div className="relative">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[var(--accent)]/20 to-transparent flex items-center justify-center border border-[var(--accent)]/20 group-hover:scale-105 transition-transform duration-500">
                  <RiRocketLine className="text-3xl text-[var(--accent)]" />
                </div>
                {/* Subtle dot accent */}
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-[var(--card)] shadow-[0_0_10px_rgba(34,197,94,0.4)]" />
              </div>

              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-black uppercase tracking-[0.4em] text-[var(--accent)]">
                    Identity
                  </span>
                </div>
                <h3 className="text-2xl md:text-3xl font-black text-[var(--foreground)] uppercase tracking-tighter italic">
                  Developed by <span className="text-[var(--accent)]">Experts</span>
                </h3>
                <p className="text-xs text-[var(--muted)] font-bold uppercase tracking-widest max-w-[200px] leading-relaxed opacity-60">
                  Next-Gen Digital Solutions & Maintenance
                </p>
              </div>
            </div>

            {/* Right Section: Premium Inquiry */}
            <div className="flex flex-col items-center md:items-end gap-2 shrink-0">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2.5 rounded-xl bg-green-500/10 border border-green-500/20 text-green-500">
                  <FaWhatsapp size={22} />
                </div>
                <div className="h-px w-8 bg-[var(--border)] hidden md:block" />
                <span className="text-[10px] font-black uppercase tracking-[0.4em] text-[var(--muted)]">
                  Available 24/7
                </span>
              </div>

              <div className="text-center md:text-right">
                <span className="block text-[11px] font-black uppercase tracking-[0.2em] text-[var(--muted)] mb-1">
                  Connect Directly
                </span>
                <span className="text-2xl md:text-3xl font-black text-[var(--foreground)] tracking-tight hover:text-[var(--accent)] transition-colors cursor-pointer">
                  +91 9178521537
                </span>
              </div>
            </div>

          </div>
        </motion.div>
      </div>
    </section>
  );
}
