type FetchParams = {
    q?: string;
    from?: string;
    to?: string;
    sortBy?: 'relevancy' | 'popularity' | 'publishedAt';
    category?: string; // можно удалить, если не используется
};
