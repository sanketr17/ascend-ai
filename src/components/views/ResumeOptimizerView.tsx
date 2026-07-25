import React, { useState } from "react";
import { UserProfile, ResumeAnalysisResult } from "../../types";
import { sampleResumeText, sampleJobDescription } from "../../data/initialData";
import { Card, Button, Badge } from "../DesignSystem";
import { StaggerContainer, StaggerItem, FadeInSection } from "../motion";
import { 
  FileText, 
  Sparkles, 
  CheckCircle2, 
  AlertCircle, 
  Target, 
  Zap
} from "lucide-react";

interface ResumeOptimizerViewProps {
  userProfile: UserProfile;
}

export const ResumeOptimizerView: React.FC<ResumeOptimizerViewProps> = ({ userProfile }) => {
  const [resumeText, setResumeText] = useState(sampleResumeText);
  const [jobDescription, setJobDescription] = useState(sampleJobDescription);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState<ResumeAnalysisResult | null>(null);

  const handleAnalyze = async () => {
    if (!resumeText.trim() || !jobDescription.trim()) return;
    setIsAnalyzing(true);

    try {
      const res = await fetch("/api/resume/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          resumeText,
          jobDescription,
          targetRole: userProfile.targetRole,
        }),
      });
      const data = await res.json();
      if (data.analysis) {
        setAnalysis(data.analysis);
      }
    } catch (err) {
      console.error("Failed to analyze resume:", err);
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <FadeInSection>
        <Card>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h2 className="text-base font-bold font-heading text-[var(--text-primary)] flex items-center space-x-2">
                <FileText className="w-5 h-5 text-[var(--accent)]" />
                <span>Resume & Target Job Intelligence Matcher</span>
              </h2>
              <p className="text-xs text-[var(--text-secondary)] mt-0.5">
                Evaluates resume alignment against target job descriptions, identifies skill gaps, and rewrites bullet points for maximum impact.
              </p>
            </div>

            <Button
              onClick={handleAnalyze}
              disabled={isAnalyzing || !resumeText.trim() || !jobDescription.trim()}
              variant="primary"
              size="md"
              icon={<Sparkles className="w-3.5 h-3.5 text-[var(--accent)]" />}
            >
              {isAnalyzing ? "Analyzing Match..." : "Run Match Intelligence"}
            </Button>
          </div>
        </Card>
      </FadeInSection>

      {/* Input Columns */}
      <StaggerContainer className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Resume Input */}
        <StaggerItem>
          <Card className="space-y-3 h-full">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-[var(--text-primary)] font-mono uppercase tracking-wider">
                Candidate Resume / Experience
              </label>
              <button
                onClick={() => setResumeText(sampleResumeText)}
                className="text-[11px] text-[var(--text-secondary)] hover:text-[var(--text-primary)] font-mono"
              >
                Load Sample Resume
              </button>
            </div>
            <textarea
              value={resumeText}
              onChange={(e) => setResumeText(e.target.value)}
              rows={12}
              className="w-full p-4 text-xs font-mono bg-[var(--bg-app)] border border-[var(--border-color)] rounded-xl text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent)] leading-relaxed resize-none"
              placeholder="Paste your plain text resume or work history here..."
            />
          </Card>
        </StaggerItem>

        {/* Job Description Input */}
        <StaggerItem>
          <Card className="space-y-3 h-full">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-[var(--text-primary)] font-mono uppercase tracking-wider">
                Target Job Description
              </label>
              <button
                onClick={() => setJobDescription(sampleJobDescription)}
                className="text-[11px] text-[var(--text-secondary)] hover:text-[var(--text-primary)] font-mono"
              >
                Load Target Stripe JD
              </button>
            </div>
            <textarea
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              rows={12}
              className="w-full p-4 text-xs font-mono bg-[var(--bg-app)] border border-[var(--border-color)] rounded-xl text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent)] leading-relaxed resize-none"
              placeholder="Paste target job description and requirements here..."
            />
          </Card>
        </StaggerItem>

      </StaggerContainer>

      {/* Analysis Results Display */}
      {analysis && (
        <FadeInSection>
          <Card className="space-y-6">
            
            <div className="flex flex-col md:flex-row md:items-center justify-between pb-4 border-b border-[var(--border-color)] gap-4">
              <div>
                <div className="flex items-center space-x-2">
                  <Target className="w-5 h-5 text-[var(--accent)]" />
                  <h3 className="text-base font-bold font-heading text-[var(--text-primary)]">
                    Target Role Match Score & Gap Report
                  </h3>
                </div>
                <p className="text-xs text-[var(--text-secondary)] mt-0.5">
                  Market Readiness Tier: <span className="font-bold text-[var(--text-primary)]">{analysis.marketReadinessTier}</span>
                </p>
              </div>

              <div className="text-right">
                <div className="text-4xl font-extrabold font-numbers text-[var(--text-primary)]">
                  {analysis.matchScore}%
                </div>
                <div className="text-[10px] text-[var(--text-secondary)] font-mono uppercase tracking-wider">Job Match Score</div>
              </div>
            </div>

            {/* Keywords & Missing Skills */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Matching Keywords */}
              <div className="space-y-2.5">
                <h4 className="text-xs font-bold font-mono text-[var(--success)] uppercase tracking-wider flex items-center space-x-1.5">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Strong Skill Signals Present</span>
                </h4>
                <div className="flex flex-wrap gap-2">
                  {analysis.matchingKeywords.map((kw, i) => (
                    <Badge key={i} variant="success">{kw}</Badge>
                  ))}
                </div>
              </div>

              {/* Missing Critical Skills */}
              <div className="space-y-2.5">
                <h4 className="text-xs font-bold font-mono text-[var(--error)] uppercase tracking-wider flex items-center space-x-1.5">
                  <AlertCircle className="w-4 h-4" />
                  <span>Missing Skill Signals</span>
                </h4>
                <div className="flex flex-wrap gap-2">
                  {analysis.missingCriticalSkills.map((sk, i) => (
                    <Badge key={i} variant="error">{sk}</Badge>
                  ))}
                </div>
              </div>

            </div>

            {/* High-Impact Bullet Rewrites */}
            <div className="space-y-3 pt-2">
              <h4 className="text-xs font-bold text-[var(--text-primary)] font-mono uppercase tracking-wider">
                High-Impact Resume Bullet Point Rewrites
              </h4>

              <div className="space-y-3">
                {analysis.bulletPointImprovements.map((bullet, idx) => (
                  <div key={idx} className="p-4 bg-[var(--bg-app)] border border-[var(--border-color)] rounded-xl space-y-2">
                    <div className="text-xs text-[var(--error)] font-mono">
                      <span className="font-bold">Original:</span> "{bullet.original}"
                    </div>
                    <div className="text-xs text-[var(--success)] font-mono font-bold">
                      <span className="font-bold">Quantified Upgrade:</span> "{bullet.improved}"
                    </div>
                    <div className="text-[11px] text-[var(--text-secondary)] font-body">
                      <span className="font-bold text-[var(--text-primary)]">Why it works:</span> {bullet.impactReasoning}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Strategy Brief */}
            <div className="p-5 bg-[var(--btn-primary-bg)] text-[var(--btn-primary-text)] rounded-xl space-y-1.5 border border-[var(--border-color)]">
              <div className="text-xs font-bold text-[var(--accent)] flex items-center space-x-2 font-mono">
                <Zap className="w-4 h-4" />
                <span>Tailored Preparation Strategy</span>
              </div>
              <p className="text-xs leading-relaxed text-[var(--text-secondary)] font-body">
                {analysis.tailoredInterviewPrepStrategy}
              </p>
            </div>

          </Card>
        </FadeInSection>
      )}

    </div>
  );
};
