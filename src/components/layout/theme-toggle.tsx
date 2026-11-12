"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useSyncExternalStore } from "react";

import { Button } from "@/components/ui/button";

const noopSubscribe = () => () => {};

export function ThemeToggle() {
  const { theme, resolvedTheme, setTheme } = useTheme();
  // true só no navegador. No servidor e na hidratação é false, então o ícone só
  // aparece quando o tema real já é conhecido, sem erro de hidratação.
  const mounted = useSyncExternalStore(noopSubscribe, () => true, () => false);

  const current = (theme === "system" ? resolvedTheme : theme) ?? "light";
  const isDark = current === "dark";

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label={isDark ? "Mudar para tema claro" : "Mudar para tema escuro"}
      className="w-full justify-start gap-3"
    >
      {mounted ? (
        isDark ? (
          <Sun className="h-4 w-4" aria-hidden />
        ) : (
          <Moon className="h-4 w-4" aria-hidden />
        )
      ) : (
        <Sun className="h-4 w-4 opacity-0" aria-hidden />
      )}
      <span>{mounted && isDark ? "Tema claro" : "Tema escuro"}</span>
    </Button>
  );
}
