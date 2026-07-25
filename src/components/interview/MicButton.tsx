import React from "react";
import { motion, useReducedMotion } from "motion/react";
import { Mic, Square } from "lucide-react";

interface MicButtonProps {
  isRecording: boolean;
  onToggle: () => void;
  disabled?: boolean;
  className?: string;
}

export const MicButton: React.FC<MicButtonProps> = ({
  isRecording,
  onToggle,
  disabled = false,
  className = "",
}) => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className={`relative flex items-center justify-center ${className}`}>
      {/* Outer Glow & Breathing / Pulse Rings */}
      {!shouldReduceMotion && (
        <>
          {isRecording ? (
            <>
              {/* Active Recording Soft Pulse Glow */}
              <motion.div
                className="absolute inset-0 rounded-full bg-[var(--error)]/20 border border-[var(--error)]/40"
                animate={{ scale: [1, 1.35, 1], opacity: [0.7, 0.15, 0.7] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              />
              <motion.div
                className="absolute inset-0 rounded-full bg-[var(--error)]/10"
                animate={{ scale: [1, 1.2, 1], opacity: [0.8, 0.3, 0.8] }}
                transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut", delay: 0.2 }}
              />
            </>
          ) : (
            /* Idle Soft Breathing Glow */
            <motion.div
              className="absolute inset-0 rounded-full bg-[var(--accent)]/10 border border-[var(--accent)]/20"
              animate={{ scale: [1, 1.12, 1], opacity: [0.4, 0.8, 0.4] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            />
          )}
        </>
      )}

      {/* Main Interactive Button */}
      <motion.button
        whileHover={disabled ? {} : { scale: 1.06 }}
        whileTap={disabled ? {} : { scale: 0.94 }}
        onClick={onToggle}
        disabled={disabled}
        aria-label={isRecording ? "Stop recording voice" : "Start recording voice"}
        className={`relative z-10 w-20 h-20 rounded-full flex items-center justify-center shadow-craft-lg transition-colors border ${
          isRecording
            ? "bg-[var(--error)] text-[#FFFCF8] border-[var(--error)]"
            : "bg-[var(--btn-primary-bg)] text-[var(--btn-primary-text)] border-[var(--border-color)] hover:border-[var(--accent)] hover:text-[var(--accent)]"
        } ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
      >
        {isRecording ? (
          <Square className="w-7 h-7 fill-current" />
        ) : (
          <Mic className="w-8 h-8" />
        )}
      </motion.button>
    </div>
  );
};
