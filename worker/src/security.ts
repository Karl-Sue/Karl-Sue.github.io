import { Env } from '../types';


/**
 * Validates incoming HTTP requests against the API_KEY environment variable.
 * Checks for the API key in either:
 *  1. Header: `x-api-key: <key>`
 *  2. Header: `Authorization: Bearer <key>`
 */
export function validateApiKey(request: Request, env: Env): boolean {
  const expectedKey = env.API_KEY;

  // If no API_KEY environment variable is set (e.g. initial setup), reject or fallback
  if (!expectedKey) {
    console.warn('API_KEY environment variable is missing in Cloudflare Worker.');
    return true; // Set to false if you want strict rejection when env var is omitted
  }

  const apiKeyHeader = request.headers.get('x-api-key');
  const authHeader = request.headers.get('authorization');
  const bearerToken = authHeader?.startsWith('Bearer ') ? authHeader.slice(7) : null;

  const clientKey = apiKeyHeader || bearerToken;

  return Boolean(clientKey && clientKey === expectedKey);
}
