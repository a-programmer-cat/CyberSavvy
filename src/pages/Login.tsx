import { useTranslation } from 'react-i18next'

export const Login = () => {
  const { t } = useTranslation()
  
  return (
    <div className="container mx-auto px-4 py-8 bg-bg-dark text-text-main min-h-screen flex flex-col items-center justify-center">
      <div className="bg-bg-card border border-bg-border rounded-lg shadow-lg p-8 max-w-md w-full">
        <h1 className="text-3xl font-bold mb-6 text-gradient bg-clip-text text-transparent bg-gradient-to-r from-gradient-start to-gradient-end">
          {t('login')}
        </h1>
        <p className="text-lg mb-4 text-text-secondary">
          {t('comingSoon')}
        </p>
        <button className="w-full py-2 px-4 mt-4 rounded-md bg-primary hover:bg-primary-hover text-white font-medium transition-colors">
          {t('login')}
        </button>
      </div>
    </div>
  )
}
