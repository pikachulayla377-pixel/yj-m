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

    return () => (active = false);
  }, []);

  /* ================= AUTOPLAY ================= */
  useEffect(() => {
    if (banners.length <= 1) return;
    const id = setInterval(
      () => setCurrent((p) => (p + 1) % banners.length),
      4500
    );
    return () => clearInterval(id);
  }, [banners.length]);

  /* ================= CONTROLS ================= */
  const goNext = useCallback(
    () => setCurrent((p) => (p + 1) % banners.length),
    [banners.length]
  );

  const goPrev = useCallback(
    () => setCurrent((p) => (p - 1 + banners.length) % banners.length),
    [banners.length]
  );

  if (loading) return <Loader />;
  if (!banners.length) return null;

  return (
    <div className="relative w-full max-w-6xl mx-auto mt-8 select-none">
      <div className="relative overflow-hidden rounded-3xl h-[190px] md:h-[300px] shadow-xl group">

        {/* ================= SLIDES ================= */}
        {banners.map((banner, i) => (
          <Link
            key={i}
            href={banner.bannerLink || "/"}
            className={`absolute inset-0 transition-all duration-700 ease-out
              ${i === current ? "opacity-100 scale-100 z-10" : "opacity-0 scale-105 z-0"}
            `}
          >
            <Image
              src={banner.bannerImage || logo}
              alt={banner.bannerTitle || "Game banner"}
              fill
              priority={i === 0}
              sizes="(max-width: 768px) 100vw, 900px"
              className="object-cover"
            />
          </Link>
        ))}

        {/* ================= OVERLAY ================= */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent z-20" />

        {/* ================= TEXT ================= */}
        {banners[current]?.bannerTitle && (
          <div className="absolute left-6 bottom-6 z-30 max-w-[80%]">
            <h2 className="text-lg md:text-2xl font-semibold text-white tracking-tight transition-all duration-500">
              {banners[current].bannerTitle}
            </h2>
            <p className="text-sm md:text-base text-white/75 mt-1">
              Explore latest offers
            </p>
          </div>
        )}

        {/* ================= ARROWS ================= */}
        {banners.length > 1 && (
          <>
            <button
              onClick={goPrev}
              className="
                absolute left-4 top-1/2 -translate-y-1/2 z-30
                w-10 h-10 md:w-12 md:h-12
                rounded-full
                bg-white/10 backdrop-blur
                text-white text-xl
                opacity-0 group-hover:opacity-100
                transition
                flex items-center justify-center
                hover:bg-white/20
              "
              aria-label="Previous banner"
            >
              ‹
            </button>

            <button
              onClick={goNext}
              className="
                absolute right-4 top-1/2 -translate-y-1/2 z-30
                w-10 h-10 md:w-12 md:h-12
                rounded-full
                bg-white/10 backdrop-blur
                text-white text-xl
                opacity-0 group-hover:opacity-100
                transition
                flex items-center justify-center
                hover:bg-white/20
              "
              aria-label="Next banner"
            >
              ›
            </button>
          </>
        )}
      </div>

      {/* ================= DOTS ================= */}
      {banners.length > 1 && (
        <div className="flex justify-center gap-2 mt-4">
          {banners.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`h-2 rounded-full transition-all duration-300 ${
                current === i
                  ? "bg-[var(--accent)] w-7"
                  : "bg-white/30 w-2 hover:bg-white/50"
              }`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
