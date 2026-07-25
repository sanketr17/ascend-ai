import React from "react";
import { Card, Badge } from "../DesignSystem";

interface SettingCardProps {
  title: string;
  description?: string;
  icon?: React.ReactNode;
  badge?: string;
  badgeVariant?: "accent" | "secondary" | "success" | "error" | "neutral";
  control?: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
}

export const SettingCard: React.FC<SettingCardProps> = ({
  title,
  description,
  icon,
  badge,
  badgeVariant = "neutral",
  control,
  children,
  className = "",
}) => {
  return (
    <Card className={`p-5 sm:p-6 space-y-4 ${className}`}>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-start space-x-3">
          {icon && (
            <div className="p-2.5 rounded-xl bg-[var(--bg-app)] border border-[var(--border-color)] text-[var(--accent)] shrink-0 mt-0.5">
              {icon}
            </div>
          )}
          <div className="space-y-1">
            <div className="flex items-center space-x-2">
              <h3 className="text-sm font-bold font-heading text-[var(--text-primary)] tracking-tight">
                {title}
              </h3>
              {badge && <Badge variant={badgeVariant}>{badge}</Badge>}
            </div>
            {description && (
              <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                {description}
              </p>
            )}
          </div>
        </div>

        {control && <div className="shrink-0 pt-2 sm:pt-0">{control}</div>}
      </div>

      {children && <div className="pt-2 border-t border-[var(--border-color)]/60">{children}</div>}
    </Card>
  );
};
