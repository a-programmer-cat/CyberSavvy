import { useTranslation } from 'react-i18next';
import { auth } from "../components/FireBase";
import { useAuth } from "../components/AuthContext";
import { useState } from "react";
import { signOut } from "firebase/auth";
import { motion } from 'framer-motion';
import { Link, useNavigate, useLocation } from "react-router-dom";
import {
  FaHome,
  FaGraduationCap,
  FaClipboardCheck,
  FaBookOpen,
  FaQuestionCircle,
  FaGlobe
} from 'react-icons/fa';

export const MainNav = () => {
  const { t, i18n } = useTranslation();
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [langMenuOpen, setLangMenuOpen] = useState(false);

  const handleLogout = async () => {
    await signOut(auth);
    setMenuOpen(false);
    navigate("/");
  };

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    setLangMenuOpen(false);
  };

  const navItems = [
    { path: "/", name: t("home"), icon: <FaHome className="mr-2" />, color: "text-blue-400 hover:bg-blue-900/50" },
    { path: "/learning", name: t("learningHub.title"), icon: <FaGraduationCap className="mr-2" />, color: "text-purple-400 hover:bg-purple-900/50" },
    { path: "/test", name: t("test"), icon: <FaClipboardCheck className="mr-2" />, color: "text-green-400 hover:bg-green-900/50" },
    { path: "/stories", name: t("stories"), icon: <FaBookOpen className="mr-2" />, color: "text-yellow-400 hover:bg-yellow-900/50" },
    { path: "/help", name: t("help.title"), icon: <FaQuestionCircle className="mr-2" />, color: "text-red-400 hover:bg-red-900/50" }
  ];

  const languages = [
    { code: "en", label: "English" },
    { code: "zh", label: "中文" },
    { code: "ms", label: "BM" }
  ];

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-gradient-to-r from-gray-900 to-gray-800 text-white shadow-lg sticky top-0 z-50 backdrop-blur-md"
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* ✅ 左边导航 */}
          <div className="hidden md:flex space-x-2">
            {navItems.map((item, index) => {
              const isActive = location.pathname === item.path;
              return (
                <motion.div key={index} whileHover={{ y: -2 }} whileTap={{ scale: 0.95 }}>
                  <Link
                    to={item.path}
                    className={`flex items-center px-4 py-2 rounded-md transition-all duration-300 
                      ${item.color} 
                      ${isActive ? "bg-gray-700/60 border border-gray-600 shadow-inner" : ""}
                      min-w-[130px] justify-center`}
                  >
                    {item.icon}
                    <span>{item.name}</span>
                  </Link>
                </motion.div>
              );
            })}
          </div>

          {/* ✅ 右边：语言选择 + 用户 */}
          <div className="flex items-center space-x-4">
            {/* 🌐 语言切换下拉菜单 */}
            <div className="relative">
              <button
                onClick={() => setLangMenuOpen(!langMenuOpen)}
                className="flex items-center px-3 py-2 rounded-lg bg-gray-700 hover:bg-gray-600 transition-all duration-300 min-w-[120px] justify-center"
              >
                <FaGlobe className="mr-2" />
                {i18n.language === "zh" ? "中文" : i18n.language === "ms" ? "BM" : "English"}
              </button>
              {langMenuOpen && (
                <div className="absolute right-0 mt-2 w-32 bg-gray-700 border border-gray-600 rounded-lg shadow-lg">
                  {languages.map(lang => (
                    <button
                      key={lang.code}
                      onClick={() => changeLanguage(lang.code)}
                      className={`w-full text-left px-4 py-2 hover:bg-gray-600 rounded-md ${
                        i18n.language === lang.code ? "bg-gray-600 font-semibold" : ""
                      }`}
                    >
                      {lang.label}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* 👤 用户菜单 */}
            {!user ? (
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link
                  to="/login"
                  className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg transition-all duration-300 shadow-md"
                >
                  {t("login")}
                </Link>
              </motion.div>
            ) : (
              <div className="relative">
                <button
                  onClick={() => setMenuOpen(!menuOpen)}
                  className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-hover transition-all"
                >
                  {user.displayName || user.email?.split("@")[0] || "User"}
                </button>
                {menuOpen && (
                  <div className="absolute right-0 mt-2 w-40 bg-gray-700 border border-gray-600 rounded-lg shadow-lg">
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 hover:bg-gray-600 rounded-md"
                    >
                      {t("nav.logout")}
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.nav>
  );
};
