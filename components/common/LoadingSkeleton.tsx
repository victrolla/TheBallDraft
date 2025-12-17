import React from 'react';

interface LoadingSkeletonProps {
  className?: string;
  count?: number;
  height?: string;
}

export const LoadingSkeleton: React.FC<LoadingSkeletonProps> = ({ 
  className = '', 
  count = 1, 
  height = 'h-4' 
}) => {
  return (
    <div className={`space-y-3 ${className} animate-pulse`}>
      {[...Array(count)].map((_, i) => (
        <div 
          key={i} 
          className={`bg-slate-200 rounded ${height}`}
          style={{ width: `${Math.random() * 40 + 60}%` }}
        ></div>
      ))}
    </div>
  );
};

export const CardSkeleton: React.FC = () => (
  <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm animate-pulse">
    <div className="flex justify-between items-start mb-4">
      <div className="h-4 bg-slate-200 rounded w-1/3"></div>
      <div className="h-8 w-8 bg-slate-200 rounded-lg"></div>
    </div>
    <div className="h-8 bg-slate-200 rounded w-1/2 mb-4"></div>
    <div className="space-y-2">
      <div className="h-2 bg-slate-200 rounded w-full"></div>
      <div className="h-2 bg-slate-200 rounded w-2/3"></div>
    </div>
  </div>
);