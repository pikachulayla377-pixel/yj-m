"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import ThemeToggle from "../ThemeToggle/ThemeToggle";
import { FiPlus, FiLogOut, FiSettings, FiAward, FiShield, FiHeadphones } from "react-icons/fi";
import { FaUser } from "react-icons/fa";
import { HiHome, HiGlobeAlt, HiCube } from "react-icons/hi";
import Image from "next/image";
import logo from "@/public/logo.png";


export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  const dropdownRef = useRef(null);

  // ---------------- FETCH USER FROM JWT ----------------
  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (!token) {
      setLoading(false);
      return;
    }

    fetch("/api/auth/me", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setUser(data.user);
        } else {
          sessionStorage.removeItem("token");
        }
      })
      .finally(() => setLoading(false));
  }, []);

  // ---------------- LOGOUT ----------------
  const handleLogout = () => {
    sessionStorage.removeItem("token");
    setUser(null);
    window.location.href = "/";
  };

  // ---------------- SCROLL EFFECT ----------------
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // ---------------- CLOSE DROPDOWN ON OUTSIDE CLICK ----------------
  useEffect(() => {
    const handler = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setUserMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${scrolled
        ? "backdrop-blur-xl shadow-lg bg-[var(--card)]/90 border-b border-[var(--border)]"
        : "bg-transparent"
        }`}
    >
      <div className="max-w-6xl mx-auto flex items-center justify-between px-4 h-16">

        {/* LOGO */}
        <Link
          href="/"
          className="flex items-center transition-transform duration-300 hover:scale-105"
        >
          <Image
            src={logo}
            alt="yuji Logo"
            width={90}
            height={28}
            priority
            className="object-contain"
          />
        </Link>

        {/* DESKTOP NAV */}
        <nav className="hidden md:flex items-center space-x-1 text-[var(--muted)]">
          <Link
            href="/"
            className="flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300 hover:text-[var(--foreground)] hover:bg-[var(--accent)]/10"
          >
            <HiHome size={18} />
            <span>Home</span>
          </Link>
          <Link
            href="/region"
            className="flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300 hover:text-[var(--foreground)] hover:bg-[var(--accent)]/10"
          >
            <HiGlobeAlt size={18} />
            <span>Region</span>
          </Link>
          <Link
            href="/services"
            className="flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300 hover:text-[var(--foreground)] hover:bg-[var(--accent)]/10"
          >
            <HiCube size={18} />
            <span>Services</span>
          </Link>
        </nav>

        {/* RIGHT SIDE */}
        <div className="flex items-center gap-3 relative" ref={dropdownRef}>
          <ThemeToggle />

          {/* USER AVATAR */}
          <button
            onClick={() => !loading && setUserMenuOpen(!userMenuOpen)}
            className="w-10 h-10 rounded-full bg-gradient-to-br from-[var(--accent)] to-[#22d3ee] flex items-center justify-center overflow-hidden transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-[var(--accent)]/30 ring-2 ring-transparent hover:ring-[var(--accent)]/50"
          >
            {!loading && user?.avatar ? (
              <Image
                src={user.avatar}
                alt="User Avatar"
                width={40}
                height={40}
                className="object-cover w-full h-full"
              />
            ) : (
              <FaUser className="text-white" />
            )}
          </button>

          {/* USER DROPDOWN */}
          {userMenuOpen && !loading && (
            <div
              className="absolute right-0 top-14 w-72 bg-[var(--card)] border border-[var(--border)] rounded-2xl shadow-2xl overflow-hidden z-50"
              style={{
                animation: 'slideDown 0.3s ease-out'
              }}
            >
              {!user ? (
                <div className="p-4">
                  <Link
                    href="/login"
                    className="flex items-center justify-center gap-2 w-full py-3 px-4 bg-gradient-to-r from-[var(--accent)] to-[#22d3ee] text-white rounded-xl font-medium transition-all duration-300 hover:shadow-lg hover:shadow-[var(--accent)]/30 hover:scale-[1.02]"
                    onClick={() => setUserMenuOpen(false)}
                  >
                    <FaUser size={16} />
                    Login / Register
                  </Link>
                </div>
              ) : (
                <>
                  {/* WALLET */}
                  <div className="p-4 bg-gradient-to-br from-[var(--accent)]/10 to-[#22d3ee]/10 border-b border-[var(--border)]">
                    <Link href="/dashboard" onClick={() => setUserMenuOpen(false)}>
                      <div className="flex items-center justify-between bg-[var(--background)] px-4 py-3 rounded-xl border border-[var(--border)] transition-all duration-300 hover:border-[var(--accent)] hover:shadow-md group">
                        <span className="text-[var(--accent)] font-bold text-lg">
                          ₹{user.wallet}
                        </span>
                        <div className="w-8 h-8 rounded-full bg-[var(--accent)] flex items-center justify-center transition-transform duration-300 group-hover:scale-110 group-hover:rotate-90">
                          <FiPlus size={18} className="text-white" />
                        </div>
                      </div>
                    </Link>
                  </div>

                  <div className="p-2">
                    <Link
                      href="/dashboard"
                      className="flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 hover:bg-[var(--accent)]/10 hover:text-[var(--accent)] group"
                      onClick={() => setUserMenuOpen(false)}
                    >
                      <HiHome size={18} className="transition-transform duration-300 group-hover:scale-110" />
                      <span className="font-medium">Dashboard</span>
                    </Link>

                    <Link
                      href="/dashboard"
                      className="flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 hover:bg-[var(--accent)]/10 hover:text-[var(--accent)] group"
                      onClick={() => setUserMenuOpen(false)}
                    >
                      <FiHeadphones size={18} className="transition-transform duration-300 group-hover:scale-110" />
                      <span className="font-medium">Customer Support</span>
                    </Link>

                    <Link
                      href="/dashboard"
                      className="flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 hover:bg-[var(--accent)]/10 hover:text-[var(--accent)] group"
                      onClick={() => setUserMenuOpen(false)}
                    >
                      <FiSettings size={18} className="transition-transform duration-300 group-hover:scale-110 group-hover:rotate-90" />
                      <span className="font-medium">Account Settings</span>
                    </Link>

                    <Link
                      href="/leaderboard"
                      className="flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 hover:bg-[var(--accent)]/10 hover:text-[var(--accent)] group"
                      onClick={() => setUserMenuOpen(false)}
                    >
                      <FiAward size={18} className="transition-transform duration-300 group-hover:scale-110" />
                      <span className="font-medium">Leader Board</span>
                    </Link>

                    <Link
                      href="/admin-panal"
                      className="flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 hover:bg-[var(--accent)]/10 hover:text-[var(--accent)] group"
                      onClick={() => setUserMenuOpen(false)}
                    >
                      <FiAward size={18} className="transition-transform duration-300 group-hover:scale-110" />
                      <span className="font-medium">Membership</span>
                    </Link>

                    {/* ADMIN / OWNER */}
                    {user.userType === "owner" && (
                      <>
                        <div className="h-px bg-[var(--border)] my-2" />
                        <Link
                          href="/owner-panal"
                          className="flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 hover:bg-[var(--accent)]/10 hover:text-[var(--accent)] group"
                          onClick={() => setUserMenuOpen(false)}
                        >
                          <FiShield size={18} className="transition-transform duration-300 group-hover:scale-110" />
                          <span className="font-medium">Admin Panel</span>
                        </Link>
                      </>
                    )}

                    <div className="h-px bg-[var(--border)] my-2" />

                    <button
                      onClick={handleLogout}
                      className="flex items-center gap-3 w-full px-4 py-3 rounded-xl transition-all duration-300 hover:bg-red-500/10 hover:text-red-500 group"
                    >
                      <FiLogOut size={18} className="transition-transform duration-300 group-hover:scale-110 group-hover:translate-x-1" />
                      <span className="font-medium">Logout</span>
                    </button>
                  </div>
                </>
              )}
            </div>
          )}

          {/* MOBILE MENU ICON */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden text-[var(--foreground)] text-2xl w-10 h-10 flex items-center justify-center rounded-lg transition-all duration-300 hover:bg-[var(--accent)]/10"
          >
            <span className="transition-transform duration-300" style={{ display: 'inline-block', transform: menuOpen ? 'rotate(90deg)' : 'rotate(0deg)' }}>
              {menuOpen ? "✕" : "☰"}
            </span>
          </button>
        </div>
      </div>

      {/* MOBILE NAV */}
      <div
        className={`md:hidden transition-all duration-500 overflow-hidden ${menuOpen ? "max-h-[300px] opacity-100" : "max-h-0 opacity-0"
          } bg-[var(--card)]/95 backdrop-blur-xl border-t border-[var(--border)]`}
      >
        <nav className="flex flex-col px-4 py-4 space-y-2 text-[var(--muted)]">
          <Link
            href="/"
            onClick={() => setMenuOpen(false)}
            className="flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 hover:bg-[var(--accent)]/10 hover:text-[var(--foreground)]"
          >
            <HiHome size={20} />
            <span className="font-medium">Home</span>
          </Link>
          <Link
            href="/region"
            onClick={() => setMenuOpen(false)}
            className="flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 hover:bg-[var(--accent)]/10 hover:text-[var(--foreground)]"
          >
            <HiGlobeAlt size={20} />
            <span className="font-medium">Region</span>
          </Link>
          <Link
            href="/services"
            onClick={() => setMenuOpen(false)}
            className="flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 hover:bg-[var(--accent)]/10 hover:text-[var(--foreground)]"
          >
            <HiCube size={20} />
            <span className="font-medium">Services</span>
          </Link>
        </nav>
      </div>

      <style jsx>{`
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </header>
  );
}
