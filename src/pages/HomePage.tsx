import { IconAdjustmentsHorizontal } from '@tabler/icons-react';
import { debounce } from 'lodash';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FiArrowLeft, FiArrowRight, FiSearch } from 'react-icons/fi';
import { MdSort } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import { fetchEverything } from '../api/newsApi';
import NewsCard from '../components/NewsCard';
import { NewsArticle } from '../types/news';

const FAVORITES_KEY = 'favorite_articles';

const HomePage: React.FC = () => {
    const [articles, setArticles] = useState<NewsArticle[]>([]);
    const [favorites, setFavorites] = useState<NewsArticle[]>([]);
    const [formData, setFormData] = useState({
        searchTerm: '',
        fromDate: '',
        toDate: '',
    });
    const [currentPage, setCurrentPage] = useState(1);
    const [sortBy, setSortBy] = useState<'publishedAt' | 'popularity' | 'relevancy'>('publishedAt');
    const itemsPerPage = 9;
    const navigate = useNavigate();
    const { t } = useTranslation();


    const debouncedFetchData = debounce(async () => {
        const formatDateTime = (dateStr: string, isStart = true): string | undefined => {
            if (!dateStr) return undefined;
            const time = isStart ? 'T00:00:00Z' : 'T23:59:59Z';
            return `${dateStr}${time}`;
        };

        const data = await fetchEverything({
            q: formData.searchTerm || 'news',
            from: formatDateTime(formData.fromDate, true),
            to: formatDateTime(formData.toDate, false),
            sortBy,
        });

        setArticles(data);
    }, 1000);

    useEffect(() => {
        debouncedFetchData();
        const saved = localStorage.getItem(FAVORITES_KEY);
        if (saved) setFavorites(JSON.parse(saved));
    }, [debouncedFetchData, formData.searchTerm, formData.fromDate, formData.toDate, sortBy]);

    const toggleFavorite = (article: NewsArticle) => {
        let updated;
        const isFav = favorites.some(fav => fav.url === article.url);
        if (isFav) {
            updated = favorites.filter(fav => fav.url !== article.url);
        } else {
            updated = [...favorites, article];
        }
        setFavorites(updated);
        localStorage.setItem(FAVORITES_KEY, JSON.stringify(updated));
    };

    const filteredArticles = articles.filter(article =>
        article.title.toLowerCase().includes(formData.searchTerm.toLowerCase())
    );

    const paginatedNews = filteredArticles.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    return (
        <div className="bg-gray-50 min-h-screen py-10 px-4 font-sans">
            <h1 className="text-4xl font-extrabold text-center mb-10 text-gray-800"> {t('mainNews')}</h1>

            <div className="max-w-xl mx-auto mb-10">
                <div className="relative">
                    <input
                        type="text"
                        placeholder={t('search')}
                        value={formData.searchTerm}
                        onChange={(e) => setFormData((prev) => ({ ...prev, searchTerm: e.target.value }))}
                        className="w-full p-3 pl-10 rounded-xl border border-gray-300 shadow-sm focus:ring-1 focus:ring-slate-500 focus:outline-none"
                    />
                    <FiSearch className="absolute left-4 top-4 text-gray-400" size={18} />
                </div>
            </div>

            <div className="max-w-5xl mx-auto mb-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                <div className="flex items-center gap-3 bg-white px-4 py-2 rounded-md border border-gray-300">
                    <MdSort className="text-xl text-gray-600" />
                    <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value as any)}
                        className="outline-none bg-transparent text-gray-700"
                    >
                        <option value="publishedAt">{t('publicationDate')}</option>
                        <option value="popularity">{t('popularity')}</option>
                        <option value="relevancy">{t('relevance')}</option>
                    </select>
                </div>
                <div className="flex items-center gap-2">
                    <input
                        type="date"
                        value={formData.fromDate}
                        onChange={(e) => setFormData((prev) => ({ ...prev, fromDate: e.target.value }))}
                        className="p-2 rounded-lg border border-gray-300 w-full focus:ring-slate-500 focus:outline-none"
                    />
                </div>
                <div className="flex items-center gap-2">
                    <input
                        type="date"
                        value={formData.toDate}
                        onChange={(e) => setFormData((prev) => ({ ...prev, toDate: e.target.value }))}
                        className="p-2 rounded-lg border border-gray-300 w-full focus:ring-slate-500 focus:outline-none"
                    />
                </div>
                <button
                    onClick={debouncedFetchData}
                    // onClick={() => setFormData((prev) => ({ ...prev, searchTerm: prev.searchTerm }))}
                    className="bg-slate-600 hover:bg-slate-700 text-white px-4 rounded-lg flex items-center justify-center gap-2 shadow-md"
                >
                    <IconAdjustmentsHorizontal size={20} /> {t('filter')}
                </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-7xl mx-auto">
                {paginatedNews.length > 0 ? (
                    paginatedNews.map((article, index) => (
                        <NewsCard
                            key={index}
                            article={article}
                            isFavorite={favorites.some(fav => fav.url === article.url)}
                            onToggleFavorite={() => toggleFavorite(article)}
                            onClick={() => navigate(`/news/${index}`, { state: { article } })}
                        />
                    ))
                ) : (
                    <div className="col-span-full text-center text-gray-500">
                        {t('nothingFound')}
                    </div>
                )}
            </div>

            <div className="flex justify-center mt-10 space-x-4">
                <button
                    onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                    disabled={currentPage === 1}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-600 hover:bg-slate-700 text-white disabled:opacity-50"
                >
                    <FiArrowLeft /> {t('back')}
                </button>
                <button
                    onClick={() => setCurrentPage(p => p + 1)}
                    disabled={currentPage * itemsPerPage >= filteredArticles.length}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-600 hover:bg-slate-700 text-white disabled:opacity-50"
                >
                    {t('next')} <FiArrowRight />
                </button>
            </div>
        </div>
    );
};

export default HomePage;
