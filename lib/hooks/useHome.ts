import { useQueries, UseQueryResult } from "@tanstack/react-query";
import {
  getNowPlayingMovies,
  getTopRatedMovies,
  getUpcomingTheaterMovies,
  getUpcomingTV,
  getTopRatedTV,
} from "../api/home";
import { MovieShort, PaginatedResponse, SeriesShort } from "@/interfaces";

const STALE_TIME = 1000 * 60 * 10; // 10 minutes

export function useHomeData(): [
  UseQueryResult<PaginatedResponse<MovieShort>>,
  UseQueryResult<PaginatedResponse<MovieShort>>,
  UseQueryResult<PaginatedResponse<SeriesShort>>,
  UseQueryResult<PaginatedResponse<MovieShort>>,
  UseQueryResult<PaginatedResponse<SeriesShort>>
] {
  return useQueries({
    queries: [
      {
        staleTime: STALE_TIME,
        queryKey: ["homeNowPlaying"],
        queryFn: () => getNowPlayingMovies(),
      },
      {
        staleTime: STALE_TIME,
        queryKey: ["homeUpcomingTheaterMovies"],
        queryFn: () => getUpcomingTheaterMovies(),
      },
      {
        staleTime: STALE_TIME,
        queryKey: ["homeUpcomingTV"],
        queryFn: () => getUpcomingTV(),
      },
      {
        staleTime: Infinity,
        queryKey: ["homeTopRatedMovies"],
        queryFn: () => getTopRatedMovies(),
      },
      {
        staleTime: Infinity,
        queryKey: ["homeTopRatedTV"],
        queryFn: () => getTopRatedTV(),
      },
    ],
  });
}
