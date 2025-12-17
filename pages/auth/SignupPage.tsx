import React, { useState } from 'react';
import { Icons } from '../../components/Icons';

interface SignupPageProps {
  onNavigate: (page: string) => void;
}

export const SignupPage: React.FC<SignupPageProps> = ({ onNavigate }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    company: '',
    password: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would create the user via API.
    // For now, we simulate success and move to onboarding.
    onNavigate('onboarding');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center p-4 font-sans">
      <div className="w-full max-w-md bg-white rounded-sm shadow-xl border border-gray-200 overflow-hidden">
        <div className="bg-black p-6 text-center">
          <h2 className="text-xl font-bold text-white tracking-tight">Create Admin Account</h2>
          <p className="text-gray-400 text-xs font-mono mt-1 uppercase tracking-wide">Join the NZ FleetCommand network</p>
        </div>

        <div className="p-8">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-black uppercase mb-1 font-mono tracking-wide">First Name</label>
                <input required name="firstName" onChange={handleChange} type="text" className="w-full border border-gray-300 rounded-sm px-3 py-2 text-sm focus:ring-1 focus:ring-black focus:border-black outline-none" />
              </div>
              <div>
                <label className="block text-xs font-bold text-black uppercase mb-1 font-mono tracking-wide">Last Name</label>
                <input required name="lastName" onChange={handleChange} type="text" className="w-full border border-gray-300 rounded-sm px-3 py-2 text-sm focus:ring-1 focus:ring-black focus:border-black outline-none" />
              </div>
            </div>
            
            <div>
              <label className="block text-xs font-bold text-black uppercase mb-1 font-mono tracking-wide">Work Email</label>
              <input required name="email" onChange={handleChange} type="email" className="w-full border border-gray-300 rounded-sm px-3 py-2 text-sm focus:ring-1 focus:ring-black focus:border-black outline-none" />
            </div>

            <div>
               <label className="block text-xs font-bold text-black uppercase mb-1 font-mono tracking-wide">Company / Organization</label>
               <input required name="company" onChange={handleChange} type="text" className="w-full border border-gray-300 rounded-sm px-3 py-2 text-sm focus:ring-1 focus:ring-black focus:border-black outline-none" />
            </div>

            <div>
              <label className="block text-xs font-bold text-black uppercase mb-1 font-mono tracking-wide">Password</label>
              <input required name="password" onChange={handleChange} type="password" className="w-full border border-gray-300 rounded-sm px-3 py-2 text-sm focus:ring-1 focus:ring-black focus:border-black outline-none" />
            </div>

            <button type="submit" className="w-full bg-safety-orange hover:bg-orange-600 text-white font-bold py-3 rounded-sm transition-colors mt-4 font-mono uppercase tracking-widest text-sm shadow-sm">
              Start Onboarding
            </button>
          </form>

          <div className="text-center text-sm text-gray-500 mt-4">
            Already have an account? 
            <button onClick={() => onNavigate('login')} className="ml-1 text-black font-bold hover:underline">
              Sign In
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};