import { apiFetch } from "./client";

// https://api.themoviedb.org/3/movie/now_playing
export async function getNowPlayingMovies() {
  return apiFetch(`/movie/now_playing`, "&region=US");
}

// https://api.themoviedb.org/3/movie/top_rated
export async function getTopRatedMovies() {
  return apiFetch(`/movie/top_rated`, "&region=US");
}

export async function getUpcomingTheaterMovies() {
  let date = new Date();
  date.setDate(date.getDate() + 1);
  const from = date.toLocaleDateString("sv-SE");
  date.setMonth(date.getMonth() + 3);
  const to = date.toLocaleDateString("sv-SE");

  return apiFetch(
    `/discover/movie`,
    `&sort_by=popularity.desc&region=US&primary_release_date.gte=${from}&primary_release_date.lte=${to}&with_release_type=3`
  );
}

// https://api.themoviedb.org/3/tv/top_rated
export async function getTopRatedTV() {
  return apiFetch(`/tv/top_rated`);
}

export async function getUpcomingTV() {
  let date = new Date();
  date.setDate(date.getDate() + 1);
  const from = date.toLocaleDateString("sv-SE");
  date.setMonth(date.getMonth() + 3);
  const to = date.toLocaleDateString("sv-SE");

  return apiFetch(
    `/discover/tv`,
    `&sort_by=popularity.desc&with_type=4|2|0|3&first_air_date.gte=${from}&first_air_date.lte=${to}&watch_region=US&with_watch_monetization_types=flatrate|ads`
  );
}
