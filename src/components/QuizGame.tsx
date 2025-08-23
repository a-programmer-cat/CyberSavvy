import { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import { useTranslation } from 'react-i18next';

interface QuizQuestion {
  id: string;
  text: string;
  options: {
    text: string;
    correct: boolean;
    feedback: string;
  }[];
}

export const QuizGame = ({ quizFile }: { quizFile: string }) => {

  console.log('Loading quiz from:', quizFile);
  const { t } = useTranslation();
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadQuiz = async () => {
      try {
        const res = await fetch(quizFile);
        console.log('Response status:', res.status);
        const contentType = res.headers.get('content-type');
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        if (!contentType?.includes('application/json')) {
          const text = await res.text();
          console.error('Expected JSON, got:', text.slice(0, 200));
          throw new Error('Invalid JSON format');
        }
        const data = await res.json();
        console.log('Parsed data:', data);
        setQuestions(data.questions || []);
      } catch (error) {
        console.error(t('quiz.loadError'), error);
      } finally {
        setLoading(false);
      }
    };

    loadQuiz();
  }, [quizFile, t]);

  const handleAnswer = (optionIndex: number) => {
    setSelectedOption(optionIndex);
    if (questions[currentIndex].options[optionIndex].correct) {
      setScore(score + 1);
    }
  };

  const nextQuestion = () => {
    setSelectedOption(null);
    setCurrentIndex(currentIndex + 1);
  };

  if (loading) return <div className="text-text-secondary">{t('quiz.loading')}</div>;
  if (questions.length === 0) return <div className="text-text-secondary">{t('quiz.empty')}</div>;

  const currentQuestion = questions[currentIndex];

  return (
    <div className="quiz-container bg-bg-dark text-text-main rounded-lg shadow-md p-6 max-w-2xl mx-auto">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-bold">
          {t('quiz.title')} ({t('quiz.counter', {
            current: currentIndex + 1,
            total: questions.length
          })})
        </h3>
        <div className="bg-gradient-to-r from-gradient-start to-gradient-end text-text-main px-3 py-1 rounded-full">
          {t('quiz.score', { score })}
        </div>
      </div>

      <div className="question-card bg-bg-card p-4 rounded-lg mb-6 border border-bg-border">
        <ReactMarkdown>{currentQuestion.text}</ReactMarkdown>
      </div>

      <div className="options-grid grid gap-3">
        {currentQuestion.options.map((option, index) => (
          <button
            key={index}
            onClick={() => handleAnswer(index)}
            disabled={selectedOption !== null}
            className={`option-button p-3 rounded-lg border transition-all text-left ${
              selectedOption === index
                ? option.correct
                  ? 'bg-success/20 border-success text-success'
                  : 'bg-error/20 border-error text-error'
                : 'hover:bg-bg-card border-bg-border'
            }`}
          >
            {option.text}
          </button>
        ))}
      </div>

      {selectedOption !== null && (
        <div className="feedback-section mt-4 p-4 rounded-lg bg-bg-card border border-bg-border animate-fade-in">
          <div className="font-medium mb-3">
            {currentQuestion.options[selectedOption].feedback}
          </div>
          {currentIndex < questions.length - 1 ? (
            <button
              onClick={nextQuestion}
              className="next-button px-4 py-2 bg-primary text-text-main rounded hover:bg-primary-hover transition-colors"
            >
              {t('quiz.nextButton')}
            </button>
          ) : (
            <div className="result-card mt-4 p-4 bg-bg-card rounded-lg border border-bg-border">
              <h4 className="text-lg font-bold text-center mb-2">
                {score >= questions.length / 2
                  ? t('quiz.results.good')
                  : t('quiz.results.improve')}
              </h4>
              <p className="text-center">
                {t('quiz.results.score', {
                  score,
                  total: questions.length
                })}
              </p>
              <p className={`mt-2 text-center ${
                score >= questions.length / 2
                  ? 'text-success'
                  : 'text-error'
              }`}>
                {score >= questions.length / 2
                  ? t('quiz.results.riskLow')
                  : t('quiz.results.riskHigh')}
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
