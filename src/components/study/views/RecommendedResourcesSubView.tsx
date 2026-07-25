import React, { useState } from "react";
import { StudyResourceItem } from "../../../types/studyTypes";
import { ResourceCard } from "../components/ResourceCard";
import { PageTransition, Badge, Card } from "../../DesignSystem";
import { EmptyState } from "../components/EmptyState";
import { StaggerContainer, StaggerItem } from "../../motion/StaggerContainer";
import { BookOpen, Search, Filter, Sparkles } from "lucide-react";

interface RecommendedResourcesSubViewProps {
  resources: StudyResourceItem[];
  onToggleSaveResource: (id: string) => void;
  onToggleBookmarkResource: (id: string) => void;
}

export const RecommendedResourcesSubView: React.FC<RecommendedResourcesSubViewProps> = ({
  resources,
  onToggleSaveResource,
  onToggleBookmarkResource,
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState<string>("All");

  const resourceTypes = [
    "All",
    "book",
    "video",
    "official_doc",
    "article",
    "practice_website",
  ];

  const filteredResources = resources.filter((res) => {
    const matchesSearch =
      res.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      res.subjectName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      res.authorOrPlatform.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesType = selectedType === "All" || res.type === selectedType;

    return matchesSearch && matchesType;
  });

  return (
    <PageTransition className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[var(--border-color)]">
        <div>
          <h1 className="text-xl font-bold font-heading text-[var(--text-primary)] flex items-center space-x-2">
            <BookOpen className="w-5 h-5 text-[var(--accent)]" />
            <span>Curated Engineering Resources Library</span>
          </h1>
          <p className="text-xs text-[var(--text-secondary)] mt-0.5">
            Peer-reviewed papers, official specification docs, books, and practice platforms.
          </p>
        </div>

        <Badge variant="accent" icon={<Sparkles className="w-3.5 h-3.5" />}>
          {resources.length} Verified References
        </Badge>
      </div>

      {/* Controls Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-4 bg-[var(--bg-surface)] border border-[var(--border-color)] rounded-2xl shadow-craft">
        
        {/* Search */}
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-secondary)]" />
          <input
            type="text"
            placeholder="Search resources (e.g., DDIA, React Conf)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-[var(--bg-app)] border border-[var(--border-color)] rounded-xl text-xs font-mono text-[var(--text-primary)] placeholder-[var(--text-secondary)] focus:outline-none focus:border-[var(--accent)]"
          />
        </div>

        {/* Type Filter Pills */}
        <div className="flex items-center space-x-2 overflow-x-auto pb-1 md:pb-0">
          {resourceTypes.map((t) => (
            <button
              key={t}
              onClick={() => setSelectedType(t)}
              className={`px-3 py-1.5 rounded-xl text-xs font-mono transition-all capitalize shrink-0 border ${
                selectedType === t
                  ? "bg-[var(--accent)]/15 text-[var(--accent)] border-[var(--accent)]/40 font-bold"
                  : "bg-[var(--bg-app)] text-[var(--text-secondary)] border-[var(--border-color)] hover:border-[var(--text-primary)]/30"
              }`}
            >
              {t === "official_doc" ? "Official Doc" : t === "practice_website" ? "Practice Site" : t}
            </button>
          ))}
        </div>

      </div>

      {/* Resources Grid */}
      {filteredResources.length > 0 ? (
        <StaggerContainer staggerDelay={0.05} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredResources.map((resource) => (
            <StaggerItem key={resource.id}>
              <ResourceCard
                resource={resource}
                onToggleSave={onToggleSaveResource}
                onToggleBookmark={onToggleBookmarkResource}
              />
            </StaggerItem>
          ))}
        </StaggerContainer>
      ) : (
        <EmptyState
          variant="no-resources"
          onAction={() => {
            setSearchQuery("");
            setSelectedType("All");
          }}
        />
      )}

    </PageTransition>
  );
};
