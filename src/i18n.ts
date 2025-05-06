import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
    en: {
        translation: {
            mainNews: "Main News",
            search: 'Search...',
            favorites: 'Favorites',
            home: 'Home',
            filter: 'Apply a filter',
            nothingFound: 'Nothing found',
            back: 'Back',
            next: 'Next',
            publicationDate: 'By publication date',
            popularity: 'By popularity',
            relevance: 'By relevance',
            noFavoriteArticles: 'No favorite articles yet',
        },
    },
    ru: {
        translation: {
            mainNews: "Главные новости",
            search: 'Поиск...',
            favorites: 'Избранное',
            home: 'Главная',
            filter: 'Применить фильтр',
            nothingFound: 'Ничего не найдено',
            back: 'Назад',
            next: 'Вперёд',
            publicationDate: 'По дате публикации',
            popularity: 'По популярности',
            relevance: 'По релевантности',
            noFavoriteArticles: 'Пока нет избранных статей ',
        },
    },
};

i18n.use(initReactI18next).init({
    resources,
    lng: 'ru', // по умолчанию русский
    fallbackLng: 'en',
    interpolation: {
        escapeValue: false,
    },
});

export default i18n;
