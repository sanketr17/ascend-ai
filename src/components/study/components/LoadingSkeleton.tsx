import React from "react";

interface LoadingSkeletonProps {
  count?: number;
  className?: string;
}

export const LoadingSkeleton: React.FC<LoadingSkeletonProps> = ({
  count = 3,
  className = "",
}) => {
  return (
    <div className={`space-y-4 ${className}`}>
      {Array.from({ length: count }).map((_, idx) => (
        <div
          key={idx}
          className="p-6 bg-[var(--bg-surface)] border border-[var(--border-color)] rounded-2xl animate-pulse space-y-4"
        >
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-[var(--bg-app)]" />
            <div className="space-y-2 flex-1">
              <div className="h-4 w-1/3 bg-[var(--bg-app)] rounded-md" />
              <div className="h-3 w-1/2 bg-[var(--bg-app)] rounded-md" />
            </div>
          </div>
          <div className="h-2 w-full bg-[var(--bg-app)] rounded-full" />
          <div className="flex justify-between items-center pt-2">
            <div className="h-3 w-20 bg-[var(--bg-app)] rounded-md" />
            <div className="h-8 w-24 bg-[var(--bg-app)] rounded-xl" />
          </div>
        </div>
      ))}
    </div>
  );
};
