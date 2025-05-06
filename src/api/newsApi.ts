import axios from 'axios';

const API_KEY = '4cf1454dc4744e7aa83e4ebc37dd997e';
const BASE_URL = 'https://newsapi.org/v2/everything';

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
            language: 'en',
            apiKey: API_KEY,
        },
    });

    return response.data.articles;
};
