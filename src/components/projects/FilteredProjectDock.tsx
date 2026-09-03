import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowUpRight,
  Lock,
  ExternalLink,
  ChevronRight,
  BookOpen
} from 'lucide-react';
import type { Project, ProjectCategory } from '../../types/portfolio';
import { ProjectPreviewPlaceholder } from './ProjectPreviewPlaceholder';
import { AnimatedOceanSlideBackground } from './AnimatedOceanSlideBackground';

interface FilteredProjectDockProps {
  projects: Project[];
  selectedCategory: ProjectCategory;
  onSelectCategory: (category: ProjectCategory) => void;
  onSelectProject: (project: Project) => void;
}

export const FilteredProjectDock: React.FC<FilteredProjectDockProps> = ({
  projects,
  selectedCategory,
  onSelectCategory,
  onSelectProject
}) => {
  const [activeProjectId, setActiveProjectId] = useState<string>(projects[0]?.id || 'cimart');

  const categories: { id: ProjectCategory; label: string; count: number }[] = [
    { id: 'all', label: 'Semua Proyek', count: projects.length },
    {
      id: 'fullstack',
      label: 'Full-Stack Web',
      count: projects.filter((p) => p.category === 'fullstack').length
    },
    {
      id: 'mobile',
      label: 'Mobile Flutter',
      count: projects.filter((p) => p.category === 'mobile').length
    }
  ];

  const filteredProjects =
    selectedCategory === 'all'
      ? projects
      : projects.filter((p) => p.category === selectedCategory);

  // synchronize currently active project selection
  const activeProject =
    filteredProjects.find((p) => p.id === activeProjectId) || filteredProjects[0] || projects[0];

  return (
    <div className="absolute inset-0 w-full h-full flex flex-col justify-between overflow-hidden select-none">
      {/* ocean background */}
      <AnimatedOceanSlideBackground depthLevel={4} />

      {/* category filter navigation */}
      <div className="relative z-10 max-w-7xl mx-auto w-full pt-20 sm:pt-24 px-6 sm:px-12 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shrink-0">
        <div>
          <span className="text-xs font-mono font-black uppercase tracking-[0.2em] text-[#0f172a] bg-[#fde047] px-3 py-0.5 rounded-lg border-2 border-[#0f172a] shadow-[2px_2px_0px_#0f172a] inline-block mb-1">
            04 // INDEKS PORTOFOLIO LENGKAP
          </span>
          <h3 className="text-xl sm:text-2xl font-black text-[#0f172a] tracking-tight drop-shadow-sm">
            Eksplorasi Proyek &amp; Hasil Rekayasa
          </h3>
        </div>

        {/* category selection pills */}
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => {
                onSelectCategory(cat.id);
                const nextFiltered =
                  cat.id === 'all' ? projects : projects.filter((p) => p.category === cat.id);
                if (nextFiltered[0]) setActiveProjectId(nextFiltered[0].id);
              }}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-2xl text-xs font-mono font-black transition-all cursor-pointer border-2 border-[#0f172a] ${selectedCategory === cat.id
                ? 'bg-[#0284c7] text-white shadow-[3px_3px_0px_#0f172a] -translate-y-0.5'
                : 'bg-[#fffdf5] hover:bg-[#fff9d4] text-[#0f172a] shadow-[2px_2px_0px_#0f172a]'
                }`}
            >
              <span>{cat.label}</span>
              <span
                className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${selectedCategory === cat.id ? 'bg-white/30 text-white' : 'bg-[#fff9d4] text-[#0f172a] border border-[#0f172a]/40'
                  }`}
              >
                {cat.count}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* project inspection stage */}
      <div className="relative z-10 max-w-7xl mx-auto w-full px-6 sm:px-12 my-auto grid grid-cols-1 lg:grid-cols-12 gap-5 items-center">
        {/* project selector */}
        <div className="lg:col-span-5 flex flex-col justify-center space-y-2.5 max-h-[380px] overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-[#0284c7] scrollbar-track-[#fffdf5]/50">
          {filteredProjects.map((project, idx) => {
            const isSelected = activeProject.id === project.id;

            return (
              <motion.div
                key={project.id}
                whileHover={{ x: 4 }}
                onClick={() => setActiveProjectId(project.id)}
                className={`p-3 sm:p-3.5 rounded-[20px] border-2 border-[#0f172a] cursor-pointer transition-all duration-200 ${isSelected
                  ? 'bg-[#fde047] shadow-[4px_4px_0px_#0f172a] -translate-y-0.5'
                  : 'bg-[#fffdf5]/95 hover:bg-[#fff9d4] shadow-[2px_2px_0px_#0f172a]'
                  }`}
              >
                <div className="flex items-center justify-between gap-2 mb-1">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono font-black text-[#0f172a] bg-[#fffdf5] px-1.5 py-0.5 rounded-md border border-[#0f172a]">
                      0{idx + 1}
                    </span>
                    <span className="text-[11px] font-mono font-bold text-[#0284c7]">
                      {project.category === 'fullstack' ? 'Full-Stack Web' : 'Mobile Flutter'}
                    </span>
                  </div>

                  <div className="flex items-center gap-1">
                    {project.isPrivateRepo ? (
                      <span className="text-[9px] font-mono font-bold text-[#b91c1c] bg-[#fee2e2] px-1.5 py-0.5 rounded-md border border-[#b91c1c]/40 flex items-center gap-1">
                        <Lock className="w-2.5 h-2.5" />
                        <span>Private</span>
                      </span>
                    ) : (
                      <span className="text-[9px] font-mono font-bold text-[#15803d] bg-[#dcfce7] px-1.5 py-0.5 rounded-md border border-[#16a34a]/40 flex items-center gap-1">
                        <ExternalLink className="w-2.5 h-2.5" />
                        <span>Open</span>
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm sm:text-base font-black text-[#0f172a] leading-tight">
                      {project.title}
                    </h4>
                    <p className="text-[10px] font-mono font-bold text-[#8c6239] mt-0.5">
                      {project.metrics[0]?.value} • {project.metrics[1]?.value}
                    </p>
                  </div>

                  <div
                    className={`w-6 h-6 rounded-lg flex items-center justify-center border border-[#0f172a] transition-transform ${isSelected ? 'bg-[#0284c7] text-white rotate-90' : 'bg-[#fffdf5] text-[#0f172a]'
                      }`}
                  >
                    <ChevronRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* project inspection display */}
        <div className="lg:col-span-7">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeProject.id}
              initial={{ opacity: 0, scale: 0.97, x: 10 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              exit={{ opacity: 0, scale: 0.97, x: -10 }}
              transition={{ duration: 0.2 }}
              className="p-4 sm:p-5 rounded-[24px] bg-[#fffdf5] border-2 border-[#0f172a] shadow-[6px_6px_0px_#0f172a] flex flex-col justify-between space-y-3"
            >
              {/* project preview frame */}
              <div className="space-y-2">
                <ProjectPreviewPlaceholder
                  project={activeProject}
                  isMobileFrame={activeProject.category === 'mobile'}
                  className="aspect-[16/10] w-full"
                />

                {/* project titles */}
                <div>
                  <div className="flex items-center justify-between gap-2">
                    <h4 className="text-lg sm:text-xl font-black text-[#0f172a]">
                      {activeProject.title}
                    </h4>
                    <span className="text-[11px] font-mono font-bold text-[#0284c7] bg-[#e0f2fe] px-2 py-0.5 rounded-lg border border-[#0284c7]/40 truncate max-w-[180px]">
                      {activeProject.role}
                    </span>
                  </div>
                  <p className="text-[11px] font-mono font-bold text-[#8c6239]">
                    {activeProject.subtitle}
                  </p>
                </div>

                <p className="text-xs text-[#334155] leading-relaxed font-medium line-clamp-2">
                  {activeProject.summary}
                </p>
              </div>

              {/* performance */}
              <div className="grid grid-cols-3 gap-2">
                {activeProject.metrics.map((m, mIdx) => (
                  <div
                    key={mIdx}
                    className="p-1.5 sm:p-2 rounded-xl bg-[#fff9d4] border border-[#0f172a]/50 text-center shadow-[2px_2px_0px_#0f172a]"
                  >
                    <div className="text-[9px] font-mono font-bold uppercase text-[#8c6239] leading-tight">
                      {m.label}
                    </div>
                    <div className="text-xs font-black text-[#0f172a] mt-0.5 leading-tight">
                      {m.value}
                    </div>
                  </div>
                ))}
              </div>

              {/* case study modal */}
              <div className="pt-2 border-t border-[#e2d3b3] flex items-center justify-between gap-3">
                <div className="flex items-center gap-1.5 flex-wrap">
                  {activeProject.stack.slice(0, 4).map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-0.5 rounded-md bg-[#fffdf5] text-[10px] font-mono font-bold text-[#0f172a] border border-[#0f172a]/40"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <button
                  type="button"
                  onClick={() => onSelectProject(activeProject)}
                  className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-[#0284c7] hover:bg-[#0369a1] text-white text-xs font-mono font-black border-2 border-[#0f172a] shadow-[3px_3px_0px_#0f172a] cursor-pointer transition-all hover:-translate-y-0.5 active:translate-y-0"
                >
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>Buka Studi Kasus</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* seabed spacing */}
      <div className="relative z-10 h-16 sm:h-20 w-full shrink-0" />
    </div>
  );
};
