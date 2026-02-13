'use client';

import { useState } from 'react';
import { TaskProvider } from '@/context/TaskContext';
import TaskForm from '@/components/TaskForm'; 
import TaskList from '@/components/TaskList';
import Sidebar from '@/components/Sidebar';
import TopBar from '@/components/TopBar';

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <TaskProvider>
      <div className="min-h-screen bg-white text-zinc-900 font-sans flex">
        {/* Fixed Sidebar */}
        <Sidebar />
        
        {/* Main Content Area */}
        <div className="flex-1 ml-16 md:ml-20 flex flex-col min-h-screen bg-white">
           <TopBar onAddTask={() => setIsModalOpen(true)} />
           
           <main className="flex-1 p-6 md:p-8 overflow-y-auto">
             <div className="max-w-[1600px] mx-auto space-y-6">
               <TaskList />
             </div>
           </main>
        </div>

        {/* Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
             <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl overflow-hidden animate-in zoom-in-95 duration-200 p-6">
               <TaskForm isModal onClose={() => setIsModalOpen(false)} />
             </div>
          </div>
        )}
      </div>
    </TaskProvider>
  );
}
