import { useQueries } from "@tanstack/react-query";
import {
  getNowPlayingMovies,
  getTopRatedMovies,
  getUpcomingMovies,
  getUpcomingTV,
  getTopRatedTV,
} from "../api/home";

const STALE_TIME = 1000 * 60 * 10; // 10 minutes

export function useHomeData() {
  return useQueries({
    queries: [
      {
        staleTime: STALE_TIME,
        queryKey: ["homeNowPlaying"],
        queryFn: () => getNowPlayingMovies(),
      },
      {
        staleTime: STALE_TIME,
        queryKey: ["homeUpcomingMovies"],
        queryFn: () => getUpcomingMovies(),
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
