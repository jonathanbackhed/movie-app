const API_KEY = process.env.EXPO_PUBLIC_API_KEY;
const BASE_URL = process.env.EXPO_PUBLIC_API_URL;

export async function apiFetch(endpoint: string, page?: number) {
  const res = await fetch(`${BASE_URL}${endpoint}?api_key=${API_KEY}${page && `&page=${page}`}`);
  if (!res.ok) {
    throw new Error(`API error: ${res.status}`);
  }

  // await new Promise((resolve) => setTimeout(resolve, 5000));
  console.log("API FETCHED", endpoint, page);

  return res.json();
}
