import React from "react";
import { motion } from "motion/react";
import { Card } from "../DesignSystem";

interface PreferenceOption<T> {
  id: T;
  label: string;
  description?: string;
  icon?: React.ReactNode;
}

interface PreferenceCardProps<T extends string> {
  title: string;
  description?: string;
  options: PreferenceOption<T>[];
  selectedValue: T;
  onChange: (value: T) => void;
  icon?: React.ReactNode;
  className?: string;
}

export function PreferenceCard<T extends string>({
  title,
  description,
  options,
  selectedValue,
  onChange,
  icon,
  className = "",
}: PreferenceCardProps<T>) {
  return (
    <Card className={`p-5 sm:p-6 space-y-4 ${className}`}>
      <div className="flex items-start space-x-3">
        {icon && (
          <div className="p-2.5 rounded-xl bg-[var(--bg-app)] border border-[var(--border-color)] text-[var(--accent)] shrink-0">
            {icon}
          </div>
        )}
        <div className="space-y-1">
          <h3 className="text-sm font-bold font-heading text-[var(--text-primary)]">
            {title}
          </h3>
          {description && (
            <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
              {description}
            </p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 pt-1">
        {options.map((opt) => {
          const isSelected = selectedValue === opt.id;
          return (
            <motion.button
              key={opt.id}
              type="button"
              whileHover={{ scale: 1.015, y: -1 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.12 }}
              onClick={() => onChange(opt.id)}
              className={`p-3.5 rounded-xl border text-left transition-colors duration-150 flex flex-col justify-between space-y-1.5 focus:outline-none focus:ring-2 focus:ring-[var(--accent)]/40 ${
                isSelected
                  ? "bg-[var(--bg-hover)] border-[var(--accent)] text-[var(--text-primary)] shadow-xs ring-1 ring-[var(--accent)]"
                  : "bg-[var(--bg-app)] border-[var(--border-color)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-[var(--text-primary)]/40"
              }`}
            >
              <div className="flex items-center justify-between w-full">
                <span className="text-xs font-mono font-bold flex items-center gap-2">
                  {opt.icon}
                  {opt.label}
                </span>
                <span
                  className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center shrink-0 ${
                    isSelected
                      ? "border-[var(--accent)] bg-[var(--accent)]"
                      : "border-[var(--border-color)] bg-transparent"
                  }`}
                >
                  {isSelected && (
                    <motion.span 
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 500, damping: 25 }}
                      className="w-1.5 h-1.5 rounded-full bg-[var(--bg-surface)]" 
                    />
                  )}
                </span>
              </div>
              {opt.description && (
                <span className="text-[11px] text-[var(--text-secondary)] leading-tight">
                  {opt.description}
                </span>
              )}
            </motion.button>
          );
        })}
      </div>
    </Card>
  );
}
