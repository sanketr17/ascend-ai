import React from "react";
import { QuizResultData } from "../../../types/studyTypes";
import { ResultCard } from "../components/ResultCard";
import { PageTransition } from "../../DesignSystem";

interface ResultsScreenSubViewProps {
  result: QuizResultData;
  onRetry: () => void;
  onContinue: () => void;
}

export const ResultsScreenSubView: React.FC<ResultsScreenSubViewProps> = ({
  result,
  onRetry,
  onContinue,
}) => {
  return (
    <PageTransition className="space-y-6">
      <ResultCard result={result} onRetry={onRetry} onContinue={onContinue} />
    </PageTransition>
  );
};
