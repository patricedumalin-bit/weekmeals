import React from 'react';

interface BudgetDonutChartProps {
  categories: { name: string; amount: number; color: string }[];
  total: number;
  size?: number;
}

export const BudgetDonutChart: React.FC<BudgetDonutChartProps> = ({ categories, total, size = 120 }) => {
  const strokeWidth = 12;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const center = size / 2;

  let currentOffset = 0;

  return (
    <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="transform -rotate-90">
        <circle
          cx={center}
          cy={center}
          r={radius}
          stroke="currentColor"
          strokeWidth={strokeWidth}
          fill="transparent"
          className="text-slate-100 dark:text-slate-800"
        />
        {categories.map((cat, idx) => {
          const percentage = (cat.amount / total) * 100;
          const strokeDashoffset = circumference - (percentage / 100) * circumference;
          const rotation = (currentOffset / 100) * 360;
          currentOffset += percentage;

          return (
            <circle
              key={idx}
              cx={center}
              cy={center}
              r={radius}
              stroke={`var(--${cat.color}, #94a3b8)`}
              strokeWidth={strokeWidth}
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              fill="transparent"
              style={{
                transform: `rotate(${rotation}deg)`,
                transformOrigin: 'center',
                transition: 'stroke-dashoffset 1s ease-in-out',
                strokeDashoffset: strokeDashoffset
              }}
            />
          );
        })}
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">Total</span>
        <span className="text-sm font-extrabold text-slate-900 dark:text-slate-100 leading-none">
          {total.toFixed(0)}€
        </span>
      </div>
    </div>
  );
};
