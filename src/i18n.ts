import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { getSavedLanguage } from './utils/language';
import enTranslations from './locales/en/common.json';
import msTranslations from './locales/ms/common.json';
import zhTranslations from './locales/zh/common.json';


const resources = {
  en: { translation: enTranslations },
  ms: { translation: msTranslations },
  zh: { translation: zhTranslations }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: getSavedLanguage() || 'en', 
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;