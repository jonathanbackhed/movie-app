import { apiFetch } from "./client";

// https://api.themoviedb.org/3/trending/all/{time_window}
export async function getTrendingAll(timeSpan: "day" | "week", page?: number) {
  return apiFetch(`/trending/all/${timeSpan}`, `&page=${page}`);
}

// https://api.themoviedb.org/3/trending/movie/{time_window}
export async function getTrendingMovies(timeSpan: "day" | "week", page?: number) {
  return apiFetch(`/trending/movie/${timeSpan}`, `&page=${page}`);
}

// https://api.themoviedb.org/3/trending/tv/{time_window}
export async function getTrendingTV(timeSpan: "day" | "week", page?: number) {
  return apiFetch(`/trending/tv/${timeSpan}`, `&page=${page}`);
}
