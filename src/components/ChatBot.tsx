import { useState, useEffect } from "react";
import { useTranslation } from 'react-i18next';

export default function ChatBot() {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ from: string; text: string }[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [typingText, setTypingText] = useState(""); // AI打字中的文字

  // 从localStorage恢复聊天记录
  useEffect(() => {
    const saved = localStorage.getItem("cybersavvy_chat");
    if (saved) setMessages(JSON.parse(saved));
  }, []);

  // 保存聊天记录
  useEffect(() => {
    localStorage.setItem("cybersavvy_chat", JSON.stringify(messages));
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMsg = { from: "user", text: input };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);
    setTypingText("");

    try {
      const res = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}`,
        },
        body: JSON.stringify({
          model: "gpt-3.5-turbo",
          messages: [
            {
              role: "system",
              content:
                "You are CyberSavvy AI, a friendly and helpful cybersecurity assistant for Malaysians. Provide clear, practical advice and examples.",
            },
            { role: "user", content: input },
          ],
        }),
      });

      const data = await res.json();
      const aiText =
        data.choices?.[0]?.message?.content ||
        "⚠️ Sorry, I couldn’t generate a reply.";

      // 打字机效果
      let i = 0;
      const interval = setInterval(() => {
        if (i < aiText.length) {
          setTypingText((prev) => prev + aiText[i]);
          i++;
        } else {
          clearInterval(interval);
          setMessages((prev) => [...prev, { from: "ai", text: aiText }]);
          setTypingText("");
          setLoading(false);
        }
      }, 10);
    } catch (err) {
      console.error(err);
      setMessages((prev) => [
        ...prev,
        { from: "ai", text: "⚠️ Something went wrong." },
      ]);
      setLoading(false);
    }
  };

  return (
    <div>
      {/* 右下角悬浮按钮 */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed z-[100] bottom-6 right-6 bg-blue-600 text-white w-14 h-14 rounded-full shadow-lg hover:bg-blue-700 transition flex items-center justify-center text-2xl"
      >
        💬
      </button>

      {/* 聊天窗口 */}
      {isOpen && (
        <div className="fixed z-[9999] bottom-24 right-6 w-96 bg-white border border-gray-300 rounded-2xl shadow-2xl flex flex-col overflow-hidden">
          {/* Header */}
          <div className="bg-blue-600 text-white text-lg font-semibold px-4 py-3 flex justify-between items-center">
            {t("chatbot.title")}
            <button onClick={() => setIsOpen(false)} className="text-sm">
              ✖
            </button>
          </div>

          {/* Chat area */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3 max-h-[60vh]">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex items-end ${
                  msg.from === "user" ? "justify-end" : "justify-start"
                }`}
              >
                {msg.from === "ai" && (
                  <div className="w-8 h-8 rounded-full bg-green-600 text-white flex items-center justify-center font-bold mr-2">
                    🤖
                  </div>
                )}
                <div
                  className={`p-3 rounded-2xl max-w-[66%] ${
                    msg.from === "user"
                      ? "bg-blue-600 text-white rounded-br-none"
                      : "bg-gray-200 text-gray-800 rounded-bl-none"
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}

            {/* AI 打字中 */}
            {typingText && (
              <div className="flex justify-start items-end space-x-2">
                <div className="w-8 h-8 rounded-full bg-green-600 text-white flex items-center justify-center font-bold">
                  🤖
                </div>
                <div className="p-2 rounded-2xl max-w-[66%] text-gray-800 bg-gray-200 text-left">
                  {typingText}
                </div>
              </div>
            )}
          </div>

          {/* Input area */}
          <div className="p-3 border-t border-gray-200 flex items-center space-x-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              placeholder={t("chatbot.hint")}
              className="flex-1 border border-gray-300 text-black rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={handleSend}
              disabled={loading}
              className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg px-4 py-2 text-sm transition"
            >
                ➤
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
