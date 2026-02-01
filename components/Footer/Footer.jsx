"use client";

import Link from "next/link";
import { QRCodeCanvas } from "qrcode.react";
import { FaInstagram, FaWhatsapp, FaHeart } from "react-icons/fa6";
import { motion } from "framer-motion";

/* ===================== CONFIG ===================== */

const BRAND_NAME = process.env.NEXT_PUBLIC_BRAND_NAME || "MewJi";

const BRAND = {
  name: BRAND_NAME,
  description:
    "Fast, secure MLBB top-ups with instant delivery and 24×7 support.",
};

/* ===================== ENV LINKS ===================== */

const WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_SUPPORT_WHATSAPP || "";
const INSTAGRAM_URL = process.env.NEXT_PUBLIC_INSTAGRAM_URL || "";
const INSTAGRAM_USERNAME =
  process.env.NEXT_PUBLIC_INSTAGRAM_USERNAME || "instagram";
const WHATSAPP_STORE_LINK =
  process.env.NEXT_PUBLIC_WHATSAPP_STORE_LINK || "#";

const TRUSTPILOT_URL =
  process.env.NEXT_PUBLIC_TRUSTPILOT_URL ||
  "https://www.trustpilot.com/evaluate/yujimlbb.com";

const WHATSAPP_CHAT_LINK = WHATSAPP_NUMBER
  ? `https://wa.me/${WHATSAPP_NUMBER.replace(/\D/g, "")}`
  : "";

/* ===================== FOOTER LINKS ===================== */

const FOOTER_LINKS = [
  {
    title: "Quick Links",
    links: [
      { label: "Home", href: "/" },
      { label: "Region", href: "/region" },
    ],
  },
  {
    title: "Support",
    links: [
      { label: "About", href: "/about" },
      { label: "Privacy Policy", href: "/privacy-policy" },
      { label: "Terms & Conditions", href: "/terms-and-conditions" },
      { label: "Contact Us", href: "/contact" },
    ],
  },
];

/* ===================== SOCIALS ===================== */

const SOCIALS = [
  {
    label: "Instagram",
    href: INSTAGRAM_URL,
    icon: FaInstagram,
    hover: "hover:text-[var(--accent)]",
  },
  {
    label: "WhatsApp",
    href: WHATSAPP_CHAT_LINK,
    icon: FaWhatsapp,
    hover: "hover:text-green-500",
  },
].filter((s) => s.href);

/* ===================== ANIMATION VARIANTS ===================== */

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

/* ===================== COMPONENT ===================== */

export default function Footer() {
  return (
    <footer className="mt-10 bg-[var(--card)] text-[var(--muted)] border-t border-[var(--border)]">

      {/* ================= MAIN ================= */}
      <motion.div
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={containerVariants}
      >
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5">

          {/* Brand + Trustpilot QR */}
          <motion.div
            className="col-span-2 md:col-span-1 flex justify-between gap-3"
            variants={itemVariants}
          >
            {/* Brand Info */}
            <div>
              <motion.h2
                className="relative text-xl font-extrabold tracking-tight leading-tight"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              >
                <span
                  className="
                    absolute inset-0
                    bg-gradient-to-r
                    from-[#facc15]/15
                    via-[var(--accent)]/15
                    to-purple-500/15
                    blur-md
                    -z-10
                  "
                />
                <span
                  className="
                    bg-gradient-to-r
                    from-[#facc15]
                    via-[var(--accent)]
                    to-purple-500
                    bg-clip-text
                    text-transparent
                  "
                >
                  {BRAND.name}
                </span>
              </motion.h2>

              <motion.p
                className="text-[11px] leading-snug max-w-[190px] mt-1"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3, duration: 0.5 }}
              >
                {BRAND.description}
              </motion.p>

              <motion.p
                className="text-[10px] mt-1 opacity-60"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 0.6 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4, duration: 0.5 }}
              >
                @{INSTAGRAM_USERNAME}
              </motion.p>
            </div>

            {/* Trustpilot QR (Right side) */}
            <motion.a
              href={TRUSTPILOT_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Give us a review on Trustpilot"
              className="flex flex-col items-center gap-0.5 hover:opacity-90 transition"
              whileHover={{ scale: 1.1, rotate: 5 }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.3 }}
            >
              <div className="bg-white p-[2px] rounded border border-[var(--border)]">
                <QRCodeCanvas
                  value={TRUSTPILOT_URL}
                  size={42}
                  bgColor="#ffffff"
                  fgColor="#000000"
                  level="Q"
                />
              </div>

              <span className="text-[9px] opacity-70 text-center">
                Give us a<br />review here
              </span>
            </motion.a>
          </motion.div>

          {/* Link Sections */}
          {FOOTER_LINKS.map((section, sectionIndex) => (
            <motion.div
              key={section.title}
              className="flex flex-col gap-1"
              variants={itemVariants}
            >
              <h3 className="text-[var(--accent)] font-semibold text-xs">
                {section.title}
              </h3>

              {section.links.map((link, linkIndex) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + sectionIndex * 0.1 + linkIndex * 0.05, duration: 0.3 }}
                >
                  <Link
                    href={link.href}
                    className="text-[11px] hover:text-[var(--accent)] transition inline-block"
                  >
                    <motion.span
                      whileHover={{ x: 5 }}
                      transition={{ duration: 0.2 }}
                    >
                      {link.label}
                    </motion.span>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          ))}

          {/* Desktop Socials */}
          {SOCIALS.length > 0 && (
            <motion.div
              className="hidden md:flex flex-col gap-2"
              variants={itemVariants}
            >
              <h3 className="text-[var(--accent)] font-semibold text-xs">
                Connect
              </h3>

              <div className="flex gap-3">
                {SOCIALS.map(({ label, href, icon: Icon, hover }, index) => (
                  <motion.a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className={`${hover} transition-colors`}
                    whileHover={{ scale: 1.2, rotate: 10 }}
                    whileTap={{ scale: 0.9 }}
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5 + index * 0.1, duration: 0.3 }}
                  >
                    <Icon className="w-4 h-4" />
                  </motion.a>
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </motion.div>

      {/* ================= BOTTOM ================= */}
      <motion.div
        className="border-t border-[var(--border)] py-2"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.6, duration: 0.5 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-2">

            {/* Mobile Socials */}
            {SOCIALS.length > 0 && (
              <div className="flex md:hidden gap-4">
                {SOCIALS.map(({ label, href, icon: Icon, hover }, index) => (
                  <motion.a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className={`${hover} transition-colors`}
                    whileHover={{ scale: 1.2, rotate: 10 }}
                    whileTap={{ scale: 0.9 }}
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.7 + index * 0.1, duration: 0.3 }}
                  >
                    <Icon className="w-4 h-4" />
                  </motion.a>
                ))}
              </div>
            )}

            {/* Made By */}
            <motion.p
              className="text-[10px] text-center"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.7, duration: 0.5 }}
            >
              Made with{" "}
              <motion.span
                className="inline-block"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1, repeat: Infinity, repeatDelay: 2 }}
              >
                <FaHeart className="inline w-3 h-3 text-[var(--accent)] mx-0.5" />
              </motion.span>{" "}
              by{" "}
              <a
                href={WHATSAPP_STORE_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[var(--accent)] font-medium hover:underline"
              >
                Blue Buff
              </a>
            </motion.p>

            {/* Copyright */}
            <motion.p
              className="text-[10px] opacity-60"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 0.6, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.8, duration: 0.5 }}
            >
              © {new Date().getFullYear()} {BRAND_NAME}
            </motion.p>
          </div>
        </div>
      </motion.div>
    </footer>
  );
}
