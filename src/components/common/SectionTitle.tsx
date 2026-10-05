/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';

interface SectionTitleProps {
  number: string;
  title: string;
  subtitle?: string;
  category?: string;
  className?: string;
}

export const SectionTitle: React.FC<SectionTitleProps> = ({
  number,
  title,
  subtitle,
  category,
  className = '',
}) => {
  return (
    <div className={`mb-12 ${className}`}>
      <div className="flex items-center gap-3 text-xs font-mono uppercase tracking-[0.25em] text-[#69717A] mb-3">
        <span className="font-semibold text-[#13263D]">{number}</span>
        <span className="h-px w-6 bg-[#69717A]/40" aria-hidden="true" />
        <span>{category || 'SIH 2026 / AUTODESK FORMA LAB'}</span>
      </div>
      <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-[#13263D] uppercase leading-none">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-4 text-base md:text-lg text-[#69717A] max-w-3xl font-normal leading-relaxed">
          {subtitle}
        </p>
      )}
      <div className="mt-6 w-full h-px bg-[#13263D]/10" />
    </div>
  );
};
