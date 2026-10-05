/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { ProjectData } from '../../types/project';
import { SectionTitle } from '../common/SectionTitle';

interface ProposalComparisonSectionProps {
  projectData: ProjectData;
  onUpdateSelectedProposal?: (proposalId: 'proposal-a' | 'proposal-b') => void;
}

export const ProposalComparisonSection: React.FC<ProposalComparisonSectionProps> = ({
  projectData,
  onUpdateSelectedProposal,
}) => {
  const [selectedProposalId, setSelectedProposalId] = useState<'proposal-a' | 'proposal-b'>(
    projectData.proposals.selectedProposalId
  );

  const handleSelect = (id: 'proposal-a' | 'proposal-b') => {
    setSelectedProposalId(id);
    if (onUpdateSelectedProposal) {
      onUpdateSelectedProposal(id);
    }
  };

  const comparisonRows = [
    {
      metric: "Site Area",
      propA: "1.24 km² (124 ha)",
      propB: "1.24 km² (124 ha)",
      diff: "Identical concession",
      favors: "neutral",
    },
    {
      metric: "Gross Built Area (GFA)",
      propA: "1,420,000 m²",
      propB: "1,180,000 m²",
      diff: "+240,000 m² in A (+20.3%)",
      favors: "a",
    },
    {
      metric: "Green Coverage",
      propA: "18.2% (22.5 ha)",
      propB: "34.5% (42.8 ha)",
      diff: "+89.5% open greenway in B",
      favors: "b",
    },
    {
      metric: "Sun Hours (Ground)",
      propA: "3.8 hrs/day",
      propB: "5.4 hrs/day",
      diff: "+42.1% direct sunlight in B",
      favors: "b",
    },
    {
      metric: "Daylight Potential (sDA)",
      propA: "64% occupied area",
      propB: "84% occupied area",
      diff: "+31.2% daylight compliance in B",
      favors: "b",
    },
    {
      metric: "Embodied Carbon (A1-A5)",
      propA: "468 kg CO₂e/m²",
      propB: "348 kg CO₂e/m²",
      diff: "-25.6% carbon savings in B",
      favors: "b",
    },
    {
      metric: "Solar Potential (PV Yield)",
      propA: "29.4 GWh/year",
      propB: "41.8 GWh/year",
      diff: "+42.2% annual generation in B",
      favors: "b",
    },
    {
      metric: "Noise Exposure (Residential)",
      propA: "62.4 dB(A) Lden",
      propB: "48.2 dB(A) Lden",
      diff: "-14.2 dB(A) acoustic shield in B",
      favors: "b",
    },
    {
      metric: "Mobility (5-Min Walkshed)",
      propA: "72% of population",
      propB: "94% of population",
      diff: "+30.5% pedestrian coverage in B",
      favors: "b",
    },
    {
      metric: "Public Open Space / Person",
      propA: "3.3 m² / resident",
      propB: "8.1 m² / resident",
      diff: "+145% per capita space in B",
      favors: "b",
    },
  ];

  return (
    <section id="comparison" className="py-24 border-t border-[#13263D]/10">
      <div className="max-w-[1720px] mx-auto px-4 lg:px-8">
        <SectionTitle
          number="06"
          title="TWO DIRECTIONS. ONE DECISION."
          subtitle="Direct head-to-head architectural competition comparison matrix across ten computational performance parameters."
          category="EMPIRICAL TRADE-OFF EVALUATION"
        />

        {/* Clean Comparison Table (Tabular Numerals, Hairline Rules, No Heavy Cards) */}
        <div className="overflow-x-auto hairline-border bg-[#F4F3EF] mb-16">
          <table className="w-full text-left font-mono text-xs border-collapse">
            <thead>
              <tr className="bg-[#E9E7E1] border-b border-[#13263D]/20 text-[#13263D]">
                <th className="py-4 px-6 uppercase tracking-wider font-bold">
                  PERFORMANCE METRIC
                </th>
                <th className="py-4 px-6 uppercase tracking-wider font-bold border-l border-[#13263D]/10">
                  PROPOSAL A (COMPACT CORE)
                </th>
                <th className="py-4 px-6 uppercase tracking-wider font-bold border-l border-[#13263D]/10">
                  PROPOSAL B (GREEN CONNECTED)
                </th>
                <th className="py-4 px-6 uppercase tracking-wider font-bold border-l border-[#13263D]/10">
                  DIFFERENCE & IMPACT
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#13263D]/10 tabular-nums">
              {comparisonRows.map((row, idx) => (
                <tr key={idx} className="hover:bg-[#E9E7E1]/50 transition-colors">
                  <td className="py-3.5 px-6 font-bold text-[#13263D]">
                    {row.metric}
                  </td>
                  <td className="py-3.5 px-6 text-[#69717A] border-l border-[#13263D]/10">
                    {row.propA}
                  </td>
                  <td className="py-3.5 px-6 text-[#13263D] font-medium border-l border-[#13263D]/10">
                    {row.propB}
                  </td>
                  <td className="py-3.5 px-6 text-xs border-l border-[#13263D]/10">
                    <span
                      className={`inline-block px-2 py-0.5 ${
                        row.favors === 'b'
                          ? 'bg-[#55705A]/15 text-[#55705A] font-bold'
                          : row.favors === 'a'
                          ? 'bg-[#13263D]/10 text-[#13263D] font-bold'
                          : 'text-[#69717A]'
                      }`}
                    >
                      {row.diff}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Trade-Offs Section */}
        <div className="mb-16">
          <div className="text-xs font-mono uppercase tracking-[0.25em] text-[#69717A] mb-6">
            EVALUATING THE TRADE-OFFS
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Proposal A Trade-Offs */}
            <div className="p-8 bg-[#E9E7E1]/60 hairline-border space-y-6">
              <div className="flex items-center justify-between border-b border-[#13263D]/10 pb-3">
                <span className="text-xs font-mono font-bold text-[#13263D] uppercase">
                  PROPOSAL A · COMPACT URBAN CORE
                </span>
                <span className="text-[10px] font-mono text-[#69717A]">
                  MAX REVENUE & DENSITY
                </span>
              </div>

              <div>
                <div className="text-[10px] font-mono font-bold text-[#55705A] uppercase tracking-wider mb-2">
                  KEY ADVANTAGES
                </div>
                <ul className="space-y-1.5 text-xs text-[#13263D] font-sans">
                  <li>• Delivers 240,000 m² more gross floor area for commercial office lease.</li>
                  <li>• Highly concentrated infrastructure reduces horizontal piping and road construction costs.</li>
                  <li>• Strong transit station density with direct vertical high-rise integration.</li>
                </ul>
              </div>

              <div className="pt-4 border-t border-[#13263D]/10">
                <div className="text-[10px] font-mono font-bold text-[#E31B23] uppercase tracking-wider mb-2">
                  STRUCTURAL & ENVIRONMENTAL LIMITATIONS
                </div>
                <ul className="space-y-1.5 text-xs text-[#69717A] font-sans">
                  <li>• High-rise tower foundations require 468 kg CO₂e/m² embodied carbon.</li>
                  <li>• High wind speeds (&gt;9 m/s) at tower street corners create hazardous pedestrian conditions.</li>
                  <li>• 36% of indoor commercial floor area falls below the minimum daylight threshold.</li>
                </ul>
              </div>
            </div>

            {/* Proposal B Trade-Offs */}
            <div className="p-8 bg-[#E9E7E1]/60 hairline-border space-y-6">
              <div className="flex items-center justify-between border-b border-[#13263D]/10 pb-3">
                <span className="text-xs font-mono font-bold text-[#55705A] uppercase">
                  PROPOSAL B · GREEN CONNECTED DISTRICT
                </span>
                <span className="text-[10px] font-mono text-[#55705A]">
                  BALANCED ECOLOGY & PERFORMANCE
                </span>
              </div>

              <div>
                <div className="text-[10px] font-mono font-bold text-[#55705A] uppercase tracking-wider mb-2">
                  KEY ADVANTAGES
                </div>
                <ul className="space-y-1.5 text-xs text-[#13263D] font-sans">
                  <li>• Structural height cap enables mass timber framing, cutting embodied carbon by 25.6%.</li>
                  <li>• 84% spatial daylight autonomy cuts 3.2 GWh in artificial lighting energy each year.</li>
                  <li>• Stepped massing channels coastal breezes inland, reducing urban heat stress by 38%.</li>
                  <li>• Universal 5-minute pedestrian access to the 34.7-hectare biophilic spine.</li>
                </ul>
              </div>

              <div className="pt-4 border-t border-[#13263D]/10">
                <div className="text-[10px] font-mono font-bold text-[#E31B23] uppercase tracking-wider mb-2">
                  DEVELOPMENT TRADEOFFS
                </div>
                <ul className="space-y-1.5 text-xs text-[#69717A] font-sans">
                  <li>• 16.9% lower total gross floor area compared to Proposal A.</li>
                  <li>• Requires rigorous municipal maintenance of the horizontal bioswale network.</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Final Selection Box (Configurable by student team) */}
        <div className="p-8 bg-[#13263D] text-[#F4F3EF] hairline-border">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-6 mb-6">
            <div>
              <div className="text-xs font-mono uppercase tracking-[0.25em] text-[#E31B23] mb-1 font-bold">
                JURY EVALUATION DECISION
              </div>
              <h3 className="text-2xl font-bold uppercase text-white">
                SELECTED PROPOSAL: {selectedProposalId === 'proposal-b' ? 'PROPOSAL B (GREEN CONNECTED DISTRICT)' : 'PROPOSAL A (COMPACT URBAN CORE)'}
              </h3>
            </div>

            {/* Toggle Configuration Button */}
            <div className="flex items-center gap-2 font-mono text-xs">
              <span className="text-white/60 text-[10px]">CONFIGURE SELECTION:</span>
              <button
                onClick={() => handleSelect('proposal-b')}
                className={`px-3 py-1.5 transition-colors cursor-pointer ${
                  selectedProposalId === 'proposal-b'
                    ? 'bg-[#E31B23] text-white font-bold'
                    : 'bg-white/10 text-white/70 hover:bg-white/20'
                }`}
              >
                PROPOSAL B
              </button>
              <button
                onClick={() => handleSelect('proposal-a')}
                className={`px-3 py-1.5 transition-colors cursor-pointer ${
                  selectedProposalId === 'proposal-a'
                    ? 'bg-[#E31B23] text-white font-bold'
                    : 'bg-white/10 text-white/70 hover:bg-white/20'
                }`}
              >
                PROPOSAL A
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-xs font-mono">
            <div>
              <div className="text-[10px] text-white/50 uppercase tracking-widest mb-2">
                EMPIRICAL SELECTION JUSTIFICATION
              </div>
              <p className="text-white/80 font-sans leading-relaxed text-sm">
                The selection is governed by verifiable multi-criteria performance in Autodesk Forma rather than arbitrary aesthetic preference. Proposal B was chosen because the marginal financial gain from Proposal A's additional 240k m² GFA was outweighed by severe wind canyon downdrafts, deep winter overshadowing, and a 25.6% carbon penalty.
              </p>
            </div>
            <div>
              <div className="text-[10px] text-white/50 uppercase tracking-widest mb-2">
                VERIFIED FORMA METRIC DOMINANCE
              </div>
              <ul className="space-y-2 text-white/80 font-sans text-xs">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-[#E31B23]" />
                  <span><strong>Daylight Autonomy:</strong> 84% vs 64%</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-[#55705A]" />
                  <span><strong>Embodied Carbon:</strong> 348 kg CO₂e/m² (Meets RIBA 2030)</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-[#D97706]" />
                  <span><strong>Solar Harvest:</strong> 41.8 GWh/yr vs 29.4 GWh/yr</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
