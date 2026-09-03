import React, { useState } from 'react';
import { Globe, Smartphone, Image as ImageIcon } from 'lucide-react';
import type { Project } from '../../types/portfolio';

interface ProjectPreviewPlaceholderProps {
  project: Project;
  className?: string;
  isMobileFrame?: boolean;
}

export const ProjectPreviewPlaceholder: React.FC<ProjectPreviewPlaceholderProps> = ({
  project,
  className = '',
  isMobileFrame = false
}) => {
  const [imageError, setImageError] = useState(false);
  const isMobile = isMobileFrame || project.category === 'mobile';

  return (
    <div
      className={`relative w-full flex flex-col overflow-hidden rounded-[24px] bg-[#fffdf5] border-2 border-[#0f172a] shadow-[6px_6px_0px_#0f172a] group/preview ${className}`}
    >
      {/* browser navigation bar */}
      <div className="flex items-center justify-between px-4 py-2 bg-[#faeed1] border-b-2 border-[#0f172a] shrink-0">
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-[#f87171] border border-[#0f172a]" />
          <span className="w-3 h-3 rounded-full bg-[#fde047] border border-[#0f172a]" />
          <span className="w-3 h-3 rounded-full bg-[#4ade80] border border-[#0f172a]" />
          <div className="ml-2 px-3 py-0.5 rounded-md bg-[#fffdf5] border border-[#0f172a]/50 text-[11px] font-mono font-bold text-[#0f172a] truncate max-w-[160px] sm:max-w-[240px]">
            {isMobile ? `app://${project.id}.flutter` : `https://${project.id}.app`}
          </div>
        </div>

        <div className="flex items-center gap-1.5 text-[10px] font-mono font-black px-2.5 py-0.5 rounded-md bg-[#fde047] text-[#0f172a] border border-[#0f172a]">
          {isMobile ? <Smartphone className="w-3 h-3" /> : <Globe className="w-3 h-3" />}
          <span>{isMobile ? 'FLUTTER NATIVE' : 'WEB PLATFORM'}</span>
        </div>
      </div>

      {/* content viewport */}
      <div className="relative w-full flex-1 min-h-0 bg-[#f8fafc] flex items-center justify-center overflow-hidden">
        {!imageError && project.imageUrl ? (
          <img
            src={project.imageUrl}
            alt={project.title}
            onError={() => setImageError(true)}
            className={`w-full h-full ${
              project.imageFit === 'contain' || isMobile
                ? 'object-contain object-center p-3 sm:p-4'
                : 'object-cover object-top'
            } transition-transform duration-500 group-hover/preview:scale-[1.02]`}
          />
        ) : (
          // fallback placeholder
          <div className="flex flex-col items-center justify-center p-6 text-center space-y-3">
            <div className="p-4 rounded-2xl bg-[#e0f2fe] border-2 border-[#0f172a] text-[#0284c7] shadow-[3px_3px_0px_#0f172a] group-hover/preview:scale-110 transition-transform">
              <ImageIcon className="w-8 h-8" />
            </div>

            <div>
              <div className="text-base font-black text-[#0f172a] tracking-tight">
                {project.title}
              </div>
              <p className="text-xs font-mono font-bold text-[#0284c7] mt-0.5">
                Preview Screenshot Proyek
              </p>
            </div>

            <div className="text-[11px] font-mono text-[#64748b] bg-[#fffdf5] px-3 py-1 rounded-lg border border-[#0f172a]/30">
              {project.stack.slice(0, 3).join(' • ')}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
