/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { ProjectData, BuildingData, MasterplanHotspot } from '../../types/project';
import { SectionTitle } from '../common/SectionTitle';

interface MasterPlanSectionProps {
  projectData: ProjectData;
  onSelectBuilding?: (building: BuildingData) => void;
}

export const MasterPlanSection: React.FC<MasterPlanSectionProps> = ({
  projectData,
  onSelectBuilding,
}) => {
  const [viewMode, setViewMode] = useState<'plan' | 'performance'>('plan');
  const [performanceLayer, setPerformanceLayer] = useState<'normal' | 'solar' | 'sunhours' | 'noise' | 'wind' | 'green'>('sunhours');
  const [selectedBuilding, setSelectedBuilding] = useState<BuildingData | null>(
    projectData.buildings[0]
  );
  const [selectedHotspot, setSelectedHotspot] = useState<MasterplanHotspot | null>(null);
  const [hoveredHotspot, setHoveredHotspot] = useState<MasterplanHotspot | null>(null);

  const [activeLayers, setActiveLayers] = useState<Record<string, boolean>>({
    BUILDINGS: true,
    ROADS: true,
    LANDSCAPE: true,
    'PUBLIC SPACE': true,
    TRANSPORTATION: true,
    WATER: true,
    ANALYSIS: false,
  });

  const toggleLayer = (layerName: string) => {
    setActiveLayers((prev) => ({ ...prev, [layerName]: !prev[layerName] }));
  };

  const handleBuildingClick = (bld: BuildingData) => {
    setSelectedHotspot(null);
    setSelectedBuilding(bld);
    if (onSelectBuilding) {
      onSelectBuilding(bld);
    }
  };

  const handleHotspotClick = (spot: MasterplanHotspot) => {
    setSelectedBuilding(null);
    setSelectedHotspot(spot);
  };

  const masterLayers = [
    { name: 'BUILDINGS', color: '#13263D' },
    { name: 'ROADS', color: '#69717A' },
    { name: 'LANDSCAPE', color: '#55705A' },
    { name: 'PUBLIC SPACE', color: '#E58E26' },
    { name: 'TRANSPORTATION', color: '#E31B23' },
    { name: 'WATER', color: '#5B7894' },
  ];

  const hotspots = projectData.masterplanHotspots || [];

  return (
    <section id="masterplan" className="py-24 border-t border-[#13263D]/10">
      <div className="max-w-[1720px] mx-auto px-4 lg:px-8">
        <SectionTitle
          number="03"
          title="THE MASTER PLAN"
          subtitle="A connected urban system shaped by movement, landscape and environmental performance."
          category="ITERATIVE SYNTHESIS & 3D MASSING SCHEMATICS"
        />

        {/* Minimal Drawing Control Toolbar with PLAN / PERFORMANCE Toggle */}
        <div className="flex flex-wrap items-center justify-between gap-4 py-3 border-y border-[#13263D]/10 mb-8 font-mono text-xs">
          {/* Mode Switcher */}
          <div className="flex items-center gap-2">
            <span className="text-[10px] tracking-[0.2em] text-[#69717A] uppercase font-bold">
              VIEWPORT MODE:
            </span>
            <div className="flex items-center p-0.5 bg-[#E9E7E1] hairline-border">
              <button
                onClick={() => setViewMode('plan')}
                className={`px-3 py-1 text-xs transition-colors cursor-pointer ${
                  viewMode === 'plan'
                    ? 'bg-[#13263D] text-[#F4F3EF] font-bold'
                    : 'text-[#69717A] hover:text-[#13263D]'
                }`}
              >
                PLAN
              </button>
              <button
                onClick={() => setViewMode('performance')}
                className={`px-3 py-1 text-xs transition-colors cursor-pointer ${
                  viewMode === 'performance'
                    ? 'bg-[#E31B23] text-white font-bold'
                    : 'text-[#69717A] hover:text-[#13263D]'
                }`}
              >
                PERFORMANCE
              </button>
            </div>
          </div>

          {/* Sub-controls based on mode */}
          {viewMode === 'plan' ? (
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-[#69717A] tracking-wider uppercase text-[10px]">
                PLAN LAYERS:
              </span>
              <div className="flex flex-wrap items-center gap-1.5">
                {masterLayers.map((layer) => {
                  const isActive = activeLayers[layer.name];
                  return (
                    <button
                      key={layer.name}
                      onClick={() => toggleLayer(layer.name)}
                      className={`px-2.5 py-1 text-[10px] font-mono tracking-wider transition-all flex items-center gap-1.5 cursor-pointer ${
                        isActive
                          ? 'bg-[#13263D] text-[#F4F3EF]'
                          : 'bg-[#E9E7E1] text-[#69717A] hover:text-[#13263D]'
                      }`}
                    >
                      <span
                        className="w-1.5 h-1.5"
                        style={{ backgroundColor: isActive ? layer.color : '#9CA3AF' }}
                      />
                      <span>{layer.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          ) : (
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-[#69717A] tracking-wider uppercase text-[10px]">
                FORMA OVERLAY:
              </span>
              <div className="flex flex-wrap items-center gap-1">
                {(['normal', 'solar', 'sunhours', 'noise', 'wind', 'green'] as const).map((l) => (
                  <button
                    key={l}
                    onClick={() => setPerformanceLayer(l)}
                    className={`px-2.5 py-1 text-[10px] font-mono uppercase tracking-wider transition-colors cursor-pointer ${
                      performanceLayer === l
                        ? 'bg-[#13263D] text-[#F4F3EF] font-bold'
                        : 'bg-[#E9E7E1] text-[#69717A] hover:text-[#13263D]'
                    }`}
                  >
                    {l === 'normal' && 'NORMAL PLAN'}
                    {l === 'solar' && 'SOLAR PV'}
                    {l === 'sunhours' && 'SUN HOURS'}
                    {l === 'noise' && 'NOISE dB(A)'}
                    {l === 'wind' && 'WIND CFD'}
                    {l === 'green' && 'GREEN COVERAGE'}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="text-[10px] font-mono text-[#69717A]">
            {viewMode === 'plan' ? 'CLICK HOTSPOTS (●) OR BUILDINGS TO INSPECT DATA' : 'AUTODESK FORMA COMPUTATIONAL SIMULATION FIELD'}
          </div>
        </div>

        {/* Main Composition: 70% Viewport Masterplan + Narrow 30% Technical Annotation Panel */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* 70% Interactive Masterplan Visualization */}
          <div className="lg:col-span-8 relative w-full aspect-[16/10] bg-[#E9E7E1] hairline-border overflow-hidden group select-none">
            {/* Base Master Plan Image */}
            <img
              src={projectData.media[0]?.imageSrc}
              alt="High-resolution Master Plan Render"
              className={`w-full h-full object-cover transition-all duration-700 ${
                viewMode === 'performance' && performanceLayer !== 'normal'
                  ? 'filter saturate-75 contrast-110 brightness-95'
                  : ''
              }`}
              referrerPolicy="no-referrer"
            />

            {/* PERFORMANCE MODE: Simulated Forma Heatmap Layer with Smooth Crossfade */}
            {viewMode === 'performance' && (
              <div className="absolute inset-0 transition-opacity duration-700 pointer-events-none">
                <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                  {performanceLayer === 'sunhours' && (
                    <g className="transition-opacity duration-700" opacity="0.65">
                      <rect x="0" y="0" width="100" height="100" fill="url(#sunHeatGrad)" />
                      <defs>
                        <linearGradient id="sunHeatGrad" x1="0%" y1="100%" x2="100%" y2="0%">
                          <stop offset="0%" stopColor="#1E293B" stopOpacity="0.8" />
                          <stop offset="40%" stopColor="#D97706" stopOpacity="0.65" />
                          <stop offset="75%" stopColor="#F59E0B" stopOpacity="0.8" />
                          <stop offset="100%" stopColor="#FEF08A" stopOpacity="0.9" />
                        </linearGradient>
                      </defs>
                    </g>
                  )}
                  {performanceLayer === 'solar' && (
                    <g className="transition-opacity duration-700" opacity="0.6">
                      <rect x="20" y="15" width="60" height="70" fill="url(#solarPvGrad)" />
                      <defs>
                        <radialGradient id="solarPvGrad" cx="45%" cy="40%" r="50%">
                          <stop offset="0%" stopColor="#FDE047" stopOpacity="0.85" />
                          <stop offset="60%" stopColor="#EAB308" stopOpacity="0.6" />
                          <stop offset="100%" stopColor="#854D0E" stopOpacity="0.4" />
                        </radialGradient>
                      </defs>
                    </g>
                  )}
                  {performanceLayer === 'wind' && (
                    <g className="transition-opacity duration-700" stroke="#0284C7" strokeWidth="0.8" opacity="0.85" fill="none">
                      <path d="M 0,90 Q 50,60 100,20" />
                      <path d="M 0,80 Q 50,50 100,10" />
                      <path d="M 0,70 Q 50,40 100,0" />
                      <path d="M 10,100 Q 55,70 100,30" />
                      <path d="M 20,100 Q 60,75 100,40" strokeDasharray="1 1" />
                    </g>
                  )}
                  {performanceLayer === 'noise' && (
                    <g className="transition-opacity duration-700" opacity="0.65">
                      <rect x="75" y="0" width="25" height="100" fill="#EF4444" opacity="0.75" />
                      <rect x="55" y="0" width="20" height="100" fill="#F59E0B" opacity="0.55" />
                      <rect x="0" y="0" width="55" height="100" fill="#10B981" opacity="0.4" />
                    </g>
                  )}
                  {performanceLayer === 'green' && (
                    <g className="transition-opacity duration-700" opacity="0.65">
                      <rect x="40" y="8" width="20" height="84" fill="#55705A" />
                      <circle cx="50" cy="80" r="18" fill="#55705A" opacity="0.55" />
                      <circle cx="35" cy="45" r="12" fill="#55705A" opacity="0.4" />
                    </g>
                  )}
                </svg>

                {/* Floating Heatmap Gradient Legend with Verified Forma Metrics */}
                {performanceLayer !== 'normal' && (
                  <div className="absolute top-4 right-4 bg-[#13263D]/95 text-white p-3 font-mono text-[9px] hairline-border pointer-events-auto shadow-lg max-w-xs">
                    <div className="text-[8px] uppercase tracking-widest text-[#E31B23] mb-1 font-bold">
                      FORMA SIMULATION: {performanceLayer.toUpperCase()}
                    </div>
                    {performanceLayer === 'sunhours' && (
                      <div className="mb-2">
                        <div className="w-48 h-2 rounded-xs bg-gradient-to-r from-[#1E293B] via-[#D97706] to-[#FEF08A] mb-1" />
                        <div className="flex justify-between text-[8px] text-white/70">
                          <span>0 hrs</span>
                          <span className="text-[#FACC15] font-bold">5.4 hrs/day Ground</span>
                          <span>10+ hrs</span>
                        </div>
                      </div>
                    )}
                    {performanceLayer === 'solar' && (
                      <div className="mb-2">
                        <div className="w-48 h-2 rounded-xs bg-gradient-to-r from-[#854D0E] via-[#EAB308] to-[#FDE047] mb-1" />
                        <div className="flex justify-between text-[8px] text-white/70">
                          <span>0 kWh/m²</span>
                          <span className="text-[#FACC15] font-bold">41.8 GWh / year</span>
                          <span>1,450 kWh/m²</span>
                        </div>
                      </div>
                    )}
                    {performanceLayer === 'wind' && (
                      <div className="mb-2">
                        <div className="w-48 h-2 rounded-xs bg-gradient-to-r from-[#0369A1] via-[#38BDF8] to-[#E0F2FE] mb-1" />
                        <div className="flex justify-between text-[8px] text-white/70">
                          <span>0.5 m/s (Calm)</span>
                          <span className="text-[#38BDF8] font-bold">Sitting & Strolling</span>
                          <span>8.0 m/s (Breezy)</span>
                        </div>
                      </div>
                    )}
                    {performanceLayer === 'noise' && (
                      <div className="mb-2">
                        <div className="w-48 h-2 rounded-xs bg-gradient-to-r from-[#10B981] via-[#F59E0B] to-[#EF4444] mb-1" />
                        <div className="flex justify-between text-[8px] text-white/70">
                          <span>&lt;45 dB(A) (Quiet)</span>
                          <span className="text-[#10B981] font-bold">48.2 dB(A) Core</span>
                          <span>&gt;75 dB(A) (Highway)</span>
                        </div>
                      </div>
                    )}
                    {performanceLayer === 'green' && (
                      <div className="mb-2">
                        <div className="w-48 h-2 rounded-xs bg-gradient-to-r from-[#D8D6CE] to-[#55705A] mb-1" />
                        <div className="flex justify-between text-[8px] text-white/70">
                          <span>0% Impermeable</span>
                          <span className="text-[#4ADE80] font-bold">34.5% Green Canopy</span>
                          <span>100% Wetland</span>
                        </div>
                      </div>
                    )}
                    <div className="text-[8px] text-white/60 border-t border-white/10 pt-1">
                      AUTODESK FORMA CLOUD COMPUTATION RUN
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* PLAN MODE: Interactive SVG Callouts, Buildings & Hotspots */}
            <svg
              className="absolute inset-0 w-full h-full"
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
            >
              {/* Water Layer */}
              {activeLayers.WATER && (
                <path
                  d="M 0,85 Q 50,80 100,75 L 100,100 L 0,100 Z"
                  fill="#5B7894"
                  opacity="0.3"
                  className="pointer-events-none"
                />
              )}

              {/* Landscape Layer */}
              {activeLayers.LANDSCAPE && (
                <path
                  d="M 45,10 C 48,35 48,65 52,80 L 58,80 C 56,65 54,35 52,10 Z"
                  fill="#55705A"
                  opacity="0.3"
                  className="pointer-events-none"
                />
              )}

              {/* Buildings & Selectable Pins */}
              {activeLayers.BUILDINGS &&
                projectData.buildings.map((bld) => {
                  const isSelected = selectedBuilding?.id === bld.id;
                  return (
                    <g
                      key={bld.id}
                      onClick={() => handleBuildingClick(bld)}
                      className="cursor-pointer group/pin"
                    >
                      <rect
                        x={bld.coordinates.x}
                        y={bld.coordinates.y}
                        width={bld.coordinates.width}
                        height={bld.coordinates.height}
                        fill={isSelected ? '#E31B23' : '#13263D'}
                        opacity={isSelected ? 0.45 : 0.25}
                        stroke={isSelected ? '#E31B23' : '#13263D'}
                        strokeWidth={isSelected ? 0.8 : 0.4}
                        strokeDasharray={isSelected ? 'none' : '1 0.5'}
                        className="transition-all duration-200"
                      />
                      <circle
                        cx={bld.coordinates.x + bld.coordinates.width / 2}
                        cy={bld.coordinates.y + bld.coordinates.height / 2}
                        r={isSelected ? 2.5 : 1.8}
                        fill={isSelected ? '#E31B23' : '#13263D'}
                        stroke="#F4F3EF"
                        strokeWidth={0.5}
                      />
                      <text
                        x={bld.coordinates.x + bld.coordinates.width / 2}
                        y={bld.coordinates.y + bld.coordinates.height / 2 - 3}
                        textAnchor="middle"
                        fill="#13263D"
                        fontSize="2.4"
                        fontWeight="bold"
                        fontFamily="JetBrains Mono"
                        className="pointer-events-none drop-shadow-xs"
                      >
                        {bld.code}
                      </text>
                    </g>
                  );
                })}

              {/* INTERACTIVE MASTERPLAN HOTSPOTS (●) */}
              {viewMode === 'plan' &&
                hotspots.map((spot) => {
                  const isSelected = selectedHotspot?.id === spot.id;
                  return (
                    <g
                      key={spot.id}
                      onClick={() => handleHotspotClick(spot)}
                      onMouseEnter={() => setHoveredHotspot(spot)}
                      onMouseLeave={() => setHoveredHotspot(null)}
                      className="cursor-pointer group/hotspot"
                    >
                      {/* Pulsing Target Ring */}
                      <circle
                        cx={spot.coordinates.x}
                        cy={spot.coordinates.y}
                        r={isSelected ? 4 : 2.8}
                        fill="none"
                        stroke={isSelected ? '#E31B23' : '#13263D'}
                        strokeWidth="0.6"
                        strokeDasharray="1 1"
                        className="animate-spin-slow origin-center"
                      />
                      {/* Solid Center Node */}
                      <circle
                        cx={spot.coordinates.x}
                        cy={spot.coordinates.y}
                        r={isSelected ? 2 : 1.5}
                        fill={isSelected ? '#E31B23' : '#13263D'}
                        stroke="#F4F3EF"
                        strokeWidth="0.4"
                      />
                      {/* Label on Masterplan */}
                      <text
                        x={spot.coordinates.x}
                        y={spot.coordinates.y + 4.5}
                        textAnchor="middle"
                        fill="#13263D"
                        fontSize="2.2"
                        fontWeight="bold"
                        fontFamily="JetBrains Mono"
                        className="pointer-events-none tracking-tight drop-shadow-xs bg-white/70"
                      >
                        ● {spot.name.split(' ')[0]}
                      </text>
                    </g>
                  );
                })}
            </svg>

            {/* Hover Tooltip for Hotspot */}
            {hoveredHotspot && (
              <div
                className="absolute z-20 pointer-events-none p-2 bg-[#13263D] text-[#F4F3EF] font-mono text-[10px] hairline-border shadow-lg"
                style={{
                  left: `${hoveredHotspot.coordinates.x}%`,
                  top: `${Math.max(5, hoveredHotspot.coordinates.y - 12)}%`,
                  transform: 'translate(-50%, -100%)',
                }}
              >
                <div className="text-[#E31B23] font-bold text-[9px]">HOTSPOT: {hoveredHotspot.category}</div>
                <div className="font-bold">{hoveredHotspot.name}</div>
                <div className="text-white/60 text-[9px]">{hoveredHotspot.area}</div>
              </div>
            )}

            {/* Drawing Legend */}
            <div className="absolute bottom-4 left-4 bg-[#F4F3EF]/95 backdrop-blur-xs p-3 font-mono text-[9px] hairline-border max-w-xs">
              <div className="text-[8px] uppercase tracking-[0.2em] text-[#69717A] mb-1.5 font-bold">
                ARCHITECTURAL DRAWING LEGEND
              </div>
              <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-[#13263D]">
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 bg-[#13263D]" />
                  <span>Commercial / Office</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 bg-[#E58E26]" />
                  <span>Residential Mix</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 bg-[#55705A]" />
                  <span>Biophilic Canopy</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 bg-[#E31B23]" />
                  <span>Transit Interface</span>
                </div>
              </div>
            </div>

            {/* Scale Bar */}
            <div className="absolute top-4 right-4 bg-[#F4F3EF]/90 backdrop-blur-xs px-3 py-1 font-mono text-[9px] hairline-border flex items-center gap-2">
              <div className="w-16 h-1 bg-[#13263D] flex justify-between">
                <span className="w-px h-1.5 bg-[#13263D]" />
                <span className="w-px h-1.5 bg-[#13263D]" />
              </div>
              <span>200 METERS</span>
            </div>
          </div>

          {/* Narrow 30% Technical Annotation Panel (Handles Both Building & Hotspot Inspection) */}
          <div className="lg:col-span-4 bg-[#F4F3EF] hairline-border p-6 font-mono">
            {selectedHotspot ? (
              /* HOTSPOT COMPACT INFORMATION PANEL (Requirement 4) */
              <div className="space-y-6">
                <div className="border-b border-[#13263D]/10 pb-4">
                  <div className="flex items-center justify-between text-[10px] text-[#69717A] tracking-widest uppercase mb-1">
                    <span>HOTSPOT INFORMATION</span>
                    <span className="text-[#E31B23] font-bold">ZONE DETAILS</span>
                  </div>
                  <h3 className="text-2xl font-black text-[#13263D] tracking-tight">
                    {selectedHotspot.name}
                  </h3>
                  <div className="mt-2 inline-block px-2 py-0.5 bg-[#13263D] text-[#F4F3EF] text-[10px] uppercase tracking-wider">
                    {selectedHotspot.category}
                  </div>
                </div>

                <div className="space-y-4 text-xs">
                  <div className="border-l-2 border-[#13263D] pl-3 py-1">
                    <div className="text-[9px] text-[#69717A] uppercase tracking-wider">
                      PRIMARY FUNCTION
                    </div>
                    <div className="text-sm font-bold text-[#13263D] mt-0.5">
                      {selectedHotspot.function}
                    </div>
                  </div>

                  <div className="border-l-2 border-[#13263D] pl-3 py-1">
                    <div className="text-[9px] text-[#69717A] uppercase tracking-wider">
                      TOTAL ALLOCATED AREA
                    </div>
                    <div className="text-sm font-bold text-[#13263D] mt-0.5">
                      {selectedHotspot.area}
                    </div>
                  </div>

                  <div className="border-l-2 border-[#55705A] pl-3 py-1">
                    <div className="text-[9px] text-[#55705A] uppercase tracking-wider font-bold">
                      KEY ROLE IN MASTERPLAN
                    </div>
                    <p className="text-xs text-[#13263D] font-sans leading-relaxed mt-1">
                      {selectedHotspot.keyRole}
                    </p>
                  </div>
                </div>

                <div className="pt-4 border-t border-[#13263D]/10 flex items-center justify-between text-[10px]">
                  <span className="text-[#69717A]">AUTODESK FORMA GIS DATA</span>
                  <button
                    onClick={() => {
                      setSelectedHotspot(null);
                      setSelectedBuilding(projectData.buildings[0]);
                    }}
                    className="text-[#E31B23] hover:underline cursor-pointer font-bold"
                  >
                    INSPECT BUILDINGS →
                  </button>
                </div>
              </div>
            ) : selectedBuilding ? (
              /* BUILDING METADATA PANEL */
              <div className="space-y-6">
                <div className="border-b border-[#13263D]/10 pb-4">
                  <div className="flex items-center justify-between text-[10px] text-[#69717A] tracking-widest uppercase mb-1">
                    <span>BUILDING PARAMETERS</span>
                    <span className="text-[#E31B23] font-bold">FORMA LOD 200</span>
                  </div>
                  <h3 className="text-2xl font-black text-[#13263D] tracking-tight">
                    {selectedBuilding.code}
                  </h3>
                  <div className="text-xs text-[#69717A] font-sans mt-1">
                    {selectedBuilding.name}
                  </div>
                  <div className="mt-2 inline-block px-2 py-0.5 bg-[#13263D] text-[#F4F3EF] text-[10px] uppercase tracking-wider">
                    {selectedBuilding.typology}
                  </div>
                </div>

                {/* Primary Metrics Grid */}
                <div className="grid grid-cols-2 gap-4 text-xs">
                  <div className="border-l-2 border-[#13263D] pl-3 py-0.5">
                    <div className="text-[9px] text-[#69717A] uppercase tracking-wider">
                      HEIGHT
                    </div>
                    <div className="text-base font-bold text-[#13263D]">
                      {selectedBuilding.heightMeters} m
                    </div>
                  </div>

                  <div className="border-l-2 border-[#13263D] pl-3 py-0.5">
                    <div className="text-[9px] text-[#69717A] uppercase tracking-wider">
                      FLOORS
                    </div>
                    <div className="text-base font-bold text-[#13263D]">
                      {selectedBuilding.floors} Storeys
                    </div>
                  </div>

                  <div className="border-l-2 border-[#13263D] pl-3 py-0.5">
                    <div className="text-[9px] text-[#69717A] uppercase tracking-wider">
                      GROSS FLOOR AREA
                    </div>
                    <div className="text-base font-bold text-[#13263D]">
                      {selectedBuilding.grossFloorAreaSqM.toLocaleString()} m²
                    </div>
                  </div>

                  <div className="border-l-2 border-[#13263D] pl-3 py-0.5">
                    <div className="text-[9px] text-[#69717A] uppercase tracking-wider">
                      FOOTPRINT
                    </div>
                    <div className="text-base font-bold text-[#13263D]">
                      {selectedBuilding.footprintSqM.toLocaleString()} m²
                    </div>
                  </div>
                </div>

                {/* Environmental Performance in Forma */}
                <div className="border-t border-[#13263D]/10 pt-4 space-y-3">
                  <div className="text-[10px] text-[#69717A] uppercase tracking-widest font-bold">
                    FORMA SIMULATION RESULTS
                  </div>

                  <div className="flex justify-between items-center text-xs py-1 border-b border-[#13263D]/5">
                    <span className="text-[#69717A]">Daylight Compliance:</span>
                    <span className="font-bold text-[#13263D]">
                      {selectedBuilding.daylightCompliancePercent}% sDA
                    </span>
                  </div>

                  <div className="flex justify-between items-center text-xs py-1 border-b border-[#13263D]/5">
                    <span className="text-[#69717A]">Embodied Carbon:</span>
                    <span className="font-bold text-[#13263D]">
                      {selectedBuilding.embodiedCarbonKgCo2ePerSqM} kg CO₂e/m²
                    </span>
                  </div>

                  <div className="flex justify-between items-center text-xs py-1 border-b border-[#13263D]/5">
                    <span className="text-[#69717A]">Direct Sun Hours:</span>
                    <span className="font-bold text-[#13263D]">
                      {selectedBuilding.formaAnalysis.sunlightHoursDirect} hrs/day
                    </span>
                  </div>

                  <div className="flex justify-between items-center text-xs py-1 border-b border-[#13263D]/5">
                    <span className="text-[#69717A]">Pedestrian Wind Comfort:</span>
                    <span className="font-bold text-[#55705A] text-right text-[11px]">
                      {selectedBuilding.formaAnalysis.windComfortRating}
                    </span>
                  </div>
                </div>

                {/* BIM / Revit Synchronization Status */}
                <div className="border-t border-[#13263D]/10 pt-4">
                  <div className="text-[10px] text-[#69717A] uppercase tracking-widest font-bold mb-2">
                    REVIT BIM STATUS
                  </div>
                  <div className="p-3 bg-[#E9E7E1]/60 text-xs space-y-1 font-sans">
                    <div className="font-mono text-[10px] font-bold text-[#13263D]">
                      {selectedBuilding.bimRevitSync.lodLevel}
                    </div>
                    <div className="text-[11px] text-[#69717A]">
                      Structure: {selectedBuilding.bimRevitSync.structuralType}
                    </div>
                    <div className="text-[10px] font-mono text-[#5B7894] truncate">
                      Family: {selectedBuilding.bimRevitSync.revitFamily}
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-16 text-xs text-[#69717A]">
                Select a hotspot (●) or building in the masterplan to view parameters.
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

