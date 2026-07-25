import React, { useState } from "react";
import { ExtendedUserProfile, ExperienceLevel } from "../../types/settingsTypes";
import { Card, Button, Badge, SectionHeader } from "../DesignSystem";
import { PageTransition } from "../DesignSystem";
import { InfoCard } from "./InfoCard";
import { 
  User, 
  Mail, 
  MapPin, 
  Briefcase, 
  Save, 
  RotateCcw, 
  X, 
  Plus, 
  CheckCircle2, 
  AlertCircle,
  Sparkles,
  ArrowLeft,
  GraduationCap,
  Target
} from "lucide-react";

interface EditProfileViewProps {
  profile: ExtendedUserProfile;
  onSave: (updated: ExtendedUserProfile) => void;
  onCancel: () => void;
}

export const EditProfileView: React.FC<EditProfileViewProps> = ({
  profile,
  onSave,
  onCancel,
}) => {
  const [formData, setFormData] = useState<ExtendedUserProfile>({ ...profile });
  const [newSkill, setNewSkill] = useState("");
  const [newInterest, setNewInterest] = useState("");
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const MAX_BIO_LENGTH = 300;

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = "Full Name is required";
    if (!formData.username.trim()) newErrors.username = "Username is required";
    
    // Email regex check
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (formData.bio.length > MAX_BIO_LENGTH) {
      newErrors.bio = `Bio cannot exceed ${MAX_BIO_LENGTH} characters`;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    onSave(formData);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  const handleReset = () => {
    setFormData({ ...profile });
    setErrors({});
    setNewSkill("");
    setNewInterest("");
  };

  const handleAddSkill = () => {
    if (!newSkill.trim()) return;
    if (formData.skills.includes(newSkill.trim())) return;
    setFormData({ ...formData, skills: [...formData.skills, newSkill.trim()] });
    setNewSkill("");
  };

  const handleRemoveSkill = (skillToRemove: string) => {
    setFormData({
      ...formData,
      skills: formData.skills.filter((s) => s !== skillToRemove),
    });
  };

  const handleAddInterest = () => {
    if (!newInterest.trim()) return;
    if (formData.learningInterests.includes(newInterest.trim())) return;
    setFormData({
      ...formData,
      learningInterests: [...formData.learningInterests, newInterest.trim()],
    });
    setNewInterest("");
  };

  const handleRemoveInterest = (interestToRemove: string) => {
    setFormData({
      ...formData,
      learningInterests: formData.learningInterests.filter((i) => i !== interestToRemove),
    });
  };

  const experienceLevels: ExperienceLevel[] = [
    "Entry Level (0-2 YOE)",
    "Mid Level (3-5 YOE)",
    "Senior Engineer (5-8 YOE)",
    "Staff / Lead Architect (8+ YOE)",
    "Principal / Director (12+ YOE)",
  ];

  return (
    <PageTransition className="space-y-8">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[var(--border-color)]">
        <div className="flex items-center space-x-3">
          <Button
            variant="ghost"
            size="sm"
            icon={<ArrowLeft className="w-4 h-4" />}
            onClick={onCancel}
          >
            Back to Profile
          </Button>
          <div className="h-4 w-[1px] bg-[var(--border-color)] hidden sm:block" />
          <h1 className="text-xl font-bold font-heading text-[var(--text-primary)] tracking-tight">
            Edit Candidate Profile
          </h1>
        </div>

        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="sm"
            icon={<RotateCcw className="w-3.5 h-3.5" />}
            onClick={handleReset}
          >
            Reset
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={onCancel}
          >
            Cancel
          </Button>
          <Button
            variant="accent"
            size="sm"
            icon={<Save className="w-3.5 h-3.5" />}
            onClick={handleSave}
          >
            Save Changes
          </Button>
        </div>
      </div>

      {/* Success Alert Banner */}
      {saveSuccess && (
        <InfoCard type="success" title="Profile Saved Successfully">
          Your profile updates have been synchronized across ASCEND AI benchmark engines.
        </InfoCard>
      )}

      {/* Form Container */}
      <form onSubmit={handleSave} className="space-y-6">
        
        {/* Basic Identity Card */}
        <Card className="p-6 space-y-5">
          <div className="flex items-center space-x-2 pb-3 border-b border-[var(--border-color)]/60">
            <User className="w-4 h-4 text-[var(--accent)]" />
            <h3 className="text-sm font-bold font-heading text-[var(--text-primary)]">
              Personal Information & Identity
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            {/* Name */}
            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-[var(--text-secondary)] mb-1.5">
                Full Name *
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className={`w-full px-3.5 py-2.5 text-xs font-mono bg-[var(--bg-app)] border rounded-xl text-[var(--text-primary)] focus:outline-none ${
                  errors.name ? "border-[var(--error)] focus:border-[var(--error)]" : "border-[var(--border-color)] focus:border-[var(--accent)]"
                }`}
                placeholder="e.g. Alex Rivera"
              />
              {errors.name && <p className="text-[11px] text-[var(--error)] mt-1 font-mono">{errors.name}</p>}
            </div>

            {/* Username */}
            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-[var(--text-secondary)] mb-1.5">
                Username *
              </label>
              <div className="relative">
                <span className="absolute left-3.5 top-2.5 text-xs font-mono text-[var(--text-secondary)]">@</span>
                <input
                  type="text"
                  value={formData.username}
                  onChange={(e) => setFormData({ ...formData, username: e.target.value.toLowerCase().replace(/[^a-z0-9_]/g, "") })}
                  className={`w-full pl-8 pr-3.5 py-2.5 text-xs font-mono bg-[var(--bg-app)] border rounded-xl text-[var(--text-primary)] focus:outline-none ${
                    errors.username ? "border-[var(--error)] focus:border-[var(--error)]" : "border-[var(--border-color)] focus:border-[var(--accent)]"
                  }`}
                  placeholder="alex_rivera"
                />
              </div>
              {errors.username && <p className="text-[11px] text-[var(--error)] mt-1 font-mono">{errors.username}</p>}
            </div>

            {/* Email */}
            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-[var(--text-secondary)] mb-1.5">
                Email Address *
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className={`w-full px-3.5 py-2.5 text-xs font-mono bg-[var(--bg-app)] border rounded-xl text-[var(--text-primary)] focus:outline-none ${
                  errors.email ? "border-[var(--error)] focus:border-[var(--error)]" : "border-[var(--border-color)] focus:border-[var(--accent)]"
                }`}
                placeholder="alex.rivera@ascend.ai"
              />
              {errors.email && <p className="text-[11px] text-[var(--error)] mt-1 font-mono">{errors.email}</p>}
            </div>

            {/* Location */}
            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-[var(--text-secondary)] mb-1.5">
                Location
              </label>
              <input
                type="text"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                className="w-full px-3.5 py-2.5 text-xs font-mono bg-[var(--bg-app)] border border-[var(--border-color)] rounded-xl text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent)]"
                placeholder="San Francisco, CA"
              />
            </div>
          </div>
        </Card>

        {/* Role & Bio Card */}
        <Card className="p-6 space-y-5">
          <div className="flex items-center space-x-2 pb-3 border-b border-[var(--border-color)]/60">
            <Briefcase className="w-4 h-4 text-[var(--secondary-accent)]" />
            <h3 className="text-sm font-bold font-heading text-[var(--text-primary)]">
              Professional Details & Biography
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            {/* Occupation */}
            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-[var(--text-secondary)] mb-1.5">
                Current Occupation
              </label>
              <input
                type="text"
                value={formData.occupation}
                onChange={(e) => setFormData({ ...formData, occupation: e.target.value })}
                className="w-full px-3.5 py-2.5 text-xs font-mono bg-[var(--bg-app)] border border-[var(--border-color)] rounded-xl text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent)]"
                placeholder="e.g. Senior Frontend Engineer @ Scale Tech"
              />
            </div>

            {/* Experience Level */}
            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-[var(--text-secondary)] mb-1.5">
                Experience Level
              </label>
              <select
                value={formData.experienceLevel}
                onChange={(e) => setFormData({ ...formData, experienceLevel: e.target.value as ExperienceLevel })}
                className="w-full px-3.5 py-2.5 text-xs bg-[var(--bg-app)] border border-[var(--border-color)] rounded-xl text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent)] font-mono"
              >
                {experienceLevels.map((lvl) => (
                  <option key={lvl} value={lvl} className="bg-[var(--bg-surface)] text-[var(--text-primary)]">
                    {lvl}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Biography with Character Counter */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-mono uppercase tracking-wider text-[var(--text-secondary)]">
                Biography & Context
              </label>
              <span
                className={`text-[11px] font-mono ${
                  formData.bio.length > MAX_BIO_LENGTH ? "text-[var(--error)] font-bold" : "text-[var(--text-secondary)]"
                }`}
              >
                {formData.bio.length} / {MAX_BIO_LENGTH} chars
              </span>
            </div>
            <textarea
              rows={4}
              value={formData.bio}
              onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
              className={`w-full p-3.5 text-xs font-body bg-[var(--bg-app)] border rounded-xl text-[var(--text-primary)] focus:outline-none leading-relaxed ${
                errors.bio ? "border-[var(--error)]" : "border-[var(--border-color)] focus:border-[var(--accent)]"
              }`}
              placeholder="Brief overview of your experience, target loops, and architectural passions..."
            />
            {errors.bio && <p className="text-[11px] text-[var(--error)] mt-1 font-mono">{errors.bio}</p>}
          </div>
        </Card>

        {/* Skills & Learning Interests Card */}
        <Card className="p-6 space-y-6">
          
          {/* Skills Management */}
          <div className="space-y-3">
            <label className="block text-xs font-mono uppercase tracking-wider text-[var(--text-secondary)]">
              Core Technical Skills
            </label>

            <div className="flex items-center gap-2">
              <input
                type="text"
                value={newSkill}
                onChange={(e) => setNewSkill(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), handleAddSkill())}
                placeholder="Add skill (e.g. WebGL, Distributed Rate Limiting)"
                className="flex-1 px-3.5 py-2 text-xs font-mono bg-[var(--bg-app)] border border-[var(--border-color)] rounded-xl text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent)]"
              />
              <Button
                type="button"
                variant="outline"
                size="sm"
                icon={<Plus className="w-3.5 h-3.5" />}
                onClick={handleAddSkill}
              >
                Add
              </Button>
            </div>

            <div className="flex flex-wrap gap-2 pt-1">
              {formData.skills.map((skill) => (
                <span
                  key={skill}
                  className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-mono rounded-lg bg-[var(--bg-app)] border border-[var(--border-color)] text-[var(--text-primary)]"
                >
                  {skill}
                  <button
                    type="button"
                    onClick={() => handleRemoveSkill(skill)}
                    className="p-0.5 rounded hover:bg-[var(--bg-hover)] text-[var(--text-secondary)] hover:text-[var(--error)] transition-colors"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
            </div>
          </div>

          {/* Interests Management */}
          <div className="space-y-3 pt-4 border-t border-[var(--border-color)]/60">
            <label className="block text-xs font-mono uppercase tracking-wider text-[var(--text-secondary)]">
              Learning Interests & Deep Dives
            </label>

            <div className="flex items-center gap-2">
              <input
                type="text"
                value={newInterest}
                onChange={(e) => setNewInterest(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), handleAddInterest())}
                placeholder="Add interest (e.g. GenAI Agents, Consensus)"
                className="flex-1 px-3.5 py-2 text-xs font-mono bg-[var(--bg-app)] border border-[var(--border-color)] rounded-xl text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent)]"
              />
              <Button
                type="button"
                variant="outline"
                size="sm"
                icon={<Plus className="w-3.5 h-3.5" />}
                onClick={handleAddInterest}
              >
                Add
              </Button>
            </div>

            <div className="flex flex-wrap gap-2 pt-1">
              {formData.learningInterests.map((interest) => (
                <span
                  key={interest}
                  className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-mono rounded-lg bg-[var(--secondary-accent)]/10 border border-[var(--secondary-accent)]/30 text-[var(--secondary-accent)]"
                >
                  {interest}
                  <button
                    type="button"
                    onClick={() => handleRemoveInterest(interest)}
                    className="p-0.5 rounded hover:bg-[var(--bg-hover)] text-[var(--secondary-accent)] hover:text-[var(--error)] transition-colors"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
            </div>
          </div>
        </Card>

        {/* Bottom Actions */}
        <div className="flex items-center justify-end space-x-3 pt-4">
          <Button variant="ghost" size="md" onClick={onCancel}>
            Cancel
          </Button>
          <Button variant="accent" size="md" icon={<Save className="w-4 h-4" />} type="submit">
            Save Profile Changes
          </Button>
        </div>
      </form>
    </PageTransition>
  );
};
