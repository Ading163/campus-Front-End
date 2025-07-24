import { create } from 'zustand';

export type Locale = 'zh' | 'en';

interface I18nState {
  locale: Locale;
  setLocale: (locale: Locale) => void;
}

export const useI18nStore = create<I18nState>((set) => ({
  locale: 'zh',
  setLocale: (locale) => set({ locale }),
})); 