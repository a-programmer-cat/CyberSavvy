"use client";

import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { CodeRainBackground } from "../components/CodeRainBackground";
import IntroScreen from "../components/IntroScreen";
import { FaGraduationCap, FaClipboardCheck, FaUserFriends } from "react-icons/fa";

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
  const { t, i18n } = useTranslation();
  const [introDone, setIntroDone] = useState(false);
  const [showIntro, setShowIntro] = useState(false);
  const [isChecking, setIsChecking] = useState(true);
  const [introKey, setIntroKey] = useState(0); // 👈 用于强制重新挂载
  const [stories, setStories] = useState<any[]>([]);

  useEffect(() => {
    const langCode = i18n.language as "en" | "zh" | "ms";
    fetch(`/modules/cases/cases.${langCode}.json`)
      .then((res) => res.json())
      .then((data) => setStories(data))
      .catch(() => setStories([]));
  }, [i18n.language]);

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

  if (isChecking) return <div className="min-h-screen bg-black" />;

  const cards = [
    {
      icon: <FaGraduationCap className="text-5xl mb-6 text-blue-400" />,
      title: t("quickStart"),
      desc: t("startLearning"),
      link: "/learning",
      color: "from-blue-400 to-cyan-400",
    },
    {
      icon: <FaClipboardCheck className="text-5xl mb-6 text-green-400" />,
      title: t("takeTest"),
      desc: t("testYourKnowledge"),
      link: "/test",
      color: "from-green-400 to-emerald-400",
    },
    {
      icon: <FaUserFriends className="text-5xl mb-6 text-purple-400" />,
      title: t("readStories"),
      desc: t("learnFromOthers"),
      link: "/stories",
      color: "from-purple-400 to-pink-400",
    },
  ];

  return (
    <div className="relative min-h-screen bg-black text-white overflow-hidden">
      {showIntro && !introDone ? (
        <>
          <IntroScreen key={introKey} onFinish={handleIntroFinish} />
          {/* Skip 按钮（右上角） */}
          <button
            onClick={handleSkipIntro}
            className="fixed top-4 right-4 z-[300] px-3 py-1 text-sm bg-black/50 text-white rounded-md backdrop-blur-sm hover:bg-black/70"
          >
            {t('skipIntro') || 'Skip Intro'}
          </button>
        </>
      ) : (
        <>
          {/* 背景层 */}
          <div className="absolute inset-0 z-0 pointer-events-none">
            <CodeRainBackground />
            <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black/90 pointer-events-none" />
          </div>

          {/* 内容 */}
          <div className="relative z-10 flex flex-col items-center px-6 py-24 md:py-32">
            {/* Logo & Hero Section */}
            <motion.div
              initial={{ opacity: 0, y: -30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center mb-20"
            >
              <img
                src="/logo.png"
                alt="CyberSavvy"
                className="w-20 h-20 mx-auto mb-6 drop-shadow-xl"
              />
              <h1 className="text-5xl md:text-6xl font-extrabold bg-gradient-to-r from-cyan-300 to-blue-500 bg-clip-text text-transparent mb-5">
                {t("welcome")}
              </h1>
              <p className="text-gray-300 text-lg max-w-2xl mx-auto leading-relaxed">
                {t("subtitle")}
              </p>
            </motion.div>

            {/* 三个卡片区 */}
            <motion.div
              initial="hidden"
              animate="show"
              variants={{
                hidden: { opacity: 0 },
                show: {
                  opacity: 1,
                  transition: { staggerChildren: 0.1 },
                },
              }}
              className="grid grid-cols-1 md:grid-cols-3 gap-10 w-full max-w-6xl mb-28"
            >
              {cards.map((c, i) => (
                <motion.div
                  key={i}
                  variants={{
                    hidden: { opacity: 0, y: 40 },
                    show: { opacity: 1, y: 0, transition: { duration: 0.45 } },
                  }}
                  whileHover={{ y: -6, scale: 1.02 }}
                  className="relative bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-10 shadow-xl hover:shadow-cyan-500/20 transition-all"
                >
                  <div className="flex flex-col items-center text-center">
                    {c.icon}
                    <h2 className="text-2xl font-semibold mb-3">{c.title}</h2>
                    <p className="text-gray-400 mb-6">{c.desc}</p>
                    <Link
                      to={c.link}
                      className={`px-6 cursor-target py-3 rounded-xl font-medium bg-gradient-to-r ${c.color} hover:opacity-90 transition-all duration-200`}
                    >
                      {t("explore")}
                    </Link>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* You Are Not Alone Section */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="w-full max-w-6xl text-center pb-20"
            >
              <h3 className="text-3xl font-bold mb-12 text-transparent bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text">
                {t("youAreNotAlone.title")}
              </h3>

              {/** 显示前 3 个故事 */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {stories
                  .sort(() => Math.random() - 0.5) // 随机打乱顺序
                  .slice(0, 3)                     // 取前3个
                  .map((story) => (
                    <motion.div
                      key={story.id}
                      whileHover={{ scale: 1.03 }}
                      transition={{ duration: 0.25 }}
                      className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md shadow-lg text-left flex flex-col justify-between"
                    >
                      <div>
                        <h4 className="text-lg font-semibold mb-2 text-gradient-to-r from-pink-400 to-purple-400">
                          {story.title}
                        </h4>
                        <p className="text-gray-400 text-sm mb-4">
                          {story.summary.length > 120
                            ? story.summary.slice(0, 120) + "..."
                            : story.summary}
                        </p>
                      </div>
                      <Link
                        to="/stories"
                        className="mt-auto inline-block text-sm text-pink-400 hover:text-purple-400 underline"
                      >
                        {t("youAreNotAlone.exploreMore")}
                      </Link>
                    </motion.div>
                  ))}
              </div>
            </motion.div>

            {/* 特性展示区 */}
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="w-full max-w-5xl text-center pb-16"
            >
              <h3 className="text-3xl font-bold mb-12 text-transparent bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text">
                {t("whyChooseUs")}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                  { emoji: "🧠", title: t("feature1"), desc: t("feature1Desc") },
                  { emoji: "🔒", title: t("feature2"), desc: t("feature2Desc") },
                  { emoji: "🌍", title: t("feature3"), desc: t("feature3Desc") },
                ].map((f, i) => (
                  <motion.div
                    key={i}
                    whileHover={{ scale: 1.04 }}
                    transition={{ duration: 0.25 }}
                    className="p-8 rounded-2xl bg-gradient-to-b from-white/10 to-white/5 border border-white/10 backdrop-blur-sm"
                  >
                    <div className="text-4xl mb-4">{f.emoji}</div>
                    <h4 className="text-lg font-semibold mb-2">{f.title}</h4>
                    <p className="text-gray-400 text-sm">{f.desc}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Replay Intro 左下角 */}
          <button
            onClick={() => {
              try { localStorage.removeItem(FIRST_ACCESS_KEY); } catch (e) { }
              clearCookie(COOKIE_NAME);
              setIntroDone(false);
              setIntroKey(prev => prev + 1); // 👈 强制刷新 IntroScreen
              setShowIntro(true);
            }}
            className="fixed bottom-6 left-6 z-[1000] bg-white/10 backdrop-blur-md border border-white/20 text-gray-300 px-4 py-2 rounded-xl hover:bg-white/20 transition-all text-sm"
          >
            {t("replayIntro") || "Replay Intro"}
          </button>
        </>
      )}
    </div>
  );
};
