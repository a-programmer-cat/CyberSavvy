import { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
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
        <div className="bg-bg-card border border-bg-border rounded-xl cursor-target shadow-md overflow-hidden h-full flex flex-col transition-colors hover:border-primary">
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
