"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiTool, FiShield, FiLogOut, FiActivity } from "react-icons/fi";
import { usePathname } from "next/navigation";

export default function Maintenance() {
    const pathname = usePathname();
    const [show, setShow] = useState(false);
    const [mounted, setMounted] = useState(false);
    const [isLoggingOut, setIsLoggingOut] = useState(false);

    useEffect(() => {
        setMounted(true);

        // Skip maintenance on login page
        if (pathname === "/login") {
            setShow(false);
            return;
        }

        const checkOwner = async () => {
            const token = localStorage.getItem("token");
            if (!token) {
                setShow(true);
                return;
            }
            try {
                const res = await fetch("/api/auth/me", {
                    headers: { Authorization: `Bearer ${token}` }
                });
                const data = await res.json();
                if (data.success && data.user.userType === "owner") {
                    setShow(false);
                } else {
                    setShow(true);
                }
            } catch (err) {
                setShow(true);
            }
        };

        checkOwner();
    }, [pathname]);

    const handleLoggingOff = () => {
        setIsLoggingOut(true);
        const keysToRemove = ["token", "userName", "email", "userId", "phone", "pending_topup_order", "avatar"];
        keysToRemove.forEach(key => localStorage.removeItem(key));

        setTimeout(() => {
            window.location.reload();
        }, 1500);
    };

    if (!mounted || !show) return null;

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-[99999] flex items-center justify-center p-6 bg-[var(--background)]"
            >
                {/* AMBIENT GLOWS */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <motion.div
                        animate={{
                            scale: [1, 1.2, 1],
                            opacity: [0.1, 0.2, 0.1]
                        }}
                        transition={{ duration: 8, repeat: Infinity }}
                        className="absolute -top-[20%] -right-[10%] w-[70%] h-[70%] bg-[var(--accent)] rounded-full blur-[120px]"
                    />
                    <motion.div
                        animate={{
                            scale: [1.2, 1, 1.2],
                            opacity: [0.05, 0.15, 0.05]
                        }}
                        transition={{ duration: 10, repeat: Infinity }}
                        className="absolute -bottom-[20%] -left-[10%] w-[60%] h-[60%] bg-purple-500 rounded-full blur-[120px]"
                    />
                </div>

                {/* CONTENT CARD */}
                <div className="relative w-full max-w-md">
                    <motion.div
                        initial={{ scale: 0.95, y: 20 }}
                        animate={{ scale: 1, y: 0 }}
                        className="relative p-8 md:p-12 rounded-[2.5rem] bg-[var(--card)] border border-[var(--border)] shadow-2xl backdrop-blur-xl text-center overflow-hidden"
                    >
                        {/* ICON UNIT */}
                        <div className="relative mx-auto w-24 h-24 mb-8">
                            <div className="absolute inset-0 bg-[var(--accent)]/10 rounded-3xl rotate-12" />
                            <div className="absolute inset-0 border border-[var(--accent)]/20 rounded-3xl -rotate-6 transition-transform" />
                            <div className="relative flex items-center justify-center w-full h-full bg-[var(--card)] border border-[var(--border)] rounded-3xl shadow-sm">
                                <motion.div
                                    animate={{ rotate: [0, 10, 0, -10, 0] }}
                                    transition={{ duration: 4, repeat: Infinity }}
                                >
                                    <FiTool className="text-4xl text-[var(--accent)]" />
                                </motion.div>
                            </div>
                        </div>

                        {/* TEXT UNIT */}
                        <div className="space-y-4 mb-10">
                            <h1 className="text-3xl md:text-4xl font-black text-[var(--foreground)] tracking-tight">
                                Back in <span className="text-[var(--accent)]">soon</span>
                            </h1>
                            <p className="text-sm text-[var(--muted)] font-medium leading-relaxed px-2">
                                We're currently updating the site to bring you a better experience.
                            </p>
                        </div>

                        {/* ACTION UNIT */}
                        {!isLoggingOut ? (
                            <div className="space-y-6">
                                <button
                                    onClick={handleLoggingOff}
                                    className="w-full py-4 px-6 rounded-2xl bg-[var(--foreground)] text-[var(--background)] font-black text-xs uppercase tracking-widest hover:scale-[1.02] transition-all active:scale-95 shadow-lg"
                                >
                                    Clear Session
                                </button>
                                <a
                                    href="/login"
                                    className="block text-[11px] font-bold text-[var(--muted)] hover:text-[var(--accent)] transition-colors opacity-50"
                                >
                                    Login
                                </a>
                            </div>
                        ) : (
                            <div className="p-4 flex flex-col items-center gap-4">
                                <div className="w-12 h-12 border-4 border-[var(--accent)]/10 border-t-[var(--accent)] rounded-full animate-spin" />
                                <p className="text-xs font-bold text-[var(--muted)] uppercase tracking-widest animate-pulse">Re-initializing...</p>
                            </div>
                        )}
                    </motion.div>

                    {/* FOOTER */}
                    <div className="mt-8 flex items-center justify-center gap-4 opacity-30">
                        <FiShield size={14} className="text-[var(--muted)]" />
                        <span className="text-[9px] font-black uppercase tracking-[0.4em] text-[var(--muted)]">Secure Isolated Environment</span>
                    </div>
                </div>
            </motion.div>
        </AnimatePresence>
    );
}
