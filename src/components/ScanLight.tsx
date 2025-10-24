"use client";
import { motion } from "framer-motion";

export default function ScanLight() {
  return (
    <div className="absolute inset-0 overflow-hidden z-10 pointer-events-none">
      {/* 扫描光线 */}
      <motion.div
        className="absolute w-full h-[20vh] bg-gradient-to-b from-transparent via-green-400/20 to-transparent"
        initial={{ top: "-20%" }}
        animate={{ top: ["-20%", "120%"] }}
        transition={{
          duration: 3.5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      {/* 微弱闪烁噪点层 */}
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/noisy-grid.png')] opacity-5 mix-blend-screen"></div>
    </div>
  );
}
