import React from "react";
import { motion, useReducedMotion, HTMLMotionProps } from "motion/react";

interface MotionButtonProps extends HTMLMotionProps<"button"> {
  children: React.ReactNode;
  className?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

export const MotionButton: React.FC<MotionButtonProps> = ({
  children,
  className = "",
  onClick,
  ...props
}) => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.button
      whileHover={
        !shouldReduceMotion
          ? { scale: 1.02, filter: "brightness(1.04)", transition: { duration: 0.12, ease: "easeOut" } }
          : undefined
      }
      whileTap={
        !shouldReduceMotion
          ? { scale: 0.98, transition: { duration: 0.1, ease: "easeOut" } }
          : undefined
      }
      onClick={onClick}
      className={className}
      {...props}
    >
      {children}
    </motion.button>
  );
};
