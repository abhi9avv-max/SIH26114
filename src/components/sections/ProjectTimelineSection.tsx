/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { ProjectData } from '../../types/project';
import { SectionTitle } from '../common/SectionTitle';

interface ProjectTimelineSectionProps {
  projectData: ProjectData;
}

export const ProjectTimelineSection: React.FC<ProjectTimelineSectionProps> = ({ projectData }) => {
  const [activeStep, setActiveStep] = useState<number>(5);

  const timelineSteps = projectData.timeline || [];

  return (
    <section id="timeline" className="py-24 border-t border-[#13263D]/10 bg-[#F4F3EF]">
      <div className="max-w-[1720px] mx-auto px-4 lg:px-8">
        <SectionTitle
          number="11B"
          title="PROJECT DEVELOPMENT TIMELINE"
          subtitle="Chronological phases from raw GIS environmental ingestion through Forma analysis to Revit BIM synthesis."
          category="CHRONOLOGY & METHODOLOGICAL PHASING"
        />

        {/* Desktop Horizontal Timeline / Mobile Vertical Timeline */}
        <div className="hidden lg:block relative my-12 font-mono">
          {/* Continuous Connecting Line */}
          <div className="absolute top-7 left-0 right-0 h-[2px] bg-[#13263D]/20 -translate-y-1/2 z-0" />

          <div className="grid grid-cols-8 gap-4 relative z-10">
            {timelineSteps.map((step, idx) => {
              const isSelected = activeStep === idx;
              return (
                <div
                  key={step.stepNumber}
                  onClick={() => setActiveStep(idx)}
                  className="flex flex-col items-center cursor-pointer group"
                >
                  {/* Step Node */}
                  <div
                    className={`w-14 h-14 rounded-none flex items-center justify-center font-bold text-xs transition-all duration-200 hairline-border ${
                      isSelected
                        ? 'bg-[#E31B23] text-white shadow-lg scale-110'
                        : 'bg-[#F4F3EF] text-[#13263D] hover:bg-[#E9E7E1]'
                    }`}
                  >
                    {step.stepNumber}
                  </div>

                  <span className="mt-3 text-[10px] uppercase text-[#69717A] tracking-wider">
                    {step.phase}
                  </span>

                  <h4 className="mt-1 text-xs font-bold uppercase text-[#13263D] text-center leading-tight">
                    {step.title}
                  </h4>
                </div>
              );
            })}
          </div>
        </div>

        {/* Mobile Vertical Timeline */}
        <div className="lg:hidden space-y-4 font-mono text-xs my-8">
          {timelineSteps.map((step, idx) => {
            const isSelected = activeStep === idx;
            return (
              <div
                key={step.stepNumber}
                onClick={() => setActiveStep(idx)}
                className={`p-4 hairline-border cursor-pointer transition-colors ${
                  isSelected ? 'bg-[#13263D] text-[#F4F3EF]' : 'bg-[#E9E7E1]/50 text-[#13263D]'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className={`text-[10px] font-bold ${isSelected ? 'text-[#E31B23]' : 'text-[#69717A]'}`}>
                    {step.phase} · STEP {step.stepNumber}
                  </span>
                  <span className="text-[10px] text-inherit opacity-70">{step.toolUsed}</span>
                </div>
                <h4 className="text-sm font-bold uppercase">{step.title}</h4>
                <p className={`mt-1 text-[11px] font-sans ${isSelected ? 'text-white/80' : 'text-[#69717A]'}`}>
                  {step.deliverable}
                </p>
              </div>
            );
          })}
        </div>

        {/* Selected Phase Detail Box */}
        {timelineSteps[activeStep] && (
          <div className="p-6 md:p-8 bg-[#E9E7E1]/70 hairline-border font-mono text-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="space-y-1">
              <div className="text-[10px] uppercase tracking-widest text-[#E31B23] font-bold">
                ACTIVE PHASE INSPECTOR · {timelineSteps[activeStep].phase}
              </div>
              <h3 className="text-xl font-bold uppercase text-[#13263D]">
                {timelineSteps[activeStep].stepNumber} · {timelineSteps[activeStep].title}
              </h3>
              <p className="text-xs text-[#69717A] font-sans max-w-2xl leading-relaxed">
                {timelineSteps[activeStep].deliverable}
              </p>
            </div>

            <div className="p-3 bg-[#F4F3EF] hairline-border text-right shrink-0">
              <div className="text-[9px] uppercase tracking-wider text-[#69717A]">TOOL / TECHNOLOGY</div>
              <div className="text-xs font-bold text-[#13263D]">{timelineSteps[activeStep].toolUsed}</div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
