import React from "react";
import { motion, useReducedMotion } from "motion/react";
import { Sparkles } from "lucide-react";

interface XPAnimationProps {
  amount: number;
  label?: string;
  className?: string;
  onAnimationComplete?: () => void;
}

export const XPAnimation: React.FC<XPAnimationProps> = ({
  amount,
  label = "XP",
  className = "",
  onAnimationComplete,
}) => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 12, scale: 0.9 }}
      animate={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: -20, scale: 1.05 }}
      exit={{ opacity: 0, y: -32 }}
      transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
      onAnimationComplete={onAnimationComplete}
      className={`inline-flex items-center space-x-1 px-2.5 py-1 rounded-full bg-[var(--accent)]/15 text-[var(--accent)] border border-[var(--accent)]/30 font-mono text-xs font-bold shadow-craft-md backdrop-blur-xs pointer-events-none ${className}`}
    >
      <Sparkles className="w-3.5 h-3.5 text-[var(--accent)]" />
      <span>+{amount} {label}</span>
    </motion.div>
  );
};
