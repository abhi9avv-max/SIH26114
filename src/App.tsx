/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { initialProjectData } from './data/projectData';
import { ProjectData } from './types/project';
import { ArchitectureHeader } from './components/common/ArchitectureHeader';
import { ArchitectureFooter } from './components/common/ArchitectureFooter';
import { HeroSection } from './components/sections/HeroSection';
import { ProjectOverviewSection } from './components/sections/ProjectOverviewSection';
import { DesignDnaSection } from './components/sections/DesignDnaSection';
import { SiteContextSection } from './components/sections/SiteContextSection';
import { MasterPlanSection } from './components/sections/MasterPlanSection';
import { UrbanDesignSection } from './components/sections/UrbanDesignSection';
import { ProposalsSection } from './components/sections/ProposalsSection';
import { ProposalComparisonSection } from './components/sections/ProposalComparisonSection';
import { PerformanceAnalysisSection } from './components/sections/PerformanceAnalysisSection';
import { DataToDecisionSection } from './components/sections/DataToDecisionSection';
import { SustainabilitySection } from './components/sections/SustainabilitySection';
import { HumanImpactSection } from './components/sections/HumanImpactSection';
import { BimRevitSection } from './components/sections/BimRevitSection';
import { FinalProposalSection } from './components/sections/FinalProposalSection';
import { ProjectTimelineSection } from './components/sections/ProjectTimelineSection';
import { MediaSection } from './components/sections/MediaSection';
import { JuryMode } from './components/jury/JuryMode';
import { DataConfigModal } from './components/common/DataConfigModal';
import { ProjectGlanceModal } from './components/common/ProjectGlanceModal';

