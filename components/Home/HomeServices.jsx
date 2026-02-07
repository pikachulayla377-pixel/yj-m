"use client";

import { motion } from "framer-motion";
import { FaWhatsapp } from "react-icons/fa";
import { RiRocketLine } from "react-icons/ri";

export default function HomeServices() {
  return (
    <section className="py-6 px-6 bg-[var(--background)] overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          whileHover={{ y: -3 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="relative group overflow-hidden rounded-3xl border border-white/5 bg-[var(--card)]/50 backdrop-blur-2xl shadow-xl transition-all duration-500 hover:border-[var(--accent)]/20"
        >
          {/* Subtle Glow */}
          <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-[300px] h-[300px] bg-[var(--accent)]/5 blur-[100px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />

          <div className="absolute inset-y-0 left-0 w-1 bg-[var(--accent)]" />

          <div className="relative flex flex-col md:flex-row items-center justify-between gap-6 p-6 md:p-8">

            {/* Left content */}
            <div className="flex-1 space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[var(--accent)] text-[9px] font-black uppercase tracking-widest">
                <RiRocketLine className="text-xs" />
                <span>Expert Development</span>
              </div>

              <div>
                <h3 className="text-xl md:text-2xl font-black text-white leading-tight tracking-tighter uppercase italic">
                  Developed & Maintained By <span className="text-[var(--accent)]">Experts</span>
                </h3>
                <p className="max-w-xl text-xs md:text-sm text-[var(--muted)] font-medium">
                  Premium end-to-end web solutions for your business.
                </p>
              </div>
            </div>

            {/* Right CTA */}
            <div className="flex flex-col items-center md:items-end gap-3 shrink-0">
              <span className="text-lg font-black text-white tracking-tighter">
                +91&nbsp;63723&nbsp;05866
              </span>

              <motion.a
                href="https://wa.me/919178521537"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="
                  group/btn inline-flex items-center gap-2
                  px-6 py-3 rounded-xl
                  bg-gradient-to-r from-[var(--accent)] to-[var(--accent-secondary)]
                  text-black font-black text-xs uppercase tracking-wider
                  shadow-lg transition-all duration-300
                "
              >
                <FaWhatsapp className="text-lg" />
                <span>Get Service</span>
              </motion.a>
            </div>

          </div>
        </motion.div>
      </div>
    </section>
  );
}
