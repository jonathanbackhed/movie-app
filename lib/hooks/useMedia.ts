import { useQuery } from "@tanstack/react-query";
import { getMovieDetails, getSeriesDetails } from "../api/media";

export function useMediaDetails(type: "movie" | "tv", id: string) {
  return useQuery({
    staleTime: 1000 * 60 * 5, // 5 minuter
    queryKey: ["mediaDetails", type, id],
    queryFn: () => (type === "movie" ? getMovieDetails(id) : getSeriesDetails(id)),
    enabled: !!type && !!id,
  });
}
