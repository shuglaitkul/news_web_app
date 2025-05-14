const axios = require("axios");

const API_KEY = "4cf1454dc4744e7aa83e4ebc37dd997e";
const BASE_URL = "https://newsapi.org/v2/everything";

exports.handler = async (event) => {
  const params = event.queryStringParameters;

  try {
    const response = await axios.get(BASE_URL, {
      params: {
        q: params.q || "news",
        from: params.from,
        to: params.to,
        sortBy: params.sortBy || "publishedAt",
        language: "en",
        apiKey: API_KEY,
      },
    });

    return {
      statusCode: 200,
      body: JSON.stringify(response.data),
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
    };
  } catch (error) {
    console.error("News API error:", error.message);
    return {
      statusCode: error.response?.status || 500,
      body: JSON.stringify({
        message: "Failed to fetch news",
        error: error.message,
      }),
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
    };
  }
};
