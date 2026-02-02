"use client";

import Link from "next/link";
import { Globe, Trophy, Gamepad2, LayoutGrid } from "lucide-react";

export default function HomeQuickActions() {
  const actions = [
    {
      name: "Leaderboard",
      href: "/leaderboard",
      icon: Trophy,
      delay: "0.1s",
      color: "text-yellow-500",
      bg: "bg-yellow-500/10",
      hover: "hover:bg-yellow-500/10",
    },
    {
      name: "Region",
      href: "/check-region",
      icon: Globe,
      delay: "0.2s",
      color: "text-blue-500",
      bg: "bg-blue-500/10",
      hover: "hover:bg-blue-500/10",
    },
    {
      name: "Services",
      href: "/services",
      icon: LayoutGrid,
      delay: "0.3s",
      color: "text-violet-500",
      bg: "bg-violet-500/10",
      hover: "hover:bg-violet-500/10",
    },
    {
      name: "Games",
      href: "/games",
      icon: Gamepad2,
      delay: "0.4s",
      color: "text-emerald-500",
      bg: "bg-emerald-500/10",
      hover: "hover:bg-emerald-500/10",
    },
  ];

  return (
    <section className="w-full px-4 py-6">
      <div className="max-w-6xl mx-auto grid grid-cols-4 gap-3">
        {actions.map((action, index) => (
          <Link
            key={action.name}
            href={action.href}
            className={`
              group
              flex flex-col items-center justify-center gap-2
              rounded-2xl
              bg-[var(--card)]/30 backdrop-blur-sm
              p-3
              transition-all duration-300
              ${action.hover}
              hover:-translate-y-1
            `}
            style={{
              animation: `fadeInUp 0.6s ease-out ${action.delay} both`
            }}
          >
            <div className={`h-10 w-10 flex items-center justify-center rounded-xl transition-all duration-300 group-hover:scale-110 group-hover:rotate-6 ${action.bg} ${action.color}`}>
              <action.icon className="h-5 w-5 transition-transform duration-300 group-hover:scale-110" />
            </div>

            <span className="text-xs sm:text-sm font-medium text-[var(--foreground)] text-center transition-all duration-300 group-hover:text-[var(--foreground)]/80">
              {action.name}
            </span>
          </Link>
        ))}
      </div>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </section>
  );
}
