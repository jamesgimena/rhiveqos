<div align="center">
  <img width="1200" height="475" alt="RHIVE Banner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# RHIVE QOS — Construction Operations Suite

> A full-stack, multi-role web platform for **RHIVE Construction** — combining a public-facing roofing website, a CRM pipeline, an AI-powered estimator, and role-specific dashboards into a single unified application.

---

## 📋 Project Overview

**RHIVE QOS** (Quote & Operations Suite) is the central operational hub for RHIVE Construction. It serves as:

- A **public marketing website** for lead generation and brand presence
- A **CRM system** tracking every project through an 11-stage pipeline (Lead → Past Customer)
- A **role-based internal platform** for employees, admins, contractors, suppliers, and customers
- An **AI-assisted estimating and quoting engine** for instant roof pricing
- A **Firebase-backed** real-time data platform deployed via Firebase App Hosting

The application uses a **"Tech-Noir / Quantum OS"** design language — dark backgrounds, neon pink (`#EC028B`) accents, glassmorphism panels, and chamfered-edge containers.

---

## 🗂️ Project Structure

```
rhiveqos/
├── pages/            # All page-level components (80+ pages)
├── components/       # Shared/reusable UI components
├── contexts/         # React context providers (Auth, Firebase, MockDB)
├── hooks/            # Custom React hooks
├── lib/              # Firebase config, utilities, service layer
├── services/         # API integrations (JustCall, etc.)
├── functions/        # Firebase Cloud Functions
├── public/           # Static assets
├── constants.ts      # Page registry, pipeline stages, math constants
├── types.ts          # TypeScript type definitions
├── pageRegistry.tsx  # Dynamic page routing registry
├── App.tsx           # Root application component
└── index.tsx         # App entry point
```

---

## 👥 User Roles & Dashboards

| Role | Access |
|---|---|
| **Public** | Marketing site, estimate tool, careers, contractor signup |
| **Customer** | Project tracker, customer profile, project map |
| **Employee** | CRM pipeline, customer lookup, dashboards, calendar, tools |
| **Admin** | All employee access + financials, reporting, user management |
| **Super Admin** | Full system control + role management |
| **Contractor** | Job bids, assignments, onboarding, payment tracking |
| **Supplier** | Purchase orders, price lists, company profile |

---

## 🚀 11-Stage Project Pipeline (CRM)

Each roofing job is tracked through the following stages:

| # | Stage | Description |
|---|---|---|
| 1 | **LEAD** | Initial intake from public/employee |
| 2 | **ESTIMATE** | Property data collection |
| 3 | **QUOTE** | Pricing options presented |
| 4 | **SIGN & VERIFY** | Agreement & contract signing |
| 5 | **SCHEDULE** | Job scheduled in queue |
| 6 | **PRE-INSTALLATION** | Materials, permits, prep |
| 7 | **INSTALL** | Active roof installation |
| 8 | **PUNCH LIST** | Quality control inspection |
| 9 | **INVOICING** | Balance due & payment |
| 10 | **COMPLETED** | Job paid and archived |
| 11 | **PAST CUSTOMER** | Referral & retention system |

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| **Frontend Framework** | React 19 + TypeScript |
| **Build Tool** | Vite 6 |
| **Styling** | Vanilla CSS + custom design system |
| **Animations** | Framer Motion, GSAP |
| **Icons** | Lucide React |
| **Backend/DB** | Firebase (Firestore, Auth, Cloud Functions) |
| **Hosting** | Firebase App Hosting (Cloud Run) |
| **AI** | Google Gemini (`@google/genai`) |
| **Testing** | Playwright |

---

## 🎨 Design System

| Token | Value | Usage |
|---|---|---|
| **RHIVE Pink** | `#EC028B` | Primary actions, glows, active states |
| **Void Black** | `#000000` | Main background |
| **Starlight White** | `#FFFFFF` | Headings, primary text |
| **Electric Blue** | `rgb(17, 109, 255)` | Secondary accents, status indicators |
| **Heading Font** | `Rubik` (Bold) | Technical headings |
| **Narrative Font** | `EB Garamond` | About/mission sections |
| **UI Font** | `Inter` | Body text, labels |

Visual effects: glassmorphism panels, chamfered corners (24–45px), neon drop shadows, circuitry overlay patterns.

---

## ⚙️ Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18+)
- [Firebase CLI](https://firebase.google.com/docs/cli) (`npm install -g firebase-tools`)

### Installation

```bash
npm install
```

### Environment Setup

Copy `.env.example` to `.env.local` and fill in your credentials:

```bash
cp .env.example .env.local
```

Required variables (see `.env.example` for the full list):

```env
GEMINI_API_KEY=your_gemini_api_key
VITE_FIREBASE_API_KEY=your_firebase_api_key
# ... additional Firebase config
```

### Run Locally

```bash
npm run dev
# App runs at http://localhost:3000
```

### Build for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
# Runs at http://localhost:8002
```

---

## 🚀 Deployment

This project is deployed via **Firebase App Hosting** (backed by Cloud Run).

```bash
firebase deploy
```

Configuration is defined in `apphosting.yaml` and `firebase.json`.

---

## 🌐 Live Site

**Production URL:** [https://www.rhiveconstruction.com](https://www.rhiveconstruction.com)

Key public routes:
- `/` — Home (Public Gateway)
- `/aboutus` — About Us
- `/utah-roofing` — Roofing Services
- `/estimator` — AI-Powered Instant Estimate
- `/financing` — Financing Options
- `/insuranceclaim` — Insurance Claim Process

---

## 📄 License

Private & proprietary. All rights reserved by RHIVE Construction.
