import { useQuery } from "@tanstack/react-query";
import { getProfileById } from "@/features/profile/api/profile";

export function useProfileQuery(id: number) {
  return useQuery({
    queryKey: ["profile", id],
    queryFn: () => getProfileById(id),
    enabled: Number.isFinite(id),
  });
}
