import React, { useState } from "react";
import { 
  AppearanceSettings, 
  NotificationSettings, 
  SecuritySettings, 
  LearningAndInterviewSettings, 
  LanguageAndAccessibilitySettings,
  FAQItem,
  SystemAboutInfo
} from "../../types/settingsTypes";
import { 
  defaultAppearanceSettings, 
  defaultNotificationSettings, 
  defaultSecuritySettings, 
  defaultLearningSettings, 
  defaultLanguageSettings,
  initialFAQList,
  systemAboutData
} from "../../data/initialSettingsData";
import { Card, Button, Badge, SectionHeader, PageTransition } from "../DesignSystem";
import { SettingCard } from "./SettingCard";
import { PreferenceCard } from "./PreferenceCard";
import { ToggleSwitch } from "./ToggleSwitch";
import { InfoCard } from "./InfoCard";
import { SecurityCard } from "./SecurityCard";
import { SupportCard } from "./SupportCard";
import { DangerZoneCard } from "./DangerZoneCard";
import { ThemePreviewCard } from "./ThemePreviewCard";
import { AccountStatusBadge } from "./AccountStatusBadge";

import { 
  Palette, 
  Bell, 
  ShieldCheck, 
  BookOpen, 
  BrainCircuit, 
  Globe, 
  User, 
  HelpCircle, 
  Info, 
  Check, 
  Sun, 
  Moon, 
  Monitor, 
  Sliders, 
  Sparkles, 
  ChevronDown, 
  ChevronUp, 
  Send, 
  MessageSquare, 
  Bug, 
  FileText, 
  Code, 
  Star,
  X,
  ExternalLink,
  Laptop,
  Smartphone,
  Lock,
  Layers
} from "lucide-react";

export type SettingsSubTab = 
  | "appearance" 
  | "notifications" 
  | "privacy" 
  | "learning" 
  | "interview" 
  | "language" 
  | "account" 
  | "support" 
  | "about";

interface SettingsViewProps {
  onResetAllData: () => void;
  onDeleteAccount: () => void;
}

