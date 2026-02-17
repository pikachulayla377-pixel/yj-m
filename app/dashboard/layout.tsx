"use client";

import { usePathname, useRouter } from "next/navigation";
import AuthGuard from "../../components/AuthGuard";
import DashboardCard from "../../components/Dashboard/DashboardCard";
import { DashboardProvider, useDashboard } from "../../components/Dashboard/DashboardContext";

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
        { key: "order", label: "Orders", value: "View", href: "/dashboard/order" },
        { key: "support", label: "Support", value: "Help", href: "/dashboard/support" },
        // { key: "wallet", label: "Wallet", value: `₹${walletBalance}`, href: "/dashboard/wallet" },
        // { key: "account", label: "Account", label_alt: "Profile", value: "Manage", href: "/dashboard/account" },
    ];

    // Map support back to query for the icon logic if necessary, 
    // but let's just update DashboardCard or handle it here.
    // Actually, I'll pass the correct key to DashboardCard.

    return (
        <section className="min-h-screen px-5 py-8 bg-[var(--background)] text-[var(--foreground)]">
            {/* HEADER */}
            <div className="max-w-5xl mx-auto mb-8 flex flex-col md:flex-row gap-5 md:items-center md:justify-between">
                <div>
                    <h1 className="text-2xl md:text-3xl font-bold">
                        Welcome back, {userDetails.name || "Player"} 👋
                    </h1>
                    <p className="text-sm text-[var(--muted)] mt-1">
                        Track orders, manage wallet & account
                    </p>
                </div>
            </div>

            {/* CARDS */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-5 max-w-5xl mx-auto mb-10">
                {tabCards.map((tab) => (
                    <DashboardCard
                        key={tab.key}
                        tab={tab}
                        activeTab={activeTab}
                        onClick={() => router.push(tab.href)}
                    />
                ))}
            </div>

            {/* CONTENT */}
            <div className="max-w-4xl mx-auto bg-[var(--card)]
                      border border-[var(--border)]
                      rounded-2xl p-6 shadow-xl">
                {children}
            </div>
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
