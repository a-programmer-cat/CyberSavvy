import { useEffect, useState } from "react";
import TextType from './TextType';
import DecryptedText from './DecryptedText';
import TrueFocus from './TrueFocus';

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

  // 获取 IP 信息
  useEffect(() => {
    fetch("https://ipapi.co/json/")
      .then((res) => res.json())
      .then((data) => setIpData(data))
      .catch(() => setIpData({ ip: "Unavailable" }));

    // 获取设备信息
    const ua = navigator.userAgent;
    if (/mobile/i.test(ua)) setDeviceInfo("Mobile Device");
    else if (/Mac|Windows|Linux/i.test(ua)) setDeviceInfo("Desktop / Laptop");
    else setDeviceInfo("Unknown Device");

    // 控制步骤时间
    const timers = [
      setTimeout(() => setStep(1), 5000),
      setTimeout(() => setStep(2), 15000),
      setTimeout(() => setStep(3), 20000),
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  const infoTexts = 
    `IP Address: ${ipData?.ip ?? "Loading..."}\n` +
    `Location: ${ipData?.city
      ? `${ipData.city}, ${ipData.region}, ${ipData.country_name}`
      : "Detecting..."}\n` +
    `ISP: ${ipData?.org ?? "Detecting..."}\n` +
    `Device: ${deviceInfo ?? "Unknown"}` ;


  return (
    <div className="fixed inset-0 z-[200] h-screen w-full flex flex-col items-center justify-center bg-black text-white font-mono overflow-hidden">
      {/* Step 0: 数据分析提示 */}
      {step === 0 && (
        <div className="text-3xl font-bold text-left space-y-2">
          <DecryptedText
            text="Analyzing your data..."
            speed={100}
            maxIterations={20}
            animateOn="view"
            revealDirection="center"
          />
        </div>
      )}

      {/* Step 1: 显示真实 IP 信息 */}
      {step === 1 && (
        <div className="text-3xl font-bold text-green-400 text-left space-y-2">
          <TextType
            text={infoTexts}
            typingSpeed={50}
            pauseDuration={1500}
            showCursor={true}
            cursorCharacter="|"
          />
        </div>
      )}

      {/* Step 2: 警告提示 */}
      {step === 2 && (
        <div className="text-3xl text-red-500 font-bold text-center">
          <TextType
            text={["You just shared this with a website."]}
            typingSpeed={50}
            pauseDuration={1500}
            showCursor={true}
            cursorCharacter="|"
          />
        </div>
      )}

      {/* Step 3: 欢迎界面 */}
      {step === 3 && (
        <div className="text-center space-y-6">
          <h1 className="text-4xl font-bold text-cyan-400">
            Welcome to CyberSavvy
          </h1>
          <p className="text-gray-300">
            Learn to protect your digital identity.
          </p>
          <button
            onClick={onFinish}
            className="px-6 py-2 bg-cyan-500 text-white rounded-lg shadow-md hover:bg-cyan-600"
          >
            Enter Site
          </button>
        </div>
      )}
    </div>
  );
}
