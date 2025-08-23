import { useState } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

export const HackerCharacter = () => {
  const { t } = useTranslation();
  const tips = t("cyberTips", { returnObjects: true });

  const [tip, setTip] = useState("");
  const [showTip, setShowTip] = useState(false);

  const handleClick = () => {
    const randomTip = tips[Math.floor(Math.random() * tips.length)];
    setTip(randomTip);
    setShowTip(true);
  };

  return (
    <div className="hidden md:block fixed bottom-4 right-4 z-50">
      {showTip && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          className="mb-3 px-4 py-2 bg-gray-800 text-white text-sm rounded-lg shadow-lg border border-cyan-500"
        >
          {tip}
        </motion.div>
      )}

      <motion.img
        src="../../images/hacker.png"
        alt="Hacker"
        initial={{ opacity: 0, x: 50 }}
        animate={{ 
          opacity: 1, 
          x: 0,
          y: [0, -15, 0] 
        }}
        transition={{ 
          duration: 3
        }}
        onClick={handleClick}
        className="w-64 cursor-pointer drop-shadow-[0_0_20px_rgba(0,255,255,0.6)]"
      />
    </div>
  );
};
