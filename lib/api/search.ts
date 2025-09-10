import { apiFetch } from "./client";

// https://api.themoviedb.org/3/search/multi?query=modern%20fam&include_adult=true&language=en-US&page=1
export async function getSearchAll(query: string, page: number) {
  return apiFetch(`/search/multi`, `&query=${query}&page=${page}&include_adult=true&language=en-US`);
}
