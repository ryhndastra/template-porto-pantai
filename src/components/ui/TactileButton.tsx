import React from 'react';
import { motion } from 'framer-motion';
import type { HTMLMotionProps } from 'framer-motion';

interface TactileButtonProps extends Omit<HTMLMotionProps<'button'>, 'children'> {
  variant?: 'primary' | 'secondary' | 'sand' | 'ghost';
  children: React.ReactNode;
  icon?: React.ReactNode;
}

export const TactileButton: React.FC<TactileButtonProps> = ({
  variant = 'primary',
  children,
  icon,
  className = '',
  ...props
}) => {
  const baseStyles = 'inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl font-medium text-sm transition-colors select-none cursor-pointer';
  
  const variantStyles = {
    primary: 'bg-[#0284c7] hover:bg-[#0369a1] text-white border border-[#38bdf8] shadow-md shadow-[#0284c7]/20',
    secondary: 'bg-[#0d2844] hover:bg-[#123559] text-[#f8fafc] border border-[#224c75] hover:border-[#dfcca8]/60',
    sand: 'bg-[#dfcca8] hover:bg-[#ebdcc0] text-[#071b2f] border border-[#c4ad82] font-semibold',
    ghost: 'bg-transparent hover:bg-[#0d2844] text-[#cbd5e1] hover:text-[#f8fafc] border border-transparent hover:border-[#224c75]'
  };

  return (
    <motion.button
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.96 }}
      transition={{ type: 'spring', stiffness: 400, damping: 20 }}
      className={`${baseStyles} ${variantStyles[variant]} ${className}`}
      {...props}
    >
      {icon && <span className="w-4 h-4 flex items-center justify-center">{icon}</span>}
      <span>{children}</span>
    </motion.button>
  );
};
