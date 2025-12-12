import { getCookie } from "@/services/auth/tokenHandler";

const NEXT_PUBLIC_SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL;

export const serverFetchHelper = async (endPoint: string, options: RequestInit = {}) => {
  const { headers, ...restOptions } = options;

  // Get token from cookie
  const accessToken = await getCookie("accessToken");

  const response = await fetch(`${NEXT_PUBLIC_SERVER_URL}${endPoint}`, {
    ...restOptions,
    headers: {
      ...headers,
      // Use Authorization header instead of Cookie
      ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
      "Content-Type": "application/json",
    },
    credentials: "include", // optional, only needed if you still rely on cookies for anything else
  });

  return response;
};

export const serverFetch = {
  get: async (endpoint: string, options: RequestInit = {}) =>
    serverFetchHelper(endpoint, { ...options, method: "GET" }),

  post: async (endpoint: string, options: RequestInit = {}) =>
    serverFetchHelper(endpoint, { ...options, method: "POST" }),

  put: async (endpoint: string, options: RequestInit = {}) =>
    serverFetchHelper(endpoint, { ...options, method: "PUT" }),

  patch: async (endpoint: string, options: RequestInit = {}) =>
    serverFetchHelper(endpoint, { ...options, method: "PATCH" }),

  delete: async (endpoint: string, options: RequestInit = {}) =>
    serverFetchHelper(endpoint, { ...options, method: "DELETE" }),
};
