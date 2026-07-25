import React, { useState } from "react";
import { Card, Button, Badge } from "../DesignSystem";
import { AlertTriangle, Trash2, Download, RefreshCcw, ShieldAlert, X, Check } from "lucide-react";

interface DangerZoneCardProps {
  onDeleteAccount: () => void;
  onResetAllData: () => void;
  onExportData: () => void;
}

export const DangerZoneCard: React.FC<DangerZoneCardProps> = ({
  onDeleteAccount,
  onResetAllData,
  onExportData,
}) => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [confirmText, setConfirmText] = useState("");
  const [showResetModal, setShowResetModal] = useState(false);

  return (
    <div className="space-y-6">
      {/* Data Portability Section */}
      <Card className="p-6 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-start space-x-3">
            <div className="p-2.5 rounded-xl bg-[var(--bg-app)] border border-[var(--border-color)] text-[var(--accent)] shrink-0">
              <Download className="w-5 h-5" />
            </div>
            <div className="space-y-1">
              <h3 className="text-sm font-bold font-heading text-[var(--text-primary)]">
                Export Candidate Data Package
              </h3>
              <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                Download a complete JSON snapshot of your mock interview transcripts, readiness scores, flashcards, and resume analysis history.
              </p>
            </div>
          </div>

          <Button variant="outline" size="sm" icon={<Download className="w-4 h-4" />} onClick={onExportData}>
            Export My Data (.json)
          </Button>
        </div>
      </Card>

      {/* Critical Danger Zone Card */}
      <Card className="p-6 border-[var(--error)]/40 bg-[var(--error)]/5 space-y-6 relative overflow-hidden">
        <div className="flex items-center space-x-3 pb-3 border-b border-[var(--error)]/20">
          <div className="p-2 rounded-xl bg-[var(--error)]/15 text-[var(--error)]">
            <ShieldAlert className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm font-bold font-heading text-[var(--error)]">
              Danger Zone
            </h3>
            <p className="text-xs text-[var(--text-secondary)]">
              Irreversible account actions. Proceed with caution.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          
          {/* Reset Progress Card */}
          <div className="p-4 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-color)] space-y-3">
            <div className="flex items-center space-x-2 text-xs font-bold font-mono text-[var(--text-primary)]">
              <RefreshCcw className="w-4 h-4 text-[var(--secondary-accent)]" />
              <span>Reset Practice Progress</span>
            </div>
            <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
              Clear saved mock interview transcripts and reset spaced memory flashcard intervals back to day 1.
            </p>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowResetModal(true)}
              className="w-full text-xs"
            >
              Reset Session State
            </Button>
          </div>

          {/* Delete Account Card */}
          <div className="p-4 rounded-xl bg-[var(--bg-surface)] border border-[var(--error)]/30 space-y-3">
            <div className="flex items-center space-x-2 text-xs font-bold font-mono text-[var(--error)]">
              <Trash2 className="w-4 h-4" />
              <span>Permanently Delete Candidate Account</span>
            </div>
            <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
              Completely remove your candidate profile, target metrics, and linked credentials. This action cannot be undone.
            </p>
            <Button
              variant="accent"
              size="sm"
              onClick={() => setShowDeleteModal(true)}
              className="w-full bg-[var(--error)] text-white hover:bg-[var(--error)]/90 border-transparent text-xs"
            >
              Delete Account
            </Button>
          </div>
        </div>
      </Card>

      {/* Delete Account Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-[var(--bg-surface)] border border-[var(--error)]/50 rounded-2xl p-6 space-y-5 shadow-craft-lg text-[var(--text-primary)]">
            <div className="flex items-start justify-between">
              <div className="flex items-center space-x-2 text-[var(--error)]">
                <AlertTriangle className="w-5 h-5" />
                <h3 className="text-base font-bold font-heading">Delete Account Permanently?</h3>
              </div>
              <button
                onClick={() => setShowDeleteModal(false)}
                className="p-1 rounded-lg text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
              This action will permanently delete all candidate logs, readiness scores, and account preferences. Type <strong className="text-[var(--error)] font-mono">DELETE</strong> below to confirm.
            </p>

            <input
              type="text"
              value={confirmText}
              onChange={(e) => setConfirmText(e.target.value)}
              placeholder="Type DELETE to confirm"
              className="w-full px-3.5 py-2.5 text-xs font-mono bg-[var(--bg-app)] border border-[var(--border-color)] rounded-xl focus:outline-none focus:border-[var(--error)] text-[var(--text-primary)]"
            />

            <div className="flex items-center justify-end space-x-3 pt-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowDeleteModal(false)}
              >
                Cancel
              </Button>
              <Button
                variant="accent"
                size="sm"
                disabled={confirmText !== "DELETE"}
                onClick={() => {
                  onDeleteAccount();
                  setShowDeleteModal(false);
                }}
                className="bg-[var(--error)] text-white hover:bg-[var(--error)]/90 border-transparent"
              >
                Confirm Delete
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Reset State Modal */}
      {showResetModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-[var(--bg-surface)] border border-[var(--border-color)] rounded-2xl p-6 space-y-5 shadow-craft-lg text-[var(--text-primary)]">
            <div className="flex items-start justify-between">
              <div className="flex items-center space-x-2 text-[var(--accent)]">
                <RefreshCcw className="w-5 h-5" />
                <h3 className="text-base font-bold font-heading">Reset Candidate Practice Data?</h3>
              </div>
              <button
                onClick={() => setShowResetModal(false)}
                className="p-1 rounded-lg text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
              All interview transcript history and flashcard review intervals will be reset to factory initial state. Your candidate target settings will be preserved.
            </p>

            <div className="flex items-center justify-end space-x-3 pt-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowResetModal(false)}
              >
                Cancel
              </Button>
              <Button
                variant="primary"
                size="sm"
                onClick={() => {
                  onResetAllData();
                  setShowResetModal(false);
                }}
              >
                Reset Progress Data
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
