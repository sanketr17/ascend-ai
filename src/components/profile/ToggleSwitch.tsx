import React from "react";
import { motion } from "motion/react";

interface ToggleSwitchProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
  description?: string;
  disabled?: boolean;
  id?: string;
}

export const ToggleSwitch: React.FC<ToggleSwitchProps> = ({
  checked,
  onChange,
  label,
  description,
  disabled = false,
  id,
}) => {
  const toggleId = id || `toggle-${Math.random().toString(36).substr(2, 9)}`;

  return (
    <div className="flex items-center justify-between gap-4 py-1">
      {(label || description) && (
        <div className="flex flex-col">
          {label && (
            <label
              htmlFor={toggleId}
              className="text-xs font-medium text-[var(--text-primary)] cursor-pointer select-none"
            >
              {label}
            </label>
          )}
          {description && (
            <span className="text-[11px] text-[var(--text-secondary)] leading-tight mt-0.5">
              {description}
            </span>
          )}
        </div>
      )}

      <motion.button
        type="button"
        role="switch"
        id={toggleId}
        aria-checked={checked}
        disabled={disabled}
        whileTap={disabled ? undefined : { scale: 0.95 }}
        onClick={() => !disabled && onChange(!checked)}
        className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-[var(--accent)]/40 ${
          checked ? "bg-[var(--accent)]" : "bg-[var(--border-color)]"
        } ${disabled ? "opacity-40 cursor-not-allowed" : ""}`}
      >
        <motion.span
          layout
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
          className={`pointer-events-none inline-block h-5 w-5 rounded-full bg-[var(--bg-surface)] shadow-md ${
            checked ? "translate-x-5" : "translate-x-0"
          }`}
        />
      </motion.button>
    </div>
  );
};
