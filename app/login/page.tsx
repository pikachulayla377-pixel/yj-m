"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { GoogleLogin } from "@react-oauth/google";
import { motion, AnimatePresence } from "framer-motion";
import { ShieldCheck, Lock, ArrowRight, UserCheck } from "lucide-react";

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
    <section className="min-h-screen relative flex items-center justify-center bg-[var(--background)] overflow-hidden px-4 py-20 font-sans selection:bg-[var(--accent)]/30">

      {/* --- Premium Background System --- */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {/* Cinematic Orbs */}
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0],
            opacity: [0.15, 0.2, 0.15],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-1/4 -left-1/4 w-full h-full bg-gradient-to-br from-[var(--accent)] to-transparent blur-[160px] rounded-full"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            rotate: [0, -90, 0],
            opacity: [0.1, 0.15, 0.1],
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -bottom-1/4 -right-1/4 w-full h-full bg-gradient-to-tl from-[#7dd3fc] to-transparent blur-[140px] rounded-full"
        />

        {/* Subtle Noise/Grain Overlay */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-overlay"
          style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="relative w-full max-w-[420px] z-10"
      >
        {/* --- Card Container --- */}
        <div className="relative">
          {/* Subtle Outer Glow */}
          <div className="absolute -inset-4 bg-[var(--accent)]/10 blur-3xl rounded-[2.5rem] opacity-50 pointer-events-none" />

          <div className="relative rounded-[2.5rem] bg-[var(--card)]/40 backdrop-blur-2xl border border-white/10 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.3)] overflow-hidden p-8 sm:p-12">

            {/* BRANDING SECTION */}
            <div className="mb-10 text-center">
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="mx-auto mb-6 h-20 w-20 relative"
              >
                {/* Logo Halo */}
                <div className="absolute inset-0 bg-[var(--accent)]/20 blur-2xl rounded-full animate-pulse" />

                <div className="relative h-full w-full rounded-2xl bg-gradient-to-b from-white/10 to-transparent p-[1px]">
                  <div className="h-full w-full rounded-2xl bg-[#0a0a0a]/80 backdrop-blur-md flex items-center justify-center border border-white/5 shadow-inner">
                    <Image
                      src="/logo.png"
                      alt="yuji Logo"
                      width={44}
                      height={44}
                      className="object-contain"
                      priority
                    />
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="space-y-1"
              >
                <h1 className="text-3xl font-extrabold tracking-tight text-[var(--foreground)]">
                  Welcome back
                </h1>
                <p className="text-sm text-[var(--muted)] font-medium">
                  Login to your account to continue
                </p>
              </motion.div>
            </div>

            {/* ERROR / SUCCESS HANDLING */}
            <AnimatePresence mode="wait">
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="mb-6 rounded-2xl border border-red-500/10 bg-red-500/5 px-4 py-3 text-xs text-red-500 flex items-center gap-3 font-semibold"
                >
                  <Lock size={14} className="flex-shrink-0" />
                  {error}
                </motion.div>
              )}
              {success && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="mb-6 rounded-2xl border border-green-500/10 bg-green-500/5 px-4 py-3 text-xs text-green-500 flex items-center gap-3 font-semibold"
                >
                  <UserCheck size={14} className="flex-shrink-0" />
                  {success}
                </motion.div>
              )}
            </AnimatePresence>

            {/* AUTH ACTIONS */}
            <div className="space-y-6">
              <div className="relative group/btn overflow-hidden rounded-[1.25rem] border border-white/10 bg-white/5 transition-all duration-300 hover:border-[var(--accent)]/50 hover:bg-white/[0.08]">
                <GoogleLogin
                  onSuccess={(res) => res.credential && handleGoogleLogin(res.credential)}
                  onError={() => setError("Google protocol failed")}
                  theme="filled_black"
                  size="large"
                  shape="pill"
                  width="100%"
                />
              </div>

              {/* LOADING STATE INDICATOR */}
              <AnimatePresence>
                {loading && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex flex-col items-center gap-3 pt-2"
                  >
                    <div className="flex gap-1.5">
                      {[0, 1, 2].map((i) => (
                        <motion.div
                          key={i}
                          animate={{ scale: [1, 1.5, 1], opacity: [0.3, 1, 0.3] }}
                          transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
                          className="w-1.5 h-1.5 rounded-full bg-[var(--accent)]"
                        />
                      ))}
                    </div>
                    <span className="text-[10px] text-[var(--accent)] font-bold uppercase tracking-widest">Securing Connection</span>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* FOOTER */}
            <div className="mt-12 space-y-6">
              <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

              <div className="flex flex-col items-center gap-5">
                <p className="text-[10px] text-[var(--muted)] tracking-wide leading-relaxed text-center px-4">
                  By signing in, you agree to our{" "}
                  <button className="text-[var(--foreground)] font-bold hover:text-[var(--accent)] transition-colors underline underline-offset-4 decoration-white/20">Terms of Service</button>
                  {" "}and{" "}
                  <button className="text-[var(--foreground)] font-bold hover:text-[var(--accent)] transition-colors underline underline-offset-4 decoration-white/20">Privacy Policy</button>
                </p>

                <Link
                  href="/"
                  className="group inline-flex items-center gap-2 text-xs font-bold text-[var(--muted)] hover:text-[var(--foreground)] transition-all"
                >
                  <ArrowRight size={14} className="rotate-180 group-hover:-translate-x-1 transition-transform" />
                  Back to homepage
                </Link>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
