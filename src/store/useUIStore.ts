
// ✅ 文件: store/useUIStore.ts
import { create } from "zustand";

export const useUIStore = create<{ confirmOpen: boolean; confirmTarget: string | null; openConfirm: (id: string) => void; closeConfirm: () => void }>((set) => ({
  confirmOpen: false,
  confirmTarget: null,
  openConfirm: (id) => set({ confirmOpen: true, confirmTarget: id }),
  closeConfirm: () => set({ confirmOpen: false, confirmTarget: null }),
}));

