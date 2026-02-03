"use client";

import Link from "next/link";
import { QRCodeCanvas } from "qrcode.react";
import {
  FiInstagram,
  FiHeart,
  FiMail,
  FiShield,
  FiGlobe,
  FiExternalLink
} from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa6";
import { motion } from "framer-motion";

/* ===================== CONFIG ===================== */

const BRAND_NAME = process.env.NEXT_PUBLIC_BRAND_NAME || "MewJi";

const BRAND = {
  name: BRAND_NAME,
  description:
    "Fast and secure Mobile Legends top-ups with instant delivery and reliable 24/7 support.",
};

/* ===================== ENV LINKS ===================== */

const WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_SUPPORT_WHATSAPP || "";
const INSTAGRAM_URL = process.env.NEXT_PUBLIC_INSTAGRAM_URL || "";
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
    title: "Company",
    links: [
      { label: "Home", href: "/" },
      { label: "About Us", href: "/about" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    title: "Support",
    links: [
      { label: "Privacy Policy", href: "/privacy-policy" },
      { label: "Terms of Service", href: "/terms-and-conditions" },
      { label: "Region Info", href: "/region" },
    ],
  },
];

/* ===================== SOCIALS ===================== */

const SOCIALS = [
  {
    label: "Instagram",
    href: INSTAGRAM_URL,
    icon: FiInstagram,
    color: "hover:text-pink-500",
  },
  {
    label: "WhatsApp",
    href: WHATSAPP_CHAT_LINK,
    icon: FaWhatsapp,
    color: "hover:text-green-500",
  },
].filter((s) => s.href);

/* ===================== MAIN COMPONENT ===================== */

export default function Footer() {
  return (
    <footer className="relative mt-20 border-t border-[var(--border)] bg-[var(--card)]/30 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">

          {/* Brand & Description */}
          <div className="md:col-span-4 space-y-6">
            <h2 className="text-3xl font-bold tracking-tight text-[var(--foreground)]">
              {BRAND.name}<span className="text-[var(--accent)]">.</span>
            </h2>
            <p className="text-base text-[var(--muted)] leading-relaxed max-w-sm">
              {BRAND.description}
            </p>
            <div className="flex items-center gap-4">
              {SOCIALS.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`p-2 rounded-full border border-[var(--border)] bg-[var(--background)]/50 transition-all duration-300 ${social.color} hover:border-[var(--accent)] hover:scale-110`}
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Links Grid */}
          <div className="md:col-span-1" /> {/* Spacer */}

          <div className="md:col-span-4 grid grid-cols-2 gap-8">
            {FOOTER_LINKS.map((section) => (
              <div key={section.title} className="space-y-6">
                <h3 className="text-xs font-bold uppercase tracking-widest text-[var(--muted)] opacity-80">
                  {section.title}
                </h3>
                <ul className="space-y-4">
                  {section.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="text-sm font-medium text-[var(--muted)] hover:text-[var(--accent)] transition-colors"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* QR / Trust Section */}
          <div className="md:col-span-3 flex flex-col items-center md:items-end space-y-6 text-center md:text-right">
            <div className="p-4 bg-white rounded-2xl shadow-sm border border-[var(--border)]">
              <QRCodeCanvas
                value={TRUSTPILOT_URL}
                size={80}
                bgColor="#ffffff"
                fgColor="#000000"
                level="M"
              />
            </div>
            <div className="space-y-2">
              <h4 className="text-sm font-bold flex items-center justify-center md:justify-end gap-2 text-[var(--foreground)]">
                <FiShield className="text-green-500" /> Professional Service
              </h4>
              <p className="text-xs text-[var(--muted)]">
                Scan to verify our<br />customer reviews
              </p>
            </div>
          </div>

        </div>

        {/* Divider */}
        <div className="mt-16 pt-8 border-t border-[var(--border)]/50 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-sm font-medium text-[var(--muted)]">
            © {new Date().getFullYear()} {BRAND_NAME}. All rights reserved.
          </p>
          <div className="flex items-center gap-6 text-sm">
            <div className="flex items-center gap-2 text-[var(--muted)]">
              Made with <FiHeart className="text-red-500" /> by
              <a
                href={WHATSAPP_STORE_LINK}
                className="font-bold text-[var(--foreground)] hover:text-[var(--accent)] transition-colors"
              >
                Blue Buff
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
