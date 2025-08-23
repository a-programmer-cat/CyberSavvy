import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';

type LanguageCode = 'en' | 'ms' | 'zh';

export const LanguageSwitcher = () => {
  const { i18n } = useTranslation();
  const [currentLang, setCurrentLang] = useState<LanguageCode>(i18n.language as LanguageCode);

  useEffect(() => {
    const savedLang = localStorage.getItem('preferred_language') as LanguageCode | null;
    if (savedLang && savedLang !== currentLang) {
      i18n.changeLanguage(savedLang);
      setCurrentLang(savedLang);
    }
  }, []);

  const changeLanguage = (lng: LanguageCode) => {
    i18n.changeLanguage(lng);
    localStorage.setItem('preferred_language', lng);
    setCurrentLang(lng);
  };

  const languages: { code: LanguageCode; label: string }[] = [
    { code: 'en', label: 'English' },
    { code: 'ms', label: 'Bahasa' },
    { code: 'zh', label: '中文' },
  ];

  return (
    <div className="flex space-x-2">
      {languages.map((lang) => (
        <button
          key={lang.code}
          onClick={() => changeLanguage(lang.code)}
          className={`px-3 py-1 rounded-md transition-all border border-bg-border
            ${
              currentLang === lang.code
                ? 'bg-primary text-text-main shadow-md hover:bg-primary-hover'
                : 'bg-bg-card text-text-secondary hover:bg-bg-border'
            }`}
          aria-label={`Change language to ${lang.label}`}
        >
          {lang.label}
        </button>
      ))}
    </div>
  );
};
