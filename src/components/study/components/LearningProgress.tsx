import React from "react";
import { motion, useReducedMotion } from "motion/react";

interface LearningProgressProps {
  value: number; // 0 to 100
  type?: "bar" | "circle" | "compact";
  label?: string;
  sublabel?: string;
  color?: "accent" | "success" | "secondary" | "warning";
  size?: number; // for circular progress
  className?: string;
}

export const LearningProgress: React.FC<LearningProgressProps> = ({
  value,
  type = "bar",
  label,
  sublabel,
  color = "accent",
  size = 64,
  className = "",
}) => {
  const shouldReduceMotion = useReducedMotion();
  const clampedValue = Math.min(100, Math.max(0, value));

  const getColorClass = () => {
    switch (color) {
      case "success": return "bg-[var(--success)] text-[var(--success)] stroke-[var(--success)]";
      case "secondary": return "bg-[var(--secondary-accent)] text-[var(--secondary-accent)] stroke-[var(--secondary-accent)]";
      case "warning": return "bg-amber-500 text-amber-500 stroke-amber-500";
      default: return "bg-[var(--accent)] text-[var(--accent)] stroke-[var(--accent)]";
    }
  };

  if (type === "circle") {
    const strokeWidth = 5;
    const radius = (size - strokeWidth) / 2;
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset = circumference - (clampedValue / 100) * circumference;

    return (
      <div className={`relative inline-flex flex-col items-center justify-center ${className}`}>
        <svg width={size} height={size} className="-rotate-90">
          {/* Background Ring */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            className="stroke-[var(--bg-app)]"
            strokeWidth={strokeWidth}
            fill="transparent"
          />
          {/* Progress Ring */}
          <motion.circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            className={`fill-transparent ${getColorClass().split(" ")[2]}`}
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset }}
            transition={shouldReduceMotion ? { duration: 0 } : { duration: 1.2, ease: "easeOut" }}
            strokeLinecap="round"
          />
        </svg>

        {/* Center Percentage Label */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
          <span className="text-xs font-mono font-bold text-[var(--text-primary)] font-numbers">
            {clampedValue}%
          </span>
        </div>

        {label && (
          <span className="text-[10px] font-mono text-[var(--text-secondary)] mt-1">
            {label}
          </span>
        )}
      </div>
    );
  }

  if (type === "compact") {
    return (
      <div className={`flex items-center space-x-2 text-xs font-mono ${className}`}>
        <div className="flex-1 h-1.5 bg-[var(--bg-app)] rounded-full overflow-hidden border border-[var(--border-color)]/40">
          <motion.div
            className={`h-full rounded-full ${getColorClass().split(" ")[0]}`}
            initial={{ width: "0%" }}
            animate={{ width: `${clampedValue}%` }}
            transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.8, ease: "easeOut" }}
          />
        </div>
        <span className="font-bold text-[var(--text-primary)] font-numbers min-w-[36px] text-right">
          {clampedValue}%
        </span>
      </div>
    );
  }

  // Standard Bar
  return (
    <div className={`space-y-1.5 ${className}`}>
      {(label || sublabel) && (
        <div className="flex items-center justify-between text-xs font-mono">
          {label && <span className="text-[var(--text-secondary)]">{label}</span>}
          {sublabel && <span className="font-bold text-[var(--text-primary)] font-numbers">{sublabel}</span>}
        </div>
      )}

      <div className="w-full h-2 bg-[var(--bg-app)] rounded-full overflow-hidden border border-[var(--border-color)]/60">
        <motion.div
          className={`h-full rounded-full ${getColorClass().split(" ")[0]}`}
          initial={{ width: "0%" }}
          animate={{ width: `${clampedValue}%` }}
          transition={shouldReduceMotion ? { duration: 0 } : { duration: 1, ease: "easeOut" }}
        />
      </div>
    </div>
  );
};
