import React from "react";
import { Card } from "../DesignSystem";
import { ChevronRight } from "lucide-react";

interface SupportCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  onClick: () => void;
  badge?: string;
  className?: string;
}

export const SupportCard: React.FC<SupportCardProps> = ({
  title,
  description,
  icon,
  onClick,
  badge,
  className = "",
}) => {
  return (
    <Card
      onClick={onClick}
      hoverable
      className={`p-5 flex items-center justify-between gap-4 group transition-all duration-200 ${className}`}
    >
      <div className="flex items-start space-x-3.5">
        <div className="p-2.5 rounded-xl bg-[var(--bg-app)] border border-[var(--border-color)] text-[var(--accent)] group-hover:border-[var(--accent)] transition-colors shrink-0">
          {icon}
        </div>
        <div className="space-y-0.5">
          <div className="flex items-center space-x-2">
            <h3 className="text-xs sm:text-sm font-bold font-heading text-[var(--text-primary)] group-hover:text-[var(--accent)] transition-colors">
              {title}
            </h3>
            {badge && (
              <span className="px-2 py-0.5 text-[10px] font-mono rounded bg-[var(--secondary-accent)]/15 text-[var(--secondary-accent)] border border-[var(--secondary-accent)]/30 font-semibold">
                {badge}
              </span>
            )}
          </div>
          <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
            {description}
          </p>
        </div>
      </div>

      <ChevronRight className="w-4 h-4 text-[var(--text-secondary)] group-hover:text-[var(--accent)] group-hover:translate-x-1 transition-all shrink-0" />
    </Card>
  );
};
