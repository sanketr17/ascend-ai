import React from "react";
import { motion } from "motion/react";
import { Sun, Moon, Monitor } from "lucide-react";
import { useTheme, ThemeMode } from "../context/ThemeContext";

interface ThemeToggleProps {
  className?: string;
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({ className = "" }) => {
  const { theme, setTheme } = useTheme();

  const options: { id: ThemeMode; label: string; icon: React.FC<{ className?: string }> }[] = [
    { id: "light", label: "Light Theme", icon: Sun },
    { id: "dark", label: "Dark Theme", icon: Moon },
    { id: "system", label: "System Default", icon: Monitor },
  ];

  return (
    <div
      className={`inline-flex items-center p-1 bg-[var(--bg-app)] border border-[var(--border-color)] rounded-xl shadow-xs transition-colors duration-200 ${className}`}
      role="radiogroup"
      aria-label="Theme switcher"
    >
      {options.map((opt) => {
        const Icon = opt.icon;
        const isActive = theme === opt.id;

        return (
          <button
            key={opt.id}
            type="button"
            onClick={() => setTheme(opt.id)}
            className={`relative flex items-center justify-center p-1.5 sm:px-2.5 sm:py-1.5 text-xs font-mono rounded-lg transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] group ${
              isActive
                ? "text-[var(--text-primary)] font-semibold"
                : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
            }`}
            title={opt.label}
            aria-checked={isActive}
            role="radio"
          >
            {isActive && (
              <motion.div
                layoutId="theme-toggle-active"
                className="absolute inset-0 bg-[var(--bg-surface)] border border-[var(--border-color)] rounded-lg shadow-xs"
                transition={{
                  type: "spring",
                  stiffness: 450,
                  damping: 30,
                  duration: 0.25,
                }}
              />
            )}
            <span className="relative z-10 flex items-center space-x-1.5">
              <Icon
                className={`w-3.5 h-3.5 transition-transform duration-200 ${
                  isActive ? "text-[var(--accent)] scale-110" : "group-hover:scale-105"
                }`}
              />
              <span className="hidden xl:inline text-[11px] capitalize">{opt.id}</span>
            </span>
          </button>
        );
      })}
    </div>
  );
};
