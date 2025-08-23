import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { FiAlertTriangle, FiX } from 'react-icons/fi';
import { useState } from 'react';

export const AlertBanner = () => {
  const { t } = useTranslation();
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="bg-gradient-to-r from-blue-50 to-blue-100 border-l-4 border-blue-400 shadow-sm"
    >
      <div className="max-w-7xl mx-auto px-4 py-3">
        <div className="flex items-center justify-between flex-wrap">
          <div className="w-0 flex-1 flex items-center">
            <span className="flex p-2 rounded-lg bg-blue-100">
              <FiAlertTriangle 
                className="h-6 w-6 text-blue-600" 
                aria-hidden="true"
              />
            </span>
            <p className="ml-3 font-medium text-blue-700 truncate">
              <span className="inline">
                {t('alertMessage')}
              </span>
            </p>
          </div>
          <div className="order-2 flex-shrink-0 sm:order-3 sm:ml-3">
            <motion.button
              type="button"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="-mr-1 flex p-2 rounded-md hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200"
              onClick={() => setIsVisible(false)}
            >
              <span className="sr-only">{t('dismiss')}</span>
              <FiX className="h-5 w-5 text-blue-600" aria-hidden="true" />
            </motion.button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
