import React from "react";
import { Info, Sparkles, AlertCircle, CheckCircle2 } from "lucide-react";

interface InfoCardProps {
  title?: string;
  children: React.ReactNode;
  type?: "info" | "tip" | "warning" | "success";
  className?: string;
}

export const InfoCard: React.FC<InfoCardProps> = ({
  title,
  children,
  type = "info",
  className = "",
}) => {
  const styles = {
    info: {
      bg: "bg-[var(--bg-app)]",
      border: "border-[var(--border-color)]",
      icon: <Info className="w-4 h-4 text-[var(--accent)] shrink-0 mt-0.5" />,
      titleColor: "text-[var(--text-primary)]",
    },
    tip: {
      bg: "bg-[var(--secondary-accent)]/10",
      border: "border-[var(--secondary-accent)]/30",
      icon: <Sparkles className="w-4 h-4 text-[var(--secondary-accent)] shrink-0 mt-0.5" />,
      titleColor: "text-[var(--secondary-accent)]",
    },
    warning: {
      bg: "bg-[var(--error)]/10",
      border: "border-[var(--error)]/30",
      icon: <AlertCircle className="w-4 h-4 text-[var(--error)] shrink-0 mt-0.5" />,
      titleColor: "text-[var(--error)]",
    },
    success: {
      bg: "bg-[var(--success)]/10",
      border: "border-[var(--success)]/30",
      icon: <CheckCircle2 className="w-4 h-4 text-[var(--success)] shrink-0 mt-0.5" />,
      titleColor: "text-[var(--success)]",
    },
  };

  const current = styles[type];

  return (
    <div className={`p-4 rounded-xl border ${current.bg} ${current.border} flex items-start space-x-3 text-xs leading-relaxed ${className}`}>
      {current.icon}
      <div className="space-y-1 text-[var(--text-primary)] font-body">
        {title && <div className={`font-mono font-bold uppercase tracking-wider text-[11px] ${current.titleColor}`}>{title}</div>}
        <div>{children}</div>
      </div>
    </div>
  );
};
