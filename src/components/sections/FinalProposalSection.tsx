/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { ProjectData } from '../../types/project';
import { SectionTitle } from '../common/SectionTitle';
import { TechnicalAnnotation } from '../common/TechnicalAnnotation';

interface FinalProposalSectionProps {
  projectData: ProjectData;
  onOpenJuryMode: () => void;
}

export const FinalProposalSection: React.FC<FinalProposalSectionProps> = ({
  projectData,
  onOpenJuryMode,
}) => {
  const { finalProposal } = projectData;

  return (
    <section id="final" className="py-24 border-t border-[#13263D]/10">
      <div className="max-w-[1720px] mx-auto px-4 lg:px-8">
        <SectionTitle
          number="10"
          title="THE FINAL DIRECTION"
          subtitle={finalProposal.summary}
          category="SYNTHESIS, JURY RECOMMENDATION & IMPLEMENTATION"
        />

        {/* Masterplan Image at Maximum Visual Impact (Full-Width Bleed) */}
        <div className="relative w-full aspect-[21/9] min-h-[460px] bg-[#E9E7E1] hairline-border overflow-hidden mb-16 group">
          <img
            src={projectData.media[0]?.imageSrc}
            alt="Final Smart City Masterplan"
            className="w-full h-full object-cover filter contrast-105"
            referrerPolicy="no-referrer"
          />

          <div className="absolute top-6 left-6 bg-[#F4F3EF]/95 px-4 py-2 font-mono text-xs text-[#13263D] hairline-border">
            <span className="text-[#E31B23] font-bold">FINAL SELECTION:</span> {finalProposal.selectedProposal.title}
          </div>

          <div className="absolute bottom-6 left-6 right-6 hidden sm:flex items-center justify-between pointer-events-none">
            <div className="flex gap-4 pointer-events-auto">
              <TechnicalAnnotation
                label="VERIFIED GFA"
                value={finalProposal.selectedProposal.keyMetrics.grossFloorArea}
                subtext="Balanced urban intensity"
              />
              <TechnicalAnnotation
                label="ECOLOGICAL CANOPY"
                value={`${finalProposal.selectedProposal.keyMetrics.greenCoveragePercentage}%`}
                subtext="Continuous sponge-city corridor"
              />
              <TechnicalAnnotation
                label="CARBON RATING"
                value={finalProposal.selectedProposal.keyMetrics.embodiedCarbonScore}
                subtext="Meets RIBA 2030 Climate Standard"
              />
            </div>

            <button
              onClick={onOpenJuryMode}
              className="pointer-events-auto px-6 py-3 bg-[#E31B23] text-white font-mono text-xs font-bold uppercase tracking-widest hover:bg-[#13263D] transition-colors cursor-pointer shadow-lg"
            >
              LAUNCH JURY PRESENTATION →
            </button>
          </div>
        </div>

        {/* WHY THIS PROPOSAL? Section */}
        <div className="mt-16">
          <div className="flex items-center gap-3 text-xs font-mono uppercase tracking-[0.25em] text-[#69717A] mb-8">
            <span className="text-[#E31B23] font-bold">WHY THIS PROPOSAL?</span>
            <span>:</span>
            <span>FIVE EVIDENCE-BASED CRITERIA GROUNDED IN FORMA METRICS</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 divide-y md:divide-y-0 md:divide-x divide-[#13263D]/10 hairline-border bg-[#F4F3EF]">
            {finalProposal.evidenceReasons.map((item, idx) => (
              <div key={idx} className="p-6 flex flex-col justify-between">
                <div>
                  <div className="text-[10px] font-mono text-[#69717A] uppercase tracking-widest mb-1">
                    CRITERION 0{idx + 1}
                  </div>
                  <div className="text-base font-bold font-mono text-[#E31B23] mb-2">
                    {item.metricGain}
                  </div>
                  <h4 className="text-sm font-bold uppercase text-[#13263D] mb-3">
                    {item.category}
                  </h4>
                  <p className="text-xs text-[#69717A] leading-relaxed font-sans">
                    {item.evidence}
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-[#13263D]/10 text-[9px] font-mono text-[#55705A] font-bold">
                  VERIFIED IN AUTODESK FORMA
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
