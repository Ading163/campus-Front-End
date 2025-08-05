"use client";

import ChatSidebar from "./ChatSidebar";
import ChatWindow from "./ChatWindow";
import ConfirmModal from "./ConfirmModal";


export default function ChatPage() {
  return (
<div className="flex h-screen">
  <ChatSidebar />
  <div className="flex-1 flex flex-col">
    <ChatWindow />
  </div>
  <ConfirmModal />
</div>

  );
}