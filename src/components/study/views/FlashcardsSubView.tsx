import React from "react";
import { StudyFlashcardItem } from "../../../types/studyTypes";
import { FlashcardCard } from "../components/FlashcardCard";
import { PageTransition, Badge } from "../../DesignSystem";
import { RotateCcw, Sparkles } from "lucide-react";

interface FlashcardsSubViewProps {
  cards: StudyFlashcardItem[];
  onCompleteSession: () => void;
}

export const FlashcardsSubView: React.FC<FlashcardsSubViewProps> = ({
  cards,
  onCompleteSession,
}) => {
  return (
    <PageTransition className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[var(--border-color)]">
        <div>
          <h1 className="text-xl font-bold font-heading text-[var(--text-primary)] flex items-center space-x-2">
            <RotateCcw className="w-5 h-5 text-[var(--accent)]" />
            <span>Interactive Active-Recall Flashcards</span>
          </h1>
          <p className="text-xs text-[var(--text-secondary)] mt-0.5">
            Spaced repetition memory drills for technical definitions and system mechanics.
          </p>
        </div>

        <Badge variant="accent" icon={<Sparkles className="w-3.5 h-3.5" />}>
          {cards.length} Cards in Deck
        </Badge>
      </div>

      {/* Main Flashcard Component */}
      <FlashcardCard cards={cards} onCompleteSession={onCompleteSession} />

    </PageTransition>
  );
};