export default function App() {
  const [projectData, setProjectData] = useState<ProjectData>(initialProjectData);
  const [isJuryModeOpen, setIsJuryModeOpen] = useState(false);
  const [isConfigOpen, setIsConfigOpen] = useState(false);
  const [isGlanceOpen, setIsGlanceOpen] = useState(false);
  const [isPendingDataMode, setIsPendingDataMode] = useState(false);
  const [activeSection, setActiveSection] = useState('overview');
  const [scrollProgress, setScrollProgress] = useState(0);

  // Story narrative chapters mapping for scroll storytelling
  const storyChapters = [
    { id: 'overview', index: '01', title: 'SITE & BRIEF', label: 'Overview' },
    { id: 'dna', index: '02A', title: 'DESIGN DNA', label: 'Tenets' },
    { id: 'site', index: '02', title: 'CONTEXT & GIS', label: 'Site Analysis' },
    { id: 'masterplan', index: '03', title: 'MASTER PLAN', label: 'Masterplan' },
    { id: 'urbandesign', index: '04', title: 'URBAN DESIGN', label: 'Zoning' },
    { id: 'proposals', index: '05', title: 'PROPOSALS', label: 'Hypotheses' },
    { id: 'comparison', index: '06', title: 'COMPARISON', label: 'Matrix' },
    { id: 'analysis', index: '07', title: 'FORMA ANALYSIS', label: 'Simulation' },
    { id: 'decisions', index: '08', title: 'DATA → DECISION', label: 'Causality' },
    { id: 'sustainability', index: '09', title: 'SUSTAINABILITY', label: 'Carbon & PV' },
    { id: 'humanimpact', index: '10', title: 'HUMAN IMPACT', label: 'Livability' },
    { id: 'bim', index: '11', title: 'REVIT BIM', label: 'Interoperability' },
    { id: 'final', index: '12', title: 'FINAL DECISION', label: 'Direction' },
    { id: 'timeline', index: '13', title: 'TIMELINE', label: 'Phasing' },
    { id: 'media', index: '14', title: 'WALKTHROUGH', label: 'Record' },
  ];

  // Scroll listener for reading progress bar
  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        setScrollProgress((window.scrollY / totalHeight) * 100);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // IntersectionObserver for scroll-based section storytelling
  useEffect(() => {
    const sectionIds = storyChapters.map((ch) => ch.id);
    const observerCallback: IntersectionObserverCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && entry.intersectionRatio >= 0.25) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, {
      rootMargin: '-10% 0px -40% 0px',
      threshold: [0.25, 0.5],
    });

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleUpdateSelectedProposal = (proposalId: 'proposal-a' | 'proposal-b') => {
    setProjectData((prev) => ({
      ...prev,
      proposals: {
        ...prev.proposals,
        selectedProposalId: proposalId,
      },
      finalProposal: {
        ...prev.finalProposal,
        selectedProposal:
          proposalId === 'proposal-b'
            ? prev.proposals.proposalB
            : prev.proposals.proposalA,
      },
    }));
  };

  return (
    <div className="min-h-screen bg-[#F4F3EF] text-[#13263D] flex flex-col font-sans relative">
      {/* Top Hairline Storyline Reading Progress Indicator */}
      <div
        className="fixed top-0 left-0 h-[2px] bg-[#E31B23] z-50 transition-[width] duration-150 ease-out pointer-events-none"
        style={{ width: `${scrollProgress}%` }}
        aria-hidden="true"
      />

      {/* Global Minimal Architectural Navigation */}
      <ArchitectureHeader
        onOpenJuryMode={() => setIsJuryModeOpen(true)}
        activeSection={activeSection}
        onNavigateSection={scrollToSection}
      />

      {/* Subtle Floating Architectural Storytelling Rail (Desktop only) */}
      <aside
        className="hidden 2xl:flex fixed right-4 top-1/2 -translate-y-1/2 z-30 flex-col items-end gap-1.5 font-mono text-[9px] pointer-events-auto"
        aria-label="Storyline Progress"
      >
        <div className="text-[8px] uppercase tracking-widest text-[#69717A] mb-1 font-bold">
          STORY PIPELINE
        </div>
        {storyChapters.map((chapter) => {
          const isActive = activeSection === chapter.id;
          return (
            <button
              key={chapter.id}
              onClick={() => scrollToSection(chapter.id)}
              className={`group flex items-center gap-2 py-0.5 px-1.5 transition-colors cursor-pointer text-right ${
                isActive ? 'text-[#E31B23] font-bold' : 'text-[#69717A]/70 hover:text-[#13263D]'
              }`}
              title={chapter.title}
            >
              <span className={`opacity-0 group-hover:opacity-100 transition-opacity bg-[#F4F3EF] px-1 hairline-border text-[8px] ${
                isActive ? 'opacity-100' : ''
              }`}>
                {chapter.title}
              </span>
              <span className={`w-1.5 h-1.5 rounded-full transition-transform ${
                isActive ? 'bg-[#E31B23] scale-125' : 'bg-[#13263D]/30 group-hover:bg-[#13263D]'
              }`} />
            </button>
          );
        })}
      </aside>

      {/* Main Architectural Presentation Content */}
      <main className="flex-1">
        {/* 01 Hero Section with Depth, Motion & Live Status Strip */}
        <HeroSection
          projectData={projectData}
          onExplore={() => scrollToSection('overview')}
          onOpenJuryMode={() => setIsJuryModeOpen(true)}
          onOpenGlance={() => setIsGlanceOpen(true)}
        />

        {/* 02 Project Overview */}
        <ProjectOverviewSection projectData={projectData} />

        {/* 03 The Design DNA (6 Principles) */}
        <DesignDnaSection projectData={projectData} />

        {/* 04 Site Context & GIS */}
        <SiteContextSection projectData={projectData} />

        {/* 05 Master Plan (Plan/Performance toggle + Hotspots) */}
        <MasterPlanSection projectData={projectData} />

        {/* 06 Urban Design */}
        <UrbanDesignSection projectData={projectData} />

        {/* 07 Proposals (Split comparison, Why This Design?, The Decision Moment) */}
        <ProposalsSection
          projectData={projectData}
          onNavigateToComparison={() => scrollToSection('comparison')}
        />

        {/* 08 Proposal Comparison Board */}
        <ProposalComparisonSection
          projectData={projectData}
          onUpdateSelectedProposal={handleUpdateSelectedProposal}
        />

        {/* 09 Performance Analysis (Heatmap Experience) */}
        <PerformanceAnalysisSection
          projectData={projectData}
          showPendingDataMode={isPendingDataMode}
        />

        {/* 10 Data → Decision Pipeline */}
        <DataToDecisionSection projectData={projectData} />

        {/* 11 Sustainability */}
        <SustainabilitySection projectData={projectData} />

        {/* 12 Human Impact */}
        <HumanImpactSection projectData={projectData} />

        {/* 13 BIM / Revit Integration (Animated Workflow + View Building) */}
        <BimRevitSection projectData={projectData} />

        {/* 14 Final Proposal Direction */}
        <FinalProposalSection
          projectData={projectData}
          onOpenJuryMode={() => setIsJuryModeOpen(true)}
        />

        {/* 15 Project Development Timeline */}
        <ProjectTimelineSection projectData={projectData} />

        {/* 16 Architectural Media & Walkthrough */}
        <MediaSection projectData={projectData} />
      </main>

      {/* Footer with Revision Label */}
      <ArchitectureFooter />

      {/* Sticky Bottom Presentation Utility Ribbon */}
      <div className="fixed bottom-4 right-4 z-30 flex items-center gap-2 bg-[#F4F3EF]/95 backdrop-blur-md p-1.5 hairline-border shadow-xl font-mono text-xs">
        <button
          onClick={() => setIsGlanceOpen(true)}
          className="px-2.5 py-1 text-[#13263D] hover:text-[#E31B23] transition-colors cursor-pointer text-[10px] tracking-wider uppercase font-bold"
          title="Project at a Glance"
        >
          [ⓘ] PROJECT INFO
        </button>
        <span className="text-[#69717A]/30">|</span>
        <button
          onClick={() => setIsConfigOpen(true)}
          className="px-2.5 py-1 text-[#69717A] hover:text-[#13263D] transition-colors cursor-pointer text-[10px] tracking-wider uppercase"
          title="Configure Student Team Project Data"
        >
          ⚙ DATA ARCHITECTURE {isPendingDataMode && <span className="text-[#D97706]">(PENDING)</span>}
        </button>
        <span className="text-[#69717A]/30">|</span>
        <button
          onClick={() => setIsJuryModeOpen(true)}
          className="group px-3 py-1 bg-[#13263D] hover:bg-[#E31B23] text-white text-[11px] font-bold tracking-wider uppercase transition-colors cursor-pointer flex items-center gap-1.5"
        >
          <span>JURY PRESENTATION</span>
          <span className="transition-transform group-hover:translate-x-1" aria-hidden="true">→</span>
        </button>
      </div>

      {/* Fullscreen Jury Mode Presentation */}
      <JuryMode
        projectData={projectData}
        isOpen={isJuryModeOpen}
        onClose={() => setIsJuryModeOpen(false)}
      />

      {/* Project At A Glance Overlay */}
      <ProjectGlanceModal
        projectData={projectData}
        isOpen={isGlanceOpen}
        onClose={() => setIsGlanceOpen(false)}
        onOpenJuryMode={() => {
          setIsGlanceOpen(false);
          setIsJuryModeOpen(true);
        }}
      />

      {/* Project Data Architecture Configuration Drawer */}
      <DataConfigModal
        projectData={projectData}
        isOpen={isConfigOpen}
        onClose={() => setIsConfigOpen(false)}
        onUpdateProjectData={(newData) => setProjectData(newData)}
        isPendingMode={isPendingDataMode}
        onTogglePendingMode={(pending) => setIsPendingDataMode(pending)}
      />
    </div>
  );
}
