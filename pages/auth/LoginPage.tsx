import React, { useState } from 'react';
import { Icons } from '../../components/Icons';

interface LoginPageProps {
  onLogin: () => void;
  onNavigate: (page: string) => void;
}

export const LoginPage: React.FC<LoginPageProps> = ({ onLogin, onNavigate }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [mfaStep, setMfaStep] = useState(false);
  const [mfaCode, setMfaCode] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!mfaStep) {
      // Strict check for admin credentials
      if (email === 'admin' && password === 'admin123') {
        onLogin();
      } else {
        setError('Invalid credentials. Please use authorized admin account.');
      }
    } else {
      // MFA check (unused for admin login but kept for structure)
      onLogin();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center p-4 font-sans text-black">
      <div className="w-full max-w-md bg-white rounded-sm shadow-xl border border-gray-200 overflow-hidden">
        <div className="bg-black p-8 text-center">
          <div className="w-16 h-16 bg-white rounded-sm flex items-center justify-center mx-auto mb-4">
            <Icons.Truck className="w-8 h-8 text-black" />
          </div>
          <h2 className="text-2xl font-bold text-white tracking-tight">NZ FleetCommand</h2>
          <p className="text-gray-400 mt-2 font-mono text-xs uppercase tracking-wide">Logistics Intelligence Platform</p>
        </div>

        <div className="p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="bg-red-50 text-red-600 text-xs font-bold p-3 rounded-sm border border-red-100 flex items-center gap-2 animate-fade-in">
                <Icons.Alert className="w-4 h-4 shrink-0" />
                {error}
              </div>
            )}

            {!mfaStep ? (
              <>
                <div>
                  <label className="block text-xs font-bold text-black uppercase tracking-wide mb-1 font-mono">Username</label>
                  <div className="relative">
                    <Icons.User className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-sm focus:ring-1 focus:ring-black focus:border-black transition-shadow outline-none"
                      placeholder="admin"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-black uppercase tracking-wide mb-1 font-mono">Password</label>
                  <div className="relative">
                    <Icons.Lock className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                    <input
                      type="password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-sm focus:ring-1 focus:ring-black focus:border-black transition-shadow outline-none"
                      placeholder="••••••••"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between text-sm">
                  <label className="flex items-center">
                    <input type="checkbox" className="rounded-sm border-gray-300 text-black focus:ring-black" />
                    <span className="ml-2 text-gray-600">Remember me</span>
                  </label>
                  <button type="button" className="text-safety-orange hover:text-orange-700 font-bold text-xs uppercase tracking-wide">Forgot password?</button>
                </div>
              </>
            ) : (
              <div className="animate-fade-in">
                <div className="text-center mb-6">
                  <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Icons.Security className="w-6 h-6 text-black" />
                  </div>
                  <h3 className="text-lg font-bold text-black">Two-Factor Authentication</h3>
                  <p className="text-sm text-gray-500 mt-1">Enter the 6-digit code sent to your device.</p>
                </div>
                
                <div className="flex justify-center gap-2 mb-6">
                   <input 
                     type="text" 
                     maxLength={6}
                     value={mfaCode}
                     onChange={(e) => setMfaCode(e.target.value)}
                     className="w-32 text-center text-2xl tracking-widest py-2 border-b-2 border-gray-300 focus:border-black focus:outline-none font-mono"
                     placeholder="000000"
                   />
                </div>
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-safety-orange hover:bg-orange-600 text-white font-bold py-3 rounded-sm transition-colors shadow-sm font-mono uppercase tracking-widest text-sm"
            >
              {mfaStep ? 'Verify & Login' : 'Sign In'}
            </button>
          </form>

          <div className="mt-6 text-center text-sm text-gray-500">
            Don't have an account? 
            <button onClick={() => onNavigate('signup')} className="ml-1 text-black font-bold hover:underline">
              Contact Admin
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};