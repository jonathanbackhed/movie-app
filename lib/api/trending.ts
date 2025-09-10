import { apiFetch } from "./client";

export async function getTrendingAll(timeSpan: "day" | "week", page?: number) {
  return apiFetch(`/trending/all/${timeSpan}`, page);
}
