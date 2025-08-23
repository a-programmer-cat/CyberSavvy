import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useState, useEffect } from 'react';
import { SafeMarkdown } from '../components/SafeMarkdown';
import { modules } from '../constants/modules';
import { Link } from 'react-router-dom';
import { parseMarkdownTitle, removeTitleFromContent } from '../utils/markdownUtils';

export const LessonPage = () => {
  const { category, lessonId } = useParams();
  const { t, i18n } = useTranslation();
  const lang = i18n.language as 'en' | 'ms' | 'zh';
  const [content, setContent] = useState('');
  const [title, setTitle] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const selectedCategory = modules.find((mod) => mod.id === category);
  const selectedLesson = selectedCategory?.sections.find(
    (sec) => sec.id === lessonId
  );

  useEffect(() => {
    if (!selectedCategory || !selectedLesson) {
      setError('Lesson not found');
      setLoading(false);
      return;
    }

    const loadContent = async () => {
      try {
        const res = await fetch(
          `${selectedCategory.basePath}${selectedLesson.id}.${lang}.md`
        );

        if (!res.ok) throw new Error('Failed to load content');

        const text = await res.text();
        setTitle(parseMarkdownTitle(text));
        setContent(removeTitleFromContent(text));
        setLoading(false);
      } catch (err) {
        setError(t('learningHub.loadingError'));
        setLoading(false);
      }
    };

    loadContent();
  }, [category, lessonId, lang, t, selectedCategory, selectedLesson]);

  if (!selectedCategory || !selectedLesson) {
    return <div>Lesson not found</div>;
  }

  if (loading) {
    return <div className="text-center py-8 text-text-secondary">{t('loading')}</div>;
  }

  if (error) {
    return <div className="text-center py-8 text-red-500">{error}</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <Link
        to={`/learning/${category}`}
        className="inline-flex items-center text-primary mb-6"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 mr-1"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
            clipRule="evenodd"
          />
        </svg>
        {t('learningHub.categories.' + category)}
      </Link>

      <h1 className="text-3xl font-bold mb-6 text-text-main">{title}</h1>

      <div className="prose max-w-none bg-bg-card border border-bg-border rounded-lg shadow-md p-6 text-text-secondary">
        <SafeMarkdown content={content} />
      </div>
    </div>
  );
};
