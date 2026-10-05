# FORMA URBAN LAB — Smart City Site Planning

> **Smart India Hackathon (SIH 2026)**
> **Problem Statement:** “Smart City Site Planning using Autodesk Forma Site Design”
> **Organization:** Autodesk | **Department:** Autodesk Education Experience | **Category:** Software | **Theme:** Miscellaneous

A digital architectural masterplan and environmental performance presentation platform built for evaluating smart city site proposals designed in **Autodesk Forma** and **Autodesk Revit**.

---

## 1. Project Overview

The **FORMA URBAN LAB** application presents a computational, data-driven master plan for a 1.24 km² (124 hectare) smart district in the Navi Mumbai coastal knowledge corridor. Rather than relying on static images or generic dashboard cards, the application operates as an **architectural exhibition and jury presentation system**:
- **Multi-criteria environmental simulations**: Area metrics, A1-A5 embodied carbon, direct ground sun hours, daylight autonomy (sDA 300/50%), Lawson CFD wind comfort, outdoor UTCI microclimate cooling, highway acoustic attenuation, and rooftop photovoltaic yield.
- **Dual proposal comparison**: Head-to-head empirical trade-off analysis between **Proposal A (Compact Urban Core)** and **Proposal B (Green Connected District)**.
- **BIM Interoperability**: Seamless workflow connecting Autodesk Forma conceptual massing directly to Autodesk Revit LOD 350 structural detailing and facade schedules.
- **Fullscreen Jury Mode**: 10-slide architectural jury review with keyboard navigation (Right/Left Arrows, Esc).

---

## 2. Tech Stack

- **Framework**: React 19 + TypeScript
- **Bundler & Build Tool**: Vite 8 + Tailwind CSS v4
- **Typography**: Plus Jakarta Sans, JetBrains Mono
- **Design System**: Zero-pill architectural presentation language, hairline drawing dividers, 60-30-10 restrained color distribution (`#F4F3EF`, `#13263D`, `#E31B23`, `#55705A`).
- **Icons & Visuals**: Physically based architectural renderings, dynamic SVG cartographic vectors.

---

## 3. Installation & Local Development

### Prerequisites
- Node.js (version 20 or higher)
- npm or pnpm

### Setup
```bash
# Clone the repository
git clone <repo-url>
cd <project-folder>

# Install dependencies
npm install

# Start development server on port 3000
npm run dev
```

Visit `http://localhost:3000` to interact with the masterplan.

---

## 4. Production Build & Verification

```bash
# Type check and build production bundle
npm run build

# Preview production build locally
npm run preview
```

---

## 5. Deployment (Vercel / Cloud Run)

The application is fully optimized for **Vercel** and containerized environments:

### Deploying to Vercel
1. Push this repository to GitHub or GitLab.
2. Import the project into your Vercel Dashboard.
3. Framework Preset: **Vite**.
4. Root Directory: `./`.
5. Build Command: `npm run build`.
6. Output Directory: `dist`.
7. Click **Deploy**.

---

## 6. Data Architecture

All project metrics, spatial boundaries, and simulation scores originate from a single centralized, strongly-typed data store:

```
src/
├── types/
│   └── project.ts          # Strongly typed interfaces (ProjectData, BuildingData, UrbanProposal, etc.)
├── data/
│   └── projectData.ts      # Central projectData instance with verified student outputs
```

### Strict Environmental Data Rule
To preserve academic and competition integrity, **no mock or fabricated analysis data is ever shown**. If analysis for any parameter is ongoing, the system displays an explicit state:
```
[FORMA DATA PENDING]
"Analysis results will appear here once the project data is added."
```
You can toggle between **Verified Run** and **Pending Data Mode** in real-time using the **Data Architecture (⚙)** button in the bottom utility bar.

---

## 7. How to Customize for Your SIH 2026 Team

### A. How to Replace Autodesk Forma Data
1. Open `/src/data/projectData.ts`.
2. Locate `analysisData` array.
3. Replace the `keyMetrics`, `proposalAValue`, and `proposalBValue` with your team's actual telemetry exported from Autodesk Forma's Analysis tab.
4. If a module has not yet finished running in Forma, set `status: 'pending'`.

### B. How to Replace Revit BIM Media
1. Export high-resolution isometric orthographic views or realistic renders from your Autodesk Revit project (.rvt file).
2. Place the image in `/src/assets/images/` (e.g., `bim_office_revit.jpg`).
3. Update the import in `/src/data/projectData.ts`:
   ```ts
   import bimOfficeRevitImg from '../assets/images/your_revit_render.jpg';
   ```
4. Adjust building metadata in `projectData.bim.specifications`.

### C. How to Replace Walkthrough Video
1. Render your 30-second camera flythrough in Autodesk Forma or Revit Enscape/Twinmotion.
2. In `/src/components/sections/MediaSection.tsx`, replace the image preview or integrate your `.mp4` file or YouTube/Vimeo embed URL directly into the video player viewport.

---

## 8. License & Attribution

- Built for **Smart India Hackathon 2026**.
- Software tools utilized: **Autodesk Forma Site Design** & **Autodesk Revit 2026**.
- Developed under the guidelines of the Autodesk Education Experience track.
