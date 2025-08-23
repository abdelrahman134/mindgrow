import { QueryClient, QueryFunction } from "@tanstack/react-query";

async function throwIfResNotOk(res: Response) {
  if (!res.ok) {
    const text = (await res.text()) || res.statusText;
    throw new Error(`${res.status}: ${text}`);
  }
}

// Compute API base URL once. If we're on HTTPS and the env base is HTTP,
// prefer same-origin (empty base) to avoid mixed content and CORS failures.
const RAW_API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '';
const API_BASE_URL =
  typeof window !== 'undefined' && window.location.protocol === 'https:' && RAW_API_BASE_URL.startsWith('http://')
    ? ''
    : RAW_API_BASE_URL;

export async function apiRequest(
  url: string,
  options?: { method?: string; body?: any; headers?: Record<string, string> },
): Promise<Response> {
  // Prepend the API base URL if the URL doesn't start with http
  const fullUrl = url.startsWith('http') ? url : `${API_BASE_URL}${url.startsWith('/') ? '' : '/'}${url}`;
  
  const res = await fetch(fullUrl, {
    method: options?.method || 'GET',
    headers: {
      "Content-Type": "application/json",
      ...options?.headers
    },
    body: options?.body ? JSON.stringify(options.body) : undefined,
    credentials: "include",
  });

  await throwIfResNotOk(res);
  return res;
}

type UnauthorizedBehavior = "returnNull" | "throw";
export const getQueryFn: <T>(options: {
  on401: UnauthorizedBehavior;
}) => QueryFunction<T> =
  ({ on401: unauthorizedBehavior }) =>
  async ({ queryKey }) => {
    const rawUrl = queryKey[0] as string;
    const fullUrl = rawUrl.startsWith('http') ? rawUrl : `${API_BASE_URL}${rawUrl.startsWith('/') ? '' : '/'}${rawUrl}`;
    const res = await fetch(fullUrl, {
      credentials: "include",
    });

    if (unauthorizedBehavior === "returnNull" && res.status === 401) {
      return null;
    }

    await throwIfResNotOk(res);
    return await res.json();
  };

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      queryFn: getQueryFn({ on401: "throw" }),
      refetchInterval: false,
      refetchOnWindowFocus: false,
      staleTime: Infinity,
      retry: false,
    },
    mutations: {
      retry: false,
    },
  },
});
