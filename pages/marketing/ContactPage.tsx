import React from 'react';
import { MarketingLayout } from '../../components/layout/MarketingLayout';
import { Icons } from '../../components/Icons';

export const ContactPage: React.FC = () => {
  return (
    <MarketingLayout>
      <div className="bg-white py-20">
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row gap-16">
            <div className="lg:w-1/2">
              <h1 className="text-4xl font-extrabold text-slate-900 mb-6">Get in Touch</h1>
              <p className="text-lg text-slate-600 mb-8">
                Have questions about enterprise deployment, API integrations, or custom reporting? Our Auckland-based team is ready to help.
              </p>
              
              <div className="space-y-6 mb-12">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center text-nz-blue shrink-0">
                    <Icons.Pin className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 text-lg">Head Office</h3>
                    <p className="text-slate-600">Level 4, 123 Queen Street<br/>Auckland CBD, 1010<br/>New Zealand</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center text-nz-blue shrink-0">
                    <Icons.Mail className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 text-lg">Email Us</h3>
                    <p className="text-slate-600">sales@fleetcmd.co.nz<br/>support@fleetcmd.co.nz</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center text-nz-blue shrink-0">
                    <Icons.Truck className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 text-lg">24/7 Support</h3>
                    <p className="text-slate-600">0800 FLEET CMD<br/>(+64) 9 123 4567</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:w-1/2">
              <div className="bg-slate-50 p-8 rounded-2xl border border-slate-200 shadow-lg">
                <h3 className="text-2xl font-bold text-slate-900 mb-6">Send us a message</h3>
                <form className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-1">First Name</label>
                      <input type="text" className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-nz-blue outline-none" />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-1">Last Name</label>
                      <input type="text" className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-nz-blue outline-none" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-1">Work Email</label>
                    <input type="email" className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-nz-blue outline-none" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-1">Message</label>
                    <textarea rows={4} className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-nz-blue outline-none"></textarea>
                  </div>
                  <button className="w-full py-4 bg-nz-blue hover:bg-blue-700 text-white font-bold rounded-lg shadow-lg transition-all">
                    Send Message
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MarketingLayout>
  );
};