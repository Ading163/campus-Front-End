// ✅ 文件: store/useChatStore.ts
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { nanoid } from "nanoid";

export interface Message {
  role: "user" | "assistant";
  content: string;
}

export interface ChatSession {
  id: string;
  title: string;
  messages: Message[];
  updatedAt: number;
}

interface ChatState {
  chats: Record<string, ChatSession>;
  currentChatId: string | null;
  newChat: () => void;
  sendMessage: (msg: Message) => void;
  renameChat: (id: string, newTitle: string) => void;
  deleteChat: (id: string) => void;
  setCurrentChat: (id: string) => void;
}

export const useChatStore = create<ChatState>()(
  persist(
    (set, get) => ({
      chats: {},
      currentChatId: null,

      newChat: () => {
        const id = nanoid();
        const newSession: ChatSession = {
          id,
          title: "新对话",
          messages: [],
          updatedAt: Date.now(),
        };
        set((state) => ({
          chats: { ...state.chats, [id]: newSession },
          currentChatId: id,
        }));
      },

      sendMessage: (msg) => {
        const { currentChatId, chats } = get();
        if (!currentChatId) return;
        const session = chats[currentChatId];
        const updated = {
          ...session,
          messages: [...session.messages, msg],
          updatedAt: Date.now(),
          title:
            session.title === "新对话" && msg.role === "user"
              ? msg.content.slice(0, 20)
              : session.title,
        };
        set((state) => ({
          chats: { ...state.chats, [currentChatId]: updated },
        }));
      },

      renameChat: (id, title) => {
        const chat = get().chats[id];
        set((state) => ({
          chats: {
            ...state.chats,
            [id]: { ...chat, title },
          },
        }));
      },

      deleteChat: (id) => {
        const { chats, currentChatId } = get();
        const { [id]: _, ...rest } = chats;
        const newId = Object.keys(rest)[0] || null;
        set({ chats: rest, currentChatId: newId });
      },

      setCurrentChat: (id) => set({ currentChatId: id }),
    }),
    {
      name: "chat-storage",
    }
  )
);
