import { apiFetch } from "./client";

export async function getTrendingAll(timeSpan: "day" | "week") {
  return apiFetch(`/trending/all/${timeSpan}`);
}
