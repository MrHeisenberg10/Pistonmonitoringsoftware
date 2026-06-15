# Artivus Systems - Piston O-Ring Assembly Traceability & Data Logging System

A modern, production-ready React + TypeScript frontend for an industrial SCADA-style HMI dashboard. Built for the factory floor with a clean, premium design aesthetic.

## 🎯 Overview

This is a frontend application for the **Artivus Systems Piston O-Ring Assembly Traceability & Data Logging System**. It provides:

- **Data Logging Dashboard**: Real-time tracking of piston assembly components
- **Masters Management**: Configuration of piston models, ring types, and product configurations
- **Settings**: Role management, IO settings, camera configuration, and scanner setup
- **Inspection Reports**: Comprehensive reporting with filtering and export capabilities
- **Validation Rules**: Live validation checks for assembly correctness
- **User Authentication**: Role-based access (Administrator, Operator)

## 🛠 Tech Stack

- **React 18** - UI framework
- **TypeScript** - Type safety
- **React Router v6** - Navigation and routing
- **Tailwind CSS** - Styling
- **lucide-react** - Icons
- **recharts** - Data visualization (when needed)
- **Vite** - Build tool and dev server

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── AppShell.tsx     # Main layout wrapper
│   ├── Sidebar.tsx      # Navigation sidebar
│   ├── Header.tsx       # Top header bar
│   ├── StatusBar.tsx    # Bottom status bar
│   └── ProtectedRoute.tsx
├── pages/               # Page components
│   ├── LoginPage.tsx
│   ├── DataLoggingPage.tsx
│   ├── MastersPage.tsx
│   ├── SettingsPage.tsx
│   ├── ReportsPage.tsx
│   └── ValidationPage.tsx
├── context/             # React Context
│   └── AuthContext.tsx  # Authentication & PLC status
├── data/                # Mock data
│   └── mockData.ts
├── types/               # TypeScript type definitions
│   └── index.ts
├── App.tsx              # Main app component & routing
├── main.tsx             # Entry point
└── index.css            # Global styles
```

## 🚀 Getting Started

### Prerequisites

- Node.js 16+ and npm

### Installation

```bash
cd "Frontend of Pistonsoftware"
npm install
```

### Development

```bash
npm run dev
```

The app will be available at `http://localhost:3000`

### Build for Production

```bash
npm run build
npm run preview
```

## 🔐 Authentication

The app includes a mock authentication system. Demo credentials:

- **Username**: `admin` | **Password**: `demo123` (Administrator role)
- **Username**: `john_op` | **Password**: `demo123` (Operator role)

## 🎨 Design System

### Brand Colors

- **Primary (Teal/Turquoise)**: `#14B8A6` - Main accent, CTAs, highlights
- **Dark Navy**: `#1E2230` - Sidebar, headers, text
- **Light Neutral**: `#F4F6F9` - Background
- **White**: `#FFFFFF` - Cards, main content

### Status Colors

- **Success (Green)**: `#22C55E` - Valid, OK, Connected
- **Error (Red)**: `#EF4444` - Invalid, Error, Disconnected
- **Warning (Amber)**: `#F59E0B` - Pending, Warning

### Components

- Rounded cards with subtle shadows (`rounded-xl shadow-sm`)
- Smooth transitions and hover effects
- Clean, modern sans-serif typography (Inter)
- Responsive grid layouts

## 🔌 Backend Integration Points

The frontend is designed to work with a **VB.NET REST API**. Mock data is currently used for demonstration. To integrate with the real backend, replace API endpoints in the following locations:

### 1. **AuthContext.tsx** - Authentication

```typescript
// TODO: Replace with actual VB.NET endpoint
const response = await fetch('https://api.example.com/auth/login', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ username, password, role }),
});
```

**Endpoints to implement**:
- `POST /auth/login` - User authentication
- `POST /auth/logout` - User logout
- `GET /auth/verify` - Token verification

### 2. **DataLoggingPage.tsx** - Assembly Data

