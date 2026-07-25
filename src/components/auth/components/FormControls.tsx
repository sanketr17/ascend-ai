import React, { useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { Eye, EyeOff, Sparkles, Loader2, AlertCircle } from "lucide-react";

// 1. Reusable Form Input with Inline Validation
interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  icon?: React.ReactNode;
  helperText?: string;
}

export const FormInput: React.FC<FormInputProps> = ({
  label,
  error,
  icon,
  helperText,
  id,
  className = "",
  disabled,
  ...props
}) => {
  const inputId = id || `input-${label.toLowerCase().replace(/\s+/g, "-")}`;
  const errorId = `${inputId}-error`;
  const helperId = `${inputId}-helper`;

  return (
    <div className="space-y-1.5 text-left">
      <div className="flex items-center justify-between">
        <label
          htmlFor={inputId}
          className="text-xs font-mono font-medium text-[var(--text-primary)] select-none"
        >
          {label}
        </label>
        {error && (
          <span
            id={errorId}
            className="text-[11px] font-mono text-[var(--error)] flex items-center space-x-1"
            role="alert"
          >
            <AlertCircle className="w-3 h-3 shrink-0" />
            <span>{error}</span>
          </span>
        )}
      </div>

      <div className="relative flex items-center">
        {icon && (
          <div className="absolute left-3.5 text-[var(--text-secondary)] pointer-events-none">
            {icon}
          </div>
        )}
        <input
          id={inputId}
          disabled={disabled}
          aria-invalid={Boolean(error)}
          aria-describedby={
            error ? errorId : helperText ? helperId : undefined
          }
          className={`w-full py-2.5 ${icon ? "pl-10" : "pl-3.5"} pr-3.5 bg-[var(--bg-app)] border ${
            error
              ? "border-[var(--error)] focus:ring-[var(--error)]/30"
              : "border-[var(--border-color)] focus:border-[var(--accent)] focus:ring-[var(--accent)]/25"
          } rounded-xl text-xs font-body text-[var(--text-primary)] placeholder-[var(--text-secondary)]/60 focus:outline-none focus:ring-2 transition-all duration-150 disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
          {...props}
        />
      </div>

      {helperText && !error && (
        <p id={helperId} className="text-[11px] font-mono text-[var(--text-secondary)]">
          {helperText}
        </p>
      )}
    </div>
  );
};

// 2. Password Input with Show/Hide Toggle
interface PasswordInputProps extends Omit<FormInputProps, "type"> {
  showStrength?: boolean;
}

export const PasswordInput: React.FC<PasswordInputProps> = ({
  label,
  error,
  icon,
  id,
  disabled,
  className = "",
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const inputId = id || `password-${label.toLowerCase().replace(/\s+/g, "-")}`;
  const errorId = `${inputId}-error`;

  return (
    <div className="space-y-1.5 text-left">
      <div className="flex items-center justify-between">
        <label
          htmlFor={inputId}
          className="text-xs font-mono font-medium text-[var(--text-primary)] select-none"
        >
          {label}
        </label>
        {error && (
          <span
            id={errorId}
            className="text-[11px] font-mono text-[var(--error)] flex items-center space-x-1"
            role="alert"
          >
            <AlertCircle className="w-3 h-3 shrink-0" />
            <span>{error}</span>
          </span>
        )}
      </div>

      <div className="relative flex items-center">
        {icon && (
          <div className="absolute left-3.5 text-[var(--text-secondary)] pointer-events-none">
            {icon}
          </div>
        )}
        <input
          id={inputId}
          type={showPassword ? "text" : "password"}
          disabled={disabled}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? errorId : undefined}
          className={`w-full py-2.5 ${icon ? "pl-10" : "pl-3.5"} pr-10 bg-[var(--bg-app)] border ${
            error
              ? "border-[var(--error)] focus:ring-[var(--error)]/30"
              : "border-[var(--border-color)] focus:border-[var(--accent)] focus:ring-[var(--accent)]/25"
          } rounded-xl text-xs font-body text-[var(--text-primary)] placeholder-[var(--text-secondary)]/60 focus:outline-none focus:ring-2 transition-all duration-150 disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
          {...props}
        />
        <button
          type="button"
          disabled={disabled}
          onClick={() => setShowPassword((prev) => !prev)}
          className="absolute right-3.5 text-[var(--text-secondary)] hover:text-[var(--text-primary)] focus:outline-none transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          title={showPassword ? "Hide password" : "Show password"}
          aria-label={showPassword ? "Hide password" : "Show password"}
        >
          {showPassword ? (
            <EyeOff className="w-4 h-4" />
          ) : (
            <Eye className="w-4 h-4" />
          )}
        </button>
      </div>
    </div>
  );
};

// 3. Primary Submit Button
interface PrimaryButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean;
  icon?: React.ReactNode;
}

