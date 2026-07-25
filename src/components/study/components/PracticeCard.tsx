import React, { useState, useEffect } from "react";
import { PracticeQuestionItem } from "../../../types/studyTypes";
import { Card, Button, Badge } from "../../DesignSystem";
import { 
  Clock, 
  HelpCircle, 
  Lightbulb, 
  Code2, 
  CheckCircle2, 
  ArrowRight, 
  SkipForward, 
  Eye, 
  Sparkles 
} from "lucide-react";

interface PracticeCardProps {
  questions: PracticeQuestionItem[];
  onCompletePractice: () => void;
}

export const PracticeCard: React.FC<PracticeCardProps> = ({
  questions,
  onCompletePractice,
}) => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [showHints, setShowHints] = useState(false);
  const [showSampleAnswer, setShowSampleAnswer] = useState(false);
  const [userAnswerText, setUserAnswerText] = useState("");
  const [timerSeconds, setTimerSeconds] = useState(0);

  const currentQ = questions[currentIdx] || questions[0];

  useEffect(() => {
    const interval = setInterval(() => {
      setTimerSeconds((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleNext = () => {
    setShowHints(false);
    setShowSampleAnswer(false);
    setUserAnswerText("");
    if (currentIdx < questions.length - 1) {
      setCurrentIdx((prev) => prev + 1);
    } else {
      onCompletePractice();
    }
  };

  const handleSkip = () => {
    handleNext();
  };

  const formatTimer = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 bg-[var(--bg-surface)] border border-[var(--border-color)] rounded-2xl shadow-craft">
        <div className="flex items-center space-x-3">
          <Badge variant="accent">{currentQ.subjectName}</Badge>
          <span className="text-xs font-mono text-[var(--text-secondary)]">{currentQ.topicName}</span>
        </div>

        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-1.5 text-xs font-mono text-[var(--text-secondary)]">
            <Clock className="w-3.5 h-3.5 text-[var(--accent)]" />
            <span className="font-bold text-[var(--text-primary)] font-numbers">{formatTimer(timerSeconds)}</span>
          </div>

          <Button
            onClick={() => setShowHints(!showHints)}
            variant="outline"
            size="sm"
            icon={<Lightbulb className={`w-3.5 h-3.5 ${showHints ? "text-amber-400" : ""}`} />}
          >
            {showHints ? "Hide Hints" : "View Hints"}
          </Button>
        </div>
      </div>

      {/* Main Question & Workspace Card */}
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

        {/* Code Snippet if present */}
        {currentQ.codeSnippet && (
          <div className="p-4 bg-[var(--bg-app)] rounded-xl border border-[var(--border-color)] font-mono text-xs text-[var(--accent)] overflow-x-auto">
            <pre>{currentQ.codeSnippet}</pre>
          </div>
        )}

        {/* Hints Drawer */}
        {showHints && (
          <div className="p-4 bg-amber-500/10 border border-amber-500/20 rounded-xl space-y-2 text-xs">
            <div className="font-mono font-bold text-amber-400 uppercase tracking-wider flex items-center space-x-1.5">
              <Lightbulb className="w-4 h-4" />
              <span>Architectural Guidance Hints</span>
            </div>
            <ul className="space-y-1 text-[var(--text-primary)] font-body">
              {currentQ.hints.map((h, i) => (
                <li key={i}>• {h}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Answer Input Workspace */}
        <div className="space-y-2">
          <label className="text-xs font-mono font-bold text-[var(--text-secondary)] uppercase tracking-wider">
            Your Response / Implementation
          </label>
          <textarea
            rows={6}
            value={userAnswerText}
            onChange={(e) => setUserAnswerText(e.target.value)}
            placeholder="Type your explanation, trade-off analysis, or code implementation..."
            className="w-full p-4 bg-[var(--bg-app)] border border-[var(--border-color)] rounded-xl font-mono text-xs text-[var(--text-primary)] placeholder-[var(--text-secondary)] focus:outline-none focus:border-[var(--accent)]"
          />
        </div>

        {/* Reveal Sample Answer */}
        {showSampleAnswer && (
          <div className="p-4 bg-[var(--success)]/10 border border-[var(--success)]/30 rounded-xl space-y-2 text-xs">
            <div className="font-mono font-bold text-[var(--success)] uppercase tracking-wider flex items-center space-x-1.5">
              <CheckCircle2 className="w-4 h-4" />
              <span>Verified Sample Answer</span>
            </div>
            <p className="text-[var(--text-primary)] leading-relaxed font-body">
              {currentQ.sampleAnswer}
            </p>
            <div className="pt-2 text-[11px] font-mono text-[var(--text-secondary)] border-t border-[var(--border-color)]">
              {currentQ.explanation}
            </div>
          </div>
        )}

      </Card>

      {/* Bottom Stage Actions */}
      <div className="flex items-center justify-between p-4 bg-[var(--bg-surface)] border border-[var(--border-color)] rounded-2xl shadow-craft">
        <Button onClick={handleSkip} variant="ghost" size="md" icon={<SkipForward className="w-4 h-4" />}>
          Skip Question
        </Button>

        <div className="flex items-center space-x-3">
          <Button
            onClick={() => setShowSampleAnswer(!showSampleAnswer)}
            variant="outline"
            size="md"
            icon={<Eye className="w-4 h-4" />}
          >
            {showSampleAnswer ? "Hide Sample" : "Reveal Sample Answer"}
          </Button>

          <Button
            onClick={handleNext}
            variant="accent"
            size="md"
            icon={<ArrowRight className="w-4 h-4" />}
          >
            {currentIdx === questions.length - 1 ? "Complete Drill" : "Next Question"}
          </Button>
        </div>
      </div>

    </div>
  );
};
