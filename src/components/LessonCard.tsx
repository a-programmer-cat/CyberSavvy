import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

interface LessonCardProps {
  id: string;
  categoryId: string;
  title: string;
  actionText: string;
}

export const LessonCard = ({
  id,
  categoryId,
  title,
  actionText,
}: LessonCardProps) => {
  const { t } = useTranslation();

  return (
    <motion.div whileHover={{ scale: 1.03 }} className="h-full">
      <Link to={`/learning/${categoryId}/${id}`} className="block h-full">
        <div className="bg-bg-card border border-bg-border rounded-xl shadow-md overflow-hidden h-full flex flex-col transition-colors hover:border-primary">
          <div className="p-6 flex-grow">
            <h2 className="text-xl font-semibold text-text-main mb-2">{title}</h2>
          </div>
          <div className="px-6 pb-4">
            <span className="inline-block bg-primary text-white rounded-full px-3 py-1 text-sm font-semibold hover:bg-primary-hover transition-colors">
              {actionText}
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};
