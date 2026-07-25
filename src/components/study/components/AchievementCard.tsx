import React from "react";
import { motion, useReducedMotion } from "motion/react";
import { AchievementBadgeData } from "../../../types/studyTypes";
import { Card, Badge } from "../../DesignSystem";
import { Award, Flame, Workflow, Code2, CheckCircle2, Lock } from "lucide-react";

interface AchievementCardProps {
  badge: AchievementBadgeData;
  className?: string;
}

export const renderBadgeIcon = (iconName: string, className = "w-5 h-5") => {
  switch (iconName) {
    case "Flame": return <Flame className={className} />;
    case "Workflow": return <Workflow className={className} />;
    case "Code2": return <Code2 className={className} />;
    default: return <Award className={className} />;
  }
};

export const AchievementCard: React.FC<AchievementCardProps> = ({
  badge,
  className = "",
}) => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      whileHover={shouldReduceMotion ? {} : { y: -4 }}
      transition={{ duration: 0.2 }}
    >
      <Card className={`p-4 space-y-3 bg-[var(--bg-app)] border border-[var(--border-color)] hover:border-[var(--accent)]/50 transition-colors group ${className}`}>
        <div className="flex items-center justify-between">
          <motion.div 
            whileHover={shouldReduceMotion ? {} : { scale: 1.1, rotate: 5 }}
            className={`w-10 h-10 rounded-xl border flex items-center justify-center transition-colors ${
              badge.isUnlocked
                ? "bg-amber-400/15 border-amber-400/30 text-amber-400 shadow-xs"
                : "bg-[var(--bg-surface)] border-[var(--border-color)] text-[var(--text-secondary)]"
            }`}
          >
            {renderBadgeIcon(badge.icon)}
          </motion.div>

          {badge.isUnlocked ? (
            <Badge variant="success" icon={<CheckCircle2 className="w-3 h-3" />}>
              Unlocked
            </Badge>
          ) : (
            <Badge variant="neutral" icon={<Lock className="w-3 h-3" />}>
              {badge.progress}%
            </Badge>
          )}
        </div>

        <div className="space-y-1">
          <h4 className="text-xs font-bold font-heading text-[var(--text-primary)] group-hover:text-[var(--accent)] transition-colors">
            {badge.title}
          </h4>
          <p className="text-[11px] text-[var(--text-secondary)] font-body line-clamp-2 leading-relaxed">
            {badge.description}
          </p>
        </div>

        {!badge.isUnlocked && (
          <div className="w-full h-1.5 bg-[var(--bg-surface)] rounded-full overflow-hidden border border-[var(--border-color)]">
            <motion.div
              className="h-full bg-amber-400 rounded-full"
              initial={{ width: "0%" }}
              animate={{ width: `${badge.progress}%` }}
              transition={{ duration: 0.8 }}
            />
          </div>
        )}

        {badge.unlockedAt && (
          <div className="text-[10px] font-mono text-[var(--text-secondary)] pt-2 border-t border-[var(--border-color)]">
            Unlocked on {badge.unlockedAt}
          </div>
        )}
      </Card>
    </motion.div>
  );
};
