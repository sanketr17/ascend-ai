import React, { useState, useEffect } from "react";
import { AnimatePresence, motion } from "motion/react";
import { 
  Search, 
  Target, 
  BrainCircuit, 
  Zap, 
  FileText, 
  BarChart3, 
  RotateCcw,
  Sparkles,
  ArrowRight,
  X
} from "lucide-react";

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectAction: (tabName: string) => void;
  onOpenProfileModal: () => void;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({
  isOpen,
  onClose,
  onSelectAction,
  onOpenProfileModal,
}) => {
  const [query, setQuery] = useState("");

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        if (isOpen) onClose();
      }
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  const actions = [
    {
      id: "action-sim",
      title: "Launch Adaptive Interview Simulator",
      description: "Practice technical system architecture, coding or behavioral STAR questions with real AI feedback",
      icon: BrainCircuit,
      tab: "interview",
      shortcut: "↵"
    },
    {
      id: "action-cards",
      title: "Spaced Repetition Memory Deck",
      description: "Review active recall flashcards queued for today based on memory decay curves",
      icon: RotateCcw,
      tab: "flashcards",
      shortcut: "⌘2"
    },
    {
      id: "action-skills",
      title: "Explore Skill Graph & AI Micro-Lessons",
      description: "Interactive technical taxonomy with code blueprints and conceptual deep-dives",
      icon: Zap,
      tab: "skillgraph",
      shortcut: "⌘3"
    },
    {
      id: "action-resume",
      title: "AI Resume & JD Match Optimizer",
      description: "Analyze candidate alignment, detect skill gaps, and rewrite bullet points for high impact",
      icon: FileText,
      tab: "resume",
      shortcut: "⌘4"
    },
    {
      id: "action-analytics",
      title: "Performance Analytics & Weakness Breakdown",
      description: "Review score trends, benchmark percentiles vs Tier-1 applicants, and weakness matrices",
      icon: BarChart3,
      tab: "analytics",
      shortcut: "⌘5"
    },
    {
      id: "action-settings",
      title: "Account & System Settings",
      description: "Manage appearance, notifications, security 2FA, learning preferences, & help",
      icon: Target,
      tab: "profile",
      shortcut: "⌘S"
    },
    {
      id: "action-profile",
      title: "Quick Target Role & Tier Adjuster",
      description: "Customize your candidate profile baseline, target interview date, and weekly goal hours",
      icon: Target,
      action: () => {
        onOpenProfileModal();
        onClose();
      },
      shortcut: "⌘P"
    }
  ];

  const filteredActions = actions.filter(
    (a) =>
      a.title.toLowerCase().includes(query.toLowerCase()) ||
      a.description.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18 }}
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-start justify-center pt-20 p-4"
          onClick={onClose}
        >
          <motion.div 
            initial={{ scale: 0.95, opacity: 0, y: -10 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: -10 }}
            transition={{ type: "spring", stiffness: 400, damping: 28 }}
            className="w-full max-w-2xl bg-[var(--bg-surface)] border border-[var(--border-color)] rounded-2xl shadow-craft-lg overflow-hidden text-[var(--text-primary)]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Search Header */}
            <div className="relative border-b border-[var(--border-color)] flex items-center px-4">
              <motion.div
                animate={{ scale: query ? 1.1 : 1 }}
                transition={{ duration: 0.15 }}
              >
                <Search className="w-4 h-4 text-[var(--accent)] mr-3 shrink-0" />
              </motion.div>
              <input
                type="text"
                autoFocus
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Type a command or search platform features..."
                className="w-full py-4 text-xs bg-transparent text-[var(--text-primary)] placeholder-[var(--text-secondary)] focus:outline-none font-body"
              />
              
              <AnimatePresence>
                {query && (
                  <motion.button
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    onClick={() => setQuery("")}
                    className="p-1 mr-1 text-[10px] font-mono rounded bg-[var(--bg-app)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                  >
                    Clear
                  </motion.button>
                )}
              </AnimatePresence>

              <motion.button 
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={onClose}
                className="p-1.5 rounded-lg text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-hover)]"
              >
                <X className="w-4 h-4" />
              </motion.button>
            </div>

            {/* Action List */}
            <div className="max-h-80 overflow-y-auto p-2 space-y-1">
              {filteredActions.length === 0 ? (
                <div className="py-8 text-center text-xs text-[var(--text-secondary)] font-mono">
                  No matching commands found.
                </div>
              ) : (
                filteredActions.map((item) => {
                  const Icon = item.icon;
                  return (
                    <motion.button
                      key={item.id}
                      whileHover={{ x: 3, backgroundColor: "var(--bg-hover)" }}
                      whileTap={{ scale: 0.99 }}
                      transition={{ duration: 0.12 }}
                      onClick={() => {
                        if (item.action) {
                          item.action();
                        } else if (item.tab) {
                          onSelectAction(item.tab);
                          onClose();
                        }
                      }}
                      className="w-full flex items-center justify-between p-3 rounded-xl text-left group transition-colors"
                    >
                      <div className="flex items-center space-x-3">
                        <div className="p-2 rounded-lg bg-[var(--bg-app)] text-[var(--secondary-accent)] group-hover:bg-[var(--btn-primary-bg)] group-hover:text-[var(--btn-primary-text)] transition-colors">
                          <Icon className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="text-xs font-semibold text-[var(--text-primary)] flex items-center space-x-2 font-heading">
                            <span>{item.title}</span>
                          </div>
                          <div className="text-[11px] text-[var(--text-secondary)] line-clamp-1">
                            {item.description}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <kbd className="text-[10px] bg-[var(--bg-surface)] text-[var(--text-secondary)] px-2 py-0.5 rounded-md border border-[var(--border-color)] font-mono shadow-xs">
                          {item.shortcut}
                        </kbd>
                        <ArrowRight className="w-3.5 h-3.5 text-[var(--accent)] opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                    </motion.button>
                  );
                })
              )}
            </div>

            {/* Footer */}
            <div className="px-4 py-3 bg-[var(--bg-app)] border-t border-[var(--border-color)] text-[11px] text-[var(--text-secondary)] flex items-center justify-between font-mono">
              <div className="flex items-center space-x-3">
                <span>↑↓ Navigate</span>
                <span>↵ Select</span>
                <span>ESC Close</span>
              </div>
              <div className="flex items-center space-x-1.5">
                <Sparkles className="w-3 h-3 text-[var(--accent)]" />
                <span>ASCEND AI Intelligence Engine</span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
