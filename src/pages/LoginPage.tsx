import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Lock, Mail } from 'lucide-react';

export const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [username, setUsername] = useState('admin');
  const [password, setPassword] = useState('demo123');
  const [role, setRole] = useState<'Administrator' | 'Inspector' | 'Operator'>('Administrator');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await login(username, password, role);
      navigate('/dashboard');
    } catch (error) {
      console.error('Login failed:', error);
      alert('Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-accent via-teal-accent/90 to-navy-dark flex items-center justify-center p-4">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
      </div>

      {/* Login Card */}
      <div className="relative z-10 w-full max-w-md animate-fade-in">
        <div className="bg-white rounded-2xl shadow-2xl p-8 backdrop-blur-sm">
          {/* Logo */}
          <div className="flex flex-col items-center mb-8">
            <img 
              src="/images/IMG-20260605-WA0002.jpg" 
              alt="Artivus Systems Logo" 
              className="h-32 w-auto object-contain mb-4"
            />
            <p className="text-xs text-gray-400">Version 1.0.0</p>
          </div>
          

          {/* Form */}
          <form onSubmit={handleLogin} className="space-y-5">
            {/* Username */}
            <div>
              <label htmlFor="username" className="block text-sm font-semibold text-navy-dark mb-2">
                Username
              </label>
              <div className="relative">
                <Mail
                  size={18}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                />
                <input
                  id="username"
                  type="text"
                  value={username}
                  onChange={e => setUsername(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:border-teal-accent focus:ring-2 focus:ring-teal-accent/20 transition-smooth"
                  placeholder="Enter username"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="block text-sm font-semibold text-navy-dark mb-2">
                Password
              </label>
              <div className="relative">
                <Lock
                  size={18}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                />
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:border-teal-accent focus:ring-2 focus:ring-teal-accent/20 transition-smooth"
                  placeholder="Enter password"
                />
              </div>
            </div>

            {/* Role */}
            <div>
              <label htmlFor="role" className="block text-sm font-semibold text-navy-dark mb-2">
                Role
              </label>
              <select
                id="role"
                value={role}
                onChange={e => setRole(e.target.value as 'Administrator' | 'Inspector' | 'Operator')}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:border-teal-accent focus:ring-2 focus:ring-teal-accent/20 transition-smooth"
              >
                <option value="Administrator">Administrator</option>
                <option value="Inspector">Inspector</option>
                <option value="Operator">Operator</option>
              </select>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-teal-accent hover:bg-teal-accent/90 disabled:opacity-50 text-white font-semibold py-2.5 rounded-lg transition-smooth focus:outline-none focus:ring-2 focus:ring-teal-accent/50"
            >
              {isLoading ? 'Logging in...' : 'Login'}
            </button>

            {/* Demo Note */}
            <div className="mt-6 p-3 bg-blue-50 border border-blue-200 rounded-lg text-xs text-blue-800">
              <strong>Demo Credentials:</strong>
              <p>admin / demo123 → Administrator</p>
              <p>mike_insp / demo123 → Inspector</p>
              <p>john_op / demo123 → Operator</p>
            </div>
          </form>
        </div>

        {/* Footer Text */}
        <p className="text-center text-white text-xs mt-6 opacity-80">
          © 2024 Artivus Systems. All rights reserved.
        </p>
      </div>

      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fadeIn 0.5s ease-out;
        }
      `}</style>
    </div>
  );
};
