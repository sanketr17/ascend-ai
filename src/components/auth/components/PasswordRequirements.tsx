import React from "react";
import { motion } from "motion/react";
import { Check, X, ShieldAlert, ShieldCheck } from "lucide-react";
import { PasswordRequirementsState } from "../types";

interface PasswordRequirementsProps {
  password: string;
}

export const evaluatePassword = (password: string): PasswordRequirementsState => {
  return {
    minLength: password.length >= 8,
    hasUppercase: /[A-Z]/.exec(password) !== null,
    hasLowercase: /[a-z]/.exec(password) !== null,
    hasNumber: /[0-9]/.exec(password) !== null,
    hasSpecialChar: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.exec(password) !== null,
  };
};

export const PasswordRequirements: React.FC<PasswordRequirementsProps> = ({ password }) => {
  const reqs = evaluatePassword(password);
  const passedCount = Object.values(reqs).filter(Boolean).length;
  const totalCount = 5;
  const percentage = (passedCount / totalCount) * 100;

  const getStrengthLabel = () => {
    if (password.length === 0) return { label: "Required", color: "text-[var(--text-secondary)]" };
    if (passedCount <= 2) return { label: "Weak", color: "text-[var(--error)]" };
    if (passedCount <= 4) return { label: "Moderate", color: "text-amber-500" };
    return { label: "Strong", color: "text-[var(--success)]" };
  };

  const strength = getStrengthLabel();

  const rules = [
    { key: "minLength", label: "At least 8 characters" },
    { key: "hasUppercase", label: "One uppercase letter (A-Z)" },
    { key: "hasLowercase", label: "One lowercase letter (a-z)" },
    { key: "hasNumber", label: "One number (0-9)" },
    { key: "hasSpecialChar", label: "One special character (@$!%*?&)" },
  ] as const;

  return (
    <div
      className="p-3.5 bg-[var(--bg-app)] border border-[var(--border-color)] rounded-xl space-y-3"
      aria-live="polite"
      aria-atomic="true"
    >
      {/* Header & Strength Bar */}
      <div className="space-y-1.5">
        <div className="flex items-center justify-between text-xs font-mono">
          <span className="text-[var(--text-secondary)] flex items-center space-x-1.5">
            {passedCount === 5 ? (
              <ShieldCheck className="w-3.5 h-3.5 text-[var(--success)]" />
            ) : (
              <ShieldAlert className="w-3.5 h-3.5 text-[var(--text-secondary)]" />
            )}
            <span>Password Strength:</span>
          </span>
          <span className={`font-bold ${strength.color}`}>{strength.label}</span>
        </div>

        {/* Progress Bar */}
        <div className="w-full h-1 bg-[var(--bg-surface)] rounded-full overflow-hidden border border-[var(--border-color)]/60">
          <motion.div
            className={`h-full rounded-full transition-all duration-300 ${
              passedCount <= 2
                ? "bg-[var(--error)]"
                : passedCount <= 4
                ? "bg-amber-500"
                : "bg-[var(--success)]"
            }`}
            animate={{ width: `${percentage}%` }}
            transition={{ duration: 0.2 }}
          />
        </div>
      </div>

      {/* Rules Checklist */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 pt-1">
        {rules.map((rule) => {
          const isPassed = reqs[rule.key];
          return (
            <div
              key={rule.key}
              className={`flex items-center space-x-2 text-[11px] font-mono transition-colors ${
                isPassed ? "text-[var(--success)]" : "text-[var(--text-secondary)] opacity-75"
              }`}
            >
              <div
                className={`w-3.5 h-3.5 rounded-full flex items-center justify-center border shrink-0 ${
                  isPassed
                    ? "bg-[var(--success)]/20 border-[var(--success)] text-[var(--success)]"
                    : "bg-[var(--bg-surface)] border-[var(--border-color)]"
                }`}
              >
                {isPassed ? <Check className="w-2.5 h-2.5 stroke-[3]" /> : <X className="w-2 h-2" />}
              </div>
              <span className="truncate">{rule.label}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
