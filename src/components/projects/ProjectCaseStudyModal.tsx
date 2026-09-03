import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  ExternalLink,
  Lock,
  CheckCircle2,
  AlertTriangle,
  Layers,
  Code2,
  Smartphone
} from 'lucide-react';
import type { Project } from '../../types/portfolio';
import { ProjectPreviewPlaceholder } from './ProjectPreviewPlaceholder';
import { stopLenisScroll, startLenisScroll } from '../../hooks/useLenisSmoothScroll';

interface ProjectCaseStudyModalProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
}

export const ProjectCaseStudyModal: React.FC<ProjectCaseStudyModalProps> = ({
  project,
  isOpen,
  onClose
}) => {
  // suspend global lenis scroll while dialog is open without modifying body overflow
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      stopLenisScroll();
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      startLenisScroll();
    };
  }, [isOpen, onClose]);

  if (!isOpen || !project) return null;

  return (
    <AnimatePresence>
      <div
        data-lenis-prevent="true"
        data-lenis-prevent-wheel="true"
        data-lenis-prevent-touch="true"
        className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
      >
        {/* backdrop overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-[#0f172a]/50 backdrop-blur-sm"
        />

        {/* modal container */}
        <motion.div
          data-lenis-prevent="true"
          data-lenis-prevent-wheel="true"
          data-lenis-prevent-touch="true"
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="relative w-full max-w-4xl bg-[#fffdf5] rounded-[32px] border-4 border-[#0f172a] shadow-[12px_12px_0px_#0f172a] p-6 sm:p-8 space-y-6 z-10 my-8 max-h-[90vh] overflow-y-auto"
        >
          {/* modal header and close button */}
          <div className="flex items-start justify-between gap-4 border-b-2 border-[#0f172a]/20 pb-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs font-mono font-black uppercase tracking-wider text-[#0f172a] bg-[#fde047] px-2.5 py-1 rounded-lg border-2 border-[#0f172a]">
                  {project.category === 'fullstack' ? 'FULL-STACK WEB ARCHITECTURE' : 'MOBILE FLUTTER SYSTEM'}
                </span>
                <span className="text-xs font-mono font-bold text-[#64748b]">
                  // {project.role}
                </span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-black text-[#0f172a] tracking-tight">
                {project.title}
              </h3>
              <p className="text-sm font-mono font-bold text-[#0284c7] mt-0.5">
                {project.subtitle}
              </p>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="p-2.5 rounded-2xl bg-[#fff9d4] hover:bg-[#fee2e2] border-2 border-[#0f172a] text-[#0f172a] hover:text-[#dc2626] shadow-[3px_3px_0px_#0f172a] hover:translate-x-0.5 hover:translate-y-0.5 active:shadow-none transition-all cursor-pointer shrink-0"
              aria-label="Tutup studi kasus"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* preview frame */}
          <ProjectPreviewPlaceholder
            project={project}
            isMobileFrame={project.category === 'mobile'}
            className="aspect-[16/10] w-full max-h-[340px]"
          />

          {/* performance metrics */}
          <div className="grid grid-cols-3 gap-3">
            {project.metrics.map((m, idx) => {
              const bg = idx === 0 ? 'bg-[#e0f2fe]' : idx === 1 ? 'bg-[#fef9c3]' : 'bg-[#dcfce7]';
              const labelColor = idx === 0 ? 'text-[#0369a1]' : idx === 1 ? 'text-[#854d0e]' : 'text-[#15803d]';

              return (
                <div
                  key={idx}
                  className={`p-3.5 rounded-2xl ${bg} border-2 border-[#0f172a] text-center shadow-[3px_3px_0px_#0f172a]`}
                >
                  <div className={`text-[10px] font-mono font-bold uppercase truncate ${labelColor}`}>
                    {m.label}
                  </div>
                  <div className="text-xs sm:text-base font-black text-[#0f172a] mt-0.5 truncate">
                    {m.value}
                  </div>
                </div>
              );
            })}
          </div>

          {/* project mandate and overview */}
          <div className="space-y-2.5">
            <h4 className="text-xs font-mono uppercase font-black text-[#0f172a] flex items-center gap-2">
              <Layers className="w-4 h-4 text-[#0284c7]" />
              <span>Latar Belakang &amp; Mandat Proyek</span>
            </h4>
            <p className="text-sm sm:text-base text-[#334155] leading-relaxed bg-[#fff9d4] p-5 rounded-2xl border-2 border-[#0f172a]/30 font-medium">
              {project.description}
            </p>
          </div>

          {/* architecture and technical execution */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono uppercase font-black text-[#0f172a] flex items-center gap-2">
              <Code2 className="w-4 h-4 text-[#0284c7]" />
              <span>Arsitektur Sistem &amp; Eksekusi Teknis</span>
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {project.architecture.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-3 p-3.5 rounded-xl bg-[#fff9d4] border border-[#0f172a]/30 text-xs sm:text-sm text-[#0f172a] font-medium"
                >
                  <CheckCircle2 className="w-4 h-4 text-[#16a34a] shrink-0 mt-0.5" />
                  <span className="leading-relaxed">{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* challenges and resolution */}
          <div className="space-y-2.5">
            <h4 className="text-xs font-mono uppercase font-black text-[#854d0e] flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-[#ca8a04]" />
              <span>Tantangan Utama &amp; Resolusi</span>
            </h4>
            <div className="p-4 sm:p-5 rounded-2xl bg-[#fef9c3] border-2 border-[#0f172a]/30 text-xs sm:text-sm text-[#0f172a] leading-relaxed">
              <p className="font-black text-[#854d0e] mb-1">Tantangan yang Dihadapi:</p>
              <p className="text-[#334155] font-medium">{project.challenges}</p>
            </div>
          </div>

          {/* technology stack */}
          <div className="space-y-2.5">
            <h4 className="text-xs font-mono uppercase font-black text-[#0f172a]">
              Daftar Stack Teknologi &amp; Protokol
            </h4>
            <div className="flex flex-wrap gap-2">
              {project.stack.map((tech) => (
                <span
                  key={tech}
                  className="text-xs font-mono font-bold px-3 py-1.5 rounded-xl bg-[#fff9d4] text-[#0f172a] border border-[#0f172a]/50"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* dialog action buttons */}
          <div className="pt-6 border-t-2 border-[#0f172a]/20 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-3">
              {/* demo status */}
              {project.isMobileApp ? (
                <div
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#e0f2fe] text-[#0369a1] text-xs font-mono font-bold border-2 border-[#0284c7]/50 opacity-90 cursor-not-allowed"
                  title={project.demoStatusLabel || 'Aplikasi Mobile Native'}
                >
                  <Smartphone className="w-4 h-4 text-[#0284c7]" />
                  <span>Aplikasi Mobile Native (Demo/APK on request)</span>
                </div>
              ) : project.demoUrl ? (
                <a
                  href={project.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#0284c7] hover:bg-[#0369a1] text-white text-xs font-mono font-black border-2 border-[#0f172a] shadow-[3px_3px_0px_#0f172a] hover:translate-x-0.5 hover:translate-y-0.5 active:shadow-none transition-all"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span>Kunjungi Live Demo</span>
                </a>
              ) : null}

              {/* repository button */}
              {project.isPrivateRepo ? (
                <div
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#fee2e2] text-[#991b1b] text-xs font-mono font-bold border-2 border-[#991b1b]/40 opacity-90 cursor-not-allowed"
                  title="Repository privat"
                >
                  <Lock className="w-4 h-4 text-[#dc2626]" />
                  <span>Repository privat karena hak cipta institusi &amp; kerahasiaan data</span>
                </div>
              ) : project.githubUrl ? (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#fff9d4] hover:bg-[#faeed1] text-[#0f172a] text-xs font-mono font-black border-2 border-[#0f172a] shadow-[3px_3px_0px_#0f172a] hover:translate-x-0.5 hover:translate-y-0.5 active:shadow-none transition-all"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                  </svg>
                  <span>Buka Repository GitHub</span>
                </a>
              ) : null}
            </div>

            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 rounded-xl bg-[#fffdf5] hover:bg-[#fff9d4] text-[#0f172a] text-xs font-mono font-black border-2 border-[#0f172a] shadow-[3px_3px_0px_#0f172a] hover:translate-x-0.5 hover:translate-y-0.5 active:shadow-none transition-all cursor-pointer text-center"
            >
              Tutup Dialog
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
