"use client";

import Link from "next/link";
import { QRCodeCanvas } from "qrcode.react";
import { FaInstagram, FaWhatsapp, FaHeart } from "react-icons/fa6";

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

/* ===================== COMPONENT ===================== */

export default function Footer() {
  return (
    <footer className="mt-10 bg-[var(--card)] text-[var(--muted)] border-t border-[var(--border)]">

      {/* ================= MAIN ================= */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5">

          {/* Brand + Trustpilot QR */}
          <div className="col-span-2 md:col-span-1 flex justify-between gap-3">
            {/* Brand Info */}
            <div>
              <h2 className="relative text-xl font-extrabold tracking-tight leading-tight">
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
              </h2>

              <p className="text-[11px] leading-snug max-w-[190px] mt-1">
                {BRAND.description}
              </p>

              <p className="text-[10px] mt-1 opacity-60">
                @{INSTAGRAM_USERNAME}
              </p>
            </div>

            {/* Trustpilot QR (Right side) */}
            <a
              href={TRUSTPILOT_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Give us a review on Trustpilot"
              className="flex flex-col items-center gap-0.5 hover:opacity-90 transition"
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
            </a>
          </div>

          {/* Link Sections */}
          {FOOTER_LINKS.map((section) => (
            <div key={section.title} className="flex flex-col gap-1">
              <h3 className="text-[var(--accent)] font-semibold text-xs">
                {section.title}
              </h3>

              {section.links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-[11px] hover:text-[var(--accent)] transition"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          ))}

          {/* Desktop Socials */}
          {SOCIALS.length > 0 && (
            <div className="hidden md:flex flex-col gap-2">
              <h3 className="text-[var(--accent)] font-semibold text-xs">
                Connect
              </h3>

              <div className="flex gap-3">
                {SOCIALS.map(({ label, href, icon: Icon, hover }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className={`${hover} transition-transform hover:scale-110`}
                  >
                    <Icon className="w-4 h-4" />
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ================= BOTTOM ================= */}
      <div className="border-t border-[var(--border)] py-2">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-2">

            {/* Mobile Socials */}
            {SOCIALS.length > 0 && (
              <div className="flex md:hidden gap-4">
                {SOCIALS.map(({ label, href, icon: Icon, hover }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className={`${hover} transition-transform hover:scale-110`}
                  >
                    <Icon className="w-4 h-4" />
                  </a>
                ))}
              </div>
            )}

            {/* Made By */}
            <p className="text-[10px] text-center">
              Made with{" "}
              <FaHeart className="inline w-3 h-3 text-[var(--accent)] mx-0.5" />{" "}
              by{" "}
              <a
                href={WHATSAPP_STORE_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[var(--accent)] font-medium hover:underline"
              >
                Blue Buff
              </a>
            </p>

            {/* Copyright */}
            <p className="text-[10px] opacity-60">
              © {new Date().getFullYear()} {BRAND_NAME}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
