import React from "react";
import { TopicDetailItem } from "../../../types/studyTypes";
import { Card, Button, Badge, SectionHeader, PageTransition } from "../../DesignSystem";
import { 
  BookOpen, 
  Clock, 
  Zap, 
  Award, 
  CheckCircle2, 
  Circle, 
  Play, 
  FileText, 
  Video, 
  HelpCircle,
  ArrowRight
} from "lucide-react";

interface TopicDetailSubViewProps {
  topic: TopicDetailItem;
  onStartPractice: () => void;
  onStartQuiz: () => void;
  onBackToLibrary: () => void;
}

export const TopicDetailSubView: React.FC<TopicDetailSubViewProps> = ({
  topic,
  onStartPractice,
  onStartQuiz,
  onBackToLibrary,
}) => {
  return (
    <PageTransition className="space-y-8 max-w-4xl mx-auto">
      
      {/* Top Navigation & Back */}
      <div className="flex items-center justify-between">
        <button
          onClick={onBackToLibrary}
          className="text-xs font-mono text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors flex items-center space-x-1"
        >
          <span>← Back to Subject Library</span>
        </button>

        <Badge variant="accent">{topic.subjectName}</Badge>
      </div>

      {/* Hero Header Section */}
      <Card className="bg-gradient-to-r from-[var(--bg-surface)] via-[var(--bg-app)] to-[var(--bg-surface)] border border-[var(--border-color)] space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
          <div className="space-y-2 max-w-2xl">
            <h1 className="text-2xl font-bold font-heading text-[var(--text-primary)]">
              {topic.title}
            </h1>
            <p className="text-xs text-[var(--text-secondary)] leading-relaxed font-body">
              {topic.overview}
            </p>
          </div>

          <div className="flex items-center space-x-2 shrink-0">
            <Button onClick={onStartPractice} variant="outline" size="sm" icon={<Zap className="w-3 h-3 text-[var(--secondary-accent)]" />}>
              Practice
            </Button>
            <Button onClick={onStartQuiz} variant="accent" size="sm" icon={<Award className="w-3 h-3" />}>
              Take Quiz
            </Button>
          </div>
        </div>

        {/* Topic Metrics Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-[var(--border-color)] text-xs font-mono">
          <div>
            <div className="text-[10px] text-[var(--text-secondary)] uppercase">Progress</div>
            <div className="font-bold text-[var(--text-primary)] font-numbers">{topic.progress}% Mastered</div>
          </div>
          <div>
            <div className="text-[10px] text-[var(--text-secondary)] uppercase">Est. Time</div>
            <div className="font-bold text-[var(--text-primary)]">{topic.estimatedMinutes} Mins</div>
          </div>
          <div>
            <div className="text-[10px] text-[var(--text-secondary)] uppercase">Difficulty</div>
            <div className="font-bold text-[var(--accent)]">{topic.difficulty}</div>
          </div>
          <div>
            <div className="text-[10px] text-[var(--text-secondary)] uppercase">Resources</div>
            <div className="font-bold text-[var(--text-primary)]">{topic.resourcesCount} Materials</div>
          </div>
        </div>
      </Card>

      {/* Key Concepts & Prerequisites Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Key Concepts */}
        <Card className="space-y-4">
          <SectionHeader
            title="Core Concepts"
            subtitle="Essential architectural principles to master."
            icon={<BookOpen className="w-4 h-4 text-[var(--accent)]" />}
          />

          <ul className="space-y-2 text-xs text-[var(--text-primary)] font-body">
            {topic.keyConcepts.map((concept, idx) => (
              <li key={idx} className="p-3 bg-[var(--bg-app)] rounded-xl border border-[var(--border-color)] flex items-start space-x-2">
                <CheckCircle2 className="w-4 h-4 text-[var(--accent)] shrink-0 mt-0.5" />
                <span>{concept}</span>
              </li>
            ))}
          </ul>
        </Card>

        {/* Prerequisites & Objectives */}
        <Card className="space-y-4">
          <SectionHeader
            title="Learning Objectives"
            subtitle="Target mastery outcomes upon completion."
            icon={<HelpCircle className="w-4 h-4 text-[var(--secondary-accent)]" />}
          />

          <ul className="space-y-2 text-xs text-[var(--text-primary)] font-body">
            {topic.learningObjectives.map((obj, idx) => (
              <li key={idx} className="p-3 bg-[var(--bg-app)] rounded-xl border border-[var(--border-color)] flex items-start space-x-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)] shrink-0 mt-1.5" />
                <span>{obj}</span>
              </li>
            ))}
          </ul>
        </Card>

      </div>

      {/* Lessons List */}
      <Card className="space-y-4">
        <SectionHeader
          title="Interactive Lesson Modules"
          subtitle="Step-by-step videos, readings, and code drills."
          icon={<Video className="w-4 h-4 text-[var(--success)]" />}
        />

        <div className="space-y-3">
          {topic.lessons.map((les) => (
            <div
              key={les.id}
              className="p-4 bg-[var(--bg-app)] rounded-2xl border border-[var(--border-color)] flex items-center justify-between gap-4"
            >
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-color)] flex items-center justify-center text-[var(--accent)]">
                  {les.type === "video" ? <Video className="w-4 h-4" /> : <FileText className="w-4 h-4" />}
                </div>
                <div>
                  <h4 className="text-sm font-bold font-heading text-[var(--text-primary)]">
                    {les.title}
                  </h4>
                  <div className="text-[11px] font-mono text-[var(--text-secondary)]">
                    {les.durationMinutes} mins • {les.type.toUpperCase()}
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                {les.isCompleted ? (
                  <Badge variant="success" icon={<CheckCircle2 className="w-3 h-3" />}>Completed</Badge>
                ) : (
                  <Button variant="accent" size="sm" icon={<Play className="w-3 h-3 fill-current" />}>
                    Start
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>
      </Card>

    </PageTransition>
  );
};
