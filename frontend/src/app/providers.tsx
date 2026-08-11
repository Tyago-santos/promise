import type { ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export const queryClient = new QueryClient();

type PropsType = {
  children: ReactNode;
};

export function AppProviders({ children }: PropsType) {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
