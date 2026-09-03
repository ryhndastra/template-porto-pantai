import React from 'react';

interface BrandLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  withText?: boolean;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  className = '',
  size = 'md',
  withText = false
}) => {
  const sizeMap = {
    sm: { img: 'w-8 h-8', text: 'text-xs' },
    md: { img: 'w-10 h-10', text: 'text-sm' },
    lg: { img: 'w-14 h-14', text: 'text-base' },
    xl: { img: 'w-24 h-24', text: 'text-lg' }
  };

  const currentSize = sizeMap[size];

  return (
    <div className={`inline-flex items-center gap-2.5 ${className}`}>
      <div className="relative flex items-center justify-center transition-transform group-hover:scale-105 select-none">
        <img
          src="/ryhndastra.png"
          alt="Reyhand Astra Logo"
          className={`${currentSize.img} object-contain drop-shadow-md`}
          loading="eager"
        />
      </div>

      {withText && (
        <div className="flex flex-col text-left">
          <span className={`font-bold text-white tracking-wide leading-tight drop-shadow-sm ${currentSize.text}`}>
            Reyhand Astra
          </span>
          <span className="text-[11px] text-[#fff9d4] font-mono font-medium flex items-center gap-1 drop-shadow-xs">
            &gt;_ Full-Stack &amp; Mobile
          </span>
        </div>
      )}
    </div>
  );
};
