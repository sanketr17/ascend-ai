import React, { useState } from "react";
import { StudySubject } from "../../../types/studyTypes";
import { Card, Button, Badge, PageTransition } from "../../DesignSystem";
import { StudyCard } from "../components/StudyCard";
import { EmptyState } from "../components/EmptyState";
import { StaggerContainer, StaggerItem } from "../../motion/StaggerContainer";
import { Search, Filter, BookOpen, Star, Clock, Layers } from "lucide-react";

interface SubjectLibrarySubViewProps {
  subjects: StudySubject[];
  onSelectSubject: (subject: StudySubject) => void;
  onToggleFavoriteSubject: (id: string) => void;
}

export const SubjectLibrarySubView: React.FC<SubjectLibrarySubViewProps> = ({
  subjects,
  onSelectSubject,
  onToggleFavoriteSubject,
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [filterMode, setFilterMode] = useState<"All" | "Favorites" | "InProgress">("All");

  const categories = [
    "All",
    "Frontend & Web",
    "Backend & Systems",
    "Computer Science",
    "Software Engineering",
    "AI & Data Science",
  ];

  const filteredSubjects = subjects.filter((subj) => {
    const matchesSearch =
      subj.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      subj.description.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory =
      selectedCategory === "All" || subj.category === selectedCategory;

    const matchesFilterMode =
      filterMode === "All" ||
      (filterMode === "Favorites" && subj.isFavorite) ||
      (filterMode === "InProgress" && subj.progress > 0);

    return matchesSearch && matchesCategory && matchesFilterMode;
  });

  return (
    <PageTransition className="space-y-6">
      
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[var(--border-color)]">
        <div>
          <h1 className="text-xl font-bold font-heading text-[var(--text-primary)] flex items-center space-x-2">
            <BookOpen className="w-5 h-5 text-[var(--accent)]" />
            <span>Subject Curriculum Library</span>
          </h1>
          <p className="text-xs text-[var(--text-secondary)] mt-0.5">
            Explore 10 foundational computer science & engineering learning domains.
          </p>
        </div>

        <div className="flex items-center space-x-2 font-mono text-xs text-[var(--text-secondary)]">
          <Badge variant="accent">{subjects.length} Total Subjects</Badge>
        </div>
      </div>

      {/* Controls Bar: Search & Category Filters */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-4 bg-[var(--bg-surface)] border border-[var(--border-color)] rounded-2xl shadow-craft">
        
        {/* Search Input */}
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-secondary)]" />
          <input
            type="text"
            placeholder="Search subjects (e.g., React, Python, DBMS)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-[var(--bg-app)] border border-[var(--border-color)] rounded-xl text-xs font-mono text-[var(--text-primary)] placeholder-[var(--text-secondary)] focus:outline-none focus:border-[var(--accent)]"
          />
        </div>

        {/* Filter Mode Buttons */}
        <div className="flex items-center space-x-1.5 overflow-x-auto pb-1 md:pb-0">
          {(["All", "Favorites", "InProgress"] as const).map((mode) => (
            <button
              key={mode}
              onClick={() => setFilterMode(mode)}
              className={`px-3 py-1.5 rounded-xl text-xs font-mono transition-colors ${
                filterMode === mode
                  ? "bg-[var(--btn-primary-bg)] text-[var(--btn-primary-text)] border border-[var(--border-color)] font-bold shadow-xs"
                  : "bg-[var(--bg-app)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
              }`}
            >
              {mode === "InProgress" ? "In Progress" : mode}
            </button>
          ))}
        </div>

      </div>

      {/* Category Pills */}
      <div className="flex items-center space-x-2 overflow-x-auto pb-2">
        <span className="text-xs font-mono text-[var(--text-secondary)] shrink-0 flex items-center">
          <Filter className="w-3.5 h-3.5 mr-1" /> Category:
        </span>
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-3 py-1.5 rounded-xl text-xs font-mono transition-all shrink-0 border ${
              selectedCategory === cat
                ? "bg-[var(--accent)]/15 text-[var(--accent)] border-[var(--accent)]/40 font-bold"
                : "bg-[var(--bg-surface)] text-[var(--text-secondary)] border-[var(--border-color)] hover:border-[var(--text-primary)]/30"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Grid Layout */}
      {filteredSubjects.length > 0 ? (
        <StaggerContainer staggerDelay={0.05} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSubjects.map((subject) => (
            <StaggerItem key={subject.id}>
              <StudyCard
                subject={subject}
                onContinue={onSelectSubject}
                onToggleFavorite={onToggleFavoriteSubject}
              />
            </StaggerItem>
          ))}
        </StaggerContainer>
      ) : (
        <EmptyState
          title="No Subjects Match Criteria"
          description="Try clearing your search keyword or switching category filters."
          onAction={() => {
            setSearchQuery("");
            setSelectedCategory("All");
            setFilterMode("All");
          }}
        />
      )}

    </PageTransition>
  );
};
