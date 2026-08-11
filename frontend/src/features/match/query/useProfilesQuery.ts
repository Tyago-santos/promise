import { useQuery } from "@tanstack/react-query";
import { listDiscoverable } from "@/features/match/api/matches";

export function useProfilesQuery(enabled: boolean = true) {
  return useQuery({
    queryKey: ["match", "discover"],
    queryFn: listDiscoverable,
    initialData: [],
    enabled,
  });
}
