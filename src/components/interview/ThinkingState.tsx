import React from "react";
import { motion, useReducedMotion } from "motion/react";
import { BrainCircuit, Sparkles, ShieldCheck } from "lucide-react";

interface ThinkingStateProps {
  message?: string;
  className?: string;
}

export const ThinkingState: React.FC<ThinkingStateProps> = ({
  message = "ARIA is analyzing your response...",
  className = "",
}) => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className={`p-8 bg-[var(--bg-surface)] border border-[var(--border-color)] rounded-2xl shadow-craft text-center space-y-6 max-w-lg mx-auto ${className}`}>
      
      {/* Pulsing AI Circle */}
      <div className="relative inline-flex items-center justify-center">
        {!shouldReduceMotion && (
          <motion.div
            className="absolute inset-0 rounded-full bg-[var(--accent)]/20 border border-[var(--accent)]/40"
            animate={{ scale: [1, 1.4, 1], opacity: [0.6, 0.2, 0.6] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
        )}
        <div className="relative z-10 w-16 h-16 rounded-full bg-[var(--accent)]/15 text-[var(--accent)] border border-[var(--accent)]/30 flex items-center justify-center">
          <BrainCircuit className="w-8 h-8 text-[var(--accent)] animate-pulse" />
        </div>
      </div>

      {/* Message and Subtitle */}
      <div className="space-y-1.5">
        <h3 className="text-sm font-bold font-mono text-[var(--text-primary)] tracking-wide flex items-center justify-center space-x-2">
          <span>{message}</span>
        </h3>
        <p className="text-xs text-[var(--text-secondary)] font-body leading-relaxed">
          Evaluating technical depth, communication clarity, and STAR leadership indicators against Tier-1 benchmarks.
        </p>
      </div>

      {/* Waveform / Progress Dots */}
      <div className="flex items-center justify-center space-x-1.5">
        {[0, 1, 2, 3, 4].map((i) => (
          <motion.div
            key={i}
            className="w-2 h-2 rounded-full bg-[var(--accent)]"
            animate={
              shouldReduceMotion
                ? {}
                : {
                    scale: [0.8, 1.4, 0.8],
                    opacity: [0.4, 1, 0.4],
                  }
            }
            transition={{
              duration: 1,
              repeat: Infinity,
              delay: i * 0.15,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      <div className="text-[11px] font-mono text-[var(--text-secondary)] flex items-center justify-center space-x-1">
        <Sparkles className="w-3 h-3 text-[var(--accent)]" />
        <span>Calibrating candidate committee score...</span>
      </div>

    </div>
  );
};
