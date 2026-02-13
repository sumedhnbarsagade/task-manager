'use client';

import React from 'react';
import { Plus } from 'lucide-react';

interface TopBarProps {
  onAddTask: () => void;
}

export default function TopBar({ onAddTask }: TopBarProps) {
  return (
    <header className="h-20 bg-white border-b border-zinc-100 flex items-center justify-between px-8 sticky top-0 z-20">

      <div className="flex items-center gap-8">
        <h1 className="text-xl font-bold text-zinc-800">Tasks</h1>
        
        <button 
          onClick={onAddTask}
          className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2.5 rounded-full shadow-lg shadow-blue-500/20 transition-all active:scale-95"
        >
          <Plus size={18} strokeWidth={3} />
          <span className="text-sm font-semibold">Add new</span>
        </button>
      </div>


      <div className="flex items-center gap-6">
      </div>
    </header>
  );
}
