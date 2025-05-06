import { IconHeart, IconHome } from '@tabler/icons-react';
import { Newspaper } from 'lucide-react';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useLocation } from 'react-router-dom';

const Navbar: React.FC = () => {
    const location = useLocation();
    const path = location.pathname;
    const { t, i18n } = useTranslation();

    const isActive = (pathToCheck: string) =>
        path === pathToCheck
            ? 'text-slate-600 font-semibold'
            : 'text-gray-600 hover:text-slate-500 transition-colors duration-200';

    const changeLanguage = (lng: string) => {
        i18n.changeLanguage(lng);
    };

    return (
        <nav className="bg-white shadow-md py-4 px-6 flex justify-between items-center sticky top-0 z-50">
            <Link to="/" className="flex items-center space-x-2 text-xl font-bold text-slate-600">
                <Newspaper className="w-6 h-6" />
                <span>NewsApp</span>
            </Link>

            <div className="flex items-center space-x-6 text-base">
                {path === '/' && (
                    <Link to="/favorites" className={`flex items-center space-x-1 ${isActive('/favorites')}`}>
                        <IconHeart className="w-5 h-5" />
                        <span>{t('favorites')}</span>
                    </Link>
                )}
                {path === '/favorites' && (
                    <Link to="/" className={`flex items-center space-x-1 ${isActive('/')}`}>
                        <IconHome className="w-5 h-5" />
                        <span>{t('home')}</span>
                    </Link>
                )}

                {/* Language Switch */}
                <div className="space-x-2">
                    <button onClick={() => changeLanguage('ru')} className="text-sm text-gray-500 hover:text-black">
                        RU
                    </button>
                    <button onClick={() => changeLanguage('en')} className="text-sm text-gray-500 hover:text-black">
                        EN
                    </button>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
