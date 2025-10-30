"use client"

import { useTranslation } from 'react-i18next'
import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaExternalLinkAlt } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom';

interface Story {
  id: number
  title: string
  tags: string[]
  date: string
  loss: string
  summary: string
  content: string
  sources: string[]
  imageUrl?: string
}

export const RealStories = () => {
  const { t, i18n } = useTranslation()
  const [stories, setStories] = useState<Story[]>([])
  const [expandedId, setExpandedId] = useState<number | null>(null)
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate();

  useEffect(() => {
    const langCode = i18n.language as 'en' | 'zh' | 'ms'
    setLoading(true)
    fetch(`/modules/cases/cases.${langCode}.json`)
      .then(res => res.json())
      .then(data => setStories(data))
      .catch(err => {
        console.error("Failed to load stories:", err)
        setStories([])
      })
      .finally(() => setLoading(false))
  }, [i18n.language])

  return (
    <div className="container mx-auto px-4 py-10 bg-bg-dark text-text-main min-h-screen">
      <h1 className="text-3xl font-bold mb-8 text-center text-transparent bg-clip-text bg-gradient-to-r from-gradient-start to-gradient-end">
        {t('real-stories.stories')}
      </h1>

      {loading ? (
        <p className="text-center text-text-secondary animate-pulse">
          {t('real-stories.loading')}...
        </p>
      ) : stories.length === 0 ? (
        <p className="text-center text-text-secondary">{t('real-stories.comingSoon')}</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {stories.map(story => (
            <motion.div
              key={story.id}
              layout
              className="bg-bg-card border border-bg-border rounded-xl p-6 shadow hover:shadow-xl transition-all duration-300"
            >
              {story.imageUrl && (
                <img
                  src={story.imageUrl}
                  alt={story.title}
                  className="rounded-lg mb-4 w-full h-48 object-cover"
                />
              )}
              <h2 className="text-xl font-semibold text-primary mb-2">
                {story.title}
              </h2>
              <p className="text-sm text-text-secondary mb-1">
                📅 {story.date} | 💸 {story.loss}
              </p>
              <div className="flex flex-wrap gap-2 mb-3">
                {(story.tags || []).map(tag => (
                  <span
                    key={tag}
                    className="text-xs bg-gradient-to-r from-gradient-start to-gradient-end text-black px-2 py-1 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <p className="text-text-secondary mb-3">
                {expandedId === story.id ? story.content : story.summary}
              </p>

              <button
                onClick={() =>
                  setExpandedId(expandedId === story.id ? null : story.id)
                }
                className="mt-4 text-sm text-primary hover:text-primary-hover underline"
              >
                {expandedId === story.id ? t('real-stories.showLess') : t('real-stories.showMore')}
              </button>

              <div className="flex flex-col gap-2">
                {story.sources?.slice(0, 3).map((src, index) => (
                  <a
                    key={index}
                    href={src}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:text-primary-hover text-sm underline flex items-center gap-1"
                  >
                    {t('real-stories.readMore')} <FaExternalLinkAlt size={12} />
                  </a>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      )}
      {/* 底部按钮 */}
      <div className="text-center mt-12">
        <p className="text-text-secondary mb-4 text-lg">
          {t('realStories.needSupport')}
        </p>
        <button
          onClick={() => navigate(`/help`)}
          className="cursor-target bg-gradient-to-r from-red-500 to-red-600 text-white font-semibold py-3 px-6 rounded-lg shadow-md hover:shadow-lg transition-transform hover:-translate-y-1"
        >
          {t('realStories.helpReportButton')}
        </button>
      </div>
    </div>
  )
}
