# GeneTrack - Family Health Pedigree Builder

A comprehensive health-tech platform for tracking hereditary conditions through family history, featuring pedigree visualization and secure data storage.

## Tech Stack

| Layer     | Technology                             |
|-----------|-----------------------------------------|
| Frontend  | React, TypeScript, Material UI         |
| Backend   | Firebase Functions, Express, Firestore |
| Database  | Firestore with Redis Caching           |
| Auth      | Firebase Authentication                |
| Visualization | D3.js                                |
| Hosting   | Firebase Hosting                       |

## Core Functionality

### Smart Questionnaire System
- **Dynamic Question Flow**  
  Condition-based questions (e.g., only show diabetes details if user selects "Yes" for diabetes)
- **Multi-Member Support**  
  Add/edit/remove family members with individual health profiles
- **Progress Tracking**  
  Visual indicators for completed sections

### Pedigree Visualization
- **Interactive Family Tree** (D3.js)  
  - Drag/zoom functionality  
  - Color-coded health indicators  
  - Multi-generational display
- **Member Details**  
  Quick-view health summaries on node hover

### Data Management
- **One-Click PDF Export**  
  Generate comprehensive family health reports
- **Redis-Cached Queries**  
  Sub-100ms response times for frequent queries
- **Secure Storage**  
  Firestore with strict security rules

### User Management
- **Role-Based Access**  
  - Standard users (own data only)  
  - Admin view (all submissions)
- **Authentication**  
  Google/email login with Firebase Auth

## Installation

```bash
# Clone repository
git clone [repository-url]

# Frontend
cd frontend
npm install
npm run dev

# Backend (with emulators)
cd ../backend
npm install
firebase emulators:start

# Production deploy
firebase deploy --only functions,hosting