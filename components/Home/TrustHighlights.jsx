"use client";

import { motion } from "framer-motion";
import {
  FiZap,
  FiShield,
  FiCreditCard,
  FiMessageSquare,
  FiUsers,
  FiCpu
} from "react-icons/fi";

const ITEMS = [
  {
    title: "Instant Delivery",
    subtitle: "Always automatic",
    icon: FiZap,
    color: "text-amber-500",
    bg: "bg-amber-500/5",
  },
  {
    title: "100% Secure",
    subtitle: "Safe & legitimate",
    icon: FiShield,
    color: "text-emerald-500",
    bg: "bg-emerald-500/5",
  },
  {
    title: "Reliable Pay",
    subtitle: "Verified gateways",
    icon: FiCreditCard,
    color: "text-blue-500",
    bg: "bg-blue-500/5",
  },
  {
    title: "24/7 Support",
    subtitle: "Friendly assistance",
    icon: FiMessageSquare,
    color: "text-purple-500",
    bg: "bg-purple-500/5",
  },
  {
    title: "Trusted",
    subtitle: "By thousands",
    icon: FiUsers,
    color: "text-cyan-500",
    bg: "bg-cyan-500/5",
  },
  {
    title: "Automated",
    subtitle: "Fast processing",
    icon: FiCpu,
    color: "text-rose-500",
    bg: "bg-rose-500/5",
  },
];

export default function TrustHighlights() {
  return (
    <section className="py-12 px-6 bg-[var(--background)]">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-3 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {ITEMS.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              whileHover={{ y: -5 }}
              className="group flex flex-col items-center p-6 rounded-2xl border border-[var(--border)] bg-[var(--card)]/50 backdrop-blur-sm hover:border-[var(--accent)]/30 hover:shadow-lg hover:shadow-[var(--accent)]/5 transition-all duration-300"
            >
              <div className={`p-3 rounded-2xl ${item.bg} ${item.color} mb-4 group-hover:scale-110 transition-transform duration-300`}>
                <item.icon className="w-6 h-6" />
              </div>
              <h3 className="text-[13px] font-bold text-[var(--foreground)] text-center leading-tight">
                {item.title}
              </h3>
              {/* <p className="text-[11px] text-[var(--muted)] text-center mt-1.5 font-medium">
                {item.subtitle}
              </p> */}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
