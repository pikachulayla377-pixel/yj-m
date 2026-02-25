"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

interface UserDetails {
    name: string;
    email: string;
    phone: string;
}

interface DashboardContextType {
    userDetails: UserDetails;
    walletBalance: number;
    setWalletBalance: React.Dispatch<React.SetStateAction<number>>;
    loading: boolean;
}

const DashboardContext = createContext<DashboardContextType | undefined>(undefined);

export function DashboardProvider({ children }: { children: React.ReactNode }) {
    const [walletBalance, setWalletBalance] = useState(0);
    const [loading, setLoading] = useState(true);
    const [userDetails, setUserDetails] = useState({
        name: "",
        email: "",
        phone: "",
    });

    const token =
        typeof window !== "undefined"
            ? localStorage.getItem("token")
            : null;

    useEffect(() => {
        if (!token) {
            setLoading(false);
            return;
        }

        fetch("/api/auth/me", {
            headers: { Authorization: `Bearer ${token}` },
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.success) {
                    setUserDetails({
                        name: data.user.name,
                        email: data.user.email,
                        phone: data.user.phone,
                    });
                    setWalletBalance(data.user.wallet || 0);
                }
            })
            .finally(() => setLoading(false));
    }, [token]);

    return (
        <DashboardContext.Provider value={{ userDetails, walletBalance, setWalletBalance, loading }}>
            {children}
        </DashboardContext.Provider>
    );
}

export function useDashboard() {
    const context = useContext(DashboardContext);
    if (context === undefined) {
        throw new Error("useDashboard must be used within a DashboardProvider");
    }
    return context;
}
