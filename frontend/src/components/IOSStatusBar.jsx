import React from 'react';

export default function IOSStatusBar() {
  return (
    <div className="flex justify-between items-center px-6 pt-3 pb-1 text-white font-semibold text-xs select-none">
      <span>9:41</span>
      <div className="flex items-center gap-1.5">
        <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 17 12">
          <rect x="0" y="8" width="3" height="4" rx="0.5" />
          <rect x="4.5" y="6" width="3" height="6" rx="0.5" />
          <rect x="9" y="3" width="3" height="9" rx="0.5" />
          <rect x="13.5" y="0" width="3" height="12" rx="0.5" />
        </svg>
        <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 16 12">
          <path d="M8 2.4C10.4 2.4 12.6 3.4 14.1 5L15.5 3.6C13.6 1.6 10.9 0.4 8 0.4C5.1 0.4 2.4 1.6 0.5 3.6L1.9 5C3.4 3.4 5.6 2.4 8 2.4Z" />
        </svg>
        <div className="w-6 h-3 rounded-[4px] border border-white p-[1px] flex items-center">
          <div className="h-full w-full bg-white rounded-[2px]" />
        </div>
      </div>
    </div>
  );
}