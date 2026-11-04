// src/libraries/wordpress.ts - Automated REST API Core Engine

const WP_BASE_URL = (import.meta.env.VITE_WP_BASE_URL || 'https://cms.clean-africa.org').replace(/\/$/, '');

export class WPApiError extends Error {
  status: number;
  constructor(status: number, statusText: string) {
    super(`[WordPress API Error] HTTP ${status}: ${statusText}`);
    this.status = status;
  }
}

export async function wpFetch<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const cleanEndpoint = endpoint.replace(/^\//, '');

  // Split path from query string and rebuild using ?rest_route= format
  const [path, queryString] = cleanEndpoint.split('?');
  const targetUrl = queryString
    ? `${WP_BASE_URL}/?rest_route=/wp/v2/${path}&${queryString}`
    : `${WP_BASE_URL}/?rest_route=/wp/v2/${path}`;

  // For write methods include Content-Type; for GET send no custom headers at all
  // so the browser treats it as a simple request — no preflight, no WAF block.
  const isWriteMethod = options.method && options.method !== 'GET';
  const extraHeaders: Record<string, string> = isWriteMethod
    ? { 'Content-Type': 'application/json' }
    : {};

  try {
    const response = await fetch(targetUrl, {
      ...options,
      credentials: 'omit',
      headers: {
        ...extraHeaders,
        ...options.headers,
      },
    });

    if (!response.ok) {
      throw new WPApiError(response.status, response.statusText);
    }

    return await response.json() as T;
  } catch (error) {
    console.error(`Failed to execute wpFetch at endpoint: ${endpoint}`, error);
    throw error;
  }
}
