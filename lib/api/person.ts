import { apiFetch } from "./client";

// https://api.themoviedb.org/3/person/{person_id}
export async function getPersonDetails(id: string) {
  return apiFetch(`/person/${id}`);
}

// https://api.themoviedb.org/3/person/{person_id}/combined_credits
export async function getPersonCredits(id: string) {
  return apiFetch(`/person/${id}/combined_credits`);
}

// https://api.themoviedb.org/3/person/{person_id}/external_ids
export async function getPersonExternals(id: string) {
  return apiFetch(`/person/${id}/external_ids`);
}

// https://api.themoviedb.org/3/person/{person_id}/images
export async function getPersonImages(id: string) {
  return apiFetch(`/person/${id}/images`);
}
