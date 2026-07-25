import React from "react";

interface SkeletonStudyProps {
  layout?: "home" | "roadmap" | "flashcards" | "quiz" | "resources" | "analytics" | "progress";
  count?: number;
  className?: string;
}

export const SkeletonStudy: React.FC<SkeletonStudyProps> = ({
  layout = "home",
  count = 3,
  className = "",
}) => {
  if (layout === "flashcards") {
    return (
      <div className={`max-w-2xl mx-auto space-y-6 animate-pulse ${className}`}>
        {/* Top Control Bar Skeleton */}
        <div className="h-16 bg-[var(--bg-surface)] border border-[var(--border-color)] rounded-2xl p-4 flex items-center justify-between">
          <div className="h-5 w-32 bg-[var(--bg-app)] rounded-md" />
          <div className="h-5 w-24 bg-[var(--bg-app)] rounded-md" />
        </div>

        {/* Progress Bar Skeleton */}
        <div className="space-y-2">
          <div className="h-3 w-40 bg-[var(--bg-app)] rounded-md" />
          <div className="h-2 w-full bg-[var(--bg-app)] rounded-full" />
        </div>

        {/* Big Card Skeleton */}
        <div className="h-80 bg-[var(--bg-surface)] border border-[var(--border-color)] rounded-3xl p-8 flex flex-col justify-between">
          <div className="flex justify-between items-center">
            <div className="h-4 w-24 bg-[var(--bg-app)] rounded-md" />
            <div className="h-8 w-16 bg-[var(--bg-app)] rounded-xl" />
          </div>
          <div className="space-y-3 my-auto">
            <div className="h-6 w-3/4 mx-auto bg-[var(--bg-app)] rounded-md" />
            <div className="h-6 w-1/2 mx-auto bg-[var(--bg-app)] rounded-md" />
          </div>
          <div className="h-4 w-40 mx-auto bg-[var(--bg-app)] rounded-md" />
        </div>
      </div>
    );
  }

  if (layout === "quiz") {
    return (
      <div className={`max-w-3xl mx-auto space-y-6 animate-pulse ${className}`}>
        {/* Header Bar */}
        <div className="h-16 bg-[var(--bg-surface)] border border-[var(--border-color)] rounded-2xl p-4 flex justify-between items-center">
          <div className="h-5 w-40 bg-[var(--bg-app)] rounded-md" />
          <div className="h-5 w-28 bg-[var(--bg-app)] rounded-md" />
        </div>

        {/* Question Selector */}
        <div className="h-12 bg-[var(--bg-surface)] border border-[var(--border-color)] rounded-2xl p-3 flex space-x-2">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="w-8 h-8 rounded-xl bg-[var(--bg-app)]" />
          ))}
        </div>

        {/* Question Card */}
        <div className="p-6 bg-[var(--bg-surface)] border border-[var(--border-color)] rounded-2xl space-y-6">
          <div className="h-4 w-32 bg-[var(--bg-app)] rounded-md" />
          <div className="h-6 w-full bg-[var(--bg-app)] rounded-md" />
          <div className="space-y-3">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="h-12 w-full bg-[var(--bg-app)] rounded-xl" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (layout === "roadmap") {
    return (
      <div className={`max-w-4xl mx-auto space-y-6 animate-pulse ${className}`}>
        {Array.from({ length: count }).map((_, idx) => (
          <div key={idx} className="pl-10 relative">
            <div className="absolute left-0 top-2 w-6 h-6 rounded-full bg-[var(--bg-surface)] border border-[var(--border-color)]" />
            <div className="p-6 bg-[var(--bg-surface)] border border-[var(--border-color)] rounded-2xl space-y-4">
              <div className="flex justify-between items-center">
                <div className="h-5 w-48 bg-[var(--bg-app)] rounded-md" />
                <div className="h-6 w-20 bg-[var(--bg-app)] rounded-xl" />
              </div>
              <div className="h-4 w-3/4 bg-[var(--bg-app)] rounded-md" />
              <div className="h-2 w-full bg-[var(--bg-app)] rounded-full" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (layout === "resources" || layout === "home") {
    return (
      <div className={`grid grid-cols-1 md:grid-cols-3 gap-6 animate-pulse ${className}`}>
        {Array.from({ length: count }).map((_, idx) => (
          <div key={idx} className="p-6 bg-[var(--bg-surface)] border border-[var(--border-color)] rounded-2xl space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-[var(--bg-app)]" />
              <div className="space-y-2 flex-1">
                <div className="h-4 w-2/3 bg-[var(--bg-app)] rounded-md" />
                <div className="h-3 w-1/3 bg-[var(--bg-app)] rounded-md" />
              </div>
            </div>
            <div className="h-3 w-full bg-[var(--bg-app)] rounded-md" />
            <div className="h-2 w-full bg-[var(--bg-app)] rounded-full" />
            <div className="pt-2 flex justify-between items-center">
              <div className="h-4 w-16 bg-[var(--bg-app)] rounded-md" />
              <div className="h-8 w-24 bg-[var(--bg-app)] rounded-xl" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  // Analytics / Progress default grid
  return (
    <div className={`space-y-6 animate-pulse ${className}`}>
      <div className="h-24 bg-[var(--bg-surface)] border border-[var(--border-color)] rounded-2xl p-6" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="h-48 bg-[var(--bg-surface)] border border-[var(--border-color)] rounded-2xl p-6" />
        <div className="h-48 bg-[var(--bg-surface)] border border-[var(--border-color)] rounded-2xl p-6" />
      </div>
    </div>
  );
};
