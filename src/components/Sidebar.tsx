import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  Database,
  Settings,
  FileText,
  CheckCircle,
  LogOut,
  ChevronLeft,
  ChevronRight,
  ClipboardList,
  History
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { UserRole } from '../types';

interface SidebarProps {
  onLogout: () => void;
  isCollapsed: boolean;
  onToggleCollapse: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ onLogout, isCollapsed, onToggleCollapse }) => {
  const location = useLocation();
  const { user } = useAuth();

  const navItems = [
    { path: '/dashboard', label: 'Data Logging', icon: LayoutDashboard, roles: ['Administrator', 'Inspector', 'Operator'] },
    { path: '/reports', label: 'Reports', icon: FileText, roles: ['Administrator', 'Inspector', 'Operator'] },
    { path: '/validation', label: 'Validation', icon: CheckCircle, roles: ['Administrator', 'Inspector'] },
    { path: '/shift-reports', label: 'Shift Reports', icon: ClipboardList, roles: ['Administrator', 'Inspector'] },
    { path: '/masters', label: 'Masters', icon: Database, roles: ['Administrator'] },
    { path: '/settings', label: 'Settings', icon: Settings, roles: ['Administrator'] },
    { path: '/audit-trail', label: 'Audit Trail', icon: History, roles: ['Administrator'] },
  ];

  const visibleNavItems = navItems.filter(item => user && item.roles.includes(user.role));

  const isActive = (path: string) => location.pathname === path;

  return (
    <div
      className={`fixed left-0 top-0 h-screen bg-navy-dark text-white flex flex-col transition-smooth ${
        isCollapsed ? 'w-20' : 'w-60'
      }`}
    >
      {/* Logo Section */}
      <div className="p-4 border-b border-white/10 flex flex-col items-center flex-shrink-0">
        <img 
          src="/images/IMG-20260605-WA0002.jpg" 
          alt="Artivus Systems Logo" 
          className={`object-contain transition-all ${isCollapsed ? 'h-10 w-10' : 'h-14 w-auto'}`}
        />
         {!isCollapsed && (
            <p className="text-[10px] tracking-widest text-gray-400">
            Version 1.0.0 
          </p>
         )}
      </div>

      {/* Navigation Items (Scrollable if needed) */}
      <nav className="flex-1 py-4 px-2 space-y-2 overflow-y-auto">
        {visibleNavItems.map(item => {
          const Icon = item.icon;
          const active = isActive(item.path);
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-smooth text-sm ${
                active
                  ? 'nav-item-active'
                  : 'hover:bg-white/10 text-gray-300 hover:text-white'
              }`}
            >
              <Icon size={18} className="flex-shrink-0" />
              {!isCollapsed && <span className="font-medium whitespace-nowrap">{item.label}</span>}
            </Link>
          );
        })}
      </nav>

      {/* Logout Section */}
      <div className="border-t border-white/10 p-4 flex-shrink-0">
        <button
          onClick={onLogout}
          className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-gray-300 hover:text-white hover:bg-white/10 transition-smooth text-sm"
        >
          <LogOut size={18} className="flex-shrink-0" />
          {!isCollapsed && <span className="font-medium whitespace-nowrap">Logout</span>}
        </button>
      </div>

      {/* Collapse Toggle */}
      <button
        onClick={onToggleCollapse}
        className="absolute -right-3 top-24 bg-navy-dark border border-white/20 rounded-full p-1 text-teal-accent hover:bg-teal-accent hover:text-navy-dark transition-smooth flex-shrink-0"
      >
        {isCollapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
      </button>
    </div>
  );
};
