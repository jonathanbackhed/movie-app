// const API_TOKEN = process.env.EXPO_PUBLIC_TOKEN;
const API_KEY = process.env.EXPO_PUBLIC_API_KEY;
const BASE_URL = process.env.EXPO_PUBLIC_API_URL;

export async function apiFetch(endpoint: string) {
  const res = await fetch(`${BASE_URL}${endpoint}?api_key=${API_KEY}`);
  if (!res.ok) {
    throw new Error(`API error: ${res.status}`);
  }

  // add 5 second delay before returning
  // await new Promise((resolve) => setTimeout(resolve, 5000));
  console.log("API FETCHED", endpoint);

  return res.json();
}
