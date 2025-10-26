import { useTranslation } from 'react-i18next';
import { modules } from '../constants/modules';
import { CategoryCard } from '../components/CategoryCard';
import { motion } from 'framer-motion';
import { FaGraduationCap, FaSearch, FaUsers, FaChartLine } from 'react-icons/fa';

export const LearningHub = () => {
  const { t } = useTranslation();

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  const categoryConfig = {
    students: {
      icon: <FaGraduationCap className="text-primary" />,
      color: "bg-primary"
    },
    parents: {
      icon: <FaUsers className="text-success" />,
      color: "bg-success"
    },
    seniors: {
      icon: <FaSearch className="text-accent" />,
      color: "bg-accent"
    },
    businesses: {
      icon: <FaChartLine className="text-highlight-green" />,
      color: "bg-highlight-green"
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-bg-dark to-bg-card">
      <div className="container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-text-main mb-4">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-gradient-start to-gradient-end">
              {t('learningHub.title')}
            </span>
          </h1>
          <p className="text-xl text-text-secondary max-w-3xl mx-auto">
            {t('learningHub.subtitle')}
          </p>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto"
        >
          {modules.map((category) => {
            const config = categoryConfig[category.id as keyof typeof categoryConfig];
            return (
              <motion.div 
                key={category.id}
                variants={item}
                whileHover={{ y: -5 }}
              >
                <CategoryCard
                  id={category.id}
                  title={t(`learningHub.categories.${category.id}`)}
                  description={t(`learningHub.categoryDescriptions.${category.id}`)}
                  sectionCount={category.sections.length}
                  icon={config?.icon}
                  color={config?.color}
                  to={`/learning/${category.id}`}
                />
              </motion.div>
            );
          })}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="mt-16 bg-bg-card rounded-xl shadow-md p-8 max-w-4xl mx-auto border border-bg-border"
        >
          <h2 className="text-2xl font-semibold text-text-main mb-4">
            {t('learningHub.howItWorks')}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex flex-col items-center text-center">
              <div className="bg-primary/20 p-4 rounded-full mb-3">
                <span className="text-primary text-xl">1</span>
              </div>
              <h3 className="font-medium text-text-main mb-2">{t('learningHub.step1')}</h3>
              <p className="text-text-secondary text-sm">{t('learningHub.step1Desc')}</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="bg-success/20 p-4 rounded-full mb-3">
                <span className="text-success text-xl">2</span>
              </div>
              <h3 className="font-medium text-text-main mb-2">{t('learningHub.step2')}</h3>
              <p className="text-text-secondary text-sm">{t('learningHub.step2Desc')}</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="bg-accent/20 p-4 rounded-full mb-3">
                <span className="text-accent text-xl">3</span>
              </div>
              <h3 className="font-medium text-text-main mb-2">{t('learningHub.step3')}</h3>
              <p className="text-text-secondary text-sm">{t('learningHub.step3Desc')}</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
