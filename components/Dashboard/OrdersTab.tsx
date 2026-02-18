"use client";

import { useEffect, useState } from "react";
import {
  FiSearch,
  FiChevronLeft,
  FiChevronRight,
  FiFilter,
  FiRefreshCw,
  FiShoppingBag,
} from "react-icons/fi";
import OrderItem, { OrderType } from "./OrderItem";
import { motion, AnimatePresence } from "framer-motion";

export default function OrdersTab() {
  const [orders, setOrders] = useState<OrderType[]>([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(true);

  const totalPages = Math.ceil(totalCount / limit);

  const token =
    typeof window !== "undefined"
      ? sessionStorage.getItem("token")
      : null;

  /* ================= LOAD ORDERS ================= */
  const fetchOrders = async () => {
    if (!token) return;
    setLoading(true);

    try {
      const res = await fetch("/api/order/user", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          page,
          limit,
          search,
          status: statusFilter === "all" ? undefined : statusFilter
        }),
      });
      const data = await res.json();
      if (data.success) {
        setOrders(data.orders || []);
        setTotalCount(data.totalCount || 0);
      }
    } catch (error) {
      console.error("Failed to fetch orders:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [token, page, search, statusFilter]);

  /* ================= RESET PAGE ON SEARCH/FILTER ================= */
  useEffect(() => {
    setPage(1);
  }, [search, statusFilter]);

  const getPageNumbers = () => {
    const pages: number[] = [];
    const start = Math.max(1, page - 1);
    const end = Math.min(totalPages, page + 1);
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    return pages;
  };

  const statusOptions = [
    { label: "All", value: "all" },
    { label: "Success", value: "success" },
    { label: "Pending", value: "pending" },
    { label: "Failed", value: "failed" },
  ];

  return (
    <div className="space-y-6">
      {/* HEADER SECTION */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 px-2">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-[var(--accent)]/10 flex items-center justify-center text-[var(--accent)] shadow-sm border border-[var(--accent)]/10">
            <FiShoppingBag size={28} />
          </div>
          <div>
            <h2 className="text-3xl font-black tracking-tight">Order Archive</h2>
            <p className="text-sm text-[var(--muted)] font-medium mt-0.5">
              {loading ? "Syncing history..." : `Found ${totalCount} transactions`}
            </p>
          </div>
        </div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={fetchOrders}
          disabled={loading}
          className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-[var(--card)] border border-[var(--border)]
                     text-[var(--foreground)] font-bold text-sm shadow-sm hover:border-[var(--accent)]/50 transition-all active:scale-95 group"
        >
          <FiRefreshCw className={`transition-transform duration-500 ${loading ? "animate-spin" : "group-hover:rotate-180"}`} />
          <span>Refresh Feed</span>
        </motion.button>
      </div>

      {/* FILTERS & SEARCH */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* SEARCH */}
        <div className="lg:col-span-8 relative group">
          <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--muted)] group-focus-within:text-[var(--accent)] transition-colors" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by Order ID or Item..."
            className="w-full pl-12 pr-4 py-3 rounded-2xl
                       border border-[var(--border)]
                       bg-[var(--background)]/50 backdrop-blur-sm
                       focus:ring-2 focus:ring-[var(--accent)]/50
                       focus:border-[var(--accent)]
                       outline-none transition-all shadow-sm"
          />
        </div>

        {/* STATUS FILTER */}
        <div className="lg:col-span-4 flex gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-hide">
          {statusOptions.map((opt) => (
            <button
              key={opt.value}
              onClick={() => setStatusFilter(opt.value)}
              className={`px-4 py-2 rounded-xl border text-sm font-medium whitespace-nowrap transition-all
                ${statusFilter === opt.value
                  ? "bg-[var(--accent)] text-white border-[var(--accent)] shadow-md shadow-[var(--accent)]/20"
                  : "border-[var(--border)] bg-[var(--card)] text-[var(--muted)] hover:text-[var(--foreground)] hover:border-[var(--muted)]"
                }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      {/* ORDERS LIST */}
      <div className="relative min-h-[300px]">
        {loading && orders.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 animate-pulse">
            <div className="w-12 h-12 rounded-full border-4 border-[var(--accent)]/20 border-t-[var(--accent)] animate-spin mb-4" />
            <p className="text-[var(--muted)] font-medium">Loading your orders...</p>
          </div>
        ) : orders.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-20 rounded-3xl border border-dashed border-[var(--border)] bg-[var(--card)]/30 backdrop-blur-sm"
          >
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-[var(--muted-bg)] text-[var(--muted)] mb-4">
              <FiFilter size={32} />
            </div>
            <h3 className="text-lg font-bold">No orders found</h3>
            <p className="text-[var(--muted)] text-sm mt-1">Try adjusting your filters or search query</p>
            <button
              onClick={() => { setSearch(""); setStatusFilter("all"); }}
              className="mt-6 text-[var(--accent)] font-semibold hover:underline"
            >
              Clear all filters
            </button>
          </motion.div>
        ) : (
          <div className="space-y-4">
            <AnimatePresence mode="popLayout">
              {orders.map((order, idx) => (
                <motion.div
                  key={order.orderId}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ delay: idx * 0.05, duration: 0.3 }}
                >
                  <OrderItem order={order} />
                </motion.div>
              ))}
            </AnimatePresence>

            {/* PAGINATION */}
            {totalPages > 1 && (
              <div className="mt-10 flex flex-col md:flex-row justify-between items-center gap-4 py-6">
                <p className="text-sm text-[var(--muted)]">
                  Showing <span className="text-[var(--foreground)] font-medium">{(page - 1) * limit + 1}</span> to <span className="text-[var(--foreground)] font-medium">{Math.min(page * limit, totalCount)}</span> of <span className="text-[var(--foreground)] font-medium">{totalCount}</span> results
                </p>

                <div className="flex items-center gap-1.5">
                  <button
                    disabled={page === 1}
                    onClick={() => setPage((p) => p - 1)}
                    className="p-2.5 rounded-xl border border-[var(--border)] bg-[var(--card)]
                               disabled:opacity-40 disabled:scale-95 hover:bg-[var(--accent)]/10 hover:text-[var(--accent)] transition-all"
                  >
                    <FiChevronLeft size={20} />
                  </button>

                  <div className="flex items-center gap-1">
                    {getPageNumbers().map((p) => (
                      <button
                        key={p}
                        onClick={() => setPage(p)}
                        className={`min-w-[42px] h-[42px] px-2 rounded-xl text-sm font-bold border transition-all
                          ${p === page
                            ? "bg-[var(--accent)] text-white border-[var(--accent)] shadow-lg shadow-[var(--accent)]/20"
                            : "border-[var(--border)] bg-[var(--card)] text-[var(--muted)] hover:text-[var(--foreground)] hover:border-[var(--muted)]"
                          }`}
                      >
                        {p}
                      </button>
                    ))}
                  </div>

                  <button
                    disabled={page >= totalPages}
                    onClick={() => setPage((p) => p + 1)}
                    className="p-2.5 rounded-xl border border-[var(--border)] bg-[var(--card)]
                               disabled:opacity-40 disabled:scale-95 hover:bg-[var(--accent)]/10 hover:text-[var(--accent)] transition-all"
                  >
                    <FiChevronRight size={20} />
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
