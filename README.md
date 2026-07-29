# 🚀 React Tasks & Analytics Dashboard

[![React](https://img.shields.io/badge/React-19.0-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-8.0-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4.0-06B6D4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Zustand](https://img.shields.io/badge/State-Zustand-764ABC)](https://zustand-demo.pmnd.rs/)

Responsive tasks & analytics dashboard built with **React 19**, **TypeScript**, **Vite**, and **Tailwind CSS v4**. Designed with modern frontend architecture patterns, state management via **Zustand**, asynchronous data fetching with **TanStack Query**, interactive 3D WebGL visualizations, and dynamic charts.

---

## ✨ Key Features

- 🔐 **Authentication Guard & Routing**: Protected routes using `React Router` with session persistence powered by Zustand auth stores.
- 📊 **Interactive Analytics & Data Visualizations**: Multiple chart types (Area, Bar, Pie, Radar, Activity Line) built using `Recharts` for dynamic data inspection.
- 🌐 **3D Spatial Telemetry**: Interactive WebGL 3D globe rendered via `Cobe` for visualizing global reach.
- 📋 **Task & Team Management**: Complete workflows for searching, filtering, and managing tasks and team members with modal dialogs and data tables.
- 🎨 **Modern Design & Dark Mode Support**: Sleek, fully responsive UI built with Tailwind CSS v4, Base UI / Shadcn primitives, system-aware theme toggling, and micro-animations.
- 🛡️ **Resilient Error Handling**: React `ErrorBoundary` wrappers and `Suspense` fallbacks for reliable UI fallback states and lazy loading.
- ⚡ **Cutting-Edge Tooling**: Integrated with **React Compiler** auto-memoization, **TanStack React Query**, and **Oxlint** for ultra-fast lint checks.

---

## 🛠️ Tech Stack & Architecture

| Layer                  | Technologies Used                                                   |
| :--------------------- | :------------------------------------------------------------------ |
| **Core Framework**     | React 19, TypeScript, Vite 8                                        |
| **Styling & UI**       | Tailwind CSS v4, Lucide Icons, Motion, Fontsource Inter             |
| **State Management**   | Zustand (Modular stores for Auth, Modal, Sidebar, and Task Filters) |
| **Data Fetching**      | TanStack React Query v5, Axios                                      |
| **Data Visualization** | Recharts, Cobe (WebGL 3D Globe)                                     |
| **Routing & Auth**     | React Router v8, Client-side Auth Guards                            |
| **Quality & Tooling**  | React Compiler (Babel/Rolldown), Oxlint                             |

---

## 📂 Project Architecture

```
reactDashboard/
├── src/
│   ├── api/
│   ├── assets/
│   ├── components/
│   │   ├── charts/
│   │   ├── layout/
│   │   ├── ui/
│   │   ├── ErrorBoundary.tsx
│   │   ├── Globe.tsx
│   │   ├── ProtectedRoute.tsx
│   │   └── ThemeProvider.tsx
│   ├── consts/
│   ├── data/
│   ├── hooks/
│   ├── lib/
│   ├── pages/
│   ├── stores/
│   ├── App.tsx
│   └── main.tsx
├── index.html
├── package.json
└── vite.config.ts
```

---

## 🚀 Getting Started

### Prerequisites

Ensure you have the following installed on your machine:

- **Node.js**: `v18.0.0` or higher
- **npm**: `v9.0.0` or higher (or `pnpm` / `yarn`)

### Installation & Setup

1. **Clone the repository**

   ```bash
   git clone https://github.com/your-username/react-dashboard.git
   cd reactDashboard
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Launch the development server**
   ```bash
   npm run dev
   ```
   Open `http://localhost:5173` in your browser to view the application.

---

## 📜 Available Scripts

In the project directory, you can run:

| Command           | Description                                                                       |
| :---------------- | :-------------------------------------------------------------------------------- |
| `npm run dev`     | Starts the Vite development server with Hot Module Replacement (HMR).             |
| `npm run build`   | Runs TypeScript compilation (`tsc -b`) and builds the production bundle via Vite. |
| `npm run preview` | Serves the production build locally for verification.                             |
| `npm run lint`    | Runs `Oxlint` for fast static code analysis.                                      |

---

## 💡 Engineering Highlights

- **Atomic & Modular Structure**: Decoupled presentation (`ui/`), views (`pages/`), state management (`stores/`), and visualization (`charts/`) layers for scalability and maintainability.
- **Optimized State Flow**: Leveraged **Zustand** stores for localized client state (modals, sidebar, filters, auth) to eliminate prop-drilling and unnecessary re-renders.
- **Strict Type Safety**: Fully typed with TypeScript across models, store state contracts, and component prop definitions.
- **React 19 & Compiler Ready**: Integrated with modern React 19 ecosystem standards and automatic memoization.
