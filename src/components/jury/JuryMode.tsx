/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { ProjectData } from '../../types/project';

interface JuryModeProps {
  projectData: ProjectData;
  isOpen: boolean;
  onClose: () => void;
}

export const JuryMode: React.FC<JuryModeProps> = ({
  projectData,
  isOpen,
  onClose,
}) => {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

  const slides = [
    {
      index: "01",
      title: "THE CHALLENGE",
      category: "PROBLEM STATEMENT & VISION",
      subtitle: "Smart City Site Planning using Autodesk Forma Site Design and Autodesk Revit",
      headline: "Replacing uncalibrated intuition with computational performance simulation.",
      body: "Rapid urbanization frequently yields microclimatic heat stress, high upfront embodied carbon, and disconnected pedestrian realms. In this SIH 2026 project, our goal is to model an entire 1.24 km² mixed-use waterfront district where all spatial decisions are validated through real-time environmental physics.",
      metrics: [
        { label: "SITE AREA", val: "1.24 km² (124 ha)" },
        { label: "PLANNED RESIDENTS", val: "42,500" },
        { label: "TARGET GFA", val: "> 1,000,000 m²" },
        { label: "GOAL", val: "Net-Zero Ready & Microclimate Optimized" },
      ],
      image: projectData.media[0]?.imageSrc,
      quote: "Architecture first. Data second. UI third.",
    },
    {
      index: "02",
      title: "SITE CONTEXT",
      category: "GIS & ENVIRONMENTAL FORCES",
      subtitle: "Navi Mumbai Waterfront Corridor",
      headline: "Listening to the prevailing winds, tidal ecology, and transit borders.",
      body: "Bordered by an 8-lane expressway to the east (76 dB(A) acoustic noise) and a tidal estuary to the west (100m Coastal Regulation Zone buffer). The natural 14.4m topographic gradient and South-West monsoon breeze (3.8 m/s) set the primary environmental vector.",
      metrics: [
        { label: "ACOUSTIC BOUNDARY", val: "76.4 dB(A)" },
        { label: "COASTAL BUFFER", val: "100m CRZ Setback" },
        { label: "WIND VECTOR", val: "225° SW Monsoon (3.8 m/s)" },
        { label: "SOLAR FLUX", val: "5.2 kWh/m²/day" },
      ],
      image: projectData.media[1]?.imageSrc,
      quote: "Site constraints become the primary generative drivers of urban form.",
    },
    {
      index: "03",
      title: "DESIGN STRATEGY",
      category: "AUTODESK FORMA METHODOLOGY",
      subtitle: "Iterative Parametric Generative Design",
      headline: "Form follows environmental performance.",
      body: "Using Autodesk Forma, we generated massing variants testing mass timber envelopes against conventional reinforced concrete towers. We prioritized daylight penetration, ground-level sitting comfort, and continuous storm-water absorption over mere maximum floor area.",
      metrics: [
        { label: "SIMULATION DIMENSIONS", val: "8 Environmental Engines" },
        { label: "METHODOLOGY", val: "Forma AI CFD + Sun + Embodied Carbon" },
        { label: "OPEN ECOLOGY", val: "34.7 Hectares Continuous Spine" },
        { label: "TRANSIT ACCESS", val: "100% 5-Minute Walkshed" },
      ],
      image: projectData.media[0]?.imageSrc,
      quote: "Generative massing solves microclimate before breaking ground.",
    },
    {
      index: "04",
      title: "PROPOSAL A",
      category: "MAXIMUM DENSITY HYPOTHESIS",
      subtitle: "Proposal A · Compact Urban Core",
      headline: "High revenue potential and tight infrastructure footprint.",
      body: "Concentrating 1,420,000 m² of GFA into 32-story perimeter towers around two primary vehicular boulevards. While maximizing commercial yield, Forma simulations revealed severe winter shadow canyons, high embodied carbon (468 kg CO₂e/m²), and uncomfortable wind gusts (>9 m/s).",
      metrics: [
        { label: "TOTAL GFA", val: "1,420,000 m² (FAR 3.85)" },
        { label: "GREEN RATIO", val: "18.2% (Peripheral only)" },
        { label: "DAYLIGHT AUTONOMY", val: "64% > 300 lux" },
        { label: "CARBON RATING", val: "468 kg CO₂e/m² (Exceeds target)" },
      ],
      image: projectData.media[0]?.imageSrc,
      quote: "Proposal A maximizes commercial lease area at the cost of public environmental comfort.",
    },
    {
      index: "05",
      title: "PROPOSAL B",
      category: "BALANCED BIOPHILIC HYPOTHESIS",
      subtitle: "Proposal B · Green Connected District",
      headline: "Stepped terrace massing oriented with coastal breezes.",
      body: "Limiting heights to 18 storeys allows a structural transition to mass timber framing. A central 80m wide biophilic corridor channels cool maritime air 1.2 km inland, lowering ambient radiant temperatures by 2.4°C to 4.6°C.",
      metrics: [
        { label: "TOTAL GFA", val: "1,180,000 m² (FAR 2.68)" },
        { label: "GREEN SPACING", val: "34.5% (34.7 ha Continuous Spine)" },
        { label: "DAYLIGHT AUTONOMY", val: "84% > 300 lux (+31.2%)" },
        { label: "CARBON RATING", val: "348 kg CO₂e/m² (RIBA 2030 Compliant)" },
      ],
      image: projectData.media[0]?.imageSrc,
      quote: "Mass timber mid-rise design achieves climate resilience without sacrificing essential density.",
    },
    {
      index: "06",
      title: "PERFORMANCE ANALYSIS",
      category: "FORMA SIMULATION EVIDENCE",
      subtitle: "Eight Empirical Environmental Studies",
      headline: "Computational physics validates superior comfort.",
      body: "Autodesk Forma engines proved that Proposal B delivers: 5.4 sun hours/day (+42%), 84% daylight autonomy, 96% Lawson sitting/strolling wind comfort, -28.2 dB(A) highway acoustic buffering, and 41.8 GWh/year of rooftop photovoltaic yield.",
      metrics: [
        { label: "SUNLIGHT GAIN", val: "+42.1% Ground Exposure" },
        { label: "SOLAR PV YIELD", val: "41.8 GWh / year" },
        { label: "WIND COMFORT", val: "96% Lawson Sitting/Strolling" },
        { label: "HEAT REDUCTION", val: "-4.6°C Mean Radiant Temp" },
      ],
      image: projectData.media[1]?.imageSrc,
      quote: "Every claim is backed by reproducible Autodesk Forma telemetry.",
    },
    {
      index: "07",
      title: "COMPARISON",
      category: "MULTI-CRITERIA DECISION MATRIX",
      subtitle: "Proposal A vs Proposal B",
      headline: "The marginal GFA of Proposal A does not justify its carbon & climate penalty.",
      body: "While Proposal A yields +20.3% more floor area, Proposal B provides +89.5% more open green space, saves 141,000 metric tons of upfront carbon, improves daylight autonomy by 31%, and guarantees 100% of residents 5-minute park access.",
      metrics: [
        { label: "CARBON OFFSET", val: "141,000 t CO₂e Saved" },
        { label: "ACOUSTIC GAIN", val: "-14.2 dB(A) in Residential" },
        { label: "OPEN SPACE / PERSON", val: "8.16 m² vs 3.3 m²" },
        { label: "WINNER", val: "Proposal B Selected" },
      ],
      image: projectData.media[0]?.imageSrc,
      quote: "Proposal B satisfies both investor density targets and strict municipal decarbonization rules.",
    },
    {
      index: "08",
      title: "FINAL DESIGN",
      category: "MASTERPLAN SYNTHESIS",
      subtitle: "The Masterplan Selected for SIH 2026",
      headline: "The Green Connected District: A resilient 15-minute city.",
      body: "Comprising 1,180,000 m² of mixed-use development, 42,500 residents, a zero-grade vehicular crossing greenway, and an integrated rapid transit hub. Stormwater is 100% retained on site via bioswales.",
      metrics: [
        { label: "TOTAL AREA", val: "124 Hectares" },
        { label: "DEVELOPABLE FOOTPRINT", val: "318,400 m²" },
        { label: "RENEWABLE OFFSET", val: "38.4% District Net Electric" },
        { label: "WALKABILITY", val: "94% 5-Minute Reach" },
      ],
      image: projectData.media[0]?.imageSrc,
      quote: "A human-centric smart district designed for the next century of climate realities.",
    },
    {
      index: "09",
      title: "REVIT DEVELOPMENT",
      category: "BIM INTEROPERABILITY",
      subtitle: "Building 014 · Flagship Climate Tech Office",
      headline: "From conceptual site massing directly into LOD 350 Revit BIM.",
      body: "Exported directly from Autodesk Forma into Autodesk Revit 2026 using the native Forma Add-In. Developed with an 18-storey mass timber glulam diagrid, double-skin facade with parametric 28° BIPV louvers, and synchronized back into Forma to confirm solar shading.",
      metrics: [
        { label: "BUILDING GFA", val: "46,200 m² (18 Storeys)" },
        { label: "STRUCTURAL SYSTEM", val: "Glulam Diagrid + GGBS Low-Carbon Core" },
        { label: "ENVELOPE U-VALUE", val: "0.92 W/m²K (Triple Glazed)" },
        { label: "ROOF BIPV", val: "1.2 GWh / year On-Site" },
      ],
      image: projectData.media[2]?.imageSrc,
      quote: "True end-to-end digital continuity: Forma urban massing seamlessly detailed in Revit.",
    },
    {
      index: "10",
      title: "FINAL OUTCOME",
      category: "SIH 2026 CONCLUSION",
      subtitle: "Autodesk Education Experience Presentation",
      headline: "Computational site planning as the standard for smart cities.",
      body: "By uniting Autodesk Forma's rapid environmental simulation with Autodesk Revit's detailed structural BIM, our team demonstrated that smart cities must be designed from the climate inward. The result is a fully realized, decarbonized, and human-scale urban masterplan ready for municipal deployment.",
      metrics: [
        { label: "PROJECT STATUS", val: "SIH 2026 Ready" },
        { label: "SOFTWARE STACK", val: "Autodesk Forma + Revit 2026" },
        { label: "LEED/IGBC RATING", val: "Platinum Candidate Masterplan" },
        { label: "SUBMISSION", val: "Autodesk Education Experience Track" },
      ],
      image: projectData.media[3]?.imageSrc,
      quote: "Designing the next urban system with Autodesk Forma.",
    },
  ];

  const currentSlide = slides[currentSlideIndex];

  // Keyboard navigation: Arrow Right = next, Arrow Left = prev, Esc = exit
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === 'Space') {
        e.preventDefault();
        setCurrentSlideIndex((prev) => (prev < slides.length - 1 ? prev + 1 : prev));
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        setCurrentSlideIndex((prev) => (prev > 0 ? prev - 1 : prev));
      } else if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, slides.length, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-[#13263D] text-[#F4F3EF] flex flex-col justify-between overflow-hidden select-none">
      {/* Top Presentation Bar */}
      <div className="px-8 py-5 border-b border-white/10 flex items-center justify-between font-mono text-xs">
        <div className="flex items-center gap-4">
          <span className="text-[#E31B23] font-bold tracking-widest text-[11px] uppercase">
            JURY PRESENTATION MODE
          </span>
          <span className="text-white/30">|</span>
          <span className="text-white font-bold bg-white/10 px-2.5 py-0.5 tracking-wider">
            PROGRESS: {currentSlide.index} / 10
          </span>
          <span className="text-white/30 hidden md:inline">|</span>
          <span className="text-white/60 hidden md:inline">
            {currentSlide.category}
          </span>
        </div>

        <div className="flex items-center gap-6">
          <div className="text-[10px] text-white/50 tracking-wider hidden sm:block">
            PRESS <kbd className="px-1.5 py-0.5 bg-white/15 text-white font-bold">→</kbd> TO CONTINUE · <kbd className="px-1.5 py-0.5 bg-white/15 text-white font-bold">ESC</kbd> TO EXIT
          </div>
          <button
            onClick={onClose}
            className="px-3 py-1 bg-white/10 hover:bg-[#E31B23] text-white text-xs font-mono uppercase tracking-wider transition-colors cursor-pointer"
          >
            EXIT [ESC]
          </button>
        </div>
      </div>

      {/* Main Slide Presentation Body */}
      <div className="flex-1 max-w-[1720px] w-full mx-auto px-8 py-8 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center overflow-y-auto">
        {/* Left Editorial Text Column: 6 cols */}
        <div className="lg:col-span-6 space-y-6">
          <div>
            <div className="text-xs font-mono text-[#E31B23] uppercase tracking-[0.25em] mb-2 font-bold">
              {currentSlide.index} · {currentSlide.title}
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase text-white tracking-tight leading-[1.05]">
              {currentSlide.headline}
            </h2>
            <p className="mt-3 text-sm font-mono text-white/60">
              {currentSlide.subtitle}
            </p>
          </div>

          <p className="text-base sm:text-lg text-white/80 font-sans leading-relaxed">
            {currentSlide.body}
          </p>

          {/* Metrics Row */}
          <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/10 font-mono">
            {currentSlide.metrics.map((m, idx) => (
              <div key={idx} className="border-l-2 border-[#E31B23] pl-3 py-1">
                <div className="text-[9px] text-white/40 uppercase tracking-wider">
                  {m.label}
                </div>
                <div className="text-base font-bold text-white tabular-nums mt-0.5">
                  {m.val}
                </div>
              </div>
            ))}
          </div>

          {/* Architectural Axiom / Quote */}
          <div className="pt-2 text-xs font-mono italic text-white/50">
            &ldquo;{currentSlide.quote}&rdquo;
          </div>
        </div>

        {/* Right High-Impact Visual: 6 cols */}
        <div className="lg:col-span-6 relative aspect-[16/10] bg-black/40 hairline-border overflow-hidden group">
          <img
            src={currentSlide.image}
            alt={currentSlide.title}
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute top-4 left-4 bg-black/70 backdrop-blur-xs px-3 py-1 font-mono text-[10px] text-white hairline-border">
            AUTODESK FORMA ARCHITECTURAL EXHIBIT · SLIDE {currentSlide.index}
          </div>
        </div>
      </div>

      {/* Bottom Progress Indicator & Controls */}
      <div className="px-8 py-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs">
        {/* Slide Progress Steps */}
        <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto">
          {slides.map((s, idx) => {
            const isCurrent = currentSlideIndex === idx;
            const isPassed = currentSlideIndex > idx;
            return (
              <button
                key={s.index}
                onClick={() => setCurrentSlideIndex(idx)}
                className={`h-2 transition-all cursor-pointer ${
                  isCurrent
                    ? 'w-10 bg-[#E31B23]'
                    : isPassed
                    ? 'w-4 bg-white/60'
                    : 'w-4 bg-white/20 hover:bg-white/40'
                }`}
                title={`Jump to Slide ${s.index}: ${s.title}`}
              />
            );
          })}
        </div>

        {/* Navigation Buttons */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setCurrentSlideIndex((prev) => Math.max(0, prev - 1))}
            disabled={currentSlideIndex === 0}
            className="px-4 py-2 border border-white/20 hover:border-white text-white disabled:opacity-20 font-mono text-xs uppercase tracking-wider transition-colors cursor-pointer"
          >
            ← PREVIOUS
          </button>
          <button
            onClick={() =>
              setCurrentSlideIndex((prev) => Math.min(slides.length - 1, prev + 1))
            }
            disabled={currentSlideIndex === slides.length - 1}
            className="px-5 py-2 bg-[#E31B23] hover:bg-white hover:text-[#13263D] text-white disabled:opacity-20 font-mono text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer"
          >
            NEXT →
          </button>
        </div>
      </div>
    </div>
  );
};
