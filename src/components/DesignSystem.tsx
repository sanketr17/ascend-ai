import React from "react";
import { motion, HTMLMotionProps } from "motion/react";

// 1. Page Container Wrapper with Framer Motion Transition
interface PageContainerProps extends HTMLMotionProps<"div"> {
  children: React.ReactNode;
  className?: string;
}

export const PageTransition: React.FC<PageContainerProps> = ({ children, className = "", ...props }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
      className={`space-y-8 ${className}`}
      {...props}
    >
      {children}
    </motion.div>
  );
};

// 2. Card Component
interface CardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  hoverable?: boolean;
}

export const Card: React.FC<CardProps> = ({ children, className = "", onClick, hoverable = false }) => {
  const isInteractive = hoverable || Boolean(onClick);

  return (
    <motion.div
      onClick={onClick}
      whileHover={
        isInteractive
          ? { y: -5, transition: { duration: 0.18, ease: "easeOut" } }
          : { y: -1, transition: { duration: 0.18, ease: "easeOut" } }
      }
      className={`bg-[var(--bg-surface)] border border-[var(--border-color)] text-[var(--text-primary)] rounded-2xl p-6 sm:p-7 shadow-craft transition-colors duration-200 ${
        isInteractive ? "hover:border-[var(--accent)]/50 hover:shadow-craft-lg cursor-pointer" : ""
      } ${className}`}
    >
      {children}
    </motion.div>
  );
};

// 3. Button Component
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "accent" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  icon?: React.ReactNode;
  isLoading?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = "primary",
  size = "md",
  icon,
  isLoading = false,
  className = "",
  disabled,
  ...props
}) => {
  const baseClasses = "inline-flex items-center justify-center font-medium rounded-xl transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-[var(--accent)]/30 disabled:opacity-40 disabled:cursor-not-allowed disabled:transform-none select-none";

  const sizeClasses = {
    sm: "px-3 py-1.5 text-xs gap-1.5 font-mono",
    md: "px-4 py-2.5 text-xs gap-2 font-mono tracking-tight",
    lg: "px-6 py-3.5 text-sm gap-2.5 font-medium",
  };

  const variantClasses = {
    primary: "bg-[var(--btn-primary-bg)] text-[var(--btn-primary-text)] border border-[var(--border-color)] hover:border-[var(--accent)]/60 hover:bg-[var(--bg-hover)] shadow-xs font-mono font-medium",
    secondary: "bg-[var(--secondary-accent)] text-[var(--bg-surface)] hover:opacity-90 font-mono",
    accent: "bg-[var(--accent)] text-[var(--bg-app)] hover:opacity-90 font-mono font-semibold",
    outline: "bg-[var(--bg-surface)] border border-[var(--border-color)] text-[var(--text-primary)] hover:bg-[var(--bg-hover)] hover:border-[var(--text-primary)]/30",
    ghost: "bg-transparent text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-hover)]",
  };

  const isBtnDisabled = disabled || isLoading;

  return (
    <motion.button
      whileHover={isBtnDisabled ? undefined : { scale: 1.02, filter: "brightness(1.04)" }}
      whileTap={isBtnDisabled ? undefined : { scale: 0.98 }}
      transition={{ duration: 0.12, ease: "easeOut" }}
      disabled={isBtnDisabled}
      className={`${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]} ${className}`}
      {...(props as HTMLMotionProps<"button">)}
    >
      {isLoading ? (
        <span className="w-3.5 h-3.5 border-2 border-current border-t-transparent rounded-full animate-spin shrink-0" />
      ) : icon ? (
        <span className="shrink-0">{icon}</span>
      ) : null}
      <span>{children}</span>
    </motion.button>
  );
};

// 4. Badge Component
interface BadgeProps {
  children: React.ReactNode;
  variant?: "accent" | "secondary" | "success" | "error" | "neutral";
  size?: "sm" | "md";
  className?: string;
  icon?: React.ReactNode;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = "neutral",
  size = "sm",
  className = "",
  icon,
}) => {
  const sizeClasses = {
    sm: "px-2.5 py-0.5 text-[11px] gap-1 font-mono uppercase tracking-wider",
    md: "px-3 py-1 text-xs gap-1.5 font-mono",
  };

  const variantClasses = {
    accent: "bg-[var(--accent)]/15 text-[var(--accent)] border border-[var(--accent)]/30 font-semibold",
    secondary: "bg-[var(--secondary-accent)]/15 text-[var(--secondary-accent)] border border-[var(--secondary-accent)]/30 font-semibold",
    success: "bg-[var(--success)]/15 text-[var(--success)] border border-[var(--success)]/30 font-semibold",
    error: "bg-[var(--error)]/15 text-[var(--error)] border border-[var(--error)]/30 font-semibold",
    neutral: "bg-[var(--bg-app)] text-[var(--text-secondary)] border border-[var(--border-color)] font-medium",
  };

  return (
    <motion.span
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.15 }}
      className={`inline-flex items-center rounded-md ${sizeClasses[size]} ${variantClasses[variant]} ${className}`}
    >
      {icon && <span className="shrink-0">{icon}</span>}
      <span>{children}</span>
    </motion.span>
  );
};

