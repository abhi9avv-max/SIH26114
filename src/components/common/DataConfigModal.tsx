/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { ProjectData } from '../../types/project';

interface DataConfigModalProps {
  projectData: ProjectData;
  isOpen: boolean;
  onClose: () => void;
  onUpdateProjectData: (newData: ProjectData) => void;
  isPendingMode: boolean;
  onTogglePendingMode: (pending: boolean) => void;
}

export const DataConfigModal: React.FC<DataConfigModalProps> = ({
  projectData,
  isOpen,
  onClose,
  onUpdateProjectData,
  isPendingMode,
  onTogglePendingMode,
}) => {
  const [siteName, setSiteName] = useState(projectData.location.siteName);
  const [city, setCity] = useState(projectData.location.city);
  const [population, setPopulation] = useState(projectData.targetPopulation);
  const [siteArea, setSiteArea] = useState(projectData.siteAreaSqKm);

  if (!isOpen) return null;

  const handleSave = () => {
    const updated = {
      ...projectData,
      location: {
        ...projectData.location,
        siteName,
        city,
      },
      targetPopulation: Number(population),
      siteAreaSqKm: Number(siteArea),
    };
    onUpdateProjectData(updated);
    onClose();
  };

  const handleExportJSON = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(projectData, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `forma_sih2026_project_data.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#13263D]/80 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-[#F4F3EF] max-w-xl w-full hairline-border p-8 text-[#13263D] font-mono shadow-2xl">
        <div className="flex items-center justify-between border-b border-[#13263D]/10 pb-4 mb-6">
          <div>
            <div className="text-[10px] text-[#E31B23] uppercase tracking-widest font-bold">
              SIH 2026 TEAM DATA CONTROL
            </div>
            <h3 className="text-xl font-bold uppercase text-[#13263D]">
              Project Data Architecture
            </h3>
          </div>
          <button
            onClick={onClose}
            className="text-xs p-1 hover:text-[#E31B23] cursor-pointer"
          >
            [CLOSE ×]
          </button>
        </div>

        <div className="space-y-6 text-xs">
          {/* Data Mode Switcher (Rule 08 & 21: Never invent fake data; show FORMA DATA PENDING when unverified) */}
          <div className="p-4 bg-[#E9E7E1]/80 hairline-border">
            <div className="text-[10px] uppercase tracking-wider text-[#69717A] font-bold mb-2">
              SIMULATION DATA INGESTION STATE
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => onTogglePendingMode(false)}
                className={`flex-1 py-2 text-center text-xs transition-colors cursor-pointer ${
                  !isPendingMode
                    ? 'bg-[#13263D] text-[#F4F3EF] font-bold'
                    : 'bg-white text-[#69717A] hover:text-[#13263D]'
                }`}
              >
                VERIFIED FORMA RUN
              </button>
              <button
                onClick={() => onTogglePendingMode(true)}
                className={`flex-1 py-2 text-center text-xs transition-colors cursor-pointer ${
                  isPendingMode
                    ? 'bg-[#D97706] text-white font-bold'
                    : 'bg-white text-[#69717A] hover:text-[#13263D]'
                }`}
              >
                FORMA DATA PENDING
              </button>
            </div>
            <p className="text-[11px] text-[#69717A] font-sans mt-2">
              Toggle &ldquo;FORMA DATA PENDING&rdquo; to demonstrate the system&apos;s strict empty state handling when live telemetry has not yet completed its run.
            </p>
          </div>

          {/* Core Project Parameters */}
          <div className="space-y-4">
            <div>
              <label className="block text-[10px] uppercase text-[#69717A] mb-1">
                Project Site Name:
              </label>
              <input
                type="text"
                value={siteName}
                onChange={(e) => setSiteName(e.target.value)}
                className="w-full px-3 py-2 bg-white hairline-border text-xs text-[#13263D] focus:outline-none focus:border-[#E31B23]"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-[10px] uppercase text-[#69717A] mb-1">
                  City / Region:
                </label>
                <input
                  type="text"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full px-3 py-2 bg-white hairline-border text-xs text-[#13263D] focus:outline-none focus:border-[#E31B23]"
                />
              </div>

              <div>
                <label className="block text-[10px] uppercase text-[#69717A] mb-1">
                  Site Area (km²):
                </label>
                <input
                  type="number"
                  step="0.01"
                  value={siteArea}
                  onChange={(e) => setSiteArea(Number(e.target.value))}
                  className="w-full px-3 py-2 bg-white hairline-border text-xs text-[#13263D] focus:outline-none focus:border-[#E31B23]"
                />
              </div>
            </div>

            <div>
              <label className="block text-[10px] uppercase text-[#69717A] mb-1">
                Target District Population:
              </label>
              <input
                type="number"
                value={population}
                onChange={(e) => setPopulation(Number(e.target.value))}
                className="w-full px-3 py-2 bg-white hairline-border text-xs text-[#13263D] focus:outline-none focus:border-[#E31B23]"
              />
            </div>
          </div>

          {/* Action buttons */}
          <div className="pt-4 border-t border-[#13263D]/10 flex items-center justify-between">
            <button
              onClick={handleExportJSON}
              className="text-[11px] text-[#5B7894] hover:underline cursor-pointer"
            >
              ↓ EXPORT PROJECTDATA.JSON
            </button>
            <div className="flex gap-2">
              <button
                onClick={onClose}
                className="px-4 py-2 border border-[#13263D]/20 hover:border-[#13263D] text-[#13263D] transition-colors cursor-pointer"
              >
                CANCEL
              </button>
              <button
                onClick={handleSave}
                className="px-5 py-2 bg-[#13263D] hover:bg-[#E31B23] text-white font-bold transition-colors cursor-pointer"
              >
                SAVE PARAMETERS
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
