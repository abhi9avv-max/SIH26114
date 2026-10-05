/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { ProjectData, SiteLayer } from '../../types/project';
import { SectionTitle } from '../common/SectionTitle';
import { TechnicalAnnotation } from '../common/TechnicalAnnotation';

interface SiteContextSectionProps {
  projectData: ProjectData;
}

export const SiteContextSection: React.FC<SiteContextSectionProps> = ({ projectData }) => {
  const [layers, setLayers] = useState<SiteLayer[]>(projectData.siteContext.layers);

  const toggleLayer = (layerId: string) => {
    setLayers((prev) =>
      prev.map((l) => (l.id === layerId ? { ...l, active: !l.active } : l))
    );
  };

  const isLayerActive = (id: string) => layers.find((l) => l.id === id)?.active ?? false;

  return (
    <section id="site" className="py-24 border-t border-[#13263D]/10">
      <div className="max-w-[1720px] mx-auto px-4 lg:px-8">
        <SectionTitle
          number="02"
          title="UNDERSTANDING THE SITE"
          subtitle="Topographical, environmental, and infrastructure forces that establish the project boundary conditions."
          category="GEOGRAPHIC INFORMATION SYSTEM & SITE ANALYSIS"
        />

        {/* Minimal Layer Control Ribbon */}
        <div className="flex flex-wrap items-center justify-between gap-4 py-3 border-y border-[#13263D]/10 mb-8 font-mono text-xs">
          <div className="flex items-center gap-2 text-[#69717A] tracking-wider uppercase text-[10px]">
            <span>FORMA GIS LAYERS</span>
            <span>:</span>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {layers.map((layer) => (
              <button
                key={layer.id}
                onClick={() => toggleLayer(layer.id)}
                className={`px-3 py-1.5 transition-all text-[11px] font-mono tracking-wider flex items-center gap-2 cursor-pointer ${
                  layer.active
                    ? 'bg-[#13263D] text-[#F4F3EF]'
                    : 'bg-[#E9E7E1] text-[#69717A] hover:text-[#13263D]'
                }`}
              >
                <span
                  className="w-2 h-2 shrink-0"
                  style={{ backgroundColor: layer.active ? layer.color : '#9CA3AF' }}
                />
                <span>{layer.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Dominant Map / Site Visualization */}
        <div className="relative w-full aspect-[16/9] max-h-[820px] bg-[#E9E7E1] hairline-border overflow-hidden mb-12">
          {/* Base Architectural Site Plan Image */}
          <img
            src={projectData.media[1]?.imageSrc}
            alt="Site Context Analysis and Topographic Map"
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />

          {/* SVG Vector Overlays Driven by Layer Toggles */}
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none"
            viewBox="0 0 1000 600"
            preserveAspectRatio="none"
          >
            {/* Site Boundary Layer */}
            {isLayerActive('boundary') && (
              <g className="transition-opacity duration-300">
                <polygon
                  points="120,80 880,70 910,480 550,540 100,510"
                  fill="none"
                  stroke="#E31B23"
                  strokeWidth="2.5"
                  strokeDasharray="8 4"
                />
                <text
                  x="140"
                  y="110"
                  fill="#E31B23"
                  fontSize="12"
                  fontFamily="JetBrains Mono"
                  letterSpacing="2"
                >
                  SITE CONCESSION BOUNDARY: 1.24 km²
                </text>
                {/* Coastal Buffer line */}
                <path
                  d="M 100,510 Q 550,500 910,450"
                  fill="none"
                  stroke="#0284C7"
                  strokeWidth="2"
                  strokeDasharray="4 4"
                />
                <text
                  x="480"
                  y="490"
                  fill="#0284C7"
                  fontSize="10"
                  fontFamily="JetBrains Mono"
                >
                  100M CRZ COASTAL BUFFER
                </text>
              </g>
            )}

            {/* Roads & Arterials */}
            {isLayerActive('roads') && (
              <g className="transition-opacity duration-300">
                <line x1="880" y1="20" x2="940" y2="580" stroke="#13263D" strokeWidth="6" />
                <text x="830" y="300" fill="#13263D" fontSize="10" fontFamily="JetBrains Mono" transform="rotate(85, 830, 300)">
                  EASTERN EXPRESSWAY ARTERIAL
                </text>
                <line x1="120" y1="80" x2="880" y2="180" stroke="#69717A" strokeWidth="2.5" />
                <line x1="280" y1="110" x2="320" y2="520" stroke="#69717A" strokeWidth="2" strokeDasharray="6 3" />
                <line x1="580" y1="140" x2="620" y2="520" stroke="#69717A" strokeWidth="2" strokeDasharray="6 3" />
              </g>
            )}

            {/* Proposed Buildings Massing Layer */}
            {isLayerActive('buildings') && (
              <g className="transition-opacity duration-300">
                <rect x="360" y="160" width="70" height="90" fill="#13263D" opacity="0.8" />
                <rect x="450" y="150" width="60" height="80" fill="#13263D" opacity="0.8" />
                <rect x="530" y="170" width="80" height="70" fill="#13263D" opacity="0.8" />
                <rect x="260" y="240" width="80" height="90" fill="#E58E26" opacity="0.8" />
                <rect x="360" y="270" width="60" height="70" fill="#E58E26" opacity="0.8" />
                <rect x="440" y="260" width="70" height="60" fill="#E58E26" opacity="0.8" />
                <rect x="640" y="220" width="90" height="80" fill="#5B7894" opacity="0.8" />
              </g>
            )}

            {/* Terrain Contours */}
            {isLayerActive('terrain') && (
              <g className="transition-opacity duration-300" stroke="#9A8C7A" strokeWidth="1" fill="none">
                <path d="M 120,120 Q 500,100 880,110" />
                <path d="M 115,200 Q 520,180 890,190" />
                <path d="M 110,280 Q 530,260 900,270" />
                <path d="M 105,360 Q 540,340 905,350" />
                <path d="M 100,440 Q 550,420 910,430" />
                <text x="130" y="115" fill="#9A8C7A" fontSize="9" fontFamily="JetBrains Mono">+18.0m</text>
                <text x="125" y="195" fill="#9A8C7A" fontSize="9" fontFamily="JetBrains Mono">+14.0m</text>
                <text x="120" y="275" fill="#9A8C7A" fontSize="9" fontFamily="JetBrains Mono">+10.0m</text>
                <text x="115" y="355" fill="#9A8C7A" fontSize="9" fontFamily="JetBrains Mono">+6.0m</text>
                <text x="110" y="435" fill="#9A8C7A" fontSize="9" fontFamily="JetBrains Mono">+4.2m</text>
              </g>
            )}

            {/* Green Corridor & Vegetation */}
            {isLayerActive('vegetation') && (
              <g className="transition-opacity duration-300">
                <path
                  d="M 470,80 C 490,200 480,380 500,530 L 580,530 C 560,380 570,200 550,80 Z"
                  fill="#55705A"
                  opacity="0.5"
                />
                <text x="500" y="240" fill="#13263D" fontSize="11" fontFamily="JetBrains Mono" transform="rotate(75, 500, 240)">
                  CENTRAL BIOPHILIC SPINE (34.7 HA)
                </text>
              </g>
            )}

            {/* Infrastructure & Transit Nodes */}
            {isLayerActive('infrastructure') && (
              <g className="transition-opacity duration-300">
                <circle cx="680" cy="240" r="16" fill="none" stroke="#E31B23" strokeWidth="2.5" />
                <circle cx="680" cy="240" r="4" fill="#E31B23" />
                <text x="705" y="245" fill="#E31B23" fontSize="10" fontFamily="JetBrains Mono">
                  CENTRAL TRANSIT HUB & METRO FEEDER
                </text>
              </g>
            )}

            {/* Solar Orientation */}
            {isLayerActive('solar') && (
              <g className="transition-opacity duration-300">
                <line x1="200" y1="520" x2="350" y2="350" stroke="#D97706" strokeWidth="2" strokeDasharray="5 3" />
                <polygon points="350,350 340,360 345,345" fill="#D97706" />
                <text x="210" y="505" fill="#D97706" fontSize="10" fontFamily="JetBrains Mono">
                  PEAK AFTERNOON SOLAR AZIMUTH (245°)
                </text>
              </g>
            )}

            {/* Wind Direction */}
            {isLayerActive('wind') && (
              <g className="transition-opacity duration-300">
                <line x1="180" y1="460" x2="420" y2="280" stroke="#0284C7" strokeWidth="3" markerEnd="url(#arrow)" />
                <polygon points="420,280 405,285 412,298" fill="#0284C7" />
                <line x1="220" y1="500" x2="460" y2="320" stroke="#0284C7" strokeWidth="3" />
                <polygon points="460,320 445,325 452,338" fill="#0284C7" />
                <text x="230" y="440" fill="#0284C7" fontSize="11" fontFamily="JetBrains Mono">
                  PREVAILING SW MONSOON VECTOR (3.8 m/s)
                </text>
              </g>
            )}
          </svg>

          {/* Technical Annotations Around The Map */}
          <div className="absolute top-6 left-6 z-10">
            <TechnicalAnnotation
              label="SITE AREA"
              value={projectData.siteAreaSqKm}
              unit="km² (124.0 Hectares)"
            />
          </div>
          <div className="absolute top-6 right-6 z-10">
            <TechnicalAnnotation
              label="DEVELOPABLE AREA"
              value={projectData.landUse.totalDevelopableHectares}
              unit="Hectares (69.0%)"
              subtext="Excludes 38.4 ha water & ecological buffer"
            />
          </div>
          <div className="absolute bottom-6 left-6 z-10">
            <TechnicalAnnotation
              label="EXISTING ROAD NETWORK"
              value="4 Intersections"
              subtext="Eastern Expressway 8-lane corridor"
            />
          </div>
          <div className="absolute bottom-6 right-6 z-10">
            <TechnicalAnnotation
              label="CLIMATE ZONE"
              value="ASHRAE 1A"
              subtext="Tropical Wet & Dry / Coastal Monsoon"
            />
          </div>
        </div>

        {/* Section: CONTEXT → CONSTRAINT → OPPORTUNITY */}
        <div className="mt-16">
          <div className="flex items-center gap-3 text-xs font-mono uppercase tracking-[0.25em] text-[#69717A] mb-8">
            <span className="text-[#E31B23] font-bold">ANALYSIS FRAMEWORK</span>
            <span>:</span>
            <span>CONTEXT → CONSTRAINT → OPPORTUNITY</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-[#13263D]/10 hairline-border bg-[#F4F3EF]">
            {/* Column 1: Context */}
            <div className="p-8">
              <div className="text-xs font-mono font-bold tracking-[0.2em] text-[#13263D] uppercase mb-4 flex items-center justify-between">
                <span>01. CONTEXT</span>
                <span className="text-[#69717A] text-[10px]">BASELINE</span>
              </div>
              <div className="space-y-6">
                {projectData.siteContext.contextPoints.map((item, idx) => (
                  <div key={idx} className="border-l-2 border-[#13263D]/30 pl-3">
                    <h4 className="text-sm font-bold text-[#13263D] mb-1">
                      {item.title}
                    </h4>
                    <p className="text-xs text-[#69717A] leading-relaxed">
                      {item.text}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Column 2: Constraint */}
            <div className="p-8">
              <div className="text-xs font-mono font-bold tracking-[0.2em] text-[#E31B23] uppercase mb-4 flex items-center justify-between">
                <span>02. CONSTRAINT</span>
                <span className="text-[#69717A] text-[10px]">CHALLENGE</span>
              </div>
              <div className="space-y-6">
                {projectData.siteContext.constraintPoints.map((item, idx) => (
                  <div key={idx} className="border-l-2 border-[#E31B23] pl-3">
                    <h4 className="text-sm font-bold text-[#13263D] mb-1">
                      {item.title}
                    </h4>
                    <p className="text-xs text-[#69717A] leading-relaxed">
                      {item.text}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Column 3: Opportunity */}
            <div className="p-8">
              <div className="text-xs font-mono font-bold tracking-[0.2em] text-[#55705A] uppercase mb-4 flex items-center justify-between">
                <span>03. OPPORTUNITY</span>
                <span className="text-[#69717A] text-[10px]">RESPONSE</span>
              </div>
              <div className="space-y-6">
                {projectData.siteContext.opportunityPoints.map((item, idx) => (
                  <div key={idx} className="border-l-2 border-[#55705A] pl-3">
                    <h4 className="text-sm font-bold text-[#13263D] mb-1">
                      {item.title}
                    </h4>
                    <p className="text-xs text-[#69717A] leading-relaxed">
                      {item.text}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
