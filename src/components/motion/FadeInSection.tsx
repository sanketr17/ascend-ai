import React from "react";
import { motion, useReducedMotion } from "motion/react";

interface FadeInSectionProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  yOffset?: number;
  once?: boolean;
}

export const FadeInSection: React.FC<FadeInSectionProps> = ({
  children,
  className = "",
  delay = 0,
  duration = 0.35,
  yOffset = 30,
  once = true,
}) => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={{
        opacity: 0,
        y: shouldReduceMotion ? 0 : yOffset,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
      }}
      viewport={{ once, margin: "-30px" }}
      transition={{
        duration,
        delay,
        ease: [0.16, 1, 0.3, 1], // cubic-bezier easeOut
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export const ScrollReveal = FadeInSection;
