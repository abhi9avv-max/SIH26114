/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { ProjectData } from '../../types/project';
import { SectionTitle } from '../common/SectionTitle';

interface DataToDecisionSectionProps {
  projectData: ProjectData;
}

export const DataToDecisionSection: React.FC<DataToDecisionSectionProps> = ({ projectData }) => {
  const decisions = projectData.dataDecisions || [];

  return (
    <section id="decisions" className="py-24 border-t border-[#13263D]/10 bg-[#F4F3EF]">
      <div className="max-w-[1720px] mx-auto px-4 lg:px-8">
        <SectionTitle
          number="06B"
          title="DATA → DECISION PIPELINE"
          subtitle="Specific empirical observations from Autodesk Forma directly driving spatial, volumetric, and material interventions."
          category="COMPUTATIONAL CAUSALITY & DESIGN RESPONSIVENESS"
        />

        <div className="space-y-6 font-mono">
          {decisions.map((item) => (
            <div
              key={item.id}
              className="p-6 md:p-8 bg-[#E9E7E1]/50 hairline-border hover:bg-[#E9E7E1]/90 transition-colors"
            >
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                {/* Left: Data Observation */}
                <div className="lg:w-5/12 border-l-2 border-[#13263D] pl-4">
                  <div className="flex items-center gap-2 text-[10px] text-[#69717A] uppercase tracking-widest mb-1.5 font-bold">
                    <span>CASE {item.index} · FORMA DATA OBSERVATION</span>
                  </div>
                  <p className="text-xs sm:text-sm text-[#13263D] font-sans font-medium leading-relaxed">
                    {item.dataObservation}
                  </p>
                  <div className="mt-2 text-[10px] text-[#5B7894] font-bold">
                    SIMULATION ENGINE: {item.formaMetric}
                  </div>
                </div>

                {/* Center: Connector Arrow */}
                <div className="hidden lg:flex flex-col items-center justify-center px-4">
                  <span className="text-[10px] uppercase tracking-widest text-[#E31B23] font-bold mb-1">
                    LEADS TO
                  </span>
                  <div className="w-12 h-px bg-[#E31B23]" />
                  <span className="text-sm font-bold text-[#E31B23]">→</span>
                </div>

                {/* Right: Architectural Decision & Measurable Impact */}
                <div className="lg:w-6/12 border-l-2 border-[#E31B23] pl-4">
                  <div className="flex items-center gap-2 text-[10px] text-[#E31B23] uppercase tracking-widest mb-1.5 font-bold">
                    <span>ARCHITECTURAL DECISION & SPATIAL INTERVENTION</span>
                  </div>
                  <p className="text-xs sm:text-sm text-[#13263D] font-sans font-medium leading-relaxed">
                    {item.decision}
                  </p>
                  <div className="mt-2 pt-2 border-t border-[#13263D]/10 text-[11px] text-[#55705A] font-bold">
                    MEASURABLE IMPACT: {item.impact}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
