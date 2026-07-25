import React, { useState } from "react";
import { UserProfile } from "../../../types";
import { Card, Button, Badge } from "../../DesignSystem";
import { DifficultyBadge } from "../DifficultyBadge";
import { InterviewTransition } from "../InterviewTransition";
import { 
  Sliders, 
  Clock, 
  Gauge, 
  Briefcase, 
  Check, 
  Play, 
  Layers, 
  Tag, 
  Sparkles,
  ArrowLeft
} from "lucide-react";

export interface SetupConfig {
  type: "Technical" | "Behavioral" | "Mixed" | "HR" | "Coding";
  difficulty: "Easy" | "Medium" | "Hard" | "Adaptive";
  durationMinutes: number;
  jobRole: string;
  selectedSkills: string[];
  experienceLevel: "Junior" | "Mid-Level" | "Senior" | "Staff / Lead" | "Principal";
}

interface InterviewSetupSubViewProps {
  userProfile: UserProfile;
  initialPresetType?: string;
  onCancel: () => void;
  onStartSession: (config: SetupConfig) => void;
}

export const InterviewSetupSubView: React.FC<InterviewSetupSubViewProps> = ({
  userProfile,
  initialPresetType = "Technical",
  onCancel,
  onStartSession,
}) => {
  const [type, setType] = useState<SetupConfig["type"]>(
    initialPresetType === "Behavioral" ? "Behavioral" : "Technical"
  );
  const [difficulty, setDifficulty] = useState<SetupConfig["difficulty"]>("Adaptive");
  const [durationMinutes, setDurationMinutes] = useState<number>(30);
  const [jobRole, setJobRole] = useState<string>(userProfile.targetRole);
  const [experienceLevel, setExperienceLevel] = useState<SetupConfig["experienceLevel"]>("Senior");
  const [isTransitioning, setIsTransitioning] = useState(false);

  const availableSkillsList = [
    "System Design & Scale",
    "React 18 Concurrent Engine",
    "Distributed Consensus & Raft",
    "STAR Behavioral Leadership",
    "Memory Leak Diagnostics",
    "Redis Lua Atomic Scripts",
    "GraphQL vs gRPC Protocols",
    "CI/CD Pipeline Security",
  ];

  const [selectedSkills, setSelectedSkills] = useState<string[]>([
    "System Design & Scale",
    "STAR Behavioral Leadership",
    "React 18 Concurrent Engine",
  ]);

  const toggleSkill = (skill: string) => {
    setSelectedSkills((prev) =>
      prev.includes(skill) ? prev.filter((s) => s !== skill) : [...prev, skill]
    );
  };

  const currentConfig: SetupConfig = {
    type,
    difficulty,
    durationMinutes,
    jobRole,
    selectedSkills,
    experienceLevel,
  };

  const handleLaunchClick = () => {
    setIsTransitioning(true);
  };

  const handleTransitionComplete = () => {
    setIsTransitioning(false);
    onStartSession(currentConfig);
  };

  const totalQuestionsEstimate = durationMinutes <= 10 ? 2 : durationMinutes <= 20 ? 3 : durationMinutes <= 30 ? 4 : 5;

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      {/* Entry Overlay Transition */}
      {isTransitioning && (
        <InterviewTransition
          onComplete={handleTransitionComplete}
          jobRole={jobRole}
          type={type}
        />
      )}
      
      {/* Top Header */}
      <div className="flex items-center justify-between pb-4 border-b border-[var(--border-color)]">
        <div className="flex items-center space-x-3">
          <button
            onClick={onCancel}
            className="p-2 rounded-xl border border-[var(--border-color)] bg-[var(--bg-surface)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div>
            <h1 className="text-xl font-bold font-heading text-[var(--text-primary)] flex items-center space-x-2">
              <Sliders className="w-5 h-5 text-[var(--accent)]" />
              <span>Configure Interview Loop</span>
            </h1>
            <p className="text-xs text-[var(--text-secondary)] mt-0.5">
              Customize focus domains, difficulty curve, and interviewer parameters.
            </p>
          </div>
        </div>
        <Badge variant="accent">Step 1 of 2</Badge>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Config Form (2 Cols) */}
        <div className="md:col-span-2 space-y-6">
          
          {/* 1. Interview Type */}
          <div className="space-y-2.5">
            <label className="text-xs font-mono font-bold text-[var(--text-secondary)] uppercase tracking-wider flex items-center space-x-2">
              <Layers className="w-3.5 h-3.5 text-[var(--accent)]" />
              <span>1. Interview Type</span>
            </label>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
              {(["Technical", "Behavioral", "Mixed", "HR", "Coding"] as const).map((t) => {
                const isActive = type === t;
                return (
                  <button
                    key={t}
                    type="button"
                    onClick={() => setType(t)}
                    className={`p-3 rounded-xl border text-xs font-mono text-left transition-all cursor-pointer ${
                      isActive
                        ? "bg-[var(--btn-primary-bg)] text-[var(--btn-primary-text)] border-[var(--accent)] font-bold shadow-xs"
                        : "bg-[var(--bg-surface)] text-[var(--text-secondary)] border-[var(--border-color)] hover:border-[var(--text-primary)]/40"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span>{t}</span>
                      {isActive && <Check className="w-3.5 h-3.5 text-[var(--accent)]" />}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 2. Difficulty Level */}
          <div className="space-y-2.5">
            <label className="text-xs font-mono font-bold text-[var(--text-secondary)] uppercase tracking-wider flex items-center space-x-2">
              <Gauge className="w-3.5 h-3.5 text-[var(--accent)]" />
              <span>2. Difficulty Progression</span>
            </label>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              {(["Easy", "Medium", "Hard", "Adaptive"] as const).map((d) => {
                const isActive = difficulty === d;
                return (
                  <button
                    key={d}
                    type="button"
                    onClick={() => setDifficulty(d)}
                    className={`p-3 rounded-xl border text-xs font-mono text-center transition-all cursor-pointer ${
                      isActive
                        ? "bg-[var(--btn-primary-bg)] text-[var(--btn-primary-text)] border-[var(--accent)] font-bold shadow-xs"
                        : "bg-[var(--bg-surface)] text-[var(--text-secondary)] border-[var(--border-color)] hover:border-[var(--text-primary)]/40"
                    }`}
                  >
                    {d}
                  </button>
                );
              })}
            </div>
          </div>

          {/* 3. Duration */}
          <div className="space-y-2.5">
            <label className="text-xs font-mono font-bold text-[var(--text-secondary)] uppercase tracking-wider flex items-center space-x-2">
              <Clock className="w-3.5 h-3.5 text-[var(--accent)]" />
              <span>3. Duration Target</span>
            </label>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              {[10, 20, 30, 45].map((dur) => {
                const isActive = durationMinutes === dur;
                return (
                  <button
                    key={dur}
                    type="button"
                    onClick={() => setDurationMinutes(dur)}
                    className={`p-3 rounded-xl border text-xs font-mono text-center transition-all cursor-pointer ${
                      isActive
                        ? "bg-[var(--btn-primary-bg)] text-[var(--btn-primary-text)] border-[var(--accent)] font-bold shadow-xs"
                        : "bg-[var(--bg-surface)] text-[var(--text-secondary)] border-[var(--border-color)] hover:border-[var(--text-primary)]/40"
                    }`}
                  >
                    {dur} Minutes
                  </button>
                );
              })}
            </div>
          </div>

          {/* 4. Target Job Role & Experience */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-xs font-mono font-bold text-[var(--text-secondary)] uppercase tracking-wider flex items-center space-x-2">
                <Briefcase className="w-3.5 h-3.5 text-[var(--accent)]" />
                <span>Target Job Role</span>
              </label>
              <select
                value={jobRole}
                onChange={(e) => setJobRole(e.target.value)}
                className="w-full p-3 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-color)] text-xs font-heading font-bold text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent)]"
              >
                <option value="Senior/Staff Frontend Engineer">Senior/Staff Frontend Engineer</option>
                <option value="Software Engineer (Fullstack/Backend)">Software Engineer (Fullstack/Backend)</option>
                <option value="Systems Architecture & Infra Lead">Systems Architecture & Infra Lead</option>
                <option value="AI / Machine Learning Engineer">AI / Machine Learning Engineer</option>
                <option value="Lead Product Manager">Lead Product Manager</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-mono font-bold text-[var(--text-secondary)] uppercase tracking-wider flex items-center space-x-2">
                <Sparkles className="w-3.5 h-3.5 text-[var(--secondary-accent)]" />
                <span>Experience Tier</span>
              </label>
              <select
                value={experienceLevel}
                onChange={(e) => setExperienceLevel(e.target.value as any)}
                className="w-full p-3 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-color)] text-xs font-heading font-bold text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent)]"
              >
                <option value="Junior">Junior (0-2 YOE)</option>
                <option value="Mid-Level">Mid-Level (2-5 YOE)</option>
                <option value="Senior">Senior (5-8 YOE)</option>
                <option value="Staff / Lead">Staff / Lead (8+ YOE)</option>
                <option value="Principal">Principal / Distinguished</option>
              </select>
            </div>
          </div>

          {/* 5. Target Skills Tags */}
          <div className="space-y-2.5">
            <label className="text-xs font-mono font-bold text-[var(--text-secondary)] uppercase tracking-wider flex items-center space-x-2">
              <Tag className="w-3.5 h-3.5 text-[var(--accent)]" />
              <span>Target Focus Skills</span>
            </label>

            <div className="flex flex-wrap gap-2">
              {availableSkillsList.map((skill) => {
                const isSelected = selectedSkills.includes(skill);
                return (
                  <button
                    key={skill}
                    type="button"
                    onClick={() => toggleSkill(skill)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all border cursor-pointer ${
                      isSelected
                        ? "bg-[var(--accent)]/15 text-[var(--accent)] border-[var(--accent)]/40 font-bold"
                        : "bg-[var(--bg-surface)] text-[var(--text-secondary)] border-[var(--border-color)] hover:border-[var(--text-primary)]/40"
                    }`}
                  >
                    {skill} {isSelected && "✓"}
                  </button>
                );
              })}
            </div>
          </div>

        </div>

        {/* Live Preview Card (1 Col) */}
        <div className="space-y-4">
          <label className="text-xs font-mono font-bold text-[var(--text-secondary)] uppercase tracking-wider">
            Live Interview Card Preview
          </label>

          <Card className="p-6 space-y-6 border-2 border-[var(--accent)]/30 bg-gradient-to-b from-[var(--bg-surface)] to-[var(--bg-app)]">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Badge variant="accent">{type} Loop</Badge>
                <DifficultyBadge difficulty={difficulty} />
              </div>

              <h3 className="text-base font-bold font-heading text-[var(--text-primary)]">
                {jobRole}
              </h3>

              <div className="p-3 bg-[var(--bg-app)] rounded-xl border border-[var(--border-color)] text-xs text-[var(--text-secondary)] space-y-1">
                <div className="font-semibold text-[var(--text-primary)]">Target Company Tier</div>
                <div>{userProfile.companyTier}</div>
              </div>
            </div>

            <div className="space-y-2 text-xs font-mono text-[var(--text-secondary)] pt-2 border-t border-[var(--border-color)]">
              <div className="flex items-center justify-between">
                <span>Duration:</span>
                <span className="font-bold text-[var(--text-primary)]">{durationMinutes} Minutes</span>
              </div>

              <div className="flex items-center justify-between">
                <span>Questions:</span>
                <span className="font-bold text-[var(--text-primary)]">{totalQuestionsEstimate} Questions</span>
              </div>

              <div className="flex items-center justify-between">
                <span>Interviewer:</span>
                <span className="font-bold text-[var(--text-primary)]">Sarah Chen (Principal)</span>
              </div>

              <div className="flex items-center justify-between">
                <span>Evaluation Mode:</span>
                <span className="font-bold text-[var(--success)]">Voice + AI Committee</span>
              </div>
            </div>

            <Button
              onClick={handleLaunchClick}
              variant="accent"
              size="lg"
              className="w-full"
              icon={<Play className="w-4 h-4 fill-current" />}
            >
              Start Interview
            </Button>
          </Card>
        </div>

      </div>

    </div>
  );
};
