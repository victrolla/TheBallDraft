import React, { useState } from 'react';
import { Modal } from '../ui/Modal';

export interface FieldConfig {
  name: string;
  label: string;
  type: 'text' | 'number' | 'select' | 'date' | 'email';
  options?: string[];
  required?: boolean;
  defaultValue?: any;
  placeholder?: string;
}

interface CreateItemModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  fields: FieldConfig[];
  onSubmit: (data: any) => void;
}

export const CreateItemModal: React.FC<CreateItemModalProps> = ({ 
  isOpen, onClose, title, fields, onSubmit 
}) => {
  const [formData, setFormData] = useState<Record<string, any>>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Merge defaults
    const finalData = { ...formData };
    fields.forEach(f => {
       if (finalData[f.name] === undefined && f.defaultValue !== undefined) {
         finalData[f.name] = f.defaultValue;
       }
    });
    onSubmit(finalData);
    setFormData({}); // Reset
    onClose();
  };

  const handleChange = (name: string, value: any) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title} size="md">
      <form onSubmit={handleSubmit} className="space-y-4">
        {fields.map((field) => (
          <div key={field.name}>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              {field.label} {field.required && <span className="text-red-500">*</span>}
            </label>
            {field.type === 'select' ? (
              <select
                required={field.required}
                className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-nz-blue outline-none"
                value={formData[field.name] || field.defaultValue || ''}
                onChange={e => handleChange(field.name, e.target.value)}
              >
                <option value="">Select...</option>
                {field.options?.map(opt => (
                  <option key={opt} value={opt}>{opt}</option>
                ))}
              </select>
            ) : (
              <input
                type={field.type}
                required={field.required}
                placeholder={field.placeholder}
                className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-nz-blue outline-none"
                value={formData[field.name] || field.defaultValue || ''}
                onChange={e => handleChange(field.name, e.target.value)}
              />
            )}
          </div>
        ))}
        
        <div className="flex justify-end gap-3 pt-4 border-t border-slate-100 mt-6">
          <button 
            type="button" 
            onClick={onClose}
            className="px-4 py-2 bg-white border border-slate-300 rounded-lg text-slate-700 font-medium hover:bg-slate-50"
          >
            Cancel
          </button>
          <button 
            type="submit"
            className="px-6 py-2 bg-nz-blue text-white rounded-lg font-medium hover:bg-blue-700 shadow-sm"
          >
            Create
          </button>
        </div>
      </form>
    </Modal>
  );
};