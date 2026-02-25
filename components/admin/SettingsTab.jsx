"use client";

import { useState, useEffect } from "react";
import {
    Settings,
    AlertCircle,
    ShieldAlert,
    RefreshCcw,
    Save,
    ShieldCheck,
    Zap,
    Power,
    Info
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function SettingsTab() {
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [settings, setSettings] = useState({ maintenanceMode: false });

    useEffect(() => {
        fetchSettings();
    }, []);

    const fetchSettings = async () => {
        try {
            setLoading(true);
            const token = localStorage.getItem("token");
            const res = await fetch("/api/admin/settings", {
                headers: { Authorization: `Bearer ${token}` },
            });
            const data = await res.json();
            if (data.success) {
                setSettings(data.settings);
            }
        } catch (err) {
            console.error("Failed to fetch settings", err);
        } finally {
            setLoading(false);
        }
    };

    const updateSettings = async (updates) => {
        try {
            setSaving(true);
            const token = localStorage.getItem("token");
            const res = await fetch("/api/admin/settings", {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(updates),
            });
            const data = await res.json();
            if (data.success) {
                setSettings(data.settings);
                // We can show a toast or a temporary success state instead of alert for better UX
            } else {
                alert(data.message || "Failed to update settings");
            }
        } catch (err) {
            console.error("Failed to update settings", err);
            alert("Error updating settings");
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center p-32 opacity-40">
                <RefreshCcw className="animate-spin text-[var(--accent)] mb-4" size={32} />
                <p className="text-[10px] font-bold uppercase tracking-[0.2em]">Synchronizing Systems</p>
            </div>
        );
    }

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-500">
            {/* HEADER */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 px-2">
                <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-2xl bg-[var(--accent)]/10 flex items-center justify-center text-[var(--accent)] shadow-sm border border-[var(--accent)]/10">
                        <Settings size={28} />
                    </div>
                    <div>
                        <h2 className="text-3xl font-black tracking-tight">System Core</h2>
                        <p className="text-sm text-[var(--muted)] font-medium mt-0.5">
                            Orchestrate global deployment status and operational parameters
                        </p>
                    </div>
                </div>

                <button
                    onClick={fetchSettings}
                    disabled={saving}
                    className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-[var(--card)] border border-[var(--border)]
                     text-[var(--foreground)] font-bold text-sm shadow-sm hover:border-[var(--accent)]/50 transition-all active:scale-95 group disabled:opacity-50"
                >
                    <RefreshCcw className={`transition-transform duration-500 ${loading ? "animate-spin" : "group-hover:rotate-180"}`} size={16} />
                    <span>Refresh State</span>
                </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                {/* SETTINGS CARDS AREA */}
                <div className="lg:col-span-8 space-y-6">

                    {/* MAINTENANCE MODE CARD */}
                    <div className={`
            relative overflow-hidden p-8 rounded-[2rem] border transition-all duration-500
            ${settings.maintenanceMode
                            ? "bg-amber-500/[0.03] border-amber-500/30 shadow-xl shadow-amber-500/5"
                            : "bg-[var(--card)] border-[var(--border)] hover:border-[var(--accent)]/30"}
          `}>
                        {/* Background Glow when active */}
                        {settings.maintenanceMode && (
                            <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/10 blur-[100px] pointer-events-none -mr-32 -mt-32" />
                        )}

                        <div className="relative z-10 space-y-8">
                            <div className="flex items-start justify-between gap-6">
                                <div className="flex gap-5">
                                    <div className={`
                    w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-500
                    ${settings.maintenanceMode ? "bg-amber-500 text-black" : "bg-[var(--foreground)]/[0.05] text-[var(--muted)]"}
                  `}>
                                        {settings.maintenanceMode ? <ShieldAlert size={28} /> : <ShieldCheck size={28} />}
                                    </div>
                                    <div className="space-y-1">
                                        <div className="flex items-center gap-3">
                                            <h3 className="text-xl font-bold">Maintenance Protocol</h3>
                                            <AnimatePresence>
                                                {settings.maintenanceMode && (
                                                    <motion.span
                                                        initial={{ opacity: 0, scale: 0.8 }}
                                                        animate={{ opacity: 1, scale: 1 }}
                                                        exit={{ opacity: 0, scale: 0.8 }}
                                                        className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/20 text-amber-500 text-[10px] uppercase tracking-widest font-black border border-amber-500/20 animate-pulse"
                                                    >
                                                        <Power size={10} /> Active
                                                    </motion.span>
                                                )}
                                            </AnimatePresence>
                                        </div>
                                        <p className="text-sm text-[var(--muted)] max-w-md leading-relaxed">
                                            Enable a global lockdown. All incoming regular traffic will be diverted to the upgrade screen.
                                            Only authorized entities (Owners) bypass this layer.
                                        </p>
                                    </div>
                                </div>

                                <button
                                    onClick={() => updateSettings({ maintenanceMode: !settings.maintenanceMode })}
                                    disabled={saving}
                                    className={`
                    relative w-16 h-8 rounded-full p-1 transition-all duration-300
                    ${settings.maintenanceMode ? "bg-amber-500" : "bg-slate-700"}
                    ${saving ? "opacity-30 cursor-not-allowed" : "cursor-pointer hover:scale-105 active:scale-95"}
                  `}
                                >
                                    <motion.div
                                        animate={{ x: settings.maintenanceMode ? 32 : 0 }}
                                        className="w-6 h-6 bg-white rounded-full shadow-lg flex items-center justify-center"
                                        transition={{ type: "spring", stiffness: 500, damping: 30 }}
                                    >
                                        {saving && <RefreshCcw size={12} className="animate-spin text-slate-400" />}
                                    </motion.div>
                                </button>
                            </div>

                            {/* Status Info Box */}
                            <div className={`
                p-5 rounded-2xl border flex items-start gap-4 transition-all duration-500
                ${settings.maintenanceMode
                                    ? "bg-amber-500/10 border-amber-500/20"
                                    : "bg-[var(--background)] border-[var(--border)]"}
              `}>
                                <div className={`${settings.maintenanceMode ? "text-amber-500" : "text-[var(--muted)]"} mt-0.5`}>
                                    <AlertCircle size={18} />
                                </div>
                                <div className="space-y-1">
                                    <p className="text-xs font-bold uppercase tracking-wider">Operational Context</p>
                                    <p className="text-xs text-[var(--muted)] leading-relaxed">
                                        {settings.maintenanceMode
                                            ? "The system is currently in isolated mode. Regular users see the System Upgrade screen. Dynamic operations (orders/wallet) are restricted."
                                            : "The system is in nominal state. All public endpoints and service objectives are accessible to authorized traffic."
                                        }
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* ADDITIONAL SETTINGS PLACEHOLDER */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="p-6 rounded-[2rem] border border-[var(--border)] bg-[var(--card)] opacity-50 group hover:opacity-100 transition-opacity">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="p-2 rounded-lg bg-[var(--foreground)]/[0.05]">
                                    <Zap size={18} className="text-yellow-500" />
                                </div>
                                <span className="text-xs font-bold uppercase text-[var(--muted)]">Performance Optimization</span>
                            </div>
                            <p className="text-[10px] text-[var(--muted)] mb-4">Aggressive caching and payload compression for rapid asset delivery.</p>
                            <div className="flex items-center gap-2">
                                <div className="w-full h-1 bg-[var(--border)] rounded-full overflow-hidden">
                                    <div className="w-[80%] h-full bg-yellow-500/40" />
                                </div>
                            </div>
                        </div>

                        <div className="p-6 rounded-[2rem] border border-[var(--border)] bg-[var(--card)] opacity-50 group hover:opacity-100 transition-opacity">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="p-2 rounded-lg bg-[var(--foreground)]/[0.05]">
                                    <Zap size={18} className="text-blue-500" />
                                </div>
                                <span className="text-xs font-bold uppercase text-[var(--muted)]">Automatic Backup</span>
                            </div>
                            <p className="text-[10px] text-[var(--muted)] mb-4">Real-time snapshots of administrative logs and transaction history.</p>
                            <div className="flex items-center gap-2">
                                <div className="w-full h-1 bg-[var(--border)] rounded-full overflow-hidden">
                                    <div className="w-[100%] h-full bg-blue-500/40" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* SIDEBAR / INFO */}
                <div className="lg:col-span-4 space-y-6">
                    <div className="p-8 rounded-[2rem] border border-[var(--border)] bg-[var(--card)] space-y-6 lg:sticky lg:top-6">
                        <div className="flex items-center gap-3 pb-4 border-b border-[var(--border)]">
                            <ShieldCheck size={18} className="text-[var(--accent)]" />
                            <h3 className="text-lg font-bold">Admin Privileges</h3>
                        </div>

                        <div className="space-y-4">
                            <p className="text-xs text-[var(--muted)] leading-relaxed">
                                As the system owner, your dashboard and administrative endpoints remain functional even when global maintenance protocols are active.
                            </p>

                            <div className="p-4 rounded-xl bg-[var(--background)] border border-[var(--border)] text-[10px] space-y-3">
                                <div className="flex justify-between">
                                    <span className="text-[var(--muted)] font-medium">Bypass Authorization:</span>
                                    <span className="text-emerald-500 font-bold uppercase">Active</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-[var(--muted)] font-medium">Registry Path:</span>
                                    <span className="text-[var(--foreground)] font-mono">/owner-panal</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-[var(--muted)] font-medium">Sync Latency:</span>
                                    <span className="text-[var(--foreground)] font-mono">~120ms</span>
                                </div>
                            </div>
                        </div>

                        <div className="pt-4 h-px bg-[var(--border)] w-full opacity-50" />

                        <div className="flex flex-col gap-3">
                            <div className="flex items-center gap-3 p-3 rounded-xl bg-blue-500/5 border border-blue-500/10">
                                <Info size={14} className="text-blue-500" />
                                <span className="text-[9px] font-bold text-blue-400 uppercase tracking-wider">Dynamic State: v2.4.0</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
