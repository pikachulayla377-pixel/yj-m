"use client";

import { useEffect, useState, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import logo from "@/public/logo.png";
import Loader from "@/components/Loader/Loader";

export default function GameBannerCarousel() {
  const [banners, setBanners] = useState([]);
  const [current, setCurrent] = useState(0);
  const [loading, setLoading] = useState(true);

  /* ================= FETCH ================= */
  useEffect(() => {
    let active = true;

    (async () => {
      try {
        const res = await fetch("/api/game-banners");
        const json = await res.json();
        if (!active) return;
        setBanners(json?.data || []);
      } catch {
        if (active) setBanners([]);
      } finally {
        if (active) setLoading(false);
      }
    })();

    return () => {
      active = false;
    };
  }, []);

  /* ================= AUTOPLAY ================= */
  useEffect(() => {
    if (banners.length <= 1) return;

    const id = setInterval(() => {
      setCurrent((prev) => (prev + 1) % banners.length);
    }, 5000);

    return () => clearInterval(id);
  }, [banners.length]);

  /* ================= CONTROLS ================= */
  const goNext = useCallback(() => {
    setCurrent((prev) => (prev + 1) % banners.length);
  }, [banners.length]);

  const goPrev = useCallback(() => {
    setCurrent((prev) => (prev - 1 + banners.length) % banners.length);
  }, [banners.length]);

  if (loading) return <Loader />;
  if (!banners.length) return null;

  const banner = banners[current];

  return (
    <div className="relative w-full max-w-6xl mx-auto mt-6 md:mt-8 select-none">
      <div
        className="
          relative overflow-hidden rounded-3xl
          h-[240px] sm:h-[280px] md:h-[340px]
          group shadow-xl
        "
      >
        {/* IMAGE */}
        <Link href={banner.bannerLink || "/"} className="absolute inset-0">
          <Image
            key={banner.bannerImage} // helps smooth change
            src={banner.bannerImage || logo}
            alt={banner.bannerTitle || "Game banner"}
            fill
            priority
            sizes="(max-width: 768px) 100vw, 900px"
            className="
              object-cover
              transition-transform duration-[1200ms] ease-out
              group-hover:scale-[1.04]
            "
          />
        </Link>

        {/* OVERLAY */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/35 to-transparent" />

        {/* TEXT */}
        {banner.bannerTitle && (
          <div className="absolute left-5 bottom-5 md:left-8 md:bottom-8 max-w-[80%]">
            <h2 className="text-xl md:text-3xl font-bold text-white drop-shadow">
              {banner.bannerTitle}
            </h2>
            <p className="text-sm md:text-base text-white/80 mt-1">
              Tap to explore offers
            </p>
          </div>
        )}

        {/* LEFT ARROW */}
        {banners.length > 1 && (
          <button
            onClick={goPrev}
            className="
              absolute left-3 md:left-4 top-1/2 -translate-y-1/2
              w-10 h-10 md:w-12 md:h-12
              rounded-full
              bg-black/40 backdrop-blur
              text-white text-xl
              transition hover:bg-black/60
              flex items-center justify-center
            "
            aria-label="Previous banner"
          >
            ‹
          </button>
        )}

        {/* RIGHT ARROW */}
        {banners.length > 1 && (
          <button
            onClick={goNext}
            className="
              absolute right-3 md:right-4 top-1/2 -translate-y-1/2
              w-10 h-10 md:w-12 md:h-12
              rounded-full
              bg-black/40 backdrop-blur
              text-white text-xl
              transition hover:bg-black/60
              flex items-center justify-center
            "
            aria-label="Next banner"
          >
            ›
          </button>
        )}
      </div>

      {/* DOTS */}
      {banners.length > 1 && (
        <div className="flex justify-center gap-2 mt-4">
          {banners.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`h-2.5 rounded-full transition-all duration-300 ${
                current === i
                  ? "bg-[var(--accent)] w-6"
                  : "bg-[var(--muted)]/60 w-2.5 hover:bg-[var(--accent)]/50"
              }`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
