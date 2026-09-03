import React from 'react';
import { motion } from 'framer-motion';
import { MapPin } from 'lucide-react';
import { profileData } from '../../data/portfolioData';
import { useCardTilt } from '../../hooks/useCardTilt';

interface ProfilePhotoCardProps {
  isFlooded: boolean;
}

export const ProfilePhotoCard: React.FC<ProfilePhotoCardProps> = ({ isFlooded }) => {
  const { tiltProps } = useCardTilt(6);

  return (
    <motion.div
      animate={
        isFlooded
          ? {
              rotate: -28,
              x: -36,
              y: 78,
              scale: 0.94,
              transition: { type: 'spring', stiffness: 160, damping: 16 }
            }
          : {
              rotate: 0,
              x: 0,
              y: 0,
              scale: 1,
              transition: { type: 'spring', stiffness: 260, damping: 18 }
            }
      }
      className="relative w-full flex flex-col items-center lg:items-start gap-6"
    >
      <div
        {...tiltProps}
        className="relative w-full max-w-sm rounded-[32px] p-3.5 bg-[#fffdf5] border border-[#e8dbc0] shadow-2xl shadow-[#8c6239]/8 group cursor-pointer"
      >
        <div className="relative aspect-[3/4] w-full rounded-[24px] overflow-hidden bg-[#faeed1] border border-[#e2d3b3] flex items-center justify-center">
          <img
            src={profileData.avatarUrl || '/avatar.svg'}
            alt={profileData.name}
            className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = '/avatar.svg';
            }}
          />

          <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a]/75 via-transparent to-transparent opacity-65 pointer-events-none" />

          <div className="absolute bottom-4 left-4 right-4 p-3 rounded-xl bg-[#fffdf5]/90 border border-[#e8dbc0] backdrop-blur-md shadow-sm">
            <div className="text-sm font-bold text-[#0f172a]">
              {profileData.name}
            </div>
            <div className="text-xs text-[#8c6239] font-mono mt-0.5">
              {profileData.education}
            </div>
          </div>
        </div>

        <div className="mt-3 px-2 flex items-center justify-between text-[11px] font-mono text-[#8c6239]">
          <span>FOTO PROFIL</span>
          <span>ID // REYHAND ASTRA</span>
        </div>
      </div>

      {/* Location & Operating Environment */}
      <motion.div
        animate={isFlooded ? { rotate: 12, x: 24, y: 30 } : { rotate: 0, x: 0, y: 0 }}
        className="w-full max-w-sm p-4 rounded-2xl bg-[#fffdf5] border border-[#e8dbc0] flex items-center justify-between text-xs font-mono text-[#0f172a] shadow-sm"
      >
        <div className="flex items-center gap-2">
          <MapPin className="w-4 h-4 text-[#8c6239]" />
          <span>Indonesia</span>
        </div>
        <span className="text-[#0284c7] font-bold">Linux Enthusiasts</span>
      </motion.div>
    </motion.div>
  );
};
