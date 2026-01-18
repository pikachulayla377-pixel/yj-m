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
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section className="bg-[var(--card)] rounded-2xl border border-[var(--border)] p-5">
      {/* Header */}
      <div className="mb-4">
        <h3 className="font-semibold text-lg">
          How to Buy MLBB Diamonds
        </h3>
        <p className="text-xs text-[var(--muted)]">
          Swipe & tap to follow the steps
        </p>
      </div>

      {/* Horizontal Steps */}
      <div className="flex gap-4 overflow-x-auto pb-3 snap-x snap-mandatory scrollbar-hide">
        {steps.map((step, index) => {
          const Icon = step.icon;
          const isOpen = openIndex === index;
          const isCompleted =
            openIndex !== null && index < openIndex;

          return (
            <div
              key={index}
              className={`
                snap-start
                min-w-[240px]
                rounded-xl
                transition-all
                border
                ${
                  isOpen
                    ? "border-[var(--accent)] bg-[var(--accent)]/10 shadow-md"
                    : "border-[var(--border)] bg-[var(--background)] hover:bg-[var(--muted-bg)]/40"
                }
              `}
            >
              <button
                onClick={() =>
                  setOpenIndex(isOpen ? null : index)
                }
                className="w-full p-4 text-left"
              >
                {/* Top row */}
                <div className="flex items-center justify-between mb-3">
                  <div
                    className={`
                      w-7 h-7 rounded-full
                      text-xs font-bold flex items-center justify-center
                      ${
                        isCompleted
                          ? "bg-green-500 text-white"
                          : "bg-[var(--accent)] text-black"
                      }
                    `}
                  >
                    {isCompleted ? "✓" : index + 1}
                  </div>

                  <FiChevronDown
                    className={`transition-transform ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </div>

                {/* Icon */}
                <div
                  className="
                    w-10 h-10 mb-3
                    flex items-center justify-center
                    rounded-lg
                    bg-[var(--accent)]/15
                  "
                >
                  <Icon className="text-[var(--accent)] text-base" />
                </div>

                {/* Title */}
                <p className="font-medium text-sm leading-snug">
                  {step.title}
                </p>
              </button>

              {/* Expandable content */}
              <div
                className={`grid transition-all duration-300 ease-in-out ${
                  isOpen
                    ? "grid-rows-[1fr] opacity-100"
                    : "grid-rows-[0fr] opacity-0"
                }`}
              >
                <div className="overflow-hidden px-4 pb-4 text-xs text-[var(--muted)] leading-relaxed">
                  {step.content}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
