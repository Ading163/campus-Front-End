// src/stores/useAuthStore.ts
import { create } from 'zustand';

interface Role {
  id: number;
  name: string;
  description: string;
}

interface User {
  id: number;
  name: string;
  email: string;
  phone?: string | null;
  avatar?: string | null;
  language?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  role: Role;
}

interface AuthState {
  user: User | null;
  setUser: (user: User) => void;
  logout: () => void;
}

const useAuthStore = create<AuthState>((set) => {
  const localUser = typeof window !== 'undefined' ? localStorage.getItem('user') : null;

  return {
    user: localUser ? JSON.parse(localUser) : null,

    setUser: (user) => {
      set({ user });
      localStorage.setItem('user', JSON.stringify(user));
    },

    logout: () => {
      set({ user: null });
      localStorage.removeItem('user');
      localStorage.removeItem('token');
    },
  };
});

export default useAuthStore;
