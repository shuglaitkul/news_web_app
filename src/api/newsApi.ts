import axios from 'axios';

const BASE_URL = 'https://news-proxy-server-px57.onrender.com/api/news';

export const fetchEverything = async ({
    q = 'news',
    from,
    to,
    sortBy = 'publishedAt',
}: FetchParams): Promise<any[]> => {
    const response = await axios.get(BASE_URL, {
        params: {
            q,
            from,
            to,
            sortBy,
        },
    });

    return response.data.articles;
};
