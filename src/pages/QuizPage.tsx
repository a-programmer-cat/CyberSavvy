import { QuizGame } from '../components/QuizGame';
import { useTranslation } from 'react-i18next';
import { useParams, useNavigate} from 'react-router-dom';

export const QuizPage = () => {
  const { category } = useParams();
  const { t, i18n } = useTranslation();
  const lang = i18n.language as 'en' | 'ms' | 'zh';
  const navigate = useNavigate();
  
  const quizFile = `../../modules/${category}/quiz.${lang}.json`;
  console.log('Final quiz path:', quizFile);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">
        {i18n.t('quiz.title') as string}
      </h1>
      <QuizGame quizFile={quizFile}/>
    </div>
  );
};