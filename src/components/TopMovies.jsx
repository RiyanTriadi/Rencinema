import Image from "next/image";
import Link from "next/link";
import { getPosterUrl } from "@/lib/tmdb";

function TopMovieItem({ movie, rank }) {
    const { id, title, poster_path, vote_average, release_date, overview } = movie;

    return (
        <Link
            href={`/movies/${id}`}
            className="flex items-start gap-4 p-4 bg-surface border border-border rounded-lg hover:border-primary hover:translate-x-1 transition-all duration-200"
        >
            <span className="text-4xl font-black text-accent min-w-10 leading-none pt-1">
                #{rank}
            </span>

            <div className="relative w-17.5 h-26 shrink-0 rounded overflow-hidden">
                <Image
                    src={getPosterUrl(poster_path, "sm")}
                    alt={title}
                    fill
                    sizes="80px"
                    className="object-cover"
                />
            </div>

            <div className="flex-1 min-w-0">
                <h3 className="font-bold text-base mb-1 truncate">{title}</h3>
                <p className="text-xs text-[#888] line-clamp-2 mb-2">{overview}</p>
                <div className="flex gap-4 text-xs text-[#888]">
                    <span>⭐ {vote_average?.toFixed(1)}</span>
                    <span>{release_date?.slice(0, 4)}</span>
                </div>
            </div>
        </Link>
    );
}

export default function TopMovies({ movies }) {
    return (
        <section className="py-16">
            <div className="max-w-7xl mx-auto px-6">
                <h2 className="text-3xl font-bold mb-8 pl-4 relative before:absolute before:left-0 before:top-0 before:bottom-0 before:w-1 before:bg-primary before:rounded">
                    Top 5 Movies
                </h2>
                <div className="flex flex-col gap-4">
                    {movies.map((movie, index) => (
                        <TopMovieItem key={movie.id} movie={movie} rank={index + 1} />
                    ))}
                </div>
            </div>
        </section>
    );
}