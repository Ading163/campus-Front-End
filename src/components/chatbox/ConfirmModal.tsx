"use client";
import { useUIStore } from "@/store/useUIStore";
import { useChatStore } from "@/store/useChatStore";

export default function ConfirmModal() {
  const { confirmOpen, confirmTarget, closeConfirm } = useUIStore();
  const deleteChat = useChatStore((s) => s.deleteChat);

  if (!confirmOpen || !confirmTarget) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 w-80 shadow-lg">
        <h2 className="text-lg font-semibold mb-4">确认删除</h2>
        <p className="mb-6 text-sm text-gray-600">确定要删除这条对话吗？操作不可撤销。</p>
        <div className="flex justify-end space-x-2">
          <button
            onClick={closeConfirm}
            className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300"
          >取消</button>
          <button
            onClick={() => {
              deleteChat(confirmTarget);
              closeConfirm();
            }}
            className="px-4 py-2 rounded bg-red-500 text-white hover:bg-red-600"
          >删除</button>
        </div>
      </div>
    </div>
  );
}
