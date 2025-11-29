import { QueryClient } from "@tanstack/react-query";

let queryClient: QueryClient;

export function getQueryClient() {
  if (!queryClient) {
    queryClient = new QueryClient({
      defaultOptions: {
        queries: {
          staleTime: 5 * 60 * 1000, // 5 minutes
          gcTime: 10 * 60 * 1000, // new name in v5 (was cacheTime)
          retry: 2,
          refetchOnWindowFocus: false,
          refetchOnReconnect: true,
          refetchOnMount: false,
        },
        mutations: {
          retry: false,
        },
      },
    });
  }
  return queryClient;
}
