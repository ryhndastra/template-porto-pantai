import React from 'react';
import { motion } from 'framer-motion';
import {
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiJavascript,
  SiTailwindcss,
  SiFlutter,
  SiLaravel,
  SiNodedotjs,
  SiMysql,
  SiPostgresql,
  SiSupabase,
  SiFirebase,
  SiPrisma,
  SiDocker,
  SiLinux,
  SiGit,
  SiVercel
} from '@icons-pack/react-simple-icons';
import type { TechItem, TechLayer } from '../../types/portfolio';
import type { FlowDomainId } from './PipelineFlowPresets';

const iconMap: Record<string, React.FC<{ size?: number; color?: string; className?: string }>> = {
  react: SiReact,
  nextdotjs: SiNextdotjs,
  typescript: SiTypescript,
  javascript: SiJavascript,
  tailwindcss: SiTailwindcss,
  flutter: SiFlutter,
  laravel: SiLaravel,
  nodejs: SiNodedotjs,
  mysql: SiMysql,
  postgresql: SiPostgresql,
  supabase: SiSupabase,
  firebase: SiFirebase,
  prisma: SiPrisma,
  docker: SiDocker,
  linux: SiLinux,
  git: SiGit,
  vercel: SiVercel
};

interface PipelineNodeLayerProps {
  layerId: TechLayer;
  stepNumber: string;
  title: string;
  subtitle: string;
  roleDescription: string;
  techItems: TechItem[];
  activeDomain: FlowDomainId;
  selectedTech: TechItem | null;
  onSelectTech: (tech: TechItem) => void;
  onSelectLayer: (layerId: TechLayer) => void;
  isLayerSelected: boolean;
}

