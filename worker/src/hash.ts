const BASE62_ALPHABET = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';

/**
 * Deterministically hashes an input string into a Base62 string using SHA-256.
 * Guaranteed to return the exact same output for the same input string.
 */
export async function hash62(input: string): Promise<string> {
  if (!input) return '';

  const encoder = new TextEncoder();
  const data = encoder.encode(input);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = new Uint8Array(hashBuffer);

  let bigint = BigInt(0);
  for (let i = 0; i < hashArray.length; i++) {
    bigint = (bigint << BigInt(8)) + BigInt(hashArray[i]);
  }

  if (bigint === BigInt(0)) {
    return '0';
  }

  let result = '';
  const base = BigInt(62);
  while (bigint > BigInt(0)) {
    const remainder = Number(bigint % base);
    result = BASE62_ALPHABET[remainder] + result;
    bigint = bigint / base;
  }

  return result;
}
