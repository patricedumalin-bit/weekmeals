import React from 'react';
import { Crown } from 'lucide-react';

interface PremiumBadgeProps {
  className?: string;
  size?: 'xs' | 'sm' | 'md';
}

export const PremiumBadge: React.FC<PremiumBadgeProps> = ({
  className = "",
  size = 'sm'
}) => {
  const sizeClasses = {
    xs: "w-2.5 h-2.5",
    sm: "w-3 h-3",
    md: "w-4 h-4"
  };

  return (
    <span className={`inline-flex items-center justify-center bg-gradient-to-r from-amber-400 to-orange-500 text-slate-900 rounded-full p-0.5 shadow-sm border border-amber-300/50 ${className}`}>
      <Crown className={`${sizeClasses[size]} fill-current`} />
    </span>
  );
};
