const LANGUAGE_KEY = 'preferred_language';

export const saveLanguagePreference = (lang: string) => {
  localStorage.setItem(LANGUAGE_KEY, lang);
};

export const getSavedLanguage = (): string | null => {
  return localStorage.getItem(LANGUAGE_KEY);
};