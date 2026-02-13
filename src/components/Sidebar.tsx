'use client';

import React from 'react';
import { 
  CheckSquare, 
  LayoutGrid, 
} from 'lucide-react';

export default function Sidebar() {
  return (
    <aside className="w-16 md:w-20 bg-white border-r border-zinc-100 flex flex-col items-center py-6 gap-8 fixed h-full left-0 top-0 z-50">
      <div className="p-2.5 bg-blue-500 rounded-xl text-white shadow-lg shadow-blue-500/30 mb-2">
        <CheckSquare size={24} strokeWidth={2.5} />
      </div>

      <nav className="flex flex-col gap-6 w-full items-center">
        <NavItem icon={<LayoutGrid size={22} />} active />
      </nav>
    </aside>
  );
}

function NavItem({ icon, active = false }: { icon: React.ReactNode; active?: boolean }) {
  return (
    <button 
      className={`
        p-3 rounded-xl transition-all duration-200 relative group
        ${active 
          ? 'text-blue-500 bg-blue-50' 
          : 'text-zinc-400 hover:text-zinc-600 hover:bg-zinc-50'
        }
      `}
    >
      {icon}
      {active && (
        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-blue-500 rounded-r-lg -ml-4" />
      )}
    </button>
  );
}
