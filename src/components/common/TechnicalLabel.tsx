/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';

interface TechnicalLabelProps {
  label: string;
  value?: string | number;
  unit?: string;
  status?: 'verified' | 'pending' | 'calibrating';
  className?: string;
}

export const TechnicalLabel: React.FC<TechnicalLabelProps> = ({
  label,
  value,
  unit,
  status,
  className = '',
}) => {
  return (
    <div className={`flex flex-col gap-0.5 ${className}`}>
      <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#69717A]">
        {label}
      </span>
      {value !== undefined ? (
        <span className="text-sm font-semibold tracking-tight text-[#13263D] font-mono tabular-nums">
          {value} {unit && <span className="text-xs font-normal text-[#69717A]">{unit}</span>}
        </span>
      ) : null}
      {status === 'pending' && (
        <span className="text-[9px] font-mono tracking-wider text-[#D97706] uppercase">
          [FORMA DATA PENDING]
        </span>
      )}
    </div>
  );
};
