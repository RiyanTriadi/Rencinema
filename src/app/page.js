import {
  getNowPlayingMovies,
  getTopRatedMovies,
  getPopularMovies,
  getRandomMovie,
} from "@/lib/tmdb";
import HeroSlider from "@/components/HeroSlider";
import TopMovies from "@/components/TopMovies";
import PopularMovies from "@/components/PopularMovies";
import RandomPick from "@/components/RandomPick";

export const metadata = {
  title: "MovieDB - Discover Movies",
  description: "Find now playing, top rated, and popular movies",
};

export default async function HomePage() {
  const [nowPlaying, topRated, popular, randomMovie] = await Promise.all([
    getNowPlayingMovies(),
    getTopRatedMovies(),
    getPopularMovies(),
    getRandomMovie(),
  ]);

  return (
    <main>
      <HeroSlider movies={nowPlaying} />
      <TopMovies movies={topRated} />
      <PopularMovies movies={popular.slice(0, 12)} />
      <RandomPick initialMovie={randomMovie} />
    </main>
  );
}