export const PrimaryButton: React.FC<PrimaryButtonProps> = ({
  children,
  isLoading = false,
  disabled,
  icon,
  className = "",
  ...props
}) => {
  const shouldReduceMotion = useReducedMotion();
  const isDisabled = disabled || isLoading;

  return (
    <motion.button
      whileHover={isDisabled || shouldReduceMotion ? {} : { scale: 1.01, filter: "brightness(1.05)" }}
      whileTap={isDisabled || shouldReduceMotion ? {} : { scale: 0.98 }}
      transition={{ duration: 0.12 }}
      disabled={isDisabled}
      aria-busy={isLoading}
      className={`w-full py-3 px-5 bg-[var(--accent)] text-[var(--bg-app)] font-mono font-bold text-xs rounded-xl shadow-craft hover:shadow-craft-lg flex items-center justify-center space-x-2 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[var(--accent)]/40 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none select-none ${className}`}
      {...props}
    >
      {isLoading ? (
        <>
          <Loader2 className="w-4 h-4 animate-spin shrink-0" />
          <span>Processing...</span>
        </>
      ) : (
        <>
          {icon && <span className="shrink-0">{icon}</span>}
          <span>{children}</span>
        </>
      )}
    </motion.button>
  );
};

// 4. Secondary Action Button
interface SecondaryButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: React.ReactNode;
}

export const SecondaryButton: React.FC<SecondaryButtonProps> = ({
  children,
  icon,
  className = "",
  disabled,
  ...props
}) => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.button
      type="button"
      whileHover={disabled || shouldReduceMotion ? {} : { scale: 1.01 }}
      whileTap={disabled || shouldReduceMotion ? {} : { scale: 0.98 }}
      transition={{ duration: 0.12 }}
      disabled={disabled}
      className={`w-full py-2.5 px-4 bg-[var(--bg-surface)] border border-[var(--border-color)] text-[var(--text-primary)] hover:bg-[var(--bg-hover)] font-mono text-xs rounded-xl flex items-center justify-center space-x-2 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[var(--accent)]/30 disabled:opacity-50 select-none ${className}`}
      {...props}
    >
      {icon && <span className="shrink-0">{icon}</span>}
      <span>{children}</span>
    </motion.button>
  );
};

// 5. Divider with "OR" text
export const SocialDivider: React.FC = () => {
  return (
    <div className="relative my-5 flex items-center justify-center">
      <div className="absolute inset-0 flex items-center">
        <div className="w-full border-t border-[var(--border-color)]" />
      </div>
      <div className="relative px-3 bg-[var(--bg-surface)] text-[10px] font-mono font-medium text-[var(--text-secondary)] uppercase tracking-widest">
        OR
      </div>
    </div>
  );
};

// 6. Explore Demo Button
interface DemoButtonProps {
  onClick: () => void;
  isLoading?: boolean;
}

export const DemoButton: React.FC<DemoButtonProps> = ({ onClick, isLoading }) => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className="space-y-1.5 text-center">
      <motion.button
        type="button"
        onClick={onClick}
        disabled={isLoading}
        whileHover={shouldReduceMotion ? {} : { scale: 1.01, y: -1 }}
        whileTap={shouldReduceMotion ? {} : { scale: 0.98 }}
        className="w-full py-2.5 px-4 bg-[var(--bg-app)] hover:bg-[var(--bg-hover)] border border-[var(--border-color)] hover:border-[var(--accent)]/50 text-[var(--text-primary)] font-mono text-xs font-semibold rounded-xl flex items-center justify-center space-x-2 shadow-xs transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[var(--accent)]/30 group"
      >
        <Sparkles className="w-3.5 h-3.5 text-[var(--accent)] group-hover:rotate-12 transition-transform" />
        <span>✨ Explore Demo Workspace</span>
      </motion.button>
      <p className="text-[10px] font-mono text-[var(--text-secondary)]">
        No account required. Instant preview mode.
      </p>
    </div>
  );
};
