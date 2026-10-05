/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { ProjectData } from '../../types/project';
import { SectionTitle } from '../common/SectionTitle';

interface HumanImpactSectionProps {
  projectData: ProjectData;
}

export const HumanImpactSection: React.FC<HumanImpactSectionProps> = ({ projectData }) => {
  const { humanImpact } = projectData;

  const impactMetrics = [
    { label: "POPULATION CAPACITY", value: projectData.targetPopulation.toLocaleString(), unit: "Residents & Workforce" },
    { label: "GREEN SPACE / PERSON", value: `${humanImpact.greenSpacePerCapitaSqM} m²`, unit: "Per resident" },
    { label: "PEDESTRIAN ACCESSIBILITY", value: `${humanImpact.pedestrianWalkshedPercentage}%`, unit: "5-min walkshed" },
    { label: "PUBLIC PLAZA ACCESS", value: `${humanImpact.publicPlazaProximityMin} min`, unit: "Average walking time" },
    { label: "NOISE ATTENUATION", value: `-${humanImpact.acousticBufferDecibelsReduction} dB(A)`, unit: "Shielded by massing" },
    { label: "DAYLIGHT QUALITY", value: "84%", unit: "sDA > 300 lux" },
    { label: "THERMAL COMFORT GAIN", value: "+38%", unit: "UTCI acceptable hours" },
    { label: "TRANSIT CONNECTIVITY", value: "< 300m", unit: "To rapid transit node" },
  ];

  return (
    <section id="humanimpact" className="py-24 border-t border-[#13263D]/10">
      <div className="max-w-[1720px] mx-auto px-4 lg:px-8">
        <SectionTitle
          number="08"
          title="DESIGNED FOR PEOPLE."
          subtitle="How computational microclimate and spatial optimization directly manifest in everyday human health, psychological well-being, and social vitality."
          category="HUMAN SCALE EXPERIENCE & PUBLIC HEALTH"
        />

        {/* Large Editorial Statement */}
        <div className="mb-16">
          <h3 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight text-[#13263D] max-w-4xl leading-tight">
            A city is judged not by the height of its towers, but by the comfort of its sidewalks.
          </h3>
          <p className="mt-6 text-base sm:text-lg text-[#69717A] max-w-2xl font-normal leading-relaxed">
            By testing pedestrian wind comfort (Lawson LD criteria) and solar shadow angles at the earliest conceptual phase, the masterplan creates streets that people genuinely want to walk, gather, and linger in.
          </p>
        </div>

        {/* Eight Human-Centric Metrics Grid (NO DASHBOARD PILLS, Large Mono Figures) */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 p-8 bg-[#E9E7E1]/50 hairline-border mb-20">
          {impactMetrics.map((met, idx) => (
            <div key={idx} className="border-l-2 border-[#13263D] pl-3 py-1 font-mono">
              <div className="text-[9px] uppercase tracking-wider text-[#69717A]">
                {met.label}
              </div>
              <div className="text-2xl sm:text-3xl font-black text-[#13263D] tabular-nums mt-0.5">
                {met.value}
              </div>
              <div className="text-[10px] text-[#69717A]">
                {met.unit}
              </div>
            </div>
          ))}
        </div>

        {/* Everyday Experience Section */}
        <div>
          <div className="flex items-center gap-3 text-xs font-mono uppercase tracking-[0.25em] text-[#69717A] mb-8">
            <span className="text-[#E31B23] font-bold">EVERYDAY EXPERIENCE</span>
            <span>:</span>
            <span>FIVE PILLARS OF DAILY URBAN LIFE</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 divide-y md:divide-y-0 md:divide-x divide-[#13263D]/10 hairline-border bg-[#F4F3EF]">
            {humanImpact.everydayExperiencePillars.map((p, idx) => (
              <div key={idx} className="p-6 flex flex-col justify-between">
                <div>
                  <span className="text-[10px] font-mono tracking-widest text-[#69717A] block mb-2">
                    PILLAR 0{idx + 1}
                  </span>
                  <h4 className="text-base font-bold uppercase text-[#13263D] mb-3">
                    {p.pillar}
                  </h4>
                  <p className="text-xs text-[#69717A] leading-relaxed mb-4 font-sans">
                    {p.formaDesignResponse}
                  </p>
                </div>
                <div className="pt-3 border-t border-[#13263D]/10 font-mono text-[11px] text-[#55705A] font-bold">
                  {p.measurableImpact}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
