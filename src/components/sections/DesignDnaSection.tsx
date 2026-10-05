/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { ProjectData } from '../../types/project';
import { SectionTitle } from '../common/SectionTitle';

interface DesignDnaSectionProps {
  projectData: ProjectData;
}

export const DesignDnaSection: React.FC<DesignDnaSectionProps> = ({ projectData }) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const dnaList = projectData.designDna || [];

  // Subtle architectural blueprint schematics for each tenet
  const renderTenetBackground = (index: number) => {
    switch (index) {
      case 0: // 01 GREEN FIRST
        return (
          <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-0 group-hover:opacity-15 transition-opacity duration-500" viewBox="0 0 200 200">
            <circle cx="100" cy="100" r="80" fill="none" stroke="#55705A" strokeWidth="1" strokeDasharray="3 3" />
            <circle cx="100" cy="100" r="55" fill="none" stroke="#55705A" strokeWidth="0.8" />
            <circle cx="100" cy="100" r="30" fill="#55705A" fillOpacity="0.2" />
            <path d="M 100 20 L 100 180 M 20 100 L 180 100" stroke="#55705A" strokeWidth="0.5" strokeDasharray="2 2" />
          </svg>
        );
      case 1: // 02 WALKABLE BY DESIGN
        return (
          <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-0 group-hover:opacity-15 transition-opacity duration-500" viewBox="0 0 200 200">
            <polygon points="100,20 170,60 170,140 100,180 30,140 30,60" fill="none" stroke="#13263D" strokeWidth="1" strokeDasharray="4 2" />
            <polygon points="100,50 145,75 145,125 100,150 55,125 55,75" fill="none" stroke="#13263D" strokeWidth="0.8" />
            <circle cx="100" cy="100" r="6" fill="#E31B23" />
            <line x1="100" y1="100" x2="160" y2="65" stroke="#E31B23" strokeWidth="0.8" strokeDasharray="2 1" />
          </svg>
        );
      case 2: // 03 CLIMATE RESPONSIVE
        return (
          <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-0 group-hover:opacity-15 transition-opacity duration-500" viewBox="0 0 200 200">
            <path d="M 20 160 Q 100 20 180 160" fill="none" stroke="#CA8A04" strokeWidth="1.2" strokeDasharray="3 3" />
            <circle cx="100" cy="65" r="14" fill="#CA8A04" fillOpacity="0.3" stroke="#CA8A04" strokeWidth="1" />
            <line x1="20" y1="170" x2="180" y2="170" stroke="#13263D" strokeWidth="0.8" />
            <path d="M 10 130 C 50 120 120 150 190 120" stroke="#0284C7" strokeWidth="0.8" strokeDasharray="2 2" fill="none" />
          </svg>
        );
      case 3: // 04 CONNECTED MOBILITY
        return (
          <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-0 group-hover:opacity-15 transition-opacity duration-500" viewBox="0 0 200 200">
            <circle cx="60" cy="100" r="12" fill="none" stroke="#E31B23" strokeWidth="1.5" />
            <circle cx="140" cy="100" r="12" fill="none" stroke="#E31B23" strokeWidth="1.5" />
            <path d="M 72 100 L 128 100" stroke="#E31B23" strokeWidth="2" />
            <path d="M 60 40 L 60 88 M 140 112 L 140 160" stroke="#13263D" strokeWidth="1" strokeDasharray="3 2" />
          </svg>
        );
      case 4: // 05 ENERGY CONSCIOUS
        return (
          <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-0 group-hover:opacity-15 transition-opacity duration-500" viewBox="0 0 200 200">
            <g stroke="#13263D" strokeWidth="0.8" fill="none">
              <line x1="30" y1="50" x2="170" y2="50" />
              <line x1="30" y1="80" x2="170" y2="80" />
              <line x1="30" y1="110" x2="170" y2="110" />
              <line x1="30" y1="140" x2="170" y2="140" />
              <line x1="60" y1="30" x2="60" y2="160" />
              <line x1="100" y1="30" x2="100" y2="160" />
              <line x1="140" y1="30" x2="140" y2="160" />
            </g>
          </svg>
        );
      case 5: // 06 HUMAN CENTRIC
        return (
          <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-0 group-hover:opacity-15 transition-opacity duration-500" viewBox="0 0 200 200">
            <path d="M 20 100 A 30 30 0 0 1 80 100 A 30 30 0 0 0 140 100 A 30 30 0 0 1 200 100" fill="none" stroke="#13263D" strokeWidth="1" />
            <path d="M 20 80 A 40 40 0 0 1 100 80 A 40 40 0 0 0 180 80" fill="none" stroke="#55705A" strokeWidth="0.8" strokeDasharray="3 3" />
            <circle cx="100" cy="100" r="4" fill="#E31B23" />
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <section id="dna" className="py-24 border-t border-[#13263D]/10 bg-[#F4F3EF]">
      <div className="max-w-[1720px] mx-auto px-4 lg:px-8">
        <SectionTitle
          number="02A"
          title="THE DESIGN DNA"
          subtitle="Six foundational architectural principles governing every massing move, street orientation, and computational simulation."
          category="DESIGN PHILOSOPHY & URBAN ONTOLOGY"
        />

        {/* Editorial Grid (NO generic rounded cards, clean architectural layout with hover depth) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 divide-y lg:divide-y-0 divide-[#13263D]/10 hairline-border bg-[#F4F3EF]">
          {dnaList.map((item, index) => {
            const isHovered = hoveredIndex === index;
            return (
              <div
                key={item.number}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                className={`p-8 lg:p-10 transition-all duration-300 relative group cursor-pointer overflow-hidden ${
                  index % 3 !== 2 ? 'lg:border-r border-[#13263D]/10' : ''
                } ${index >= 3 ? 'lg:border-t border-[#13263D]/10' : ''} ${
                  isHovered ? 'bg-[#E9E7E1]' : 'bg-transparent hover:bg-[#E9E7E1]/50'
                }`}
              >
                {/* Subtle Architectural Blueprint Background Motif */}
                {renderTenetBackground(index)}

                {/* Top Row: Number & Status */}
                <div className="flex items-baseline justify-between mb-6 relative z-10">
                  <span className="text-4xl sm:text-5xl font-black font-mono tracking-tighter text-[#13263D]/30 transition-colors group-hover:text-[#E31B23]">
                    {item.number}
                  </span>
                  <span className="text-[9px] font-mono tracking-[0.2em] text-[#69717A] uppercase">
                    PRINCIPLE 0{index + 1}
                  </span>
                </div>

                {/* Title with animated underline */}
                <div className="relative mb-3 z-10">
                  <h3 className="text-2xl font-black uppercase tracking-tight text-[#13263D]">
                    {item.title}
                  </h3>
                  <div
                    className={`h-[2px] bg-[#E31B23] transition-all duration-300 mt-2 ${
                      isHovered ? 'w-full' : 'w-8'
                    }`}
                  />
                </div>

                <div className="text-xs font-mono font-semibold text-[#13263D] mb-3 relative z-10">
                  {item.subtitle}
                </div>

                {/* Description with subtle hover reveal */}
                <div className="relative z-10 transition-all duration-300 min-h-[72px]">
                  <p className={`text-sm text-[#69717A] font-sans leading-relaxed transition-opacity duration-300 ${
                    isHovered ? 'text-[#13263D] opacity-100' : 'opacity-85'
                  }`}>
                    {item.description}
                  </p>
                </div>

                {/* Forma Impact Tag */}
                <div className="pt-4 mt-4 border-t border-[#13263D]/10 flex items-center justify-between font-mono text-[10px] relative z-10">
                  <span className="text-[#69717A] uppercase tracking-wider">FORMA IMPACT:</span>
                  <span className="font-bold text-[#55705A]">{item.formaImpact}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
