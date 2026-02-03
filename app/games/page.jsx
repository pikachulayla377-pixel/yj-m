"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  FiFilter,
  FiX,
  FiSearch,
  FiArrowRight
} from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import logo from "@/public/logo.png";
import GamesFilterModal from "@/components/Games/GamesFilterModal";
import Loader from "@/components/Loader/Loader";

/* ===================== SUB-COMPONENTS ===================== */

const SectionHeader = ({ title, count }) => (
  <div className="flex items-center justify-between mb-8">
    <div className="space-y-1">
      <h2 className="text-xl md:text-2xl font-black tracking-tight text-[var(--foreground)] uppercase">
        {title}
      </h2>
      <div className="h-1 w-12 bg-gradient-to-r from-[var(--accent)] to-transparent rounded-full" />
    </div>
    {count !== undefined && (
      <span className="text-[10px] font-black tracking-widest text-[var(--muted)] uppercase opacity-60">
        {count} RECORDS
      </span>
    )}
  </div>
);

/* ===================== MAIN COMPONENT ===================== */

export default function GamesPage() {
  const [category, setCategory] = useState([]);
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [otts, setOtts] = useState(null);
  const [memberships, setMemberships] = useState(null);

  /* ================= FILTER STATE ================= */
  const [showFilter, setShowFilter] = useState(false);
  const [sort, setSort] = useState("az");
  const [hideOOS, setHideOOS] = useState(false);
  const [search, setSearch] = useState("");

  /* ================= CONFIG ================= */
  const SPECIAL_MLBB_GAME = "MLBB SMALL";
  const outOfStockGames = ["Genshin Impact", "Honor Of Kings", "TEST 1", "Wuthering of Waves", "Where Winds Meet", "Mobile Legends Backup"];

  const isOutOfStock = (name) => outOfStockGames.includes(name);

  /* ================= FETCH ================= */
  useEffect(() => {
    fetch("/api/games")
      .then((res) => res.json())
      .then((data) => {
        setCategory(data?.data?.category || []);
        setOtts(data?.data?.otts || null);
        setMemberships(data?.data?.memberships || null);
        setGames((data?.data?.games || []).map((g) => g.gameName === "PUBG Mobile" ? { ...g, gameName: "PUBG Mobile" } : g));
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <Loader />;

  const activeFilterCount = (sort !== "az" ? 1 : 0) + (hideOOS ? 1 : 0);

  /* ================= PROCESSING ================= */
  const processGames = (list) => {
    let filtered = [...list];
    if (hideOOS) filtered = filtered.filter((g) => !isOutOfStock(g.gameName));
    if (search.trim()) {
      const q = search.toLowerCase();
      filtered = filtered.filter((g) => g.gameName.toLowerCase().includes(q) || g.gameFrom?.toLowerCase().includes(q));
    }
    filtered.sort((a, b) => sort === "az" ? a.gameName.localeCompare(b.gameName) : b.gameName.localeCompare(a.gameName));
    return filtered;
  };

  const injectSpecialGame = (cat) => {
    if (!cat.categoryTitle?.toLowerCase().includes("mobile legends")) return cat.gameId;
    const specialGame = games.find((g) => g.gameName === SPECIAL_MLBB_GAME);
    if (!specialGame) return cat.gameId;
    const withoutDuplicate = cat.gameId.filter((g) => g.gameName !== SPECIAL_MLBB_GAME);
    return [specialGame, ...withoutDuplicate];
  };

  /* ================= RENDER CARD ================= */
  const GameCard = ({ game }) => {
    const disabled = isOutOfStock(game.gameName);

    return (
      <Link
        href={disabled ? "#" : `/games/${game.gameSlug}`}
        className={`group relative rounded-2xl overflow-hidden bg-[var(--card)]/50 border border-[var(--border)] backdrop-blur-md transition-all duration-500
        ${disabled ? "opacity-40 grayscale cursor-not-allowed" : "hover:border-[var(--accent)]/50 hover:shadow-2xl hover:shadow-[var(--accent)]/10 hover:-translate-y-1.5"}`}
      >
        <div className="relative aspect-[4/5]">
          <Image
            src={game.gameImageId?.image || logo}
            alt={game.gameName}
            fill
            className={`object-cover transition-all duration-700 ${!disabled && "group-hover:scale-110 group-hover:rotate-1"}`}
          />

          {/* Overlays */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/20 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-500" />

          {/* Tag */}
          {!disabled && game.tagId && (
            <div className="absolute top-3 left-3 z-10">
              <span
                className="text-[9px] font-black uppercase tracking-wider px-2 py-1 rounded-md shadow-2xl backdrop-blur-xl border border-white/10"
                style={{ background: `${game.tagId.tagBackground}dd`, color: game.tagId.tagColor }}
              >
                {game.tagId.tagName}
              </span>
            </div>
          )}

          {/* Bottom Info */}
          <div className="absolute bottom-0 left-0 right-0 p-4 pt-10 bg-gradient-to-t from-black/90 to-transparent space-y-1.5">
            <h3 className="text-[12px] md:text-[13px] font-bold text-white truncate leading-tight group-hover:text-[var(--accent)] transition-colors uppercase tracking-tight">
              {game.gameName}
            </h3>
            <div className="flex items-center justify-between border-t border-white/10 pt-1.5">
              <span className="text-[9px] text-white/50 font-bold uppercase tracking-widest leading-none">
                {game.gameFrom}
              </span>
              {!disabled && (
                <div className="w-5 h-5 rounded-full bg-[var(--accent)]/10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all transform translate-x-2 group-hover:translate-x-0">
                  <FiArrowRight className="w-3 h-3 text-[var(--accent)]" />
                </div>
              )}
            </div>
          </div>

          {/* Out of Stock Label */}
          {disabled && (
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="px-3 py-1 bg-black/60 backdrop-blur-md border border-white/10 text-[9px] font-black uppercase tracking-[0.2em] text-white rounded-full">
                System Offline
              </span>
            </div>
          )}
        </div>
      </Link>
    );
  };

  return (
    <section className="min-h-screen bg-[var(--background)]">

      {/* ================= SEARCH BAR ================= */}
      <div className="sticky top-16 z-40 bg-[var(--background)]/80 backdrop-blur-md border-b border-[var(--border)]">
        <div className="max-w-7xl mx-auto flex items-center gap-3 px-4 md:px-6 py-4">

          <div className="relative flex-1">
            <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--muted)] w-4 h-4" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="SEARCH GAMES..."
              className="w-full h-11 pl-12 pr-10 rounded-xl bg-[var(--card)]/50 border border-[var(--border)] text-xs font-bold tracking-wider uppercase focus:border-[var(--accent)] outline-none transition-all placeholder:text-[var(--muted)]/50"
            />
            {search && (
              <button
                onClick={() => setSearch("")}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-[var(--muted)] hover:text-red-500 transition-colors"
              >
                <FiX />
              </button>
            )}
          </div>

          <div className="flex shrink-0 gap-2">
            <AnimatePresence>
              {activeFilterCount > 0 && (
                <motion.button
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  onClick={() => { setSort("az"); setHideOOS(false); }}
                  className="h-11 px-3 flex items-center gap-2 rounded-xl bg-red-500/10 border border-red-500/20 text-red-500 text-[10px] font-black uppercase tracking-widest hover:bg-red-500/20 transition-all"
                >
                  <FiX className="w-3 h-3" /> <span className="hidden sm:inline">Reset</span>
                </motion.button>
              )}
            </AnimatePresence>

            <button
              onClick={() => setShowFilter(true)}
              className={`h-11 px-4 md:px-6 flex items-center gap-2 rounded-xl border text-[10px] font-black uppercase tracking-widest transition-all shrink-0
              ${activeFilterCount > 0
                  ? "bg-[var(--accent)] text-black border-[var(--accent)] shadow-[0_0_20px_rgba(var(--accent-rgb),0.2)]"
                  : "bg-[var(--card)]/50 border-[var(--border)] hover:border-[var(--accent)]"}`}
            >
              <FiFilter className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Filter</span>
              {activeFilterCount > 0 && (
                <span className="flex items-center justify-center w-5 h-5 rounded-md bg-black/20 text-black text-[9px] font-black">{activeFilterCount}</span>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* ================= CONTENT ================= */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-12 space-y-16">

        {category.map((cat, i) => {
          const merged = injectSpecialGame(cat);
          const filtered = processGames(merged);
          if (!filtered.length) return null;

          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <SectionHeader title={cat.categoryTitle} count={filtered.length} />
              <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 md:gap-6">
                {filtered.map((game, index) => (
                  <GameCard key={index} game={game} />
                ))}
              </div>
            </motion.div>
          );
        })}

        {/* ================= ALL GAMES SECTION ================= */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <SectionHeader title="Global Games" count={processGames(games).length} />
          <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 md:gap-6">
            {processGames(games).map((game, i) => (
              <GameCard key={i} game={game} />
            ))}
          </div>
        </motion.div>

        {/* ================= MEMBERSHIPS ================= */}
        {memberships?.items?.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <SectionHeader title={memberships.title} count={memberships.items.length} />
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              {memberships.items.map((plan) => (
                <Link
                  key={plan.slug}
                  href={`/games/membership/${plan.slug}`}
                  className="group relative flex items-center p-5 md:p-6 rounded-2xl bg-[var(--card)]/50 border border-[var(--border)] hover:border-[var(--accent)]/50 hover:shadow-xl transition-all duration-300 overflow-hidden"
                >
                  <div className="relative w-12 h-12 md:w-16 md:h-16 mr-4 group-hover:scale-110 transition-transform duration-500 ease-out">
                    <Image src={plan.image} alt={plan.name} fill className="object-contain" />
                  </div>
                  <div className="relative z-10">
                    <h3 className="text-[13px] font-black text-[var(--foreground)] uppercase tracking-tight">
                      {plan.name}
                    </h3>
                    <p className="text-[10px] text-[var(--muted)] font-bold uppercase tracking-widest opacity-60">
                      {plan.duration}
                    </p>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-br from-[var(--accent)]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </div>

      {showFilter && (
        <GamesFilterModal
          open={showFilter}
          onClose={() => setShowFilter(false)}
          sort={sort}
          setSort={setSort}
          hideOOS={hideOOS}
          setHideOOS={setHideOOS}
        />
      )}
    </section>
  );
}
