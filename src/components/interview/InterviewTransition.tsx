import React, { useEffect, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { BrainCircuit, Sparkles, CheckCircle2, ShieldCheck, Zap } from "lucide-react";

interface InterviewTransitionProps {
  onComplete: () => void;
  jobRole?: string;
  type?: string;
}

export const InterviewTransition: React.FC<InterviewTransitionProps> = ({
  onComplete,
  jobRole = "Senior Full-Stack Engineer",
  type = "Technical",
}) => {
  const [currentStep, setCurrentStep] = useState(0);
  const shouldReduceMotion = useReducedMotion();

  const steps = [
    { label: "Preparing Interview Environment...", icon: BrainCircuit },
    { label: "Calibrating Candidate Profile & Target Role...", icon: ShieldCheck },
    { label: "Generating Adaptive Scenarios & Question Pool...", icon: Sparkles },
    { label: "Ready to Launch Simulation", icon: CheckCircle2 },
  ];

  useEffect(() => {
    if (shouldReduceMotion) {
      onComplete();
      return;
    }

    const interval = setInterval(() => {
      setCurrentStep((prev) => {
        if (prev < steps.length - 1) {
          return prev + 1;
        } else {
          clearInterval(interval);
          setTimeout(onComplete, 600);
          return prev;
        }
      });
    }, 800);

    return () => clearInterval(interval);
  }, [shouldReduceMotion, steps.length, onComplete]);

  const progressPercent = Math.min(100, Math.round(((currentStep + 1) / steps.length) * 100));

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-[var(--bg-app)]/95 backdrop-blur-md p-6"
    >
      <div className="max-w-md w-full bg-[var(--bg-surface)] border border-[var(--border-color)] rounded-2xl p-8 shadow-craft-lg text-center space-y-6 relative overflow-hidden">
        {/* Soft background ambient glow */}
        <div className="absolute -top-20 -right-20 w-48 h-48 bg-[var(--accent)]/10 rounded-full blur-3xl pointer-events-none" />

        {/* Center Animated Icon Badge */}
        <div className="relative inline-flex items-center justify-center">
          <motion.div
            className="absolute inset-0 rounded-full bg-[var(--accent)]/20"
            animate={{ scale: [1, 1.3, 1], opacity: [0.5, 0.1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
          <div className="relative z-10 w-16 h-16 rounded-full bg-[var(--accent)]/15 text-[var(--accent)] border border-[var(--accent)]/30 flex items-center justify-center">
            <Zap className="w-8 h-8 text-[var(--accent)] animate-pulse" />
          </div>
        </div>

        {/* Title */}
        <div className="space-y-1">
          <div className="text-xs font-mono font-bold uppercase tracking-wider text-[var(--accent)]">
            ASCEND AI Simulator Engine
          </div>
          <h3 className="text-lg font-bold font-heading text-[var(--text-primary)]">
            Launching {type} Drill
          </h3>
          <p className="text-xs text-[var(--text-secondary)] font-mono">
            Targeting {jobRole}
          </p>
        </div>

        {/* Dynamic Step Text */}
        <div className="h-10 flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              className="flex items-center space-x-2 text-xs font-mono font-semibold text-[var(--text-primary)]"
            >
              {React.createElement(steps[currentStep].icon, { className: "w-4 h-4 text-[var(--accent)]" })}
              <span>{steps[currentStep].label}</span>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Animated Progress Bar */}
        <div className="space-y-2">
          <div className="w-full h-2 bg-[var(--bg-app)] border border-[var(--border-color)] rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-[var(--accent)] rounded-full"
              initial={{ width: "0%" }}
              animate={{ width: `${progressPercent}%` }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
            />
          </div>
          <div className="flex justify-between text-[10px] font-mono text-[var(--text-secondary)]">
            <span>Progress</span>
            <span>{progressPercent}%</span>
          </div>
        </div>

      </div>
    </motion.div>
  );
};
