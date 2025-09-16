import { apiFetch } from "./client";

// https://api.themoviedb.org/3/movie/{movie_id}
export async function getMovieDetails(id: string) {
  return apiFetch(`/movie/${id}`);
}

// https://api.themoviedb.org/3/movie/{movie_id}/credits
export async function getMovieCredits(id: string) {
  return apiFetch(`/movie/${id}/credits`);
}

// https://api.themoviedb.org/3/movie/{movie_id}/images
export async function getMovieImages(id: string) {
  return apiFetch(`/movie/${id}/images`, "&language=en");
}

// https://api.themoviedb.org/3/movie/{movie_id}/recommendations
export async function getMovieRecommendations(id: string) {
  return apiFetch(`/movie/${id}/recommendations`);
}

// https://api.themoviedb.org/3/movie/{movie_id}/reviews
export async function getMovieReviews(id: string) {
  return apiFetch(`/movie/${id}/reviews`);
}

// https://api.themoviedb.org/3/movie/{movie_id}/watch/providers
export async function getMovieProviders(id: string) {
  return apiFetch(`/movie/${id}/watch/providers`);
}

// https://api.themoviedb.org/3/tv/{series_id}
export async function getSeriesDetails(id: string) {
  return apiFetch(`/tv/${id}`);
}

// https://api.themoviedb.org/3/tv/{series_id}/credits
export async function getSeriesCredits(id: string) {
  return apiFetch(`/tv/${id}/credits`);
}

// https://api.themoviedb.org/3/tv/{series_id}/images
export async function getSeriesImages(id: string) {
  return apiFetch(`/tv/${id}/images`, "&language=en");
}

// https://api.themoviedb.org/3/tv/{series_id}/recommendations
export async function getSeriesRecommendations(id: string) {
  return apiFetch(`/tv/${id}/recommendations`);
}

// https://api.themoviedb.org/3/tv/{series_id}/reviews
export async function getSeriesReviews(id: string) {
  return apiFetch(`/tv/${id}/reviews`);
}

// https://api.themoviedb.org/3/tv/{series_id}/watch/providers
export async function getSeriesProviders(id: string) {
  return apiFetch(`/tv/${id}/watch/providers`);
}

// https://api.themoviedb.org/3/tv/{series_id}/season/{season_number}
export async function getSeriesSeasonDetails(id: string, seasonNumber: number) {
  return apiFetch(`/tv/${id}/season/${seasonNumber}`);
}
