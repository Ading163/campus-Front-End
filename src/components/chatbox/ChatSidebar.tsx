"use client";
import { useChatStore } from "@/store/useChatStore";
import { useUIStore } from "@/store/useUIStore";

export default function ChatSidebar() {
  const { chats, currentChatId, setCurrentChat, newChat, renameChat } = useChatStore();
  const { openConfirm } = useUIStore();
  const sortedChats = Object.values(chats).sort((a, b) => b.updatedAt - a.updatedAt);

  return (
    <div className="w-72 bg-white border-r shadow-md rounded-r-2xl flex flex-col p-4">
      <button
        onClick={newChat}
        className="w-full py-2 px-4 bg-blue-600 text-white rounded-xl mb-4 hover:bg-blue-700"
      >➕ 新建聊天</button>

      <div className="flex-1 overflow-y-auto space-y-2">
        {sortedChats.map((chat) => (
          <div
            key={chat.id}
            className={`group px-4 py-2 rounded-xl cursor-pointer flex items-center justify-between ${
              chat.id === currentChatId ? "bg-blue-100" : "hover:bg-gray-100"
            }`}
          >
            <span onClick={() => setCurrentChat(chat.id)} className="truncate flex-1">{chat.title}</span>
            <div className="hidden group-hover:flex space-x-1 text-gray-400 text-xs ml-2">
              <button onClick={() => {
                const title = prompt("输入新名称", chat.title);
                if (title) renameChat(chat.id, title);
              }}>✏️</button>
              <button onClick={() => openConfirm(chat.id)}>🗑️</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}