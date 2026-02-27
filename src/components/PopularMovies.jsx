import MovieCard from "./MovieCard";

export default function PopularMovies({ movies }) {
    return (
        <section className="py-16 bg-surface">
            <div className="max-w-7xl mx-auto px-6">
                <h2 className="text-3xl font-bold mb-8 pl-4 relative before:absolute before:left-0 before:top-0 before:bottom-0 before:w-1 before:bg-primary before:rounded">
                    Popular Movies
                </h2>
                <div className="grid grid-cols-[repeat(auto-fill,minmax(160px,1fr))] gap-5">
                    {movies.map((movie) => (
                        <MovieCard key={movie.id} movie={movie} />
                    ))}
                </div>
            </div>
        </section>
    );
}