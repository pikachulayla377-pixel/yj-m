"use client";

import { usePathname, useRouter } from "next/navigation";
import AuthGuard from "../../components/AuthGuard";
import DashboardCard from "../../components/Dashboard/DashboardCard";
import { DashboardProvider, useDashboard } from "../../components/Dashboard/DashboardContext";
import { FiLogOut } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";

function DashboardLayoutContent({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const router = useRouter();
    const { userDetails, walletBalance } = useDashboard();

    // Map pathname to activeTab
    let activeTab = "order";
    if (pathname.includes("/dashboard/support")) activeTab = "support";
    else if (pathname.includes("/dashboard/wallet")) activeTab = "wallet";
    else if (pathname.includes("/dashboard/account")) activeTab = "account";
    else if (pathname.includes("/dashboard/order")) activeTab = "order";

    const tabCards = [
        { key: "order", label: "Orders", label_alt: "Order History", value: "Archive", href: "/dashboard/order" },
        // { key: "wallet", label: "Wallet", label_alt: "Balance", value: `₹${walletBalance}`, href: "/dashboard/wallet" },
        { key: "support", label: "Support", label_alt: "Assistance", value: "Help ", href: "/dashboard/support" },
        // { key: "account", label: "Account", label_alt: "Profile", value: "Settings", href: "/dashboard/account" },
    ];

    const handleLogout = () => {
        localStorage.clear();
        router.push("/login");
    };

    return (
        <section className="min-h-screen px-4 md:px-10 py-8 bg-[var(--background)] text-[var(--foreground)] selection:bg-[var(--accent)]/30">
            {/* HEADER */}
            <div className="max-w-6xl mx-auto mb-10 flex flex-col md:flex-row gap-6 md:items-center md:justify-between">
                <div>
                    <motion.h1
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="text-3xl md:text-4xl font-extrabold tracking-tight"
                    >
                        Welcome back, <span className="text-[var(--accent)]">{userDetails.name || "Player"}</span> 👋
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-[var(--muted)] mt-2 font-medium"
                    >
                        Your gaming hub for orders, wallet, and support.
                    </motion.p>
                </div>

                <motion.button
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleLogout}
                    className="flex items-center justify-center gap-2 px-6 py-3 rounded-2xl 
                             bg-[var(--card)] border border-[var(--border)] 
                             hover:border-red-500/50 hover:bg-red-500/5 transition-all
                             text-sm font-bold group"
                >
                    <FiLogOut className="text-[var(--muted)] group-hover:text-red-500 transition-colors" />
                    <span>Logout</span>
                </motion.button>
            </div>

            {/* CARDS GRID */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 max-w-6xl mx-auto mb-12">
                {tabCards.map((tab, idx) => (
                    <motion.div
                        key={tab.key}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.1 }}
                    >
                        <DashboardCard
                            tab={tab}
                            activeTab={activeTab}
                            onClick={() => router.push(tab.href)}
                        />
                    </motion.div>
                ))}
            </div>

            {/* CONTENT AREA */}
            <motion.div
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-5xl mx-auto bg-[var(--card)]/80 
                          backdrop-blur-md border border-[var(--border)]
                          rounded-[2.5rem] p-6 md:p-10 shadow-2xl relative overflow-hidden"
            >
                {/* Decorative Elements */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-[var(--accent)]/5 rounded-full blur-3xl -z-10 -mr-32 -mt-32" />
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-[var(--accent)]/5 rounded-full blur-3xl -z-10 -ml-32 -mb-32" />

                <AnimatePresence mode="wait">
                    <motion.div
                        key={pathname}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.3 }}
                    >
                        {children}
                    </motion.div>
                </AnimatePresence>
            </motion.div>
        </section>
    );
}

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    return (
        <AuthGuard>
            <DashboardProvider>
                <DashboardLayoutContent>{children}</DashboardLayoutContent>
            </DashboardProvider>
        </AuthGuard>
    );
}
