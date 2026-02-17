"use client";

import AccountTab from "../../../components/Dashboard/AccountTab";
import { useDashboard } from "../../../components/Dashboard/DashboardContext";

export default function AccountPage() {
    const { userDetails } = useDashboard();
    return <AccountTab userDetails={userDetails} />;
}
