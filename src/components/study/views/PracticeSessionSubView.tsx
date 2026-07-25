import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { PracticeQuestionItem } from "../../../types/studyTypes";
import { PracticeCard } from "../components/PracticeCard";
import { PageTransition, Badge, Card, Button } from "../../DesignSystem";
import { Zap, Sparkles, Loader2, CheckCircle2 } from "lucide-react";

interface PracticeSessionSubViewProps {
  questions: PracticeQuestionItem[];
  onCompletePractice: () => void;
}

export const PracticeSessionSubView: React.FC<PracticeSessionSubViewProps> = ({
  questions,
  onCompletePractice,
}) => {
  const [prepStep, setPrepStep] = useState<0 | 1 | 2 | 3>(0); // 0: Preparing, 1: Loading, 2: Ready, 3: Active

  useEffect(() => {
    const timer1 = setTimeout(() => setPrepStep(1), 600);
    const timer2 = setTimeout(() => setPrepStep(2), 1200);
    const timer3 = setTimeout(() => setPrepStep(3), 1800);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, []);

  return (
    <PageTransition className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[var(--border-color)]">
        <div>
          <h1 className="text-xl font-bold font-heading text-[var(--text-primary)] flex items-center space-x-2">
            <Zap className="w-5 h-5 text-[var(--secondary-accent)]" />
            <span>Interactive Architectural Practice Session</span>
          </h1>
          <p className="text-xs text-[var(--text-secondary)] mt-0.5">
            Hands-on problem solving, trade-off evaluations, and code drills.
          </p>
        </div>

        <Badge variant="secondary" icon={<Sparkles className="w-3.5 h-3.5" />}>
          {questions.length} Practice Drills
        </Badge>
      </div>

      <AnimatePresence mode="wait">
        {prepStep < 3 ? (
          <motion.div
            key="prep-screen"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.3 }}
            className="p-12 bg-[var(--bg-surface)] border border-[var(--border-color)] rounded-2xl shadow-craft max-w-xl mx-auto text-center space-y-6 my-12"
          >
            <div className="w-14 h-14 rounded-2xl bg-[var(--bg-app)] border border-[var(--border-color)] mx-auto flex items-center justify-center text-[var(--accent)] shadow-xs">
              {prepStep === 2 ? (
                <CheckCircle2 className="w-7 h-7 text-[var(--success)]" />
              ) : (
                <Loader2 className="w-7 h-7 text-[var(--accent)] animate-spin" />
              )}
            </div>

            <div className="space-y-2">
              <h3 className="text-lg font-bold font-heading text-[var(--text-primary)]">
                {prepStep === 0 && "Preparing Practice Session..."}
                {prepStep === 1 && "Loading Architectural Drills..."}
                {prepStep === 2 && "Practice Environment Ready!"}
              </h3>
              <p className="text-xs text-[var(--text-secondary)] font-body">
                Configuring telemetry monitors and trade-off evaluation matrices.
              </p>
            </div>

            <div className="w-full h-2 bg-[var(--bg-app)] rounded-full overflow-hidden border border-[var(--border-color)]">
              <motion.div
                className="h-full bg-[var(--accent)] rounded-full"
                animate={{
                  width: prepStep === 0 ? "35%" : prepStep === 1 ? "75%" : "100%",
                }}
                transition={{ duration: 0.4 }}
              />
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="active-session"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <PracticeCard questions={questions} onCompletePractice={onCompletePractice} />
          </motion.div>
        )}
      </AnimatePresence>

    </PageTransition>
  );
};
