import { useParams, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { modules } from '../constants/modules';
import { LessonCard } from '../components/LessonCard';
import { useState, useEffect } from 'react';
import { parseMarkdownTitle } from '../utils/markdownUtils';

export const CategoryOverview = () => {
  const { category } = useParams();
  const { t, i18n } = useTranslation();
  const lang = i18n.language as 'en' | 'ms' | 'zh';
  const [sectionTitles, setSectionTitles] = useState<Record<string, string>>({});

  const selectedCategory = modules.find((mod) => mod.id === category);

  useEffect(() => {
    if (!selectedCategory) return;

    const loadTitles = async () => {
      const titles: Record<string, string> = {};
      for (const section of selectedCategory.sections) {
        try {
          const res = await fetch(
            `${selectedCategory.basePath}${section.id}.${lang}.md`
          );
          const text = await res.text();
          titles[section.id] = parseMarkdownTitle(text);
        } catch {
          titles[section.id] = section.id.replace(/-/g, ' ');
        }
      }
      setSectionTitles(titles);
    };

    loadTitles();
  }, [selectedCategory, lang]);

  if (!selectedCategory) {
    return <div>{t('categoryNotFound')}</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">
          {t(`learningHub.categories.${selectedCategory.id}`)}
        </h1>
        <p className="text-gray-600">
          {t(`learningHub.categoryDescriptions.${selectedCategory.id}`)}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {selectedCategory.sections.map((section) => (
          <LessonCard
            key={section.id}
            id={section.id}
            categoryId={selectedCategory.id}
            title={sectionTitles[section.id] || section.id.replace(/-/g, ' ')}
            actionText={t('learningHub.clickToLearn')}
          />
        ))}
      </div>
    </div>
  );
};