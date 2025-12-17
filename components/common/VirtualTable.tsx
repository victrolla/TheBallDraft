import React, { useRef, useState, useEffect } from 'react';

interface Column<T> {
  header: string;
  accessor: (item: T) => React.ReactNode;
  width?: string;
}

interface VirtualTableProps<T> {
  data: T[];
  columns: Column<T>[];
  rowHeight: number;
  height: number;
  className?: string;
}

export const VirtualTable = <T extends { id: string }>({ 
  data, 
  columns, 
  rowHeight, 
  height,
  className = '' 
}: VirtualTableProps<T>) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [scrollTop, setScrollTop] = useState(0);

  const totalHeight = data.length * rowHeight;
  const visibleRows = Math.ceil(height / rowHeight);
  const startIndex = Math.floor(scrollTop / rowHeight);
  const endIndex = Math.min(data.length, startIndex + visibleRows + 5); // +5 buffer
  
  const visibleData = data.slice(startIndex, endIndex);
  const offsetY = startIndex * rowHeight;

  const onScroll = (e: React.UIEvent<HTMLDivElement>) => {
    setScrollTop(e.currentTarget.scrollTop);
  };

  return (
    <div 
      className={`border border-slate-200 rounded-lg overflow-hidden bg-white ${className}`}
      style={{ height }}
    >
      {/* Header */}
      <div className="flex bg-slate-50 border-b border-slate-200 sticky top-0 z-10 font-bold text-xs text-slate-500 uppercase tracking-wider">
        {columns.map((col, i) => (
          <div key={i} className={`p-3 ${col.width || 'flex-1'}`}>
            {col.header}
          </div>
        ))}
      </div>

      {/* Body */}
      <div 
        ref={scrollRef}
        className="overflow-y-auto scrollbar-thin"
        style={{ height: height - 40 }} // Subtract header height
        onScroll={onScroll}
      >
        <div style={{ height: totalHeight, position: 'relative' }}>
          <div 
            style={{ 
              transform: `translateY(${offsetY}px)`, 
              position: 'absolute', 
              top: 0, 
              left: 0, 
              right: 0 
            }}
          >
            {visibleData.map((item) => (
              <div 
                key={item.id} 
                className="flex border-b border-slate-100 hover:bg-slate-50 transition-colors box-border"
                style={{ height: rowHeight }}
              >
                {columns.map((col, i) => (
                  <div key={i} className={`px-3 flex items-center ${col.width || 'flex-1'} text-sm text-slate-700`}>
                    {col.accessor(item)}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};