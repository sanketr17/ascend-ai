import React from "react";
import { AppearanceSettings } from "../../types/settingsTypes";
import { Card, Badge, Button } from "../DesignSystem";
import { Sparkles, Check, Sun, Moon, Monitor, Layers, Eye } from "lucide-react";

interface ThemePreviewCardProps {
  settings: AppearanceSettings;
}

export const ThemePreviewCard: React.FC<ThemePreviewCardProps> = ({ settings }) => {
  // Compute inline preview scaling based on settings
  const fontSizeClasses = {
    small: "text-xs",
    medium: "text-sm",
    large: "text-base",
  };

  const densityPadding = {
    compact: "p-3 space-y-2",
    comfortable: "p-5 space-y-4",
  };

  return (
    <Card className="p-6 space-y-4 bg-[var(--bg-surface)] border-[var(--border-color)] relative overflow-hidden">
      <div className="flex items-center justify-between border-b border-[var(--border-color)]/60 pb-3">
        <div className="flex items-center space-x-2">
          <Eye className="w-4 h-4 text-[var(--accent)]" />
          <h3 className="text-xs font-mono uppercase tracking-wider font-bold text-[var(--text-primary)]">
            Live Appearance Preview
          </h3>
        </div>
        <Badge variant="accent">
          {settings.theme.toUpperCase()} • {settings.density.toUpperCase()}
        </Badge>
      </div>

      <p className="text-xs text-[var(--text-secondary)]">
        This preview dynamically reflects your selected font scale, interface density mode, and accent styling.
      </p>

      {/* Embedded Simulated Component Preview Box */}
      <div className={`rounded-2xl border border-[var(--border-color)] bg-[var(--bg-app)] ${densityPadding[settings.density]} transition-all duration-200`}>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2.5">
            <div className="w-8 h-8 rounded-xl bg-[var(--btn-primary-bg)] text-[var(--btn-primary-text)] font-mono font-bold text-xs flex items-center justify-center border border-[var(--border-color)]">
              ▲
            </div>
            <div>
              <div className={`font-bold font-heading text-[var(--text-primary)] ${fontSizeClasses[settings.fontSize]}`}>
                ASCEND AI Component
              </div>
              <div className="text-[10px] font-mono text-[var(--text-secondary)]">
                {settings.fontSize.toUpperCase()} FONT • {settings.animationsEnabled ? "MOTION ACTIVE" : "REDUCED MOTION"}
              </div>
            </div>
          </div>

          <Badge variant="success" icon={<Sparkles className="w-3 h-3 text-[var(--success)]" />}>
            Active
          </Badge>
        </div>

        <p className={`text-[var(--text-primary)] leading-relaxed font-body ${fontSizeClasses[settings.fontSize]}`}>
          "Distributed Systems & Frontend System Architecture candidates achieving <strong className="text-[var(--accent)] font-semibold">85%+ readiness</strong> show 3.2x higher offer conversion at Tier 1 Big Tech loops."
        </p>

        <div className="flex flex-wrap items-center gap-2 pt-1">
          <Button variant="primary" size="sm">
            Primary Action
          </Button>
          <Button variant="outline" size="sm">
            Secondary
          </Button>
          <Button variant="ghost" size="sm">
            Ghost
          </Button>
        </div>
      </div>
    </Card>
  );
};
