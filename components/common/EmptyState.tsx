import React from 'react';
import { Icons } from '../Icons';

interface EmptyStateProps {
  title: string;
  description: string;
  icon?: keyof typeof Icons;
  action?: {
    label: string;
    onClick: () => void;
  };
}

export const EmptyState: React.FC<EmptyStateProps> = ({ title, description, icon = 'Search', action }) => {
  const IconComponent = Icons[icon] || Icons.Search;

  return (
    <div className="flex flex-col items-center justify-center py-12 px-4 text-center bg-white rounded-xl border border-dashed border-slate-300">
      <div className="w-12 h-12 bg-slate-50 rounded-full flex items-center justify-center mb-4">
        <IconComponent className="w-6 h-6 text-slate-400" />
      </div>
      <h3 className="text-lg font-medium text-slate-900 mb-1">{title}</h3>
      <p className="text-slate-500 text-sm max-w-sm mb-6">{description}</p>
      {action && (
        <button
          onClick={action.onClick}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg shadow-sm text-white bg-nz-blue hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-nz-blue"
        >
          <Icons.Plus className="w-4 h-4 mr-2" />
          {action.label}
        </button>
      )}
    </div>
  );
};