"use client";

import { useTranslation } from 'react-i18next';
import { AlertBanner } from '../components/AlertBanner';
import { FaGraduationCap, FaClipboardCheck, FaUserFriends } from 'react-icons/fa';
import IntroScreen from "../components/IntroScreen";
import { CodeRainBackground } from "../components/CodeRainBackground";
import { motion } from 'framer-motion';
import { useEffect, useState } from "react";
import { Link } from 'react-router-dom';

const FIRST_ACCESS_KEY = "cybersavvy_firstTimeAccess";
const COOKIE_NAME = "cybersavvy_firstTimeAccess";
const COOKIE_EXPIRE_DAYS = 365;

function setCookie(name: string, value: string, days: number) {
  const expires = new Date(Date.now() + days * 864e5).toUTCString();
  document.cookie = `${name}=${encodeURIComponent(value)}; expires=${expires}; path=/; Secure; SameSite=Lax`;
}

function getCookie(name: string) {
  return document.cookie.split("; ").reduce((r, v) => {
    const parts = v.split("=");
    return parts[0] === name ? decodeURIComponent(parts.slice(1).join("=")) : r;
  }, "");
}

function clearCookie(name: string) {
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`;
}

export const Home = () => {
  const { t } = useTranslation();
  const [introDone, setIntroDone] = useState(false);
  const [showIntro, setShowIntro] = useState(false);
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    const checkFirstAccess = () => {
      try {
        const localVal = localStorage.getItem(FIRST_ACCESS_KEY);
        if (localVal === "true") return true;
        const cookieVal = getCookie(COOKIE_NAME);
        if (cookieVal === "true") {
          try {
            localStorage.setItem(FIRST_ACCESS_KEY, "true");
          } catch (e) {}
          return true;
        }
        return false;
      } catch {
        const cookieVal = getCookie(COOKIE_NAME);
        return cookieVal === "true";
      }
    };

    const visited = checkFirstAccess();
    if (!visited) {
      setShowIntro(true);
      try {
        localStorage.setItem(FIRST_ACCESS_KEY, "true");
      } catch {
        setCookie(COOKIE_NAME, "true", COOKIE_EXPIRE_DAYS);
      }
    } else {
      setShowIntro(false);
    }
    setIsChecking(false);
  }, []);

  const handleSkipIntro = () => {
    setIntroDone(true);
    setShowIntro(false);
  };

  const handleIntroFinish = () => {
    setIntroDone(true);
    setShowIntro(false);
  };

  const clearFirstAccessFlag = () => {
    try {
      localStorage.removeItem(FIRST_ACCESS_KEY);
    } catch {}
    clearCookie(COOKIE_NAME);
    setIntroDone(false);
    setShowIntro(false);
    alert(t('introResetDone') || "Intro reset. It will play on next visit.");
  };

  if (isChecking) return <div className="min-h-screen bg-gray-900" />;

  const container = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.15 } }
  };

  const item = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  const cards = [
    {
      icon: <FaGraduationCap className="text-4xl mb-5 text-blue-400" />,
      title: t('quickStart'),
      description: t('startLearning'),
      link: "/learning",
      buttonText: t('getStarted'),
      color: "bg-blue-500 hover:bg-blue-600"
    },
    {
      icon: <FaClipboardCheck className="text-4xl mb-5 text-green-400" />,
      title: t('takeTest'),
      description: t('testYourKnowledge'),
      link: "/test",
      buttonText: t('startTest'),
      color: "bg-green-500 hover:bg-green-600"
    },
    {
      icon: <FaUserFriends className="text-4xl mb-5 text-purple-400" />,
      title: t('readStories'),
      description: t('learnFromOthers'),
      link: "/stories",
      buttonText: t('viewStories'),
      color: "bg-purple-500 hover:bg-purple-600"
    }
  ];

  return (
    <div className="relative">
      {showIntro && !introDone ? (
        <>
          <IntroScreen onFinish={handleIntroFinish} />
          <button
            onClick={handleSkipIntro}
            className="fixed top-4 right-4 z-[300] px-3 py-1 text-sm bg-black/50 text-white rounded-md backdrop-blur-sm hover:bg-black/70 transition"
          >
            {t('skipIntro') || 'Skip Intro'}
          </button>
        </>
      ) : (
        <div className="min-h-screen bg-gray-900 text-white relative overflow-hidden">
          {/* 背景层 */}
          <div className="absolute inset-0 z-0">
            <CodeRainBackground />
            <div className="absolute inset-0 bg-gradient-to-b from-gray-900/95 via-gray-900/80 to-gray-900/95" />
          </div>

          {/* 内容层 */}
          <div className="relative z-10 container mx-auto px-6 py-16">
            {/* Hero Section */}
            <motion.div
              initial={{ opacity: 0, y: -40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="text-center mb-20"
            >
              <h1 className="text-5xl md:text-6xl font-extrabold mb-6 leading-tight">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-cyan-300 to-blue-400">
                  {t('welcome')}
                </span>
              </h1>
              <p className="text-xl text-gray-300 max-w-2xl mx-auto tracking-wide">
                {t('subtitle')}
              </p>
            </motion.div>

            {/* Alert Banner */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="mb-16 max-w-4xl mx-auto"
            >
              <AlertBanner />
            </motion.div>

            {/* 功能卡片 */}
            <motion.div
              variants={container}
              initial="hidden"
              animate="show"
              className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-6xl mx-auto"
            >
              {cards.map((card, index) => (
                <motion.div
                  key={index}
                  variants={item}
                  whileHover={{ y: -6, scale: 1.03 }}
                  transition={{ type: "spring", stiffness: 200, damping: 12 }}
                  className="bg-gray-800/60 backdrop-blur-md border border-gray-700 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 p-8 text-center"
                >
                  <div className="flex justify-center">{card.icon}</div>
                  <h2 className="text-2xl font-semibold text-white mb-4">{card.title}</h2>
                  <p className="text-gray-300 mb-8">{card.description}</p>
                  <Link
                    to={card.link}
                    className={`${card.color} px-6 py-3 rounded-lg font-medium transition-all duration-300 hover:shadow-lg`}
                  >
                    {card.buttonText}
                  </Link>
                </motion.div>
              ))}
            </motion.div>

            {/* Why Choose Us Section */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.7 }}
              className="mt-28 text-center"
            >
              <h3 className="text-3xl font-semibold text-white mb-10">
                <span className="border-b-2 border-blue-500 pb-2">
                  {t('whyChooseUs')}
                </span>
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-6xl mx-auto">
                {[
                  { emoji: "📊", title: t('feature1'), desc: t('feature1Desc'), color: "text-blue-400" },
                  { emoji: "🛡️", title: t('feature2'), desc: t('feature2Desc'), color: "text-green-400" },
                  { emoji: "🌐", title: t('feature3'), desc: t('feature3Desc'), color: "text-purple-400" },
                ].map((feature, i) => (
                  <motion.div
                    key={i}
                    whileHover={{ y: -6 }}
                    className="bg-gray-800/60 backdrop-blur-md border border-gray-700 rounded-2xl p-8 shadow-sm hover:shadow-lg transition-all duration-300"
                  >
                    <div className={`${feature.color} text-4xl mb-5`}>{feature.emoji}</div>
                    <h4 className="font-semibold text-white mb-3">{feature.title}</h4>
                    <p className="text-gray-300 text-sm">{feature.desc}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Replay Intro */}
            <div className="mt-16 text-center">
              <button
                onClick={() => {
                  try { localStorage.removeItem(FIRST_ACCESS_KEY); } catch {}
                  clearCookie(COOKIE_NAME);
                  setIntroDone(false);
                  setShowIntro(true);
                }}
                className="px-5 py-2 bg-gray-700 text-gray-200 rounded-lg hover:bg-gray-600 transition-all duration-200 shadow-md"
              >
                {t('replayIntro') || 'Replay Intro'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
