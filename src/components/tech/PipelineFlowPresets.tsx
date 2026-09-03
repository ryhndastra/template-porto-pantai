import React from 'react';
import { Layers, Globe, Smartphone, Server, Terminal, Lock } from 'lucide-react';

export type FlowDomainId = 'all' | 'web' | 'mobile' | 'backend' | 'devops' | 'cybersecurity';

interface PipelineFlowPresetsProps {
  activeDomain: FlowDomainId;
  onSelectDomain: (domain: FlowDomainId) => void;
}

export const PipelineFlowPresets: React.FC<PipelineFlowPresetsProps> = ({
  activeDomain,
  onSelectDomain
}) => {
  const domains: {
    id: FlowDomainId;
    label: string;
    icon: React.FC<{ className?: string }>;
    tag: string;
    isComingSoon?: boolean;
  }[] = [
    {
      id: 'all',
      label: 'Semua Stack',
      icon: Layers,
      tag: 'Semua'
    },
    {
      id: 'web',
      label: 'Frontend / Web',
      icon: Globe,
      tag: 'Web'
    },
    {
      id: 'mobile',
      label: 'Mobile App',
      icon: Smartphone,
      tag: 'Mobile'
    },
    {
      id: 'backend',
      label: 'Backend & DB',
      icon: Server,
      tag: 'Backend'
    },
    {
      id: 'devops',
      label: 'DevOps & Linux',
      icon: Terminal,
      tag: 'DevOps'
    },
    {
      id: 'cybersecurity',
      label: 'Cyber Security',
      icon: Lock,
      tag: 'Coming Soon',
      isComingSoon: true
    }
  ];

  return (
    <div className="space-y-2.5">
      <div className="flex items-center justify-between">
        <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#0369a1]">
          Kategori
        </span>
        <span className="text-[11px] font-mono text-[#64748b]">
          Pilih kategori stack
        </span>
      </div>

      {/* domain filter buttons */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
        {domains.map((domain) => {
          const Icon = domain.icon;
          const isActive = activeDomain === domain.id;

          if (domain.isComingSoon) {
            return (
              <div
                key={domain.id}
                title="Modul Cyber Security sedang dalam tahap persiapan"
                className="p-3 rounded-2xl border-2 border-dashed border-[#94a3b8] bg-[#f1f5f9]/70 text-left opacity-50 cursor-not-allowed select-none flex flex-col justify-between"
              >
                <div className="flex items-center justify-between">
                  <div className="w-7 h-7 rounded-lg border border-[#94a3b8] flex items-center justify-center bg-[#e2e8f0] text-[#64748b]">
                    <Icon className="w-3.5 h-3.5" />
                  </div>

                  <span className="text-[9px] font-mono font-bold uppercase px-1.5 py-0.5 rounded border bg-[#e2e8f0] text-[#64748b] border-[#cbd5e1]">
                    {domain.tag}
                  </span>
                </div>

                <div className="mt-2 text-xs font-bold text-[#64748b] tracking-tight leading-tight">
                  {domain.label}
                </div>
              </div>
            );
          }

          return (
            <button
              key={domain.id}
              type="button"
              onClick={() => onSelectDomain(domain.id)}
              className={`p-3 rounded-2xl border-2 border-[#0f172a] text-left transition-all duration-200 cursor-pointer select-none flex flex-col justify-between ${
                isActive
                  ? 'bg-[#fde047] shadow-[4px_4px_0px_#0f172a] translate-x-0.5 translate-y-0.5'
                  : 'bg-[#fffdf5] shadow-[2px_2px_0px_#0f172a] hover:bg-[#fff9d4] hover:shadow-[4px_4px_0px_#0f172a]'
              }`}
            >
              <div className="flex items-center justify-between">
                <div
                  className={`w-7 h-7 rounded-lg border border-[#0f172a] flex items-center justify-center ${
                    isActive ? 'bg-[#0f172a] text-[#fde047]' : 'bg-[#faeed1] text-[#0f172a]'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                </div>

                <span className="text-[9px] font-mono font-bold uppercase px-1.5 py-0.5 rounded border bg-[#faeed1] text-[#0f172a] border-[#0f172a]/30">
                  {domain.tag}
                </span>
              </div>

              <div className="mt-2 text-xs font-black text-[#0f172a] tracking-tight leading-tight">
                {domain.label}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
