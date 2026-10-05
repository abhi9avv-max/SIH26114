/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { ProjectData } from '../../types/project';
import { TechnicalAnnotation } from '../common/TechnicalAnnotation';

interface HeroSectionProps {
  projectData: ProjectData;
  onExplore: () => void;
  onOpenJuryMode: () => void;
  onOpenGlance?: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  projectData,
  onExplore,
  onOpenJuryMode,
  onOpenGlance,
}) => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 12;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 12;
    setMousePos({ x, y });
  };

  const handleMouseLeave = () => {
    setMousePos({ x: 0, y: 0 });
  };

  return (
    <section className="relative pt-6 pb-12 overflow-hidden">
      {/* Subtle Background Architectural Coordinate Grid Lines with Slow Motion */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.04] select-none overflow-hidden" aria-hidden="true">
        <svg className="w-[110%] h-[110%] -top-4 -left-4 absolute animate-slow-grid" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="archGrid" width="80" height="80" patternUnits="userSpaceOnUse">
              <path d="M 80 0 L 0 0 0 80" fill="none" stroke="#13263D" strokeWidth="1" />
              <circle cx="80" cy="80" r="1.5" fill="#13263D" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#archGrid)" />
        </svg>

        {/* Tiny Architectural Coordinate & Grid Reference Watermarks */}
        <div className="absolute top-3 left-4 font-mono text-[8px] text-[#69717A]/50 tracking-widest uppercase">
          DATUM: +12.4m ASD · CRS: EPSG 3857 · UTM 43N
        </div>
        <div className="absolute top-3 right-4 font-mono text-[8px] text-[#69717A]/50 tracking-widest uppercase">
          GRID INTERSECTION: A-12 / AZ 180° · GIS LAYER 01
        </div>
        <div className="absolute bottom-3 left-4 font-mono text-[8px] text-[#69717A]/50 tracking-widest uppercase">
          BOUNDING ENVELOPE: 1.24 km² · FORMA TIDAL BASIN
        </div>
        <div className="absolute bottom-3 right-4 font-mono text-[8px] text-[#69717A]/50 tracking-widest uppercase">
          SIMULATION ENVIRONMENT: CALIBRATED AUTODESK CLOUD
        </div>
      </div>

      <div className="max-w-[1720px] mx-auto px-4 lg:px-8 relative z-10">
        {/* Architectural Documentation Header Strip */}
        <div className="flex flex-wrap items-center justify-between text-[10px] font-mono tracking-[0.25em] text-[#69717A] pb-3 mb-6 border-b border-[#13263D]/10">
          <div className="flex items-center gap-4">
            <span className="font-semibold text-[#13263D]">SIH 2026</span>
            <span className="text-[#69717A]/40">/</span>
            <span className="text-[#E31B23] font-bold">AUTODESK EDUCATION EXPERIENCE</span>
            <span className="text-[#69717A]/40">/</span>
            <span className="hidden sm:inline">SMART CITY SITE PLANNING</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-[#69717A]">PHASE: PRE-CONSTRUCTION SIMULATION</span>
            <span className="text-[#69717A]/40">/</span>
            <span className="font-bold text-[#13263D]">{projectData.revision || 'REV. 02'} · 2026</span>
          </div>
        </div>

        {/* Top Editorial Row */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-12">
          {/* Left Column: Typography & CTAs */}
          <div className="lg:col-span-7 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3 text-xs font-mono uppercase tracking-[0.25em] text-[#69717A] mb-4">
                <span>{projectData.projectName}</span>
                <span className="h-px w-6 bg-[#69717A]/40" />
                <span className="text-[#E31B23] font-semibold">AUTODESK FORMA + REVIT</span>
              </div>

              <h1 className="text-5xl sm:text-6xl md:text-7xl xl:text-8xl font-black tracking-tighter text-[#13263D] uppercase leading-[0.92] select-none">
                DESIGNING<br />
                THE NEXT<br />
                URBAN SYSTEM.
              </h1>

              <p className="mt-8 text-lg sm:text-xl text-[#69717A] max-w-xl font-normal leading-relaxed">
                Smart City Site Planning using <span className="text-[#13263D] font-semibold">Autodesk Forma Site Design</span> and <span className="text-[#13263D] font-semibold">Autodesk Revit</span>.
              </p>
            </div>

            <div className="mt-10 flex flex-wrap items-center gap-4">
              <button
                onClick={onExplore}
                className="group px-6 py-3.5 bg-[#13263D] text-[#F4F3EF] hover:bg-[#E31B23] font-mono text-xs font-bold uppercase tracking-widest transition-all duration-200 flex items-center gap-3 cursor-pointer shadow-sm active:translate-y-0.5"
              >
                <span>EXPLORE PROJECT</span>
                <span className="transition-transform duration-200 group-hover:translate-x-1" aria-hidden="true">→</span>
              </button>
              <button
                onClick={onOpenJuryMode}
                className="group px-6 py-3.5 border border-[#13263D] text-[#13263D] hover:bg-[#13263D] hover:text-[#F4F3EF] font-mono text-xs font-bold uppercase tracking-widest transition-all duration-200 flex items-center gap-3 cursor-pointer active:translate-y-0.5"
              >
                <span>JURY MODE</span>
                <span className="transition-transform duration-200 group-hover:translate-x-1" aria-hidden="true">→</span>
              </button>
              {onOpenGlance && (
                <button
                  onClick={onOpenGlance}
                  className="px-4 py-3.5 text-[#69717A] hover:text-[#13263D] hover:bg-[#E9E7E1]/60 font-mono text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer border border-[#13263D]/20"
                >
                  PROJECT INFO [ⓘ]
                </button>
              )}
            </div>
          </div>

          {/* Right Column: Architectural Drawing Coordinates & Metadata */}
          <div className="lg:col-span-5 flex flex-col justify-end lg:items-end">
            <div className="space-y-4 max-w-xs w-full text-right font-mono">
              <div className="border-r-2 border-[#13263D] pr-3 py-1">
                <div className="text-[10px] uppercase tracking-[0.2em] text-[#69717A]">
                  LOCATION COORDINATES
                </div>
                <div className="text-xs font-semibold text-[#13263D] tabular-nums">
                  {projectData.location.latitude.toFixed(4)}° N, {projectData.location.longitude.toFixed(4)}° E
                </div>
                <div className="text-[11px] text-[#69717A] font-sans">
                  {projectData.location.siteName}, {projectData.location.city}
                </div>
              </div>

              <div className="border-r-2 border-[#13263D] pr-3 py-1">
                <div className="text-[10px] uppercase tracking-[0.2em] text-[#69717A]">
                  EVALUATION CONTEXT
                </div>
                <div className="text-xs font-semibold text-[#13263D]">
                  SMART INDIA HACKATHON 2026
                </div>
                <div className="text-[11px] text-[#69717A] font-sans">
                  Theme: {projectData.theme} · Org: {projectData.organization}
                </div>
              </div>

              <div className="border-r-2 border-[#E31B23] pr-3 py-1">
                <div className="text-[10px] uppercase tracking-[0.2em] text-[#69717A]">
                  SOFTWARE INTEROPERABILITY
                </div>
                <div className="text-xs font-bold text-[#E31B23]">
                  FORMA → REVIT 2026
                </div>
                <div className="text-[11px] text-[#69717A] font-sans">
                  Native Revit Add-In Site Model Sync
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Large Architectural Masterplan Render Viewport with Subtle Parallax & Scanning Line */}
        <div
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          className="relative w-full aspect-[16/9] max-h-[780px] bg-[#E9E7E1] hairline-border overflow-hidden group select-none transition-shadow duration-300 hover:shadow-xl"
        >
          <img
            src={projectData.media[0]?.imageSrc}
            alt="Autodesk Forma Smart City Master Plan Rendering"
            style={{
              transform: `scale(1.02) translate(${mousePos.x}px, ${mousePos.y}px)`,
              transition: 'transform 0.4s ease-out',
            }}
            className="w-full h-full object-cover grayscale-[10%] group-hover:grayscale-0"
            referrerPolicy="no-referrer"
          />

          {/* Subtle Horizontal Architectural Scanning Beam */}
          <div
            className="absolute inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-[#E31B23]/40 to-transparent pointer-events-none animate-scanline"
            aria-hidden="true"
          />

          {/* Top Edge Architectural Scale Indicator */}
          <div className="absolute top-4 left-4 flex items-center gap-2 bg-[#F4F3EF]/95 backdrop-blur-xs px-3 py-1.5 font-mono text-[10px] text-[#13263D] hairline-border">
            <span className="w-1.5 h-1.5 bg-[#E31B23]" />
            <span className="font-bold">FIG. 01.0</span>
            <span className="text-[#69717A]">|</span>
            <span>AUTODESK FORMA GENERATIVE MASTERPLAN · AERIAL PERSPECTIVE</span>
          </div>

          {/* Top Right Architectural Drawing Stamp */}
          <div className="absolute top-4 right-4 hidden md:flex items-center gap-3 bg-[#F4F3EF]/95 backdrop-blur-xs px-3 py-1.5 font-mono text-[9px] text-[#13263D] hairline-border">
            <span>DRAWING: MP-001</span>
            <span className="text-[#69717A]">·</span>
            <span>SCALE: 1:2000</span>
            <span className="text-[#69717A]">·</span>
            <span className="text-[#55705A] font-bold">VERIFIED RUN</span>
          </div>

          {/* Technical Drawing Annotations (NOT cards, crisp hairline technical callouts) */}
          <div className="absolute bottom-6 left-6 flex flex-wrap gap-4 z-10">
            <TechnicalAnnotation
              label="SITE AREA"
              value={projectData.siteAreaSqKm}
              unit="km² (124 ha)"
              subtext="Tidal waterfront urban concession"
            />
            <TechnicalAnnotation
              label="PROPOSALS"
              value="02"
              unit="Iterative Models"
              subtext="Compact Core vs Green Connected"
            />
            <TechnicalAnnotation
              label="ANALYSES"
              value="08"
              unit="Forma Dimensions"
              subtext="Sun, Wind CFD, Carbon, Microclimate"
            />
            <TechnicalAnnotation
              label="BIM BUILDING"
              value="01"
              unit="LOD 350 Revit Sync"
              subtext="Flagship Climate Tech Office"
            />
          </div>

          {/* Compass & North Arrow overlay in bottom right */}
          <div className="absolute bottom-6 right-6 hidden sm:flex items-center gap-3 bg-[#F4F3EF]/95 backdrop-blur-xs px-3 py-2 font-mono text-[10px] text-[#13263D] hairline-border">
            <div className="flex flex-col items-center">
              <span className="font-bold text-[#E31B23]">N</span>
              <div className="w-px h-6 bg-[#13263D] relative">
                <div className="absolute -top-1 -left-1 w-2 h-2 border-t-2 border-l-2 border-[#E31B23] rotate-45" />
              </div>
            </div>
            <div className="text-[9px] leading-tight text-[#69717A]">
              TRUE NORTH<br />
              AZIMUTH 0.0°
            </div>
          </div>
        </div>

        {/* 2. LIVE PROJECT STATUS STRIP (Below Hero) */}
        <div className="mt-4 p-3 bg-[#E9E7E1]/80 hairline-border font-mono text-xs flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-[10px] tracking-[0.2em] uppercase text-[#69717A] font-bold">
            <span className="w-2 h-2 bg-[#13263D]" />
            <span>PROJECT STATUS</span>
          </div>

          <div className="flex flex-wrap items-center gap-6 text-[11px]">
            <div className="flex items-center gap-2">
              <span className="text-[#69717A] uppercase">SITE DESIGN</span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#55705A]" />
              <span className="font-bold text-[#13263D]">READY</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[#69717A] uppercase">PROPOSALS</span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#55705A]" />
              <span className="font-bold text-[#13263D]">02</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[#69717A] uppercase">ANALYSIS</span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#55705A]" />
              <span className="font-bold text-[#13263D]">08</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[#69717A] uppercase">BIM DEVELOPMENT</span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#D97706] animate-pulse" />
              <span className="font-bold text-[#13263D]">IN PROGRESS</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[#69717A] uppercase">WALKTHROUGH</span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#55705A]" />
              <span className="font-bold text-[#13263D]">READY</span>
            </div>
          </div>

          <div className="text-[10px] text-[#69717A] font-mono tracking-wider hidden xl:block">
            AUTODESK FORMA ECOSYSTEM · REVISION 02
          </div>
        </div>
      </div>
    </section>
  );
};

