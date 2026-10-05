/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { ProjectData } from '../../types/project';
import { SectionTitle } from '../common/SectionTitle';

interface ProjectOverviewSectionProps {
  projectData: ProjectData;
}

export const ProjectOverviewSection: React.FC<ProjectOverviewSectionProps> = ({ projectData }) => {
  return (
    <section id="overview" className="py-24 border-t border-[#13263D]/10">
      <div className="max-w-[1720px] mx-auto px-4 lg:px-8">
        <SectionTitle
          number="01"
          title="THE PROJECT"
          subtitle="A data-driven approach to sustainable urban development."
          category="SIH 2026 / OBJECTIVE & CORE PRINCIPLES"
        />

        {/* Large Editorial Statement */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-20 items-baseline">
          <div className="lg:col-span-4">
            <span className="text-xs font-mono uppercase tracking-[0.25em] text-[#E31B23] block mb-2">
              EXECUTIVE BRIEF
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold uppercase tracking-tight text-[#13263D] leading-tight">
              Evidence-based urbanism replacing intuition with computational simulation.
            </h3>
          </div>

          <div className="lg:col-span-8 space-y-6 text-base sm:text-lg text-[#69717A] leading-relaxed font-normal">
            <p className="first-letter:text-5xl first-letter:font-bold first-letter:text-[#13263D] first-letter:mr-3 first-letter:float-left">
              {projectData.objective}
            </p>
            <p>
              Traditional master planning frequently isolates conceptual urban design from empirical engineering analysis, resulting in unintended microclimatic heat islands, excessive embodied carbon, and wind turbulence. By anchoring the design pipeline in <strong className="text-[#13263D]">Autodesk Forma</strong>, our team evaluated environmental metrics—sunlight duration, daylight autonomy, CFD wind comfort, and lifecycle carbon—at the earliest massing stages, before exporting LOD 350 BIM models into <strong className="text-[#13263D]">Autodesk Revit</strong>.
            </p>
          </div>
        </div>

        {/* Six Principles as Minimal Numbered Items (NO CARDS, Large Numbers, Hairline Rows) */}
        <div className="border-t border-[#13263D]/10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 divide-y lg:divide-y-0 divide-[#13263D]/10">
            {projectData.designPrinciples.map((principle, index) => (
              <div
                key={principle.number}
                className={`py-10 ${
                  index % 3 !== 2 ? 'lg:border-r border-[#13263D]/10 lg:pr-10' : ''
                } ${index % 3 !== 0 ? 'lg:pl-10' : ''} ${
                  index >= 3 ? 'lg:border-t border-[#13263D]/10' : ''
                }`}
              >
                <div className="text-5xl lg:text-6xl font-black font-mono tracking-tighter text-[#13263D]/20 mb-4 select-none">
                  {principle.number}
                </div>
                <h4 className="text-xl font-bold uppercase tracking-tight text-[#13263D] mb-2">
                  {principle.title}
                </h4>
                <p className="text-sm font-medium text-[#13263D] mb-3 leading-snug">
                  {principle.summary}
                </p>
                <p className="text-xs text-[#69717A] leading-relaxed mb-4">
                  {principle.detail}
                </p>
                <div className="pt-3 border-t border-[#13263D]/5 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-[#E31B23]" />
                  <span className="text-[10px] font-mono uppercase tracking-wider text-[#69717A]">
                    {principle.formaMetric}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
