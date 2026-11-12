"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useSyncExternalStore,
  type ReactNode,
} from "react";

const STORAGE_KEY = "finplan:privacy";
const CHANGE_EVENT = "finplan:privacy-change";

// Usado quando o localStorage está indisponível (ex.: bloqueado pelo navegador).
let memoryValue = false;

function readPrivacy(): boolean {
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    return stored === null ? memoryValue : stored === "1";
  } catch {
    return memoryValue;
  }
}

function writePrivacy(value: boolean): void {
  memoryValue = value;
  try {
    window.localStorage.setItem(STORAGE_KEY, value ? "1" : "0");
  } catch {
    // sem localStorage: o valor fica só em memória nesta aba
  }
  window.dispatchEvent(new Event(CHANGE_EVENT));
}

function subscribe(onChange: () => void): () => void {
  // "storage" avisa mudanças feitas em outras abas; CHANGE_EVENT, as desta aba.
  window.addEventListener("storage", onChange);
  window.addEventListener(CHANGE_EVENT, onChange);
  return () => {
    window.removeEventListener("storage", onChange);
    window.removeEventListener(CHANGE_EVENT, onChange);
  };
}

// No servidor e durante a hidratação o modo privado começa desligado.
function getServerSnapshot(): boolean {
  return false;
}

type PrivacyContextValue = {
  isPrivate: boolean;
  toggle: () => void;
};

const PrivacyContext = createContext<PrivacyContextValue | null>(null);

/**
 * Modo privado (esconde valores), salvo no localStorage. Lido com
 * useSyncExternalStore em vez de um useEffect + setState, o que evita um
 * render extra e mantém as abas abertas sincronizadas.
 */
export function PrivacyProvider({ children }: { children: ReactNode }) {
  const isPrivate = useSyncExternalStore(subscribe, readPrivacy, getServerSnapshot);

  const toggle = useCallback(() => writePrivacy(!readPrivacy()), []);

  const value = useMemo<PrivacyContextValue>(() => ({ isPrivate, toggle }), [isPrivate, toggle]);

  return <PrivacyContext.Provider value={value}>{children}</PrivacyContext.Provider>;
}

export function usePrivacy(): PrivacyContextValue {
  const ctx = useContext(PrivacyContext);
  if (!ctx) throw new Error("usePrivacy must be used within PrivacyProvider");
  return ctx;
}
