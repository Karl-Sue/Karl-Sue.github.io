export interface Env {
    MONGO_URI: string;
    DB_NAME?: string;
    API_KEY?: string;
}

export interface PostAnalyticsDoc {
    _id: string;
    count: number;
    firstViewedAt: Date;
    lastViewedAt: Date;
    dailyViews?: Record<string, number>;
}