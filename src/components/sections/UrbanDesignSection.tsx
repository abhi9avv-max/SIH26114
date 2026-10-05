/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { ProjectData } from '../../types/project';
import { SectionTitle } from '../common/SectionTitle';
import { TechnicalAnnotation } from '../common/TechnicalAnnotation';

interface UrbanDesignSectionProps {
  projectData: ProjectData;
}

export const UrbanDesignSection: React.FC<UrbanDesignSectionProps> = ({ projectData }) => {
  const [activeBoard, setActiveBoard] = useState<'landuse' | 'buildings' | 'landscape' | 'transportation'>('landuse');

  const boards = [
    { id: 'landuse', title: 'LAND USE', index: '01', subtitle: 'Zoning Distribution & Developable Density' },
    { id: 'buildings', title: 'BUILDINGS', index: '02', subtitle: 'Stepped Volumetrics, Massing & Typologies' },
    { id: 'landscape', title: 'LANDSCAPE', index: '03', subtitle: 'Biophilic Corridor, Tree Canopy & Sponge City' },
    { id: 'transportation', title: 'TRANSPORTATION', index: '04', subtitle: 'Multi-Modal Spines & Pedestrian Priority' },
  ];

  return (
    <section id="urbandesign" className="py-24 border-t border-[#13263D]/10">
      <div className="max-w-[1720px] mx-auto px-4 lg:px-8">
        <SectionTitle
          number="04"
          title="URBAN DESIGN"
          subtitle="Four core systems orchestrating density, microclimate, ecological corridors, and multi-modal transit."
          category="ARCHITECTURAL COMPETITION SYSTEM BOARDS"
        />

        {/* Minimal Board Switcher (Editorial Tabs) */}
        <div className="flex border-b border-[#13263D]/10 mb-12 overflow-x-auto">
          {boards.map((board) => {
            const isActive = activeBoard === board.id;
            return (
              <button
                key={board.id}
                onClick={() => setActiveBoard(board.id as any)}
                className={`py-4 px-6 text-left shrink-0 transition-colors cursor-pointer border-b-2 -mb-px ${
                  isActive
                    ? 'border-[#E31B23] text-[#13263D]'
                    : 'border-transparent text-[#69717A] hover:text-[#13263D]'
                }`}
              >
                <div className="text-[10px] font-mono tracking-widest text-[#69717A]">
                  BOARD {board.index}
                </div>
                <div className="text-sm font-bold tracking-tight uppercase">
                  {board.title}
                </div>
              </button>
            );
          })}
        </div>

        {/* Active Board Content */}
        {activeBoard === 'landuse' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Left Diagram: 60% */}
            <div className="lg:col-span-7 bg-[#E9E7E1] p-8 hairline-border">
              <div className="flex items-center justify-between text-[10px] font-mono uppercase tracking-widest text-[#69717A] mb-6">
                <span>PARAMETRIC LAND USE ALLOCATION</span>
                <span>TOTAL: 124.0 HECTARES</span>
              </div>

              {/* Proportional Stack Bar Diagram */}
              <div className="w-full h-12 flex mb-8 hairline-border overflow-hidden">
                {projectData.landUse.categories.map((cat) => (
                  <div
                    key={cat.name}
                    style={{ width: `${cat.percentage}%`, backgroundColor: cat.color }}
                    className="h-full relative group cursor-pointer transition-opacity hover:opacity-90"
                    title={`${cat.name}: ${cat.percentage}% (${cat.areaHectares} ha)`}
                  />
                ))}
              </div>

              {/* Detailed Breakdown Rows */}
              <div className="space-y-4">
                {projectData.landUse.categories.map((cat) => (
                  <div
                    key={cat.name}
                    className="flex flex-col sm:flex-row sm:items-center justify-between p-3 bg-[#F4F3EF] hairline-border gap-2"
                  >
                    <div className="flex items-center gap-3">
                      <span className="w-3.5 h-3.5 shrink-0" style={{ backgroundColor: cat.color }} />
                      <div>
                        <div className="text-xs font-bold text-[#13263D]">{cat.name}</div>
                        <div className="text-[10px] font-mono text-[#69717A]">{cat.formaZoningCode}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-6 font-mono text-xs">
                      <span className="text-[#69717A]">{cat.areaHectares} ha</span>
                      <span className="font-bold text-[#13263D] min-w-[3rem] text-right">
                        {cat.percentage}%
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Editorial Note: 40% */}
            <div className="lg:col-span-5 space-y-6">
              <div className="border-l-2 border-[#13263D] pl-4">
                <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#69717A] block mb-1">
                  LAND-USE LOGIC
                </span>
                <h3 className="text-2xl font-bold uppercase text-[#13263D]">
                  Porous Ecological Co-existence
                </h3>
              </div>
              <p className="text-sm text-[#69717A] leading-relaxed">
                Rather than segregating residential suburbs from commercial centers, the masterplan interweaves 36% residential density with 24% high-value commercial tech hubs. This ensures active 24/7 public realms and reduces internal vehicular commuter trips by 68%.
              </p>
              <div className="pt-4 border-t border-[#13263D]/10">
                <TechnicalAnnotation
                  label="SPONGE CITY RATIO"
                  value="28%"
                  unit="Direct Unpaved Parkland"
                  subtext="Absorbs 100% of 100-year storm flood volumes on-site"
                />
              </div>
            </div>
          </div>
        )}

        {activeBoard === 'buildings' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-8 relative aspect-[16/9] bg-[#E9E7E1] hairline-border overflow-hidden">
              <img
                src={projectData.media[2]?.imageSrc}
                alt="Building Massing and Volumetric Heights"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute top-4 left-4 bg-[#F4F3EF]/90 px-3 py-1.5 font-mono text-[10px] text-[#13263D] hairline-border">
                ELEVATION & STEPPED TERRACE MASSING · SOUTH-WEST FACET
              </div>
              <div className="absolute bottom-6 left-6 z-10">
                <TechnicalAnnotation
                  label="MAX HEIGHT"
                  value="74.5m"
                  unit="18 Storeys"
                  subtext="Stepped downward toward tidal waterfront"
                />
              </div>
            </div>

            <div className="lg:col-span-4 space-y-6 font-mono text-xs">
              <div className="border-b border-[#13263D]/10 pb-4">
                <span className="text-[10px] uppercase tracking-widest text-[#69717A] block mb-1">
                  BUILDING MASSING LOGIC
                </span>
                <h4 className="text-xl font-bold text-[#13263D]">
                  Stepped Solar Solar Envelope
                </h4>
              </div>
              <p className="text-[#69717A] font-sans text-sm leading-relaxed">
                By tapering building heights from 18 storeys along the transit corridor down to 4–6 storeys at the waterfront edge, the masterplan maintains low wind shear at street level and preserves direct horizon daylight access for all secondary courtyard developments.
              </p>
              <div className="space-y-3 pt-2">
                <div className="p-3 bg-[#E9E7E1]/60 hairline-border">
                  <div className="font-bold text-[#13263D]">SLENDER FLOOR PLATES (16–20m)</div>
                  <div className="text-[11px] text-[#69717A] font-sans">
                    Ensures dual-aspect cross-ventilation and natural daylight penetration to within 6 meters of building cores.
                  </div>
                </div>
                <div className="p-3 bg-[#E9E7E1]/60 hairline-border">
                  <div className="font-bold text-[#13263D]">LANDSCAPED SKY TERRACES</div>
                  <div className="text-[11px] text-[#69717A] font-sans">
                    Every 4 floors feature green sky-gardens providing tenant amenity spaces and localized thermal mass.
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeBoard === 'landscape' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-7 space-y-6">
              <div className="border-l-2 border-[#55705A] pl-4">
                <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#55705A] block mb-1">
                  BIOPHILIC URBAN SYSTEM
                </span>
                <h3 className="text-2xl font-bold uppercase text-[#13263D]">
                  The 34.7-Hectare Continuous Green Lung
                </h3>
              </div>
              <p className="text-base text-[#69717A] leading-relaxed">
                The landscape is not ornamental decoration; it is an active climatic infrastructure engine. Autodesk Forma microclimate simulations validated that the continuous native tree canopy and bioswales decrease outdoor apparent temperatures by up to 4.6°C, creating a comfortable pedestrian spine year-round.
              </p>

              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-[#13263D]/10">
                <div className="border-l-2 border-[#13263D] pl-3 py-1">
                  <div className="text-[9px] font-mono text-[#69717A] uppercase">PER CAPITA OPEN SPACE</div>
                  <div className="text-xl font-bold font-mono text-[#13263D]">8.16 m²</div>
                  <div className="text-[10px] text-[#69717A]">Exceeds municipal urban target</div>
                </div>
                <div className="border-l-2 border-[#13263D] pl-3 py-1">
                  <div className="text-[9px] font-mono text-[#69717A] uppercase">RAINWATER RETENTION</div>
                  <div className="text-xl font-bold font-mono text-[#13263D]">100%</div>
                  <div className="text-[10px] text-[#69717A]">Sponge city bioretention swales</div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 relative aspect-[4/3] bg-[#E9E7E1] hairline-border overflow-hidden">
              <img
                src={projectData.media[3]?.imageSrc}
                alt="Human scale landscape corridor"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute bottom-4 left-4 bg-[#F4F3EF]/90 p-3 font-mono text-[9px] hairline-border max-w-xs">
                <div className="font-bold text-[#13263D]">BIOPHILIC SHADE INFRASTRUCTURE</div>
                <div className="text-[#69717A]">Mature indigenous shade trees filter maritime winds while reducing radiant heat stress.</div>
              </div>
            </div>
          </div>
        )}

        {activeBoard === 'transportation' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-7 bg-[#E9E7E1] p-8 hairline-border">
              <div className="text-[10px] font-mono uppercase tracking-widest text-[#69717A] mb-6">
                MULTI-MODAL MODAL SPLIT & HIERARCHY
              </div>

              {/* Graphic Flow Network */}
              <div className="space-y-4">
                <div className="p-4 bg-[#F4F3EF] hairline-border">
                  <div className="flex justify-between items-center text-xs font-mono mb-2">
                    <span className="font-bold text-[#13263D]">TIER 1 · PEDESTRIAN & CYCLING SPINE</span>
                    <span className="text-[#55705A] font-bold">52% MODAL SHARE</span>
                  </div>
                  <div className="w-full h-2 bg-[#E9E7E1] overflow-hidden">
                    <div className="h-full bg-[#55705A]" style={{ width: '52%' }} />
                  </div>
                  <p className="text-[11px] text-[#69717A] mt-2">
                    12km of completely car-free greenways linking housing, jobs, and schools within 400m radii.
                  </p>
                </div>

                <div className="p-4 bg-[#F4F3EF] hairline-border">
                  <div className="flex justify-between items-center text-xs font-mono mb-2">
                    <span className="font-bold text-[#13263D]">TIER 2 · AUTONOMOUS FEEDER & ELECTRIC BRT</span>
                    <span className="text-[#E31B23] font-bold">34% MODAL SHARE</span>
                  </div>
                  <div className="w-full h-2 bg-[#E9E7E1] overflow-hidden">
                    <div className="h-full bg-[#E31B23]" style={{ width: '34%' }} />
                  </div>
                  <p className="text-[11px] text-[#69717A] mt-2">
                    Dedicated grade-separated right-of-way connecting to metro regional interchanges.
                  </p>
                </div>

                <div className="p-4 bg-[#F4F3EF] hairline-border">
                  <div className="flex justify-between items-center text-xs font-mono mb-2">
                    <span className="font-bold text-[#13263D]">TIER 3 · LOGISTICS & PERIPHERAL VEHICULAR</span>
                    <span className="text-[#69717A] font-bold">14% MODAL SHARE</span>
                  </div>
                  <div className="w-full h-2 bg-[#E9E7E1] overflow-hidden">
                    <div className="h-full bg-[#69717A]" style={{ width: '14%' }} />
                  </div>
                  <p className="text-[11px] text-[#69717A] mt-2">
                    Subsurface and perimeter logistics loops ensuring 0 heavy freight conflict in human zones.
                  </p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 space-y-6">
              <div className="border-l-2 border-[#E31B23] pl-4">
                <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#E31B23] block mb-1">
                  15-MINUTE MOBILITY NETWORK
                </span>
                <h3 className="text-2xl font-bold uppercase text-[#13263D]">
                  Transit-Oriented Density
                </h3>
              </div>
              <p className="text-sm text-[#69717A] leading-relaxed">
                By routing heavy surface roadways along the periphery and channeling internal movement through an electric transit loop and shaded pedestrian paths, traffic fatalities and localized vehicular PM2.5 emissions are driven to near-zero.
              </p>
              <div className="pt-4 border-t border-[#13263D]/10">
                <TechnicalAnnotation
                  label="TRANSIT ACCESS"
                  value="< 300m"
                  unit="Walking Distance"
                  subtext="Achieved for 92% of all daily workers and residents"
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
