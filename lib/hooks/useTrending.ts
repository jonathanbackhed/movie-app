import { getTrendingAll } from "@/lib/api/trending";
import { useQuery } from "@tanstack/react-query";

export function useTrendingAll() {
  return useQuery({
    staleTime: Infinity,
    queryKey: ["trendingAll"],
    queryFn: () => getTrendingAll("week"),
  });
}
