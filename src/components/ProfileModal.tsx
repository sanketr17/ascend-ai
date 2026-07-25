import React, { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { UserProfile, RoleCategory, TargetCompanyTier } from "../types";
import { Button } from "./DesignSystem";
import { X, Target, ShieldCheck } from "lucide-react";

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  userProfile: UserProfile;
  onUpdateProfile: (updated: UserProfile) => void;
}

export const ProfileModal: React.FC<ProfileModalProps> = ({
  isOpen,
  onClose,
  userProfile,
  onUpdateProfile,
}) => {
  const [formData, setFormData] = useState<UserProfile>({ ...userProfile });

  const roles: RoleCategory[] = [
    "Senior/Staff Frontend Engineer",
    "Software Engineer (Fullstack/Backend)",
    "Systems Architecture & Infra Lead",
    "AI / Machine Learning Engineer",
    "Lead Product Manager",
    "Quantitative Analyst / Trader",
    "Engineering Manager"
  ];

  const tiers: TargetCompanyTier[] = [
    "Tier 1 Big Tech (Apple, Stripe, Google)",
    "AI Frontier (OpenAI, Anthropic)",
    "Fintech & Quant (Jane Street, Citadel, Stripe)",
    "High-Growth Scaleup",
    "Top Tier Management Consulting"
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateProfile(formData);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18 }}
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div 
            initial={{ scale: 0.95, opacity: 0, y: 10 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 10 }}
            transition={{ type: "spring", stiffness: 380, damping: 28 }}
            className="w-full max-w-lg bg-[var(--bg-surface)] border border-[var(--border-color)] rounded-2xl shadow-craft-lg overflow-hidden text-[var(--text-primary)]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between px-6 py-4 border-b border-[var(--border-color)]">
              <div className="flex items-center space-x-2">
                <Target className="w-5 h-5 text-[var(--accent)]" />
                <h2 className="text-base font-bold text-[var(--text-primary)] font-heading">
                  Candidate Profile & Targeting
                </h2>
              </div>
              <motion.button 
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={onClose}
                className="p-1.5 rounded-lg text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-hover)]"
              >
                <X className="w-4 h-4" />
              </motion.button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4 font-body">
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-[var(--text-secondary)] mb-1.5">
                  Candidate Name
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3.5 py-2.5 text-xs font-mono bg-[var(--bg-app)] border border-[var(--border-color)] rounded-xl text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent)] transition-all duration-150 focus:ring-2 focus:ring-[var(--accent)]/20"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-[var(--text-secondary)] mb-1.5">
                  Target Role Baseline
                </label>
                <select
                  value={formData.targetRole}
                  onChange={(e) => setFormData({ ...formData, targetRole: e.target.value as RoleCategory })}
                  className="w-full px-3.5 py-2.5 text-xs bg-[var(--bg-app)] border border-[var(--border-color)] rounded-xl text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent)] transition-all duration-150 focus:ring-2 focus:ring-[var(--accent)]/20"
                >
                  {roles.map((r) => (
                    <option key={r} value={r} className="bg-[var(--bg-surface)] text-[var(--text-primary)]">
                      {r}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-[var(--text-secondary)] mb-1.5">
                  Target Company Tier / Standards
                </label>
                <select
                  value={formData.companyTier}
                  onChange={(e) => setFormData({ ...formData, companyTier: e.target.value as TargetCompanyTier })}
                  className="w-full px-3.5 py-2.5 text-xs bg-[var(--bg-app)] border border-[var(--border-color)] rounded-xl text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent)] transition-all duration-150 focus:ring-2 focus:ring-[var(--accent)]/20"
                >
                  {tiers.map((t) => (
                    <option key={t} value={t} className="bg-[var(--bg-surface)] text-[var(--text-primary)]">
                      {t}
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-[var(--text-secondary)] mb-1.5">
                    Target Interview Date
                  </label>
                  <input
                    type="date"
                    value={formData.targetDate}
                    onChange={(e) => setFormData({ ...formData, targetDate: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-xs font-mono bg-[var(--bg-app)] border border-[var(--border-color)] rounded-xl text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent)] transition-all duration-150 focus:ring-2 focus:ring-[var(--accent)]/20"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-[var(--text-secondary)] mb-1.5">
                    Weekly Goal (Hours)
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="50"
                    value={formData.weeklyGoalHours}
                    onChange={(e) => setFormData({ ...formData, weeklyGoalHours: Number(e.target.value) })}
                    className="w-full px-3.5 py-2.5 text-xs font-mono bg-[var(--bg-app)] border border-[var(--border-color)] rounded-xl text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent)] transition-all duration-150 focus:ring-2 focus:ring-[var(--accent)]/20"
                  />
                </div>
              </div>

              <div className="p-3.5 bg-[var(--bg-app)] rounded-xl border border-[var(--border-color)] text-xs text-[var(--text-secondary)] flex items-start space-x-2.5">
                <ShieldCheck className="w-4 h-4 text-[var(--success)] shrink-0 mt-0.5" />
                <span className="leading-relaxed">
                  ASCEND AI re-calibrates evaluation benchmarks, question difficulty curves, and spaced repetition intervals dynamically whenever you adjust your target tier or role.
                </span>
              </div>

              <div className="flex items-center justify-end space-x-3 pt-3">
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={onClose}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  variant="primary"
                  size="md"
                >
                  Save Configuration
                </Button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
