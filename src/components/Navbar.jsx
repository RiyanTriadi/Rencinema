"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

export default function Navbar() {
    const router = useRouter();
    const searchParams = useSearchParams();

    const [query, setQuery] = useState(searchParams.get("q") || "");

    function handleSearch(e) {
        e.preventDefault();
        const trimmed = query.trim();
        if (!trimmed) return;
        router.push(`/search?q=${encodeURIComponent(trimmed)}`);
    }

    return (
        <nav className="sticky top-0 z-50 h-16 bg-bg/90 backdrop-blur-md border-b border-border">
            <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-full gap-6">
                {/* Brand */}
                <Link href="/" className="text-2xl font-black text-primary tracking-tight shrink-0">
                    Rencinema
                </Link>

                {/* Search Bar */}
                <form onSubmit={handleSearch} className="flex-1 max-w-lg">
                    <div className="relative">
                        <input
                            type="text"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            placeholder="Search movies..."
                            className="w-full bg-surface border border-border text-text placeholder-[#888] rounded-lg px-4 py-2 pr-10 text-sm focus:outline-none focus:border-primary transition-colors"
                        />
                        <button
                            type="submit"
                            className="absolute right-0 top-0 h-full px-3 text-[#888] hover:text-text transition-colors cursor-pointer"
                            aria-label="Search"
                        >
                            <i className="fa-solid fa-magnifying-glass"></i>
                        </button>
                    </div>
                </form>

                {/* Nav Links */}
                <ul className="flex gap-6 list-none shrink-0">
                    <li>
                        <Link href="/" className="text-[#888] text-sm hover:text-text transition-colors">
                            Home
                        </Link>
                    </li>
                    <li>
                        <Link href="/movies" className="text-[#888] text-sm hover:text-text transition-colors">
                            Movies
                        </Link>
                    </li>
                </ul>
            </div>
        </nav>
    );
}