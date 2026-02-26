"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { getBackdropUrl } from "@/lib/tmdb";

export default function HeroSlider({ movies }) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isAnimating, setIsAnimating] = useState(false);

    const goTo = useCallback((index) => {
        if (isAnimating) return;
        setIsAnimating(true);
        setCurrentIndex(index);
        setTimeout(() => setIsAnimating(false), 600);
    }, [isAnimating]);

    const goNext = useCallback(() => {
        goTo((currentIndex + 1) % movies.length);
    }, [currentIndex, movies.length, goTo]);

    const goPrev = useCallback(() => {
        goTo((currentIndex - 1 + movies.length) % movies.length);
    }, [currentIndex, movies.length, goTo]);

    useEffect(() => {
        const interval = setInterval(goNext, 6000);
        return () => clearInterval(interval);
    }, [goNext]);

    const current = movies[currentIndex];

    return (
        <section className="relative h-[85vh] min-h-[500px] overflow-hidden">
            {/* Backdrop */}
            <div className="absolute inset-0">
                <Image
                    src={getBackdropUrl(current.backdrop_path, "original")}
                    alt={current.title}
                    fill
                    priority
                    sizes="100vw"
                    className="object-cover transition-opacity duration-600"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-[#0d0d0d]/95 via-[#0d0d0d]/30 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d0d]/80 via-transparent to-transparent" />
            </div>

            {/* Content */}
            <div className="relative z-10 h-full flex items-center">
                <div className="max-w-[1280px] mx-auto px-6 w-full">
                    <div className="flex items-center gap-4 mb-4 text-sm text-[#888]">
                        <span className="bg-[#e50914] text-white px-3 py-1 rounded text-xs font-bold uppercase tracking-widest">
                            Now Playing
                        </span>
                        <span className="text-[#f5c518] font-semibold">
                            ⭐ {current.vote_average?.toFixed(1)}
                        </span>
                        <span>{current.release_date?.slice(0, 4)}</span>
                    </div>

                    <h1 className="text-4xl md:text-6xl font-black max-w-xl mb-4 leading-tight tracking-tight">
                        {current.title}
                    </h1>

                    <p className="max-w-[550px] text-[#888] text-base mb-8 line-clamp-3">
                        {current.overview}
                    </p>

                    <Link
                        href={`/movies/${current.id}`}
                        className="inline-flex items-center gap-2 bg-[#e50914] hover:bg-[#b20710] text-white px-6 py-3 rounded-lg font-semibold text-sm transition-colors"
                    >
                        View Details
                    </Link>
                </div>
            </div>

            {/* Arrows */}
            <button
                onClick={goPrev}
                aria-label="Previous"
                className="absolute left-6 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white text-3xl flex items-center justify-center backdrop-blur-sm transition-colors"
            >
                ‹
            </button>
            <button
                onClick={goNext}
                aria-label="Next"
                className="absolute right-6 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white text-3xl flex items-center justify-center backdrop-blur-sm transition-colors"
            >
                ›
            </button>

            {/* Dots */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2 z-20">
                {movies.map((_, i) => (
                    <button
                        key={i}
                        onClick={() => goTo(i)}
                        aria-label={`Go to slide ${i + 1}`}
                        className={`w-2 h-2 rounded-full transition-all ${i === currentIndex
                                ? "bg-[#e50914] scale-125"
                                : "bg-white/30 hover:bg-white/50"
                            }`}
                    />
                ))}
            </div>
        </section>
    );
}