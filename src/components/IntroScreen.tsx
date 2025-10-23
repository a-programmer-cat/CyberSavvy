import { useEffect, useState } from "react";

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
      setTimeout(() => setStep(2), 10000),
      setTimeout(() => setStep(3), 15000),
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <div className="fixed inset-0 z-[200] h-screen w-full flex flex-col items-center justify-center bg-black text-white font-mono overflow-hidden">
      {/* Step 0: 数据分析提示 */}
      {step === 0 && (
        <div className="text-xl">Analyzing your data...</div>
      )}

      {/* Step 1: 显示真实 IP 信息 */}
      {step === 1 && (
        <div className="text-green-400 text-left space-y-2">
          <p>IP Address: {ipData.ip || "Loading..."}</p>
          <p>
            Location:{" "}
            {ipData.city
              ? `${ipData.city}, ${ipData.region}, ${ipData.country_name}`
              : "Detecting..."}
          </p>
          <p>ISP: {ipData.org || "Detecting..."}</p>
          <p>Device: {deviceInfo}</p>
        </div>
      )}

      {/* Step 2: 警告提示 */}
      {step === 2 && (
        <div className="text-2xl text-red-500 font-bold text-center">
          You just shared this with a website.
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
