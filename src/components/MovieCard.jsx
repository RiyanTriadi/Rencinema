import Image from "next/image";
import Link from "next/link";
import { getPosterUrl } from "@/lib/tmdb";

export default function MovieCard({ movie }) {
    const { id, title, poster_path, vote_average, release_date } = movie;
    const year = release_date ? new Date(release_date).getFullYear() : "N/A";
    const rating = vote_average ? vote_average.toFixed(1) : "N/A";

    return (
        <Link href={`/movies/${id}`} className="block group">
            <div className="relative aspect-2/3 rounded-lg overflow-hidden bg-surface mb-3">
                <Image
                    src={getPosterUrl(poster_path, "md")}
                    alt={title}
                    fill
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 200px"
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                {/* Rating overlay on hover */}
                <div className="absolute inset-0 bg-linear-to-t from-black/70 to-transparent flex items-end p-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    <span className="text-sm font-semibold text-rating">⭐ {rating}</span>
                </div>
            </div>
            <div className="px-0.5">
                <h3 className="text-sm font-semibold truncate">{title}</h3>
                <span className="text-xs text-[#888]">{year}</span>
            </div>
        </Link>
    );
}