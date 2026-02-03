"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { GoogleLogin } from "@react-oauth/google";
import { motion, AnimatePresence } from "framer-motion";
import { ShieldCheck, Lock, Globe, ArrowRight, Activity, Cpu, Shield, Zap } from "lucide-react";

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
    <section className="min-h-screen relative flex items-center justify-center bg-[var(--background)] overflow-hidden px-4 font-sans selection:bg-[var(--accent)]/30">

      {/* --- Tactical Background System --- */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        {/* Dynamic Gradient Orbs */}
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            x: [0, 30, 0],
            y: [0, 20, 0],
            opacity: [0.1, 0.15, 0.1],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
          className="absolute -top-[5%] -left-[5%] w-[50%] h-[50%] bg-[var(--accent)] blur-[120px] rounded-full"
        />
        <motion.div
          animate={{
            scale: [1.1, 1, 1.1],
            x: [0, -30, 0],
            y: [0, -20, 0],
            opacity: [0.08, 0.12, 0.08],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          className="absolute -bottom-[5%] -right-[5%] w-[40%] h-[40%] bg-[#06b6d4] blur-[100px] rounded-full"
        />

        {/* Scanline Effect */}
        <div className="absolute inset-0 z-10 opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 2px, var(--foreground) 3px)`,
            backgroundSize: '100% 4px'
          }}
        />

        {/* Tactical Grid */}
        <div
          className="absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage: `
              linear-gradient(to right, var(--accent) 1px, transparent 1px),
              linear-gradient(to bottom, var(--accent) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px'
          }}
        />

        {/* Small Data Points Grid */}
        <div
          className="absolute inset-0 opacity-[0.1]"
          style={{
            backgroundImage: `radial-gradient(var(--accent) 0.5px, transparent 0.5px)`,
            backgroundSize: '20px 20px'
          }}
        />
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
        className="relative w-full max-w-[400px] z-10"
      >
        {/* --- Card Container --- */}
        <div className="relative group">
          {/* Outer Glow & Border Pulse */}
          <div className="absolute -inset-[2px] bg-gradient-to-tr from-[var(--accent)]/40 via-transparent to-[var(--accent)]/30 rounded-[2rem] blur-[8px] opacity-40 group-hover:opacity-70 transition-opacity duration-500" />

          <div className="relative rounded-[2rem] bg-black/40 backdrop-blur-3xl border border-white/10 shadow-[0_0_50px_-12px_rgba(0,0,0,0.5)] overflow-hidden p-8 sm:p-10">

            {/* Corner Markers */}
            <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-[var(--accent)]/40 rounded-tl-xl m-4" />
            <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-[var(--accent)]/40 rounded-tr-xl m-4" />
            <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-[var(--accent)]/40 rounded-bl-xl m-4" />
            <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-[var(--accent)]/40 rounded-br-xl m-4" />

            {/* Top Indicator */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 flex gap-1 pt-4">
              <div className="w-1.5 h-1.5 rounded-full bg-[var(--accent)]/30 animate-pulse" />
              <div className="w-8 h-1 rounded-full bg-[var(--accent)]/10 overflow-hidden">
                <motion.div
                  animate={{ x: ["-100%", "100%"] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  className="w-full h-full bg-[var(--accent)]/50"
                />
              </div>
              <div className="w-1.5 h-1.5 rounded-full bg-[var(--accent)]/30 animate-pulse" />
            </div>

            {/* BRANDING SECTION */}
            <div className="mb-8 text-center relative pt-4">
              <motion.div
                initial={{ rotateY: 180, opacity: 0 }}
                animate={{ rotateY: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="mx-auto mb-6 h-20 w-20 relative flex items-center justify-center"
              >
                {/* Logo Backdrop */}
                <div className="absolute inset-0 bg-gradient-to-br from-[var(--accent)]/20 to-transparent blur-2xl rounded-full" />

                <div className="relative h-full w-full rounded-2xl bg-gradient-to-br from-[var(--accent)]/50 to-transparent p-[1.5px] group-hover:p-[2px] transition-all duration-300">
                  <div className="h-full w-full rounded-[0.9rem] bg-[#0a0a0a] flex items-center justify-center overflow-hidden border border-white/5 shadow-inner">
                    <Image
                      src="/logo.png"
                      alt="yuji Logo"
                      width={48}
                      height={48}
                      className="object-contain filter brightness-110 contrast-110"
                      priority
                    />
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <h1 className="text-2xl font-bold tracking-tight text-[var(--foreground)]">
                  Welcome back
                </h1>
                <p className="mt-1 text-sm text-[var(--muted)]">
                  Please sign in to continue
                </p>
              </motion.div>
            </div>

            {/* ERROR / SUCCESS HANDLING */}
            <AnimatePresence mode="wait">
              {error && (
                <motion.div
                  initial={{ opacity: 0, height: 0, x: -10 }}
                  animate={{ opacity: 1, height: "auto", x: 0 }}
                  exit={{ opacity: 0, height: 0, x: 10 }}
                  className="mb-4 rounded-xl border border-red-500/20 bg-red-500/5 px-4 py-3 text-xs text-red-500 flex items-center gap-3 overflow-hidden font-medium"
                >
                  <Lock size={14} className="flex-shrink-0" />
                  {error}
                </motion.div>
              )}
              {success && (
                <motion.div
                  initial={{ opacity: 0, height: 0, x: -10 }}
                  animate={{ opacity: 1, height: "auto", x: 0 }}
                  exit={{ opacity: 0, height: 0, x: 10 }}
                  className="mb-4 rounded-xl border border-green-500/20 bg-green-500/5 px-4 py-3 text-xs text-green-500 flex items-center gap-3 overflow-hidden font-medium"
                >
                  <ShieldCheck size={14} className="flex-shrink-0" />
                  {success}
                </motion.div>
              )}
            </AnimatePresence>

            {/* AUTH ACTIONS */}
            <div className="space-y-6">
              <div className="relative group/btn">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-[var(--accent)]/50 to-transparent rounded-xl opacity-0 group-hover/btn:opacity-50 transition-opacity blur-sm" />
                <div className="relative bg-white/5 rounded-xl border border-white/10 hover:border-[var(--accent)]/50 transition-colors">
                  <GoogleLogin
                    onSuccess={(res) => res.credential && handleGoogleLogin(res.credential)}
                    onError={() => setError("Google login error")}
                    theme="filled_black"
                    size="large"
                    shape="square"
                    width="100%"
                  />
                </div>
              </div>

              {/* PROGRESS INDICATOR */}
              <AnimatePresence>
                {loading && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="pt-2 flex flex-col gap-2"
                  >
                    <div className="flex justify-between items-center px-1">
                      <span className="text-[10px] text-[var(--accent)] uppercase tracking-tighter">Authenticating...</span>
                    </div>
                    <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden border border-white/5">
                      <motion.div
                        initial={{ x: "-100%" }}
                        animate={{ x: "0%" }}
                        transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                        className="w-full h-full bg-gradient-to-r from-transparent via-[var(--accent)] to-transparent"
                      />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* LEGAL FOOTER */}
            <div className="mt-8 pt-6 border-t border-white/5 text-center flex flex-col gap-4">
              <p className="text-[10px] text-[var(--muted)] leading-relaxed">
                By continuing, you agree to our{" "}
                <button className="text-[var(--accent)] font-medium hover:underline">Terms</button>
                {" "}&{" "}
                <button className="text-[var(--accent)] font-medium hover:underline">Privacy Policy</button>
              </p>

              <Link
                href="/"
                className="inline-flex items-center justify-center gap-2 text-[11px] font-medium text-[var(--muted)] hover:text-[var(--foreground)] transition-all group/home"
              >
                <ArrowRight size={14} className="rotate-180 group-hover/home:-translate-x-1 transition-transform" />
                Back to Home
              </Link>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
