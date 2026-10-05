/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';

interface EmptyDataBadgeProps {
  type?: 'forma' | 'render' | 'bim' | 'custom';
  customTitle?: string;
  customMessage?: string;
  className?: string;
}

export const EmptyDataBadge: React.FC<EmptyDataBadgeProps> = ({
  type = 'forma',
  customTitle,
  customMessage,
  className = '',
}) => {
  const configs = {
    forma: {
      title: "FORMA DATA PENDING",
      message: "Analysis results will appear here once the project data is added from the Autodesk Forma workspace.",
    },
    render: {
      title: "RENDER PENDING",
      message: "Final project render will appear here once high-resolution architectural exports are linked.",
    },
    bim: {
      title: "REVIT MODEL PENDING",
      message: "Detailed BIM development will appear here once synchronized via Autodesk Revit connector.",
    },
    custom: {
      title: customTitle || "DATA STREAM PENDING",
      message: customMessage || "Awaiting project input.",
    },
  };

  const config = configs[type] || configs.forma;

  return (
    <div
      className={`hairline-border p-6 bg-[#E9E7E1]/50 flex flex-col justify-center items-start ${className}`}
    >
      <div className="flex items-center gap-2 mb-2">
        <span className="w-2 h-2 rounded-none bg-[#D97706]" aria-hidden="true" />
        <span className="text-xs font-mono font-bold tracking-[0.2em] text-[#13263D] uppercase">
          {config.title}
        </span>
      </div>
      <p className="text-xs text-[#69717A] max-w-md font-sans leading-relaxed">
        {config.message}
      </p>
    </div>
  );
};
