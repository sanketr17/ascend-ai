import React, { useState, useEffect } from "react";
import { motion } from "motion/react";
import { UserProfile } from "../types";
import { ThemeToggle } from "./ThemeToggle";
import { 
  Command, 
  TrendingUp, 
  Target, 
  Flame,
  ChevronRight
} from "lucide-react";

interface NavigationHeaderProps {
  userProfile: UserProfile;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onOpenCommandPalette: () => void;
  onOpenProfileModal: () => void;
  darkMode?: boolean;
  setDarkMode?: (val: boolean | ((prev: boolean) => boolean)) => void;
}

export const NavigationHeader: React.FC<NavigationHeaderProps> = ({
  userProfile,
  setActiveTab,
  onOpenCommandPalette,
  onOpenProfileModal,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-40 w-full border-b transition-all duration-300 ${
        isScrolled
          ? "border-[var(--border-color)] bg-[var(--bg-surface)]/90 backdrop-blur-md shadow-md"
          : "border-[var(--border-color)]/60 bg-[var(--bg-surface)]/95 backdrop-blur-sm shadow-xs"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Left: Brand Identity & Version */}
          <div className="flex items-center space-x-6">
            <motion.div 
              onClick={() => setActiveTab("dashboard")}
              className="flex items-center space-x-3 cursor-pointer group"
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
            >
              <motion.div 
                whileHover={{ rotate: 90 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="w-8 h-8 rounded-xl bg-[var(--btn-primary-bg)] text-[var(--btn-primary-text)] flex items-center justify-center font-bold text-xs tracking-wider shadow-sm group-hover:bg-[var(--accent)] transition-colors"
              >
                ▲
              </motion.div>
              <div>
                <div className="flex items-center space-x-2">
                  <span className="font-bold text-[var(--text-primary)] text-base tracking-tight font-heading">
                    ASCEND
                  </span>
                  <span className="text-[10px] px-1.5 py-0.5 rounded font-mono font-medium bg-[var(--bg-app)] text-[var(--secondary-accent)] border border-[var(--border-color)]">
                    v2.4 AI
                  </span>
                </div>
                <div className="text-[10px] text-[var(--text-secondary)] font-mono tracking-wider uppercase">
                  Adaptive Intelligence
                </div>
              </div>
            </motion.div>

            <div className="hidden md:block h-5 w-[1px] bg-[var(--border-color)]" />

            {/* Target Role & Tier Pill */}
            <motion.button
              onClick={onOpenProfileModal}
              whileHover={{ scale: 1.02, y: -1 }}
              whileTap={{ scale: 0.98 }}
              className="hidden lg:flex items-center space-x-2 text-xs text-[var(--text-primary)] bg-[var(--bg-app)] hover:bg-[var(--bg-hover)] px-3 py-1.5 rounded-xl border border-[var(--border-color)] transition-colors"
            >
              <Target className="w-3.5 h-3.5 text-[var(--accent)]" />
              <span className="font-medium text-[var(--text-primary)]">
                {userProfile.targetRole}
              </span>
              <span className="text-[var(--border-color)]">•</span>
              <span className="text-[var(--secondary-accent)] font-mono text-[11px]">
                {userProfile.companyTier.split("(")[0].trim()}
              </span>
              <ChevronRight className="w-3 h-3 text-[var(--text-secondary)]" />
            </motion.button>
          </div>

          {/* Center/Right Actions: Readiness Pill, Command Bar, Controls */}
          <div className="flex items-center space-x-2.5 sm:space-x-3">
            
            {/* Readiness Badge */}
            <motion.div 
              whileHover={{ scale: 1.03 }}
              className="hidden sm:flex items-center space-x-2 bg-[var(--success)]/10 text-[var(--success)] border border-[var(--success)]/20 px-3 py-1 rounded-xl text-xs font-medium"
            >
              <TrendingUp className="w-3.5 h-3.5" />
              <span className="text-[var(--secondary-accent)]">Readiness:</span>
              <span className="font-bold font-mono text-[var(--success)]">{userProfile.readinessScore}/100</span>
            </motion.div>

            {/* Streak Counter */}
            <motion.div 
              whileHover={{ scale: 1.03 }}
              className="hidden sm:flex items-center space-x-1.5 text-[var(--accent)] bg-[var(--accent)]/10 border border-[var(--accent)]/20 px-2.5 py-1 rounded-xl text-xs font-medium"
            >
              <Flame className="w-3.5 h-3.5 fill-[var(--accent)] text-[var(--accent)]" />
              <span className="font-mono font-bold">{userProfile.currentStreakDays}d streak</span>
            </motion.div>

            {/* Command Button */}
            <motion.button
              onClick={onOpenCommandPalette}
              whileHover={{ scale: 1.02, y: -1 }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center space-x-2 text-xs text-[var(--text-secondary)] bg-[var(--bg-app)] hover:bg-[var(--bg-hover)] px-3 py-1.5 rounded-xl border border-[var(--border-color)] transition-colors"
            >
              <Command className="w-3.5 h-3.5 text-[var(--text-secondary)]" />
              <span className="hidden md:inline font-medium text-[var(--text-primary)]">Commands</span>
              <kbd className="hidden md:inline-block text-[10px] bg-[var(--bg-surface)] border border-[var(--border-color)] rounded px-1.5 py-0.5 text-[var(--text-secondary)] font-mono shadow-xs">
                ⌘K
              </kbd>
            </motion.button>

            {/* Premium Theme Switcher Segmented Control */}
            <ThemeToggle />

            {/* Profile Avatar Button */}
            <motion.button
              onClick={() => setActiveTab("profile")}
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.95 }}
              className="w-8 h-8 rounded-full bg-[var(--btn-primary-bg)] text-[var(--btn-primary-text)] border border-[var(--border-color)] font-bold text-xs flex items-center justify-center shadow-xs hover:ring-2 hover:ring-[var(--accent)] transition-all font-mono shrink-0"
              title="Open Profile & Settings"
            >
              {userProfile.name.split(" ").map(n => n[0]).join("")}
            </motion.button>

          </div>
        </div>
      </div>
    </header>
  );
};
