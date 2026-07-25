import React from "react";
import { motion, useReducedMotion } from "motion/react";

interface TabTransitionProps {
  children: React.ReactNode;
  activeKey: string;
  className?: string;
}

export const TabTransition: React.FC<TabTransitionProps> = ({
  children,
  activeKey,
  className = "",
}) => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      key={activeKey}
      initial={{
        opacity: 0,
        x: shouldReduceMotion ? 0 : 6,
      }}
      animate={{
        opacity: 1,
        x: 0,
      }}
      exit={{
        opacity: 0,
        x: shouldReduceMotion ? 0 : -6,
      }}
      transition={{
        duration: 0.2,
        ease: "easeOut",
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};
