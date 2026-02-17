"use client";

import { useEffect, useState } from "react";
import {
  FaCheckCircle,
  FaTimesCircle,
  FaSpinner,
} from "react-icons/fa";

export default function TopupComplete() {
  const [status, setStatus] = useState("checking"); // checking | success | failed
  const [message, setMessage] = useState("Verifying payment...");

  useEffect(() => {
    const orderId = sessionStorage.getItem("pending_topup_order");

    if (!orderId) {
      setStatus("failed");
      setMessage("Order not found");
      return;
    }

    async function verify() {
      try {
        const token = sessionStorage.getItem("token");

        const res = await fetch("/api/order/verify-topup-payment", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          }, body: JSON.stringify({ orderId }),
        });

        const data = await res.json();

        if (data?.success) {
          setStatus("success");
          setMessage("Payment successful!");

          // cleanup
          sessionStorage.removeItem("pending_topup_order");
        } else {
          setStatus("failed");
          setMessage("Payment failed or still pending");
        }
      } catch (err) {
        console.error("Topup verification error:", err);
        setStatus("failed");
        setMessage("Unable to verify payment");
      }
    }

    verify();
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--background)] px-4">
      <div className="w-full max-w-md rounded-2xl border border-[var(--border)] bg-[var(--card)] shadow-lg p-8 text-center">

        {/* STATUS ICON */}
        <div className="flex justify-center mb-4">
          {status === "checking" && (
            <FaSpinner className="text-4xl animate-spin text-[var(--accent)]" />
          )}
          {status === "success" && (
            <FaCheckCircle className="text-5xl text-green-500" />
          )}
          {status === "failed" && (
            <FaTimesCircle className="text-5xl text-red-500" />
          )}
        </div>

        {/* MESSAGE */}
        <h1 className="text-2xl font-bold mb-2">{message}</h1>

        <p className="text-sm text-[var(--muted)]">
          {status === "checking" &&
            "Please wait while we confirm your top-up payment."}

          {status === "success" &&
            "Your order has been confirmed and will be delivered automatically."}

          {status === "failed" &&
            "If the amount was deducted, delivery or refund will be processed shortly."}
        </p>

        {/* ACTIONS */}
        {status === "success" ? (
          <div className="mt-6 flex flex-col gap-3">
            <a
              href="/dashboard/order"
              className="w-full rounded-xl bg-[var(--accent)] py-3 font-semibold text-black text-center hover:opacity-90 transition"
            >
              Check Order
            </a>

            <a
              href="/home"
              className="w-full rounded-xl border border-[var(--border)] py-3 font-semibold text-[var(--text)] text-center hover:bg-[var(--muted-bg)] transition"
            >
              Go to Home
            </a>
          </div>
        ) : (
          <button
            onClick={() => (window.location.href = "/home")}
            className="mt-6 w-full rounded-xl bg-[var(--accent)] py-3 font-semibold text-black hover:opacity-90 transition"
          >
            Go to Home
          </button>
        )}
      </div>
    </div>
  );
}
