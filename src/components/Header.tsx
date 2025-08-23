import { useTranslation } from 'react-i18next'

export const Header = () => {
  const { t } = useTranslation()
  
  return (
    <header className="bg-blue-600 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold">CyberSavvy</h1>
        <nav>
          <ul className="flex space-x-4">
            <li><a href="/" className="hover:underline">{t('home')}</a></li>
            <li><a href="/learning" className="hover:underline">{t('learning')}</a></li>
            <li><a href="/stories" className="hover:underline">{t('stories')}</a></li>
          </ul>
        </nav>
      </div>
    </header>
  )
}