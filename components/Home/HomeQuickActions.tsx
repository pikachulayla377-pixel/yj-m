"use client";

import Link from "next/link";
import { Globe, Trophy } from "lucide-react";

export default function LeaderboardRegionSection() {
  return (
    <section className="w-full px-4 py-6">
      <div className="max-w-6xl mx-auto flex items-center justify-between gap-3">

        {/* LEFT — LEADERBOARD */}
        <Link
          href="/leaderboard"
          className="
            group
            flex items-center gap-3
            rounded-xl
            bg-[var(--card)]
            border border-[var(--border)]
            px-4 py-3
            transition-all duration-300
            hover:border-[var(--accent)]
            hover:bg-[var(--accent)]/5
            hover:shadow-lg hover:shadow-[var(--accent)]/20
            hover:scale-105
            hover:-translate-y-1
          "
          style={{
            animation: 'fadeInUp 0.6s ease-out 0.1s both'
          }}
        >
          <div className="h-10 w-10 flex items-center justify-center rounded-lg bg-[var(--accent)]/15 text-[var(--accent)] transition-all duration-300 group-hover:scale-110 group-hover:rotate-12 group-hover:bg-[var(--accent)]/25">
            <Trophy className="h-5 w-5 transition-transform duration-300 group-hover:scale-110" />
          </div>

          <span className="text-sm font-medium text-[var(--foreground)] transition-all duration-300 group-hover:text-[var(--accent)] group-hover:translate-x-1">
            Leaderboard
          </span>
        </Link>

        {/* RIGHT — CHECK REGION */}
        <Link
          href="/check-region"
          className="
            group
            flex items-center gap-3
            rounded-xl
            bg-[var(--card)]
            border border-[var(--border)]
            px-4 py-3
            transition-all duration-300
            hover:border-[var(--accent)]
            hover:bg-[var(--accent)]/5
            hover:shadow-lg hover:shadow-[var(--accent)]/20
            hover:scale-105
            hover:-translate-y-1
          "
          style={{
            animation: 'fadeInUp 0.6s ease-out 0.2s both'
          }}
        >
          <span className="text-sm font-medium text-[var(--foreground)] transition-all duration-300 group-hover:text-[var(--accent)] group-hover:-translate-x-1">
            Check Region
          </span>

          <div className="h-10 w-10 flex items-center justify-center rounded-lg bg-[var(--accent)]/15 text-[var(--accent)] transition-all duration-300 group-hover:scale-110 group-hover:rotate-12 group-hover:bg-[var(--accent)]/25">
            <Globe className="h-5 w-5 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-180" />
          </div>
        </Link>

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
