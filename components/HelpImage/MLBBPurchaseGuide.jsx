"use client";

import { useState } from "react";
import { FiChevronDown } from "react-icons/fi";
import {
  FaShoppingCart,
  FaIdCard,
  FaWallet,
  FaMoneyBillWave,
  FaGem,
} from "react-icons/fa";

const steps = [
  {
    title: "Select Diamond Package",
    icon: FaShoppingCart,
    content: "Choose the diamond pack you want to purchase.",
  },
  {
    title: "Enter User ID & Zone",
    icon: FaIdCard,
    content:
      "Fill in your MLBB Player ID, Zone ID, and In-Game Name correctly.",
  },
  {
    title: "Payment Method",
    icon: FaWallet,
    content: "Select your preferred payment method such as UPI or Wallet.",
  },
  {
    title: "Pay Securely",
    icon: FaMoneyBillWave,
    content: "Complete the payment securely using the selected method.",
  },
  {
    title: "Receive Diamonds",
    icon: FaGem,
    content: "Diamonds will be credited to your account instantly.",
  },
];

export default function MLBBPurchaseGuide() {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <div className="bg-[var(--card)] rounded-2xl border border-[var(--border)] p-5">
      {/* Header */}
      <div className="mb-4">
        <h3 className="font-semibold text-lg">MLBB Purchase Guide</h3>
        <p className="text-xs text-[var(--muted)]">
          Complete your purchase in a few simple steps
        </p>
      </div>

      {/* Horizontal Steps */}
      <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
        {steps.map((step, index) => {
          const Icon = step.icon;
          const isOpen = openIndex === index;

          return (
            <div
              key={index}
              className={`
                min-w-[220px]
                rounded-xl border
                transition
                ${
                  isOpen
                    ? "border-[var(--accent)]/40 bg-[var(--muted-bg)]/40"
                    : "border-[var(--border)]"
                }
              `}
            >
              <button
                onClick={() => setOpenIndex(isOpen ? null : index)}
                className="w-full p-4 text-left"
              >
                {/* Top */}
                <div className="flex items-center justify-between mb-3">
                  <div className="w-7 h-7 rounded-full bg-[var(--accent)] text-black text-xs font-bold flex items-center justify-center">
                    {index + 1}
                  </div>

                  <FiChevronDown
                    className={`transition-transform ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </div>

                {/* Icon */}
                <div className="w-9 h-9 mb-3 flex items-center justify-center rounded-lg bg-[var(--accent)/15]">
                  <Icon className="text-[var(--accent)] text-sm" />
                </div>

                {/* Title */}
                <p className="font-medium text-sm leading-snug">
                  {step.title}
                </p>
              </button>

              {/* Expandable content */}
              <div
                className={`grid transition-all duration-300 ${
                  isOpen
                    ? "grid-rows-[1fr] opacity-100"
                    : "grid-rows-[0fr] opacity-0"
                }`}
              >
                <div className="overflow-hidden px-4 pb-4 text-xs text-[var(--muted)]">
                  {step.content}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
