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
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [imgError, setImgError] = useState(false);

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
          setImgError(false); // Reset error on new user
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
    setImgError(false);
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
            onClick={() => {
              if (loading) return;
              if (!user) {
                window.location.href = "/login";
              } else {
                setUserMenuOpen(!userMenuOpen);
              }
            }}
            className="w-10 h-10 rounded-full bg-gradient-to-br from-[var(--accent)] to-[#22d3ee] flex items-center justify-center overflow-hidden transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-[var(--accent)]/30 ring-2 ring-transparent hover:ring-[var(--accent)]/50"
          >
            {!loading && user?.avatar && !imgError ? (
              <Image
                src={user.avatar}
                alt="User Avatar"
                width={40}
                height={40}
                className="object-cover w-full h-full"
                onError={() => setImgError(true)}
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
                    className="flex items-center justify-center gap-2 w-full py-3 px-4 text-white rounded-xl font-medium transition-all duration-300 hover:shadow-lg hover:shadow-[var(--accent)]/30 hover:scale-[1.02]"
                    onClick={() => setUserMenuOpen(false)}
                  >
                    <FaUser size={16} />
                    Login / Register
                  </Link>
                </div>
              ) : (
                <>
                  {/* USER PROFILE */}
                  <div className="p-5 bg-gradient-to-br from-[var(--accent)]/5 to-transparent border-b border-[var(--border)]">
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[var(--accent)] to-[#22d3ee] p-[2px] shadow-lg">
                        <div className="w-full h-full rounded-[0.9rem] bg-[var(--card)] overflow-hidden flex items-center justify-center">
                          {user?.avatar && !imgError ? (
                            <Image
                              src={user.avatar}
                              alt={user.name}
                              width={56}
                              height={56}
                              className="object-cover w-full h-full"
                              onError={() => setImgError(true)}
                            />
                          ) : (
                            <FaUser className="text-[var(--accent)] text-xl" />
                          )}
                        </div>
                      </div>
                      <div className="flex flex-col min-w-0">
                        <span className="font-bold text-[var(--foreground)] truncate text-base leading-tight">
                          {user.name}
                        </span>
                        <span className="text-[11px] text-[var(--muted)] truncate mt-0.5">
                          {user.email}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="p-2">


                    <Link
                      href="/dashboard/support"
                      className="flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 hover:bg-[var(--accent)]/10 hover:text-[var(--accent)] group"
                      onClick={() => setUserMenuOpen(false)}
                    >
                      <FiHeadphones size={18} className="transition-transform duration-300 group-hover:scale-110" />
                      <span className="font-medium">Customer Support</span>
                    </Link>

                    <Link
                      href="/dashboard/order"
                      className="flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 hover:bg-[var(--accent)]/10 hover:text-[var(--accent)] group"
                      onClick={() => setUserMenuOpen(false)}
                    >
                      <FiSettings size={18} className="transition-transform duration-300 group-hover:scale-110 group-hover:rotate-90" />
                      <span className="font-medium">Orders</span>
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
                      className="flex items-center gap-3 w-full px-4 py-3 rounded-xl transition-all duration-300 bg-rose-500/5 text-rose-500 hover:bg-rose-500/15 group"
                    >
                      <FiLogOut size={18} className="transition-transform duration-300 group-hover:scale-110 group-hover:translate-x-1" />
                      <span className="font-bold">Logout</span>
                    </button>
                  </div>
                </>
              )}
            </div>
          )}

          {/* LOGOUT BUTTON OR LOGIN (Handled in dropdown) */}
        </div>
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
