import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { getSearchAll } from "../api/search";

export function useSearchAll(query: string) {
  const [debouncedQuery, setDebouncedQuery] = useState(query);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(query);
    }, 1000);

    return () => clearTimeout(handler);
  }, [query]);

  return useQuery({
    staleTime: 1000 * 60 * 5, // 5 minuter
    queryKey: ["search", debouncedQuery],
    queryFn: () => getSearchAll(debouncedQuery, 1),
    enabled: !!debouncedQuery && debouncedQuery.length > 2,
    placeholderData: (previousData) => previousData,
  });
}
