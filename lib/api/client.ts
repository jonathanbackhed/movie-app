const API_KEY = process.env.EXPO_PUBLIC_API_KEY;
const BASE_URL = process.env.EXPO_PUBLIC_API_URL ?? "https://api.themoviedb.org/3";

export async function apiFetch(path: string, query?: string) {
  const res = await fetch(`${BASE_URL}${path}?api_key=${API_KEY}${query ? query : ""}`);
  if (!res.ok) {
    throw new Error(`API error: ${res.status}`);
  }

  // await new Promise((resolve) => setTimeout(resolve, 5000));
  console.log("API FETCHED", path, query);

  return res.json();
}
