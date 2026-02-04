"use client";

import { useTheme } from "./useTheme";
import { toggleTheme } from "./dom";

export const ThemeToggle = () => {
  const theme = useTheme();
  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-4 py-2 text-sm font-medium text-text shadow-sm hover:border-primary"
      aria-label={isDark ? "라이트 모드로 전환" : "다크 모드로 전환"}
    >
      <span className="h-2.5 w-2.5 rounded-full bg-primary" />
      {isDark ? "Dark" : "Light"}
    </button>
  );
};
