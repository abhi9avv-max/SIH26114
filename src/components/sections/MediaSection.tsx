/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { ProjectData, MediaItem } from '../../types/project';
import { SectionTitle } from '../common/SectionTitle';

interface MediaSectionProps {
  projectData: ProjectData;
}

export const MediaSection: React.FC<MediaSectionProps> = ({ projectData }) => {
  const [selectedMedia, setSelectedMedia] = useState<MediaItem>(projectData.media[0]);
  const [isPlayingWalkthrough, setIsPlayingWalkthrough] = useState(false);

  return (
    <section id="media" className="py-24 border-t border-[#13263D]/10">
      <div className="max-w-[1720px] mx-auto px-4 lg:px-8">
        <SectionTitle
          number="11"
          title="ARCHITECTURAL MEDIA & VISUAL RECORD"
          subtitle="Portfolio exhibition of drawings, high-resolution renderings, and cinematic animation of the smart city district."
          category="VISUAL REPOSITORY & DIGITAL ASSETS"
        />

        {/* 30-Second Walkthrough Video Player Component */}
        <div className="mb-20 bg-[#13263D] text-[#F4F3EF] p-8 hairline-border">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-4 mb-6 font-mono text-xs">
            <div>
              <span className="text-[#E31B23] font-bold tracking-widest text-[10px] uppercase block mb-1">
                CINEMATIC WALKTHROUGH
              </span>
              <h3 className="text-xl font-bold uppercase text-white">
                30-SECOND URBAN MOTION PRESENTATION
              </h3>
            </div>
            <div className="text-[11px] text-white/60">
              AUTODESK FORMA CAMERA PATH FLYTHROUGH · 4K 60FPS
            </div>
          </div>

          <div className="relative aspect-[21/9] bg-black/60 overflow-hidden flex items-center justify-center hairline-border group">
            {/* Visual simulation of video player */}
            <img
              src={projectData.media[0]?.imageSrc}
              alt="Walkthrough Video Frame"
              className={`w-full h-full object-cover transition-all duration-1000 ${
                isPlayingWalkthrough ? 'scale-105 filter brightness-105' : 'filter brightness-75'
              }`}
              referrerPolicy="no-referrer"
            />

            {!isPlayingWalkthrough ? (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/40 z-10">
                <button
                  onClick={() => setIsPlayingWalkthrough(true)}
                  className="w-16 h-16 rounded-full bg-[#E31B23] text-white flex items-center justify-center hover:scale-110 transition-transform cursor-pointer shadow-xl"
                  aria-label="Play Walkthrough Animation"
                >
                  <svg className="w-6 h-6 fill-current ml-1" viewBox="0 0 24 24">
                    <polygon points="5 3 19 12 5 21 5 3" />
                  </svg>
                </button>
                <span className="mt-4 font-mono text-xs tracking-widest text-white/90 uppercase">
                  PLAY 30-SECOND WALKTHROUGH
                </span>
              </div>
            ) : (
              <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/90 to-transparent flex items-center justify-between text-xs font-mono text-white z-10">
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setIsPlayingWalkthrough(false)}
                    className="p-1 hover:text-[#E31B23]"
                    aria-label="Pause Walkthrough"
                  >
                    ❚❚ Pause
                  </button>
                  <span className="text-[10px] text-white/60">00:14 / 00:30</span>
                </div>
                <div className="flex-1 mx-6 h-1 bg-white/20 overflow-hidden">
                  <div className="h-full bg-[#E31B23] w-1/2" />
                </div>
                <div className="text-[10px] text-white/60">
                  CAMERA PATH: WATERFRONT TO CIVIC CANOPY
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Large Image Panels: Architectural Portfolio Composition */}
        <div>
          <div className="text-[10px] font-mono uppercase tracking-[0.25em] text-[#69717A] mb-8 font-bold">
            CURATED ARCHITECTURAL PLATES
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Main Featured Plate: 8 cols */}
            <div className="lg:col-span-8 space-y-4">
              <div className="relative aspect-[16/10] bg-[#E9E7E1] hairline-border overflow-hidden">
                <img
                  src={selectedMedia.imageSrc}
                  alt={selectedMedia.title}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-4 left-4 bg-[#F4F3EF]/90 px-3 py-1 font-mono text-[10px] text-[#13263D] hairline-border">
                  {selectedMedia.category} · {selectedMedia.dimensions}
                </div>
              </div>

              <div className="p-4 bg-[#F4F3EF] hairline-border">
                <h4 className="text-lg font-bold text-[#13263D] uppercase">
                  {selectedMedia.title}
                </h4>
                <p className="mt-1 text-xs text-[#69717A] font-sans leading-relaxed">
                  {selectedMedia.caption}
                </p>
              </div>
            </div>

            {/* Selector Grid: 4 cols */}
            <div className="lg:col-span-4 space-y-4 font-mono text-xs">
              <div className="text-[10px] uppercase tracking-widest text-[#69717A]">
                SELECT PLATE TO EXPAND
              </div>

              {projectData.media.map((item) => {
                const isSelected = selectedMedia.id === item.id;
                return (
                  <div
                    key={item.id}
                    onClick={() => setSelectedMedia(item)}
                    className={`p-3 hairline-border cursor-pointer transition-all ${
                      isSelected
                        ? 'bg-[#13263D] text-[#F4F3EF]'
                        : 'bg-[#E9E7E1]/50 text-[#13263D] hover:bg-[#E9E7E1]'
                    }`}
                  >
                    <div className="flex items-center justify-between text-[9px] text-[#69717A] mb-1">
                      <span className={isSelected ? 'text-[#E31B23]' : ''}>{item.category}</span>
                      <span>{item.dimensions}</span>
                    </div>
                    <div className="font-bold text-xs leading-snug">
                      {item.title}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
