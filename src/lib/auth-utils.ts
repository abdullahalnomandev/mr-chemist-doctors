import { jwtDecode } from "jwt-decode";

// Function to check if token is expired
export function isTokenExpired(token: string): boolean {
  try {
    const decoded = jwtDecode(token);
    const currentTime = Date.now() / 1000;

    if (decoded.exp && decoded.exp < currentTime) {
      return true;
    }

    return false;
  } catch (error) {
    console.error("Error decoding token:", error);
    return true; // If we can't decode the token, consider it expired
  }
}

// Function to handle API requests with authentication
export async function authenticatedFetch(url: string, options: RequestInit = {}, session: any) {
  if (!session || !session.accessToken) {
    throw new Error("No authentication token available");
  }

  // Check if token is expired
  if (isTokenExpired(session.accessToken)) {
    // Token is expired, redirect to login or refresh token
    // This is a simplified approach - you might want to implement token refresh logic
    throw new Error("Authentication token expired");
  }

  // Add authorization header
  const headers = {
    ...options.headers,
    Authorization: `Bearer ${session.accessToken}`,
  };

  // Make the request
  return fetch(url, {
    ...options,
    headers,
    credentials: "include", // Include cookies for refresh token
  });
}
