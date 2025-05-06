import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import NewsCard from '../components/NewsCard';
import { NewsArticle } from '../types/news';

const FAVORITES_KEY = 'favorite_articles';

const FavoritesPage: React.FC = () => {
    const [favorites, setFavorites] = useState<NewsArticle[]>([]);
    const { t } = useTranslation();

    useEffect(() => {
        const saved = localStorage.getItem(FAVORITES_KEY);
        if (saved) setFavorites(JSON.parse(saved));
    }, []);

    const removeFavorite = (article: NewsArticle) => {
        const updated = favorites.filter(fav => fav.url !== article.url);
        setFavorites(updated);
        localStorage.setItem(FAVORITES_KEY, JSON.stringify(updated));
    };

    return (
        <div className="bg-gray-100 min-h-screen py-8 px-4">
            <h1 className="text-3xl font-bold text-center mb-6">{t('favorites')}</h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-7xl mx-auto">
                {favorites.length > 0 ? (
                    favorites.map((article, index) => (
                        <NewsCard
                            key={index}
                            article={article}
                            isFavorite={true}
                            onToggleFavorite={() => removeFavorite(article)}
                            onClick={() => window.open(article.url, '_blank')}
                        />
                    ))
                ) : (
                    <div className="col-span-full text-center text-gray-500">
                        {t('noFavoriteArticles')}
                    </div>
                )}
            </div>
        </div>
    );
};

export default FavoritesPage;
