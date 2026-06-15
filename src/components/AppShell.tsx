import React, { useState } from 'react';
import { Sidebar } from './Sidebar';
import { Header } from './Header';
import { StatusBar } from './StatusBar';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

interface AppShellProps {
  title: string;
  children: React.ReactNode;
}

export const AppShell: React.FC<AppShellProps> = ({ title, children }) => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="h-dvh w-screen overflow-hidden flex flex-col">
      <Sidebar 
        onLogout={handleLogout} 
        isCollapsed={isSidebarCollapsed} 
        onToggleCollapse={() => setIsSidebarCollapsed(!isSidebarCollapsed)} 
      />

      {/* Main Content Wrapper - adjust left padding based on sidebar state */}
      <div className={`flex-1 flex flex-col min-h-0 transition-smooth ${isSidebarCollapsed ? 'pl-20' : 'pl-60'}`}>
        {/* Header - Fixed Height (h-16) */}
        <Header title={title} />

        {/* Main Content Area - Flex fill */}
        <div className="flex-1 overflow-hidden min-h-0 pb-12">
          {/* Page Content - Full height, no page scroll */}
          <main className="h-full w-full overflow-hidden">
            {children}
          </main>
        </div>
      </div>

      {/* Status Bar - Fixed Height (h-12), fixed position at bottom */}
      <StatusBar />
    </div>
  );
};
