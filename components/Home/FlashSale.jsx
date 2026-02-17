"use client";

import { motion } from "framer-motion";
import { Zap, Timer, ChevronRight, ShoppingCart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const flashSaleData = [
    {
        id: 1,
        name: "Weekly Pass",
        game: "Mobile Legends",
        image: "https://res.cloudinary.com/dk0sslz1q/image/upload/v1768676620/WhatsApp_Image_2026-01-18_at_00.27.53_1_de6vcj.jpg",
        slug: "mobile-legends988",
        price: "159",
        originalPrice: "190",
        discount: "16% OFF",
        tag: "HOT",
        color: "from-blue-500/20 to-cyan-500/20",
        borderColor: "group-hover:border-blue-400/50"
    },
    {
        id: 2,
        name: "Monthly Pass",
        game: "Where Winds Meet",
        image: "https://res.cloudinary.com/dk0sslz1q/image/upload/v1768676620/WhatsApp_Image_2026-01-18_at_00.27.53_2_tgsnly.jpg", // Using placeholder or similar
        slug: "where-winds-meet280",
        price: "450",
        originalPrice: "599",
        discount: "25% OFF",
        tag: "BEST VALUE",
        color: "from-purple-500/20 to-pink-500/20",
        borderColor: "group-hover:border-purple-400/50"
    },
    // {
    //     id: 3,
    //     name: "Starlight Member",
    //     game: "Mobile Legends",
    //     image: "https://res.cloudinary.com/dk0sslz1q/image/upload/v1768676621/WhatsApp_Image_2026-01-18_at_00.27.53_kgofz5.jpg",
    //     slug: "mobile-legends988",
    //     price: "299",
    //     originalPrice: "350",
    //     discount: "15% OFF",
    //     tag: "LIMITED",
    //     color: "from-orange-500/20 to-yellow-500/20",
    //     borderColor: "group-hover:border-orange-400/50"
    // },
    {
        id: 4,
        name: "Twilight Pass",
        game: "Mobile Legends",
        image: "https://res.cloudinary.com/dk0sslz1q/image/upload/v1768676620/WhatsApp_Image_2026-01-18_at_00.27.52_2_cgdxxe.jpg",
        slug: "mobile-legends988",
        price: "650",
        originalPrice: "800",
        discount: "18% OFF",
        tag: "PREMIUM",
        color: "from-red-500/20 to-orange-500/20",
        borderColor: "group-hover:border-red-400/50"
    }
];

const FlashSale = () => {
    const [timeLeft, setTimeLeft] = useState({
        hours: 2,
        minutes: 45,
        seconds: 30
    });

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft(prev => {
                if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
                if (prev.minutes > 0) return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
                if (prev.hours > 0) return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
                // Loop the timer back to its initial state when it hits zero
                return { hours: 2, minutes: 45, seconds: 30 };
            });
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    return (
        <div className="w-full max-w-6xl mx-auto px-4 py-8 mb-4">
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                    <div className="relative">
                        <Zap className="w-6 h-6 text-yellow-400 fill-yellow-400 animate-pulse" />
                        <div className="absolute inset-0 bg-yellow-400/20 blur-lg rounded-full" />
                    </div>
                    <div>
                        <h2 className="text-xl md:text-2xl font-black uppercase tracking-tighter italic flex items-center gap-2">
                            Flash <span className="text-[var(--accent)]">Sale</span>
                        </h2>
                        <div className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-[var(--muted)] font-bold">
                            <Timer className="w-3 h-3" />
                            Ends in:
                            <span className="text-[var(--foreground)] font-mono">
                                {String(timeLeft.hours).padStart(2, '0')}:
                                {String(timeLeft.minutes).padStart(2, '0')}:
                                {String(timeLeft.seconds).padStart(2, '0')}
                            </span>
                        </div>
                    </div>
                </div>

                <Link
                    href="/games"
                    className="group flex items-center gap-1 text-xs font-bold uppercase tracking-widest text-[var(--muted)] hover:text-[var(--accent)] transition-colors"
                >
                    View All
                    <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
            </div>

            <div className="flex overflow-x-auto pb-4 gap-3 no-scrollbar -mx-4 px-4 snap-x">
                {flashSaleData.map((item, index) => (
                    <motion.div
                        key={item.id}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex-shrink-0 w-[190px] snap-start"
                    >
                        <Link href={`/games/${item.slug}`} className="group relative block">
                            <div className={`relative aspect-video rounded-2xl overflow-hidden bg-gradient-to-br ${item.color} border border-white/5 transition-all duration-500 ${item.borderColor} group-hover:shadow-2xl group-hover:shadow-blue-500/20`}>

                                {/* Image */}
                                <Image
                                    src={item.image}
                                    alt={item.name}
                                    fill
                                    className="object-cover opacity-50 group-hover:opacity-70 group-hover:scale-110 transition-all duration-700"
                                />

                                {/* Overlays */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

                                {/* Badge */}
                                <div className="absolute top-3 left-3">
                                    <div className="px-1.5 py-0.5 rounded bg-black/60 backdrop-blur-md border border-white/10 text-[8px] font-black tracking-widest text-white uppercase shadow-xl">
                                        {item.tag}
                                    </div>
                                </div>

                                {/* Discount Badge */}
                                <div className="absolute top-3 right-3">
                                    <div className="px-1.5 py-0.5 rounded bg-[var(--accent)] text-[8px] font-black tracking-widest text-black uppercase shadow-lg shadow-blue-500/20">
                                        {item.discount}
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="absolute bottom-0 left-0 right-0 p-4">
                                    <div className="flex items-end justify-between gap-2">
                                        <div className="flex-1 min-w-0">
                                            <p className="text-[8px] font-bold text-[var(--muted)] uppercase tracking-widest mb-0.5 truncate">
                                                {item.game}
                                            </p>
                                            <h3 className="text-sm font-black text-white leading-tight mb-1 group-hover:text-[var(--accent)] transition-colors truncate">
                                                {item.name}
                                            </h3>
                                        </div>

                                        <div className="w-8 h-8 rounded-lg bg-white/10 backdrop-blur-md border border-white/10 flex items-center justify-center group-hover:bg-[var(--accent)] group-hover:text-black transition-all duration-300 transform group-hover:scale-105">
                                            <ShoppingCart className="w-4 h-4 text-white group-hover:text-black" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    </motion.div>
                ))}
            </div>

            <style jsx>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
        </div>
    );
};

export default FlashSale;