// 5. Stat Metric Display
interface StatBoxProps {
  label: string;
  value: string | number;
  subtext?: string;
  trend?: string;
  icon?: React.ReactNode;
  subtitle?: string;
}

export const StatBox: React.FC<StatBoxProps> = ({
  label,
  value,
  subtext,
  subtitle,
  trend,
  icon,
}) => {
  const displaySub = subtext || subtitle;

  return (
    <Card className="flex flex-col justify-between space-y-3" hoverable>
      <div className="flex items-center justify-between">
        <span className="text-xs font-mono text-[var(--text-secondary)] uppercase tracking-wider">
          {label}
        </span>
        {icon && (
          <motion.span 
            whileHover={{ scale: 1.15, rotate: 5 }} 
            className="text-[var(--accent)] inline-block"
          >
            {icon}
          </motion.span>
        )}
      </div>
      <div>
        <motion.div 
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="text-3xl font-extrabold font-numbers text-[var(--text-primary)] tracking-tight"
        >
          {value}
        </motion.div>
        {(displaySub || trend) && (
          <div className="flex items-center justify-between pt-1 text-xs">
            {displaySub && <span className="text-[var(--text-secondary)]">{displaySub}</span>}
            {trend && <span className="font-numbers font-medium text-[var(--success)]">{trend}</span>}
          </div>
        )}
      </div>
    </Card>
  );
};

// 6. Section Header
interface SectionHeaderProps {
  title: string;
  description?: string;
  badge?: string;
  action?: React.ReactNode;
  icon?: React.ReactNode;
  subtitle?: string;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  title,
  description,
  subtitle,
  badge,
  action,
  icon,
}) => {
  const desc = description || subtitle;

  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-[var(--border-color)]/60">
      <div className="space-y-1">
        <div className="flex items-center space-x-2.5">
          {icon && <span className="text-[var(--accent)]">{icon}</span>}
          <h2 className="text-xl font-bold font-heading text-[var(--text-primary)] tracking-tight">
            {title}
          </h2>
          {badge && <Badge variant="accent">{badge}</Badge>}
        </div>
        {desc && (
          <p className="text-xs text-[var(--text-secondary)] max-w-2xl leading-relaxed">
            {desc}
          </p>
        )}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  );
};

// 7. Animated Progress Bar
interface AnimatedProgressBarProps {
  value: number; // 0 to 100
  height?: string;
  barColor?: string;
  bgColor?: string;
  className?: string;
}

export const AnimatedProgressBar: React.FC<AnimatedProgressBarProps> = ({
  value,
  height = "h-2",
  barColor = "bg-[var(--accent)]",
  bgColor = "bg-[var(--bg-app)]",
  className = "",
}) => {
  const clamped = Math.min(100, Math.max(0, value));

  return (
    <div className={`w-full ${height} ${bgColor} rounded-full overflow-hidden border border-[var(--border-color)]/60 ${className}`}>
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: `${clamped}%` }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className={`h-full ${barColor} rounded-full`}
      />
    </div>
  );
};

// 8. Animated Checkbox
interface AnimatedCheckboxProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
  disabled?: boolean;
  className?: string;
}

export const AnimatedCheckbox: React.FC<AnimatedCheckboxProps> = ({
  checked,
  onChange,
  label,
  disabled = false,
  className = "",
}) => {
  return (
    <label className={`inline-flex items-center space-x-2.5 cursor-pointer select-none ${disabled ? "opacity-50 cursor-not-allowed" : ""} ${className}`}>
      <motion.button
        type="button"
        role="checkbox"
        aria-checked={checked}
        disabled={disabled}
        whileTap={disabled ? undefined : { scale: 0.88 }}
        onClick={() => !disabled && onChange(!checked)}
        className={`w-4 h-4 rounded border flex items-center justify-center transition-colors ${
          checked
            ? "bg-[var(--accent)] border-[var(--accent)] text-[var(--bg-app)]"
            : "bg-[var(--bg-app)] border-[var(--border-color)] hover:border-[var(--accent)]/60"
        }`}
      >
        {checked && (
          <motion.svg
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ type: "spring", stiffness: 500, damping: 25 }}
            className="w-3 h-3 stroke-current"
            viewBox="0 0 24 24"
            fill="none"
            strokeWidth="3.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="20 6 9 17 4 12" />
          </motion.svg>
        )}
      </motion.button>
      {label && <span className="text-xs font-mono text-[var(--text-primary)]">{label}</span>}
    </label>
  );
};