export const PipelineNodeLayer: React.FC<PipelineNodeLayerProps> = ({
  layerId,
  stepNumber,
  title,
  subtitle,
  roleDescription,
  techItems,
  activeDomain,
  selectedTech,
  onSelectTech,
  onSelectLayer,
  isLayerSelected
}) => {
  // check if layer matches active domain filter
  const isLayerActiveInDomain =
    activeDomain === 'all' ||
    (activeDomain === 'web' && layerId === 'client') ||
    (activeDomain === 'mobile' && layerId === 'client') ||
    (activeDomain === 'backend' && (layerId === 'backend' || layerId === 'database')) ||
    (activeDomain === 'devops' && layerId === 'devops');

  const handleInspectClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!isLayerActiveInDomain) return;
    onSelectLayer(layerId);
    const inspectorEl = document.getElementById('pipeline-inspector');
    if (inspectorEl) {
      inspectorEl.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  };

  return (
    <motion.div
      whileHover={isLayerActiveInDomain ? { y: -3 } : undefined}
      transition={{ type: 'spring', stiffness: 350, damping: 25 }}
      onClick={() => {
        if (isLayerActiveInDomain) {
          onSelectLayer(layerId);
        }
      }}
      className={`p-6 sm:p-7 rounded-[28px] border-2 transition-all duration-300 relative flex flex-col justify-between ${
        !isLayerActiveInDomain
          ? 'bg-[#f1f5f9]/70 border-dashed border-[#94a3b8] opacity-35 grayscale pointer-events-none cursor-not-allowed select-none shadow-none'
          : isLayerSelected
          ? 'bg-[#fffdf5] border-[#0f172a] shadow-[8px_8px_0px_#0f172a] ring-3 ring-[#0284c7] cursor-pointer'
          : 'bg-[#fffdf5] border-[#0f172a] shadow-[6px_6px_0px_#0f172a] cursor-pointer hover:border-[#0284c7]'
      }`}
    >
      <div>
        {/* layer header */}
        <div className="flex items-center justify-between gap-2 pb-3 border-b-2 border-[#0f172a]/10">
          <div className="flex items-center gap-2">
            <span
              className={`px-2.5 py-1 rounded-xl text-xs font-mono font-black border ${
                isLayerActiveInDomain
                  ? 'bg-[#fde047] text-[#0f172a] border-[#0f172a] shadow-[2px_2px_0px_#0f172a]'
                  : 'bg-[#e2e8f0] text-[#94a3b8] border-[#cbd5e1]'
              }`}
            >
              {stepNumber}
            </span>
            <span
              className={`text-[11px] font-mono font-bold uppercase tracking-wider ${
                isLayerActiveInDomain ? 'text-[#0284c7]' : 'text-[#94a3b8]'
              }`}
            >
              {subtitle}
            </span>
          </div>

          <div
            className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-lg border ${
              !isLayerActiveInDomain
                ? 'bg-[#e2e8f0] text-[#94a3b8] border-[#cbd5e1]'
                : isLayerSelected
                ? 'bg-[#fde047] text-[#0f172a] border-[#0f172a]'
                : 'bg-[#dcfce7] text-[#15803d] border-[#16a34a]'
            }`}
          >
            {!isLayerActiveInDomain
              ? 'NONAKTIF'
              : isLayerSelected
              ? 'DIPILIH'
              : 'AKTIF'}
          </div>
        </div>

        {/* layer description */}
        <div className="mt-3.5 space-y-1">
          <h3
            className={`text-xl sm:text-2xl font-black tracking-tight ${
              isLayerActiveInDomain ? 'text-[#0f172a]' : 'text-[#64748b]'
            }`}
          >
            {title}
          </h3>
          <p
            className={`text-xs font-medium leading-relaxed ${
              isLayerActiveInDomain ? 'text-[#475569]' : 'text-[#94a3b8]'
            }`}
          >
            {roleDescription}
          </p>
        </div>

        {/* tools list */}
        <div className="mt-5 flex flex-wrap gap-2">
          {techItems.map((tech) => {
            const Icon = iconMap[tech.iconKey];
            const isToolActive =
              activeDomain === 'all' ||
              (activeDomain === 'web' && tech.category === 'frontend') ||
              (activeDomain === 'mobile' && tech.category === 'mobile') ||
              (activeDomain === 'backend' && tech.category === 'backend') ||
              (activeDomain === 'devops' && tech.category === 'tools');

            const isToolSelected = isLayerActiveInDomain && selectedTech?.name === tech.name;

            return (
              <button
                key={tech.name}
                type="button"
                disabled={!isLayerActiveInDomain || !isToolActive}
                onClick={(e) => {
                  e.stopPropagation();
                  if (!isLayerActiveInDomain || !isToolActive) return;
                  onSelectTech(tech);
                  const inspectorEl = document.getElementById('pipeline-inspector');
                  if (inspectorEl) {
                    inspectorEl.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                  }
                }}
                className={`group flex items-center gap-2 px-3 py-2 rounded-xl border-2 transition-all duration-200 ${
                  !isLayerActiveInDomain || !isToolActive
                    ? 'bg-[#f1f5f9] border-[#cbd5e1] text-[#94a3b8] opacity-50 cursor-not-allowed shadow-none'
                    : isToolSelected
                    ? 'bg-[#fde047] border-[#0f172a] shadow-[3px_3px_0px_#0f172a] scale-105 cursor-pointer'
                    : 'bg-[#fff9d4] hover:bg-[#fde047] border-[#0f172a] shadow-[2px_2px_0px_#0f172a] hover:scale-105 cursor-pointer'
                }`}
              >
                <div
                  className="w-5 h-5 rounded-md flex items-center justify-center transition-transform group-hover:scale-110"
                  style={{ color: isToolActive && isLayerActiveInDomain ? tech.color : '#94a3b8' }}
                >
                  {Icon ? (
                    <Icon size={16} color={isToolActive && isLayerActiveInDomain ? tech.color : '#94a3b8'} />
                  ) : (
                    <span className="text-[10px] font-bold font-mono">
                      {tech.name.slice(0, 2)}
                    </span>
                  )}
                </div>

                <div className="text-left">
                  <div
                    className={`text-xs font-bold leading-tight ${
                      isToolActive && isLayerActiveInDomain ? 'text-[#0f172a]' : 'text-[#94a3b8]'
                    }`}
                  >
                    {tech.name}
                  </div>
                  {tech.roleTag && (
                    <div
                      className={`text-[9px] font-mono font-medium leading-tight ${
                        isToolActive && isLayerActiveInDomain ? 'text-[#475569]' : 'text-[#cbd5e1]'
                      }`}
                    >
                      {tech.roleTag}
                    </div>
                  )}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* layer inspection trigger */}
      <div className="mt-6 pt-3 border-t border-[#0f172a]/10 flex items-center justify-between text-[11px] font-mono text-[#64748b]">
        <span>{techItems.length} Tools</span>
        {isLayerActiveInDomain ? (
          <button
            type="button"
            onClick={handleInspectClick}
            className="px-3 py-1 rounded-lg bg-[#faeed1] hover:bg-[#fde047] text-[#0f172a] font-bold border border-[#0f172a] transition-colors cursor-pointer flex items-center gap-1"
          >
            <span>Detail Layer</span>
            <span>&rarr;</span>
          </button>
        ) : (
          <span className="text-[#94a3b8]">Nonaktif</span>
        )}
      </div>
    </motion.div>
  );
};
