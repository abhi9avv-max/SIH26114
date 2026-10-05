/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { ProjectData } from '../../types/project';
import { SectionTitle } from '../common/SectionTitle';
import { TechnicalAnnotation } from '../common/TechnicalAnnotation';

interface BimRevitSectionProps {
  projectData: ProjectData;
}

export const BimRevitSection: React.FC<BimRevitSectionProps> = ({ projectData }) => {
  const { bim } = projectData;
  const [activeTab, setActiveTab] = useState<'3d-model' | 'floor-plans' | 'elevations' | 'sections' | 'render'>('render');
  const [isViewerExpanded, setIsViewerExpanded] = useState(false);
  const [activeWorkflowStep, setActiveWorkflowStep] = useState(3);

  const selectedView = bim.views.find((v) => v.id === activeTab) || bim.views[4];

  const workflowStages = [
    { num: '01', title: 'FORMA', phase: 'SITE DESIGN', tool: 'Autodesk Forma', desc: 'Conceptual massing, microclimate, and preliminary area schedules.' },
    { num: '02', title: 'BIM EXPORT', phase: 'SITE MODEL', tool: 'Forma Add-In', desc: 'Direct coordinate-matched export of mass geometry and context.' },
    { num: '03', title: 'REVIT', phase: 'DETAILED BUILDING', tool: 'Autodesk Revit 2026', desc: 'LOD 350 structural framing, BIPV curtain walls, MEP shafts.' },
    { num: '04', title: 'SYNC', phase: 'FINAL DEVELOPMENT', tool: 'Forma Cloud Sync', desc: 'Re-import detailed geometry to re-verify microclimate impact.' },
  ];

  return (
    <section id="bim" className="py-24 border-t border-[#13263D]/10">
      <div className="max-w-[1720px] mx-auto px-4 lg:px-8">
        <SectionTitle
          number="09"
          title="FROM SITE TO BUILDING."
          subtitle="Seamless bi-directional interoperability between Autodesk Forma urban massing and Autodesk Revit detailed BIM documentation."
          category="BIM INTEROPERABILITY & DETAILED ARCHITECTURAL SCALE"
        />

        {/* 12. Animated Technical Workflow: FORMA 01 ↓ BIM EXPORT 02 ↓ REVIT 03 ↓ SYNC 04 */}
        <div className="mb-20">
          <div className="flex items-center justify-between text-[10px] font-mono uppercase tracking-[0.25em] text-[#69717A] mb-6 font-bold">
            <span>FORMA → REVIT INTEROPERABILITY PIPELINE WORKFLOW</span>
            <span className="text-[#E31B23]">STEP 0{activeWorkflowStep} ACTIVE</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 relative">
            {workflowStages.map((st, idx) => {
              const isActive = activeWorkflowStep === idx + 1;
              return (
                <div
                  key={st.num}
                  onClick={() => setActiveWorkflowStep(idx + 1)}
                  className={`p-6 hairline-border font-mono relative cursor-pointer transition-all duration-300 ${
                    isActive
                      ? 'bg-[#13263D] text-[#F4F3EF] shadow-lg scale-[1.01]'
                      : 'bg-[#E9E7E1]/50 text-[#13263D] hover:bg-[#E9E7E1]'
                  }`}
                >
                  <div className="flex items-center justify-between text-[10px] mb-3">
                    <span className={isActive ? 'text-[#E31B23] font-bold' : 'text-[#69717A]'}>
                      STEP {st.num}
                    </span>
                    <span className="text-[9px] px-2 py-0.5 bg-black/10 text-inherit font-bold">
                      {st.tool}
                    </span>
                  </div>

                  <div className="text-xs uppercase tracking-widest text-[#E31B23] font-bold">
                    {st.title}
                  </div>
                  <h4 className="text-base font-black uppercase tracking-tight mb-2 leading-tight">
                    {st.phase}
                  </h4>
                  <p className={`text-xs font-sans leading-relaxed ${isActive ? 'text-white/80' : 'text-[#69717A]'}`}>
                    {st.desc}
                  </p>

                  {/* Desktop Step Connecting Line */}
                  {idx < 3 && (
                    <div className="hidden md:block absolute -right-3 top-1/2 -translate-y-1/2 z-10 text-[#E31B23] font-bold text-sm pointer-events-none">
                      →
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Lead Building Presentation: Building 014 */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-8">
          <div className="lg:col-span-8">
            <div className="flex flex-wrap items-center justify-between border-b border-[#13263D]/10 pb-4 mb-6 gap-4">
              <div>
                <span className="text-xs font-mono uppercase tracking-[0.2em] text-[#E31B23] font-bold block mb-1">
                  DETAILED REVIT PILOT
                </span>
                <h3 className="text-2xl sm:text-3xl font-bold uppercase text-[#13263D]">
                  {bim.buildingName}
                </h3>
              </div>

              {/* View Building Interaction Button */}
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setIsViewerExpanded(!isViewerExpanded)}
                  className="px-4 py-2 bg-[#13263D] hover:bg-[#E31B23] text-white font-mono text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer flex items-center gap-2"
                >
                  <span>{isViewerExpanded ? 'COLLAPSE INSPECTOR' : 'VIEW BUILDING BIM'}</span>
                  <span>{isViewerExpanded ? '▲' : '▼'}</span>
                </button>
              </div>
            </div>

            {/* Interactive View Tabs */}
            <div className="flex border-b border-[#13263D]/10 mb-6 overflow-x-auto font-mono text-xs">
              {bim.views.map((v) => {
                const isActive = activeTab === v.id;
                return (
                  <button
                    key={v.id}
                    onClick={() => setActiveTab(v.id)}
                    className={`py-2 px-4 transition-colors cursor-pointer border-b-2 -mb-px shrink-0 ${
                      isActive
                        ? 'border-[#E31B23] text-[#13263D] font-bold'
                        : 'border-transparent text-[#69717A] hover:text-[#13263D]'
                    }`}
                  >
                    {v.label}
                  </button>
                );
              })}
            </div>

            {/* Viewport Display */}
            <div className={`relative bg-[#E9E7E1] hairline-border overflow-hidden transition-all duration-500 ${
              isViewerExpanded ? 'aspect-[16/12]' : 'aspect-[16/10]'
            }`}>
              {activeTab === 'render' ? (
                <img
                  src={projectData.media[2]?.imageSrc}
                  alt="Building 014 Revit Architectural Render"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center p-8 bg-[#13263D] text-[#F4F3EF] font-mono">
                  {/* Architectural Vector Schematic for Plans, Sections, Elevations */}
                  <svg className="w-full max-w-lg aspect-[16/9]" viewBox="0 0 600 340">
                    <rect x="20" y="20" width="560" height="300" fill="none" stroke="#5B7894" strokeWidth="1" strokeDasharray="3 3" />
                    {activeTab === 'floor-plans' && (
                      <g stroke="#F4F3EF" strokeWidth="1.5" fill="none">
                        <rect x="60" y="50" width="480" height="240" />
                        <rect x="240" y="110" width="120" height="120" stroke="#E31B23" strokeWidth="2" />
                        <text x="300" y="175" fill="#E31B23" fontSize="10" textAnchor="middle">CENTRAL CORE</text>
                        <line x1="60" y1="170" x2="240" y2="170" strokeDasharray="4 2" />
                        <line x1="360" y1="170" x2="540" y2="170" strokeDasharray="4 2" />
                        <text x="150" y="110" fill="#94A3B8" fontSize="9">OPEN WORKSPACE (16.5m SPAN)</text>
                        <text x="450" y="110" fill="#94A3B8" fontSize="9">COLLABORATIVE ZONE</text>
                      </g>
                    )}
                    {activeTab === 'elevations' && (
                      <g stroke="#F4F3EF" strokeWidth="1.5" fill="none">
                        <polygon points="120,300 120,120 480,60 480,300" />
                        <line x1="140" y1="130" x2="460" y2="75" stroke="#EAB308" strokeWidth="2" />
                        <line x1="140" y1="160" x2="460" y2="105" stroke="#EAB308" strokeWidth="2" />
                        <line x1="140" y1="190" x2="460" y2="135" stroke="#EAB308" strokeWidth="2" />
                        <line x1="140" y1="220" x2="460" y2="165" stroke="#EAB308" strokeWidth="2" />
                        <line x1="140" y1="250" x2="460" y2="195" stroke="#EAB308" strokeWidth="2" />
                        <text x="300" y="40" fill="#EAB308" fontSize="10" textAnchor="middle">PARAMETRIC 28° BIPV SOLAR LOUVERS</text>
                      </g>
                    )}
                    {activeTab === 'sections' && (
                      <g stroke="#F4F3EF" strokeWidth="1.5" fill="none">
                        <rect x="100" y="40" width="400" height="260" />
                        <polygon points="260,300 260,180 340,100 340,40 370,40 370,300" fill="#E31B23" opacity="0.2" stroke="#E31B23" />
                        <text x="300" y="240" fill="#E31B23" fontSize="9" textAnchor="middle">THERMAL ATRIUM CHIMNEY</text>
                        {[70, 100, 130, 160, 190, 220, 250, 280].map((y) => (
                          <line key={y} x1="100" y1={y} x2="500" y2={y} stroke="#69717A" strokeWidth="1" />
                        ))}
                      </g>
                    )}
                    {activeTab === '3d-model' && (
                      <g stroke="#F4F3EF" strokeWidth="1.5" fill="none">
                        <polygon points="300,50 480,130 300,210 120,130" stroke="#5B7894" />
                        <polygon points="120,130 300,210 300,300 120,220" stroke="#5B7894" />
                        <polygon points="480,130 300,210 300,300 480,220" stroke="#5B7894" />
                        <line x1="120" y1="130" x2="300" y2="300" stroke="#55705A" strokeWidth="2" />
                        <line x1="480" y1="130" x2="300" y2="300" stroke="#55705A" strokeWidth="2" />
                        <text x="300" y="290" fill="#55705A" fontSize="9" textAnchor="middle">MASS TIMBER GLULAM DIAGRID</text>
                      </g>
                    )}
                  </svg>
                  <div className="mt-4 text-xs font-mono text-[#F4F3EF]/70 text-center max-w-md">
                    {selectedView.technicalDetail}
                  </div>
                </div>
              )}

              {/* View Overlay Annotations */}
              <div className="absolute top-4 left-4 bg-[#F4F3EF]/90 px-3 py-1 font-mono text-[10px] text-[#13263D] hairline-border">
                {selectedView.label} · AUTODESK REVIT 2026 EXPORT
              </div>
              <div className="absolute bottom-4 left-4 z-10">
                <TechnicalAnnotation
                  label="STRUCTURE"
                  value="Mass Timber Glulam"
                  unit="Diagrid"
                  subtext={bim.specifications.structure}
                />
              </div>
            </div>

            <p className="mt-4 text-xs font-mono text-[#69717A]">
              {selectedView.description}
            </p>
          </div>

          {/* Building Specifications Column */}
          <div className="lg:col-span-4 bg-[#F4F3EF] hairline-border p-6 font-mono text-xs space-y-6">
            <div className="border-b border-[#13263D]/10 pb-3">
              <span className="text-[10px] uppercase tracking-widest text-[#69717A] block mb-1">
                REVIT SPECIFICATIONS
              </span>
              <h4 className="text-lg font-bold text-[#13263D]">
                ENGINEERING SUMMARY
              </h4>
            </div>

            <div className="space-y-4">
              <div>
                <span className="text-[9px] uppercase tracking-widest text-[#69717A] block">
                  STRUCTURAL SYSTEM
                </span>
                <p className="text-xs text-[#13263D] font-sans mt-0.5">
                  {bim.specifications.structure}
                </p>
              </div>

              <div className="pt-2 border-t border-[#13263D]/10">
                <span className="text-[9px] uppercase tracking-widest text-[#69717A] block">
                  FACADE & ENVELOPE
                </span>
                <p className="text-xs text-[#13263D] font-sans mt-0.5">
                  {bim.specifications.facadeSystem}
                </p>
              </div>

              <div className="pt-2 border-t border-[#13263D]/10">
                <span className="text-[9px] uppercase tracking-widest text-[#69717A] block">
                  TOTAL PROGRAM AREA
                </span>
                <p className="text-xs text-[#13263D] font-sans mt-0.5">
                  {bim.specifications.totalGFA}
                </p>
              </div>

              <div className="pt-2 border-t border-[#13263D]/10">
                <span className="text-[9px] uppercase tracking-widest text-[#69717A] block">
                  NET ZERO ENERGY STRATEGY
                </span>
                <p className="text-xs text-[#13263D] font-sans mt-0.5">
                  {bim.specifications.netZeroStrategy}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

