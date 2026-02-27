"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { getPosterUrl } from "@/lib/tmdb";

export default function RandomPick({ initialMovie }) {
    const [movie, setMovie] = useState(initialMovie);
    const [loading, setLoading] = useState(false);

    async function handlePick() {
        setLoading(true);
        try {
            const res = await fetch("/api/random-movie");
            const data = await res.json();
            setMovie(data);
        } catch (err) {
            console.error("Failed to fetch random movie:", err);
        } finally {
            setLoading(false);
        }
    }

    if (!movie) return null;

    const { id, title, poster_path, vote_average, release_date, overview, genres } = movie;

    return (
        <section className="py-16">
            <div className="max-w-7xl mx-auto px-6">
                <h2 className="text-3xl font-bold mb-2 pl-4 relative before:absolute before:left-0 before:top-0 before:bottom-0 before:w-1 before:bg-primary before:rounded">
                    🎲 Random Pick
                </h2>
                <p className="text-[#888] mb-8 pl-4">Can&apos;t decide what to watch? Let us pick for you!</p>

                <div className="grid grid-cols-1 md:grid-cols-[250px_1fr] gap-10 p-8 bg-surface border border-border rounded-lg">
                    {/* Poster */}
                    <div className="relative aspect-2/3 max-w-62.5 w-full rounded-lg overflow-hidden">
                        <Image
                            src={getPosterUrl(poster_path, "lg")}
                            alt={title}
                            fill
                            sizes="300px"
                            className="object-cover"
                        />
                    </div>

                    {/* Info */}
                    <div>
                        <h3 className="text-3xl font-black mb-3 tracking-tight">{title}</h3>

                        <div className="flex gap-4 text-sm text-[#888] mb-3">
                            <span>⭐ {vote_average?.toFixed(1)}</span>
                            <span>{release_date?.slice(0, 4)}</span>
                        </div>

                        {genres && (
                            <div className="flex flex-wrap gap-2 mb-4">
                                {genres.map((g) => (
                                    <span
                                        key={g.id}
                                        className="bg-surface border border-border text-[#888] px-3 py-1 rounded text-xs"
                                    >
                                        {g.name}
                                    </span>
                                ))}
                            </div>
                        )}

                        <p className="text-[#888] leading-relaxed mb-6">{overview}</p>

                        <div className="flex gap-3 flex-wrap">
                            <Link
                                href={`/movies/${id}`}
                                className="inline-flex items-center gap-2 bg-primary hover:bg-primary-hover text-white px-6 py-3 rounded-lg font-semibold text-sm transition-colors"
                            >
                                View Details
                            </Link>
                            <button
                                onClick={handlePick}
                                disabled={loading}
                                className="inline-flex items-center gap-2 bg-[#333] hover:bg-[#444] text-text px-6 py-3 rounded-lg font-semibold text-sm transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                            >
                                {loading ? "Picking..." : "🎲 Pick Again"}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}