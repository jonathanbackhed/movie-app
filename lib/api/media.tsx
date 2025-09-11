import { apiFetch } from "./client";

// https://api.themoviedb.org/3/movie/{movie_id}
export async function getMovieDetails(id: string) {
  return apiFetch(`/movie/${id}`);
}

// https://api.themoviedb.org/3/tv/{series_id}
export async function getSeriesDetails(id: string) {
  return apiFetch(`/tv/${id}`);
}
