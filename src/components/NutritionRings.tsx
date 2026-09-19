import React from 'react';

interface NutritionRingsProps {
  proteinPct: number;
  carbsPct: number;
  fatPct: number;
  size?: number;
}

export const NutritionRings: React.FC<NutritionRingsProps> = ({
  proteinPct,
  carbsPct,
  fatPct,
  size = 80
}) => {
  const strokeWidth = 8;
  const center = size / 2;

  const Ring = ({ pct, radius, color, delay }: { pct: number, radius: number, color: string, delay: number }) => {
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (pct / 100) * circumference;

    return (
      <g className="transform -rotate-90 origin-center">
        {/* Background track */}
        <circle
          cx={center}
          cy={center}
          r={radius}
          stroke="currentColor"
          strokeWidth={strokeWidth}
          fill="transparent"
          className="text-slate-100 dark:text-slate-800"
        />
        {/* Progress ring */}
        <circle
          cx={center}
          cy={center}
          r={radius}
          stroke={color}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={circumference} // Start empty for animation
          strokeLinecap="round"
          fill="transparent"
          style={{
            transition: 'stroke-dashoffset 1.5s ease-out',
            transitionDelay: `${delay}ms`,
            strokeDashoffset: offset
          }}
        />
      </g>
    );
  };

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="overflow-visible">
      {/* Fat Ring (Outer) */}
      <Ring pct={fatPct} radius={center - strokeWidth / 2} color="#10b981" delay={400} />
      {/* Carbs Ring (Middle) */}
      <Ring pct={carbsPct} radius={center - strokeWidth * 1.5 - 2} color="#3b82f6" delay={200} />
      {/* Protein Ring (Inner) */}
      <Ring pct={proteinPct} radius={center - strokeWidth * 2.5 - 4} color="#f43f5e" delay={0} />
    </svg>
  );
};
