import React, { useState, useEffect } from 'react';
import { Modal } from '../ui/Modal';
import { Icons } from '../Icons';

interface VoiceInputModalProps {
  isOpen: boolean;
  onClose: () => void;
  onProcess: (text: string) => void;
}

export const VoiceInputModal: React.FC<VoiceInputModalProps> = ({ isOpen, onClose, onProcess }) => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [processing, setProcessing] = useState(false);

  // Simulate speech recognition
  useEffect(() => {
    let interval: any;
    if (isOpen && isListening) {
      const phrases = [
        "Schedule a pickup...",
        "for Fonterra at 2pm...",
        "using Vehicle 001...",
        "priority high."
      ];
      let i = 0;
      setTranscript('');
      interval = setInterval(() => {
        if (i < phrases.length) {
          setTranscript(prev => prev + ' ' + phrases[i]);
          i++;
        } else {
          setIsListening(false);
          clearInterval(interval);
        }
      }, 800);
    }
    return () => clearInterval(interval);
  }, [isOpen, isListening]);

  const handleStart = () => {
    setIsListening(true);
    setTranscript('');
  };

  const handleProcess = () => {
    setProcessing(true);
    setTimeout(() => {
      onProcess(transcript);
      setProcessing(false);
      onClose();
    }, 1000);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Voice Command" size="sm">
      <div className="flex flex-col items-center py-6 text-center">
        <div 
          className={`w-20 h-20 rounded-full flex items-center justify-center mb-6 cursor-pointer transition-all ${
            isListening ? 'bg-red-50 text-red-600 animate-pulse ring-4 ring-red-100' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
          }`}
          onClick={isListening ? () => setIsListening(false) : handleStart}
        >
          {isListening ? <Icons.Activity className="w-10 h-10" /> : <Icons.Zap className="w-10 h-10" />}
        </div>

        <p className="text-sm font-medium text-slate-500 mb-4">
          {isListening ? 'Listening...' : 'Tap icon to speak'}
        </p>

        <div className="w-full bg-slate-50 border border-slate-200 rounded-lg p-4 mb-6 min-h-[80px] text-left">
          {transcript ? (
            <p className="text-slate-800 font-medium">{transcript}</p>
          ) : (
            <p className="text-slate-400 italic text-sm">Transcript will appear here...</p>
          )}
        </div>

        <div className="flex w-full gap-3">
          <button onClick={onClose} className="flex-1 py-2 border border-slate-300 rounded-lg text-slate-700 font-medium hover:bg-slate-50">
            Cancel
          </button>
          <button 
            onClick={handleProcess}
            disabled={!transcript || processing}
            className="flex-1 py-2 bg-nz-blue text-white rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {processing ? 'Processing...' : 'Execute Command'}
          </button>
        </div>
      </div>
    </Modal>
  );
};