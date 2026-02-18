import { JSX } from "react";
import {
  FiShoppingBag,
  FiUsers,
  FiDollarSign,
  FiActivity,
} from "react-icons/fi";
import { motion } from "framer-motion";

interface DashboardCardProps {
  tab: {
    key: string;
    label: string;
    label_alt?: string;
    value: string | number;
  };
  activeTab: string;
  onClick: () => void;
}

/* ================= ICON MAP ================= */
const ICON_MAP: Record<string, JSX.Element> = {
  order: <FiShoppingBag />,
  orders: <FiShoppingBag />,
  support: <FiActivity />,
  query: <FiActivity />,
  wallet: <FiDollarSign />,
  account: <FiUsers />,
  users: <FiUsers />,
  revenue: <FiDollarSign />,
  activity: <FiActivity />,
};

export default function DashboardCard({
  tab,
  activeTab,
  onClick,
}: DashboardCardProps) {
  const isActive = activeTab === tab.key;

  return (
    <motion.div
      whileHover={{ y: -4, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      role="button"
      tabIndex={0}
      onClick={onClick}
      onKeyDown={(e) => e.key === "Enter" && onClick()}
      className={`group relative p-4 md:p-5 rounded-2xl cursor-pointer border
                  transition-all duration-300
                  shadow-sm hover:shadow-xl
        ${isActive
          ? "border-[var(--accent)] bg-[var(--card)] shadow-[var(--accent)]/10"
          : "border-[var(--border)] bg-[var(--card)]/40 hover:bg-[var(--card)] hover:border-[var(--accent)]/30"
        }`}
    >
      {/* GLOW EFFECT FOR ACTIVE */}
      {isActive && (
        <div className="absolute inset-0 bg-[var(--accent)]/5 rounded-2xl blur-xl -z-10" />
      )}

      {/* ================= HEADER ================= */}
      <div className="flex items-center justify-between">
        <div className="flex flex-col">
          <p className="text-[10px] md:text-xs font-bold uppercase tracking-wider text-[var(--muted)]">
            {tab.label_alt || tab.label}
          </p>
          <h2 className={`text-lg md:text-xl font-bold mt-1 tracking-tight transition-colors
            ${isActive ? "text-[var(--foreground)]" : "text-[var(--foreground)]/80 group-hover:text-[var(--foreground)]"}`}>
            {tab.value}
          </h2>
        </div>

        <div
          className={`p-2.5 rounded-xl text-xl transition-all duration-300
            ${isActive
              ? "bg-[var(--accent)] text-white shadow-lg shadow-[var(--accent)]/20"
              : "bg-black/5 text-[var(--muted)] group-hover:bg-[var(--accent)]/10 group-hover:text-[var(--accent)]"
            }`}
        >
          {ICON_MAP[tab.key] || <FiActivity />}
        </div>
      </div>

      {/* ================= ACTIVE INDICATOR ================= */}
      <div className="mt-4 flex items-center gap-1.5">
        <div className={`h-1 rounded-full transition-all duration-500
          ${isActive ? "w-10 bg-[var(--accent)]" : "w-4 bg-[var(--border)] group-hover:w-8 group-hover:bg-[var(--accent)]/30"}`}
        />
        {isActive && (
          <motion.span
            initial={{ opacity: 0, x: -5 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-[10px] font-bold text-[var(--accent)] uppercase"
          >
            Active
          </motion.span>
        )}
      </div>
    </motion.div>
  );
}
