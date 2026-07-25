import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Flashcard } from "../../types";
import { PageTransition, Card, Button, Badge, AnimatedProgressBar } from "../DesignSystem";
import { 
  RotateCcw, 
  Sparkles
} from "lucide-react";

interface SpacedMemoryViewProps {
  flashcards: Flashcard[];
  onUpdateFlashcard: (card: Flashcard) => void;
  onGenerateMoreCards: (topic: string) => void;
  isGeneratingCards: boolean;
}

export const SpacedMemoryView: React.FC<SpacedMemoryViewProps> = ({
  flashcards,
  onUpdateFlashcard,
  onGenerateMoreCards,
  isGeneratingCards,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [customTopic, setCustomTopic] = useState("System Architecture");

  const currentCard = flashcards[currentIndex] || flashcards[0];

  const handleRating = (rating: "Again" | "Hard" | "Good" | "Easy") => {
    if (!currentCard) return;

    let newInterval = currentCard.intervalDays;
    if (rating === "Again") newInterval = 1;
    else if (rating === "Hard") newInterval = Math.max(2, Math.round(currentCard.intervalDays * 1.2));
    else if (rating === "Good") newInterval = Math.max(3, Math.round(currentCard.intervalDays * 2.0));
    else if (rating === "Easy") newInterval = Math.max(5, Math.round(currentCard.intervalDays * 2.8));

    const updatedCard: Flashcard = {
      ...currentCard,
      intervalDays: newInterval,
      history: [
        ...currentCard.history,
        { date: new Date().toISOString().split("T")[0], rating },
      ],
    };

    onUpdateFlashcard(updatedCard);
    setIsFlipped(false);

    // Next card
    if (currentIndex < flashcards.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      setCurrentIndex(0);
    }
  };

  const progressPercent = Math.round(((currentIndex + 1) / flashcards.length) * 100);

  return (
    <PageTransition>
      
      {/* Header & Controls */}
      <Card>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="text-base font-bold font-heading text-[var(--text-primary)] flex items-center space-x-2">
              <RotateCcw className="w-5 h-5 text-[var(--accent)]" />
              <span>Spaced Repetition Memory Deck</span>
            </h2>
            <p className="text-xs text-[var(--text-secondary)] mt-0.5">
              SuperMemo-2 retention algorithm ensures long-term mastery of interview concepts.
            </p>
          </div>

          <div className="flex items-center space-x-2">
            <input
              type="text"
              value={customTopic}
              onChange={(e) => setCustomTopic(e.target.value)}
              placeholder="Topic for new cards..."
              className="px-3.5 py-2 text-xs bg-[var(--bg-app)] border border-[var(--border-color)] rounded-xl text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent)] transition-all focus:ring-2 focus:ring-[var(--accent)]/20"
            />
            <Button
              onClick={() => onGenerateMoreCards(customTopic)}
              disabled={isGeneratingCards}
              variant="primary"
              size="sm"
              icon={<Sparkles className="w-3.5 h-3.5 text-[var(--accent)]" />}
            >
              {isGeneratingCards ? "Generating..." : "Generate Cards"}
            </Button>
          </div>
        </div>

        {/* Deck Progress Bar */}
        <div className="mt-5 pt-4 border-t border-[var(--border-color)] flex items-center justify-between text-xs text-[var(--text-secondary)] font-mono">
          <span>
            Card {currentIndex + 1} of {flashcards.length}
          </span>
          <div className="w-48 mx-4 flex-1">
            <AnimatedProgressBar value={progressPercent} height="h-2" />
          </div>
          <span className="font-numbers">Interval: {currentCard?.intervalDays || 1}d</span>
        </div>
      </Card>

      {/* Main Flashcard Container */}
      {currentCard && (
        <div className="max-w-2xl mx-auto space-y-4 pt-2">
          
          {/* Card Box */}
          <motion.div
            whileHover={{ y: -4, borderColor: "var(--accent)" }}
            whileTap={{ scale: 0.99 }}
            onClick={() => setIsFlipped(!isFlipped)}
            className="w-full min-h-[320px] p-8 bg-[var(--bg-surface)] border border-[var(--border-color)] rounded-2xl shadow-craft-md cursor-pointer transition-colors flex flex-col justify-between relative group select-none"
          >
            {/* Top metadata */}
            <div className="flex items-center justify-between text-xs">
              <Badge variant="neutral">{currentCard.topic}</Badge>
              <span className="text-[10px] text-[var(--text-secondary)] font-mono flex items-center gap-1">
                <RotateCcw className="w-3 h-3 text-[var(--accent)]" /> Click card to flip
              </span>
            </div>

            {/* Center Content with Fade Transition */}
            <AnimatePresence mode="wait">
              {!isFlipped ? (
                // Question Front
                <motion.div
                  key="front"
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.2 }}
                  className="py-6 space-y-3"
                >
                  <div className="text-[11px] font-mono text-[var(--text-secondary)] uppercase tracking-wider font-semibold">
                    QUESTION / SCENARIO
                  </div>
                  <h3 className="text-base font-bold font-heading text-[var(--text-primary)] leading-relaxed">
                    {currentCard.question}
                  </h3>
                </motion.div>
              ) : (
                // Answer Back
                <motion.div
                  key="back"
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.2 }}
                  className="py-6 space-y-4"
                >
                  <div className="text-[11px] font-mono text-[var(--success)] uppercase tracking-wider font-bold">
                    ANSWER & REASONING
                  </div>
                  <p className="text-xs font-body text-[var(--text-primary)] leading-relaxed">
                    {currentCard.answer}
                  </p>

                  <div className="p-3.5 bg-[var(--bg-app)] rounded-xl border border-[var(--border-color)] text-xs text-[var(--text-secondary)]">
                    <span className="font-bold text-[var(--text-primary)]">Key Takeaway: </span>
                    {currentCard.keyTakeaway}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Bottom prompt */}
            <div className="text-center text-[11px] text-[var(--text-secondary)] font-mono">
              {!isFlipped ? "Show Answer" : "Rate Confidence below"}
            </div>
          </motion.div>

          {/* Confidence Rating Buttons (Shown when flipped) */}
          <AnimatePresence>
            {isFlipped && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.2 }}
                className="grid grid-cols-4 gap-2.5"
              >
                <motion.button
                  whileHover={{ scale: 1.03, y: -2 }}
                  whileTap={{ scale: 0.96 }}
                  onClick={() => handleRating("Again")}
                  className="p-3.5 bg-[var(--bg-app)] hover:bg-[var(--error)]/10 text-[var(--error)] border border-[var(--border-color)] hover:border-[var(--error)]/30 rounded-xl text-center transition-colors font-mono"
                >
                  <div className="text-xs font-bold font-heading">Again</div>
                  <div className="text-[10px] text-[var(--text-secondary)] font-numbers mt-0.5">&lt;1 Day</div>
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.03, y: -2 }}
                  whileTap={{ scale: 0.96 }}
                  onClick={() => handleRating("Hard")}
                  className="p-3.5 bg-[var(--bg-app)] hover:bg-[var(--accent)]/10 text-[var(--accent)] border border-[var(--border-color)] hover:border-[var(--accent)]/30 rounded-xl text-center transition-colors font-mono"
                >
                  <div className="text-xs font-bold font-heading">Hard</div>
                  <div className="text-[10px] text-[var(--text-secondary)] font-numbers mt-0.5">2 Days</div>
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.03, y: -2 }}
                  whileTap={{ scale: 0.96 }}
                  onClick={() => handleRating("Good")}
                  className="p-3.5 bg-[var(--bg-app)] hover:bg-[var(--secondary-accent)]/10 text-[var(--secondary-accent)] border border-[var(--border-color)] hover:border-[var(--secondary-accent)]/30 rounded-xl text-center transition-colors font-mono"
                >
                  <div className="text-xs font-bold font-heading">Good</div>
                  <div className="text-[10px] text-[var(--text-secondary)] font-numbers mt-0.5">4 Days</div>
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.03, y: -2 }}
                  whileTap={{ scale: 0.96 }}
                  onClick={() => handleRating("Easy")}
                  className="p-3.5 bg-[var(--bg-app)] hover:bg-[var(--success)]/10 text-[var(--success)] border border-[var(--border-color)] hover:border-[var(--success)]/30 rounded-xl text-center transition-colors font-mono"
                >
                  <div className="text-xs font-bold font-heading">Easy</div>
                  <div className="text-[10px] text-[var(--text-secondary)] font-numbers mt-0.5">7 Days</div>
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>

        </div>
      )}

    </PageTransition>
  );
};
