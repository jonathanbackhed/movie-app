import { useQueries, UseQueryResult } from "@tanstack/react-query";
import { getPersonDetails, getPersonCredits, getPersonExternals, getPersonImages } from "../api/person";
import { Person, PersonCredits, PersonExternalIds, PersonImages } from "@/interfaces";

const STALE_TIME = 1000 * 60 * 5; // 5 minutes

export function usePersonDetails(
  id: string
): [
  UseQueryResult<Person>,
  UseQueryResult<PersonCredits>,
  UseQueryResult<PersonExternalIds>,
  UseQueryResult<PersonImages>
] {
  return useQueries({
    queries: [
      {
        staleTime: STALE_TIME,
        queryKey: ["personDetails", id],
        queryFn: () => getPersonDetails(id),
        enabled: !!id,
      },
      {
        staleTime: STALE_TIME,
        queryKey: ["personCredits", id],
        queryFn: () => getPersonCredits(id),
        enabled: !!id,
      },
      {
        staleTime: STALE_TIME,
        queryKey: ["personExternals", id],
        queryFn: () => getPersonExternals(id),
        enabled: !!id,
      },
      {
        staleTime: STALE_TIME,
        queryKey: ["personImages", id],
        queryFn: () => getPersonImages(id),
        enabled: !!id,
      },
    ],
  });
}
