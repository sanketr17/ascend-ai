import React, { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ExtendedUserProfile } from "../../types/settingsTypes";
import { defaultExtendedUserProfile } from "../../data/initialSettingsData";
import { ProfileView } from "./ProfileView";
import { EditProfileView } from "./EditProfileView";
import { SettingsView } from "./SettingsView";
import { User, Edit3, Settings, Sparkles, LogOut } from "lucide-react";
import { TabTransition } from "../motion";

interface ProfileAndSettingsContainerProps {
  initialTab?: "profile" | "edit" | "settings";
  onUpdateGlobalProfile?: (updated: any) => void;
  onSignOut?: () => void;
}

export const ProfileAndSettingsContainer: React.FC<ProfileAndSettingsContainerProps> = ({
  initialTab = "profile",
  onUpdateGlobalProfile,
  onSignOut,
}) => {
  const [activeMode, setActiveMode] = useState<"profile" | "edit" | "settings">(initialTab);
  
  // Persistent local profile state initialized from default & localStorage
  const [profile, setProfile] = useState<ExtendedUserProfile>(() => {
    const saved = localStorage.getItem("ascend_extended_profile");
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        // fallback
      }
    }
    return defaultExtendedUserProfile;
  });

  const handleSaveProfile = (updated: ExtendedUserProfile) => {
    setProfile(updated);
    localStorage.setItem("ascend_extended_profile", JSON.stringify(updated));
    if (onUpdateGlobalProfile) {
      onUpdateGlobalProfile({
        name: updated.name,
        targetRole: updated.targetRole,
        companyTier: updated.companyTier,
        targetDate: updated.targetDate,
      });
    }
    setActiveMode("profile");
  };

  const handleResetAllData = () => {
    localStorage.clear();
    setProfile(defaultExtendedUserProfile);
    alert("Candidate session state reset to initial factory values.");
  };

  const handleDeleteAccount = () => {
    localStorage.clear();
    setProfile({
      ...defaultExtendedUserProfile,
      name: "Deleted Candidate",
      username: "deleted",
      email: "deleted@ascend.ai",
    });
    alert("Candidate account and local logs deleted.");
  };

  const modes = [
    { id: "profile" as const, label: "Profile Card", icon: User },
    { id: "edit" as const, label: "Edit Profile", icon: Edit3 },
    { id: "settings" as const, label: "System Settings", icon: Settings },
  ];

  return (
    <div className="space-y-6">
      {/* Container Mode Tabs Bar */}
      <div className="flex items-center justify-between border-b border-[var(--border-color)]/60 pb-1">
        <div className="relative flex items-center space-x-2">
          {modes.map((m) => {
            const Icon = m.icon;
            const isActive = activeMode === m.id;
            return (
              <button
                key={m.id}
                onClick={() => setActiveMode(m.id)}
                className={`relative flex items-center space-x-2 py-2 px-4 text-xs font-mono font-medium rounded-xl transition-all ${
                  isActive
                    ? "text-[var(--accent)] border border-[var(--accent)]/40 shadow-xs bg-[var(--bg-surface)]"
                    : "text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-hover)]"
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{m.label}</span>
                {isActive && (
                  <motion.div
                    layoutId="profileModeActiveIndicator"
                    className="absolute inset-0 border border-[var(--accent)]/50 rounded-xl pointer-events-none"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
              </button>
            );
          })}
        </div>

        <div className="flex items-center space-x-3">
          <div className="hidden sm:flex items-center space-x-2 text-xs font-mono text-[var(--text-secondary)]">
            <Sparkles className="w-3.5 h-3.5 text-[var(--accent)]" />
            <span>ASCEND Account v2.4</span>
          </div>

          {onSignOut && (
            <button
              onClick={onSignOut}
              className="flex items-center space-x-1.5 px-3 py-1.5 text-xs font-mono text-[var(--error)] bg-[var(--error)]/10 hover:bg-[var(--error)]/20 border border-[var(--error)]/30 rounded-xl transition-colors"
              title="Sign Out of ASCEND AI"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Sign Out</span>
            </button>
          )}
        </div>
      </div>

      {/* View Router Render with Smooth Tab Transitions */}
      <AnimatePresence mode="wait">
        {activeMode === "profile" && (
          <TabTransition activeKey="profile">
            <ProfileView
              profile={profile}
              onEditProfileClick={() => setActiveMode("edit")}
            />
          </TabTransition>
        )}

        {activeMode === "edit" && (
          <TabTransition activeKey="edit">
            <EditProfileView
              profile={profile}
              onSave={handleSaveProfile}
              onCancel={() => setActiveMode("profile")}
            />
          </TabTransition>
        )}

        {activeMode === "settings" && (
          <TabTransition activeKey="settings">
            <SettingsView
              onResetAllData={handleResetAllData}
              onDeleteAccount={handleDeleteAccount}
            />
          </TabTransition>
        )}
      </AnimatePresence>
    </div>
  );
};
