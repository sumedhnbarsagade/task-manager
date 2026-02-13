'use client';

import React, { useState } from 'react';
import { Task } from '@/types';
import { useTaskContext } from '@/context/TaskContext';
import { 
  Trash2, 
  CheckCircle2, 
  Circle, 
  Calendar,
  AlertCircle,
  Edit
} from 'lucide-react';
import TaskForm from './TaskForm';

interface TaskItemProps {
  task: Task;
}

export default function TaskItem({ task }: TaskItemProps) {
  const { toggleTask, deleteTask } = useTaskContext();
  const [isEditingModalOpen, setIsEditingModalOpen] = useState(false);

  const typeMap = {
    high: { label: 'High', color: 'bg-cyan-100 text-cyan-700 border-cyan-200 text-center' },
    medium: { label: 'Medium', color: 'bg-blue-100 text-blue-700 border-blue-200 text-center' },
    low: { label: 'Low', color: 'bg-orange-100 text-orange-700 border-orange-200 text-center' },
  };

  const statusLabel = task.completed ? 'Done' : 'In Progress';
  const statusIcon = task.completed ? <CheckCircle2 size={16} /> : <AlertCircle size={16} />;

  return (
    <>
      <div className="group grid grid-cols-12 gap-4 px-6 py-3 items-center hover:bg-zinc-50 border-b border-zinc-50 last:border-none transition-colors">
        
        <div className="col-span-12 md:col-span-5 flex items-center gap-3">
          <button
            onClick={() => toggleTask(task.id)}
            className={`
              p-1 rounded-md transition-colors
              ${task.completed ? 'text-zinc-400' : 'text-zinc-300 group-hover:text-zinc-400'}
            `}
          >
            {task.completed ? <CheckCircle2 className="w-5 h-5 text-green-500" /> : <Circle className="w-5 h-5" />}
          </button>
          
          <span 
            className={`text-sm font-medium text-zinc-900 cursor-pointer hover:text-blue-600 truncate ${task.completed ? 'line-through text-zinc-400' : ''}`}
            onClick={() => setIsEditingModalOpen(true)}
          >
            {task.title}
          </span>

          {task.description && (
            <span className="hidden sm:inline-flex px-2 py-0.5 rounded text-[10px] font-semibold bg-gray-100 text-gray-500">
              Desc
            </span>
          )}
        </div>

   
        <div className="col-span-6 md:col-span-2 flex items-center">
          <div className={`
            flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium w-fit
            ${task.completed ? 'bg-green-50 text-green-700' : 'bg-gray-100 text-gray-600'}
          `}>
             <span className="opacity-70">{statusIcon}</span>
             {statusLabel}
          </div>
        </div>


        <div className="col-span-6 md:col-span-2 flex items-center">
           <div className={`flex items-center gap-2 px-2.5 py-1 rounded text-xs font-medium border ${typeMap[task.priority].color} bg-opacity-50 border-opacity-30`}>
             <div className={`w-2 h-2 rounded-sm ${typeMap[task.priority].color.replace('bg-', 'bg-opacity-100 bg-')}`} />
             {typeMap[task.priority].label}
           </div>
        </div>


        <div className="col-span-6 md:col-span-2 flex items-center text-zinc-500 text-xs font-medium">
           {task.dueDate ? (
             <>
               <Calendar size={14} className="mr-2 text-zinc-300" />
               {new Date(task.dueDate).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
             </>
           ) : (
             <span className="text-zinc-300 italic text-[10px]">No date</span>
           )}
        </div>


        <div className="col-span-6 md:col-span-1 flex items-center justify-end gap-2">
          <img 
              src={`https://i.pravatar.cc/150?u=${task.id}`} 
              alt="Assignee" 
              className="w-6 h-6 rounded-full border border-white shadow-sm"
          />
          <div className="flex items-center opacity-0 group-hover:opacity-100 transition-opacity">
            <button 
              onClick={() => setIsEditingModalOpen(true)}
              className="p-1.5 text-zinc-400 hover:text-blue-600 transition-colors"
              title="Edit Task"
            >
              <Edit size={16} />
            </button>
            <button 
              onClick={() => deleteTask(task.id)}
              className="p-1.5 text-zinc-400 hover:text-red-500 transition-colors"
              title="Delete Task"
            >
              <Trash2 size={16} />
            </button>
          </div>
        </div>
      </div>


      {isEditingModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
           <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl overflow-hidden animate-in zoom-in-95 duration-200 p-6">
             <TaskForm 
                isModal 
                onClose={() => setIsEditingModalOpen(false)} 
                initialData={task}
             />
           </div>
        </div>
      )}
    </>
  );
}
