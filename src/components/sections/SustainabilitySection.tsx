/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { ProjectData } from '../../types/project';
import { SectionTitle } from '../common/SectionTitle';

interface SustainabilitySectionProps {
  projectData: ProjectData;
}

export const SustainabilitySection: React.FC<SustainabilitySectionProps> = ({ projectData }) => {
  const { sustainability } = projectData;

  return (
    <section id="sustainability" className="py-24 border-t border-[#13263D]/10">
      <div className="max-w-[1720px] mx-auto px-4 lg:px-8">
        <SectionTitle
          number="07"
          title="PERFORMANCE OVER APPEARANCE."
          subtitle="Empirical environmental balance sheet grounded in verifiable physics, life-cycle material audits, and international standards."
          category="MEASURABLE URBAN ECOLOGY & DECARBONIZATION"
        />

        {/* Framework & Carbon Ledger Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-16 items-start">
          <div className="lg:col-span-5">
            <span className="text-xs font-mono uppercase tracking-[0.25em] text-[#55705A] block mb-2 font-bold">
              VERIFIED RATING PROTOCOL
            </span>
            <h3 className="text-2xl font-bold uppercase text-[#13263D] leading-tight mb-4">
              {sustainability.framework}
            </h3>
            <p className="text-sm text-[#69717A] leading-relaxed">
              We reject arbitrary, uncalibrated &ldquo;sustainability scores.&rdquo; Every indicator below is derived from explicit physical formulas in Autodesk Forma, quantifying solar irradiance (kWh/m²), structural mass timber carbon baselines (kg CO₂e/m²), and acoustic decibel attenuation curves.
            </p>
          </div>

          <div className="lg:col-span-7 bg-[#E9E7E1]/50 p-6 hairline-border font-mono text-xs space-y-4">
            <div className="text-[10px] uppercase tracking-widest text-[#69717A] font-bold">
              CARBON EMISSIONS LEDGER SUMMARY
            </div>

            <div className="border-l-2 border-[#55705A] pl-3 py-1">
              <div className="text-[9px] text-[#69717A] uppercase">UPFRONT EMBODIED CARBON TARGET</div>
              <div className="text-sm font-bold text-[#13263D]">
                {sustainability.carbonSummary.upfrontCarbonTarget}
              </div>
            </div>

            <div className="border-l-2 border-[#13263D] pl-3 py-1">
              <div className="text-[9px] text-[#69717A] uppercase">ESTIMATED OPERATIONAL ENERGY INTENSITY</div>
              <div className="text-sm font-bold text-[#13263D]">
                {sustainability.carbonSummary.annualOperationalEstimate}
              </div>
            </div>

            <div className="border-l-2 border-[#D97706] pl-3 py-1">
              <div className="text-[9px] text-[#69717A] uppercase">ON-SITE SOLAR EMISSIONS AVOIDED</div>
              <div className="text-sm font-bold text-[#13263D]">
                {sustainability.carbonSummary.offsetViaSolarPVDerived}
              </div>
            </div>
          </div>
        </div>

        {/* Measurable Benchmark Comparison Table */}
        <div className="overflow-x-auto hairline-border bg-[#F4F3EF] mb-12">
          <table className="w-full text-left font-mono text-xs border-collapse">
            <thead>
              <tr className="bg-[#E9E7E1] border-b border-[#13263D]/20 text-[#13263D]">
                <th className="py-4 px-6 uppercase tracking-wider font-bold">MEASURABLE METRIC</th>
                <th className="py-4 px-6 uppercase tracking-wider font-bold border-l border-[#13263D]/10">INTERNATIONAL BENCHMARK</th>
                <th className="py-4 px-6 uppercase tracking-wider font-bold border-l border-[#13263D]/10">PROPOSAL A (CORE)</th>
                <th className="py-4 px-6 uppercase tracking-wider font-bold border-l border-[#13263D]/10">PROPOSAL B (SELECTED)</th>
                <th className="py-4 px-6 uppercase tracking-wider font-bold border-l border-[#13263D]/10">FORMA COMPUTATIONAL METHODOLOGY</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#13263D]/10 tabular-nums">
              {sustainability.benchmarks.map((item, idx) => (
                <tr key={idx} className="hover:bg-[#E9E7E1]/50 transition-colors">
                  <td className="py-3.5 px-6 font-bold text-[#13263D]">
                    {item.metric}
                  </td>
                  <td className="py-3.5 px-6 text-[#69717A] border-l border-[#13263D]/10">
                    {item.target}
                  </td>
                  <td className="py-3.5 px-6 text-[#69717A] border-l border-[#13263D]/10">
                    {item.proposalA}
                  </td>
                  <td className="py-3.5 px-6 text-[#55705A] font-bold border-l border-[#13263D]/10">
                    {item.proposalB}
                  </td>
                  <td className="py-3.5 px-6 text-[11px] text-[#69717A] font-sans border-l border-[#13263D]/10">
                    {item.methodology}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};
