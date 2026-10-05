/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { ProjectData } from '../../types/project';
import { SectionTitle } from '../common/SectionTitle';

interface ProposalsSectionProps {
  projectData: ProjectData;
  onNavigateToComparison: () => void;
}

export const ProposalsSection: React.FC<ProposalsSectionProps> = ({
  projectData,
  onNavigateToComparison,
}) => {
  const { proposalA, proposalB } = projectData.proposals;
  const [activeTab, setActiveTab] = useState<'both' | 'a' | 'b'>('both');
  const [hoveredSide, setHoveredSide] = useState<'a' | 'b' | null>(null);

  // 8. WHY THIS DESIGN? SEQUENCE DATA
  const whySequence = [
    {
      step: '01',
      title: 'SITE CONDITIONS',
      detail: 'Prevailing South-West coastal monsoon winds (3.8 m/s), high summer solar radiation (5.2 kWh/m²), and an 8-lane expressway boundary generating 76.4 dB(A) noise.',
    },
    {
      step: '02',
      title: 'URBAN CHALLENGES',
      detail: 'Balancing mandatory municipal commercial density (>1M m² GFA) while avoiding wind canyon downdrafts, deep street overshadowing, and excessive structural carbon.',
    },
    {
      step: '03',
      title: 'DESIGN RESPONSE',
      detail: 'Transitioned from monolithic towers to a stepped 28° massing typology centered on a continuous 34.7 ha biophilic greenway connecting to the tidal harbor.',
    },
    {
      step: '04',
      title: 'FORMA ANALYSIS',
      detail: 'Computational simulation in Autodesk Forma proved Proposal B delivers +42% more sun hours, 84% daylight autonomy, and saves 141,000 t CO₂e in embodied carbon.',
    },
    {
      step: '05',
      title: 'FINAL DECISION',
      detail: 'Proposal B (Green Connected District) is selected for full BIM implementation in Revit 2026, delivering an evidence-backed 15-minute resilient community.',
    },
  ];

  return (
    <section id="proposals" className="py-24 border-t border-[#13263D]/10">
      <div className="max-w-[1720px] mx-auto px-4 lg:px-8">
        <SectionTitle
          number="05"
          title="PROPOSALS"
          subtitle="Two distinct urban design hypotheses generated and tested computationally in Autodesk Forma."
          category="ITERATIVE MASSING & TYPOLOGICAL ALTERNATIVES"
        />

        {/* View Mode Selector */}
        <div className="flex items-center justify-between py-3 border-b border-[#13263D]/10 mb-8 font-mono text-xs">
          <div className="text-[10px] uppercase tracking-widest text-[#69717A]">
            PROPOSAL COMPARISON VIEW
          </div>
          <div className="flex items-center gap-1">
            <button
              onClick={() => setActiveTab('both')}
              className={`px-3 py-1 text-[11px] transition-colors cursor-pointer ${
                activeTab === 'both' ? 'bg-[#13263D] text-[#F4F3EF]' : 'text-[#69717A] hover:text-[#13263D]'
              }`}
            >
              SPLIT-SCREEN COMPARISON
            </button>
            <button
              onClick={() => setActiveTab('a')}
              className={`px-3 py-1 text-[11px] transition-colors cursor-pointer ${
                activeTab === 'a' ? 'bg-[#13263D] text-[#F4F3EF]' : 'text-[#69717A] hover:text-[#13263D]'
              }`}
            >
              PROPOSAL A ONLY
            </button>
            <button
              onClick={() => setActiveTab('b')}
              className={`px-3 py-1 text-[11px] transition-colors cursor-pointer ${
                activeTab === 'b' ? 'bg-[#13263D] text-[#F4F3EF]' : 'text-[#69717A] hover:text-[#13263D]'
              }`}
            >
              PROPOSAL B ONLY
            </button>
          </div>
        </div>

        {/* 7. Large Split-Screen Architectural Visuals with Central Divider & Hover Interaction */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16 relative">
          {/* Central Vertical Divider on Desktop */}
          {activeTab === 'both' && (
            <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-px bg-[#13263D]/15 -translate-x-1/2 z-10 pointer-events-none" />
          )}

          {/* Proposal A Visual Container */}
          {(activeTab === 'both' || activeTab === 'a') && (
            <div
              onMouseEnter={() => setHoveredSide('a')}
              onMouseLeave={() => setHoveredSide(null)}
              className={`relative transition-all duration-300 ${
                activeTab === 'a' ? 'lg:col-span-2' : ''
              } ${
                activeTab === 'both' && hoveredSide === 'b' ? 'opacity-65 filter grayscale-[30%]' : 'opacity-100'
              } ${activeTab === 'both' && hoveredSide === 'a' ? 'transform scale-[1.01] z-20' : ''}`}
            >
              <div className="relative aspect-[16/10] bg-[#E9E7E1] hairline-border overflow-hidden group">
                <img
                  src={projectData.media[0]?.imageSrc}
                  alt="Proposal A Compact Urban Core"
                  className="w-full h-full object-cover filter contrast-105 brightness-95 group-hover:scale-105 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-4 left-4 bg-[#F4F3EF]/95 px-3 py-1 font-mono text-[10px] text-[#13263D] hairline-border font-bold">
                  {proposalA.code} · {proposalA.title}
                </div>

                {/* 3 Revealed Key Metrics Overlay */}
                <div className="absolute bottom-4 left-4 right-4 bg-[#F4F3EF]/95 p-4 hairline-border font-mono text-xs">
                  <div className="flex items-center justify-between text-[9px] uppercase tracking-widest text-[#69717A] mb-1.5 font-bold">
                    <span>3 KEY PERFORMANCE METRICS</span>
                    <span className="text-[#13263D]">FAR 3.85</span>
                  </div>
                  <div className="grid grid-cols-3 gap-2 text-[#13263D]">
                    <div>
                      <span className="text-[10px] text-[#69717A] block">GROSS BUILT AREA:</span>
                      <span className="font-bold">{proposalA.keyMetrics.grossFloorArea}</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-[#69717A] block">DAYLIGHT AUTONOMY:</span>
                      <span className="font-bold">{proposalA.keyMetrics.daylightAutonomy}</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-[#69717A] block">EMBODIED CARBON:</span>
                      <span className="font-bold text-[#E31B23]">{proposalA.keyMetrics.embodiedCarbonScore}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Proposal A Narrative & Strategy */}
              <div className="mt-8 space-y-6">
                <div className="border-l-2 border-[#13263D] pl-4">
                  <div className="text-xs font-mono uppercase tracking-[0.2em] text-[#69717A] mb-1">
                    DESIGN CONCEPT
                  </div>
                  <h3 className="text-2xl font-bold uppercase text-[#13263D]">
                    {proposalA.title}
                  </h3>
                  <p className="text-xs font-mono text-[#69717A] mt-1">
                    {proposalA.subtitle}
                  </p>
                </div>
                <p className="text-sm text-[#69717A] leading-relaxed font-sans">
                  {proposalA.conceptStatement}
                </p>

                {/* Strategy List */}
                <div className="space-y-2 font-mono text-xs">
                  <div className="text-[10px] uppercase tracking-widest text-[#69717A] font-bold">
                    DESIGN STRATEGY
                  </div>
                  <ul className="space-y-1.5 text-[#13263D]">
                    {proposalA.designStrategy.map((s, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-[#69717A]">•</span>
                        <span>{s}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-2">
                  <button
                    onClick={onNavigateToComparison}
                    className="group text-xs font-mono font-bold text-[#13263D] hover:text-[#E31B23] flex items-center gap-1.5 uppercase cursor-pointer"
                  >
                    <span>VIEW FULL PROPOSAL A SPECIFICATIONS</span>
                    <span className="transition-transform group-hover:translate-x-1">→</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Proposal B Visual Container */}
          {(activeTab === 'both' || activeTab === 'b') && (
            <div
              onMouseEnter={() => setHoveredSide('b')}
              onMouseLeave={() => setHoveredSide(null)}
              className={`relative transition-all duration-300 ${
                activeTab === 'b' ? 'lg:col-span-2' : ''
              } ${
                activeTab === 'both' && hoveredSide === 'a' ? 'opacity-65 filter grayscale-[30%]' : 'opacity-100'
              } ${activeTab === 'both' && hoveredSide === 'b' ? 'transform scale-[1.01] z-20' : ''}`}
            >
              <div className="relative aspect-[16/10] bg-[#E9E7E1] hairline-border overflow-hidden group">
                <img
                  src={projectData.media[0]?.imageSrc}
                  alt="Proposal B Green Connected District"
                  className="w-full h-full object-cover filter saturate-110 group-hover:scale-105 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-4 left-4 bg-[#F4F3EF]/95 px-3 py-1 font-mono text-[10px] text-[#55705A] hairline-border font-bold">
                  {proposalB.code} · {proposalB.title}
                </div>

                {/* 3 Revealed Key Metrics Overlay */}
                <div className="absolute bottom-4 left-4 right-4 bg-[#F4F3EF]/95 p-4 hairline-border font-mono text-xs">
                  <div className="flex items-center justify-between text-[9px] uppercase tracking-widest text-[#55705A] mb-1.5 font-bold">
                    <span>3 KEY PERFORMANCE METRICS (FORMA VERIFIED)</span>
                    <span className="text-[#55705A]">FAR 2.68</span>
                  </div>
                  <div className="grid grid-cols-3 gap-2 text-[#13263D]">
                    <div>
                      <span className="text-[10px] text-[#69717A] block">GREEN CANOPY:</span>
                      <span className="font-bold text-[#55705A]">{proposalB.keyMetrics.greenCoveragePercentage}% (34.7 ha)</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-[#69717A] block">DAYLIGHT AUTONOMY:</span>
                      <span className="font-bold text-[#55705A]">{proposalB.keyMetrics.daylightAutonomy}</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-[#69717A] block">EMBODIED CARBON:</span>
                      <span className="font-bold text-[#55705A]">{proposalB.keyMetrics.embodiedCarbonScore}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Proposal B Narrative & Strategy */}
              <div className="mt-8 space-y-6">
                <div className="border-l-2 border-[#55705A] pl-4">
                  <div className="text-xs font-mono uppercase tracking-[0.2em] text-[#55705A] mb-1">
                    DESIGN CONCEPT
                  </div>
                  <h3 className="text-2xl font-bold uppercase text-[#13263D]">
                    {proposalB.title}
                  </h3>
                  <p className="text-xs font-mono text-[#69717A] mt-1">
                    {proposalB.subtitle}
                  </p>
                </div>
                <p className="text-sm text-[#69717A] leading-relaxed font-sans">
                  {proposalB.conceptStatement}
                </p>

                {/* Strategy List */}
                <div className="space-y-2 font-mono text-xs">
                  <div className="text-[10px] uppercase tracking-widest text-[#69717A] font-bold">
                    DESIGN STRATEGY
                  </div>
                  <ul className="space-y-1.5 text-[#13263D]">
                    {proposalB.designStrategy.map((s, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-[#55705A]">•</span>
                        <span>{s}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-2">
                  <button
                    onClick={onNavigateToComparison}
                    className="group text-xs font-mono font-bold text-[#55705A] hover:text-[#13263D] flex items-center gap-1.5 uppercase cursor-pointer"
                  >
                    <span>VIEW FULL PROPOSAL B SPECIFICATIONS</span>
                    <span className="transition-transform group-hover:translate-x-1">→</span>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* 8. “WHY THIS DESIGN?” SEQUENCE SECTION */}
        <div className="my-20 p-8 bg-[#E9E7E1]/60 hairline-border">
          <div className="text-xs font-mono uppercase tracking-[0.25em] text-[#69717A] mb-8 font-bold flex items-center gap-2">
            <span className="w-2 h-2 bg-[#E31B23]" />
            <span>WHY THIS DESIGN? · THE ARCHITECTURAL REASONING PIPELINE</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-6 relative font-mono">
            {whySequence.map((item, idx) => (
              <div key={item.step} className="flex flex-col justify-between border-t-2 border-[#13263D] pt-4 relative">
                <div>
                  <span className="text-xs font-bold text-[#E31B23] mb-1 block">
                    {item.step}
                  </span>
                  <h4 className="text-sm font-bold uppercase text-[#13263D] mb-2 leading-tight">
                    {item.title}
                  </h4>
                  <p className="text-[11px] text-[#69717A] font-sans leading-relaxed">
                    {item.detail}
                  </p>
                </div>
                {idx < 4 && (
                  <div className="hidden md:block absolute -right-3 top-2 text-[#13263D]/30 font-bold">
                    →
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* 9. THE DECISION MOMENT */}
        <div className="p-10 bg-[#13263D] text-[#F4F3EF] hairline-border my-16 text-center">
          <div className="text-[10px] font-mono tracking-[0.3em] text-[#E31B23] uppercase font-bold mb-3">
            EVALUATION CONCLUSION
          </div>
          <h3 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight text-white mb-4">
            THE DECISION
          </h3>
          <div className="flex items-center justify-center gap-4 text-xs font-mono text-white/50 mb-6">
            <span>PROPOSAL A: COMPACT CORE</span>
            <span className="text-[#E31B23]">vs</span>
            <span>PROPOSAL B: GREEN CONNECTED</span>
          </div>

          <div className="inline-block p-4 bg-white/5 hairline-border border-white/20 mb-6">
            <span className="text-[10px] font-mono tracking-widest text-white/60 uppercase block mb-1">
              OFFICIAL JURY RECOMMENDATION
            </span>
            <div className="text-xl sm:text-2xl font-bold font-mono text-[#55705A] text-white">
              SELECTED PROPOSAL: PROPOSAL B (GREEN CONNECTED DISTRICT)
            </div>
          </div>

          <p className="text-sm sm:text-base text-white/80 max-w-2xl mx-auto font-sans leading-relaxed">
            &ldquo;Selected based on the strongest balance between development, environmental performance, mobility and quality of life.&rdquo;
          </p>
        </div>

        {/* Bottom Banner */}
        <div className="pt-8 border-t border-[#13263D]/10 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs">
          <div className="text-[#69717A]">
            PROPOSAL COMPARISON EVALUATION MATRIX AVAILABLE FOR JURY REVIEW
          </div>
          <button
            onClick={onNavigateToComparison}
            className="group px-6 py-2.5 bg-[#13263D] text-[#F4F3EF] hover:bg-[#E31B23] font-mono text-xs font-bold uppercase tracking-widest transition-all duration-200 flex items-center gap-2 cursor-pointer"
          >
            <span>VIEW COMPARISON MATRIX</span>
            <span className="transition-transform group-hover:translate-x-1" aria-hidden="true">→</span>
          </button>
        </div>
      </div>
    </section>
  );
};

