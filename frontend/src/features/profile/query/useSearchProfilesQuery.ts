import { useQuery } from "@tanstack/react-query";
import { searchProfiles } from "@/features/profile/api/profile";

export function useSearchProfilesQuery(query: string) {
  const trimmed = query.trim();

  return useQuery({
    queryKey: ["profiles", "search", trimmed],
    queryFn: () => searchProfiles(trimmed),
    enabled: trimmed.length > 0,
    initialData: [],
  });
}
