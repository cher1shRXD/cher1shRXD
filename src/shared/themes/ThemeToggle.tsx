"use client";

import { toggleTheme } from "./dom";
import { SunMoon } from "lucide-react";

export const ThemeToggle = () => {
  return (
    <button
      type="button"
      onClick={toggleTheme}
      className="inline-flex items-center gap-2 bg-surface px-4 py-2 text-sm font-medium text-text cursor-pointer rounded-full"
      aria-label="테마 전환"
    >
      <SunMoon size={14} />
      Theme
    </button>
  );
};
