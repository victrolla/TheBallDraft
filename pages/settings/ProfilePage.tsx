import React from 'react';
import { Card } from '../../components/ui/Card';
import { Icons } from '../../components/Icons';

export const ProfilePage: React.FC = () => {
  return (
    <div className="max-w-3xl mx-auto space-y-6 animate-fade-in">
       <h2 className="text-2xl font-bold text-slate-900">My Profile</h2>
       
       <Card title="Personal Information">
          <div className="flex items-start gap-6 mb-6">
             <div className="w-24 h-24 rounded-full bg-slate-200 flex items-center justify-center text-3xl font-bold text-slate-500 relative">
                JD
                <button className="absolute bottom-0 right-0 p-1.5 bg-nz-blue text-white rounded-full border-2 border-white hover:bg-blue-700">
                   <Icons.Upload className="w-4 h-4" />
                </button>
             </div>
             <div className="flex-1 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                   <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">First Name</label>
                      <input type="text" className="w-full border border-slate-300 rounded-lg px-3 py-2" defaultValue="John" />
                   </div>
                   <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">Last Name</label>
                      <input type="text" className="w-full border border-slate-300 rounded-lg px-3 py-2" defaultValue="Doe" />
                   </div>
                </div>
                <div>
                   <label className="block text-sm font-medium text-slate-700 mb-1">Job Title</label>
                   <input type="text" className="w-full border border-slate-300 rounded-lg px-3 py-2" defaultValue="Logistics Manager" />
                </div>
             </div>
          </div>
       </Card>

       <Card title="Account Security">
          <div className="space-y-4">
             <div className="flex items-center justify-between p-3 border border-slate-200 rounded-lg">
                <div>
                   <p className="font-medium text-slate-900">Email Address</p>
                   <p className="text-sm text-slate-500">john.doe@fleetcmd.co.nz</p>
                </div>
                <button className="text-sm text-nz-blue hover:underline">Change</button>
             </div>
             <div className="flex items-center justify-between p-3 border border-slate-200 rounded-lg">
                <div>
                   <p className="font-medium text-slate-900">Password</p>
                   <p className="text-sm text-slate-500">Last changed 3 months ago</p>
                </div>
                <button className="text-sm text-nz-blue hover:underline">Update</button>
             </div>
             <div className="flex items-center justify-between p-3 border border-slate-200 rounded-lg">
                <div>
                   <p className="font-medium text-slate-900">Two-Factor Authentication (MFA)</p>
                   <p className="text-sm text-emerald-600 flex items-center gap-1"><Icons.Security className="w-3 h-3" /> Enabled</p>
                </div>
                <button className="text-sm text-slate-600 hover:text-red-600">Disable</button>
             </div>
          </div>
       </Card>

       <div className="flex justify-end">
          <button className="px-6 py-2 bg-nz-blue text-white rounded-lg font-bold hover:bg-blue-700">Save Changes</button>
       </div>
    </div>
  );
};