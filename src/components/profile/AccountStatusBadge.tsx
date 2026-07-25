import React from "react";
import { Badge } from "../DesignSystem";
import { ShieldCheck, Award, Zap, Sparkles } from "lucide-react";

interface AccountStatusBadgeProps {
  status?: string;
  memberSince?: string;
  className?: string;
}

export const AccountStatusBadge: React.FC<AccountStatusBadgeProps> = ({
  status = "Verified Staff Candidate",
  memberSince = "Jan 2025",
  className = "",
}) => {
  return (
    <div className={`inline-flex items-center gap-2 ${className}`}>
      <Badge
        variant="accent"
        size="md"
        icon={<ShieldCheck className="w-3.5 h-3.5 text-[var(--accent)]" />}
        className="shadow-xs font-mono"
      >
        {status}
      </Badge>

      {memberSince && (
        <span className="hidden sm:inline-flex items-center text-[10px] font-mono text-[var(--text-secondary)] bg-[var(--bg-app)] px-2.5 py-1 rounded-md border border-[var(--border-color)]">
          <Sparkles className="w-3 h-3 text-[var(--secondary-accent)] mr-1" />
          Member since {memberSince}
        </span>
      )}
    </div>
  );
};
