import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { NewsArticle } from '../types/news';

const NewsDetailPage: React.FC = () => {
    const { state } = useLocation();
    const navigate = useNavigate();
    const article: NewsArticle = state?.article;

    if (!article) return <div className="text-center mt-10">Новость не найдена</div>;

    return (
        <div className="max-w-3xl mx-auto p-4">
            <button
                onClick={() => navigate(-1)}
                className="mb-4 text-blue-600 hover:underline"
            >
                ← Назад
            </button>
            <p className="text-sm text-gray-500 mt-1">
                {new Date(article.publishedAt).toLocaleDateString('ru-RU', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                })}
            </p>
            <h1 className="text-3xl font-bold mb-4">{article.title}</h1>
            {article.urlToImage && (
                <img
                    src={article.urlToImage}
                    alt={article.title}
                    className="w-full h-72 object-cover rounded-xl mb-4"
                />
            )}
            <p className="text-gray-700 mb-4">{article.content || article.description}</p>
            <a
                href={article.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
            >
                Читать на оригинальном сайте
            </a>
        </div>
    );
};

export default NewsDetailPage;
