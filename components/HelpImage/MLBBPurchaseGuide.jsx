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
  const [activeStep, setActiveStep] = useState(0);

  return (
    <section className="bg-[var(--card)] rounded-2xl border border-[var(--border)] p-5">
      {/* Header */}
      <div className="mb-4">
        <h3 className="font-semibold text-lg">How to Buy MLBB Diamonds</h3>
        <p className="text-xs text-[var(--muted)]">
          Tap steps to continue
        </p>
      </div>

      <div className="space-y-3">
        {steps.map((step, index) => {
          const Icon = step.icon;
          const isActive = activeStep === index;
          const isCompleted = index < activeStep;

          return (
            <div
              key={index}
              className={`rounded-xl border transition-all ${
                isActive
                  ? "border-[var(--accent)] bg-[var(--accent)]/10"
                  : "border-[var(--border)] bg-[var(--background)]"
              }`}
            >
              {/* Header row */}
              <button
                onClick={() => setActiveStep(index)}
                className="w-full flex items-center justify-between p-4 text-left"
              >
                <div className="flex items-center gap-3">
                  {/* Step Number / Tick */}
                  <div
                    className={`w-7 h-7 rounded-full text-xs font-bold flex items-center justify-center ${
                      isCompleted
                        ? "bg-green-500 text-white"
                        : "bg-[var(--accent)] text-black"
                    }`}
                  >
                    {isCompleted ? "✓" : index + 1}
                  </div>

                  {/* Icon */}
                  <div className="w-8 h-8 rounded-lg bg-[var(--accent)]/15 flex items-center justify-center">
                    <Icon className="text-[var(--accent)] text-sm" />
                  </div>

                  {/* Title */}
                  <p className="font-medium text-sm">{step.title}</p>
                </div>

                <FiChevronDown
                  className={`transition-transform ${
                    isActive ? "rotate-180" : ""
                  }`}
                />
              </button>

              {/* Expandable content BELOW */}
              <div
                className={`grid transition-all duration-300 ease-in-out ${
                  isActive
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
