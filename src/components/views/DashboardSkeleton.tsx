import React from "react";
import { Card } from "../DesignSystem";

export const DashboardSkeleton: React.FC = () => {
  return (
    <div className="space-y-8 animate-pulse">
      {/* Hero Overview Header Skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card className="h-full space-y-6">
            <div className="flex justify-between items-center">
              <div className="h-4 w-44 bg-[var(--border-color)]/60 rounded-md" />
              <div className="h-5 w-24 bg-[var(--border-color)]/60 rounded-md" />
            </div>
            <div className="flex items-baseline space-x-4">
              <div className="h-14 w-28 bg-[var(--border-color)]/80 rounded-xl" />
              <div className="space-y-2">
                <div className="h-3.5 w-32 bg-[var(--border-color)]/60 rounded-md" />
                <div className="h-3 w-56 bg-[var(--border-color)]/40 rounded-md" />
              </div>
            </div>
            <div className="space-y-3 pt-2">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="space-y-1.5">
                  <div className="flex justify-between">
                    <div className="h-3 w-28 bg-[var(--border-color)]/60 rounded" />
                    <div className="h-3 w-10 bg-[var(--border-color)]/60 rounded" />
                  </div>
                  <div className="h-2 w-full bg-[var(--border-color)]/40 rounded-full" />
                </div>
              ))}
            </div>
          </Card>
        </div>

        <div>
          <Card className="h-full flex flex-col justify-between space-y-6">
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <div className="h-4 w-32 bg-[var(--border-color)]/60 rounded" />
                <div className="h-5 w-20 bg-[var(--border-color)]/60 rounded" />
              </div>
              <div className="space-y-2">
                <div className="h-10 w-24 bg-[var(--border-color)]/80 rounded-xl" />
                <div className="h-2.5 w-full bg-[var(--border-color)]/40 rounded-full" />
              </div>
              <div className="h-20 w-full bg-[var(--border-color)]/40 rounded-xl" />
            </div>
            <div className="h-11 w-full bg-[var(--border-color)]/80 rounded-xl" />
          </Card>
        </div>
      </div>

      {/* Agenda Section Skeleton */}
      <Card className="space-y-6">
        <div className="h-6 w-52 bg-[var(--border-color)]/60 rounded" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {[1, 2, 3].map((i) => (
            <div key={i} className="p-5 bg-[var(--bg-app)] border border-[var(--border-color)]/60 rounded-xl space-y-4">
              <div className="flex justify-between">
                <div className="h-4 w-24 bg-[var(--border-color)]/60 rounded" />
                <div className="h-3 w-14 bg-[var(--border-color)]/40 rounded" />
              </div>
              <div className="h-4 w-3/4 bg-[var(--border-color)]/80 rounded" />
              <div className="h-3 w-full bg-[var(--border-color)]/40 rounded" />
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};
