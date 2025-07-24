import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Giả sử bạn có biến language (ví dụ lấy từ .env hoặc config)
const language = localStorage.getItem('language') || 'vi';

i18n
    .use(initReactI18next)
    .init({
        resources: {
            en: { translation: require('./en/translation.json') },
            vi: { translation: require('./vi/translation.json') },
        },
        lng: language,
        fallbackLng: 'vi',
        interpolation: {
            escapeValue: false,
        },
    });

export default i18n;
