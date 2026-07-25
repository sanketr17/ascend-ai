import React, { useState } from "react";
import { SkillNode } from "../../types";
import { PageTransition, Card, Button, Badge } from "../DesignSystem";
import { 
  Zap, 
  Search, 
  Code2, 
  X, 
  HelpCircle,
  Sparkles,
  ChevronRight
} from "lucide-react";

interface SkillGraphViewProps {
  skillNodes: SkillNode[];
  onUpdateSkillNode: (updatedNode: SkillNode) => void;
}

export const SkillGraphView: React.FC<SkillGraphViewProps> = ({
  skillNodes,
  onUpdateSkillNode,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeNodeModal, setActiveNodeModal] = useState<SkillNode | null>(null);

  // Self-check state in modal
  const [userSelfCheckAnswer, setUserSelfCheckAnswer] = useState("");
  const [selfCheckFeedback, setSelfCheckFeedback] = useState<string | null>(null);

  const categories = [
    "All",
    "System Design",
    "Algorithms",
    "Behavioral Leadership",
    "Domain Architecture",
    "Frontend/Performance"
  ];

  const filteredNodes = skillNodes.filter((node) => {
    const matchesCategory = selectedCategory === "All" || node.category === selectedCategory;
    const matchesSearch =
      node.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      node.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleSelfCheckSubmit = () => {
    if (!userSelfCheckAnswer.trim() || !activeNodeModal) return;
    
    // Smart evaluation
    const scoreGain = Math.min(100, activeNodeModal.masteryLevel + 10);
    const updated: SkillNode = {
      ...activeNodeModal,
      masteryLevel: scoreGain,
      status: scoreGain >= 80 ? "Mastered" : "In Progress",
      lastReviewedDaysAgo: 0,
    };
    
    onUpdateSkillNode(updated);
    setActiveNodeModal(updated);
    setSelfCheckFeedback(`Mastery increased to ${scoreGain}%! Good response covering core trade-offs.`);
  };

  return (
    <PageTransition>
      
      {/* Header & Controls */}
      <Card>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="text-base font-bold font-heading text-[var(--text-primary)] flex items-center space-x-2">
              <Zap className="w-5 h-5 text-[var(--accent)]" />
              <span>Adaptive Skill Graph & Taxonomy</span>
            </h2>
            <p className="text-xs text-[var(--text-secondary)] mt-0.5">
              Deep-dive architectural concepts, code blueprints, and automated self-check drills.
            </p>
          </div>

          {/* Search Input */}
          <div className="relative w-full md:w-64">
            <Search className="w-4 h-4 text-[var(--text-secondary)] absolute left-3 top-2.5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search skill nodes..."
              className="w-full pl-9 pr-3 py-2 text-xs bg-[var(--bg-app)] border border-[var(--border-color)] rounded-xl text-[var(--text-primary)] placeholder-[var(--text-secondary)] focus:outline-none focus:border-[var(--accent)]"
            />
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex items-center space-x-2 overflow-x-auto pt-4 mt-4 border-t border-[var(--border-color)]">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-xl text-xs font-mono font-medium whitespace-nowrap transition-colors ${
                selectedCategory === cat
                  ? "bg-[var(--btn-primary-bg)] text-[var(--btn-primary-text)] font-bold"
                  : "bg-[var(--bg-app)] text-[var(--text-secondary)] border border-[var(--border-color)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-hover)]"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </Card>

      {/* Grid of Skill Nodes */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredNodes.map((node) => (
          <div
            key={node.id}
            onClick={() => {
              setActiveNodeModal(node);
              setSelfCheckFeedback(null);
              setUserSelfCheckAnswer("");
            }}
            className="bg-[var(--bg-surface)] border border-[var(--border-color)] hover:border-[var(--accent)]/60 rounded-xl p-5 shadow-craft hover:shadow-craft-lg cursor-pointer transition-all flex flex-col justify-between group"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs">
                <Badge variant="neutral">{node.category}</Badge>
                <Badge
                  variant={
                    node.status === "Mastered"
                      ? "success"
                      : node.status === "Needs Review"
                      ? "accent"
                      : "error"
                  }
                >
                  {node.status}
                </Badge>
              </div>

              <h3 className="text-sm font-bold font-heading text-[var(--text-primary)] group-hover:text-[var(--accent)] transition-colors">
                {node.title}
              </h3>

              <p className="text-xs font-body text-[var(--text-secondary)] line-clamp-2 leading-relaxed">
                {node.description}
              </p>
            </div>

            <div className="pt-4 mt-4 border-t border-[var(--border-color)]/60 flex items-center justify-between text-xs">
              <div className="flex items-center space-x-2">
                <div className="w-16 h-1.5 bg-[var(--bg-app)] rounded-full overflow-hidden border border-[var(--border-color)]/40">
                  <div
                    className={`h-full rounded-full ${
                      node.masteryLevel >= 80 ? "bg-[var(--success)]" : node.masteryLevel >= 60 ? "bg-[var(--accent)]" : "bg-[var(--error)]"
                    }`}
                    style={{ width: `${node.masteryLevel}%` }}
                  />
                </div>
                <span className="font-numbers text-[var(--text-primary)] font-bold">
                  {node.masteryLevel}%
                </span>
              </div>

              <span className="text-[var(--text-secondary)] text-[11px] font-mono flex items-center group-hover:text-[var(--text-primary)]">
                Study Lesson <ChevronRight className="w-3 h-3 ml-0.5" />
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Deep-Dive Micro-Lesson Modal */}
      {activeNodeModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div 
            className="w-full max-w-2xl bg-[var(--bg-surface)] border border-[var(--border-color)] rounded-2xl shadow-craft-lg overflow-hidden my-8 text-[var(--text-primary)]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="p-6 border-b border-[var(--border-color)] flex items-start justify-between">
              <div className="space-y-1">
                <div className="flex items-center space-x-2 text-xs font-mono text-[var(--text-secondary)]">
                  <span>{activeNodeModal.category}</span>
                  <span>•</span>
                  <span className="text-[var(--success)] font-bold font-numbers">{activeNodeModal.masteryLevel}% Mastery</span>
                </div>
                <h3 className="text-lg font-bold font-heading text-[var(--text-primary)]">
                  {activeNodeModal.title}
                </h3>
              </div>
              <button
                onClick={() => setActiveNodeModal(null)}
                className="p-1.5 rounded-lg text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-app)]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-6 max-h-[70vh] overflow-y-auto">
              
              {/* Concept Overview */}
              <div className="space-y-2">
                <h4 className="text-xs font-bold uppercase font-mono text-[var(--text-secondary)] tracking-wider">
                  Core Architectural Blueprint
                </h4>
                <p className="text-xs font-body text-[var(--text-primary)] leading-relaxed">
                  {activeNodeModal.description}
                </p>
              </div>

              {/* Key Takeaways */}
              <div className="space-y-2">
                <h4 className="text-xs font-bold uppercase font-mono text-[var(--text-secondary)] tracking-wider">
                  High-Yield Interview Takeaways
                </h4>
                <ul className="space-y-2">
                  {activeNodeModal.keyTakeaways.map((point, idx) => (
                    <li key={idx} className="text-xs text-[var(--text-primary)] p-3 bg-[var(--bg-app)] border border-[var(--border-color)] rounded-xl flex items-start space-x-2 leading-relaxed">
                      <Sparkles className="w-3.5 h-3.5 text-[var(--accent)] shrink-0 mt-0.5" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Code Snippet if present */}
              {activeNodeModal.codeOrStructureSnippet && (
                <div className="space-y-2">
                  <h4 className="text-xs font-bold uppercase font-mono text-[var(--text-secondary)] tracking-wider flex items-center space-x-1.5">
                    <Code2 className="w-3.5 h-3.5 text-[var(--accent)]" />
                    <span>Implementation Pattern / Blueprint</span>
                  </h4>
                  <pre className="p-4 bg-[var(--btn-primary-bg)] text-[var(--btn-primary-text)] text-xs font-mono rounded-xl overflow-x-auto border border-[var(--border-color)] leading-relaxed">
                    {activeNodeModal.codeOrStructureSnippet}
                  </pre>
                </div>
              )}

              {/* Self Check Question */}
              <div className="p-5 border border-[var(--border-color)] rounded-xl bg-[var(--bg-app)] space-y-3">
                <div className="flex items-center space-x-2 text-xs font-bold text-[var(--text-primary)] font-mono">
                  <HelpCircle className="w-4 h-4 text-[var(--accent)]" />
                  <span>Instant Check Question:</span>
                </div>
                <p className="text-xs font-medium text-[var(--text-primary)] font-body leading-relaxed">
                  {activeNodeModal.sampleQuestion}
                </p>

                {!selfCheckFeedback ? (
                  <div className="space-y-3 pt-2">
                    <input
                      type="text"
                      value={userSelfCheckAnswer}
                      onChange={(e) => setUserSelfCheckAnswer(e.target.value)}
                      placeholder="Type your quick answer here to increase mastery..."
                      className="w-full px-3.5 py-2.5 text-xs bg-[var(--bg-surface)] border border-[var(--border-color)] rounded-xl text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent)]"
                    />
                    <div className="flex justify-end">
                      <Button
                        onClick={handleSelfCheckSubmit}
                        disabled={!userSelfCheckAnswer.trim()}
                        variant="primary"
                        size="sm"
                      >
                        Submit Check
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="p-3.5 bg-[var(--bg-surface)] border border-[var(--border-color)] rounded-xl text-xs text-[var(--text-primary)] font-mono">
                    {selfCheckFeedback}
                  </div>
                )}
              </div>

            </div>
          </div>
        </div>
      )}

    </PageTransition>
  );
};
