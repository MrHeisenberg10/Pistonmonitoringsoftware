import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AppDataProvider } from './context/AppDataContext';
import { AuthProvider, useAuth } from './context/AuthContext';
import { ProtectedRoute } from './components/ProtectedRoute';
import { LoginPage } from './pages/LoginPage';
import { DataLoggingPage } from './pages/DataLoggingPage';
import { MastersPage } from './pages/MastersPage';
import { SettingsPage } from './pages/SettingsPage';
import { ReportsPage } from './pages/ReportsPage';
import { ValidationPage } from './pages/ValidationPage';
import { AuditTrailPage } from './pages/AuditTrailPage';
import { ShiftReportsPage } from './pages/ShiftReportsPage';
import './index.css';

const AppRoutes: React.FC = () => {
  const { isAuthenticated } = useAuth();

  return (
    <Routes>
      {/* Public Route */}
      <Route path="/" element={isAuthenticated ? <Navigate to="/dashboard" /> : <LoginPage />} />

      {/* Protected Routes */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute allowedRoles={['Administrator', 'Inspector', 'Operator']}>
            <DataLoggingPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/reports"
        element={
          <ProtectedRoute allowedRoles={['Administrator', 'Inspector', 'Operator']}>
            <ReportsPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/validation"
        element={
          <ProtectedRoute allowedRoles={['Administrator', 'Inspector']}>
            <ValidationPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/shift-reports"
        element={
          <ProtectedRoute allowedRoles={['Administrator', 'Inspector']}>
            <ShiftReportsPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/masters"
        element={
          <ProtectedRoute allowedRoles={['Administrator']}>
            <MastersPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/settings"
        element={
          <ProtectedRoute allowedRoles={['Administrator']}>
            <SettingsPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/audit-trail"
        element={
          <ProtectedRoute allowedRoles={['Administrator']}>
            <AuditTrailPage />
          </ProtectedRoute>
        }
      />

      {/* Catch-all */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

function App() {
  return (
    <Router>
      <AppDataProvider>
        <AuthProvider>
          <AppRoutes />
        </AuthProvider>
      </AppDataProvider>
    </Router>
  );
}

export default App;
