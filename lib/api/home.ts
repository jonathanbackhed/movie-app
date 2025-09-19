import { apiFetch } from "./client";

// https://api.themoviedb.org/3/movie/now_playing
export async function getNowPlayingMovies() {
  return apiFetch(`/movie/now_playing`, "&region=US");
}

// https://api.themoviedb.org/3/movie/top_rated
export async function getTopRatedMovies() {
  return apiFetch(`/movie/top_rated`, "&region=US");
}

export async function getUpcomingMovies() {
  let date = new Date();
  const from = date.toISOString().split("T")[0];
  date.setMonth(date.getMonth() + 1);
  const to = date.toISOString().split("T")[0];

  return apiFetch(
    `/discover/movie`,
    `&include_adult=true&page=1&sort_by=popularity.desc&with_release_type=1|2|3|6|4&primary_release_date.gte=${from}&primary_release_date.lte=${to}&region=US&primary_release_year=2025`
  );
}

// https://api.themoviedb.org/3/tv/top_rated
export async function getTopRatedTV() {
  return apiFetch(`/tv/top_rated`);
}

export async function getUpcomingTV() {
  let date = new Date();
  const from = date.toISOString().split("T")[0];
  date.setMonth(date.getMonth() + 1);
  const to = date.toISOString().split("T")[0];

  return apiFetch(
    `/discover/tv`,
    `&include_adult=true&page=1&sort_by=popularity.desc&with_type=4|2|0|3&air_date.gte=${from}&air_date.lte=${to}&watch_region=US`
  );
}
