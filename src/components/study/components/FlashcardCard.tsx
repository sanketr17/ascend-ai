import React, { useState, useEffect } from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { StudyFlashcardItem } from "../../../types/studyTypes";
import { Card, Button, Badge } from "../../DesignSystem";
import { XPAnimation } from "./XPAnimation";
import { 
  RotateCw, 
  Bookmark, 
  Star, 
  ChevronLeft, 
  ChevronRight, 
  Shuffle, 
  Clock, 
  Sparkles,
  HelpCircle,
  CheckCircle2,
  Keyboard
} from "lucide-react";

interface FlashcardCardProps {
  cards: StudyFlashcardItem[];
  onCompleteSession?: () => void;
}

export const FlashcardCard: React.FC<FlashcardCardProps> = ({ cards, onCompleteSession }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [cardList, setCardList] = useState<StudyFlashcardItem[]>(cards);
  const [timerSeconds, setTimerSeconds] = useState(0);
  const [showXP, setShowXP] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  const currentCard = cardList[currentIndex] || cards[0];

  // Timer Effect
  useEffect(() => {
    const interval = setInterval(() => {
      setTimerSeconds((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === "Space") {
        e.preventDefault();
        handleFlipCard();
      } else if (e.code === "ArrowRight") {
        handleNext();
      } else if (e.code === "ArrowLeft") {
        handlePrev();
      } else if (e.key.toLowerCase() === "b") {
        toggleBookmark();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentIndex, cardList, isFlipped]);

  const handleFlipCard = () => {
    setIsFlipped((prev) => {
      const next = !prev;
      if (next) {
        setShowXP(true);
      }
      return next;
    });
  };

  const handleNext = () => {
    setIsFlipped(false);
    setCurrentIndex((prev) => (prev + 1) % cardList.length);
  };

  const handlePrev = () => {
    setIsFlipped(false);
    setCurrentIndex((prev) => (prev - 1 + cardList.length) % cardList.length);
  };

  const toggleBookmark = () => {
    setCardList((prev) =>
      prev.map((c, idx) =>
        idx === currentIndex ? { ...c, isBookmarked: !c.isBookmarked } : c
      )
    );
  };

  const toggleFavorite = () => {
    setCardList((prev) =>
      prev.map((c, idx) =>
        idx === currentIndex ? { ...c, isFavorite: !c.isFavorite } : c
      )
    );
  };

  const handleShuffle = () => {
    setIsFlipped(false);
    const shuffled = [...cardList].sort(() => Math.random() - 0.5);
    setCardList(shuffled);
    setCurrentIndex(0);
  };

  const formatTimer = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  return (
    <div className="space-y-6 max-w-2xl mx-auto relative">
      
      {/* Floating XP Animation */}
      <AnimatePresence>
        {showXP && (
          <div className="absolute top-0 right-4 z-50">
            <XPAnimation amount={20} label="XP Earned" onAnimationComplete={() => setShowXP(false)} />
          </div>
        )}
      </AnimatePresence>

      {/* Top Controls & Timer */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 bg-[var(--bg-surface)] border border-[var(--border-color)] rounded-2xl shadow-craft">
        
        <div className="flex items-center space-x-3">
          <Badge variant="accent">{currentCard.subjectName}</Badge>
          <span className="text-xs font-mono text-[var(--text-secondary)]">{currentCard.topicName}</span>
        </div>

        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-1.5 text-xs font-mono text-[var(--text-secondary)]">
            <Clock className="w-3.5 h-3.5 text-[var(--accent)]" />
            <span className="font-bold text-[var(--text-primary)] font-numbers">{formatTimer(timerSeconds)}</span>
          </div>

          <Button onClick={handleShuffle} variant="ghost" size="sm" icon={<Shuffle className="w-3.5 h-3.5" />}>
            Shuffle
          </Button>
        </div>

      </div>

      {/* Progress Bar */}
      <div className="space-y-1.5">
        <div className="flex justify-between items-center text-xs font-mono text-[var(--text-secondary)]">
          <span>Card {currentIndex + 1} of {cardList.length}</span>
          <span>{Math.round(((currentIndex + 1) / cardList.length) * 100)}% Reviewed</span>
        </div>
        <div className="w-full h-2 bg-[var(--bg-surface)] rounded-full overflow-hidden border border-[var(--border-color)]">
          <motion.div 
            className="h-full bg-[var(--accent)] rounded-full"
            initial={{ width: "0%" }}
            animate={{ width: `${((currentIndex + 1) / cardList.length) * 100}%` }}
            transition={{ duration: 0.4 }}
          />
        </div>
      </div>

      {/* 3D Flip Card Container */}
      <div className="perspective-1000 min-h-[320px] cursor-pointer select-none" onClick={handleFlipCard}>
        <motion.div
          animate={shouldReduceMotion ? {} : { rotateY: isFlipped ? 180 : 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full min-h-[320px] transform-style-3d"
        >
          
          {/* FRONT SIDE */}
          <div className={`absolute inset-0 w-full h-full p-8 bg-[var(--bg-surface)] border-2 ${
            isFlipped ? "pointer-events-none opacity-0" : "opacity-100 border-[var(--border-color)] hover:border-[var(--accent)]/50"
          } rounded-3xl shadow-craft-lg flex flex-col justify-between transition-opacity duration-200`}>
            
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-[var(--text-secondary)] flex items-center space-x-1.5">
                <HelpCircle className="w-4 h-4 text-[var(--accent)]" />
                <span>Question</span>
              </span>

              <div className="flex items-center space-x-2" onClick={(e) => e.stopPropagation()}>
                <motion.button
                  whileTap={shouldReduceMotion ? {} : { scale: 0.9 }}
                  onClick={toggleBookmark}
                  className={`p-2 rounded-xl border border-[var(--border-color)] transition-colors ${
                    currentCard.isBookmarked ? "bg-[var(--accent)]/15 text-[var(--accent)] border-[var(--accent)]/30" : "bg-[var(--bg-app)] text-[var(--text-secondary)]"
                  }`}
                  title="Bookmark Card (Key: B)"
                >
                  <Bookmark className="w-4 h-4" />
                </motion.button>

                <motion.button
                  whileTap={shouldReduceMotion ? {} : { scale: 0.9 }}
                  onClick={toggleFavorite}
                  className={`p-2 rounded-xl border border-[var(--border-color)] transition-colors ${
                    currentCard.isFavorite ? "bg-amber-400/15 text-amber-400 border-amber-400/30" : "bg-[var(--bg-app)] text-[var(--text-secondary)]"
                  }`}
                  title="Favorite Card"
                >
                  <Star className={`w-4 h-4 ${currentCard.isFavorite ? "fill-amber-400" : ""}`} />
                </motion.button>
              </div>
            </div>

            <div className="py-6 space-y-3 text-center">
              <h2 className="text-xl sm:text-2xl font-bold font-heading text-[var(--text-primary)] leading-snug">
                {currentCard.question}
              </h2>
            </div>

            <div className="flex items-center justify-center space-x-2 text-xs font-mono text-[var(--text-secondary)]">
              <RotateCw className="w-3.5 h-3.5 text-[var(--accent)]" />
              <span>Click or Press Space to Reveal Answer</span>
            </div>

          </div>

          {/* BACK SIDE */}
          <div className={`absolute inset-0 w-full h-full p-8 bg-[var(--bg-surface)] border-2 border-[var(--accent)]/50 ${
            !isFlipped ? "pointer-events-none opacity-0" : "opacity-100"
          } rounded-3xl shadow-craft-lg flex flex-col justify-between rotate-y-180 transition-opacity duration-200`}>
            
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-[var(--success)] flex items-center space-x-1.5">
                <CheckCircle2 className="w-4 h-4" />
                <span>Verified Core Answer</span>
              </span>

              <Badge variant="accent">{currentCard.difficulty}</Badge>
            </div>

            <div className="py-4 space-y-4">
              <p className="text-sm sm:text-base text-[var(--text-primary)] leading-relaxed font-body">
                {currentCard.answer}
              </p>

              <div className="p-3 bg-[var(--bg-app)] rounded-xl border border-[var(--border-color)] text-xs text-[var(--text-secondary)] space-y-1">
                <div className="font-mono font-bold text-[var(--accent)] uppercase tracking-wider text-[10px]">
                  💡 Key Architecture Takeaway
                </div>
                <div className="font-body text-[var(--text-primary)]">{currentCard.keyTakeaway}</div>
              </div>
            </div>

            <div className="flex items-center justify-center space-x-2 text-xs font-mono text-[var(--text-secondary)]">
              <span>Click to Flip Back</span>
            </div>

          </div>

        </motion.div>
      </div>

      {/* Navigation Controls */}
      <div className="flex items-center justify-between p-4 bg-[var(--bg-surface)] border border-[var(--border-color)] rounded-2xl shadow-craft">
        <Button
          onClick={handlePrev}
          variant="outline"
          size="md"
          icon={<ChevronLeft className="w-4 h-4" />}
        >
          Previous
        </Button>

        <div className="hidden sm:flex items-center space-x-2 text-[11px] font-mono text-[var(--text-secondary)] bg-[var(--bg-app)] px-3 py-1.5 rounded-xl border border-[var(--border-color)]">
          <Keyboard className="w-3.5 h-3.5 text-[var(--accent)]" />
          <span>Space: Flip • ←/→: Nav • B: Bookmark</span>
        </div>

        <Button
          onClick={handleNext}
          variant="accent"
          size="md"
          icon={<ChevronRight className="w-4 h-4" />}
        >
          Next Card
        </Button>
      </div>

    </div>
  );
};