```typescript
// TODO: Replace with actual API call
const response = await fetch(`https://api.example.com/api/assembly/components/${modelCode}`);
```

**Endpoints to implement**:
- `GET /api/assembly/components/{modelCode}` - Get component status
- `POST /api/assembly/components` - Update component count
- `GET /api/assembly/models` - Get available piston models

### 3. **MastersPage.tsx** - Master Data Management

```typescript
// TODO: Connect to VB.NET REST API for CRUD operations
// Endpoints:
// GET /api/masters/piston-models
// POST /api/masters/piston-models
// PUT /api/masters/piston-models/{id}
// DELETE /api/masters/piston-models/{id}
```

### 4. **SettingsPage.tsx** - System Configuration

```typescript
// TODO: Connect to VB.NET REST API for device configuration
// POST /api/settings/scanner-config
// POST /api/settings/camera-config
// GET /api/settings/io-mappings
```

### 5. **ReportsPage.tsx** - Historical Data

```typescript
// TODO: Connect to VB.NET REST API for historical report data
// GET /api/reports/inspection?model={modelCode}&from={fromDate}&to={toDate}
// POST /api/reports/export
```

### 6. **ValidationPage.tsx** - Real-time Checks

```typescript
// TODO: Connect to VB.NET REST API for real-time validation
// GET /api/validation/rules
// POST /api/validation/check
```

## 🏠 PLC Status Management

The app includes global state for PLC connection status via `AuthContext`:

```typescript
const { plcStatus, setPlcStatus } = useAuth();

// Update status in real-time
setPlcStatus({
  isConnected: true,
  fixedScannerConnected: true,
  handScannerConnected: false,
});
```

This status is displayed in the bottom status bar and persists across all pages.

## 📱 Responsive Design

The application is fully responsive and works on:
- Desktop (1920x1080 and up)
- Tablet (768px - 1024px)
- Industrial touchscreens
- Mobile (for administration)

## 🎯 Key Features

✅ **Modern, Premium UI** - SaaS-style dashboard aesthetic
✅ **Dark Mode Ready** - Sidebar is dark navy, main content is light
✅ **Fully Typed** - Complete TypeScript type definitions
✅ **Mock Data** - Fully functional demo without backend
✅ **Protected Routes** - Authentication-based access control
✅ **Global State** - Auth context for user & PLC status
✅ **Reusable Components** - Modular, well-organized structure
✅ **API Ready** - Comments indicating where VB.NET endpoints fit

## 🔄 State Management

The app uses React Context for global state:

- **AuthContext** - User authentication, PLC status, global application state
- Local state with `useState` for page-specific data

For more complex state management needs in production, consider:
- Redux Toolkit
- Zustand
- Jotai

## 📝 Adding New Pages

1. Create a new component in `src/pages/NewPage.tsx`
2. Import `AppShell` for consistent layout
3. Add route to `src/App.tsx`
4. Add navigation item to `src/components/Sidebar.tsx`

Example:

```typescript
// src/pages/NewPage.tsx
import { AppShell } from '../components/AppShell';

export const NewPage: React.FC = () => {
  return (
    <AppShell title="New Page">
      <div>Your content here</div>
    </AppShell>
  );
};
```

## 🐛 Troubleshooting

### Styles not loading
- Ensure Tailwind CSS is properly configured in `tailwind.config.js`
- Clear node_modules and reinstall: `npm install`

### Components not rendering
- Check that all imports use correct file paths
- Verify TypeScript types in `src/types/index.ts`

### Development server not starting
- Try clearing `.vite` cache
- Update Vite: `npm install -D vite@latest`

## 📚 Resources

- [React Documentation](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [React Router Docs](https://reactrouter.com)
- [Vite Documentation](https://vitejs.dev)

## 📄 License

MIT

## 👥 Author

Artivus Systems - Industrial Automation & Traceability Solutions

---

**Version**: 1.0.0
**Last Updated**: June 2024
