/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type FormaDataStatus = 'verified' | 'pending' | 'calibrating';

export interface MetricValue {
  label: string;
  value: string | number;
  unit?: string;
  status: FormaDataStatus;
  note?: string;
}

export interface DesignPrinciple {
  number: string;
  title: string;
  summary: string;
  detail: string;
  formaMetric: string;
}

export interface SiteLayer {
  id: string;
  name: string;
  category: 'boundary' | 'environmental' | 'infrastructure' | 'urban';
  active: boolean;
  color: string;
  description: string;
}

export interface BuildingData {
  id: string;
  code: string;
  name: string;
  typology: 'Commercial Office' | 'Mixed-Use Residential' | 'Civic & Culture' | 'Research & Innovation' | 'Public Amenity' | 'Transit Hub';
  heightMeters: number;
  floors: number;
  grossFloorAreaSqM: number;
  footprintSqM: number;
  embodiedCarbonKgCo2ePerSqM: number | null;
  daylightCompliancePercent: number | null;
  status: FormaDataStatus;
  formaAnalysis: {
    solarPotentialKWhPerSqM: number | null;
    windComfortRating: string;
    sunlightHoursDirect: number | null;
  };
  bimRevitSync: {
    hasDetailedModel: boolean;
    revitFamily: string;
    structuralType: string;
    lodLevel: 'LOD 200 (Forma)' | 'LOD 350 (Revit Detailed)';
  };
  coordinates: { x: number; y: number; width: number; height: number };
}

export interface UrbanProposal {
  id: 'proposal-a' | 'proposal-b';
  code: string;
  title: string;
  subtitle: string;
  conceptStatement: string;
  designStrategy: string[];
  keyMetrics: {
    grossFloorArea: string;
    floorAreaRatio: string;
    greenCoveragePercentage: number;
    residentialUnits: number;
    commercialAreaSqM: number;
    avgSunHours: string;
    daylightAutonomy: string;
    embodiedCarbonScore: string;
    pedestrianShed5Min: string;
  };
  strengths: string[];
  limitations: string[];
  visualPromptDescription: string;
}

export interface AnalysisSectionData {
  id: string;
  index: string;
  title: string;
  subtitle: string;
  formaToolName: string;
  status: FormaDataStatus;
  keyMetrics: MetricValue[];
  interpretation: string;
  proposalAValue: string;
  proposalBValue: string;
  varianceNote: string;
  legendItems: { color: string; label: string; range: string }[];
}

export interface BIMWorkflowStep {
  step: number;
  title: string;
  system: string;
  action: string;
  outputArtifact: string;
}

export interface MediaItem {
  id: string;
  title: string;
  category: 'Master Plan' | 'Aerial View' | 'Street View' | 'Landscape' | 'Transportation' | 'Office Building' | 'Analysis Views';
  caption: string;
  dimensions: string;
  imageSrc: string;
  aspectRatio: '16:9' | '4:3' | '1:1';
}

export interface MasterplanHotspot {
  id: string;
  name: string;
  function: string;
  area: string;
  keyRole: string;
  coordinates: { x: number; y: number };
  category: string;
}

export interface DesignDnaPrinciple {
  number: string;
  title: string;
  subtitle: string;
  description: string;
  formaImpact: string;
}

export interface DataDecisionItem {
  id: string;
  index: string;
  dataObservation: string;
  formaMetric: string;
  decision: string;
  impact: string;
}

export interface TimelineStep {
  stepNumber: string;
  phase: string;
  title: string;
  toolUsed: string;
  deliverable: string;
  status: 'completed' | 'current';
}

export interface ProjectData {
  projectName: string;
  competition: string;
  department: string;
  organization: string;
  category: string;
  theme: string;
  revision: string;
  location: {
    siteName: string;
    city: string;
    country: string;
    latitude: number;
    longitude: number;
    climateZone: string;
    elevation: string;
  };
  siteAreaHectares: number;
  siteAreaSqKm: number;
  targetPopulation: number;
  objective: string;
  designPrinciples: DesignPrinciple[];
  designDna: DesignDnaPrinciple[];
  masterplanHotspots: MasterplanHotspot[];
  dataDecisions: DataDecisionItem[];
  timeline: TimelineStep[];
  siteContext: {
    narrative: string;
    contextPoints: { title: string; text: string }[];
    constraintPoints: { title: string; text: string }[];
    opportunityPoints: { title: string; text: string }[];
    layers: SiteLayer[];
  };
  landUse: {
    categories: {
      name: string;
      percentage: number;
      areaHectares: number;
      color: string;
      formaZoningCode: string;
    }[];
    totalDevelopableHectares: number;
  };
  buildings: BuildingData[];
  proposals: {
    proposalA: UrbanProposal;
    proposalB: UrbanProposal;
    selectedProposalId: 'proposal-a' | 'proposal-b';
    decisionRationale: string[];
  };
  analysisData: AnalysisSectionData[];
  sustainability: {
    framework: string;
    benchmarks: {
      metric: string;
      unit: string;
      target: string;
      proposalA: string;
      proposalB: string;
      methodology: string;
      status: FormaDataStatus;
    }[];
    carbonSummary: {
      upfrontCarbonTarget: string;
      annualOperationalEstimate: string;
      offsetViaSolarPVDerived: string;
    };
  };
  humanImpact: {
    pedestrianWalkshedPercentage: number;
    greenSpacePerCapitaSqM: number;
    publicPlazaProximityMin: number;
    acousticBufferDecibelsReduction: number;
    everydayExperiencePillars: {
      pillar: string;
      formaDesignResponse: string;
      measurableImpact: string;
    }[];
  };
  bim: {
    leadBuildingId: string;
    buildingName: string;
    workflowSteps: BIMWorkflowStep[];
    specifications: {
      structure: string;
      facadeSystem: string;
      totalGFA: string;
      floorCount: string;
      netZeroStrategy: string;
    };
    views: {
      id: '3d-model' | 'floor-plans' | 'elevations' | 'sections' | 'render';
      label: string;
      description: string;
      technicalDetail: string;
    }[];
  };
  finalProposal: {
    selectedProposal: UrbanProposal;
    title: string;
    summary: string;
    evidenceReasons: {
      category: string;
      metricGain: string;
      evidence: string;
    }[];
  };
  media: MediaItem[];
}
