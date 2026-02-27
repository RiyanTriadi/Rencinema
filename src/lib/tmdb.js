const BASE_URL = "https://api.themoviedb.org/3";
const IMAGE_BASE_URL = "https://image.tmdb.org/t/p";

export const IMAGE_SIZES = {
  poster: {
    sm: `${IMAGE_BASE_URL}/w185`,
    md: `${IMAGE_BASE_URL}/w342`,
    lg: `${IMAGE_BASE_URL}/w500`,
    xl: `${IMAGE_BASE_URL}/w780`,
  },
  backdrop: {
    sm: `${IMAGE_BASE_URL}/w300`,
    md: `${IMAGE_BASE_URL}/w780`,
    lg: `${IMAGE_BASE_URL}/w1280`,
    original: `${IMAGE_BASE_URL}/original`,
  },
};

async function fetchTMDB(endpoint, params = {}) {
  const url = new URL(`${BASE_URL}${endpoint}`);
  url.searchParams.set("language", "en-US");

  Object.entries(params).forEach(([key, value]) => {
    url.searchParams.set(key, value);
  });

  const res = await fetch(url.toString(), {
    headers: {
      Authorization: `Bearer ${process.env.TMDB_ACCESS_TOKEN}`,
      "Content-Type": "application/json",
    },
    next: { revalidate: 3600 },
  });

  if (!res.ok) {
    throw new Error(`TMDB API Error: ${res.status} ${res.statusText}`);
  }

  return res.json();
}

export async function getNowPlayingMovies() {
  const data = await fetchTMDB("/movie/now_playing");
  return data.results.slice(0, 8);
}

export async function getTopRatedMovies() {
  const data = await fetchTMDB("/movie/top_rated");
  return data.results.slice(0, 5);
}

export async function getPopularMovies(page = 1) {
  const data = await fetchTMDB("/movie/popular", { page });
  return data.results;
}

export async function getMovieDetails(id) {
  return fetchTMDB(`/movie/${id}`, { append_to_response: "credits" });
}

export async function getRandomMovie() {
  const randomPage = Math.floor(Math.random() * 10) + 1;
  const data = await fetchTMDB("/movie/popular", { page: randomPage });
  const randomIndex = Math.floor(Math.random() * data.results.length);
  return data.results[randomIndex];
}

export function getPosterUrl(path, size = "md") {
  if (!path) return "/placeholder-poster.jpg";
  return `${IMAGE_SIZES.poster[size]}${path}`;
}

export function getBackdropUrl(path, size = "lg") {
  if (!path) return "/placeholder-backdrop.jpg";
  return `${IMAGE_SIZES.backdrop[size]}${path}`;
}

export async function searchMovies(query, page = 1) {
  if (!query?.trim()) return { results: [], total_results: 0, total_pages: 0 };
  const data = await fetchTMDB("/search/movie", { query: query.trim(), page });
  return {
    results: data.results,
    total_results: data.total_results,
    total_pages: data.total_pages,
  };
}