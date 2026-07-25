import React from "react";
import { motion, useReducedMotion } from "motion/react";
import { StudyResourceItem } from "../../../types/studyTypes";
import { Card, Button, Badge } from "../../DesignSystem";
import { 
  Video, 
  FileText, 
  BookOpen, 
  Globe, 
  FileCode2, 
  Bookmark, 
  ExternalLink, 
  BookmarkCheck,
  Star
} from "lucide-react";

interface ResourceCardProps {
  resource: StudyResourceItem;
  onToggleSave: (id: string) => void;
  onToggleBookmark: (id: string) => void;
  className?: string;
}

export const renderResourceTypeIcon = (type: StudyResourceItem["type"], className = "w-4 h-4") => {
  switch (type) {
    case "video": return <Video className={className} />;
    case "article": return <FileText className={className} />;
    case "book": return <BookOpen className={className} />;
    case "practice_website": return <Globe className={className} />;
    case "official_doc": return <FileCode2 className={className} />;
    default: return <FileText className={className} />;
  }
};

export const ResourceCard: React.FC<ResourceCardProps> = ({
  resource,
  onToggleSave,
  onToggleBookmark,
  className = "",
}) => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      whileHover={shouldReduceMotion ? {} : { y: -4 }}
      transition={{ duration: 0.2 }}
      className={`h-full ${className}`}
    >
      <Card hoverable className="flex flex-col justify-between space-y-4 group h-full transition-shadow duration-200">
        
        {/* Top Bar */}
        <div className="space-y-3">
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-lg bg-[var(--bg-app)] border border-[var(--border-color)] flex items-center justify-center text-[var(--accent)] group-hover:scale-105 transition-transform">
                {renderResourceTypeIcon(resource.type)}
              </div>
              <div className="space-y-0.5">
                <Badge variant="neutral" size="sm">{resource.subjectName}</Badge>
                <div className="text-[10px] font-mono text-[var(--text-secondary)] capitalize">{resource.type.replace("_", " ")}</div>
              </div>
            </div>

            <div className="flex items-center space-x-1">
              <motion.button
                whileTap={shouldReduceMotion ? {} : { scale: 0.9 }}
                onClick={() => onToggleBookmark(resource.id)}
                className={`p-1.5 rounded-lg border border-[var(--border-color)] transition-colors ${
                  resource.isBookmarked ? "bg-[var(--accent)]/15 text-[var(--accent)] border-[var(--accent)]/30" : "bg-[var(--bg-app)] text-[var(--text-secondary)]"
                }`}
                title="Bookmark Resource"
              >
                <Bookmark className="w-3.5 h-3.5" />
              </motion.button>

              <motion.button
                whileTap={shouldReduceMotion ? {} : { scale: 0.9 }}
                onClick={() => onToggleSave(resource.id)}
                className={`p-1.5 rounded-lg border border-[var(--border-color)] transition-colors ${
                  resource.isSaved ? "bg-[var(--success)]/15 text-[var(--success)] border-[var(--success)]/30" : "bg-[var(--bg-app)] text-[var(--text-secondary)]"
                }`}
                title="Save Resource"
              >
                <BookmarkCheck className="w-3.5 h-3.5" />
              </motion.button>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-bold font-heading text-[var(--text-primary)] group-hover:text-[var(--accent)] transition-colors line-clamp-2">
              {resource.title}
            </h3>
            <p className="text-xs text-[var(--text-secondary)] font-mono mt-1">
              {resource.authorOrPlatform} • {resource.durationOrPages}
            </p>
          </div>
        </div>

        {/* Bottom Action */}
        <div className="pt-3 border-t border-[var(--border-color)] flex items-center justify-between mt-auto">
          <Badge variant="secondary" size="sm">{resource.difficulty}</Badge>

          <a
            href={resource.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-[var(--btn-primary-bg)] text-[var(--btn-primary-text)] border border-[var(--border-color)] text-xs font-mono font-medium hover:border-[var(--accent)]/60 transition-colors"
          >
            <span>Open Resource</span>
            <ExternalLink className="w-3 h-3 text-[var(--accent)]" />
          </a>
        </div>

      </Card>
    </motion.div>
  );
};
