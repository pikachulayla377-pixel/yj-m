"use client";

import { motion } from "framer-motion";
import {
  FaBolt,
  FaShieldAlt,
  FaCreditCard,
  FaHeadset,
  FaUsers,
  FaRobot,
} from "react-icons/fa";

export default function TrustHighlights() {
  const items = [
    {
      title: "24/7",
      subtitle: "Instant Delivery",
      icon: FaBolt,
      accent: "from-yellow-400/20 to-orange-400/20",
      text: "text-yellow-400",
      glow: "group-hover:shadow-yellow-500/10",
    },
    {
      title: "100%",
      subtitle: "Safe & Legitimate",
      icon: FaShieldAlt,
      accent: "from-green-400/20 to-emerald-400/20",
      text: "text-green-400",
      glow: "group-hover:shadow-green-500/10",
    },
    {
      title: "Easy",
      subtitle: "Secure Payments",
      icon: FaCreditCard,
      accent: "from-blue-400/20 to-cyan-400/20",
      text: "text-blue-400",
      glow: "group-hover:shadow-blue-500/10",
    },
    {
      title: "24/7",
      subtitle: "Instant Support",
      icon: FaHeadset,
      accent: "from-purple-400/20 to-pink-400/20",
      text: "text-purple-400",
      glow: "group-hover:shadow-purple-500/10",
    },
    {
      title: "Trusted",
      subtitle: "By Thousands",
      icon: FaUsers,
      accent: "from-yellow-300/20 to-amber-400/20",
      text: "text-yellow-300",
      glow: "group-hover:shadow-amber-500/10",
    },
    {
      title: "Fast",
      subtitle: "Automated Topups",
      icon: FaRobot,
      accent: "from-cyan-400/20 to-sky-400/20",
      text: "text-cyan-400",
      glow: "group-hover:shadow-cyan-500/10",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
      },
    },
  };

  return (
    <section className="py-8 md:py-12 px-6 bg-[var(--background)] overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-6 gap-3 md:gap-4"
        >
          {items.map((item, i) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={i}
                variants={itemVariants}
                whileHover={{ y: -5 }}
                className={`
                  group relative overflow-hidden
                  bg-[var(--card)]/50 backdrop-blur-xl
                  border border-white/5 hover:border-white/10
                  rounded-2xl md:rounded-[1.5rem]
                  p-4 md:p-5
                  text-center
                  transition-all duration-500
                  hover:shadow-[0_15px_30px_-10px_rgba(0,0,0,0.4)]
                  ${item.glow}
                `}
              >
                {/* Dynamic Gradient Background */}
                <div
                  className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700
                  bg-gradient-to-br ${item.accent} blur-xl -z-10`}
                />

                {/* Content */}
                <div className="relative z-10 flex flex-col items-center gap-3">
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    className={`
                      w-10 h-10 md:w-12 md:h-12
                      rounded-xl
                      flex items-center justify-center
                      bg-black/40 border border-white/5
                      ${item.text}
                      transition-all duration-300
                    `}
                  >
                    <Icon className="text-lg md:text-xl" />
                  </motion.div>

                  <div className="space-y-0.5">
                    <p className={`text-lg md:text-xl font-black tracking-tighter ${item.text}`}>
                      {item.title}
                    </p>

                    <p className="text-[10px] md:text-xs text-[var(--muted)] font-bold uppercase tracking-widest leading-tight opacity-70">
                      {item.subtitle}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
