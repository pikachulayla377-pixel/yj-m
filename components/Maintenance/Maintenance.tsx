"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiTool, FiAlertCircle, FiShield, FiLogOut, FiActivity } from "react-icons/fi";

export default function Maintenance() {
    const [show, setShow] = useState(false);
    const [isLoggingOut, setIsLoggingOut] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => setShow(true), 500);
        return () => clearTimeout(timer);
    }, []);

    const handleLoggingOff = () => {
        setIsLoggingOut(true);

        const keysToRemove = ["token", "userName", "email", "userId", "phone", "pending_topup_order", "avatar"];
        keysToRemove.forEach(key => localStorage.removeItem(key));
        localStorage.removeItem("mlbb_verified_players");

        setTimeout(() => {
            window.location.href = "/";
        }, 2500);
    };

    // Digital rain particles
    const rainDrops = Array.from({ length: 30 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        delay: Math.random() * 3,
        duration: 2 + Math.random() * 2,
    }));

    // Hexagon positions
    const hexagons = Array.from({ length: 8 }, (_, i) => ({
        id: i,
        x: (Math.random() - 0.5) * 200,
        y: (Math.random() - 0.5) * 200,
        scale: 0.5 + Math.random() * 0.5,
        delay: Math.random() * 2,
    }));

    return (
        <AnimatePresence>
            {show && (
                <div className="fixed inset-0 z-[100000] flex items-center justify-center p-4 overflow-hidden">
                    {/* Dark Tech Background */}
                    <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
                        {/* Hexagonal Pattern Overlay */}
                        <div className="absolute inset-0 opacity-[0.03]" style={{
                            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 0l25.98 15v30L30 60 4.02 45V15z' fill='none' stroke='%2306b6d4' stroke-width='1'/%3E%3C/svg%3E")`,
                            backgroundSize: '60px 60px'
                        }} />

                        {/* Scanning Lines */}
                        <motion.div
                            className="absolute inset-0 opacity-20"
                            style={{
                                backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(6, 182, 212, 0.03) 2px, rgba(6, 182, 212, 0.03) 4px)',
                            }}
                            animate={{ y: [0, 20] }}
                            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                        />
                    </div>

                    {/* Digital Rain Effect */}
                    {rainDrops.map((drop) => (
                        <motion.div
                            key={drop.id}
                            className="absolute w-[2px] h-12 bg-gradient-to-b from-cyan-400/0 via-cyan-400/50 to-cyan-400/0"
                            style={{ left: `${drop.x}%`, top: -50 }}
                            animate={{ y: ["0vh", "110vh"] }}
                            transition={{
                                duration: drop.duration,
                                repeat: Infinity,
                                delay: drop.delay,
                                ease: "linear",
                            }}
                        />
                    ))}

                    {/* Floating Hexagons */}
                    {hexagons.map((hex) => (
                        <motion.div
                            key={hex.id}
                            className="absolute w-24 h-24 border border-cyan-500/10"
                            style={{
                                left: '50%',
                                top: '50%',
                                clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
                            }}
                            animate={{
                                x: [hex.x, hex.x + 20, hex.x],
                                y: [hex.y, hex.y - 30, hex.y],
                                rotate: [0, 180, 360],
                                opacity: [0.1, 0.3, 0.1],
                            }}
                            transition={{
                                duration: 8,
                                repeat: Infinity,
                                delay: hex.delay,
                                ease: "easeInOut",
                            }}
                        />
                    ))}

                    {/* Gradient Orbs */}
                    <motion.div
                        animate={{
                            scale: [1, 1.3, 1],
                            opacity: [0.15, 0.25, 0.15],
                        }}
                        transition={{ duration: 5, repeat: Infinity }}
                        className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-cyan-500/20 rounded-full blur-[100px]"
                    />
                    <motion.div
                        animate={{
                            scale: [1.2, 1, 1.2],
                            opacity: [0.1, 0.2, 0.1],
                        }}
                        transition={{ duration: 6, repeat: Infinity }}
                        className="absolute bottom-1/4 left-1/4 w-[500px] h-[500px] bg-orange-500/20 rounded-full blur-[100px]"
                    />

                    {/* Main Card */}
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0, y: 20 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.9, opacity: 0, y: 20 }}
                        transition={{ type: "spring", damping: 25, stiffness: 200 }}
                        className="relative w-full max-w-[520px]"
                    >
                        {/* Outer Glow */}
                        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 via-orange-500/20 to-cyan-500/20 blur-2xl rounded-3xl" />

                        {/* Card Container */}
                        <div className="relative bg-slate-900/90 backdrop-blur-xl rounded-3xl border border-cyan-500/20 shadow-2xl overflow-hidden">

                            {/* Top Border Accent */}
                            <motion.div
                                className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent"
                                animate={{ opacity: [0.3, 1, 0.3] }}
                                transition={{ duration: 2, repeat: Infinity }}
                            />

                            {/* Corner Accents */}
                            <div className="absolute top-0 left-0 w-20 h-20 border-l-2 border-t-2 border-cyan-400/30 rounded-tl-3xl" />
                            <div className="absolute top-0 right-0 w-20 h-20 border-r-2 border-t-2 border-orange-400/30 rounded-tr-3xl" />
                            <div className="absolute bottom-0 left-0 w-20 h-20 border-l-2 border-b-2 border-orange-400/30 rounded-bl-3xl" />
                            <div className="absolute bottom-0 right-0 w-20 h-20 border-r-2 border-b-2 border-cyan-400/30 rounded-br-3xl" />

                            <div className="relative z-10 p-12 text-center">

                                {/* Icon Section */}
                                <div className="relative mx-auto w-40 h-40 mb-10">
                                    {/* Hexagon Background */}
                                    <motion.div
                                        className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-orange-500/10 border-2 border-cyan-400/30"
                                        style={{
                                            clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
                                        }}
                                        animate={{ rotate: [0, 360] }}
                                        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                                    />

                                    {/* Inner Hexagon */}
                                    <motion.div
                                        className="absolute inset-4 bg-slate-800/50 border border-cyan-400/20"
                                        style={{
                                            clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
                                        }}
                                        animate={{ rotate: [360, 0] }}
                                        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                                    />

                                    {/* Center Icon */}
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <motion.div
                                            animate={{
                                                scale: [1, 1.1, 1],
                                            }}
                                            transition={{ duration: 2, repeat: Infinity }}
                                        >
                                            <FiTool className="text-6xl text-cyan-400 drop-shadow-[0_0_30px_rgba(6,182,212,0.6)]" />
                                        </motion.div>
                                    </div>

                                    {/* Orbiting Shields */}
                                    <motion.div
                                        animate={{ rotate: 360 }}
                                        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                                        className="absolute inset-0"
                                    >
                                        <FiShield className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-2 text-orange-400 text-2xl drop-shadow-[0_0_10px_rgba(251,146,60,0.8)]" />
                                    </motion.div>
                                    <motion.div
                                        animate={{ rotate: -360 }}
                                        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                                        className="absolute inset-0"
                                    >
                                        <FiActivity className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-2 text-cyan-400 text-2xl drop-shadow-[0_0_10px_rgba(6,182,212,0.8)]" />
                                    </motion.div>
                                </div>

                                {/* Title */}
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.2 }}
                                >
                                    <h1 className="text-5xl md:text-6xl font-black uppercase mb-3 tracking-tight">
                                        <span className="bg-gradient-to-r from-cyan-400 via-cyan-300 to-orange-400 bg-clip-text text-transparent drop-shadow-[0_0_30px_rgba(6,182,212,0.3)]">
                                            System
                                        </span>
                                        <br />
                                        <span className="text-white drop-shadow-[0_0_20px_rgba(255,255,255,0.1)]">
                                            Upgrade
                                        </span>
                                    </h1>
                                </motion.div>

                                {/* Status Badge */}
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: 0.3 }}
                                    className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-gradient-to-r from-cyan-500/10 to-orange-500/10 border border-cyan-400/30 mb-8"
                                >
                                    <motion.div
                                        animate={{
                                            scale: [1, 1.3, 1],
                                            rotate: [0, 180, 360]
                                        }}
                                        transition={{ duration: 2, repeat: Infinity }}
                                    >
                                        <FiAlertCircle className="text-cyan-400 text-base" />
                                    </motion.div>
                                    <span className="text-xs font-bold uppercase tracking-[0.2em] text-cyan-300">
                                        Maintenance Active
                                    </span>
                                    <motion.div
                                        animate={{ opacity: [0.3, 1, 0.3] }}
                                        transition={{ duration: 1.5, repeat: Infinity }}
                                        className="w-2 h-2 bg-orange-400 rounded-full shadow-[0_0_10px_rgba(251,146,60,0.8)]"
                                    />
                                </motion.div>

                                {/* Description */}
                                <motion.p
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.4 }}
                                    className="text-slate-400 text-base leading-relaxed mb-10 max-w-md mx-auto"
                                >
                                    Our systems are currently undergoing scheduled maintenance.
                                    <br />
                                    <span className="text-cyan-300 font-semibold">Enhanced features coming soon!</span>
                                </motion.p>

                                {/* Tech Divider */}
                                <div className="relative h-px w-48 mx-auto mb-10">
                                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent" />
                                    <motion.div
                                        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-cyan-400 rounded-full"
                                        animate={{
                                            boxShadow: [
                                                "0 0 10px rgba(6,182,212,0.5)",
                                                "0 0 20px rgba(6,182,212,1)",
                                                "0 0 10px rgba(6,182,212,0.5)",
                                            ],
                                        }}
                                        transition={{ duration: 2, repeat: Infinity }}
                                    />
                                </div>

                                {/* Action Button */}
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.5 }}
                                    className="w-full max-w-sm mx-auto"
                                >
                                    {!isLoggingOut ? (
                                        <motion.button
                                            onClick={handleLoggingOff}
                                            whileHover={{ scale: 1.03, y: -2 }}
                                            whileTap={{ scale: 0.97 }}
                                            className="relative w-full group overflow-hidden"
                                        >
                                            {/* Button Glow */}
                                            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-orange-500 rounded-2xl blur-xl opacity-40 group-hover:opacity-60 transition-opacity" />

                                            {/* Animated Border */}
                                            <motion.div
                                                className="absolute inset-0 rounded-2xl"
                                                style={{
                                                    background: 'linear-gradient(90deg, transparent, rgba(6,182,212,0.5), transparent)',
                                                }}
                                                animate={{ x: ['-100%', '100%'] }}
                                                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                                            />

                                            {/* Button Content */}
                                            <div className="relative flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-cyan-600 to-orange-600 rounded-2xl border border-cyan-400/30 shadow-lg">
                                                <FiLogOut className="text-xl group-hover:rotate-12 transition-transform" />
                                                <span className="font-bold uppercase tracking-wider text-base">
                                                    Clear Session
                                                </span>
                                            </div>
                                        </motion.button>
                                    ) : (
                                        <div className="space-y-5">
                                            {/* Loading State */}
                                            <div className="flex items-center justify-center gap-4 py-4">
                                                <motion.div
                                                    className="relative w-6 h-6"
                                                >
                                                    <motion.div
                                                        animate={{ rotate: 360 }}
                                                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                                        className="w-6 h-6 border-2 border-cyan-400 border-t-transparent rounded-full"
                                                    />
                                                    <motion.div
                                                        animate={{ rotate: -360 }}
                                                        transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                                                        className="absolute inset-0 w-6 h-6 border-2 border-orange-400 border-b-transparent rounded-full"
                                                    />
                                                </motion.div>
                                                <span className="font-bold uppercase tracking-wider text-base text-cyan-300">
                                                    Clearing Session...
                                                </span>
                                            </div>

                                            {/* Progress Bar */}
                                            <div className="relative h-2 bg-slate-800/50 rounded-full overflow-hidden border border-cyan-400/20">
                                                <motion.div
                                                    initial={{ width: 0 }}
                                                    animate={{ width: "100%" }}
                                                    transition={{ duration: 2.3, ease: "easeInOut" }}
                                                    className="absolute inset-y-0 left-0 bg-gradient-to-r from-cyan-500 via-orange-500 to-cyan-500 rounded-full shadow-[0_0_20px_rgba(6,182,212,0.6)]"
                                                />
                                                <motion.div
                                                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                                                    animate={{ x: ['-100%', '100%'] }}
                                                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                                />
                                            </div>
                                        </div>
                                    )}
                                </motion.div>

                                {/* Footer */}
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.6 }}
                                    className="mt-12 flex items-center justify-center gap-3"
                                >
                                    <motion.div
                                        animate={{ opacity: [0.3, 0.7, 0.3] }}
                                        transition={{ duration: 3, repeat: Infinity }}
                                        className="text-[10px] font-bold uppercase tracking-[0.3em] text-slate-600"
                                    >
                                        Yuji • 2026
                                    </motion.div>
                                    <motion.div
                                        animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
                                        transition={{ duration: 2, repeat: Infinity }}
                                        className="w-1 h-1 bg-cyan-400 rounded-full"
                                    />
                                </motion.div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
