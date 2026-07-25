import React from "react";
import { motion } from "motion/react";
import { 
  BookOpen, 
  Sparkles, 
  History, 
  Bookmark, 
  Map, 
  CheckCircle2, 
  FolderOpen,
  HelpCircle
} from "lucide-react";
import { Button } from "../../DesignSystem";

export type EmptyStateVariant = 
  | "generic" 
  | "no-roadmap" 
  | "no-history" 
  | "no-resources" 
  | "no-weak-topics" 
  | "no-saved-lessons";

interface EmptyStateProps {
  variant?: EmptyStateVariant;
  title?: string;
  description?: string;
  icon?: React.ReactNode;
  actionText?: string;
  onAction?: () => void;
  className?: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  variant = "generic",
  title,
  description,
  icon,
  actionText,
  onAction,
  className = "",
}) => {
  const getDefaults = () => {
    switch (variant) {
      case "no-roadmap":
        return {
          defaultTitle: "No Active Learning Roadmap",
          defaultDesc: "Select a core engineering subject from the library to generate your tailored milestone path.",
          defaultIcon: <Map className="w-6 h-6" />,
          defaultAction: "Browse Subject Library",
        };
      case "no-history":
        return {
          defaultTitle: "No Study History Recorded",
          defaultDesc: "Complete your first lesson, practice drill, or quiz to start tracking your mastery progress telemetry.",
          defaultIcon: <History className="w-6 h-6" />,
          defaultAction: "Start Practice Session",
        };
      case "no-resources":
        return {
          defaultTitle: "No Resources Found",
          defaultDesc: "No documentation, articles, or video tutorials match your current search and filter criteria.",
          defaultIcon: <FolderOpen className="w-6 h-6" />,
          defaultAction: "Clear Filters",
        };
      case "no-weak-topics":
        return {
          defaultTitle: "Zero Skill Gaps Identified",
          defaultDesc: "Outstanding performance! You have achieved target mastery across all assessed core subject domains.",
          defaultIcon: <CheckCircle2 className="w-6 h-6 text-[var(--success)]" />,
          defaultAction: "Take Diagnostic Quiz",
        };
      case "no-saved-lessons":
        return {
          defaultTitle: "No Saved Lessons or Cards",
          defaultDesc: "Click the bookmark icon on any flashcard or resource while studying to save it here for quick review.",
          defaultIcon: <Bookmark className="w-6 h-6" />,
          defaultAction: "Review Flashcards",
        };
      default:
        return {
          defaultTitle: "No Content Available",
          defaultDesc: "There are no learning materials matching your criteria.",
          defaultIcon: <BookOpen className="w-6 h-6" />,
          defaultAction: "Explore Content",
        };
    }
  };

  const defaults = getDefaults();
  const finalTitle = title || defaults.defaultTitle;
  const finalDesc = description || defaults.defaultDesc;
  const finalIcon = icon || defaults.defaultIcon;
  const finalActionText = actionText || defaults.defaultAction;

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`p-12 bg-[var(--bg-surface)] border border-[var(--border-color)] rounded-2xl shadow-craft text-center space-y-4 flex flex-col items-center justify-center ${className}`}
    >
      <div className="w-12 h-12 rounded-2xl bg-[var(--bg-app)] border border-[var(--border-color)] flex items-center justify-center text-[var(--accent)] shadow-xs">
        {finalIcon}
      </div>

      <div className="space-y-1.5 max-w-md">
        <h3 className="text-base font-bold font-heading text-[var(--text-primary)]">
          {finalTitle}
        </h3>
        <p className="text-xs text-[var(--text-secondary)] leading-relaxed font-body">
          {finalDesc}
        </p>
      </div>

      {onAction && (
        <Button onClick={onAction} variant="accent" size="sm" icon={<Sparkles className="w-3.5 h-3.5" />}>
          {finalActionText}
        </Button>
      )}
    </motion.div>
  );
};
