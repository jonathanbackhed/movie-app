import { getTrendingAll } from "@/lib/api/trending";
import { useInfiniteQuery } from "@tanstack/react-query";

export function useTrendingAll() {
  return useInfiniteQuery({
    staleTime: Infinity,
    queryKey: ["trendingAll"],
    initialPageParam: 1,
    queryFn: ({ pageParam }) => getTrendingAll("week", pageParam),
    getNextPageParam: (lastPage) => {
      if (lastPage.page < lastPage.total_pages) {
        return lastPage.page + 1;
      }
      return null;
    },
  });
}
