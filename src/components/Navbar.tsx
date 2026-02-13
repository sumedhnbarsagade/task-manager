'use client';

import React from 'react';
import { CheckSquare } from 'lucide-react';

export default function Navbar() {
  return (
    <nav className="w-full bg-white border-b border-zinc-200 sticky top-0 z-50">
      <div className="max-w-4xl mx-auto px-4 md:px-8 h-16 flex items-center gap-3">
        <div className="bg-indigo-600 p-1.5 rounded-lg text-white">
          <CheckSquare size={20} />
        </div>
        <h1 className="text-xl font-bold tracking-tight text-zinc-900">
          Task Master
        </h1>
      </div>
    </nav>
  );
}
