// components/MessageBubble.tsx
import clsx from "clsx";
import useAuthStore from "@/store/useAuthStore";

export default function MessageBubble({
  role,
  content,
}: {
  role: "user" | "assistant";
  content: string;
}) {
  const user = useAuthStore((s) => s.user);

  const isUser = role === "user";
  const avatarUrl = isUser
    ? user?.avatar || "/avatar/user.png"
    : "/images/chabox/DeepSeek_logo_icon.png"; // ✅ 本地 DeepSeek 头像

  return (
    <div
      className={clsx(
        "flex items-start space-x-3",
        isUser ? "justify-end" : "justify-start"
      )}
    >
      {!isUser && (
        <img
          src={avatarUrl}
          alt="AI"
          className="w-8 h-8 rounded-full border"
        />
      )}

      <div
        className={clsx(
          "max-w-[70%] px-4 py-2 rounded-xl text-sm whitespace-pre-wrap",
          isUser
            ? "bg-blue-600 text-white rounded-br-none"
            : "bg-gray-100 text-gray-800 rounded-bl-none"
        )}
      >
        {content}
      </div>

      {isUser && (
        <img
          src={avatarUrl}
          alt="Me"
          className="w-8 h-8 rounded-full border"
        />
      )}
    </div>
  );
}
