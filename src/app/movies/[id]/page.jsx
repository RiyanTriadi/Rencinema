import Image from "next/image";
import { notFound } from "next/navigation";
import { getMovieDetails, getPosterUrl, getBackdropUrl } from "@/lib/tmdb";

export async function generateMetadata({ params }) {
    const { id } = await params;
    try {
        const movie = await getMovieDetails(id);
        return { title: `${movie.title} - MovieDB`, description: movie.overview };
    } catch {
        return { title: "Movie Not Found" };
    }
}

export default async function MovieDetailPage({ params }) {
    const { id } = await params;
    let movie;
    try {
        movie = await getMovieDetails(id);
    } catch {
        notFound();
    }

    const { title, poster_path, backdrop_path, overview, vote_average,
        release_date, runtime, genres, credits, tagline } = movie;

    const director = credits?.crew?.find((p) => p.job === "Director");
    const cast = credits?.cast?.slice(0, 8) || [];

    return (
        <main>
            {/* Fixed backdrop */}
            <div className="fixed inset-0 -z-10">
                <Image
                    src={getBackdropUrl(backdrop_path, "original")}
                    alt={title}
                    fill
                    priority
                    sizes="100vw"
                    className="object-cover opacity-15"
                />
                <div className="absolute inset-0 bg-bg/80" />
            </div>

            <div className="max-w-7xl mx-auto px-6 pt-24 pb-16">
                <div className="grid grid-cols-1 md:grid-cols-[300px_1fr] gap-12 items-start">
                    {/* Poster */}
                    <Image
                        src={getPosterUrl(poster_path, "xl")}
                        alt={title}
                        width={300}
                        height={450}
                        className="rounded-lg w-full max-w-75 mx-auto md:mx-0"
                    />

                    {/* Info */}
                    <div>
                        <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-2">{title}</h1>

                        {tagline && (
                            <p className="text-[#888] italic mb-4">{tagline}</p>
                        )}

                        <div className="flex gap-6 text-[#888] text-sm mb-4">
                            <span>⭐ {vote_average?.toFixed(1)}</span>
                            <span>{release_date?.slice(0, 4)}</span>
                            {runtime && <span>{runtime} min</span>}
                        </div>

                        <div className="flex flex-wrap gap-2 mb-6">
                            {genres?.map((g) => (
                                <span key={g.id} className="bg-surface border border-border text-[#888] px-3 py-1 rounded text-xs">
                                    {g.name}
                                </span>
                            ))}
                        </div>

                        <p className="text-[#ccc] leading-relaxed mb-6">{overview}</p>

                        {director && (
                            <p className="text-[#888] text-sm mb-6">
                                <strong className="text-text">Director:</strong> {director.name}
                            </p>
                        )}

                        {cast.length > 0 && (
                            <div>
                                <h3 className="text-lg font-bold mb-4">Cast</h3>
                                <div className="grid grid-cols-[repeat(auto-fill,minmax(160px,1fr))] gap-2">
                                    {cast.map((actor) => (
                                        <div key={actor.id} className="bg-surface border border-border rounded p-3">
                                            <span className="block text-sm font-semibold">{actor.name}</span>
                                            <span className="block text-xs text-[#888]">{actor.character}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </main>
    );
}