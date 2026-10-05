/**
 * Mariyam Maquillage Unified API Client
 * Calls full-stack Express API endpoints with transparent resilient fallback.
 */

export async function apiRequest<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const headers = {
    'Content-Type': 'application/json',
    ...(options.headers || {}),
  };

  const response = await fetch(endpoint, {
    ...options,
    headers,
  });

  if (!response.ok) {
    const errorBody = await response.json().catch(() => ({}));
    throw new Error(errorBody.error || `API request failed with HTTP ${response.status}`);
  }

  return response.json();
}
