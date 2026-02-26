import Link from "next/link";

export default function Navbar() {
    return (
        <nav className="sticky top-0 z-50 h-16 bg-[#0d0d0d]/90 backdrop-blur-md border-b border-[#2e2e2e]">
            <div className="max-w-[1280px] mx-auto px-6 flex items-center justify-between h-full">
                <Link href="/" className="text-2xl font-black text-[#e50914] tracking-tight">
                    Rencinema
                </Link>
                <ul className="flex gap-8 list-none">
                    <li>
                        <Link href="/" className="text-[#888] text-sm hover:text-[#f0f0f0] transition-colors">
                            Home
                        </Link>
                    </li>
                    <li>
                        <Link href="/movies" className="text-[#888] text-sm hover:text-[#f0f0f0] transition-colors">
                            Movies
                        </Link>
                    </li>
                </ul>
            </div>
        </nav>
    );
}