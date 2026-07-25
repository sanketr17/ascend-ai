import React from "react";
import { QuizResultData } from "../../../types/studyTypes";
import { Card, Button, Badge, SectionHeader } from "../../DesignSystem";
import { 
  Award, 
  CheckCircle2, 
  XCircle, 
  Clock, 
  RotateCcw, 
  ArrowRight, 
  TrendingUp, 
  Sparkles,
  Target
} from "lucide-react";

interface ResultCardProps {
  result: QuizResultData;
  onRetry: () => void;
  onContinue: () => void;
}

export const ResultCard: React.FC<ResultCardProps> = ({
  result,
  onRetry,
  onContinue,
}) => {
  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      
      {/* Top Banner Card */}
      <Card className="bg-gradient-to-r from-[var(--bg-surface)] via-[var(--bg-app)] to-[var(--bg-surface)] border border-[var(--border-color)] space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center space-x-2">
              <Award className="w-5 h-5 text-[var(--accent)]" />
              <span className="text-xs font-mono font-bold text-[var(--text-secondary)] uppercase tracking-wider">
                Assessment Complete
              </span>
              <Badge variant="success">Mastery Verified</Badge>
            </div>
            <h1 className="text-2xl font-bold font-heading text-[var(--text-primary)]">
              {result.subjectName} • {result.topicName}
            </h1>
            <p className="text-xs text-[var(--text-secondary)] font-mono">
              Evaluated on {result.date}
            </p>
          </div>

          <div className="flex items-center space-x-3 shrink-0">
            <Button onClick={onRetry} variant="outline" size="md" icon={<RotateCcw className="w-4 h-4" />}>
              Retry Quiz
            </Button>
            <Button onClick={onContinue} variant="accent" size="md" icon={<ArrowRight className="w-4 h-4" />}>
              Continue Learning
            </Button>
          </div>
        </div>

        {/* 4 Stat Boxes */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-[var(--border-color)]">
          <div className="p-3.5 bg-[var(--bg-app)] rounded-xl border border-[var(--border-color)] space-y-1">
            <div className="text-[11px] font-mono text-[var(--text-secondary)] uppercase">Overall Score</div>
            <div className="text-2xl font-extrabold font-numbers text-[var(--text-primary)]">{result.overallScore}%</div>
            <div className="text-[10px] text-[var(--success)] font-mono">Top 10% Benchmark</div>
          </div>

          <div className="p-3.5 bg-[var(--bg-app)] rounded-xl border border-[var(--border-color)] space-y-1">
            <div className="text-[11px] font-mono text-[var(--text-secondary)] uppercase">Correct / Total</div>
            <div className="text-2xl font-extrabold font-numbers text-[var(--success)]">
              {result.correctAnswers}/{result.correctAnswers + result.wrongAnswers}
            </div>
            <div className="text-[10px] text-[var(--text-secondary)] font-mono">{result.accuracy}% Accuracy</div>
          </div>

          <div className="p-3.5 bg-[var(--bg-app)] rounded-xl border border-[var(--border-color)] space-y-1">
            <div className="text-[11px] font-mono text-[var(--text-secondary)] uppercase">Avg Time</div>
            <div className="text-2xl font-extrabold font-numbers text-[var(--text-primary)]">{result.avgTimeSeconds}s</div>
            <div className="text-[10px] text-[var(--text-secondary)] font-mono">Per Question</div>
          </div>

          <div className="p-3.5 bg-[var(--bg-app)] rounded-xl border border-[var(--border-color)] space-y-1">
            <div className="text-[11px] font-mono text-[var(--text-secondary)] uppercase">Mastery Verdict</div>
            <div className="text-lg font-bold font-heading text-[var(--accent)] pt-1">Advanced</div>
            <div className="text-[10px] text-[var(--text-secondary)] font-mono">Ready for Practice</div>
          </div>
        </div>
      </Card>

      {/* Breakdown Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Topic Performance */}
        <Card className="space-y-4">
          <SectionHeader
            title="Sub-topic Performance"
            subtitle="Granular breakdown of individual mastery scores."
            icon={<Target className="w-4 h-4" />}
          />

          <div className="space-y-3">
            {result.topicPerformance.map((tp, idx) => (
              <div key={idx} className="p-3 bg-[var(--bg-app)] rounded-xl border border-[var(--border-color)] space-y-1.5">
                <div className="flex items-center justify-between text-xs font-mono font-bold">
                  <span className="text-[var(--text-primary)]">{tp.topic}</span>
                  <span className="text-[var(--text-primary)] font-numbers">{tp.score}%</span>
                </div>
                <div className="w-full h-2 bg-[var(--bg-surface)] rounded-full overflow-hidden border border-[var(--border-color)]/40">
                  <div
                    className={`h-full rounded-full ${tp.score >= 90 ? "bg-[var(--success)]" : "bg-[var(--accent)]"}`}
                    style={{ width: `${tp.score}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Improvement Suggestions */}
        <Card className="space-y-4">
          <SectionHeader
            title="Improvement Recommendations"
            subtitle="Actionable steps to reach 100% precision."
            icon={<Sparkles className="w-4 h-4 text-[var(--accent)]" />}
          />

          <ul className="space-y-2.5 text-xs text-[var(--text-primary)] font-body">
            {result.improvementSuggestions.map((sug, idx) => (
              <li key={idx} className="p-3.5 bg-[var(--bg-app)] rounded-xl border border-[var(--border-color)] flex items-start space-x-2.5">
                <span className="w-5 h-5 rounded-full bg-[var(--accent)]/15 text-[var(--accent)] font-bold text-xs font-mono flex items-center justify-center shrink-0 mt-0.5">
                  {idx + 1}
                </span>
                <span className="leading-relaxed">{sug}</span>
              </li>
            ))}
          </ul>
        </Card>

      </div>

    </div>
  );
};
