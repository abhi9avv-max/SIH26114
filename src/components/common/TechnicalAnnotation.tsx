/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';

interface TechnicalAnnotationProps {
  label: string;
  value: string | number;
  unit?: string;
  subtext?: string;
  position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' | 'inline';
  className?: string;
}

export const TechnicalAnnotation: React.FC<TechnicalAnnotationProps> = ({
  label,
  value,
  unit,
  subtext,
  position = 'inline',
  className = '',
}) => {
  const positionClasses = {
    'top-left': 'absolute top-6 left-6',
    'top-right': 'absolute top-6 right-6',
    'bottom-left': 'absolute bottom-6 left-6',
    'bottom-right': 'absolute bottom-6 right-6',
    'inline': 'relative',
  };

  return (
    <div
      className={`border-l-2 border-[#13263D] pl-3 py-1 bg-[#F4F3EF]/90 backdrop-blur-xs ${positionClasses[position]} ${className}`}
    >
      <div className="text-[9px] font-mono tracking-[0.2em] uppercase text-[#69717A]">
        {label}
      </div>
      <div className="text-sm md:text-base font-bold font-mono tracking-tight text-[#13263D] tabular-nums">
        {value} {unit && <span className="text-xs font-normal text-[#69717A]">{unit}</span>}
      </div>
      {subtext && (
        <div className="text-[10px] text-[#69717A] font-sans mt-0.5 max-w-[200px] leading-tight">
          {subtext}
        </div>
      )}
    </div>
  );
};
