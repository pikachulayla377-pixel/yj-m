"use client";

import { useState } from "react";
import {
  FiChevronDown,
  FiCalendar,
  FiUser,
  FiGrid,
  FiCreditCard,
  FiPackage,
  FiHash,
  FiShare2,
  FiCopy,
  FiX,
  FiCheckCircle,
  FiAlertCircle,
  FiClock,
} from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";

/* ================= TYPES ================= */

export type OrderType = {
  orderId: string;
  gameSlug: string;
  itemName: string;
  playerId: string;
  zoneId: string;
  paymentMethod: string;
  price: number;
  status: string;
  topupStatus?: string;
  createdAt: string;
};

/* ================= GAME NAME ================= */

const getGameName = (slug: string) => {
  const s = slug.toLowerCase();
  const mlbbSlugs = [
    "mobile-legends988", "mlbb-smallphp638", "mlbb-double332",
    "sgmy-mlbb893", "value-pass-ml948", "mlbb-russia953", "mlbb-indo42",
  ];
  if (mlbbSlugs.some((k) => s.includes(k))) return "Mobile Legends";
  if (s.includes("pubg-mobile138")) return "BGMI";
  return slug;
};

/* ================= MAIN ================= */

export default function OrderItem({ order }: { order: OrderType }) {
  const [open, setOpen] = useState(false);
  const [showReceipt, setShowReceipt] = useState(false);

  const status = (order.topupStatus || order.status).toLowerCase();

  const getStatusConfig = (s: string) => {
    switch (s) {
      case "success":
        return {
          icon: <FiCheckCircle />,
          colors: "from-green-500/20 to-green-500/5 text-green-400 border-green-500/30 shadow-green-500/5",
          accent: "bg-green-500",
          label: "Delivered"
        };
      case "failed":
        return {
          icon: <FiAlertCircle />,
          colors: "from-red-500/20 to-red-500/5 text-red-500 border-red-500/30 shadow-red-500/5",
          accent: "bg-red-500",
          label: "Failed"
        };
      default:
        return {
          icon: <FiClock />,
          colors: "from-amber-500/20 to-amber-500/5 text-amber-500 border-amber-500/30 shadow-amber-500/5",
          accent: "bg-amber-500",
          label: "Processing"
        };
    }
  };

  const config = getStatusConfig(status);

  return (
    <>
      <div
        className={`group relative overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--card)]/50 backdrop-blur-md transition-all duration-300 hover:shadow-xl hover:shadow-black/20 ${open ? 'ring-1 ring-[var(--accent)]/30' : ''}`}
      >
        {/* Status Indicator Bar */}
        <div className={`absolute left-0 top-0 bottom-0 w-1 ${config.accent}`} />

        {/* HEADER AREA */}
        <div className="p-4 md:p-5">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className={`flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border shadow-sm ${config.colors}`}>
                  {config.icon}
                  {config.label}
                </span>
                <span className="text-[10px] font-mono text-[var(--muted)] bg-[var(--muted-bg)] px-2 py-0.5 rounded-md border border-[var(--border)] flex items-center gap-1">
                  <FiHash size={10} /> {order.orderId}
                </span>
              </div>
              <h3 className="font-bold text-lg leading-tight mt-1">{order.itemName}</h3>
              <div className="flex items-center gap-3 text-xs text-[var(--muted)]">
                <span className="flex items-center gap-1"><FiCalendar size={12} /> {new Date(order.createdAt).toLocaleDateString()}</span>
                <span className="flex items-center gap-1"><FiGrid size={12} /> {getGameName(order.gameSlug)}</span>
              </div>
            </div>

            <div className="flex items-center justify-between md:flex-col md:items-end gap-2">
              <div className="text-xl font-black text-[var(--foreground)]">₹{order.price}</div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setShowReceipt(true)}
                  className="p-2.5 rounded-xl border border-[var(--border)] bg-[var(--card)] text-[var(--muted)] hover:text-[var(--accent)] hover:border-[var(--accent)]/50 transition-all active:scale-90"
                  title="View Receipt"
                >
                  <FiShare2 size={16} />
                </button>
                <button
                  onClick={() => setOpen(!open)}
                  className={`p-2.5 rounded-xl border border-[var(--border)] transition-all active:scale-90 ${open ? 'bg-[var(--accent)] text-white border-[var(--accent)]' : 'bg-[var(--card)] text-[var(--muted)] hover:bg-[var(--muted-bg)]'}`}
                >
                  <FiChevronDown className={`transition-transform duration-300 ${open ? "rotate-180" : ""}`} />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* EXPANDED SECTION */}
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="overflow-hidden"
            >
              <div className="px-5 pb-5 pt-2 border-t border-[var(--border)]">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                  <div className="space-y-3">
                    <DetailItem label="Player ID" value={order.playerId} icon={<FiUser />} mono />
                    <DetailItem label="Zone ID" value={order.zoneId} icon={<FiGrid />} mono />
                    <DetailItem label="Payment Method" value={order.paymentMethod.toUpperCase()} icon={<FiCreditCard />} />
                  </div>
                  <div className="bg-[var(--background)]/50 rounded-xl p-4 border border-[var(--border)] flex flex-col justify-center">
                    <p className="text-[10px] uppercase font-bold text-[var(--muted)] tracking-widest mb-1 flex items-center gap-1.5">
                      <FiPackage size={12} /> Package Details
                    </p>
                    <p className="font-semibold text-sm">{order.itemName}</p>
                    <p className="text-[10px] text-[var(--muted)] mt-2 italic">Automatically delivered to your game account</p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {showReceipt && (
          <ReceiptModal order={order} onClose={() => setShowReceipt(false)} />
        )}
      </AnimatePresence>
    </>
  );
}

