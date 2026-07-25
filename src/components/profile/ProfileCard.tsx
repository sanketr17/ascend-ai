import React from "react";
import { ExtendedUserProfile } from "../../types/settingsTypes";
import { Card, Button, Badge } from "../DesignSystem";
import { AccountStatusBadge } from "./AccountStatusBadge";
import { 
  User, 
  MapPin, 
  Briefcase, 
  Mail, 
  Target, 
  Award, 
  Edit3, 
  CheckCircle2, 
  Sparkles,
  Zap,
  TrendingUp,
  GraduationCap
} from "lucide-react";

interface ProfileCardProps {
  profile: ExtendedUserProfile;
  onEditClick: () => void;
}

export const ProfileCard: React.FC<ProfileCardProps> = ({ profile, onEditClick }) => {
  const initials = profile.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  return (
    <Card className="space-y-6 relative overflow-hidden">
      {/* Background Subtle Gradient Accent */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-br from-[var(--accent)]/5 to-transparent rounded-full blur-3xl pointer-events-none" />

      {/* Top Banner Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-[var(--border-color)]">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
          
          {/* Avatar Container with Animated Ring */}
          <div className="relative group">
            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-gradient-to-tr from-[var(--btn-primary-bg)] to-[var(--bg-app)] border-2 border-[var(--accent)]/60 text-[var(--accent)] flex items-center justify-center font-bold text-2xl sm:text-3xl font-mono shadow-craft shrink-0">
              {initials}
            </div>
            <span className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-[var(--success)] border-2 border-[var(--bg-surface)] flex items-center justify-center text-white text-[10px]" title="Account Verified">
              ✓
            </span>
          </div>

          {/* Name & Target Details */}
          <div className="space-y-1.5">
            <div className="flex flex-wrap items-center gap-2.5">
              <h1 className="text-2xl sm:text-3xl font-extrabold font-heading text-[var(--text-primary)] tracking-tight">
                {profile.name}
              </h1>
              <span className="text-xs font-mono text-[var(--text-secondary)] bg-[var(--bg-app)] px-2 py-0.5 rounded border border-[var(--border-color)]">
                @{profile.username}
              </span>
              <AccountStatusBadge status={profile.verificationBadge} memberSince={profile.memberSince} />
            </div>

            <p className="text-sm font-medium text-[var(--accent)] flex items-center gap-2">
              <Briefcase className="w-4 h-4 shrink-0" />
              <span>{profile.role}</span>
              <span className="text-[var(--border-color)]">•</span>
              <span className="text-[var(--text-secondary)] font-normal text-xs">{profile.occupation}</span>
            </p>

            <div className="flex flex-wrap items-center gap-4 text-xs text-[var(--text-secondary)] pt-0.5">
              <span className="flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-[var(--text-secondary)]" />
                {profile.email}
              </span>
              <span className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-[var(--text-secondary)]" />
                {profile.location}
              </span>
              <span className="flex items-center gap-1.5">
                <GraduationCap className="w-3.5 h-3.5 text-[var(--text-secondary)]" />
                {profile.experienceLevel}
              </span>
            </div>
          </div>
        </div>

        {/* Edit Button */}
        <div className="shrink-0 pt-2 md:pt-0">
          <Button
            variant="primary"
            size="md"
            icon={<Edit3 className="w-4 h-4 text-[var(--accent)]" />}
            onClick={onEditClick}
            className="w-full sm:w-auto shadow-sm"
          >
            Edit Profile
          </Button>
        </div>
      </div>

      {/* Completion Progress Bar Section */}
      <div className="p-4 bg-[var(--bg-app)] rounded-xl border border-[var(--border-color)] space-y-2">
        <div className="flex items-center justify-between text-xs font-mono">
          <span className="flex items-center gap-2 text-[var(--text-primary)] font-semibold">
            <Sparkles className="w-4 h-4 text-[var(--accent)]" />
            Profile Completion Strength
          </span>
          <span className="text-[var(--accent)] font-bold">{profile.completionPercentage}% Complete</span>
        </div>

        <div className="w-full h-2.5 bg-[var(--bg-surface)] rounded-full overflow-hidden border border-[var(--border-color)]">
          <div
            className="h-full bg-gradient-to-r from-[var(--accent)] to-[var(--secondary-accent)] rounded-full transition-all duration-500 ease-out"
            style={{ width: `${profile.completionPercentage}%` }}
          />
        </div>

        <div className="flex flex-wrap items-center gap-3 text-[11px] font-mono text-[var(--text-secondary)] pt-1">
          <span className="flex items-center gap-1 text-[var(--success)]">
            <CheckCircle2 className="w-3 h-3" /> Bio & Experience
          </span>
          <span className="flex items-center gap-1 text-[var(--success)]">
            <CheckCircle2 className="w-3 h-3" /> Target Benchmark
          </span>
          <span className="flex items-center gap-1 text-[var(--success)]">
            <CheckCircle2 className="w-3 h-3" /> Technical Skills
          </span>
          <span className="flex items-center gap-1 text-[var(--secondary-accent)]">
            <Zap className="w-3 h-3" /> 2FA Configured
          </span>
        </div>
      </div>

      {/* Biography Section */}
      <div className="space-y-2">
        <h3 className="text-xs font-mono uppercase tracking-wider text-[var(--text-secondary)]">
          Candidate Biography
        </h3>
        <p className="text-xs sm:text-sm text-[var(--text-primary)] leading-relaxed bg-[var(--bg-surface)] p-3.5 rounded-xl border border-[var(--border-color)]/60 font-body">
          {profile.bio}
        </p>
      </div>

      {/* Current Career Goal & Readiness Card */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        
        {/* Goal Card */}
        <div className="p-4 bg-[var(--bg-app)] rounded-xl border border-[var(--border-color)] space-y-2">
          <div className="flex items-center space-x-2 text-xs font-mono uppercase text-[var(--accent)]">
            <Target className="w-4 h-4" />
            <span>Active Goal Target</span>
          </div>
          <div className="space-y-1">
            <div className="text-xs font-bold text-[var(--text-primary)] font-heading">
              {profile.targetRole}
            </div>
            <div className="text-xs font-mono text-[var(--secondary-accent)]">
              {profile.companyTier}
            </div>
            <div className="text-[11px] font-mono text-[var(--text-secondary)] pt-1">
              Target Interview Date: <span className="text-[var(--text-primary)] font-bold">{profile.targetDate}</span>
            </div>
          </div>
        </div>

        {/* Readiness Index Card */}
        <div className="p-4 bg-[var(--bg-app)] rounded-xl border border-[var(--border-color)] space-y-2">
          <div className="flex items-center justify-between text-xs font-mono uppercase text-[var(--success)]">
            <span className="flex items-center space-x-2">
              <TrendingUp className="w-4 h-4" />
              <span>Readiness Score</span>
            </span>
            <Badge variant="success">{profile.readinessScore}/100</Badge>
          </div>
          <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
            Evaluation algorithm places you in the <strong className="text-[var(--text-primary)]">Top 8%</strong> of candidates targeting Tier 1 Big Tech roles.
          </p>
        </div>
      </div>

      {/* Technical Skills & Interests */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
        
        {/* Skills */}
        <div className="space-y-2.5">
          <h3 className="text-xs font-mono uppercase tracking-wider text-[var(--text-secondary)] flex items-center gap-1.5">
            <Zap className="w-3.5 h-3.5 text-[var(--accent)]" />
            Core Technical Focus Areas ({profile.skills.length})
          </h3>
          <div className="flex flex-wrap gap-1.5">
            {profile.skills.map((skill) => (
              <span
                key={skill}
                className="px-2.5 py-1 text-xs font-mono rounded-lg bg-[var(--bg-app)] border border-[var(--border-color)] text-[var(--text-primary)] hover:border-[var(--accent)] transition-colors"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        {/* Learning Interests */}
        <div className="space-y-2.5">
          <h3 className="text-xs font-mono uppercase tracking-wider text-[var(--text-secondary)] flex items-center gap-1.5">
            <Award className="w-3.5 h-3.5 text-[var(--secondary-accent)]" />
            Interests & Deep Dives ({profile.learningInterests.length})
          </h3>
          <div className="flex flex-wrap gap-1.5">
            {profile.learningInterests.map((interest) => (
              <span
                key={interest}
                className="px-2.5 py-1 text-xs font-mono rounded-lg bg-[var(--secondary-accent)]/10 border border-[var(--secondary-accent)]/30 text-[var(--secondary-accent)]"
              >
                {interest}
              </span>
            ))}
          </div>
        </div>
      </div>
    </Card>
  );
};
