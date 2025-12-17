import React from 'react';
import { Icons } from '../../components/Icons';

interface PasswordResetPageProps {
  onNavigate: (page: string) => void;
}

export const PasswordResetPage: React.FC<PasswordResetPageProps> = ({ onNavigate }) => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center p-4 font-sans">
      <div className="w-full max-w-md bg-white rounded-sm shadow-xl border border-gray-200 overflow-hidden p-8">
        <div className="text-center mb-6">
          <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Icons.Lock className="w-6 h-6 text-black" />
          </div>
          <h2 className="text-2xl font-bold text-black tracking-tight">Reset Password</h2>
          <p className="text-gray-500 text-sm mt-2">Enter your email to receive recovery instructions.</p>
        </div>

        <form className="space-y-4">
           <div>
            <label className="block text-xs font-bold text-black uppercase mb-1 font-mono tracking-wide">Email Address</label>
            <input type="email" className="w-full border border-gray-300 rounded-sm px-4 py-2 focus:ring-1 focus:ring-black focus:border-black outline-none" placeholder="you@company.com" />
          </div>
          
          <button className="w-full bg-safety-orange hover:bg-orange-600 text-white font-bold py-3 rounded-sm transition-colors font-mono uppercase tracking-widest text-sm shadow-sm">
            Send Reset Link
          </button>
        </form>

        <button onClick={() => onNavigate('login')} className="w-full text-center text-sm text-gray-500 mt-6 hover:text-black flex items-center justify-center gap-1 font-medium">
          <Icons.ChevronRight className="w-4 h-4 rotate-180" /> Back to Login
        </button>
      </div>
    </div>
  );
};