import { useQueries, useQuery, UseQueryResult } from "@tanstack/react-query";
import {
  getMovieDetails,
  getMovieCredits,
  getMovieImages,
  getMovieRecommendations,
  getMovieReviews,
  getMovieProviders,
  getSeriesDetails,
  getSeriesCredits,
  getSeriesImages,
  getSeriesRecommendations,
  getSeriesReviews,
  getSeriesProviders,
  getSeriesSeasonDetails,
} from "../api/media";
import { Credits, Images, Movie, Providers, Recommendations, Reviews, SeasonFull, TVSeries } from "@/interfaces";

const STALE_TIME = 1000 * 60 * 5; // 5 minutes

export function useFullMediaDetails(
  type: "movie" | "tv",
  id: string
): [
  UseQueryResult<Movie | TVSeries>,
  UseQueryResult<Credits>,
  UseQueryResult<Images>,
  UseQueryResult<Recommendations>,
  UseQueryResult<Reviews>,
  UseQueryResult<Providers>
] {
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
      {
        staleTime: STALE_TIME,
        queryKey: ["mediaRecommendations", type, id],
        queryFn: () => (type === "movie" ? getMovieRecommendations(id) : getSeriesRecommendations(id)),
        enabled: !!type && !!id,
      },
      {
        staleTime: STALE_TIME,
        queryKey: ["mediaReviews", type, id],
        queryFn: () => (type === "movie" ? getMovieReviews(id) : getSeriesReviews(id)),
        enabled: !!type && !!id,
      },
      {
        staleTime: STALE_TIME,
        queryKey: ["mediaProviders", type, id],
        queryFn: () => (type === "movie" ? getMovieProviders(id) : getSeriesProviders(id)),
        enabled: !!type && !!id,
      },
    ],
  });
}

export function useSeasonEpisodes(
  id: number,
  seasonNumber: number,
  enabled: boolean = false
): UseQueryResult<SeasonFull> {
  return useQuery({
    staleTime: STALE_TIME,
    queryKey: ["seasonEpisodes", id, seasonNumber],
    queryFn: () => getSeriesSeasonDetails(id, seasonNumber),
    enabled: !!id && !!seasonNumber && seasonNumber > 0 && enabled,
  });
}
