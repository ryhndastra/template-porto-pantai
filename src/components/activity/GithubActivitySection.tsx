import React from 'react';
import { motion } from 'framer-motion';
import { GitCommit, Calendar, Flame, ExternalLink, RefreshCw } from 'lucide-react';
import { SiGithub } from '@icons-pack/react-simple-icons';
import { useGithubContributions } from '../../hooks/useGithubContributions';
import { GithubHeatmapGrid } from './GithubHeatmapGrid';
import { profileData } from '../../data/portfolioData';

const formatIndonesianDateShort = (dateString: string): string => {
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return dateString;
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'];
  return `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`;
};

export const GithubActivitySection: React.FC = () => {
  // extract github username from profile data url
  const githubUrl = profileData.contact.github || 'https://github.com/ryhndastra';
  const username = githubUrl.split('/').filter(Boolean).pop() || 'ryhndastra';

  const { data, loading, error, selectedYear, setSelectedYear, stats } = useGithubContributions(username);

  const formatYearLabel = (yearKey: string): string => {
    if (yearKey === 'lastYear') return '1 Tahun Terakhir';
    return yearKey;
  };

  return (
    <section id="activity" className="relative -mt-2 pt-28 pb-24 sm:pt-36 sm:pb-32 bg-gradient-to-b from-[#edd69a] via-[#f2e0aa] to-[#f2e0aa] overflow-hidden select-none z-20">
      {/* organic coastal sand dune boundary transition */}
      <div className="absolute top-0 inset-x-0 h-16 sm:h-24 pointer-events-none overflow-hidden z-0">
        <svg
          viewBox="0 0 1440 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
          className="w-full h-full"
        >
          <path
            d="M-40,0 L1480,0 L1480,24 C1120,68 760,12 380,56 C200,78 60,32 -40,58 Z"
            fill="#e5ce8f"
            opacity="0.65"
          />
          <path
            d="M-40,0 L1480,0 L1480,14 C1160,48 780,6 400,38 C210,54 70,22 -40,42 Z"
            fill="#edd69a"
          />
        </svg>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8">
        {/* section header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ type: 'spring', stiffness: 220, damping: 24 }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-10 sm:pb-14 border-b border-[#0f172a]/15"
        >
          <div className="max-w-2xl">
            <span className="text-xs font-mono font-bold uppercase tracking-[0.25em] text-[#8c6239] block mb-2">
              AKTIVITAS GITHUB
            </span>
            <h2 className="text-3xl sm:text-5xl font-black text-[#0f172a] tracking-tight leading-[1.08]">
              Kontribusi &amp; Aktivitas Kode
            </h2>
          </div>

          <p className="max-w-md text-xs sm:text-sm font-medium text-[#475569] leading-relaxed">
            Rekam jejak commit, kontribusi open source, dan konsistensi pengembangan kode di GitHub.
          </p>
        </motion.div>

        {/* master bento dock card */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ type: 'spring', stiffness: 200, damping: 22, delay: 0.1 }}
          className="mt-8 sm:mt-12 rounded-[24px] sm:rounded-[32px] p-4 sm:p-9 bg-[#fffdf5] border-2 border-[#0f172a] shadow-[4px_4px_0px_#0f172a] sm:shadow-[6px_6px_0px_#0f172a]"
        >
          {/* control bar with clean username and year pills */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 pb-4 sm:pb-6 border-b border-[#e8dbc0]">
            <div className="flex items-center justify-between sm:justify-start gap-2 sm:gap-2.5 w-full sm:w-auto">
              <a
                href={githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 sm:gap-2 px-3 py-1.5 sm:px-3.5 sm:py-1.5 rounded-xl bg-[#fff9d4] hover:bg-[#fff0b3] border-2 border-[#0f172a] text-[#0f172a] text-xs font-mono font-bold shadow-[2px_2px_0px_#0f172a] transition-all hover:-translate-y-0.5"
              >
                <SiGithub className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#0f172a]" />
                <span>@{username}</span>
              </a>

              <span className="px-2.5 py-1.5 sm:px-3 sm:py-1.5 rounded-xl bg-[#fffdf5] border-2 border-[#0f172a] text-[11px] sm:text-xs font-mono font-bold text-[#8c6239] shadow-[2px_2px_0px_#0f172a]">
                {stats.totalContributions.toLocaleString('id-ID')} Kontribusi
              </span>
            </div>

            {/* year selector tabs */}
            <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto no-scrollbar py-0.5 w-full sm:w-auto">
              {stats.availableYears.map((yearKey) => {
                const isActive = selectedYear === yearKey;
                return (
                  <button
                    key={yearKey}
                    type="button"
                    onClick={() => setSelectedYear(yearKey)}
                    className={`px-3 py-1.5 sm:px-3.5 sm:py-1.5 rounded-xl text-[11px] sm:text-xs font-mono font-bold transition-all cursor-pointer shrink-0 whitespace-nowrap ${
                      isActive
                        ? 'bg-[#0284c7] text-white shadow-[2px_2px_0px_#0f172a] border-2 border-[#0f172a] -translate-y-0.5'
                        : 'bg-[#fff9d4] text-[#475569] hover:bg-[#faeed1] hover:text-[#0f172a] border-2 border-[#0f172a] hover:-translate-y-0.5 shadow-[2px_2px_0px_#0f172a]'
                    }`}
                  >
                    {formatYearLabel(yearKey)}
                  </button>
                );
              })}
            </div>
          </div>

          {/* error state or heatmap grid */}
          <div className="py-4 sm:py-6">
            {error ? (
              <div className="p-6 rounded-2xl bg-[#fef2f2] border border-[#fecaca] text-center">
                <p className="text-sm text-[#b91c1c] font-medium">
                  Gagal memuat data dari GitHub API: {error}
                </p>
                <button
                  type="button"
                  onClick={() => setSelectedYear(selectedYear)}
                  className="mt-3 inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#0f172a] text-white text-xs font-mono font-bold cursor-pointer"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Coba Lagi</span>
                </button>
              </div>
            ) : (
              <GithubHeatmapGrid
                contributions={data?.contributions || []}
                loading={loading}
              />
            )}
          </div>

          {/* metrics summary sub-cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-3.5 pt-4 sm:pt-6 border-t border-[#e8dbc0]">
            <div className="p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-[#fff9d4] border-2 border-[#0f172a] shadow-[2px_2px_0px_#0f172a]">
              <div className="flex items-center gap-1.5 sm:gap-2 text-[#8c6239] text-[10px] sm:text-xs font-mono font-bold">
                <GitCommit className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#0284c7]" />
                <span>TOTAL COMMIT</span>
              </div>
              <div className="text-xl sm:text-2xl font-black text-[#0f172a] mt-1.5 sm:mt-2">
                {stats.totalContributions.toLocaleString('id-ID')}
              </div>
              <span className="text-[10px] sm:text-[11px] text-[#64748b] font-mono mt-0.5 block truncate">
                periode {formatYearLabel(selectedYear)}
              </span>
            </div>

            <div className="p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-[#fff9d4] border-2 border-[#0f172a] shadow-[2px_2px_0px_#0f172a]">
              <div className="flex items-center gap-1.5 sm:gap-2 text-[#8c6239] text-[10px] sm:text-xs font-mono font-bold">
                <Flame className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#ea580c]" />
                <span>HARI TERAKTIF</span>
              </div>
              <div className="text-xl sm:text-2xl font-black text-[#0f172a] mt-1.5 sm:mt-2 truncate">
                {stats.maxDay ? `${stats.maxDay.count} Commit` : '-'}
              </div>
              <span className="text-[10px] sm:text-[11px] text-[#64748b] font-mono mt-0.5 block truncate">
                {stats.maxDay ? formatIndonesianDateShort(stats.maxDay.date) : 'Tidak ada data'}
              </span>
            </div>

            <div className="p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-[#fff9d4] border-2 border-[#0f172a] shadow-[2px_2px_0px_#0f172a]">
              <div className="flex items-center gap-1.5 sm:gap-2 text-[#8c6239] text-[10px] sm:text-xs font-mono font-bold">
                <Calendar className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#16a34a]" />
                <span>HARI PRODUKTIF</span>
              </div>
              <div className="text-xl sm:text-2xl font-black text-[#0f172a] mt-1.5 sm:mt-2">
                {stats.activeDaysCount} Hari
              </div>
              <span className="text-[10px] sm:text-[11px] text-[#64748b] font-mono mt-0.5 block truncate">
                avg {stats.averagePerActiveDay} / hari
              </span>
            </div>

            <a
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-[#0f172a] hover:bg-[#1e293b] text-white flex flex-col justify-between border-2 border-[#0f172a] shadow-[2px_2px_0px_#0f172a] transition-all hover:-translate-y-0.5 group cursor-pointer"
            >
              <div className="flex items-center justify-between text-[10px] sm:text-xs font-mono font-bold text-[#38bdf8]">
                <span>PROFIL GITHUB</span>
                <ExternalLink className="w-3.5 h-3.5 sm:w-4 sm:h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </div>
              <div className="mt-1.5 sm:mt-2">
                <div className="text-sm sm:text-base font-black text-[#f8fafc] truncate">@{username}</div>
                <span className="text-[10px] sm:text-[11px] text-[#94a3b8] font-mono block truncate">
                  Buka riwayat repositori &rarr;
                </span>
              </div>
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
