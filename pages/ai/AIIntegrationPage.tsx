import React, { useState } from 'react';
import { Icons } from '../../components/Icons';
import { Card } from '../../components/ui/Card';
import { FileUpload } from '../../components/ui/FileUpload';
import { VoiceInputModal } from '../../components/modals/VoiceInputModal';
import { aiService, AIResponse } from '../../services/aiService';

export const AIIntegrationPage: React.FC = () => {
  const [messages, setMessages] = useState<{role: 'user'|'ai', content: string}[]>([
    { role: 'ai', content: 'Hello. I am the FleetCommand AI. You can ask me to analyze spreadsheets, schedule trips, or query fleet status.' }
  ]);
  const [input, setInput] = useState('');
  const [isVoiceOpen, setIsVoiceOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSend = async (text: string) => {
    if (!text.trim()) return;
    
    setMessages(prev => [...prev, { role: 'user', content: text }]);
    setInput('');
    setLoading(true);

    const response = await aiService.processVoiceCommand(null, text); // Reusing logic
    
    setMessages(prev => [...prev, { role: 'ai', content: response.content }]);
    setLoading(false);
  };

  const handleFileUpload = async (file: File) => {
    setMessages(prev => [...prev, { role: 'user', content: `Uploaded file: ${file.name}` }]);
    setLoading(true);
    const response = await aiService.processSpreadsheet(file);
    setMessages(prev => [...prev, { role: 'ai', content: response.content }]);
    setLoading(false);
  };

  return (
    <div className="h-[calc(100vh-140px)] flex flex-col gap-6 animate-fade-in">
      <div>
        <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
          <Icons.Zap className="w-6 h-6 text-amber-500" />
          AI Command Center
        </h2>
        <p className="text-slate-500 text-sm">Natural language processing and predictive analytics engine.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 flex-1 min-h-0">
        
        {/* Chat Interface */}
        <div className="lg:col-span-2 flex flex-col bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-slate-50">
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] p-4 rounded-xl shadow-sm ${
                  msg.role === 'user' 
                    ? 'bg-slate-900 text-white rounded-tr-none' 
                    : 'bg-white text-slate-800 border border-slate-200 rounded-tl-none'
                }`}>
                  <div className="flex items-center gap-2 mb-1 opacity-50 text-xs font-mono uppercase tracking-wider">
                    {msg.role === 'ai' ? <><Icons.Zap className="w-3 h-3" /> System AI</> : 'Operator'}
                  </div>
                  <p className="text-sm leading-relaxed">{msg.content}</p>
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm rounded-tl-none flex gap-2">
                  <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"></span>
                  <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce delay-100"></span>
                  <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce delay-200"></span>
                </div>
              </div>
            )}
          </div>

          <div className="p-4 bg-white border-t border-slate-200 flex gap-2">
            <button 
              onClick={() => setIsVoiceOpen(true)}
              className="p-3 text-slate-500 hover:text-nz-blue hover:bg-blue-50 rounded-lg transition-colors"
            >
              <Icons.Activity className="w-5 h-5" />
            </button>
            <input 
              type="text" 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend(input)}
              placeholder="Ask about fleet status, schedule trips, or analyze data..."
              className="flex-1 bg-slate-100 border-none rounded-lg px-4 focus:ring-2 focus:ring-nz-blue outline-none"
            />
            <button 
              onClick={() => handleSend(input)}
              disabled={!input.trim()}
              className="p-3 bg-slate-900 text-white rounded-lg hover:bg-slate-800 disabled:opacity-50 transition-colors"
            >
              <Icons.ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Sidebar Tools */}
        <div className="flex flex-col gap-6">
          <Card title="Data Ingestion">
            <FileUpload label="Upload Booking Spreadsheet" onUpload={handleFileUpload} accept=".csv,.xlsx" />
            <p className="text-xs text-slate-400 mt-2">
              Supported: Legacy manifests, competitor exports, and unstructured logs.
            </p>
          </Card>

          <Card title="Recent Insights">
            <div className="space-y-4">
              <div className="p-3 bg-amber-50 border border-amber-100 rounded-lg">
                <div className="flex items-center gap-2 mb-2 text-amber-700 font-bold text-xs uppercase">
                  <Icons.Trend className="w-3 h-3" /> Predictive
                </div>
                <p className="text-sm text-slate-700">Vehicle V003 shows 85% probability of battery failure within 48 hours based on voltage drops.</p>
              </div>
              <div className="p-3 bg-blue-50 border border-blue-100 rounded-lg">
                <div className="flex items-center gap-2 mb-2 text-blue-700 font-bold text-xs uppercase">
                  <Icons.Map className="w-3 h-3" /> Optimization
                </div>
                <p className="text-sm text-slate-700">Route density in Waikato allows for consolidation of 3 trips into 1. Estimated saving: $420.</p>
              </div>
            </div>
          </Card>
        </div>
      </div>

      <VoiceInputModal 
        isOpen={isVoiceOpen} 
        onClose={() => setIsVoiceOpen(false)} 
        onProcess={(text) => handleSend(text)} 
      />
    </div>
  );
};