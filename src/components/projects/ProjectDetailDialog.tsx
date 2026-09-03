import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle2, AlertTriangle, Layers, Code2 } from 'lucide-react';
import type { Project } from '../../types/portfolio';
import { TactileButton } from '../ui/TactileButton';

interface ProjectDetailDialogProps {
  project: Project | null;
  onClose: () => void;
}

export const ProjectDetailDialog: React.FC<ProjectDetailDialogProps> = ({ project, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    if (project) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.body.style.overflow = 'auto';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [project, onClose]);

  if (!project) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-[#08111e]/85 backdrop-blur-md cursor-pointer"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ type: 'spring', stiffness: 400, damping: 28 }}
          className="relative z-10 w-full max-w-3xl bg-[#0f1f33] border border-[#223f66] rounded-2xl shadow-2xl p-6 sm:p-8 max-h-[90vh] overflow-y-auto"
        >
          {/* Header */}
          <div className="flex items-start justify-between gap-4 pb-4 border-b border-[#223f66]">
            <div>
              <div className="text-xs font-mono uppercase tracking-wider text-[#2563eb]">
                Technical Case Study
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#f8fafc] mt-1">
                {project.title}
              </h2>
              <p className="text-xs sm:text-sm font-medium text-[#94a3b8] mt-1">
                {project.subtitle}
              </p>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-[#142842] hover:bg-[#1a3354] border border-[#223f66] text-[#94a3b8] hover:text-[#f8fafc] transition-colors cursor-pointer"
              aria-label="Close dialog"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Project Background */}
          <div className="mt-6">
            <h4 className="text-xs font-mono uppercase text-[#94a3b8] mb-2 flex items-center gap-2">
              <Layers className="w-4 h-4 text-[#2563eb]" />
              <span>Project Scope & Context</span>
            </h4>
            <p className="text-sm sm:text-base text-[#f8fafc] leading-relaxed bg-[#142842] p-4 rounded-xl border border-[#223f66]">
              {project.description}
            </p>
          </div>

          {/* System Architecture */}
          <div className="mt-6">
            <h4 className="text-xs font-mono uppercase text-[#94a3b8] mb-3 flex items-center gap-2">
              <Code2 className="w-4 h-4 text-[#0d9488]" />
              <span>System Architecture & Implementation</span>
            </h4>
            <div className="space-y-2.5">
              {project.architecture.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-3 p-3 rounded-xl bg-[#142842]/60 border border-[#223f66] text-xs sm:text-sm text-[#f8fafc]"
                >
                  <CheckCircle2 className="w-4 h-4 text-[#0d9488] shrink-0 mt-0.5" />
                  <span className="leading-relaxed">{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Engineering Challenge & Resolution */}
          <div className="mt-6">
            <h4 className="text-xs font-mono uppercase text-[#94a3b8] mb-2 flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-[#d97706]" />
              <span>Core Challenge & Execution</span>
            </h4>
            <div className="p-4 rounded-xl bg-[#142842] border border-[#223f66] text-xs sm:text-sm text-[#f8fafc] leading-relaxed">
              <p className="font-semibold text-[#d97706] mb-1">Obstacle Overcome:</p>
              <p>{project.challenges}</p>
            </div>
          </div>

          {/* Tech Stack Breakdown */}
          <div className="mt-6">
            <h4 className="text-xs font-mono uppercase text-[#94a3b8] mb-3">
              Full Technology Stack
            </h4>
            <div className="flex flex-wrap gap-2">
              {project.stack.map((tech) => (
                <span
                  key={tech}
                  className="text-xs font-mono px-3 py-1 rounded-lg bg-[#142842] text-[#f8fafc] border border-[#223f66]"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Modal Footer */}
          <div className="mt-8 pt-4 border-t border-[#223f66] flex items-center justify-between">
            <span className="text-xs font-mono text-[#94a3b8]">
              Role: <strong className="text-[#f8fafc]">{project.role}</strong>
            </span>
            <TactileButton variant="secondary" onClick={onClose}>
              Close Case Study
            </TactileButton>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
