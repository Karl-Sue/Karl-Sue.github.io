const WORKER_URL = import.meta.env.VITE_WORKER_URL || 'http://localhost:8787';
const API_KEY = import.meta.env.VITE_API_KEY || '';

function getHeaders(): Record<string, string> {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };
  if (API_KEY) {
    headers['x-api-key'] = API_KEY;
  }
  return headers;
}

// Send fire-and-forget view count increment request to Cloudflare worker
export async function incrementPostViews(id: string): Promise<void> {
  if (!id) return;

  try {
    await fetch(`${WORKER_URL}/api/views/increment`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify({ id }),
    });
  } catch (error) {
    // Non-blocking: log warning only so UI render is never interrupted
    console.warn(`Failed to increment view count for post ${id}:`, error);
  }
}

export async function incrementProfileViews(): Promise<void> {
  try {
    await fetch(`${WORKER_URL}/api/profile/views`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify({ id: 'profile' }),
    });
  } catch (error) {
    console.warn("Fail to increment profile view!", error);
  }
}