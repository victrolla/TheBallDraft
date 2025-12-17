import React, { useRef, useState } from 'react';
import { Icons } from '../Icons';

interface FileUploadProps {
  label: string;
  accept?: string;
  onUpload?: (file: File) => void;
}

export const FileUpload: React.FC<FileUploadProps> = ({ label, accept = '*', onUpload }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [fileName, setFileName] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFileName(file.name);
      onUpload?.(file);
    }
  };

  return (
    <div>
      <label className="block text-sm font-medium text-slate-700 mb-1">{label}</label>
      <div 
        onClick={() => inputRef.current?.click()}
        className="border-2 border-dashed border-slate-300 rounded-lg p-6 flex flex-col items-center justify-center cursor-pointer hover:bg-slate-50 hover:border-nz-blue transition-colors"
      >
        <Icons.Upload className="w-8 h-8 text-slate-400 mb-2" />
        <span className="text-sm text-slate-600 font-medium">
          {fileName || 'Click to upload or drag and drop'}
        </span>
        <span className="text-xs text-slate-400 mt-1">
          {fileName ? 'File selected' : 'SVG, PNG, JPG or PDF'}
        </span>
        <input 
          type="file" 
          ref={inputRef}
          className="hidden" 
          accept={accept}
          onChange={handleFileChange}
        />
      </div>
    </div>
  );
};