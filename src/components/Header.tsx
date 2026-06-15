import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { Clock, User } from 'lucide-react';

interface HeaderProps {
  title: string;
}

export const Header: React.FC<HeaderProps> = ({ title }) => {
  const { user, currentShift } = useAuth();
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (date: Date) => {
    return date.toLocaleString('en-IN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true,
    });
  };

  return (
    <div className="bg-white shadow-sm border-b border-gray-200 h-16 flex items-center justify-between px-6 flex-shrink-0">
      {/* Title */}
      <h1 className="text-xl font-bold text-navy-dark">{title}</h1>

      {/* Right Section */}
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-2 text-xs text-gray-600">
          <Clock size={14} className="text-teal-accent" />
          <span>{formatTime(currentTime)}</span>
        </div>

        {/* Shift Badge */}
        <div className="flex items-center gap-2 px-3 py-1.5 bg-gray-100 rounded border border-gray-200 text-xs font-semibold text-navy-dark">
          {currentShift}
        </div>

        {/* User Badge */}
        {user && (
          <div className="flex items-center gap-2 px-3 py-1.5 bg-teal-accent/10 rounded-full border border-teal-accent/30 text-xs">
            <User size={14} className="text-teal-accent" />
            <div>
              <div className="font-semibold text-navy-dark">{user.fullName}</div>
              <div className="text-gray-600">{user.role}</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
