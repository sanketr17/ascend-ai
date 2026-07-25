import React, { useState, useEffect } from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { QuizQuestionItem } from "../../../types/studyTypes";
import { Card, Button, Badge } from "../../DesignSystem";
import { XPAnimation } from "./XPAnimation";
import { 
  Clock, 
  HelpCircle, 
  CheckCircle2, 
  XCircle, 
  Bookmark, 
  ArrowRight, 
  RotateCcw,
  Sparkles,
  Award
} from "lucide-react";

interface QuizCardProps {
  questions: QuizQuestionItem[];
  subjectName: string;
  topicName: string;
  onFinishQuiz: (score: number, correct: number, total: number, answers: number[]) => void;
}

export const QuizCard: React.FC<QuizCardProps> = ({
  questions,
  subjectName,
  topicName,
  onFinishQuiz,
}) => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<(number | null)[]>(
    new Array(questions.length).fill(null)
  );
  const [reviewedLater, setReviewedLater] = useState<boolean[]>(
    new Array(questions.length).fill(false)
  );
  const [timerSeconds, setTimerSeconds] = useState(0);
  const [showXP, setShowXP] = useState(false);
  const [direction, setDirection] = useState<1 | -1>(1);
  const shouldReduceMotion = useReducedMotion();

  const currentQ = questions[currentIdx] || questions[0];

  // Timer Effect
  useEffect(() => {
    const interval = setInterval(() => {
      setTimerSeconds((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleSelectOption = (optIdx: number) => {
    const updated = [...selectedAnswers];
    updated[currentIdx] = optIdx;
    setSelectedAnswers(updated);
  };

  const toggleReviewLater = () => {
    const updated = [...reviewedLater];
    updated[currentIdx] = !updated[currentIdx];
    setReviewedLater(updated);
  };

  const goToQuestion = (nextIdx: number) => {
    setDirection(nextIdx > currentIdx ? 1 : -1);
    setCurrentIdx(nextIdx);
  };

  const handleSubmitQuiz = () => {
    let correctCount = 0;
    selectedAnswers.forEach((ans, idx) => {
      if (ans === questions[idx].correctAnswerIndex) {
        correctCount += 1;
      }
    });
    const score = Math.round((correctCount / questions.length) * 100);
    setShowXP(true);
    setTimeout(() => {
      onFinishQuiz(
        score,
        correctCount,
        questions.length,
        selectedAnswers.map((a) => (a === null ? -1 : a))
      );
    }, 600);
  };

  const formatTimer = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  return (
    <div className="space-y-6 max-w-3xl mx-auto relative">
      
      {/* Floating XP Animation */}
      <AnimatePresence>
        {showXP && (
          <div className="absolute top-0 right-4 z-50">
            <XPAnimation amount={100} label="Quiz XP" onAnimationComplete={() => setShowXP(false)} />
          </div>
        )}
      </AnimatePresence>

      {/* Quiz Top Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 bg-[var(--bg-surface)] border border-[var(--border-color)] rounded-2xl shadow-craft">
        
        <div className="space-y-0.5">
          <div className="flex items-center space-x-2">
            <Badge variant="accent">{subjectName}</Badge>
            <span className="text-xs font-mono text-[var(--text-secondary)]">{topicName}</span>
          </div>
          <h2 className="text-sm font-bold font-heading text-[var(--text-primary)]">
            Technical Assessment Battery
          </h2>
        </div>

        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-1.5 text-xs font-mono text-[var(--text-secondary)]">
            <Clock className="w-3.5 h-3.5 text-[var(--accent)]" />
            <span className="font-bold text-[var(--text-primary)] font-numbers">{formatTimer(timerSeconds)}</span>
          </div>

          <Button
            onClick={toggleReviewLater}
            variant="outline"
            size="sm"
            icon={<Bookmark className={`w-3.5 h-3.5 ${reviewedLater[currentIdx] ? "fill-[var(--accent)] text-[var(--accent)]" : ""}`} />}
          >
            {reviewedLater[currentIdx] ? "Marked for Review" : "Review Later"}
          </Button>
        </div>

      </div>

      {/* Question Navigator Bar */}
      <div className="p-3 bg-[var(--bg-surface)] border border-[var(--border-color)] rounded-2xl shadow-craft flex items-center justify-between overflow-x-auto">
        <span className="text-xs font-mono text-[var(--text-secondary)] mr-3 shrink-0">Questions:</span>
        <div className="flex items-center space-x-2">
          {questions.map((_, idx) => {
            const isSelected = selectedAnswers[idx] !== null;
            const isCurrent = idx === currentIdx;
            const isFlagged = reviewedLater[idx];

            return (
              <button
                key={idx}
                onClick={() => goToQuestion(idx)}
                className={`w-8 h-8 rounded-xl font-mono text-xs font-bold transition-all relative ${
                  isCurrent
                    ? "bg-[var(--accent)] text-[var(--bg-app)] ring-2 ring-[var(--accent)]/50"
                    : isSelected
                    ? "bg-[var(--btn-primary-bg)] text-[var(--btn-primary-text)] border border-[var(--accent)]"
                    : "bg-[var(--bg-app)] text-[var(--text-secondary)] border border-[var(--border-color)] hover:border-[var(--text-primary)]/40"
                }`}
              >
                {idx + 1}
                {isFlagged && (
                  <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-amber-400 border border-[var(--bg-surface)]" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Question Card with Slide/Fade Transition */}
      <AnimatePresence mode="wait" custom={direction}>
        <motion.div
          key={currentIdx}
          custom={direction}
          initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, x: direction * 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, x: -direction * 20 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
        >
          <Card className="space-y-6">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono text-[var(--text-secondary)]">
                Question {currentIdx + 1} of {questions.length}
              </span>
              <Badge variant="secondary">{currentQ.difficulty}</Badge>
            </div>

            <h3 className="text-lg font-bold font-heading text-[var(--text-primary)] leading-snug">
              {currentQ.question}
            </h3>

            {/* Options Grid */}
            <div className="space-y-2.5">
              {currentQ.options.map((opt, optIdx) => {
                const isChosen = selectedAnswers[currentIdx] === optIdx;

                return (
                  <motion.button
                    key={optIdx}
                    type="button"
                    whileTap={shouldReduceMotion ? {} : { scale: 0.99 }}
                    onClick={() => handleSelectOption(optIdx)}
                    className={`w-full p-4 rounded-xl border text-left text-xs font-body transition-all flex items-center justify-between ${
                      isChosen
                        ? "bg-[var(--accent)]/15 border-[var(--accent)] text-[var(--text-primary)] font-bold shadow-xs"
                        : "bg-[var(--bg-app)] border-[var(--border-color)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-[var(--text-primary)]/40"
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <span className={`w-6 h-6 rounded-lg font-mono text-xs flex items-center justify-center font-bold ${
                        isChosen ? "bg-[var(--accent)] text-[var(--bg-app)]" : "bg-[var(--bg-surface)] border border-[var(--border-color)]"
                      }`}>
                        {String.fromCharCode(65 + optIdx)}
                      </span>
                      <span>{opt}</span>
                    </div>

                    {isChosen && <CheckCircle2 className="w-4 h-4 text-[var(--accent)] shrink-0" />}
                  </motion.button>
                );
              })}
            </div>
          </Card>
        </motion.div>
      </AnimatePresence>

      {/* Bottom Stage Action */}
      <div className="flex items-center justify-between p-4 bg-[var(--bg-surface)] border border-[var(--border-color)] rounded-2xl shadow-craft">
        <Button
          onClick={() => goToQuestion(Math.max(0, currentIdx - 1))}
          disabled={currentIdx === 0}
          variant="outline"
          size="md"
        >
          Previous
        </Button>

        {currentIdx < questions.length - 1 ? (
          <Button
            onClick={() => goToQuestion(currentIdx + 1)}
            variant="accent"
            size="md"
            icon={<ArrowRight className="w-4 h-4" />}
          >
            Next Question
          </Button>
        ) : (
          <Button
            onClick={handleSubmitQuiz}
            variant="accent"
            size="md"
            icon={<Sparkles className="w-4 h-4" />}
          >
            Submit Quiz
          </Button>
        )}
      </div>

    </div>
  );
};
