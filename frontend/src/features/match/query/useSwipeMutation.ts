import { useMutation, useQueryClient } from "@tanstack/react-query";
import { swipe } from "@/features/match/api/matches";

export function useSwipeMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ targetId, liked }: { targetId: number; liked: boolean }) => swipe(targetId, liked),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["match", "discover"] });
    },
  });
}
