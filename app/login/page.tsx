"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { GoogleLogin } from "@react-oauth/google";
import { motion, AnimatePresence } from "framer-motion";
import { ShieldCheck, Lock, Globe, ArrowRight } from "lucide-react";

export default function AuthPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleGoogleLogin = async (credential: string) => {
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const res = await fetch("/api/auth/google", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token: credential }),
      });

      const data = await res.json();

      if (!data.success) {
        setError(data.message || "Authentication failed");
        return;
      }

      sessionStorage.setItem("token", data.token);
      sessionStorage.setItem("userName", data.user.name);
      sessionStorage.setItem("email", data.user.email);
      sessionStorage.setItem("userId", data.user.userId);
      if (data.user.avatar) sessionStorage.setItem("avatar", data.user.avatar);

      setSuccess("Welcome back! Redirecting...");
      setTimeout(() => (window.location.href = "/"), 1200);
    } catch {
      setError("Secure protocol failure. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (!mounted) return null;

  return (
    <section className="min-h-screen relative flex items-center justify-center bg-[var(--background)] overflow-hidden px-4">

      {/* --- Ambient Background Elements --- */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        {/* Animated Gradient Orbs */}
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            x: [0, 50, 0],
            y: [0, 30, 0],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          className="absolute -top-[10%] -left-[10%] w-[60%] h-[60%] bg-[var(--accent)]/10 blur-[120px] rounded-full"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            x: [0, -40, 0],
            y: [0, -20, 0],
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
          className="absolute -bottom-[10%] -right-[10%] w-[50%] h-[50%] bg-[#06b6d4]/10 blur-[100px] rounded-full"
        />

        {/* Subtle Grid Pattern */}
        <div
          className="absolute inset-0 opacity-[0.03] invert dark:invert-0"
          style={{
            backgroundImage: `linear-gradient(var(--accent) 1px, transparent 1px), linear-gradient(90deg, var(--accent) 1px, transparent 1px)`,
            backgroundSize: '40px 40px'
          }}
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative w-full max-w-sm z-10"
      >
        {/* --- Decorative Corner Accents --- */}
        <div className="absolute -top-6 -left-6 w-12 h-12 border-t border-l border-[var(--accent)]/50 rounded-tl-2xl pointer-events-none" />
        <div className="absolute -bottom-6 -right-6 w-12 h-12 border-b border-r border-[var(--accent)]/50 rounded-br-2xl pointer-events-none" />

        <div className="relative group">
          {/* Card Border Glow */}
          <div className="absolute -inset-[1px] bg-gradient-to-br from-[var(--accent)]/50 via-transparent to-[var(--accent)]/30 rounded-3xl blur-[2px] opacity-50 transition-opacity group-hover:opacity-100" />

          <div className="relative rounded-3xl bg-[var(--card)]/80 backdrop-blur-2xl border border-white/10 dark:border-white/5 shadow-2xl p-8 sm:p-10">

            {/* BRANDING SECTION */}
            <div className="mb-10 text-center relative">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="mx-auto mb-6 h-20 w-20 relative"
              >
                {/* Logo Halo */}
                <div className="absolute inset-0 bg-[var(--accent)]/20 blur-xl rounded-full animate-pulse" />

                <div className="relative h-full w-full rounded-2xl bg-gradient-to-br from-[var(--accent)] to-[#0891b2] p-[1.5px] shadow-lg">
                  <div className="h-full w-full rounded-[0.9rem] bg-[var(--background)] flex items-center justify-center overflow-hidden">
                    <Image
                      src="/logo.png"
                      alt="yuji Logo"
                      width={48}
                      height={48}
                      className="object-contain"
                      priority
                    />
                  </div>
                </div>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="text-2xl font-bold tracking-tight text-[var(--foreground)]"
              >
                Welcome back
              </motion.h1>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="mt-1 text-sm text-[var(--muted)]"
              >
                Sign in to your account
              </motion.p>
            </div>

            {/* ERROR / SUCCESS HANDLING */}
            <AnimatePresence mode="wait">
              {error && (
                <motion.div
                  initial={{ opacity: 0, height: 0, filter: "blur(10px)" }}
                  animate={{ opacity: 1, height: "auto", filter: "blur(0px)" }}
                  exit={{ opacity: 0, height: 0, filter: "blur(10px)" }}
                  className="mb-6 rounded-xl border border-red-500/20 bg-red-500/5 px-4 py-3 text-xs text-red-500 flex items-center gap-3 overflow-hidden font-medium"
                >
                  <Lock size={14} className="flex-shrink-0" />
                  {error}
                </motion.div>
              )}
              {success && (
                <motion.div
                  initial={{ opacity: 0, height: 0, filter: "blur(10px)" }}
                  animate={{ opacity: 1, height: "auto", filter: "blur(0px)" }}
                  exit={{ opacity: 0, height: 0, filter: "blur(10px)" }}
                  className="mb-6 rounded-xl border border-green-500/20 bg-green-500/5 px-4 py-3 text-xs text-green-500 flex items-center gap-3 overflow-hidden font-medium"
                >
                  <ShieldCheck size={14} className="flex-shrink-0" />
                  {success}
                </motion.div>
              )}
            </AnimatePresence>

            {/* AUTH ACTIONS */}
            <div className="space-y-6">
              <div className="relative group/btn flex justify-center">
                <div className="absolute -inset-1 bg-gradient-to-r from-[var(--accent)] to-transparent opacity-0 group-hover/btn:opacity-20 rounded-full blur transition duration-500" />
                <GoogleLogin
                  onSuccess={(res) => res.credential && handleGoogleLogin(res.credential)}
                  onError={() => setError("Google protocol cancelled")}
                  theme="filled_black"
                  size="large"
                  shape="pill"
                  width="100%"
                />
              </div>

              {/* SECURITY BADGES */}
              <div className="pt-6 border-t border-white/5 flex items-center justify-between opacity-40">
                <div className="flex items-center gap-1.5 grayscale">
                  <ShieldCheck size={12} />
                  <span className="text-[9px] font-mono tracking-tighter">SECURE SSL</span>
                </div>
                <div className="flex items-center gap-1.5 grayscale">
                  <Globe size={12} />
                  <span className="text-[9px] font-mono tracking-tighter">GLOBAL NODES</span>
                </div>
              </div>
            </div>

            {/* AUTHENTICATION STATUS INDICATOR */}
            <AnimatePresence>
              {loading && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="mt-8 flex flex-col items-center gap-3"
                >
                  <div className="w-full h-[1px] bg-white/5 relative overflow-hidden">
                    <motion.div
                      initial={{ x: "-100%" }}
                      animate={{ x: "100%" }}
                      transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-[var(--accent)] to-transparent"
                    />
                  </div>
                  <span className="text-xs text-[var(--muted)] animate-pulse">
                    Authenticating...
                  </span>
                </motion.div>
              )}
            </AnimatePresence>

            {/* LEGAL FOOTER */}
            <div className="mt-8 text-center flex flex-col gap-4">
              <p className="text-[10px] text-[var(--muted)] leading-relaxed max-w-[240px] mx-auto">
                By continuing, you agree to our{" "}
                <button className="text-[var(--foreground)] font-medium hover:underline">Terms</button>
                {" "}&{" "}
                <button className="text-[var(--foreground)] font-medium hover:underline">Privacy Policy</button>
              </p>

              <Link
                href="/"
                className="inline-flex items-center justify-center gap-2 text-[11px] font-medium text-[var(--muted)] hover:text-[var(--accent)] transition-colors group/home"
              >
                <ArrowRight size={12} className="rotate-180 group-hover/home:-translate-x-1 transition-transform" />
                Back to Home
              </Link>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