/* ================= RECEIPT MODAL ================= */

function ReceiptModal({
  order,
  onClose,
}: {
  order: OrderType;
  onClose: () => void;
}) {
  const receiptText = `
YUJI TOPUP RECEIPT
------------------
Order ID   : ${order.orderId}
Game      : ${getGameName(order.gameSlug)}
Item      : ${order.itemName}
Price     : ₹${order.price}
Status    : ${order.status.toUpperCase()}
Date      : ${new Date(order.createdAt).toLocaleString()}
------------------
Player ID  : ${order.playerId}
Zone ID    : ${order.zoneId}
------------------
Thank you for choosing Yuji!
`.trim();

  const handleCopy = async () => {
    await navigator.clipboard.writeText(receiptText);
    // You could add a toast here
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
      />
      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 20 }}
        className="relative w-full max-w-sm bg-[var(--card)] border border-[var(--border)] rounded-3xl overflow-hidden shadow-2xl"
      >
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-black tracking-tight flex items-center gap-2">
              <span className="w-8 h-8 rounded-lg bg-[var(--accent)] flex items-center justify-center text-white">
                <FiShare2 size={16} />
              </span>
              Order Receipt
            </h2>
            <button onClick={onClose} className="p-2 rounded-xl bg-[var(--muted-bg)] text-[var(--muted)] hover:text-white transition-colors">
              <FiX size={20} />
            </button>
          </div>

          <div className="relative bg-[var(--background)] border border-[var(--border)] rounded-2xl p-5 mb-6 font-mono text-[11px] leading-relaxed shadow-inner">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center gap-1">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="w-2 h-4 bg-[var(--card)] rounded-full" />
              ))}
            </div>
            <pre className="whitespace-pre-wrap brightness-110">{receiptText}</pre>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={handleCopy}
              className="flex items-center justify-center gap-2 py-3 rounded-2xl border border-[var(--border)] font-bold text-sm bg-[var(--card)] hover:bg-[var(--muted-bg)] transition-all active:scale-95"
            >
              <FiCopy /> Copy Text
            </button>
            <button
              onClick={() => {
                if (navigator.share) {
                  navigator.share({ title: "Order Receipt", text: receiptText });
                } else {
                  handleCopy();
                }
              }}
              className="flex items-center justify-center gap-2 py-3 rounded-2xl bg-[var(--accent)] text-white font-bold text-sm hover:opacity-90 shadow-lg shadow-[var(--accent)]/30 transition-all active:scale-95"
            >
              <FiShare2 /> Share
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

/* ================= HELPERS ================= */

function DetailItem({
  icon,
  label,
  value,
  mono,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  mono?: boolean;
}) {
  return (
    <div className="flex flex-col gap-1 p-3 rounded-xl bg-[var(--background)]/40 border border-[var(--border)] transition-colors hover:bg-[var(--background)]/60">
      <div className="flex items-center gap-1.5 text-[var(--muted)] text-[10px] font-bold uppercase tracking-widest">
        {icon}
        <span>{label}</span>
      </div>
      <span className={`text-sm ${mono ? "font-mono" : "font-medium"} truncate`}>
        {value}
      </span>
    </div>
  );
}
