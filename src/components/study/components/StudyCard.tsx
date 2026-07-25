import React from "react";
import { motion, useReducedMotion } from "motion/react";
import { StudySubject } from "../../../types/studyTypes";
import { Card, Button, Badge } from "../../DesignSystem";
import { 
  Code2, 
  Server, 
  FileCode, 
  Terminal, 
  Database, 
  Cpu, 
  Network, 
  Layers, 
  Sparkles, 
  Workflow,
  Clock,
  Star,
  Play,
  CheckCircle2,
  BookOpen
} from "lucide-react";

interface StudyCardProps {
  subject: StudySubject;
  onContinue: (subject: StudySubject) => void;
  onToggleFavorite: (id: string) => void;
  className?: string;
}

export const renderSubjectIcon = (iconName: string, className = "w-5 h-5") => {
  switch (iconName) {
    case "Code2": return <Code2 className={className} />;
    case "Server": return <Server className={className} />;
    case "FileCode": return <FileCode className={className} />;
    case "Terminal": return <Terminal className={className} />;
    case "Database": return <Database className={className} />;
    case "Cpu": return <Cpu className={className} />;
    case "Network": return <Network className={className} />;
    case "Layers": return <Layers className={className} />;
    case "Sparkles": return <Sparkles className={className} />;
    case "Workflow": return <Workflow className={className} />;
    default: return <BookOpen className={className} />;
  }
};

export const StudyCard: React.FC<StudyCardProps> = ({
  subject,
  onContinue,
  onToggleFavorite,
  className = "",
}) => {
  const shouldReduceMotion = useReducedMotion();
  const isCompleted = subject.progress >= 100;

  const getDifficultyVariant = (diff: string) => {
    switch (diff) {
      case "Beginner": return "success";
      case "Intermediate": return "accent";
      case "Advanced": return "secondary";
      case "Expert": return "error";
      default: return "neutral";
    }
  };

  return (
    <motion.div
      whileHover={shouldReduceMotion ? {} : { y: -4 }}
      transition={{ duration: 0.2 }}
      className={`h-full ${className}`}
    >
      <Card hoverable className={`flex flex-col justify-between space-y-5 group h-full transition-shadow duration-200 ${
        isCompleted ? "border-[var(--success)]/40 bg-[var(--bg-surface)]" : ""
      }`}>
        
        {/* Top Bar: Icon, Title, Favorite & Badge */}
        <div className="space-y-3">
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-center space-x-3">
              <motion.div 
                whileHover={shouldReduceMotion ? {} : { scale: 1.1 }}
                className={`w-10 h-10 rounded-xl border flex items-center justify-center text-[var(--accent)] transition-colors ${
                  isCompleted ? "bg-[var(--success)]/15 border-[var(--success)]/30 text-[var(--success)]" : "bg-[var(--bg-app)] border-[var(--border-color)] group-hover:border-[var(--accent)]/50"
                }`}
              >
                {renderSubjectIcon(subject.iconName)}
              </motion.div>
              <div>
                <h3 className="text-base font-bold font-heading text-[var(--text-primary)] group-hover:text-[var(--accent)] transition-colors flex items-center space-x-1.5">
                  <span>{subject.name}</span>
                  {isCompleted && <CheckCircle2 className="w-4 h-4 text-[var(--success)] shrink-0" />}
                </h3>
                <div className="text-[11px] font-mono text-[var(--text-secondary)]">
                  {subject.category}
                </div>
              </div>
            </div>

            <button
              onClick={(e) => {
                e.stopPropagation();
                onToggleFavorite(subject.id);
              }}
              className="p-2 rounded-lg text-[var(--text-secondary)] hover:text-amber-400 hover:bg-[var(--bg-hover)] transition-colors"
              title="Toggle Favorite"
            >
              <Star className={`w-4 h-4 ${subject.isFavorite ? "fill-amber-400 text-amber-400" : ""}`} />
            </button>
          </div>

          <p className="text-xs text-[var(--text-secondary)] line-clamp-2 leading-relaxed font-body">
            {subject.description}
          </p>
        </div>

        {/* Progress & Stats */}
        <div className="space-y-3 pt-2 border-t border-[var(--border-color)] mt-auto">
          
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="text-[var(--text-secondary)]">Mastery Progress</span>
              <span className="font-bold text-[var(--text-primary)] font-numbers">{subject.progress}%</span>
            </div>
            <div className="w-full h-2 bg-[var(--bg-app)] rounded-full overflow-hidden border border-[var(--border-color)]/60">
              <motion.div 
                className={`h-full rounded-full ${
                  isCompleted ? "bg-[var(--success)]" : "bg-[var(--accent)]"
                }`}
                initial={{ width: "0%" }}
                animate={{ width: `${subject.progress}%` }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              />
            </div>
          </div>

          <div className="flex items-center justify-between text-[11px] font-mono text-[var(--text-secondary)] pt-1">
            <span className="flex items-center space-x-1">
              <Clock className="w-3 h-3 text-[var(--accent)]" />
              <span>Est: {subject.estimatedTimeHours}h</span>
            </span>

            {isCompleted ? (
              <Badge variant="success" icon={<CheckCircle2 className="w-3 h-3" />}>Mastered</Badge>
            ) : (
              <Badge variant={getDifficultyVariant(subject.difficulty)} size="sm">
                {subject.difficulty}
              </Badge>
            )}
          </div>

          {/* Action Button */}
          <Button
            onClick={() => onContinue(subject)}
            variant={isCompleted ? "outline" : "primary"}
            size="sm"
            className="w-full mt-2"
            icon={isCompleted ? <CheckCircle2 className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 fill-current" />}
          >
            {isCompleted ? "Review Subject" : subject.progress > 0 ? "Continue Learning" : "Start Subject"}
          </Button>

        </div>

      </Card>
    </motion.div>
  );
};
