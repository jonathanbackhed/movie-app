import { useQueries } from "@tanstack/react-query";
import {
  getMovieDetails,
  getMovieCredits,
  getMovieImages,
  getMovieRecommendations,
  getMovieSimilar,
  getMovieReviews,
  getMovieProviders,
  getSeriesDetails,
  getSeriesCredits,
  getSeriesImages,
  getSeriesRecommendations,
  getSeriesSimilar,
  getSeriesReviews,
  getSeriesProviders,
} from "../api/media";

const STALE_TIME = 1000 * 60 * 5; // 5 minuter

export function useFullMediaDetails(type: "movie" | "tv", id: string) {
  return useQueries({
    queries: [
      {
        staleTime: STALE_TIME,
        queryKey: ["mediaDetails", type, id],
        queryFn: () => (type === "movie" ? getMovieDetails(id) : getSeriesDetails(id)),
        enabled: !!type && !!id,
      },
      {
        staleTime: STALE_TIME,
        queryKey: ["mediaCredits", type, id],
        queryFn: () => (type === "movie" ? getMovieCredits(id) : getSeriesCredits(id)),
        enabled: !!type && !!id,
      },
      {
        staleTime: STALE_TIME,
        queryKey: ["mediaImages", type, id],
        queryFn: () => (type === "movie" ? getMovieImages(id) : getSeriesImages(id)),
        enabled: !!type && !!id,
      },
      // {
      //   staleTime: STALE_TIME,
      //   queryKey: ["mediaRecommendations", type, id],
      //   queryFn: () => (type === "movie" ? getMovieRecommendations(id) : getSeriesRecommendations(id)),
      //   enabled: !!type && !!id,
      // },
      // {
      //   staleTime: STALE_TIME,
      //   queryKey: ["mediaSimilar", type, id],
      //   queryFn: () => (type === "movie" ? getMovieSimilar(id) : getSeriesSimilar(id)),
      //   enabled: !!type && !!id,
      // },
      // {
      //   staleTime: STALE_TIME,
      //   queryKey: ["mediaReviews", type, id],
      //   queryFn: () => (type === "movie" ? getMovieReviews(id) : getSeriesReviews(id)),
      //   enabled: !!type && !!id,
      // },
      // {
      //   staleTime: STALE_TIME,
      //   queryKey: ["mediaProviders", type, id],
      //   queryFn: () => (type === "movie" ? getMovieProviders(id) : getSeriesProviders(id)),
      //   enabled: !!type && !!id,
      // },
    ],
  });
}
