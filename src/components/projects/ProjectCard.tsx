import React from 'react';
import { ArrowUpRight, Layers } from 'lucide-react';
import type { Project } from '../../types/portfolio';
import { TactileCard } from '../ui/TactileCard';

interface ProjectCardProps {
  project: Project;
  onSelect: (project: Project) => void;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project, onSelect }) => {
  const categoryLabels = {
    fullstack: 'Full-Stack Web',
    mobile: 'Mobile Flutter App',
    ai: 'AI & Computer Vision'
  };

  const categoryAccents = {
    fullstack: 'text-[#2563eb] border-[#2563eb]/40',
    mobile: 'text-[#0d9488] border-[#0d9488]/40',
    ai: 'text-[#d97706] border-[#d97706]/40'
  };

  return (
    <TactileCard
      onClick={() => onSelect(project)}
      className="cursor-pointer group flex flex-col justify-between h-full"
    >
      <div>
        {/* Header Metadata */}
        <div className="flex items-center justify-between gap-2 pb-3 border-b border-[#223f66]">
          <span
            className={`text-[11px] font-mono uppercase px-2.5 py-0.5 rounded border bg-[#0f1f33] ${
              categoryAccents[project.category]
            }`}
          >
            {categoryLabels[project.category]}
          </span>

          <span className="text-xs font-mono text-[#94a3b8] group-hover:text-[#f8fafc] flex items-center gap-1 transition-colors">
            <span>Case Study</span>
            <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </span>
        </div>

        {/* Title & Subtitle */}
        <h3 className="text-xl sm:text-2xl font-bold text-[#f8fafc] group-hover:text-[#3b82f6] mt-4 transition-colors">
          {project.title}
        </h3>
        <p className="text-xs font-medium text-[#94a3b8] mt-1">
          {project.subtitle}
        </p>

        {/* Summary */}
        <p className="text-sm text-[#94a3b8] mt-4 leading-relaxed line-clamp-3">
          {project.summary}
        </p>

        {/* Tech Stack Chips */}
        <div className="flex flex-wrap gap-1.5 mt-5">
          {project.stack.slice(0, 6).map((tech) => (
            <span
              key={tech}
              className="text-[11px] font-mono px-2 py-0.5 rounded bg-[#0f1f33] text-[#f8fafc] border border-[#223f66]"
            >
              {tech}
            </span>
          ))}
          {project.stack.length > 6 && (
            <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-[#0f1f33] text-[#94a3b8] border border-[#223f66]">
              +{project.stack.length - 6} more
            </span>
          )}
        </div>
      </div>

      {/* Footer Role & Action Indicator */}
      <div className="mt-6 pt-4 border-t border-[#223f66] flex items-center justify-between text-xs text-[#94a3b8]">
        <div className="flex items-center gap-1.5">
          <Layers className="w-3.5 h-3.5 text-[#2563eb]" />
          <span className="font-mono text-[11px]">{project.role}</span>
        </div>
        <span className="text-[#3b82f6] font-medium text-xs">Explore System</span>
      </div>
    </TactileCard>
  );
};