export const SettingsView: React.FC<SettingsViewProps> = ({ onResetAllData, onDeleteAccount }) => {
  const [activeSubTab, setActiveSubTab] = useState<SettingsSubTab>("appearance");

  // Local state for preferences
  const [appearance, setAppearance] = useState<AppearanceSettings>(defaultAppearanceSettings);
  const [notifications, setNotifications] = useState<NotificationSettings>(defaultNotificationSettings);
  const [security, setSecurity] = useState<SecuritySettings>(defaultSecuritySettings);
  const [learning, setLearning] = useState<LearningAndInterviewSettings>(defaultLearningSettings);
  const [language, setLanguage] = useState<LanguageAndAccessibilitySettings>(defaultLanguageSettings);
  
  // Support state
  const [faqSearch, setFaqSearch] = useState("");
  const [expandedFaq, setExpandedFaq] = useState<string | null>("faq-1");
  const [feedbackRating, setFeedbackRating] = useState<number>(5);
  const [feedbackComment, setFeedbackComment] = useState("");
  const [feedbackSubmitted, setFeedbackSubmitted] = useState(false);

  // Modals inside Settings
  const [showContactModal, setShowContactModal] = useState(false);
  const [showBugModal, setShowBugModal] = useState(false);
  const [showLegalModal, setShowLegalModal] = useState<"privacy" | "terms" | null>(null);

  const subNavItems: { id: SettingsSubTab; label: string; icon: React.ReactNode }[] = [
    { id: "appearance", label: "Appearance", icon: <Palette className="w-4 h-4" /> },
    { id: "notifications", label: "Notifications", icon: <Bell className="w-4 h-4" /> },
    { id: "privacy", label: "Privacy & Security", icon: <ShieldCheck className="w-4 h-4" /> },
    { id: "learning", label: "Learning Preferences", icon: <BookOpen className="w-4 h-4" /> },
    { id: "interview", label: "Interview Engine", icon: <BrainCircuit className="w-4 h-4" /> },
    { id: "language", label: "Language & Accessibility", icon: <Globe className="w-4 h-4" /> },
    { id: "account", label: "Account Overview", icon: <User className="w-4 h-4" /> },
    { id: "support", label: "Help & Support", icon: <HelpCircle className="w-4 h-4" /> },
    { id: "about", label: "About ASCEND", icon: <Info className="w-4 h-4" /> },
  ];

  const filteredFaqs = initialFAQList.filter(
    (f) =>
      f.question.toLowerCase().includes(faqSearch.toLowerCase()) ||
      f.answer.toLowerCase().includes(faqSearch.toLowerCase()) ||
      f.category.toLowerCase().includes(faqSearch.toLowerCase())
  );

  return (
    <PageTransition className="space-y-8">
      {/* Settings Top Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-2 border-b border-[var(--border-color)]">
        <div>
          <h1 className="text-2xl font-extrabold font-heading text-[var(--text-primary)] tracking-tight">
            Account & System Settings
          </h1>
          <p className="text-xs text-[var(--text-secondary)] mt-0.5">
            Manage your evaluation preferences, security credentials, notification channels, and appearance layout.
          </p>
        </div>
        <AccountStatusBadge status="Verified Pro Candidate" memberSince="Jan 2025" />
      </div>

      {/* Main Settings Split View (Sidebar Nav + Content Area) */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        
        {/* Left Sidebar Sub-Navigation */}
        <div className="lg:col-span-1 space-y-1">
          <div className="p-1.5 bg-[var(--bg-surface)] border border-[var(--border-color)] rounded-2xl space-y-1 shadow-craft">
            {subNavItems.map((item) => {
              const isActive = activeSubTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveSubTab(item.id)}
                  className={`w-full flex items-center space-x-3 px-3.5 py-2.5 rounded-xl text-xs font-mono font-medium transition-all ${
                    isActive
                      ? "bg-[var(--bg-hover)] text-[var(--accent)] border border-[var(--accent)]/40 shadow-xs"
                      : "text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-app)] border border-transparent"
                  }`}
                >
                  <span className={isActive ? "text-[var(--accent)]" : "text-[var(--text-secondary)]"}>
                    {item.icon}
                  </span>
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Section Content */}
        <div className="lg:col-span-3 space-y-6">
          
          {/* 1. APPEARANCE SECTION */}
          {activeSubTab === "appearance" && (
            <div className="space-y-6">
              <SectionHeader
                title="Appearance & Interface"
                description="Customize theme colors, font sizing, layout density, and animation speeds."
                icon={<Palette className="w-5 h-5 text-[var(--accent)]" />}
              />

              {/* Live Preview Card */}
              <ThemePreviewCard settings={appearance} />

              {/* Theme Mode Selector */}
              <PreferenceCard
                title="Theme Mode"
                description="Select your preferred canvas contrast theme for extended practice loops."
                icon={<Sun className="w-4 h-4" />}
                options={[
                  { id: "light", label: "Light Theme", description: "Clean high-contrast light canvas", icon: <Sun className="w-3.5 h-3.5" /> },
                  { id: "dark", label: "Dark Theme", description: "Minimalist dark slate workspace", icon: <Moon className="w-3.5 h-3.5" /> },
                  { id: "system", label: "System Sync", description: "Automatically match OS theme", icon: <Monitor className="w-3.5 h-3.5" /> },
                ]}
                selectedValue={appearance.theme}
                onChange={(theme) => setAppearance({ ...appearance, theme })}
              />

              {/* Font Size & Density */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <PreferenceCard
                  title="Typography Scale"
                  description="Adjust body & headline text sizing across views."
                  icon={<Sliders className="w-4 h-4" />}
                  options={[
                    { id: "small", label: "Small (12px)", description: "Dense text for high data density" },
                    { id: "medium", label: "Medium (14px)", description: "Balanced default readability" },
                    { id: "large", label: "Large (16px)", description: "Relaxed spacing for legibility" },
                  ]}
                  selectedValue={appearance.fontSize}
                  onChange={(fontSize) => setAppearance({ ...appearance, fontSize })}
                />

                <PreferenceCard
                  title="Interface Density Mode"
                  description="Choose padding and margin tightness inside cards."
                  icon={<Layers className="w-4 h-4" />}
                  options={[
                    { id: "compact", label: "Compact Mode", description: "Tighter padding & minimal margins" },
                    { id: "comfortable", label: "Comfortable Mode", description: "Generous whitespace & padding" },
                  ]}
                  selectedValue={appearance.density}
                  onChange={(density) => setAppearance({ ...appearance, density })}
                />
              </div>

              {/* Motion & High Contrast Toggles */}
              <SettingCard
                title="Motion & UI Effects"
                description="Configure hardware acceleration and high-contrast accessibility borders."
              >
                <div className="space-y-4 pt-2">
                  <ToggleSwitch
                    label="Smooth Page Transitions & Micro-Animations"
                    description="Enable subtle motion transitions when navigating between views."
                    checked={appearance.animationsEnabled}
                    onChange={(val) => setAppearance({ ...appearance, animationsEnabled: val })}
                  />
                  <ToggleSwitch
                    label="High Contrast Outline Mode"
                    description="Increase border contrast for ultra-clear element boundaries."
                    checked={appearance.highContrast}
                    onChange={(val) => setAppearance({ ...appearance, highContrast: val })}
                  />
                </div>
              </SettingCard>
            </div>
          )}

          {/* 2. NOTIFICATIONS SECTION */}
          {activeSubTab === "notifications" && (
            <div className="space-y-6">
              <SectionHeader
                title="Notification Channels & Reminders"
                description="Control interview scheduled alerts, spaced repetition review reminders, and progress digests."
                icon={<Bell className="w-5 h-5 text-[var(--accent)]" />}
              />

              <SettingCard
                title="Email & Push Alert Channels"
                description="Manage active dispatch frequencies."
              >
                <div className="space-y-5 pt-2">
                  <ToggleSwitch
                    label="Email Notifications"
                    description="Receive email updates regarding interview evaluation transcripts and weekly performance summaries."
                    checked={notifications.emailNotifications}
                    onChange={(val) => setNotifications({ ...notifications, emailNotifications: val })}
                  />

                  <div className="border-t border-[var(--border-color)]/60 pt-4">
                    <ToggleSwitch
                      label="Scheduled Mock Interview Reminders"
                      description="Send notification before scheduled mock practice loops."
                      checked={notifications.interviewReminders}
                      onChange={(val) => setNotifications({ ...notifications, interviewReminders: val })}
                    />
                    {notifications.interviewReminders && (
                      <div className="mt-3 ml-2 pl-4 border-l-2 border-[var(--accent)] flex items-center gap-3">
                        <span className="text-xs font-mono text-[var(--text-secondary)]">Remind me:</span>
                        <select
                          value={notifications.interviewReminderTime}
                          onChange={(e) => setNotifications({ ...notifications, interviewReminderTime: e.target.value as any })}
                          className="px-3 py-1.5 text-xs font-mono bg-[var(--bg-app)] border border-[var(--border-color)] rounded-lg text-[var(--text-primary)]"
                        >
                          <option value="15m">15 minutes before</option>
                          <option value="30m">30 minutes before</option>
                          <option value="1h">1 hour before</option>
                          <option value="1d">1 day before</option>
                        </select>
                      </div>
                    )}
                  </div>

                  <div className="border-t border-[var(--border-color)]/60 pt-4">
                    <ToggleSwitch
                      label="Daily Spaced Memory Practice Reminder"
                      description="Daily prompt to review flashcard decay risks."
                      checked={notifications.dailyLearningReminder}
                      onChange={(val) => setNotifications({ ...notifications, dailyLearningReminder: val })}
                    />
                  </div>

                  <div className="border-t border-[var(--border-color)]/60 pt-4">
                    <ToggleSwitch
                      label="Weekly Candidate Readiness Digest"
                      description="Receive a weekly breakdown of readiness score velocity and weak skill nodes."
                      checked={notifications.weeklyReport}
                      onChange={(val) => setNotifications({ ...notifications, weeklyReport: val })}
                    />
                  </div>

                  <div className="border-t border-[var(--border-color)]/60 pt-4">
                    <ToggleSwitch
                      label="Milestone & Streak Achievements"
                      description="Notify when streak records or skill mastery thresholds are achieved."
                      checked={notifications.achievementNotifications}
                      onChange={(val) => setNotifications({ ...notifications, achievementNotifications: val })}
                    />
                  </div>

                  <div className="border-t border-[var(--border-color)]/60 pt-4">
                    <ToggleSwitch
                      label="Product Updates & Engineering Briefs"
                      description="Infrequent announcements regarding new interview rubrics and system design datasets."
                      checked={notifications.marketingEmails}
                      onChange={(val) => setNotifications({ ...notifications, marketingEmails: val })}
                    />
                  </div>
                </div>
              </SettingCard>
            </div>
          )}

          {/* 3. PRIVACY & SECURITY SECTION */}
          {activeSubTab === "privacy" && (
            <div className="space-y-6">
              <SectionHeader
                title="Privacy, Security & Data Controls"
                description="Manage password credentials, multi-factor authentication, active login sessions, and data exports."
                icon={<ShieldCheck className="w-5 h-5 text-[var(--success)]" />}
              />

              <SecurityCard
                twoFactorEnabled={security.twoFactorEnabled}
                twoFactorMethod={security.twoFactorMethod}
                onToggleTwoFactor={() => setSecurity({ ...security, twoFactorEnabled: !security.twoFactorEnabled })}
                devices={security.connectedDevices}
                onRevokeDevice={(id) =>
                  setSecurity({
                    ...security,
                    connectedDevices: security.connectedDevices.filter((d) => d.id !== id),
                  })
                }
                onChangePassword={() => alert("Password update dialog triggered. Current password verified.")}
                onExportData={() => alert("Data export package prepared: ascend_candidate_data_export.json")}
              />

              {/* Danger Zone */}
              <DangerZoneCard
                onDeleteAccount={onDeleteAccount}
                onResetAllData={onResetAllData}
                onExportData={() => alert("Candidate JSON export downloaded successfully.")}
              />
            </div>
          )}

          {/* 4. LEARNING PREFERENCES */}
          {activeSubTab === "learning" && (
            <div className="space-y-6">
              <SectionHeader
                title="Learning & Skill Engine Preferences"
                description="Configure spaced repetition algorithms and daily study goal intensity."
                icon={<BookOpen className="w-5 h-5 text-[var(--accent)]" />}
              />

              <PreferenceCard
                title="AI Evaluation Depth Model"
                description="Select how deeply the AI coach analyzes code syntax, complexity tradeoffs, and architectural edge cases."
                icon={<BrainCircuit className="w-4 h-4" />}
                options={[
                  { id: "Fast & Precise", label: "Fast & Concise", description: "Sub-second quick answers & key takeaways" },
                  { id: "Balanced Evaluation", label: "Balanced Evaluation", description: "In-depth rubric analysis with code suggestions" },
                  { id: "Ultra Deep Architecture", label: "Ultra Deep Loop", description: "Comprehensive L6/L7 Big Tech benchmark breakdown" },
                ]}
                selectedValue={learning.aiModelDepth as any}
                onChange={(aiModelDepth) => setLearning({ ...learning, aiModelDepth: aiModelDepth as any })}
              />

              <PreferenceCard
                title="Question Difficulty Progression"
                description="Dynamic calibration curve adjusting question difficulty based on accuracy."
                icon={<Sliders className="w-4 h-4" />}
                options={[
                  { id: "Adaptive ML Engine", label: "Adaptive ML Engine", description: "Automatically scales with your readiness score" },
                  { id: "Fixed High Target", label: "Fixed High Target", description: "Consistently challenges with Staff L6+ questions" },
                  { id: "Gradual Ladder", label: "Gradual Step Ladder", description: "Smooth linear progression from Medium to Hard" },
                ]}
                selectedValue={learning.difficultyCurve as any}
                onChange={(difficultyCurve) => setLearning({ ...learning, difficultyCurve: difficultyCurve as any })}
              />
            </div>
          )}

          {/* 5. INTERVIEW ENGINE PREFERENCES */}
          {activeSubTab === "interview" && (
            <div className="space-y-6">
              <SectionHeader
                title="Mock Interview Simulator Preferences"
                description="Set default timer durations, code editor keybindings, and voice synthesis feedback."
                icon={<BrainCircuit className="w-5 h-5 text-[var(--accent)]" />}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <PreferenceCard
                  title="Default Mock Session Duration"
                  description="Standard timer set for mock interview sessions."
                  options={[
                    { id: "15 mins", label: "15 Minutes", description: "Quick speed drill" },
                    { id: "30 mins", label: "30 Minutes", description: "Standard interview loop" },
                    { id: "45 mins", label: "45 Minutes", description: "Deep system design loop" },
                  ]}
                  selectedValue={learning.sessionDurationDefault as any}
                  onChange={(sessionDurationDefault) => setLearning({ ...learning, sessionDurationDefault: sessionDurationDefault as any })}
                />

                <PreferenceCard
                  title="Code Editor Keybindings"
                  description="Editor mode inside code question windows."
                  options={[
                    { id: "Standard VSCode", label: "Standard VSCode", description: "Standard shortcuts" },
                    { id: "Vim Motion", label: "Vim Keybindings", description: "Vim modal editing" },
                    { id: "Emacs", label: "Emacs Mode", description: "Emacs keymap" },
                  ]}
                  selectedValue={learning.editorKeybindings as any}
                  onChange={(editorKeybindings) => setLearning({ ...learning, editorKeybindings: editorKeybindings as any })}
                />
              </div>

              <SettingCard
                title="Voice & Audio Synthesis"
                description="Control AI interviewer voice readouts during system design questions."
              >
                <div className="pt-2">
                  <ToggleSwitch
                    label="Enable Real-time Voice Readout"
                    description="Read interviewer questions and system architecture scenarios using natural text-to-speech."
                    checked={learning.voiceFeedback}
                    onChange={(val) => setLearning({ ...learning, voiceFeedback: val })}
                  />
                </div>
              </SettingCard>
            </div>
          )}

          {/* 6. LANGUAGE & ACCESSIBILITY */}
          {activeSubTab === "language" && (
            <div className="space-y-6">
              <SectionHeader
                title="Language & Accessibility Settings"
                description="Configure localization, screen reader optimizations, and keyboard navigation."
                icon={<Globe className="w-5 h-5 text-[var(--accent)]" />}
              />

              <SettingCard
                title="System Interface Language"
                description="Select your preferred language for interview prompts, rubric feedback, and system navigation."
              >
                <div className="pt-2 max-w-xs">
                  <select
                    value={language.language}
                    onChange={(e) => setLanguage({ ...language, language: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-xs font-mono bg-[var(--bg-app)] border border-[var(--border-color)] rounded-xl text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent)]"
                  >
                    <option value="English (US)">English (US)</option>
                    <option value="English (UK)">English (UK)</option>
                    <option value="Español">Español (Spanish)</option>
                    <option value="Deutsch">Deutsch (German)</option>
                    <option value="Français">Français (French)</option>
                    <option value="日本語">日本語 (Japanese)</option>
                  </select>
                </div>
              </SettingCard>

              <SettingCard
                title="Accessibility & Keyboard Support"
                description="Optimizations for screen readers and power-user keyboard navigation."
              >
                <div className="space-y-4 pt-2">
                  <ToggleSwitch
                    label="Screen Reader Optimizations"
                    description="Enhance ARIA landmarks and live regions for screen readers."
                    checked={language.screenReaderOptimization}
                    onChange={(val) => setLanguage({ ...language, screenReaderOptimization: val })}
                  />
                  <div className="border-t border-[var(--border-color)]/60 pt-4">
                    <ToggleSwitch
                      label="Global Command Palette (⌘K) Shortcuts"
                      description="Enable quick navigation hotkeys across all views."
                      checked={language.keyboardShortcutsEnabled}
                      onChange={(val) => setLanguage({ ...language, keyboardShortcutsEnabled: val })}
                    />
                  </div>
                </div>
              </SettingCard>
            </div>
          )}

          {/* 7. ACCOUNT OVERVIEW */}
          {activeSubTab === "account" && (
            <div className="space-y-6">
              <SectionHeader
                title="Account Status & Subscriptions"
                description="Manage candidate account tier, linked SSO providers, and storage usage."
                icon={<User className="w-5 h-5 text-[var(--accent)]" />}
              />

              <Card className="p-6 space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[var(--border-color)]">
                  <div>
                    <div className="text-xs font-mono uppercase text-[var(--text-secondary)]">Subscription Tier</div>
                    <div className="text-xl font-bold font-heading text-[var(--text-primary)]">ASCEND AI Pro Tier</div>
                    <p className="text-xs text-[var(--text-secondary)]">Unlimited AI mock interview sessions, deep architecture rubrics, & spaced memory sync.</p>
                  </div>
                  <Badge variant="accent">Active Pro</Badge>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-mono">
                  <div className="p-3 bg-[var(--bg-app)] rounded-xl border border-[var(--border-color)]">
                    <div className="text-[var(--text-secondary)]">Member Since</div>
                    <div className="text-sm font-bold text-[var(--text-primary)] pt-1">Jan 2025</div>
                  </div>
                  <div className="p-3 bg-[var(--bg-app)] rounded-xl border border-[var(--border-color)]">
                    <div className="text-[var(--text-secondary)]">Verification State</div>
                    <div className="text-sm font-bold text-[var(--success)] pt-1">Verified Candidate</div>
                  </div>
                  <div className="p-3 bg-[var(--bg-app)] rounded-xl border border-[var(--border-color)]">
                    <div className="text-[var(--text-secondary)]">Storage Sync</div>
                    <div className="text-sm font-bold text-[var(--text-primary)] pt-1">12.4 MB Used</div>
                  </div>
                </div>
              </Card>

              {/* Connected SSO Accounts */}
              <Card className="p-6 space-y-4">
                <h3 className="text-sm font-bold font-heading text-[var(--text-primary)]">
                  Connected Identity Providers (SSO)
                </h3>
                
                <div className="space-y-3">
                  <div className="p-3.5 bg-[var(--bg-app)] rounded-xl border border-[var(--border-color)] flex items-center justify-between text-xs">
                    <span className="font-mono font-bold text-[var(--text-primary)]">Google Workspace</span>
                    <Badge variant="success">Connected (alex.rivera@ascend.ai)</Badge>
                  </div>
                  <div className="p-3.5 bg-[var(--bg-app)] rounded-xl border border-[var(--border-color)] flex items-center justify-between text-xs">
                    <span className="font-mono font-bold text-[var(--text-primary)]">GitHub Enterprise</span>
                    <Badge variant="success">Connected (@alex_rivera)</Badge>
                  </div>
                  <div className="p-3.5 bg-[var(--bg-app)] rounded-xl border border-[var(--border-color)] flex items-center justify-between text-xs">
                    <span className="font-mono font-bold text-[var(--text-primary)]">LinkedIn Identity</span>
                    <Button variant="outline" size="sm">Connect LinkedIn</Button>
                  </div>
                </div>
              </Card>
            </div>
          )}

          {/* 8. HELP & SUPPORT */}
          {activeSubTab === "support" && (
            <div className="space-y-6">
              <SectionHeader
                title="Help & Candidate Support"
                description="Search documentation, read FAQs, contact engineering support, or submit feedback."
                icon={<HelpCircle className="w-5 h-5 text-[var(--accent)]" />}
              />

              {/* Support Quick Action Cards Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <SupportCard
                  title="Contact Support"
                  description="Direct line to ASCEND engineering for candidate loop queries."
                  icon={<MessageSquare className="w-5 h-5" />}
                  onClick={() => setShowContactModal(true)}
                  badge="Fast Response"
                />
                <SupportCard
                  title="Report a Bug"
                  description="Submit technical issues or missing rubric evaluations."
                  icon={<Bug className="w-5 h-5" />}
                  onClick={() => setShowBugModal(true)}
                />
              </div>

              {/* Searchable FAQ Accordion Section */}
              <Card className="p-6 space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[var(--border-color)]">
                  <h3 className="text-sm font-bold font-heading text-[var(--text-primary)]">
                    Frequently Asked Questions
                  </h3>
                  <input
                    type="text"
                    value={faqSearch}
                    onChange={(e) => setFaqSearch(e.target.value)}
                    placeholder="Search FAQ questions..."
                    className="px-3 py-1.5 text-xs font-mono bg-[var(--bg-app)] border border-[var(--border-color)] rounded-xl text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent)] max-w-xs"
                  />
                </div>

                <div className="space-y-3">
                  {filteredFaqs.map((faq) => {
                    const isOpen = expandedFaq === faq.id;
                    return (
                      <div
                        key={faq.id}
                        className="rounded-xl border border-[var(--border-color)] bg-[var(--bg-app)] overflow-hidden transition-all"
                      >
                        <button
                          onClick={() => setExpandedFaq(isOpen ? null : faq.id)}
                          className="w-full px-4 py-3 text-left flex items-center justify-between gap-3 text-xs font-bold font-heading text-[var(--text-primary)] hover:bg-[var(--bg-hover)] transition-colors"
                        >
                          <span className="flex items-center gap-2">
                            <span className="px-1.5 py-0.5 text-[9px] font-mono rounded bg-[var(--accent)]/15 text-[var(--accent)]">
                              {faq.category}
                            </span>
                            {faq.question}
                          </span>
                          {isOpen ? <ChevronUp className="w-4 h-4 text-[var(--accent)] shrink-0" /> : <ChevronDown className="w-4 h-4 text-[var(--text-secondary)] shrink-0" />}
                        </button>

                        {isOpen && (
                          <div className="px-4 pb-4 pt-1 text-xs text-[var(--text-secondary)] leading-relaxed border-t border-[var(--border-color)]/60 font-body bg-[var(--bg-surface)]">
                            {faq.answer}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </Card>

              {/* Feedback Form Card */}
              <Card className="p-6 space-y-4">
                <h3 className="text-sm font-bold font-heading text-[var(--text-primary)]">
                  Candidate Feedback & Product Rating
                </h3>

                {feedbackSubmitted ? (
                  <InfoCard type="success" title="Feedback Received">
                    Thank you for helping us refine the ASCEND AI evaluation experience!
                  </InfoCard>
                ) : (
                  <div className="space-y-4">
                    <div className="flex items-center space-x-2">
                      <span className="text-xs font-mono text-[var(--text-secondary)]">Rate Experience:</span>
                      <div className="flex items-center space-x-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <button
                            key={star}
                            onClick={() => setFeedbackRating(star)}
                            className="p-1 text-[var(--accent)] hover:scale-110 transition-transform"
                          >
                            <Star className={`w-4 h-4 ${star <= feedbackRating ? "fill-[var(--accent)] text-[var(--accent)]" : "text-[var(--text-secondary)]"}`} />
                          </button>
                        ))}
                      </div>
                    </div>

                    <textarea
                      rows={3}
                      value={feedbackComment}
                      onChange={(e) => setFeedbackComment(e.target.value)}
                      placeholder="Share your thoughts on question difficulty curves, system design feedback, or feature requests..."
                      className="w-full p-3 text-xs font-body bg-[var(--bg-app)] border border-[var(--border-color)] rounded-xl text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent)]"
                    />

                    <div className="flex justify-end">
                      <Button
                        variant="accent"
                        size="sm"
                        icon={<Send className="w-3.5 h-3.5" />}
                        onClick={() => {
                          setFeedbackSubmitted(true);
                          setTimeout(() => setFeedbackSubmitted(false), 4000);
                        }}
                      >
                        Submit Feedback
                      </Button>
                    </div>
                  </div>
                )}
              </Card>
            </div>
          )}

          {/* 9. ABOUT SECTION */}
          {activeSubTab === "about" && (
            <div className="space-y-6">
              <SectionHeader
                title="About ASCEND AI Platform"
                description="System architecture, engine versioning, research leadership, and open source licenses."
                icon={<Info className="w-5 h-5 text-[var(--accent)]" />}
              />

              {/* App Identity Banner */}
              <Card className="p-6 space-y-4 bg-gradient-to-r from-[var(--bg-surface)] to-[var(--bg-app)] border-[var(--border-color)] relative overflow-hidden">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 rounded-2xl bg-[var(--btn-primary-bg)] text-[var(--btn-primary-text)] font-bold text-xl flex items-center justify-center border border-[var(--border-color)] shadow-craft">
                    ▲
                  </div>
                  <div>
                    <h2 className="text-xl font-extrabold font-heading text-[var(--text-primary)]">
                      ASCEND AI Engine
                    </h2>
                    <p className="text-xs font-mono text-[var(--accent)]">
                      {systemAboutData.version} ({systemAboutData.buildNumber}) • Released {systemAboutData.releaseDate}
                    </p>
                  </div>
                </div>

                <p className="text-xs text-[var(--text-primary)] leading-relaxed font-body">
                  ASCEND AI is a high-precision candidate preparation platform designed for Senior, Staff, and Principal engineers targeting Tier 1 Big Tech, AI Frontier labs, and Quantitative Trading firms.
                </p>

                <div className="flex flex-wrap gap-2 pt-2 border-t border-[var(--border-color)]/60 text-xs font-mono">
                  <Button variant="outline" size="sm" onClick={() => setShowLegalModal("privacy")}>
                    Privacy Policy
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => setShowLegalModal("terms")}>
                    Terms of Service
                  </Button>
                </div>
              </Card>

              {/* Research Team Leadership */}
              <Card className="p-6 space-y-4">
                <h3 className="text-sm font-bold font-heading text-[var(--text-primary)]">
                  Engineering Leadership & AI Research Team
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {systemAboutData.team.map((member) => (
                    <div
                      key={member.name}
                      className="p-4 bg-[var(--bg-app)] rounded-xl border border-[var(--border-color)] space-y-2 text-xs"
                    >
                      <div className="flex items-center space-x-2.5">
                        <div className="w-8 h-8 rounded-full bg-[var(--accent)]/15 text-[var(--accent)] font-bold font-mono text-xs flex items-center justify-center border border-[var(--accent)]/30">
                          {member.avatarInitials}
                        </div>
                        <div>
                          <div className="font-bold text-[var(--text-primary)] font-heading">{member.name}</div>
                          <div className="text-[10px] font-mono text-[var(--secondary-accent)]">{member.role}</div>
                        </div>
                      </div>
                      <p className="text-[11px] text-[var(--text-secondary)] leading-tight pt-1">
                        {member.bio}
                      </p>
                    </div>
                  ))}
                </div>
              </Card>

              {/* Software Licenses */}
              <Card className="p-6 space-y-3">
                <h3 className="text-sm font-bold font-heading text-[var(--text-primary)]">
                  Open Source & Software Licenses
                </h3>
                <div className="space-y-1.5 text-xs font-mono text-[var(--text-secondary)]">
                  {systemAboutData.licenses.map((lic, idx) => (
                    <div key={idx} className="p-2 rounded bg-[var(--bg-app)] border border-[var(--border-color)]/60">
                      ✓ {lic}
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          )}

        </div>
      </div>

      {/* Contact Support Modal */}
      {showContactModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-lg bg-[var(--bg-surface)] border border-[var(--border-color)] rounded-2xl p-6 space-y-4 shadow-craft-lg text-[var(--text-primary)]">
            <div className="flex items-center justify-between pb-3 border-b border-[var(--border-color)]">
              <div className="flex items-center space-x-2 text-[var(--accent)]">
                <MessageSquare className="w-5 h-5" />
                <h3 className="text-base font-bold font-heading">Contact Candidate Support</h3>
              </div>
              <button onClick={() => setShowContactModal(false)} className="p-1 rounded-lg text-[var(--text-secondary)] hover:text-[var(--text-primary)]">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3 text-xs font-mono">
              <div>
                <label className="block text-[var(--text-secondary)] mb-1">Subject</label>
                <input type="text" placeholder="e.g. Issue with System Design rubric evaluation" className="w-full p-2.5 bg-[var(--bg-app)] border border-[var(--border-color)] rounded-xl text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent)]" />
              </div>
              <div>
                <label className="block text-[var(--text-secondary)] mb-1">Message Description</label>
                <textarea rows={4} placeholder="Describe your question or issue in detail..." className="w-full p-2.5 bg-[var(--bg-app)] border border-[var(--border-color)] rounded-xl text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent)]" />
              </div>
            </div>

            <div className="flex items-center justify-end space-x-3 pt-2">
              <Button variant="ghost" size="sm" onClick={() => setShowContactModal(false)}>Cancel</Button>
              <Button variant="accent" size="sm" onClick={() => { alert("Support ticket dispatched. Ticket ID: #ASC-88391"); setShowContactModal(false); }}>Submit Ticket</Button>
            </div>
          </div>
        </div>
      )}

      {/* Report Bug Modal */}
      {showBugModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-lg bg-[var(--bg-surface)] border border-[var(--border-color)] rounded-2xl p-6 space-y-4 shadow-craft-lg text-[var(--text-primary)]">
            <div className="flex items-center justify-between pb-3 border-b border-[var(--border-color)]">
              <div className="flex items-center space-x-2 text-[var(--error)]">
                <Bug className="w-5 h-5" />
                <h3 className="text-base font-bold font-heading">Report a System Bug</h3>
              </div>
              <button onClick={() => setShowBugModal(false)} className="p-1 rounded-lg text-[var(--text-secondary)] hover:text-[var(--text-primary)]">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3 text-xs font-mono">
              <div>
                <label className="block text-[var(--text-secondary)] mb-1">Bug Summary</label>
                <input type="text" placeholder="e.g. Timer miscalculation during 30m mock loop" className="w-full p-2.5 bg-[var(--bg-app)] border border-[var(--border-color)] rounded-xl text-[var(--text-primary)] focus:outline-none focus:border-[var(--error)]" />
              </div>
              <div>
                <label className="block text-[var(--text-secondary)] mb-1">Steps to Reproduce</label>
                <textarea rows={3} placeholder="1. Open mock simulator..." className="w-full p-2.5 bg-[var(--bg-app)] border border-[var(--border-color)] rounded-xl text-[var(--text-primary)] focus:outline-none focus:border-[var(--error)]" />
              </div>
            </div>

            <div className="flex items-center justify-end space-x-3 pt-2">
              <Button variant="ghost" size="sm" onClick={() => setShowBugModal(false)}>Cancel</Button>
              <Button variant="accent" size="sm" className="bg-[var(--error)] text-white hover:bg-[var(--error)]/90 border-transparent" onClick={() => { alert("Bug report submitted to Engineering triage. Thank you!"); setShowBugModal(false); }}>Submit Bug Report</Button>
            </div>
          </div>
        </div>
      )}

      {/* Legal Drawer Modal */}
      {showLegalModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-xl bg-[var(--bg-surface)] border border-[var(--border-color)] rounded-2xl p-6 space-y-4 shadow-craft-lg text-[var(--text-primary)]">
            <div className="flex items-center justify-between pb-3 border-b border-[var(--border-color)]">
              <h3 className="text-base font-bold font-heading capitalize">{showLegalModal === "privacy" ? "Privacy Policy" : "Terms of Service"}</h3>
              <button onClick={() => setShowLegalModal(null)} className="p-1 rounded-lg text-[var(--text-secondary)] hover:text-[var(--text-primary)]">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="max-h-80 overflow-y-auto space-y-3 text-xs text-[var(--text-secondary)] leading-relaxed font-body pr-2">
              <p>All candidate transcript data, code submissions, and performance benchmarks are processed with strict isolation. ASCEND AI does not train public models on user private interview transcripts.</p>
              <p>For enterprise and candidate privacy inquiries, contact compliance@ascend.ai.</p>
            </div>

            <div className="flex justify-end pt-2">
              <Button variant="outline" size="sm" onClick={() => setShowLegalModal(null)}>Close Document</Button>
            </div>
          </div>
        </div>
      )}

    </PageTransition>
  );
};
