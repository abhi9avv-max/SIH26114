/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';

interface ArchitectureHeaderProps {
  onOpenJuryMode: () => void;
  activeSection: string;
  onNavigateSection: (sectionId: string) => void;
}

export const ArchitectureHeader: React.FC<ArchitectureHeaderProps> = ({
  onOpenJuryMode,
  activeSection,
  onNavigateSection,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'overview', index: '01', label: 'Overview' },
    { id: 'site', index: '02', label: 'Site' },
    { id: 'masterplan', index: '03', label: 'Master Plan' },
    { id: 'urbandesign', index: '04', label: 'Urban Design' },
    { id: 'proposals', index: '05', label: 'Proposals' },
    { id: 'analysis', index: '06', label: 'Analysis' },
    { id: 'sustainability', index: '07', label: 'Sustainability' },
    { id: 'humanimpact', index: '08', label: 'Human Impact' },
    { id: 'bim', index: '09', label: 'BIM / Revit' },
    { id: 'final', index: '10', label: 'Final Proposal' },
  ];

  const handleNavClick = (id: string) => {
    onNavigateSection(id);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-[#F4F3EF]/95 backdrop-blur-md hairline-b transition-colors">
      <div className="max-w-[1720px] mx-auto px-4 lg:px-8 h-14 flex items-center justify-between">
        {/* Brand Zone */}
        <div
          onClick={() => handleNavClick('overview')}
          className="cursor-pointer flex items-center gap-3 select-none"
        >
          <div className="flex flex-col leading-none">
            <span className="text-xs font-mono font-bold tracking-[0.25em] text-[#13263D] uppercase">
              SMARTCITY
            </span>
            <span className="text-[10px] font-mono tracking-[0.2em] text-[#69717A] uppercase mt-0.5">
              FORMA URBAN LAB
            </span>
          </div>
          <span className="hidden sm:inline-block px-2 py-0.5 bg-[#E9E7E1] hairline-border font-mono text-[9px] font-bold text-[#13263D] tracking-wider">
            REV. 02 · SIH 2026
          </span>
        </div>

        {/* Center Desktop Navigation */}
        <nav
          className="hidden xl:flex items-center gap-5 text-[11px] font-mono tracking-wider text-[#69717A]"
          aria-label="Masterplan Chapters"
        >
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`flex items-center gap-1 py-1 hover:text-[#13263D] transition-colors ${
                  isActive
                    ? 'text-[#13263D] font-bold border-b border-[#E31B23]'
                    : 'text-[#69717A]'
                }`}
              >
                <span className="text-[9px] opacity-60">{item.index}</span>
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Right Actions */}
        <div className="flex items-center gap-3">
          <button
            onClick={onOpenJuryMode}
            className="flex items-center gap-2 px-3 py-1.5 text-xs font-mono font-semibold tracking-wider text-[#F4F3EF] bg-[#13263D] hover:bg-[#E31B23] transition-colors focus-visible:outline-2 focus-visible:outline-[#13263D]"
            aria-label="Start Jury Presentation"
          >
            <span>JURY MODE</span>
            <span aria-hidden="true">→</span>
          </button>

          {/* Mobile Menu Hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="xl:hidden p-2 text-[#13263D] hover:text-[#E31B23] focus-visible:outline-2 focus-visible:outline-[#13263D]"
            aria-label={mobileMenuOpen ? 'Close Menu' : 'Open Menu'}
          >
            <div className="w-5 h-4 flex flex-col justify-between">
              <span
                className={`h-0.5 w-full bg-[#13263D] transition-transform ${
                  mobileMenuOpen ? 'rotate-45 translate-y-1.5' : ''
                }`}
              />
              <span
                className={`h-0.5 w-full bg-[#13263D] transition-opacity ${
                  mobileMenuOpen ? 'opacity-0' : 'opacity-100'
                }`}
              />
              <span
                className={`h-0.5 w-full bg-[#13263D] transition-transform ${
                  mobileMenuOpen ? '-rotate-45 -translate-y-1.5' : ''
                }`}
              />
            </div>
          </button>
        </div>
      </div>

      {/* Clean Fullscreen Mobile Menu */}
      {mobileMenuOpen && (
        <div className="xl:hidden fixed inset-0 top-14 bg-[#F4F3EF] z-50 flex flex-col p-8 overflow-y-auto hairline-t">
          <div className="text-[10px] font-mono tracking-[0.25em] text-[#69717A] uppercase mb-6">
            PROJECT NAVIGATION
          </div>
          <div className="flex flex-col gap-4">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className="flex items-baseline justify-between py-2 text-left border-b border-[#13263D]/10 hover:text-[#E31B23] transition-colors"
              >
                <span className="text-xl font-bold tracking-tight text-[#13263D]">
                  {item.label}
                </span>
                <span className="text-xs font-mono text-[#69717A]">
                  {item.index}
                </span>
              </button>
            ))}
          </div>

          <div className="mt-8 pt-6 border-t border-[#13263D]/10">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenJuryMode();
              }}
              className="w-full py-3 bg-[#13263D] text-[#F4F3EF] font-mono text-xs font-bold uppercase tracking-widest hover:bg-[#E31B23] transition-colors"
            >
              START JURY PRESENTATION →
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
