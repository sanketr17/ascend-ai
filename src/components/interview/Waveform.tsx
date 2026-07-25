import React from "react";
import { motion, useReducedMotion } from "motion/react";

interface WaveformProps {
  isRecording: boolean;
  barCount?: number;
  className?: string;
}

export const Waveform: React.FC<WaveformProps> = ({ isRecording, barCount = 20, className = "" }) => {
  const bars = Array.from({ length: barCount }, (_, i) => i);
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className={`flex items-center justify-center space-x-1.5 h-12 ${className}`}>
      {bars.map((i) => {
        // Natural mathematical sine wave envelope
        const normalizedIndex = i / (barCount - 1);
        const centerFactor = Math.sin(normalizedIndex * Math.PI);
        const baseHeightPx = centerFactor * 26 + 6;

        return (
          <motion.div
            key={i}
            className={`w-1 rounded-full transition-colors duration-300 ${
              isRecording ? "bg-[var(--accent)]" : "bg-[var(--border-color)]"
            }`}
            animate={
              isRecording && !shouldReduceMotion
                ? {
                    height: [
                      `${Math.max(6, baseHeightPx * 0.35)}px`,
                      `${Math.max(10, baseHeightPx * 1.15)}px`,
                      `${Math.max(6, baseHeightPx * 0.45)}px`,
                    ],
                    opacity: [0.7, 1, 0.7],
                  }
                : {
                    height: `${Math.max(6, baseHeightPx * 0.3)}px`,
                    opacity: 0.35,
                  }
            }
            transition={
              isRecording && !shouldReduceMotion
                ? {
                    repeat: Infinity,
                    repeatType: "mirror",
                    duration: 0.5 + (i % 4) * 0.1,
                    ease: "easeInOut",
                  }
                : { duration: 0.3 }
            }
          />
        );
      })}
    </div>
  );
};
