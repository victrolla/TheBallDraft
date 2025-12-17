import React, { useEffect, useState } from 'react';
import { Icons } from '../Icons';
import { useStore } from '../../context/StoreContext';

export const MarketingLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { setView } = useStore();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-white font-sans selection:bg-safety-orange selection:text-white flex flex-col">
      {/* Navigation */}
      <nav className={`fixed w-full z-50 transition-all duration-300 border-b ${scrolled ? 'bg-white/95 backdrop-blur-md border-gray-200 py-3 shadow-sm' : 'bg-white/0 border-transparent py-5'}`}>
        <div className="container mx-auto px-6 flex justify-between items-center">
          <div 
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => setView('landing')}
          >
            <div className="w-10 h-10 bg-black rounded-sm flex items-center justify-center">
              <Icons.Truck className="text-white w-6 h-6" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-extrabold tracking-tight leading-none text-black">The Ball</span>
              <span className="text-[10px] font-medium tracking-wider uppercase text-gray-500 font-mono">by NZ FleetCommand</span>
            </div>
          </div>
          
          <div className="hidden lg:flex items-center gap-8">
            <button onClick={() => setView('landing')} className="text-sm font-bold text-gray-600 hover:text-black transition-colors font-mono uppercase tracking-wide">Features</button>
            <button onClick={() => setView('pricing')} className="text-sm font-bold text-gray-600 hover:text-black transition-colors font-mono uppercase tracking-wide">Pricing</button>
            <button onClick={() => setView('about')} className="text-sm font-bold text-gray-600 hover:text-black transition-colors font-mono uppercase tracking-wide">About</button>
            <button onClick={() => setView('contact')} className="text-sm font-bold text-gray-600 hover:text-black transition-colors font-mono uppercase tracking-wide">Contact</button>
          </div>

          <div className="flex items-center gap-3">
            <button 
              onClick={() => setView('login')}
              className="px-5 py-2 rounded-sm text-sm font-bold transition-all text-black hover:bg-gray-100 font-mono uppercase tracking-wide"
            >
              Log In
            </button>
            <button 
              onClick={() => setView('signup')}
              className="px-6 py-2.5 rounded-sm text-sm font-bold transition-transform hover:scale-105 active:scale-95 bg-black text-white hover:bg-gray-800 font-mono uppercase tracking-wide border border-black"
            >
              Get Started
            </button>
          </div>
        </div>
      </nav>

      <main className="flex-1 pt-20">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-black text-white py-16 border-t border-gray-900">
         <div className="container mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
               <div className="col-span-1 md:col-span-1">
                  <div className="flex items-center gap-2 text-white mb-6">
                     <div className="w-8 h-8 bg-safety-orange rounded-sm flex items-center justify-center">
                        <Icons.Truck className="w-5 h-5 text-white" />
                     </div>
                     <span className="text-xl font-bold tracking-tight">The Ball</span>
                  </div>
                  <p className="text-sm text-gray-400 mb-6 font-light">
                     The complete operating system for modern fleets. Tracking, compliance, and logistics in one platform.
                  </p>
                  <div className="flex gap-4">
                     <a href="#" className="hover:text-safety-orange transition-colors"><Icons.Twitter className="w-5 h-5" /></a>
                     <a href="#" className="hover:text-safety-orange transition-colors"><Icons.Linkedin className="w-5 h-5" /></a>
                     <a href="#" className="hover:text-safety-orange transition-colors"><Icons.Facebook className="w-5 h-5" /></a>
                  </div>
               </div>
               
               <div>
                  <h4 className="text-white font-bold mb-6 font-mono uppercase tracking-widest text-xs">Product</h4>
                  <ul className="space-y-3 text-sm text-gray-400">
                     <li><button onClick={() => setView('landing')} className="hover:text-white transition-colors">Features</button></li>
                     <li><button onClick={() => setView('pricing')} className="hover:text-white transition-colors">Pricing</button></li>
                     <li><button className="hover:text-white transition-colors">API Docs</button></li>
                  </ul>
               </div>
               
               <div>
                  <h4 className="text-white font-bold mb-6 font-mono uppercase tracking-widest text-xs">Company</h4>
                  <ul className="space-y-3 text-sm text-gray-400">
                     <li><button onClick={() => setView('about')} className="hover:text-white transition-colors">About Us</button></li>
                     <li><button className="hover:text-white transition-colors">Careers</button></li>
                     <li><button onClick={() => setView('contact')} className="hover:text-white transition-colors">Contact</button></li>
                  </ul>
               </div>
               
               <div>
                  <h4 className="text-white font-bold mb-6 font-mono uppercase tracking-widest text-xs">Stay Updated</h4>
                  <div className="flex flex-col gap-3">
                     <input type="email" placeholder="Enter your email" className="bg-white/10 border-none rounded-sm px-4 py-3 text-sm focus:ring-1 focus:ring-safety-orange text-white placeholder-gray-500 font-mono" />
                     <button className="bg-white text-black font-bold py-2 rounded-sm text-sm hover:bg-gray-200 transition-colors font-mono uppercase">Subscribe</button>
                  </div>
               </div>
            </div>
            
            <div className="border-t border-gray-900 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500 font-mono">
               <p>&copy; 2024 NZ FleetCommand. All rights reserved.</p>
               <div className="flex gap-6 mt-4 md:mt-0">
                  <button className="hover:text-white">Privacy Policy</button>
                  <button className="hover:text-white">Terms of Service</button>
               </div>
            </div>
         </div>
      </footer>
    </div>
  );
};