import { getTrendingAll, getTrendingMovies, getTrendingTV } from "@/lib/api/trending";
import { useInfiniteQuery } from "@tanstack/react-query";

const STALE_TIME = 1000 * 60 * 10; // 10 minutes

// index 0 = all, 1 = movies, 2 = tv, comes from SegmentedControl
export function useTrending(index: number) {
  return useInfiniteQuery({
    staleTime: STALE_TIME,
    queryKey: ["trending", index],
    initialPageParam: 1,
    queryFn: ({ pageParam }) =>
      index === 0
        ? getTrendingAll("week", pageParam)
        : index === 1
        ? getTrendingMovies("week", pageParam)
        : getTrendingTV("week", pageParam),
    getNextPageParam: (lastPage) => {
      if (lastPage.page < lastPage.total_pages) {
        return lastPage.page + 1;
      }
      return null;
    },
  });
}
