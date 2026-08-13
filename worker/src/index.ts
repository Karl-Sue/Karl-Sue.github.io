import { connectToDatabase, Env } from './db';

export default {
  async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    const url = new URL(request.url);

    if (url.pathname === '/favicon.ico') {
        return new Response(null, { status: 204 });
    }

    try {
      const db = await connectToDatabase(env);
      
      // List collections as a test query
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
          headers: { 'Content-Type': 'application/json' },
        }
      );
    } catch (error: any) {
      console.error('MongoDB connection error:', error);
      return new Response(
        JSON.stringify({
          status: 'error',
          message: error.message || 'Failed to connect to database',
        }),
        {
          status: 500,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }
  },
};
