import React, { useState } from "react";
import { InterviewQuestionItem } from "../../data/interviewData";
import { DifficultyBadge } from "./DifficultyBadge";
import { HelpCircle, Clock, Sparkles, User, ChevronDown, ChevronUp } from "lucide-react";

interface QuestionCardProps {
  questionItem: InterviewQuestionItem;
  currentQuestionIndex: number;
  totalQuestions: number;
  className?: string;
}

export const QuestionCard: React.FC<QuestionCardProps> = ({
  questionItem,
  currentQuestionIndex,
  totalQuestions,
  className = "",
}) => {
  const [showHint, setShowHint] = useState(false);
  const [showTakeaways, setShowTakeaways] = useState(false);

  return (
    <div className={`bg-[var(--bg-surface)] border border-[var(--border-color)] rounded-2xl p-6 sm:p-8 shadow-craft space-y-6 ${className}`}>
      
      {/* Header Info */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[var(--border-color)]/60">
        <div className="flex items-center space-x-3">
          <span className="text-xs font-mono font-bold text-[var(--accent)] bg-[var(--accent)]/15 border border-[var(--accent)]/30 px-3 py-1 rounded-lg">
            Question {currentQuestionIndex + 1} of {totalQuestions}
          </span>
          <DifficultyBadge difficulty={questionItem.difficulty} />
          <span className="text-xs font-mono text-[var(--text-secondary)]">
            {questionItem.category}
          </span>
        </div>

        <div className="flex items-center space-x-2 text-xs font-mono text-[var(--text-secondary)]">
          <Clock className="w-3.5 h-3.5 text-[var(--accent)]" />
          <span>Est. {questionItem.estimatedMinutes} mins</span>
        </div>
      </div>

      {/* Main Question Text */}
      <div className="space-y-3">
        <h2 className="text-lg sm:text-xl font-bold font-heading text-[var(--text-primary)] leading-relaxed">
          {questionItem.question}
        </h2>
      </div>

      {/* AI Interviewer Persona Bar */}
      <div className="p-3.5 bg-[var(--bg-app)] border border-[var(--border-color)] rounded-xl flex items-center justify-between text-xs text-[var(--text-secondary)]">
        <div className="flex items-center space-x-2.5">
          <div className="w-8 h-8 rounded-full bg-[var(--accent)]/20 text-[var(--accent)] flex items-center justify-center font-bold text-xs border border-[var(--accent)]/30 shrink-0">
            {questionItem.interviewerPersona.name.charAt(0)}
          </div>
          <div>
            <div className="font-bold text-[var(--text-primary)] font-heading">
              {questionItem.interviewerPersona.name}
            </div>
            <div className="text-[11px]">
              {questionItem.interviewerPersona.title} • {questionItem.interviewerPersona.company}
            </div>
          </div>
        </div>

        <span className="text-[10px] font-mono uppercase text-[var(--success)] font-semibold flex items-center space-x-1 bg-[var(--success)]/10 px-2 py-0.5 rounded-md border border-[var(--success)]/20">
          <span className="w-1.5 h-1.5 rounded-full bg-[var(--success)] animate-pulse" />
          <span>Live Committee</span>
        </span>
      </div>

      {/* Collapsible Hints & Takeaways */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
        {/* Hint Accordion */}
        <div className="border border-[var(--border-color)] rounded-xl bg-[var(--bg-app)] overflow-hidden">
          <button
            onClick={() => setShowHint(!showHint)}
            className="w-full px-4 py-2.5 text-xs font-mono font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)] flex items-center justify-between transition-colors"
          >
            <span className="flex items-center space-x-1.5">
              <HelpCircle className="w-3.5 h-3.5 text-[var(--accent)]" />
              <span>Architect Hint</span>
            </span>
            {showHint ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
          </button>
          {showHint && (
            <div className="px-4 pb-3 pt-1 text-xs text-[var(--text-secondary)] border-t border-[var(--border-color)]/50 leading-relaxed font-body">
              {questionItem.initialHint}
            </div>
          )}
        </div>

        {/* Expected Dimensions Accordion */}
        <div className="border border-[var(--border-color)] rounded-xl bg-[var(--bg-app)] overflow-hidden">
          <button
            onClick={() => setShowTakeaways(!showTakeaways)}
            className="w-full px-4 py-2.5 text-xs font-mono font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)] flex items-center justify-between transition-colors"
          >
            <span className="flex items-center space-x-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[var(--secondary-accent)]" />
              <span>Key Evaluation Dimensions</span>
            </span>
            {showTakeaways ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
          </button>
          {showTakeaways && (
            <div className="px-4 pb-3 pt-1 text-xs text-[var(--text-secondary)] border-t border-[var(--border-color)]/50 space-y-1.5">
              {questionItem.keyTakeaways.map((point, idx) => (
                <div key={idx} className="flex items-start space-x-1.5">
                  <span className="text-[var(--accent)]">•</span>
                  <span>{point}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

    </div>
  );
};
