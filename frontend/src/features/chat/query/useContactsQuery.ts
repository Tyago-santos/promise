import { useQuery } from "@tanstack/react-query";
import { listContacts, type ChatContact } from "@/features/chat/api/contacts";
import { isAuthenticated } from "@/features/auth/services/authService";

export const contactsQueryKey = ["chat", "contacts"] as const;

export function useContactsQuery() {
  return useQuery({
    queryKey: contactsQueryKey,
    queryFn: listContacts,
    initialData: [] as ChatContact[],
    enabled: isAuthenticated(),
    refetchInterval: 15000,
  });
}
