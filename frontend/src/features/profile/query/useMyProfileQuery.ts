import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getMyProfile, type Profile } from "@/features/profile/api/profile";
import { isAuthenticated } from "@/features/auth/services/authService";

export const myProfileQueryKey = ["profile", "me"] as const;

export function useMyProfileQuery() {
  return useQuery({
    queryKey: myProfileQueryKey,
    queryFn: getMyProfile,
    enabled: isAuthenticated(),
  });
}

export function useInvalidateMyProfile() {
  const queryClient = useQueryClient();
  return () => queryClient.invalidateQueries({ queryKey: myProfileQueryKey });
}

export type { Profile };
