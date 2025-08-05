// components/ChatWindow.tsx
"use client";
import { useState, useRef, useEffect } from "react";
import { useChatStore } from "@/store/useChatStore";
import { sendMessageToDeepSeek } from "@/api/deepseek";
import MessageBubble from "./MessageBubble";

export default function ChatWindow() {
  const { chats, currentChatId, sendMessage } = useChatStore();
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const chat = currentChatId ? chats[currentChatId] : null;
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chat?.messages.length, loading]);

  const handleSend = async () => {
    if (!input.trim() || !chat) return;

    const userMessage = { role: "user" as const, content: input };
    sendMessage(userMessage);
    setInput("");
    setLoading(true);

    try {
      const reply = await sendMessageToDeepSeek([...chat.messages, userMessage]);
      sendMessage({ role: "assistant", content: reply });
    } catch {
      sendMessage({ role: "assistant", content: "❌ 出错了，请稍后再试。" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col flex-1 h-full">
      {/* 消息区域：固定高度、可滚动 */}
      <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4 bg-white">
        {chat?.messages.map((msg, idx) => (
          <MessageBubble key={idx} role={msg.role} content={msg.content} />
        ))}
        {loading && <div className="text-sm text-gray-400">🤖 正在思考...</div>}
        <div ref={chatEndRef} />
      </div>

      {/* 输入框区域 */}
      <div className="border-t p-4 bg-white flex space-x-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="请输入内容并按 Enter..."
          className="flex-1 px-4 py-2 border rounded-2xl focus:outline-none"
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              handleSend();
            }
          }}
        />
        <button
          onClick={handleSend}
          disabled={loading}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl"
        >
          发送
        </button>
      </div>
    </div>
  );
}
