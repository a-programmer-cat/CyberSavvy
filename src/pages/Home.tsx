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
const COOKIE_EXPIRE_DAYS = 365; // cookie 过期时间（如需要 cookie 回退）

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
  const [introDone, setIntroDone] = useState(false); // intro 播放完成
  const [showIntro, setShowIntro] = useState(false); // 是否需要播放 intro（基于缓存）
  const [isChecking, setIsChecking] = useState(true); // 检测状态，避免闪烁

  useEffect(() => {
    // 检查 localStorage -> cookie 回退
    const checkFirstAccess = () => {
      try {
        const localVal = localStorage.getItem(FIRST_ACCESS_KEY);
        if (localVal === "true") return true;

        // 回退检查 cookie（若你在别处设置过 cookie）
        const cookieVal = getCookie(COOKIE_NAME);
        if (cookieVal === "true") {
          // 如果 cookie 存在但 localStorage 没有，帮忙同步到 localStorage
          try {
            localStorage.setItem(FIRST_ACCESS_KEY, "true");
          } catch (e) {
            /* ignore */
          }
          return true;
        }

        return false;
      } catch (e) {
        // 如果 localStorage 被禁用，尝试 cookie 作为唯一方法
        const cookieVal = getCookie(COOKIE_NAME);
        return cookieVal === "true";
      }
    };

    const visited = checkFirstAccess();
    if (!visited) {
      setShowIntro(true); // 首次访问，显示动画
      // 先标记（写入 localStorage + cookie），避免多 tab 重复触发动画
      try {
        localStorage.setItem(FIRST_ACCESS_KEY, "true");
      } catch (e) {
        // localStorage 写入失败 -> fallback to cookie
        setCookie(COOKIE_NAME, "true", COOKIE_EXPIRE_DAYS);
      }
    } else {
      setShowIntro(false);
    }
    setIsChecking(false);
  }, []);

  // 用户主动跳过 intro
  const handleSkipIntro = () => {
    setIntroDone(true);
    setShowIntro(false);
  };

  // 让 Intro 播放结束时调用
  const handleIntroFinish = () => {
    setIntroDone(true);
    setShowIntro(false);
  };

  // 供调试或用户重看使用：清除首次访问标志（localStorage + cookie）
  const clearFirstAccessFlag = () => {
    try {
      localStorage.removeItem(FIRST_ACCESS_KEY);
    } catch (e) {
      /* ignore */
    }
    clearCookie(COOKIE_NAME);
    // 同时把状态重置为未观看，这会在下一次刷新或手动触发时播放 intro
    setIntroDone(false);
    setShowIntro(false);
    // 可选：短暂提示用户已清除
    alert(t('introResetDone') || "Intro reset. It will play on next visit.");
  };

  // 渲染占位：在检测 localStorage 时避免主页面闪烁
  if (isChecking) {
    return <div className="min-h-screen bg-gray-900" />;
  }

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

  return (
    <div className="relative">
      {/* 如果需要播放 intro（首次访问）且尚未完成，显示 IntroScreen */}
      {showIntro && !introDone ? (
        <>
          <IntroScreen onFinish={handleIntroFinish} />
          {/* Skip 按钮（右上角） */}
          <button
            onClick={handleSkipIntro}
            className="fixed top-4 right-4 z-[300] px-3 py-1 text-sm bg-black/50 text-white rounded-md backdrop-blur-sm hover:bg-black/70"
          >
            {t('skipIntro') || 'Skip Intro'}
          </button>
        </>
      ) : (
        // 主页面
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

                    <Link
                      to={card.link}
                      className={`inline-block cursor-target ${card.color} text-white px-6 py-3 rounded-lg font-medium transition-all duration-300 hover:shadow-md`}
                    >
                      {card.buttonText}
                    </Link>
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
                  className="bg-gray-800/80 cursor-target backdrop-blur-sm p-8 rounded-xl shadow-sm border border-gray-700"
                >
                  <div className="text-blue-400 text-3xl mb-4">📊</div>
                  <h4 className="font-medium text-white mb-3">{t('feature1')}</h4>
                  <p className="text-gray-300 text-sm">{t('feature1Desc')}</p>
                </motion.div>
                <motion.div
                  whileHover={{ y: -5 }}
                  className="bg-gray-800/80 cursor-target backdrop-blur-sm p-8 rounded-xl shadow-sm border border-gray-700"
                >
                  <div className="text-green-400 text-3xl mb-4">🛡️</div>
                  <h4 className="font-medium text-white mb-3">{t('feature2')}</h4>
                  <p className="text-gray-300 text-sm">{t('feature2Desc')}</p>
                </motion.div>
                <motion.div
                  whileHover={{ y: -5 }}
                  className="bg-gray-800/80 cursor-target backdrop-blur-sm p-8 rounded-xl shadow-sm border border-gray-700"
                >
                  <div className="text-purple-400 text-3xl mb-4">🌐</div>
                  <h4 className="font-medium text-white mb-3">{t('feature3')}</h4>
                  <p className="text-gray-300 text-sm">{t('feature3Desc')}</p>
                </motion.div>
              </div>
            </motion.div>

            {/* 重看 Intro 的链接（用于测试或用户想再看一次） */}
            <div className="mt-12 text-center">
              <button
                onClick={() => {
                  try { localStorage.removeItem(FIRST_ACCESS_KEY); } catch (e) { }
                  clearCookie(COOKIE_NAME);
                  setIntroDone(false);
                  setShowIntro(true);
                }}
                className="px-4 py-2 bg-gray-700 text-gray-200 rounded-md hover:bg-gray-600 transition-all duration-200"
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
