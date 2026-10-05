/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { ProjectData, AnalysisSectionData } from '../../types/project';
import { SectionTitle } from '../common/SectionTitle';
import { EmptyDataBadge } from '../common/EmptyDataBadge';

interface PerformanceAnalysisSectionProps {
  projectData: ProjectData;
  showPendingDataMode?: boolean;
}

export const PerformanceAnalysisSection: React.FC<PerformanceAnalysisSectionProps> = ({
  projectData,
  showPendingDataMode = false,
}) => {
  const [activeAnalysisIndex, setActiveAnalysisIndex] = useState<string | null>(null);
  const [heatmapFocus, setHeatmapFocus] = useState<'sun' | 'daylight' | 'wind' | 'noise' | 'microclimate' | 'solar'>('sun');

  // High-fidelity architectural analytical canvas for each of the 8 Forma tools
  const renderAnalysisVisual = (analysis: AnalysisSectionData) => {
    switch (analysis.id) {
      case 'analysis-area':
        return (
          <div className="relative w-full aspect-[16/7] bg-[#E9E7E1] hairline-border overflow-hidden flex items-center justify-center p-8">
            <svg className="w-full h-full" viewBox="0 0 800 350">
              {/* Site boundary bounding box */}
              <rect x="50" y="30" width="700" height="290" fill="none" stroke="#13263D" strokeWidth="1" strokeDasharray="4 4" />
              {/* Developable Footprint */}
              <rect x="80" y="60" width="360" height="230" fill="#13263D" opacity="0.15" stroke="#13263D" strokeWidth="1.5" />
              {/* Commercial blocks */}
              <rect x="100" y="80" width="140" height="180" fill="#13263D" opacity="0.8" />
              <text x="170" y="175" fill="#F4F3EF" fontSize="11" fontFamily="JetBrains Mono" textAnchor="middle">
                COMMERCIAL 490K m²
              </text>
              {/* Residential blocks */}
              <rect x="260" y="80" width="160" height="90" fill="#E58E26" opacity="0.85" />
              <text x="340" y="130" fill="#F4F3EF" fontSize="11" fontFamily="JetBrains Mono" textAnchor="middle">
                RESIDENTIAL 510K m²
              </text>
              {/* Civic Amenity */}
              <rect x="260" y="190" width="160" height="70" fill="#5B7894" opacity="0.85" />
              <text x="340" y="230" fill="#F4F3EF" fontSize="11" fontFamily="JetBrains Mono" textAnchor="middle">
                CIVIC & TRANSIT 180K m²
              </text>
              {/* Green Park spine */}
              <rect x="460" y="60" width="260" height="230" fill="#55705A" opacity="0.6" stroke="#55705A" strokeWidth="1.5" />
              <text x="590" y="175" fill="#13263D" fontSize="12" fontWeight="bold" fontFamily="JetBrains Mono" textAnchor="middle">
                CENTRAL BIOPHILIC CORRIDOR · 347,000 m² (34.5%)
              </text>
            </svg>
            <div className="absolute top-4 left-4 bg-[#F4F3EF]/90 px-3 py-1 font-mono text-[10px] text-[#13263D] hairline-border">
              AUTODESK FORMA · PARAMETRIC AREA CLASSIFICATION
            </div>
          </div>
        );

      case 'analysis-carbon':
        return (
          <div className="relative w-full aspect-[16/7] bg-[#E9E7E1] hairline-border overflow-hidden flex items-center justify-center p-8">
            <svg className="w-full h-full" viewBox="0 0 800 350">
              {/* Comparison baseline bars */}
              <text x="100" y="70" fill="#13263D" fontSize="12" fontFamily="JetBrains Mono" fontWeight="bold">
                A1-A5 UPFRONT EMBODIED CARBON INTENSITY (kg CO₂e / m²)
              </text>
              {/* Prop A bar */}
              <text x="100" y="125" fill="#69717A" fontSize="11" fontFamily="JetBrains Mono">PROPOSAL A (CONCRETE TOWER BASELINE)</text>
              <rect x="100" y="135" width="468" height="34" fill="#E31B23" opacity="0.85" />
              <text x="580" y="158" fill="#13263D" fontSize="12" fontFamily="JetBrains Mono" fontWeight="bold">
                468 kg CO₂e/m²
              </text>
              {/* Prop B bar */}
              <text x="100" y="215" fill="#13263D" fontSize="11" fontFamily="JetBrains Mono">PROPOSAL B (MASS TIMBER HYBRID)</text>
              <rect x="100" y="225" width="348" height="34" fill="#55705A" opacity="0.9" />
              <text x="460" y="248" fill="#55705A" fontSize="12" fontFamily="JetBrains Mono" fontWeight="bold">
                348 kg CO₂e/m² (-25.6%)
              </text>
              {/* RIBA 2030 Target Line */}
              <line x1="400" y1="95" x2="400" y2="290" stroke="#13263D" strokeWidth="1.5" strokeDasharray="4 4" />
              <text x="405" y="110" fill="#13263D" fontSize="10" fontFamily="JetBrains Mono">
                RIBA 2030 TARGET: 400 kg CO₂e/m²
              </text>
            </svg>
            <div className="absolute top-4 left-4 bg-[#F4F3EF]/90 px-3 py-1 font-mono text-[10px] text-[#13263D] hairline-border">
              AUTODESK FORMA EMBODIED CARBON BETA ENGINE
            </div>
          </div>
        );

      case 'analysis-sun':
        return (
          <div className="relative w-full aspect-[16/7] bg-[#1E293B] hairline-border overflow-hidden flex items-center justify-center p-6">
            {/* Direct Sun Hours Heatmap Simulation */}
            <svg className="w-full h-full" viewBox="0 0 800 350">
              <defs>
                <linearGradient id="sunGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#1E293B" />
                  <stop offset="40%" stopColor="#CA8A04" />
                  <stop offset="80%" stopColor="#FACC15" />
                  <stop offset="100%" stopColor="#FEF08A" />
                </linearGradient>
              </defs>
              {/* Ground insolation gradient grid */}
              <rect x="60" y="40" width="680" height="260" fill="url(#sunGrad)" opacity="0.75" />
              {/* Building shadows cast at 45 degree angle */}
              <polygon points="140,80 220,80 280,180 200,180" fill="#0F172A" opacity="0.8" />
              <polygon points="320,70 410,70 470,170 380,170" fill="#0F172A" opacity="0.8" />
              <polygon points="500,90 600,90 660,190 560,190" fill="#0F172A" opacity="0.8" />
              {/* Ground buildings */}
              <rect x="140" y="80" width="80" height="70" fill="#334155" stroke="#94A3B8" strokeWidth="1" />
              <rect x="320" y="70" width="90" height="80" fill="#334155" stroke="#94A3B8" strokeWidth="1" />
              <rect x="500" y="90" width="100" height="60" fill="#334155" stroke="#94A3B8" strokeWidth="1" />
              <text x="240" y="270" fill="#FFFFFF" fontSize="12" fontFamily="JetBrains Mono" fontWeight="bold">
                AVERAGE GROUND SUN HOURS: 5.4 HRS / DAY (EQUINOX)
              </text>
            </svg>
            <div className="absolute top-4 left-4 bg-[#1E293B]/90 px-3 py-1 font-mono text-[10px] text-white hairline-border">
              AUTODESK FORMA · ANNUAL SUN HOURS ENGINE (BRE COMPLIANCE: 88%)
            </div>
          </div>
        );

      case 'analysis-daylight':
        return (
          <div className="relative w-full aspect-[16/7] bg-[#0F172A] hairline-border overflow-hidden flex items-center justify-center p-6">
            <svg className="w-full h-full" viewBox="0 0 800 350">
              {/* Floorplate Daylight Penetration Contours */}
              <rect x="80" y="50" width="640" height="240" fill="#1E293B" stroke="#38BDF8" strokeWidth="1" />
              {/* Perimeter high autonomy zone (>300 lux) */}
              <rect x="100" y="70" width="600" height="200" fill="#38BDF8" opacity="0.4" />
              {/* Secondary zone */}
              <rect x="150" y="100" width="500" height="140" fill="#0284C7" opacity="0.5" />
              {/* Building Core (<50% sDA) */}
              <rect x="280" y="130" width="240" height="80" fill="#0F172A" stroke="#94A3B8" strokeWidth="1" strokeDasharray="2 2" />
              <text x="400" y="175" fill="#94A3B8" fontSize="11" fontFamily="JetBrains Mono" textAnchor="middle">
                SERVICE CORE & LIFTS
              </text>
              <text x="400" y="290" fill="#38BDF8" fontSize="11" fontFamily="JetBrains Mono" textAnchor="middle" fontWeight="bold">
                84% SPATIAL DAYLIGHT AUTONOMY (sDA 300/50%) ACROSS OCCUPIED FLOORPLATES
              </text>
            </svg>
            <div className="absolute top-4 left-4 bg-[#0F172A]/90 px-3 py-1 font-mono text-[10px] text-white hairline-border">
              AUTODESK FORMA · DAYLIGHT POTENTIAL ENGINE
            </div>
          </div>
        );

      case 'analysis-wind':
        return (
          <div className="relative w-full aspect-[16/7] bg-[#F4F3EF] hairline-border overflow-hidden flex items-center justify-center p-6">
            <svg className="w-full h-full" viewBox="0 0 800 350">
              {/* Wind Vector CFD Streamlines */}
              <g stroke="#0284C7" strokeWidth="1.5" opacity="0.6" fill="none">
                <path d="M 50,280 C 200,260 300,230 450,140 C 600,60 750,50 780,45" />
                <path d="M 50,250 C 200,230 300,200 450,110 C 600,40 750,30 780,25" />
                <path d="M 50,310 C 200,290 320,250 480,180 C 620,110 750,90 780,85" />
                <path d="M 50,220 C 180,200 280,170 420,90 C 560,20 720,15 780,15" />
              </g>
              {/* Stepped building blocks channeling wind */}
              <rect x="220" y="110" width="70" height="70" fill="#13263D" opacity="0.8" />
              <rect x="340" y="80" width="80" height="90" fill="#13263D" opacity="0.8" />
              <rect x="470" y="60" width="90" height="110" fill="#13263D" opacity="0.8" />
              {/* Aerodynamic Green Spine */}
              <polygon points="180,310 280,210 550,110 650,210" fill="#55705A" opacity="0.25" stroke="#55705A" strokeWidth="1" strokeDasharray="3 3" />
              <text x="380" y="270" fill="#55705A" fontSize="11" fontFamily="JetBrains Mono" textAnchor="middle" fontWeight="bold">
                LAWSON COMFORT: SITTING & PROMENADE (96% COMPLIANT)
              </text>
            </svg>
            <div className="absolute top-4 left-4 bg-[#F4F3EF]/90 px-3 py-1 font-mono text-[10px] text-[#13263D] hairline-border">
              AUTODESK FORMA · AI WIND & CFD SIMULATION
            </div>
          </div>
        );

      case 'analysis-microclimate':
        return (
          <div className="relative w-full aspect-[16/7] bg-[#FEF3C7] hairline-border overflow-hidden flex items-center justify-center p-6">
            <svg className="w-full h-full" viewBox="0 0 800 350">
              {/* Microclimate radiant thermal contours */}
              <rect x="60" y="40" width="680" height="260" fill="#FDE68A" opacity="0.6" />
              {/* Cool island over green spine */}
              <ellipse cx="400" cy="170" rx="280" ry="85" fill="#A7F3D0" opacity="0.8" />
              <ellipse cx="400" cy="170" rx="160" ry="45" fill="#34D399" opacity="0.7" />
              <text x="400" y="165" fill="#065F46" fontSize="12" fontFamily="JetBrains Mono" textAnchor="middle" fontWeight="bold">
                -4.6°C RADIANT COOLING UNDER TREE CANOPY
              </text>
              <text x="400" y="185" fill="#065F46" fontSize="10" fontFamily="JetBrains Mono" textAnchor="middle">
                UTCI THERMAL COMFORT ENVELOPE (MODERATE STRESS)
              </text>
            </svg>
            <div className="absolute top-4 left-4 bg-[#F4F3EF]/90 px-3 py-1 font-mono text-[10px] text-[#13263D] hairline-border">
              AUTODESK FORMA · OUTDOOR THERMAL COMFORT (UTCI)
            </div>
          </div>
        );

      case 'analysis-noise':
        return (
          <div className="relative w-full aspect-[16/7] bg-[#E9E7E1] hairline-border overflow-hidden flex items-center justify-center p-6">
            <svg className="w-full h-full" viewBox="0 0 800 350">
              {/* Noise sound wave decibel falloff from Highway on Right */}
              <rect x="720" y="30" width="40" height="290" fill="#B91C1C" />
              <text x="740" y="180" fill="#FFFFFF" fontSize="10" fontFamily="JetBrains Mono" transform="rotate(90, 740, 180)" textAnchor="middle">
                HIGHWAY: 76.4 dB(A)
              </text>
              {/* Decibel falloff bands */}
              <rect x="560" y="30" width="160" height="290" fill="#F87171" opacity="0.35" />
              <rect x="420" y="30" width="140" height="290" fill="#FBBF24" opacity="0.3" />
              <rect x="80" y="30" width="340" height="290" fill="#34D399" opacity="0.35" />
              {/* Shielding commercial buildings */}
              <rect x="580" y="80" width="60" height="190" fill="#13263D" />
              <text x="610" y="180" fill="#FFFFFF" fontSize="10" fontFamily="JetBrains Mono" transform="rotate(-90, 610, 180)" textAnchor="middle">
                OFFICE ACOUSTIC BUFFER
              </text>
              <text x="250" y="180" fill="#065F46" fontSize="12" fontFamily="JetBrains Mono" fontWeight="bold">
                RESIDENTIAL CORE: 48.2 dB(A) (PROTECTED)
              </text>
            </svg>
            <div className="absolute top-4 left-4 bg-[#F4F3EF]/90 px-3 py-1 font-mono text-[10px] text-[#13263D] hairline-border">
              AUTODESK FORMA · ACOUSTIC PROPAGATION ANALYSIS
            </div>
          </div>
        );

      case 'analysis-solar':
        return (
          <div className="relative w-full aspect-[16/7] bg-[#1E293B] hairline-border overflow-hidden flex items-center justify-center p-6">
            <svg className="w-full h-full" viewBox="0 0 800 350">
              {/* Solar PV Irradiance Map */}
              <rect x="80" y="50" width="640" height="240" fill="#0F172A" />
              {/* Solar panels grid on stepped roof terraces */}
              <g fill="#EAB308" opacity="0.85">
                <rect x="140" y="90" width="120" height="50" />
                <rect x="140" y="160" width="120" height="50" />
                <rect x="320" y="80" width="140" height="60" />
                <rect x="320" y="160" width="140" height="60" />
                <rect x="510" y="70" width="160" height="70" />
                <rect x="510" y="160" width="160" height="70" />
              </g>
              <text x="400" y="270" fill="#EAB308" fontSize="12" fontFamily="JetBrains Mono" textAnchor="middle" fontWeight="bold">
                TOTAL PV YIELD: 41.8 GWh / YEAR (38.4% DISTRICT OFFSET)
              </text>
            </svg>
            <div className="absolute top-4 left-4 bg-[#1E293B]/90 px-3 py-1 font-mono text-[10px] text-white hairline-border">
              AUTODESK FORMA · SOLAR ENERGY & BIPV YIELD ENGINE
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <section id="analysis" className="py-24 border-t border-[#13263D]/10">
      <div className="max-w-[1720px] mx-auto px-4 lg:px-8">
        <SectionTitle
          number="06"
          title="PERFORMANCE ANALYSIS"
          subtitle="Eight computational dimensions simulated inside Autodesk Forma, validating urban form through empirical physics rather than subjective styling."
          category="AUTODESK FORMA COMPUTATIONAL SIMULATION SUITE"
        />

        {/* 10. INTERACTIVE HEATMAP EXPERIENCE VIEWER */}
        <div className="mb-20 p-6 md:p-8 bg-[#13263D] text-[#F4F3EF] hairline-border relative overflow-hidden">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-4 mb-6 font-mono text-xs">
            <div>
              <span className="text-[#E31B23] font-bold tracking-widest text-[10px] uppercase block mb-1">
                FORMA DIRECT HEATMAP SUITE
              </span>
              <h3 className="text-xl sm:text-2xl font-bold uppercase text-white">
                SIMULATION HEATMAP EXPLORER
              </h3>
            </div>

            {/* Overlays Switcher */}
            <div className="flex flex-wrap items-center gap-1.5">
              {(['sun', 'daylight', 'wind', 'noise', 'microclimate', 'solar'] as const).map((m) => (
                <button
                  key={m}
                  onClick={() => setHeatmapFocus(m)}
                  className={`px-3 py-1.5 text-xs font-mono uppercase tracking-wider transition-colors cursor-pointer ${
                    heatmapFocus === m
                      ? 'bg-[#E31B23] text-white font-bold'
                      : 'bg-white/10 text-white/70 hover:bg-white/20'
                  }`}
                >
                  {m === 'sun' && 'SUN HOURS'}
                  {m === 'daylight' && 'DAYLIGHT'}
                  {m === 'wind' && 'WIND'}
                  {m === 'noise' && 'NOISE'}
                  {m === 'microclimate' && 'MICROCLIMATE'}
                  {m === 'solar' && 'SOLAR PV'}
                </button>
              ))}
            </div>
          </div>

          {/* Large Heatmap Visual with Floating LOW ──── HIGH Legend */}
          <div className="relative aspect-[16/7] bg-[#0F172A] hairline-border overflow-hidden flex items-center justify-center">
            {heatmapFocus === 'sun' && (
              <svg className="w-full h-full" viewBox="0 0 800 350">
                <rect x="0" y="0" width="800" height="350" fill="#1E293B" />
                <circle cx="400" cy="175" r="280" fill="#CA8A04" opacity="0.6" filter="blur(20px)" />
                <circle cx="400" cy="175" r="140" fill="#FACC15" opacity="0.7" filter="blur(15px)" />
                <rect x="220" y="100" width="80" height="90" fill="#0F172A" />
                <rect x="340" y="80" width="90" height="100" fill="#0F172A" />
                <rect x="470" y="110" width="100" height="80" fill="#0F172A" />
                <text x="400" y="270" fill="#FFFFFF" fontSize="12" fontFamily="JetBrains Mono" textAnchor="middle" fontWeight="bold">
                  AUTODESK FORMA · ANNUAL GROUND SUN HOURS: 5.4 HRS / DAY (BRE 88%)
                </text>
              </svg>
            )}

            {heatmapFocus === 'daylight' && (
              <svg className="w-full h-full" viewBox="0 0 800 350">
                <rect x="0" y="0" width="800" height="350" fill="#0F172A" />
                <rect x="120" y="60" width="560" height="230" fill="#38BDF8" opacity="0.5" />
                <rect x="180" y="90" width="440" height="170" fill="#0284C7" opacity="0.7" />
                <rect x="280" y="130" width="240" height="90" fill="#0F172A" stroke="#94A3B8" strokeWidth="1" />
                <text x="400" y="270" fill="#FFFFFF" fontSize="12" fontFamily="JetBrains Mono" textAnchor="middle" fontWeight="bold">
                  SPATIAL DAYLIGHT AUTONOMY: 84% OCCUPIED AREA &gt; 300 LUX
                </text>
              </svg>
            )}

            {heatmapFocus === 'wind' && (
              <svg className="w-full h-full" viewBox="0 0 800 350">
                <rect x="0" y="0" width="800" height="350" fill="#13263D" />
                <g stroke="#38BDF8" strokeWidth="2" opacity="0.7" fill="none">
                  <path d="M 50,300 Q 250,220 450,150 T 750,50" />
                  <path d="M 50,260 Q 250,180 450,110 T 750,20" />
                  <path d="M 50,340 Q 250,260 450,190 T 750,90" />
                </g>
                <text x="400" y="270" fill="#34D399" fontSize="12" fontFamily="JetBrains Mono" textAnchor="middle" fontWeight="bold">
                  CFD PEDESTRIAN COMFORT: 96% LAWSON SITTING &amp; PROMENADE
                </text>
              </svg>
            )}

            {heatmapFocus === 'noise' && (
              <svg className="w-full h-full" viewBox="0 0 800 350">
                <rect x="0" y="0" width="800" height="350" fill="#13263D" />
                <rect x="680" y="0" width="120" height="350" fill="#EF4444" opacity="0.8" />
                <rect x="520" y="0" width="160" height="350" fill="#F59E0B" opacity="0.5" />
                <rect x="0" y="0" width="520" height="350" fill="#10B981" opacity="0.4" />
                <rect x="550" y="80" width="60" height="190" fill="#0F172A" />
                <text x="320" y="180" fill="#FFFFFF" fontSize="12" fontFamily="JetBrains Mono" textAnchor="middle" fontWeight="bold">
                  RESIDENTIAL CORE ACOUSTIC SHIELD: 48.2 dB(A)
                </text>
              </svg>
            )}

            {heatmapFocus === 'microclimate' && (
              <svg className="w-full h-full" viewBox="0 0 800 350">
                <rect x="0" y="0" width="800" height="350" fill="#1E293B" />
                <ellipse cx="400" cy="175" rx="320" ry="110" fill="#F59E0B" opacity="0.3" />
                <ellipse cx="400" cy="175" rx="200" ry="65" fill="#10B981" opacity="0.75" />
                <text x="400" y="180" fill="#FFFFFF" fontSize="12" fontFamily="JetBrains Mono" textAnchor="middle" fontWeight="bold">
                  MICROCLIMATE: -4.6°C RADIANT TEMPERATURE REDUCTION UNDER CANOPY
                </text>
              </svg>
            )}

            {heatmapFocus === 'solar' && (
              <svg className="w-full h-full" viewBox="0 0 800 350">
                <rect x="0" y="0" width="800" height="350" fill="#0F172A" />
                <g fill="#EAB308" opacity="0.8">
                  <rect x="180" y="80" width="120" height="60" />
                  <rect x="340" y="70" width="140" height="70" />
                  <rect x="520" y="60" width="140" height="80" />
                </g>
                <text x="400" y="270" fill="#EAB308" fontSize="12" fontFamily="JetBrains Mono" textAnchor="middle" fontWeight="bold">
                  SOLAR PHOTOVOLTAIC YIELD: 41.8 GWh / YEAR (38.4% DISTRICT OFFSET)
                </text>
              </svg>
            )}

            {/* Floating Legend Required: LOW ───────── HIGH */}
            <div className="absolute top-4 right-4 bg-[#13263D]/95 text-white p-3 font-mono text-[9px] hairline-border shadow-xl">
              <div className="text-[8px] uppercase tracking-widest text-[#E31B23] mb-1 font-bold">
                ANALYTICAL FLUX GRADIENT
              </div>
              <div className="w-48 h-2 rounded-xs bg-gradient-to-r from-[#1E293B] via-[#0284C7] via-[#CA8A04] to-[#FACC15] mb-1.5" />
              <div className="flex justify-between text-[8px] text-white/70">
                <span>LOW</span>
                <span>─────────</span>
                <span>HIGH</span>
              </div>
            </div>
          </div>
        </div>

        {/* Vertical Editorial Sequence (NO 8 generic cards, structured architecture boards) */}
        <div className="space-y-24">
          {projectData.analysisData.map((item) => {
            const isPending = showPendingDataMode || item.status === 'pending';

            return (
              <div
                key={item.id}
                className="border-b border-[#13263D]/15 pb-20 last:border-b-0"
              >
                {/* Section Header */}
                <div className="flex flex-col md:flex-row md:items-baseline justify-between gap-4 mb-6">
                  <div>
                    <div className="text-xs font-mono uppercase tracking-[0.25em] text-[#69717A] mb-1">
                      FORMA SIMULATION MODULE {item.index}
                    </div>
                    <h3 className="text-3xl font-extrabold uppercase text-[#13263D] tracking-tight">
                      {item.title}
                    </h3>
                    <p className="text-sm text-[#69717A] mt-1 font-mono">
                      {item.subtitle}
                    </p>
                  </div>

                  <div className="text-right">
                    <span className="text-[10px] font-mono tracking-widest text-[#E31B23] uppercase block">
                      ENGINE
                    </span>
                    <span className="text-xs font-mono font-bold text-[#13263D]">
                      {item.formaToolName}
                    </span>
                  </div>
                </div>

                {/* Main Visual or Empty State Badge */}
                {isPending ? (
                  <EmptyDataBadge
                    type="forma"
                    customTitle={`FORMA DATA PENDING · ${item.title}`}
                    customMessage={`Autodesk Forma simulation run for ${item.title} is awaiting live telemetry ingestion from the project team.`}
                    className="mb-8"
                  />
                ) : (
                  <div className="mb-8">{renderAnalysisVisual(item)}</div>
                )}

                {/* Sub-Visual Bar: Legend & Technical Metrics */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-8 font-mono">
                  {/* Legend: 4 cols */}
                  <div className="lg:col-span-4 p-4 bg-[#E9E7E1]/50 hairline-border">
                    <div className="text-[9px] uppercase tracking-widest text-[#69717A] mb-2 font-bold">
                      ANALYTICAL SCALE & LEGEND
                    </div>
                    <div className="space-y-1.5 text-xs text-[#13263D]">
                      {item.legendItems.map((leg, lIdx) => (
                        <div key={lIdx} className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className="w-2.5 h-2.5 shrink-0" style={{ backgroundColor: leg.color }} />
                            <span className="text-[11px]">{leg.label}</span>
                          </div>
                          <span className="text-[10px] text-[#69717A]">{leg.range}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Key Metrics: 8 cols */}
                  <div className="lg:col-span-8 grid grid-cols-2 sm:grid-cols-4 gap-4">
                    {item.keyMetrics.map((met, mIdx) => (
                      <div key={mIdx} className="border-l-2 border-[#13263D] pl-3 py-1">
                        <div className="text-[9px] text-[#69717A] uppercase tracking-wider">
                          {met.label}
                        </div>
                        <div className="text-lg font-bold text-[#13263D] tabular-nums mt-0.5">
                          {met.value}
                        </div>
                        {met.unit && (
                          <div className="text-[10px] text-[#69717A]">
                            {met.unit}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Editorial Interpretation & Proposal Variance Note */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-8 text-xs font-mono pt-4 border-t border-[#13263D]/10">
                  <div className="md:col-span-7">
                    <div className="text-[10px] uppercase tracking-widest text-[#69717A] mb-1 font-bold">
                      INTERPRETATION & DESIGN RESPONSE
                    </div>
                    <p className="text-sm font-sans text-[#13263D] leading-relaxed">
                      {item.interpretation}
                    </p>
                  </div>

                  <div className="md:col-span-5 p-4 bg-[#F4F3EF] hairline-border space-y-2">
                    <div className="text-[10px] uppercase tracking-widest text-[#E31B23] font-bold">
                      PROPOSAL COMPARISON DELTA
                    </div>
                    <div className="text-[11px] text-[#69717A]">
                      <strong>Prop A:</strong> {item.proposalAValue}
                    </div>
                    <div className="text-[11px] text-[#13263D]">
                      <strong>Prop B:</strong> {item.proposalBValue}
                    </div>
                    <div className="text-[10px] text-[#55705A] pt-1 border-t border-[#13263D]/10 font-bold">
                      Impact: {item.varianceNote}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
