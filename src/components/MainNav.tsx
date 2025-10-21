import { useTranslation } from 'react-i18next';
import { LanguageSwitcher } from './LanguageSwitcher';
import { auth } from "../components/FireBase";
import { useAuth } from "../components/AuthContext";
import { useState, useEffect } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { motion } from 'framer-motion';
import { Link, useNavigate } from "react-router-dom";
import {
  FaHome,
  FaGraduationCap,
  FaClipboardCheck,
  FaBookOpen,
  FaQuestionCircle
} from 'react-icons/fa';

export const MainNav = () => {
  const { t } = useTranslation();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = async () => {
    await signOut(auth);
    setMenuOpen(false);
    navigate("/");
  };

  const navItems = [
    {
      path: "/",
      name: t('home'),
      icon: <FaHome className="mr-2" />,
      color: "text-blue-400 hover:bg-blue-900/50"
    },
    {
      path: "/learning",
      name: t('learningHub.title'),
      icon: <FaGraduationCap className="mr-2" />,
      color: "text-purple-400 hover:bg-purple-900/50"
    },
    {
      path: "/test",
      name: t('test'),
      icon: <FaClipboardCheck className="mr-2" />,
      color: "text-green-400 hover:bg-green-900/50"
    },
    {
      path: "/stories",
      name: t('stories'),
      icon: <FaBookOpen className="mr-2" />,
      color: "text-yellow-400 hover:bg-yellow-900/50"
    },
    {
      path: "/help",
      name: t('help.title'),
      icon: <FaQuestionCircle className="mr-2" />,
      color: "text-red-400 hover:bg-red-900/50"
    }
  ];

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-gradient-to-r from-gray-900 to-gray-800 text-white shadow-xl"
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="hidden md:flex space-x-1">
            {navItems.map((item, index) => (
              <motion.a
                key={index}
                href={item.path}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.95 }}
                className={`flex items-center px-4 py-2 rounded-lg transition-all duration-300 ${item.color}`}
              >
                {item.icon}
                <span>{item.name}</span>
              </motion.a>
            ))}
          </div>

          <div className="md:hidden flex items-center">
            <button className="p-2 rounded-md hover:bg-gray-700 focus:outline-none">
              <svg
                className="h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>

          <div className="flex items-center space-x-4">
            <LanguageSwitcher />
          </div>

          <div className="relative">
            {!user ? (
              <div className="flex items-center space-x-4">
                <LanguageSwitcher />
                <motion.a
                  href="/login"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="hidden md:flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg transition-colors duration-300"
                >
                  <span>{t('login')}</span>
                </motion.a>
              </div>
            ) : (
              <div className="relative">
                <button
                  onClick={() => setMenuOpen(!menuOpen)}
                  className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-hover transition"
                >
                  {user.displayName || user.email?.split("@")[0] || "User"}
                </button>

                {menuOpen && (
                  <div className="absolute right-0 mt-2 w-40 bg-bg-card border border-bg-border rounded-lg shadow-lg">
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 hover:bg-bg-border rounded-md"
                    >
                      {t('nav.logout')}
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        <div className="md:hidden pb-4">
          <div className="flex flex-col space-y-2">
            {navItems.map((item, index) => (
              <a
                key={index}
                href={item.path}
                className={`flex items-center px-4 py-3 rounded-md transition-colors ${item.color}`}
              >
                {item.icon}
                <span className="ml-3">{item.name}</span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </motion.nav>
  );
};