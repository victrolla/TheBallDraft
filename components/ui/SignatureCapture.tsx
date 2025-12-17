import React, { useState } from 'react';

export const SignatureCapture: React.FC = () => {
  const [signed, setSigned] = useState(false);

  return (
    <div>
      <label className="block text-sm font-medium text-slate-700 mb-1">Digital Signature</label>
      <div 
        className="h-32 bg-slate-50 border border-slate-300 rounded-lg flex items-center justify-center relative cursor-crosshair hover:bg-white"
        onClick={() => setSigned(true)}
      >
        {!signed ? (
          <span className="text-slate-400 text-sm">Tap to sign</span>
        ) : (
          <div className="font-script text-2xl text-slate-800 italic">John Doe</div>
        )}
        {signed && (
          <button 
            onClick={(e) => { e.stopPropagation(); setSigned(false); }}
            className="absolute top-2 right-2 text-xs text-red-500 hover:underline"
          >
            Clear
          </button>
        )}
      </div>
    </div>
  );
};