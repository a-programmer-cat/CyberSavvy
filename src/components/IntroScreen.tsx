import { useEffect, useState } from "react";
import TextType from "./TextType";
import DecryptedText from "./DecryptedText";
import TrueFocus from "./TrueFocus";
import ParticleBackground from "./ParticleBackground";
import ScanLight from "./ScanLight";

interface IPData {
  ip?: string;
  city?: string;
  region?: string;
  country_name?: string;
  org?: string;
}

export default function IntroScreen({ onFinish }: { onFinish: () => void }) {
  const [step, setStep] = useState(0);
  const [ipData, setIpData] = useState<IPData>({});
  const [deviceInfo, setDeviceInfo] = useState("");
  const [scale, setScale] = useState(1);

  // 自适应缩放逻辑（仅影响手机和平板）
  useEffect(() => {
    const updateScale = () => {
      const width = window.innerWidth;
      if (width < 480) setScale(0.75); // 手机
      else if (width < 768) setScale(0.9); // 平板
      else setScale(1); // 桌面保持原样
    };

    updateScale();
    window.addEventListener("resize", updateScale);
    return () => window.removeEventListener("resize", updateScale);
  }, []);

  // 获取 IP 与设备信息
  useEffect(() => {
    fetch("https://ipapi.co/json/")
      .then((res) => res.json())
      .then((data) => setIpData(data))
      .catch(() => setIpData({ ip: "Unavailable" }));

    const ua = navigator.userAgent;
    if (/mobile/i.test(ua)) setDeviceInfo("Mobile Device");
    else if (/Mac|Windows|Linux/i.test(ua)) setDeviceInfo("Desktop / Laptop");
    else setDeviceInfo("Unknown Device");

    const timers = [
      setTimeout(() => setStep(1), 5000),
      setTimeout(() => setStep(2), 13000),
      setTimeout(() => setStep(3), 20000),
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <div className="fixed inset-0 z-[200] h-screen w-full flex items-center justify-center bg-black text-white font-mono overflow-hidden">
      <ParticleBackground />
      <ScanLight />

      {/* 添加一个缩放容器 + 边距，桌面不影响 */}
      <div
        className="z-[220] px-4"
        style={{
          transform: `scale(${scale})`,
          transformOrigin: "center",
          transition: "transform 0.3s ease",
        }}
      >
        {step === 0 && (
          <div className="text-3xl font-bold text-start space-y-2">
            <DecryptedText
              text="Analyzing your data..."
              speed={100}
              maxIterations={20}
              animateOn="view"
              revealDirection="center"
            />
          </div>
        )}

        {step === 1 && (
          <div className="text-2xl font-bold text-green-400 text-left space-y-3">
            <p>
              IP Address:{" "}
              <DecryptedText
                key={ipData.ip}
                text={ipData.ip ?? "Loading..."}
                speed={60}
                maxIterations={15}
                revealDirection="start"
                animateOn="view"
              />
            </p>
            <p>
              Location:{" "}
              <DecryptedText
                key={ipData.city}
                text={
                  ipData.city
                    ? `${ipData.city}, ${ipData.region}, ${ipData.country_name}`
                    : "Detecting..."
                }
                speed={60}
                maxIterations={15}
                revealDirection="start"
                animateOn="view"
              />
            </p>
            <p>
              ISP:{" "}
              <DecryptedText
                key={ipData.org}
                text={ipData.org ?? "Detecting..."}
                speed={60}
                maxIterations={15}
                revealDirection="start"
                animateOn="view"
              />
            </p>
            <p>
              Device:{" "}
              <DecryptedText
                key={deviceInfo}
                text={deviceInfo ?? "Unknown"}
                speed={60}
                maxIterations={15}
                revealDirection="start"
                animateOn="view"
              />
            </p>
          </div>
        )}

        {step === 2 && (
          <div className="text-3xl text-red-500 font-bold text-center">
            <TextType
              text={[
                "[!] ALERT: Your information is now visible to this site.\n" +
                  "...and yet, you didn’t even click anything.",
              ]}
              typingSpeed={45}
              pauseDuration={1200}
              showCursor={true}
              cursorCharacter="|"
            />
          </div>
        )}

        {step === 3 && (
          <div className="text-center space-y-6">
            <h1 className="text-4xl font-bold text-cyan-400">
              Welcome to CyberSavvy
            </h1>
            <p className="text-gray-300">Learn to protect your digital identity.</p>
            <button
              onClick={onFinish}
              className="px-6 py-2 bg-cyan-500 text-white rounded-lg shadow-md hover:bg-cyan-600"
            >
              Enter Site
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
