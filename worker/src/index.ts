import { connectToDatabase } from './db';
import { Env, PostAnalyticsDoc } from '../types';
import { hash62 } from './hash';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

export default {
  async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    const url = new URL(request.url);

    // Handle CORS preflight requests
    if (request.method === 'OPTIONS') {
      return new Response(null, {
        status: 204,
        headers: corsHeaders,
      });
    }

    if (url.pathname === '/favicon.ico') {
      return new Response(null, { status: 204 });
    }

    try {
      const db = await connectToDatabase(env);

      // Route: Increment view count for post (/api/views/increment) or profile (/api/profile/views)
      if (url.pathname === '/api/views/increment' || url.pathname === '/api/profile/views') {
        if (request.method !== 'POST') {
          return new Response(
            JSON.stringify({ status: 'error', message: 'Method not allowed' }),
            { status: 405, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
          );
        }

        let body: { id?: string } = {};
        try {
          body = await request.json() as { id?: string };
        } catch (_) {}

        const rawId = body?.id || (url.pathname === '/api/profile/views' ? 'profile' : undefined);

        if (!rawId || typeof rawId !== 'string') {
          return new Response(
            JSON.stringify({ status: 'error', message: 'Missing or invalid id' }),
            { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
          );
        }

        // Hash the id using hash62 (SHA-256 + Base62)
        const hashedId = await hash62(rawId);

        const todayStr = new Date().toISOString().split('T')[0]; // Format: YYYY-MM-DD
        const now = new Date();

        // Increment count in MongoDB using hashed id as key
        const collection = db.collection<PostAnalyticsDoc>('post_analytics');

        const result = await collection.findOneAndUpdate(
          { _id: hashedId },
          {
            $inc: {
              count: 1,
              [`dailyViews.${todayStr}`]: 1,
            },
            $set: {
              lastViewedAt: now,
            },
            $setOnInsert: {
              _id: hashedId,
              firstViewedAt: now,
            },
          },
          { upsert: true, returnDocument: 'after' }
        );

        // Extract document gracefully across driver versions
        const doc = (result && 'value' in result && result.value) 
          ? (result.value as PostAnalyticsDoc | null) 
          : (result as PostAnalyticsDoc | null);
        const currentCount = doc?.count ?? 1;

        return new Response(
          JSON.stringify({
            status: 'success',
            hashedId,
            count: currentCount,
          }),
          {
            status: 200,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          }
        );
      }


      // Default debug endpoint
      const collections = await db.listCollections().toArray();
      const collectionNames = collections.map(c => c.name);

      return new Response(
        JSON.stringify({
          status: 'success',
          message: 'Connected to MongoDB!',
          collections: collectionNames,
        }),
        {
          status: 200,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    } catch (error: any) {
      console.error('Worker error:', error);
      return new Response(
        JSON.stringify({
          status: 'error',
          message: error.message || 'Internal worker error',
        }),
        {
          status: 500,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    }
  },
};
