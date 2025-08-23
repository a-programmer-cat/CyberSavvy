import { useTranslation } from 'react-i18next'
import { useEffect, useState } from 'react'

interface Story {
  id: number
  title: string
  tags: string[]
  date: string
  loss: string
  summary: string
  content: string
  sources: string[]
}

export const RealStories = () => {
  const { t, i18n } = useTranslation()
  const [stories, setStories] = useState<Story[]>([])

  useEffect(() => {
    const langCode = i18n.language as 'en' | 'zh' | 'ms'
    fetch(`../../modules/cases/cases.${langCode}.json`)
      .then(res => res.json())
      .then(data => setStories(data))
      .catch(err => {
        console.error("Failed to load stories:", err)
        setStories([])
      })
  }, [i18n.language])

  return (
    <div className="container mx-auto px-4 py-8 bg-bg-dark text-text-main min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-gradient bg-clip-text text-transparent bg-gradient-to-r from-gradient-start to-gradient-end">
        {t('stories')}
      </h1>
      {stories.length === 0 ? (
        <p className="text-text-secondary">{t('comingSoon')}</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {stories.map(story => (
            <div
              key={story.id}
              className="bg-bg-card border border-bg-border p-4 rounded-lg shadow hover:shadow-lg transition"
            >
              <h2 className="text-xl font-semibold mb-2 text-primary">
                {story.title}
              </h2>
              <p className="text-text-secondary mb-2">
                {story.summary}
              </p>
              <p className="text-sm text-text-secondary">
                {t('tags')}: {(story.tags || []).join(', ')}
              </p>
              <a
                href={story.sources?.[0]}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:text-primary-hover underline text-sm"
              >
                {t('readMore')}
              </a>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
