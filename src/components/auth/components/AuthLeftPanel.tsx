import React from "react";
import { motion, useReducedMotion } from "motion/react";
import { CheckCircle2, Sparkles, BrainCircuit, Target, TrendingUp } from "lucide-react";

export const AuthLeftPanel: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();

  const features = [
    "AI Mock Interviews with Real-time Speech Analysis",
    "Personalized Adaptive Learning Paths & Skill Graphs",
    "Career Readiness & Company Tier Match Analytics",
  ];

  return (
    <div className="relative w-full h-full flex flex-col justify-between p-8 xl:p-12 bg-gradient-to-br from-[var(--bg-surface)] via-[var(--bg-app)] to-[var(--bg-surface)] border-r border-[var(--border-color)] overflow-hidden select-none">
      
      {/* Background Floating Decorative Shapes */}
      {!shouldReduceMotion && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {/* Subtle Orb 1 */}
          <motion.div
            animate={{
              y: [0, -15, 0],
              x: [0, 10, 0],
              opacity: [0.12, 0.2, 0.12],
            }}
            transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -top-12 -left-12 w-96 h-96 rounded-full bg-[var(--accent)]/20 blur-3xl"
          />

          {/* Subtle Orb 2 */}
          <motion.div
            animate={{
              y: [0, 20, 0],
              x: [0, -15, 0],
              opacity: [0.1, 0.18, 0.1],
            }}
            transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
            className="absolute bottom-10 right-0 w-80 h-80 rounded-full bg-[var(--secondary-accent)]/15 blur-3xl"
          />

          {/* Abstract Grid Lines */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,var(--border-color)_1px,transparent_1px),linear-gradient(to_bottom,var(--border-color)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-20" />
        </div>
      )}

      {/* Top Header: Logo & Tagline */}
      <div className="relative z-10 space-y-2">
        <div className="flex items-center space-x-3">
          <div className="w-9 h-9 rounded-xl bg-[var(--btn-primary-bg)] text-[var(--btn-primary-text)] flex items-center justify-center font-bold text-sm tracking-wider shadow-sm border border-[var(--border-color)]">
            ▲
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="font-extrabold text-[var(--text-primary)] text-lg tracking-tight font-heading">
                ASCEND AI
              </span>
              <span className="text-[10px] px-2 py-0.5 rounded font-mono font-bold bg-[var(--accent)]/15 text-[var(--accent)] border border-[var(--accent)]/30 uppercase">
                v2.4
              </span>
            </div>
            <div className="text-[11px] font-mono text-[var(--text-secondary)] tracking-wider">
              "Learn. Speak. Improve. Repeat."
            </div>
          </div>
        </div>
      </div>

      {/* Middle Hero Area: Heading, Highlights & ARIA Glass Card */}
      <div className="relative z-10 space-y-8 my-auto py-8">
        
        <div className="space-y-4">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[var(--accent)]/10 border border-[var(--accent)]/20 text-[var(--accent)] text-xs font-mono"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>AI-Driven Career Readiness Platform</span>
          </motion.div>

          <h1 className="text-3xl xl:text-4xl font-extrabold font-heading text-[var(--text-primary)] tracking-tight leading-[1.15]">
            Your AI Partner for Career Growth.
          </h1>

          <p className="text-xs sm:text-sm font-body text-[var(--text-secondary)] leading-relaxed max-w-lg">
            Master high-stakes technical interviews, system design trade-offs, and computer science fundamentals with adaptive voice simulations and tailored analytics.
          </p>
        </div>

        {/* Feature Bullet List */}
        <div className="space-y-3">
          {features.map((feat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.1 * idx }}
              className="flex items-center space-x-3 text-xs font-mono text-[var(--text-primary)]"
            >
              <div className="w-5 h-5 rounded-full bg-[var(--success)]/15 text-[var(--success)] flex items-center justify-center shrink-0 border border-[var(--success)]/30">
                <CheckCircle2 className="w-3.5 h-3.5" />
              </div>
              <span>{feat}</span>
            </motion.div>
          ))}
        </div>

        {/* Glass Card introducing ARIA */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="p-5 rounded-2xl bg-[var(--bg-surface)]/80 backdrop-blur-md border border-[var(--border-color)] shadow-craft space-y-3 relative overflow-hidden group hover:border-[var(--accent)]/50 transition-colors"
        >
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[var(--accent)] to-[var(--secondary-accent)] text-[var(--bg-app)] flex items-center justify-center font-bold shadow-xs shrink-0">
              <BrainCircuit className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-bold text-xs font-heading text-[var(--text-primary)]">
                  ARIA
                </span>
                <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-[var(--accent)]/15 text-[var(--accent)]">
                  AI Coach
                </span>
              </div>
              <div className="text-[10px] font-mono text-[var(--text-secondary)]">
                Adaptive Response Intelligence Assistant
              </div>
            </div>
          </div>

          <p className="text-xs font-body italic text-[var(--text-primary)] leading-relaxed pl-2 border-l-2 border-[var(--accent)]">
            "I'll help you become interview-ready with personalized feedback, speech telemetry, and adaptive learning paths."
          </p>
        </motion.div>

      </div>

      {/* Bottom Minimal Statistics */}
      <div className="relative z-10 pt-6 border-t border-[var(--border-color)]/60 grid grid-cols-3 gap-4">
        <div>
          <div className="text-xl xl:text-2xl font-extrabold font-numbers text-[var(--text-primary)] tracking-tight">
            10K+
          </div>
          <div className="text-[10px] font-mono text-[var(--text-secondary)] uppercase tracking-wider">
            Interview Sessions
          </div>
        </div>

        <div>
          <div className="text-xl xl:text-2xl font-extrabold font-numbers text-[var(--success)] tracking-tight">
            95%
          </div>
          <div className="text-[10px] font-mono text-[var(--text-secondary)] uppercase tracking-wider">
            Satisfaction Rate
          </div>
        </div>

        <div>
          <div className="text-xl xl:text-2xl font-extrabold font-numbers text-[var(--text-primary)] tracking-tight">
            500+
          </div>
          <div className="text-[10px] font-mono text-[var(--text-secondary)] uppercase tracking-wider">
            Study Modules
          </div>
        </div>
      </div>

    </div>
  );
};
