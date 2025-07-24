'use client'
import React, { createContext, useContext, useState, ReactNode } from "react";
import en from "../locales/en.json";
import zh from "../locales/zh.json";
import get from "lodash/get"; // 
import { useI18nStore, Locale } from "@/store/useI18nStore";
type Messages = typeof en;

interface I18nContextProps {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: keyof Messages) => string;
}

const messagesMap: Record<Locale, Messages> = { en, zh };

const I18nContext = createContext<I18nContextProps | undefined>(undefined);

export const I18nProvider = ({ children }: { children: ReactNode }) => {
  const locale = useI18nStore((state) => state.locale);
  const setLocale = useI18nStore((state) => state.setLocale);
  const t = (key: string) => {
    const keys = key.split(".");
    let result: any = messagesMap[locale];
    for (const k of keys) {
      result = result?.[k];
      if (result === undefined) return key;
    }
    return typeof result === "string" ? result : key;
  };

  return (
    <I18nContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </I18nContext.Provider>
  );
};

export const useI18n = () => {
  const context = useContext(I18nContext);
  if (!context) throw new Error("useI18n must be used within I18nProvider");
  return context;
};