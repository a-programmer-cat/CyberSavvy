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

    // 定时切换阶段
    const timers = [
      setTimeout(() => setStep(1), 5000),
      setTimeout(() => setStep(2), 13000),
      setTimeout(() => setStep(3), 20000),
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <div className="fixed inset-0 z-[200] h-screen w-full flex flex-col items-center bg-black justify-center text-white font-mono overflow-hidden">
      <ParticleBackground />
      <ScanLight />

    <div className="z-[220] ">
      {/* Step 0: 数据分析提示 */}
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

      {/* Step 1: 显示真实 IP 信息（标签固定 + 数据解密） */}
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

      {/* Step 2: 警告提示 */}
      {step === 2 && (
        <div className="text-3xl text-red-500 font-bold text-center">
          <TextType
            text={[
              "[!] ALERT: Your information is now visible to this site.\n" +
              "...and yet, you didn’t even click anything."
            ]}
            typingSpeed={45}
            pauseDuration={1200}
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
    </div>
  );
}
