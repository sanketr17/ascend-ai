import React from "react";
import { DetailedEvaluation } from "../../../data/interviewData";
import { EvaluationCard } from "../EvaluationCard";
import { PageTransition } from "../../DesignSystem";

interface QuestionEvaluationSubViewProps {
  evaluation: DetailedEvaluation;
  onNextQuestion: () => void;
  onRetryQuestion: () => void;
  isLastQuestion?: boolean;
}

export const QuestionEvaluationSubView: React.FC<QuestionEvaluationSubViewProps> = ({
  evaluation,
  onNextQuestion,
  onRetryQuestion,
  isLastQuestion = false,
}) => {
  return (
    <PageTransition className="max-w-4xl mx-auto space-y-6">
      <EvaluationCard
        evaluation={evaluation}
        onNextQuestion={onNextQuestion}
        onRetryQuestion={onRetryQuestion}
        isLastQuestion={isLastQuestion}
      />
    </PageTransition>
  );
};
