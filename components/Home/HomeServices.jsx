import { FaWhatsapp } from "react-icons/fa";

export default function HomeServices() {
  return (
    <section className="py-10 px-4 bg-[var(--background)] text-[var(--foreground)]">
      <div className="max-w-6xl mx-auto">
        <div className="relative overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--card)]">

          {/* Accent strip */}
          <div className="absolute inset-y-0 left-0 w-1 bg-gradient-to-b from-[var(--accent)] to-[var(--accent-secondary)]" />

          <div className="relative flex flex-col md:flex-row items-start md:items-center justify-between gap-6 p-5 md:p-6">

            {/* Left content */}
            <div className="max-w-3xl">
              <h3 className="text-lg md:text-xl font-extrabold leading-snug">
                Website Designed, Developed & Maintained By Experts
              </h3>

              <p className="mt-1 text-xs md:text-sm text-[var(--muted)] leading-relaxed">
                End-to-end website solutions including design, development,
                deployment, optimization, security, and long-term maintenance.
              </p>
            </div>

            {/* Right CTA */}
            <div className="flex flex-col items-start md:items-end gap-2 shrink-0">
              <span className="text-sm md:text-base font-semibold text-[var(--accent)] tracking-wide">
                +91&nbsp;63723&nbsp;05866
              </span>

              <a
                href="https://wa.me/916372305866"
                target="_blank"
                rel="noopener noreferrer"
                className="
                  inline-flex items-center gap-2
                  px-4 py-2 rounded-xl
                  bg-gradient-to-r from-[var(--accent)] to-[var(--accent-secondary)]
                  text-white font-semibold text-xs
                  hover:brightness-110
                  active:scale-95
                  transition-all duration-150
                "
              >
                <FaWhatsapp className="text-base" />
                Get Service
              </a>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
