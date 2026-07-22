import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // Data remains fresh for 1 minute; prevents immediate back-to-back refetches
      staleTime: 1000 * 60 * 1,

      // Inactive data stays in cache for 5 minutes before garbage collection
      gcTime: 1000 * 60 * 5,

      // Only retry failed requests twice (instead of the default 3)
      retry: 2,

      // Turn off automatic background refetching when switching browser tabs
      refetchOnWindowFocus: false,

      // Keep previous data on screen while fetching new data for a seamless UI transition
      placeholderData: (previousData: unknown) => previousData,
    },
    mutations: {
      // Retry mutations only once if they fail due to network hiccups
      retry: 1,
    },
  },
});
