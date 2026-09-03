import React from 'react';

export const ProjectShorelineBackground: React.FC = () => {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden select-none">
      <div className="absolute top-0 inset-x-0 h-[220px] w-full z-10">
        <svg
          viewBox="0 0 1440 220"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
          className="w-full h-full"
        >
          <path
            d="M0,0 L1440,0 L1440,80 Q1060,160 720,95 T0,130 Z"
            fill="#fff9d4"
          />

          <path
            d="M0,0 L1440,0 L1440,110 Q1080,190 740,125 T0,155 Z"
            fill="#faeed1"
            opacity="0.85"
          />

          <path
            d="M0,0 L1440,0 L1440,140 Q1100,215 760,150 T0,180 Z"
            fill="#38bdf8"
            opacity="0.35"
          />

          <path
            d="M0,180 Q760,150 1440,140"
            stroke="#ffffff"
            strokeWidth="3.5"
            strokeLinecap="round"
            opacity="0.85"
          />
        </svg>
      </div>

      <div className="absolute inset-0 bg-gradient-to-b from-[#02587a] via-[#0284c7] to-[#02587a]" />

      <div className="absolute inset-0 pointer-events-none opacity-40">
        <svg
          viewBox="0 0 1440 1200"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
          className="w-full h-full"
        >
          <path
            d="M0,220 C360,180 720,260 1080,210 C1260,185 1380,240 1440,220"
            stroke="rgba(255, 255, 255, 0.6)"
            strokeWidth="2.2"
          />
          <path
            d="M0,480 C360,520 720,440 1080,500 C1260,530 1380,470 1440,490"
            stroke="rgba(255, 255, 255, 0.45)"
            strokeWidth="1.8"
          />
          <path
            d="M0,760 C360,710 720,800 1080,740 C1260,710 1380,780 1440,760"
            stroke="rgba(255, 255, 255, 0.55)"
            strokeWidth="2"
          />
          <path
            d="M0,1040 C360,1090 720,1010 1080,1070 C1260,1100 1380,1030 1440,1050"
            stroke="rgba(255, 255, 255, 0.4)"
            strokeWidth="1.8"
          />
        </svg>
      </div>

      <div className="absolute top-1/4 left-1/3 w-[550px] h-[550px] rounded-full bg-[#38bdf8]/15 blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/3 right-1/4 w-[600px] h-[600px] rounded-full bg-[#0ea5e9]/15 blur-3xl pointer-events-none" />
    </div>
  );
};
