import React from 'react';
import { Modal } from '../ui/Modal';

interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  type?: 'danger' | 'warning' | 'info';
}

export const ConfirmationModal: React.FC<ConfirmationModalProps> = ({ 
  isOpen, onClose, onConfirm, title, message, 
  confirmText = 'Confirm', cancelText = 'Cancel', type = 'info' 
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title} size="sm">
      <div className="space-y-4">
        <p className="text-slate-600">{message}</p>
        <div className="flex justify-end gap-3 pt-4">
          <button 
            onClick={onClose}
            className="px-4 py-2 bg-white border border-slate-300 rounded-lg text-slate-700 font-medium hover:bg-slate-50"
          >
            {cancelText}
          </button>
          <button 
            onClick={() => { onConfirm(); onClose(); }}
            className={`px-4 py-2 text-white rounded-lg font-medium shadow-sm ${
              type === 'danger' ? 'bg-red-600 hover:bg-red-700' :
              type === 'warning' ? 'bg-amber-600 hover:bg-amber-700' :
              'bg-nz-blue hover:bg-blue-700'
            }`}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </Modal>
  );
};