import React from "react";
import { QuizQuestionItem } from "../../../types/studyTypes";
import { QuizCard } from "../components/QuizCard";
import { PageTransition, Badge } from "../../DesignSystem";
import { Award, Sparkles } from "lucide-react";

interface QuizScreenSubViewProps {
  questions: QuizQuestionItem[];
  subjectName: string;
  topicName: string;
  onFinishQuiz: (score: number, correct: number, total: number, answers: number[]) => void;
}

export const QuizScreenSubView: React.FC<QuizScreenSubViewProps> = ({
  questions,
  subjectName,
  topicName,
  onFinishQuiz,
}) => {
  return (
    <PageTransition className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[var(--border-color)]">
        <div>
          <h1 className="text-xl font-bold font-heading text-[var(--text-primary)] flex items-center space-x-2">
            <Award className="w-5 h-5 text-[var(--success)]" />
            <span>Technical Assessment & Quiz Battery</span>
          </h1>
          <p className="text-xs text-[var(--text-secondary)] mt-0.5">
            Evaluate your knowledge retention under realistic timed conditions.
          </p>
        </div>

        <Badge variant="success" icon={<Sparkles className="w-3.5 h-3.5" />}>
          {questions.length} Evaluated Questions
        </Badge>
      </div>

      <QuizCard
        questions={questions}
        subjectName={subjectName}
        topicName={topicName}
        onFinishQuiz={onFinishQuiz}
      />

    </PageTransition>
  );
};
