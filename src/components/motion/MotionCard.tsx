import React from "react";
import { motion, useReducedMotion, HTMLMotionProps } from "motion/react";

interface MotionCardProps extends HTMLMotionProps<"div"> {
  children: React.ReactNode;
  className?: string;
  hoverEffect?: boolean;
}

export const MotionCard: React.FC<MotionCardProps> = ({
  children,
  className = "",
  hoverEffect = true,
  ...props
}) => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      whileHover={
        hoverEffect && !shouldReduceMotion
          ? { y: -5, transition: { duration: 0.18, ease: "easeOut" } }
          : undefined
      }
      transition={{ duration: 0.2 }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
};
