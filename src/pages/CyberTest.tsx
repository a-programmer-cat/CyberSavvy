import { useTranslation } from 'react-i18next';
import { modules } from '../constants/modules';
import { motion } from 'framer-motion';
import { FaGraduationCap, FaSearch, FaUsers, FaChartLine } from 'react-icons/fa';
import { ReactNode } from 'react';
import { Link } from 'react-router-dom';

interface CategoryCardProps {
  id: string;
  title: string;
  description: string;
  sectionCount: number;
  icon?: ReactNode;
  color?: string;
  to: string;
}

export const CategoryCard = ({
  id,
  title,
  description,
  sectionCount,
  icon,
  color = 'bg-primary',
  to,
}: CategoryCardProps) => {
  const { t } = useTranslation();
  return (
    <motion.div whileHover={{ scale: 1.03 }} className="h-full">
      <Link to={to} className="block h-full">
        <div className="bg-bg-card border border-bg-border rounded-xl shadow-md overflow-hidden h-full flex flex-col transition-colors hover:border-primary">
          <div className={`${color} p-4 text-white`}>
            <div className="flex items-center">
              {icon && <div className="mr-3">{icon}</div>}
              <h2 className="text-xl font-semibold">{title}</h2>
            </div>
          </div>
          <div className="p-6 flex-grow">
            <p className="text-text-secondary mb-4">{description}</p>
          </div>
          <div className="px-6 pb-4">
            <span className="inline-block bg-bg-dark text-text-main rounded-full px-3 py-1 text-sm font-semibold">
              {sectionCount} {sectionCount === 1 ? t('section') : t('sections')}
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export const CyberTest = () => {
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
      color: 'bg-primary'
    },
    parents: {
      icon: <FaUsers className="text-success" />,
      color: 'bg-success'
    },
    seniors: {
      icon: <FaSearch className="text-accent" />,
      color: 'bg-accent'
    },
    businesses: {
      icon: <FaChartLine className="text-warning" />,
      color: 'bg-warning'
    }
  };

  return (
    <div className="min-h-screen bg-bg-dark text-text-main">
      <div className="container mx-auto px-4 py-12">
        {/* 标题 */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-gradient-start to-gradient-end">
              {t('cyberTest.title')}
            </span>
          </h1>
          <p className="text-xl text-text-secondary max-w-3xl mx-auto">
            {t('cyberTest.subtitle')}
          </p>
        </motion.div>

        {/* 分类卡片 */}
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto"
        >
          {modules.map((category) => {
            const config = categoryConfig[category.id as keyof typeof categoryConfig];
            return (
              <motion.div key={category.id} variants={item} whileHover={{ y: -5 }}>
                <CategoryCard
                  id={category.id}
                  title={t(`cyberTest.categories.${category.id}`)}
                  description={t(`cyberTest.categoryDescriptions.${category.id}`)}
                  sectionCount={category.sections.length}
                  icon={config?.icon}
                  color={config?.color}
                  to={`/test/${category.id}`}
                />
              </motion.div>
            );
          })}
        </motion.div>

        {/* 步骤说明 */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="mt-16 bg-bg-card border border-bg-border rounded-2xl shadow-md p-8 max-w-4xl mx-auto"
        >
          <h2 className="text-2xl font-semibold text-text-main mb-4">
            {t('cyberTest.howItWorks')}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex flex-col items-center text-center">
              <div className="bg-primary/20 p-4 rounded-full mb-3">
                <span className="text-primary text-xl">1</span>
              </div>
              <h3 className="font-medium text-text-main mb-2">{t('cyberTest.step1')}</h3>
              <p className="text-text-secondary text-sm">{t('cyberTest.step1Desc')}</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="bg-success/20 p-4 rounded-full mb-3">
                <span className="text-success text-xl">2</span>
              </div>
              <h3 className="font-medium text-text-main mb-2">{t('cyberTest.step2')}</h3>
              <p className="text-text-secondary text-sm">{t('cyberTest.step2Desc')}</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="bg-accent/20 p-4 rounded-full mb-3">
                <span className="text-accent text-xl">3</span>
              </div>
              <h3 className="font-medium text-text-main mb-2">{t('cyberTest.step3')}</h3>
              <p className="text-text-secondary text-sm">{t('cyberTest.step3Desc')}</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
