import React from "react";
import { DetailedEvaluation } from "../../data/interviewData";
import { Award, CheckCircle2, AlertCircle, Sparkles, TrendingUp } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { CountUpNumber } from "../motion/CountUpNumber";
import { StaggerContainer, StaggerItem } from "../motion/StaggerContainer";
import { MotionCard } from "../motion/MotionCard";

interface EvaluationCardProps {
  evaluation: DetailedEvaluation;
  onNextQuestion: () => void;
  onRetryQuestion: () => void;
  isLastQuestion?: boolean;
  className?: string;
}

export const EvaluationCard: React.FC<EvaluationCardProps> = ({
  evaluation,
  onNextQuestion,
  onRetryQuestion,
  isLastQuestion = false,
  className = "",
}) => {
  const shouldReduceMotion = useReducedMotion();

  const metrics = [
    { label: "Technical Accuracy", score: evaluation.technicalAccuracy },
    { label: "Communication Clarity", score: evaluation.communicationScore },
    { label: "Confidence & Delivery", score: evaluation.confidenceScore },
    { label: "Explanation Quality", score: evaluation.explanationQuality },
  ];

  return (
    <StaggerContainer className={`bg-[var(--bg-surface)] border border-[var(--border-color)] rounded-2xl p-6 sm:p-8 shadow-craft space-y-6 ${className}`}>
      
      {/* Step 1: Header & Big Score Counter */}
      <StaggerItem>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-[var(--border-color)] gap-4">
          <div>
            <div className="flex items-center space-x-2">
              <Award className="w-5 h-5 text-[var(--accent)]" />
              <h3 className="text-lg font-bold font-heading text-[var(--text-primary)]">
                Question Evaluation Breakdown
              </h3>
            </div>
            <p className="text-xs text-[var(--text-secondary)] mt-0.5">
              Evaluated by ASCEND AI Committee against Tier-1 Engineering benchmarks.
            </p>
          </div>

          <div className="flex items-center space-x-4 shrink-0">
            <div className="text-right">
              <div className="text-4xl font-extrabold font-numbers text-[var(--text-primary)]">
                <CountUpNumber value={evaluation.overallScore} suffix="/100" duration={1.5} />
              </div>
              <div className="text-[10px] text-[var(--text-secondary)] font-mono uppercase tracking-wider">Question Score</div>
            </div>
          </div>
        </div>
      </StaggerItem>

      {/* Step 2: 4 Dimension Metrics Progress Fill */}
      <StaggerItem>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {metrics.map((m) => (
            <div key={m.label} className="p-3.5 bg-[var(--bg-app)] rounded-xl border border-[var(--border-color)] space-y-1">
              <div className="text-[10px] font-mono text-[var(--text-secondary)] uppercase tracking-wider">
                {m.label}
              </div>
              <div className="text-xl font-bold font-numbers text-[var(--text-primary)]">
                <CountUpNumber value={m.score} suffix="%" duration={1.2} />
              </div>
              <div className="w-full h-1.5 bg-[var(--bg-surface)] rounded-full overflow-hidden border border-[var(--border-color)]/30">
                <motion.div 
                  className={`h-full rounded-full ${m.score >= 85 ? "bg-[var(--success)]" : "bg-[var(--accent)]"}`}
                  initial={{ width: "0%" }}
                  animate={{ width: `${m.score}%` }}
                  transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
                />
              </div>
            </div>
          ))}
        </div>
      </StaggerItem>

      {/* Step 3: Strengths Card & Improvement Card */}
      <StaggerItem>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Strengths */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold font-mono text-[var(--success)] uppercase tracking-wider flex items-center space-x-1.5">
              <CheckCircle2 className="w-4 h-4" />
              <span>Demonstrated Strengths</span>
            </h4>
            <div className="space-y-2">
              {evaluation.strengths.map((st, i) => (
                <MotionCard 
                  key={i} 
                  className="text-xs text-[var(--text-primary)] p-3 bg-[var(--bg-app)] border border-[var(--border-color)] hover:border-[var(--success)]/40 rounded-xl leading-relaxed transition-all shadow-xs"
                >
                  {st}
                </MotionCard>
              ))}
            </div>
          </div>

          {/* Weaknesses & Missing Concepts */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold font-mono text-[var(--error)] uppercase tracking-wider flex items-center space-x-1.5">
              <AlertCircle className="w-4 h-4" />
              <span>Missing Concepts & Gaps</span>
            </h4>
            <div className="space-y-2">
              {evaluation.weaknesses.map((w, i) => (
                <MotionCard 
                  key={i} 
                  className="text-xs text-[var(--text-primary)] p-3 bg-[var(--bg-app)] border border-[var(--border-color)] hover:border-[var(--error)]/40 rounded-xl leading-relaxed transition-all shadow-xs"
                >
                  {w}
                </MotionCard>
              ))}
            </div>
          </div>

        </div>
      </StaggerItem>

      {/* Step 4: Missing Concepts Badges */}
      {evaluation.missingConcepts.length > 0 && (
        <StaggerItem>
          <div className="space-y-2 pt-2">
            <span className="text-xs font-mono text-[var(--text-secondary)] uppercase tracking-wider font-semibold">
              Keywords / Concepts Not Addressed:
            </span>
            <div className="flex flex-wrap gap-2">
              {evaluation.missingConcepts.map((mc, idx) => (
                <span key={idx} className="px-2.5 py-1 rounded-md text-[11px] font-mono bg-[var(--error)]/10 text-[var(--error)] border border-[var(--error)]/20">
                  {mc}
                </span>
              ))}
            </div>
          </div>
        </StaggerItem>
      )}

      {/* Step 5: Staff-Level Sample Answer */}
      <StaggerItem>
        <MotionCard className="p-5 bg-[var(--btn-primary-bg)] text-[var(--btn-primary-text)] rounded-xl space-y-2 border border-[var(--border-color)] hover:border-[var(--accent)]/50 transition-colors">
          <div className="text-xs font-bold text-[var(--accent)] flex items-center space-x-2 font-mono">
            <Sparkles className="w-4 h-4" />
            <span>Staff-Level Sample Response</span>
          </div>
          <p className="text-xs leading-relaxed text-[var(--text-secondary)] font-body">
            "{evaluation.betterSampleAnswer}"
          </p>
        </MotionCard>
      </StaggerItem>

      {/* Step 6: Next Question Difficulty Recommendation */}
      <StaggerItem>
        <div className="p-4 bg-[var(--bg-app)] rounded-xl border border-[var(--border-color)] flex items-center justify-between text-xs">
          <div className="flex items-center space-x-2 text-[var(--text-secondary)]">
            <TrendingUp className="w-4 h-4 text-[var(--secondary-accent)]" />
            <span>Adaptive Progression:</span>
            <span className="font-bold text-[var(--text-primary)] font-mono">{evaluation.nextDifficultyRecommendation}</span>
          </div>
        </div>
      </StaggerItem>

      {/* Step 7: Bottom Actions */}
      <StaggerItem>
        <div className="flex items-center justify-end space-x-3 pt-2">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onRetryQuestion}
            className="px-4 py-2.5 text-xs font-mono text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors border border-[var(--border-color)] rounded-xl cursor-pointer"
          >
            Retry Question
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onNextQuestion}
            className="px-6 py-2.5 text-xs font-mono font-bold bg-[var(--btn-primary-bg)] text-[var(--btn-primary-text)] border border-[var(--border-color)] hover:border-[var(--accent)] rounded-xl transition-all shadow-xs cursor-pointer"
          >
            {isLastQuestion ? "View Interview Summary →" : "Next Question →"}
          </motion.button>
        </div>
      </StaggerItem>

    </StaggerContainer>
  );
};
