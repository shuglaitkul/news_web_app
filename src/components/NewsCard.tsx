// components/NewsCard.tsx

import { IconHeart, IconHeartFilled } from '@tabler/icons-react';
import React from 'react';
import { NewsArticle } from '../types/news';

type Props = {
    article: NewsArticle;
    onClick: () => void;
    isFavorite: boolean;
    onToggleFavorite: () => void;
};

const NewsCard: React.FC<Props> = ({ article, onClick, isFavorite, onToggleFavorite }) => {
    return (
        <div className="bg-white rounded-2xl shadow hover:shadow-lg transition duration-200 overflow-hidden cursor-pointer flex flex-col">
            {article.urlToImage ? (
                <img src={article.urlToImage} alt={article.title} className="h-48 w-full object-cover" />) : (
                <div className="h-48 w-full bg-gray-200 flex items-center justify-center">
                    <span className="text-gray-500">Нет изображения</span>
                </div>
            )}
            <div className="p-4 flex-1 flex flex-col justify-between">
                <p className="text-sm text-gray-500 mt-1">
                    {new Date(article.publishedAt).toLocaleDateString('ru-RU', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                    })}
                </p>
                <div onClick={onClick}>
                    <h2 className="text-lg font-semibold mb-2">{article.title}</h2>
                    <p className="text-sm text-gray-600 line-clamp-3">{article.description}</p>
                </div>
                <div className="mt-4 flex justify-end">
                    <button onClick={(e) => { e.stopPropagation(); onToggleFavorite(); }}>
                        {isFavorite ? (
                            <IconHeartFilled className="text-red-500 hover:text-red-600" />
                        ) : (
                            <IconHeart className="text-gray-400 hover:text-red-500" />
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default NewsCard;
