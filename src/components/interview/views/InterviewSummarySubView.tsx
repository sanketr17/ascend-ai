import React, { useState } from "react";
import { MockSessionRecord } from "../../../data/interviewData";
import { Card, Button, Badge, SectionHeader } from "../../DesignSystem";
import { ScoreCard } from "../ScoreCard";
import { InterviewTimeline } from "../InterviewTimeline";
import { 
  Award, 
  Download, 
  RotateCcw, 
  CheckCircle2, 
  AlertCircle, 
  Clock, 
  BookOpen, 
  TrendingUp, 
  Check,
  Sparkles
} from "lucide-react";
import { motion } from "motion/react";
import { StaggerContainer, StaggerItem } from "../../motion/StaggerContainer";
import { CountUpNumber } from "../../motion/CountUpNumber";

interface InterviewSummarySubViewProps {
  session: MockSessionRecord;
  onRetryInterview: () => void;
  onDone: () => void;
}

export const InterviewSummarySubView: React.FC<InterviewSummarySubViewProps> = ({
  session,
  onRetryInterview,
  onDone,
}) => {
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  const handleDownload = () => {
    setDownloadSuccess(true);
    setTimeout(() => setDownloadSuccess(false), 3000);
  };

  // SVG Radar Chart Calculation for Category Scores
  const categories = Object.entries(session.categoryScores);
  const totalCategories = categories.length;
  const size = 200;
  const center = size / 2;
  const radius = 70;

  const points = categories.map(([key, val], idx) => {
    const numVal = Number(val);
    const angle = ((Math.PI * 2) / totalCategories) * idx - Math.PI / 2;
    const r = (numVal / 100) * radius;
    const x = center + r * Math.cos(angle);
    const y = center + r * Math.sin(angle);
    return `${x},${y}`;
  }).join(" ");

  const gridPoints = (level: number) => {
    return categories.map((_, idx) => {
      const angle = ((Math.PI * 2) / totalCategories) * idx - Math.PI / 2;
      const r = (level / 100) * radius;
      const x = center + r * Math.cos(angle);
      const y = center + r * Math.sin(angle);
      return `${x},${y}`;
    }).join(" ");
  };

  return (
    <StaggerContainer className="space-y-8 max-w-5xl mx-auto">
      
      {/* Header Banner with Subtle Check Animation */}
      <StaggerItem>
        <Card className="bg-gradient-to-r from-[var(--bg-surface)] via-[var(--bg-app)] to-[var(--bg-surface)] border border-[var(--border-color)] space-y-6 relative overflow-hidden">
          
          {/* Subtle success pulse background */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-[var(--success)]/5 rounded-full blur-3xl pointer-events-none" />

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 260, damping: 20 }}
                  className="w-6 h-6 rounded-full bg-[var(--success)]/20 text-[var(--success)] border border-[var(--success)]/30 flex items-center justify-center"
                >
                  <Check className="w-3.5 h-3.5" />
                </motion.div>
                <span className="text-xs font-mono font-bold text-[var(--text-secondary)] uppercase tracking-wider">
                  Interview Battery Complete
                </span>
                <Badge variant="success">{session.readinessVerdict}</Badge>
              </div>
              <h1 className="text-2xl font-extrabold font-heading text-[var(--text-primary)]">
                {session.role} Loop Report
              </h1>
              <p className="text-xs text-[var(--text-secondary)] font-mono">
                Evaluated on {session.date} • {session.durationMinutes} Minutes • Tier 1 Calibrated
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 shrink-0">
              <Button
                onClick={handleDownload}
                variant="outline"
                size="md"
                icon={downloadSuccess ? <Check className="w-4 h-4 text-[var(--success)]" /> : <Download className="w-4 h-4" />}
              >
                {downloadSuccess ? "Report Downloaded!" : "Download Report PDF"}
              </Button>

              <Button
                onClick={onRetryInterview}
                variant="primary"
                size="md"
                icon={<RotateCcw className="w-4 h-4" />}
              >
                Retry Session
              </Button>

              <Button
                onClick={onDone}
                variant="accent"
                size="md"
              >
                Done / Return Home
              </Button>
            </div>
          </div>

          {/* Top 4 Stat Boxes with animated number count-ups */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 border-t border-[var(--border-color)]">
            <ScoreCard
              label="Overall Score"
              score={`${session.overallScore}/100`}
              subtext={session.readinessVerdict}
              icon={<Award className="w-4 h-4 text-[var(--accent)]" />}
            />

            <ScoreCard
              label="Answered Questions"
              score={`${session.answeredQuestions}/${session.totalQuestions}`}
              subtext={`${session.skippedQuestions} skipped`}
              icon={<CheckCircle2 className="w-4 h-4 text-[var(--success)]" />}
            />

            <ScoreCard
              label="Avg Response Time"
              score={`${session.avgResponseTimeSeconds}s`}
              subtext="Per question average"
              icon={<Clock className="w-4 h-4 text-[var(--accent)]" />}
            />

            <ScoreCard
              label="Interview Readiness"
              score="Top 8%"
              subtext="Target company benchmark"
              icon={<TrendingUp className="w-4 h-4 text-[var(--secondary-accent)]" />}
            />
          </div>
        </Card>
      </StaggerItem>

      {/* Radar Chart & Category Scores Matrix */}
      <StaggerItem>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Radar Chart Card */}
          <Card className="flex flex-col items-center justify-center space-y-4 text-center">
            <SectionHeader
              title="Dimensional Competency Radar"
              subtitle="Normalized against senior staff engineer benchmark metrics."
            />

            <div className="relative w-52 h-52 py-2">
              <svg width={size} height={size} className="overflow-visible">
                {/* Grid concentric polygons */}
                <polygon points={gridPoints(100)} fill="none" stroke="var(--border-color)" strokeWidth="1" opacity="0.6" />
                <polygon points={gridPoints(75)} fill="none" stroke="var(--border-color)" strokeWidth="1" opacity="0.4" />
                <polygon points={gridPoints(50)} fill="none" stroke="var(--border-color)" strokeWidth="1" opacity="0.3" />

                {/* Data Polygon */}
                <polygon points={points} fill="var(--accent)" fillOpacity="0.25" stroke="var(--accent)" strokeWidth="2" />
              </svg>
            </div>

            <div className="text-[11px] font-mono text-[var(--text-secondary)]">
              Balanced high performance across System Architecture and Verbal Communication.
            </div>
          </Card>

          {/* Category Scores Breakdown Table */}
          <Card className="space-y-4">
            <SectionHeader
              title="Category Score Breakdown"
              subtitle="Individual technical and soft-skill performance dimensions."
            />

            <div className="space-y-3">
              {categories.map(([key, rawScore]) => {
                const score = Number(rawScore);
                const label = key.replace(/([A-Z])/g, " $1");
                return (
                  <div key={key} className="p-3 bg-[var(--bg-app)] border border-[var(--border-color)] rounded-xl space-y-1.5">
                    <div className="flex items-center justify-between text-xs font-mono font-bold">
                      <span className="capitalize text-[var(--text-primary)]">{label}</span>
                      <span className="text-[var(--text-primary)] font-numbers">
                        <CountUpNumber value={score} suffix="%" />
                      </span>
                    </div>
                    <div className="w-full h-2 bg-[var(--bg-surface)] rounded-full overflow-hidden border border-[var(--border-color)]/40">
                      <motion.div 
                        className={`h-full rounded-full ${score >= 85 ? "bg-[var(--success)]" : "bg-[var(--accent)]"}`}
                        initial={{ width: "0%" }}
                        animate={{ width: `${score}%` }}
                        transition={{ duration: 1, ease: "easeOut" }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </Card>

        </div>
      </StaggerItem>

      {/* Question Sequence Timeline */}
      <StaggerItem>
        <Card>
          <InterviewTimeline questions={session.questionsList} />
        </Card>
      </StaggerItem>

      {/* Strengths, Weaknesses & Recommended Learning Path */}
      <StaggerItem>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Strengths & Weaknesses */}
          <Card className="space-y-4">
            <SectionHeader
              title="Executive Committee Feedback"
              subtitle="Observed strengths and architectural gaps."
            />

            <div className="space-y-3">
              <div>
                <h5 className="text-xs font-mono font-bold text-[var(--success)] uppercase tracking-wider mb-2 flex items-center space-x-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Primary Strengths</span>
                </h5>
                <ul className="space-y-1.5 text-xs text-[var(--text-secondary)] font-body">
                  {session.strengths.map((s, idx) => (
                    <li key={idx} className="p-2 bg-[var(--bg-app)] border border-[var(--border-color)] rounded-lg">
                      • {s}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h5 className="text-xs font-mono font-bold text-[var(--error)] uppercase tracking-wider mb-2 flex items-center space-x-1">
                  <AlertCircle className="w-3.5 h-3.5" />
                  <span>Areas to Refine</span>
                </h5>
                <ul className="space-y-1.5 text-xs text-[var(--text-secondary)] font-body">
                  {session.weaknesses.map((w, idx) => (
                    <li key={idx} className="p-2 bg-[var(--bg-app)] border border-[var(--border-color)] rounded-lg">
                      • {w}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Card>

          {/* Recommended Learning Path */}
          <Card className="space-y-4">
            <SectionHeader
              title="Recommended Action Path"
              subtitle="Curated drills to reach 95%+ readiness score."
              icon={<BookOpen className="w-4 h-4" />}
            />

            <div className="space-y-2.5">
              {session.recommendedLearningPath.map((item, idx) => (
                <div key={idx} className="p-3.5 bg-[var(--bg-app)] border border-[var(--border-color)] rounded-xl flex items-center space-x-3 text-xs text-[var(--text-primary)]">
                  <div className="w-6 h-6 rounded-full bg-[var(--accent)]/15 text-[var(--accent)] flex items-center justify-center font-bold text-xs font-mono shrink-0">
                    {idx + 1}
                  </div>
                  <div className="leading-relaxed font-body">
                    {item}
                  </div>
                </div>
              ))}
            </div>
          </Card>

        </div>
      </StaggerItem>

    </StaggerContainer>
  );
};
