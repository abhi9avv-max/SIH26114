/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { ProjectData } from '../../types/project';

interface ProjectGlanceModalProps {
  projectData: ProjectData;
  isOpen: boolean;
  onClose: () => void;
  onOpenJuryMode: () => void;
}

export const ProjectGlanceModal: React.FC<ProjectGlanceModalProps> = ({
  projectData,
  isOpen,
  onClose,
  onOpenJuryMode,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-[#13263D]/80 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-[#F4F3EF] max-w-2xl w-full hairline-border p-8 text-[#13263D] font-mono shadow-2xl animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#13263D]/10 pb-4 mb-6">
          <div>
            <div className="text-[10px] text-[#E31B23] uppercase tracking-widest font-bold">
              SIH 2026 / JURY BRIEF
            </div>
            <h3 className="text-2xl font-black uppercase text-[#13263D]">
              PROJECT AT A GLANCE
            </h3>
          </div>
          <button
            onClick={onClose}
            className="text-xs p-1 hover:text-[#E31B23] cursor-pointer font-bold"
          >
            [CLOSE ×]
          </button>
        </div>

        {/* 7 Core Dimension Table */}
        <div className="space-y-4 text-xs divide-y divide-[#13263D]/10">
          <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-1">
            <span className="text-[#69717A] uppercase text-[10px] tracking-wider">PROJECT</span>
            <span className="font-bold text-[#13263D]">{projectData.projectName} ({projectData.revision || 'REV. 02'})</span>
          </div>

          <div className="pt-3 flex flex-col sm:flex-row sm:items-start justify-between gap-2">
            <span className="text-[#69717A] uppercase text-[10px] tracking-wider shrink-0">PROBLEM STATEMENT</span>
            <span className="font-sans text-xs text-[#13263D] sm:text-right max-w-md">
              &ldquo;Smart City Site Planning using Autodesk Forma Site Design&rdquo; (SIH 2026, Theme: Miscellaneous)
            </span>
          </div>

          <div className="pt-3 flex flex-col sm:flex-row sm:items-center justify-between gap-1">
            <span className="text-[#69717A] uppercase text-[10px] tracking-wider">SITE AREA & LOCATION</span>
            <span className="font-bold text-[#13263D]">
              {projectData.siteAreaSqKm} km² (124 Hectares) · {projectData.location.siteName}, {projectData.location.city}
            </span>
          </div>

          <div className="pt-3 flex flex-col sm:flex-row sm:items-center justify-between gap-1">
            <span className="text-[#69717A] uppercase text-[10px] tracking-wider">PROPOSALS COMPILED</span>
            <span className="font-bold text-[#13263D]">
              02 (Proposal A: Compact Core vs. Proposal B: Green Connected)
            </span>
          </div>

          <div className="pt-3 flex flex-col sm:flex-row sm:items-center justify-between gap-1">
            <span className="text-[#69717A] uppercase text-[10px] tracking-wider">ANALYSES EVALUATED</span>
            <span className="font-bold text-[#13263D]">
              08 (Area, Carbon, Sun Hours, Daylight, Wind CFD, Microclimate, Noise, Solar PV)
            </span>
          </div>

          <div className="pt-3 flex flex-col sm:flex-row sm:items-center justify-between gap-1">
            <span className="text-[#69717A] uppercase text-[10px] tracking-wider">BIM PILOT BUILDING</span>
            <span className="font-bold text-[#13263D]">
              Building 014 (18 Storeys, 46,200 m², LOD 350 Mass Timber Glulam Diagrid)
            </span>
          </div>

          <div className="pt-3 flex flex-col sm:flex-row sm:items-center justify-between gap-1">
            <span className="text-[#69717A] uppercase text-[10px] tracking-wider">SOFTWARE STACK</span>
            <span className="font-bold text-[#E31B23]">
              Autodesk Forma Site Design + Autodesk Revit 2026
            </span>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="mt-8 pt-4 border-t border-[#13263D]/10 flex items-center justify-between">
          <span className="text-[10px] text-[#69717A]">
            AUTODESK EDUCATION EXPERIENCE · SIH 2026
          </span>
          <div className="flex gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 border border-[#13263D]/20 hover:border-[#13263D] text-xs uppercase cursor-pointer"
            >
              CLOSE
            </button>
            <button
              onClick={() => {
                onClose();
                onOpenJuryMode();
              }}
              className="px-5 py-2 bg-[#E31B23] hover:bg-[#13263D] text-white font-bold text-xs uppercase cursor-pointer flex items-center gap-1.5"
            >
              <span>OPEN JURY SLIDES</span>
              <span>→</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
