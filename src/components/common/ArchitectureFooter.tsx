/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';

export const ArchitectureFooter: React.FC = () => {
  return (
    <footer className="bg-[#13263D] text-[#F4F3EF] mt-24 py-16 hairline-t border-[#13263D]">
      <div className="max-w-[1720px] mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-16 border-b border-white/10">
          {/* Col 1 */}
          <div className="md:col-span-4 flex flex-col justify-between">
            <div>
              <div className="text-xs font-mono font-bold tracking-[0.25em] text-[#E31B23] uppercase mb-2">
                SMARTCITY / FORMA URBAN LAB
              </div>
              <h3 className="text-2xl font-bold tracking-tight text-white uppercase max-w-sm">
                Smart City Site Planning using Autodesk Forma Site Design
              </h3>
              <p className="mt-4 text-xs text-white/60 leading-relaxed max-w-md">
                A computational site analysis, generative urban design, and BIM interoperability project developed for the Smart India Hackathon (SIH 2026).
              </p>
            </div>
            <div className="mt-8 text-[11px] font-mono text-white/40 tracking-wider">
              SMART INDIA HACKATHON 2026 · AUTODESK EDUCATION EXPERIENCE
            </div>
          </div>

          {/* Col 2 */}
          <div className="md:col-span-3">
            <div className="text-[10px] font-mono tracking-[0.25em] text-white/50 uppercase mb-4">
              COMPUTATIONAL TECH STACK
            </div>
            <ul className="space-y-2 text-xs font-mono text-white/80">
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-[#E31B23]" />
                Autodesk Forma Site Design
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-[#5B7894]" />
                Autodesk Revit 2026 (BIM Interoperability)
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-[#55705A]" />
                Forma AI Wind & Microclimate Engine
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-[#D97706]" />
                Forma Embodied Carbon & Solar Analytics
              </li>
            </ul>
          </div>

          {/* Col 3 */}
          <div className="md:col-span-2">
            <div className="text-[10px] font-mono tracking-[0.25em] text-white/50 uppercase mb-4">
              PROJECT CHAPTERS
            </div>
            <div className="space-y-1.5 text-xs font-mono text-white/70">
              <div>01 Project Overview</div>
              <div>02 Site Context & GIS</div>
              <div>03 Master Plan Synthesis</div>
              <div>04 Urban Design & Typology</div>
              <div>05 Proposals A & B</div>
              <div>06 Forma Performance Analysis</div>
              <div>07 Sustainability Metrics</div>
              <div>08 Human Impact & Comfort</div>
              <div>09 BIM / Revit Integration</div>
              <div>10 Final Selection Board</div>
            </div>
          </div>

          {/* Col 4 */}
          <div className="md:col-span-3">
            <div className="text-[10px] font-mono tracking-[0.25em] text-white/50 uppercase mb-4">
              DISCLAIMER & INTEGRITY
            </div>
            <p className="text-xs text-white/60 leading-relaxed">
              This academic presentation application is submitted under the Smart India Hackathon (SIH 2026) Problem Statement: “Smart City Site Planning using Autodesk Forma Site Design”. It is created for educational and evaluation review. This project is independently produced and does not claim official commercial endorsement from Autodesk Inc.
            </p>
          </div>
        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-[11px] font-mono text-white/40 tracking-wider">
          <div>
            © 2026 SMARTCITY / FORMA URBAN LAB · PROJECT REV. 02 · SIH 2026 · ALL ARCHITECTURAL METRICS REPRODUCIBLE IN AUTODESK FORMA
          </div>
          <div className="mt-2 sm:mt-0">
            COMPLIANT WITH WCAG AA & ZERO-SLOP ARCHITECTURAL DISCIPLINE
          </div>
        </div>
      </div>
    </footer>
  );
};
