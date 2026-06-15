# 🚀 Artivus Systems - Quick Start Guide

## ⚡ Get Started in 30 Seconds

### Prerequisites
- Node.js 16+ installed
- npm available in terminal

### Installation & Run

```bash
cd "Frontend of Pistonsoftware"
npm install
npm run dev
```

**That's it!** Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🔐 Demo Login Credentials

### Admin Account
- **Username**: `admin`
- **Password**: `demo123`
- **Role**: Administrator

### Operator Account
- **Username**: `john_op`
- **Password**: `demo123`
- **Role**: Operator

---

## 📱 What You'll See

### 1. **Login Page** (Home Route `/`)
- Clean gradient background
- Centered authentication card
- Demo credentials auto-filled
- Choose your role before login

### 2. **Data Logging Dashboard** (Main Page after login)
- Piston model selector (dropdown)
- Live production counter
- Component tracking with progress bars
- QR code status indicators
- Real-time clock in header

### 3. **Masters** (Configuration)
- Piston Models management
- Ring Types configuration
- Product Configurations
- Add/Edit/Delete functionality

### 4. **Settings** (System Config)
- Roles & Users management
- IO Settings (register mappings)
- Camera Configuration
- Scanner COM port setup

### 5. **Reports** (Data Analysis)
- Advanced filtering by model, user, date
- Inspection records table
- Summary statistics (Total, Pass, Fail)
- Search and export options

### 6. **Validation** (Quality Checks)
- 5 real-time validation rules
- Pass/Fail status indicators
- Overall pass rate
- Refresh validation checks

---

## 🎨 Design Features

✨ **Color Scheme**
- Teal Accent: `#14B8A6` (main brand color)
- Dark Navy: `#1E2230` (sidebar & headers)
- Success: `#22C55E` (green indicators)
- Error: `#EF4444` (red indicators)

✨ **Layout**
- Fixed left sidebar (collapsible)
- Top header with live clock & user info
- Bottom status bar (PLC & scanner connections)
- Responsive main content area

---

## 🛠 Available Commands

```bash
# Development server (with HMR)
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Type checking
npm run lint
```

---

## 📁 Project Structure

```
src/
├── pages/          # 6 Page components
├── components/     # 5 Layout components
├── context/        # Global auth state
├── data/           # Mock data
├── types/          # TypeScript definitions
├── App.tsx         # Routing config
└── index.css       # Global styles
```

---

## 🔌 Backend Integration

Ready to connect to your VB.NET backend? Check the comments in these files:

- `src/context/AuthContext.tsx` - Auth endpoints
- `src/pages/DataLoggingPage.tsx` - Assembly data API
- `src/pages/MastersPage.tsx` - CRUD operations
- `src/pages/SettingsPage.tsx` - Device config
- `src/pages/ReportsPage.tsx` - Historical data
- `src/pages/ValidationPage.tsx` - Validation checks

Each file has `TODO:` comments showing where to add your API calls.

---

## 📝 Key Technologies

| Tech | Version | Purpose |
|------|---------|---------|
| React | 18 | UI Framework |
| TypeScript | 6 | Type Safety |
| React Router | 6 | Navigation |
| Tailwind CSS | 3 | Styling |
| lucide-react | 1.18 | Icons |
| Vite | 8 | Build Tool |

---

## 🎯 Mock Data Available

The app includes complete mock data for demo:

- **4 Piston Models** - With target counts
- **4 Ring Types** - With positions
- **5 Components** - With QR codes and status
- **5 Inspection Reports** - With pass/fail mix
- **3 Test Users** - Admin + 2 Operators
- **Camera & IO Settings** - Complete configs

No backend needed to demo the UI!

---

## 🚨 Troubleshooting

### Port 3000 already in use?
```bash
# Use a different port
npm run dev -- --port 3001
```

### Styles not loading?
```bash
# Clear cache and reinstall
rm -r node_modules
npm install
npm run dev
```

### TypeScript errors?
```bash
npm run lint
# Fix any type errors shown
```

---

## 📚 Learn More

- **React**: https://react.dev
- **TypeScript**: https://www.typescriptlang.org/docs
- **Tailwind**: https://tailwindcss.com/docs
- **Vite**: https://vitejs.dev/guide/

---

## ✅ Your Dashboard is Ready!

You now have a **production-grade SCADA HMI dashboard** with:

✓ Modern, clean UI
✓ Complete type safety
✓ Responsive design
✓ Mock data included
✓ Backend integration ready
✓ Zero build warnings

**Enjoy exploring! 🎉**

---

*For detailed information, see `README.md` and `IMPLEMENTATION_SUMMARY.md`*
