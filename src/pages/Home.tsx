import { useTranslation } from 'react-i18next';
import { AlertBanner } from '../components/AlertBanner';
import { FaGraduationCap, FaClipboardCheck, FaUserFriends } from 'react-icons/fa';
import { SplashScreen } from "../components/SplashScreen";
import IntroScreen from "../components/IntroScreen";
import { CodeRainBackground } from "../components/CodeRainBackground";
//import { HackerCharacter } from "../components/HackerCharacter";
import { motion } from 'framer-motion';
import { useState } from "react";

export const Home = () => {
  const { t } = useTranslation();
  const [introDone, setIntroDone] = useState(false);

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

  const cards = [
    {
      icon: <FaGraduationCap className="text-3xl mb-4 text-blue-500" />,
      title: t('quickStart'),
      description: t('startLearning'),
      link: "/learning",
      buttonText: t('getStarted'),
      color: "bg-blue-500 hover:bg-blue-600"
    },
    {
      icon: <FaClipboardCheck className="text-3xl mb-4 text-green-500" />,
      title: t('takeTest'),
      description: t('testYourKnowledge'),
      link: "/test",
      buttonText: t('startTest'),
      color: "bg-green-500 hover:bg-green-600"
    },
    {
      icon: <FaUserFriends className="text-3xl mb-4 text-purple-500" />,
      title: t('readStories'),
      description: t('learnFromOthers'),
      link: "/stories",
      buttonText: t('viewStories'),
      color: "bg-purple-500 hover:bg-purple-600"
    }
  ];

  const [showHacker, setShowHacker] = useState(false);

  return (
    <div className="relative">
      {//<SplashScreen onFinish={() => setShowHacker(true)} />}
      }
      {!introDone ? (
        <IntroScreen onFinish={() => setIntroDone(true)} />
      ) : (
        <div className="min-h-screen bg-gray-900 text-white relative overflow-hidden">
          <div className="absolute inset-0 z-0">
            <CodeRainBackground />
            <div className="absolute inset-0 bg-gradient-to-b from-gray-900/90 via-gray-900/70 to-gray-900/90"></div>
          </div>

          <div className="container mx-auto px-4 py-12 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center mb-16"
            >
              <h1 className="text-5xl md:text-6xl font-bold mb-6">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-300">
                  {t('welcome')}
                </span>
              </h1>
              <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                {t('subtitle')}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="mb-16 max-w-4xl mx-auto"
            >
              <AlertBanner />
            </motion.div>

            <motion.div
              variants={container}
              initial="hidden"
              animate="show"
              className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto"
            >
              {cards.map((card, index) => (
                <motion.div
                  key={index}
                  variants={item}
                  whileHover={{ y: -5, scale: 1.03 }}
                  className="bg-gray-800/80 backdrop-blur-sm rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl border border-gray-700"
                >
                  <div className="p-8 text-center">
                    <div className="flex justify-center">
                      {card.icon}
                    </div>
                    <h2 className="text-2xl font-semibold text-white mb-4">{card.title}</h2>
                    <p className="text-gray-300 mb-6">{card.description}</p>
                    <a
                      href={card.link}
                      className={`inline-block ${card.color} text-white px-6 py-3 rounded-lg font-medium transition-all duration-300 hover:shadow-md`}
                    >
                      {card.buttonText}
                    </a>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              className="mt-24 text-center"
            >
              <h3 className="text-2xl font-semibold text-white mb-8">
                <span className="border-b-2 border-blue-500 pb-2">
                  {t('whyChooseUs')}
                </span>
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                <motion.div
                  whileHover={{ y: -5 }}
                  className="bg-gray-800/80 backdrop-blur-sm p-8 rounded-xl shadow-sm border border-gray-700"
                >
                  <div className="text-blue-400 text-3xl mb-4">📊</div>
                  <h4 className="font-medium text-white mb-3">{t('feature1')}</h4>
                  <p className="text-gray-300 text-sm">{t('feature1Desc')}</p>
                </motion.div>
                <motion.div
                  whileHover={{ y: -5 }}
                  className="bg-gray-800/80 backdrop-blur-sm p-8 rounded-xl shadow-sm border border-gray-700"
                >
                  <div className="text-green-400 text-3xl mb-4">🛡️</div>
                  <h4 className="font-medium text-white mb-3">{t('feature2')}</h4>
                  <p className="text-gray-300 text-sm">{t('feature2Desc')}</p>
                </motion.div>
                <motion.div
                  whileHover={{ y: -5 }}
                  className="bg-gray-800/80 backdrop-blur-sm p-8 rounded-xl shadow-sm border border-gray-700"
                >
                  <div className="text-purple-400 text-3xl mb-4">🌐</div>
                  <h4 className="font-medium text-white mb-3">{t('feature3')}</h4>
                  <p className="text-gray-300 text-sm">{t('feature3Desc')}</p>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      )}
      {// showHacker && <HackerCharacter />
      }
    </div>
  );
};