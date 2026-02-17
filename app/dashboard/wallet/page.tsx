"use client";

import WalletTab from "../../../components/Dashboard/WalletTab";
import { useDashboard } from "../../../components/Dashboard/DashboardContext";

export default function WalletPage() {
    const { walletBalance, setWalletBalance } = useDashboard();
    return (
        <WalletTab
            walletBalance={walletBalance}
            setWalletBalance={setWalletBalance}
        />
    );
}
