import { useState, useEffect , useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from 'react-i18next';

export default function ChatBot() {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<{ role: string; content: string }[]>(
    () => JSON.parse(localStorage.getItem("chatMessages") || "[]")
  );
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    localStorage.setItem("chatMessages", JSON.stringify(messages));
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;
    const userMessage = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}`,
        },
        body: JSON.stringify({
          model: "gpt-4o-mini",
          messages: [
            { role: "system", content: "You are a helpful cybersecurity assistant for Malaysians. Give clear, simple, accurate advice on online safety, scams, and privacy." },
            ...messages,
            userMessage,
          ],
        }),
      });

      const data = await res.json();
      const aiMessage = {
        role: "assistant",
        content: data.choices?.[0]?.message?.content || "Sorry, I couldn’t get a response.",
      };
      setMessages((prev) => [...prev, aiMessage]);
    } catch (err) {
      console.error(err);
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "⚠️ Connection error. Please try again." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Floating Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-full shadow-lg z-50"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        💬
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.3 }}
            className="fixed bottom-20 right-6 w-80 md:w-96 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-xl shadow-2xl flex flex-col z-50"
          >
            {/* Header */}
            <div className="flex justify-between items-center px-4 py-2 bg-blue-600 text-white rounded-t-xl">
              <span className="font-semibold">{t("chatbot.title")}</span>
              <button onClick={() => setIsOpen(false)}>❌</button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3 max-h-96">
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={`p-2 rounded-lg text-sm ${
                    msg.role === "user"
                      ? "bg-blue-500 dark:bg-blue-900 self-end text-right"
                      : "bg-gray-500 dark:bg-gray-700"
                  }`}
                >
                  {msg.content}
                </div>
              ))}
              {loading && <div className="text-gray-400 text-sm">Thinking...</div>}
            </div>

            {/* Input */}
            <div className="flex items-center border-t border-gray-300 dark:border-gray-700 p-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                className="flex-1 px-3 py-2 rounded-md bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none"
                placeholder={t("chatbot.hint")}
              />
              <button
                onClick={handleSend}
                disabled={loading}
                className="ml-2 px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md"
              >
                ➤
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
