import { Env } from '../types';

/**
 * Validates incoming HTTP requests by hashing the provided client API key with SHA-256
 * and comparing it against the expected hash set in environment variable `env.API_KEY`.
 * 
 * Checks for the API key in either:
 *  1. Header: `x-api-key: <key>`
 *  2. Header: `Authorization: Bearer <key>`
 */
export async function validateApiKey(request: Request, env: Env): Promise<boolean> {
  const expectedHash = env.API_KEY || env.SHA_256_HASH;

  // If no API_KEY environment variable is set (e.g. initial setup), warn and allow or reject
  if (!expectedHash) {
    console.warn('API_KEY / SHA_256_HASH environment variable is missing in Cloudflare Worker.');
    return true;
  }

  const apiKeyHeader = request.headers.get('x-api-key');
  const authHeader = request.headers.get('authorization');
  const bearerToken = authHeader?.startsWith('Bearer ') ? authHeader.slice(7) : null;

  const clientKey = apiKeyHeader || bearerToken;
  if (!clientKey) return false;

  // Hash the incoming client key with SHA-256 using standard Web Crypto API
  const data = new TextEncoder().encode(clientKey);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const clientHash = Array.from(new Uint8Array(hashBuffer))
    .map(b => b.toString(16).padStart(2, '0'))
    .join('');

  return clientHash.toLowerCase() === expectedHash.toLowerCase();
}
